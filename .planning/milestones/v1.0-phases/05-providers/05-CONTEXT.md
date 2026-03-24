# Phase 5: Providers - Context

**Gathered:** 2026-03-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace Vue's event-emitter-based global services (`$confirm`, `$toast`) with React context providers and hooks. Create `DesignSystemProvider` as root wrapper, `ConfirmProvider` + `useConfirm` for confirmation dialogs, and `ToastProvider` + `useToast` for toast notifications. Migrate prerequisite components (Spinner, Button, Alert, Dialog) into this phase since Confirm depends on Dialog and Toast depends on Alert/Button.

</domain>

<decisions>
## Implementation Decisions

### Dependency Strategy
- Pull Spinner, Button, Alert, and Dialog migrations into Phase 5 as prerequisites
- Spinner: needed by Button (loading state)
- Button: needed by Confirm (accept/cancel buttons) and Toast (action buttons)
- Alert: needed by Toast (renders toasts as Alert components)
- Dialog: needed by Confirm (wraps the confirmation dialog)
- Icon already migrated in Phase 1; Overlay already migrated in Phase 4

### Provider Architecture
- Single `DesignSystemProvider` as the consumer-facing root wrapper — internally nests ConfirmProvider + ToastProvider
- Export all three individually: `DesignSystemProvider`, `ConfirmProvider`, `ToastProvider` — consumers can use the combined one or pick individual providers
- Both ConfirmProvider and ToastProvider render their UI via `createPortal(children, document.body)` — consistent with Overlay/Dialog portal strategy from Phase 4
- Vue's `event.ts` event emitter replaced entirely by React context — no singleton event bus needed

### Confirm Behavior
- `useConfirm()` returns `{ confirm }` — promise-based API
- `confirm({ title, message, acceptLabel, cancelLabel })` returns `Promise<boolean>` — resolves `true` on accept, `false` on cancel
- Default labels: acceptLabel = "Confirm", cancelLabel = "Cancel"
- Confirm dialog rendered via Dialog component with `noOutsideClose` behavior (shake animation on outside click)
- Dialog uses Overlay (Phase 4) for backdrop

### Toast Behavior
- `useToast()` returns `{ toast }` — single method API
- `toast(options)` returns `{ id, close() }` — consumer can dismiss manually via `close()`
- Auto-generated UUID for toast ID if not provided
- Position specified per-toast via separate booleans: `top`, `bottom`, `left`, `right` (Vue API parity)
- Default auto-dismiss timeout: 5000ms (new default — Vue had no default)
- Pass `timeout: 0` or `timeout: null` for persistent toasts
- Toast types: `info`, `success`, `warning`, `danger`, `neutral` — matches Alert type prop
- Action button support: `buttonLabel` + `action` callback — rendered as Button inside Alert

### Toast Positioning & Animation
- 4 fixed corner containers: top-left, top-right, bottom-left, bottom-right (exact Vue parity)
- CSS slide transitions: slide-left for left-side toasts, slide-right for right-side toasts
- 600ms transition duration matching Vue exactly
- Stacking: new toasts push to end of array — top corners stack downward, bottom corners stack upward (Vue behavior)
- z-index: 1100 for toast containers (above Dialog's 1003)

### Claude's Discretion
- Spinner, Button, Alert, Dialog exact migration details (follow Vue source faithfully)
- Internal state management within providers (useReducer vs useState)
- Toast ID generation approach (crypto.randomUUID, nanoid, or counter)
- CSS file organization for Dialog/Toast scoped styles
- Button variant/size prop mapping details
- Alert icon and close button implementation details

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Vue Source Files (migration source — providers)
- `src/components/Confirm/Confirm.vue` — Event-emitter-based confirm dialog (54 lines)
- `src/components/Toast/Toast.vue` — Event-emitter-based toast notifications with 4-corner positioning (151 lines)
- `src/utils/event.ts` — Event emitter singleton being replaced by React context

### Vue Source Files (migration source — prerequisites)
- `src/components/Spinner/Spinner.vue` — Loading spinner component
- `src/components/Button/Button.vue` — Button with variants, sizes, icon support, loading state
- `src/components/Alert/Alert.vue` — Alert with types, icon, close button, actions slot
- `src/components/Dialog/Dialog.vue` — Modal dialog with Overlay, bounce animation, noOutsideClose (105 lines)

### Already Migrated (reference patterns)
- `src/utils/components/Overlay.tsx` — Portal + useTransition pattern (Phase 4)
- `src/composables/useControllable.ts` — Controlled/uncontrolled hook pattern
- `src/composables/useTransition.ts` — Mount/unmount animation timing hook
- `src/components/Icon/Icon.tsx` — Material Symbols icon component (Phase 1)

### Phase Context Patterns
- `src/components/RadioGroup/RadioGroup.tsx` — React Context provider pattern (Phase 3)
- `src/components/ToggleGroup/ToggleGroup.tsx` — React Context provider pattern (Phase 3)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Overlay.tsx`: Portal + backdrop with useTransition — Dialog wraps this
- `useTransition` hook: For Dialog bounce, Toast slide, Overlay fade animations
- `useControllable` hook: For Dialog open/close state
- `Icon.tsx`: Material Symbols font icon — used by Button, Alert
- `clsx`: Conditional class composition — used everywhere

### Established Patterns
- Portal to document.body via `createPortal` (Overlay.tsx)
- React Context for component coordination (RadioGroupContext, ToggleGroupContext)
- CSS scoping: Tailwind + component CSS files
- `className` prop on every component
- Transition pattern: useTransition(value, { duration }) → { isMounted, isActive }

### Integration Points
- `src/index.ts`: New exports — DesignSystemProvider, ConfirmProvider, ToastProvider, useConfirm, useToast, plus Spinner, Button, Alert, Dialog
- `src/utils/event.ts`: Will no longer be needed after providers replace event emitter pattern
- Phase 6 (Composites): Will use Dialog directly; Select/Dropdown/etc. won't need providers
- Phase 2 (Atomics): Spinner, Button, Alert migrated here — mark ATOM-01, ATOM-06, ATOM-10 as done when complete

</code_context>

<specifics>
## Specific Ideas

- Vue Confirm is 54 lines — very simple dialog wrapping. The complexity is in the provider/hook pattern, not the component itself
- Vue Toast is 151 lines with scoped CSS for 4-corner positioning and slide animations — most complex piece
- The `event.ts` singleton can be deleted once providers work (or kept if other Vue components still reference it during migration)
- Dialog's `noOutsideClose` has a visual "shake" warning animation — preserve this behavior for Confirm
- Toast uses Alert with `closable` prop and optional actions slot via Button

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-providers*
*Context gathered: 2026-03-16*
