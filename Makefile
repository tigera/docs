# Makefile for the docs site. Run `make help` for the list of targets.
#
# Sections:
#   Site          - build, serve and test the Docusaurus site
#   Search index  - rebuild the Algolia index (run by Semaphore)
#   Lint          - run Vale
#   Operator API  - regenerate reference/installation/_api.mdx from tigera/operator
#   Versions      - refresh a Calico Enterprise stream's releases.json
#   Felix config  - sync the Felix configuration reference JSON

.DEFAULT_GOAL := build

NODE_VER=22

ifeq ($(OS),Windows_NT)
BUILDARCH = x86_64
BUILDOS = Windows
else
BUILDOS ?= $(shell uname -s)
BUILDARCH ?= $(shell uname -m)
endif

# macOS ships BSD sed, which needs an argument to -i; GNU sed does not accept one.
ifeq ($(BUILDOS),Darwin)
SED_INPLACE = sed -i ''
else
SED_INPLACE = sed -i
endif

# Set CONTAINERIZED=true to run yarn inside a node container instead of on the host.
YARN=yarn
YARN_ACTION_SUFFIX=
ifeq ($(CONTAINERIZED),true)
YARN=docker run --name docs-node -u node -it --rm -v "$(CURDIR):/docs" -v "$(CURDIR)/container.yarnrc.yml:/docs/.yarnrc.yml" -p 127.0.0.1:3000:3000 -w /docs node_with_corepack:$(NODE_VER) yarn
YARN_ACTION_SUFFIX=-container
endif

# Targets that work on one docs tree take PRODUCT, e.g. PRODUCT=calico or
# PRODUCT=calico-enterprise_versioned_docs/version-3.24-2. List require-product
# first among a target's prerequisites so the check runs before any download.
.PHONY: require-product
require-product:
	$(if $(PRODUCT),,$(error PRODUCT is not set, e.g. PRODUCT=calico))

# --------------------------------------------------------------------------- #
# Site                                                                        #
# --------------------------------------------------------------------------- #

.PHONY: init
init:
ifeq ($(CONTAINERIZED),true)
	# Create a modified yarnrc for use in the container environment
	cp .yarnrc.yml container.yarnrc.yml
	echo "globalFolder: /docs/.yarn" >> container.yarnrc.yml
	# Build our custom node image that has corepack enabled
	# repeated calls to this will be quick as the layers will be cached
	docker buildx build --build-arg "NODE_VER=$(NODE_VER)" --build-arg "UID=$(shell id -u)" -t node_with_corepack:$(NODE_VER) --load -f Dockerfile.node .
	if [ -f .yarn_type ] && [ "$$(cat .yarn_type)" != "containerized" ]; then $(MAKE) manual-clean; fi
	echo containerized > .yarn_type
else
	if [ -f .yarn_type ] && [ "$$(cat .yarn_type)" != "local" ]; then $(MAKE) manual-clean; fi
	echo local > .yarn_type
endif
	$(YARN) install

.PHONY: start start-next
start: init
	$(YARN) start$(YARN_ACTION_SUFFIX)

start-next: init
	$(YARN) start-next$(YARN_ACTION_SUFFIX)

.PHONY: build build-next
build: init
	$(YARN) build

build-next: init
	$(YARN) build-next

.PHONY: serve serve-next
serve: build
	$(YARN) serve$(YARN_ACTION_SUFFIX)

serve-next: build-next
	$(YARN) serve$(YARN_ACTION_SUFFIX)

# Serves the existing build/ directory and runs the Playwright crawler against it.
.PHONY: test
test: init
	./scripts/serve-test.sh

.PHONY: clear clean
clear clean:
	$(YARN) clear

# manual-clean is for when switching between local yarn commands and containerized
# This is because the new yarn type might not be functional to run the regular clear/clean
# but we need the environment clean to attempt the new yarn type.
.PHONY: manual-clean
manual-clean:
	rm -rf node_modules .yarn .docusaurus build

.PHONY: full
full: clean build

# What Netlify runs for production and deploy-preview builds (see netlify.toml).
.PHONY: netlify
netlify: build test

.PHONY: all
all: clear full test

# --------------------------------------------------------------------------- #
# Search index                                                                #
# --------------------------------------------------------------------------- #

# Run by .semaphore/semaphore.yml. Needs APPLICATION_ID and API_KEY in the environment.
.PHONY: index
index:
	@printf 'CONFIG=' >.env.local
	@jq -r tostring algolia-crawler-config.json >>.env.local
	docker run -it -e APPLICATION_ID -e API_KEY --env-file=.env.local algolia/docsearch-scraper

# --------------------------------------------------------------------------- #
# Lint                                                                        #
# --------------------------------------------------------------------------- #

