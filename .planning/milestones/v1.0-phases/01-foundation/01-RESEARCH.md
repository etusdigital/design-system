# Phase 1: Foundation - Research

**Researched:** 2026-03-13
**Domain:** React 19 + Vite + Storybook migration from Vue 3
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**CSS Scoping Strategy**
- Tailwind utility classes + component CSS files (keep existing pattern)
- Keep existing `colors.css` filenames — minimize diff with Vue version
- Use `clsx` for conditional class composition in JSX (no tailwind-merge)
- All components accept a `className` prop for consumer customization

**Transition/Animation Approach**
- CSS classes + React state — no extra dependencies (no react-transition-group, no framer-motion)
- Build a shared `useTransition` hook that manages mount/unmount timing via `isMounted` + `isActive` states
- Transition durations must match Vue version exactly (extract from each Vue component's `<Transition>`)
- Hook reused by Dialog, Drawer, Toast, Accordion, ExpandableContainer

**useControllable Hook API**
- Tuple return: `[value, setValue]` — mirrors useState API
- Input options object: `{ value, defaultValue, onChange }`
- React-idiomatic prop naming: `value` + `onChange` (not Vue's `modelValue` + `update:modelValue`)
- Dev mode warnings when switching between controlled and uncontrolled

**Icon Wrapper Design**
- Keep Material Symbols font (Google font) — not switching to @mdi/react SVGs
- Same span-based rendering: `<span class="material-symbols-rounded">{name}</span>`
- Dynamic size via inline `style={{ fontSize: size }}` (not CSS variable)
- Font loaded via CSS @import in main.css (not runtime DOM injection)
- Props: `name`, `size`, `filled`, `className`

**Dark Mode**
- Out of scope — current Vue library has no dark mode, migration doesn't add new features

### Claude's Discretion
- Exact useTransition hook implementation details
- Path alias updates (keep existing aliases, adapt for React/TSX)
- Storybook addon selection for React
- Vitest + RTL configuration details
- index.ts conversion pattern for 57 components

### Deferred Ideas (OUT OF SCOPE)
- Dark mode support — not in Vue version, out of scope for migration. Could be a v2 enhancement.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | React 19 + TypeScript configured (tsconfig with `jsx: react-jsx`) | tsconfig.app.json currently extends `@vue/tsconfig` — must swap base and add jsx setting |
| FOUND-02 | Vite config updated — `@vitejs/plugin-react-swc` replaces `@vitejs/plugin-vue` | vite.config.ts fully documented; plugin swap is a 1-line change plus alias cleanup |
| FOUND-03 | Package.json updated — Vue deps removed, React deps added, peerDependencies set | Current deps fully audited; precise add/remove lists documented in Standard Stack |
| FOUND-04 | `useControllable` hook implemented (replaces `useOptionalModel` composable) | Vue source at `src/composables/OptionalModel.ts` fully read; React translation pattern documented |
| FOUND-05 | `forwardRef` pattern established for form input components | React 19 ref-as-prop behavior documented; forwardRef still needed for React 18 compat, note v2 deferred |
| FOUND-06 | Icon component migrated — `mdi-vue` replaced with Material Symbols font span approach | Icon.vue fully read; span approach confirmed; CSS `font-variation-settings` preserved |
| FOUND-07 | All 57 component `index.ts` files converted from Vue plugin exports to named exports | Pattern identified: remove Plugin/install, keep named export, add `.tsx` component reference |
| FOUND-08 | CSS scoping strategy decided and documented | Decision locked: Tailwind + component CSS files + clsx |
| FOUND-09 | Transition/animation utility established | Decision locked: custom useTransition hook, no external deps |
| FOUND-10 | Storybook migrated from `@storybook/vue3-vite` to `@storybook/react-vite` | Both at v10.2.19 — direct package swap, preview.ts rewrite documented |
| FOUND-11 | Vitest configured with jsdom + React Testing Library | vite.config.ts currently uses browser/Playwright; must add jsdom environment for unit tests |
| FOUND-12 | Main entry `src/index.ts` updated to export all React components | Current pattern documented; new pattern is flat named re-exports from each component index.ts |
</phase_requirements>

---

## Summary

Phase 1 swaps the entire build infrastructure from Vue 3 to React 19 without changing CSS, design tokens, or component structure. The project uses Vite 7, Storybook 9/10 (currently at 10.2.19 on npm), Vitest 3/4, and Tailwind CSS 4. All these tools are framework-agnostic — the migration is primarily a plugin/framework swap, not a tooling rewrite.

The codebase has 57 component directories each with an identical `index.ts` pattern: a Vue Plugin object + named export. All 57 must be converted to plain named exports of TSX components. The Vue composable `useOptionalModel` must become a React `useControllable` hook with the same controlled/uncontrolled semantics. The Icon component uses Material Symbols font (Google font via CSS @import), not MDI SVG icons — confirmed by reading Icon.vue directly. The `@mdi/js` and `mdi-vue` packages in package.json are unused and can be removed.

The critical risk in this phase is breaking two intertwined test setups: Storybook currently uses a browser/Playwright Vitest project for story tests; unit tests with jsdom/RTL must coexist as a separate Vitest project without disrupting the Storybook test setup.

**Primary recommendation:** Execute migrations in dependency order — package.json + tsconfig first, then vite.config.ts, then Storybook, then index.ts bulk conversion, then hooks, then Icon component. Each step is independently verifiable.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react | 19.2.4 | UI framework | Target migration destination |
| react-dom | 19.2.4 | DOM renderer | Pairs with react |
| @types/react | 19.2.14 | TypeScript types | Required for TSX compilation |
| @types/react-dom | 19.2.3 | TypeScript types | Required for ReactDOM types |
| @vitejs/plugin-react-swc | 4.3.0 | Vite React plugin with SWC transpiler | Faster than babel; official Vite recommendation |
| clsx | 2.1.1 | Conditional className composition | Locked decision; lightweight (0.6kB) |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @storybook/react-vite | 10.2.19 | Storybook for React + Vite | Direct replacement for `@storybook/vue3-vite` |
| @storybook/react | 10.2.19 | Storybook React renderer | Required peer for `@storybook/react-vite` |
| @testing-library/react | 16.3.2 | React component testing utilities | FOUND-11; RTL for unit tests |
| @testing-library/jest-dom | 6.9.1 | Custom DOM matchers | Extends Vitest expectations |
| jsdom | 28.1.0 | Browser environment simulation | Vitest environment for unit tests |

### Packages to Remove

These Vue-specific packages must be removed from package.json:

| Package | Location | Reason |
|---------|----------|--------|
| vue | dependencies | Replaced by react + react-dom |
| @vitejs/plugin-vue | devDependencies | Replaced by @vitejs/plugin-react-swc |
| @vue/tsconfig | devDependencies | tsconfig.app.json extends this; must replace base |
| vue-tsc | devDependencies | Replaced by tsc (or keep for Vue files during transition) |
| @storybook/vue3 | devDependencies | Replaced by @storybook/react |
| @storybook/vue3-vite | devDependencies | Replaced by @storybook/react-vite |
| mdi-vue | dependencies | Unused in source (confirmed via CONTEXT.md) |
| @mdi/js | dependencies | Unused in source (confirmed via CONTEXT.md) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @vitejs/plugin-react-swc | @vitejs/plugin-react (babel) | SWC is faster; both work identically for this use case |
| clsx | tailwind-merge | tailwind-merge is for deduplicating Tailwind classes; not needed here (locked: no tailwind-merge) |

### Installation

```bash
# Add React + types
npm install react react-dom
npm install -D @types/react @types/react-dom

# Swap Vite plugin
npm install -D @vitejs/plugin-react-swc

# Add clsx
npm install clsx

# Swap Storybook
npm install -D @storybook/react-vite @storybook/react

# Add testing
npm install -D @testing-library/react @testing-library/jest-dom

# Remove Vue deps
npm uninstall vue mdi-vue @mdi/js
npm uninstall -D @vitejs/plugin-vue @vue/tsconfig vue-tsc @storybook/vue3 @storybook/vue3-vite
```

---

## Architecture Patterns

### Recommended Project Structure

The existing structure is preserved. Only file extensions change from `.vue` to `.tsx` for components:

```
src/
├── assets/
│   └── main.css              # Keep as-is (Tailwind + @import Material Symbols)
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx  # New: replaces ComponentName.vue
│       ├── index.ts           # Changed: remove Plugin/install wrapper
│       ├── ComponentName.stories.tsx  # Changed: .ts -> .tsx, vue3 -> react
│       └── colors.css         # Keep as-is
├── composables/               # Rename to hooks/ OR keep name (discretion)
│   └── useControllable.ts    # New: replaces OptionalModel.ts
├── utils/                     # Keep as-is (framework-agnostic)
└── index.ts                   # Rewrite: named re-exports only
```

### Pattern 1: index.ts Conversion (57 files)

**What:** Remove Vue Plugin wrapper, keep named export, update component import to `.tsx`
**When to use:** Every component directory

Current Vue pattern:
```typescript
// BEFORE: src/components/Button/index.ts
import type { App, Plugin } from 'vue';
import Button from './Button.vue';

export default {
    install(Vue: App) {
        Vue.component('Button', Button);
    },
} as Plugin;

export { Button }
```

New React pattern:
```typescript
// AFTER: src/components/Button/index.ts
export { Button } from './Button';
// or if default export is needed:
export { default as Button } from './Button';
```

**Key insight:** The `default export` of the Vue Plugin object is consumed only by `src/index.ts` install loop — removing it has no consumer impact since consumers use named imports.

### Pattern 2: useControllable Hook

**What:** React equivalent of Vue's `useOptionalModel` composable
**When to use:** Any component that needs both controlled and uncontrolled modes

The Vue composable uses `shallowRef` + `computed` + emit. The React equivalent uses `useState` + a ref to detect controlled-to-uncontrolled switching:

```typescript
// src/hooks/useControllable.ts
import { useState, useRef, useEffect } from 'react';

interface UseControllableOptions<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export function useControllable<T>(
  options: UseControllableOptions<T>
): [T, (value: T) => void] {
  const { value: controlledValue, defaultValue, onChange } = options;
  const isControlled = controlledValue !== undefined;
  const isControlledRef = useRef(isControlled);

  const [internalValue, setInternalValue] = useState<T>(
    defaultValue as T
  );

  // Dev mode warning for switching between controlled/uncontrolled
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (isControlledRef.current !== isControlled) {
        console.warn(
          `[useControllable] Component switched from ${
            isControlledRef.current ? 'controlled' : 'uncontrolled'
          } to ${isControlled ? 'controlled' : 'uncontrolled'}.`
        );
      }
      isControlledRef.current = isControlled;
    });
  }

  const currentValue = isControlled ? (controlledValue as T) : internalValue;

  const setValue = (newValue: T) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return [currentValue, setValue];
}
```

### Pattern 3: forwardRef for Form Inputs (FOUND-05)

**What:** Allow consumers to get a ref to the underlying DOM input element
**When to use:** Input, Textarea, and any component wrapping a native input

```typescript
// src/components/Input/Input.tsx
import { forwardRef } from 'react';

export interface InputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  // ... other props
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ value, defaultValue, onChange, className, ...rest }, ref) {
    // implementation
    return <input ref={ref} className={className} {...rest} />;
  }
);
```

**React 19 note:** React 19 allows passing `ref` as a regular prop, making `forwardRef` optional. However, `forwardRef` is still required for React 18 consumers. The requirement FOUND-05 explicitly calls for `forwardRef` pattern. React 19's ref-as-prop migration is tracked as ENH-02 in v2 requirements and is deferred.

### Pattern 4: Icon Component

**What:** Material Symbols font-based icon using span rendering
**When to use:** All icon rendering in the design system

```tsx
// src/components/Icon/Icon.tsx
interface IconProps {
  name?: string;
  size?: string;
  filled?: boolean;
  className?: string;
}

export function Icon({ name, size = '24px', filled = false, className }: IconProps) {
  return (
    <span
      className={`material-symbols-rounded icon${filled ? ' filled' : ''}${className ? ` ${className}` : ''}`}
      style={{ fontSize: size }}
    >
      {name}
    </span>
  );
}
```

The CSS in `colors.css` / Icon component CSS file handles `font-variation-settings` for filled vs unfilled. Vue's `v-bind(size)` in `<style>` becomes React inline `style={{ fontSize: size }}`.

### Pattern 5: useTransition Hook

**What:** Manages mount/unmount timing with CSS class transitions
**When to use:** Dialog, Drawer, Toast, Accordion, ExpandableContainer

```typescript
// src/hooks/useTransition.ts
import { useState, useEffect, useRef } from 'react';

interface UseTransitionOptions {
  duration: number; // ms — must match Vue component's CSS transition duration
}

export function useTransition(open: boolean, options: UseTransitionOptions) {
  const [isMounted, setIsMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      // Next tick: trigger CSS transition
      const raf = requestAnimationFrame(() => {
        setIsActive(true);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setIsActive(false);
      timerRef.current = setTimeout(() => {
        setIsMounted(false);
      }, options.duration);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [open, options.duration]);

  return { isMounted, isActive };
}
```

Usage: `isMounted` controls whether the component is in the DOM; `isActive` drives CSS class toggling for the enter/leave transition.

### Pattern 6: Storybook React Story

**What:** CSF3 story format for React (replaces Vue3 stories)
**When to use:** All `.stories.tsx` files

```tsx
// AFTER: Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  component: Button,
  argTypes: { /* ... */ },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { /* ... */ },
};
```

### Pattern 7: Main Entry Exports

```typescript
// src/index.ts — after rewrite
import '@/assets/main.css';

// Named re-exports from every component
export { Button } from './components/Button';
export { Icon } from './components/Icon';
export { Input } from './components/Input';
// ... all 57 components

// Named re-exports from hooks
export { useControllable } from './hooks/useControllable';
export { useTransition } from './hooks/useTransition';
```

### Anti-Patterns to Avoid

- **Keeping the Vue Plugin default export:** The `export default { install(Vue) {} }` pattern is Vue-specific. Leaving it causes TypeScript errors in non-Vue contexts. Remove entirely.
- **Using `require()` for CSS imports:** Vite handles `import '@/assets/main.css'` natively in ESM. No CJS workarounds needed.
- **Dynamic CSS variable injection for icon size:** Vue's `v-bind(size)` in `<style>` injects a CSS custom property. In React, use inline styles directly — simpler and equivalent.
- **Importing Vue composables directly:** `src/composables/OptionalModel.ts` imports from `vue`. Once Vue is uninstalled, any file that imports from it will fail. Convert before running `vite build`.
- **Mixing `.vue` and `.tsx` component imports in the same index.ts:** During migration, keep index.ts files consistent — either fully Vue or fully React. Do not create hybrid imports.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Conditional classNames | Custom string concatenation logic | `clsx` | Edge cases with undefined, false, arrays; clsx handles all |
| TSX type declarations | Custom global.d.ts JSX namespace | Automatic with `@types/react` + `jsx: react-jsx` in tsconfig | Types ship with the package |
| Story file format | Custom story loader | CSF3 format (`Meta`, `StoryObj`) from `@storybook/react` | Storybook natively parses CSF3 |

**Key insight:** The existing Vite, Storybook, and Vitest setup is already mature — this migration is configuration changes, not new tooling. Resist adding new tools.

---

## Common Pitfalls

### Pitfall 1: tsconfig `extends` points to Vue base

**What goes wrong:** `tsconfig.app.json` currently extends `@vue/tsconfig/tsconfig.dom.json`. After removing `@vue/tsconfig`, TypeScript compilation fails immediately.
**Why it happens:** `@vue/tsconfig` is a devDependency that must be replaced when Vue is removed.
**How to avoid:** Replace the `extends` with a standard TypeScript DOM base. Either remove `extends` entirely (add dom lib manually) or use a minimal base:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    // ... rest of existing options
  }
}
```
**Warning signs:** `Cannot find module '@vue/tsconfig'` error during `tsc` or Vite startup.

### Pitfall 2: Vitest project config collision (Storybook vs unit tests)

**What goes wrong:** The current `vite.config.ts` has a `test.projects` array with a Storybook browser/Playwright project. Adding a jsdom environment directly to `test` (without a project wrapper) may conflict.
**Why it happens:** Vitest `projects` mode and root `test` config interact differently — a root-level `environment: 'jsdom'` applies to all projects, including the Storybook browser project that needs a real browser environment.
**How to avoid:** Add a second project entry to the `test.projects` array for unit tests:
```typescript
test: {
  projects: [
    {
      // Existing Storybook project (keep unchanged)
      extends: true,
      plugins: [storybookTest({ configDir: '.storybook' })],
      test: {
        name: 'storybook',
        browser: { enabled: true, headless: true, provider: 'playwright', instances: [{ browser: 'chromium' }] },
        setupFiles: ['.storybook/vitest.setup.ts'],
      },
    },
    {
      // New unit test project
      test: {
        name: 'unit',
        environment: 'jsdom',
        include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
        setupFiles: ['./vitest.setup.ts'],
      },
    },
  ],
},
```
**Warning signs:** Unit tests failing with "document is not defined" or Storybook tests failing with browser-specific APIs in wrong environment.

### Pitfall 3: `#components/*` path alias in package.json imports

