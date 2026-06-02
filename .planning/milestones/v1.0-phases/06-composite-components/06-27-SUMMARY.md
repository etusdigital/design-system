---
phase: 06-composite-components
plan: 27
subsystem: ui
tags: [react, dropdown, flyout, submenu, storybook]

# Dependency graph
requires:
  - phase: 06-composite-components
    provides: Dropdown component with ExpandableContainer and useControllable
provides:
  - Dropdown flyout submenu for groups (subExpanded state, absolutely-positioned flyout card)
  - Working Dropdown item selection in controlled mode
  - WithGroups story demonstrating flyout behavior
affects: [06-composite-components, UAT]

# Tech tracking
tech-stack:
  added: []
  patterns: [subExpanded local useState per group option drives flyout card visibility]

key-files:
  created: []
  modified:
    - src/components/Dropdown/Dropdown.tsx
    - src/components/Dropdown/Dropdown.module.css
    - src/components/Dropdown/Dropdown.stories.tsx

key-decisions:
  - "Flyout card uses position:absolute left:100% top:0 on groupRow (position:relative) — same as Vue source pattern"
  - "subExpanded is local useState per DropdownOption instance — toggle on click/keydown"
  - "groupRow replaces flat groupHeader — clickable row with chevron_right icon and flex layout"
  - "Flyout card wraps same bg/shadow/border/rounded card as main dropdown"

patterns-established:
  - "Flyout submenu pattern: groupRow (position:relative) + flyoutCard (position:absolute left:100% top:0)"

requirements-completed: [COMP-05]

# Metrics
duration: 5min
completed: 2026-03-18
---

# Phase 6 Plan 27: Dropdown Flyout Submenu Summary

**Dropdown groups now render as clickable rows with chevron_right revealing an absolutely-positioned flyout sub-card to the right, matching Vue's flyout submenu pattern**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-18T20:42:57Z
- **Completed:** 2026-03-18T20:48:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Replaced flat inline group header with clickable `groupRow` (position:relative, flex, chevron_right)
- Added `subExpanded` local useState per DropdownOption group instance — toggle on click/keydown
- Flyout card renders as `position:absolute; left:100%; top:0` div with same bg/shadow/border/rounded card styling
- Added `WithGroups` story showing Publisher group with Group Account and Account sub-options
- Existing stories already use correct controlled pattern (useState + onChange) — no changes needed

## Task Commits

1. **Task 1: Fix Dropdown selection and implement flyout group submenus** - `d05decf` (feat)
2. **Task 2: Fix Dropdown stories for proper selection feedback** - `a195f84` (feat)

## Files Created/Modified

- `src/components/Dropdown/Dropdown.tsx` - Replaced groupHeader branch with flyout groupRow + subExpanded state
- `src/components/Dropdown/Dropdown.module.css` - Added .groupRow, .flyoutCard, .chevronIcon, .groupLabel; removed .groupHeader
- `src/components/Dropdown/Dropdown.stories.tsx` - Added WithGroups story with groupOptions array

## Decisions Made

- Flyout card uses `position:absolute; left:100%; top:0` on parent groupRow (`position:relative`) — matches Vue source flyout pattern
- `subExpanded` is a local `useState(false)` per `DropdownOption` instance rather than lifted state — keeps each group's expand state independent
- `groupRow` renders with `flex items-center gap-xs` matching optionItem layout; `groupLabel` uses `flex:1` to push chevron right
- Existing stories were already correct (useState + onChange) — the UAT issue was purely about flat group rendering, not selection freezing

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None — TypeScript compiled cleanly on first attempt. Existing story controlled/uncontrolled patterns were already correct.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Dropdown flyout submenu closes UAT round 3 test 7 (blocker)
- Ready for remaining UAT gap closure plans

---
*Phase: 06-composite-components*
*Completed: 2026-03-18*
