---
phase: 04-internal-components
plan: "02"
subsystem: ui
tags: [react, tsx, container, useControllable, useClickOutside, MutationObserver, tailwind]

# Dependency graph
requires:
  - phase: 04-internal-components/04-01
    provides: useClickOutside hook, useControllable hook, Label component, GroupContext, Option component
provides:
  - Container.tsx — expandable container with label click toggle, click-outside dismiss, MutationObserver label auto-width, error/disabled states, renderContent scoped slot
  - Container.css — label-content, arrow-icon, expand transition CSS classes
affects:
  - 04-03-ExpandableContainer
  - 04-04-SelectContainer
  - 06-select
  - 06-dropdown
  - 06-autocomplete

# Tech tracking
tech-stack:
  added: []
  patterns:
    - useControllable<boolean> for controlled/uncontrolled toggle state
    - useClickOutside([containerRef, contentRef], closeFromBlur, closeOnBlur) for mousedown-based dismiss
    - MutationObserver in useEffect([], cleanup) for DOM attribute tracking
    - Post-render resize via useEffect() with no deps as Vue onUpdated equivalent
    - Separate closeFromBlur function to pass source="blur" to onChange independent of click handler

key-files:
  created:
    - src/utils/components/Container.tsx
    - src/utils/styles/Container.css
  modified:
    - src/utils/components/Container.test.tsx

key-decisions:
  - "closeFromBlur function separate from useControllable onChange — calls onChange?(false, {source:'blur'}) and setModel directly to avoid useControllable always emitting source:'click'"
  - "Post-render resize via useEffect() with no deps — safe because resize guards against no-op setContentMinWidth calls with !== check"

patterns-established:
  - "Pattern: Extra arg on onChange — ContainerModelExtra { source: 'click' | 'blur' } threaded through useControllable wrapper and closeFromBlur"

requirements-completed:
  - INTL-03

# Metrics
duration: 5min
completed: 2026-03-16
---

# Phase 4 Plan 02: Container Component Migration Summary

**Expandable dropdown container with useControllable toggle, mousedown click-outside via useClickOutside, MutationObserver label auto-width, Label integration, Icon arrow rotation, error/disabled states, and renderContent scoped slot**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-16T23:12:15Z
- **Completed:** 2026-03-16T23:13:06Z
- **Tasks:** 1
- **Files modified:** 3

## Accomplishments

- Faithfully ported Container.vue (243 lines) to Container.tsx with full React patterns
- Implemented useControllable for controlled/uncontrolled expanded state with ContainerModelExtra source tagging
- Implemented closeFromBlur function with source="blur" to correctly distinguish blur-triggered closes from click toggles
- Added MutationObserver + post-render resize for label auto-width syncing (Vue onMounted + onUpdated equivalent)
- 12 tests covering toggle, Label render, error state, disabled state, arrow icon, Space key, renderContent, custom label slot

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate Container component from Vue to React TSX** - `9ea8718` (feat)

**Plan metadata:** TBD (docs: complete plan)

## Files Created/Modified

- `src/utils/components/Container.tsx` - Expandable container component with all props, refs, hooks, and JSX template
- `src/utils/styles/Container.css` - Container styling with label-content, arrow-icon rotation, expand transition classes, error/disabled states
- `src/utils/components/Container.test.tsx` - 12 tests replacing smoke stub

## Decisions Made

- `closeFromBlur` is a separate function (not the useControllable onChange wrapper) because useControllable wraps onChange to always emit `{ source: 'click' }`. Blur-triggered close needs `{ source: 'blur' }`, so we call `onChange?.(false, { source: 'blur' })` directly and then `setModel(false)` — the two-call approach avoids duplicating the ContainerModelExtra logic.
- Post-render resize: `useEffect(() => { resize(); })` with no deps runs after every render. The guard `if (newVal !== contentMinWidth)` inside resize prevents infinite render loops from unnecessary state updates.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None — all tests passed on first run.

## User Setup Required

None - no external service configuration required.

## Self-Check: PASSED

All files and commits verified.

## Next Phase Readiness

- Container.tsx is ready for consumption by ExpandableContainer (Plan 03)
- renderContent prop provides the scoped slot equivalent needed by SelectContainer (Plan 04)
- All Phase 6 composite components (Select, Dropdown, AutoComplete) can now depend on Container via ExpandableContainer/SelectContainer

---
*Phase: 04-internal-components*
*Completed: 2026-03-16*
