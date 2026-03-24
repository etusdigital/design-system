---
phase: 08-build-distribution
plan: 01
subsystem: ui
tags: [typescript, build, vite, tsc, react]

# Dependency graph
requires:
  - phase: 07-complex-components
    provides: All component TSX source files needed for type-checking
provides:
  - tsc -b tsconfig.lib.json exits with code 0 (zero type errors)
  - Clean build pipeline: npm run build:lib produces lib/ artifacts
  - ES2023 lib in tsconfig.lib.json for findLastIndex support
  - IconProps with style, size, and MouseEventHandler onClick types
affects: 08-02, 08-03

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "child.props unknown type: cast via (child.props as Record<string, unknown>).children"
    - "Functional updater workaround: use mutable refs for autoplay in useControllable components"
    - "Unknown model in JSX: coerce with !! boolean operator to prevent ReactNode type error"

key-files:
  created: []
  modified:
    - tsconfig.lib.json
    - src/components/Icon/Icon.tsx
    - src/components/Input/Input.tsx
    - src/components/TagInput/TagInput.tsx
    - src/components/Tooltip/Tooltip.tsx
    - src/components/FileUpload/FileUpload.tsx
    - src/components/ColorPicker/ColorPicker.tsx
    - src/components/Profile/Profile.tsx
    - src/components/RichTextEditor/RichTextEditor.tsx
    - src/components/Pagination/Pagination.tsx
    - src/components/Sidebar/Sidebar.tsx
    - src/components/Tree/Tree.tsx
    - src/components/MetricCard/MetricCard.tsx
    - src/utils/components/Container.tsx
    - src/components/AutoComplete/AutoComplete.tsx
    - src/components/Breadcrumb/Breadcrumb.tsx
    - src/components/Calendar/Calendar.tsx
    - src/components/Carousel/Carousel.tsx
    - src/components/Checkbox/Checkbox.tsx
    - src/components/RichTextEditor/Colors.tsx

key-decisions:
  - "ES2023 lib in tsconfig.lib.json enables Array.prototype.findLastIndex without polyfill"
  - "IconProps gains style?: CSSProperties and size?: string for Profile/ColorPicker usage"
  - "onClick type changed from Function to React.MouseEventHandler<HTMLSpanElement>"
  - "contentEditable placeholder replaced with data-placeholder attribute (HTML-compliant)"
  - "Carousel autoplay uses mutable refs for currentIndex/maxIndex to avoid functional updater on useControllable setModel"
  - "Breadcrumb FloatCard: open/onOpenChange props renamed to value/onChange to match FloatCardProps"
  - "src/composables/ was already removed and rollup-plugin-typescript2 already absent from package.json in prior commits"

requirements-completed: [DIST-01, DIST-02]

# Metrics
duration: 15min
completed: 2026-03-23
---

# Phase 08 Plan 01: Fix TypeScript Errors and Purge Vue Remnants Summary

**38 TypeScript type errors eliminated from tsc -b tsconfig.lib.json, unblocking npm run build:lib to produce lib/ output**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-23T21:00:00Z
- **Completed:** 2026-03-23T21:10:56Z
- **Tasks:** 2
- **Files modified:** 19

## Accomplishments
- Zero TypeScript errors: `tsc -b tsconfig.lib.json` now exits with code 0
- `npm run build:lib` completes fully, generating `lib/design-system.es.js`, `lib/design-system.cjs.js`, `lib/design-system.umd.js`, and `lib/index.css`
- IconProps updated with `style`, `size`, and properly typed `onClick` handler
- ES2023 lib target added to tsconfig.lib.json enabling `findLastIndex` without polyfill
- Vue composables directory and rollup-plugin-typescript2 confirmed absent (removed in prior phase commits)

## Task Commits

1. **Task 1: Fix all TypeScript type errors** - `e71007c` (fix)
2. **Task 2: Purge Vue remnants** - No new commit needed (already absent in HEAD)

