---
phase: 06-composite-components
plan: 17
subsystem: composite-components
tags: [accordion, tab, color-picker, bug-fix, icons, stale-closure]
dependency_graph:
  requires: []
  provides: [accordion-expand-fix, tab-icon-support, color-picker-no-shadow]
  affects: [Accordion, Tab, ColorPicker]
tech_stack:
  added: []
  patterns: [isExpandedRef mutable ref pattern, conditional CSS module classes, Icon compound rendering]
key_files:
  created: []
  modified:
    - src/components/Accordion/Accordion.tsx
    - src/components/Tab/Tab.tsx
    - src/components/Tab/Tab.module.css
    - src/components/ColorPicker/ColorPicker.tsx
    - src/components/ColorPicker/ColorPicker.module.css
decisions:
  - "isExpandedRef mutable ref pattern applied to Accordion — same approach as Slider and SelectContainer observer callbacks"
  - "Tab icon rendering uses two-branch logic: icon+text for object options with icon field, icon-only for string options when isIcon=true"
  - "ColorPicker noShadow uses .colorPicker.noShadow compound selector for correct CSS specificity"
metrics:
  duration: "2 minutes"
  completed_date: "2026-03-18"
  tasks_completed: 2
  files_modified: 5
---

# Phase 06 Plan 17: Accordion/Tab/ColorPicker Bug Fixes Summary

**One-liner:** Fixed Accordion stale ResizeObserver closure + phantom gap, added Icon rendering to Tab with isIcon/icon-field support, added noShadow prop to ColorPicker.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix Accordion stale closure and phantom gap | 15e6fe0 | src/components/Accordion/Accordion.tsx |
| 2 | Add icon support to Tab and noShadow to ColorPicker | 06919f1 | src/components/Tab/Tab.tsx, Tab.module.css, ColorPicker.tsx, ColorPicker.module.css |

## What Was Built

### Task 1: Accordion Bug Fixes

Two independent bugs fixed:

**Stale ResizeObserver closure:** The mount-only `useEffect` created a `ResizeObserver` that called `resize()`, which captured `isExpanded` from initial render (always `false`). When user clicked to expand, observer fired and set `maxHeight` back to `0px`. Fix: added `isExpandedRef = useRef(isExpanded)` synced on every render; `resize()` now reads `isExpandedRef.current`.

**Phantom gap:** `gap-sm` (12px) on the card wrapper flex container created visible space below collapsed headers even when content had `maxHeight: 0px`. Fix: removed `gap-sm` from `className` on card wrapper div.

### Task 2: Tab Icon Support + ColorPicker noShadow

**Tab icons:** Added `isIcon?: boolean` prop and updated `options` type to accept `{ label: string; icon?: string; ... }` objects. Rendering is now three-branch:
- Object option with `icon` field → `<Icon>` + `<span>label</span>`
- String option with `isIcon=true` → `<Icon>` only
- Otherwise → `<span>label</span>` (backward compatible)

Added `flex items-center gap-xxs` to `.tabButton` for vertical alignment and `.icon { @apply text-lg; }` rule for icon sizing.

**ColorPicker noShadow:** Added `noShadow?: boolean` prop (default `false`). Applied conditionally via `clsx(styles.colorPicker, noShadow && styles.noShadow, ...)`. CSS: `.colorPicker.noShadow { box-shadow: none; }` using compound selector for correct specificity over `.colorPicker`'s `shadow-neutral-default`.

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- Accordion: `isExpandedRef` present in file, `gap-sm` absent from card wrapper — PASS
- Tab: `isIcon` prop present, `Icon` import present, two-branch rendering in place — PASS
- ColorPicker: `noShadow` prop present, `styles.noShadow` applied conditionally — PASS

## Self-Check: PASSED

Files exist:
- src/components/Accordion/Accordion.tsx — FOUND
- src/components/Tab/Tab.tsx — FOUND
- src/components/Tab/Tab.module.css — FOUND
- src/components/ColorPicker/ColorPicker.tsx — FOUND
- src/components/ColorPicker/ColorPicker.module.css — FOUND

Commits exist:
- 15e6fe0 (Accordion fix) — FOUND
- 06919f1 (Tab + ColorPicker) — FOUND
