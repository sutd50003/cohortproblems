#!/usr/bin/env bash
# ============================================================
# setup_and_run.sh
# Run your existing TypeScript Express + MongoDB project.
#
# Usage:
#   chmod +x setup_and_run.sh   # only needed once
#   ./setup_and_run.sh          # default: dev (hot-reload)
#   ./setup_and_run.sh prod     # compile then run dist/
# ============================================================

set -e  # exit immediately on any error

# ── Colour helpers ──────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()  { echo -e "${GREEN}[INFO]${NC}  $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*"; exit 1; }

# ── 0. Sanity checks ────────────────────────────────────────
command -v node  >/dev/null 2>&1 || error "Node.js not found. Install it first."
command -v npm   >/dev/null 2>&1 || error "npm not found."

# Must be run from the project root (where package.json lives)
[ -f package.json ] || error "Run this script from your project root (no package.json found here)."

# ── 1. Install / sync dependencies ──────────────────────────
info "Checking dependencies..."

# Core runtime
npm list express      --depth=0 >/dev/null 2>&1 || { warn "express missing — installing"; npm i express; }
npm list mongodb      --depth=0 >/dev/null 2>&1 || { warn "mongodb missing — installing"; npm i mongodb; }

# Dev / TypeScript toolchain
npm list typescript   --depth=0 >/dev/null 2>&1 || { warn "typescript missing — installing"; npm i -D typescript; }
npm list @types/node  --depth=0 >/dev/null 2>&1 || { warn "@types/node missing — installing"; npm i -D @types/node; }
npm list @types/express --depth=0 >/dev/null 2>&1 || { warn "@types/express missing — installing"; npm i -D @types/express; }
npm list ts-node      --depth=0 >/dev/null 2>&1 || { warn "ts-node missing — installing"; npm i -D ts-node; }
npm list nodemon      --depth=0 >/dev/null 2>&1 || { warn "nodemon missing — installing"; npm i -D nodemon; }

info "All dependencies present."

# ── 2. Ensure tsconfig.json exists ──────────────────────────
if [ ! -f tsconfig.json ]; then
  warn "tsconfig.json not found — generating a default one..."
  npx tsc --init
  info "tsconfig.json created. Review it before proceeding."
fi

# ── 3. Determine entry point ─────────────────────────────────
# Prefer bin/www.ts (express-generator layout), then app.ts
if [ -f "bin/www.ts" ]; then
  ENTRY="bin/www.ts"
elif [ -f "app.ts" ]; then
  ENTRY="app.ts"
else
  error "No entry point found (expected bin/www.ts or app.ts)."
fi
info "Entry point: $ENTRY"

# ── 4. Branch: dev vs prod ───────────────────────────────────
MODE="${1:-dev}"

if [ "$MODE" = "prod" ]; then
  # ── PRODUCTION: compile → run JS from dist/ ──────────────
  info "Building TypeScript..."
  npx tsc

  # Resolve the compiled entry (mirrors the TS path under dist/)
  DIST_ENTRY="dist/${ENTRY%.ts}.js"
  [ -f "$DIST_ENTRY" ] || error "Compiled entry not found at $DIST_ENTRY. Check your tsconfig outDir."

  info "Starting server (production)..."
  node "$DIST_ENTRY"

else
  # ── DEVELOPMENT: hot-reload with nodemon + ts-node ───────
  info "Starting server in DEV mode (hot-reload on .ts changes)..."
  npx nodemon \
    --watch "**/*.ts" \
    --ext   "ts" \
    --ignore "node_modules" \
    --ignore "dist" \
    --exec  "npx ts-node $ENTRY"
fi
