# AnaCarolina Design System — React Component Library

## What This Is

A React component library providing 60+ reusable UI components (buttons, inputs, dialogs, tables, date pickers, etc.) published as an npm package. Originally built in Vue 3, fully migrated to React in v1.0 with identical component names, prop APIs, visual output, and Tailwind-based styling.

## Core Value

Every component must look and behave identically to its Vue counterpart — same props, same visual output, same Tailwind design tokens. The migration should be invisible to end users.

## Requirements

### Validated

- ✓ All 60+ components migrated from Vue SFCs to React TSX — v1.0
- ✓ Same prop names and component APIs preserved — v1.0
- ✓ Controlled/uncontrolled component pattern via useControllable hook — v1.0
- ✓ React children/render props replacing Vue slots — v1.0
- ✓ React portals replacing Vue Teleport for modals/overlays — v1.0
- ✓ React hooks replacing Vue composables — v1.0
- ✓ React context providers (DesignSystem, Confirm, Toast) — v1.0
- ✓ Storybook migrated to @storybook/react-vite — v1.0
- ✓ 396 Vitest tests with React Testing Library — v1.0
- ✓ Build output: ES, CJS, UMD with TypeScript declarations — v1.0
- ✓ Tailwind CSS v4 design tokens preserved and exported — v1.0
- ✓ Package.json updated with React deps, Vue deps removed — v1.0
- ✓ Internal utility components (Label, Overlay, Container, etc.) migrated — v1.0
- ✓ CSS scoping: Tailwind + component CSS + clsx for conditionals — v1.0
- ✓ npm publishable as @etus/design-system v2.0.0 — v1.0

### Active

- [ ] Server-side rendering (SSR) support
- [ ] React 19 ref-as-prop migration (remove forwardRef wrappers)
- [ ] Compound component API refinement (Select.Option, Table.Column patterns)
- [ ] Accessibility audit and WCAG 2.1 compliance verification

### Out of Scope

- Adding new components not in the Vue version — migration only
- CSS-in-JS (styled-components, emotion) — conflicts with Tailwind
- State management integration — component library should be state-agnostic
- React Native support — web only
- Server Components support — not in Vue version

## Context

Shipped v1.0 with 24,598 LOC TypeScript/TSX across 60+ components.
Tech stack: React 19, Vite, Vitest, Storybook 9, Tailwind CSS v4, pnpm.
Build outputs ES, CJS, UMD formats via Vite + Rollup.
396 tests across 68 files with React Testing Library.
Published as @etus/design-system v2.0.0 on npm.

Known tech debt from v1.0 audit:
- src/composables/OptionalModel.ts residual Vue file (excluded, no runtime impact)
- Checkbox/Radio/Switch/Toggle/ToggleGroup missing forwardRef
- Table sortedItems/pagedItems computed inline without useMemo
- generateMainDts plugin hard-codes lib/main.d.ts content

## Constraints

- **Framework**: React 18+ with TypeScript
- **Tooling**: Vite, Vitest, Storybook 9, pnpm
- **Styling**: Tailwind CSS v4 config and design tokens unchanged
- **API surface**: Component prop names and behavior match Vue version
- **Package**: @etus/design-system npm package
- **Icons**: Material Symbols Rounded font (via CSS)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Replace Vue in-place (not monorepo) | Single repo, clean migration | ✓ Good |
| Keep same prop APIs | Consumers shouldn't notice the framework change | ✓ Good |
| Keep Vite + Vitest + Storybook | Minimize tooling churn | ✓ Good |
| React functional components only | Modern React, closest to Vue `<script setup>` | ✓ Good |
| Context providers for global features | Replace Vue $confirm/$toast with React patterns | ✓ Good |
| Material Symbols font (not @mdi/react) | Consistent with existing CSS-based icon approach | ✓ Good |
| useControllable hook for all form components | Unified controlled/uncontrolled pattern | ✓ Good |
| CSS class toggling for transitions (not react-transition-group) | Simpler, no extra dependency | ✓ Good |
| Plain CSS for portal components, CSS Modules for scoped | Portal renders outside tree need global classes | ✓ Good |
| UMD via separate vite.umd.config.ts | UMD requires single entry point | ✓ Good |

---
*Last updated: 2026-03-24 after v1.0 milestone*
