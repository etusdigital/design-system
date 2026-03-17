# Requirements: AnaCarolina Design System — Vue to React Migration

**Defined:** 2026-03-13
**Core Value:** Every component must look and behave identically to its Vue counterpart — same props, same visual output, same Tailwind design tokens.

## v1 Requirements

Requirements for the complete Vue-to-React migration. Each maps to roadmap phases.

### Foundation

- [x] **FOUND-01**: Project configured with React 19 + TypeScript (tsconfig updated with `jsx: react-jsx`)
- [x] **FOUND-02**: Vite config updated — `@vitejs/plugin-react-swc` replaces `@vitejs/plugin-vue`
- [x] **FOUND-03**: Package.json updated — Vue deps removed, React deps added, peerDependencies set
- [x] **FOUND-04**: `useControllable` hook implemented (replaces `useOptionalModel` composable)
- [x] **FOUND-05**: `forwardRef` pattern established for form input components
- [x] **FOUND-06**: MDI icons migrated — `mdi-vue` replaced with `@mdi/react`, Icon wrapper component created
- [x] **FOUND-07**: All 57 component `index.ts` files converted from Vue plugin exports to named exports
- [x] **FOUND-08**: CSS scoping strategy decided and documented (Tailwind classes + component CSS files)
- [x] **FOUND-09**: Transition/animation utility established (CSS class toggling or react-transition-group)
- [x] **FOUND-10**: Storybook migrated from `@storybook/vue3-vite` to `@storybook/react-vite`
- [x] **FOUND-11**: Vitest configured with jsdom + React Testing Library
- [x] **FOUND-12**: Main entry `src/index.ts` updated to export all React components

### Atomic Components

- [x] **ATOM-01**: Button component migrated to React TSX with same props and visual output
- [x] **ATOM-02**: Icon component migrated to React TSX
- [x] **ATOM-03**: Badge component migrated to React TSX
- [x] **ATOM-04**: StatusBadge component migrated to React TSX
- [x] **ATOM-05**: Avatar component migrated to React TSX
- [x] **ATOM-06**: Spinner component migrated to React TSX
- [x] **ATOM-07**: Skeleton component migrated to React TSX
- [x] **ATOM-08**: Separator component migrated to React TSX
- [x] **ATOM-09**: ProgressBar component migrated to React TSX
- [x] **ATOM-10**: Alert component migrated to React TSX
- [x] **ATOM-11**: Tooltip component migrated to React TSX
- [x] **ATOM-12**: Breadcrumb component migrated to React TSX
- [x] **ATOM-13**: Card component migrated to React TSX
- [x] **ATOM-14**: ActionCard component migrated to React TSX
- [x] **ATOM-15**: IconCard component migrated to React TSX
- [x] **ATOM-16**: MetricCard component migrated to React TSX
- [x] **ATOM-17**: FloatCard component migrated to React TSX
- [x] **ATOM-18**: Image component migrated to React TSX
- [x] **ATOM-19**: Connector component migrated to React TSX
- [x] **ATOM-20**: Profile component migrated to React TSX

### Form Components

- [x] **FORM-01**: Input component migrated with controlled/uncontrolled support and forwardRef
- [x] **FORM-02**: Textarea component migrated with controlled/uncontrolled support and forwardRef
- [x] **FORM-03**: Checkbox component migrated with controlled/uncontrolled support
- [x] **FORM-04**: Radio component migrated with controlled/uncontrolled support
- [x] **FORM-05**: RadioGroup component migrated with controlled/uncontrolled support
- [x] **FORM-06**: Switch component migrated with controlled/uncontrolled support
- [x] **FORM-07**: Toggle component migrated with controlled/uncontrolled support
- [x] **FORM-08**: ToggleGroup component migrated with controlled/uncontrolled support
- [x] **FORM-09**: Slider component migrated with controlled/uncontrolled support
- [x] **FORM-10**: PINInput component migrated with controlled/uncontrolled support
- [x] **FORM-11**: TagInput component migrated with controlled/uncontrolled support
- [x] **FORM-12**: FileUpload component migrated with controlled/uncontrolled support

### Internal Components

- [x] **INTL-01**: Label utility component migrated to React TSX
- [x] **INTL-02**: Overlay utility component migrated with createPortal
- [x] **INTL-03**: Container utility component migrated to React TSX
- [x] **INTL-04**: SelectContainer utility component migrated to React TSX
- [x] **INTL-05**: SelectContent utility component migrated to React TSX
- [x] **INTL-06**: Option utility component migrated to React TSX
- [x] **INTL-07**: Group utility component migrated to React TSX
- [x] **INTL-08**: ExpandableContainer utility component migrated to React TSX

