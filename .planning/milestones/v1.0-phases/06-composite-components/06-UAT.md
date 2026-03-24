---
status: diagnosed
phase: 06-composite-components
source: 06-15-SUMMARY.md, 06-16-SUMMARY.md, 06-17-SUMMARY.md, 06-18-SUMMARY.md, 06-19-SUMMARY.md, 06-20-SUMMARY.md, 06-21-SUMMARY.md, 06-22-SUMMARY.md, 06-23-SUMMARY.md
started: 2026-03-18T18:00:00Z
updated: 2026-03-18T19:30:00Z
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
result: pass

### 3. Icon glyphs render correctly (not text strings)
expected: All icon-using components (Pagination arrows, Tab icons, Stepper icons, RoundMenu, Calendar nav, Navbar) display actual Material Symbols Rounded glyphs — not text like "chevron_left".
result: pass

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
result: pass

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
result: pass

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
note: Tests 1,2,3,9,14 passed (5 total). Tests 4,5,6,7,8,10,11,12,13,15 have issues (10 total).

## Gaps

- truth: "Stepper past steps keep original icon, allowSkip enforcement, correct visual design"
  status: failed
  reason: "User reported: Past steps should keep original icon not checkmark, allowSkip not enforced, visual design wrong — past steps should be filled green circles with original icon, active step larger ring, future steps smaller filled green circles"
  severity: major
  test: 4
  root_cause: "Three bugs: (1) Stepper.tsx line 116 hardcodes 'check' icon for past steps — Vue never does this, all steps keep original icon. (2) allowSkip/allowedSkip prop and adjacency guard from Vue changeActiveStep() completely missing — handleStepClick has no guard. (3) Visual: .backgroundFuture uses border-color token as bg fill, making future steps solid gray disc instead of bordered hollow circle."
  artifacts:
    - path: "src/components/Stepper/Stepper.tsx"
      issue: "Line 116-120: conditional renders check icon for past steps. No allowSkip prop in StepperProps. handleStepClick (line 66-71) has no adjacency guard."
    - path: "src/components/Stepper/Stepper.module.css"
      issue: ".backgroundFuture uses --neutral-border-default as bg color instead of surface token."
  missing:
    - "Remove past-step checkmark substitution — always render getIcon(option)"
    - "Add allowSkip: boolean prop, implement adjacency guard in handleStepClick"
    - "Fix .backgroundFuture to use surface/neutral bg token"
  debug_session: ""

- truth: "Select has item slot for custom item display, options card has animation"
  status: failed
  reason: "User reported: Missing item slot to customize item display, select card items disappearing with no animation"
  severity: major
  test: 5
  root_cause: "Two bugs: (1) renderOption fallback uses children (a static single node) instead of default label — children carries no option/index context making it useless as item slot. (2) ExpandableContainer line 101 applies h-0 overflow-hidden simultaneously with opacity-0 on collapse — zero height clips card before CSS transition can animate."
  artifacts:
    - path: "src/components/Select/Select.tsx"
      issue: "Lines 248-251: fallback to children instead of default label when renderOption absent"
    - path: "src/utils/components/ExpandableContainer.tsx"
      issue: "Line 101: h-0 overflow-hidden applied synchronously with opacity-0 kills transition animation"
  missing:
    - "Remove children fallback from option mapping — use <span>{getLabel(option)}</span> unconditionally when renderOption absent"
    - "Remove h-0 overflow-hidden from collapsed state or delay it after transition completes"
    - "Coordinate ExpandableContainer opacity transition with SelectContainer translate animation"
  debug_session: ""

- truth: "AutoComplete option selection works and icon is unfold_more"
  status: failed
  reason: "User reported: Selecting an option does nothing, icon on far right should be unfold_more"
  severity: major
  test: 6
  root_cause: "Two bugs: (1) searchText and model are independent state vars — in controlled mode setModel skips internal state update, and no useEffect syncs searchText from model changes, so display stays stale after selection. (2) No unfold_more icon rendered anywhere — Vue used Input with icon='unfold_more' append-icon, React shows search icon from SelectContent searchable path."
  artifacts:
    - path: "src/components/AutoComplete/AutoComplete.tsx"
      issue: "Lines 52-73: searchText/model decoupled. Line 107: value={searchText} not synced from model. No unfold_more icon passed to any sub-component."
    - path: "src/utils/components/SelectContent.tsx"
      issue: "Line 94: searchable=true hardcodes search icon. No override for unfold_more."
    - path: "src/utils/components/Container.tsx"
      issue: "Line 148: trailing icon always keyboard_arrow_down"
  missing:
    - "Add useEffect syncing searchText from model when model changes externally"
    - "Pass icon='unfold_more' or add appendIcon prop to show unfold_more on the right"
    - "Consider making text input value derived from model (show label of selected value)"
  debug_session: ""

