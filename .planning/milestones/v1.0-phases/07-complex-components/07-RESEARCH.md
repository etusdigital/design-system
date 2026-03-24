# Phase 7: Complex Components - Research

**Researched:** 2026-03-20
**Domain:** Vue-to-React migration — six high-complexity components (Table, Tree, Sidebar, RichTextEditor, Crop, History)
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Table column API**
- Column cell rendering via `columns[].render: (value, item, index) => ReactNode` render prop pattern
- Non-cell slots (actions, footer, empty-state) via compound sub-components: `Table.Actions`, `Table.Footer`, `Table.EmptyState` as children
- Reuse existing Pagination component from Phase 6 for the table footer pagination
- Support dual pagination mode: client-side (Table manages internally) and server-side (`renderPaginationInBackEnd` prop where parent provides page/numberOfItems)
- Same prop API as Vue: columns, items, sortOptions, page, itemsPerPage, numberOfItems, enableSelection, enableAggregation, loading, noShadow, hasHover, isHeaderFixed, hideFooter

**RichTextEditor approach**
- Keep raw `document.execCommand` + `contenteditable` approach — direct port from Vue, no third-party library
- Sub-components in separate files: `Colors.tsx` (color picker grid) and `Color.tsx` (single color swatch) at module scope
- Both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`) modes via `useControllable`
- Font-size dropdown reuses DS Select component (compact variant, inline in toolbar)
- Color pickers use internal Colors.tsx sub-component (simple grid, not full ColorPicker)
- Other toolbar items rendered as Icon buttons
- Selection API for cursor/range tracking, same toolbar options as Vue version

**Tree recursive rendering**
- Internal recursive `TreeNode` component (not publicly exposed) — consumer passes options array to `Tree`
- `TreeContext` provides selection/expand callbacks to all nested TreeNode children (no prop drilling)
- Context provides: selectedValue(s), onSelect, expandedNodes Set, onToggleExpand, labelKey, valueKey, getObject, multiple, disabled
- Selection uses `useControllable` for controlled/uncontrolled
- Expand/collapse state managed internally via useState

**Sidebar routing integration**
- Auto-detect react-router: try to use `Link`/`useNavigate` if react-router-dom is available, fall back to `<a href>` tags
- Internal sub-components: `SidebarOption` and `SidebarSubOption` (not publicly exposed), consumer passes options array with nested children
- Height calculation via DOM query matching Vue: `querySelector('.navbar')` to compute `calc(100vh - navbarHeight)`
- Same prop API as Vue: modelValue→value/onChange, expanded, options, getObject

**Crop and History**
- Crop: Direct port of Vue drag/zoom/ResizeObserver logic using React refs and useEffect
- History: Direct port using useControllable for value binding, same position variants (top/bottom/left/right) and type colors

### Claude's Discretion
- Exact drag/resize implementation details for Crop
- History timeline connector styling approach
- Table row memoization strategy for performance
- TreeNode expand/collapse animation (if any)
- RichTextEditor toolbar responsive layout

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CPLX-01 | Table component migrated with render props for custom cells, sorting, pagination | Render prop column API pattern + Pagination reuse + client/server-side sort logic from Vue source |
| CPLX-02 | Tree component migrated with compound component pattern | TreeContext + recursive TreeNode + useControllable + multi-select getObject logic from Option.vue |
| CPLX-03 | Sidebar component migrated to React TSX | react-router auto-detect pattern + height calc DOM query + sub-component pattern from Sidebar.vue/SubOption.vue |
| CPLX-04 | RichTextEditor component migrated to React TSX | Direct execCommand port + Colors.tsx/Color.tsx sub-components + savedSelection ref pattern + useControllable |
| CPLX-05 | Crop component migrated to React TSX | ResizeObserver in useEffect + getPosition utility + canvas crop/zoom logic from Crop.vue |
| CPLX-06 | History component migrated to React TSX | useControllable + position variants + type color CSS classes from History.vue |
</phase_requirements>

---

## Summary

Phase 7 migrates the six most complex Vue components to React. The complexity is concentrated in three areas: Table's dual-mode pagination with render-prop columns; Tree's recursive compound-context pattern for deep selection hierarchies; and RichTextEditor's 1792-line contenteditable/execCommand state machine. Crop and History are lower-risk direct ports. Sidebar is medium complexity due to react-router detection and the sub-option expand animation.

All six stub `.tsx` files already exist (4-line stubs). All reusable dependencies (Pagination, Select, Checkbox, Icon, useControllable, useClickOutside, Label, getPosition, blendColors) already exist and are confirmed compatible. The architecture decisions are locked in CONTEXT.md so the planner needs pattern recipes, not option surveys.

**Primary recommendation:** Implement in complexity-ascending order — History, Crop, Sidebar, Tree, Table, RichTextEditor — to build confidence and avoid blocking dependencies. Each component gets its own plan. Test infra (Vitest jsdom + React Testing Library) is in place and working.

---

## Standard Stack

### Core (already installed — confirmed from package.json and prior phases)
| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| react | 19.x | Component framework | Already installed |
| typescript | 5.x | Type safety | Already configured |
| clsx | latest | Conditional className | Used by all prior phases |
| CSS Modules | built-in Vite | Scoped styles | All Phase 7 components use .module.css |
| react-router-dom | peer dep (optional) | Sidebar routing | Sidebar auto-detects via try/catch import |

### Internal DS Assets Available
| Asset | Location | Used By |
|-------|----------|---------|
| useControllable | src/hooks/useControllable.ts | Tree, History, RTE, Table (page/itemsPerPage) |
| useClickOutside | src/hooks/useClickOutside.ts | RTE color picker dismissal |
| Pagination | src/components/Pagination/Pagination.tsx | Table footer |
| Select | src/components/Select/Select.tsx | RTE font-size toolbar |
| Checkbox | src/components/Checkbox/Checkbox.tsx | Table select-all + Tree multiple |
| Icon | src/components/Icon/Icon.tsx | All 6 components |
| Skeleton | src/components/Skeleton/Skeleton.tsx | Table loading state |
| Label | src/utils/components/Label.vue → Label.tsx | RTE label/error |
| getPosition | src/utils/index.ts | Crop drag clamping |
| blendColors | src/utils/index.ts | Colors.tsx palette generation |
| isValidUrl | src/utils/index.ts | RTE link dialog validation |
| checkPath | src/utils/index.ts | Sidebar path matching |
| isObject | src/utils/index.ts | Tree, Sidebar value extraction |
| SidebarOption type | src/utils/types/SidebarOption.ts | Sidebar props |
| DropOption type | src/utils/types/DropOption.ts | Tree options |

**No new npm installations required for Phase 7.**

---

## Architecture Patterns

### Recommended Project Structure

Each component follows this file layout:

```
src/components/Table/
├── Table.tsx          # Main component + compound sub-components
├── Table.module.css   # CSS Modules scoped styles
└── index.ts           # Already exists