**What goes wrong:** `package.json` `imports` field has `"#components/*": "./src/components/*/*.vue"`. After migration, `.vue` files no longer exist.
**Why it happens:** The `imports` field in package.json acts as an alias resolver for Node.js module resolution. It points to `.vue` files.
**How to avoid:** Update the pattern to `.tsx`:
```json
"imports": {
  "#composables": "./src/hooks/index.ts",
  "#components/*": "./src/components/*/*.tsx",
  "#utils/*": "./src/utils/*.ts"
}
```
**Warning signs:** `Cannot find module '#components/Button'` at runtime or build time.

### Pitfall 4: vite.config.ts still references `vue` alias

**What goes wrong:** Current vite.config.ts has `resolve.alias` with `'vue': 'vue/dist/vue.esm-bundler.js'`. After removing Vue, this alias causes Vite to error on startup trying to resolve a non-existent package.
**Why it happens:** The alias was added to force Vite to use the full Vue build. Without the vue package, the alias target doesn't exist.
**How to avoid:** Remove the Vue-specific alias. The remaining aliases (`@` and `#`) are framework-agnostic and must be kept.
**Warning signs:** `Cannot find module 'vue/dist/vue.esm-bundler.js'` on `vite dev` or `vite build`.

### Pitfall 5: Storybook preview.ts uses Vue-specific setup

