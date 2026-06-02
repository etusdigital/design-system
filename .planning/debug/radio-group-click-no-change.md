---
status: diagnosed
trigger: "clicking a Radio in a RadioGroup does not change the selected value in Storybook"
created: 2026-03-16T00:00:00Z
updated: 2026-03-16T00:00:00Z
---

## Current Focus

hypothesis: Stories pass a static `value` prop without `onChange`, putting RadioGroup in fully controlled mode. useControllable ignores internal state updates when controlled, so the displayed value never changes.
test: Read useControllable — confirmed: when `value !== undefined`, `setValue` calls `onChange?.()` but never calls `setInternalValue`. Since onChange is not provided, nothing happens.
expecting: Root cause confirmed.
next_action: Return structured diagnosis.

## Symptoms

expected: Clicking a Radio should visually select that option
actual: Nothing changes — the previously selected Radio stays selected
errors: No runtime errors; silent no-op
reproduction: Open any Primary / Vertical / Disabled / StringOptions story in Storybook and click an unselected Radio
started: Always (by design of the story args)

## Eliminated

- hypothesis: CSS pointer-events blocking clicks
  evidence: .disabled class applies pointer-events-none, but only when isDisabled=true. Non-disabled radios have no pointer-events override. Clicks reach handleClick().
  timestamp: 2026-03-16T00:00:00Z

- hypothesis: handleClick not calling context.select()
  evidence: Radio.tsx line 49 calls groupCtx!.select(groupValue) when isInGroup is true and not disabled. The call happens correctly.
  timestamp: 2026-03-16T00:00:00Z

- hypothesis: RadioGroupContext not provided / consumed correctly
  evidence: RadioGroup.tsx wraps children in RadioGroupContext.Provider (line 91-93). Radio.tsx consumes it via useContext(RadioGroupContext) (line 32). Context wire is correct.
  timestamp: 2026-03-16T00:00:00Z

## Evidence

- timestamp: 2026-03-16T00:00:00Z
  checked: RadioGroup.stories.tsx — Primary, Vertical, Disabled, StringOptions stories
  found: Every story passes `value` as a static arg (e.g. value: 1, value: 2, value: 'apple'). No `onChange` handler is provided.
  implication: RadioGroup is placed in fully controlled mode with a static, never-changing value.

- timestamp: 2026-03-16T00:00:00Z
  checked: useControllable.ts — setValue function (lines 36-41)
  found: |
    const setValue = (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue);  // only runs when uncontrolled
      }
      onChange?.(newValue);  // optional-chained — no-op when onChange is undefined
    };
    isControlled = (controlledValue !== undefined) = true when value prop is set.
  implication: When controlled and no onChange is provided, setValue is a complete no-op. State never changes. The frozen value from props is always returned.

- timestamp: 2026-03-16T00:00:00Z
  checked: RadioGroup.tsx — useControllable call (line 54)
  found: useControllable receives { value, defaultValue, onChange }. Stories never pass onChange, so onChange is undefined.
  implication: Confirms the no-op path in useControllable is always taken for story clicks.

- timestamp: 2026-03-16T00:00:00Z
  checked: Radio.module.css — pointer-events rules
  found: Only .disabled applies pointer-events-none. No other rule restricts clicks.
  implication: CSS is not the cause.

## Resolution

root_cause: |
  All interactive stories (Primary, Vertical, StringOptions, Vertical) pass a static `value` prop
  without a corresponding `onChange` handler. This puts RadioGroup in fully controlled mode.
  In useControllable, controlled mode unconditionally skips setInternalValue and relies on
  onChange to drive re-renders. With onChange absent, every call to select() is silently
  discarded and the displayed selection never changes.

fix: |
  Replace the static `value` arg with `defaultValue` in all stories that are meant to be
  interactive (Primary, Vertical, StringOptions). This switches them to uncontrolled mode,
  where useControllable manages internal state and re-renders happen automatically.

  For stories that must demonstrate controlled mode, add a render() wrapper with useState
  to own the value and supply onChange.

verification: not yet applied
files_changed: []
