<p align="center">
  <img src="static/img/Calico-logo-2026-black-text.svg" alt="Calico Documentation" width="400">
</p>

<p align="center">
  <a href="https://app.netlify.com/sites/tigera/deploys"><img src="https://api.netlify.com/api/v1/badges/58c3464e-f1ba-4a32-8c6e-0e41fe8e0f45/deploy-status" alt="Production build status"></a>
  <a href="https://app.netlify.com/sites/calico-docs-preview-next/deploys"><img src="https://api.netlify.com/api/v1/badges/b5b32cd6-5303-4d84-90e8-9379a961a5bf/deploy-status" alt="Next build status"></a>
</p>

# Calico & Tigera Documentation

This repository contains the source for [docs.tigera.io](https://docs.tigera.io), the official documentation for the Calico family of products. It covers networking, security, and observability for Kubernetes across four product editions:

- **Calico Open Source** (`calico/`) — upstream open source networking and security
- **Calico Enterprise** (`calico-enterprise/`) — commercial enterprise offering
- **Calico Cloud** (`calico-cloud/`) — SaaS managed service
- **Calico Cloud Free Tier** (shares the `calico-cloud/` directory)

Built with [Docusaurus 3](https://docusaurus.io/), React 19, and TypeScript. Deployed via Netlify.

## Table of contents

- [Quick start](#quick-start)
- [Build and development commands](#build-and-development-commands)
- [Project structure](#project-structure)
- [Content authoring](#content-authoring)
- [Testing](#testing)
- [Linting and style](#linting-and-style)
- [CI/CD and deployment](#cicd-and-deployment)
- [Operator API documentation](#operator-api-documentation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Getting help](#getting-help)
- [License](#license)

## Quick start

### Prerequisites

|               | Native                                          | Docker            |
|---------------|-------------------------------------------------|-------------------|
| **Requires**  | Node.js v22.17.0+ (see `.nvmrc`), Corepack      | Docker            |
| **Setup**     | `nvm use && corepack enable`                     | Just have Docker running |

This project uses Yarn 4.9.2, managed via [Corepack](https://nodejs.org/api/corepack.html). You must run `corepack enable` before any yarn commands.

### Get running

```bash
# Clone the repo
git clone https://github.com/tigera/docs.git
cd docs

# Native
nvm use && corepack enable
make start         # Dev server at http://localhost:3000

# Or with Docker
make start CONTAINERIZED=true
```

`make start` builds only released documentation versions. To include unreleased (next) versions, use `make start-next` instead.

## Build and development commands

| Command | Description |
|---|---|
| `make start` | Dev server at localhost:3000 (released versions only) |
| `make start-next` | Dev server including unreleased "next" docs |
| `make build` | Full production build |
| `make build-next` | Full build including unreleased docs |
| `make serve` | Build and serve the production site |
| `make serve-next` | Build-next and serve |
| `make clean` | Remove build artifacts |
| `make manual-clean` | Nuclear clean: removes `node_modules`, `.yarn`, `.docusaurus`, `build` |

All commands support `CONTAINERIZED=true` for Docker-based builds (e.g., `make build CONTAINERIZED=true`).

> **Note:** Dependencies are installed automatically when you run any build or start command. When switching between native and containerized builds, the build system detects the change and runs `manual-clean` for you.

## Project structure

```
docs/
├── calico/                              # Calico OSS — next (unreleased) version
├── calico_versioned_docs/               # Calico OSS — released versions (3.29, 3.30, 3.31)
├── calico-enterprise/                   # Enterprise — next (unreleased) version
├── calico-enterprise_versioned_docs/    # Enterprise — released versions (3.20-2 through 3.23-1)
├── calico-cloud/                        # Cloud — next (unreleased) version
├── calico-cloud_versioned_docs/         # Cloud — released versions (22-2)
├── src/
│   ├── components/                      # Shared React components
│   ├── theme/                           # Docusaurus theme overrides
│   ├── remark/                          # Custom remark plugins (variable substitution)
│   └── utils/                           # Utility functions (link checking)
├── scripts/                             # Build automation, version cutting, API doc generation
├── static/                              # Static assets, images, Netlify config
├── docusaurus.config.js                 # Main Docusaurus configuration
└── Makefile                             # Build system entry point
```

### Versioning model

All versions live on the `main` branch — there are no version branches.

- **Unversioned directories** (`calico/`, `calico-enterprise/`, `calico-cloud/`) contain the next unreleased version. These are not built in production; use `make start-next` to preview them.
- **Versioned directories** (e.g., `calico_versioned_docs/version-3.31/`) contain released documentation.
- At release time, unversioned content is copied into new versioned directories using `scripts/cut-new-version.sh`.

**Where to make changes:**

- New features go in unversioned directories.
- Bug fixes to released docs go in the corresponding versioned directory.

### Feature flow

Features typically flow: **Open Source → Enterprise → Cloud**. When documenting new OSS features, they should also be added to the `calico-enterprise/` and `calico-cloud/` directories.

Exception: `calicoctl` is not used with Cloud products.

## Content authoring

### Variables

MDX files use `$[variableName]` tokens that are replaced at build time by a custom remark plugin (`src/remark/variablesPlugin.js`). Variables are defined in `variables.js` files at the root of each product/version directory.

For example:

```mdx
Install $[prodname] version $[version] using the Tigera operator.
```

This renders differently depending on which product directory the file lives in (e.g., "Calico" vs. "Calico Enterprise").

Common variables: `prodname`, `version`, `baseUrl`, `filesUrl`, `registry`, `tigeraOperator`.

### Partials and components

Each product directory contains `_includes/` with reusable content snippets and React components. Shared components live in `src/components/` and are registered in `src/theme/MDXComponents.js` for use in any MDX file.

### Release metadata

Each product/version directory has a `releases.json` file containing component version information used for install instructions, image tags, and download URLs.

## Testing

### Component tests (Jest)

```bash
yarn test:components         # Run unit tests
yarn test:components:ci      # Silent mode for CI
```

Coverage thresholds: 85% branches/functions, 90% lines/statements. Tests live in `__test__/` subdirectories next to the components they test.

### Screenshot tests (Playwright)

Visual regression testing to catch unintended UI changes, especially useful when upgrading dependencies.

The best strategy is to run the tests on a clean branch **before** making changes to gather baseline screenshots, then run them again after your changes to detect regressions.

#### Running screenshot tests locally

1. Run `yarn build`
2. Run `yarn test:screenshots` — all tests will fail on the first pass since no baseline screenshots exist yet
3. Run `yarn test:screenshots` again — all tests should now pass (baselines have been captured)
4. Make your changes (dependency upgrades, etc.)
5. Run `yarn test:screenshots` to check for visual regressions
6. Run `yarn test:show-report` to view failures

> **Tip:** If tests keep timing out on a clean branch, try running `yarn start` first. Cancel once the dev build completes, then re-run the tests.

### Link checking

Internal links are validated at build time — `onBrokenLinks` is set to `'throw'` in `docusaurus.config.js`, so broken links will fail the build.

## Linting and style

### Vale (prose linting)

[Vale](https://vale.sh/) lints markdown and MDX files for style and terminology consistency. It runs automatically on PRs via GitHub Actions.

To run locally (requires Docker):

```bash
make vale PRODUCT=calico
```

Configuration: `.vale.ini`. Custom styles: `.github/styles/CalicoStyle/`. Vale is configured to ignore `$[variableName]` tokens.

### Prettier (code formatting)

Configuration in `.prettierrc`: 2-space indent, 120-character width, single quotes, trailing commas (ES5).

## CI/CD and deployment

### Netlify

Production deploys from `main` to [docs.tigera.io](https://docs.tigera.io).

### PR preview builds

Each pull request generates two Netlify preview builds (links appear as PR comments):

1. **Production preview** — full build with production configuration
2. **Next preview** (`calico-docs-preview-next`) — includes unreleased docs from `calico/`, `calico-enterprise/`, and `calico-cloud/`

Use the "next" preview when reviewing changes to upcoming versions.

### GitHub Actions

Two workflows run on every PR:

- **Vale linting** (`.github/workflows/vale.yml`) — prose style checks with inline PR feedback
- **Component tests** (`.github/workflows/validate.yml`) — Jest unit tests

## Operator API documentation

Operator API reference docs are auto-generated from the [tigera/operator](https://github.com/tigera/operator) repo. Requires Docker and a `GITHUB_TOKEN` environment variable.

```bash
make autogen                 # Update all products, all versions
make autogen_calico          # Calico OSS only
make autogen_enterprise      # Enterprise only
make autogen_cloud           # Cloud only
```

To update a specific product version, list available targets and run one directly:

```bash
make show_current_branches

# Example output:
# Calico branch targets:
# * calico__operator_reference
# * calico_versioned_docs/version-3.29__operator_reference
# * calico_versioned_docs/version-3.30__operator_reference
# * calico_versioned_docs/version-3.31__operator_reference
#
# Calico enterprise branch targets:
# * calico-enterprise__operator_reference
# * calico-enterprise_versioned_docs/version-3.20-2__operator_reference
# * calico-enterprise_versioned_docs/version-3.21-2__operator_reference
# * calico-enterprise_versioned_docs/version-3.22-2__operator_reference
# * calico-enterprise_versioned_docs/version-3.23-1__operator_reference
#
# Calico cloud branch targets:
# * calico-cloud__operator_reference
# * calico-cloud_versioned_docs/version-22-2__operator_reference

# Then run a specific target:
make calico-enterprise_versioned_docs/version-3.22-2__operator_reference
```

## Troubleshooting

| Problem | Solution |
|---|---|
| Build fails with "Cannot find package '@docusaurus/logger'" | Wrong Node version. Need v22.17.0+ (check `.nvmrc`). |
| `packageManager` yarn error | Run `corepack enable` first. |
| `make clean` fails when dependencies aren't installed | Use `make manual-clean` instead. |
| React version mismatch warnings during `yarn install` | Expected and non-blocking. Safe to ignore. |
| Broken internal links fail the build | `onBrokenLinks` is set to `'throw'`. Fix the broken link in the source. |
| Screenshot tests timeout on a clean branch | Run `yarn start` first, cancel once the dev build completes, then re-run tests. |

## Contributing

1. Fork the repo and create a feature branch.
2. Make your changes (see [Content authoring](#content-authoring) and [Project structure](#project-structure) for guidance).
3. Submit a pull request against `main`.

**Guidelines:**

- New features go in unversioned directories. Bug fixes to released versions go in the corresponding versioned directory.
- Features flow: Open Source → Enterprise → Cloud. New OSS features should also be added to Enterprise and Cloud directories.
- Every PR receives two preview builds and is automatically checked by Vale and Jest.

## Getting help

- [Calico documentation](https://docs.tigera.io) — the live site
- [Project Calico community](https://www.tigera.io/project-calico/community)
- [GitHub](https://github.com/projectcalico)
- [Calico on Stack Overflow](https://stackoverflow.com/questions/tagged/calico)
- [Tigera support portal](https://support.tigera.io/) (Enterprise and Cloud customers)
- [Report a security vulnerability](https://www.tigera.io/vulnerability-disclosure)

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.
