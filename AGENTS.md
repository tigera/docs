# Agent instructions

This file is for AI coding agents working in this repository.
The repository is the source for docs.tigera.io: Calico Open Source, Calico Enterprise, and Calico Cloud, built with Docusaurus 3.
[README.md](README.md) covers setup, every make target, the project structure, and troubleshooting.
Read it instead of expecting that here.

## Verify your work

Run `corepack enable` and `yarn install` once.
The `make` targets do that for you.

- `yarn build` builds every released version in three to four minutes and fails on a broken internal link.
- `make build-next` also builds the unreleased `calico/`, `calico-enterprise/`, and `calico-cloud/` trees.
  Use it when you changed those.
- `yarn test:components` runs the Jest unit tests.
  It also fails when a lifecycle notice on a page disagrees with `data/feature-status.yaml`.
- `yarn jest <path-to-test-file>` runs one test file.
- `make vale PRODUCT=calico` lints the prose in one product tree with Vale.
  It needs Docker, and it flags every `$[variable]` as a spelling error, so read past those.
  CI masks the variables before it runs the same check.
- `make test` serves an existing `build/` directory and crawls it for broken links.

Before you say a change is done, run the build that covers the trees you changed, and say what you ran.

## Where changes go

Every version lives on `main`.
There are no version branches.

- `calico/`, `calico-enterprise/`, and `calico-cloud/` are the next, unreleased version.
  New and changed features go there.
- `*_versioned_docs/version-X/` trees are released versions.
  A fix to released docs goes in each affected version tree, and in the unreleased tree if the problem is still there.
- Features usually flow from Open Source to Enterprise to Cloud.
  When you document an Open Source feature, check whether the Enterprise and Cloud trees need the same change.
  `calicoctl` is not used with Calico Cloud.
- `use-cases/` holds pages that span products.
- `contributors/` is guidance for people who write the docs.
  It is not built into the site.

## Writing conventions

Follow the [style guide](contributors/style-guide.md).
It covers one sentence per line, variables, partials, placeholders, admonitions, headings, front matter, and the word list.

These rules break the build or a test when you miss them:

- Partials start with `_` and live in each tree's `_includes/` directory.
  The build doesn't render files that start with `_` as pages.
- Every page sets `content_type` in its front matter to one of the values listed in `docusaurus.config.js`.
  The build fails on any other value.
- Technology preview and deprecation notices come from one component.
  Set `lifecycle_status` in the front matter, or place `<LifecycleNotice>` in the body.
  Never write that admonition by hand.
  See [Feature status](contributors/feature-status.md).

## Boundaries

Never:

- Edit `reference/installation/_api.mdx` in any tree.
  `make autogen` generates it from tigera/operator.
- Add content for a new feature to a `*_versioned_docs` tree.
- Restructure an existing page to fit a content type unless the person asks you to.
- Write a technology preview or deprecation admonition by hand.

Ask first:

- Before you create more than one page for a request.
- Before you change `variables.js`, `releases.json`, `docusaurus.config.js`, or a `*_versions.json` file.
- Before you open a pull request.

## Commits and pull requests

- PR title: `DOCS-NNNN: Do something`, where DOCS-NNNN is the Jira ticket.
- Keep the description short: one sentence on what changed, the Jira link, and links to the changed pages on the deploy preview.
  Use body text, lists, and links only.
- Unreleased trees preview at `https://deploy-preview-<PR>--calico-docs-preview-next.netlify.app/<product>/next/<path>`.
  If many pages changed in the same way, link representative ones.
- Never name customers.
  Refer to people by GitHub handle only.
- A subject matter expert and a docs team member must approve a PR before it merges.

## Writing a new page

Follow this section only when you create a new documentation page: a new `.md` or `.mdx` file under `calico/`, `calico-enterprise/`, `calico-cloud/`, or `use-cases/`.

It doesn't apply when you:

- Edit, correct, or add to an existing page.
- Copy an existing page to another product or version.
- Move or rename a page.
- Create a partial, such as a file whose name starts with `_`.

In those cases, keep the page's existing title, headings, and structure.
Don't restructure an existing page to fit a content type unless the person asks you to.

### Choose a content type

Every new page has one content type, chosen for what the reader is trying to do.
Read [content-types.md](contributors/content-types/content-types.md) and choose a type: how-to, explanation, tutorial, reference, installation guide, or troubleshooting.
If the request covers more than one type, such as steps plus a long explanation of how a feature works, suggest separate pages and ask before you write them.
If you can't tell which type fits, ask.

### Start from the template

Copy the template for that type from [contributors/content-types/templates/](contributors/content-types/templates/), and fill it in.

- Keep every section marked REQUIRED.
  Include RECOMMENDED sections unless there's nothing to say, and OPTIONAL sections only when they help the reader.
- Follow the guidance in each comment, then delete the comment.
  You can keep the user story comment.
- Keep the `content_type` value that the template sets in the front matter.
- Check the page against the reviewer checklist at the end of the template, then delete the checklist.

When you finish, tell the person which content type you used and why.
