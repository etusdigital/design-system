---
phase: 01-foundation
plan: 05
subsystem: ui
tags: [react, storybook, material-symbols, tsconfig, package-exports, gap-closure]

# Dependency graph
requires:
  - phase: 01-04
    provides: Icon component (Icon.tsx) and hooks (useControllable, useTransition)
provides:
  - src/components/Icon/Icon.stories.tsx: React CSF3 story file for Storybook verification
  - src/components/Icon/Icon.css: Material Symbols font-variation-settings rules
  - .storybook/preview.tsx: Material Symbols font loading restored
  - tsconfig.lib.json: composables excluded, old stories excluded
  - package.json: ./hooks/* export replaces broken ./composables/*
affects: [all-phases-with-storybook-stories]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Component CSS: separate .css file imported in .tsx for non-scoped styles (replaces Vue <style> blocks)"
    - "Storybook font loading: dynamic <link> injection in preview.tsx for external fonts"

key-files:
  created:
    - src/components/Icon/Icon.stories.tsx
    - src/components/Icon/Icon.css
  modified:
    - src/components/Icon/Icon.tsx
    - .storybook/preview.tsx
    - tsconfig.lib.json
    - package.json

key-decisions:
  - "Material Symbols font loaded via dynamic <link> in preview.tsx (same approach as Vue-era preview.ts)"
  - "Icon CSS rules (font-variation-settings, user-select) in separate Icon.css file imported by Icon.tsx"
  - "Story exports match Vue naming: Primary, Filled (MDX references Icon.Primary, Icon.Filled)"
  - "tsconfig.lib.json excludes src/**/*.stories*.ts glob to catch .stories-old.ts files"

patterns-established:
  - "Component CSS pattern: Vue <style> block rules → separate ComponentName.css imported in ComponentName.tsx"

requirements-completed: [FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08, FOUND-09, FOUND-10, FOUND-11, FOUND-12]

# Metrics
duration: 8min
completed: 2026-03-13
---

# Phase 1 Plan 05: Gap Closure — Storybook Story, Font Loading, Config Fixes

**React CSF3 Icon story with Material Symbols font restored, tsconfig composables exclusion, and package.json hooks export — closes all 3 Phase 1 verification gaps**

## Performance

- **Duration:** ~8 min (including human verification checkpoint)
- **Started:** 2026-03-13T19:05:00Z
- **Completed:** 2026-03-13T19:13:00Z
- **Tasks:** 2 (1 auto + 1 human-verify checkpoint)
- **Files modified:** 6 (2 created, 4 modified)

## Accomplishments

- Created React CSF3 story file for Icon (Primary + Filled variants matching Vue naming)
- Restored Material Symbols Rounded font loading in Storybook preview (lost during Vue→React migration)
- Added Icon.css with font-variation-settings rules from Icon.vue's `<style>` block
- Fixed tsconfig.lib.json to exclude composables and old Vue story files
- Replaced broken `./composables/*` package export with `./hooks/*`
- Human verified: Icon renders correctly in Storybook with all variants

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Icon.stories.tsx and fix legacy config** - `eddf70b` (feat(01-05))
2. **Task 2: Restore Material Symbols font and Icon CSS** - `f56586d` (fix(01-05))

## Files Created/Modified

- `src/components/Icon/Icon.stories.tsx` - React CSF3 story with Primary and Filled variants
- `src/components/Icon/Icon.css` - Material Symbols font-variation-settings and user-select rules
- `src/components/Icon/Icon.tsx` - Added Icon.css import
- `.storybook/preview.tsx` - Restored Material Symbols font <link> injection
- `tsconfig.lib.json` - Added composables and .stories-old.ts exclusions
- `package.json` - Replaced ./composables/* with ./hooks/* in exports

## Decisions Made

- Material Symbols font loaded via dynamic `<link>` element in preview.tsx (same pattern as Vue-era preview.ts)
- Icon CSS rules extracted to separate Icon.css file (pattern for all future component CSS migrations from Vue `<style>` blocks)
- tsconfig exclude uses `src/**/*.stories*.ts` glob to catch renamed old Vue story files

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Material Symbols font not loading in Storybook**
- **Found during:** Task 2 (Human verification)
- **Issue:** Vue-era preview.ts injected Material Symbols font via dynamic `<link>`, lost during React migration. Icons rendered as empty spans.
- **Fix:** Restored font loading in .storybook/preview.tsx, created Icon.css with font-variation-settings
- **Files modified:** .storybook/preview.tsx, src/components/Icon/Icon.css, src/components/Icon/Icon.tsx
- **Verification:** Human confirmed icons render in Storybook
- **Committed in:** f56586d

**2. [Rule 3 - Blocking] Old Vue story file breaking tsc build**
- **Found during:** Task 2 (build verification)
- **Issue:** `Icon.stories-old.ts` imports `@storybook/vue3` which is uninstalled; glob `*.stories.ts` doesn't match `*.stories-old.ts`
- **Fix:** Added `src/**/*.stories*.ts` to tsconfig.lib.json exclude
- **Files modified:** tsconfig.lib.json
- **Verification:** `tsc -b tsconfig.lib.json --noEmit` passes clean
- **Committed in:** f56586d

---

**Total deviations:** 2 auto-fixed (1 missing critical, 1 blocking)
**Impact on plan:** Both fixes essential for Storybook rendering and build. No scope creep.

## Issues Encountered

- Material Symbols font was loaded in Vue-era preview.ts but not migrated to React preview.tsx during plan 01-02 — caused icons to render as empty text spans
- Icon.vue had `<style>` block with font-variation-settings that were not carried over to React component

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All Phase 1 verification gaps closed
- Icon component fully functional with Storybook story
- Build passes clean (`tsc -b tsconfig.lib.json`)
- Pattern established: Vue `<style>` blocks → separate .css files imported in .tsx
- Ready for phase verification

---
*Phase: 01-foundation*
*Completed: 2026-03-13*
