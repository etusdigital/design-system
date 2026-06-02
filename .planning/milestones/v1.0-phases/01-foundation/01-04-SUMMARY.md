---
phase: 01-foundation
plan: 04
subsystem: ui
tags: [react, typescript, hooks, useControllable, useTransition, icon, material-symbols, testing-library, vitest, tdd]

# Dependency graph
requires:
  - phase: 01-01
    provides: React 19 + Vite + Vitest + RTL configured (jsdom unit test project)
  - phase: 01-02
    provides: Storybook React migration and stub TSX components
  - phase: 01-03
    provides: 57 component index.ts files and main entry point clean exports
provides:
  - src/hooks/useControllable.ts: controlled/uncontrolled hook returning [value, setValue] tuple
  - src/hooks/useTransition.ts: CSS transition mount/unmount timing hook with isMounted + isActive states
  - src/hooks/index.ts: barrel with forwardRef pattern documentation
  - src/components/Icon/Icon.tsx: real Material Symbols font span component (replaces stub)
  - src/index.ts: main entry now exports all hooks alongside components
affects: [03-form-inputs, 06-overlays, all-phases-using-icons]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "useControllable: tuple return [value, setValue], options object { value, defaultValue, onChange }, dev warnings"
    - "useTransition: isMounted + isActive states, RAF for enter, setTimeout for leave"
    - "Icon: Material Symbols font span with clsx for conditional classes, inline fontSize style"
    - "forwardRef: pattern documented in src/hooks/index.ts for Phase 3 form inputs"

key-files:
  created:
    - src/hooks/useControllable.ts
    - src/hooks/useControllable.test.ts
    - src/hooks/useTransition.ts
    - src/hooks/useTransition.test.ts
    - src/hooks/index.ts
    - src/components/Icon/Icon.test.tsx
  modified:
    - src/components/Icon/Icon.tsx
    - src/components/Icon/index.ts
    - src/index.ts
    - tsconfig.app.json
    - vite.config.ts

key-decisions:
  - "Icon uses Material Symbols font span per CONTEXT.md locked decision — NOT @mdi/react"
  - "useControllable dev warning uses always-called useEffect with conditional body (rules-of-hooks compliant)"
  - "useTransition uses requestAnimationFrame for enter (isActive) and setTimeout for leave (isMounted)"
  - "tsconfig.app.json types field includes @testing-library/jest-dom for TS recognition of custom matchers"
  - "Vitest unit project needed globals:true for @testing-library/jest-dom setup file to access expect"
  - "Icon directory force-staged with git add -f due to macOS .gitignore rule (pre-existing issue)"

patterns-established:
  - "forwardRef pattern: forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) { ... }) for all form inputs"
  - "useControllable: always use for components supporting both controlled and uncontrolled modes"
  - "useTransition: use for overlay/animated components (Dialog, Drawer, Toast, Accordion)"

requirements-completed: [FOUND-04, FOUND-05, FOUND-06, FOUND-09]

# Metrics
duration: 5min
completed: 2026-03-13
---

# Phase 1 Plan 04: Shared Hooks and Icon Component Summary

**useControllable (controlled/uncontrolled), useTransition (RAF/setTimeout mount timing), and real Material Symbols Icon span component — 25 unit tests, all passing**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-13T18:53:05Z
- **Completed:** 2026-03-13T18:58:00Z
- **Tasks:** 2
- **Files modified:** 11 (6 created, 5 modified)

## Accomplishments

- Implemented `useControllable` hook: controlled/uncontrolled modes, onChange, dev mode switching warning (rules-of-hooks compliant)
- Implemented `useTransition` hook: isMounted/isActive state machine via RAF (enter) and setTimeout (leave) with cleanup
- Replaced Icon stub with real Material Symbols font `<span>` component using `clsx`
- All 25 unit tests pass (10 useControllable + 6 useTransition + 9 Icon)
- Hooked up all exports from `src/index.ts`

## Task Commits

Each task was committed atomically:

1. **Task 1: Create useControllable and useTransition hooks with tests** - `b20aaf3` (feat(01-04))
2. **Task 2: Create Icon component and establish forwardRef pattern** - `83895b1` (feat(01-04))

**Plan metadata:** (docs commit, see below)

_Note: TDD tasks — tests written first (RED) then implementation (GREEN)_

## Files Created/Modified

