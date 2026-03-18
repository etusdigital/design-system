---
status: complete
phase: 06-composite-components
source: 06-15-SUMMARY.md, 06-16-SUMMARY.md, 06-17-SUMMARY.md, 06-18-SUMMARY.md, 06-19-SUMMARY.md, 06-20-SUMMARY.md, 06-21-SUMMARY.md, 06-22-SUMMARY.md, 06-23-SUMMARY.md
started: 2026-03-18T18:00:00Z
updated: 2026-03-18T18:15:00Z
round: 3
---

## Current Test

[testing complete]

## Tests

### 1. Accordion expand/collapse
expected: Clicking header toggles expanded state with smooth max-height animation. Chevron rotates 180deg. No phantom gap below collapsed header. Disabled items don't respond to clicks.
result: pass

### 2. Tab icon support
expected: Tabs render with icons when options have icon field. isIcon=true renders icon-only tabs. Tab buttons show flex alignment with icon + label side by side. Without icons, backward compatible text-only rendering.
result: [pending]

### 3. Icon glyphs render correctly (not text strings)
expected: All icon-using components (Pagination arrows, Tab icons, Stepper icons, RoundMenu, Calendar nav, Navbar) display actual Material Symbols Rounded glyphs — not text like "chevron_left".
result: [pending]

### 4. Stepper visual design and connector coloring
expected: Past steps show checkmark icon in filled circle. Active step has scale(1.2) with ring element. Future steps show gray circle with original icon. Connectors are green only for steps before the highest visited step, gray after. Lines vertically centered between circles.
result: issue
reported: "The pass is completed the icon must remain the same, the step is allowing skip even when the allowedSkip option is not true and the visual are not quite right yet. Past steps should keep their original icon (not checkmark) in filled green circle. Active step should have larger ring with icon. Future steps should have smaller filled green circles with icon. Connectors should all be green through visited steps. allowSkip enforcement is missing."
severity: major

### 5. Select icon, expanded, keyboard nav, render-props
expected: Select forwards icon to trigger area. expanded/onExpandedChange allows controlled state. ArrowUp/Down/Home/End/Enter navigate options with visual highlight. Render-prop slots (renderOption, renderSearchLabel, etc.) customize rendering.
result: issue
reported: "It is missing the item slot, to allow the user to customize the item display and select card items is disappearing there is no animation, it should have"
severity: major

