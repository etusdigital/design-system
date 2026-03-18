---
status: diagnosed
phase: 06-composite-components
source: 06-00-SUMMARY.md, 06-01-SUMMARY.md, 06-02-SUMMARY.md, 06-03-SUMMARY.md, 06-04-SUMMARY.md, 06-05-SUMMARY.md, 06-06-SUMMARY.md, 06-07-SUMMARY.md, 06-08-SUMMARY.md, 06-09-SUMMARY.md, 06-10-SUMMARY.md, 06-11-SUMMARY.md, 06-12-SUMMARY.md, 06-13-SUMMARY.md, 06-14-SUMMARY.md
started: 2026-03-18T00:00:00Z
updated: 2026-03-18T14:30:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Dialog renders and is interactive
expected: User can open/close dialog overlay, click outside to close (if enabled), see dialog content with proper z-index stacking
result: pass

### 2. Drawer slides from correct position with smooth animation
expected: User can open drawer from right/left/top/bottom edge with smooth slide-in animation, drawer closes on outside click or action, mobile forces bottom position
result: pass

### 3. Accordion expands and collapses with dynamic height animation
expected: User clicks header to toggle expanded state, content animates with max-height transition, chevron rotates 180deg, disabled accordion items don't respond to clicks
result: issue
reported: "It doesnt expand and when it is closed there is a strange height below the title"
severity: major

### 4. Tab navigation switches active tabs
expected: User clicks tab button, active tab displays correct content, visual indicator shows on active tab, onChange fires when user switches tabs
result: issue
reported: "The icons are not appearing and it is missing the option isIcon for the option to be just icons"
severity: major

### 5. Pagination displays page buttons with navigation
expected: User sees numbered page buttons, ellipsis appears for large page counts, prev/next arrows navigate between pages, active page shows visual highlight, returns null when fewer than 1 page
result: issue
reported: "The icons are strange — showing text chevron_left and chevron_right instead of actual arrow icons"
severity: major

### 6. Stepper shows step progress with visual indicators
expected: User sees circle icons connected by lines, current step circles are filled, past steps show distinct styling, clicking step changes active step (unless noClick), chevrons rotate based on step direction
result: issue
reported: "The line is not in the middle, the line connected to next step can not be green, the visual is wrong, and the steps the user already has been dont have the correct visual"
severity: major

### 7. Select component allows single/multi selection with search
expected: User types to search options, clicks option to select (single mode) or toggle (multi mode), clear button removes all selections, getObject mode emits full option object
result: issue
reported: "The select is missing properties the original select had"
severity: major

### 8. AutoComplete filters options while typing
expected: User types search text, dropdown shows filtered matching options, selecting option updates value
result: issue
reported: "When the autocomplete is opened the options card has no animation and this card should not occupy space, similar to FloatCard.tsx"
severity: major

### 9. Dropdown renders nested option groups with recursive nesting
expected: User sees flat options and group headers with nested options, clicking option selects it and closes dropdown, groups are searchable, getObject mode returns full option object
result: issue
reported: "The dropdown is missing properties the original dropdown had"
severity: major

### 10. TagSelect displays tag chips with delete
expected: User sees selected items as removable tag chips, can search and add new tags in creatable mode, clear button removes all tags, onChange fires when tags are modified
result: issue
reported: "The tagselect is missing properties the original tagselect had"
severity: major

### 11. Filter shows expandable categories with checkboxes
expected: User clicks category header to expand/collapse sub-options, checkboxes within categories toggle selection state, clear button deselects all, apply button commits selections, animated category expansion
result: pass

### 12. Carousel rotates slides with autoplay
expected: User sees slide content, carousel auto-rotates slides on interval, arrow buttons navigate between slides, navigation dots show current position
result: issue
reported: "The carousel is all wrong and not working at all. Shows raw card data instead of styled slide content. Disable doesnt even disable the steps"
severity: blocker

### 13. RoundMenu displays items in radial circle pattern
expected: User sees menu items positioned in circular pattern, items animate into place, clicking toggles expand/collapse state, smooth GPU-accelerated positioning
result: issue
reported: "The RoundMenu should use the Button component from src/components/Button/Button.tsx"
severity: major

