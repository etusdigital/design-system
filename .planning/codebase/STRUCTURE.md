# Codebase Structure

**Analysis Date:** 2026-03-13

## Directory Layout

```
design-system/
├── src/                           # Source code
│   ├── index.ts                   # Main plugin entry point
│   ├── global.d.ts                # Vue type declarations for components
│   ├── vite-env.d.ts              # Vite environment types
│   ├── assets/                    # Global styles
│   │   └── main.css               # Global CSS, custom properties
│   ├── components/                # 60+ Vue 3 component directories
│   │   ├── Button/
│   │   │   ├── Button.vue         # Component implementation
│   │   │   ├── index.ts           # Plugin export
│   │   │   ├── Button.stories.ts  # Storybook stories
│   │   │   ├── Button.mdx         # Storybook documentation
│   │   │   └── colors.css         # Component-specific styles
│   │   ├── Input/
│   │   ├── Dialog/
│   │   ├── Select/
│   │   ├── Table/
│   │   ├── [other components]/
│   ├── composables/               # Reusable Vue composables
│   │   ├── index.ts               # Exports all composables
│   │   └── OptionalModel.ts       # Two-way binding helper
│   ├── utils/                     # Utilities and helpers
│   │   ├── index.ts               # Helper functions (color, date, validation)
│   │   ├── event.ts               # Event emitter for global communication
│   │   ├── components/            # Internal utility components
│   │   │   ├── Label.vue
│   │   │   ├── Overlay.vue
│   │   │   ├── Container.vue
│   │   │   ├── SelectContainer.vue
│   │   │   ├── SelectContent.vue
│   │   │   ├── Option.vue
│   │   │   ├── Group.vue
│   │   │   ├── ExpandableContainer.vue
│   │   └── types/                 # TypeScript type definitions
│   │       ├── Option.ts
│   │       ├── DropOption.ts
│   │       ├── Group.ts
│   │       ├── SidebarOption.ts
│   │       └── ContainerModelExtra.ts
│   └── documentation/             # Documentation markdown
├── .storybook/                    # Storybook configuration
├── scripts/                       # Build and utility scripts
├── docs/                          # Generated documentation (59 directories)
├── public/                        # Static assets
├── vite.config.ts                 # Vite build configuration
├── tailwind.config.cjs            # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript config
├── tsconfig.lib.json              # TypeScript config for library build
├── tsconfig.app.json              # TypeScript config for app
├── tsconfig.node.json             # TypeScript config for build tools
├── package.json                   # Dependencies and scripts
├── pnpm-lock.yaml                 # Lock file
├── .npmignore                     # Files excluded from npm package
├── .gitignore                     # Git ignored files
├── .husky/                        # Git hooks
├── .githooks/                     # Custom git hooks
├── .github/                       # GitHub workflows/config
├── .vscode/                       # VS Code settings
└── .planning/                     # Planning documents
    └── codebase/                  # Analysis documents
```

## Directory Purposes

