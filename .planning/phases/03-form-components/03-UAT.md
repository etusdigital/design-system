---
status: diagnosed
phase: 03-form-components
source: [03-08-SUMMARY.md, 03-09-SUMMARY.md, 03-10-SUMMARY.md]
started: 2026-03-16T21:30:00Z
updated: 2026-03-16T21:45:00Z
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

### 9. Slider step markers as thin ticks
expected: In Storybook, open a Slider story with steps configured. Steps render as small thin tick marks along the track — no text labels or percentage numbers below the ticks.
result: issue
reported: "The marks are not following the correct colors — active step markers (before the thumb, in the filled area) should be darker matching the fill color, inactive markers (after the thumb) should be lighter. Currently all markers are the same light mint/teal color regardless of position."
severity: cosmetic

## Summary

total: 9
passed: 8
issues: 1
pending: 0
skipped: 0

## Gaps

- truth: "Step tick marks change color based on active/inactive state — darker in the filled area, lighter in the unfilled area"
  status: failed
  reason: "User reported: marks are not following the correct colors — active markers should be darker, inactive lighter. All markers are the same color."
  severity: cosmetic
  test: 9
  root_cause: "isStepActive() checks pct >= minPct && pct <= maxPct, but for single-value sliders minPct === maxPct (both are cursor position). Fill goes from 0 to cursor, so steps at 0 and 0.25 should be active when cursor is at 0.5, but the >= minPct check excludes them. Fix: for non-range sliders, check pct <= maxPct (0 to cursor)."
  artifacts:
    - path: "src/components/Slider/Slider.tsx"
      issue: "Line 317-325: isStepActive uses pct >= minPct which equals cursor position for single sliders, excluding all steps before cursor"
  missing:
    - "Change isStepActive to use pct >= 0 && pct <= maxPct for single sliders (or pct >= minPct && pct <= maxPct for range sliders)"
  debug_session: ""
