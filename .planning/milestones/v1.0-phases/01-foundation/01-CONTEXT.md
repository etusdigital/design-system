# Phase 1: Foundation - Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Tooling, hooks, and infrastructure that every component depends on. React build setup, shared hooks (useControllable, useTransition), Icon component, Storybook migration, Vitest + RTL config, and all 57 component index.ts conversions. No actual component migrations — just the foundation they build on.

</domain>

<decisions>
## Implementation Decisions

### CSS Scoping Strategy
- Tailwind utility classes + component CSS files (keep existing pattern)
- Keep existing `colors.css` filenames — minimize diff with Vue version
- Use `clsx` for conditional class composition in JSX (no tailwind-merge)
- All components accept a `className` prop for consumer customization

### Transition/Animation Approach
- CSS classes + React state — no extra dependencies (no react-transition-group, no framer-motion)
- Build a shared `useTransition` hook that manages mount/unmount timing via `isMounted` + `isActive` states
- Transition durations must match Vue version exactly (extract from each Vue component's `<Transition>`)
- Hook reused by Dialog, Drawer, Toast, Accordion, ExpandableContainer

### useControllable Hook API
- Tuple return: `[value, setValue]` — mirrors useState API
- Input options object: `{ value, defaultValue, onChange }`
- React-idiomatic prop naming: `value` + `onChange` (not Vue's `modelValue` + `update:modelValue`)
- Dev mode warnings when switching between controlled and uncontrolled

### Icon Wrapper Design
- Keep Material Symbols font (Google font) — not switching to @mdi/react SVGs
- Same span-based rendering: `<span class="material-symbols-rounded">{name}</span>`
- Dynamic size via inline `style={{ fontSize: size }}` (not CSS variable)
- Font loaded via CSS @import in main.css (not runtime DOM injection)
- Props: `name`, `size`, `filled`, `className`

### Dark Mode
- Out of scope — current Vue library has no dark mode, migration doesn't add new features

### Claude's Discretion
- Exact useTransition hook implementation details
- Path alias updates (keep existing aliases, adapt for React/TSX)
- Storybook addon selection for React
- Vitest + RTL configuration details
- index.ts conversion pattern for 57 components

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/composables/OptionalModel.ts`: Vue composable to replicate as useControllable — returns `[model, set]` tuple with shallowRef internal state
- `src/utils/index.ts`: 400+ lines of utility functions (color, date, validation, masking) — framework-agnostic, reusable as-is
- `src/utils/event.ts`: Event emitter for cross-component communication — will be replaced by React context in Phase 5
- `src/assets/main.css`: Global styles and CSS custom properties — keep and extend with @import for Material Symbols font
- `tailwind.config.cjs`: Comprehensive theme with design tokens — unchanged

### Established Patterns
- Component directory structure: `ComponentName/ComponentName.vue`, `index.ts`, `ComponentName.stories.ts`, `colors.css`
- Plugin export pattern in index.ts: `export default { install(Vue) { ... } } as Plugin; export { Component }`
- Path aliases: `@/`, `#composables`, `#components/*`, `#utils/*` — need Vite resolve alias updates
- withDefaults + defineProps pattern → React interface + destructured props with defaults

### Integration Points
- `src/index.ts`: Main entry point — currently Vue plugin install, needs complete rewrite for React named exports
- `vite.config.ts`: Currently uses `@vitejs/plugin-vue` — swap to `@vitejs/plugin-react-swc`
- `.storybook/main.ts`: Currently `@storybook/vue3-vite` — swap to `@storybook/react-vite`
- `tsconfig.app.json`: Needs `jsx: "react-jsx"` added
- `package.json`: Vue deps removed, React deps added

</code_context>

<specifics>
## Specific Ideas

- `@mdi/js` and `mdi-vue` packages appear unused in source code — can be removed from package.json during migration
- The Icon component uses Google Material Symbols font, not MDI SVGs — simpler migration than ROADMAP anticipated
- Vue's `v-bind()` in `<style>` (used in Icon for dynamic size) maps to React inline styles

</specifics>

<deferred>
## Deferred Ideas

- Dark mode support — not in Vue version, out of scope for migration. Could be a v2 enhancement.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-13*
