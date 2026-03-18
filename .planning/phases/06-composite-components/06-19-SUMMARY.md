---
phase: 06-composite-components
plan: 19
subsystem: ui
tags: [react, ExpandableContainer, AutoComplete, RoundMenu, Input, FloatCard, Button]

# Dependency graph
requires:
  - phase: 06-composite-components
    provides: FloatCard with outside-click handling; Button with round/icon support; SelectContainer with absolute prop
provides:
  - ExpandableContainer defaults absolute=true with CSS opacity/visibility transitions
  - AutoComplete dropdown floats absolutely without pushing layout
  - RoundMenu uses Button component for all interactive elements
  - Input type=color uses FloatCard popover with outside-click close
affects:
  - future phases using ExpandableContainer, SelectContainer, AutoComplete, RoundMenu, Input

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "CSS opacity/visibility toggle instead of conditional mount for animated dropdowns"
    - "Wrap Button in positioned div when Button lacks style prop but position must be set externally"
    - "FloatCard replaces raw absolute div for outside-click-aware popovers"

key-files:
  created: []
  modified:
    - src/utils/components/ExpandableContainer.tsx
    - src/components/AutoComplete/AutoComplete.tsx
    - src/components/RoundMenu/RoundMenu.tsx
    - src/components/Input/Input.tsx

key-decisions:
  - "ExpandableContainer: absolute defaults to true (not false) — dropdown components float by default"
  - "ExpandableContainer: CSS opacity/visibility replaces conditional null return — keeps DOM element for transitions"
  - "RoundMenu: menuItem wrapper div carries position styles; Button carries interaction styling — Button has no style prop"
  - "Input type=color: FloatCard card prop receives ColorPicker; swatch button is FloatCard children trigger"
  - "showColorPicker state removed from Input — FloatCard manages its own open/close state internally"

patterns-established:
  - "CSS show/hide via opacity-100/opacity-0 + visible/invisible classes with transition for animated dropdown content"
  - "Outer div carries position transform + CSS module class; inner Button carries interaction semantics"

requirements-completed: [COMP-08, COMP-13, COMP-17]

# Metrics
duration: 12min
completed: 2026-03-18
---

# Phase 06 Plan 19: ExpandableContainer/RoundMenu/Input Integration Fixes Summary

**Fixed ExpandableContainer absolute inversion to CSS transition pattern, replaced raw buttons in RoundMenu with Button component, and replaced Input type=color raw div popover with FloatCard for outside-click-aware color picker**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-18T00:00:00Z
- **Completed:** 2026-03-18T00:12:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- ExpandableContainer now defaults `absolute=true` and animates open/close via CSS opacity/visibility instead of unmounting content
- AutoComplete explicitly passes `absolute={true}` to SelectContainer ensuring the dropdown always floats
- RoundMenu replaces raw `<button>` elements with the DS `Button` component (round + icon props)
- Input type=color replaces manual `showColorPicker` state + raw absolute div with FloatCard popover (outside-click handled automatically)

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix ExpandableContainer isAbsolute inversion and AutoComplete absolute** - `e362ebe` (fix)
2. **Task 2: Replace raw buttons in RoundMenu and raw div popover in Input type=color** - `cdf9b61` (fix)

## Files Created/Modified
- `src/utils/components/ExpandableContainer.tsx` - absolute defaults to true; isAbsolute = absolute; CSS visibility/opacity replaces conditional null
- `src/components/AutoComplete/AutoComplete.tsx` - added absolute={true} to SelectContainer
- `src/components/RoundMenu/RoundMenu.tsx` - import Button; menuItems wrapped in positioned div + Button; trigger uses Button
- `src/components/Input/Input.tsx` - import FloatCard; color branch uses FloatCard with card prop; showColorPicker state removed

## Decisions Made
- `ExpandableContainer absolute = true` default: The Vue source always floated dropdown content; `false` was an incorrect React port
- CSS opacity/visibility instead of conditional mount: Keeps element in DOM so transitions apply; `h-0 overflow-hidden` prevents collapsed content from taking layout space
- RoundMenu wrapper div pattern: `Button` has no `style` prop so the radial `transform: translate3d` must live on a wrapper div. Button handles all button styling (round, icon, hover)
- FloatCard `card` prop pattern: `children` is the click trigger; `card` is the popover content rendered into a portal — matches FloatCard's designed API

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Button prop mismatch: aria-label, aria-expanded, title not in Button interface**
- **Found during:** Task 2 (RoundMenu Button replacement)
- **Issue:** Plan spec included `aria-label`, `aria-expanded`, `title` on Button calls but ButtonProps doesn't define these — TypeScript would error
- **Fix:** Moved `aria-label` and `title` to the wrapper div; removed `aria-expanded` (visual state covered by CSS class)
- **Files modified:** src/components/RoundMenu/RoundMenu.tsx
- **Verification:** `npx tsc --noEmit` passes with zero errors
- **Committed in:** cdf9b61 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - bug fix for TypeScript type safety)
**Impact on plan:** Necessary correction for TypeScript compliance. Accessibility semantics preserved by moving attributes to wrapper div.

## Issues Encountered
None — both tasks executed cleanly once Button prop constraints were identified.

## Next Phase Readiness
- ExpandableContainer CSS transition pattern is now established for all dropdown components
- RoundMenu, AutoComplete, and Input type=color are properly integrated with DS components
- UAT tests 8, 13, 18 should pass with these fixes

---
*Phase: 06-composite-components*
*Completed: 2026-03-18*
