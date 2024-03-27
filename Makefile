GO_BUILD_VER?=v0.87
CALICO_BUILD?=calico/go-build:$(GO_BUILD_VER)
LOCAL_USER_ID?=$(shell id -u $$USER)
PACKAGE_NAME?=github.com/projectcalico/calico/calico
API_GEN_REPO?=tmjd/gen-crd-api-reference-docs
API_GEN_BRANCH?=kb_v2
OPERATOR_REPO?=tigera/operator
PRODUCT?=calico

IA_OPERATOR_REPO?=tigera/image-assurance
IA_OPERATOR_VERSION?=v1.7.3

NODE_VER=20

YARN=yarn
YARN_ACTION_SUFFIX=
ifeq ($(CONTAINERIZED),true)
YARN=docker run -i --rm -v "$(shell pwd):/docs" -p 127.0.0.1:3000:3000 -w /docs node:$(NODE_VER) yarn
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

.PHONY: init
init:
	$(YARN) install

.PHONY: serve
serve: build
	$(YARN) serve$(YARN_ACTION_SUFFIX)

.PHONY: full
full: clean build

.PHONY: netlify
netlify: build test

.PHONY: all
all: full test

.PHONY: index
index:
	@echo -n "CONFIG=" >.env.local
	@cat algolia-crawler-config.json | jq -r tostring >>.env.local
	docker run -it -e APPLICATION_ID -e API_KEY --env-file=.env.local algolia/docsearch-scraper

.PHONY: $(CALICO_BRANCHES) $(CALICO_ENT_BRANCHES) $(CALICO_CLOUD_BRANCHES)
# This represents the list of branches  for Calico and Calico Enterprise,
# which need the `build-operator-reference` target executed.
$(CALICO_BRANCHES) $(CALICO_ENT_BRANCHES): %__operator_reference : %
	PRODUCT=$< $(MAKE) build-operator-reference 2>&1 | sed 's|^|[$<] |'

# Calico Cloud requires `build-operator-reference` but also requires
# the `build-ia-operator-reference` target to be run as well.
$(CALICO_CLOUD_BRANCHES) : %__operator_reference : %
	PRODUCT=$< $(MAKE) build-operator-reference  2>&1 | sed 's|^|[$<] |'
	PRODUCT=$< $(MAKE) build-ia-operator-reference  2>&1 | sed 's|^|[$<] |'

# This breaks up automatic generation by the three product
# categories - OSS, cloud, and enterprise - but also retains
# the `autogen` target, which updates all three.
.PHONY: autogen autogen_calico autogen_enterprise autogen_cloud
autogen: autogen_calico autogen_enterprise autogen_cloud
autogen_calico: $(CALICO_BRANCHES)
autogen_enterprise: $(CALICO_ENT_BRANCHES)
autogen_cloud: $(CALICO_CLOUD_BRANCHES)

.PHONY: build-operator-reference
build-operator-reference:
	@mkdir -p .go-pkg-cache && \
		docker run --rm \
			--net=host \
			-v $(CURDIR):/go/src/$(PACKAGE_NAME):rw \
			-v $(CURDIR)/.go-pkg-cache:/go/pkg:rw \
			-e LOCAL_USER_ID=$(LOCAL_USER_ID) \
			-w /go/src/$(PACKAGE_NAME) \
			$(CALICO_BUILD) /bin/bash -c '\
			    op_ver=$$(jq ".[0].\"tigera-operator\".version" -r $(PRODUCT)/releases.json) && \
				echo Building reference from operator $$op_ver && \
				rm -rf builder && mkdir builder && cd builder && \
				git clone --depth=1 -b $(API_GEN_BRANCH) https://github.com/$(API_GEN_REPO) api-gen && cd api-gen && \
				go mod edit -replace github.com/tigera/operator=github.com/$(OPERATOR_REPO)@$$op_ver && \
				go mod download all && go build && \
				./gen-crd-api-reference-docs \
					-api-dir github.com/tigera/operator/api \
					-config /go/src/$(PACKAGE_NAME)/$(PRODUCT)/reference/installation/config.json \
					-out-file /go/src/$(PACKAGE_NAME)/$(PRODUCT)/reference/installation/_api.mdx && \
					sed -i "s|<br>|<br/>|g" /go/src/$(PACKAGE_NAME)/$(PRODUCT)/reference/installation/_api.mdx && \
					/go/src/$(PACKAGE_NAME)/scripts/api-jsx.sh /go/src/$(PACKAGE_NAME)/$(PRODUCT)/reference/installation/_api.mdx'

