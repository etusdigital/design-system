---
phase: 03-form-components
plan: 09
subsystem: ui
tags: [react, input, tailwind, validation, storybook]

# Dependency graph
requires:
  - phase: 03-form-components
    provides: Input component with number type, domain/url types, and blur validation logic
provides:
  - Input inner border neutralized via border-0 on .inputContent
  - Number arrows vertically centered by removing mt-xxs offset
  - Domain/url blur validation auto-generates error message via validationError state
  - applyMask no-op cases for domain/url/email
  - DomainType and UrlType Storybook stories
affects: [03-form-components UAT, future Input consumers]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Internal validationError state pattern: separate from hasError to carry typed message string for domain/url types"
    - "applyMask explicit no-op cases: document intent that domain/url/email are validation-only, not character-masking"

key-files:
  created: []
  modified:
    - src/components/Input/Input.module.css
    - src/components/Input/Input.tsx
    - src/utils/index.ts
    - src/components/Input/Input.stories.tsx

key-decisions:
  - "validationError state is separate from hasError boolean — carries the message string for domain/url blur feedback without requiring an errorMessage prop"
  - "Domain/url blur treats empty value as valid (no error on empty blur) — matches expected UX for optional fields"

patterns-established:
  - "Internal validation message pattern: useState<string>('') for typed error, set on blur, shown alongside prop-based errorMessage"

requirements-completed: [FORM-05, FORM-06]

# Metrics
duration: 2min
completed: 2026-03-16
---

# Phase 03 Plan 09: Input Border, Number Arrows, and Domain/URL Validation Summary

**Input inner border removed via border-0, number arrows centered by removing mt-xxs, domain/url blur now auto-displays validation error messages via internal state**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-16T21:05:55Z
- **Completed:** 2026-03-16T21:07:50Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Neutralized @tailwindcss/forms injected 1px border on `.inputContent` by adding `border-0` to the Tailwind apply directive
- Fixed number arrows vertical alignment by removing `mt-xxs` from the arrows wrapper div — the flex `items-center` on `.numberArrows` handles centering
- Added `validationError` internal state with blur handler updates for domain/url types — when invalid input is blurred, the error message appears automatically without requiring `errorMessage` prop
- Added explicit no-op `case "domain": case "url": case "email":` branches in `applyMask` to document intent that these types are validation-only
- Added `DomainType` and `UrlType` Storybook stories that demonstrate blur-triggered validation feedback

## Task Commits

1. **Task 1: Fix Input inner border, number arrows, and domain/url validation** - `c0d30d0` (fix)
2. **Task 2: Add domain and URL stories with validation feedback** - `789249c` (feat)

## Files Created/Modified

- `src/components/Input/Input.module.css` - Added `border-0` to `.inputContent` @apply
- `src/components/Input/Input.tsx` - Added `validationError` state, updated blur handler and error render
- `src/utils/index.ts` - Added no-op cases for domain/url/email in applyMask switch
- `src/components/Input/Input.stories.tsx` - Added DomainType and UrlType stories

## Decisions Made

- `validationError` state is separate from `hasError` boolean — carries the message string for domain/url blur feedback without requiring an `errorMessage` prop to be passed
- Empty value on blur is treated as valid (no error shown) — matches expected UX for optional fields

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Storybook build (`--test`) fails due to pre-existing Vue file import errors (`Accordion.vue`, etc.) — unrelated to this plan's changes. All Input tests pass (vitest unit).

## Next Phase Readiness

- UAT gaps 3 and 4 are now closed: inner border removed, number arrows centered, domain/url show validation on blur
- Input component is ready for re-test against UAT tests 5 and 6

---
*Phase: 03-form-components*
*Completed: 2026-03-16*