**What goes wrong:** Current `.storybook/preview.ts` uses `setup` from `@storybook/vue3` and `app.use(DesignSystem)`. This entire file must be rewritten — importing `@storybook/vue3` after the package is removed will crash Storybook startup.
**Why it happens:** The `setup` + `app.use()` pattern is Vue's global plugin installation mechanism, which has no React equivalent.
**How to avoid:** Rewrite preview to React-idiomatic form. Remove `setup`, remove `app.use`. Wrap stories in a decorator:
```tsx
// .storybook/preview.tsx
import type { Preview } from '@storybook/react';
import '@/assets/main.css';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'etus';
      return <div className={`${theme}-theme`}><Story /></div>;
    },
  ],
  // ... rest of config (globalTypes, parameters unchanged)
};

export default preview;
```
**Warning signs:** Storybook startup crash with `cannot use 'import.meta' outside a module` or module resolution errors.

### Pitfall 6: `noUnusedLocals` catches Vue-only imports immediately

**What goes wrong:** Current strict TypeScript settings include `noUnusedLocals: true` and `noUnusedParameters: true`. After converting a component, any leftover Vue import (`ref`, `computed`, `defineProps`, etc.) causes a TypeScript error.
**Why it happens:** The migration changes what's imported but strict mode flags unused imports.
**How to avoid:** This is actually useful — use it as a signal that a component conversion is complete. Convert component imports top-to-bottom and expect TS errors to guide cleanup.

