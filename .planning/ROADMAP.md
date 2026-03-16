# Roadmap: AnaCarolina Design System — Vue to React Migration

## Overview

A full in-place migration of 60+ Vue 3 components to React, proceeding in strict dependency order: tooling foundation first, then atomic leaf components, then form components, then overlay infrastructure, then context providers, then composite components, then complex specialized components, and finally build output validation and documentation. Each phase builds on the previous without circular dependencies. The migration is complete when every component renders identically to its Vue counterpart and the npm package publishes cleanly.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Foundation** - Tooling, hooks, and infrastructure that every component depends on
- [ ] **Phase 2: Atomic Components** - 20 leaf components with no stateful or overlay dependencies
- [x] **Phase 3: Form Components** - 12 controlled/uncontrolled form inputs using `useControllable` (completed 2026-03-16)
- [ ] **Phase 4: Internal Components** - 8 shared utility components and portal infrastructure
- [ ] **Phase 5: Providers** - Context providers replacing Vue global properties (`$confirm`, `$toast`)
- [ ] **Phase 6: Composite Components** - 17 overlay and interactive components depending on Phases 4 and 5
- [ ] **Phase 7: Complex Components** - 6 high-risk specialized components (Table, Tree, RichTextEditor, etc.)
- [ ] **Phase 8: Build & Distribution** - Build output validation, TypeScript declarations, npm publishability
- [ ] **Phase 9: Documentation & Testing** - Storybook stories, RTL tests, visual parity verification

## Phase Details

