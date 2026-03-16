# Phase 3: Form Components - Research

**Researched:** 2026-03-16
**Domain:** React form component migration — controlled/uncontrolled patterns, forwardRef, compound sub-components, drag-and-drop, keyboard navigation
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Cross-phase Dependencies**
- Pull Label (INTL-01) migration into Phase 3 — multiple form components (Input, Textarea, TagInput, FileUpload) depend on it
- Defer Input `type="color"` to Phase 6 — ColorPicker is a complex composite component (~460 lines) with a circular dependency
- Import Tooltip and StatusBadge directly in TagInput — both already migrated in Phase 2, use as-is with JSX syntax

**Slot Migration Pattern**
- Named slots → compound sub-components (consistent with Phase 2 pattern):
  - `<Input.PrependIcon>` and `<Input.AppendIcon>` (replaces icon-slot and appended-icon-slot)
  - `<TagInput.PrependIcon>` and `<TagInput.AppendIcon>` (same pattern)
  - `<TagInput.Hint>` (replaces hint-message slot)
  - `<FileUpload.Preview>` (replaces uploaded-file slot)
- Default slot → `children` prop (Checkbox label content, etc.)
- Keep `icon` and `appendIcon` string props for the simple/common case alongside compound sub-components

**Imperative Handles & Ref Forwarding**
- `forwardRef` on: Input, Textarea, Slider, PINInput — components with native `<input>` elements
- Ref target: native `<input>` element (not wrapper div) — enables `.focus()`, `.select()`, form library registration
- PINInput: `useImperativeHandle` to expose `{ focus(), clear() }` — mirrors Vue's `defineExpose` behavior
- Other form components (Checkbox, Radio, Switch, Toggle, ToggleGroup, RadioGroup, TagInput, FileUpload): no forwardRef needed

**Built-in Validation**
- Keep all validation identical to Vue version:
  - Email, domain, URL validation via `isValidEmail()`, `isValidDomain()`, `isValidUrl()` from utils
  - Mask formatting (CPF, CNPJ, CEP) via `applyMask()` from utils
  - Max length enforcement with character counter
  - Number min/max clamping with custom increment/decrement Icon buttons (hide native spinners via CSS)
- Internal state model: `useState` for `hasError`, `isFocused`, etc. — mirror Vue's ref-based approach
- `isError` prop still allows external error override
- TagInput: keep duplicate check, max count check, mask validation, and 2-second error auto-dismiss timeout

### Claude's Discretion
- Migration order of the 12 form components (dependency-aware batching)
- Exact CSS Module class naming and file structure
- How to handle edge cases in individual components (e.g., Slider thumb positioning, ToggleGroup state coordination)
- Label component implementation details
- Story completeness — adapt what exists, don't add new variants

### Deferred Ideas (OUT OF SCOPE)
- Input `type="color"` with FloatCard + ColorPicker integration — Phase 6
- ColorPicker component migration — Phase 6 (COMP-15)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FORM-01 | Input component migrated with controlled/uncontrolled support and forwardRef | `useControllable` hook + `React.forwardRef` wrapping native `<input>`; ref forwarded to input element |
| FORM-02 | Textarea component migrated with controlled/uncontrolled support and forwardRef | Same pattern as Input; `forwardRef` to `<textarea>` element |
| FORM-03 | Checkbox component migrated with controlled/uncontrolled support | `useControllable<boolean | null>` with `defaultValue=false`; three-state (true/null/false) when `allowIndeterminate` |
| FORM-04 | Radio component migrated with controlled/uncontrolled support | `useControllable<boolean>` + React context for group integration |
| FORM-05 | RadioGroup component migrated with controlled/uncontrolled support | Context provider pattern replaces Vue `Group.vue` provide/inject; passes `selected` and `select()` to Radio children |
| FORM-06 | Switch component migrated with controlled/uncontrolled support | `useControllable<boolean>`; same visual toggle thumb implementation |
| FORM-07 | Toggle component migrated with controlled/uncontrolled support | `useControllable<boolean>` + context consumer for ToggleGroup; `type` prop controls style variant |
| FORM-08 | ToggleGroup component migrated with controlled/uncontrolled support | Same context provider pattern as RadioGroup; passes selected value and disabled to Toggle children |
| FORM-09 | Slider component migrated with controlled/uncontrolled support | Custom drag logic with `window` mousemove/mouseup + touch events; `useRef` for cursor and fillBar DOM nodes; `forwardRef` on container |
| FORM-10 | PINInput component migrated with controlled/uncontrolled support | Array of individual `<input>` refs via `useRef<HTMLInputElement[]>`; `useImperativeHandle` exposes `focus()` and `clear()`; clipboard paste via `navigator.clipboard` |
| FORM-11 | TagInput component migrated with controlled/uncontrolled support | `value` prop is `any[]` (controlled array); internal textarea ref; uses Tooltip + StatusBadge from Phase 2; shake animation via CSS keyframes |
| FORM-12 | FileUpload component migrated with controlled/uncontrolled support | Drag-and-drop via `onDragEnter`/`onDragLeave`/`onDrop` + hidden `<input type="file">`; `multiple` prop handles array vs single File |
</phase_requirements>

