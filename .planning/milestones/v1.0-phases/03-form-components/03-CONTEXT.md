# Phase 3: Form Components - Context

**Gathered:** 2026-03-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate 12 form input components (Input, Textarea, Checkbox, Radio, RadioGroup, Switch, Toggle, ToggleGroup, Slider, PINInput, TagInput, FileUpload) from Vue SFCs to React TSX. All components support both controlled and uncontrolled modes via `useControllable`. Label (INTL-01) is pulled into this phase as a dependency. Input `type="color"` is deferred to Phase 6 (ColorPicker dependency). Each component gets a working Storybook story. Vue files deleted after verification.

</domain>

<decisions>
## Implementation Decisions

### Cross-phase Dependencies
- Pull Label (INTL-01) migration into Phase 3 — multiple form components (Input, TagInput, FileUpload) depend on it
- Defer Input `type="color"` to Phase 6 — ColorPicker is a complex composite component (~460 lines) with a circular dependency (Input uses ColorPicker, ColorPicker uses Input)
- Import Tooltip and StatusBadge directly in TagInput — both already migrated in Phase 2, use as-is with JSX syntax

### Slot Migration Pattern
- Named slots → compound sub-components (consistent with Phase 2 pattern):
  - `<Input.PrependIcon>` and `<Input.AppendIcon>` (replaces icon-slot and appended-icon-slot)
  - `<TagInput.PrependIcon>` and `<TagInput.AppendIcon>` (same pattern)
  - `<TagInput.Hint>` (replaces hint-message slot)
  - `<FileUpload.Preview>` (replaces uploaded-file slot)
- Default slot → `children` prop (Checkbox label content, etc.)
- Keep `icon` and `appendIcon` string props for the simple/common case alongside compound sub-components

### Imperative Handles & Ref Forwarding
- `forwardRef` on: Input, Textarea, Slider, PINInput — components with native `<input>` elements
- Ref target: native `<input>` element (not wrapper div) — enables `.focus()`, `.select()`, form library registration (react-hook-form, etc.)
- PINInput: `useImperativeHandle` to expose `{ focus(), clear() }` — mirrors Vue's `defineExpose` behavior
- Other form components (Checkbox, Radio, Switch, Toggle, ToggleGroup, RadioGroup, TagInput, FileUpload): no forwardRef needed

### Built-in Validation
- Keep all validation identical to Vue version:
  - Email, domain, URL validation via `isValidEmail()`, `isValidDomain()`, `isValidUrl()` from utils
  - Mask formatting (CPF, CNPJ, CEP) via `applyMask()` from utils
  - Max length enforcement with character counter
  - Number min/max clamping with custom increment/decrement Icon buttons (hide native spinners via CSS)
- Internal state model: `useState` for `hasError`, `isFocused`, etc. — mirror Vue's ref-based approach
- `isError` prop still allows external error override
- TagInput: keep duplicate check, max count check, mask validation, and 2-second error auto-dismiss timeout

### Claude's Discretion
- Migration order of the 12 form components (dependency-aware batching)
- Exact CSS Module class naming and file structure
- How to handle edge cases in individual components (e.g., Slider thumb positioning, ToggleGroup state coordination)
- Label component implementation details
- Story completeness — adapt what exists, don't add new variants

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useControllable` hook (Phase 1): Used by Checkbox, Radio, Switch, Toggle, Breadcrumb-like patterns — replaces `useOptionalModel`
- `Icon` component (Phase 1): Used by Input (prepend/append icons, number arrows), TagInput (icons), FileUpload (file/trash icons)
- `src/utils/index.ts`: Framework-agnostic validators (`isValidEmail`, `isValidDomain`, `isValidUrl`) and mask formatter (`applyMask`) — usable directly
- `Tooltip` component (Phase 2): Used by TagInput for tag hover labels
- `StatusBadge` component (Phase 2): Used by TagInput for tag display with close button
- `Card` component (Phase 2): Available for any card-based layouts
- `clsx` package: Available for conditional class composition

### Established Patterns
- CSS Modules: two files per component (`Component.module.css` + `colors.module.css`) — Phase 2 pattern
- Compound sub-components for named slots (`Component.SubComponent`) — Phase 2 pattern
- `className` prop on every component — Phase 1/2 pattern
- Component directory: `ComponentName/ComponentName.tsx`, `index.ts`, `ComponentName.stories.tsx`, `ComponentName.module.css`
- All 12 `.tsx` stub files exist from Phase 1 — replace placeholder `<div>` with actual implementation
- Vue `<style scoped>` → CSS Module files; `@apply` directives preserved inside modules

### Integration Points
- `src/components/index.ts`: Already re-exports all components
- `src/index.ts`: Main entry point already wired from Phase 1
- `src/utils/components/Label.vue`: Needs migration to React TSX — will live at same path as React component
- Component cross-references: Input uses Icon (Phase 1), TagInput uses Tooltip + StatusBadge (Phase 2)

</code_context>

<specifics>
## Specific Ideas

- The 12 form components are: Input, Textarea, Checkbox, Radio, RadioGroup, Switch, Toggle, ToggleGroup, Slider, PINInput, TagInput, FileUpload
- Plus Label (INTL-01) pulled from Phase 4 as a dependency
- Input `type="color"` explicitly deferred — add TODO comment pointing to Phase 6
- PINInput has clipboard paste support (Ctrl/Cmd+V) and arrow key navigation between fields — port exactly
- FileUpload has drag-and-drop support with visual feedback — port exactly
- TagInput supports comma/newline-separated multi-value paste — port exactly
- All utility functions (validation, masking, color) are framework-agnostic — import directly from `src/utils/index.ts`

</specifics>

<deferred>
## Deferred Ideas

- Input `type="color"` with FloatCard + ColorPicker integration — Phase 6 (ColorPicker is a composite component)
- ColorPicker component migration — Phase 6 (COMP-15)

</deferred>

---

*Phase: 03-form-components*
*Context gathered: 2026-03-16*
