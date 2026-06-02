---
phase: 07-complex-components
plan: "08"
subsystem: ui
tags: [react, css-modules, tailwind, svg, html-sanitizer, history, crop, rich-text-editor]

requires:
  - phase: 07-complex-components
    provides: History, Crop, RichTextEditor components

provides:
  - History CSS with 32x32 icon circles, 3px connector borders, default type color fills
  - Crop SVG mask isolation via useId (independent per-instance mask IDs)
  - RichTextEditor sanitizer preserving font tag and color attribute from execCommand output

affects: [07-complex-components]

tech-stack:
  added: []
  patterns:
    - "useId() for unique SVG element IDs in components that may appear multiple times on a page"
    - "ALLOWED_TAGS/ALLOWED_ATTRS allowlists must include browser execCommand output tags (font, color)"

key-files:
  created: []
  modified:
    - src/components/History/History.module.css
    - src/components/Crop/Crop.tsx
    - src/components/RichTextEditor/RichTextEditor.tsx

key-decisions:
  - "useId() from React 18 generates stable unique IDs per component instance — no external library or manual counter needed for SVG mask isolation"
  - "execCommand('foreColor') and execCommand('backColor') emit <font color=...> tags — ALLOWED_TAGS must include 'font' and ALLOWED_ATTRS must include 'color' for color formatting to survive sanitization"
  - "Default type circle fills added as non-active CSS rules before active variants — CSS specificity preserved since active rules retain z-[2] and disabled rules retain their own overrides"

patterns-established:
  - "SVG inline IDs: always use useId() when a component renders SVG with id/mask references to prevent cross-instance collisions"
  - "HTML sanitizer: when using execCommand-based rich text editing, keep allowlists in sync with what browsers actually emit (font, color)"

requirements-completed: [CPLX-05, CPLX-06, CPLX-04]

duration: 2min
completed: 2026-03-23
---

# Phase 7 Plan 08: UAT Gap Closure — History Styling, Crop Mask, RichTextEditor Sanitizer Summary

**History icon circles resized to 32x32px with 3px connectors and idle type color fills; Crop SVG mask isolation via useId; RichTextEditor sanitizer allowlisted to preserve font/color from execCommand**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-23T17:43:36Z
- **Completed:** 2026-03-23T17:45:52Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- History.module.css: `.circleIcon` now explicitly 32x32 (was inheriting 10x10 from `.circle` base); all four position connector borders updated from 1.5px to 3px; six default type circle fill rules added for idle state
- Crop.tsx: `useId()` imported and used to generate a unique `maskId` per instance; `<mask id>` and `mask="url(#...)"` reference both use `maskId` — two Crop instances on the same page no longer share a mask and corrupt each other
- RichTextEditor.tsx: `'font'` added to `ALLOWED_TAGS` and `'color'` added to `ALLOWED_ATTRS` — browser `execCommand('foreColor'/'backColor')` emits `<font color=...>` which previously was stripped by the sanitizer, leaving no color applied

## Task Commits

1. **Task 1: Fix History CSS** - `19714da` (fix)
2. **Task 2: Fix Crop unique SVG mask ID and RichTextEditor color sanitizer** - `b15479a` (fix)

## Files Created/Modified

- `src/components/History/History.module.css` - 32x32 circle icons, 3px connectors, default type fills
- `src/components/Crop/Crop.tsx` - useId for unique SVG mask ID per instance
- `src/components/RichTextEditor/RichTextEditor.tsx` - 'font' tag and 'color' attr in sanitizer allowlists

## Decisions Made

- `useId()` from React 18 — no external library or manual counter needed; generates stable, unique IDs per component instance per render tree position
- `execCommand('foreColor')` and `execCommand('backColor')` emit `<font color=...>` in all major browsers — allowlists must include `'font'` tag and `'color'` attribute for these commands to have any effect after sanitization

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

The first task commit was captured with the wrong commit message and included Sidebar.module.css (a pre-existing staged file from a prior plan). The History.module.css changes themselves are correct in the commit. The second task commit was rejected on first attempt due to commitlint subject-case rule (subject must be lowercase); resubmitted with lowercase subject, accepted.

## Next Phase Readiness

- Three of seven UAT gaps from Phase 7 UAT are now closed (History styling, Crop mask isolation, RichTextEditor color)
- Remaining UAT gaps (plans 09-11) can proceed independently

---
*Phase: 07-complex-components*
*Completed: 2026-03-23*
