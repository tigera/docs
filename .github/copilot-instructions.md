# Tigera/Calico Documentation Repository - Copilot Instructions

This repository contains the documentation sites for Calico (Open Source), Calico Enterprise, and Calico Cloud products. It's built using Docusaurus 3 and contains extensive multi-product, multi-version documentation.

## Repository Overview

- **Purpose**: Documentation website for three Calico products with versioned documentation
- **Technology Stack**: Docusaurus 3, React 19, TypeScript, Node.js, Yarn 4
- **Size**: Large repository (~50+ directories, 1000+ files)
- **Build System**: Combination of Makefile targets and Yarn scripts
- **Deployment**: Netlify with preview builds for PRs

## Product Flavors and Documentation Workflow

### Three Calico Product Flavors
This repository documents three distinct flavors of Project Calico:

1. **Calico Open Source** (`calico/` directory)
   - The upstream open source project
   - Base functionality for container and Kubernetes networking and security

2. **Calico Enterprise** (`calico-enterprise/` directory) 
   - Commercial offering with additional enterprise features
   - Builds upon Calico Open Source functionality

3. **Calico Cloud** (`calico-cloud/` directory)
   - SaaS derivative of Calico Enterprise
   - Managed service offering hosted by Tigera

### Feature Flow and Relationships
- **Feature Flow**: New features typically flow from Open Source → Enterprise → Cloud
- **Exception**: The `calicoctl` command-line tool is **not used** with Calico Cloud
- **Documentation Impact**: When documenting new OSS features, they should also be added to `calico-enterprise/` and `calico-cloud/` directories (unless specifically excluded like calicoctl)

### Versioned vs Unversioned Documentation Structure
The repository contains both versioned and unversioned documentation **on the same `main` branch**:

#### Unversioned Directories (Current Development)
- `calico/` - Current development version of Calico OSS
- `calico-enterprise/` - Current development version of Calico Enterprise  
- `calico-cloud/` - Current development version of Calico Cloud

#### Versioned Directories (Released Versions)
- `calico_versioned_docs/` - Previous released versions of Calico OSS
- `calico-enterprise_versioned_docs/` - Previous released versions of Calico Enterprise
- `calico-cloud_versioned_docs/` - Previous released versions of Calico Cloud

### Documentation Workflow Guidelines

#### New Features
- **Target**: Add to **unversioned directories** (`calico/`, `calico-enterprise/`, `calico-cloud/`)
- **Multi-product**: New OSS features should typically be added to all three product directories
- **Rationale**: These become the next release version

#### Backports and Bug Fixes
- **Target**: Add to **versioned directories** (`*_versioned_docs/version-*`)
- **Scope**: Only for fixes that need to be applied to already-released versions
- **Rationale**: Updates existing released documentation

#### Release Process
- At release time, unversioned docs are copied and converted into new versioned directories
- The unversioned directories continue to represent the next development version

### "Next" Build System
The build system uses "**next**" terminology to refer to unversioned documentation:

#### Next Build Targets
```bash
make build-next              # Build unversioned "next" documentation
make start-next              # Start development server with next docs
make serve-next              # Build and serve next docs
```

#### Next Documentation URLs
When running the development server with next docs, access via:
```
http://localhost:3000/<product-flavor>/next/<path-to-specific-doc>
```

Examples:
- `http://localhost:3000/calico/next/getting-started/kubernetes/`
- `http://localhost:3000/calico-enterprise/next/network-policy/`
- `http://localhost:3000/calico-cloud/next/get-started/`

## Critical Setup Requirements

### Node.js Version (CRITICAL)
- **Required**: Node.js v22.17.0 or later
- **Why Critical**: Build fails with earlier versions (tested with v20.x)
- **Setup**: Use nvm if available: `nvm install 22.17.0 && nvm use 22.17.0`