### 14. Calendar displays date grid with month navigation
expected: User sees day grid for current month, month transitions with slide-fade animation, can click date to select, CalendarDateDialog shows year selector
result: issue
reported: "The visuals are all wrong and the month and year card dont even animate. Navigation arrows missing rounded button styling, selected date missing filled background, month selector shows flat text instead of rounded colored buttons, year selector shows flat list instead of scrollable card"
severity: blocker

### 15. DatePicker opens Calendar in popover with action buttons
expected: User clicks to open popover showing Calendar, can select date, clear button resets, apply button commits date selection
result: issue
reported: "The datepicker is missing properties the original datepicker had"
severity: major

### 16. Navbar displays navigation items with Dropdown submenus
expected: User sees nav items and clickable dropdown toggles for items with sub-options, dropdown shows nested menu items, logo and profile slots render custom content, responsive layout on mobile
result: issue
reported: "The visuals are all wrong and no functionality is working correctly. Shows all nav items inline instead of using dropdown, missing logo circle, missing profile avatar, missing notification bell icon"
severity: blocker

### 17. ColorPicker allows color selection with canvas area and sliders
expected: User drags on canvas color area to select hue/saturation, hue slider changes color channel, opacity slider adjusts alpha, type toggles switch between HEX/RGB/HSL/HSV/CMYK color formats, drag-anywhere behavior
result: issue
reported: "It is missing the property noShadow"
severity: minor

### 18. Input type="color" renders color swatch with ColorPicker popover
expected: User sees colored swatch, can type hex value in input, clicking opens ColorPicker popover overlay, selecting color updates swatch and input value
result: issue
reported: "When I click outside the color selector it doesnt disappear, use FloatCard.tsx for this. Visual is wrong - swatch is outside input instead of inline"
severity: major

## Summary

total: 18
passed: 3
issues: 15
pending: 0
skipped: 0

## Gaps

- truth: "Accordion expands/collapses with animation"
  status: failed
  reason: "User reported: It doesnt expand and when it is closed there is a strange height below the title"
  severity: major
  test: 3
  root_cause: "ResizeObserver stale closure immediately undoes expansion (mount-only useEffect captures isExpanded=false permanently); flex gap-sm on card wrapper creates visible space below header when collapsed"
  artifacts:
    - path: "src/components/Accordion/Accordion.tsx"
      issue: "Lines 50-72: observer effects capture stale resize closure; Line 93: gap-sm on card wrapper"
  missing:
    - "Store resize in useRef or add isExpanded to observer effect deps"
    - "Remove gap-sm from card wrapper, use conditional spacing"
  debug_session: ".planning/debug/accordion-no-expand.md"

- truth: "Tab shows icons and supports isIcon mode"
  status: failed
  reason: "User reported: The icons are not appearing and it is missing the option isIcon for the option to be just icons"
  severity: major
  test: 4
  root_cause: "React Tab.tsx missing isIcon prop and all icon rendering logic -- getLabel() only returns text strings, never renders Icon components"
  artifacts:
    - path: "src/components/Tab/Tab.tsx"
      issue: "TabProps missing isIcon prop; no Icon import; getLabel() returns plain string only"
    - path: "src/components/Tab/Tab.module.css"
      issue: "Missing .icon sizing rule"
  missing:
    - "Add isIcon?: boolean to TabProps"
    - "Import Icon component"
    - "Add two-branch rendering: object options with option.icon, string options with isIcon"
    - "Add .icon sizing rule to CSS"
  debug_session: ""

- truth: "Pagination shows arrow icons for prev/next"
  status: failed
  reason: "User reported: The icons are strange — showing text chevron_left and chevron_right instead of actual arrow icons"
  severity: major
  test: 5
  root_cause: "Material Symbols Rounded web font is never loaded. Icon.css sets font-variation-settings but no @import or @font-face loads the font. main.css imports Inter/Poppins but omits Material Symbols. Global * { font-family: var(--font-sans) } overrides the icon font class."
  artifacts:
    - path: "src/assets/main.css"
      issue: "Missing Material Symbols font import"
    - path: "src/components/Icon/Icon.css"
      issue: "Has variation settings but no font-family declaration"
  missing:
    - "Add @import url for Material Symbols Rounded to main.css"
    - "Add explicit font-family: 'Material Symbols Rounded' to .material-symbols-rounded rule in Icon.css"
  debug_session: ""

