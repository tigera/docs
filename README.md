# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## How to work with the new docs site

### Prerequisites

* Install Docusaurus: https://docusaurus.io/docs/installation
* Fork and clone our migration and docs repos:
    - https://github.com/tigera/docs-merge
    - https://github.com/tigera/docs

### Build the site (simplest version)

We use the `alt-main` branch of tigera/docs to run our test build at https://unified-docs.tigera.io.
This branch is manually updated with changes from the main branch, which contains no docs content.
(We don’t want to pollute the git history as we work on the migration script.)
`alt-main` contains everything you need to test the new site and see how it works.
It may be out of date with our work by a few days.

1. Create a local branch that tracks the `alt-main` branch of tigera/docs.
2. From the root directory, run `yarn start` to start a development server.
3. (optional) Run `yarn build` for a full build of the website.
   The static site will be located in the `build/` directory. 
   Run `yarn serve` to serve the site.

### Build the site (more complicated)

For testing with our latest changes, you need to run the migration script `docusuaurus.s`h in tigera/docs-merge and then build the docusaurus site in tigera/docs.

1. Make sure your local clones of tigera/docs and tigera/docs-merge are located in the same directory.
   The script presumes this arrangement and will fail if it can’t find the tigera/docs repo at the same level as docs-merge.
2. In docs-merge, run the `docusarurus.sh` script. After a few minutes, it will copy all the migrated docs content into the appropriate locations in the tigera/docs clone.
3. Change to the docs repo and run yarn start or `yarn build` / `yarn serve` to see the site.

### Other resources

Netlify site: https://app.netlify.com/sites/calico-tigera-docs/overview
