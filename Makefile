## This Makefile includes rules for building the docs site, as well as
## utility rules for updating the Operator API docs.
##
## To build the docs site, these rules are the most interesting:
##
## init  - initializes the local environment
## build - builds the site (implies init)
## serve - starts a web server to serve the site (implies serve)
## clean - removes the build artifacts
##
## To update the operator docs, these rules are the most interesting:
##
## autogen - Automatically detects all branches for Calico, Calico
##           Enterprise, and Calico Cloud, and updates them one by
##           one
## autogen_calico / autogen_enterprise / autogen_cloud
##         - As above, but only for that category of branch (but all
##           versions of that branch)
## show_current_branches
##         - Outputs all of the branch-related targets that you can
##           use to update a specific branch's operator docs.

PRODUCT?=calico

NODE_VER=22

ifeq ($(OS),Windows_NT)
BUILDARCH = x86_64
BUILDOS = Windows
else
BUILDOS ?= $(shell uname -s)
BUILDARCH ?= $(shell uname -m)
endif

# macOS ships with FreeBSD's sed, which requires a parameter to the -i flag;
# meanwhile, Linux ships with GNU sed which does not accept a (separate) parameter.
# This means there's no cross-platform way to call sed -i, so we can put this here
# I guess.
ifeq ($(BUILDOS),Darwin)
SED_INPLACE = sed -i ''
else
SED_INPLACE = sed -i
endif

YARN=yarn
YARN_ACTION_SUFFIX=
ifeq ($(CONTAINERIZED),true)
	YARN=docker run --name docs-node -u node -it --rm -v "$(shell pwd):/docs" -v "$(shell pwd)/container.yarnrc.yml:/docs/.yarnrc.yml" -p 127.0.0.1:3000:3000 -w /docs node_with_corepack:$(NODE_VER) yarn
YARN_ACTION_SUFFIX=-container
endif