- truth: "Stepper shows correct line positioning and step state visuals"
  status: failed
  reason: "User reported: The line is not in the middle, the line connected to next step can not be green, the visual is wrong, and completed steps dont have correct visual"
  severity: major
  test: 6
  root_cause: "React Stepper misimplements Vue version 2 circle-based stepper: missing layered circle design (background ring with split coloring for active step), wrong connector logic (colors connector AT current index green instead of only BEFORE it), missing scale-[1.2] for active step, items-start breaks line centering"
  artifacts:
    - path: "src/components/Stepper/Stepper.tsx"
      issue: "Missing background ring element; wrong getConnectorState logic; missing scale-[1.2] on active step; broken biggerStepSelected tracking"
    - path: "src/components/Stepper/Stepper.module.css"
      issue: "items-start breaks connector centering; past/active styles identical; future step uses wrong bg"
  missing:
    - "Fix connector coloring: only green when index < biggerStepSelected"
    - "Add background ring element with split coloring for active step"
    - "Add scale-[1.2] on active step container"
    - "Change .stepper from items-start to items-center"
    - "Fix biggerStepSelected to track max step index as simple number"
    - "Differentiate past/active/future circle styles"
  debug_session: ""

- truth: "Select has all original properties"
  status: failed
  reason: "User reported: The select is missing properties the original select had"
  severity: major
  test: 7
  root_cause: "React Select omits icon prop (SelectContent accepts it but Select never forwards), expanded/onExpandedChange controlled state, keyboard navigation, and 5 named slots (search-label, option, status, actions, clear-label). Placeholder prop is dead code."
  artifacts:
    - path: "src/components/Select/Select.tsx"
      issue: "Missing icon, expanded/onExpandedChange props; no keyboard nav; no slot equivalents; dead placeholder prop"
  missing:
    - "Add icon prop and forward to SelectContent"
    - "Add expanded/onExpandedChange for controlled state"
    - "Add keyboard navigation (ArrowUp/Down/Home/End/Enter)"
    - "Add render-prop equivalents for Vue slots"
    - "Wire up or remove placeholder prop"
  debug_session: ""

- truth: "AutoComplete options card floats with animation like FloatCard"
  status: failed
  reason: "User reported: Options card has no animation and should not occupy space, similar to FloatCard.tsx"
  severity: major
  test: 8
  root_cause: "ExpandableContainer isAbsolute logic is inverted (line 68: isExpanded ? absolute : true -- applies absolute only when collapsed/null, relative when expanded/visible). AutoComplete never passes absolute=true. Conditional render (isExpanded ? ... : null) prevents CSS transitions."
  artifacts:
    - path: "src/utils/components/ExpandableContainer.tsx"
      issue: "Line 68: isAbsolute inversion; Line 95-110: conditional mount/unmount prevents transitions"
    - path: "src/components/AutoComplete/AutoComplete.tsx"
      issue: "Does not pass absolute={true} to SelectContainer"
  missing:
    - "Fix isAbsolute logic in ExpandableContainer"
    - "Pass absolute={true} from AutoComplete"
    - "Replace conditional mount with useTransition-based pattern for animations"
  debug_session: ""

- truth: "Dropdown has all original properties"
  status: failed
  reason: "User reported: The dropdown is missing properties the original dropdown had"
  severity: major
  test: 9
  root_cause: "React DropdownProps omits 5 props (required, infoMessage, maxHeight, minWidth, absolute) that Vue declared and that ExpandableContainer already supports"
  artifacts:
    - path: "src/components/Dropdown/Dropdown.tsx"
      issue: "DropdownProps missing 5 props; ExpandableContainer invocation doesn't forward them"
    - path: "src/components/Dropdown/Dropdown.stories.tsx"
      issue: "Stories use required and infoMessage but they are silently ignored"
  missing:
    - "Add required, infoMessage, maxHeight, minWidth, absolute to DropdownProps"
    - "Forward all 5 props to ExpandableContainer"
  debug_session: ".planning/debug/dropdown-missing-props.md"

