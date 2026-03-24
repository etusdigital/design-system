---
phase: 04-internal-components
plan: "03"
subsystem: ui
tags: [react, tsx, dropdown, select, expandable, container, observer]

requires:
  - phase: 04-internal-components/04-02
    provides: Container.tsx base component with renderContent prop pattern

provides:
  - ExpandableContainer: absolute-positioned expandable card wrapper around Container
  - SelectContent: search input + icon state management for select dropdowns
  - SelectContainer: select dropdown container with ResizeObserver + MutationObserver

affects:
  - phase-06-select-components
  - phase-06-autocomplete
  - phase-06-tagselect
  - phase-06-dropdown
  - phase-06-colorpicker
  - phase-06-datepicker

tech-stack:
  added: []
  patterns:
    - "isExpandedRef pattern: mutable ref tracks boolean for stale-closure-safe observer callbacks"
    - "sc- prefix on CSS classes to avoid collision with Container's generic .content/.actions names"
    - "dual useControllable pattern: separate hooks for search string and expanded boolean in SelectContent"
    - "post-render useEffect with no deps array as Vue onUpdated equivalent (safe when only sets DOM style)"

key-files:
  created:
    - src/utils/components/ExpandableContainer.tsx
    - src/utils/components/SelectContent.tsx
    - src/utils/components/SelectContainer.tsx
    - src/utils/styles/SelectContent.css
    - src/utils/styles/SelectContainer.css
  modified:
    - src/utils/components/ExpandableContainer.test.tsx
    - src/utils/components/SelectContent.test.tsx
    - src/utils/components/SelectContainer.test.tsx

key-decisions:
  - "SelectContainer content-wrapper is unmounted when collapsed (React renderContent returns null) rather than v-show hidden; visual behavior identical"
  - "isExpandedRef mutable ref pattern for observer callbacks avoids stale closure without re-registering observers"
  - "sc-icon CSS class in SelectContent instead of .icon.icon double-class specificity hack from Vue scoped styles"
  - "display:none removed from content-wrapper; ExpandableContainer renderContent returning null handles hide"

patterns-established:
  - "Mutable ref for latest boolean state in useEffect-registered callbacks (isExpandedRef pattern)"
  - "Dual useControllable for components managing two independent state axes (search + expanded)"

requirements-completed:
  - INTL-04
  - INTL-05
  - INTL-08

duration: 3min
completed: 2026-03-16
---

# Phase 4 Plan 03: ExpandableContainer, SelectContent, SelectContainer Summary

**Dropdown infrastructure chain migrated: ExpandableContainer (absolute card wrapper),
SelectContent (search + icon state), SelectContainer (ResizeObserver/MutationObserver
slide animation) — all 7 Phase 4 Vue components now have React TSX equivalents**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-16T23:15:44Z
- **Completed:** 2026-03-16T23:18:33Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- ExpandableContainer wraps Container with absolute z-[80] positioning, card styling
  (shadow-neutral-selected, border-xxs, rounded-sm), and alignRight left-0/right-0 toggle
- SelectContent manages dual useControllable (search string + expanded boolean),
  auto-focuses search input on expand, icon changes color by state
- SelectContainer wraps ExpandableContainer with ResizeObserver + MutationObserver,
  200ms mount delay, slide animation CSS, actions footer, secondary variant
- All 57 utils/components tests pass (18 new tests added across 3 components)

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate ExpandableContainer and SelectContent** - `0469b28` (feat)
2. **Task 2: Migrate SelectContainer** - `fbb61f1` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified
- `src/utils/components/ExpandableContainer.tsx` - Absolute-positioned card wrapper around Container
- `src/utils/components/ExpandableContainer.test.tsx` - 5 tests for expand/card/alignRight
- `src/utils/components/SelectContent.tsx` - Search input + icon state management
- `src/utils/components/SelectContent.test.tsx` - 6 tests for searchable/icon/status
- `src/utils/styles/SelectContent.css` - .sc-icon states, .search, .search-placeholder
- `src/utils/components/SelectContainer.tsx` - ResizeObserver + MutationObserver dropdown container
- `src/utils/components/SelectContainer.test.tsx` - 7 tests for expand/options/actions
- `src/utils/styles/SelectContainer.css` - .sc-content slide animation, .sc-actions footer

## Decisions Made

- React's `renderContent` returns `null` when collapsed (unmounts content-wrapper), rather
  than Vue's `v-show` which keeps it in DOM — visual behavior is identical, test updated
  to assert `querySelector` returns null (not display:none)
- `isExpandedRef` mutable ref pattern used in observer callbacks to read latest expanded
  state without re-registering observers on every render
- `.sc-icon` CSS class instead of `.icon.icon` double-class Vue specificity trick — flat CSS
  scoping requires unique class names

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed unnecessary display:none from content-wrapper**
- **Found during:** Task 2 (SelectContainer test for hidden state)
- **Issue:** content-wrapper inside ExpandableContainer's renderContent prop is never rendered
  when collapsed (renderContent returns null) — the display:none was redundant and the test
  for `display: 'none'` was asserting behavior that doesn't match React's actual rendering
- **Fix:** Removed `style={{ display: isExpanded ? undefined : 'none' }}` from content-wrapper;
  updated test to assert `querySelector('.content-wrapper')` returns null when collapsed
- **Files modified:** SelectContainer.tsx, SelectContainer.test.tsx
- **Verification:** All 7 SelectContainer tests pass
- **Committed in:** fbb61f1 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - bug in test assumption)
**Impact on plan:** Negligible — behavior is correct, test assertion was wrong about mechanism.

## Issues Encountered
None - both components migrated cleanly. ResizeObserver already polyfilled in vitest.setup.ts.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 7 Phase 4 internal utility components migrated to React TSX
- Phase 6 (Select, AutoComplete, TagSelect, Dropdown, ColorPicker, DatePicker) can proceed
- SelectContainer is the primary composable for all dropdown-based Phase 6 components

---
*Phase: 04-internal-components*
*Completed: 2026-03-16*

## Self-Check: PASSED

- FOUND: src/utils/components/ExpandableContainer.tsx
- FOUND: src/utils/components/SelectContent.tsx
- FOUND: src/utils/components/SelectContainer.tsx
- FOUND: src/utils/styles/SelectContent.css
- FOUND: src/utils/styles/SelectContainer.css
- FOUND: .planning/phases/04-internal-components/04-03-SUMMARY.md
- FOUND: commit 0469b28 (Task 1)
- FOUND: commit fbb61f1 (Task 2)
