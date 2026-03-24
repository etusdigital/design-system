---
phase: 07-complex-components
plan: 09
subsystem: ui
tags: [react, sidebar, tree, table, css-modules, tailwind, checkbox, indeterminate]

# Dependency graph
requires:
  - phase: 07-complex-components
    provides: Sidebar, Tree, Table component implementations from earlier plans

provides:
  - Sidebar active state uses green background (bg-primary-surface-default) instead of border-left
  - Sidebar text uses neutral/primary color tokens on base/hover/active states
  - Sub-panel has gap-sm spacing between child items
  - Tree parent checkbox shows indeterminate (null) state when some but not all children selected
  - Tree nodes display icons via Icon component when option.icon is provided
  - Table select-all checkbox derived from selectedRows state (not independent useState)
  - Table header checkbox shows indeterminate when partially selected rows
  - Table aggregation column header shows # label with minWidth 40px

affects: [storybook, visual-regression-tests, uat]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Derived boolean state pattern: allSelected = pagedItems.length > 0 && selectedRows.size === pagedItems.length"
    - "Three-value checkbox pattern: true | null | false for full/indeterminate/none selection"
    - "Recursive indeterminate check: getAllDescendantValues + partial match detection"

key-files:
  created: []
  modified:
    - src/components/Sidebar/Sidebar.module.css
    - src/components/Tree/Tree.tsx
    - src/components/Table/Table.tsx

key-decisions:
  - "Sidebar active indicator changed from border-left to full background fill matching Vue visual parity"
  - "Tree checkIsSelected returns boolean | null (null = indeterminate) to support allowIndeterminate Checkbox prop"
  - "Table allSelected derived from selectedRows.size === pagedItems.length - eliminates sync bug with separate state"
  - "Table header Checkbox receives value={allSelected ? true : someSelected ? null : false} for three-state behavior"

patterns-established:
  - "Tree indeterminate: getAllDescendantValues recursively collects all leaf values; someSelected && !allSelected returns null"
  - "Derived selection state: never store redundant boolean when it can be computed from Set.size comparison"

requirements-completed: [CPLX-01, CPLX-02, CPLX-03]

# Metrics
duration: 10min
completed: 2026-03-23
---

# Phase 07 Plan 09: UAT Gap Closure - Sidebar Styling, Tree Indeterminate, Table Select-All Summary

**Sidebar active state replaced border-left with green background fill; Tree parent checkbox shows indeterminate via null value; Table select-all derived from selectedRows.size eliminating sync bug**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-03-23T17:43:42Z
- **Completed:** 2026-03-23T17:54:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Sidebar .optionActive and .subOptionActive now use bg-primary-surface-default background fill (no border-left); text-primary-interaction-selected applied for active state color
- Sidebar .option and .subOption base text uses text-neutral-interaction-default; hover adds text-primary-interaction-default
- Sub-panel gains gap-sm between items for proper visual spacing
- Tree checkIsSelected rewritten to return boolean | null — parent nodes with partial child selection return null (indeterminate)
- Tree node icons render via Icon component when option.icon is provided
- Table allSelected and someSelected derived from selectedRows.size — eliminates the stale-state sync bug where allSelected could differ from actual row selections
- Table header Checkbox uses allowIndeterminate with three-value logic for partial selection display
- Table aggregation column header shows # with minWidth 40px

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix Sidebar active styling, text colors, and sub-panel spacing** - `19714da` (fix)
2. **Task 2: Fix Tree indeterminate checkbox and icons; Table select-all and aggregation** - `f611a38` (fix)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/components/Sidebar/Sidebar.module.css` - Removed border-left from .optionActive/.subOptionActive; added color tokens for base/hover/active states; added gap-sm to .subPanel
- `src/components/Tree/Tree.tsx` - Added getAllDescendantValues helper; rewrote checkIsSelected to return boolean | null; added allowIndeterminate to Checkbox; added icon rendering
- `src/components/Table/Table.tsx` - Removed allSelected useState; derived allSelected + someSelected; updated header Checkbox to three-value; added # header to aggregation th

## Decisions Made
- Sidebar border-left pattern replaced entirely — the active indicator is now a full background fill matching Vue visual parity
- Tree checkIsSelected signature changed to `boolean | null` — null signals indeterminate state to the Checkbox component via allowIndeterminate prop
- Table allSelected made derived (computed) rather than stateful — eliminates potential sync bugs when selectedRows changes without going through handleSelectAll

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Commit message subject-case linting failure on first attempt (commitlint requires lowercase subject) — corrected immediately

## Next Phase Readiness
- 3 of 7 UAT gaps from Phase 7 are now closed (gaps: Sidebar active bg, Tree indeterminate, Table select-all sync)
- Remaining 4 UAT gaps addressed in plans 07-08, 07-10, 07-11

---
*Phase: 07-complex-components*
*Completed: 2026-03-23*