**src/**
- Purpose: All source code for the design system
- Contains: Vue 3 components, composables, utilities, styles
- Key files: `index.ts` (entry), `global.d.ts` (types)

**src/components/**
- Purpose: 60+ reusable Vue 3 components
- Contains: For each component: `.vue` file, `index.ts` plugin wrapper, `.stories.ts` Storybook stories, `.mdx` documentation, component-specific styles
- Pattern: Each component is its own directory with consistent structure

**src/composables/**
- Purpose: Reusable composition functions for Vue 3
- Contains: State management helpers, hooks, reactive utilities
- Key files: `OptionalModel.ts` (controlled/uncontrolled pattern)

**src/utils/**
- Purpose: Shared utilities, helpers, and internal components
- Contains: Color conversion functions, date utilities, validation, event emitter, internal UI components
- Subdivision:
  - `components/`: Reusable internal components (Overlay, Label, Container, etc.)
  - `types/`: Shared TypeScript types (Option, Group, etc.)

**src/assets/**
- Purpose: Global styles applied to all components
- Contains: CSS variables, Tailwind utilities, global resets
- Single file: `main.css`

**src/documentation/**
- Purpose: General documentation content
- Contains: Markdown or structure guides

**.storybook/**
- Purpose: Storybook configuration for component documentation
- Contains: Config files, plugins, setup files, theme customization

**tailwind.config.cjs**
- Purpose: Tailwind CSS custom theme and configuration
- Contains: Color palette, spacing scale, typography, plugins
- Exported to npm package as part of library distribution

**docs/**
- Purpose: Generated component documentation
- Contains: 59+ directories (one per component group or category)
- Note: Auto-generated, not manually edited

## Key File Locations

**Entry Points:**

- `src/index.ts`: Main plugin entry point, registers all components, sets up global confirm/toast
- `src/components/*/index.ts`: Individual component plugin exports
- `vite.config.ts`: Build configuration, Vite plugins (Vue, Tailwind, DTS generation)

**Configuration:**

- `tsconfig.json`: Base TypeScript config
- `tsconfig.lib.json`: Library-specific build configuration
- `tailwind.config.cjs`: Tailwind CSS theme customization
- `vite.config.ts`: Vite build and test configuration
- `package.json`: Dependencies, scripts, exports

**Core Logic:**

- `src/utils/event.ts`: Event emitter singleton for cross-component communication
- `src/utils/index.ts`: 400+ lines of utility functions (colors, dates, validation)
- `src/composables/OptionalModel.ts`: Controlled/uncontrolled pattern helper

**Styling:**

- `src/assets/main.css`: Global styles, CSS custom properties
- `src/components/*/colors.css`: Component-specific color utilities (e.g., `Button/colors.css`)

**Testing:**

- `.storybook/vitest.setup.ts`: Test setup file
- `vitest.shims.d.ts`: Vitest type definitions
- No `.test.ts` files in current structure (tests run via Storybook addon)

**Type Definitions:**

- `src/global.d.ts`: Vue type augmentation for component auto-completion
- `src/utils/types/`: Shared TypeScript interfaces (Option, Group, etc.)

## Naming Conventions

**Files:**

- Components: PascalCase.vue (e.g., `Button.vue`, `DatePicker.vue`)
- Composables: camelCase.ts (e.g., `useOptionalModel.ts`, `OptionalModel.ts`)
- Utilities: camelCase.ts (e.g., `event.ts`, `index.ts`)
- Styles: Component file name or `colors.css` (e.g., `Button/colors.css`)
- Stories: ComponentName.stories.ts (e.g., `Button.stories.ts`)
- Documentation: ComponentName.mdx (e.g., `Button.mdx`)

**Directories:**

- Components: PascalCase (e.g., `/Button`, `/Input`, `/Dialog`)
- Composables: lowercase (e.g., `/composables`)
- Utils: lowercase (e.g., `/utils`)
- Assets: lowercase (e.g., `/assets`)

**TypeScript Names:**

- Vue component imports: PascalCase (e.g., `Button`, `Dialog`)
- Functions: camelCase (e.g., `calculateDate()`, `applyMask()`)
- Types/Interfaces: PascalCase (e.g., `Option`, `DropOption`, `Group`)
- Composables: camelCase or PascalCase (e.g., `useOptionalModel()`)

## Where to Add New Code

**New Component:**

1. Create directory: `src/components/ComponentName/`
2. Create `.vue` file with `<script setup>` and TypeScript
3. Create `index.ts` following pattern: `src/components/Button/index.ts`
4. Create `.stories.ts` for Storybook documentation
5. Create `.mdx` for additional docs
6. Add component type to `src/global.d.ts` for IDE auto-completion

**New Composable:**

- Location: `src/composables/composableName.ts`
- Export in: `src/composables/index.ts`
- Follow pattern: Accept props/emit as parameters, return computed/refs

**New Utility Function:**

- Location: `src/utils/index.ts`
- Export directly from `src/utils/index.ts`
- For type-only exports: `src/utils/types/TypeName.ts`

**New Internal Component (not public API):**

- Location: `src/utils/components/ComponentName.vue`
- Use in: Private components or utilities
- Do not export from `src/index.ts`

**New Style:**

- Global styles: Add to `src/assets/main.css`
- Component-specific: Create `ComponentName/colors.css` or add `<style scoped>` in `.vue`

**New Test:**

- Location: Co-located with component, or `.storybook/vitest.setup.ts`
- Pattern: Use Storybook addon-vitest integration
- Run: `pnpm test` (runs via Storybook)

## Special Directories

**lib/**
- Purpose: Built/compiled output
- Generated: Yes (via `vite build`)
- Committed: No (.gitignored)
- Contains: Compiled JS (ES, CJS, UMD formats), CSS, type declarations
- Clean with: `rm -rf lib/`

**node_modules/**
- Purpose: Installed dependencies
- Generated: Yes (via `pnpm install`)
- Committed: No (.gitignored)

**docs/**
- Purpose: Auto-generated component documentation
- Generated: Yes (via `pnpm generate-docs`)
- Committed: Yes (committed to repo)
- Regenerate: `pnpm generate-docs` (uses scripts/generate-md-simple.cjs)

**.storybook/**
- Purpose: Component documentation and testing
- Committed: Yes
- Run Storybook: `pnpm storybook`
- Build static: `pnpm build-storybook`

## File Path Aliases

Used in imports via TypeScript `paths` configuration:

- `@/`: Resolves to `src/`
- `#composables`: Resolves to `src/composables/`
- `#composables/*`: Resolves to `src/composables/*.ts`
- `#components/*`: Resolves to `src/components/*/*.vue`
- `#utils/*`: Resolves to `src/utils/*.ts`
- `#/`: Alternative alias for `src/`

Example imports:
```typescript
import Button from '#components/Button'
import { useOptionalModel } from '#composables'
import { applyMask } from '#utils/index'
import { hexaToRgba } from '@/utils'
```

---

*Structure analysis: 2026-03-13*
