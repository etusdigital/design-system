# Phase 8: Build & Distribution - Research

**Researched:** 2026-03-23
**Domain:** Vite library build, TypeScript declarations, npm packaging, Vue cleanup, MDX documentation
**Confidence:** HIGH

## Summary

Phase 8 is a build hardening and cleanup phase, not a greenfield build setup. The Vite lib-mode build pipeline is already wired: `vite-plugin-dts` generates `.d.ts` files, the `copyTailwindConfig` and `generateMainDts` plugins run at bundle time, rollup externals correctly exclude React, and the `prepublishOnly` script gates publishing on a successful `build:lib`. The work is correction and completion of what already exists, not building from scratch.

Two categories of work dominate: (1) fixing TypeScript errors that currently break `tsc -b tsconfig.lib.json` — 20+ type errors were revealed by running `npm run build:lib` — before Vite can emit; and (2) updating the `package.json` exports map to point `./components/*` and `./hooks/*` at `lib/` pre-built paths rather than `src/` source files, enabling per-component deep imports from consumers without requiring source access. Secondary work includes purging the `src/composables/` directory and `rollup-plugin-typescript2` devDependency, bumping the version to 2.0.0, moving `react`/`react-dom` to peerDependencies-only, updating 57+ `.mdx` documentation files from Vue syntax to React JSX, writing an import verification script, and updating the CI workflow to use `npm`/`pnpm` instead of `yarn`.

The single highest-risk item is the TypeScript type error remediation: `noEmit: true` in tsconfig.lib.json means `tsc -b` only type-checks and does not emit — the Vite build will abort on TS errors before `vite-plugin-dts` ever runs. These errors must be fixed first; all other tasks are independent of each other once the build is green.

**Primary recommendation:** Fix all TypeScript type errors to make `tsc -b tsconfig.lib.json` pass cleanly — that is the build gate for everything else in this phase.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**CSS delivery**
- Separate CSS import: consumers use `import '@etus/design-system/styles.css'`
- Material Symbols Rounded font @import stays bundled in the CSS output (icons work out of the box)
- normalize.css included in the bundled CSS output

**Tree-shaking / deep imports**
- Support both main bundle (`import { Button } from '@etus/design-system'`) AND deep per-component imports (`import { Button } from '@etus/design-system/components/Button'`)
- Deep imports resolve to pre-built JS + .d.ts files in lib/ (not source .tsx)
- Hooks individually importable too (e.g., `import { useControllable } from '@etus/design-system/hooks/useControllable'`)
- Per-component build output required in the Vite build step

**Vue cleanup (full purge)**
- Remove all Vue dependencies from package.json: vue, vue-tsc, @vitejs/plugin-vue, mdi-vue, @vue/tsconfig
- Delete any remaining .vue files in the source tree
- Delete src/composables/ directory (Vue composables — React equivalents are in src/hooks/)
- Remove rollup-plugin-typescript2 from devDependencies (vite-plugin-dts handles declarations)
- Remove any Vue-specific path aliases or config references

**Output formats**
- Keep all three: ES, CJS, UMD

**Version and packaging**
- Bump version to 2.0.0 (Vue to React is a major breaking change)
- Keep @etus/design-system package name and scope
- react and react-dom as peerDependencies only (remove from dependencies — consumer provides React)

**Build validation**
- Run `npm publish --dry-run` to verify publishability
- Verify built files can be imported: require CJS, import ESM, check .d.ts resolves
- Add GitHub Actions CI workflow that runs `build:lib` on every push

**Tailwind config export**
- Copy tailwind.config.cjs to lib/ as-is (current behavior)
- Consumer imports and spreads into their own Tailwind config

**MDX documentation**
- Update ALL component .mdx files to reflect React usage (imports from .tsx, JSX syntax, hooks instead of composables)
- This is in scope for Phase 8, not deferred to Phase 9

### Claude's Discretion

