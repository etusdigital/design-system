---
status: diagnosed
phase: 07-complex-components
source: [07-01-SUMMARY.md, 07-02-SUMMARY.md, 07-03-SUMMARY.md, 07-04-SUMMARY.md, 07-05-SUMMARY.md, 07-06-SUMMARY.md, 07-07-SUMMARY.md]
started: 2026-03-23T00:00:00Z
updated: 2026-03-23T14:10:00Z
---

## Current Test

[testing complete]

## Tests

### 1. History Stories in Storybook
expected: Open Storybook and navigate to History. You should see 8 story variants: Primary, Positions, Types, Disabled, MultiType, Icons, IsIconRound, Unfilled. The Primary story shows a 6-person timeline with date + label items and type-based colors. The Positions story shows all 4 layouts (top/bottom/left/right).
result: issue
reported: "The most part of the modes their styles are broken. Icons should be inside large colored filled circles (not small outlines), timeline connector line should be thicker, active items need green highlight background, type-based colors missing as circle fills. Affects left, right, top, and bottom position variants."
severity: major

### 2. Crop Story in Storybook
expected: Navigate to Crop in Storybook. The Primary story shows an image with a draggable crop area and zoom slider. Dragging pans the image. The zoom slider adjusts scale. A cropped output image is displayed below.
result: issue
reported: "If there are 2 Crops in the same page, the movement of one affect the second — shared state between instances"
severity: major

### 3. Sidebar Stories in Storybook
expected: Navigate to Sidebar in Storybook. Primary story shows a collapsed sidebar (icons only) with 5 navigation items. Expanded story shows the same sidebar with icons and labels visible. Clicking an option with sub-options should open a sub-panel.
result: issue
reported: "The visuals are all wrong. Active item should have green background highlight not just left border, sub-panel shows duplicate 'All Projects' header with arrow instead of just sub-items, sub-panel items lack spacing, Settings icon missing at bottom, overall layout/spacing wrong."
severity: major

### 4. Tree Stories in Storybook
expected: Navigate to Tree in Storybook. Primary story shows a Documents/Downloads/Music hierarchy with expand/collapse arrows. Multiple story shows the same tree with checkboxes for multi-select. Disabled story shows the tree in disabled state.
result: issue
reported: "The multi version parent checkbox does not work properly — no indeterminate state (dash) when some children are selected. And the icons are not appearing next to node labels (should show folder, gear, document, person, download, music icons)."
severity: major

### 5. Table Stories in Storybook
expected: Navigate to Table in Storybook. Primary story shows a table with Name/Age/Membership columns, 43-item dataset, sorting (click column headers), and pagination. Other variants include Loading (skeleton rows), Selection (checkboxes), EmptyState, and Footer.
result: issue
reported: "The select all and aggregation does not work"
severity: major

### 6. RichTextEditor Stories in Storybook
expected: Navigate to RichTextEditor in Storybook. Primary story shows a contenteditable editor with a formatting toolbar (bold, italic, underline, lists, link, alignment, font-size, colors). Other variants: IsError (red border + error message), Disabled, Required, NoBorder.
result: issue
reported: "The color and background selection is not working"
severity: major

### 7. Storybook Build Success
expected: Run `npx storybook build` (or check dev server). Build completes without errors. No duplicate story ID warnings. All 33 Phase 7 story variants are indexed.
result: pass

### 8. Unit Tests Pass
expected: Run `npx vitest --project unit` for the 6 complex components. All smoke tests pass (Table, Tree, Sidebar, RichTextEditor, Crop, History).
result: issue
reported: "17 test files failed, 45 tests failed out of 378. Failures across RoundMenu, Slider, Stepper, TagSelect, Textarea, Container, ExpandableContainer, Overlay, SelectContainer. Tests need to be fixed to match the components, not the other way around."
severity: major

## Summary

total: 8
passed: 1
issues: 7
pending: 0
skipped: 0

## Gaps

