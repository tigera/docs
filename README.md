Production: [![Netlify Status](https://api.netlify.com/api/v1/badges/58c3464e-f1ba-4a32-8c6e-0e41fe8e0f45/deploy-status)](https://app.netlify.com/sites/tigera/deploys)
vNext: [![Netlify Status](https://api.netlify.com/api/v1/badges/b5b32cd6-5303-4d84-90e8-9379a961a5bf/deploy-status)](https://app.netlify.com/sites/calico-docs-preview-next/deploys)

# Calico & Tigera Docs

This is the full set of product docs for Calico & Tigera. It includes our Open Source (Project Calico) docs
as well as our Enterprise and Cloud docs.

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Prerequisites

Either

* docker (to run the containerised version of the build)

Or

* Node.js v22.17.0+. Use the outstanding [nvm tool](https://github.com/nvm-sh/nvm) to manage your node versions. Run `nvm use` or `nvm install` to use the correct node version.
* yarn `npm install -g yarn`
* Fork and clone our docs repo <https://github.com/tigera/docs>

## Local development

```bash
make start 
```

or

```bash
make start CONTAINERIZED=true
```

This command starts a local development server on http://localhost:3000. Most changes are reflected live without
having to restart the server. This build is faster, but does not produce all the warnings and errors of a full build.

## Full build and serve

```bash
make build
make serve
```

or

```bash
make build CONTAINERIZED=true
make serve CONTAINERIZED=true
```

This command generates static content into the `build` directory and can be served using any static content hosting
service. This is a full build which is exactly what Netlify runs to build the site, therefore, you will get more
warning and error output. If you are trying to reproduce an error on Netlify, this is a great place to start.

## Building the site with unreleased docs versions

In production, we don't build or publish unreleased doc sets.
If you'd like to preview changes to those versions locally, you can run the following commands:

```bash
make serve-next
```

```bash
make build-next
make serve
```

## Viewing changes in preview builds

Each pull request against the `main` branch generates two preview builds.
You can find links to these preview builds as comments from Netlify.

* Deploy preview. A full build with our production configuration.
* Deploy preview for _calico-docs-preview-next_. This builds the site based on the current state of our unversioned development directories:
  * `calico/`
  * `calico-enteprise/`
  * `calico-cloud/`

If you're making changes to an upcoming version of any of the products, review your changes in _calico-docs-preview-next_.

### Viewing your changes locally for unreleased documentation

If you prefer to view changes to unreleased documentation locally, you must modify the `docusaurus.config.js` file.
Add 'current' to the list for `onlyIncludeVersions` for the product docs you want to build.

```js
      {
        id: 'calico',
        path: 'calico',
        routeBasePath: 'calico',
        editCurrentVersion: true,
        onlyIncludeVersions: ['current','3.27','3.26','3.25'], // 'current' is added to build the in-development docs  
        versions: {
          current: {
            label: 'Next',
            path: 'next',
            banner: 'unreleased',
          },
          3.28: {
            label: '3.28 (latest)',
            path: '3.28',
            banner: 'none'
          },
          3.27: {
            label: '3.27 (latest)',
            path: 'latest',
            banner: 'none',
          },

```

With this configuration, run `yarn start` or `yarn build && yarn serve` to see your changes.

## Updating the Operator API docs

This repo includes functionality to automatically update the Operator API docs from the current version of Operator
for each branch. The following Makefile targets will help you update the docs you want to update:

Automatically update all branches for all products:

```bash
make autogen
```

Automatically update all branches for a specific product:

```bash
make autogen_calico         # To update all Calico OSS releases
make autogen_enterprise     # To update all Calico Enterprise releases
make autogen_cloud          # To update all Calico Cloud releases
```

Detect and print a list of all of the makefile targets for each branch for all products. You
can then run one of these targets to update the operator reference specifically for that branch.

```bash
# Get the list of operator reference update targets
❯ make show_current_branches
Calico branch targets:
* calico__operator_reference
* calico_versioned_docs/version-3.25__operator_reference
* calico_versioned_docs/version-3.26__operator_reference
* calico_versioned_docs/version-3.27__operator_reference

Calico enterprise branch targets:
* calico-enterprise__operator_reference
* calico-enterprise_versioned_docs/version-3.16__operator_reference
* calico-enterprise_versioned_docs/version-3.17__operator_reference
* calico-enterprise_versioned_docs/version-3.18__operator_reference
* calico-enterprise_versioned_docs/version-3.18-2__operator_reference
* calico-enterprise_versioned_docs/version-3.19-1__operator_reference

Calico cloud branch targets:
* calico-cloud__operator_reference
* calico-cloud_versioned_docs/version-19-1__operator_reference

# Trigger the operator reference update for Calico Enterprise v3.18
❯ make calico-enterprise_versioned_docs/version-3.18__operator_reference
...build output here...
```

## Testing

### Screenshot tests

Screenshot tests are useful for checking for visual regressions after upgrading dependencies.
The best strategy is to run the tests on a clean branch <u>**before**</u> making changes to gather screenshots of the app in its current state. Then upgrade your dependencies and run the tests again.

#### Running screenshot tests locally

- Run `yarn build`
- Run `yarn test:screenshots`
- All tests will fail on the first pass since there is no existing screenshots
- Run `yarn test:screenshots` again. All tests should pass.
- Make your changes (Deps upgrade etc)
- Run `yarn test:screenshots` to check for visual regressions
- Run `yarn test:show-report` to view failures

#### Troubleshooting

If the tests keep timing out on a clean branch, try running `yarn start`. Cancel once the dev build has completed.