GIT_CONFIG_SSH ?= git config --global url."ssh://git@github.com/".insteadOf "https://github.com/";

build-ia-operator-reference:
	@mkdir -p .go-pkg-cache && \
		docker run --rm \
			--net=host \
			-v $(CURDIR):/go/src/$(PACKAGE_NAME):rw \
			-v $(CURDIR)/.go-pkg-cache:/go/pkg:rw \
			-e LOCAL_USER_ID=$(LOCAL_USER_ID) \
			-e GOPRIVATE=github.com/tigera/* \
			-v /run/user/1000/keyring/ssh:/ssh-agent \
			--env SSH_AUTH_SOCK=/ssh-agent\
			-w /go/src/$(PACKAGE_NAME) \
			$(CALICO_BUILD) /bin/bash -c '$(GIT_CONFIG_SSH) rm -rf builder && mkdir builder && cd builder && \
				git clone --depth=1 -b ia_kb_v2 https://github.com/Brian-McM/gen-crd-api-reference-docs api-gen && cd api-gen && \
				go mod edit -replace github.com/tigera/image-assurance=github.com/$(IA_OPERATOR_REPO)@$(IA_OPERATOR_VERSION) && \
				go mod tidy && go mod download all && go build && \
				./gen-crd-api-reference-docs \
					-api-dir github.com/tigera/image-assurance/operator/api \
					-config /go/src/$(PACKAGE_NAME)/$(PRODUCT)/reference/installation/config.json \
					-out-file /go/src/$(PACKAGE_NAME)/$(PRODUCT)/reference/installation/_ia-api.mdx && \
					sed -i "s|<br>|<br/>|g" /go/src/$(PACKAGE_NAME)/$(PRODUCT)/reference/installation/_ia-api.mdx && \
                    /go/src/$(PACKAGE_NAME)/scripts/api-jsx.sh /go/src/$(PACKAGE_NAME)/$(PRODUCT)/reference/installation/_ia-api.mdx'

update-cloud-image-list:
	@if [ -z "${RUN_UPDATE_CLOUD_IMAGE_LIST}" ]; then echo "Use 'make run-update-cloud-image-list' instead"; false; fi
	sed -i  '/^\$$INSTALLER_IMAGE/,/^)/{/^\$$/!{/^)/!d}}' $(PRODUCT)/get-started/connect/setup-private-registry.mdx
	dl=$$(cat $(PRODUCT)/variables.js | grep clouddownloadurl | sed -e "s/^[^']*'\([^']*\)'.*$$/\1/" ) && \
	curl -O $$dl/image-list && \
	sed -i -e "/^\$$INSTALLER_IMAGE/r image-list" $(PRODUCT)/get-started/connect/setup-private-registry.mdx
	rm -f image-list

# Add this back to the netlify target when the missing windows images are addressed in the image-list
run-update-cloud-image-list:
	RUN_UPDATE_CLOUD_IMAGE_LIST=1 PRODUCT=calico-cloud make update-cloud-image-list
	for x in $$(ls calico-cloud_versioned_docs/); do \
		RUN_UPDATE_CLOUD_IMAGE_LIST=1 PRODUCT=calico-cloud_versioned_docs/$$x make update-cloud-image-list; \
	done
	@if [ "$$(git diff --stat ./calico-cloud*/**/get-started/connect/setup-private-registry.mdx)" != "" ]; then \
	echo "You might need to run 'make run-update-cloud-image-list' and commit the changes"; exit 1; fi

# This allow generating the components version for a specific product
# NOTE: currently only implemented for calico-enterprise; there is validation in the script to check this
# If you want to use a different product branch from the default, specify GIT_VERSION_REF
# 	e.g. for new versions of v3.18.0-1, GIT_VERSION_REF=3.18-1
# If you want to use a different doc folder from the default, specify DOCS_VERSION_STREAM
# 	e.g. for new versions of v3.18.0-2, DOCS_VERSION_STREAM=3.18-2
# If the version to updates is the latest version for the product, specify IS_LATEST=true
# 	e.g. if 3,18,1 is the latest version, IS_LATEST=true
version/autogen:
	$(if $(GITHUB_TOKEN),,$(error GITHUB_TOKEN is not set or empty, but is required))
	$(if $(PRODUCT),,$(error PRODUCT is not set or empty, but is required))
	$(if $(VERSION),,$(error VERSION is not set or empty, but is required))
	./scripts/update-component-versions.sh