---

## Summary

Phase 3 migrates 13 components (12 form inputs + Label utility) from Vue SFCs to React TSX. The work divides into three dependency tiers: (1) Label first as it is used by Input, Textarea, TagInput, and FileUpload; (2) primitive controls with no cross-component dependencies (Input, Textarea, Checkbox, Switch, Toggle, Slider, PINInput); (3) composite controls that coordinate multiple children via React context (RadioGroup, ToggleGroup) and advanced inputs that depend on Phase 2 components (TagInput uses Tooltip and StatusBadge, FileUpload stands alone).

Every component follows the established `useControllable` + CSS Modules + `clsx` + `className` pass-through pattern from Phases 1 and 2. The `useControllable` hook already handles the controlled/uncontrolled dual-mode requirement. Ref forwarding for Input, Textarea, and Slider uses `React.forwardRef` pointing to the native element; PINInput uses `useImperativeHandle` to expose `{ focus(), clear() }` instead of a raw DOM ref.

The most complex components are Slider (custom drag with mouse and touch events, fill-bar positioning math, `setTimeout` for DOM measurement) and RadioGroup/ToggleGroup (Vue `provide/inject` maps to React `createContext`/`useContext`). TagInput has the most behavioural complexity: duplicate checks, max-count enforcement, comma/newline paste splitting, 2-second error dismissal timeout, and mask validation.

**Primary recommendation:** Migrate in dependency order — Label first, then simple primitives in parallel waves, then context-dependent composites last.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.x | Component runtime | Already in project (Phase 1) |
| TypeScript | 5.x | Type safety | Already in project (Phase 1) |
| `clsx` | installed | Conditional class composition | Already used in Badge, Button, Tooltip, etc. |
| CSS Modules (`*.module.css`) | — | Scoped styles | Established Phase 1/2 pattern — two files per component |
| `useControllable` | local hook | Controlled/uncontrolled dual mode | Already implemented in Phase 1 (`src/hooks/useControllable.ts`) |

### Supporting
| Library | Purpose | When to Use |
|---------|---------|-------------|
| `React.forwardRef` | Expose native input refs to consumers | Input, Textarea, Slider |
| `React.useImperativeHandle` | Expose imperative API object | PINInput only — exposes `focus()` and `clear()` |
| `React.createContext` / `useContext` | Group state sharing | RadioGroup → Radio, ToggleGroup → Toggle |
| `navigator.clipboard.readText()` | Clipboard paste in PINInput | PINInput paste handler |
| `src/utils/index.ts` | `isValidEmail`, `isValidDomain`, `isValidUrl`, `applyMask`, `isNilAndBlank` | Input masking/validation, TagInput validation |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom drag for Slider | react-draggable or @use-gesture/react | Locked: port Vue logic exactly — no new deps |
| Custom PINInput | react-otp-input | Locked: prop parity with Vue version required |
| Custom TagInput | react-tag-input | Locked: exact duplicate/max/mask behavior required |

**Installation:** No new packages required. All dependencies already in project.

---

## Architecture Patterns

### Recommended Migration Order

```
Wave A (no deps): Label
Wave B (simple primitives): Input, Textarea, Checkbox, Switch, Toggle, Slider, PINInput
Wave C (context composites): RadioGroup + Radio (together), ToggleGroup + Toggle (update)
Wave D (advanced inputs): TagInput, FileUpload
```

Toggle is migrated in Wave B as a standalone (it works without ToggleGroup). Wave C updates Toggle to also consume group context. Radio has a partial group-consumer dependency (it must read context if present), so Radio and RadioGroup should be done together.

### Recommended Component Structure

```
src/components/ComponentName/
├── ComponentName.tsx          # Component implementation
├── ComponentName.module.css   # Scoped CSS (Tailwind @apply)
├── colors.module.css          # Dynamic/theme color overrides (if needed)
├── ComponentName.stories.tsx  # Storybook story
├── ComponentName.test.tsx     # Unit tests
└── index.ts                   # Re-export
```

Note: not all components need `colors.module.css` — only use it when dynamic CSS custom properties are needed (e.g., Slider custom color via `v-bind` equivalent).

### Pattern 1: Controlled/Uncontrolled with useControllable

