#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

echo "Preparing local app configuration..."
set -a
eval "$(python3 cicd/gen_env_vars.py --env local --conf cicd/website/config.ini --clean-branch local)"
set +a

rm -f .env.production
cat > .env.local <<EOF
VITE_APP_VERSION=${VITE_APP_VERSION-}

# ALA OIDC
VITE_OIDC_AUTHORITY=${VITE_OIDC_AUTHORITY-}
VITE_COGNITO_LOGOUT_URI=${VITE_COGNITO_LOGOUT_URI-}
VITE_OIDC_REDIRECT_URI=${VITE_OIDC_REDIRECT_URI-}
VITE_OIDC_LOGOUT_REDIRECT_URI=${VITE_OIDC_LOGOUT_REDIRECT_URI-}
VITE_TOKENS_API=${VITE_TOKENS_API-}
VITE_USERDETAILS_URL=${VITE_USERDETAILS_URL-}
EOF

if [ ! -d node_modules ]; then
  echo "Installing npm dependencies..."
  npm install
else
  echo "npm dependencies already present."
fi
