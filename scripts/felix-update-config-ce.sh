#!/usr/bin/env bash

###############################################################################
#                                                                             #
#   felix-update-config-ce.sh                                                 #
#   Created: 2026-02-05                                                       #
#                                                                             #
#   Description: Synchronizes Felix configuration JSON files from GitHub     #
#   repos into local documentation paths for Calico Enterprise versions.      #
#                                                                             #
###############################################################################

# --- Safety & Environment ---
# -e: Exit on error | -u: Exit on unset vars | -o pipefail: Pipeline error catch
set -euo pipefail

# --- Global Constants (No Magic Numbers) ---
readonly SUCCESS=0
readonly E_MISSING_TOKEN=1
readonly E_INVALID_JSON=2
readonly VERSIONS_FILE="calico-enterprise_versions.json"

# --- Global Variables ---
VERSIONS=($(jq -r '.[]' "$VERSIONS_FILE"))
CLEANUP_FILES=() # Array to track temp files for Option 1 cleanup

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

# Register the cleanup function to run on EXIT
trap cleanup EXIT

# --------------------------------------------------------------------------- #
# update_felix_config()                                                       #
# Downloads a remote JSON file and replaces a local target file.              #
# Parameters: Uses global $VERSION, $LOCAL_PATH, and $REMOTE_URL.             #
# --------------------------------------------------------------------------- #
update_felix_config() {
    local tmpfile
    tmpfile=$(mktemp -t remote-url-output.XXXXXX)

    # Track this file in the global cleanup array
    CLEANUP_FILES+=("$tmpfile")

    printf "%s\n\n" "Begin processing $VERSION"
    printf "%s\n" "Target path: $LOCAL_PATH"
    printf "%s\n" "Source URL: $REMOTE_URL"

    curl -fsSL \
          -H "Authorization: token $GITHUB_TOKEN" \
          -H "Accept: application/vnd.github.v3.raw" \
          -o "$tmpfile" \
          "$REMOTE_URL"

    # Validate JSON integrity before overwriting local files
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
# update_master()                                                             #
# Specific logic for updating from the master branch.                         #
# --------------------------------------------------------------------------- #
update_master () {
    VERSION="master"
    LOCAL_PATH="calico-enterprise/_includes/components/FelixConfig/config-params.json"
    REMOTE_URL="https://api.github.com/repos/tigera/calico-private/contents/felix/docs/config-params.json?ref=master"
    update_felix_config
}

# --------------------------------------------------------------------------- #
# update_versions()                                                           #
# Iterates through versions to update versioned documentation branches.       #
# --------------------------------------------------------------------------- #
update_versions() {
    local i
    local branch
    local base_version

    for i in "${!VERSIONS[@]}"; do
        VERSION="${VERSIONS[$i]}"
        base_version="${VERSION%-*}"

        # Logic to determine branch name based on version suffix
        if [[ "$VERSION" == *"-2" ]]; then
            branch="release-calient-v${base_version}"
        elif [[ "$VERSION" == *"-1" ]]; then
            branch="release-calient-v${base_version}-1"
        else
            branch="release-v${VERSION}"
        fi

        LOCAL_PATH="calico-enterprise_versioned_docs/version-${VERSION}/_includes/components/FelixConfig/config-params.json"
        REMOTE_URL="https://api.github.com/repos/tigera/calico-private/contents/felix/docs/config-params.json?ref=${branch}"

        # Skip logic for specific version (v3.20 transition)
        if [[ "$VERSION" == "3.20-2" ]]; then
            printf "%s\n" "Skipping $VERSION: No action required."
            continue
        fi

        update_felix_config
    done
}

# --- Main Logic ---

# 1. Validate Environment
# The ${VAR:-} syntax prevents 'unbound variable' errors during the check
if [[ -z "${GITHUB_TOKEN:-}" ]]; then
    echo "Error: GITHUB_TOKEN is not set." >&2
    exit "$E_MISSING_TOKEN"
fi

# 2. Print found versions
printf "Versions to process: %s\n" "${VERSIONS[*]}"

# 3. Execute Updates
update_master
update_versions

printf "%s\n" "All updates are complete."
exit "$SUCCESS"