- truth: "TagSelect has all original properties"
  status: failed
  reason: "User reported: The tagselect is missing properties the original tagselect had"
  severity: major
  test: 10
  root_cause: "React TagSelect omits 4 Vue props (icon, expanded, absolute, buttonLabel), keyboard navigation, and named-slot customization points"
  artifacts:
    - path: "src/components/TagSelect/TagSelect.tsx"
      issue: "Missing icon, expanded/onExpandedChange, absolute, buttonLabel props; no keyboard nav"
    - path: "src/components/TagSelect/TagSelect.stories.tsx"
      issue: "Icon story passes undeclared icon prop (silently ignored)"
  missing:
    - "Add icon, expanded/onExpandedChange, absolute, buttonLabel to TagSelectProps"
    - "Add keyboard navigation (Arrow/Home/End)"
    - "Add Tab key to create tag"
  debug_session: ".planning/debug/tagselect-missing-props.md"

- truth: "Carousel displays styled slides and works correctly"
  status: failed
  reason: "User reported: The carousel is all wrong and not working at all. Disable doesnt disable steps"
  severity: blocker
  test: 12
  root_cause: "Missing disabled/circular props; broken slide layout -- Vue wraps each section (group of visible items) in a flex container but React flatly renders all items without section wrappers; overflow container missing fixed sizing; track missing w-max"
  artifacts:
    - path: "src/components/Carousel/Carousel.tsx"
      issue: "Missing disabled/circular props; sections.map flattened (no section wrappers); overflow div has no width/height constraint"
    - path: "src/components/Carousel/Carousel.stories.tsx"
      issue: "Disabled story uses showArrows={false} instead of disabled prop; SlideContent is unstyled"
  missing:
    - "Add disabled and circular props"
    - "Wrap each section group in flex container div"
    - "Apply computed contentStyle (width/height) to overflow container"
    - "Add w-max to track CSS"
    - "Fix calculateContentStyle to measure actual child DOM widths"
  debug_session: ""

- truth: "RoundMenu uses Button component"
  status: failed
  reason: "User reported: The RoundMenu should use the Button component"
  severity: major
  test: 13
  root_cause: "RoundMenu.tsx renders raw <button> elements for menu items and trigger instead of using the design system's <Button round={true}> component"
  artifacts:
    - path: "src/components/RoundMenu/RoundMenu.tsx"
      issue: "Line 41-50: menu items use raw <button>; Line 54-61: trigger uses raw <button>; imports Icon but not Button"
  missing:
    - "Import Button component"
    - "Replace raw <button> elements with <Button round icon={...} />"
    - "Prune duplicate CSS styling that Button already provides"
  debug_session: ""

- truth: "Calendar has correct visuals with animated month/year selectors"
  status: failed
  reason: "User reported: Visuals all wrong, month/year card dont animate, arrows missing rounded styling, selected date missing filled bg, month selector shows flat text, year selector shows flat list"
  severity: blocker
  test: 14
  root_cause: "Skeletal CSS module and drastically simplified CalendarDateDialog missing virtually all visual styling, structural markup, and animation from Vue original. CSS syntax error on line 15 breaks selected-day rule. Month/year shown simultaneously instead of separate toggled panels."
  artifacts:
    - path: "src/components/Calendar/Calendar.module.css"
      issue: "navButton missing bordered styling; dayCell.selected has CSS syntax error (trailing '); monthButton missing colored bg; no yearList styles; no animation styles"
    - path: "src/components/Calendar/Calendar.tsx"
      issue: "CalendarDateDialog renders month+year grids simultaneously (should be separate toggled panels); year selector uses monthGrid instead of vertical scrollable list; no Card wrapper; no enter/leave animation"
  missing:
    - "Fix CSS syntax error on selected day rule"
    - "Add bordered rounded-box styling to nav arrows"
    - "Add bg-primary-surface-highlight to inactive month buttons"
    - "Restructure year selector as vertical scrollable list in Card"
    - "Separate month/year into distinct toggled panels"
    - "Add enter/leave transition animation"
  debug_session: ".planning/debug/calendar-wrong-visuals.md"

