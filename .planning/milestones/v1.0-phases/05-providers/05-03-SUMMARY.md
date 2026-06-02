---
phase: 05-providers
plan: "03"
subsystem: ui
tags: [react, context, provider, confirm, dialog, promise, design-system]

# Dependency graph
requires:
  - phase: 05-providers-01
    provides: Dialog component with noOutsideClose support
  - phase: 05-providers-02
    provides: ToastProvider and useToast hook
provides:
  - ConfirmProvider: promise-based confirm dialog wrapping Dialog with noOutsideClose
  - useConfirm hook: confirm(options) returns Promise<boolean>
  - DesignSystemProvider: root wrapper composing ConfirmProvider + ToastProvider
  - Updated package exports: DesignSystemProvider, ConfirmProvider, useConfirm, ToastProvider, useToast
affects:
  - any phase building features that need app-level provider composition
  - consumers wrapping apps with DesignSystemProvider

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Promise-based confirm dialog via useRef resolver pattern (resolverRef stores Promise resolve callback, cleared on accept/cancel)
    - Root provider composition: DesignSystemProvider nests ConfirmProvider + ToastProvider
    - Context guard pattern: useConfirm throws descriptive error outside ConfirmProvider

key-files:
  created:
    - src/components/Confirm/Confirm.tsx
    - src/components/Confirm/Confirm.test.tsx
    - src/providers/DesignSystemProvider.tsx
    - src/providers/index.ts
  modified:
    - src/components/Confirm/index.ts
    - src/components/index.ts
    - src/index.ts

key-decisions:
  - "ConfirmProvider uses resolverRef pattern (useRef storing Promise resolve) so confirm() returns Promise<boolean> without useState for the callback"
  - "Dialog receives value={state !== null} with no onChange handler — noOutsideClose prevents backdrop dismissal; only accept/cancel buttons close the dialog"
  - "DesignSystemProvider nests ConfirmProvider outside ToastProvider so both contexts available to all children"

patterns-established:
  - "Promise-based dialog: useRef<((v: boolean) => void) | null>(null) stores resolver, called on accept/cancel then cleared with setState(null)"
  - "Root provider: DesignSystemProvider composition pattern for future provider additions"

requirements-completed: [PROV-01, PROV-02, PROV-04]

# Metrics
duration: 3min
completed: 2026-03-17
---

# Phase 05 Plan 03: Confirm Provider + DesignSystemProvider Summary

**Promise-based confirm dialog via useRef resolver pattern with DesignSystemProvider root composition completing the provider system**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-17T15:37:43Z
- **Completed:** 2026-03-17T15:40:00Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Replaced Vue event-emitter Confirm stub with ConfirmProvider + useConfirm hook returning Promise<boolean>
- DesignSystemProvider wraps ConfirmProvider + ToastProvider so consumers use a single root wrapper
- Wired all provider exports into src/index.ts and updated src/components/index.ts to replace old stub exports
- 7 Confirm tests pass: accept resolves true, cancel resolves false, outside-provider throw, custom labels, conditional rendering, DesignSystemProvider integration

## Task Commits

1. **Task 1: implement ConfirmProvider and useConfirm** - `0ed4426` (feat)
2. **Task 2: add DesignSystemProvider, wire exports, add confirm tests** - `fe7e1e4` (feat)

**Plan metadata:** (docs commit below)

## Files Created/Modified

- `src/components/Confirm/Confirm.tsx` - ConfirmProvider with promise resolver pattern + useConfirm hook
- `src/components/Confirm/Confirm.test.tsx` - 7 tests for confirm API and DesignSystemProvider integration
- `src/components/Confirm/index.ts` - Updated to export ConfirmProvider, useConfirm
- `src/providers/DesignSystemProvider.tsx` - Root wrapper nesting ConfirmProvider + ToastProvider
- `src/providers/index.ts` - Re-exports DesignSystemProvider
- `src/components/index.ts` - Replaced stub Confirm/Toast exports with provider exports
- `src/index.ts` - Added DesignSystemProvider, ConfirmProvider, useConfirm, ToastProvider, useToast exports

## Decisions Made

- `resolverRef` pattern chosen over state-based callback: useRef stores the Promise resolve function, called on accept/cancel then set to null alongside setState(null). This avoids stale closure issues and keeps the Promise API clean.
- Dialog receives `value={state !== null}` with no `onChange` prop. Since `noOutsideClose` prevents backdrop dismissal, closing is exclusively via accept/cancel buttons — no need to wire onChange.
- DesignSystemProvider nests ConfirmProvider as the outer wrapper and ToastProvider as inner so both contexts are available anywhere inside the tree.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None — TypeScript compiled cleanly, all 24 tests pass (Dialog 7, Confirm 7, Toast 10). Non-fatal act() warnings from Dialog's useTransition state updates during tests are pre-existing (same pattern observed in Dialog and Toast test suites from prior plans).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Provider system complete: ConfirmProvider, ToastProvider, DesignSystemProvider all exported from package entry point
- Consumers can wrap apps with `<DesignSystemProvider>` and use `useConfirm().confirm(...)` or `useToast().toast(...)` from anywhere
- No blockers for subsequent phases
