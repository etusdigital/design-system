# Features Research

**Project:** AnaCarolina Design System — Vue 3 to React Migration
**Researched:** 2026-03-13
**Research scope:** React equivalents for Vue-specific patterns used in this design system

---

## Table Stakes (must have — consumers expect these)

### 1. Controlled/Uncontrolled Component Pattern
- **Replaces:** `useOptionalModel` composable (Vue v-model)
- **React pattern:** `useControllable` hook — if `value` prop is `undefined`, use internal state; otherwise defer to parent
- **Complexity:** MEDIUM — single hook, but applies to ~25 components
- **Dependencies:** Must be built first — foundation for all stateful components
- **How it works:**
  ```tsx
  function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
    const [internal, setInternal] = useState(defaultValue)
    const isControlled = value !== undefined
    const current = isControlled ? value : internal
    const update = (next: T) => { if (!isControlled) setInternal(next); onChange?.(next) }
    return [current, update] as const
  }
  ```

### 2. Children & Render Props (slot equivalents)
- **Replaces:** Vue default slots, named slots, scoped slots
- **React patterns:**
  - Default slot → `children: ReactNode`
  - Named slot → named prop: `header?: ReactNode`
  - Scoped slot → render prop: `renderItem?: (item: T) => ReactNode`
  - Slot presence check → `header !== undefined`
- **Complexity:** LOW per component, HIGH across 60+ components (mechanical but tedious)
- **Dependencies:** None — standard React pattern

### 3. Portal Pattern (modal/overlay rendering)
- **Replaces:** `<Teleport to="body">`
- **React pattern:** `createPortal(content, document.body)` from `react-dom`
- **Complexity:** LOW — direct 1:1 equivalence
- **Dependencies:** None
- **Note:** React preserves context through portals, so provider pattern works through portals

### 4. Context Providers (global services)
- **Replaces:** Vue global properties (`$confirm`, `$toast`), event emitter
- **React pattern:** Context + useReducer for Toast/Confirm services
- **Complexity:** MEDIUM — need DesignSystemProvider, ConfirmProvider, ToastProvider
- **Dependencies:** Portal pattern (toasts/confirms render via portal)
- **Critical note:** Vue's event emitter (`event.emit('open-toast')`) cannot work in React — React only re-renders via state/context changes. Must replace with Context + state.

### 5. Ref Forwarding
- **Replaces:** Vue template refs (automatic in Vue)
- **React pattern:** `forwardRef` on all leaf/form components
- **Complexity:** LOW per component — boilerplate wrapper
- **Dependencies:** None
- **Note:** React 19 makes ref a regular prop (no forwardRef needed), but use forwardRef for React 18 compat since peerDeps allow >=18

### 6. Unique ID Generation
- **Replaces:** Vue's internal ID generation for label/input associations
- **React pattern:** `useId()` hook (React 18+)
- **Complexity:** LOW — drop-in for any `for`/`id` attribute pairs
- **Dependencies:** None

### 7. TypeScript Prop Interfaces
- **Replaces:** Vue `defineProps<T>()` and `defineEmits`
- **React pattern:** `interface ButtonProps { ... }` + `React.FC<ButtonProps>` or typed function
- **Complexity:** LOW — mechanical translation
- **Dependencies:** None

### 8. MDI Icon Integration
- **Replaces:** `mdi-vue` component
- **React pattern:** `@mdi/react` — `<Icon path={mdiAccount} size={1} />`
- **Complexity:** LOW — near-identical API to mdi-vue
- **Dependencies:** Must be resolved before any component that uses icons

---

## Differentiators (competitive advantage)

### 9. Compound Component Pattern
- **What:** Components like Select, Table, Tree that have sub-components
- **React pattern:** `Select.Option`, `Table.Column` using context
- **Complexity:** HIGH — requires careful context design per compound component
- **Note:** Vue uses named slots for this; React compound components are more explicit

### 10. CSS Animation/Transition System
- **Replaces:** Vue `<Transition>` and `<TransitionGroup>`
- **React options:**
  - CSS-class-toggle approach (lightest, closest to Vue behavior)
  - `react-transition-group` (community standard, similar API to Vue)
  - Avoid `framer-motion` — too heavy for a design system library
- **Complexity:** MEDIUM — affects Dialog, Toast, Drawer, Accordion, Dropdown
- **Dependencies:** Should be resolved early as a utility

### 11. Tree-Shakeable Exports
- **What:** Consumers can import individual components without bundling entire library
- **React pattern:** Named exports from barrel `index.ts`, `sideEffects: false` in package.json
- **Complexity:** LOW — structural, not logic
- **Dependencies:** Build configuration

---

## Anti-Features (deliberately NOT building)

| Feature | Why Not |
|---------|---------|
| CSS-in-JS (styled-components, emotion) | Conflicts with Tailwind, adds runtime overhead, not in Vue version |
| State management library (Redux, Zustand) | Component library should be state-agnostic |
| Form library integration (react-hook-form) | Consumers choose their own form library |
| Server Components support | Not in Vue version, adds complexity |
| React Native support | Web only, as specified in PROJECT.md |
| Custom hook for every component | Only create hooks that replace Vue composables or serve multiple components |

---

## Feature Dependencies

```
useControllable ←── All form/input components
     ↑
MDI Icon setup ←── All components with icons
     ↑
Portal/Overlay ←── Dialog, Toast, Confirm, Dropdown, Select
     ↑
Context Providers ←── Toast, Confirm, DesignSystemProvider
     ↑
Transition utility ←── Dialog, Toast, Drawer, Accordion
```

---

## Implementation Phase Suggestions

| Phase | Components | What It Validates |
|-------|-----------|-------------------|
| 1. Foundation | useControllable, forwardRef template, useId, Overlay, Label, Icon setup | Core patterns work |
| 2. Atomic components | Button, Badge, Chip, Toggle, Checkbox, Radio, Avatar, Tag (~16) | Foundation at scale |
| 3. Form components | Input, Textarea, Select (basic), DatePicker (basic), ColorPicker (~10) | useControllable at scale |
| 4. Global services | DesignSystemProvider, Toast, Confirm, Dialog | Context + portal pattern |
| 5. Complex components | Table, Tree, Select (advanced), Sidebar, Carousel, RichTextEditor (~20+) | Full system integration |

---

## Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| Controlled/Uncontrolled | HIGH | Official React docs + direct useOptionalModel analysis |
| Portal equivalence | HIGH | Official React docs, 1:1 mapping |
| Context for services | HIGH | Standard React pattern, well-documented |
| Slot → children/render props | HIGH | Standard React pattern |
| forwardRef | HIGH | Official docs (including React 19 deprecation note) |
| Animation/Transition | MEDIUM | No built-in React equivalent; CSS approach is community standard |
| @mdi/react | MEDIUM | Known package, API similar to mdi-vue |

---

*Features research: 2026-03-13*