- `src/hooks/useControllable.ts` - Controlled/uncontrolled hook with dev warnings, tuple return
- `src/hooks/useControllable.test.ts` - 10 tests: uncontrolled, controlled, onChange, dev warnings
- `src/hooks/useTransition.ts` - Mount/unmount timing hook with RAF + setTimeout
- `src/hooks/useTransition.test.ts` - 6 tests: initial state, opening, closing, rapid toggle
- `src/hooks/index.ts` - Barrel file with forwardRef pattern documentation comment
- `src/components/Icon/Icon.tsx` - Real Material Symbols span, clsx classes, inline fontSize
- `src/components/Icon/Icon.test.tsx` - 9 tests: classes, size, filled, className, undefined name
- `src/components/Icon/index.ts` - Added IconProps type export
- `src/index.ts` - Uncommented hook exports (useControllable, useTransition with types)
- `tsconfig.app.json` - Added `"types": ["@testing-library/jest-dom"]` for TS matcher recognition
- `vite.config.ts` - Added `globals: true` to unit test project for jest-dom setup

## Decisions Made

- `globals: true` added to Vitest unit project: `@testing-library/jest-dom` setup calls `expect.extend()` before vitest injects `expect`, causing "expect is not defined" without globals mode
- `tsconfig.app.json` `types` field includes `@testing-library/jest-dom` so TypeScript recognizes `toHaveClass`, `toHaveStyle`, `toBeInTheDocument` matchers
- Icon directory uses `git add -f` (macOS gitignore rule treats `Icon` as macOS metadata file — pre-existing issue from plan 01-02)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added globals:true to Vitest unit project**
- **Found during:** Task 1 (RED phase test run)
- **Issue:** `@testing-library/jest-dom` setup file calls `expect.extend()` before Vitest injects `expect` into global scope, causing "ReferenceError: expect is not defined"
- **Fix:** Added `globals: true` to the unit test project in `vite.config.ts`
- **Files modified:** vite.config.ts
- **Verification:** Tests ran successfully after fix
- **Committed in:** b20aaf3 (Task 1 commit)

**2. [Rule 1 - Bug] Fixed test initialProps type annotation in useControllable.test.ts**
- **Found during:** Task 2 (TypeScript check)
- **Issue:** TypeScript inferred `{ value: undefined }` literal type from initialProps, preventing rerender with a string value; opposite problem for the controlled-to-uncontrolled test
- **Fix:** Added `as { value?: string }` type assertion to `initialProps` in both dev warning tests
- **Files modified:** src/hooks/useControllable.test.ts
- **Verification:** `tsc --noEmit` passes with no errors in hooks files
- **Committed in:** 83895b1 (Task 2 commit)

**3. [Rule 2 - Missing Critical] Added @testing-library/jest-dom to tsconfig types**
- **Found during:** Task 2 (TypeScript check)
- **Issue:** TypeScript didn't recognize `toHaveClass`, `toHaveStyle`, `toBeInTheDocument` — tests compiled but type-checker reported errors
- **Fix:** Added `"types": ["@testing-library/jest-dom"]` to tsconfig.app.json
- **Files modified:** tsconfig.app.json
- **Verification:** `tsc --noEmit` shows no errors in Icon test or hooks test files
- **Committed in:** 83895b1 (Task 2 commit)

---

**Total deviations:** 3 auto-fixed (1 blocking, 1 bug, 1 missing critical)
**Impact on plan:** All fixes necessary for tests to run and types to be recognized. No scope creep.

## Issues Encountered

- useTransition test for "isActive becomes false on close" needed RAF callbacks fired in a separate `act()` block from `rerender()` call — the RAF is scheduled inside a `useEffect` which is asynchronous, so callbacks aren't populated yet when `rerender()` returns within the same `act()`
- jsdom environment doesn't define `requestAnimationFrame` or `cancelAnimationFrame` — fixed by adding polyfills in the `beforeEach` block

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- `useControllable` ready for all Phase 3 form components (Input, Textarea, Checkbox, etc.)
- `useTransition` ready for Phase 6 overlay components (Dialog, Drawer, Toast, Accordion)
- `Icon` component ready for use in Phase 2+ components
- `forwardRef` pattern documented in `src/hooks/index.ts` for Phase 3 implementers
- All hooks exported from `src/index.ts` as named exports with TypeScript types

---
*Phase: 01-foundation*
*Completed: 2026-03-13*
