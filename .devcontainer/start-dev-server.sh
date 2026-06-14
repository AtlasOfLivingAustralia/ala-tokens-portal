#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# Bootstrap only when local env or dependencies are missing. Running this on
# every attach can fail due temporary AWS auth state and block app availability.
if [ ! -f .env.local ] || [ ! -d node_modules ]; then
  if ! bash .devcontainer/app-bootstrap.sh; then
    echo "Warning: app bootstrap failed; continuing to start Vite."
  fi
else
  echo "Using existing .env.local and node_modules."
fi

# Clean up Vite processes created by an older script version that passed
# duplicate host flags and produced invalid URLs.
LEGACY_VITE_PIDS="$(pgrep -f "$REPO_ROOT/node_modules/.bin/vite --host --host 0.0.0.0 --port 3000" || true)"
if [ -n "$LEGACY_VITE_PIDS" ]; then
  echo "Stopping legacy Vite process(es): $LEGACY_VITE_PIDS"
  echo "$LEGACY_VITE_PIDS" | xargs -r kill
fi

RUNNING_VITE_PIDS="$(pgrep -f "$REPO_ROOT/node_modules/.bin/vite .*--port 3000" || true)"
if [ -n "$RUNNING_VITE_PIDS" ]; then
  PID="$(echo "$RUNNING_VITE_PIDS" | head -n 1)"
  echo "$PID" > .devcontainer/vite-dev.pid
  if curl -sSf "http://127.0.0.1:3000/" >/dev/null 2>&1; then
    echo "Vite dev server already running on http://127.0.0.1:3000/"
    exit 0
  fi

  echo "Found Vite process but port 3000 is not healthy; restarting..."
  echo "$RUNNING_VITE_PIDS" | xargs -r kill
fi

rm -f .devcontainer/vite-dev.pid

echo "Starting Vite dev server on http://127.0.0.1:3000/"
nohup npm run dev -- --port 3000 --strictPort > .devcontainer/vite-dev.log 2>&1 &
echo $! > .devcontainer/vite-dev.pid
