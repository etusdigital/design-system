# Architecture

**Analysis Date:** 2026-03-13

## Pattern Overview

**Overall:** Plugin-based Vue 3 component library with composite pattern for complex components

**Key Characteristics:**
- All components registered as Vue 3 plugins through `app.use()`
- Global event emitter for cross-component communication (dialogs, toasts)
- Composable-based state management using Vue's Composition API
- Tailwind CSS for styling with MDI icons for UI elements
- Two-way binding via `v-model` / `modelValue` prop with `update:` events
- Overlay and Teleport patterns for modals and notifications

## Layers

**Plugin Layer:**
- Purpose: Application initialization and global registration of all components
- Location: `src/index.ts`
- Contains: Main plugin installer, global property configuration
- Depends on: All component modules, event system
- Used by: Vue applications consuming the design system

**Component Layer:**
- Purpose: Reusable Vue 3 SFC (Single File Components) with isolated state
- Location: `src/components/*/` (60+ component directories)
- Contains: `.vue` files (template+script+style), `.stories.ts` Storybook docs, `.mdx` documentation
- Depends on: Composables, utils, assets
- Used by: Plugin layer, parent components, end applications

**Composable Layer:**
- Purpose: Reusable stateful logic for components
- Location: `src/composables/`
- Contains: `OptionalModel.ts` (v-model helper), exported in `index.ts`
- Depends on: Vue runtime
- Used by: Form input components, controlled components

**Utility Layer:**
- Purpose: Shared functions, types, and helper components
- Location: `src/utils/` and `src/utils/components/`
- Contains: Helper functions (`index.ts`), event emitter (`event.ts`), types (`types/`), internal UI components
- Depends on: None (self-contained)
- Used by: All component layers, applications

**Style Layer:**
- Purpose: Global styling and CSS customization
- Location: `src/assets/main.css`
- Contains: CSS custom properties, Tailwind utilities, component styles
- Depends on: Tailwind CSS config
- Used by: All components via scoped styles

## Data Flow

**V-Model Two-Way Binding:**

1. User interacts with component (input, select, etc.)
2. Component internal state updates via `ref()` or `useOptionalModel()` hook
3. `emit('update:modelValue', newValue)` sends value up to parent
4. Parent prop updates if using `v-model:modelValue="varName"`
5. Component prop updates, watchers sync internal state with external value

**Event-Based Communication (Dialogs/Toasts):**

1. Application code calls `$confirm()` or `$toast()` from global properties
2. Methods emit event via `event.emit('open-confirm', options)` or `open-toast`
3. Confirm/Toast components listen via `event.on()` in mounted hook
4. User interaction triggers `event.emit('confirm')` or `cancel` / `close-toast`
5. Promise resolves in original caller

**State Management:**

- **Local component state:** `ref()` for simple values, `reactive()` for complex objects
- **Conditional rendering:** `v-if`, `v-show` for visibility
- **Computed properties:** `computed()` for derived state, especially UI classes
- **Parent-child sync:** `v-model` with two-way binding or one-way props
- **Global app state:** Global properties (`$confirm`, `$toast`) and event emitter for cross-component signals

## Key Abstractions

**Component Wrapper Pattern:**
- Purpose: Standardize component registration and exports
- Examples: `src/components/Button/index.ts`, `src/components/Input/index.ts`
- Pattern: Each component directory has `index.ts` that exports Vue Plugin + named export of component

**Modal/Overlay Pattern:**
- Purpose: Render modals and overlays at document root level
- Examples: `src/components/Dialog/`, `src/components/Toast/`, `src/components/Confirm/`
- Pattern: Uses `<Teleport to="body">` to escape component hierarchy, wraps with `Overlay.vue` for click handling

**Optional Model Composable:**
- Purpose: Support both controlled (parent-managed) and uncontrolled (self-managed) component variants
- Example usage: Input, Select, ColorPicker components
- Pattern: Check if `prop === undefined` to determine control mode; fallback to local `shallowRef()`

**Utility Component Layer:**
- Purpose: Shared internal UI building blocks not exposed in public API
- Examples: `Label.vue`, `Overlay.vue`, `Container.vue`, `SelectContent.vue`, `Option.vue`
- Pattern: Located in `src/utils/components/`, used by multiple public components

**Helper Function Collection:**
- Purpose: Domain-specific utilities for formatting, validation, calculations
- Examples: Color conversion (`hexaToRgba`, `rgbaToHsva`), date operations (`calculateDate`, `getArrayMonthDay`), validation (`isValidEmail`, `isValidUrl`)
- Pattern: All exported from `src/utils/index.ts` for tree-shaking and selective imports

## Entry Points

**Main Plugin Entry:**
- Location: `src/index.ts`
- Triggers: `app.use(DesignSystem)` in Vue application
- Responsibilities:
  - Register all 60+ components globally
  - Install MDI icon font link
  - Set up global `$confirm()` and `$toast()` functions
  - Provide composables and utils via exports

**Component Exports:**
- Location: `src/components/*/index.ts`
- Triggers: Direct import like `import { Button } from '@etus/design-system/components/Button'`
- Responsibilities: Export component as Vue Plugin and named export

**Composable Exports:**
- Location: `src/composables/index.ts`
- Triggers: Direct import like `import { useOptionalModel } from '@etus/design-system/composables'`
- Responsibilities: Export composition functions for component implementers

**Style Entry:**
- Location: `src/assets/main.css`
- Triggers: Imported in `src/index.ts` (automatic) or manual `import '@etus/design-system/styles.css'`
- Responsibilities: Base styles, CSS custom properties, global utilities

## Error Handling

**Strategy:** Silent defaults with optional error messages

**Patterns:**
- Form inputs: `isError` prop displays validation UI, `errorMessage` shows help text
- Color functions: Return fallback values (empty string for `blendColors()`, default colors for converters)
- Date utilities: Parse invalid dates gracefully, default to today/first month
- Icon/Asset loading: Material Symbols font loaded via CDN with fallback to text

## Cross-Cutting Concerns

**Logging:** Console logging only in utility functions (color blending debug), no centralized logger

**Validation:**
- Input-level: `applyMask()` enforces formatting (CPF, CNPJ, CEP)
- Email/URL validation: `isValidEmail()`, `isValidDomain()`, `isValidUrl()` regex checks
- Type checking: TypeScript via component prop definitions

**Authentication:** Not handled at library level; pass user info/tokens via props to components

**Styling:**
- Tailwind CSS v4 with custom theme (`tailwind.config.cjs`)
- CSS custom properties for colors, spacing, borders
- Scoped styles in SFCs for component isolation
- @apply directives for reusable utility combinations

**Icon System:** Material Design Icons via `mdi-vue` package, accessed via `icon` props

**Accessibility:**
- Semantic HTML (button, input, label, dialog)
- ARIA attributes in complex components (Tree, Table, Select)
- Focus management in modals (Dialog, Confirm)
- Label associations via `for="id"` attributes

---

*Architecture analysis: 2026-03-13*
