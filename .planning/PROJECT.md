# AnaCarolina Design System — Vue to React Migration

## What This Is

A full migration of the AnaCarolina design system from Vue 3 to React. The library provides 60+ reusable UI components (buttons, inputs, dialogs, tables, date pickers, etc.) published as an npm package. The React version replaces the Vue version in this repo, preserving the same component names, prop APIs, visual output, and Tailwind-based styling.

## Core Value

Every component must look and behave identically to its Vue counterpart — same props, same visual output, same Tailwind design tokens. The migration should be invisible to end users.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ 60+ Vue 3 components with consistent API — existing
- ✓ Tailwind CSS design tokens and theming — existing
- ✓ Storybook documentation for all components — existing
- ✓ npm package distribution (ES, CJS, UMD) — existing
- ✓ TypeScript throughout — existing
- ✓ Utility functions (color, date, validation, masking) — existing
- ✓ MDI icon integration — existing

### Active

<!-- Current scope. Building toward these. -->

- [ ] All 60+ components migrated from Vue SFCs to React TSX functional components
- [ ] Same prop names and component APIs preserved (minimal deviation)
- [ ] Controlled component pattern replacing Vue v-model two-way binding
- [ ] React children/render props replacing Vue slots
- [ ] React portals replacing Vue Teleport for modals/overlays
- [ ] React hooks replacing Vue composables (useOptionalModel → React equivalent)
- [ ] React context providers replacing Vue global properties ($confirm, $toast)
- [ ] Event emitter system adapted for React (context-based or hook-based)
- [ ] Storybook migrated from @storybook/vue3-vite to @storybook/react-vite
- [ ] Vitest tests updated for React components (React Testing Library)
- [ ] Build output: ES, CJS, UMD formats with TypeScript declarations
- [ ] Tailwind config preserved and exported for consumers
- [ ] Package.json updated with React dependencies, Vue dependencies removed
- [ ] Internal utility components (Label, Overlay, Container, etc.) migrated to React
- [ ] CSS modules or scoped styling approach matching Vue scoped styles

### Out of Scope

- Adding new components not in the Vue version — migration only
- Redesigning component APIs to be "more React-like" — keep parity
- Adding new features or props beyond what Vue version has — migration only
- Server-side rendering (SSR) support — not in Vue version
- React Native support — web only
- Changing the Tailwind design tokens or theme — keep as-is

## Context

- The existing codebase is a mature Vue 3 component library with 60+ components
- Components use Vue 3 Composition API with `<script setup>` and TypeScript
- Styling is Tailwind CSS v4 with a comprehensive custom theme in `tailwind.config.cjs`
- Components follow a plugin pattern (each has `index.ts` that registers as Vue plugin)
- Cross-component communication uses a custom event emitter (dialogs, toasts)
- Internal utility components live in `src/utils/components/` (Label, Overlay, Container, etc.)
- Utility functions (400+ lines) for color conversion, date operations, validation, masking
- Path aliases: `@/`, `#composables`, `#components/*`, `#utils/*`
- Build outputs ES, CJS, UMD formats via Vite + Rollup
- Storybook 9 for documentation with a11y and Chromatic addons
- No standalone test files — tests run via Storybook addon-vitest

## Constraints

- **Framework**: React 18+ with TypeScript — replacing Vue 3
- **Tooling**: Keep Vite, Vitest, Storybook, pnpm — swap Vue plugins for React plugins
- **Styling**: Keep Tailwind CSS v4 config and design tokens unchanged
- **API surface**: Component prop names and behavior must match Vue version
- **Package**: Continue publishing as @etus/design-system npm package
- **Icons**: Keep MDI icons — replace mdi-vue with react-compatible MDI package

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Replace Vue in-place (not monorepo) | User wants single repo, clean migration | — Pending |
| Keep same prop APIs | "Least possible changes" — consumers shouldn't notice | — Pending |
| Keep Vite + Vitest + Storybook | Minimize tooling churn, these all support React | — Pending |
| React functional components only | Modern React standard, closest to Vue `<script setup>` | — Pending |
| Context providers for global features | Replace Vue global properties ($confirm, $toast) with React patterns | — Pending |

---
*Last updated: 2026-03-13 after initialization*
