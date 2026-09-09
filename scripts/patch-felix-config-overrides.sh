#!/usr/bin/env bash

# Patches known-stale upstream Felix config doc text into a freshly-synced
# config-params.json, in place. Overrides are declared in felix-config-overrides.json,
# scoped by NameConfigFile so a patch can never touch an unrelated field that happens
# to share the same description text.
#
# Called from update_felix_config() in update-felix-config.sh, after the fetched file
# has been validated as JSON and before it replaces the checked-in copy.

set -euo pipefail

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly OVERRIDES_FILE="${SCRIPT_DIR}/felix-config-overrides.json"

if [[ $# -ne 1 ]]; then
    echo "Usage: $(basename "${BASH_SOURCE[0]}") <target-json-file>" >&2
    exit 1
fi

target=$1
patched=""

cleanup() {
    [[ -n "$patched" && -f "$patched" ]] && rm -f "$patched"
}
trap cleanup EXIT

if [[ ! -f "$target" ]]; then
    echo "Error: target file not found: $target" >&2
    exit 1
fi

if ! jq -e . "$target" >/dev/null 2>&1; then
    echo "Error: $target is not valid JSON." >&2
    exit 1
fi

if [[ ! -f "$OVERRIDES_FILE" ]]; then
    echo "Error: overrides file not found: $OVERRIDES_FILE" >&2
    exit 1
fi

if ! jq -e . "$OVERRIDES_FILE" >/dev/null 2>&1; then
    echo "Error: $OVERRIDES_FILE is not valid JSON." >&2
    exit 1
fi

# --- Report what each override did: applied, already unnecessary, or no longer matches ---
while IFS=$'\t' read -r status field key reason; do
    case "$status" in
        patched)
            echo "NOTICE: patched ${field}.${key} (${reason})"
            ;;
        already-correct)
            echo "WARNING: override for ${field}.${key} is a no-op -- upstream text already matches. Safe to remove from ${OVERRIDES_FILE}. (${reason})" >&2
            ;;
        stale)
            echo "WARNING: override for ${field}.${key} did not apply -- upstream text matches neither the known-buggy nor the corrected value. Needs review in ${OVERRIDES_FILE}. (${reason})" >&2
            ;;
    esac
done < <(jq -r --slurpfile overrides "$OVERRIDES_FILE" '
    $overrides[0] as $ovs
    | [ .Groups[].Fields[] as $f
        | $ovs[] as $ov
        | select($ov.field == $f.NameConfigFile)
        | $ov.patches[] as $p
        | ($f[$p.key]) as $cur
        | { status: (if $cur == $p.expected then "patched"
                     elif $cur == $p.value then "already-correct"
                     else "stale" end),
            field: $ov.field, key: $p.key, reason: $ov.reason }
      ]
    | .[]
    | [.status, .field, .key, .reason] | @tsv
' "$target")

# --- Apply the patches: field-scoped by NameConfigFile, key-scoped by an expected-value guard ---
patched=$(mktemp -t felix-config-patched.XXXXXX)
jq --slurpfile overrides "$OVERRIDES_FILE" '
    $overrides[0] as $ovs
    | .Groups |= map(.Fields |= map(
        . as $f
        | reduce ($ovs[] | select(.field == $f.NameConfigFile)) as $ov
            ( $f
            ; reduce ($ov.patches[]) as $p
                ( .
                ; if (.[$p.key] == $p.expected) then .[$p.key] = $p.value else . end
                )
            )
      ))
' "$target" > "$patched"

mv "$patched" "$target"