**What:** Every form component accepts both `value`+`onChange` (controlled) and `defaultValue` (uncontrolled).
**When to use:** All 12 form components.

```typescript
// Source: src/hooks/useControllable.ts (Phase 1)
const [currentValue, setValue] = useControllable<boolean>({
  value: props.value,          // from consumer — controlled
  defaultValue: props.defaultValue ?? false,  // seed for uncontrolled
  onChange: props.onChange,    // fires in both modes
});
```

The hook returns `[currentValue, setValue]`. Call `setValue(newVal)` on all change events — the hook handles whether to update internal state or just call `onChange`.

### Pattern 2: forwardRef for Native Input Elements

**What:** Wrap with `React.forwardRef` and pass the `ref` to the native element.
**When to use:** Input, Textarea, Slider.

```typescript
// Source: React 19 docs + Phase 1 FOUND-05
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return (
      <div className={styles.input}>
        <input ref={ref} className={styles.inputContent} {...inputProps} />
      </div>
    );
  }
);
```

React 19 ref-as-prop is a v2 enhancement (ENH-02, deferred). Use `forwardRef` in v1.

### Pattern 3: useImperativeHandle for PINInput

**What:** Expose a custom API object instead of a raw DOM ref.
**When to use:** PINInput only — multiple internal inputs, external callers need `focus()` and `clear()`.

```typescript
// Source: React docs — useImperativeHandle
export const PINInput = React.forwardRef<PINInputHandle, PINInputProps>(
  function PINInput({ length = 6, ...props }, ref) {
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        const firstEmpty = values.findIndex(v => !v);
        inputRefs.current[firstEmpty !== -1 ? firstEmpty : 0]?.focus();
      },
      clear: () => {
        setValues(Array(length).fill(''));
        inputRefs.current[0]?.focus();
      },
    }));
    // ...
  }
);
```

### Pattern 4: React Context for Group Components

**What:** Replace Vue's `provide`/`inject` with React `createContext` + `useContext`.
**When to use:** RadioGroup → Radio, ToggleGroup → Toggle.

```typescript
// Pattern: context file colocated or inline in RadioGroup.tsx
interface GroupContextValue {
  selected: any;
  disabled: boolean;
  select: (value: any) => void;
}

const RadioGroupContext = createContext<GroupContextValue | null>(null);

// In RadioGroup:
<RadioGroupContext.Provider value={{ selected, disabled, select: setValue }}>
  <div className={clsx(styles.group, vertical ? 'vert' : 'hor')}>
    {children}
  </div>
</RadioGroupContext.Provider>

// In Radio:
const groupCtx = useContext(RadioGroupContext);
const isSelected = groupCtx
  ? groupCtx.selected === groupValue
  : currentValue;
```

The context is nullable — Radio and Toggle work standalone when no context is present (same as Vue `inject` with `null` default).

### Pattern 5: Compound Sub-Components

**What:** Named slots become static properties on the parent component.
**When to use:** Input.PrependIcon, Input.AppendIcon, TagInput.PrependIcon, TagInput.AppendIcon, TagInput.Hint, FileUpload.Preview.

```typescript
// Source: Phase 2 established pattern (e.g., Tooltip.Label)
function PrependIcon({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Input(props: InputProps) { /* ... */ }
Input.PrependIcon = PrependIcon;
Input.AppendIcon = AppendIcon;
```

Consumer JSX uses `<Input.PrependIcon>` or the simpler `icon` string prop — both supported simultaneously.

### Pattern 6: Dynamic Color via CSS Custom Property

**What:** Vue's `v-bind(color)` in `<style scoped>` maps to inline `style` prop in React.
**When to use:** Slider when `color` or `background` prop is passed.

```typescript
// Vue: border-color: v-bind(color)  → React:
<span
  className={clsx(styles.cursor, color && styles.colored)}
  style={color ? { borderColor: color } : undefined}
/>
```

For Slider's `blendColors(color)` background, compute once and pass as inline style. This mirrors how Button and Badge already handle custom colors.

### Anti-Patterns to Avoid

