# Component Migration Guide (Modules Architecture)

This guide describes how to migrate a component from `src/components/B*` to the modular architecture under `src/modules/[module]/*` while maintaining backward compatibility. Issues are managed in Linear, and the public package is published as `@ETUS/eds`.

## 1) Module boundaries (rules)

- Modules: `core`, `forms`, `data-display`, `feedback`, `navigation`, `overlay`, `layout`.
- Dependency graph: `utils → core → {forms, data-display, feedback, navigation, overlay, layout}`.
- No lateral dependencies between feature modules. If a component in one module needs a primitive from another, promote the shared primitive into `core`.
- Public imports must come from module roots only (e.g., `@ETUS/eds/forms`). No deep imports.

Module scopes:

- `core`: primitives and shared foundations (Icon, Spinner, typography tokens; optionally Button if used across modules)
- `forms`: inputs and controls (Input, Select, MultiSelect, Checkbox, Radio, Toggle/Switch, Slider, RangeSlider, Date/DatePicker/Filter, TagInput, FileUpload, SmartSelect, ColorPicker)
- `data-display`: content presentation (Card, CardIcon, MetricCard, Table, Tag/Badge, Avatar, Rating)
- `feedback`: system/user feedback (Alert, Toast, ProgressBar)
- `navigation`: wayfinding (Navbar, Sidebar, SideMenu, Menu, Breadcrumb, Tabs, Pagination)
- `overlay`: floating/sheeted UI (Dialog/Confirm, Tooltip, Dropdown/Popover)
- `layout`: structure/placement (Group, Divider, Collapse/ExpandableContainer, ContentScreen)

## 2) Migration steps (per component)

1. Choose the module for the component based on the rules above.
2. Create module folders and copy files:

   - Create folder: `src/modules/<module>/<Component>/`
   - Copy `src/components/B<Component>/B<Component>.vue` → `src/modules/<module>/<Component>/Component.vue`
   - Copy related files (types, styles, tests/demos) into the new folder and rename to drop the `B` prefix where applicable
   - Create `src/modules/<module>/<Component>/index.ts` that exports the component

3. Remove the `B` prefix in file names and symbols (SFC name, exported names, stories).
4. Update internal imports to their modular equivalents (e.g., `BIcon → Icon`, `BSpinner → Spinner`). Do not import across modules directly; use the target module entry or move shared code to `core`.
5. Create/verify module exports:
   - `src/modules/<module>/<Component>/index.ts` exports the component
   - `src/modules/<module>/index.ts` re-exports from the component folder
6. Add compatibility re-export:
   - `src/components/B<Component>/index.ts` should re-export the module component to preserve back-compat.
7. Add a visual demo (custom visual library, no Storybook):

   - Add a small page/sandbox in your custom visual library that mounts the component with key states/variants
   - Import from `@ETUS/eds/<module>` and validate interactions/accessibility

8. Styles (TailwindCSS v4, CSS-first approach):
   - Prefer Tailwind utility classes directly in templates; minimize custom CSS
   - Keep component-local CSS in `<style>` using `@layer components` and design tokens (CSS variables)
   - Ensure Tailwind v4 is imported once globally via `@import "tailwindcss";`
   - Remove v3 directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
9. SFC architecture (script first):
   - Use `<script setup lang="ts">` placed before `<template>` and `<style>`
   - Normalize composables/imports at the top; avoid global side effects
10. Types and contracts:

    - Keep prop names, emits, and slots unchanged to preserve API compatibility.

11. Lint and type-check:

```bash
npm run lint && npm run type-check
```

## 3) File structure (after)

```text
src/
├── components/                 # Backward compatibility shims
│   └── BButton/
│       └── index.ts            # re-exports modules/core/Button
└── modules/
    └── core/
        ├── Button/
        │   ├── Button.vue
        │   ├── Button.stories.ts
        │   └── index.ts
        └── index.ts            # export * from './Button'
```

## 4) Validation checklist (must pass)

- Build succeeds: `npm run build`
- Old import works: `import { BComponent } from '@ETUS/eds'`
- New import works: `import { Component } from '@ETUS/eds/<module>'`
- Component renders correctly in the custom visual library (all key states/variants)
- No API breaks (props/emits/slots remain compatible)
- Tree-shaking behaves as expected when importing from a module entry

## 5) PR checklist (copy into description)

