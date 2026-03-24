---
phase: 07-complex-components
plan: 06
subsystem: storybook-stories
tags: [storybook, react, stories, history, crop, sidebar, tree]
dependency_graph:
  requires: []
  provides:
    - src/components/History/History.stories.tsx
    - src/components/Crop/Crop.stories.tsx
    - src/components/Sidebar/Sidebar.stories.tsx
    - src/components/Tree/Tree.stories.tsx
  affects: []
tech_stack:
  added: []
  patterns:
    - React render functions with useState for controlled state
    - makeRenderOption factory pattern for type-parametrized render props
    - Vue .stories.ts removal to eliminate storybook duplicate IDs
key_files:
  created:
    - src/components/History/History.stories.tsx
    - src/components/Crop/Crop.stories.tsx
    - src/components/Sidebar/Sidebar.stories.tsx
    - src/components/Tree/Tree.stories.tsx
  modified:
    - src/components/History/History.mdx
    - src/components/Sidebar/Sidebar.mdx
    - src/components/Tree/Tree.mdx
  deleted:
    - src/components/History/History.stories.ts
    - src/components/Crop/Crop.stories.ts
    - src/components/Sidebar/Sidebar.stories.ts
    - src/components/Tree/Tree.stories.ts
decisions:
  - "Vue .stories.ts files deleted alongside new .stories.tsx — Storybook rejects duplicate story IDs from same component"
  - "History.mdx, Sidebar.mdx, Tree.mdx updated to import from .stories.tsx — their .mdx files referenced the now-deleted .stories.ts files"
  - "makeRenderOption factory extracts type-parametrized JSX render prop from History story — avoids repeating the type-to-class mapping across 8 stories"
metrics:
  duration: 7m
  completed: "2026-03-20"
  tasks: 2
  files: 8
---

# Phase 7 Plan 06: History, Crop, Sidebar, Tree React Stories Summary

React Storybook `.stories.tsx` files for History (8 variants), Crop (1 variant), Sidebar (2 variants), and Tree (3 variants), replacing their Vue `.stories.ts` counterparts to close UAT gaps.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create History and Crop React stories | 778379a | History.stories.tsx, Crop.stories.tsx |
| 2 | Create Sidebar and Tree React stories | ad6d1fc | Sidebar.stories.tsx, Tree.stories.tsx |

## What Was Built

**History.stories.tsx** — 8 story exports matching Vue source variants:
- `Primary`: 6-person timeline with `renderOption` prop showing date + label with type-based colors
- `Positions`: All 4 positions (top/bottom/left/right) stacked in a flex column
- `Types`: All 6 types (primary/info/success/warning/danger/neutral) side by side
- `Disabled`: Same as Primary with `disabled={true}`
- `MultiType`: Options with individual type overrides per option
- `Icons`: Non-round icons (`isIconRound: false`)
- `IsIconRound`: Round icons (`isIconRound: true`)
- `Unfilled`: Icons with `unfilled: true`

**Crop.stories.tsx** — 1 story:
- `Primary`: Crop component with banner.jpg, displays cropped output image below

**Sidebar.stories.tsx** — 2 stories:
- `Primary`: Collapsed sidebar with 5-item navigation (Dashboard, Projects, Team, Analytics disabled, Settings bottom)
- `Expanded`: Same sidebar with `expanded={true}`

**Tree.stories.tsx** — 3 stories:
- `Primary`: Documents/Downloads/Music hierarchy with nested children, single selection
- `Multiple`: Same tree with `multiple={true}` for checkbox selection
- `Disabled`: Same tree with `disabled={true}`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Storybook duplicate story IDs from co-located .ts and .tsx story files**
- **Found during:** Task 1 verification (storybook build)
- **Issue:** Storybook indexed both `History.stories.ts` (Vue) and `History.stories.tsx` (React), raising "Duplicate stories with id" error and aborting build
- **Fix:** Deleted all 4 Vue `.stories.ts` files (History, Crop, Sidebar, Tree) following the same pattern as Accordion, Carousel, and other migrated components
- **Files modified:** Deleted History.stories.ts, Crop.stories.ts, Sidebar.stories.ts, Tree.stories.ts
- **Commit:** 778379a, ad6d1fc

**2. [Rule 3 - Blocking] .mdx files referencing deleted Vue story files**
- **Found during:** Task 1 verification (second storybook build after deleting .ts files)
- **Issue:** History.mdx imported `./History.stories.ts` and Tree.mdx imported `./Tree.stories.ts` — Storybook threw "Could not find or load CSF file" error
- **Fix:** Updated History.mdx → `./History.stories.tsx`, Tree.mdx → `./Tree.stories.tsx`, Sidebar.mdx → `./Sidebar.stories.tsx`
- **Files modified:** History.mdx, Tree.mdx, Sidebar.mdx
- **Commit:** 778379a, ad6d1fc

## Verification Results

```
grep -l "@storybook/react" src/components/History/History.stories.tsx ...
# All 4 files confirmed

Story counts:
- History.stories.tsx: 8 exports (Primary, Positions, Types, Disabled, MultiType, Icons, IsIconRound, Unfilled)
- Crop.stories.tsx: 1 export (Primary)
- Sidebar.stories.tsx: 2 exports (Primary, Expanded)
- Tree.stories.tsx: 3 exports (Primary, Multiple, Disabled)

npx storybook build → ✓ 354 modules transformed, ✓ built in 7.38s
```

## Self-Check: PASSED

Files exist:
- FOUND: src/components/History/History.stories.tsx
- FOUND: src/components/Crop/Crop.stories.tsx
- FOUND: src/components/Sidebar/Sidebar.stories.tsx
- FOUND: src/components/Tree/Tree.stories.tsx

Commits exist:
- FOUND: 778379a feat(07-06): create History and Crop React Storybook stories
- FOUND: ad6d1fc feat(07-06): create Sidebar and Tree React Storybook stories