- **Spreading all props onto native elements:** `<input {...props} />` — pass only validated HTML attributes. Keep React props (`value`, `onChange`, `defaultValue`) separate from DOM props.
- **Uncontrolled textarea with `defaultValue` + then switching to controlled:** Causes React warning. `useControllable` prevents this but always initialize with one mode.
- **Mutating values array in place (TagInput, PINInput):** Always create new arrays — `[...prev]` or `prev.filter(...)` — never `.splice()` on state directly (works in Vue reactivity but not React).
- **`ref` arrays via index in PINInput:** Use `useRef<HTMLInputElement[]>([])` and assign via callback ref `el => { inputRefs.current[i] = el }` to avoid stale closures.
- **`window.addEventListener` without cleanup in Slider:** Always return cleanup in `useEffect`. Slider adds mousemove/mouseup/touchmove on mount and removes on unmount.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Controlled/uncontrolled dual mode | Custom isControlled flag logic | `useControllable` hook | Already handles switching warnings, both modes cleanly |
| Mask formatting (CPF, CNPJ, CEP, domain, URL) | Custom regex/format functions | `applyMask()` from `src/utils/index.ts` | Framework-agnostic, already tested in Vue version |
| Email/domain/URL validation | Custom validators | `isValidEmail()`, `isValidDomain()`, `isValidUrl()` from utils | Identical to Vue behavior required |
| Conditional class composition | Template literals with ternaries | `clsx` | Already in use across all Phase 2 components |
| Nil/blank check in TagInput | `!value || value.trim() === ''` | `isNilAndBlank()` from utils | Available in `src/utils/index.ts` |
| Color blending for Slider/Badge | Custom color math | `blendColors()` from utils | Already used by Badge and Button |

**Key insight:** All validator/formatter utilities in `src/utils/index.ts` are framework-agnostic TypeScript — import directly with zero adaptation.

---

## Common Pitfalls

### Pitfall 1: Vue Array Mutation vs React Immutable Updates

**What goes wrong:** TagInput and PINInput in Vue use `.splice()` and direct index assignment on reactive arrays. Copying this pattern into React state produces no re-render.
**Why it happens:** Vue's reactivity system intercepts mutations; React `useState` uses reference equality.
**How to avoid:** Always produce new arrays: `setValues(prev => { const next = [...prev]; next[i] = val; return next; })`.
**Warning signs:** Component doesn't re-render after tag removal or PINInput digit entry.

### Pitfall 2: Slider setTimeout for DOM Measurement

**What goes wrong:** Slider.vue uses `setTimeout(() => calculateCursor(), 200)` and `setTimeout(() => calculateCursor(), 100)` after mount and after size/vertical prop changes to wait for DOM to settle.
**Why it happens:** The fill bar and cursor position math requires rendered dimensions (`clientWidth`, `clientHeight`, `offsetLeft`).
**How to avoid:** Port the setTimeout calls into `useEffect` with the same delays. Alternatively use `useLayoutEffect` + `ResizeObserver` for cleaner behavior, but only if it doesn't change visible behavior.
**Warning signs:** Slider cursor renders at position 0 or wrong position on initial render.

### Pitfall 3: PINInput clipboard API in HTTPS-only environments

**What goes wrong:** `navigator.clipboard.readText()` requires secure context (HTTPS or localhost). In non-secure test environments, the Promise rejects.
**Why it happens:** Browser security policy.
**How to avoid:** Add try/catch around the clipboard call. In tests, mock `navigator.clipboard`.
**Warning signs:** Paste silently fails in some browsers or test runners.

### Pitfall 4: RadioGroup/ToggleGroup Context vs Standalone Mode

**What goes wrong:** Radio/Toggle renders inside a context with `null` fallback but tries to call `groupCtx.select()` without null check.
**Why it happens:** Forgetting the nullable context — when `useContext(RadioGroupContext)` returns `null`, standalone mode is active.
**How to avoid:** Always guard: `if (groupCtx && groupValue !== undefined) groupCtx.select(groupValue)`.
**Warning signs:** "Cannot read properties of null" errors when Radio used outside RadioGroup.

### Pitfall 5: TagInput shake animation re-trigger

**What goes wrong:** CSS `animation: shake 0.5s` only plays once per class toggle. If the error state is already active and a new error fires, the animation doesn't replay.
**Why it happens:** CSS animations run once when the class is added; if the class stays on, no re-trigger.
**How to avoid:** Remove and re-add the error class. One approach: use a counter state (`errorKey`) and put the animation on a keyed element (`key={errorKey}`). Simpler: the Vue version uses a 2-second auto-dismiss timeout which naturally removes and can re-add the class.
**Warning signs:** Shake animation plays once but never again for subsequent errors on the same field.

### Pitfall 6: Input type="color" TODO placement

**What goes wrong:** Forgetting to add the TODO comment when skipping `type="color"` support.
**Why it happens:** Easy to silently drop the feature without a trace.
**How to avoid:** Add explicit comment: `// TODO: type="color" deferred to Phase 6 — requires ColorPicker + FloatCard integration`.
**Warning signs:** No TODO in Input.tsx for the color case.

### Pitfall 7: Slider `computedStyleMap` not available in jsdom

