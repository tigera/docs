GO_BUILD_VER?=v0.74
CALICO_BUILD?=calico/go-build:$(GO_BUILD_VER)
LOCAL_USER_ID?=$(shell id -u $$USER)
PACKAGE_NAME?=github.com/projectcalico/calico/calico
API_GEN_REPO?=tmjd/gen-crd-api-reference-docs
API_GEN_BRANCH?=kb_v2
OPERATOR_VERSION?=v1.28.1
OPERATOR_REPO?=tigera/operator
PRODUCT?=calico

IA_OPERATOR_REPO?=tigera/image-assurance
IA_OPERATOR_VERSION?=v1.5.7-0.dev.0.20230410154742-6850d977e93b

build: init
	yarn build

.PHONY: start
start: init
	yarn start

.PHONY: test
test: init
	./scripts/serve-test.sh

.PHONY: clear clean
clear clean:
	yarn clear

.PHONY: init
init:
	yarn install

.PHONY: serve
serve: build
	yarn serve

.PHONY: full
full: clean build

.PHONY: all
all: full
	-$(MAKE) test

.PHONY: prod
prod: full test

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
			$(CALICO_BUILD) /bin/bash -c 'rm -rf builder && mkdir builder && cd builder && \
				git clone --depth=1 -b $(API_GEN_BRANCH) https://github.com/$(API_GEN_REPO) api-gen && cd api-gen && \
				go mod edit -replace github.com/tigera/operator=github.com/$(OPERATOR_REPO)@$(OPERATOR_VERSION) && \
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