src/components/Tree/
├── Tree.tsx           # Tree + internal TreeNode + TreeContext
├── Tree.module.css
└── index.ts

src/components/Sidebar/
├── Sidebar.tsx        # Sidebar + SidebarOption + SidebarSubOption (module scope)
├── Sidebar.module.css
└── index.ts

src/components/RichTextEditor/
├── RichTextEditor.tsx  # Main RTE component
├── Colors.tsx          # Color grid sub-component (separate file)
├── Color.tsx           # Single color swatch (separate file)
├── RichTextEditor.module.css
└── index.ts

src/components/Crop/
├── Crop.tsx
├── Crop.module.css
└── index.ts

src/components/History/
├── History.tsx
├── History.module.css
└── index.ts
```

---

### Pattern 1: Compound Sub-Components via Static Properties (Table)

**What:** Module-scope sub-components assigned as static properties on main component. Established in Phase 6 Dropdown.
**When to use:** Table.Actions, Table.Footer, Table.EmptyState compound slots.

```typescript
// Source: Dropdown.tsx pattern (Phase 6, confirmed working)
// Declare at MODULE scope — never inside Table function body
function TableActions({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
function TableFooter({ children }: { children: React.ReactNode }) {
  return <tfoot>{children}</tfoot>;
}
function TableEmptyState({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Table(props: TableProps) {
  // ...
}
Table.Actions = TableActions;
Table.Footer = TableFooter;
Table.EmptyState = TableEmptyState;
```

**CRITICAL:** Compound sub-components MUST be declared at module scope. If declared inside the parent function body, React treats them as new component types on every render and unmounts/remounts them, destroying state and causing flickers (confirmed in Phase 6 STATE.md entry).

---

### Pattern 2: React Context for Deep Prop Drilling (Tree)

**What:** TreeContext eliminates prop-drilling through arbitrary recursion depth.
**When to use:** Tree → TreeNode → TreeNode → ... recursive hierarchy.

```typescript
// Source: RadioGroup/ToggleGroup context pattern (Phase 3/Phase 6, confirmed working)
interface TreeContextValue {
  selectedValue: any;
  onSelect: (option: DropOption, add: boolean) => void;
  expandedNodes: Set<any>;
  onToggleExpand: (nodeKey: any) => void;
  labelKey: string;
  valueKey: string;
  getObject: boolean;
  multiple: boolean;
  disabled: boolean;
}

const TreeContext = createContext<TreeContextValue | null>(null);

// Internal recursive node — declared at MODULE scope
function TreeNode({ option, depth = 0 }: { option: DropOption; depth?: number }) {
  const ctx = useContext(TreeContext)!;
  const isExpanded = ctx.expandedNodes.has(getValue(option));
  // ...
  return (
    <div className={styles.treeOption}>
      <div onClick={() => ctx.onSelect(option, ...)}>
        {/* label, checkbox if multiple, expand icon */}
      </div>
      {isExpanded && option.options?.map(child => (
        <TreeNode key={getValue(child)} option={child} depth={depth + 1} />
      ))}
    </div>
  );
}
```

---

### Pattern 3: Refs + useEffect for DOM-Imperative Logic (Crop, RTE)

**What:** React refs hold DOM element references; useEffect registers/unregisters event listeners; imperative canvas operations outside React render cycle.
**When to use:** Crop drag tracking, RTE execCommand, ResizeObserver.

```typescript
// Source: Crop.vue onMounted/onBeforeUnmount pattern → React equivalent
const bCropRef = useRef<HTMLDivElement>(null);
const cropAreaRef = useRef<HTMLDivElement>(null);
const isDraggingRef = useRef(false);  // mutable ref, not state — no re-render needed

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => updateCropArea(e);
  const handleMouseUp = () => { isDraggingRef.current = false; };
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);

  const ro = new ResizeObserver(resize);
  if (bCropRef.current) ro.observe(bCropRef.current, { box: 'border-box' });

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    ro.disconnect();
  };
}, []); // Register once on mount, clean up on unmount
```

**CRITICAL:** `isDragging` must be a `useRef` (mutable ref), NOT `useState`. The mousemove/mouseup handlers registered once in `useEffect([])` would capture stale state values if useState were used. The mutable ref pattern avoids re-registering listeners without stale closures — same pattern as Slider in Phase 3.

---

### Pattern 4: savedSelection Ref for RTE Color Picker (RichTextEditor)

**What:** Browser clears the text selection when a toolbar button receives focus. The RTE must save and restore the selection before applying formatting.
**When to use:** Any toolbar button that takes focus away from the contenteditable div.

```typescript
// Source: RichTextEditor.vue saveCurrentSelection / restoreSavedSelection
const savedSelectionRef = useRef<Range | null>(null);