**What goes wrong:** Vue Slider uses `cursor.computedStyleMap().get('--border-width-xs')` to read a CSS custom property at runtime. `computedStyleMap()` is not available in jsdom (test environment).
**Why it happens:** `computedStyleMap()` is a newer CSS Typed OM API not polyfilled in jsdom.
**How to avoid:** Replace with `getComputedStyle(cursor).getPropertyValue('--border-width-xs')` which is more widely supported, or hardcode the border-width value from the design token.
**Warning signs:** Tests throw "cursor.computedStyleMap is not a function".

---

## Code Examples

### useControllable — Form Component Integration

```typescript
// Source: src/hooks/useControllable.ts (Phase 1 implementation)
// Controlled mode: <Checkbox value={checked} onChange={setChecked} />
// Uncontrolled mode: <Checkbox defaultValue={false} />

const [currentValue, setValue] = useControllable<boolean>({
  value: value,           // CheckboxProps.value (controlled)
  defaultValue: defaultValue ?? false,
  onChange,
});
```

### forwardRef + TypeScript — Input Pattern

```typescript
// Source: React forwardRef docs + CONTEXT.md locked decision
export interface InputHandle extends HTMLInputElement {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ value, defaultValue, onChange, disabled, ...rest }, ref) {
    const [currentValue, setValue] = useControllable({ value, defaultValue, onChange });

    return (
      <div className={styles.input}>
        <input
          ref={ref}
          value={currentValue ?? ''}
          onChange={e => setValue(e.target.value)}
          disabled={disabled}
          className={styles.inputContent}
        />
      </div>
    );
  }
);
```

### React Context for Group — RadioGroup Pattern

```typescript
// Source: React createContext docs + Vue Group.vue provide/inject pattern
import { createContext, useContext } from 'react';

interface RadioGroupContextValue {
  selected: any;
  disabled: boolean;
  select: (value: any) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// RadioGroup.tsx — provides context
export function RadioGroup({ options, value, defaultValue, onChange, disabled, vertical }: RadioGroupProps) {
  const [selected, setSelected] = useControllable({ value, defaultValue, onChange });
  return (
    <RadioGroupContext.Provider value={{ selected, disabled: disabled ?? false, select: setSelected }}>
      <div className={clsx(styles.radioGroup, vertical ? 'vert' : 'hor')}>
        {options.map(opt => (
          <Radio key={getValue(opt)} groupValue={getValue(opt)} disabled={getDisabled(opt)}>
            {getLabel(opt)}
          </Radio>
        ))}
      </div>
    </RadioGroupContext.Provider>
  );
}
```

### TagInput — Immutable Array Updates

```typescript
// Source: Vue TagInput.vue logic, ported to React
const [tags, setTags] = useControllable<any[]>({ value, defaultValue: defaultValue ?? [], onChange });

function removeTag(index: number) {
  if (newTag.length) return; // guard: only backspace-remove when input is empty
  setTags(prev => (prev ?? []).filter((_, i) => i !== index));
}

function addTag(tag: string) {
  // ...validation...
  setTags(prev => [...(prev ?? []), tag]);
}
```

### PINInput — Array Ref Collection

```typescript
// Source: Vue PINInput.vue setInputRef pattern
const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

// In JSX — callback ref instead of ref array attribute:
<input
  key={index}
  ref={el => { inputRefs.current[index] = el; }}
  // ...
/>
```

### Slider — Window Event Cleanup

```typescript
// Source: Vue Slider.vue onMounted/onBeforeUnmount pattern
useEffect(() => {
  window.addEventListener('mousemove', updateCursor);
  window.addEventListener('mouseup', stopDragging);
  window.addEventListener('touchmove', updateCursorTouch);
  window.addEventListener('touchend', stopDragging); // note: Vue had typo "touhend"

  return () => {
    window.removeEventListener('mousemove', updateCursor);
    window.removeEventListener('mouseup', stopDragging);
    window.removeEventListener('touchmove', updateCursorTouch);
    window.removeEventListener('touchend', stopDragging);
  };
}, []); // empty dep array — handlers use refs, not stale closures
```

### FileUpload — Drag-and-Drop Events

```typescript
// Source: Vue FileUpload.vue drag handler pattern
<div
  className={clsx(styles.file, styles[size], { [styles.dragging]: isDragging, [styles.disabled]: disabled })}
  onDragEnter={e => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
  onDragLeave={() => setIsDragging(false)}
  onDragOver={e => e.preventDefault()}
  onDrop={e => { e.preventDefault(); if (!disabled) onChangeFile(e.dataTransfer.files); }}
>
```

Note: Vue uses `.prevent` modifier; React requires explicit `e.preventDefault()` in the handler.

---

## State of the Art

