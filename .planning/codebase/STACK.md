# Technology Stack

**Analysis Date:** 2026-03-13

## Languages

**Primary:**
- TypeScript 5.8.3 - Used throughout the codebase for type-safe component and utility development
- Vue 3.5.18 - Vue Single File Components (.vue) for all UI components
- CSS/Tailwind CSS 4.1.12 - Styling via utility-first CSS framework

**Secondary:**
- CommonJS - Configuration files (tailwind.config.cjs, commitlint.config.js)
- HTML/SVG - Templates and inline SVG graphics in Vue components

## Runtime

**Environment:**
- Node.js - Development and build runtime (no specific version constraint, pnpm 9.0+ implied by lockfile)

**Package Manager:**
- pnpm 9.0+ - Primary package manager (indicated by pnpm-lock.yaml lockfileVersion: 9.0)
- Lockfile: Present at `/Users/etus_0032/Desktop/AnaCarolina/design-system/pnpm-lock.yaml`
- Supports npm and yarn as alternatives per README

## Frameworks

**Core:**
- Vue 3 3.5.18 - Frontend framework for component-based UI
- TypeScript - Language layer for type safety

**Testing:**
- Vitest 3.2.4 - Unit and component testing runner
- Playwright 1.55.0 - Browser automation for E2E tests via Vitest browser plugin
- @vitest/browser 3.2.4 - Browser testing integration
- @vitest/coverage-v8 3.2.4 - Code coverage reporting using V8

**Documentation & Storybook:**
- Storybook 9.1.3 - Component documentation and visual testing
- @storybook/vue3-vite 9.1.3 - Vue 3 integration for Storybook
- @storybook/addon-vitest 9.1.3 - Vitest integration for Storybook tests
- @storybook/addon-docs 9.1.3 - Markdown documentation support
- @storybook/addon-a11y 9.1.3 - Accessibility auditing addon
- @chromatic-com/storybook 4.1.1 - Chromatic integration for visual testing
- @storybook/theming 8.6.14 - Custom theme support

**Build/Dev:**
- Vite 7.1.2 - Build tool and development server
- Rollup - Bundler (via Vite)
- rollup-plugin-typescript2 0.34.1 - TypeScript compilation for Rollup
- @rollup/plugin-node-resolve 15.3.1 - Node module resolution for Rollup
- vite-plugin-dts 4.5.4 - Generate TypeScript declaration files
- vue-tsc 3.0.5 - Vue file type checking
- @vitejs/plugin-vue 6.0.1 - Vue support in Vite

## Key Dependencies

**Critical:**
- @mdi/font 7.4.47 - Material Design Icons font (loaded via CDN in index.ts)
- @mdi/js 7.4.47 - Material Design Icons JavaScript library
- mdi-vue 3.0.13 - Vue wrapper for MDI icons
- normalize.css 8.0.1 - CSS normalization

**Tailwind CSS Plugins:**
- @tailwindcss/vite 4.1.12 - Vite integration for Tailwind CSS 4
- @tailwindcss/aspect-ratio 0.4.2 - Aspect ratio utility plugin
- @tailwindcss/forms 0.5.10 - Form styling normalization
- @tailwindcss/typography 0.5.16 - Typography utilities

**Development Only:**
- commitlint 20.0.0 - Git commit message linting
- @commitlint/config-conventional 20.0.0 - Conventional commits config
- husky 9.1.7 - Git hooks framework
- @vue/tsconfig 0.7.0 - Vue TypeScript configuration preset

## Configuration

**Environment:**
- No environment variables required for build or runtime
- Project is a library (not app), so no external service configuration needed
- Configuration via CSS custom properties (CSS variables) for theming

**Build:**
- `vite.config.ts` - Primary build configuration
- `tsconfig.json` - TypeScript configuration (references tsconfig.app.json and tsconfig.node.json)
- `tsconfig.app.json` - Application TypeScript settings with strict mode enabled
- `tsconfig.lib.json` - Library-specific TypeScript compilation settings
- `tsconfig.node.json` - Build tool TypeScript settings
- `tailwind.config.cjs` - Comprehensive Tailwind CSS theme configuration with design tokens
- `.storybook/main.ts` - Storybook configuration
- `.storybook/preview.ts` - Storybook preview settings
- `.storybook/manager.ts` - Storybook manager customization
- `commitlint.config.js` - Commit message validation rules

## Platform Requirements

**Development:**
- Node.js with pnpm 9.0+ (or npm/yarn as alternatives)
- macOS/Linux/Windows with standard development tools
- Git (for version control and husky hooks)

**Production/Distribution:**
- Published as npm package (@etus/design-system)
- Consumers need Node.js with npm/yarn/pnpm for installation
- Browser support: Modern browsers (Vue 3 requirements: ES2020+)
- Exports both ES and UMD formats for maximum compatibility

**Build Output:**
- `lib/design-system.es.js` - ES module format
- `lib/design-system.cjs.js` - CommonJS format
- `lib/design-system.umd.js` - UMD format (main entry)
- `lib/index.css` - Compiled stylesheet with Tailwind CSS
- `lib/main.d.ts` - TypeScript declarations
- `lib/tailwind.config.cjs` - Exported Tailwind configuration for consumers

---

*Stack analysis: 2026-03-13*