function saveCurrentSelection() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  const range = selection.getRangeAt(0);
  if (editorRef.current?.contains(range.commonAncestorContainer))
    savedSelectionRef.current = range.cloneRange();
}

function restoreSavedSelection() {
  const selection = window.getSelection();
  if (!savedSelectionRef.current || !editorRef.current || !selection) return;
  editorRef.current.focus();
  selection.removeAllRanges();
  // verify range still valid before adding
  const range = savedSelectionRef.current;
  if (editorRef.current.contains(range.commonAncestorContainer))
    selection.addRange(range);
}
```

---

### Pattern 5: react-router Auto-Detection (Sidebar)

**What:** Sidebar uses `<Link>` from react-router-dom if available, falls back to `<a href>`. Vue uses `resolveComponent('router-link')` — React equivalent is a try/catch dynamic import check at component init time.
**When to use:** Sidebar option rendering.

```typescript
// Source: Sidebar.vue getLinkComponent() → React adaptation
// Check at module level (once, not per render)
let LinkComponent: React.ComponentType<any> | 'a' = 'a';
try {
  // Only available if consumer has react-router-dom installed
  const routerDom = await import('react-router-dom');
  LinkComponent = routerDom.Link;
} catch {
  // Fall back to <a>
}

// In render:
// Option with path and no sub-options → use LinkComponent (Link or a)
// Option with sub-options → use div (intercept click to expand)
```

**Note:** The dynamic import cannot be async in a synchronous render. The established approach is to check for react-router at render time using a lazy ref initialized once:
```typescript
const routerAvailable = useRef<boolean | null>(null);
// Or simply: statically detect at module load via try { require('react-router-dom') }
```

---

### Pattern 6: useControllable for All Stateful Props

**What:** All components with a value prop use `useControllable` for controlled/uncontrolled duality.
**When to use:** Table page/itemsPerPage, Tree selection, History selection, RTE value.

```typescript
// Source: useControllable.ts (Phase 1, confirmed working)
const [page, setPage] = useControllable<number>({
  value: props.page,             // controlled: parent provides
  defaultValue: 1,               // uncontrolled: internal default
  onChange: props.onPageChange,  // notify parent
});
```

---

### Pattern 7: CSS Modules for All Phase 7 Components

All six components use CSS Modules (`.module.css`). None use portals, so global CSS is not needed.

```typescript
import styles from './Table.module.css';
// Usage: className={styles.tableContent}
// Conditional: className={clsx(styles.tableContent, noShadow && styles.noShadow)}
```

**Note:** CSS class names in modules use camelCase. Tailwind classes can still be used inline via `className` for one-off utilities.

---

### Anti-Patterns to Avoid

- **Sub-components inside parent function body:** Always declare TreeNode, SidebarOption, TableActions etc. at module scope. Inside the parent body, React creates a new component type on every render, causing unmount/remount and losing state.
- **useState for drag/resize tracking:** isDragging in Crop must be a useRef. useState triggers re-renders during every mouse move, causing performance problems and stale closure bugs in event handlers registered via useEffect([]).
- **Direct innerHTML assignment as controlled state:** In RTE, `editorRef.current.innerHTML` is the source of truth for rendering. React's reconciler must NOT touch the contenteditable div's children — only the `onInput` handler updates the controlled model. Never bind `children` or `dangerouslySetInnerHTML` to a contenteditable div.
- **computedStyleMap() in Crop:** Vue's Crop.vue uses `computedStyleMap()` for CSS variable reading. This API is not available in jsdom and has limited browser support. Use `getComputedStyle()` instead (same as established Slider pattern from Phase 3).
- **Stale closures in ResizeObserver/event handlers:** Use mutable refs (useRef) instead of state when values are read inside long-lived callbacks registered in useEffect([]).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Controlled/uncontrolled duality | Custom value tracking | `useControllable` | Already handles controlled/uncontrolled switching warning, initialisation, and onChange |
| Pagination display | Build page button logic | `Pagination` component (Phase 6) | Already handles ellipsis, edge cases, boundary clamping |
| Font-size Select in toolbar | Custom dropdown | `Select` component (Phase 6) | Already handles options, controlled value, compact variant |
| Color palette generation | Hand-calculate colors | `blendColors()` from utils | Already implemented matching Vue's palette algorithm |
| URL validation for RTE link dialog | Custom regex | `isValidUrl()` from utils | Already exists with matching Vue logic |
| Path matching for Sidebar | window.location checks | `checkPath()` from utils | Already implemented matching Vue's path matching |
| CSS variable reading | computedStyleMap | `getComputedStyle()` | jsdom compatible; established pattern (Slider Phase 3) |
| Click-outside for RTE color picker | Custom listener | `useClickOutside` hook | Already handles mousedown pattern, cleanup |

---

## Common Pitfalls

### Pitfall 1: Table Render Prop vs Vue Named Slots

**What goes wrong:** Vue Table uses named slots for each column (`v-slot:[header.value]`). React render props work differently — the column descriptor object carries the render function.
**Why it happens:** Direct Vue-to-React slot mapping is not 1:1. Named slots map to render props on the column descriptor.
**How to avoid:** Column interface:
```typescript
interface Column {
  label?: string;
  value: string;       // field key
  sortable?: boolean;
  width?: string;
  align?: string;
  render?: (value: any, item: any, index: number) => React.ReactNode;
}
```
In tbody: `column.render ? column.render(item[column.value], item, rowIndex) : item[column.value]`

**Warning signs:** Column cells showing raw values when custom rendering is expected.

---

### Pitfall 2: RTE contenteditable + React reconciliation conflict

**What goes wrong:** React tries to reconcile the DOM of the contenteditable div, overwriting user edits.
**Why it happens:** React's diffing algorithm interferes with browser-managed DOM inside contenteditable elements.
**How to avoid:** The contenteditable div must be treated as an uncontrolled DOM node. Use `ref` to access it imperatively. In the `watch` equivalent (`useEffect` on `value` prop change), only update `innerHTML` if it differs from current content:
```typescript
useEffect(() => {
  if (!editorRef.current || editorRef.current.innerHTML === value) return;
  editorRef.current.innerHTML = sanitizeHTML(value ?? '');
  applyContentStyles();
}, [value]);
```
Never assign `dangerouslySetInnerHTML` or `children` to the contenteditable div.

**Warning signs:** Cursor jumps to beginning after typing; typed content disappears.

---

### Pitfall 3: Tree selection model complexity with getObject + multiple

**What goes wrong:** Vue's Tree/Option.vue selection logic for `getObject=true` + `multiple=true` maintains a tree-shaped selection array (parent objects with nested `options` arrays). Naive React state won't preserve this shape.
**Why it happens:** The Vue implementation uses `parseModel` / `updateSelection` / `parseOption` functions that mutate a deep tree structure. These need a careful direct port.
**How to avoid:** Port the `parseModel`, `updateSelection`, `parseOption`, and `getParent` functions from Tree.vue verbatim into Tree.tsx as pure utility functions outside the component. Keep the logic separate from React state management.
**Warning signs:** Multi-select with nested options deselects wrong nodes; parent/child selection states diverge.

---

### Pitfall 4: Sidebar Height Calculation Timing

**What goes wrong:** `querySelector('.navbar')` returns null or zero height on first render before the Navbar has painted.
**Why it happens:** Vue uses a computed property that depends on `document.readyState`. React needs equivalent timing.
**How to avoid:** Use `useEffect` (not `useLayoutEffect`) to compute the height after paint, and optionally listen to `window.resize`:
```typescript
const [sidebarHeight, setSidebarHeight] = useState('100vh');
useEffect(() => {
  const compute = () => {
    const nav = document.querySelector('.navbar');
    const h = nav?.getBoundingClientRect().height ?? 0;
    setSidebarHeight(h ? `calc(100vh - ${h}px)` : '100vh');
  };
  compute();
  window.addEventListener('resize', compute);
  return () => window.removeEventListener('resize', compute);
}, []);
```
**Warning signs:** Sidebar overlaps Navbar; sidebar height = 100vh even when Navbar is present.

---

### Pitfall 5: RTE History (undo/redo) isRestoringHistory flag

**What goes wrong:** When restoring from undo/redo history, `onInput` fires (because innerHTML changes), saving the restored content as a new history entry and corrupting the undo stack.
**Why it happens:** `onInput` is always called on `innerHTML` mutation.
**How to avoid:** Use a `useRef` (not state) for `isRestoringHistory`:
```typescript
const isRestoringHistoryRef = useRef(false);
// In undoAction/redoAction: set isRestoringHistoryRef.current = true before innerHTML, false after
// In onInput: if (isRestoringHistoryRef.current) return;
```
Ref, not state, because we don't want the flag change to trigger a re-render.

**Warning signs:** Undo jumps multiple steps; redo doesn't work after undo.

---

### Pitfall 6: Crop computedBorderRadius — computedStyleMap incompatibility

**What goes wrong:** Vue's Crop.vue reads `--border-radius-xl` via `computedStyleMap()`. This API is not available in all browsers and is absent from jsdom.
**Why it happens:** Crop.vue was written with Chromium-only API.
**How to avoid:** Use `getComputedStyle(element).getPropertyValue('--border-radius-xl')` instead (confirmed jsdom-compatible from Slider Phase 3 established pattern). The Crop SVG mask's `rx`/`ry` attributes should use this value.
**Warning signs:** SVG crop mask has no border-radius; TypeError in tests.

---

### Pitfall 7: Table selectAll mutates items array

**What goes wrong:** Vue's `selectAll` mutates `item.selected` directly on the items array. In React, this won't trigger re-renders.
**Why it happens:** Vue's reactivity tracks deep mutations; React requires new references.
**How to avoid:** The React implementation should NOT mutate the items array. Instead, maintain a `selectedItems: Set<any>` in internal state and expose it via `onSelectAll` / `onSelectRow` callbacks. The consumer controls `item.selected` on their side if needed.
**Warning signs:** Checkboxes don't appear checked after clicking "select all".

---

## Code Examples

### Table: Render Prop Column Cell Pattern

```typescript
// Source: Derived from Table.vue column slot pattern + CONTEXT.md locked decision
interface Column {
  label?: string;
  value: string;
  sortable?: boolean;
  width?: string;
  align?: 'flex-start' | 'center' | 'flex-end';
  render?: (value: any, item: any, index: number) => React.ReactNode;
}