# Run Vale against one docs tree. Expect many findings on pages that have not
# been reviewed yet; the PR workflow only reports on changed lines.
.PHONY: vale
vale: require-product
	docker run --rm \
		-v $(CURDIR):/docs \
		-w /docs/$(PRODUCT) jdkato/vale .

# --------------------------------------------------------------------------- #
# Operator API reference                                                      #
# --------------------------------------------------------------------------- #

# Note this should not have the `v` prefix
CRD_REF_DOCS_VER=0.2.0
CRD_DOC_GENERATOR=.bin/crd-ref-docs.$(CRD_REF_DOCS_VER)
$(CRD_DOC_GENERATOR):
	@mkdir -p .bin
	@curl -fsSL --retry 5 -o .bin/crd-ref-docs.$(CRD_REF_DOCS_VER).tar.gz https://github.com/elastic/crd-ref-docs/releases/download/v$(CRD_REF_DOCS_VER)/crd-ref-docs_$(CRD_REF_DOCS_VER)_$(BUILDOS)_$(BUILDARCH).tar.gz
	@cd .bin && tar -xvf crd-ref-docs.$(CRD_REF_DOCS_VER).tar.gz crd-ref-docs
	@mv .bin/crd-ref-docs $@

# Regenerates $(PRODUCT)/reference/installation/_api.mdx from the tigera/operator
# tag named in $(PRODUCT)/releases.json.
.PHONY .SILENT: build-crd-reference-docs
build-crd-reference-docs: require-product $(CRD_DOC_GENERATOR)
	$(info )
	$(info Processing docs for $(PRODUCT))
	@rm -rf builder && mkdir builder
	@op_ver=$$(jq ".[0].\"tigera-operator\".version" -r $(PRODUCT)/releases.json) && \
		echo "Checking out operator $$op_ver" && \
		git clone -c advice.detachedHead=false -q --depth=1 -b $$op_ver https://github.com/tigera/operator builder/operator
	$(CRD_DOC_GENERATOR) --source-path=builder/operator/api/v1 \
		--config=$(PRODUCT)/reference/installation/_crd-ref-docs/config.yaml \
		--renderer=markdown --max-depth=20 \
		--templates-dir=$(PRODUCT)/reference/installation/_crd-ref-docs/templates \
		--output-path=builder
	@cp builder/out.md $(PRODUCT)/reference/installation/_api.mdx && \
		$(SED_INPLACE) 's/<br \/>/ /g' $(PRODUCT)/reference/installation/_api.mdx && \
		$(SED_INPLACE) 's/ \(WARNING:\)/<br \/>\1/g' $(PRODUCT)/reference/installation/_api.mdx && \
		$(SED_INPLACE) 's/ \(Default:\)/<br \/>\1/g' $(PRODUCT)/reference/installation/_api.mdx && \
		$(SED_INPLACE) 's/ \(Supported values are:\)/<br \/>\1/g' $(PRODUCT)/reference/installation/_api.mdx

