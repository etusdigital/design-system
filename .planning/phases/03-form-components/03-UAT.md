---
status: resolved
phase: 03-form-components
source: [03-08-SUMMARY.md, 03-09-SUMMARY.md, 03-10-SUMMARY.md]
started: 2026-03-16T21:30:00Z
updated: 2026-03-16T19:20:00Z
---

## Current Test

[testing complete]

## Tests

### 1. RadioGroup selection on click
expected: In Storybook, open RadioGroup > Primary story. Click a different radio option — the selection changes visually (filled inner circle moves to the clicked item). Try the Vertical and StringOptions stories too — clicking updates the selected value in each.
result: pass

### 2. ToggleGroup connected pill layout (horizontal)
expected: In Storybook, open ToggleGroup > Default story. Toggles are connected as a pill strip — single borders between items (no double borders), first item has left rounded corners, last item has right rounded corners. Clicking a toggle selects it.
result: pass

### 3. ToggleGroup connected pill layout (vertical)
expected: In Storybook, open ToggleGroup > Vertical story with default type. No double borders between items — single shared border. First item has top rounded corners, last item has bottom rounded corners.
result: pass

### 4. Input no inner border
expected: In Storybook, open any Input story (e.g., Primary). The input field has no visible inner border artifact — clean single border on the wrapper only, matching the global focus reset CSS.
result: pass

### 5. Input number arrows centered and functional
expected: In Storybook, open Input > NumberType story. The up/down arrows are vertically centered within the input. Clicking the up arrow increments the value, clicking down decrements it.
result: pass

### 6. Input domain/url validation on blur
expected: In Storybook, open Input > DomainType story. Type an invalid value (e.g., "notadomain"), then tab away (blur). An error message "Invalid domain" appears below the input. Clear and type a valid domain (e.g., "example.com"), blur — error disappears. Same behavior for UrlType story with "Invalid URL" message.
result: pass

### 7. Slider tooltip uses DS Tooltip (horizontal)
expected: In Storybook, open Slider > Default story. Hover over the slider thumb — a tooltip appears ABOVE the thumb showing the current value, using the design system Tooltip component (consistent styling with other DS tooltips). The tooltip appears on hover, not permanently visible.
result: pass

### 8. Slider tooltip position (vertical)
expected: In Storybook, open Slider > Vertical story. Hover over the slider thumb — the tooltip appears to the RIGHT of the thumb (not above or below).
result: pass

### 9. Slider step markers colors and reactivity
expected: Step marks in the filled area match the fill color (primary, custom color, or fillColors segment). Inactive marks are gray. Dragging updates which marks are active in real-time.
result: pass (re-tested after fix)

## Summary

total: 9
passed: 9
issues: 0
pending: 0
skipped: 0

## Gaps

- truth: "Step tick marks change color based on active/inactive state — darker in the filled area, lighter in the unfilled area"
  status: resolved
  reason: "User reported: marks are not following the correct colors — active markers should be darker, inactive lighter. All markers are the same color."
  severity: cosmetic
  test: 9
  root_cause: "Three issues: (1) CSS used same primary palette for active/inactive making them indistinguishable, (2) no inline style support for color/fillColors props on markers, (3) controlled mode didn't trigger re-renders during drag so markers stayed frozen"
  artifacts:
    - path: "src/components/Slider/Slider.tsx"
      issue: "Added dragValue state for re-renders during drag, getStepMarkerStyle with fillColors segment calculation"
    - path: "src/components/Slider/Slider.module.css"
      issue: "Changed inactive markers to neutral-surface-disabled, added stepMarkerNeutral class"
  missing: []
  debug_session: ""