- truth: "History component renders with correct styles — large colored icon circles, thick timeline connector, active item highlight, type-based colors"
  status: failed
  reason: "User reported: The most part of the modes their styles are broken. Icons should be inside large colored filled circles (not small outlines), timeline connector line should be thicker, active items need green highlight background, type-based colors missing as circle fills. Affects left, right, top, and bottom position variants."
  severity: major
  test: 1
  root_cause: ".circleIcon class never overrides the 10x10px .circle dimensions so icons stay tiny; connector uses 1.5px border; type-colored circle fills only apply in active/disabled state, not default idle state"
  artifacts:
    - path: "src/components/History/History.module.css"
      issue: ".circle w-[10px] h-[10px] too small; .circleIcon needs larger explicit dimensions; type color rules only apply with .active class"
  missing:
    - "Override .circleIcon to w-[32px] h-[32px] min-w-[32px] min-h-[32px]"
    - "Increase connector border to border-l-[3px]"
    - "Add default type-colored circle fill rules for non-active state"

- truth: "Multiple Crop instances on same page operate independently"
  status: failed
  reason: "User reported: If there are 2 Crops in the same page, the movement of one affect the second — shared state between instances"
  severity: major
  test: 2
  root_cause: "Hardcoded SVG mask id='highlight-mask' is document-global; all instances reference the first instance's mask definition"
  artifacts:
    - path: "src/components/Crop/Crop.tsx"
      issue: "Line 210: hardcoded SVG mask ID shared across instances; lines 142-146: window-scoped event listeners from every instance"
  missing:
    - "Generate unique ID per instance via useId() for SVG mask"
    - "Scope drag listeners to component container instead of window"

- truth: "Sidebar renders with correct visual styling — green active highlight, proper sub-panel, Settings at bottom"
  status: failed
  reason: "User reported: The visuals are all wrong. Active item should have green background highlight not just left border, sub-panel shows duplicate 'All Projects' header with arrow instead of just sub-items, sub-panel items lack spacing, Settings icon missing at bottom, overall layout/spacing wrong."
  severity: major
  test: 3
  root_cause: "React CSS invented border-left active indicator with wrong purple fallback instead of Vue's bg-primary-surface-default green fill; sub-panel renders parent item at same level as children causing duplicate header"
  artifacts:
    - path: "src/components/Sidebar/Sidebar.module.css"
      issue: ".optionActive uses border-left:3px with purple fallback instead of bg-primary-surface-default; missing text color tokens; missing gap-sm on sub-panel"
    - path: "src/components/Sidebar/Sidebar.tsx"
      issue: "Sub-panel renders clickedOption.options flat causing duplicate header; missing text color tokens on options"
  missing:
    - "Replace border-left with bg-primary-surface-default + text-primary-interaction-selected"
    - "Add gap-sm to sub-panel children container"
    - "Fix sub-panel to not duplicate parent item as child"
    - "Add text-neutral-interaction-default base color and hover text-primary-interaction-default"

- truth: "Tree parent checkbox shows indeterminate state and node icons are visible"
  status: failed
  reason: "User reported: The multi version parent checkbox does not work properly — no indeterminate state (dash) when some children are selected. And the icons are not appearing next to node labels."
  severity: major
  test: 4
  root_cause: "TreeNode omits option.icon rendering entirely and checkIsSelected returns boolean only — no indeterminate (null) computation for parent nodes with partially-selected children"
  artifacts:
    - path: "src/components/Tree/Tree.tsx"
      issue: "No Icon rendered for option.icon; checkIsSelected returns boolean not boolean|null; Checkbox missing allowIndeterminate prop"
  missing:
    - "Add Icon rendering: {option.icon && <Icon name={option.icon} />} between checkbox and label"
    - "Rewrite checkIsSelected to return boolean|null with recursive child-check for indeterminate"
    - "Pass allowIndeterminate to Checkbox component"