// In tbody:
{columns.map(col => (
  <td key={col.value} className={styles.td}>
    {col.render
      ? col.render(item[col.value], item, rowIndex)
      : item[col.value]}
  </td>
))}
```

### Table: Compound Slot Detection

```typescript
// Source: Dropdown.tsx static property pattern (Phase 6)
// How Table detects if Table.Actions was passed as children:
function hasSlot(children: React.ReactNode, SlotType: React.ElementType): boolean {
  return React.Children.toArray(children).some(
    child => React.isValidElement(child) && child.type === SlotType
  );
}
// Usage: hasActions = hasSlot(children, Table.Actions)
// colspan computed = columns.length + (enableSelection?1:0) + (enableAggregation?1:0) + (hasActions?1:0)
```

### Tree: Context Provider + Recursive Node

```typescript
// Source: RadioGroup context pattern (Phase 3) adapted for Tree
const TreeContext = createContext<TreeContextValue | null>(null);

export function Tree({ value, defaultValue, onChange, options, labelKey = 'label', valueKey = 'value', getObject = false, multiple = false, disabled = false }: TreeProps) {
  const [selectedValue, setSelectedValue] = useControllable({ value, defaultValue: multiple ? [] : undefined, onChange });
  const [expandedNodes, setExpandedNodes] = useState(new Set<any>());

  return (
    <TreeContext.Provider value={{ selectedValue, onSelect: handleSelect, expandedNodes, onToggleExpand: handleToggle, labelKey, valueKey, getObject, multiple, disabled }}>
      <div className={styles.tree}>
        {options.map(opt => <TreeNode key={getValue(opt)} option={opt} />)}
      </div>
    </TreeContext.Provider>
  );
}
```

### RTE: contenteditable Ref Pattern

```typescript
// Source: RichTextEditor.vue onMounted + watch pattern
const editorRef = useRef<HTMLDivElement>(null);