### Package Manager Setup (CRITICAL)
1. **Enable Corepack**: `corepack enable` (required for containerized builds, recommended for local development)
2. **Yarn Version**: 4.9.2 (managed via `packageManager` field in package.json)
3. **Installation**: `yarn install` (expect warnings about React version mismatches - these are non-blocking)
4. **Note**: Corepack ensures consistent yarn versions across environments. While not strictly required for local development on some systems, it's mandatory for containerized builds and highly recommended for consistency.

### Docker Alternative
- All commands support `CONTAINERIZED=true` flag for Docker-based builds
- Requires Docker to be available
- Takes significantly longer but avoids Node version issues

## Build and Development Commands

### Standard Workflow
```bash
# Required setup (run corepack enable first - required for containerized, recommended for local)
corepack enable
yarn install                  # Expect warnings about React versions (non-blocking)

# Development (fast, live reload)
yarn start                    # Local dev server at http://localhost:3000
make start                    # Alternative using Make

# Production build (slow but complete)
yarn build                    # ~2.5-4 minutes, generates build/ directory
make build                    # Alternative using Make
yarn serve                    # Serves built site at http://localhost:3000

# Combined workflow
make init                     # Handles corepack + yarn install automatically
make build && make serve      # Full build and serve
```

### Containerized Workflow (if Node version issues)
```bash
make start CONTAINERIZED=true
make build CONTAINERIZED=true
make serve CONTAINERIZED=true
```

### Next Version Development (Unversioned Docs)
```bash
# Development with unreleased "next" documentation versions
make start-next               # Start dev server with next versions
make serve-next               # Quick build and serve next versions
make build-next && make serve # Full build with next versions
```

These commands build the unversioned documentation (from `calico/`, `calico-enterprise/`, `calico-cloud/` directories) rather than the versioned releases. Use these when working on new features or documentation for the next release.

## Testing Infrastructure

### Unit Tests (Jest)
```bash
yarn test:components          # Run React component tests
yarn test:components:ci       # Silent mode for CI
```

### Screenshot Tests (Playwright)
```bash
yarn build                    # Must build first
yarn test:screenshots         # Run screenshot tests (fail first time)
yarn test:screenshots         # Run again (should pass)
yarn test:show-report         # View test failures
```

### Documentation Linting
- Vale linting runs automatically via GitHub Actions
- Configuration in `.vale.ini` and `.github/styles/`
- No direct yarn/make command for local Vale linting

## Operator API Documentation Updates

### Auto-generation Commands
```bash
make autogen                  # Update all products, all versions
make autogen_calico           # Update only Calico OSS versions  
make autogen_enterprise       # Update only Calico Enterprise versions
make autogen_cloud            # Update only Calico Cloud versions

# List available targets
make show_current_branches    # Shows all branch-specific targets

# Update specific version (example)
make calico-enterprise_versioned_docs/version-3.19-2__operator_reference
```

### Requirements for Operator Updates
- Requires `GITHUB_TOKEN` environment variable
- Requires Docker for the build process
- Can take 10+ minutes per version

## Project Architecture

### Directory Structure
```
calico/                           # Calico OSS current version docs
calico_versioned_docs/            # Calico OSS previous versions
calico-enterprise/                # Calico Enterprise current version
calico-enterprise_versioned_docs/ # Calico Enterprise previous versions
calico-cloud/                     # Calico Cloud current version
calico-cloud_versioned_docs/      # Calico Cloud previous versions
src/                              # Shared React components and utilities
static/                           # Static assets (images, files)
scripts/                          # Build and automation scripts
.github/workflows/                # CI/CD automation
```

### Key Configuration Files
- `docusaurus.config.js` - Main Docusaurus configuration
- `package.json` - Dependencies and scripts
- `Makefile` - Build automation and operator updates
- `playwright.config.js` - Main Playwright test config
- `__screenshot-tests__/playwright.config.ts` - Screenshot test config
- `jest.config.mjs` - Jest unit test configuration
- `tsconfig.json` - TypeScript configuration
- `netlify.toml` - Netlify deployment configuration

## Validation and CI/CD

