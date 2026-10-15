#!/usr/bin/env python3
"""Check that each docs version states the Envoy Gateway versions its release ships.

A release carries two Envoy Gateway pins, which are bumped separately:

  * the image: ENVOY_GATEWAY_VERSION in third_party/envoy-gateway/Makefile of the
    code repo. `envoyVersion` in variables.js must match it, because the docs use
    the variable to name the version the hardened image is based on.
  * the chart: ENVOY_GATEWAY_VERSION in the operator Makefile, which selects the
    gateway-helm chart the operator embeds and renders. The `gateway-helm-vX.Y.Z`
    and `app.kubernetes.io/version` labels in example output must match it,
    because they show what a running cluster reports.

The code is read at the release each docs tree documents:

  * Calico Open Source reads projectcalico/calico; Calico Enterprise and Calico
    Cloud read tigera/calico-private.
  * The ref is the first `title` in the tree's releases.json: a release tag such
    as v3.32.2, or `master` for an unreleased next tree. For Calico Cloud it is
    the Calico Enterprise tag in `cloudversion`, because the Calico Cloud
    releases.json files are not kept current.
  * The operator Makefile is operator/Makefile in the code repo where the operator
    lives there. Otherwise it is the Makefile of tigera/operator at the
    `tigeraOperator` version in the code repo's charts/tigera-operator/values.yaml.

Only trees the site builds are checked: the next tree, which builds for the next
preview, and the versions in the product's `onlyIncludeVersions` in
docusaurus.config.js. `envoyVersion` resolves as the build resolves it, from the
tree's variables.js and then from the root variables.js.

Image tags in the example output, such as quay.io/calico/envoy-gateway:vX.Y.Z,
are Calico release versions, not Envoy Gateway versions, and are not checked.

A release tag is checked rather than a release branch because patch releases
move the pins within a minor, and a branch head can be ahead of the last release.

Requires the GitHub CLI (`gh`), authenticated with read access to
tigera/calico-private.

Run from the repo root:

  python3 -m unittest scripts/test_envoy_versions.py -v
  python3 scripts/test_envoy_versions.py --table
"""

import json
import re
import subprocess
import sys
import unittest
from functools import lru_cache
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

PRODUCTS = {
    'calico': 'projectcalico/calico',
    'calico-enterprise': 'tigera/calico-private',
    'calico-cloud': 'tigera/calico-private',
}
OPERATOR_REPO = 'tigera/operator'

IMAGE_MAKEFILE = 'third_party/envoy-gateway/Makefile'
OPERATOR_VALUES = 'charts/tigera-operator/values.yaml'
MAKEFILE_VERSION = re.compile(r'^ENVOY_GATEWAY_VERSION\s*\??=\s*v?(\S+)', re.M)
VALUES_OPERATOR_VERSION = re.compile(r'^tigeraOperator:\n(?:[ \t]+.*\n)*?[ \t]+version:\s*(\S+)', re.M)
CLOUD_VERSION = re.compile(r"cloudversion:\s*['\"](v[^'\"]+)-\d+['\"]")
DOCS_VARIABLE = re.compile(r"envoyVersion:\s*['\"]v?([^'\"]+)['\"]")
# The same token pattern as src/remark/variablesPlugin.js.
DOCS_VARIABLE_USE = re.compile(r'\$\[[ \t]*envoyVersion[ \t]*\]')
DOCS_CHART_LABEL = re.compile(r'gateway-helm-v(\d+\.\d+\.\d+)')
DOCS_VERSION_LABEL = re.compile(r'app\.kubernetes\.io/version:\s*["\']?v?(\d+\.\d+\.\d+)')


class NotFound(Exception):
    """The file does not exist at a ref that does exist."""


def gh_api(path, raw=False):
    args = ['gh', 'api', path]
    if raw:
        args += ['-H', 'Accept: application/vnd.github.raw']
    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode != 0:
        output = result.stdout + result.stderr
        # GitHub answers a missing ref with 404 as well, so only a plain
        # "Not Found" means the file is absent.
        if 'HTTP 404' in output and 'No commit found' not in output:
            raise NotFound(path)
        raise RuntimeError(f'gh api {path} failed: {output.strip()}')
    return result.stdout


def check_repo_access():
    """Fail unless every code repo is readable.

    GitHub answers a private repo the caller cannot see with 404, which would
    otherwise be indistinguishable from a missing file.
    """
    for repo in sorted(set(PRODUCTS.values()) | {OPERATOR_REPO}):
        try:
            gh_api(f'repos/{repo}')
        except NotFound:
            raise RuntimeError(f'No read access to {repo}; authenticate gh with a token that can read it')


@lru_cache(maxsize=None)
def read_file(repo, ref, path):
    return gh_api(f'repos/{repo}/contents/{path}?ref={ref}', raw=True)


def makefile_version(repo, ref, path):
    match = MAKEFILE_VERSION.search(read_file(repo, ref, path))
    if not match:
        raise RuntimeError(f'No ENVOY_GATEWAY_VERSION in {repo}@{ref}:{path}')
    return match.group(1)