- [ ] Removed `B` prefix in files and exports
- [ ] Updated internal imports to modular equivalents
- [ ] Added module exports (`src/modules/<module>/index.ts`)
- [ ] Added B\* compatibility re-export (`src/components/B<Component>/index.ts`)
- [ ] Added/updated visual demo in the custom visual library
- [ ] Lint + type-check passed
- [ ] Verified old and new import paths in a local usage test
- [ ] Tailwind v4 CSS-first migration applied (utilities in template; minimal CSS under `@layer components`)
- [ ] SFC uses `<script setup lang="ts">` at the top
- [ ] Quality pass against external references (see External quality references)

## 6) Common pitfalls (quick fixes)

- Do not deep import SFCs from other modules. Import only from module roots.
- Path aliases like `#utils/*` are for `.ts` files; prefer relative paths for `.vue` files under utils/components.
- If you see a missing subpath export error, ensure:
  1. package.json exports include the module entry,
  2. Vite build entries include the module,
  3. `src/modules/<module>/index.ts` exists and re-exports,
  4. run `npm run type-check`.

## 7) Example commands

```bash
# Build the library
npm run build

# Verify imports (in a consumer or local sandbox)
# Old: import { BTag } from '@ETUS/eds'
# New: import { Tag } from '@ETUS/eds/core'
```

## 8) External quality references (research step)

- Before finalizing a component, review established Vue 3 libraries:
  - PrimeVue, Vuetify 3, Quasar, Naive UI, Element Plus, Ant Design Vue, Arco Design Vue, TDesign Vue (Next), Headless UI for Vue, Varlet (mobile)
  - WAI-ARIA Authoring Practices for roles, properties, keyboard interactions
- Validate: accessibility (roles/labels/tab/arrow/home/end/esc/enter/space), focus management, states (disabled/error/loading), and RTL support where applicable
- Incorporate proven interaction patterns and a11y attributes into the component and its visual demo

## 9) Linear workflow (issues)

- Manage migration tasks in Linear. For each component:
  - Create/select an issue in the migration project
  - Link the PR to the Linear issue and close it upon merge

## 10) Composables, types, and workers

Composables, types, and workers should follow the same module boundaries and public API rules as components.

### Composables

- Scope
  - Shared primitives: `src/modules/core/composables/...` and (optionally) re-export from `@ETUS/eds/core`.
  - Module-specific: `src/modules/<module>/composables/...`. Keep internal by default; only re-export if part of the public API.
  - Component-local: colocate under `src/modules/<module>/<Component>/composables/...` or inside the SFC. Do not export.
- Rules
  - Naming: `useSomething`.
  - No cross-module imports. If reused across modules, move to `core`.
  - Public imports must be via module roots only (e.g., `@ETUS/eds/forms`). No deep imports.
- Public exposure (optional)
  - If you need to expose a composable, re-export it from the module root `index.ts` and document it.

### Types

- Placement
  - Component-level: `src/modules/<module>/<Component>/<Component>.types.ts`. Export only if part of the public API.
  - Module-level shared types: `src/modules/<module>/types/...`.
  - Cross-module/shared: `src/modules/core/types/...`.
- Exports
  - Re-export curated public types from the module root using `export type { ... }`.
  - Keep internal types unexported (no public path).
- Build/types config
  - Ensure `.d.ts` generation and subpath `exports` map `types` for each module entry in `package.json`.

### Workers

- Placement
  - Component-specific: `src/modules/<module>/<Component>/<name>.worker.ts`.
  - Module-shared: `src/modules/<module>/workers/...`.
  - Cross-module/shared: `src/modules/core/workers/...`.
- Access pattern
  - Hide workers behind composables (e.g., `useColorWorker`) or components. Do not export worker files directly.
  - Type message payloads in a nearby `types/worker.ts` or in `core/types` if shared.
- Usage
  - Instantiate with `new URL('./<name>.worker.ts', import.meta.url)` inside the composable/component.
  - Clean up with `worker.terminate()` when appropriate.
- Build
  - Ensure Vite worker support remains enabled. No public `exports` for worker files are required.

### Enforcement

- Enforce the dependency DAG for composables, types, and workers: `utils → core → {forms, data-display, feedback, navigation, overlay, layout}`.
- Disallow consumer deep imports (e.g., `@ETUS/eds/forms/composables/useX`). Only allow imports from module roots.
- Within a module, allow relative imports for internal files (e.g., `./composables/useX`).
