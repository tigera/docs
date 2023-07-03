GO_BUILD_VER?=v0.74
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

build: init
	$(YARN) build

.PHONY: start
start: init
	$(YARN) start$(YARN_ACTION_SUFFIX)

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
netlify: build run-update-cloud-image-list test

.PHONY: all
all: full run-update-cloud-image-list test

.PHONY: index
index:
	@echo -n "CONFIG=" >.env.local
	@cat algolia-crawler-config.json | jq -r tostring >>.env.local
	docker run -it -e APPLICATION_ID -e API_KEY --env-file=.env.local algolia/docsearch-scraper

.PHONY: autogen
autogen:
	PRODUCT=calico $(MAKE) build-operator-reference
	PRODUCT=calico-enterprise $(MAKE) build-operator-reference
	PRODUCT=calico-cloud $(MAKE) build-operator-reference
	PRODUCT=calico-cloud make build-ia-operator-reference

.PHONY: build-operator-reference
build-operator-reference:
	mkdir -p .go-pkg-cache && \
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
					sed -i "s|<br>|<br/>|g" /go/src/$(PACKAGE_NAME)/$(PRODUCT)/reference/installation/_api.mdx'

GIT_CONFIG_SSH ?= git config --global url."ssh://git@github.com/".insteadOf "https://github.com/";

build-ia-operator-reference:
	mkdir -p .go-pkg-cache && \
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
					sed -i "s|<br>|<br/>|g" /go/src/$(PACKAGE_NAME)/$(PRODUCT)/reference/installation/_ia-api.mdx'

update-cloud-image-list:
	@if [ -z "${RUN_UPDATE_CLOUD_IMAGE_LIST}" ]; then echo "Use 'make run-update-cloud-image-list' instead"; false; fi
	sed -i  '/^\$$INSTALLER_IMAGE/,/^)/{/^\$$/!{/^)/!d}}' $(PRODUCT)/get-started/connect/setup-private-registry.mdx
	dl=$$(cat $(PRODUCT)/variables.js | grep clouddownloadurl | sed -e "s/^[^']*'\([^']*\)'.*$$/\1/" ) && \
	curl -O $$dl/image-list && \
	sed -i -e "/^\$$INSTALLER_IMAGE/r image-list" $(PRODUCT)/get-started/connect/setup-private-registry.mdx
	rm -f image-list

run-update-cloud-image-list:
	RUN_UPDATE_CLOUD_IMAGE_LIST=1 PRODUCT=calico-cloud make update-cloud-image-list
	for x in $$(ls calico-cloud_versioned_docs/); do \
		RUN_UPDATE_CLOUD_IMAGE_LIST=1 PRODUCT=calico-cloud_versioned_docs/$$x make update-cloud-image-list; \
	done
	@if [ "$$(git diff --stat ./calico-cloud*/**/get-started/connect/setup-private-registry.mdx)" != "" ]; then \
	echo "You might need to run 'make run-update-cloud-image-list' and commit the changes"; exit 1; fi