# Call the github API. $(1) is the http method type for the https request, $(2) is the repo slug, and is $(3) is for json
# data (if omitted then no data is set for the request). If GITHUB_API_EXIT_ON_FAILURE is set then the macro exits with 1
# on failure. On success, the ENV variable GITHUB_API_RESPONSE will contain the response from github
define github_call_api
	$(eval CMD := curl -f -X$(1) \
		-H "Content-Type: application/json"\
		-H "Authorization: token ${GITHUB_TOKEN}"\
		https://api.github.com/repos/$(2) $(if $(3),--data '$(3)',))
	$(eval GITHUB_API_RESPONSE := $(shell $(CMD) | sed -e 's/#/\\\#/g'))
	$(if $(GITHUB_API_EXIT_ON_FAILURE), $(if $(GITHUB_API_RESPONSE),,exit 1),)
endef

# Create the pull request. $(1) is the repo slug, $(2) is the title, $(3) is the head branch and $(4) is the base branch.
# If the call was successful then the ENV variable PR_NUMBER will contain the pull request number of the created pull request.
define github_pr_create
	$(eval JSON := {"title": "$(2)", "head": "$(3)", "base": "$(4)"})
	$(call github_call_api,POST,$(1)/pulls,$(JSON))
	$(eval PR_NUMBER := $(filter-out null,$(shell echo '$(GITHUB_API_RESPONSE)' | jq '.number')))
endef

release-prep: version/autogen autogen_$(lastword $(subst -, ,$(PRODUCT)))
	$(MAKE) release-prep/create-and-push-branch

GIT_REMOTE?=origin
ifneq ($(if $(GIT_REPO_SLUG),$(shell dirname $(GIT_REPO_SLUG)),), $(shell dirname `git config remote.$(GIT_REMOTE).url | cut -d: -f2`))
GIT_FORK_USER:=$(shell dirname `git config remote.$(GIT_REMOTE).url | cut -d: -f2`)
endif
GIT_PR_BRANCH_BASE?=$(if $(SEMAPHORE),$(SEMAPHORE_GIT_BRANCH),)
GIT_REPO_SLUG?=$(if $(SEMAPHORE),$(SEMAPHORE_GIT_REPO_SLUG),)
RELEASE_UPDATE_BRANCH?=$(if $(SEMAPHORE),semaphore-,)auto-build-updates-$(PRODUCT)-$(VERSION)
GIT_PR_BRANCH_HEAD?=$(if $(GIT_FORK_USER),$(GIT_FORK_USER):$(RELEASE_UPDATE_BRANCH),$(RELEASE_UPDATE_BRANCH))
release-prep/create-and-push-branch:
ifeq ($(shell git rev-parse --abbrev-ref HEAD),$(RELEASE_UPDATE_BRANCH))
	$(error Current branch is pull request head, cannot set it up.)
endif
	-git branch -D $(RELEASE_UPDATE_BRANCH)
	-git push $(GIT_REMOTE) --delete $(RELEASE_UPDATE_BRANCH)
	git checkout -b $(RELEASE_UPDATE_BRANCH)
	git add $(PRODUCT)*/\*_api.mdx $(PRODUCT)*/\*releases.json
	git commit -m "Automatic updates for $(PRODUCT) $(VERSION) release"
	$(GIT) push $(GIT_REMOTE) $(RELEASE_UPDATE_BRANCH)

release-prep/create-pr:
	$(call github_pr_create,$(GIT_REPO_SLUG),[$(GIT_PR_BRANCH_BASE)] $(if $(SEMAPHORE), Semaphore,) Auto Release Update for $(PRODUCT) $(VERSION),$(GIT_PR_BRANCH_HEAD),$(GIT_PR_BRANCH_BASE))
	echo 'Created release update pull request for $(VERSION): $(PR_NUMBER)'
