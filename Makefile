GO_BUILD_VER?=v0.74
CALICO_BUILD?=calico/go-build:$(GO_BUILD_VER)
LOCAL_USER_ID?=$(shell id -u $$USER)
PACKAGE_NAME?=github.com/projectcalico/calico/calico
API_GEN_REPO?=tmjd/gen-crd-api-reference-docs
API_GEN_BRANCH?=kb_v2
OPERATOR_VERSION?=v1.28.1
OPERATOR_REPO?=tigera/operator
PRODUCT?=calico

build: init
	yarn build

.PHONY: start
start: init
	yarn start

.PHONY: test
test: init
	./scripts/serve-test.sh

.PHONY: redirects-test
redirects-test: init
	yarn test __tests__/redirects.test.js

.PHONY: clear clean
clear clean:
	yarn clear

.PHONY: init
init:
	yarn install

.PHONY: serve
serve: build
	yarn serve

.PHONY: autogen
autogen:
	PRODUCT=calico $(MAKE) build-operator-reference
	PRODUCT=calico-enterprise $(MAKE) build-operator-reference
	PRODUCT=calico-cloud $(MAKE) build-operator-reference

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
