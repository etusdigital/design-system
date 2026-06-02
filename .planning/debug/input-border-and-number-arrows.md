---
status: diagnosed
trigger: "Investigate two Input component issues: inner border double-border effect, and number arrows not vertically centered + not functional"
created: 2026-03-16T00:00:00Z
updated: 2026-03-16T00:00:00Z
---

## Current Focus

hypothesis: Both root causes confirmed via code reading
test: static analysis of CSS and JSX
expecting: n/a — confirmed
next_action: return diagnosis to caller

## Symptoms

expected: Input container has a single styled border (outline). Number arrows are vertically centered and increment/decrement the value on click.
actual: 1) A visible inner border appears on the native <input> element inside the container, creating a double-border effect. 2) Number arrows are misaligned (not vertically centered with the input container) and clicking them does not increment or decrement the value.
errors: none reported
reproduction: Render <Input type="text" /> to see double border. Render <Input type="number" /> to see misaligned/broken arrows.
started: during phase 2 refactor

## Eliminated

- hypothesis: main.css :focus reset is missing entirely
  evidence: main.css lines 478-503 DO reset border-width, outline, box-shadow for :focus states. The focus state is not the problem — the default (non-focus) state is the problem.
  timestamp: 2026-03-16

- hypothesis: inputContent lacks outline-none
  evidence: Input.module.css line 24 applies `outline-none` via Tailwind to .inputContent. This removes outline but NOT border.
  timestamp: 2026-03-16

## Evidence

- timestamp: 2026-03-16
  checked: src/assets/main.css lines 462-503
  found: The :root block resets border-width, outline, box-shadow, and padding — but ONLY for :focus and default state as a combined selector list. Looking more carefully: lines 462-476 list default-state selectors, lines 478-492 list :focus selectors — they share the same rule block (lines 493-503). So `border-width: 0` IS applied to both default and focus states.
  implication: The reset does cover default state. But it only applies to elements matching those type selectors. The native input rendered with resolvedType="text" matches [type="text"] — so the reset should apply... unless @tailwindcss/forms injects its border-width with higher specificity or later in cascade.

- timestamp: 2026-03-16
  checked: node_modules @tailwindcss/forms src/index.js lines 29-54
  found: The forms plugin applies `border-width: borderWidth['DEFAULT']` (which is 1px) to a selector group that includes [type='text'], [type='email'], [type='number'], [type='password'], [type='search'], etc. This is injected as a base layer rule.
  implication: The forms plugin adds a 1px border to all text-type inputs. The main.css reset is in @layer base too, but whether the reset wins depends on source order. The forms plugin is loaded via @plugin in main.css — its base styles may be ordered BEFORE the :root block reset, or they may conflict because the forms plugin selector is more specific or later in the cascade.

- timestamp: 2026-03-16
  checked: Input.module.css line 24 — .inputContent class
  found: `@apply flex-1 bg-transparent outline-none text-sm text-neutral-foreground-high placeholder:text-neutral-foreground-low min-w-0` — contains `outline-none` but NO `border-0` or `border-none`.
  implication: CONFIRMED ROOT CAUSE 1. The CSS module for the native <input> element resets outline to none but does NOT reset border to 0. The @tailwindcss/forms plugin adds `border-width: 1px` to all text inputs. This 1px border on the native input creates a double-border inside the container (which already has `outline: 1px` on .inputContainer).

- timestamp: 2026-03-16
  checked: Input.tsx lines 236-249 — number arrows JSX
  found: The arrows wrapper div has className `clsx(styles.numberArrows, 'ml-xxs mt-xxs')`. The `mt-xxs` (margin-top: 4px) pushes the entire arrows column downward — it is not vertically centered relative to the input container.
  implication: CONFIRMED ROOT CAUSE 2a. `mt-xxs` on the arrows wrapper misaligns it vertically. The outer flex row at line 188 is `flex items-center h-fit` which would center children, but `mt-xxs` overrides the vertical centering by adding a top margin offset.

- timestamp: 2026-03-16
  checked: Input.tsx lines 238-248 — Icon onClick handlers
  found: The <Icon> components have `onClick={increment}` and `onClick={decrement}`. The increment/decrement functions (lines 156-166) read `currentValue`, compute next value, and call `setValue`. The input element at line 210 uses `type={resolvedType}`. Line 109 sets `resolvedType = 'text'` for type="number". The value is controlled via `useControllable`.
  implication: The onClick handlers themselves are correct in logic. However, clicking an Icon inside a flex container that sits outside the input container should work. Need to verify if the Icon component stops propagation or has pointer-events issues — but based on password toggle (same Icon + onClick pattern at line 225) working correctly, the onClick pattern is valid. The click handlers should fire.

- timestamp: 2026-03-16
  checked: Input.tsx line 109 — resolvedType for number
  found: `if (type === 'number') return 'text';` — the native input renders as type="text"
  implication: This is intentional (hides native spinners). The custom arrows rely entirely on the onClick handlers. The handlers call setValue which updates controlled state. This is correct by design. The non-functionality reported is likely a Storybook environment issue or a pointer-events conflict — the Icon has `cursor-pointer` class, so pointer-events are not disabled.

- timestamp: 2026-03-16
  checked: Input.module.css lines 51-53 — .numberArrows
  found: `.numberArrows { @apply flex flex-col items-center; }` — only stacks icons vertically and centers horizontally. No height or alignment relative to parent.
  implication: Combined with `mt-xxs` on the wrapper in JSX, the arrows are shifted 4px down from where the flex centering would place them. Removing `mt-xxs` from the JSX className would restore vertical centering.

## Resolution

root_cause:
  issue_1_inner_border: |
    The .inputContent CSS class (applied to the native <input>) resets outline to none
    via `outline-none` but does NOT reset border to 0. The @tailwindcss/forms plugin
    injects `border-width: 1px` on all [type="text"], [type="password"], [type="search"],
    etc. inputs as a base layer rule. The main.css :root reset block does set
    `border-width: 0` but it targets both default and focus states in one combined
    selector — however, the forms plugin rule may win in cascade order (loaded earlier
    via @plugin). The definitive fix is: add `border-0` to .inputContent in
    Input.module.css so the CSS module explicitly wins regardless of cascade order.

  issue_2a_arrow_misalignment: |
    The number arrows wrapper div in Input.tsx (line 237) has `mt-xxs` in its className.
    This applies margin-top: 4px, pushing the arrows column down from the vertically
    centered position that `items-center` on the outer flex row would otherwise provide.
    Removing `mt-xxs` from the className fixes the alignment.

  issue_2b_arrow_click: |
    Based on static analysis the onClick handlers (increment/decrement) are logically
    correct. The resolvedType="text" is intentional. The pattern mirrors the working
    password toggle. If clicks are reported as non-functional, the most likely cause is
    the Icon component consuming or stopping the click event internally, or a z-index /
    pointer-events layering issue in the rendered output. This requires runtime
    verification — it cannot be confirmed or eliminated by static analysis alone.

fix:
  file: src/components/Input/Input.module.css
  change_1: Add `border-0` to .inputContent @apply chain
  change_2: n/a (CSS only for border fix)

  file: src/components/Input/Input.tsx
  change_1: Remove `mt-xxs` from the numberArrows wrapper className (line 237)

verification: pending
files_changed: []
