# Phase 7: Complex Components - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate the 6 highest-risk specialized components to React: Table (sorting, pagination, selection, custom cell rendering), Tree (recursive nested nodes, single/multiple selection), RichTextEditor (contenteditable + execCommand toolbar), Sidebar (nested navigation with routing), Crop (image cropping with drag/zoom), and History (timeline with position variants). Each must match its Vue counterpart's visual output and prop API.

</domain>

<decisions>
## Implementation Decisions

### Table column API
- Column cell rendering via `columns[].render: (value, item, index) => ReactNode` render prop pattern
- Non-cell slots (actions, footer, empty-state) via compound sub-components: `Table.Actions`, `Table.Footer`, `Table.EmptyState` as children
- Reuse existing Pagination component from Phase 6 for the table footer pagination
- Support dual pagination mode: client-side (Table manages internally) and server-side (`renderPaginationInBackEnd` prop where parent provides page/numberOfItems)
- Same prop API as Vue: columns, items, sortOptions, page, itemsPerPage, numberOfItems, enableSelection, enableAggregation, loading, noShadow, hasHover, isHeaderFixed, hideFooter

### RichTextEditor approach
- Keep raw `document.execCommand` + `contenteditable` approach — direct port from Vue, no third-party library
- Sub-components in separate files: `Colors.tsx` (color picker grid) and `Color.tsx` (single color swatch) at module scope
- Both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`) modes via `useControllable`
- Font-size dropdown reuses DS Select component (compact variant, inline in toolbar)
- Color pickers use internal Colors.tsx sub-component (simple grid, not full ColorPicker)
- Other toolbar items rendered as Icon buttons
- Selection API for cursor/range tracking, same toolbar options as Vue version

### Tree recursive rendering
- Internal recursive `TreeNode` component (not publicly exposed) — consumer passes options array to `Tree`
- `TreeContext` provides selection/expand callbacks to all nested TreeNode children (no prop drilling)
- Context provides: selectedValue(s), onSelect, expandedNodes Set, onToggleExpand, labelKey, valueKey, getObject, multiple, disabled
- Selection uses `useControllable` for controlled/uncontrolled
- Expand/collapse state managed internally via useState

### Sidebar routing integration
- Auto-detect react-router: try to use `Link`/`useNavigate` if react-router-dom is available, fall back to `<a href>` tags
- Internal sub-components: `SidebarOption` and `SidebarSubOption` (not publicly exposed), consumer passes options array with nested children
- Height calculation via DOM query matching Vue: `querySelector('.navbar')` to compute `calc(100vh - navbarHeight)`
- Same prop API as Vue: modelValue→value/onChange, expanded, options, getObject

### Crop and History
- Crop: Direct port of Vue drag/zoom/ResizeObserver logic using React refs and useEffect
- History: Direct port using useControllable for value binding, same position variants (top/bottom/left/right) and type colors

### Claude's Discretion
- Exact drag/resize implementation details for Crop
- History timeline connector styling approach
- Table row memoization strategy for performance
- TreeNode expand/collapse animation (if any)
- RichTextEditor toolbar responsive layout

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Vue source files (migration reference)
- `src/components/Table/Table.vue` — Table implementation (464 LOC): columns, sorting, pagination, selection, aggregation, slots
- `src/components/Tree/Tree.vue` — Tree parent (199 LOC): options, selection model, labelKey/valueKey
- `src/components/Tree/Option.vue` — Tree recursive node (194 LOC): expand/collapse, checkbox, nested rendering
- `src/components/RichTextEditor/RichTextEditor.vue` — RTE main (1792 LOC): execCommand toolbar, contenteditable, font/color/image
- `src/components/RichTextEditor/Color.vue` — Single color swatch (99 LOC)
- `src/components/RichTextEditor/Colors.vue` — Color picker grid (177 LOC)
- `src/components/Sidebar/Sidebar.vue` — Sidebar navigation (239 LOC): routing, expanded state, height calculation
- `src/components/Sidebar/SubOption.vue` — Nested menu items (152 LOC)
- `src/components/Sidebar/Option.vue` — Menu item (38 LOC)
- `src/components/Crop/Crop.vue` — Image cropping (290 LOC): drag, zoom, ResizeObserver
- `src/components/History/History.vue` — Timeline history (495 LOC): position variants, type colors

### Type definitions
- `src/utils/types/SidebarOption.ts` — Sidebar option type with nested children

### Reused DS components
- `src/components/Pagination/Pagination.tsx` — Reused in Table footer
- `src/components/Select/Select.tsx` — Reused in RTE font-size dropdown

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Pagination component** (Phase 6): Wire into Table footer for page navigation
- **Select component** (Phase 6): Use compact variant in RTE toolbar for font-size
- **useControllable hook** (Phase 1): For Tree selection, RTE value, History value, Table page
- **useClickOutside hook** (Phase 4): For RTE color picker dismissal
- **Label utility** (Phase 4): For RTE label/error/info message display
- **Icon component** (Phase 1): For toolbar icons, tree expand/collapse icons, sidebar icons
- **ExpandableContainer** (Phase 4): Potential use for Sidebar/Tree expand animations

### Established Patterns
- **Module-scope sub-components**: Declare Table.Actions, Table.Footer etc. at module scope, assign as static properties (Phase 6 Dropdown pattern)
- **Context for compound components**: TreeContext follows RadioGroup/ToggleGroup context pattern
- **Plain CSS for portal-rendered components**: If any component uses portals
- **CSS Modules for scoped components**: For non-portal components
- **useControllable for controlled/uncontrolled**: All stateful components

### Integration Points
- Table depends on Pagination (Phase 6)
- RTE font-size depends on Select (Phase 6)
- Sidebar auto-detects react-router-dom (optional peer dependency)
- All 6 components export from `src/components/index.ts`
- All `.tsx` stub files already exist (4 lines each, created during earlier phases)

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches matching Vue parity.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 07-complex-components*
*Context gathered: 2026-03-20*
