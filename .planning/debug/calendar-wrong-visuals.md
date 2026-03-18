---
status: diagnosed
trigger: "Calendar component has completely wrong visuals and no animations on month/year selectors"
created: 2026-03-18T00:00:00Z
updated: 2026-03-18T00:00:00Z
---

## Current Focus

hypothesis: CSS module styles are skeletal/minimal and missing most of the Vue reference styling; DateDialog is a flat inline div instead of a Card overlay with animation
test: Compare Vue source CSS classes vs React CSS module
expecting: Massive gaps in styling
next_action: return diagnosis

## Symptoms

expected: Nav arrows in rounded square buttons with border; selected date has filled green bg; month selector is 3x4 grid of rounded colored buttons; year selector is scrollable card with border and highlight
actual: Nav arrows are bare transparent buttons; selected date has wrong/broken CSS; month and year selectors are flat unstyled grids with no animation; no Card wrapper, no overlay positioning
errors: CSS syntax error on line 15 (stray apostrophe in border declaration)
reproduction: Render Calendar, click month/year label
started: Initial React conversion

## Eliminated

(none needed - root cause is clear)

## Evidence

- timestamp: 2026-03-18
  checked: Vue Calendar.vue arrow styling (.calendar-arrow class)
  found: Vue arrows use `rounded-base border-xxs p-xxs border-neutral-default` with hover states - a bordered rounded box
  implication: React .navButton is just `bg-transparent border-none` - completely missing the box styling

- timestamp: 2026-03-18
  checked: Vue DateDialog.vue structure
  found: Vue wraps month/year options in a `<Card>` component with absolute positioning, z-index, translate centering, overflow-auto, flex-wrap, and a `<Transition name="appear">` animation (slide from left, 500ms)
  implication: React CalendarDateDialog is a plain `<div className={styles.dateDialog}>` with no Card, no absolute positioning, no animation

- timestamp: 2026-03-18
  checked: Vue Calendar.vue month selector template
  found: Each month button has `bg-primary-surface-highlight` (inactive) or `bg-primary-interaction-default` (active), plus `text-neutral-foreground-negative text-sm p-sm border-xxs rounded-base hover:bg-primary-interaction-hover` - colored rounded buttons
  implication: React .monthButton is `bg-transparent border-none` - completely missing colored background

- timestamp: 2026-03-18
  checked: Vue Calendar.vue year selector template
  found: Year selector uses DateDialog with `vertical` prop (flex-col), `max-height="70%"` (scrollable), `no-padding`. Each year has highlight on current year with `bg-primary-surface-default text-primary-interaction-default`
  implication: React renders years in same monthGrid (3-col grid) instead of vertical scrollable list

- timestamp: 2026-03-18
  checked: Vue Day.vue selected state
  found: Selected day uses `bg-primary-interaction-default text-neutral-foreground-negative` with hover overrides
  implication: React .dayCell.selected has a CSS syntax error: `border-xxs solid border-primary-default'` (stray apostrophe breaks the rule)

- timestamp: 2026-03-18
  checked: React CSS module line 15
  found: `.dayCell.selected { @apply bg-primary-surface-default text-primary-foreground-high rounded-xs; border-xxs solid border-primary-default'; }`
  implication: Trailing apostrophe is a CSS syntax error that likely breaks the entire rule. Also uses wrong color (primary-surface-default instead of primary-interaction-default)

- timestamp: 2026-03-18
  checked: Vue DateDialog animation
  found: Vue uses `<Transition name="appear">` with translateX(-200%) enter/leave animation (500ms slide-in from left)
  implication: React has zero animation on the DateDialog - just conditional render with `{showDateDialog && ...}`

- timestamp: 2026-03-18
  checked: Vue month/year toggle behavior (showPopup function)
  found: Vue has a two-stage toggle: first click shows months, second click shows years (separate panels)
  implication: React shows both month grid AND year grid simultaneously in one panel - wrong UX

## Resolution

root_cause: The React conversion created a skeletal CSS module and a simplified CalendarDateDialog that is missing virtually all visual styling from the Vue original. Specifically: (1) nav arrow buttons lack bordered/rounded box styling, (2) CSS syntax error breaks selected-day rule, (3) month buttons lack colored backgrounds, (4) year selector is a grid instead of vertical scrollable Card, (5) DateDialog has no Card wrapper, no absolute overlay positioning, and no enter/leave animation, (6) month/year are shown simultaneously instead of as separate toggled panels.
fix:
verification:
files_changed: []
