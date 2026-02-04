#!/usr/bin/env bash

###############################################################################
#                                                                             #
#   felix-update-config-ce.sh                                                 #
#   Created: 2026-02-05                                                       #
#                                                                             #
#   Description: Synchronizes Felix configuration JSON files from GitHub      #
#   repos (OSS & Enterprise) into local documentation paths.                  #
#                                                                             #
###############################################################################

# --- Safety & Environment ---
set -euo pipefail

# --- Global Constants (No Magic Numbers) ---
readonly SUCCESS=0
readonly E_MISSING_TOKEN=1
readonly E_INVALID_JSON=2
readonly VERSIONS_FILE_OSS="calico_versions.json"
readonly VERSIONS_FILE_CE="calico-enterprise_versions.json"

# --- Global Variables ---
VERSIONS_OSS=($(jq -r '.[]' "$VERSIONS_FILE_OSS"))
VERSIONS_CE=($(jq -r '.[]' "$VERSIONS_FILE_CE"))
CLEANUP_FILES=()

# --------------------------------------------------------------------------- #
# cleanup()                                                                   #
# Internal function triggered on script exit to remove all temp files.        #
# --------------------------------------------------------------------------- #
cleanup() {
    local file
    for file in "${CLEANUP_FILES[@]:-}"; do
        if [[ -f "$file" ]]; then
            rm -f "$file"
        fi
    done
}

trap cleanup EXIT

# --------------------------------------------------------------------------- #
# update_felix_config()                                                       #
# Downloads a remote JSON file and replaces a local target file.              #
# --------------------------------------------------------------------------- #
update_felix_config() {
    local tmpfile
    tmpfile=$(mktemp -t remote-url-output.XXXXXX)
    CLEANUP_FILES+=("$tmpfile")

    printf "%s\n\n" "Begin processing $VERSION"
    printf "%s\n" "Target path: $LOCAL_PATH"
    printf "%s\n" "Source URL: $REMOTE_URL"

    curl -fsSL \
          -H "Authorization: token $GITHUB_TOKEN" \
          -H "Accept: application/vnd.github.v3.raw" \
          -o "$tmpfile" \
          "$REMOTE_URL"

    if jq -e . "$tmpfile" >/dev/null 2>&1; then
        echo "Success: $tmpfile is valid JSON."
    else
        echo "Error: $tmpfile contains invalid JSON." >&2
        exit "$E_INVALID_JSON"
    fi

    mv "$tmpfile" "$LOCAL_PATH"
    printf "%s\n\n\n" "Finished processing $VERSION."
}

# --------------------------------------------------------------------------- #
# OSS Functions                                                               #
# --------------------------------------------------------------------------- #

update_master_OSS () {
    VERSION="master"
    LOCAL_PATH="calico/_includes/components/FelixConfig/config-params.json"
    REMOTE_URL="https://raw.githubusercontent.com/projectcalico/calico/refs/heads/master/felix/docs/config-params.json"
    update_felix_config
}

update_versions_OSS () {
    local -n VERSIONS_ARRAY=$1
    local i
    for i in "${!VERSIONS_ARRAY[@]}"; do
        VERSION="${VERSIONS_ARRAY[$i]}"
        LOCAL_PATH="calico_versioned_docs/version-${VERSION}/_includes/components/FelixConfig/config-params.json"
        REMOTE_URL="https://raw.githubusercontent.com/projectcalico/calico/refs/heads/release-v${VERSION}/felix/docs/config-params.json"

        if [[ "$VERSION" == "3.29" ]]; then
            printf "%s\n" "Skipping $VERSION: No action required."
            continue
        fi

        update_felix_config
    done
}

# --------------------------------------------------------------------------- #
# Enterprise Functions                                                        #
# --------------------------------------------------------------------------- #

update_master_CE () {
    VERSION="master"
    LOCAL_PATH="calico-enterprise/_includes/components/FelixConfig/config-params.json"
    REMOTE_URL="https://api.github.com/repos/tigera/calico-private/contents/felix/docs/config-params.json?ref=master"
    update_felix_config
}

update_versions_CE() {
    local -n VERSIONS_ARRAY=$1
    local i branch base_version

    for i in "${!VERSIONS_ARRAY[@]}"; do
        VERSION="${VERSIONS_ARRAY[$i]}"
        base_version="${VERSION%-*}"

        if [[ "$VERSION" == *"-2" ]]; then
            branch="release-calient-v${base_version}"
        elif [[ "$VERSION" == *"-1" ]]; then
            branch="release-calient-v${base_version}-1"
        else
            branch="release-v${VERSION}"
        fi

        LOCAL_PATH="calico-enterprise_versioned_docs/version-${VERSION}/_includes/components/FelixConfig/config-params.json"
        REMOTE_URL="https://api.github.com/repos/tigera/calico-private/contents/felix/docs/config-params.json?ref=${branch}"

        if [[ "$VERSION" == "3.20-2" ]]; then
            printf "%s\n" "Skipping $VERSION: No action required."
            continue
        fi

        update_felix_config
    done
}

# --- Main Logic ---

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
    echo "Error: GITHUB_TOKEN is not set." >&2
    exit "$E_MISSING_TOKEN"
fi

printf "OSS Versions: %s\n" "${VERSIONS_OSS[*]}"
printf "CE Versions:  %s\n\n" "${VERSIONS_CE[*]}"

update_master_OSS
update_versions_OSS VERSIONS_OSS

update_master_CE
update_versions_CE VERSIONS_CE

printf "%s\n" "All updates are complete."
exit "$SUCCESS"