// Mount: initialize innerHTML
useEffect(() => {
  if (!editorRef.current) return;
  editorRef.current.innerHTML = sanitizeHTML(value ?? '');
  applyContentStyles();
  saveToHistory(value ?? '');
}, []); // mount only

// Controlled update: sync incoming value prop to DOM
useEffect(() => {
  if (!editorRef.current || editorRef.current.innerHTML === value) return;
  editorRef.current.innerHTML = sanitizeHTML(value ?? '');
  applyContentStyles();
}, [value]);

// JSX: div with ref, NOT dangerouslySetInnerHTML
<div
  ref={editorRef}
  contentEditable={!disabled}
  className={styles.editor}
  onInput={onInput}
  onKeyDown={handleKeyDown}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
/>
```

### Crop: ResizeObserver + mutable isDragging ref

```typescript
// Source: Crop.vue onMounted + ResizeObserver pattern
const isDraggingRef = useRef(false);
const bCropRef = useRef<HTMLDivElement>(null);
const cropAreaRef = useRef<HTMLDivElement>(null);
const svgWidthRef = useRef(0);
const svgHeightRef = useRef(0);
const [svgDims, setSvgDims] = useState({ width: 0, height: 0 }); // only for SVG re-render

useEffect(() => {
  const ro = new ResizeObserver(() => {
    svgWidthRef.current = (bCropRef.current?.clientWidth ?? 0) + 10;
    svgHeightRef.current = (bCropRef.current?.clientHeight ?? 0) + 10;
    setSvgDims({ width: svgWidthRef.current, height: svgHeightRef.current });
  });
  if (bCropRef.current) ro.observe(bCropRef.current, { box: 'border-box' });

  const onMouseMove = (e: MouseEvent) => updateCropArea(e);
  const onMouseUp = () => { isDraggingRef.current = false; };
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  // ... touch events

  return () => {
    ro.disconnect();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };
}, []);
```

### History: useControllable + position variants

```typescript
// Source: History.vue direct port
const [model, setModel] = useControllable<any>({
  value,
  defaultValue: null,
  onChange,
});

