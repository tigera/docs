#!/usr/bin/env bash
set -e

PORT=${PORT:-3000}
WAIT=${WAIT:-1m}
SLEEP=${SLEEP:-1}
EXIT_CODE=1

function descendants()
{
  local pid children
  children=$(ps -o pid= --ppid "$1")
  for pid in $children; do descendants "$pid"; done
  echo "$children"
}

function KillExit() {
  kill "$(descendants $$)" &>/dev/null || true
  exit $EXIT_CODE
}

trap KillExit SIGINT SIGTERM EXIT

yarn build
yarn serve --port "${PORT}" &
timeout "${WAIT}" bash -c "until echo > /dev/tcp/localhost/${PORT}; do sleep ${SLEEP}; done" &>/dev/null
LOCALHOST="http://localhost:${PORT}" yarn test || EXIT_CODE=$?
KillExit
