# Phase 2: Atomic Components - Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate all 20 leaf components from Vue SFCs to React TSX with identical props and visual output. These components have no stateful or overlay dependencies beyond what Phase 1 provides (useControllable, useTransition, Icon, forwardRef pattern). Each component gets a working Storybook story adapted from the existing Vue story. Vue source files (.vue, .stories.ts) are deleted after each component is verified.

</domain>

<decisions>
## Implementation Decisions

### CSS Scoping Strategy
- Use CSS Modules for component-scoped styles
- Two module files per component: `colors.module.css` (color variants) + `Component.module.css` (layout/structure)
- Compose with `clsx` for nested selectors — apply module classes directly to each element rather than relying on CSS nesting
- Vue `<style scoped>` blocks → CSS Module files; `@apply` directives preserved as-is inside modules
- `className` prop on every component (carried from Phase 1 decision)

### Slot-to-Children Mapping
- Default slot → `children` prop (React standard)
- Named slots → compound sub-components for ALL named slots (e.g., `<Alert.Actions>`, `<ActionCard.Card>`, `<Tooltip.Label>`)
- Conditional rendering: check `children` truthiness (`{children && <wrapper>{children}</wrapper>}`)
- Scoped slots → render prop functions (e.g., Profile passes data via `children` as a function)

### Tooltip Positioning
- Port the manual DOM positioning logic (getBoundingClientRect + style.left/top) — replicate the ~40-line calculation in useRef + useEffect
- No external positioning library (no @floating-ui) — keep it identical to Vue behavior
- Use `createPortal(element, document.body)` directly for rendering into body (not waiting for Phase 4 Overlay component)
- Use `useTransition` hook from Phase 1 for the opacity fade in/out animation (ensures unmount timing is correct with portal)
- Close tooltip on scroll (wheel event listener) — matches Vue behavior

### Storybook Stories
- Each component gets a `.stories.tsx` file migrated alongside the component
- Copy existing Vue `.stories.ts` content and adapt for React (change imports, JSX syntax)
- Keep the same CSF structure (args, argTypes, story names) — just swap render from Vue to JSX
- Delete old `.stories.ts` (Vue) file after React story is verified

### Vue File Cleanup
- Delete `.vue` file after the `.tsx` migration is verified working
- Delete `.stories.ts` (Vue) alongside the `.vue` file
- Clean up per component, not in bulk at the end

### Claude's Discretion
- Migration order of the 20 components (dependency-aware batching)
- Exact CSS Module class naming conventions
- Whether to create a shared pattern/template for common migration steps
- How to handle edge cases in individual components (e.g., Button's `blendColors` hover logic, Breadcrumb's useOptionalModel usage)
- Story completeness — adapt what exists, don't add new variants

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useControllable` hook (Phase 1): Available for Breadcrumb and Profile which use `useOptionalModel` in Vue
- `useTransition` hook (Phase 1): Available for Tooltip fade animation
- `Icon` component (Phase 1): Already migrated, used by Button, IconCard, and other icon-consuming components
- `src/utils/index.ts`: Framework-agnostic utilities (blendColors, etc.) — usable directly in React
- `clsx` package: Available for conditional class composition

### Established Patterns
- Component directory: `ComponentName/ComponentName.tsx`, `index.ts`, `ComponentName.stories.tsx`, `ComponentName.module.css`, `colors.module.css`
- index.ts already exports React components (stub TSX from Phase 1): `export { Button } from './Button'`
- All 20 `.tsx` stub files exist — replace placeholder `<div>` with actual implementation
- CSS: Tailwind utilities + component CSS files, `className` prop on every component

### Integration Points
- `src/components/index.ts`: Already re-exports all components
- `src/index.ts`: Main entry point already wired up from Phase 1
- `.storybook/`: Already configured for React from Phase 1
- Component cross-references: Button imports Spinner (also atomic), some cards may reference Icon

</code_context>

<specifics>
## Specific Ideas

- The 20 atomic components are: Button, Icon (already done), Badge, StatusBadge, Avatar, Spinner, Skeleton, Separator, ProgressBar, Alert, Tooltip, Breadcrumb, Card, ActionCard, IconCard, MetricCard, FloatCard, Image, Connector, Profile
- Icon component is already migrated in Phase 1 — skip or verify only
- Button uses `blendColors` utility for custom background hover effects — port the computed style logic directly
- Breadcrumb and Profile use `useOptionalModel` composable — replace with `useControllable` hook
- Vue `<Teleport to="body">` in Tooltip → React `createPortal(jsx, document.body)`
- Vue `<Transition name="opacity">` → `useTransition` hook + CSS opacity classes
- Vue `v-bind()` in styles (Icon size) was already handled in Phase 1 with inline styles

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-atomic-components*
*Context gathered: 2026-03-13*
