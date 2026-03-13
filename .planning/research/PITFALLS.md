# Pitfalls Research

**Project:** AnaCarolina Design System — Vue 3 to React Migration
**Researched:** 2026-03-13
**Research scope:** Common mistakes when converting a Vue 3 component library to React

---

## Critical Pitfalls (rewrites / systemic failure if missed)

### 1. useOptionalModel Duality — Controlled vs Uncontrolled
- **What goes wrong:** Vue's `useOptionalModel` handles both controlled (parent-managed) and uncontrolled (self-managed) states transparently. A naive React port creates components that are always controlled or always uncontrolled, breaking consumer expectations.
- **Warning signs:** Components that work with `value` prop but break without it (or vice versa)
- **Prevention:** Build `useControllable` hook first, test both modes explicitly, use it in every stateful component
- **Phase:** Foundation (Tier 1) — must be done before any form component

### 2. Vue Scoped Styles + Tailwind → CSS Strategy
- **What goes wrong:** Vue SFCs have `<style scoped>` which auto-scopes CSS. React has no built-in scoping. Blindly moving styles to global CSS causes conflicts across components.
- **Warning signs:** Styles bleeding between components, specificity wars
- **Prevention:** Keep all styling in Tailwind utility classes (already the primary approach). For component-specific CSS files (like `colors.css`), use unique class name prefixes or CSS Modules.
- **Phase:** Foundation — CSS strategy must be decided before converting any component

### 3. Event Emitter + React Strict Mode Double-Invocation
- **What goes wrong:** The Vue codebase uses `event.emit('open-confirm')` / `event.on('confirm')` for cross-component communication. React components don't re-render from external events — only from state/context changes. Additionally, React Strict Mode (dev) double-invokes effects, causing duplicate event listeners.
- **Warning signs:** Toast/Confirm not appearing, or appearing twice in development
- **Prevention:** Replace event emitter pattern with React Context + useReducer for Toast/Confirm. The event emitter can remain for truly internal non-UI communication if needed.
- **Phase:** Provider setup phase — before Toast/Confirm components

### 4. watch({ deep: true }) → useEffect Dependency Mismatches
- **What goes wrong:** Vue's `watch` with `deep: true` tracks nested object mutations. React's `useEffect` compares by reference, not deep equality. Table sorting, pagination, and filtering logic that uses deep watchers will silently break.
- **Warning signs:** Table doesn't re-sort when data changes, DatePicker doesn't update when date object mutates
- **Prevention:** Use immutable state updates (spread operator). For complex cases, use a custom `useDeepCompareEffect` or restructure to primitive dependencies.
- **Phase:** Complex component phase — especially Table, Select, Tree

### 5. Named Scoped Slots → Render Props Strategy
- **What goes wrong:** Vue Table uses dynamic named scoped slots like `#[header.value]` for custom cell renderers. React has no direct equivalent. A naive conversion loses the ability to customize individual columns.
- **Warning signs:** Table component can't render custom cells, Carousel can't customize slides
- **Prevention:** Define render prop strategy upfront: `columns` prop with `render?: (row) => ReactNode` per column definition object. Don't try to replicate Vue's slot naming dynamically.
- **Phase:** Must be decided in planning, implemented in complex component phase

### 6. Missing forwardRef on Form Inputs
- **What goes wrong:** Vue automatically exposes template refs. React requires explicit `forwardRef` wrapper. Without it, form libraries (react-hook-form, formik) can't access input DOM nodes for focus management, validation, etc.
- **Warning signs:** `ref` prop silently does nothing, form library integration fails
- **Prevention:** Add `forwardRef` to every form input component (Input, Select, Textarea, Checkbox, Radio, etc.) from the start
- **Phase:** Foundation — establish pattern before form components

### 7. Vue Plugin install() → Named Exports
- **What goes wrong:** All 60+ Vue components have `index.ts` files that export a Vue plugin with `install()` method. React doesn't have this pattern. Forgetting to convert these creates dead exports.
- **Warning signs:** `import { Button } from 'design-system'` returns undefined or a plugin object
- **Prevention:** Bulk-convert all `index.ts` files to simple named exports. Create a checklist and verify each one.
- **Phase:** Foundation — do during initial project restructuring

---

## Moderate Pitfalls (component-specific breaks)

### 8. onMounted DOM Measurement → useLayoutEffect (not useEffect)
- **What goes wrong:** Vue's `onMounted` fires after DOM is painted. Some components (Container, Carousel) measure DOM dimensions on mount. Using `useEffect` (fires after paint) causes a flash of incorrect layout.
- **Warning signs:** Layout flicker on mount, incorrect dimensions for one frame
- **Prevention:** Use `useLayoutEffect` (fires before paint) for any DOM measurement or size calculation
- **Phase:** Internal component phase — Container, Carousel, Collapsible

