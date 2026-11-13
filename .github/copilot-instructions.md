# Copilot instructions

This repository is the source for docs.tigera.io, built with Docusaurus 3.

[AGENTS.md](../AGENTS.md) holds the rules for coding agents: how to verify work, where changes go, writing conventions, boundaries, and pull request rules.
Follow it.
[README.md](../README.md) covers setup, every make target, the project structure, and troubleshooting.

## Environment

- The Node.js version is in `.nvmrc`.
  Run `corepack enable` before any `yarn` command, because `package.json` pins Yarn 4.
- `yarn install` prints warnings about React peer versions.
  They are expected.
- Expected times: `yarn install` takes one to four minutes the first time, `yarn build` three to four minutes, `yarn test:components` a few seconds, and `make autogen` thirty minutes or more.
- `CONTAINERIZED=true` on any `make` target runs it in Docker, two to three times slower.

## Checks that run on pull requests

- Vale lints the prose in changed Markdown and MDX files and posts review comments.
  It doesn't block merge.
- `yarn test:components:ci` runs the Jest unit tests.
- Netlify builds two deploy previews: one with released versions only, and one that also includes the unreleased trees.
