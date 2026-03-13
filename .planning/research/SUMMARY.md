# Project Research Summary

**Project:** AnaCarolina Design System — Vue 3 to React Migration
**Domain:** React component library / design system
**Researched:** 2026-03-13
**Confidence:** MEDIUM-HIGH

## Executive Summary

This project is a full migration of an existing Vue 3 component library (60+ components) to React. The migration is not a rewrite from scratch — the business logic, styling (Tailwind), utilities, and Storybook infrastructure are largely preserved. The primary work is replacing Vue-specific patterns (SFCs, composables, v-model, slots, Teleport, Vue plugins) with their React equivalents (TSX, hooks, controlled props, children/render props, portals, named exports). The recommended approach targets React 19 with peerDependencies set to `>=18.0.0` for backward compat, using Vite with `@vitejs/plugin-react-swc`, Storybook 9's `@storybook/react-vite`, and React Testing Library with Vitest. The styling stack (Tailwind 4, CSS custom properties, component-scoped CSS files) requires no changes.

The migration must follow a strict tier order to avoid cascading failures. The foundation tier — `useControllable` hook, `forwardRef` patterns, icon swap (`mdi-vue` to `@mdi/react`), Vue plugin-to-named-export conversion, CSS scoping strategy, and transition approach — must be complete before any form or stateful component is touched. The provider/context tier (replacing Vue's `$confirm` and `$toast` global properties with `DesignSystemProvider`, `ConfirmProvider`, `ToastProvider`) must be in place before complex overlay components. Complex components (Table, Tree, Select, RichTextEditor) come last and carry the highest risk of subtle bugs.

The key risks are behavioral rather than architectural: Vue's `useOptionalModel` duality (controlled + uncontrolled in one pattern) must be replicated faithfully by a `useControllable` hook built first; Vue's event emitter pattern for cross-component communication is incompatible with React's rendering model and must be fully replaced by context; and Vue's deeply-watched state in Table/Tree/DatePicker will silently break if React's reference-equality `useEffect` is not accounted for. None of these risks are blockers — all have well-established React solutions — but skipping any one of them causes systemic failures across multiple components.

---

## Key Findings

### Recommended Stack

The build tooling core (Vite 7, Tailwind 4, Vitest, Storybook 9, `vite-plugin-dts`) is already in the repo and requires no version changes. The only meaningful tooling swap is replacing `@vitejs/plugin-vue` with `@vitejs/plugin-react-swc` and `@storybook/vue3-vite` with `@storybook/react-vite`. The testing stack requires adding `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, and `jsdom` to replace the Vue-specific test utilities.

**Core technologies:**
- `react@^19.1` + `react-dom@^19.1`: UI runtime — target React 19 stable (Dec 2024), peer-dep to `>=18.0.0`
- `@vitejs/plugin-react-swc@^3.9`: JSX transform — SWC-based, faster than Babel, drop-in for plugin-vue
- `@storybook/react-vite@^9.1.3`: Documentation — same SB9 family, direct drop-in for `@storybook/vue3-vite`
- `@testing-library/react@^16.3` + `jsdom@^26.0`: Testing — standard React component testing, replaces Vue test utils
- `@mdi/react@^1.6.1`: Icons — official MDI React wrapper, near-identical API to `mdi-vue`
- Tailwind CSS 4, `normalize.css`, component CSS files: Styling — completely unchanged, framework-agnostic

See `.planning/research/STACK.md` for full dependency delta (add/remove lists and peer dependency config).

### Expected Features

Eight patterns are table stakes — consumers of any React component library expect them, and their absence causes integration failures. The most critical is `useControllable` (replaces `useOptionalModel`), which underpins all 25+ stateful components. The rest follow a natural dependency order: icon setup, portal pattern, context providers, ref forwarding, `useId`, TypeScript prop interfaces, and children/render props for slot equivalents.

**Must have (table stakes):**
- `useControllable` hook — replaces `useOptionalModel`; every form and stateful component depends on it
- Children and render props — replaces all Vue slot patterns (default, named, scoped)
- Portal pattern (`createPortal`) — replaces `<Teleport to="body">`; required by Dialog, Toast, Dropdown
- Context providers (`DesignSystemProvider`, `ConfirmProvider`, `ToastProvider`) — replaces `$confirm`/`$toast` Vue global properties
- `forwardRef` on all form inputs — replaces Vue's automatic template ref exposure; required for form library compat
- `useId()` — replaces Vue's internal ID generation for label/input associations
- TypeScript prop interfaces — replaces `defineProps<T>()` and `defineEmits`; mechanical but required
- MDI icon integration (`@mdi/react`) — must be resolved before any component using icons

**Should have (differentiators):**
- Compound component pattern (`Select.Option`, `Table.Column`) — more explicit and idiomatic than Vue slot equivalent
- CSS animation/transition system — lightweight approach (CSS class toggling or `react-transition-group`); affects Dialog, Toast, Drawer, Accordion, Dropdown
- Tree-shakeable named exports with `sideEffects: false` — structural, not logic, but important for consumer bundle sizes

**Defer (v2+):**
- CSS-in-JS, state management, form library integration, Server Components, React Native — explicitly out of scope; see FEATURES.md anti-features

### Architecture Approach

The architecture follows a clean 7-tier dependency order: pure utilities (unchanged) → hooks → internal components → atomic/leaf components → composite components → provider-based components → complex/specialized components. The most structurally significant change is the introduction of a `providers/` directory to replace Vue's plugin install pattern, and renaming `composables/` to `hooks/`. All Vue SFCs become TSX functional components. Every `index.ts` plugin export becomes a simple named export. The `global.d.ts` Vue type augmentation is removed entirely.

**Major components:**
1. `DesignSystemProvider` — root context wrapper; replaces `app.use(DesignSystem)`; renders Confirm and Toast UIs internally
2. `useControllable` hook — foundation for all stateful components; supports controlled (value+onChange) and uncontrolled (defaultValue) modes
3. Overlay / Portal utilities — internal components used by Dialog, Toast, Dropdown, Select; wraps `createPortal`
4. 60+ TSX components — one directory each with `ComponentName.tsx`, `ComponentName.stories.tsx`, `ComponentName.test.tsx`, `index.ts` (named export)
5. Utility functions (`utils/`) — color, date, validation, masking; zero framework dependency; kept as-is

### Critical Pitfalls

1. **`useOptionalModel` duality not replicated** — Build `useControllable` first and apply it to every stateful component. Test both controlled and uncontrolled modes explicitly before moving on. If skipped, half the components will be broken for either use pattern.

2. **Event emitter used for UI communication** — The existing `event.emit('open-confirm')` pattern is incompatible with React's rendering model. Replace with React Context + `useReducer` for Toast/Confirm before building those components. Keeping the event emitter for UI will produce components that don't respond to calls or fire twice in Strict Mode.

3. **Vue plugin `install()` exports not converted** — All 60+ `index.ts` files export a Vue plugin object. A bulk conversion pass to simple named exports must happen in the foundation phase. Skipping any one causes `import { Button } from 'design-system'` to return a plugin object or undefined.

4. **Deep watchers silently broken** — Vue's `watch({ deep: true })` tracks nested mutation; React's `useEffect` compares by reference. Table, Tree, and DatePicker components using deep watchers will silently stop reacting to data changes. Prevention: immutable state updates everywhere; `useDeepCompareEffect` where needed.

5. **Scoped slots → render props strategy undefined** — Table's `#[header.value]` dynamic named slots have no direct React equivalent. The column `render` prop strategy (`columns: [{ key, render: (row) => ReactNode }]`) must be decided in planning, not discovered during component migration.

---

## Implications for Roadmap

Based on research, the migration maps naturally to 7 phases following the architecture tier order. Each phase has clear entry/exit criteria and builds on the previous without circular dependencies.

### Phase 1: Foundation
**Rationale:** Seven critical pitfalls (#1, #2, #3, #6, #7, #13, #15) are all foundation-level. Attempting any component migration before this phase produces cascading failures. This phase has no component deliverables — it is infrastructure only.
**Delivers:** `useControllable` hook, `forwardRef` template, `useId` usage pattern, CSS scoping decision, transition/animation strategy, MDI icon swap (`@mdi/react` + `Icon` wrapper), bulk plugin-to-named-export conversion for all `index.ts` files, `tsconfig.json` updated for TSX, `vite.config.ts` updated for React
**Addresses features:** `useControllable`, `forwardRef`, `useId`, MDI integration, tree-shakeable exports (structural)
**Avoids pitfalls:** #1 (controllable), #2 (CSS scoping), #6 (forwardRef), #7 (plugin exports), #13 (transition strategy), #15 (icon swap)

### Phase 2: Atomic / Leaf Components
**Rationale:** Button, Badge, Chip, Toggle, Checkbox, Radio, Avatar, Tag, Icon — these have no dependencies on other components. They validate that foundation patterns work at scale before tackling anything complex. Low risk of blocking failures.
**Delivers:** ~16 production-ready atomic components with stories, RTL tests, and correct TypeScript interfaces
**Uses:** `useControllable`, `forwardRef`, `@mdi/react`, Tailwind, Storybook React stories
**Implements:** Tier 3 of the architecture dependency order
**Avoids pitfalls:** #14 (initialization timing via useState lazy initializer), #12 (TypeScript cast cleanup)

### Phase 3: Form Components
**Rationale:** Input, Textarea, Select (basic), DatePicker (basic), ColorPicker — these are the primary consumers of `useControllable` and `forwardRef`. Separating them from atomic components isolates the controlled/uncontrolled pattern at scale.
**Delivers:** ~10 form components, including first real `useControllable` stress test with multiple v-model bindings
**Addresses features:** Controlled/uncontrolled pattern validated at scale
**Avoids pitfalls:** #11 (multiple v-model → explicit prop pairs), #12 (TypeScript casts)

### Phase 4: Internal Components and Overlay Infrastructure
**Rationale:** Overlay, Label, Container, SelectContainer, SelectContent, Option, Group, ExpandableContainer are shared building blocks for all composite and complex components. Must be done before Dialog, Select (advanced), or Toast.
**Delivers:** All internal components as TSX, Portal wrapper, click-outside detection pattern established
**Implements:** Tier 2 (internal components) of architecture
**Avoids pitfalls:** #8 (onMounted → useLayoutEffect for DOM measurement), #10 (portal event bubbling — onMouseDown on backdrop)

### Phase 5: Provider / Global Services
**Rationale:** `DesignSystemProvider`, `ConfirmProvider`, `ToastProvider` replace the Vue global property pattern entirely. These must be in place before Dialog and complex overlay components.
**Delivers:** `DesignSystemProvider`, `useConfirm`, `useToast` hooks, Confirm UI, Toast UI
**Addresses features:** Context providers, Portal pattern
**Avoids pitfalls:** #3 (event emitter → context), #10 (portal event bubbling)

### Phase 6: Composite Components
**Rationale:** Select (advanced), Autocomplete, Dropdown, Carousel, Collapsible, Accordion, Drawer, Dialog — these depend on overlay infrastructure and providers. They also exercise the transition/animation system.
**Delivers:** ~15 composite components
**Avoids pitfalls:** #9 (nextTick → useLayoutEffect for Carousel), #17 (computedStyleMap → getComputedStyle in Carousel)

### Phase 7: Complex / Specialized Components
**Rationale:** Table, Tree, Sidebar, RichTextEditor, Timeline, Crop — these are the highest-risk components due to deep watch patterns, compound component structure, dynamic slot equivalents (render props), and sortable list key management.
**Delivers:** ~20+ complex components including full Table with sorting/pagination/custom cells
**Avoids pitfalls:** #4 (deep watch → useEffect immutable updates), #5 (scoped slots → render prop column API), #16 (index keys in sortable lists)
**Note:** Render prop API for Table columns must be designed before this phase begins — not during it.

### Phase Ordering Rationale

- Foundation first because 7 of 17 identified pitfalls are foundation-level and compound if skipped
- Atomic before Form because atomic components have no stateful dependencies and validate the build setup
- Overlay infrastructure before Providers because Providers render their UI via portals
- Providers before complex overlays because Dialog/Toast/Confirm require context
- Complex last because they depend on all prior layers and carry the highest behavioral risk

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 7 (Complex Components):** Table's render prop column API design, Tree compound component context structure, and RichTextEditor React integration need upfront API design decisions. Do not start migration without specifying the public API for each.
- **Phase 6 (Composite):** Transition/animation approach needs a concrete decision (CSS class toggling vs `react-transition-group`) with a working proof of concept before migrating Dialog, Toast, and Accordion.

Phases with standard patterns (skip additional research):
- **Phase 1 (Foundation):** All patterns are well-documented React standards. No research needed.
- **Phase 2 (Atomic):** Button, Badge, Chip, Toggle, Checkbox, Radio — straightforward TSX conversion. No research needed.
- **Phase 5 (Providers):** Context + useReducer for Toast/Confirm is a canonical React pattern. No research needed.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Core tooling (Vite, Storybook, Tailwind, Vitest) is HIGH — already in repo. React/RTL versions are MEDIUM — standard but not registry-verified. |
| Features | HIGH | All Vue-to-React pattern mappings are from official React docs or canonical community patterns. Animation approach is the only MEDIUM-confidence item. |
| Architecture | HIGH | Tier order and directory structure are based on direct analysis of existing codebase + standard React library patterns. |
| Pitfalls | HIGH | All 17 pitfalls are grounded in specific Vue patterns found in the codebase (useOptionalModel, Teleport, event.emit, watch deep, etc.) — not generic warnings. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **Version pinning:** All package versions should be verified against npm registry before `package.json` is updated. Use `npm view <package> version` for each. React 19 stable status should be confirmed at reactjs.org.
- **Transition/animation approach:** Research identified `react-transition-group` as the recommended lightweight option, but a proof-of-concept implementation should validate it against the existing Dialog/Toast animation behavior before committing to it across all components.
- **Table render prop API design:** The exact public API for Table column customization (render props vs children function vs slot-like component composition) is not fully specified. This needs a concrete design decision before Phase 7 begins.
- **RichTextEditor dependency:** The existing Vue version's RichTextEditor likely uses a Vue-specific editor package. The React equivalent package needs identification before Phase 7.

---

## Sources

### Primary (HIGH confidence)
- Official React documentation — controlled/uncontrolled components, `useId`, `forwardRef`, `createPortal`, Context API, `useLayoutEffect`
- Official React 19 changelog — ref as regular prop (deprecating `forwardRef`), concurrent features stable
- Storybook 9 official docs — `@storybook/react-vite` framework, addon compatibility

### Secondary (MEDIUM confidence)
- `@mdi/react` npm package — official MDI organization, API modeled on `mdi-vue`
- `@vitejs/plugin-react-swc` — standard Vite ecosystem package, SWC-based JSX transform
- `@testing-library/react` — community standard, extensively documented
- `react-transition-group` — community standard for Vue `<Transition>` equivalence

### Tertiary (LOW confidence / needs validation)
- Exact package versions in STACK.md — all marked "verify against npm registry"
- `computedStyleMap()` non-standard API finding — identified in pitfalls; needs verification against the actual Carousel source

---

*Research completed: 2026-03-13*
*Ready for roadmap: yes*
