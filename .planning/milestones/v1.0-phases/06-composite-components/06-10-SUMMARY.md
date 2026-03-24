---
phase: 06-composite-components
plan: 10
subsystem: ui
tags: [react, storybook, stories, drawer, accordion, tab, migration]

# Dependency graph
requires:
  - phase: 06-composite-components
    provides: React TSX Drawer, Accordion, Tab component implementations
provides:
  - React TSX Storybook stories for Drawer (Primary, NoOutsideClose, Positions)
  - React TSX Storybook stories for Accordion (Primary, NoShadow)
  - React TSX Storybook stories for Tab (Primary, ObjectArray, NotCard)
  - Input.mdx blocker removed from Storybook
affects:
  - storybook, uat-testing, gap-closure

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "React story pattern: useState inside render function for controlled stories"
    - "Delete legacy .mdx doc files alongside .stories.ts when they cross-reference the old Vue story file"

key-files:
  created:
    - src/components/Drawer/Drawer.stories.tsx
    - src/components/Accordion/Accordion.stories.tsx
    - src/components/Tab/Tab.stories.tsx
  modified: []

key-decisions:
  - "Tab.stories.tsx omits isIcon/valueKey/getObject props — Tab.tsx uses index-based model (number), these props do not exist in the React implementation"
  - "Drawer.mdx, Accordion.mdx, Tab.mdx deleted alongside .stories.ts files — all three imported from .stories.ts, keeping them would cause the same dynamic import error"

patterns-established:
  - "When converting Vue .stories.ts to React .stories.tsx, also delete any co-located .mdx file that imports from the old .stories.ts"

requirements-completed: [COMP-05, COMP-06, COMP-03]

# Metrics
duration: 8min
completed: 2026-03-17
---

# Phase 06 Plan 10: Remove Input.mdx Blocker and Convert Drawer/Accordion/Tab Stories Summary

**Input.mdx blocker removed and three Vue story files (Drawer, Accordion, Tab) converted to React TSX Storybook stories with useState-controlled render functions**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-17T21:55:00Z
- **Completed:** 2026-03-17T22:03:32Z
- **Tasks:** 2
- **Files modified:** 10 (3 created, 7 deleted)

## Accomplishments
- Deleted `Input.mdx` that caused a dynamic import failure in Storybook for the Input color story (UAT test 18 blocker)
- Created `Drawer.stories.tsx` with Primary, NoOutsideClose, and Positions stories using React useState
- Created `Accordion.stories.tsx` with Primary and NoShadow stories
- Created `Tab.stories.tsx` with Primary, ObjectArray, and NotCard stories matching actual Tab.tsx interface (index-based)
- Deleted all three old Vue `.stories.ts` files and co-located `.mdx` documentation files that cross-referenced them

## Task Commits

Each task was committed atomically:

1. **Task 1: Remove Input.mdx blocker** - `587ded3` (chore)
2. **Task 2: Convert Drawer, Accordion, Tab stories to React TSX** - `9844e21` (feat)

**Plan metadata:** _(final docs commit below)_

## Files Created/Modified
- `src/components/Drawer/Drawer.stories.tsx` - React TSX story with Primary, NoOutsideClose, Positions stories
- `src/components/Accordion/Accordion.stories.tsx` - React TSX story with Primary, NoShadow stories
- `src/components/Tab/Tab.stories.tsx` - React TSX story with Primary, ObjectArray, NotCard stories
- `src/components/Input/Input.mdx` - DELETED (legacy blocker)
- `src/components/Drawer/Drawer.stories.ts` - DELETED (replaced by .tsx)
- `src/components/Drawer/Drawer.mdx` - DELETED (referenced deleted .stories.ts)
- `src/components/Accordion/Accordion.stories.ts` - DELETED (replaced by .tsx)
- `src/components/Accordion/Accordion.mdx` - DELETED (referenced deleted .stories.ts)
- `src/components/Tab/Tab.stories.ts` - DELETED (replaced by .tsx)
- `src/components/Tab/Tab.mdx` - DELETED (referenced deleted .stories.ts)

## Decisions Made
- Tab.tsx uses index-based active state (value is `number`, not `any`) without `isIcon`, `valueKey`, or `getObject` props — the plan's interface reference was based on the old Vue component; stories were written to match the actual React implementation
- Co-located `.mdx` documentation files for Drawer, Accordion, and Tab all imported from the now-deleted `.stories.ts` files; they were deleted to prevent the same dynamic import conflict that affected `Input.mdx`

## Deviations from Plan

None - plan executed exactly as written. The Tab interface mismatch was anticipated by the plan which noted "check file for actual interface" — stories were adjusted accordingly.

## Issues Encountered
None — straightforward file creation and deletion. Pre-commit hook runs `generate-docs` which confirmed 42 remaining MDX doc files all processed correctly after deletions.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Input, Drawer, Accordion, and Tab are now fully renderable in Storybook
- UAT test 18 (Input color story) blocker is cleared
- Remaining gap-closure work for Phase 6 should focus on any remaining Vue story files

---
*Phase: 06-composite-components*
*Completed: 2026-03-17*