// Active state matches Vue:
const isActive = (option: any, index: number) =>
  (index === 0 && !model && !disabled) || option === model;
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Vue named slots for Table columns | React render-prop `columns[].render` | Phase 7 CONTEXT.md | Consumer API changes; enables typed render functions |
| Vue `resolveComponent('router-link')` in Sidebar | React try/catch dynamic import or lazy ref check | Phase 7 | Different mechanism, same behavior |
| Vue `computedStyleMap()` in Crop | `getComputedStyle()` for CSS variables | Phase 7 | Cross-browser + jsdom compatible |
| Vue `v-model` for Tree | `useControllable` + TreeContext | Phase 7 | React controlled/uncontrolled duality |

**Deprecated/outdated in this phase:**
- `computedStyleMap()`: Do not use. Not in jsdom, limited browser support. Replaced by `getComputedStyle()`.
- Vue slot pattern (`#actions`, `#footer`, `#empty-state`): Replaced by compound sub-components (`Table.Actions`, etc.) and render props.

---

## Open Questions

1. **react-router-dom detection mechanism**
   - What we know: Vue uses `resolveComponent()` at render time. React has no equivalent synchronous check.
   - What's unclear: Whether `typeof Link !== 'undefined'` or try/catch at module level is the right pattern.
   - Recommendation: Use a module-level try/catch — `let RouterLink: any = null; try { RouterLink = require('react-router-dom').Link; } catch {}` — evaluated once at module load. If RouterLink is null, fall back to `<a>`.

