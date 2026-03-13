---
phase: 01-foundation
plan: 02
subsystem: infra
tags: [storybook, react, vitest, jsdom, testing-library, rtl]

# Dependency graph
requires:
  - 01-01 (React 19 build toolchain, @vitejs/plugin-react-swc)
provides:
  - Storybook configured for React + Vite via @storybook/react-vite
  - .storybook/preview.tsx with React JSX theme decorator
  - Vitest 'unit' test project with jsdom environment
  - vitest.setup.ts importing @testing-library/jest-dom matchers
  - @testing-library/react installed for component tests
affects: [03, 04, 05, 06, 07, 08, 09]

# Tech tracking
tech-stack:
  added:
    - "@storybook/react-vite@9.1.3"
    - "@storybook/react@9.1.3"
    - "@testing-library/react@16.3.x"
    - "@testing-library/jest-dom@6.9.x"
    - "jsdom@28.1.x"
  patterns:
    - "Storybook uses React JSX decorators — no Vue setup() or app.use() pattern"
    - "Vitest multi-project: storybook (Playwright/Chromium) + unit (jsdom/RTL)"
    - "CSS strategy: Tailwind utility classes + component CSS files + clsx for conditionals + className prop on every component"

key-files:
  created:
    - .storybook/preview.tsx
    - vitest.setup.ts
  modified:
    - .storybook/main.ts
    - vite.config.ts
  deleted:
    - .storybook/preview.ts

key-decisions:
  - "Deleted .storybook/preview.ts and created preview.tsx — JSX extension required for the React decorator returning <div className={...}><Story /></div>"
  - "CSS scoping strategy documented as: Tailwind + component CSS files (existing pattern) + clsx for conditional class composition + className prop on every component"
  - "Material Symbols font DOM injection removed from preview (was Vue approach); font loaded via CSS @import in main.css per user decision from CONTEXT.md"

patterns-established:
  - "Theme decorator wraps story in <div className={`${theme}-theme`}> — identical visual behaviour to Vue withTheme but using React JSX"
  - "Unit tests live at src/**/*.test.ts and src/**/*.test.tsx — distinct from Storybook story files"

requirements-completed: [FOUND-08, FOUND-10, FOUND-11]

# Metrics
duration: ~2min
completed: 2026-03-13
---

# Phase 1 Plan 02: Configure Storybook for React and Add Vitest Unit Test Infrastructure Summary

**Storybook migrated from @storybook/vue3-vite to @storybook/react-vite with React JSX theme decorator, plus a jsdom Vitest project for React Testing Library unit tests**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-13T18:47:12Z
- **Completed:** 2026-03-13T18:49:00Z
- **Tasks:** 2
- **Files modified:** 4 (2 modified, 1 created, 1 deleted)

## Accomplishments

- Rewrote .storybook/main.ts: `@storybook/vue3-vite` framework replaced with `@storybook/react-vite`
- Deleted .storybook/preview.ts (Vue version with `setup()`, `app.use(DesignSystem)`, Vue template string decorator)
- Created .storybook/preview.tsx: React JSX decorator wrapping stories in `<div className="${theme}-theme">`, all parameters and globalTypes preserved exactly
- Removed Material Symbols font DOM injection from preview (loaded via main.css @import)
- Added Vitest 'unit' test project to vite.config.ts `test.projects` array with jsdom + RTL setup
- Created vitest.setup.ts importing `@testing-library/jest-dom` matchers
- Installed: @storybook/react-vite@9.1.3, @storybook/react@9.1.3, @testing-library/react@16, @testing-library/jest-dom@6, jsdom@28

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate Storybook from Vue to React and install testing deps** - `a36e35f` (feat)
2. **Task 2: Add Vitest unit test project with jsdom + RTL and document CSS strategy** - `e63e11c` (feat)

**Plan metadata:** TBD (docs: complete plan)

## Files Created/Modified

- `.storybook/main.ts` - Framework changed from @storybook/vue3-vite to @storybook/react-vite
- `.storybook/preview.tsx` - React JSX decorator, no Vue imports, all parameters preserved
- `.storybook/preview.ts` - DELETED (Vue version)
- `vite.config.ts` - Added 'unit' test project with jsdom environment and vitest.setup.ts
- `vitest.setup.ts` - Created, imports @testing-library/jest-dom

## Decisions Made

- Created `preview.tsx` (not `.ts`) because the React JSX decorator uses JSX syntax that TypeScript requires a `.tsx` extension for.
- Material Symbols font DOM injection removed from preview — the Vue preview was injecting a `<link>` into `document.head` at runtime. In React Storybook this is unnecessary because the font is loaded via `@import` in `main.css`, which Storybook already imports via the `import '@/assets/main.css'` line in preview.
- CSS scoping strategy: Tailwind utility classes + component CSS files (existing patterns kept) + `clsx` for conditional class composition (installed in Plan 01) + every component accepts a `className` prop. This is the "keep what exists and add clsx + className prop" approach documented in CONTEXT.md.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Storybook is ready to render React `.stories.tsx` files via `npx storybook dev`
- Vitest unit test runner is ready for `src/**/*.test.tsx` files with jsdom + RTL matchers
- Plan 03 (hooks: useControllable, useTransition) and Plan 04 (Icon component) can use both
- CSS scoping strategy is locked: Tailwind + component CSS + clsx + className prop

---
*Phase: 01-foundation*
*Completed: 2026-03-13*

## Self-Check: PASSED

- .storybook/main.ts: FOUND
- .storybook/preview.tsx: FOUND
- .storybook/preview.ts: CONFIRMED DELETED
- vitest.setup.ts: FOUND
- vite.config.ts: FOUND
- 01-02-SUMMARY.md: FOUND
- Commit a36e35f: FOUND
- Commit e63e11c: FOUND
