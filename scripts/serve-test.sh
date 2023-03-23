#!/usr/bin/env bash
set -e

PORT=${PORT:-4242}
WAIT=${WAIT:-5s}
SLEEP=${SLEEP:-1}
EXIT_CODE=0

function Descendants() {
  local child children
  children=$(pgrep -P "$1" | xargs)
  for child in $children; do Descendants "$child"; done
  echo "$children "
}

function KillAndExit() {
  local pid desc thisPid
  thisPid=$$
  EXIT_CODE=$1
  desc=$(Descendants $thisPid | tr '\n' ' ')
  for pid in $desc; do
    if ps -p "$pid" >/dev/null; then kill "$pid" || true; fi
  done
  exit "$EXIT_CODE"
}

trap 'KillAndExit 1' SIGINT SIGTERM
trap 'KillAndExit $EXIT_CODE' EXIT

if [[ ! -d "./build" ]]; then
  echo "No 'build' directory exists - you need to produce a build first: 'make build'"
  EXIT_CODE=1
  exit
fi

yarn serve --no-open --port "${PORT}" 2>./yarn-serve-error.log &
timeout "${WAIT}" bash -c "until echo > /dev/tcp/localhost/${PORT}; do sleep ${SLEEP}; done" 2>/dev/null
DOCS_HOST="http://localhost:${PORT}" yarn test "$@" || EXIT_CODE=$?