### GitHub Actions (automatic on PRs)
1. **Vale linting** (`.github/workflows/vale.yml`)
   - Lints all markdown/MDX content  
   - Uses ripgrep to preprocess variable substitutions
   - Requires `mdx2vast` global npm package
2. **React validation** (`.github/workflows/validate.yml`)
   - Runs Jest unit tests with `yarn test:components:ci`

### Netlify Deployment
- **Production**: Builds from main branch using `make netlify`
- **Preview**: Two builds per PR:
  - Full build with production configuration
  - Next-version build for unreleased docs (`calico-docs-preview-next`)

### Local Validation Workflow
```bash
# Complete validation matching CI
corepack enable && yarn install
yarn test:components              # Unit tests (matches GitHub Actions)
yarn build                        # Full build (catches Docusaurus issues)
yarn test:screenshots             # Visual regression tests (optional)
```

### PR Requirements
- SME (Subject Matter Expert) approval required
- Docs team review required  
- Build must complete successfully
- Tests must pass
- Deploy preview must be inspected

## Common Pitfalls and Solutions

### Node Version Issues
- **Problem**: Build fails with "Cannot find package '@docusaurus/logger'"
- **Solution**: Ensure Node.js v22.17.0+, run `corepack enable` first
- **Validation**: `node --version` should show v22.17.0+

### Yarn Issues  
- **Problem**: "packageManager": "yarn@4.9.2" error with global yarn
- **Solution**: Always run `corepack enable` before any yarn commands
- **Expected**: Warnings about React version mismatches are normal and non-blocking

### Clean Build Issues
- **Problem**: `make clean` fails if dependencies not installed
- **Solution**: Use `make manual-clean` to force clean state

### Screenshot Test Issues
- **Problem**: Tests timeout on clean branch
- **Solution**: Run `yarn start`, wait for dev build completion, then cancel

### Environment Switching
- **Problem**: Switching between local and containerized builds
- **Solution**: Run `make manual-clean` when switching modes

### Build Performance
- **Note**: First-time builds are slower due to dependency compilation
- **Expected**: Subsequent builds are faster due to caching

## Time Expectations

- **yarn install**: 30 seconds - 4 minutes (first time), ~10-15 seconds (subsequent)
- **yarn build**: 2.5-4 minutes (varies by system)
- **yarn start**: 30-60 seconds to start
- **yarn test:components**: 2-3 seconds 
- **yarn test:screenshots**: 2-3 minutes  
- **make autogen**: 30+ minutes (all products)
- **Containerized builds**: 2-3x longer than local

## Emergency Recovery

If builds are consistently failing:
```bash
make manual-clean             # Nuclear clean
corepack enable              # Re-enable corepack
yarn install                 # Fresh install
yarn build                   # Test build
```

## Agent Instructions

**Trust these instructions** - they were validated through comprehensive testing. Only search the codebase if:
1. These instructions contain errors you've verified
2. You need specifics about code structure not covered here  
3. You're implementing features requiring deep architectural knowledge

The build process is complex but reliable when following the documented sequence. Always run `corepack enable` first, and expect the initial build to take several minutes.

## Code Quality Standards

### File Organization
- React components use TypeScript (`.tsx` files)
- Shared components in `src/` directory
- Product-specific components in `{product}/_includes/components/`
- Documentation content in `.md` and `.mdx` files

### Style Guidelines
- Prettier configuration in `.prettierrc` (auto-formatting)
- JSX single quotes, 2-space indentation, 120 character line width
- TypeScript configuration in `tsconfig.json` with strict null checks

### Testing Requirements
- All React components should have Jest tests in `__test__/` subdirectories
- Test coverage thresholds: 85% branches/functions, 90% lines/statements  
- Snapshot testing used for component regression detectionctories
- Test coverage thresholds: 85% branches/functions, 90% lines/statements  
- Snapshot testing used for component regression detectionAll React components should have Jest tests in `__test__/` subdirectories
- Test coverage thresholds: 85% branches/functions, 90% lines/statements  
- Snapshot testing used for component regression detectionesting used for component regression detection