def built_versions(product):
    """Return the versioned trees docusaurus.config.js builds for a product."""
    config = (REPO_ROOT / 'docusaurus.config.js').read_text()
    match = re.search(
        rf"id:\s*'{re.escape(product)}',.*?onlyIncludeVersions:\s*\[([^\]]*)\]", config, re.S)
    if not match:
        raise RuntimeError(f'No onlyIncludeVersions for {product} in docusaurus.config.js')
    entries = re.sub(r'/\*.*?\*/|//[^\n]*', '', match.group(1), flags=re.S)
    # 'current' is the next tree, which docs_trees() always checks.
    return [v for v in re.findall(r"'([^']+)'", entries) if v != 'current']


def docs_trees():
    """Yield (product, docs version, tree path) for the next tree and every built versioned tree."""
    for product in PRODUCTS:
        yield product, 'next', REPO_ROOT / product
        for version in built_versions(product):
            yield product, version, REPO_ROOT / f'{product}_versioned_docs' / f'version-{version}'


def code_ref(product, tree):
    if product == 'calico-cloud':
        match = CLOUD_VERSION.search((tree / 'variables.js').read_text())
        if not match:
            raise RuntimeError(f'No parseable cloudversion in {tree}/variables.js')
        return match.group(1)
    return json.loads((tree / 'releases.json').read_text())[0]['title']


def image_version(product, tree):
    repo, ref = PRODUCTS[product], code_ref(product, tree)
    return makefile_version(repo, ref, IMAGE_MAKEFILE), f'{repo}@{ref}'


def chart_version(product, tree):
    repo, ref = PRODUCTS[product], code_ref(product, tree)
    try:
        return makefile_version(repo, ref, 'operator/Makefile'), f'{repo}@{ref}'
    except NotFound:
        pass
    match = VALUES_OPERATOR_VERSION.search(read_file(repo, ref, OPERATOR_VALUES))
    if not match:
        raise RuntimeError(f'No tigeraOperator version in {repo}@{ref}:{OPERATOR_VALUES}')
    operator_ref = match.group(1).strip('\'"')
    return makefile_version(OPERATOR_REPO, operator_ref, 'Makefile'), f'{OPERATOR_REPO}@{operator_ref}'


def docs_pages(tree):
    return {str(page.relative_to(REPO_ROOT)): page.read_text() for page in sorted(tree.rglob('*.md*'))}


def docs_envoy_variable(tree):
    """Return (value, file) for envoyVersion, or (None, None) if neither file defines it."""
    for variables in (tree / 'variables.js', REPO_ROOT / 'variables.js'):
        match = DOCS_VARIABLE.search(variables.read_text())
        if match:
            return match.group(1), str(variables.relative_to(REPO_ROOT))
    return None, None


def tree_checks(product, tree):
    """Yield (check, subject, stated, expected callable) for every docs value in the tree.

    The expected callable returns (version, source) and may raise, so that a
    lookup failure is reported against one check instead of stopping the run.
    """
    pages = docs_pages(tree)
    stated, variables = docs_envoy_variable(tree)
    if stated is not None:
        yield 'envoyVersion', variables, stated, lambda: image_version(product, tree)
    else:
        for page, text in pages.items():
            if DOCS_VARIABLE_USE.search(text):
                yield 'envoyVersion', page, 'undefined', lambda: ('defined in variables.js', 'docs')
    for page, text in pages.items():
        if DOCS_CHART_LABEL.search(text):
            versions = set(DOCS_CHART_LABEL.findall(text)) | set(DOCS_VERSION_LABEL.findall(text))
            yield 'chart labels', page, ','.join(sorted(versions)), lambda: chart_version(product, tree)


def tree_name(tree):
    return str(tree.relative_to(REPO_ROOT))


class EnvoyVersionTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        check_repo_access()

    def test_docs_match_code(self):
        for product, _, tree in docs_trees():
            with self.subTest(tree=tree_name(tree)):
                for check, subject, stated, expected in tree_checks(product, tree):
                    with self.subTest(check=check, subject=subject):
                        version, source = expected()
                        self.assertEqual(stated, version, f'{check} in {subject} vs {source}')


def print_table():
    check_repo_access()
    header = ('docs', 'check', 'subject', 'stated', 'expected', 'source', '')
    rows, errors = [], []
    for product, version, tree in docs_trees():
        try:
            checks = list(tree_checks(product, tree))
        except Exception as e:  # noqa: BLE001 - report every tree
            checks = []
            errors.append(f'{product} {version}: {e}')
            rows.append((f'{product} {version}', '-', '-', '-', '-', '-', 'ERROR'))
        for check, subject, stated, expected in checks:
            try:
                want, source = expected()
                status = 'ok' if stated == want else 'MISMATCH'
            except Exception as e:  # noqa: BLE001
                want, source, status = '-', '-', 'ERROR'
                errors.append(f'{product} {version} {check} {subject}: {e}')
            rows.append((f'{product} {version}', check, Path(subject).name, stated, want, source, status))
    widths = [max(len(r[i]) for r in rows + [header]) for i in range(len(header))]
    for row in [header] + rows:
        print('  '.join(cell.ljust(w) for cell, w in zip(row, widths)).rstrip())
    for error in errors:
        print(error, file=sys.stderr)
    return all(r[-1] == 'ok' for r in rows)


if __name__ == '__main__':
    if '--table' in sys.argv:
        sys.exit(0 if print_table() else 1)
    unittest.main(verbosity=2)
