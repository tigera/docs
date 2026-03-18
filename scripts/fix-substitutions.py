#!/usr/bin/env python3
"""
Parse vale-lint-report.md for terms marked 'Substitute', then apply
the replacements across all listed files.

Skips: code fences, inline code (`...`), URLs, image alt text, import lines.

Usage:
    python3 scripts/fix-substitutions.py [--dry-run] [--verbose]
"""

import re
import sys
from collections import defaultdict
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
REPORT = REPO_ROOT / "vale-lint-report.md"

# Patterns to protect
INLINE_CODE_RE = re.compile(r'`[^`]+`')
IMAGE_RE = re.compile(r'!\[([^\]]*)\]\([^)]*\)')
URL_RE = re.compile(r'https?://[^\s)>\]]+')


def parse_report(report_path):
    """Parse report for Substitute entries. Returns [(term, replacement, [files])]."""
    text = report_path.read_text()
    entries = re.split(r'(?=(?:🟢|🟡|🔴)\s*###\s)', text)

    # Manual overrides for entries where the report text wasn't a clean replacement
    OVERRIDES = {
        'dest': 'destination',
    }

    # Skip these — too short/ambiguous for automated replacement, need per-file review
    SKIP_TERMS = {'pre', 'geo', 'ie', 'eg', 'intra', 'sam', 'lvl'}

    substitutions = []

    for entry in entries:
        header_match = re.search(r'###\s+\d+\.\s+`([^`]+)`', entry)
        if not header_match:
            continue
        term = header_match.group(1)

        if term in SKIP_TERMS:
            continue

        # Check if Substitute is selected
        sub_match = re.search(
            r'\[x\s*\]\s+\*\*Substitute\*\*\s*—\s*Replace with:\s*[_]*([^_\n]+?)[_]*\s*$',
            entry, re.MULTILINE
        )
        if not sub_match:
            continue

        replacement = OVERRIDES.get(term)
        if not replacement:
            replacement = sub_match.group(1).strip()
        if not replacement:
            continue

        # Extract file paths
        files = []
        details_match = re.search(r'<details>.*?</details>', entry, re.DOTALL)
        if details_match:
            for m in re.finditer(r'- `([^`]+\.mdx)(?::\d+)?`', details_match.group()):
                files.append(m.group(1))

        files = list(dict.fromkeys(files))  # dedupe

        if files:
            substitutions.append((term, replacement, files))

    return substitutions


def protect_zones(line):
    """Find character ranges to protect."""
    protected = []
    for m in INLINE_CODE_RE.finditer(line):
        protected.append((m.start(), m.end()))
    for m in IMAGE_RE.finditer(line):
        protected.append((m.start(), m.end()))
    for m in URL_RE.finditer(line):
        protected.append((m.start(), m.end()))
    return protected


def is_protected(pos, end, protected):
    for pstart, pend in protected:
        if pos < pend and end > pstart:
            return True
    return False


def apply_sub_in_line(line, term, replacement, case_sensitive=True):
    """Replace term with replacement in a prose line, respecting protected zones."""
    protected = protect_zones(line)

    if case_sensitive:
        pattern = re.compile(r'(?<![`\w/\-])' + re.escape(term) + r'(?![`\w/\-])')
    else:
        pattern = re.compile(r'(?<![`\w/\-])' + re.escape(term) + r'(?![`\w/\-])', re.IGNORECASE)

    result = []
    last_end = 0

    for m in pattern.finditer(line):
        if is_protected(m.start(), m.end(), protected):
            continue
        # Don't replace if inside a markdown heading marker like ###
        # Don't replace if it's part of a longer word via hyphen
        before_char = line[m.start()-1:m.start()] if m.start() > 0 else ''
        after_char = line[m.end():m.end()+1] if m.end() < len(line) else ''
        if before_char in ('/', '-', '.') or after_char in ('/', '.'):
            continue

        result.append(line[last_end:m.start()])
        result.append(replacement)
        last_end = m.end()

    if not result:
        return line
    result.append(line[last_end:])
    return ''.join(result)


def process_file(filepath, subs, dry_run=False, verbose=False):
    """Process a file applying all relevant substitutions."""
    full_path = REPO_ROOT / filepath
    if not full_path.exists():
        if verbose:
            print(f"  SKIP (not found): {filepath}")
        return False

    content = full_path.read_text()
    lines = content.split('\n')

    in_code_fence = False
    result = []
    changed = False

    for line in lines:
        stripped = line.strip()

        # Track code fences
        if stripped.startswith('```'):
            in_code_fence = not in_code_fence
            result.append(line)
            continue

        if in_code_fence:
            result.append(line)
            continue

        # Skip import lines
        if stripped.startswith('import '):
            result.append(line)
            continue

        new_line = line
        for term, replacement in subs:
            new_line = apply_sub_in_line(new_line, term, replacement)

        if new_line != line:
            changed = True
        result.append(new_line)

    if changed:
        new_content = '\n'.join(result)
        if not dry_run:
            full_path.write_text(new_content)
        if verbose:
            print(f"  MODIFIED: {filepath}")
        return True
    else:
        if verbose:
            print(f"  unchanged: {filepath}")
        return False


def main():
    dry_run = '--dry-run' in sys.argv
    verbose = '--verbose' in sys.argv or '-v' in sys.argv

    if dry_run:
        print("DRY RUN — no files will be modified\n")

    print("Parsing report...")
    substitutions = parse_report(REPORT)
    print(f"Found {len(substitutions)} substitution rules:\n")

    for term, replacement, files in substitutions:
        print(f"  '{term}' -> '{replacement}' ({len(files)} files)")

    print()

    # Invert: {file: [(term, replacement)]}
    file_subs = defaultdict(list)
    for term, replacement, files in substitutions:
        for f in files:
            file_subs[f].append((term, replacement))

    print(f"Affecting {len(file_subs)} unique files\n")

    modified = 0
    skipped = 0

    for filepath in sorted(file_subs.keys()):
        subs = file_subs[filepath]
        if verbose:
            print(f"Processing {filepath} ({len(subs)} subs)...")
        if process_file(filepath, subs, dry_run=dry_run, verbose=verbose):
            modified += 1
        else:
            skipped += 1

    print(f"\nDone. Modified: {modified}, Unchanged: {skipped}")
    if dry_run:
        print("(dry run — no files were actually changed)")


if __name__ == '__main__':
    main()
