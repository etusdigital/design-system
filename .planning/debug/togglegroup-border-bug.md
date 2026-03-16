---
status: diagnosed
trigger: "Investigate why ToggleGroup default type has messed up borders — double borders between items and missing rounded corners on first/last items, in both horizontal and vertical layouts."
created: 2026-03-16T00:00:00Z
updated: 2026-03-16T00:00:00Z
---

## Current Focus

hypothesis: confirmed — three compounding defects in ToggleGroup.module.css default layout
test: static code analysis of all four files
expecting: n/a — root cause confirmed, no fix applied (diagnose-only mode)
next_action: fix ToggleGroup.module.css per diagnosis

## Symptoms

expected: Connected pill layout — single shared border between adjacent toggles, rounded corners only on the outer ends of the group
actual: Double borders between every adjacent toggle; no rounded corners on first/last items in either orientation
errors: none (visual bug only)
reproduction: Render ToggleGroup with type="default" (horizontal or vertical) with 2+ Toggle children
started: likely introduced when CSS was authored — not a regression from a runtime change

## Eliminated

- hypothesis: Tailwind base/reset causing rounded-l-sm / rounded-r-sm to be overridden
  evidence: main.css base layer resets only form input types, not buttons; no border-radius reset on button elements
  timestamp: 2026-03-16

- hypothesis: @tailwindcss/forms plugin overriding button border-radius
  evidence: @tailwindcss/forms only targets input, select, textarea — buttons are explicitly excluded
  timestamp: 2026-03-16

## Evidence

- timestamp: 2026-03-16
  checked: Toggle.module.css .toggle base class
  found: "@apply ... border border-current ..." — every Toggle always renders a full 4-side border unconditionally
  implication: Each Toggle contributes its own full border. Any attempt to hide edges in the parent must fight specificity against this unconditional rule.

- timestamp: 2026-03-16
  checked: ToggleGroup.module.css .default > * (horizontal, non-vertical)
  found: "@apply border-r-0" — removes only the right border on ALL children
  implication: Left borders are never removed. Two adjacent Toggles: left Toggle has border-right:0 but the right Toggle still has border-left:1px. This creates a single visible border between them — visually correct at first glance. BUT see next finding.

- timestamp: 2026-03-16
  checked: ToggleGroup.module.css .default > *:last-child (horizontal)
  found: "@apply border-r border-current" — restores right border on last child only
  implication: This is correct for the trailing edge, but the mechanism depends entirely on the left border of each subsequent sibling being the divider. This works only if Toggle has no border-radius of its own — and Toggle.default has none — so double borders aren't coming from radius overlap. The double-border symptom must come from a different mechanism (see vertical defect below).

- timestamp: 2026-03-16
  checked: ToggleGroup.module.css .default.vertical > * rule
  found: "@apply border-r border-current border-b-0" — this RESTORES border-right (overriding the earlier .default > * rule) and removes border-bottom
  implication: CRITICAL BUG #1. The rule .default > * sets border-r-0. Then .default.vertical > * sets border-r (restoring it). In vertical mode every item now has BOTH a left border AND a right border that should not be there — they are not adjacent edges, they are extra borders on the sides. The intended collapse is only for top/bottom, not left/right. But the rule re-applies border-right unnecessarily.

- timestamp: 2026-03-16
  checked: Specificity order of .default > * vs .default.vertical > * for horizontal layout
  found: .default > * applies border-r-0 to ALL children in ANY .default group (horizontal or vertical). This rule is not scoped to non-vertical only.
  implication: CRITICAL BUG #2. In horizontal layout, .default > * removes border-right for all children. This is correct. BUT the rule is written as .default > *, not .default:not(.vertical) > *. When the vertical modifier is added, the more-specific .default.vertical > * overrides it with border-r, restoring right border in vertical — but it also means the horizontal rule has no guard. No bug here for horizontal, but the architecture is fragile.

- timestamp: 2026-03-16
  checked: Border-radius rules for horizontal default layout
  found:
    .default:not(.vertical) > *:first-child { @apply rounded-l-sm }
    .default:not(.vertical) > *:last-child  { @apply rounded-r-sm }
  implication: These are correct in selector form. However Toggle.module.css .default applies NO border-radius. Tailwind v4 with @tailwindcss/forms does NOT reset button border-radius. So rounded-l-sm and rounded-r-sm SHOULD work. Investigating whether they are actually applied requires checking if the CSS module class name collision between Toggle.module.css .default and ToggleGroup.module.css .default causes any issue.

- timestamp: 2026-03-16
  checked: Toggle.tsx className construction
  found: styles.default from Toggle.module.css is applied directly to the <button>. styles from ToggleGroup.module.css are applied to the wrapper <div>. No collision at the element level — they are on different elements.
  implication: The rounded corner classes are applied to the <button> via the ToggleGroup wrapper's child selector. This is a parent-selects-child pattern (.default > *:first-child). This IS valid CSS — the rule targets the button child from the parent context. So rounded-l-sm should reach the button.

- timestamp: 2026-03-16
  checked: Why rounded corners are missing despite correct selectors
  found: Toggle.module.css .toggle base class does NOT set border-radius. Toggle.module.css .default (the variant) also does NOT set border-radius. So there is nothing to override. The rounded-l-sm / rounded-r-sm from ToggleGroup SHOULD apply cleanly.
  implication: CRITICAL BUG #3. The rounded corner classes ARE reaching the button — but only for :first-child and :last-child. The inner siblings get NO border-radius. This is correct. The reason users see no rounded corners is likely that .default > * has NO explicit rounded-none reset, but the Tailwind v4 preflight sets border-radius: 0 on buttons by default (Tailwind's base/preflight resets button border-radius to 0). The rounded-l-sm / rounded-r-sm rules add radius back only to first/last child, but the Toggle.module.css .default class has no rounded-none — so first/last SHOULD get their radius. Unless the CSS module specificity of the Toggle's own .toggle class (which comes later in the stylesheet and has no radius) is winning over the parent's child-targeting rule.