---

## Code Examples

### tsconfig.app.json after migration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "#composables": ["src/hooks"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/global.d.ts"]
}
```

### vite.config.ts core plugin change

```typescript
// BEFORE
import vue from '@vitejs/plugin-vue';
plugins: [
  vue({ template: { compilerOptions: { isCustomElement: (tag) => tag == 'ion-icon' } } }),
  tailwindcss(),
  // ...
]

// AFTER
import react from '@vitejs/plugin-react-swc';
plugins: [
  react(),
  tailwindcss(),
  // ...
]
```

Remove `vue` alias from `resolve.alias`. Keep `@` and `#` aliases. Update `rollupOptions.external` from `['vue']` to `['react', 'react-dom']`.

### vite build lib entry for React

```typescript
build: {
  lib: {
    entry: path.resolve(__dirname, 'src/index.ts'),
    name: 'DesignSystem',
    formats: ['es', 'cjs', 'umd'],
    fileName: format => `design-system.${format}.js`,
  },
  rollupOptions: {
    external: ['react', 'react-dom'],
    output: {
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  },
},
```

### vitest setup file for RTL

```typescript
// vitest.setup.ts (new file at root)
import '@testing-library/jest-dom';
```

### useControllable test example (for FOUND-04 verification)

```typescript
// src/hooks/useControllable.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useControllable } from './useControllable';

describe('useControllable', () => {
  it('uses defaultValue in uncontrolled mode', () => {
    const { result } = renderHook(() =>
      useControllable({ defaultValue: 'hello' })
    );
    expect(result.current[0]).toBe('hello');
  });

  it('uses value in controlled mode', () => {
    const { result } = renderHook(() =>
      useControllable({ value: 'controlled' })
    );
    expect(result.current[0]).toBe('controlled');
  });

  it('calls onChange in both modes', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllable({ defaultValue: 'init', onChange })
    );
    act(() => result.current[1]('new'));
    expect(onChange).toHaveBeenCalledWith('new');
  });
});
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@storybook/vue3-vite` | `@storybook/react-vite` | Storybook 7+ | Same addon ecosystem; swap package name only |
| `vue-tsc` for type checking | `tsc` (standard TypeScript compiler) | Always | Remove vue-tsc devDependency; tsc handles TSX natively |
| `@vue/tsconfig` base | Inline tsconfig compilerOptions | This migration | Remove one devDependency; be explicit about lib/target |
| `v-bind(size)` for reactive CSS | `style={{ fontSize: size }}` inline | React | Equivalent output; no CSS variable injection needed |
| Vue Plugin install loop in index.ts | Named re-exports | React | Consumers use `import { Button } from '@etus/design-system'` |
| `forwardRef` wrapper | React 19: ref as prop (v2) | React 19 | FOUND-05 uses forwardRef; v2 removes wrappers (ENH-02 deferred) |