### 6. AutoComplete dropdown floats with animation
expected: AutoComplete options dropdown floats absolutely (doesn't push layout). Opening/closing has CSS opacity/visibility transition animation. Dropdown appears overlaid on content below.
result: issue
reported: "When I try to select an option nothing happens and the icon the far right should be unfold_more"
severity: major

### 7. Dropdown has all 5 missing props
expected: Dropdown accepts required (shows asterisk), infoMessage (shows helper text), maxHeight (limits dropdown height), minWidth (sets minimum width), absolute (defaults true, positions dropdown absolutely).
result: issue
reported: "When I click an item it doesnt get selected and the visuals are all wrong. Groups should show as expandable items with chevron arrow that reveal nested sub-options in a separate card to the right, not inline flat list. Publisher group should expand to show Group Account and Account as nested items in a side card."
severity: blocker

### 8. TagSelect has all 4 missing props + keyboard nav
expected: TagSelect accepts icon (shown in trigger), expanded/onExpandedChange (controlled state), absolute (forwarded to container), buttonLabel (overrides label). Arrow keys navigate options, Tab creates tag in creatable mode.
result: issue
reported: "The tags is not being created and the custom icon must be in the left side of the component instead of the right"
severity: major

### 9. Carousel sections, disabled, and circular
expected: Carousel renders slide sections as grouped flex containers. disabled=true pauses autoplay and blocks arrow navigation. circular=true wraps from last to first slide and vice versa. Slide content is styled (not raw data).
result: [pending]

### 10. RoundMenu uses Button component
expected: RoundMenu trigger and menu items render using the design system Button component (round icon variant), not raw HTML buttons. Items positioned in radial circle pattern with animation.
result: issue
reported: "When the label is shown the start of the component must remain in the same place. Label tooltip should appear anchored to the button with the button position unchanged. Current layout is too small and cramped compared to expected. Trigger button with label should expand rightward (pill shape) while keeping the circle origin fixed. Items need more spacing and larger size matching the reference."
severity: major

### 11. Calendar visual styling and dialog panels
expected: Nav arrows have bordered rounded-box styling. Selected date shows filled primary background with rounded-full. Today has primary border ring. CalendarDateDialog wrapped in Card with fade-scale animation. Month and year are separate toggled panels (not shown simultaneously). Year selector is scrollable vertical list.
result: issue
reported: "The dialog must be absolute and already open in the month selection. The compare mode where I can select two periods is not working. When a period is being selected and one date has already been chosen the hover must cover the days between the dates with a light highlight background on the range. In compare mode two separate ranges are selected with different color intensities — first range darker, second range lighter. Both ranges show endpoint dates with filled circles and in-between days with row-spanning highlight."
severity: blocker

### 12. DatePicker missing props and preset sidebar
expected: DatePicker accepts separator, isCompare, allowChangeType, absolute, alignRight, expanded, options, hideActions props. onClear, onExpandedChange, onTypeChange callbacks fire. When options provided and type is not 'date', preset sidebar renders on left.
result: issue
reported: "The visuals are all wrong. Current version is too small and cramped. Expected: trigger button shows icon + formatted date text (e.g. 'Today'), calendar popover card is much larger with proper spacing, day cells are bigger with more padding, nav arrows in bordered rounded boxes, Clear text button and filled Apply button at bottom with proper sizing, overall card has more whitespace and professional proportions."
severity: blocker

### 13. Navbar layout with Dropdown, Avatar, FloatCard
expected: Left side: SVG gradient circle logo + vertical divider + single Dropdown for navigation options. Right side: notification bell Icon wrapped in FloatCard popover + Avatar. Not inline nav items.
result: issue
reported: "The navbar is missing an example of the possible slots (children) I can use"
severity: minor

### 14. ColorPicker noShadow prop
expected: ColorPicker accepts noShadow boolean prop. When true, box-shadow is removed from the picker container. When false/omitted, default shadow renders.
result: [pending]

### 15. Input type=color uses FloatCard
expected: Color swatch button triggers FloatCard popover containing ColorPicker. Clicking outside closes the popover (FloatCard handles this). Swatch is inline within input, not outside. No manual showColorPicker state needed.
result: issue
reported: "The color preview swatch must be on the right side of the component, inside the input border. Hex value text on left, small color square on the far right within the input field."
severity: cosmetic

## Summary

total: 15
passed: 5
issues: 10
pending: 0
skipped: 0

## Gaps

- truth: "Stepper past steps keep original icon, allowSkip enforcement, correct visual design"
  status: failed
  reason: "User reported: Past steps should keep original icon not checkmark, allowSkip not enforced, visual design wrong — past steps should be filled green circles with original icon, active step larger ring, future steps smaller filled green circles"
  severity: major
  test: 4
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Select has item slot for custom item display, options card has animation"
  status: failed
  reason: "User reported: Missing item slot to customize item display, select card items disappearing with no animation"
  severity: major
  test: 5
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "AutoComplete option selection works and icon is unfold_more"
  status: failed
  reason: "User reported: Selecting an option does nothing, icon on far right should be unfold_more"
  severity: major
  test: 6
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Dropdown item selection works and groups show as expandable with nested sub-cards"
  status: failed
  reason: "User reported: Clicking item doesnt select, groups should show as expandable items with chevron revealing nested sub-options in separate card to the right"
  severity: blocker
  test: 7
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "TagSelect creates tags and icon is on left side"
  status: failed
  reason: "User reported: Tags not being created, custom icon must be on left side instead of right"
  severity: major
  test: 8
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "RoundMenu label keeps button position fixed, items properly sized and spaced"
  status: failed
  reason: "User reported: When label shown button start position must remain same, label expands rightward as pill shape. Items need more spacing and larger size matching reference"
  severity: major
  test: 10
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Calendar dialog absolute, compare mode works, hover range highlight between dates"
  status: failed
  reason: "User reported: Dialog must be absolute and open in month selection. Compare mode not working. Hover must highlight days between selected dates. Compare mode shows two ranges with different color intensities"
  severity: blocker
  test: 11
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "DatePicker has correct proportions, spacing, and professional layout"
  status: failed
  reason: "User reported: Visuals all wrong — too small and cramped. Needs larger day cells, proper spacing, bordered nav arrows, properly sized Clear/Apply buttons, more whitespace"
  severity: blocker
  test: 12
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Navbar stories show examples of possible slots/children"
  status: failed
  reason: "User reported: Missing example of the possible slots (children) I can use"
  severity: minor
  test: 13
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""

- truth: "Input type=color swatch on right side inside input border"
  status: failed
  reason: "User reported: Color preview swatch must be on right side of component, inside input border. Hex text on left, color square on far right within field"
  severity: cosmetic
  test: 15
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""