### Providers

- [x] **PROV-01**: DesignSystemProvider created as root context wrapper (replaces Vue plugin install)
- [x] **PROV-02**: ConfirmProvider + useConfirm hook created (replaces $confirm global property)
- [x] **PROV-03**: ToastProvider + useToast hook created (replaces $toast global property)
- [x] **PROV-04**: Confirm component migrated to React TSX (rendered by ConfirmProvider)
- [x] **PROV-05**: Toast component migrated to React TSX (rendered by ToastProvider)

### Composite Components

- [ ] **COMP-01**: Select component migrated with controlled/uncontrolled support and portal
- [ ] **COMP-02**: AutoComplete component migrated to React TSX
- [ ] **COMP-03**: TagSelect component migrated to React TSX
- [x] **COMP-04**: Dropdown component migrated with portal
- [ ] **COMP-05**: Dialog component migrated with portal and transition
- [ ] **COMP-06**: Drawer component migrated with portal and transition
- [ ] **COMP-07**: Accordion component migrated with transition
- [ ] **COMP-08**: Carousel component migrated to React TSX
- [ ] **COMP-09**: Tab component migrated to React TSX
- [ ] **COMP-10**: Pagination component migrated to React TSX
- [ ] **COMP-11**: Filter component migrated to React TSX
- [ ] **COMP-12**: Stepper component migrated to React TSX
- [ ] **COMP-13**: Navbar component migrated to React TSX
- [ ] **COMP-14**: RoundMenu component migrated to React TSX
- [ ] **COMP-15**: ColorPicker component migrated with controlled/uncontrolled support
- [ ] **COMP-16**: DatePicker component migrated with controlled/uncontrolled support
- [ ] **COMP-17**: Calendar component migrated to React TSX

### Complex Components

- [ ] **CPLX-01**: Table component migrated with render props for custom cells, sorting, pagination
- [ ] **CPLX-02**: Tree component migrated with compound component pattern
- [ ] **CPLX-03**: Sidebar component migrated to React TSX
- [ ] **CPLX-04**: RichTextEditor component migrated to React TSX
- [ ] **CPLX-05**: Crop component migrated to React TSX
- [ ] **CPLX-06**: History component migrated to React TSX

### Build & Distribution

- [ ] **DIST-01**: Library builds successfully in ES, CJS, UMD formats
- [ ] **DIST-02**: TypeScript declarations generated correctly for all components
- [ ] **DIST-03**: Tailwind config exported for consumers
- [ ] **DIST-04**: Package publishable to npm as @etus/design-system

### Documentation & Testing

- [ ] **TEST-01**: Storybook stories migrated for all 57 components (.stories.tsx)
- [ ] **TEST-02**: Component tests written with React Testing Library for all form components
- [ ] **TEST-03**: Visual output matches Vue version for all components

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhancements

- **ENH-01**: Server-side rendering (SSR) support
- **ENH-02**: React 19 ref-as-prop migration (remove forwardRef wrappers)
- **ENH-03**: Compound component API refinement (Select.Option, Table.Column patterns)
- **ENH-04**: Accessibility audit and WCAG 2.1 compliance verification

## Out of Scope

| Feature | Reason |
|---------|--------|
| New components not in Vue version | Migration only — no new features |
| API redesign for React conventions | Goal is prop parity with Vue version |
| CSS-in-JS (styled-components, emotion) | Conflicts with Tailwind, adds runtime overhead |
| State management integration | Component library should be state-agnostic |
| React Native support | Web only |
| Server Components support | Not in Vue version |
| Form library integration | Consumers choose their own |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 through FOUND-12 | Phase 1 | Pending |
| ATOM-01 through ATOM-20 | Phase 2 | Pending |
| FORM-01 through FORM-12 | Phase 3 | Pending |
| INTL-01 through INTL-08 | Phase 4 | Pending |
| PROV-01 through PROV-05 | Phase 5 | Pending |
| COMP-01 through COMP-17 | Phase 6 | Pending |
| CPLX-01 through CPLX-06 | Phase 7 | Pending |
| DIST-01 through DIST-04 | Phase 8 | Pending |
| TEST-01 through TEST-03 | Phase 9 | Pending |

**Coverage:**
- v1 requirements: 84 total
- Mapped to phases: 84
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-13*
*Last updated: 2026-03-13 after initial definition*
