---
phase: 01-foundation
verified: 2026-03-13T16:05:00Z
status: gaps_found
score: 4/5 success criteria verified (4/5 truths confirmed, with 1 requiring human verification and 2 advisory warnings)
re_verification: false
gaps:
  - truth: "A Storybook story written in .stories.tsx renders correctly in the browser"
    status: failed
    reason: "No .stories.tsx files exist anywhere in the codebase. Storybook config is correctly migrated to @storybook/react-vite but there is no React story to render or verify."
    artifacts:
      - path: "src/components/**/*.stories.tsx"
        issue: "Zero .stories.tsx files found (ls returned no matches). Only old .stories.ts Vue files remain."
    missing:
      - "At least one .stories.tsx file demonstrating Storybook renders a React component (e.g., src/components/Icon/Icon.stories.tsx using the real Icon component)"
human_verification:
  - test: "Open Storybook with a .stories.tsx file present and confirm a React story renders without errors"
    expected: "The Storybook dev server starts, the story appears in the sidebar, and the component renders in the preview pane"
    why_human: "No automated way to confirm Storybook browser rendering; requires a .stories.tsx file first"
---

# Phase 1: Foundation Verification Report

**Phase Goal:** Swap the entire build/dev/test toolchain from Vue 3 to React 19 and produce the shared building blocks (hooks, Icon, forwardRef pattern) every later component needs.
**Verified:** 2026-03-13T16:05:00Z
**Status:** gaps_found
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths (from ROADMAP.md Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | `vite build` completes without errors on a minimal React TSX entry point | ? UNCERTAIN | `tsc -b tsconfig.lib.json` produces 1 error from `src/composables/OptionalModel.ts` (Vue import). `tsconfig.app.json` produces 57 errors from pre-existing `.stories.ts` Vue files. These are pre-existing out-of-scope files noted in summaries; Vite itself (rollup) skips type checking and would build successfully. Human needed to confirm clean `tsc -b && vite build`. |
| 2 | A Storybook story written in `.stories.tsx` renders correctly in the browser | FAILED | Zero `.stories.tsx` files found in the codebase. Storybook config is correctly migrated (`@storybook/react-vite`) but there is no React story to render. |
| 3 | `useControllable` hook supports both controlled and uncontrolled modes, verified by a Vitest test | VERIFIED | `src/hooks/useControllable.ts` implemented (44 lines). `src/hooks/useControllable.test.ts` has 10 tests covering all modes. `npx vitest run --project unit` — 25/25 tests pass. |
| 4 | An Icon component renders a Material Symbols icon with the same visual output as the Vue version | VERIFIED | `src/components/Icon/Icon.tsx` renders `<span className="material-symbols-rounded icon ...">` with inline `fontSize` style. 9 tests pass. Note: CONTEXT.md locked the implementation to Material Symbols font span (not `@mdi/react` as stated in ROADMAP) — this deviation is intentional and documented in PLAN 04 and CONTEXT.md. |
| 5 | All 57 component `index.ts` files export named React components (no Vue plugin objects remain) | VERIFIED | `ls -d src/components/*/index.ts \| wc -l` = 57. `grep -rl "Plugin\|install.*Vue\|from 'vue'" src/components/*/index.ts` = 0 matches. 58 stub `.tsx` files created (57 components + Icon real implementation). `src/components/index.ts` has 57 named re-exports. |

**Score:** 3/5 truths fully verified; 1 uncertain (needs human); 1 failed (no .stories.tsx files)

---

## Required Artifacts

| Artifact | Provides | Status | Details |
|----------|----------|--------|---------|
| `package.json` | React deps, Vue deps removed, peerDependencies set | VERIFIED | `react: "^18.0.0 \|\| ^19.0.0"` in dependencies + peerDependencies. Vue, mdi-vue, @storybook/addons removed. `@vitejs/plugin-react-swc` in devDependencies. Build scripts use `tsc` not `vue-tsc`. |
| `tsconfig.app.json` | TypeScript config for React JSX | VERIFIED | `"jsx": "react-jsx"` present. No Vue extends. Includes `src/**/*.ts`, `src/**/*.tsx` (no `.vue`). |
| `tsconfig.lib.json` | TypeScript config for library build | VERIFIED | `"jsx": "react-jsx"` present. Extended exclude list covers stories and tests. |
| `vite.config.ts` | Vite build config with React SWC plugin | VERIFIED | `import react from '@vitejs/plugin-react-swc'`. `external: ['react', 'react-dom']`. `globals: { react: 'React', 'react-dom': 'ReactDOM' }`. `nodeResolve({ extensions: ['.ts', '.tsx'] })`. No Vue references. |
| `.storybook/main.ts` | Storybook config for React + Vite | VERIFIED | `import type { StorybookConfig } from '@storybook/react-vite'`. Framework `@storybook/react-vite`. |
| `.storybook/preview.tsx` | Storybook preview with React decorators | VERIFIED | React JSX decorator wrapping stories in `<div className="${theme}-theme">`. No Vue imports. `.storybook/preview.ts` (Vue version) confirmed deleted. |
| `vitest.setup.ts` | RTL jest-dom matchers setup | VERIFIED | `import '@testing-library/jest-dom'` — single line, correct. |
| `vite.config.ts` (unit project) | Unit test project config with jsdom | VERIFIED | `test.projects[1]` has `name: 'unit'`, `environment: 'jsdom'`, `globals: true`, `setupFiles: ['./vitest.setup.ts']`. |
| `src/hooks/useControllable.ts` | Controlled/uncontrolled hook | VERIFIED | 44 lines. Imports `useState`, `useRef`, `useEffect` from `react`. Rules-of-hooks compliant dev warning. Tuple return `[value, setValue]`. |
| `src/hooks/useControllable.test.ts` | Unit tests for useControllable | VERIFIED | `describe` present. 10 tests: uncontrolled mode, controlled mode, onChange, dev warnings. All pass. |
| `src/hooks/useTransition.ts` | CSS transition mount/unmount timing hook | VERIFIED | 37 lines. RAF for enter, setTimeout for leave. `isMounted` + `isActive` states. |
| `src/hooks/useTransition.test.ts` | Unit tests for useTransition | VERIFIED | `describe` present. 6 tests: initial state, opening, closing, rapid toggle. All pass. |
| `src/hooks/index.ts` | Barrel file for hooks + forwardRef documentation | VERIFIED | Exports `useControllable`, `useTransition` with types. `forwardRef` pattern documented as JSDoc comment with code example. |
| `src/components/Icon/Icon.tsx` | Material Symbols font icon component (real, not stub) | VERIFIED | 19 lines. `clsx` for class composition. `material-symbols-rounded` class. Inline `fontSize` style. `name`, `size`, `filled`, `className` props. |
| `src/components/Icon/Icon.test.tsx` | Unit tests for Icon rendering | VERIFIED | `describe` present. 9 tests. All pass. |
| `src/components/index.ts` | Barrel file for all 57 components | VERIFIED | 57 `export { X } from './X'` named re-exports. No `export { default as X }` pattern. |
| `src/index.ts` | Main package entry point | VERIFIED | `export * from './components'`. Exports `useControllable`, `useTransition` with types. No Vue plugin install block. No Vue imports. |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `vite.config.ts` | `react`, `react-dom` | `rollupOptions.external` | WIRED | `external: ['react', 'react-dom']` present at line 74 |
| `tsconfig.app.json` | Vite TSX compilation | `jsx: react-jsx` | WIRED | `"jsx": "react-jsx"` at line 13; Vite consumes this for TSX transform |
| `.storybook/main.ts` | `@storybook/react-vite` | `framework.name` | WIRED | `"@storybook/react-vite"` at line 14 |
| `vite.config.ts` | `vitest.setup.ts` | `test.projects[1].setupFiles` | WIRED | `setupFiles: ['./vitest.setup.ts']` in unit project at line 124 |
| `src/index.ts` | `src/components/index.ts` | `export * from './components'` | WIRED | Line 4 of src/index.ts |
| `src/index.ts` | `src/hooks/index.ts` | named hook exports | WIRED | Lines 7-10 of src/index.ts export both hooks with types |
| `src/hooks/useControllable.ts` | `react` | `useState`, `useRef`, `useEffect` | WIRED | `from 'react'` import at line 1 |
| `src/hooks/useTransition.ts` | `react` | `useState`, `useEffect`, `useRef` | WIRED | `from 'react'` import at line 1 |
| `src/components/Icon/Icon.tsx` | `clsx` | className composition | WIRED | `import clsx from 'clsx'` at line 1; used in className at line 13 |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| FOUND-01 | 01-01 | React 19 + TypeScript (`jsx: react-jsx`) | SATISFIED | `tsconfig.app.json` and `tsconfig.lib.json` both have `"jsx": "react-jsx"`. React 19 in package.json. |
| FOUND-02 | 01-01 | Vite config uses `@vitejs/plugin-react-swc` | SATISFIED | `import react from '@vitejs/plugin-react-swc'`; `plugins: [react(), ...]` in vite.config.ts |
| FOUND-03 | 01-01 | Package.json updated — Vue removed, React added, peerDeps set | SATISFIED | Vue absent from all dependency sections. `react`/`react-dom` in dependencies and peerDependencies. |
| FOUND-04 | 01-04 | `useControllable` hook implemented | SATISFIED | `src/hooks/useControllable.ts` — 44 lines, both modes, 10 passing tests |
| FOUND-05 | 01-04 | `forwardRef` pattern established | SATISFIED (documentation) | Pattern documented in `src/hooks/index.ts` JSDoc with working code example. No actual `forwardRef` usage yet — implementation deferred to Phase 3 as intended. |
| FOUND-06 | 01-04 | MDI icons migrated — Icon wrapper created | SATISFIED (with scope change) | Icon wrapper exists and is tested. Implementation uses Material Symbols font span per CONTEXT.md locked decision, NOT `@mdi/react` as stated in REQUIREMENTS.md. Decision is documented in CONTEXT.md and PLAN 04. |
| FOUND-07 | 01-03 | All 57 component `index.ts` files converted | SATISFIED | 57 index.ts files verified. 0 Vue Plugin patterns remain. 57 named exports in `src/components/index.ts`. |
| FOUND-08 | 01-02 | CSS scoping strategy decided and documented | SATISFIED (documentation) | Strategy documented in `.planning/phases/01-foundation/01-CONTEXT.md` (decisions section). Summary 01-02 documents it. No separate code artifact needed — strategy is "keep Tailwind + component CSS + add clsx + className prop". |
| FOUND-09 | 01-04 | Transition/animation utility established | SATISFIED | `src/hooks/useTransition.ts` — 37 lines, RAF + setTimeout state machine, 6 passing tests |
| FOUND-10 | 01-02 | Storybook migrated to `@storybook/react-vite` | SATISFIED | `.storybook/main.ts` uses `@storybook/react-vite`. Old `preview.ts` deleted. `preview.tsx` created with React JSX decorator. |
| FOUND-11 | 01-02 | Vitest configured with jsdom + RTL | SATISFIED | `vite.config.ts` unit project: `environment: 'jsdom'`, `setupFiles: ['./vitest.setup.ts']`. All 25 tests pass. |
| FOUND-12 | 01-03 | Main entry `src/index.ts` updated to export all React components | SATISFIED | `src/index.ts` exports `* from './components'` (57 components) + hooks. No Vue plugin code. |

**All 12 FOUND requirements are accounted for.** No orphaned requirements.

---

## Anti-Patterns Found

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| `src/components/*/Button.tsx` (and 56 others) | Stub components: `return <div data-component="Button" {...props} />` | INFO | Expected — stubs are intentional placeholders for Phase 2-7 migrations. The stub pattern is documented in PLAN 03 and is correct practice. |
| `package.json` exports | `"./composables/*": "./src/composables/*.ts"` still present | WARNING | `src/composables/OptionalModel.ts` imports from `vue` (now removed). If a consumer imports `@etus/design-system/composables/OptionalModel`, it will fail at runtime. This export path was not removed as part of Phase 1 plans. |
| `src/composables/OptionalModel.ts` | Imports `vue` (line 1) — Vue no longer installed | WARNING | Causes `tsc -b tsconfig.lib.json` to error with `TS2307: Cannot find module 'vue'`. The `build:lib` script runs `tsc -b tsconfig.lib.json && vite build` — the `tsc` step will fail before reaching `vite build`. This blocks the full build script as specified. |
| `package.json` dependencies | `react: "^18.0.0 \|\| ^19.0.0"` in both `dependencies` and `peerDependencies` | WARNING | Library packages should have React only in `peerDependencies` to avoid bundling React or forcing a specific React instance. Having it in `dependencies` means consumers installing this package will get React bundled as a dependency (they may already have it). Low severity — does not break functionality but is unconventional for a component library. |

---

## Human Verification Required

### 1. Storybook React Story Rendering

**Test:** Create a minimal `.stories.tsx` file for Icon (e.g., `src/components/Icon/Icon.stories.tsx`), run `npm run storybook`, navigate to the story.
**Expected:** Storybook dev server starts without errors. The Icon story appears in the sidebar. The component renders a visible `<span>` with the icon name in the Storybook preview pane.
**Why human:** No `.stories.tsx` files exist to verify SC2 automatically. The Storybook config is correctly wired to `@storybook/react-vite` but actual rendering requires a browser and a story file.

### 2. `vite build` on React Entry Point

**Test:** Run `npm run build:lib` from the project root.
**Expected:** The command completes without errors and produces `lib/design-system.es.js`, `lib/design-system.cjs.js`, `lib/design-system.umd.js`.
**Why human:** The `build:lib` script runs `tsc -b tsconfig.lib.json` first, which currently errors on `src/composables/OptionalModel.ts` (Vue import). Need to verify whether this blocks the build or whether the composables file is excluded from the actual vite bundle (Vite itself would succeed — only `tsc` type-checking step fails).

---

## Gaps Summary

**Gap 1 — No React .stories.tsx file (blocks SC2):**
The ROADMAP Phase 1 Success Criterion 2 requires "a Storybook story written in `.stories.tsx` renders correctly in the browser." Zero `.stories.tsx` files exist. The Storybook infrastructure is correctly configured for React, but the success criterion cannot be verified without at least one React story file. The simplest fix is a minimal `src/components/Icon/Icon.stories.tsx` that renders the real Icon component.

**Advisory 1 — `src/composables/OptionalModel.ts` blocks `tsc -b` in build script:**
The file is included by `tsconfig.lib.json`'s `src/**/*.ts` glob and imports from `vue` (which is no longer installed). The `build:lib` script runs `tsc -b tsconfig.lib.json` before `vite build` — the tsc step will error. Fix options: (a) add `"src/composables/**"` to `tsconfig.lib.json`'s exclude array, or (b) remove the Vue import from OptionalModel.ts (since it's superseded by `useControllable`).

**Advisory 2 — `package.json` exports `./composables/*` path exposes Vue code:**
The `exports` field still includes `"./composables/*": "./src/composables/*.ts"` which points to a file with a broken Vue import. This is a legacy entry that should be removed or updated to point to `./src/hooks` as part of Phase 1 cleanup.

---

## Note on Icon Implementation Deviation

REQUIREMENTS.md FOUND-06 states "MDI icons migrated — `mdi-vue` replaced with `@mdi/react`, Icon wrapper component created." However, CONTEXT.md (locked decisions, gathered 2026-03-13) specifies "Keep Material Symbols font (Google font) — not switching to @mdi/react SVGs." PLAN 04 explicitly acknowledges this conflict and implements Material Symbols per CONTEXT.md.

This is a documented scope decision, not a gap. The Icon component is real, tested, and functional. REQUIREMENTS.md FOUND-06 should be updated to reflect the Material Symbols implementation if the decision stands.

---

_Verified: 2026-03-13T16:05:00Z_
_Verifier: Claude (gsd-verifier)_