- truth: "Dropdown item selection works and groups show as expandable with nested sub-cards"
  status: failed
  reason: "User reported: Clicking item doesnt select, groups should show as expandable items with chevron revealing nested sub-options in separate card to the right"
  severity: blocker
  test: 7
  root_cause: "Two bugs: (1) Selection: stories pass controlled value prop without onChange that feeds back — useControllable marks as controlled, skips setInternalValue, display freezes. (2) Groups: DropdownOption renders groups as inline flat indented list (groupHeader + recursive DropdownOptions). Vue Option.vue has flyout submenu: local expanded state, chevron_right icon, absolutely-positioned .sub-options card at left:calc(100%+spacing)."
  artifacts:
    - path: "src/components/Dropdown/Dropdown.tsx"
      issue: "Lines 49-64: group branch renders flat inline list, no local expanded state, no chevron, no flyout card. Lines 213-217: useControllable with controlled value."
    - path: "src/components/Dropdown/Dropdown.module.css"
      issue: ".groupHeader is wrong concept — should be clickable row with chevron"
  missing:
    - "Add local useState for subExpanded in DropdownOption"
    - "Render clickable row with chevron_right for groups, flyout card positioned absolute left:100% top:0"
    - "Fix stories to use uncontrolled mode (defaultValue) or proper controlled useState"
  debug_session: ""

- truth: "TagSelect creates tags and icon is on left side"
  status: failed
  reason: "User reported: Tags not being created, custom icon must be on left side instead of right"
  severity: major
  test: 8
  root_cause: "Two bugs: (1) Tag creation requires creatable=true — without it both input and Add button hidden. isIncluded duplicate guard broken for object options (always returns false). Created tags added directly to selectedValues instead of options list (Vue pattern). (2) Icon passed as complement prop to SelectContainer, which renders in ml-auto right-side div in Container.tsx line 144. Vue renders icon as first flex child (leftmost)."
  artifacts:
    - path: "src/components/TagSelect/TagSelect.tsx"
      issue: "Lines 112-123: addCreatableOption needs creatable=true. Line 262: complement={iconNode} puts icon on right."
    - path: "src/utils/components/Container.tsx"
      issue: "Line 144: complement rendered in ml-auto div (right-side)"
  missing:
    - "Fix isIncluded check to compare against selectedValues not raw options"
    - "Add created tags to options list, then call toggleOption"
    - "Move icon from complement prop to a leadingComplement or prepend it before statusNode as first flex child"
  debug_session: ""

- truth: "RoundMenu label keeps button position fixed, items properly sized and spaced"
  status: failed
  reason: "User reported: When label shown button start position must remain same, label expands rightward as pill shape. Items need more spacing and larger size matching reference"
  severity: major
  test: 10
  root_cause: "Two issues: (1) menuItem wrapper has position:absolute with no left:0/top:0 anchor — translate3d offset drifts when Button pill-expands because centering recalculates from growing element width. (2) Button size='small' produces compact circles — Vue uses dynamic radius scaling and larger button size."
  artifacts:
    - path: "src/components/RoundMenu/RoundMenu.tsx"
      issue: "positionStyle only sets translate3d, no left:0/top:0 baseline. Line 49: size='small' hardcoded."
    - path: "src/components/RoundMenu/RoundMenu.module.css"
      issue: ".menuItem has no left/top anchor for stable transform origin"
  missing:
    - "Pin .menuItem with left:0 top:0 so translate3d offsets from known zero-point"
    - "Add transform-origin: left center to button for rightward pill expansion"
    - "Change button size to medium or large"
    - "Scale radius dynamically with item count matching Vue formula"
  debug_session: ""