## Files Created/Modified
- `tsconfig.lib.json` - lib upgraded to ES2023 for findLastIndex support
- `src/components/Icon/Icon.tsx` - Added style, size props; onClick typed as MouseEventHandler
- `src/components/Input/Input.tsx` - child.props cast via Record<string, unknown>
- `src/components/TagInput/TagInput.tsx` - child.props casts; useRef initialized with undefined
- `src/components/Tooltip/Tooltip.tsx` - child.props cast via Record<string, unknown>
- `src/components/FileUpload/FileUpload.tsx` - Removed unused Label import; child.props cast
- `src/components/ColorPicker/ColorPicker.tsx` - Removed unused React import
- `src/components/Profile/Profile.tsx` - Boolean coerce for unknown model in JSX conditionals
- `src/components/RichTextEditor/RichTextEditor.tsx` - placeholder -> data-placeholder on div
- `src/components/Sidebar/Sidebar.tsx` - Unused param e -> _e
- `src/components/Tree/Tree.tsx` - Removed unused parent variable
- `src/components/MetricCard/MetricCard.tsx` - Renamed tooltipMinWidth -> _tooltipMinWidth
- `src/utils/components/Container.tsx` - Removed unused useClickOutside import
- `src/components/AutoComplete/AutoComplete.tsx` - Removed unused useEffect/useRef/useClickOutside
- `src/components/Breadcrumb/Breadcrumb.tsx` - Fixed open/onOpenChange -> value/onChange for FloatCard
- `src/components/Calendar/Calendar.tsx` - JSX.Element -> React.JSX.Element; fixed RefObject null; removed dead comparison; renamed unused destructured vars
- `src/components/Carousel/Carousel.tsx` - Autoplay uses mutable refs to avoid functional updater on setModel
- `src/components/Checkbox/Checkbox.tsx` - onChange cast to boolean|null matching useControllable generic
- `src/components/RichTextEditor/Colors.tsx` - Removed unused useRef import

## Decisions Made
- ES2023 lib target chosen to support `findLastIndex` natively without runtime polyfill
- `onClick` on Icon component changed from `Function` to `React.MouseEventHandler<HTMLSpanElement>` for type safety
- Breadcrumb's `FloatCard` props corrected from Vue-style `open/onOpenChange` to React-style `value/onChange`
- Carousel autoplay replaced functional updater pattern with mutable refs (currentIndexRef, maxIndexRef, circularRef)
- `contentEditable` div in RichTextEditor uses `data-placeholder` instead of `placeholder` (not a valid HTML attribute on div)
- Profile's `unknown` model coerced to boolean with `!!` before JSX conditional rendering

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed additional TypeScript errors not in original plan file list**
- **Found during:** Task 1 (running tsc)
- **Issue:** tsc revealed errors in AutoComplete, Breadcrumb, Calendar, Carousel, Checkbox — not in the plan's `files_modified` list but blocking zero-error target
- **Fix:** Fixed all 38 errors across 19 files including 5 unplanned files
- **Files modified:** AutoComplete.tsx, Breadcrumb.tsx, Calendar.tsx, Carousel.tsx, Checkbox.tsx
- **Verification:** `tsc -b tsconfig.lib.json` exits 0 after all fixes
- **Committed in:** e71007c (Task 1 commit)

**2. [Rule 1 - Bug] Task 2 already complete in HEAD**
- **Found during:** Task 2
- **Issue:** src/composables/ was not in git index (removed in prior commit); rollup-plugin-typescript2 already absent from package.json
- **Fix:** Verified acceptance criteria pass, no new commit needed
- **Files modified:** None
- **Verification:** All Task 2 verification checks passed

---

**Total deviations:** 2 auto-detected (1 scope expansion for unplanned files, 1 pre-completed task)
**Impact on plan:** Scope expansion was required to achieve zero-error target. Pre-completed Task 2 had no impact.

## Issues Encountered
- `npm uninstall rollup-plugin-typescript2` required `--legacy-peer-deps` flag due to pre-existing @storybook/theming@8.x vs storybook@9.x peer conflict (same as Phase 1 decision)
- yarn.lock was modified by npm commands; restored to original state

## Next Phase Readiness
- Build pipeline fully unblocked: `tsc -b tsconfig.lib.json` exits 0, `npm run build:lib` produces lib/ artifacts
- Ready for Plan 02: package.json exports overhaul and multi-entry build config

---
*Phase: 08-build-distribution*
*Completed: 2026-03-23*
