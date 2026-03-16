# Phase 4: Internal Components - Context

**Gathered:** 2026-03-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate 7 remaining shared utility components (Container, ExpandableContainer, Group, Option, Overlay, SelectContainer, SelectContent) from Vue SFCs to React TSX. Create a shared useClickOutside hook. Label (INTL-01) already migrated in Phase 3 — skip. These components provide the portal infrastructure, dropdown containers, and selection coordination that Phases 5-6 build on.

</domain>

<decisions>
## Implementation Decisions

### Portal Strategy (Overlay)
- Use `createPortal(children, document.body)` — render directly into body, no dedicated portal root div
- Animate with `useTransition` hook from Phase 1 (isMounted + isActive pattern) — consistent with Dialog/Drawer/Toast in later phases
- Keep `zIndex` as a number prop (default 1000) — matches Vue API, consumers can stack overlays
- Apply zIndex via inline `style={{ zIndex }}` — consistent with Icon's dynamic fontSize pattern from Phase 1

### Group State Pattern
- React Context via `createContext` + `useContext` — same pattern as RadioGroupContext and ToggleGroupContext from Phase 3
- Separate `GroupContext` (not shared with RadioGroup/ToggleGroup) — keeps concerns independent, Group is a utility for Select/Dropdown
- Context value includes: `value`, `select(value)`, `disabled` — children read via `useGroupContext()`
- Group accepts `onChange` prop alongside context `select()` — both internal coordination and external notification
- `disabled` propagated through context — children merge group disabled with their own disabled prop
- `vertical` prop as CSS class toggle (`flex-col` vs `flex-row`) — not through context

### Resize/Observer Logic
- Faithful port of all observer logic — ResizeObserver, MutationObserver, and setTimeout timing replicated exactly
- SelectContainer: ResizeObserver + MutationObserver in useEffect hooks, 200ms mount delay preserved
- Container: MutationObserver for attribute-watching preserved, triggers min-width recalculation
- ExpandableContainer stays as a separate wrapper around Container — not merged. Handles absolute positioning + card styling

### Click-Outside & Blur
- New shared `useClickOutside(refs[], callback)` hook — reusable by Container, Select, Dropdown, AutoComplete, ColorPicker in Phase 6
- Uses `mousedown` event (not click) — fires before click, prevents issues with portal-unmounted targets
- Hook lives in `src/composables/` — same directory as useControllable, useTransition
- SelectContent auto-focus: `useEffect(() => { if (expanded) searchRef.current?.focus() }, [expanded])` — React-idiomatic nextTick equivalent

### Claude's Discretion
- Migration order of the 7 components (dependency-aware batching)
- Exact CSS Module file structure and class naming
- Observer cleanup patterns in useEffect return functions
- SelectContainer's translate-y slide animation implementation details
- Option component's styling classes and ARIA attributes

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Vue Source Files (migration source)
- `src/utils/components/Container.vue` — Container with MutationObserver, expand/collapse, Label integration
- `src/utils/components/ExpandableContainer.vue` — Wrapper adding absolute positioning + card styling
- `src/utils/components/Group.vue` — Provide/inject selection coordination
- `src/utils/components/Option.vue` — Presentational option item with ARIA role
- `src/utils/components/Overlay.vue` — Full-screen backdrop with fade transition
- `src/utils/components/SelectContainer.vue` — ResizeObserver + MutationObserver dynamic sizing (215 lines, most complex)
- `src/utils/components/SelectContent.vue` — Search input + expanded state management

### Already Migrated (reference patterns)
- `src/utils/components/Label.tsx` — Label already migrated in Phase 3, reference for patterns
- `src/composables/useControllable.ts` — Hook replacing useOptionalModel
- `src/composables/useTransition.ts` — Mount/unmount animation timing hook

### Phase 3 Context Patterns
- `src/components/RadioGroup/RadioGroup.tsx` — React Context provider pattern for group coordination
- `src/components/ToggleGroup/ToggleGroup.tsx` — React Context provider pattern (separate context)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useControllable` hook: Replaces useOptionalModel for Container, ExpandableContainer, SelectContainer, SelectContent
- `useTransition` hook: For Overlay fade animation and Container expand animation
- `Icon` component: Used by Container (keyboard_arrow_down), SelectContent (search icon, dropdown arrow)
- `Label.tsx`: Already migrated — Container imports it directly
- `clsx`: Available for conditional class composition

### Established Patterns
- CSS Modules: two files per component (Component.module.css + colors.module.css) from Phase 2
- Compound sub-components for named slots from Phase 2/3
- `className` prop on every component from Phase 1
- React Context for group coordination from Phase 3 (RadioGroupContext, ToggleGroupContext)
- Component directory: `ComponentName/ComponentName.tsx`, `index.ts`, `*.stories.tsx`, `*.module.css`

### Integration Points
- `src/utils/components/`: Where these utility components live (alongside Label.tsx)
- `src/composables/index.ts`: Barrel file for new useClickOutside hook
- Phase 5 (Providers): Will use Overlay for confirm/toast backdrop
- Phase 6 (Composites): Will use Container, ExpandableContainer, SelectContainer, SelectContent, Group, Option for Select, Dropdown, AutoComplete, etc.

</code_context>

<specifics>
## Specific Ideas

- The 7 remaining components are: Container, ExpandableContainer, Group, Option, Overlay, SelectContainer, SelectContent
- Label (INTL-01) is already done — migrated in Phase 3 as a form component dependency
- SelectContainer is the highest-risk component (215 lines, multiple observers) — may need its own plan
- Option is the simplest (56 lines, pure presentational) — quick win
- Group's context shape should mirror RadioGroupContext for consistency but remain independent
- useClickOutside is a new hook not in the Vue version — extracts the blur detection pattern from Container into a reusable abstraction

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-internal-components*
*Context gathered: 2026-03-16*
