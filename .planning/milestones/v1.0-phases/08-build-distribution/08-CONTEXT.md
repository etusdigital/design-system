# Phase 8: Build & Distribution - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

The library builds cleanly in all three output formats (ES, CJS, UMD) with correct TypeScript declarations and is publishable to npm as @etus/design-system@2.0.0. All Vue remnants are purged. Per-component deep imports produce pre-built JS + .d.ts. All component .mdx documentation files updated to reflect React usage.

</domain>

<decisions>
## Implementation Decisions

### CSS delivery
- Separate CSS import: consumers use `import '@etus/design-system/styles.css'`
- Material Symbols Rounded font @import stays bundled in the CSS output (icons work out of the box)
- normalize.css included in the bundled CSS output

### Tree-shaking / deep imports
- Support both main bundle (`import { Button } from '@etus/design-system'`) AND deep per-component imports (`import { Button } from '@etus/design-system/components/Button'`)
- Deep imports resolve to **pre-built JS + .d.ts** files in lib/ (not source .tsx)
- Hooks individually importable too (e.g., `import { useControllable } from '@etus/design-system/hooks/useControllable'`)
- Per-component build output required in the Vite build step

### Vue cleanup (full purge)
- Remove all Vue dependencies from package.json: vue, vue-tsc, @vitejs/plugin-vue, mdi-vue, @vue/tsconfig
- Delete any remaining .vue files in the source tree
- Delete src/composables/ directory (Vue composables — React equivalents are in src/hooks/)
- Remove rollup-plugin-typescript2 from devDependencies (vite-plugin-dts handles declarations)
- Remove any Vue-specific path aliases or config references

### Output formats
- Keep all three: ES, CJS, UMD
- No changes to format strategy

### Version and packaging
- Bump version to 2.0.0 (Vue→React is a major breaking change)
- Keep @etus/design-system package name and scope
- react and react-dom as **peerDependencies only** (remove from dependencies — consumer provides React)

### Build validation
- Run `npm publish --dry-run` to verify publishability
- Verify built files can be imported: require CJS, import ESM, check .d.ts resolves
- Add GitHub Actions CI workflow that runs `build:lib` on every push

### Tailwind config export
- Copy tailwind.config.cjs to lib/ as-is (current behavior)
- Consumer imports and spreads into their own Tailwind config

### MDX documentation
- Update ALL component .mdx files to reflect React usage (imports from .tsx, JSX syntax, hooks instead of composables)
- This is in scope for Phase 8, not deferred to Phase 9

### Claude's Discretion
- Per-component build configuration details (Vite rollup entry points or separate build step)
- CI workflow specifics (triggers, job names, caching)
- Import verification script implementation
- Order of cleanup tasks

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Build configuration
- `vite.config.ts` — Current Vite build config with lib mode, dts plugin, tailwind copy plugin, rollup externals
- `package.json` — Current package manifest with exports field, scripts, dependencies
- `tsconfig.json` — Root TypeScript config (references tsconfig.app.json and tsconfig.node.json)
- `tsconfig.app.json` — Application TypeScript settings (jsx: react-jsx, strict mode)
- `tsconfig.lib.json` — Library build TypeScript settings (excludes stories/tests/composables)

### Design tokens
- `tailwind.config.cjs` — Full Tailwind theme with design tokens (copied to lib/ during build)

### Entry points
- `src/index.ts` — Main entry point re-exporting all components, hooks, and providers

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `vite.config.ts` copyTailwindConfig plugin — already handles tailwind.config.cjs copy to lib/
- `vite.config.ts` generateMainDts plugin — generates main.d.ts re-export wrapper
- `vite-plugin-dts` — already configured to generate .d.ts from src/**/* excluding stories/tests
- `package.json` exports field — already has component and hook deep import paths (currently pointing to source, needs updating to lib/)
- `prepublishOnly` script — already runs build:lib before publish

### Established Patterns
- CSS Modules for component-scoped styles (Accordion, Tree, Table, etc.)
- Plain CSS for portal-rendered components (Dialog, Drawer, Toast)
- `@reference` in component CSS for Tailwind token access
- Each component has `index.ts` barrel with named export

### Integration Points
- `src/components/index.ts` — barrel file exporting all 60+ components
- `src/hooks/index.ts` — barrel file exporting hooks
- `src/providers/index.ts` — barrel file exporting DesignSystemProvider
- `.storybook/main.ts` — Storybook config (affected by .mdx updates)

</code_context>

<specifics>
## Specific Ideas

- react/react-dom currently appear in BOTH dependencies and peerDependencies — must be moved to peerDependencies only
- rollup-plugin-typescript2 is in devDependencies but unused in vite.config.ts — remove
- package.json exports `"./components/*": "./src/components/*/index.ts"` pointing to source — must change to lib/ pre-built paths
- The `build` script runs `tsc -b` which type-checks but doesn't emit — `build:lib` uses `tsc -b tsconfig.lib.json` which also doesn't emit (noEmit: true). Declaration generation is handled by vite-plugin-dts only

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 08-build-distribution*
*Context gathered: 2026-03-23*