### 9. nextTick → useLayoutEffect for State-Dependent DOM Updates
- **What goes wrong:** Vue's `nextTick()` waits for DOM update after state change. React has no direct equivalent. Using `setTimeout` or `requestAnimationFrame` is unreliable.
- **Warning signs:** Carousel scroll position wrong after slide change, accordion height wrong after toggle
- **Prevention:** Use `useLayoutEffect` with the relevant state as dependency — it fires synchronously after React commits DOM changes
- **Phase:** Complex component phase — Carousel, Accordion

### 10. Teleport → Portal Synthetic Event Bubbling
- **What goes wrong:** React portals preserve the React event bubbling tree (events bubble through React component tree, not DOM tree). Vue's Teleport does not. Click-outside detection logic that relies on DOM event bubbling may behave differently.
- **Warning signs:** Clicking inside a portaled Dialog triggers the click-outside handler
- **Prevention:** Use React's `onMouseDown` on the overlay backdrop instead of document-level click listeners. Test click-outside behavior explicitly for all portaled components.
- **Phase:** Dialog/Overlay component phase

### 11. Multiple v-model Bindings → Explicit Prop Pairs
- **What goes wrong:** Some Vue components use multiple `v-model` bindings (e.g., `v-model:expanded`, `v-model:page`). React doesn't have v-model — each needs explicit `value`/`onChange` prop pairs.
- **Warning signs:** Only one of multiple bound values updates correctly
- **Prevention:** Map each `v-model:foo` to `foo`/`onFooChange` prop pair. Document the pattern consistently.
- **Phase:** Affects Table (page, sort), Tree (expanded, selected), Accordion (expanded)

### 12. TypeScript `as unknown` Debt → TSX Build Failures
- **What goes wrong:** Vue SFCs may have loose TypeScript casts (`as unknown as T`) that work with Vue's type system but fail in strict TSX compilation.
- **Warning signs:** Build errors in components that compiled fine in Vue
- **Prevention:** Fix type casts during migration, don't carry over `as unknown` patterns. Use proper generic typing.
- **Phase:** Throughout — fix as encountered

---

## Minor Pitfalls

### 13. Vue `<Transition>` → CSS-Based or react-transition-group
- **What goes wrong:** Reach for `framer-motion` as a Transition replacement — it's 30KB+ and overkill for enter/leave animations.
- **Prevention:** Use CSS transitions with conditional class toggling, or `react-transition-group` (lightweight, similar API to Vue Transition)
- **Phase:** Foundation — decide animation strategy early

### 14. onBeforeMount Initialization → useState Lazy Initializer
- **What goes wrong:** Using `useEffect` for initialization that needs to happen before first render. `useEffect` fires after render, causing a flash.
- **Prevention:** Use `useState(() => computeInitialValue())` lazy initializer for state that must exist before first render
- **Phase:** Throughout — apply as needed

### 15. MDI Icon Package Must Be Swapped First
- **What goes wrong:** Starting component migration before resolving icon imports. Every component with icons fails to compile.
- **Prevention:** Swap `mdi-vue` → `@mdi/react` and create an `Icon` wrapper component as the very first migration step
- **Phase:** Foundation — literally step 1

### 16. Index Keys in Sortable Lists
- **What goes wrong:** Using array index as `key` in Table rows or sortable lists causes React to reuse wrong DOM nodes on sort/filter, leading to stale state in cells.
- **Warning signs:** Table cell inputs retain old values after sorting
- **Prevention:** Always use unique item IDs as keys. Audit all `map()` calls during migration.
- **Phase:** Complex component phase — Table, Tree, List

### 17. computedStyleMap() Non-Standard API
- **What goes wrong:** The existing Carousel component uses `computedStyleMap()` which is a non-standard browser API. This bug already exists in the Vue version and will carry over.
- **Prevention:** Replace with `getComputedStyle()` during migration — fix the existing bug
- **Phase:** Carousel component migration

---

## Phase Mapping Summary

| Pitfall | Must Be Addressed In |
|---------|---------------------|
| #1 useOptionalModel duality | Foundation phase |
| #2 CSS scoping strategy | Foundation phase |
| #3 Event emitter replacement | Provider/context phase |
| #4 Deep watch → useEffect | Complex components phase |
| #5 Scoped slots → render props | Planning + complex components |
| #6 forwardRef on inputs | Foundation phase |
| #7 Plugin → named exports | Foundation phase |
| #8 onMounted → useLayoutEffect | Internal components phase |
| #9 nextTick → useLayoutEffect | Complex components phase |
| #10 Portal event bubbling | Dialog/overlay phase |
| #11 Multiple v-model | Table/Tree/Accordion phase |
| #12 TypeScript casts | Throughout migration |
| #13 Transition strategy | Foundation phase |
| #14 Initialization timing | Throughout migration |
| #15 MDI icon swap | Foundation phase (step 1) |
| #16 Index keys | Complex components phase |
| #17 computedStyleMap | Carousel migration |

---

*Pitfalls research: 2026-03-13*
