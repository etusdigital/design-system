# Technology Stack

**Project:** AnaCarolina Design System — Vue 3 to React Migration
**Researched:** 2026-03-13
**Research scope:** Stack dimension only — React replacement for existing Vue 3 component library

> **Note on versions:** Version numbers are from training data and should be verified against
> the npm registry before pinning. Use `npm view <package> version` or check npmjs.com.

---

## Recommended Stack

### Core Framework

| Technology | Version (verify) | Purpose | Why |
|------------|-----------------|---------|-----|
| react | ^19.1 | UI component runtime | React 19 went stable December 2024; concurrent features are standard. |
| react-dom | ^19.1 | DOM renderer | Must match react version exactly |
| @types/react | ^19.1 | TypeScript definitions | Ships separately from react; must match major version |
| @types/react-dom | ^19.1 | TypeScript definitions | Must match react-dom major version |

**React 18 vs 19:** React 19 is the correct target for new library work started in 2026. Publish `peerDependencies` as `"react": ">=18.0.0"` so consumers still on 18 can use the library.

### Build Tooling

| Technology | Version (verify) | Purpose | Why |
|------------|-----------------|---------|-----|
| vite | ^7.1.2 | Dev server and library build | Already in repo — no change needed |
| @vitejs/plugin-react-swc | ^3.9 | React JSX transform + Fast Refresh | SWC-based is faster than Babel-based for large libraries |
| vite-plugin-dts | ^4.5.4 | Generate `.d.ts` declarations | Already in repo — works identically for React TSX |

**Remove:** `@vitejs/plugin-vue`, `vue-tsc` — Vue-specific.

### TypeScript Configuration

**tsconfig changes required:**

1. Remove `@vue/tsconfig` from devDependencies
2. Add `"jsx": "react-jsx"` to `compilerOptions` — automatic JSX runtime (no `import React` needed)
3. Add `@types/react` and `@types/react-dom`
4. Change `include` globs from `**/*.vue` to `**/*.tsx`, `**/*.ts`
5. Keep `"moduleResolution": "bundler"` — still correct for Vite

### Storybook

| Technology | Version (verify) | Purpose | Why |
|------------|-----------------|---------|-----|
| storybook | 9.1.3 | Documentation framework | Already installed — no version change |
| @storybook/react-vite | ^9.1.3 | React + Vite renderer | Direct drop-in for `@storybook/vue3-vite` |
| @storybook/addon-vitest | ^9.1.3 | Story-based tests | Keep — works identically with React stories |
| @storybook/addon-docs | ^9.1.3 | MDX docs | Keep — renderer-agnostic |
| @storybook/addon-a11y | ^9.1.3 | Accessibility audit | Keep — renderer-agnostic |
| @chromatic-com/storybook | 4.1.1 | Visual regression | Keep — renderer-agnostic |

**Remove:** `@storybook/vue3-vite`, `@storybook/vue3`

### Testing

| Technology | Version (verify) | Purpose | Why |
|------------|-----------------|---------|-----|
| vitest | ^3.2.4 | Test runner | Already in repo — no change |
| @testing-library/react | ^16.3 | Component testing utilities | Standard React testing library |
| @testing-library/user-event | ^14.6 | User interaction simulation | Companion to RTL |
| @testing-library/jest-dom | ^6.6 | Custom DOM matchers | Used with Vitest via setup file |
| jsdom | ^26.0 | DOM environment | Required for Vitest with `environment: 'jsdom'` |

**Remove:** `@vitest/browser`, `playwright` — Re-add only if E2E tests needed later.

### MDI Icons

| Technology | Version (verify) | Purpose | Why |
|------------|-----------------|---------|-----|
| @mdi/js | ^7.4.47 | Icon SVG path data | Already in repo — framework-agnostic |
| @mdi/react | ^1.6.1 | React SVG icon component | Official MDI React wrapper, direct equivalent to `mdi-vue` |

**Remove:** `mdi-vue`

### Styling (unchanged)

| Technology | Version | Purpose | Notes |
|------------|---------|---------|-------|
| tailwindcss | ^4.1.12 | Utility CSS | No change — framework-agnostic |
| @tailwindcss/vite | ^4.1.12 | Vite plugin | No change |
| @tailwindcss/forms | ^0.5.10 | Form styling | No change |
| @tailwindcss/typography | ^0.5.16 | Prose utilities | No change |
| @tailwindcss/aspect-ratio | ^0.4.2 | Aspect ratio | No change |
| normalize.css | ^8.0.1 | CSS reset | No change |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| React JSX plugin | `@vitejs/plugin-react-swc` | `@vitejs/plugin-react` (Babel) | No Babel transforms needed; SWC is faster |
| DOM test environment | `jsdom` | `happy-dom` | happy-dom has more DOM API gaps; jsdom is safer |
| Icon wrapper | `@mdi/react` | `react-icons` | `react-icons` bundles its own MDI copies that may lag behind `@mdi/js` |
| TypeScript JSX | `"jsx": "react-jsx"` | `"jsx": "react"` (classic) | Classic requires `import React` in every file — obsolete since React 17 |

---

## Full Dependency Delta

### Add to `dependencies`
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "@mdi/react": "^1.6.1"
}
```

### Add to `devDependencies`
```json
{
  "@vitejs/plugin-react-swc": "^3.9.0",
  "@types/react": "^19.1.0",
  "@types/react-dom": "^19.1.0",
  "@storybook/react-vite": "^9.1.3",
  "@testing-library/react": "^16.3.0",
  "@testing-library/user-event": "^14.6.0",
  "@testing-library/jest-dom": "^6.6.0",
  "jsdom": "^26.0.0"
}
```

### Remove
```
vue, mdi-vue, @vitejs/plugin-vue, vue-tsc, @vue/tsconfig,
@storybook/vue3-vite, @storybook/vue3, @vitest/browser, playwright
```

### Peer Dependencies (for consumers)
```json
{
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

---

## Confidence Assessment

| Area | Confidence | Reason |
|------|------------|--------|
| Vite (unchanged) | HIGH | Already in repo; framework-agnostic |
| `@vitejs/plugin-react-swc` | MEDIUM | Standard pattern; version not registry-verified |
| React 19 stable | MEDIUM | Went stable Dec 2024; verify at reactjs.org |
| `@storybook/react-vite` | HIGH | Same SB9 family; official React Vite framework |
| RTL + Vitest | MEDIUM | Well-established pattern; versions not registry-verified |
| `@mdi/react` | MEDIUM | Official MDI org package; version not registry-verified |
| Tailwind (unchanged) | HIGH | Framework-agnostic; confirmed no change |

---

*Stack research: 2026-03-13*
