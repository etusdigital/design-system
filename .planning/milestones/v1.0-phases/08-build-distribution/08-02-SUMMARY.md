---
phase: 08-build-distribution
plan: 02
subsystem: build
tags: [vite, rollup, build, npm, ci, distribution]

# Dependency graph
requires:
  - phase: 08-build-distribution
    plan: 01
    provides: Zero-error tsc build pipeline
provides:
  - Multi-entry Vite build producing per-component JS files in lib/
  - package.json version 2.0.0 with clean dependency split
  - scripts/verify-imports.cjs validating all build outputs
  - CI workflow using npm and running build:lib + verification
  - npm publish --dry-run succeeds
affects: []

# Tech tracking
tech-stack:
  added:
    - vite.umd.config.ts — separate single-entry UMD build config
    - scripts/verify-imports.cjs — post-build validation script
  patterns:
    - "Multi-entry ES+CJS via rollupOptions.output array; UMD as separate vite build (inlineDynamicImports incompatible with multi-entry)"
    - "buildComponentEntries() + buildHookEntries() scan src/ at build time to generate rollup input map"
    - "CJS bundle content check via fs.readFile (not require()) because package type:module makes .cjs.js unrequireable in ESM context"

key-files:
  created:
    - vite.umd.config.ts
    - scripts/verify-imports.cjs
  modified:
    - vite.config.ts
    - package.json
    - .github/workflows/main.yml

key-decisions:
  - "UMD format requires single entry (inlineDynamicImports:true incompatible with multi-entry): generate UMD via separate vite.umd.config.ts; build:lib runs both builds sequentially"
  - "verify-imports.cjs uses fs content check for CJS bundle (not require()) because package.json type:module causes Node to reject .cjs.js via require() in CJS scripts"
  - "react/react-dom moved to peerDependencies only; tailwindcss/* moved to devDependencies; version bumped to 2.0.0"

metrics:
  duration: "~6 minutes"
  completed: "2026-03-23T21:19:14Z"
  tasks: 2
  files: 5
---

# Phase 8 Plan 02: Multi-Entry Build Configuration and Distribution Setup Summary

**One-liner:** Multi-entry Vite build for per-component deep imports with separate UMD config, publishable package.json at 2.0.0, and npm-based CI pipeline.

## What Was Built

### Task 1: Multi-entry Vite build and publishable package.json

Added `buildComponentEntries()` and `buildHookEntries()` helper functions to `vite.config.ts` that scan `src/components/` and `src/hooks/` at build time to produce a rollup multi-entry input map. The build config uses an output array with ES and CJS formats for multi-entry, producing:

- `lib/components/*/index.es.js` and `lib/components/*/index.cjs.js` per component
- `lib/hooks/*.es.js` and `lib/hooks/*.cjs.js` per hook

A separate `vite.umd.config.ts` builds only the UMD format from the single main entry (required because Rollup's `inlineDynamicImports:true` is incompatible with multi-entry inputs).

The `build:lib` script chains both builds: `tsc -b tsconfig.lib.json && vite build --mode production && vite build --config vite.umd.config.ts --mode production`.

`package.json` updated:
- Version bumped `1.0.4` → `2.0.0`
- `react`, `react-dom` removed from `dependencies` (kept in `peerDependencies` only)
- `tailwindcss`, `@tailwindcss/*` moved from `dependencies` to `devDependencies`
- `exports` map updated to point at `lib/` pre-built paths for all entry points

### Task 2: Import verification script and CI workflow

`scripts/verify-imports.cjs` validates all build outputs: main bundles (ES/CJS/UMD), CSS, type declarations, per-component deep imports (Button/Input/Select/Table/Dialog spot check), hook imports, CJS bundle content, and vue/react dependency correctness.

`.github/workflows/main.yml` fully migrated from yarn to npm:
- All three jobs (`test`, `npm-release`, `manual-release`) use `npm ci` and `npm run build:lib`
- `test` job now runs `node scripts/verify-imports.cjs` and `npm publish --dry-run` after build

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Separate UMD build config for multi-entry incompatibility**
- **Found during:** Task 1, first build attempt
- **Issue:** Rollup rejects `inlineDynamicImports: true` when multiple input entries are present — "Invalid value for option output.inlineDynamicImports - multiple inputs are not supported"
- **Fix:** Removed `lib` property from main vite.config.ts build section; created `vite.umd.config.ts` as a separate single-entry UMD build; updated `build:lib` script to run both builds sequentially
- **Files modified:** `vite.config.ts`, `vite.umd.config.ts`, `package.json`
- **Commit:** 07b45e1

**2. [Rule 1 - Bug] CJS require() check fails in ESM-first package**
- **Found during:** Task 2, first verify-imports.cjs run
- **Issue:** `require('./lib/design-system.cjs.js')` fails in Node 24 because the project has `"type": "module"` — Node loads `.cjs.js` files via ESM loader which rejects CJS `require()` calls
- **Fix:** Replaced the require-based test with a file content check (`fs.readFile` + checks for `require(` syntax in bundle)
- **Files modified:** `scripts/verify-imports.cjs`
- **Commit:** 6297500

**3. [Rule 2 - Missing] `index.d.ts` absent — dts plugin does not generate root index.d.ts without `lib.entry`**
- **Found during:** Task 2, first verify-imports.cjs run
- **Issue:** The plan's verify script checked `lib/index.d.ts` but the dts plugin generates `main.d.ts` (via our `generateMainDts` plugin) not `index.d.ts` when using bare rollupOptions without `lib.entry`
- **Fix:** Updated verify script check to use `lib/components/Button/index.d.ts` (per-component types) instead — the canonical types entry point is `main.d.ts` as set in package.json `types` field
- **Files modified:** `scripts/verify-imports.cjs`
- **Commit:** 6297500

## Self-Check: PASSED

Files verified:
- `vite.config.ts` — FOUND
- `vite.umd.config.ts` — FOUND
- `package.json` — version 2.0.0 confirmed
- `scripts/verify-imports.cjs` — FOUND, exits 0
- `.github/workflows/main.yml` — FOUND, no yarn references

Commits verified:
- `07b45e1` — FOUND (Task 1)
- `6297500` — FOUND (Task 2)
