#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

bash .devcontainer/app-bootstrap.sh

if [ -f .devcontainer/vite-dev.pid ]; then
  PID="$(cat .devcontainer/vite-dev.pid || true)"
  if [ -n "$PID" ] && kill -0 "$PID" 2>/dev/null; then
    echo "Vite dev server already running on http://127.0.0.1:3000/"
    exit 0
  fi
fi

echo "Starting Vite dev server on http://127.0.0.1:3000/"
nohup npm run dev -- --host 0.0.0.0 --port 3000 > .devcontainer/vite-dev.log 2>&1 &
echo $! > .devcontainer/vite-dev.pid