**Deprecated/outdated:**
- `@storybook/addons` v7 in dependencies: The project has `"@storybook/addons": "^7.6.17"` in `dependencies` (not devDependencies). This is a legacy package from Storybook 7. Storybook 9/10 uses `@storybook/manager-api` instead. Remove during package.json cleanup.
- `rollup-plugin-typescript2` in vite.config.ts: This is a Rollup plugin added for declaration generation alongside `vite-plugin-dts`. Evaluate whether it's still needed after switching from Vue to React — `vite-plugin-dts` alone may suffice.

---

## Open Questions

1. **`rollup-plugin-typescript2` necessity**
   - What we know: It's in vite.config.ts with `check: false` and overlaps with `vite-plugin-dts` for declaration output
   - What's unclear: Whether it's required for correct `.d.ts` generation in the React build, or if `vite-plugin-dts` alone is sufficient
   - Recommendation: Attempt build with only `vite-plugin-dts` first. Add `rollup-plugin-typescript2` back only if declaration output is incorrect.

2. **`tsconfig.lib.json` base — still extends `@vue/tsconfig`**
   - What we know: `tsconfig.lib.json` also extends `@vue/tsconfig/tsconfig.dom.json`; after removing that package, lib builds fail
   - What's unclear: Whether lib build needs a separate tsconfig at all vs reusing tsconfig.app.json
   - Recommendation: Mirror the same changes made to tsconfig.app.json in tsconfig.lib.json. Same compilerOptions, same jsx setting.