2. **Table row memoization strategy (Claude's Discretion)**
   - What we know: Vue's Table doesn't memoize rows explicitly; React re-renders all rows on any state change.
   - What's unclear: Whether `React.memo` on row components would conflict with render prop callbacks (new function reference each render).
   - Recommendation: Start without memoization. If performance is a concern, wrap render prop callbacks in `useCallback` at the Table level and wrap rows in `React.memo`. Confirm after initial implementation.

3. **Sidebar sub-option expand state**
   - What we know: `SidebarSubOption` in Vue manages its own `expanded` ref internally.
   - What's unclear: Whether `SidebarSubOption` should be a module-scope component (to avoid remount) or can be inline.
   - Recommendation: Declare `SidebarSubOption` at module scope in Sidebar.tsx, same as the established Dropdown/TreeNode pattern.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.2.x + React Testing Library 16.x |
| Config file | `vite.config.ts` — `test.projects[1]` (unit project, name: "unit") |
| Quick run command | `npx vitest run --project unit src/components/Table/Table.test.tsx` |
| Full suite command | `npx vitest run --project unit` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CPLX-01 | Table renders rows and columns; custom cell render prop fires | unit | `npx vitest run --project unit src/components/Table/Table.test.tsx` | ❌ Wave 0 |
| CPLX-01 | Table sorting updates displayed rows (client-side) | unit | same file | ❌ Wave 0 |
| CPLX-01 | Table pagination slices items correctly; Pagination component wired | unit | same file | ❌ Wave 0 |
| CPLX-02 | Tree renders nodes; selection fires onChange | unit | `npx vitest run --project unit src/components/Tree/Tree.test.tsx` | ❌ Wave 0 |
| CPLX-02 | Tree nodes expand and collapse | unit | same file | ❌ Wave 0 |
| CPLX-03 | Sidebar renders options; active item updates on click | unit | `npx vitest run --project unit src/components/Sidebar/Sidebar.test.tsx` | ❌ Wave 0 |
| CPLX-04 | RichTextEditor renders toolbar and contenteditable area | unit | `npx vitest run --project unit src/components/RichTextEditor/RichTextEditor.test.tsx` | ❌ Wave 0 |
| CPLX-04 | RichTextEditor fires onChange on input | unit | same file | ❌ Wave 0 |
| CPLX-05 | Crop renders crop area and zoom slider | unit | `npx vitest run --project unit src/components/Crop/Crop.test.tsx` | ❌ Wave 0 |
| CPLX-06 | History renders options; setModel fires on click | unit | `npx vitest run --project unit src/components/History/History.test.tsx` | ❌ Wave 0 |
| CPLX-06 | History position variants apply correct CSS classes | unit | same file | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --project unit src/components/{ComponentName}/{ComponentName}.test.tsx`
- **Per wave merge:** `npx vitest run --project unit`
- **Phase gate:** Full unit suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/components/Table/Table.test.tsx` — covers CPLX-01
- [ ] `src/components/Tree/Tree.test.tsx` — covers CPLX-02
- [ ] `src/components/Sidebar/Sidebar.test.tsx` — covers CPLX-03
- [ ] `src/components/RichTextEditor/RichTextEditor.test.tsx` — covers CPLX-04
- [ ] `src/components/Crop/Crop.test.tsx` — covers CPLX-05
- [ ] `src/components/History/History.test.tsx` — covers CPLX-06

All six test files need to be created in Wave 0. Framework and setup infrastructure are already in place (confirmed from Dropdown.test.tsx and vite.config.ts). Test pattern: import from `./index`, render without crashing, assert `document.body.toBeTruthy()` as minimum; add functional assertions per component behavior.

---

## Component-by-Component Implementation Notes

### Table (CPLX-01) — High Complexity

**Prop interface:**
```typescript
interface TableProps {
  columns: Column[];
  items: any[];
  sortOptions?: { by?: string; desc?: boolean };
  page?: number;
  itemsPerPage?: number;
  numberOfItems?: number;
  renderPaginationInBackEnd?: boolean;
  hideFooter?: boolean;
  isHeaderFixed?: boolean;
  enableSelection?: boolean;
  enableAggregation?: boolean;
  loading?: boolean;
  noShadow?: boolean;
  hasHover?: boolean;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (n: number) => void;
  onSortBy?: (key: string, desc: boolean) => void;
  onPageItems?: (page: number, itemsPerPage: number) => void;
  onSelectAll?: (value: boolean) => void;
  children?: React.ReactNode; // for Table.Actions, Table.Footer, Table.EmptyState
  className?: string;
}
```

**Key internal state:** `sortByName`, `pagedItems`, `isDesc` (per-column boolean map), `itemsPerPageHolder`, `pageHolder`, `allSelected`.

**Client-side sort:** Port `sortBy()` logic from Table.vue verbatim. The sort mutates a copy of items (`[...props.items].sort()`), not the original array. Update `pagedItems` after sort.

**items watcher equivalent:** `useEffect` watching `props.items` ref — when items change, re-run sort+slice. Use `useEffect([items])` not `useEffect([])`.

**Compound slot detection:** Children scan using `React.Children.toArray` + `child.type === Table.Actions` to determine if actions column exists (for colspan calculation).

**Performance note (Claude's Discretion):** No memoization in initial implementation. Table rows re-render on any parent state change. If consumer passes render props with stable references, performance is acceptable.

---

### Tree (CPLX-02) — High Complexity

**Key complexity:** `getObject=true` + `multiple=true` mode maintains a hierarchical selection array matching the option tree shape. The `parseModel`, `updateSelection`, and `parseOption` logic from Tree.vue must be ported as pure utility functions.

**Context shape** (from CONTEXT.md locked decision):
```typescript
interface TreeContextValue {
  selectedValue: any;           // primitive or array
  onSelect: (option: DropOption, add: boolean) => void;
  expandedNodes: Set<any>;
  onToggleExpand: (nodeKey: any) => void;
  labelKey: string;
  valueKey: string;
  getObject: boolean;
  multiple: boolean;
  disabled: boolean;
}
```

**Expand state:** Internal `useState<Set<any>>` for expanded node keys. Toggling creates a new Set (immutable update) to trigger re-render:
```typescript
setExpandedNodes(prev => {
  const next = new Set(prev);
  next.has(key) ? next.delete(key) : next.add(key);
  return next;
});
```

**TreeNode** at module scope. Uses `option.options?.length` to decide whether to show expand icon. Nested TreeNode for sub-options when expanded. Checkbox when `multiple=true`.

---

### Sidebar (CPLX-03) — Medium Complexity

**Two distinct sub-panels:**
1. **Main rail** (`sidebar-options`): Icon-only or icon+label options, splits top/bottom via `option.bottom` field.
2. **Sub-panel** (`sub-options`): Slides in when a main-rail item with children is clicked. Positioned `left: 100%` absolutely.

**Sub-panel animation** (CSS transition matching Vue `expand` transition):
```css
/* Sidebar.module.css */
.subOptions {
  transition: opacity 0.3s, transform 0.3s;
  overflow: hidden;
}
.subOptionsHidden {
  opacity: 0;
  transform: translateX(-10px);
  max-width: 0;
}
.subOptionsVisible {
  opacity: 1;
  /* max-width computed from sidebar width */
}
```

**blur/focusout:** Vue uses `@focusout` with `relatedTarget` check to close sub-panel when focus leaves entirely. React equivalent: `onBlur` with `e.relatedTarget` check — same pattern.

**SidebarSubOption** handles nested options with its own `expanded` boolean state (controls showing children recursively, same as Vue SubOption.vue).

---

### RichTextEditor (CPLX-04) — Highest Complexity (1792-line Vue source)

**Colors.tsx interface:**
```typescript
interface ColorsProps {
  value: string;
  expanded: boolean;
  custom: string[];
  onValueChange: (color: string) => void;
  onExpandedChange: (expanded: boolean) => void;
  onCustomChange: (colors: string[]) => void;
  children?: React.ReactNode; // trigger slot
}
```

**Key RTE state categories:**
- `options` object: toolbar config (groups: doCommands, size, fontStyle, colors, lists, alignment, insertElements, formatting) — each option has `selected: boolean` that `updateActiveStates()` refreshes
- History stack: `history: string[]`, `historyIndex: number`, `isRestoringHistoryRef`
- Selection save: `savedSelectionRef: React.MutableRefObject<Range | null>`
- Dialogs: `showLinkDialog: boolean`, `showImageUpload: boolean`, `linkUrl: string`, `linkText: string`
- Color state: `customColorOptions: string[]`

**Toolbar render groups** (from Vue options structure):
1. doCommands: undo, redo
2. size: font-size Select
3. fontStyle: bold, italic, underline, strikeThrough
4. colors: foreColor, backColor (each with Colors.tsx popover)
5. lists: insertUnorderedList, insertOrderedList
6. alignment: justifyLeft, justifyCenter, justifyRight, justifyFull
7. insertElements: link, image, blockquote
8. formatting: removeFormat

**onInput** calls: `emit onChange`, `saveToHistory`, `updateActiveStates`.

**`options` state:** In Vue this is a `ref<Record<...>>` with nested objects. In React, use `useState` for the options record, or — more efficiently — use individual `useRef` objects for toolbar active states that are refreshed imperatively by `updateActiveStates` without triggering a full re-render. However, since toolbar active states must show/hide the "active" CSS class, they do need to be in state. Use a single `useState` for the flat map of `{ bold: boolean, italic: boolean, ... }`.

---

### Crop (CPLX-05) — Medium Complexity

**State that needs React state (triggers re-render):** `zoom`, `svgDims` (for SVG viewBox dimensions).
**State that should be refs (no re-render):** `isDragging`, `parsedImgSrc` (can be state for `<img src>`).

**getPosition utility:** Already ported from Vue utils and available at `src/utils/index.ts`. Use directly.

**Canvas operations** are entirely imperative — `changeZoom` and `crop` functions create canvas elements, draw, and emit base64 data URL. These do NOT affect React state directly; they call `onChange` with the cropped data.

**SVG mask:** The `<rect ref={selectedAreaRef}>` inside the SVG mask needs a plain DOM ref to update `x`/`y` attributes imperatively during drag — consistent with the Vue `$refs.selectedArea.setAttribute` pattern.

---

### History (CPLX-06) — Low Complexity

**Direct port of History.vue.** Main complexity is CSS for the 4 position variants (top/bottom/left/right) and 6 type colors (primary/info/success/warning/danger/neutral).

**Props:**
```typescript
interface HistoryProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  options: HistoryOption[];
  position?: 'top' | 'bottom' | 'left' | 'right';
  type?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  disabled?: boolean;
  renderOption?: (option: any, index: number, active: boolean) => React.ReactNode;
  className?: string;
}
```

**Vue slot `#option`** maps to `renderOption` render prop. Each option item calls `renderOption?.(option, index, isActive(option, index))`.

**CSS approach:** Use CSS Modules with compound class names like `styles.optionRight`, `styles.optionTop`, applying `styles[position]` dynamically. History.vue's CSS is entirely position-variant-driven — port the CSS verbatim into `History.module.css`.

---

## Sources

### Primary (HIGH confidence)
- Verified directly from Vue source files (Table.vue, Tree.vue, Option.vue, Sidebar.vue, SubOption.vue, Crop.vue, History.vue, RichTextEditor.vue, Colors.vue) — full implementation logic read
- Verified from existing React components (Dropdown.tsx, Pagination.tsx, Select.tsx, Checkbox.tsx, useControllable.ts) — API contracts confirmed
- Verified from vite.config.ts — test infrastructure configuration confirmed
- Verified from CONTEXT.md — all locked decisions read and reproduced above
- Verified from STATE.md — established patterns from prior phases confirmed (module-scope sub-components, mutable ref for drag, getComputedStyle vs computedStyleMap)

### Secondary (MEDIUM confidence)
- react-router-dom auto-detection: try/catch module-level pattern — derived from Vue `resolveComponent` equivalent; common React library detection idiom

### Tertiary (LOW confidence)
- None — all findings are verified from project source code

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries and utilities confirmed present in codebase
- Architecture: HIGH — patterns verified from prior-phase implementations (Dropdown, RadioGroup, Slider, useControllable)
- Pitfalls: HIGH — most derived from direct Vue source reading + established STATE.md decisions; computedStyleMap pitfall confirmed from Crop.vue source
- Implementation notes: HIGH — derived from complete Vue source reading

**Research date:** 2026-03-20
**Valid until:** 2026-04-20 (stable — no fast-moving external dependencies)