# Generate a list of all the calico/ent/cloud branches (including the 'unversioned' docs, which
# represent the `next` branch.
CALICO_BRANCHES=calico__operator_reference $(addsuffix __operator_reference,$(wildcard calico_versioned_docs/*))
CALICO_ENT_BRANCHES=calico-enterprise__operator_reference $(addsuffix __operator_reference,$(wildcard calico-enterprise_versioned_docs/*))
CALICO_CLOUD_BRANCHES=calico-cloud__operator_reference $(addsuffix __operator_reference,$(wildcard calico-cloud_versioned_docs/*))

build: init
	$(YARN) build

build-next: init
	$(YARN) build-next

.PHONY: start
start: init
	$(YARN) start$(YARN_ACTION_SUFFIX)

.PHONY: start-next
start-next: init
	$(YARN) start-next$(YARN_ACTION_SUFFIX)

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

.PHONY: serve
serve: build
	$(YARN) serve$(YARN_ACTION_SUFFIX)

.PHONY: serve-next
serve-next: build-next
	$(YARN) serve$(YARN_ACTION_SUFFIX)

.PHONY: full
full: clean build

.PHONY: netlify
netlify: build test

.PHONY: all
all: clear full test

.PHONY: index
index:
	@echo -n "CONFIG=" >.env.local
	@cat algolia-crawler-config.json | jq -r tostring >>.env.local
	docker run -it -e APPLICATION_ID -e API_KEY --env-file=.env.local algolia/docsearch-scraper

.PHONY: $(CALICO_BRANCHES) $(CALICO_ENT_BRANCHES) $(CALICO_CLOUD_BRANCHES)
# This represents the list of branches  for Calico and Calico Enterprise,
# which need the `build-crd-reference-docs` target executed.
$(CALICO_BRANCHES) $(CALICO_ENT_BRANCHES) $(CALICO_CLOUD_BRANCHES): %__operator_reference : %
	@PRODUCT=$< $(MAKE) --no-print-directory build-crd-reference-docs

# This breaks up automatic generation by the three product
# categories - OSS, cloud, and enterprise - but also retains
# the `autogen` target, which updates all three.
# 
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

scripts/versions/format-versions: scripts/versions/go.* scripts/versions/main.go
	$(MAKE) -C scripts/versions

#Note this should not have the `v` prefix
CRD_REF_DOCS_VER=0.2.0
CRD_DOC_GENERATOR=.bin/crd-ref-docs.$(CRD_REF_DOCS_VER)
$(CRD_DOC_GENERATOR):
	@mkdir -p .bin
	@curl -fsSL --retry 5 -o .bin/crd-ref-docs.$(CRD_REF_DOCS_VER).tar.gz https://github.com/elastic/crd-ref-docs/releases/download/v$(CRD_REF_DOCS_VER)/crd-ref-docs_$(CRD_REF_DOCS_VER)_$(BUILDOS)_$(BUILDARCH).tar.gz
	@cd .bin && tar -xvf crd-ref-docs.$(CRD_REF_DOCS_VER).tar.gz crd-ref-docs
	@mv .bin/crd-ref-docs $@

.PHONY .SILENT: build-crd-reference-docs
build-crd-reference-docs: $(CRD_DOC_GENERATOR)
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
		$(SED_INPLACE) 's/<br \/>/ /g' $(PRODUCT)/reference/installation/_api.mdx
		$(SED_INPLACE) 's/ \(WARNING:\)/<br \/>\1/g' $(PRODUCT)/reference/installation/_api.mdx
		$(SED_INPLACE) 's/ \(Default:\)/<br \/>\1/g' $(PRODUCT)/reference/installation/_api.mdx
		$(SED_INPLACE) 's/ \(Supported values are:\)/<br \/>\1/g' $(PRODUCT)/reference/installation/_api.mdx

# This allow generating the components version for a specific product
# NOTE: currently only implemented for calico-enterprise; there is validation in the script to check this
# If you want to use a different product branch from the default, specify GIT_VERSION_REF
# 	e.g. for new versions of v3.18.0-1, GIT_VERSION_REF=3.18-1
# If you want to use a different doc folder from the default, specify DOCS_VERSION_STREAM
# 	e.g. for new versions of v3.18.0-2, DOCS_VERSION_STREAM=3.18-2
# NOTE: this only updates releases.json; update the folder's variables.js by hand

VERSION_ALL_VERSIONS=$(foreach version,$(wildcard calico-enterprise_versioned_docs/*),version/autogen/$(version:calico-enterprise_versioned_docs/version-%=%))

# This target updates *the current versions* based on what is present in calico-private. It will
# not (to my knowledge) add a new version which has not yet been added to the docs.
version/updateall: $(VERSION_ALL_VERSIONS)
	$(info [info] All current versions have been updated, but please check `git diff` to ensure the values are correct!)

version/autogen/%:
	$(info Building $@)
	@$(MAKE) --no-print-directory version/autogen \
		PRODUCT=calico-enterprise \
		DOCS_VERSION_STREAM=$* \
		VERSION=$(shell jq -r '.[0].title' calico-enterprise_versioned_docs/version-$*/releases.json)

version/autogen: scripts/versions/format-versions
	$(if $(GITHUB_TOKEN),,$(error GITHUB_TOKEN is not set or empty, but is required))
	$(if $(PRODUCT),,$(error PRODUCT is not set or empty, but is required))
	$(if $(VERSION),,$(error VERSION is not set or empty, but is required))
	@./scripts/update-component-versions.sh

.PHONY: vale
# Run vale against the specified PRODUCT. There will probably be lots of failures
# because there needs to be a general review and update to resolve all the existing issues.
# Vale is currently used to test new changes.
vale:
	docker run --rm \
		-v $(CURDIR):/docs \
		-w /docs/$(PRODUCT) jdkato/vale .

# --------------------------------------------------------------------------- #
# Felix Configuration Sync                                                    #
# --------------------------------------------------------------------------- #

.PHONY: update-felix-config
update-felix-config:
	$(if $(GITHUB_TOKEN),,$(error GITHUB_TOKEN is not set or empty, but is required))
	@echo "Updating Felix configurations for OSS, Enterprise, and Cloud..."
	@./scripts/update-felix-config.sh