---
status: complete
phase: 03-form-components
source: [03-01-SUMMARY.md, 03-02-SUMMARY.md, 03-03-SUMMARY.md, 03-04-SUMMARY.md, 03-05-SUMMARY.md, 03-06-SUMMARY.md, 03-07-SUMMARY.md]
started: 2026-03-16T20:00:00Z
updated: 2026-03-16T20:45:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Checkbox toggle and three-state cycle
expected: In Storybook, open Checkbox > Primary story. Clicking the checkbox toggles between checked and unchecked. Open the AllowIndeterminate story — clicking cycles through: checked → indeterminate (dash icon) → unchecked → checked. The label text appears next to the checkbox. The Disabled story shows a non-interactive checkbox with reduced opacity.
result: pass

### 2. Switch sliding toggle
expected: In Storybook, open Switch > Primary story. Clicking the switch toggles on/off with a visible sliding thumb animation. The label appears next to the switch. The RHS story places the label on the left side. The Disabled story shows a non-interactive switch with reduced opacity.
result: pass

### 3. RadioGroup selection exclusivity
expected: In Storybook, open RadioGroup stories. Clicking one radio selects it and deselects any previously selected radio in the group. Only one option can be selected at a time. The selected radio shows a filled inner circle. In the Radio > Onboarding story, the radio uses a card-like onboarding variant style.
result: issue
reported: "My click dont change the selected value"
severity: major

### 4. ToggleGroup connected pill layout
expected: In Storybook, open ToggleGroup stories. Default variant shows toggles connected as a pill strip (no gaps between buttons, shared borders). Clicking one toggle selects it (highlighted) and deselects others. Secondary variant shows toggles with spacing between them, each independently rounded.
result: issue
reported: "The borders in this component is all messed up in the default type — double borders between items, missing rounded corners on first/last in horizontal; same double-border issue in vertical layout"
severity: cosmetic

### 5. Input type variants and interactions
expected: In Storybook, open Input stories. The password type shows a visibility toggle icon — clicking it reveals/hides the text. The number type shows up/down arrow buttons for incrementing/decrementing. The search type shows a search icon. A label with character counter appears above the input when configured. Error state shows a red border and error message below.
result: issue
reported: "Input has a weird border inside the component — not following the global focus reset CSS in main.css (border-width: 0). Also the arrows in the type number are not in the center and do not work"
severity: major

### 6. Input mask formatting
expected: In Storybook, find an Input story with mask prop (e.g., CPF or CNPJ). Typing digits auto-formats with dots and dashes (e.g., CPF: 123.456.789-00). The mask applies as you type, inserting separators at the correct positions.
result: issue
reported: "The mask applies correctly, but the domain and url mask does not do anything"
severity: minor

### 7. Textarea character counter and error
expected: In Storybook, open Textarea stories. When a max prop is set, a character counter (e.g., "15/100") appears next to the label. Typing beyond the max truncates the input. Error state shows a red border with an error message below the textarea.
result: pass

### 8. PINInput auto-advance and paste
expected: In Storybook, open PINInput stories. Typing a digit in one cell auto-advances focus to the next cell. Pressing Backspace on an empty cell moves focus to the previous cell. Pasting a multi-digit string (e.g., "123456") distributes digits across all cells. The separator story shows dashes between groups of cells.
result: pass

### 9. Slider drag and range mode
expected: In Storybook, open Slider > Default story. Clicking/dragging the thumb moves it along the track, updating the fill bar. The Range story shows two thumbs that can be dragged independently to define a range. The tooltip shows the current value while dragging. The Disabled story shows a non-interactive slider.
result: issue
reported: "The tooltip must use the design system Tooltip component with hover mechanic, not a custom inline tooltip. The steps should render as simple tick marks without labels (like the reference image), not with large step markers and percentage labels below"
severity: major

### 10. Slider vertical and steps
expected: In Storybook, open Slider > Vertical story — the slider renders vertically (top to bottom). The Disabled story shows a non-interactive slider.
result: issue
reported: "The tooltip of the vertical slider must be on the right side of the thumb, not above/below"
severity: cosmetic

### 11. TagInput keyboard and validation
expected: In Storybook, open TagInput stories. Typing text and pressing Enter adds a tag (badge) below/inside the input. Pressing Backspace when the input is empty removes the last tag. Duplicate tags are rejected with a shake animation on the input. If a max tag limit is set, additional tags cannot be added once the limit is reached.
result: pass

### 12. FileUpload click and drag-and-drop
expected: In Storybook, open FileUpload stories. Clicking the drop zone opens the native file picker. After selecting a file, the file name appears in the component. A delete button allows removing the selected file. Dragging a file over the drop zone shows a visual highlight (dragging state).
result: pass

## Summary

total: 12
passed: 6
issues: 6
pending: 0
skipped: 0

## Gaps

- truth: "Clicking a radio in RadioGroup changes the selected value"
  status: failed
  reason: "User reported: My click dont change the selected value"
  severity: major
  test: 3
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "ToggleGroup default variant shows connected pill strip with shared borders and rounded first/last corners"
  status: failed
  reason: "User reported: borders messed up — double borders between items, missing rounded corners on first/last in horizontal and vertical layouts"
  severity: cosmetic
  test: 4
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Input respects global focus reset CSS (no inner border) and number type arrows are centered and functional"
  status: failed
  reason: "User reported: weird border inside component not following main.css focus reset; number arrows not centered and non-functional"
  severity: major
  test: 5
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Domain and URL input types perform validation"
  status: failed
  reason: "User reported: domain and url mask does not do anything"
  severity: minor
  test: 6
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Slider tooltip uses design system Tooltip component and steps render as simple tick marks without labels"
  status: failed
  reason: "User reported: tooltip should use design system Tooltip with hover; steps should be simple tick marks without percentage labels"
  severity: major
  test: 9
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Vertical slider tooltip appears to the right of the thumb"
  status: failed
  reason: "User reported: tooltip of vertical slider must be on the right side"
  severity: cosmetic
  test: 10
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""
