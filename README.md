[![Netlify Status](https://api.netlify.com/api/v1/badges/58c3464e-f1ba-4a32-8c6e-0e41fe8e0f45/deploy-status)](https://app.netlify.com/sites/tigera/deploys)
# Calico & Tigera Docs

This is the full set of product docs for Calico & Tigera. It includes our Open Source (Project Calico) docs
as well as our Enterprise and Cloud docs.

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Prerequisites

Either 

* docker (to run the containerised version of the build)

Or

* Node.js v18.18.2+ (v18.18.2 recommended). Use the outstanding [nvm tool](https://github.com/nvm-sh/nvm) to manage your node versions.
* yarn `npm install -g yarn`
* Fork and clone our docs repo <https://github.com/tigera/docs>

## Local Development

```bash
make start 
```
or 
```bash
make start CONTAINERIZED=true
```

This command starts a local development server on http://localhost:3000. Most changes are reflected live without
having to restart the server. This build is faster, but does not produce all the warnings and errors of a full build.

## Full Build & Serve

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

# Updating the Operator API docs

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