- truth: "DatePicker has all original properties"
  status: failed
  reason: "User reported: The datepicker is missing properties the original datepicker had"
  severity: major
  test: 15
  root_cause: "React DatePicker missing 8 props (separator, isCompare, allowChangeType, absolute, expanded, alignRight, options, hideActions), 3 events (onClear, onExpandedChange, onTypeChange), and the entire preset options sidebar feature"
  artifacts:
    - path: "src/components/DatePicker/DatePicker.tsx"
      issue: "Missing 8 props, 3 callbacks, preset options sidebar"
    - path: "src/components/DatePicker/DatePicker.stories.tsx"
      issue: "4 stories commented out due to missing props"
  missing:
    - "Add separator, isCompare, allowChangeType, absolute, expanded, alignRight, options, hideActions props"
    - "Add onClear, onExpandedChange, onTypeChange callbacks"
    - "Implement preset options sidebar"
  debug_session: ""

- truth: "Navbar has correct layout with dropdown, logo, profile avatar, notification bell"
  status: failed
  reason: "User reported: Visuals all wrong, no functionality working, shows all nav items inline, missing logo circle, profile avatar, notification bell"
  severity: blocker
  test: 16
  root_cause: "React Navbar was rewritten as generic nav-items renderer instead of faithfully porting Vue's specific layout: logo circle + divider + single Dropdown on left; notification bell Icon via FloatCard + Avatar on right"
  artifacts:
    - path: "src/components/Navbar/Navbar.tsx"
      issue: "Renders options as inline nav items instead of single Dropdown; missing default SVG logo; missing vertical divider; missing notification bell; missing Avatar; no modelValue support"
    - path: "src/components/Navbar/Navbar.module.css"
      issue: "Missing notification-icon styles; wrong padding/bg; missing divider styles"
    - path: "src/components/Navbar/Navbar.stories.tsx"
      issue: "Story structure doesn't match Vue usage pattern"
  missing:
    - "Port default SVG logo circle from Vue"
    - "Add vertical divider between logo and navigation"
    - "Use single Dropdown for all options"
    - "Add notification bell Icon with FloatCard"
    - "Add Avatar component for profile"
    - "Add value/onChange for selected nav option"
  debug_session: ""

- truth: "ColorPicker supports noShadow property"
  status: failed
  reason: "User reported: It is missing the property noShadow"
  severity: minor
  test: 17
  root_cause: "Vue ColorPicker has noShadow prop applied to Card wrapper; React omits it entirely and hardcodes shadow-neutral-default in CSS"
  artifacts:
    - path: "src/components/ColorPicker/ColorPicker.tsx"
      issue: "ColorPickerProps missing noShadow?: boolean"
    - path: "src/components/ColorPicker/ColorPicker.module.css"
      issue: ".colorPicker always applies shadow; no .noShadow variant"
  missing:
    - "Add noShadow?: boolean to ColorPickerProps"
    - "Add .noShadow CSS class that removes shadow"
    - "Conditionally apply styles.noShadow when prop is true"
  debug_session: ""

- truth: "Input type=color popover closes on outside click, uses FloatCard, correct visual"
  status: failed
  reason: "User reported: Clicking outside doesnt close color selector, should use FloatCard.tsx, visual is wrong"
  severity: major
  test: 18
  root_cause: "Color picker popover uses raw div with position:absolute and no click-outside listener. FloatCard already implements this. Color swatch button sits outside styled input border instead of inline within it."
  artifacts:
    - path: "src/components/Input/Input.tsx"
      issue: "Lines 181-249: type=color branch uses raw div popover with no outside-click handling; swatch outside inputContainer wrapper"
    - path: "src/components/FloatCard/FloatCard.tsx"
      issue: "Existing component with click-outside behavior that should be used"
  missing:
    - "Replace raw div popover with FloatCard component"
    - "Move color swatch inside inputContainer-styled wrapper"
    - "Remove manual showColorPicker toggle (FloatCard handles it)"
  debug_session: ""
