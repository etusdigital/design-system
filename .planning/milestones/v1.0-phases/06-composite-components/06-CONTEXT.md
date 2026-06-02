# Phase 6: Composite Components - Context

**Gathered:** 2026-03-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate 17 composite components from Vue SFCs to React TSX. These are overlay-based, interactive, and multi-part components that depend on the internal utilities (Container, SelectContainer, SelectContent, ExpandableContainer, Overlay, Group, Option) from Phase 4 and the providers (Dialog, Confirm, Toast) from Phase 5. Dialog is already migrated — verify only. Stepper drops version 1 (arrow breadcrumbs) and keeps only version 2 (circle icons with connecting lines). Input `type="color"` integration with ColorPicker (deferred from Phase 3) is resolved in this phase.

Components: Select, AutoComplete, TagSelect, Dropdown, Dialog (verify only), Drawer, Accordion, Carousel, Tab, Pagination, Filter, Stepper, Navbar, RoundMenu, ColorPicker, DatePicker, Calendar.

</domain>

<decisions>
## Implementation Decisions

### Dropdown Family Strategy
- **Faithful individual ports** — port each of Select, AutoComplete, TagSelect, Dropdown independently, mirroring the Vue structure exactly
- Shared infrastructure (SelectContainer, SelectContent, Option, Group, ExpandableContainer) is already migrated in Phase 4 — no new shared hooks needed
- Select, AutoComplete, TagSelect use SelectContainer/SelectContent/Option (shared utilities)
- Dropdown uses ExpandableContainer + its own private Options/Option sub-components for nested group support

### Dropdown Private Sub-Components
- Dropdown's private Options.vue and Option.vue → **compound sub-components**: `Dropdown.Option` and `Dropdown.Options`
- Exported as static properties on the Dropdown component, accessible to consumers for custom rendering

### Select Multi-Mode
- Keep `multiple` prop on Select (inline) — when true, renders Checkbox inside each Option
- Single component serves both single and multi-select modes, matching Vue API exactly

