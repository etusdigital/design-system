# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Vue 3 component library with TypeScript and Tailwind CSS v4. The library provides 50+ reusable UI components published as `@ETUS/eds` with modular architecture. Storybook has been removed - the library now focuses on clean component exports and modular publishing.

## Commands

```bash
# Development
npm run dev          # Start Vite dev server

# Build
npm run build        # Type-check and build library to lib/

# Quality checks  
npm run type-check   # Run TypeScript type checking
npm run lint:md      # Lint markdown files
npm run format:md    # Format markdown files
```

## Architecture

### Component Structure
Components are organized in a modular architecture:
- New modular structure: `src/modules/<module>/<Component>/`
  - `Component.vue` - Main component file (B prefix removed)
  - `index.ts` - Export file
  - Optional: documentation, assets
- Legacy compatibility: `src/components/BComponent/` (re-exports from modules)

### Tailwind CSS v4
- Recently migrated from v3 to v4
- Uses CSS-first configuration approach
- No `tailwind.config.js` file
- Theme tokens defined in `src/assets/main.css` using `@theme` directives
- Import with `@import "tailwindcss"`

### Theme System
- Default theme (green) and Brius theme (blue)
- Extensive CSS variable system for colors, spacing, typography
- Theme tokens defined in `src/assets/main.css`

### Modular Architecture
- **Module boundaries**: `core`, `forms`, `data-display`, `feedback`, `navigation`, `overlay`, `layout`
- **Dependency graph**: `utils → core → {forms, data-display, feedback, navigation, overlay, layout}`
- **Import patterns**: Use module roots only (e.g., `@ETUS/eds/forms`), no deep imports
- **Backward compatibility**: Legacy `BComponent` imports still work via re-exports

### Key Patterns
- **Optional Model**: Components work with or without v-model using `OptionalModel` composable
- **Global Registration**: All components registered via Vue plugin
- **TypeScript Path Aliases**: `#*` maps to `./src/*`
- **Built-in Systems**: Toast notifications and confirmation dialogs

### Build Configuration
- Vite with `@tailwindcss/vite` plugin
- Library mode output to `lib/`
- PostCSS with `@tailwindcss/postcss`
- Component auto-import setup

## Publishing
Published to public npm registry as `@ETUS/eds`. See `instructions.md` for detailed publishing steps.

## Migration Workflow
Components are being migrated from `src/components/B*` to modular architecture under `src/modules/`. See `docs/MIGRATION_WORKFLOW.md` for detailed migration steps and validation checklist.

## Linear Project
Project ID: `1ea8e74a-5626-4351-a921-d7109ec483fe`  
URL: https://linear.app/etus-media/project/etus-design-system-vue-06dca759c4c1

## Claude Code Guidelines
- Never create any code without ask the user permission
- when query the Linear MCP always use the Team and Project information to filter the query