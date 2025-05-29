# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Vue 3 component library with TypeScript and Tailwind CSS v4. The library provides 50+ reusable UI components published as `@BRIUS/design-system`.

## Commands

```bash
# Development
npm run dev          # Start Vite dev server
npm run storybook    # Start Storybook on port 6006

# Build
npm run build        # Type-check and build library to lib/
npm run build-storybook

# Quality checks  
npm run type-check   # Run TypeScript type checking
npm run lint:md      # Lint markdown files
npm run format:md    # Format markdown files
```

## Architecture

### Component Structure
Each component in `src/components/` follows this pattern:
- `BComponentName/`
  - `BComponentName.vue` - Main component file
  - `BComponentName.stories.ts` - Storybook stories
  - `index.ts` - Export file
  - Optional: `.mdx` documentation, assets

### Tailwind CSS v4
- Recently migrated from v3 to v4
- Uses CSS-first configuration approach
- No `tailwind.config.js` file
- Theme tokens defined in `src/assets/main.css` using `@theme` directives
- Import with `@import "tailwindcss"`

### Theme System
- Default theme (green) and Brius theme (blue)
- Extensive CSS variable system for colors, spacing, typography
- Theme tokens available in `docs/tokens/`

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
Published to GCP npm registry. See `instructions.md` for detailed publishing steps.