3. **`src/components/index.ts` (the barrel file)**
   - What we know: `src/index.ts` imports from `'./components'`, which implies `src/components/index.ts` — but this file was not found in directory listing (only `src/components/{ComponentName}/index.ts` files exist)
   - What's unclear: How `* as components` is resolved in the current build
   - Recommendation: Verify whether `src/components/index.ts` exists and what it exports. May need to create it as a barrel or update `src/index.ts` to import each component directly.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.0 |
| Config file | `vite.config.ts` (existing `test` section — must add unit project) |
| Quick run command | `npx vitest run --project unit` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | TSX compiles without errors | build | `npx tsc --noEmit` | ✅ tsconfig.app.json (needs edit) |
| FOUND-02 | `vite build` completes on minimal TSX entry | build | `npx vite build` | ✅ vite.config.ts (needs edit) |
| FOUND-03 | No Vue deps in node_modules, React present | manual | `node -e "require('react')"` | ❌ Wave 0: package.json update |
| FOUND-04 | useControllable supports controlled + uncontrolled | unit | `npx vitest run --project unit src/hooks/useControllable.test.ts` | ❌ Wave 0 |
| FOUND-05 | forwardRef pattern renders ref to DOM input | unit | `npx vitest run --project unit src/components/Input/Input.test.tsx` | ❌ Wave 0 (written per component in later phases) |
| FOUND-06 | Icon renders span with Material Symbols class | unit | `npx vitest run --project unit src/components/Icon/Icon.test.tsx` | ❌ Wave 0 |
| FOUND-07 | 57 index.ts files export named React components | build | `npx tsc --noEmit` (TS will catch Vue Plugin object remnants) | ✅ existing index.ts files (need edit) |
| FOUND-08 | CSS scoping documented (no code test) | manual-only | Code review | N/A |
| FOUND-09 | useTransition isMounted/isActive state machine | unit | `npx vitest run --project unit src/hooks/useTransition.test.ts` | ❌ Wave 0 |
| FOUND-10 | Storybook story renders in browser | e2e | `npm run storybook` + manual check | ✅ .storybook/main.ts (needs edit) |
| FOUND-11 | Vitest jsdom environment configured | build | `npx vitest run --project unit` | ✅ vite.config.ts (needs edit) |
| FOUND-12 | src/index.ts exports all 57 React components | build | `npx tsc --noEmit` | ✅ src/index.ts (needs rewrite) |