| Old Approach | Current Approach | Context |
|--------------|------------------|---------|
| Vue `useOptionalModel` composable | React `useControllable` hook | Already migrated Phase 1 — use existing hook |
| Vue `provide`/`inject` for group state | React `createContext`/`useContext` | Standard React pattern |
| Vue `defineExpose` for PINInput | `useImperativeHandle` | Direct equivalent |
| Vue `v-bind(color)` in style | Inline `style` prop | Standard React pattern |
| Vue template refs array (`ref="cursors"`) | `useRef` array + callback ref | Callback ref pattern is more reliable |
| Vue `$slots.default` existence check | `children` prop check | `React.Children.count(children) > 0` or truthy check |
| Vue `nextTick(() => focus())` | `setTimeout(() => focus(), 0)` or `queueMicrotask` | `setTimeout(fn, 0)` is the React equivalent for deferred DOM access |

---

## Component-by-Component Reference

### Label (INTL-01) — dependency of Input, Textarea, TagInput, FileUpload

**Vue source:** `src/utils/components/Label.vue`
**Props:** `labelValue`, `infoMessage`, `tooltipMinWidth`, `required`
**Output:** `<h5>` with optional Tooltip (uses Phase 2 Tooltip) and required `*` span
**React location:** `src/utils/components/Label.tsx` (utility, not in component index)
**Key detail:** The Tooltip sub-component is already available as `Tooltip.Label` in Phase 2 Tooltip.

### Input (FORM-01)

**Vue source:** `src/components/Input/Input.vue`
**Props:** `modelValue`→`value`, `labelValue`, `type`, `mask`, `max`, `min`, `step`, `errorMessage`, `infoMessage`, `disabled`, `isError`, `required`, `placeholder`, `textAlign`, `tooltipMinWidth`, `icon`, `appendIcon`
**Events:** `update:modelValue`→`onChange`, `focus`, `blur`
**forwardRef:** Yes — ref to `<input>` element
**Key behaviors:**
- `type="color"`: add TODO comment, render nothing for the color display
- `type="number"`: custom increment/decrement buttons with Icon; suppress native spinners via CSS
- `type="password"`: toggle visibility with `visibility`/`visibility_off` icon
- `type="search"`: auto-prepend `search` icon
- `type="file"`: managed file name display — no `useControllable` needed (value is File object)
- Mask + validation on input event
- Character counter when `max` + `type="text"`
- Compound sub-components: `Input.PrependIcon`, `Input.AppendIcon`

### Textarea (FORM-02)

**Vue source:** `src/components/Textarea/Textarea.vue`
**Props:** `modelValue`→`value`, `labelValue`, `max`, `errorMessage`, `infoMessage`, `disabled`, `isError`, `required`, `placeholder`, `textAlign`, `tooltipMinWidth`
**forwardRef:** Yes — ref to `<textarea>` element
**Simpler than Input:** No type/mask complexity; just max-length counter and error state.

### Checkbox (FORM-03)

**Vue source:** `src/components/Checkbox/Checkbox.vue`
**Props:** `id`, `name`, `modelValue`→`value`, `rhs`, `allowIndeterminate`, `disabled`
**State type:** `boolean | null` — null = indeterminate
**Three-state cycle:** true → null → false → true (when `allowIndeterminate`)
**Visual:** Two SVGs (check mark and dash) shown conditionally on state
**Children:** Label via `children` prop; if `id` or `name` present, wraps in `<label htmlFor={id||name}>`

### Radio (FORM-04)

**Vue source:** `src/components/Radio/Radio.vue`
**Props:** `id`, `name`, `modelValue`→`value`, `groupValue`, `disabled`, `variant`
**Context consumer:** Reads `RadioGroupContext`; falls back to standalone `useControllable<boolean>` if no context
**Variants:** `default` (compact, 12px) and `onboarding` (larger 20px circle, 14px label)
**Key detail:** Radio only moves to selected (true); once selected it cannot be deselected standalone — mirrors Vue behavior

### RadioGroup (FORM-05)

**Vue source:** `src/components/RadioGroup/RadioGroup.vue`
**Props:** `modelValue`→`value`, `vertical`, `disabled`, `options[]`, `labelKey`, `valueKey`, `getObject`
**Replaces:** Vue `Group.vue` provide/inject pattern
**Context:** Provides `RadioGroupContext` with `{ selected, disabled, select }`

### Switch (FORM-06)

**Vue source:** `src/components/Switch/Switch.vue`
**Props:** `id`, `name`, `modelValue`→`value`, `rhs`, `disabled`
**Simplest toggle:** Single boolean, thumb slides via `ml-[.125em]` / `ml-[1em]` controlled by state
**Children:** Label via `children` prop — same as Checkbox

### Toggle (FORM-07)

**Vue source:** `src/components/Toggle/Toggle.vue`
**Props:** `modelValue`→`value`, `id`, `name`, `groupValue`, `disabled`, `type` (`default`|`secondary`)
**Context consumer:** Reads `ToggleGroupContext` (separate from RadioGroupContext)
**Key detail:** Toggle is always-on (once active, stays active unless group changes it) — mirrors Vue's `model.value = true`