- Per-component build configuration details (Vite rollup entry points or separate build step)
- CI workflow specifics (triggers, job names, caching)
- Import verification script implementation
- Order of cleanup tasks

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DIST-01 | Library builds successfully in ES, CJS, UMD formats | Fix 20+ TS type errors to unblock `tsc -b tsconfig.lib.json`; Vite lib mode already configured for es/cjs/umd in `vite.config.ts` |
| DIST-02 | TypeScript declarations generated correctly for all components | `vite-plugin-dts` already configured with correct `include`/`exclude`; blocked by same TS errors as DIST-01; `generateMainDts` plugin writes `lib/main.d.ts` re-export |
| DIST-03 | Tailwind config exported for consumers | `copyTailwindConfig` plugin already copies to `lib/`; `package.json` exports `"./tailwind.config.cjs"` entry already exists |
| DIST-04 | Package publishable to npm as @etus/design-system | Requires: fix exports map to point at `lib/` (not `src/`); bump version to 2.0.0; move react/react-dom to peerDeps only; remove rollup-plugin-typescript2; `prepublishOnly` script already runs build:lib |
</phase_requirements>

---

## Standard Stack

### Core (already installed — no new installs required)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vite | ^7.1.2 | Library bundler (lib mode) | Already configured; Rollup under the hood for lib builds |
| vite-plugin-dts | ^4.5.4 | TypeScript declaration generation | Already configured; single-pass `.d.ts` generation aligned with Vite build |
| @vitejs/plugin-react-swc | ^4.3.0 | JSX/TSX transform | Already installed; SWC is faster than babel |
| @tailwindcss/vite | ^4.1.12 | Tailwind v4 processing | Already configured; handles CSS Module `@reference` directives |
| typescript | ~5.8.3 | Type checking (tsc -b) | Type check only — Vite handles emit |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @rollup/plugin-node-resolve | ^15.3.1 | Resolve .ts/.tsx in rollup pass | Already in rollupOptions.plugins; needed for lib mode |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| vite-plugin-dts (single build) | tsup separate build | tsup adds complexity; current vite-plugin-dts is already working |
| per-component rollup entries | separate tsc emit per component | Rollup multi-entry is simpler; tsc composite project approach has more overhead |

**Installation:** No new packages needed. Removal only: `rollup-plugin-typescript2`.

```bash
npm uninstall rollup-plugin-typescript2
```

---

## Architecture Patterns

### Current lib/ Output (what `vite build` currently produces)

```
lib/
├── design-system.es.js       # ES module bundle
├── design-system.cjs.js      # CommonJS bundle
├── design-system.umd.js      # UMD bundle
├── index.css                 # All component styles concatenated
├── main.d.ts                 # Re-export wrapper (written by generateMainDts plugin)
├── index.d.ts                # Main entry declarations (written by vite-plugin-dts)
├── components/               # Per-component .d.ts (written by vite-plugin-dts)
│   └── Button/
│       └── index.d.ts
├── hooks/                    # Hook .d.ts
│   └── useControllable.d.ts
└── tailwind.config.cjs       # Design tokens config (written by copyTailwindConfig plugin)
```

After this phase, per-component deep imports must resolve to **pre-built JS** (not source). This means the exports map needs updating AND the Vite build must produce per-component JS files in addition to the main bundle.

### Pattern 1: Vite Lib Mode Multi-Entry for Per-Component JS

**What:** Add multiple rollup `input` entries to produce per-component JS files alongside the main bundle.
**When to use:** Required for `"./components/*": "./lib/components/*/index.js"` to resolve to pre-built output.

**Example:**
```typescript
// vite.config.ts rollupOptions.input — add component entries
input: {
  main: path.resolve(__dirname, 'src/index.ts'),
  // Add per-component entries programmatically
  'components/Button/index': path.resolve(__dirname, 'src/components/Button/index.ts'),
  // ... or use glob to generate all entries
},
```

The idiomatic approach for 60+ components is to generate entries programmatically using Node's `fs.readdirSync` or `glob` in `vite.config.ts`:

```typescript
import { readdirSync } from 'fs';
import { resolve } from 'path';

const componentEntries = Object.fromEntries(
  readdirSync(resolve(__dirname, 'src/components'), { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => [
      `components/${d.name}/index`,
      resolve(__dirname, `src/components/${d.name}/index.ts`)
    ])
);

// Also add hook entries
const hookEntries = Object.fromEntries(
  readdirSync(resolve(__dirname, 'src/hooks'))
    .filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts'))
    .map(f => [`hooks/${f.replace('.ts','')}`, resolve(__dirname, `src/hooks/${f}`)])
);
```

### Pattern 2: Package.json Exports Map Update

