---
phase: 07-complex-components
plan: 11
subsystem: testing
tags: [react, vitest, testing-library, portal, CSS-modules, composite-components]

# Dependency graph
requires:
  - phase: 07-complex-components
    provides: RoundMenu, Stepper, Filter, DatePicker, Select, AutoComplete, TagSelect, Dropdown, Navbar production components
provides:
  - All 9 composite component test files passing with accurate component interface queries
  - Portal-aware test patterns using document.querySelectorAll for FloatCard-portaled content
  - CSS module-aware class queries using [class*="..."] selectors
affects: [07-complex-components, test-patterns, portal-queries]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Portal-aware test pattern: use document.querySelectorAll instead of container.querySelectorAll for components using FloatCard (SelectContainer/ExpandableContainer chain)"
    - "CSS module class matching: use [class*='className'] in tests since CSS modules hash class names"
    - "AutoComplete fake timer pattern: vi.useFakeTimers() + focus + click + runAllTimers to open component with setTimeout-based expand logic"
    - "Trigger query pattern: getAllByRole('button').at(-1) for RoundMenu trigger (last button rendered)"

key-files:
  created: []
  modified:
    - src/components/RoundMenu/RoundMenu.test.tsx
    - src/components/Stepper/Stepper.test.tsx
    - src/components/Filter/Filter.test.tsx
    - src/components/DatePicker/DatePicker.test.tsx
    - src/components/Select/Select.test.tsx
    - src/components/AutoComplete/AutoComplete.test.tsx
    - src/components/TagSelect/TagSelect.test.tsx
    - src/components/Dropdown/Dropdown.test.tsx
    - src/components/Navbar/Navbar.test.tsx
    - src/components/Dropdown/Dropdown.tsx

key-decisions:
  - "AutoComplete accepts string[]|number[] only — tests updated to use string options, not object options"
  - "Stepper onChange emits getValue(option) which is the labelKey string by default, not an index number"
  - "AutoComplete opens via focus+click+setTimeout flush (vi.useFakeTimers required)"
  - "Dropdown.tsx had broken @/utils/components/SelectContent.tsx import (included .tsx extension) — fixed to relative path"
  - "Navbar profile prop is {name, src} object not React.ReactNode — tests updated accordingly"

patterns-established:
  - "Portal test pattern: SelectContainer/ExpandableContainer/Container/FloatCard chain portals options to document.body — always use document.querySelectorAll for option queries"
  - "CSS Module test pattern: always use [class*='partialName'] since CSS modules hash class names in test environment"

requirements-completed: [CPLX-01, CPLX-02, CPLX-03, CPLX-04, CPLX-05, CPLX-06]

# Metrics
duration: 25min
completed: 2026-03-23
---

# Phase 07 Plan 11: Fix 9 Composite Component Test Files Summary

**9 composite component test files updated to match actual React interfaces: portal-aware queries, CSS module-aware class matching, and component-accurate prop/behavior assertions**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-03-23T14:30:00Z
- **Completed:** 2026-03-23T14:57:00Z
- **Tasks:** 2
- **Files modified:** 10 (9 test files + 1 production fix)

## Accomplishments
- Fixed all 9 composite component test files (85 tests passing, 0 failures)
- Discovered and fixed broken import in Dropdown.tsx (blocking file-level crash)
- Established portal-aware test patterns for all Select-family components
- Full test suite: 396 tests passing, 0 failures

## Task Commits

1. **Task 1: Fix RoundMenu, Stepper, Filter, DatePicker tests** - `29d9cfb` (fix)
2. **Task 2: Fix Select, AutoComplete, TagSelect, Dropdown, Navbar tests** - `5c3263e` (fix)

## Files Created/Modified
- `src/components/RoundMenu/RoundMenu.test.tsx` - Query trigger by role, menu items by aria-label on wrapper div
- `src/components/Stepper/Stepper.test.tsx` - Use [class*='step'] not 'circle', fix onChange to expect label string
- `src/components/Filter/Filter.test.tsx` - document.querySelectorAll for portal-rendered content
- `src/components/DatePicker/DatePicker.test.tsx` - getAllByText for labelValue (appears in multiple elements)
- `src/components/Select/Select.test.tsx` - document.querySelectorAll for portal options
- `src/components/AutoComplete/AutoComplete.test.tsx` - fake timers, string options, document portal queries
- `src/components/TagSelect/TagSelect.test.tsx` - document.querySelectorAll for portal options
- `src/components/Dropdown/Dropdown.test.tsx` - Fix flyout group assertions, import fixed
- `src/components/Navbar/Navbar.test.tsx` - Fix profile prop type, portal-aware nav option queries
- `src/components/Dropdown/Dropdown.tsx` - Fix broken `@/utils/components/SelectContent.tsx` import (removed .tsx extension)

## Decisions Made
- AutoComplete only accepts `string[] | number[]` — tests rewritten with string options
- Stepper `onChange` emits `getValue(option)` (label string by default), not index number
- AutoComplete requires fake timers for expansion (setTimeout-based logic)
- Dropdown flyout sub-items only render after clicking group header (not immediately)
- Navbar `profile` is `{name: string; src?: string}` object, not React.ReactNode

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed broken import in Dropdown.tsx**
- **Found during:** Task 2 (Dropdown/Navbar file-level crash)
- **Issue:** `import { SelectContent } from "@/utils/components/SelectContent.tsx"` — the `.tsx` extension in the import path caused Vite/Vitest to fail resolution even though the `@` alias was correctly configured
- **Fix:** Changed to relative import `../../utils/components/SelectContent`
- **Files modified:** src/components/Dropdown/Dropdown.tsx
- **Verification:** Dropdown and Navbar tests pass after fix
- **Committed in:** 5c3263e (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - bug)
**Impact on plan:** The Dropdown import fix was necessary to unblock Dropdown and Navbar test files. No scope creep.

## Issues Encountered
- AutoComplete's expansion mechanism uses `setTimeout` + a plain JS `focus` variable (not React state), making it impossible to open synchronously without fake timers
- Dropdown flyout items (nested groups) only render when `subExpanded=true` — tests asserting all nested items visible immediately were incorrect
- AutoComplete accepts only primitive arrays, not object arrays — test data was incompatible with the component interface

## Self-Check: PASSED

All key files exist and all task commits are verified in git history.

## Next Phase Readiness
- All 9 composite component test files pass
- Combined with plan 07-10: all test files across Phase 7 are green
- 396 total tests passing, 0 failures
- Phase 7 gap closure complete

---
*Phase: 07-complex-components*
*Completed: 2026-03-23*