# One <tree>__operator_reference target per docs tree, including the unversioned
# trees that hold the next release.
CALICO_BRANCHES=calico__operator_reference $(addsuffix __operator_reference,$(wildcard calico_versioned_docs/*))
CALICO_ENT_BRANCHES=calico-enterprise__operator_reference $(addsuffix __operator_reference,$(wildcard calico-enterprise_versioned_docs/*))
CALICO_CLOUD_BRANCHES=calico-cloud__operator_reference $(addsuffix __operator_reference,$(wildcard calico-cloud_versioned_docs/*))

.PHONY: $(CALICO_BRANCHES) $(CALICO_ENT_BRANCHES) $(CALICO_CLOUD_BRANCHES)
$(CALICO_BRANCHES) $(CALICO_ENT_BRANCHES) $(CALICO_CLOUD_BRANCHES): %__operator_reference : %
	@PRODUCT=$< $(MAKE) --no-print-directory build-crd-reference-docs

# autogen regenerates every tree; the per-product targets regenerate one product's trees.
# Don't allow parallel jobs (this prevents breaking autogen targets)
# and don't print commands that we run.
.SILENT .NOTPARALLEL .PHONY: autogen autogen_calico autogen_enterprise autogen_cloud
autogen: autogen_calico autogen_enterprise autogen_cloud
autogen_calico: $(CALICO_BRANCHES)
autogen_enterprise: $(CALICO_ENT_BRANCHES)
autogen_cloud: $(CALICO_CLOUD_BRANCHES)

.PHONY: show_current_branches
show_current_branches:
	$(info Calico branch targets:)
	$(foreach CAL_BRANCH,$(CALICO_BRANCHES),$(info * $(CAL_BRANCH)))
	$(info )
	$(info Calico enterprise branch targets:)
	$(foreach CAL_BRANCH,$(CALICO_ENT_BRANCHES),$(info * $(CAL_BRANCH)))
	$(info )
	$(info Calico cloud branch targets:)
	$(foreach CAL_BRANCH,$(CALICO_CLOUD_BRANCHES),$(info * $(CAL_BRANCH)))
	@true

# --------------------------------------------------------------------------- #
# Versions                                                                    #
# --------------------------------------------------------------------------- #

# Refreshes releases.json for a Calico Enterprise stream from calico-private.
# Needs GITHUB_TOKEN, go, yq, jq and bash 4+.
# NOTE: currently only implemented for calico-enterprise; there is validation in the script to check this
# If you want to use a different product branch from the default, specify GIT_VERSION_REF
# 	e.g. for new versions of v3.18.0-1, GIT_VERSION_REF=3.18-1
# If you want to use a different doc folder from the default, specify DOCS_VERSION_STREAM
# 	e.g. for new versions of v3.18.0-2, DOCS_VERSION_STREAM=3.18-2
# NOTE: this only updates releases.json; update the folder's variables.js by hand

scripts/versions/format-versions: scripts/versions/go.* scripts/versions/main.go
	$(MAKE) -C scripts/versions

.PHONY: version/autogen
version/autogen: scripts/versions/format-versions
	$(if $(GITHUB_TOKEN),,$(error GITHUB_TOKEN is not set or empty, but is required))
	$(if $(PRODUCT),,$(error PRODUCT is not set or empty, but is required))
	$(if $(VERSION),,$(error VERSION is not set or empty, but is required))
	@./scripts/update-component-versions.sh

# make version/autogen/3.24-2 refreshes calico-enterprise_versioned_docs/version-3.24-2.
.PHONY: version/autogen/%
version/autogen/%:
	$(info Building $@)
	@$(MAKE) --no-print-directory version/autogen \
		PRODUCT=calico-enterprise \
		DOCS_VERSION_STREAM=$* \
		VERSION=$(shell jq -r '.[0].title' calico-enterprise_versioned_docs/version-$*/releases.json)

VERSION_ALL_VERSIONS=$(foreach version,$(wildcard calico-enterprise_versioned_docs/*),version/autogen/$(version:calico-enterprise_versioned_docs/version-%=%))

# This target updates *the current versions* based on what is present in calico-private. It will
# not (to my knowledge) add a new version which has not yet been added to the docs.
.PHONY: version/updateall
version/updateall: $(VERSION_ALL_VERSIONS)
	$(info [info] All current versions have been updated, but please check `git diff` to ensure the values are correct!)

# --------------------------------------------------------------------------- #
# Felix config                                                                #
# --------------------------------------------------------------------------- #

.PHONY: update-felix-config
update-felix-config:
	$(if $(GITHUB_TOKEN),,$(error GITHUB_TOKEN is not set or empty, but is required))
	@echo "Updating Felix configurations for OSS, Enterprise, and Cloud..."
	@./scripts/update-felix-config.sh

# --------------------------------------------------------------------------- #
# Help                                                                        #
# --------------------------------------------------------------------------- #

.PHONY: help
help:
	@echo "Site"
	@echo "  make start | start-next          dev server (released versions | plus next)"
	@echo "  make build | build-next          production build (released versions | plus next)"
	@echo "  make serve | serve-next          build, then serve build/"
	@echo "  make test                        serve build/ and run the Playwright crawler"
	@echo "  make netlify                     build + test, as Netlify runs it"
	@echo "  make clean | manual-clean        docusaurus clear | remove node_modules, .yarn, .docusaurus, build"
	@echo "  Add CONTAINERIZED=true to run yarn in a container."
	@echo
	@echo "Lint"
	@echo "  make vale PRODUCT=<tree>         run Vale on one docs tree"
	@echo
	@echo "Operator API reference"
	@echo "  make autogen                     regenerate _api.mdx for every tree"
	@echo "  make autogen_calico | autogen_enterprise | autogen_cloud"
	@echo "  make <tree>__operator_reference  one tree; make show_current_branches lists them"
	@echo
	@echo "Versions (needs GITHUB_TOKEN, go, yq, jq, bash 4+)"
	@echo "  make version/autogen/<stream>    refresh releases.json for a Calico Enterprise stream"
	@echo "  make version/updateall           refresh every Calico Enterprise stream"
	@echo
	@echo "Felix config (needs GITHUB_TOKEN)"
	@echo "  make update-felix-config         sync the Felix configuration JSON for all products"
	@echo
	@echo "Search index (Semaphore)"
	@echo "  make index                       rebuild the Algolia index"