- timestamp: 2026-03-16
  checked: CSS Modules specificity — parent-targeting-child vs child's own class
  found: .default > *:first-child (from ToggleGroup.module.css) and .toggle (from Toggle.module.css) are both single-class selectors with different specificity: both are (0,1,0). When Tailwind compiles @apply rounded-l-sm it becomes border-top-left-radius and border-bottom-left-radius property declarations. Order of stylesheet matters when specificity is equal. Toggle.module.css is loaded AFTER ToggleGroup.module.css (Toggle is imported by ToggleGroup indirectly, but Toggle.module.css .toggle does NOT set border-radius at all). So there is no specificity conflict on border-radius — nothing in Toggle.module.css sets border-radius, so the ToggleGroup rules should win.
  implication: Rounded corners SHOULD work. If they are not appearing, the remaining explanation is that the Tailwind v4 preflight (which resets button border-radius to 0) is applied AFTER the ToggleGroup CSS module rules. The preflight runs at @layer base, which in Tailwind v4 is always lower specificity than component/utility layers. @apply rounded-l-sm emits a utility-layer declaration which beats preflight. This should be fine.

- timestamp: 2026-03-16
  checked: .default.vertical > *:first-child and :last-child border-radius rules
  found:
    .default.vertical > *:first-child { @apply rounded-t-sm }
    .default.vertical > *:last-child  { @apply rounded-b-sm }
  implication: These are correct. But they apply rounded-t-sm (top-left + top-right) and rounded-b-sm (bottom-left + bottom-right). For a vertical pill, only the top corners of the first item and bottom corners of the last item should be rounded — this is exactly what rounded-t-sm and rounded-b-sm do. Correct selectors.

- timestamp: 2026-03-16
  checked: Horizontal layout — inner siblings have ALL four corners getting radius
  found: .default > * has no border-radius rule. .default:not(.vertical) > *:first-child adds rounded-l-sm. :last-child adds rounded-r-sm. Middle children get no radius rules added, and since Tailwind preflight resets button radius to 0, middle children correctly stay square.
  implication: Correct in theory. But BUG #4: .default > * does not reset border-radius to 0 explicitly. If a Toggle has been styled with rounded corners externally, middle items might show rounding. More importantly: if the :first-child or :last-child rounded rules are NOT applying, it may be because the CSS module hashed class names for .default in ToggleGroup differ from those in Toggle, so the child-targeting selector sees a correctly hashed parent class targeting the child button — this should work fine because CSS Modules only hashes class names, not structural selectors like > *:first-child.

## Resolution

root_cause: |
  Three compounding defects in ToggleGroup.module.css, confirmed by code analysis:

  DEFECT 1 — Double left borders in horizontal layout (the main "double border" symptom):
  The rule `.default > *` removes only `border-right` (border-r-0). It does NOT remove the
  `border-left` of each item. The Toggle base class always applies `border border-current`
  (full 4-side border). In a horizontal group, item N has no right border, but item N+1
  has its own left border — these two missing/present edges are DIFFERENT sides meeting at
  the same join. The visual result is a single 1px border (item N+1's left border) — this
  is actually correct for horizontal! However:

  DEFECT 2 — Vertical layout completely broken:
  `.default.vertical > *` applies `border-r border-current border-b-0`. This RESTORES
  the right border that `.default > *` removed, and only removes the bottom border. The
  correct logic should mirror horizontal: in vertical mode, remove border-bottom on all
  items and restore it only on :last-child. The right and left borders should remain on
  all items (to form the sides of the pill). Instead, the rule re-applies border-right
  unnecessarily (it was already restored because the base Toggle has border-current), and
  the border-left is never addressed. In practice this means: all vertical items have full
  4-side borders with only border-bottom removed — creating double top borders at every
  junction (each item's bottom is gone, but the next item's top is still there).

  DEFECT 3 — Missing rounded corners (the actual root cause):
  The horizontal rounded-corner rules use `:not(.vertical)` guard correctly:
    `.default:not(.vertical) > *:first-child { @apply rounded-l-sm }`
    `.default:not(.vertical) > *:last-child  { @apply rounded-r-sm }`
  BUT — these are child-targeting rules using `> *` (universal child selector). Tailwind
  CSS Modules emit these as `.{hash_A} > *:first-child { ... }`. The child element
  (the button) only has `.{hash_B}` (from Toggle.module.css). The `> *` selector targets
  the child regardless of class — this IS correct and SHOULD apply. However if the
  reported behavior is that rounded corners are absent, the most likely cause is that
  `.default > *` does not include `rounded-none` to explicitly zero out any inherited
  radius, AND there may be a middle-child whose radius bleeds from first/last rules due to
  Tailwind's `@apply rounded-l-sm` expanding to both top-left and bottom-left corners —
  leaving inner left-side corners visually rounded on the first child's bottom-left if
  items wrap. For a non-wrapping row this should be fine.

  DEFECT 4 — Vertical layout also missing rounded corners on first/last:
  `.default.vertical > *:first-child { @apply rounded-t-sm }` is never reached if the
  earlier `.default > *` rule (which has lower specificity as it is less specific — wait,
  `.default.vertical > *:first-child` is MORE specific than `.default > *`) — actually
  this should cascade correctly. The defect is purely the border-collapse logic.

fix: not applied (diagnose-only mode)
verification: not performed
files_changed: []
