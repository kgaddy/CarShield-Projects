#!/usr/bin/env bash
set -euo pipefail

# Local paths
PROJECT_ROOT="/Users/kevingaddy/Documents/Angular/CarShield-Projects"
LOCAL_DIST_ROOT="$PROJECT_ROOT/dist"

# Remote SSH info
REMOTE_USER="kgaddy"
REMOTE_HOST="45.79.15.220"
REMOTE_PORT=69

# Remote paths
REMOTE_TMP_DIR="/tmp/CarShield-Projects-deploy"
REMOTE_WEB_ROOT="/var/www/CarShield-Projects"

echo "== Enter sudo password for $REMOTE_USER@$REMOTE_HOST (for remote file operations) =="
read -s -p "Password: " SUDO_PASS
echo

echo "== Building Angular app =="
cd "$PROJECT_ROOT"
ng build --configuration production

echo "== Detecting latest dist folder =="
DIST_DIR=$(ls -td "$LOCAL_DIST_ROOT"/*/ | head -1)
echo "Using dist directory: $DIST_DIR"

echo "== Syncing build to server (staging) =="
rsync -avz -e "ssh -p $REMOTE_PORT" "$DIST_DIR" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_TMP_DIR"

echo "== Activating new build on server =="
ssh -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST" bash -s << EOF
set -e

REMOTE_TMP_DIR="/tmp/CarShield-Projects-deploy"
REMOTE_WEB_ROOT="/var/www/CarShield-Projects"
SUDO_PASS="$SUDO_PASS"

echo "Creating web root directory..."
echo "\$SUDO_PASS" | sudo -S mkdir -p "\$REMOTE_WEB_ROOT"

echo "Clearing existing contents..."
echo "\$SUDO_PASS" | sudo -S rm -rf "\$REMOTE_WEB_ROOT"/*

echo "Copying new build into place..."
echo "\$SUDO_PASS" | sudo -S cp -r "\$REMOTE_TMP_DIR"/* "\$REMOTE_WEB_ROOT"/

echo "Fixing ownership..."
echo "\$SUDO_PASS" | sudo -S chown -R www-data:www-data "\$REMOTE_WEB_ROOT"

# Reload nginx if installed
if command -v nginx >/dev/null 2>&1; then
  echo "Reloading nginx..."
  echo "\$SUDO_PASS" | sudo -S nginx -t && echo "\$SUDO_PASS" | sudo -S systemctl reload nginx || echo "\$SUDO_PASS" | sudo -S systemctl restart nginx
fi

echo "Deployment completed."
EOF