# Architecture Research

**Project:** AnaCarolina Design System — Vue 3 to React Migration
**Researched:** 2026-03-13
**Research scope:** How to structure the React equivalent of the existing Vue 3 component library

---

## Recommended Architecture

### Layer Overview

```
Consumer App
  → DesignSystemProvider (new — replaces Vue plugin install)
    → Component Layer (60+ TSX components)
      → Hooks Layer (useControllable, useConfirm, useToast)
      → Internal Components (Overlay, Label, Container, etc.)
        → Utility Layer (utils/index.ts, event.ts — mostly unchanged)
```

### Component Boundaries

| Layer | Talks To | Purpose |
|-------|----------|---------|
| DesignSystemProvider | React Context API | Replaces `app.use(DesignSystem)` plugin pattern. Provides confirm/toast context to all children. |
| Public Components (Button, Input, etc.) | Props/callbacks, hooks, internal components | User-facing API. Each is a standalone TSX file with typed props interface. |
| Hooks (useControllable, useConfirm, etc.) | React state, context | Replace Vue composables. `useControllable` replaces `useOptionalModel`. |
| Internal Components (Overlay, Label, etc.) | Props only | Shared building blocks not exported in public API. Used by multiple public components. |
| Utility Functions | Pure functions, no framework | Color conversion, date ops, validation, masking — zero framework dependency, keep as-is. |
| Event Emitter | Singleton | May be retained for internal pub/sub, but prefer React context for component communication. |

---

## Data Flow Patterns

### 1. Controlled Component Pattern (replaces v-model)

```
Vue:    <Input v-model="name" />
React:  <Input value={name} onChange={setName} />
```

- Parent owns the state, passes `value` and `onChange`
- Component calls `onChange(newValue)` on user interaction
- `useControllable` hook supports both controlled (value+onChange) and uncontrolled (defaultValue) modes
- This is the exact equivalent of Vue's `useOptionalModel` composable

### 2. Provider/Context Pattern (replaces $confirm / $toast)

```
Vue:    this.$confirm({ title: 'Sure?' })  // global property
React:  const { confirm } = useConfirm()   // context hook
```

- `DesignSystemProvider` wraps app, provides `ConfirmProvider` and `ToastProvider`
- Components access via `useConfirm()` and `useToast()` hooks
- Provider renders the actual Confirm/Toast UI (no need for separate mount point)

### 3. Portal Pattern (replaces Teleport)

```
Vue:    <Teleport to="body"><Dialog /></Teleport>
React:  {createPortal(<Dialog />, document.body)}
```

- `react-dom`'s `createPortal` is the direct equivalent
- Overlay/Dialog/Toast components use portals internally
- Consumer doesn't need to know about portals — same as Vue version

---

## Recommended Directory Structure

```
src/
├── index.ts                    # Main entry — exports all components, hooks, utils
├── assets/
│   └── main.css                # Global styles, CSS custom properties (unchanged)
├── components/
│   ├── Button/
│   │   ├── Button.tsx          # Component implementation (.vue → .tsx)
│   │   ├── Button.stories.tsx  # Storybook stories (.ts → .tsx)
│   │   ├── Button.mdx          # Documentation (unchanged)
│   │   ├── Button.test.tsx     # Component tests (new — RTL)
│   │   ├── colors.css          # Component-specific styles (unchanged)
│   │   └── index.ts            # Named export (simplified — no plugin wrapper)
│   ├── Input/
│   ├── Dialog/
│   ├── Select/
│   ├── Table/
│   └── [60+ component directories]/
├── providers/                  # NEW — replaces Vue plugin system
│   ├── DesignSystemProvider.tsx # Root provider (wraps Confirm + Toast providers)
│   ├── ConfirmProvider.tsx      # Confirm dialog context + UI
│   ├── ToastProvider.tsx        # Toast notification context + UI
│   └── index.ts
├── hooks/                      # Replaces composables/
│   ├── useControllable.ts      # Controlled/uncontrolled pattern (replaces useOptionalModel)
│   ├── useConfirm.ts           # Access confirm context
│   ├── useToast.ts             # Access toast context
│   └── index.ts
├── utils/                      # Mostly unchanged
│   ├── index.ts                # Helper functions (color, date, validation)
│   ├── event.ts                # Event emitter (keep for internal use if needed)
│   ├── components/             # Internal components → .tsx
│   │   ├── Label.tsx
│   │   ├── Overlay.tsx
│   │   ├── Container.tsx
│   │   ├── SelectContainer.tsx
│   │   ├── SelectContent.tsx
│   │   ├── Option.tsx
│   │   ├── Group.tsx
│   │   └── ExpandableContainer.tsx
│   └── types/                  # TypeScript types (unchanged)
│       ├── Option.ts
│       ├── DropOption.ts
│       ├── Group.ts
│       ├── SidebarOption.ts
│       └── ContainerModelExtra.ts
└── documentation/              # Documentation markdown (unchanged)
```

### Key Structural Changes

| Vue Pattern | React Equivalent | Notes |
|-------------|-----------------|-------|
| `ComponentName.vue` | `ComponentName.tsx` | SFC → functional component with typed props |
| `index.ts` (Vue plugin export) | `index.ts` (named export) | Remove `app.component()` registration, just `export { Button }` |
| `composables/` | `hooks/` | Convention rename, same concept |
| No providers needed | `providers/` directory | New — React needs explicit context providers |
| `global.d.ts` (Vue augmentation) | Remove entirely | React doesn't need global component type augmentation |

---

## Build Configuration

### Vite Config Changes

```ts
// vite.config.ts
import react from '@vitejs/plugin-react-swc'  // was: import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [react(), tailwindcss(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystem',
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],  // was: ['vue']
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
})
```

### Package.json Exports

```json
{
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

React and ReactDOM must be `peerDependencies` (not dependencies) — prevents duplicate React instances which break hooks.

---

## Build Order (dependency tiers)

Migration should follow this order to avoid circular dependencies:

| Tier | What | Dependencies | Examples |
|------|------|-------------|----------|
| 0 | Pure utilities | None | `utils/index.ts`, `utils/types/*` |
| 1 | Hooks | React only | `useControllable`, `useConfirm`, `useToast` |
| 2 | Internal components | Hooks, utils | Overlay, Label, Container, Option, Group |
| 3 | Atomic/leaf components | Hooks, internals | Button, Input, Icon, Badge, Chip, Toggle, Checkbox, Radio |
| 4 | Composite components | Atomic + internals | Select, Table, DatePicker, ColorPicker, Autocomplete, Tree |
| 5 | Provider-based components | Context, composite | Toast, Confirm, Dialog, DesignSystemProvider |
| 6 | Complex/specialized | All above | RichTextEditor, Crop, Sidebar, Timeline |
| 7 | Infrastructure | All above | Storybook stories, test setup, build config |

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | Do Instead |
|-------------|-------------|-----------|
| Wrapping React in Vue-like abstractions | Creates maintenance burden, confuses React developers | Use native React patterns (hooks, context, portals) |
| Global mutable state (event emitter for UI) | React re-renders based on state, not events | Use React context + state for component communication |
| `forwardRef` everywhere | Most components don't need ref forwarding | Only add `forwardRef` to form inputs and focusable elements |
| Re-exporting all components from index.ts as default | Breaks tree-shaking | Use named exports only |
| CSS-in-JS for styling | Adds runtime overhead, conflicts with Tailwind | Keep Tailwind CSS — it's framework-agnostic |
| Class components | Outdated pattern, no hooks support | Functional components with hooks only |

---

*Architecture research: 2026-03-13*