### ToggleGroup (FORM-08)

**Vue source:** `src/components/ToggleGroup/ToggleGroup.vue`
**Props:** `modelValue`→`value`, `vertical`, `disabled`, `options[]`, `type`, `labelKey`, `valueKey`, `getObject`
**Mirror of RadioGroup:** Same pattern but for Toggle children; requires separate `ToggleGroupContext`

### Slider (FORM-09)

**Vue source:** `src/components/Slider/Slider.vue`
**Props:** `modelValue`→`value`, `size`, `max`, `unit`, `color`, `showTooltip`, `disabled`, `vertical`, `fillColors[]`, `isRange`, `steps[]`, `neutralBackground`
**forwardRef:** Yes — ref to container `<div>` (as per locked decision)
**Key implementation notes:**
- `isDraggingSlider` is an array of booleans — one per cursor (single or range)
- Fill bar positioning uses `offsetLeft`, `clientWidth`, `clientHeight` — requires DOM access after render
- `calculateCursor` called with `setTimeout(fn, 200)` after mount — must port into `useEffect` callback
- CSS custom property `v-bind(color)` and `v-bind(background)` → inline `style` prop
- `computedStyleMap()` call must be replaced with `getComputedStyle(el).getPropertyValue('--border-width-xs')` for test/browser compat
- Touch support: `onTouchStart`, `onTouchMove` events on window

### PINInput (FORM-10)

**Vue source:** `src/components/PINInput/PINInput.vue`
**Props:** `modelValue`→`value`, `length`, `disabled`, `placeholder`, `separator`, `type`, `mask`, `otp`
**forwardRef:** Yes — `useImperativeHandle` exposes `{ focus(), clear() }`
**Key behaviors:**
- Individual `values[]` array managed in state
- Auto-advance: after input, focus next field
- Backspace: if empty, focus and select previous field
- Clipboard paste: `navigator.clipboard.readText()`, distribute chars across fields
- Arrow navigation: ArrowLeft/ArrowRight between fields
- `complete` event fires when all fields filled

### TagInput (FORM-11)

**Vue source:** `src/components/TagInput/TagInput.vue`
**Props:** `modelValue`→`value`, `labelValue`, `errorMessage`, `infoMessage`, `disabled`, `required`, `allowDuplicate`, `max`, `isError`, `placeholder`, `mask`, `icon`, `appendIcon`
**Uses:** Tooltip (Phase 2) wrapping each tag; StatusBadge (Phase 2) as tag display
**Compound sub-components:** `TagInput.PrependIcon`, `TagInput.AppendIcon`, `TagInput.Hint`
**Key behaviors:**
- `<textarea rows="1">` as inner input (flex-1, no border/outline)
- Comma/newline paste splits into multiple tags
- 2-second auto-dismiss for errors (`setTimeout(() => setHasError(false), 2000)`)
- Backspace on empty textarea removes last tag
- Enter and Tab key trigger tag addition

### FileUpload (FORM-12)