**What:** Change `./components/*` and `./hooks/*` exports to point at built `lib/` paths.
**Current (wrong):**
```json
"./components/*": "./src/components/*/index.ts",
"./hooks/*": "./src/hooks/*.ts"
```
**Correct (after build produces per-component JS):**
```json
"./components/*": {
  "types": "./lib/components/*/index.d.ts",
  "import": "./lib/components/*/index.es.js",
  "require": "./lib/components/*/index.cjs.js"
},
"./hooks/*": {
  "types": "./lib/hooks/*.d.ts",
  "import": "./lib/hooks/*.es.js",
  "require": "./lib/hooks/*.cjs.js"
}
```

Note: Exact file naming depends on rollup `chunkFileNames`/`entryFileNames` configuration. With multi-entry, the output naming pattern should be set explicitly to avoid hash-suffixed filenames.

### Pattern 3: rollup entryFileNames for Stable Filenames

**What:** Configure rollup `output.entryFileNames` to produce predictable filenames for per-component entries.
**Why:** Without this, rollup may suffix with hashes or use unexpected paths.

```typescript
output: {
  entryFileNames: '[name].[format].js',
  // This produces: components/Button/index.es.js, components/Button/index.cjs.js
}
```

### Pattern 4: TypeScript Error Remediation

The `tsc -b tsconfig.lib.json` currently fails with 20+ type errors. These must be fixed before `vite build` runs (the `build:lib` script runs `tsc -b` first). The errors found fall into these categories:

| Error Pattern | Root Cause | Fix |
|---------------|------------|-----|
| `'child.props' is of type 'unknown'` (Input, TagInput, Tooltip, FileUpload) | `React.Children.map` children typed as `unknown` in React 18+ | Cast: `(child as React.ReactElement).props` or use `React.isValidElement(child)` guard |
| `Property 'style' does not exist on type IconProps` (ColorPicker, Profile) | Icon component lacks `style` prop | Add `style?: React.CSSProperties` to IconProps |
| `Property 'size' does not exist on type IconProps` (Profile) | Icon component lacks `size` prop | Add `size?: string` to IconProps or use className for sizing |
| `Property 'placeholder' does not exist` on div (RichTextEditor) | `contentEditable` divs don't accept `placeholder` in React types | Use `data-placeholder` attribute + CSS pseudo-element |
| `'findLastIndex' does not exist` (Pagination) | `Array.prototype.findLastIndex` is ES2023; tsconfig.lib.json targets ES2020 | Upgrade `lib` to `["ES2023", "DOM", "DOM.Iterable"]` or implement inline |
| `'e' declared but never read` (Sidebar), `'parent'` (Tree), `'useRef'` (Colors), etc. | `noUnusedLocals`/`noUnusedParameters` is strict | Remove unused declarations or prefix with `_` |
| `'Label' declared but never read` (FileUpload) | Unused import | Remove import |
| `Expected 1 arguments, but got 0` (TagInput) | Function called without required arg | Fix the call site |
| `Type 'unknown' not assignable to ReactNode` (Profile) | Untyped children access pattern | Add type guard or explicit cast |
| `'tooltipMinWidth' declared but never read` (MetricCard) | Unused variable | Remove variable |
| `Type 'Function' not assignable to MouseEventHandler` (Icon) | onClick typed as `Function` | Type as `React.MouseEventHandler<HTMLSpanElement>` |
| `'useClickOutside' declared but never read` (Container.tsx) | Unused import | Remove import |

### Pattern 5: CI Workflow Update

**What:** The existing `main.yml` uses `yarn` commands (`yarn install --frozen-lockfile`, `yarn build`). The project uses `npm` (package-lock.json present) — or may use `pnpm` (check lock file). CI must use the correct package manager.

**Current:** `yarn install --frozen-lockfile` + `yarn build`
**Required check:** Verify lock file present — `package-lock.json` → use `npm ci`; `pnpm-lock.yaml` → use `pnpm install --frozen-lockfile`.

**Build step must run `build:lib` not `build`** (build runs `tsc -b && vite build` — includes Storybook types; `build:lib` uses `tsconfig.lib.json` which excludes stories/tests).

### Pattern 6: Import Verification Script