- truth: "Calendar dialog absolute, compare mode works, hover range highlight between dates"
  status: failed
  reason: "User reported: Dialog must be absolute and open in month selection. Compare mode not working. Hover must highlight days between selected dates. Compare mode shows two ranges with different color intensities"
  severity: blocker
  test: 11
  root_cause: "Five bugs: (1) CalendarDateDialog rendered in-flow, no position:absolute/z-index. (2) activePanel defaults to null — should default to 'month'. (3) Compare click logic always targets range0, never routes to range1 — Vue uses index variable. (4) No hoveredDate state, no onMouseEnter/Leave, no hover range preview. (5) getDayProps only reads ranges[0], no secondary range CSS classes."
  artifacts:
    - path: "src/components/Calendar/Calendar.tsx"
      issue: "Lines 439-448: dialog in-flow. Line 100: activePanel=null. Lines 363-378: compare always resets range0. No hoveredDate state. getDayProps ignores ranges[1]."
    - path: "src/components/Calendar/Calendar.module.css"
      issue: "No .dateDialog absolute positioning. No .rangeHover, .rangeSecondary, .selectedSecondary classes."
  missing:
    - "Add position:absolute z-index top/left to dialog, position:relative to .calendar"
    - "Default activePanel to 'month'"
    - "Fix compare click logic: route to range1 when range0 complete"
    - "Add hoveredDate state + mouse handlers + rangeHover CSS"
    - "Add secondary range flags to getDayProps + secondary CSS classes"
  debug_session: ""

- truth: "DatePicker has correct proportions, spacing, and professional layout"
  status: failed
  reason: "User reported: Visuals all wrong — too small and cramped. Needs larger day cells, proper spacing, bordered nav arrows, properly sized Clear/Apply buttons, more whitespace"
  severity: blocker
  test: 12
  root_cause: "Proportional collapse: .datePickerCard has only p-sm, no min-width. Calendar .dayCell uses p-xxs (Vue uses p-xs). .actions has no horizontal padding. No min-width on trigger. Calendar wrapper inside card missing px-sm pt-xxs from Vue."
  artifacts:
    - path: "src/components/DatePicker/DatePicker.module.css"
      issue: ".datePickerCard p-sm only, no min-width. .actions no px padding."
    - path: "src/components/Calendar/Calendar.module.css"
      issue: ".dayCell p-xxs instead of p-xs. No min-w/min-h on day cells."
    - path: "src/components/DatePicker/DatePicker.tsx"
      issue: "Trigger has no min-width. Calendar wrapper missing padding."
  missing:
    - ".datePickerCard needs min-w-[280px], p-md or larger"
    - ".dayCell needs p-xs and min-w-[36px] min-h-[36px]"
    - ".actions needs px-sm"
    - "Trigger needs min-w-[160px]"
    - "Calendar wrapper inside card needs px-sm pt-xxs"
  debug_session: ""

- truth: "Navbar stories show examples of possible slots/children"
  status: failed
  reason: "User reported: Missing example of the possible slots (children) I can use"
  severity: minor
  test: 13
  root_cause: "Only 2 stories (Primary, WithCustomLogo). Neither demonstrates notifications slot content, showNotifications=false, custom children replacing Dropdown, or avatar with image. Vue has actions slot for right-side customization — React NavbarProps missing equivalent."
  artifacts:
    - path: "src/components/Navbar/Navbar.stories.tsx"
      issue: "Only 2 stories, no slot demonstration"
    - path: "src/components/Navbar/Navbar.tsx"
      issue: "No actions/rightSlot prop for right-side customization matching Vue slot"
  missing:
    - "Add WithNotifications, WithoutNotifications, WithCustomChildren, WithAvatarImage stories"
    - "Add actions/rightSlot prop for right-side slot parity"
  debug_session: ""

- truth: "Input type=color swatch on right side inside input border"
  status: failed
  reason: "User reported: Color preview swatch must be on right side of component, inside input border. Hex text on left, color square on far right within field"
  severity: cosmetic
  test: 15
  root_cause: "In Input.tsx lines 203-237, FloatCard (swatch trigger) is rendered BEFORE input (hex text) in JSX. Flex order puts swatch on left, text on right. Simply need to swap the order."
  artifacts:
    - path: "src/components/Input/Input.tsx"
      issue: "Lines 202-237: FloatCard rendered before input in JSX, producing left-swatch/right-text instead of left-text/right-swatch"
  missing:
    - "Swap JSX order: render input (hex text) first, then FloatCard (swatch) second"
  debug_session: ""