- truth: "Table select-all checkbox and aggregation numbering work correctly"
  status: failed
  reason: "User reported: The select all and aggregation does not work"
  severity: major
  test: 5
  root_cause: "allSelected state is never synchronized with individual row toggles — handleSelectRow modifies selectedRows but never updates allSelected; aggregation header th is empty with no width"
  artifacts:
    - path: "src/components/Table/Table.tsx"
      issue: "Lines 128-129: selectedRows and allSelected are independent state that drifts; line 207: aggregation th is empty with no min-width"
  missing:
    - "Derive allSelected from selectedRows.size === pagedItems.length instead of separate state"
    - "Add indeterminate state to header checkbox when 0 < selectedRows.size < pagedItems.length"
    - "Add min-width and # label to aggregation column header"

- truth: "RichTextEditor color and background color pickers apply colors to selected text"
  status: failed
  reason: "User reported: The color and background selection is not working"
  severity: major
  test: 6
  root_cause: "execCommand('foreColor'/'backColor') generates <font color=...> elements but <font> tag is absent from ALLOWED_TAGS and color attribute absent from ALLOWED_ATTRS in sanitizer, so colors are stripped"
  artifacts:
    - path: "src/components/RichTextEditor/RichTextEditor.tsx"
      issue: "ALLOWED_TAGS (line 31) missing 'font'; ALLOWED_ATTRS (line 32) missing 'color'; sanitizeHTML strips color formatting on re-render"
  missing:
    - "Either add 'font' to ALLOWED_TAGS and 'color' to ALLOWED_ATTRS"
    - "Or replace execCommand with manual DOM wrapping using <span style='color:...'> which is already allowed"

- truth: "All unit tests pass (vitest --project unit)"
  status: failed
  reason: "User reported: 17 test files failed, 45 tests failed out of 378. Failures across RoundMenu, Slider, Stepper, TagSelect, Textarea, Container, ExpandableContainer, Overlay, SelectContainer. Tests need to be fixed to match components, not vice versa."
  severity: major
  test: 8
  root_cause: "Tests written against assumed component interfaces that don't match actual implementations: wrong prop names (modelValue vs value), missing props (defaultValue), wrong query scopes (container vs document for portal content), wrong class names, wrong callback signatures"
  artifacts:
    - path: "src/components/RoundMenu/RoundMenu.test.tsx"
      issue: "Tests query aria-label='Open menu' but trigger has no aria-label; tests check aria-expanded which doesn't exist"
    - path: "src/components/Slider/Slider.test.tsx"
      issue: "Tests pass defaultValue prop but Slider has no defaultValue prop; hardcodes defaultValue:0 in useControllable"
    - path: "src/components/Stepper/Stepper.test.tsx"
      issue: "Queries [class*='circle'] but class is 'step'; defaultValue prop doesn't exist; onChange called with label string not index; --stepper-bg CSS variable doesn't exist"
    - path: "src/components/TagSelect/TagSelect.test.tsx"
      issue: "Options render in FloatCard portal (document.body); container.querySelectorAll misses them"
    - path: "src/components/Textarea/Textarea.test.tsx"
      issue: "No defaultValue prop; hardcodes defaultValue:'' in useControllable; counter shows 0/100 not 4/100"
    - path: "src/utils/components/Overlay.test.tsx"
      issue: "Uses modelValue prop but component prop is named value"
    - path: "src/utils/components/Container.test.tsx"
      issue: "FloatCard portal interference; renderContent inside closed portal"
    - path: "src/utils/components/ExpandableContainer.test.tsx"
      issue: "Shadow class inside portal not in container; alignRight prop never implemented"
    - path: "src/utils/components/SelectContainer.test.tsx"
      issue: "Content renders via portal; container.querySelector misses portal content"
  missing:
    - "Fix RoundMenu tests: query trigger by CSS class, remove aria-expanded assertions"
    - "Fix Slider tests: assert defaultValue:0, use value prop instead of defaultValue"
    - "Fix Stepper tests: query [class*='step'], use value prop, expect label string in onChange"
    - "Fix TagSelect tests: use screen.getAllByRole('option') or document.querySelectorAll for portal content"
    - "Fix Textarea tests: use value='test' instead of defaultValue='test'"
    - "Fix Overlay tests: change modelValue to value"
    - "Fix Container/ExpandableContainer/SelectContainer tests: mock createPortal or query document instead of container"