**What:** A Node.js script that verifies the built lib/ can be consumed in all three formats.
**Pattern:**
```javascript
// scripts/verify-imports.cjs
const { createRequire } = require('module');

// Test CJS
const ds = require('./lib/design-system.cjs.js');
console.assert(typeof ds.Button === 'function', 'CJS: Button export missing');

// Test deep imports
const btn = require('./lib/components/Button/index.cjs.js');
console.assert(typeof btn.Button === 'function', 'CJS deep: Button export missing');

// Test .d.ts files exist
const fs = require('fs');
console.assert(fs.existsSync('./lib/main.d.ts'), 'main.d.ts missing');
console.assert(fs.existsSync('./lib/index.d.ts'), 'index.d.ts missing');
console.assert(fs.existsSync('./lib/tailwind.config.cjs'), 'tailwind.config.cjs missing');
```

### MDX Documentation Update Pattern

**Scope:** 57 component `.mdx` files and 3 documentation `.mdx` files (60 total). Search shows 57 of 60 contain Vue-specific syntax (confirmed by grep). All code blocks labeled ` ```vue ` need to become ` ```tsx `.

**Transform required per file:**
1. Replace ` ```vue ` code fences with ` ```tsx `
2. Replace `<template>` / `</template>` wrappers — remove them, the JSX is the template
3. Replace `@click="handler"` → `onClick={handler}`
4. Replace `:prop="value"` (v-bind) → `prop={value}`
5. Replace `v-model="val"` → `value={val} onChange={(v) => setVal(v)}`
6. Replace `v-if="cond"` → `{cond && <Component />}`
7. Replace `v-for` → `.map()`
8. Replace Vue slot syntax (`#slotName`) → React children or named render props
9. Replace `<script setup>` / `defineProps` blocks — remove entirely
10. Replace event names from `@event` to `onEvent` naming
11. Update imports at top of MDX: `import * as ComponentName from './ComponentName.stories.tsx'` (already React in most cases — verify each)

**Batching strategy:** The 57 files can be split into groups of ~10 per plan based on component category (atomic, form, composite, complex, etc.) to keep each plan's diff reviewable.

### Anti-Patterns to Avoid

- **Pointing exports map at `src/` files:** The `"./components/*": "./src/components/*/index.ts"` entry works only during development with Vite's dev server resolving TS. Published packages expose `lib/`. Must point at `lib/`.
- **Using `noEmit: true` in tsconfig for declaration generation:** tsconfig.lib.json has `noEmit: true` — this is intentional because `vite-plugin-dts` handles emission. Do NOT set `noEmit: false` or add `declarationDir` to tsconfig.lib.json; that causes double-emission conflicts.
- **Generating UMD with multiple entries:** UMD format requires a single entry point (the `name` config becomes the global variable). When adding multi-entry, only generate `es` and `cjs` for per-component outputs. The UMD bundle remains single-entry only.
- **CSS Module hash classes in built output:** CSS Modules generate hashed class names — these are stable between builds but must not be relied on by consumers. The existing pattern (classname applied to root element + `className` prop passthrough) is correct.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| TypeScript declaration generation | Custom tsc postprocess scripts | `vite-plugin-dts` (already installed) | Handles path aliasing, re-exports, composite project setup |
| CSS extraction from components | Custom PostCSS pipeline | Vite's built-in `cssCodeSplit: true` | Already configured; handles CSS Modules and plain CSS correctly |
| Package exports validation | Custom file-existence checker | `npm publish --dry-run` + `publint` (optional) | dry-run validates the manifest; publint is an optional lint tool |
| Font bundling | Manually copying font files | `@import` in CSS (already implemented) | Material Symbols Rounded is served from Google Fonts CDN via `@import` |

**Key insight:** The build infrastructure is 90% complete. The work is fixing what's broken (TS errors, exports map, Vue remnants) and adding what's missing (per-component JS output, MDX updates, import verification).

---

## Common Pitfalls

### Pitfall 1: `noEmit: true` + `tsc -b` means TS errors abort the entire build:lib script

**What goes wrong:** `build:lib` runs `tsc -b tsconfig.lib.json && vite build --mode production`. Because `&&` chains the commands, any TS type error causes `tsc -b` to exit non-zero and `vite build` never runs. The current 20+ type errors will prevent any build output.
**Why it happens:** TypeScript type-checking is strict (`noUnusedLocals: true`, `noUnusedParameters: true`, `strict: true`). Errors that were invisible during Storybook dev (Vite skips type-checking in dev mode) are fatal in `build:lib`.
**How to avoid:** Fix all type errors FIRST, in a dedicated plan, before tackling any other build tasks.
**Warning signs:** `tsc -b` exits with code 2; `lib/` directory either empty or contains only previous build artifacts.