### Scoped Slot → Compound + Context Pattern
- Named slots with scoped data (e.g., Select's `option` slot with `{option, index}`) → **compound sub-components with context**
- Parent provides data via React context; child compound components consume it
- Consistent across Select, TagSelect, Filter for option customization
- Simple label slots (status, search-label) → compound sub-components without scoped data

### AutoComplete Input State
- AutoComplete manages the text input state **internally**
- Consumer only sees `value`/`onChange` for the selected option
- Matches Vue behavior where v-model is the selected value, not the search text

### Calendar & DatePicker
- **Raw Date + existing utils** — reuse framework-agnostic utility functions (getArrayMonthDay, getMonths, checkDateType, dateOptions, capitalizeFirstLetter) as-is
- No date library (no date-fns, no dayjs) — zero new dependencies
- Calendar's Day.vue and DateDialog.vue → **compound sub-components**: `Calendar.Day` and `Calendar.DateDialog`
- Calendar slide-fade transitions → **useTransition hook** for mount/unmount timing + CSS classes for slide direction (consistent with Dialog, Toast, Overlay)
- DatePicker action labels (Clear/Apply/Compare) → **string label props** (clearLabel, applyLabel, compareLabel), not compound sub-components
- DatePicker wraps Calendar in ExpandableContainer — faithful port of Vue structure

### Carousel
- Uses CSS `translateX`/`translateY` transitions — no touch/swipe needed (Vue doesn't have it)
- `computedStyleMap()` → **`getComputedStyle()`** for CSS variable reading (consistent with Slider in Phase 3, works in jsdom)
- Vue `nextTick` for layout measurements → **`useLayoutEffect`** for post-render DOM measurements (prevents visual flicker)
- Autoplay via **`setInterval` in `useEffect`** with cleanup on unmount/prop change — faithful port, no pause-on-hover (Vue doesn't have it)
- Scoped `option` slot → **children-as-function** pattern: `children={(option, index) => <MyCard />}`

### Filter
- Action labels (Clear/Apply) → **string label props** (clearLabel, applyLabel, statusLabel) — consistent with DatePicker
- Sub-option rendering → **fixed Checkbox pattern** — Filter always renders checkboxes, not customizable. Render prop for sub-option label text only
- Uses SelectContainer + SelectContent + Option + Checkbox — all already migrated
- Category expand/collapse uses max-height CSS transition (no useTransition needed — in-place, not mount/unmount)

### Stepper
- **Version 2 only** — drop version 1 (arrow breadcrumb). Remove `version` prop entirely
- Dynamic `background` color → **CSS variable injection**: set `--stepper-bg` via inline style on root, reference in CSS with `var(--stepper-bg)`
- Simplified component: circle icon buttons with connecting lines, active/past/skipped states

### Drawer
- Uses Overlay (Phase 4) + slide transition — similar to Dialog pattern
- Position prop (top/bottom/left/right) controls slide direction
- `useTransition` hook for enter/exit animation + `useControllable` for open/close state

### Accordion
- Uses ResizeObserver + MutationObserver for content height — similar to Container from Phase 4
- `useControllable` for expanded state
- `duration` prop controls CSS transition timing

### Tab, Pagination, Navbar, RoundMenu
- Straightforward ports — Tab and Pagination use `useControllable`, Navbar uses Dropdown internally
- RoundMenu calculates positions with trigonometry (cos/sin) — pure math, no framework dependencies

### ColorPicker
- Most complex component (594 lines) — color area + hue slider + opacity slider + type conversion (hexa/rgba/hsla/hsva/hwb)
- Uses window mousemove/mouseup/touchmove listeners for drag — same ref-forwarding pattern as Slider (Phase 3)
- All color utility functions (hexaToRgba, rgbaToHsva, etc.) are framework-agnostic — import directly from src/utils
- Input `type="color"` from Phase 3 will be wired to ColorPicker in this phase

### Claude's Discretion
- Migration order of the 17 components (dependency-aware batching into plans)
- Exact CSS Module class naming and file structure for each component
- Internal state management choices (useReducer vs useState) within complex components
- How to handle Navbar's internal Dropdown integration (inline vs separate rendering)
- Accordion's ResizeObserver/MutationObserver cleanup patterns
- RoundMenu position calculation implementation details
- ColorPicker drag handler architecture (which refs, which effects)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Vue Source Files (migration source — dropdown family)
- `src/components/Select/Select.vue` — Select with single/multi mode, searchable, keyboard nav (310 lines)
- `src/components/AutoComplete/AutoComplete.vue` — Input-based autocomplete with filtering (106 lines)
- `src/components/TagSelect/TagSelect.vue` — Multi-value tag selector with tag creation (295 lines)
- `src/components/Dropdown/Dropdown.vue` — Nested/grouped option dropdown (185 lines)
- `src/components/Dropdown/Options.vue` — Dropdown's private recursive options renderer
- `src/components/Dropdown/Option.vue` — Dropdown's private option item

### Vue Source Files (migration source — calendar/date)
- `src/components/Calendar/Calendar.vue` — Month grid with date/period/compare modes (409 lines)
- `src/components/Calendar/Day.vue` — Calendar's private day cell component
- `src/components/Calendar/DateDialog.vue` — Calendar's private month/year picker dialog
- `src/components/DatePicker/DatePicker.vue` — ExpandableContainer wrapping Calendar (288 lines)

### Vue Source Files (migration source — other composites)
- `src/components/Drawer/Drawer.vue` — Slide-in overlay panel (155 lines)
- `src/components/Accordion/Accordion.vue` — Collapsible content with ResizeObserver (135 lines)
- `src/components/Carousel/Carousel.vue` — Slide carousel with autoplay and keyboard nav (324 lines)
- `src/components/Tab/Tab.vue` — Tab navigation (101 lines)
- `src/components/Pagination/Pagination.vue` — Page navigation with ellipsis (138 lines)
- `src/components/Filter/Filter.vue` — Multi-level checkbox filter (331 lines)
- `src/components/Stepper/Stepper.vue` — Step indicator v1+v2 (359 lines, only v2 migrated)
- `src/components/Navbar/Navbar.vue` — Navigation bar with Dropdown (139 lines)
- `src/components/RoundMenu/RoundMenu.vue` — Circular floating menu (88 lines)
- `src/components/ColorPicker/ColorPicker.vue` — Color picker with area+sliders (594 lines)

### Already Migrated (reference patterns)
- `src/components/Dialog/Dialog.tsx` — Portal + useTransition + Overlay pattern (55 lines)
- `src/components/Confirm/Confirm.tsx` — Provider + Dialog wrapping pattern (95 lines)
- `src/components/Toast/Toast.tsx` — Portal + slide animation + auto-dismiss (231 lines)
- `src/utils/components/SelectContainer.tsx` — ResizeObserver + MutationObserver + dropdown (175 lines)
- `src/utils/components/SelectContent.tsx` — Search + expanded state (118 lines)
- `src/utils/components/ExpandableContainer.tsx` — Absolute positioned dropdown card (116 lines)
- `src/utils/components/Container.tsx` — Base container with useControllable (170 lines)
- `src/utils/components/Overlay.tsx` — Portal + backdrop (38 lines)
- `src/utils/components/Group.tsx` — Context-based selection coordination (47 lines)
- `src/utils/components/Option.tsx` — Presentational option item (33 lines)
- `src/composables/useControllable.ts` — Controlled/uncontrolled hook
- `src/composables/useTransition.ts` — Mount/unmount animation timing
- `src/composables/useClickOutside.ts` — Click-outside detection hook
- `src/components/Slider/Slider.tsx` — Reference for getComputedStyle + window listener + ref-forwarding patterns

### Utility Functions (framework-agnostic, reuse as-is)
- `src/utils/index.ts` — Color functions (hexaToRgba, rgbaToHsva, etc.), date functions (getArrayMonthDay, getMonths, checkDateType, dateOptions, calculateDate), validation, masking, isObject

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SelectContainer.tsx` + `SelectContent.tsx` + `Option.tsx`: Used by Select, AutoComplete, TagSelect, Filter
- `ExpandableContainer.tsx`: Used by Dropdown, DatePicker
- `Overlay.tsx`: Used by Drawer (same pattern as Dialog)
- `Container.tsx`: Used by Accordion (ResizeObserver pattern)
- `Group.tsx`: Selection coordination context
- `useControllable`: For expanded, value, and model state across all dropdown-family and form-like composites
- `useTransition`: For Drawer slide, Calendar slide-fade, Accordion expand
- `useClickOutside`: For dropdown dismiss
- `Icon.tsx`: Used by Calendar arrows, Stepper icons, Navbar, RoundMenu, ColorPicker
- `Checkbox.tsx`: Used inside Select (multiple mode), Filter (sub-options)
- `Button.tsx`: Used by Filter actions, DatePicker actions, TagSelect add button
- `Input.tsx`: Used by AutoComplete, Dropdown (searchable mode), ColorPicker
- `StatusBadge.tsx`: Used by TagSelect for tag display
- `Dialog.tsx`: Already migrated — Drawer follows similar Overlay pattern
- Color/date utilities in `src/utils/index.ts`: All framework-agnostic, import directly

### Established Patterns
- CSS Modules: `Component.module.css` + `colors.module.css` (Phase 2)
- Compound sub-components for named slots (Phase 2/3)
- `className` prop on every component (Phase 1)
- React Context for group coordination (Phase 3: RadioGroupContext, ToggleGroupContext)
- Portal to document.body via `createPortal` (Phase 4)
- useTransition(value, { duration }) → { isMounted, isActive } (Phase 1)
- CSS variable injection for dynamic values in pseudo-elements (Icon fontSize, now Stepper background)
- getComputedStyle for CSS variable reading in jsdom (Phase 3 Slider)
- useLayoutEffect for post-render DOM measurements (new pattern for Carousel)
- Window listener ref-forwarding pattern for drag operations (Phase 3 Slider)

### Integration Points
- `src/components/index.ts`: All 17 components already have stub TSX + index.ts exports from Phase 1
- `src/index.ts`: Main entry point already wired
- Phase 3 deferred: Input `type="color"` → needs ColorPicker integration in this phase
- Phase 7: Complex components (Table, Tree, etc.) will use some of these composites (Tab, Pagination)

</code_context>

<specifics>
## Specific Ideas

- Dialog (COMP-05) is already migrated in Phase 5 — verify-only, no migration work needed
- Stepper version 1 (arrow breadcrumbs) is explicitly dropped — only version 2 (circle icons with lines) is migrated. Remove the `version` prop.
- ColorPicker (594 lines) is the largest and highest-risk component — uses mouse/touch drag listeners on window, color space conversions, and multiple slider interactions. Follow Slider's ref-forwarding pattern from Phase 3.
- Filter is structurally similar to Select (uses same SelectContainer/SelectContent/Option) but adds expandable category groups — treat as an enhanced multi-select pattern
- Dropdown has its own private Option.vue and Options.vue that are different from the shared utility Option — these handle nested/recursive option groups
- Navbar internally uses Dropdown for navigation — ensure Dropdown is migrated before Navbar
- RoundMenu uses trigonometric positioning (cos/sin) with CSS translate3d — pure math, straightforward port
- Calendar supports three modes: date (single), period (range), compare (two ranges) — complex state management, but all date math is in framework-agnostic utils

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-composite-components*
*Context gathered: 2026-03-17*
