---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [react, vite, typescript, swc, rollup, tailwind]

# Dependency graph
requires: []
provides:
  - React 19 installed as runtime dependency
  - Vue and all Vue toolchain packages removed
  - tsconfig.app.json and tsconfig.lib.json compile TSX with react-jsx
  - vite.config.ts uses @vitejs/plugin-react-swc with react/react-dom externals
  - peerDependencies set for react ^18||^19 and react-dom ^18||^19
  - Build scripts use tsc instead of vue-tsc
affects: [02, 03, 04, 05, 06, 07, 08, 09]

# Tech tracking
tech-stack:
  added: [react@19.2.4, react-dom@19.2.4, clsx@2.1.1, @vitejs/plugin-react-swc@4.3.0, @types/react@19.2.14, @types/react-dom@19.2.3]
  patterns:
    - "Library build externalizes react and react-dom (peer deps, not bundled)"
    - "TypeScript configured for bundler moduleResolution with allowImportingTsExtensions"
    - "vite-plugin-dts alone for type generation (rollup-plugin-typescript2 removed)"

key-files:
  created: []
  modified:
    - package.json
    - tsconfig.app.json
    - tsconfig.lib.json
    - vite.config.ts

key-decisions:
  - "Used --legacy-peer-deps for npm install due to pre-existing @storybook/theming@8.x vs storybook@9 conflict (pre-existing, not introduced)"
  - "Removed rollup-plugin-typescript2 from vite.config.ts (redundant with vite-plugin-dts, per RESEARCH open question resolved in favour of dts alone)"
  - "Kept rollup-plugin-typescript2 in devDependencies (removal from vite.config is the breaking change; package removal can happen in cleanup)"

patterns-established:
  - "TSX-first: all component file patterns updated from .vue to .tsx in imports and tsconfig includes"
  - "Hooks over composables: #composables alias updated to src/hooks for React pattern alignment"

requirements-completed: [FOUND-01, FOUND-02, FOUND-03]

# Metrics
duration: 3min
completed: 2026-03-13
---

# Phase 1 Plan 01: Swap Build Infrastructure from Vue to React Summary

**React 19 + @vitejs/plugin-react-swc build toolchain replacing Vue 3, with TSX-enabled tsconfig and react/react-dom externalized for library publishing**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-13T18:41:25Z
- **Completed:** 2026-03-13T18:44:45Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- React 19, react-dom, clsx installed; Vue, mdi-vue, @mdi/js, @storybook/addons removed
- tsconfig.app.json and tsconfig.lib.json fully inlined (no Vue extends), both set jsx: react-jsx
- vite.config.ts: Vue plugin replaced with @vitejs/plugin-react-swc, externals vue->react/react-dom, cleanVueFileName removed, nodeResolve updated to .tsx
- package.json: peerDependencies added, build scripts use tsc, imports updated to hooks/index.ts and .tsx

## Task Commits

Each task was committed atomically:

1. **Task 1: Swap dependencies and update package.json** - `3002077` (feat)
2. **Task 2: Update tsconfig files and vite.config.ts for React** - `5c69e19` (feat)

**Plan metadata:** TBD (docs: complete plan)

## Files Created/Modified

- `package.json` - React 19 deps, Vue removed, peerDeps, tsc scripts, .tsx imports
- `tsconfig.app.json` - Standalone config with jsx: react-jsx, no Vue extends
- `tsconfig.lib.json` - Standalone config with jsx: react-jsx, extended exclude list
- `vite.config.ts` - React SWC plugin, react/react-dom externals, #composables->hooks

## Decisions Made

- Removed `rollup-plugin-typescript2` from the plugins array in vite.config.ts (kept in devDependencies). The RESEARCH open question was resolved in favour of vite-plugin-dts alone — typescript2 was redundant and Vue-coupled.
- Used `--legacy-peer-deps` for all npm installs due to a pre-existing `@storybook/theming@8.6.14` vs `storybook@9.1.3` peer conflict. This conflict existed before this plan and is unrelated to the Vue->React migration.
- Retained `rollup-plugin-typescript2` in devDependencies for now (only removed from plugins config). Cleanup can happen in a later housekeeping step.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- npm install failed without `--legacy-peer-deps` due to pre-existing `@storybook/theming@8.x` requiring `storybook@8.x` while the project uses `storybook@9.1.3`. Applied `--legacy-peer-deps` to all install/uninstall commands. This is a pre-existing conflict, not introduced by this plan.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Build toolchain accepts React TSX: vite.config.ts, tsconfigs, and package.json all aligned to React
- Expected TS errors remain: `.vue` source files still import Vue — these will be migrated in subsequent plans (02+)
- Plan 02 can proceed immediately: Storybook config update and test infrastructure depend on this foundation

---
*Phase: 01-foundation*
*Completed: 2026-03-13*