### Pitfall 2: Multi-entry rollup + UMD = build failure

**What goes wrong:** UMD format with multiple inputs is not supported by Rollup. Rollup will error when trying to produce a UMD bundle from multiple entry points.
**Why it happens:** UMD bundles need a single global variable name (`name: 'DesignSystem'`). Multiple entries would need multiple globals.
**How to avoid:** Scope multi-entry (per-component) outputs to `formats: ['es', 'cjs']` only. Keep the main `design-system.umd.js` as a separate single-entry output. This may require splitting into two `build.lib` configurations or a post-build step.
**Warning signs:** `Error: "output.name" is required when there is more than one top-level export` or similar Rollup UMD errors.

**Recommended approach (Claude's discretion):** Use a single Vite build config but configure rollup outputs conditionally — produce es + cjs for multi-entry, generate umd separately in a second vite build invocation, or produce UMD only from the main entry within the same rollupOptions.

### Pitfall 3: `exports` map wildcard patterns require Node.js 12.20+ / `exports` spec compliance

**What goes wrong:** Wildcard patterns like `"./components/*"` are supported in Node 12.20+ but some older bundlers or TypeScript resolve modes may not handle them.
**Why it happens:** The `exports` field wildcard (`*`) is relatively recent. TypeScript's `moduleResolution: 'bundler'` handles it correctly. Consumers using `moduleResolution: 'node'` (classic) may not see the types.
**How to avoid:** Include `"types"` condition in each wildcard export entry. Test with `tsc --moduleResolution bundler` and document that consumers need `moduleResolution: bundler` or `node16` in their tsconfig.

### Pitfall 4: `package.json` has react/react-dom in BOTH dependencies AND peerDependencies

**What goes wrong:** npm may include React in the published bundle as a dependency, causing consumers to install two copies of React. This breaks React hooks (different React instances).
**Why it happens:** Currently `react: "^18.0.0 || ^19.0.0"` appears in both `dependencies` and `peerDependencies`. npm uses `dependencies` for installation even when `peerDependencies` specifies the same package.
**How to avoid:** Remove react and react-dom from `dependencies` entirely; keep only in `peerDependencies`. Also ensure Tailwind CSS plugins (@tailwindcss/vite, @tailwindcss/forms, etc.) are moved to `devDependencies` — they are build-time only.
**Warning signs:** `npm publish --dry-run` shows react in `dependencies`; consumer app shows React hook errors.

### Pitfall 5: CI workflow uses yarn but project uses npm/pnpm

**What goes wrong:** `yarn install --frozen-lockfile` will fail in CI if only `package-lock.json` exists (no `yarn.lock`). The workflow calls `yarn build` which won't resolve scripts.
**Why it happens:** The existing `main.yml` was written for a yarn workflow. The project currently uses npm (package-lock.json detected).
**How to avoid:** Update CI to use `npm ci` (equivalent to `--frozen-lockfile`). Check for `pnpm-lock.yaml` — if present, use `pnpm install --frozen-lockfile`.
**Warning signs:** CI fails on `yarn install` step with "yarn.lock not found".

### Pitfall 6: Tailwind v4 CSS output with per-component CSS splitting

**What goes wrong:** Tailwind v4 generates a single utility stylesheet at build time. With `cssCodeSplit: true`, Vite may split CSS per chunk. Per-component JS files may have associated `.css` files that consumers must import separately, or the styles may be missing.
**Why it happens:** Tailwind v4 integrates differently from v3 — it generates CSS based on content scanning at build time via `@tailwindcss/vite`. With chunked CSS output, the utilities file may not be automatically associated with per-component bundles.
**How to avoid:** Verify after build that `lib/index.css` contains all necessary Tailwind utilities. Confirm the single `import '@etus/design-system/styles.css'` import pattern covers all component styles. Document for consumers that they must import `styles.css` once globally.

### Pitfall 7: `src/composables/` directory still exists and is referenced in tsconfig.lib.json exclude

**What goes wrong:** tsconfig.lib.json currently excludes `src/composables/**`. If `src/composables/` is deleted, the exclusion becomes a harmless no-op. But the path alias `#composables` in vite.config.ts points at `src/hooks` — if any file imports `#composables` with the composables directory still present, it resolves to `src/hooks`. Deletion has no functional impact on the build, but must be done to satisfy the Vue purge requirement.
**How to avoid:** Delete `src/composables/` directory as part of the Vue cleanup plan. Remove the `src/composables/**` exclude from tsconfig.lib.json since it will no longer exist.

---

## Code Examples

### Programmatic multi-entry generation in vite.config.ts

```typescript
// Source: Vite official docs - Library Mode with multiple entries
import { readdirSync, existsSync } from 'fs';
import { resolve } from 'path';

function buildComponentEntries(srcDir: string): Record<string, string> {
  const entries: Record<string, string> = {};
  const componentsDir = resolve(srcDir, 'components');

  if (existsSync(componentsDir)) {
    readdirSync(componentsDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && existsSync(resolve(componentsDir, d.name, 'index.ts')))
      .forEach(d => {
        entries[`components/${d.name}/index`] = resolve(componentsDir, d.name, 'index.ts');
      });
  }
  return entries;
}

function buildHookEntries(srcDir: string): Record<string, string> {
  const entries: Record<string, string> = {};
  const hooksDir = resolve(srcDir, 'hooks');

  if (existsSync(hooksDir)) {
    readdirSync(hooksDir)
      .filter(f => f.endsWith('.ts') && !f.includes('.test.') && f !== 'index.ts')
      .forEach(f => {
        entries[`hooks/${f.replace('.ts', '')}`] = resolve(hooksDir, f);
      });
  }
  return entries;
}
```

### Fixing `child.props is of type unknown` (React 18+ pattern)

```typescript
// Source: React TypeScript docs - children iteration
import React from 'react';

// Pattern: type guard before accessing props
React.Children.forEach(children, (child) => {
  if (React.isValidElement(child)) {
    const props = child.props as { value?: string; label?: string };
    // now props is typed
  }
});
```

### npm publish dry-run verification

```bash
# Run from project root after build:lib succeeds
npm publish --dry-run 2>&1 | grep -E "(npm notice|error)"
# Should show files that would be published (lib/, README.md, package.json)
# Should NOT show: src/, node_modules/, Vue-related files
```

### Exports map with per-component conditional exports

```json
{
  "exports": {
    ".": {
      "types": "./lib/main.d.ts",
      "import": "./lib/design-system.es.js",
      "require": "./lib/design-system.umd.js"
    },
    "./components/*": {
      "types": "./lib/components/*/index.d.ts",
      "import": "./lib/components/*/index.es.js",
      "require": "./lib/components/*/index.cjs.js"
    },
    "./hooks/*": {
      "types": "./lib/hooks/*.d.ts",
      "import": "./lib/hooks/*.es.js",
      "require": "./lib/hooks/*.cjs.js"
    },
    "./styles.css": "./lib/index.css",
    "./tailwind": "./lib/tailwind.config.cjs",
    "./tailwind.config.cjs": "./lib/tailwind.config.cjs"
  }
}
```

Note: The exact JS filename suffixes (`.es.js`, `.cjs.js`) depend on `output.entryFileNames` configuration. Coordinate between vite.config.ts and package.json.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `rollup-plugin-typescript2` for declarations | `vite-plugin-dts` | Phase 1 (already done) | rpt2 removed from plugins; vite-plugin-dts generates .d.ts |
| Vue plugin install pattern | React named exports | Phase 1 (already done) | src/index.ts now re-exports React components |
| `@vitejs/plugin-vue` | `@vitejs/plugin-react-swc` | Phase 1 (already done) | SWC-based React transform |
| Tailwind v3 config | Tailwind v4 with `@tailwindcss/vite` | Phase 1 (already done) | CSS generation changes; tailwind.config.cjs is for consumers, not Vite's v4 pipeline |
| yarn CI | npm CI | Phase 8 (this phase) | Update main.yml |

**Deprecated/outdated in this project:**
- `rollup-plugin-typescript2` in devDependencies: installed but not used in vite.config.ts — remove
- `src/composables/` directory: Vue composables no longer needed — delete
- `"./components/*": "./src/components/*/index.ts"` exports entry: points at source, not built output — update

---

## Open Questions

1. **Per-component UMD output**
   - What we know: Rollup cannot produce UMD with multiple inputs
   - What's unclear: Whether consumers need per-component UMD (unlikely — UMD is typically for CDN/global use with the full bundle)
   - Recommendation: Skip UMD for per-component outputs; only es + cjs per-component. Document this.

2. **Exact output filename pattern for multi-entry**
   - What we know: `entryFileNames: '[name].[format].js'` would produce `components/Button/index.es.js`
   - What's unclear: Whether this naming causes any collision with vite-plugin-dts output
   - Recommendation: Test in Wave 1 (build fix plan) and adjust if needed. The exports map and entryFileNames must match.

3. **CSS per-component splitting behavior**
   - What we know: `cssCodeSplit: true` is configured; Tailwind v4 generates utilities CSS via `@tailwindcss/vite`
   - What's unclear: Whether per-component CSS files are produced or all CSS stays in `index.css`
   - Recommendation: Verify after first successful multi-entry build; keep consumer-facing `import 'styles.css'` pattern regardless.

4. **pnpm vs npm lock file**
   - What we know: `package.json` exists; `main.yml` currently uses yarn
   - What's unclear: Whether `package-lock.json` or `pnpm-lock.yaml` is the authoritative lock file
   - Recommendation: Check project root for lock files before updating CI workflow.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 3.2.4 (unit project, jsdom) |
| Config file | `vite.config.ts` (test.projects[1]) |
| Quick run command | `npx vitest run --project unit` |
| Full suite command | `npx vitest run --project unit` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DIST-01 | `vite build` produces es/cjs/umd without errors | smoke (build script) | `npm run build:lib` exits 0 | ✅ (script exists) |
| DIST-01 | Output files exist in lib/ after build | smoke (file check) | `node scripts/verify-imports.cjs` | ❌ Wave 0 |
| DIST-02 | `.d.ts` files generated for all components | smoke (file check) | Part of verify-imports script | ❌ Wave 0 |
| DIST-03 | `lib/tailwind.config.cjs` exists and is importable | smoke (file check) | Part of verify-imports script | ❌ Wave 0 |
| DIST-04 | `npm publish --dry-run` completes without error | smoke (npm command) | `npm publish --dry-run 2>&1 \| grep -v "npm notice"` exits 0 | ✅ (command, no script) |
| DIST-04 | No Vue dependencies in published manifest | static check | `node -e "const p=require('./package.json');..."` | ✅ (manual) |

### Sampling Rate

- **Per task commit:** `npm run build:lib` (fast check that build still passes)
- **Per wave merge:** `npm run build:lib && node scripts/verify-imports.cjs && npm publish --dry-run`
- **Phase gate:** All three commands green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `scripts/verify-imports.cjs` — covers DIST-01 file output verification, DIST-02 .d.ts existence, DIST-03 tailwind config

*(No test framework install needed — Vitest already configured)*

---

## Sources

### Primary (HIGH confidence)

- Direct code inspection: `vite.config.ts`, `package.json`, `tsconfig.lib.json`, `tsconfig.app.json` — actual current build configuration
- Direct build output: `npm run build:lib` execution — revealed 20+ specific TS type errors with file/line locations
- Direct file system inspection: `src/composables/` exists, 57 MDX files contain Vue syntax, no .vue files remain
- `package.json` dependency audit: No Vue packages in dependencies/devDependencies/peerDependencies

### Secondary (MEDIUM confidence)

- Vite library mode documentation pattern for multi-entry builds — standard Vite lib mode configuration
- Node.js exports map wildcard specification — well-established npm/Node behavior
- Rollup UMD limitation with multiple entries — known Rollup constraint

### Tertiary (LOW confidence)

- Tailwind v4 CSS splitting behavior with per-component entries — not directly verified; needs testing in practice

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — directly inspected installed packages and config files
- Architecture (build config): HIGH — direct code inspection reveals exact current state and what needs changing
- TS type errors: HIGH — actually ran `npm run build:lib` and captured exact errors with file/line numbers
- MDX scope: HIGH — directly counted 60 MDX files, 57 containing Vue syntax via grep
- Multi-entry Vite pattern: MEDIUM — standard Vite pattern, not directly tested in this project yet
- CI update: MEDIUM — existing workflow inspected; lock file type needs verification

**Research date:** 2026-03-23
**Valid until:** 2026-04-22 (stable toolchain — Vite, TypeScript, npm packaging APIs change slowly)