### Phase 1: Foundation
**Goal**: The React build infrastructure and shared patterns are in place so any component can be built without tooling friction
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08, FOUND-09, FOUND-10, FOUND-11, FOUND-12
**Success Criteria** (what must be TRUE):
  1. `vite build` completes without errors on a minimal React TSX entry point
  2. A Storybook story written in `.stories.tsx` renders correctly in the browser
  3. `useControllable` hook supports both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`) modes, verified by a Vitest test
  4. An Icon component renders an MDI icon via `@mdi/react` with the same visual output as the Vue `mdi-vue` version
  5. All 57 component `index.ts` files export named React components (no Vue plugin objects remain)
**Plans:** 5 plans (4 complete + 1 gap closure)

Plans:
- [x] 01-01-PLAN.md — Swap build infrastructure from Vue to React (package.json, tsconfig, vite.config.ts)
- [x] 01-02-PLAN.md — Migrate Storybook to React, configure Vitest unit tests with jsdom + RTL
- [x] 01-03-PLAN.md — Convert all 57 component index.ts files and main entry point
- [x] 01-04-PLAN.md — Create shared hooks (useControllable, useTransition), Icon component, forwardRef pattern
- [ ] 01-05-PLAN.md — Gap closure: Icon story, tsconfig.lib.json composables exclusion, package.json exports fix

### Phase 2: Atomic Components
**Goal**: All 20 leaf components render correctly in React with the same props and visual output as their Vue counterparts
**Depends on**: Phase 1
**Requirements**: ATOM-01, ATOM-02, ATOM-03, ATOM-04, ATOM-05, ATOM-06, ATOM-07, ATOM-08, ATOM-09, ATOM-10, ATOM-11, ATOM-12, ATOM-13, ATOM-14, ATOM-15, ATOM-16, ATOM-17, ATOM-18, ATOM-19, ATOM-20
**Success Criteria** (what must be TRUE):
  1. Every atomic component renders in Storybook with the same visual appearance as the Vue version
  2. Button, Badge, Avatar, and Tooltip accept the same prop names as the Vue version (no API renames)
  3. Components using icons (Button with icon prop, Icon, IconCard) display MDI icons correctly via the new Icon wrapper
  4. All atomic components are importable as named exports from the package entry point
**Plans:** 1/8 plans executed

Plans:
- [ ] 02-00-PLAN.md — Wave 0: Create 19 stub test files for all atomic components (Nyquist compliance)
- [ ] 02-01-PLAN.md — Migrate Spinner, Skeleton, Card, Separator, Avatar (zero-dep presentational)
- [ ] 02-02-PLAN.md — Migrate Tooltip (portal + positioning + useTransition)
- [ ] 02-03-PLAN.md — Migrate Badge, StatusBadge, Button (Spinner/Icon dependents + blendColors)
- [ ] 02-04-PLAN.md — Migrate FloatCard, Alert, Connector (portal + ResizeObserver + inline Group)
- [ ] 02-05-PLAN.md — Migrate ProgressBar, ActionCard, IconCard (Tooltip/Card/Icon dependents)
- [ ] 02-06-PLAN.md — Migrate MetricCard, Breadcrumb (multi-dependency cards + useControllable)
- [ ] 02-07-PLAN.md — Migrate Image, Profile (portal + inline SelectContainer), verify Icon integration

### Phase 3: Form Components
**Goal**: All 12 form inputs work in both controlled and uncontrolled modes, with ref forwarding enabled for form library integration
**Depends on**: Phase 1
**Requirements**: FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06, FORM-07, FORM-08, FORM-09, FORM-10, FORM-11, FORM-12
**Success Criteria** (what must be TRUE):
  1. Input and Textarea accept a `ref` prop and expose the underlying DOM element to the parent
  2. Every form component works in controlled mode: passing `value` + `onChange` controls the component externally
  3. Every form component works in uncontrolled mode: passing only `defaultValue` manages state internally
  4. Checkbox, Radio, Switch, and Toggle visually match their Vue counterparts in both checked and unchecked states
  5. PINInput, TagInput, and FileUpload accept the same prop names and fire the same change events as the Vue versions
**Plans:** 13/13 plans complete

Plans:
- [ ] 03-00-PLAN.md — Wave 0: Create 12 stub test files for all form components (Nyquist compliance)
- [ ] 03-01-PLAN.md — Migrate Label utility, Checkbox, Switch (foundation + simple booleans)
- [ ] 03-02-PLAN.md — Migrate Radio + RadioGroup (context provider/consumer pattern)
- [ ] 03-03-PLAN.md — Migrate Toggle + ToggleGroup (context provider/consumer pattern)
- [ ] 03-04-PLAN.md — Migrate Input (complex: type variants, mask, validation, forwardRef)
- [ ] 03-05-PLAN.md — Migrate Textarea + PINInput (forwardRef + useImperativeHandle)
- [ ] 03-06-PLAN.md — Migrate Slider (complex: drag, range, vertical, steps, touch)
- [ ] 03-07-PLAN.md — Migrate TagInput + FileUpload (advanced inputs with Phase 2 deps)
- [ ] 03-08-PLAN.md — Gap closure: RadioGroup story interactivity + ToggleGroup border collapse
- [ ] 03-09-PLAN.md — Gap closure: Input inner border, number arrows, domain/url validation
- [ ] 03-10-PLAN.md — Gap closure: Slider DS Tooltip + simplified step tick marks
- [ ] 03-11-PLAN.md — Gap closure: Slider step tick mark active/inactive color logic
- [ ] 03-12-PLAN.md — Gap closure: Slider defaultValue prop for uncontrolled mode

### Phase 4: Internal Components
**Goal**: All shared utility components and the portal infrastructure are available for composite and provider components to build on
**Depends on**: Phase 1
**Requirements**: INTL-01, INTL-02, INTL-03, INTL-04, INTL-05, INTL-06, INTL-07, INTL-08
**Success Criteria** (what must be TRUE):
  1. Overlay component renders its children into `document.body` via `createPortal`, verified by inspecting the DOM in a test
  2. Label component correctly associates with a form input via `htmlFor`/`id` when used in a form layout
  3. SelectContainer and SelectContent provide the correct layout and z-index for a dropdown-style UI
  4. ExpandableContainer animates open/close using the chosen CSS scoping strategy without layout shifts
**Plans:** 3 plans

Plans:
- [ ] 04-01-PLAN.md — Test stubs + useClickOutside hook + Option, Overlay, Group (independent leaves)
- [ ] 04-02-PLAN.md — Container (complex: useControllable + MutationObserver + useClickOutside + Label)
- [ ] 04-03-PLAN.md — ExpandableContainer + SelectContent + SelectContainer (dropdown chain)

### Phase 5: Providers
**Goal**: Global services (`useConfirm`, `useToast`) are available to any component in the tree via React context, replacing Vue's `$confirm` and `$toast` global properties
**Depends on**: Phase 4
**Requirements**: PROV-01, PROV-02, PROV-03, PROV-04, PROV-05
**Success Criteria** (what must be TRUE):
  1. Wrapping an app in `DesignSystemProvider` makes `useConfirm` and `useToast` hooks callable from any descendant component
  2. Calling `useConfirm().confirm(...)` renders the Confirm dialog overlay without any prop-drilling
  3. Calling `useToast().show(...)` renders a Toast notification that dismisses automatically
  4. Confirm and Toast components match the visual appearance of their Vue counterparts
**Plans**: TBD

### Phase 6: Composite Components
**Goal**: All 17 composite components render and interact correctly, including portal-based overlays and transition animations
**Depends on**: Phase 4, Phase 5
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, COMP-08, COMP-09, COMP-10, COMP-11, COMP-12, COMP-13, COMP-14, COMP-15, COMP-16, COMP-17
**Success Criteria** (what must be TRUE):
  1. Dialog and Drawer open and close with the same transition animation as the Vue version, rendered via portal into `document.body`
  2. Select, AutoComplete, and TagSelect support both controlled and uncontrolled modes with the same prop API as the Vue versions
  3. Dropdown, ColorPicker, and DatePicker position their popover correctly relative to the trigger element
  4. Accordion, Tab, and Stepper maintain the correct active state visually and programmatically
  5. Calendar renders the correct month grid and responds to date selection with `onChange`
**Plans**: TBD

### Phase 7: Complex Components
**Goal**: The 6 highest-risk specialized components migrate correctly, including Table's render-prop column API, Tree's compound component pattern, and RichTextEditor's third-party React integration
**Depends on**: Phase 6
**Requirements**: CPLX-01, CPLX-02, CPLX-03, CPLX-04, CPLX-05, CPLX-06
**Success Criteria** (what must be TRUE):
  1. Table renders rows and columns correctly; custom cell rendering works via a `columns[].render` render prop
  2. Table sorting and pagination update the displayed data without a full re-render of unchanged rows
  3. Tree renders nested node hierarchies; nodes expand and collapse correctly; selection state is controllable
  4. RichTextEditor loads with the same toolbar controls as the Vue version and fires `onChange` with the updated content
  5. Sidebar, Crop, and History match the visual output and interaction behavior of their Vue counterparts
**Plans**: TBD

### Phase 8: Build & Distribution
**Goal**: The library builds cleanly in all three output formats with correct TypeScript declarations and is publishable to npm
**Depends on**: Phase 7
**Requirements**: DIST-01, DIST-02, DIST-03, DIST-04
**Success Criteria** (what must be TRUE):
  1. `vite build` produces ES, CJS, and UMD output files with no build errors
  2. TypeScript consumers get full type inference and autocomplete for all component props from the generated `.d.ts` files
  3. The Tailwind config is importable from the package (e.g., `import tailwindConfig from '@etus/design-system/tailwind'`)
  4. `npm publish --dry-run` completes without errors and the package manifest lists no Vue dependencies
**Plans**: TBD

### Phase 9: Documentation & Testing
**Goal**: Every component has a Storybook story and form components have RTL tests; visual output is verified to match the Vue version
**Depends on**: Phase 8
**Requirements**: TEST-01, TEST-02, TEST-03
**Success Criteria** (what must be TRUE):
  1. Storybook builds without errors and shows a story for every one of the 57 components
  2. All 12 form components have RTL tests covering at least controlled mode, uncontrolled mode, and ref forwarding
  3. A visual comparison pass (manual or Chromatic) confirms no component differs visually from the Vue version
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 4/5 | Gap closure needed | - |
| 2. Atomic Components | 1/8 | In Progress|  |
| 3. Form Components | 13/13 | Complete   | 2026-03-16 |
| 4. Internal Components | 0/3 | Planning complete | - |
| 5. Providers | 0/TBD | Not started | - |
| 6. Composite Components | 0/TBD | Not started | - |
| 7. Complex Components | 0/TBD | Not started | - |
| 8. Build & Distribution | 0/TBD | Not started | - |
| 9. Documentation & Testing | 0/TBD | Not started | - |
