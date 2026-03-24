---
phase: 06-composite-components
plan: 22
subsystem: Calendar
tags: [calendar, css, animation, card, toggled-panels]
dependency_graph:
  requires: [06-16]
  provides: [Calendar visual overhaul, CalendarDateDialog toggled panels]
  affects: [src/components/Calendar/Calendar.tsx, src/components/Calendar/Calendar.module.css]
tech_stack:
  added: []
  patterns: [toggled-panel state, Card wrapper, useEffect scroll-to-active, CSS keyframe animation]
key_files:
  created: []
  modified:
    - src/components/Calendar/Calendar.module.css
    - src/components/Calendar/Calendar.tsx
decisions:
  - CalendarDateDialog activePanel state (month | year | null) drives mutually exclusive panel display — one panel visible at a time, matching Vue show.month / show.year logic
  - dialogEnter / dialogLeave CSS classes bound to isOpen prop on the Card wrapper for fade-scale animation
  - yearRange generated as currentYear-10..currentYear+10 array; useEffect scrolls yearActive element into view when year panel opens
  - Card component wraps CalendarDateDialog replacing plain div for consistent surface styling
metrics:
  duration: 2 minutes
  completed: 2026-03-18
  tasks_completed: 2
  files_modified: 2
---

# Phase 06 Plan 22: Calendar Visual Overhaul and Dialog Restructure Summary

**One-liner:** Calendar nav arrows now use bordered rounded-box styling, selected dates show filled primary bg, and CalendarDateDialog uses Card wrapper with separate month/year toggled panels and fade-scale animation.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Fix Calendar CSS and nav button styling | 00b64af | Calendar.module.css |
| 2 | Restructure CalendarDateDialog with toggled panels and Card wrapper | 48ed9cb | Calendar.tsx |

## What Was Built

**Task 1 — CSS overhaul:**
- Fixed syntax error on `.dayCell.selected` (trailing `'` character removed)
- `.navButton` updated to bordered rounded-box (`w-[32px] h-[32px] border-xxs border-neutral-border-default bg-neutral-surface-default rounded-base`) with hover state
- `.dayCell.selected` now uses `bg-primary-interaction-default text-neutral-foreground-negative rounded-full font-semibold` (filled background)
- `.dayCell.today:not(.selected)` uses `border-xxs border-primary-border-default text-primary-interaction-default rounded-full`
- `.monthButton` styles: `bg-primary-surface-highlight` for inactive, `bg-primary-interaction-default` for active
- `.yearList` vertical scrollable flex column with `max-h-[200px] overflow-y-auto`
- `.yearButton` with hover and `.yearActive` states
- `.dialogEnter` / `.dialogLeave` keyframe animations (fade + scale 0.95→1)
- `.headerToggle`, `.headerToggleActive`, `.dialogHeader` for toggle button styling

**Task 2 — CalendarDateDialog restructure:**
- Imported `Card` from `../Card/Card` and `useEffect` from React
- Added `isOpen` prop to `CalendarDateDialogProps` for animation class binding
- `activePanel: 'month' | 'year' | null` state drives mutually exclusive panel rendering
- Card wrapper with `dialogEnter`/`dialogLeave` class tied to `isOpen`
- `dialogHeader` with two `headerToggle` buttons showing month name and year
- Month panel: 3-column grid of `monthButton` elements, clicking closes panel
- Year panel: vertical scrollable `yearList` of `yearButton` elements with `yearActive` class
- `useEffect` scrolls active year into view when year panel opens
- All existing day-grid logic, date selection, and nav arrow behavior preserved

## Decisions Made

- `activePanel` state (not Vue's `show.month` / `show.year` booleans) — single state value enforces mutual exclusivity natively in React
- `isOpen` prop passed from parent `showDateDialog` state so the Card can apply `dialogEnter` while visible (leave animation would require deferred unmount — not implemented; dialog unmounts immediately on `showDateDialog=false`)
- Year range is `currentYear ± 10` (21 years total) — sufficient for typical UX without excessive list length
- `Card` component used as-is (no `noShadow` prop since Card.tsx does not expose that prop)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Card component has no noShadow prop**
- **Found during:** Task 2
- **Issue:** Plan specified `noShadow={false}` on Card but `Card.tsx` only accepts `children` and `className` props
- **Fix:** Omitted `noShadow` prop; Card renders with default shadow via CSS module
- **Files modified:** Calendar.tsx (no `noShadow` passed)
- **Commit:** 48ed9cb

## Self-Check

- [x] `src/components/Calendar/Calendar.module.css` exists and contains navButton, monthButton, yearList, dialogFadeIn
- [x] `src/components/Calendar/Calendar.tsx` exists and contains activePanel, Card, yearList/yearButton
- [x] Commit 00b64af exists
- [x] Commit 48ed9cb exists
- [x] TypeScript compile: no errors (`npx tsc --noEmit` clean)
