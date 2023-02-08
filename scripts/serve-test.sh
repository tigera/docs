#!/usr/bin/env bash
set -e

PORT=${PORT:-3000}
WAIT=${WAIT:-1m}
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

yarn serve --port "${PORT}" &
timeout "${WAIT}" bash -c "until echo > /dev/tcp/localhost/${PORT}; do sleep ${SLEEP}; done" &>/dev/null
LOCALHOST="http://localhost:${PORT}" yarn test || EXIT_CODE=$?
