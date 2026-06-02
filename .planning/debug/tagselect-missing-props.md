---
status: diagnosed
trigger: "Diagnose what properties the TagSelect component is missing compared to the original Vue version"
created: 2026-03-18T00:00:00Z
updated: 2026-03-18T00:00:00Z
---

## Current Focus

hypothesis: React TagSelect is missing several Vue props and features (icon, expanded, absolute, buttonLabel, slots, keyboard nav)
test: Compared Vue defineProps with React TagSelectProps interface
expecting: Mismatch in prop lists
next_action: Return diagnosis

## Symptoms

expected: React TagSelect should have feature parity with Vue TagSelect
actual: Multiple props and features from Vue version are absent in React version
errors: Stories reference `icon` prop but TagSelectProps interface does not declare it
reproduction: Compare Vue defineProps block with React TagSelectProps interface
started: Since initial React conversion

## Eliminated

(none - direct comparison confirmed on first pass)

## Evidence

- timestamp: 2026-03-18
  checked: Vue defineProps block (64c5cbb:TagSelect.vue)
  found: "Vue props: modelValue, options, labelValue, icon, expanded, labelKey, errorMessage, infoMessage, disabled, required, isError, absolute, buttonLabel"
  implication: These are the canonical props

- timestamp: 2026-03-18
  checked: React TagSelectProps interface (TagSelect.tsx)
  found: "React props: value, defaultValue, onChange, options, labelKey, valueKey, getObject, disabled, labelValue, searchable, creatable, isError, errorMessage, infoMessage, required, placeholder, className"
  implication: Several Vue props missing; some React props are new additions (valueKey, getObject, searchable, creatable, placeholder, className)

- timestamp: 2026-03-18
  checked: TagSelect.stories.tsx line 107
  found: "Icon story passes `icon: 'filter_view'` but TagSelectProps has no icon property"
  implication: Story is broken - prop is silently ignored

- timestamp: 2026-03-18
  checked: Vue SelectContent.vue
  found: "SelectContent accepts icon prop and renders an Icon component in the trigger area"
  implication: icon was rendered via SelectContent in Vue; React version skips SelectContent entirely

- timestamp: 2026-03-18
  checked: Vue template slots
  found: "Vue version has named slots: search-label, no-options-found, empty-state, option, actions"
  implication: React version has no render-prop or slot equivalents for customization

- timestamp: 2026-03-18
  checked: Vue onKeyUp handler
  found: "Vue has keyboard navigation (Home/ArrowDown selects first, End/ArrowUp selects last)"
  implication: React version has no keyboard navigation beyond Enter for creatable

## Resolution

root_cause: "React TagSelect conversion omitted 4 Vue props (icon, expanded, absolute, buttonLabel), lost keyboard navigation, lost named slot customization points, and has a broken story referencing the missing icon prop"
fix: (diagnosis only)
verification: (diagnosis only)
files_changed: []
