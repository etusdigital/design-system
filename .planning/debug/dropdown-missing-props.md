---
status: diagnosed
trigger: "Diagnose what properties the Dropdown component is missing compared to the original Vue version"
created: 2026-03-18T00:00:00Z
updated: 2026-03-18T00:00:00Z
---

## Current Focus

hypothesis: React Dropdown props interface is missing 5 Vue props that exist in the original and are supported by ExpandableContainer
test: Direct comparison of Vue defineProps vs React DropdownProps interface
expecting: Confirmed gap list
next_action: Return diagnosis

## Symptoms

expected: React Dropdown exposes all props the Vue Dropdown had
actual: 5 props from the Vue version are absent from the React DropdownProps interface
errors: Stories use `required` and `infoMessage` but DropdownProps does not declare them
reproduction: Compare DropdownProps (line 165-181) to Vue defineProps
started: Since initial React conversion

## Eliminated

(none)

## Evidence

- timestamp: 2026-03-18
  checked: Vue Dropdown.vue defineProps
  found: |
    Vue props: modelValue, expanded, labelValue, options, absolute, disabled,
    isError, errorMessage, infoMessage, required, maxHeight, minWidth,
    getObject, searchable
  implication: 14 distinct Vue props

- timestamp: 2026-03-18
  checked: React DropdownProps interface (Dropdown.tsx lines 165-181)
  found: |
    React props: value, defaultValue, onChange, options, labelKey, valueKey,
    getObject, disabled, labelValue, searchable, alignRight, isError,
    errorMessage, children, className
  implication: 15 declared React props, but several Vue originals missing

- timestamp: 2026-03-18
  checked: ExpandableContainer React interface
  found: |
    ExpandableContainer already supports: infoMessage, required, maxHeight,
    minWidth, absolute -- all available for pass-through
  implication: The missing props are supported downstream; Dropdown just never exposes them

- timestamp: 2026-03-18
  checked: Dropdown.stories.tsx
  found: |
    Stories "Required" (line 150) and "InfoMessage" (line 204) pass `required`
    and `infoMessage` props, but these are NOT in DropdownProps -- they are
    silently ignored at runtime
  implication: Stories are broken; they appear to work in Storybook arg tables but the props have no effect

## Resolution

root_cause: React Dropdown's DropdownProps interface omits 5 props that the Vue original declared and that the underlying ExpandableContainer already supports
fix: Add the missing props to DropdownProps and pass them through to ExpandableContainer
verification: (pending)
files_changed: []