### Sampling Rate

- **Per task commit:** `npx tsc --noEmit` (catches import/type errors instantly)
- **Per wave merge:** `npx vitest run --project unit && npx tsc --noEmit`
- **Phase gate:** Full suite green (`npx vitest run`) before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `src/hooks/useControllable.ts` — covers FOUND-04
- [ ] `src/hooks/useControllable.test.ts` — unit tests for controlled/uncontrolled modes
- [ ] `src/hooks/useTransition.ts` — covers FOUND-09
- [ ] `src/hooks/useTransition.test.ts` — unit tests for isMounted/isActive state machine
- [ ] `src/components/Icon/Icon.test.tsx` — covers FOUND-06 (Icon span rendering)
- [ ] `vitest.setup.ts` — root-level setup for @testing-library/jest-dom
- [ ] Second Vitest project entry in `vite.config.ts` for `unit` environment with jsdom

---

## Sources

### Primary (HIGH confidence)

- Direct file reads: `package.json`, `vite.config.ts`, `tsconfig.app.json`, `tsconfig.lib.json`, `.storybook/main.ts`, `.storybook/preview.ts`, `src/index.ts`, `src/composables/OptionalModel.ts`, `src/components/Icon/Icon.vue`, `src/components/Icon/index.ts`, `src/components/Button/index.ts` — actual project source code, ground truth
- `npm view react version` → 19.2.4 (verified live against npm registry)
- `npm view @vitejs/plugin-react-swc version` → 4.3.0 (verified live)
- `npm view @storybook/react-vite version` → 10.2.19 (verified live)
- `npm view @testing-library/react version` → 16.3.2 (verified live)
- `npm view clsx version` → 2.1.1 (verified live)
- `npm view vitest version` → 4.1.0 (verified live)

### Secondary (MEDIUM confidence)

- Storybook CSF3 React format: consistent with known Storybook API patterns, same addons at same version work for React as for Vue
- Vitest multi-project configuration: based on existing `test.projects` pattern in the project's own vite.config.ts + Vitest documentation knowledge

### Tertiary (LOW confidence)

- `rollup-plugin-typescript2` necessity: training knowledge only; needs empirical verification by attempting a build without it

---

## Metadata

**Confidence breakdown:**
- Standard Stack: HIGH — all versions verified live from npm registry
- Architecture: HIGH — based on direct source code reads of actual project files
- Pitfalls: HIGH — identified from direct inspection of specific config files that must change
- Validation: MEDIUM — Vitest multi-project config based on existing project pattern

**Research date:** 2026-03-13
**Valid until:** 2026-04-13 (stable ecosystem; Storybook/Vitest release often but APIs are stable)