**Vue source:** `src/components/FileUpload/FileUpload.vue`
**Props:** `modelValue`→`value`, `labelValue`, `errorMessage`, `infoMessage`, `size`, `disabled`, `isError`, `required`, `placeholder`, `tooltipMinWidth`, `accept`, `multiple`
**Compound sub-components:** `FileUpload.Preview` (replaces `uploaded-file` slot)
**Key behaviors:**
- Hidden `<input type="file">` overlaid absolutely (absolute, full-size, opacity-0, z-1)
- Drag-and-drop: `onDragEnter`/`onDragLeave`/`onDragOver`/`onDrop`
- `multiple`: emits `File[]` array; single: emits single `File`
- SVG icon size computed by `size` prop (56–96px)
- When file present: show draft icon + filename + delete button

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 3.x (unit project) + React Testing Library |
| Config file | `vite.config.ts` — `test.projects[1]` (unit project) |
| Quick run command | `npx vitest run --project unit src/components/Input/Input.test.tsx` |
| Full suite command | `npx vitest run --project unit` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FORM-01 | Input renders, accepts value, fires onChange, forwards ref | unit | `npx vitest run --project unit src/components/Input/Input.test.tsx` | Wave 0 |
| FORM-02 | Textarea renders, accepts value, fires onChange, forwards ref | unit | `npx vitest run --project unit src/components/Textarea/Textarea.test.tsx` | Wave 0 |
| FORM-03 | Checkbox toggles state, three-state cycle with allowIndeterminate | unit | `npx vitest run --project unit src/components/Checkbox/Checkbox.test.tsx` | Wave 0 |
| FORM-04 | Radio selects on click, reads group context if present | unit | `npx vitest run --project unit src/components/Radio/Radio.test.tsx` | Wave 0 |
| FORM-05 | RadioGroup renders options, selection propagates to Radio children | unit | `npx vitest run --project unit src/components/RadioGroup/RadioGroup.test.tsx` | Wave 0 |
| FORM-06 | Switch toggles boolean on click | unit | `npx vitest run --project unit src/components/Switch/Switch.test.tsx` | Wave 0 |
| FORM-07 | Toggle activates on click, reads ToggleGroup context | unit | `npx vitest run --project unit src/components/Toggle/Toggle.test.tsx` | Wave 0 |
| FORM-08 | ToggleGroup renders options, selection propagates | unit | `npx vitest run --project unit src/components/ToggleGroup/ToggleGroup.test.tsx` | Wave 0 |
| FORM-09 | Slider renders, forwardRef works, drag callbacks fire | unit | `npx vitest run --project unit src/components/Slider/Slider.test.tsx` | Wave 0 |
| FORM-10 | PINInput fills fields, clipboard paste, imperative focus/clear | unit | `npx vitest run --project unit src/components/PINInput/PINInput.test.tsx` | Wave 0 |
| FORM-11 | TagInput adds/removes tags, duplicate check, max check, error dismiss | unit | `npx vitest run --project unit src/components/TagInput/TagInput.test.tsx` | Wave 0 |
| FORM-12 | FileUpload drag-and-drop triggers onChange, delete clears value | unit | `npx vitest run --project unit src/components/FileUpload/FileUpload.test.tsx` | Wave 0 |

### Sampling Rate

- **Per task commit:** `npx vitest run --project unit src/components/{ComponentName}/{ComponentName}.test.tsx`
- **Per wave merge:** `npx vitest run --project unit`
- **Phase gate:** Full unit suite green before `/gsd:verify-work`

### Wave 0 Gaps

All 12 component test files need to be created (none exist yet):

- [ ] `src/components/Input/Input.test.tsx` — covers FORM-01
- [ ] `src/components/Textarea/Textarea.test.tsx` — covers FORM-02
- [ ] `src/components/Checkbox/Checkbox.test.tsx` — covers FORM-03
- [ ] `src/components/Radio/Radio.test.tsx` — covers FORM-04
- [ ] `src/components/RadioGroup/RadioGroup.test.tsx` — covers FORM-05
- [ ] `src/components/Switch/Switch.test.tsx` — covers FORM-06
- [ ] `src/components/Toggle/Toggle.test.tsx` — covers FORM-07
- [ ] `src/components/ToggleGroup/ToggleGroup.test.tsx` — covers FORM-08
- [ ] `src/components/Slider/Slider.test.tsx` — covers FORM-09
- [ ] `src/components/PINInput/PINInput.test.tsx` — covers FORM-10
- [ ] `src/components/TagInput/TagInput.test.tsx` — covers FORM-11
- [ ] `src/components/FileUpload/FileUpload.test.tsx` — covers FORM-12

Test infrastructure (framework, setup file, jsdom environment) is fully configured from Phase 2. No new Wave 0 setup required — only the test files themselves.

---

## Sources

### Primary (HIGH confidence)
- Direct Vue source code inspection — `src/components/{Component}/{Component}.vue` — all 12 form components read in full
- `src/hooks/useControllable.ts` — Phase 1 hook implementation verified
- `src/utils/components/Label.vue` — Label utility inspected
- `src/utils/components/Group.vue` — Vue provide/inject pattern verified
- `src/components/Badge/Badge.tsx`, `Button/Button.tsx`, `Tooltip/Tooltip.tsx` — Phase 2 React patterns confirmed
- `vite.config.ts` — vitest configuration with jsdom unit project confirmed
- `vitest.setup.ts` — test setup with `@testing-library/jest-dom` confirmed
- `.planning/phases/03-form-components/03-CONTEXT.md` — all locked decisions
- `.planning/phases/03-form-components/03-UI-SPEC.md` — design tokens and visual specs

### Secondary (MEDIUM confidence)
- React 19 forwardRef + useImperativeHandle patterns — well-documented React APIs, stable

### Tertiary (LOW confidence)
- `computedStyleMap()` browser support — replaced with `getComputedStyle()` recommendation; jsdom support not verified empirically in this project but known gap from browser compat tables

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already in project, verified in source
- Architecture patterns: HIGH — directly derived from Vue source + established Phase 2 React patterns
- Pitfalls: HIGH for most; MEDIUM for Slider `computedStyleMap` (based on known jsdom limitations)

**Research date:** 2026-03-16
**Valid until:** 2026-04-16 (stable APIs — React 19, Vitest 3)
