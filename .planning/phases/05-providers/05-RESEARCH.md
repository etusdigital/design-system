# Phase 5: Providers - Research

**Researched:** 2026-03-16
**Domain:** React Context providers, promise-based imperative APIs, portal-rendered overlays
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Dependency Strategy**
- Pull Spinner, Button, Alert, and Dialog migrations into Phase 5 as prerequisites
- Spinner: needed by Button (loading state)
- Button: needed by Confirm (accept/cancel buttons) and Toast (action buttons)
- Alert: needed by Toast (renders toasts as Alert components)
- Dialog: needed by Confirm (wraps the confirmation dialog)
- Icon already migrated in Phase 1; Overlay already migrated in Phase 4

**Provider Architecture**
- Single `DesignSystemProvider` as the consumer-facing root wrapper — internally nests ConfirmProvider + ToastProvider
- Export all three individually: `DesignSystemProvider`, `ConfirmProvider`, `ToastProvider` — consumers can use the combined one or pick individual providers
- Both ConfirmProvider and ToastProvider render their UI via `createPortal(children, document.body)` — consistent with Overlay/Dialog portal strategy from Phase 4
- Vue's `event.ts` event emitter replaced entirely by React context — no singleton event bus needed

**Confirm Behavior**
- `useConfirm()` returns `{ confirm }` — promise-based API
- `confirm({ title, message, acceptLabel, cancelLabel })` returns `Promise<boolean>` — resolves `true` on accept, `false` on cancel
- Default labels: acceptLabel = "Confirm", cancelLabel = "Cancel"
- Confirm dialog rendered via Dialog component with `noOutsideClose` behavior (shake animation on outside click)
- Dialog uses Overlay (Phase 4) for backdrop

**Toast Behavior**
- `useToast()` returns `{ toast }` — single method API
- `toast(options)` returns `{ id, close() }` — consumer can dismiss manually via `close()`
- Auto-generated UUID for toast ID if not provided
- Position specified per-toast via separate booleans: `top`, `bottom`, `left`, `right` (Vue API parity)
- Default auto-dismiss timeout: 5000ms (new default — Vue had no default)
- Pass `timeout: 0` or `timeout: null` for persistent toasts
- Toast types: `info`, `success`, `warning`, `danger`, `neutral` — matches Alert type prop
- Action button support: `buttonLabel` + `action` callback — rendered as Button inside Alert

**Toast Positioning & Animation**
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

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PROV-01 | DesignSystemProvider created as root context wrapper (replaces Vue plugin install) | Nested provider pattern: DesignSystemProvider wraps ConfirmProvider + ToastProvider |
| PROV-02 | ConfirmProvider + useConfirm hook created (replaces $confirm global property) | React context + promise-based imperative API pattern |
| PROV-03 | ToastProvider + useToast hook created (replaces $toast global property) | React context + portal + useTransition for slide animations |
| PROV-04 | Confirm component migrated to React TSX (rendered by ConfirmProvider) | Dialog (migrated here) + Button (already exists) — 54-line Vue source |
| PROV-05 | Toast component migrated to React TSX (rendered by ToastProvider) | Alert (already exists) + Button (already exists) + 4-corner portal containers |
</phase_requirements>

---

## Summary

Phase 5 replaces Vue's singleton event-emitter global services (`event.ts` + `$confirm` + `$toast`) with idiomatic React context providers. The core pattern is: a Provider component holds imperative state (pending confirm dialog, list of active toasts) via `useReducer` or `useState`, exposes a stable function through context, and hook consumers call that function from anywhere in the tree.

The prerequisite dependency chain is already partially complete. Spinner, Button, and Alert have all been migrated to React in Phase 2. Dialog is still a stub (`Dialog.tsx` contains a one-line placeholder) and must be fully implemented here before Confirm can use it. The Vue Dialog source is 105 lines with Overlay integration, bounce entry/exit animation, and a shake warning animation for `noOutsideClose`. This is the most non-trivial prerequisite.

The provider/hook pattern itself is well-established in this codebase — RadioGroup and ToggleGroup demonstrate the createContext + Provider + consumer hook approach. The difference here is that ConfirmProvider and ToastProvider do not coordinate component state across children; instead, they own UI state internally and expose imperative functions to consumers. The promise-based confirm API requires storing a resolve callback in a ref alongside the pending dialog state.

**Primary recommendation:** Implement Dialog first (it is a hard dependency for Confirm). Then implement ConfirmProvider + useConfirm. Then implement ToastProvider + useToast. Wrap both in DesignSystemProvider. All three providers render portal content directly — no need for a separate Confirm or Toast "component" in the traditional sense; the component is internal to the provider.

---

## Standard Stack

### Core (already in project)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react | 19.x | createContext, useContext, useState, useReducer, useRef, useEffect | Project standard |
| react-dom | 19.x | createPortal for Dialog, Toast, Confirm overlays | Already used in Overlay.tsx |
| clsx | latest | Conditional class composition | Used everywhere in this codebase |

### Supporting (already in project)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| useTransition (internal) | — | Mount/unmount animation timing | Dialog bounce, Toast slide in/out |
| useControllable (internal) | — | Controlled/uncontrolled open state | Dialog open prop |

### No New Dependencies Needed
All required functionality is covered by React core, react-dom, and existing project hooks. Do not add uuid, nanoid, or any animation library — use `crypto.randomUUID()` for toast IDs (available in all modern browsers and in jsdom for tests).

---

## Architecture Patterns

### Pattern 1: Imperative API via Context + Stored Resolver

This is the correct pattern for promise-based confirm dialogs. The ConfirmProvider holds dialog state in `useState` and stores the Promise resolver in a `useRef`. Calling `confirm(options)` creates a new Promise, stores its `resolve` function in the ref, and sets state to show the dialog. The accept/cancel handlers call the stored resolver.

```typescript
// Source: established React pattern, verified against project conventions
const resolverRef = useRef<((result: boolean) => void) | null>(null);
const [state, setState] = useState<ConfirmState | null>(null);

function confirm(options: ConfirmOptions): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    resolverRef.current = resolve;
    setState({ ...options });
  });
}

function handleAccept() {
  resolverRef.current?.(true);
  resolverRef.current = null;
  setState(null);
}

function handleCancel() {
  resolverRef.current?.(false);
  resolverRef.current = null;
  setState(null);
}
```

**Why ref for the resolver:** The Promise resolver must survive re-renders without triggering them. Storing it in state would require an extra render cycle and a function-in-state anti-pattern. A ref is the correct choice.

### Pattern 2: Toast List Management with useReducer

Toast state is a list of items. `useReducer` is the right choice here over multiple `useState` calls because all mutations (add, start-removing, remove) operate on the same array.

```typescript
// Source: React docs pattern for complex state, adapted to project style
type ToastAction =
  | { type: 'ADD'; toast: ToastItem }
  | { type: 'HIDE'; id: string }      // sets visible=false, starts 600ms exit animation
  | { type: 'REMOVE'; id: string };   // removes from array after animation

function toastReducer(state: ToastItem[], action: ToastAction): ToastItem[] {
  switch (action.type) {
    case 'ADD':    return [...state, action.toast];
    case 'HIDE':   return state.map(t => t.id === action.id ? { ...t, visible: false } : t);
    case 'REMOVE': return state.filter(t => t.id !== action.id);
  }
}
```

The `HIDE` → 600ms → `REMOVE` sequence mirrors the Vue `removeToast` function exactly: set `visible = false`, then `setTimeout(() => filter, 600)`.

### Pattern 3: 4-Corner Toast Portal Containers

The Vue Toast component renders 4 fixed-position `<div>` containers (top-left, top-right, bottom-left, bottom-right) via a `v-for` over a containers array, then filters toasts per-container. In React, render all 4 containers inside a single `createPortal(…, document.body)` call.

```typescript
// Source: Vue Toast.vue lines 9-16, translated to React
const CONTAINERS: Array<{ vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' }> = [
  { vertical: 'top',    horizontal: 'left'  },
  { vertical: 'top',    horizontal: 'right' },
  { vertical: 'bottom', horizontal: 'left'  },
  { vertical: 'bottom', horizontal: 'right' },
];
```

Each container only renders toasts where `toast[container.vertical] && toast[container.horizontal]` — exact Vue parity.

### Pattern 4: Toast Slide Animation with useTransition

Each individual toast needs mount/unmount animation. Use the existing `useTransition(toast.visible, { duration: 600 })` hook. When `visible` is `false`, `isMounted` stays true for 600ms while `isActive` is false (applies leave CSS classes), then unmounts. This is the same pattern used by Overlay.

```typescript
// Source: useTransition.ts + Overlay.tsx pattern from Phase 4
function ToastItem({ toast, onClose }: { toast: ToastData; onClose: () => void }) {
  const { isMounted, isActive } = useTransition(toast.visible, { duration: 600 });
  const slideClass = toast.right ? 'slide-right' : 'slide-left';

  if (!isMounted) return null;
  return (
    <div className={clsx('toast-wrapper', slideClass, isActive && 'active')}>
      <Alert ... closable onClose={onClose} ... />
    </div>
  );
}
```

CSS handles the `translateX` transition on `.toast-wrapper` — active = in-position, inactive = off-screen.

### Pattern 5: Dialog with Bounce Animation

Dialog wraps Overlay and adds a centered content box with bounce-in/out animation. The `noOutsideClose` shake is a CSS animation triggered by adding/removing a class (same as Vue). In React, this is done with a `useRef` on the dialog div and `classList.add/remove`.

```typescript
// Source: Dialog.vue lines 34-44 translated to React
const dialogRef = useRef<HTMLDivElement>(null);

function handleOverlayClick() {
  if (noOutsideClose) {
    dialogRef.current?.classList.add('no-outside-close-warning');
    setTimeout(() => {
      dialogRef.current?.classList.remove('no-outside-close-warning');
    }, 100);
  } else {
    onChange?.(false);
  }
}
```

The `useControllable` hook manages the open/close state with the `value`/`defaultValue`/`onChange` pattern established in Phase 3.

### Recommended Project Structure

```
src/
├── components/
│   ├── Dialog/
│   │   ├── Dialog.tsx           # Replace stub — full implementation
│   │   ├── Dialog.module.css    # New — bounce-in, bounce-warning keyframes
│   │   ├── Dialog.test.tsx      # New — renders, noOutsideClose, controlled/uncontrolled
│   │   ├── Dialog.stories.tsx   # New/update
│   │   └── index.ts             # Already exports Dialog
│   ├── Confirm/
│   │   ├── Confirm.tsx          # Replace stub — becomes ConfirmProvider + useConfirm
│   │   ├── Confirm.test.tsx     # New — confirm() resolves true/false
│   │   └── index.ts             # Update — export ConfirmProvider, useConfirm (keep Confirm export for legacy)
│   └── Toast/
│       ├── Toast.tsx            # Replace stub — becomes ToastProvider + useToast
│       ├── Toast.css            # New — 4-corner positioning + slide animations
│       ├── Toast.test.tsx       # New — toast shows, auto-dismisses, close()
│       └── index.ts             # Update — export ToastProvider, useToast (keep Toast export)
├── providers/
│   └── DesignSystemProvider.tsx # New — wraps ConfirmProvider + ToastProvider
└── index.ts                     # Add: DesignSystemProvider, ConfirmProvider, ToastProvider, useConfirm, useToast
```

**Note on providers/ directory:** The CONTEXT.md puts Confirm in `src/components/Confirm/` and Toast in `src/components/Toast/` (these directories already exist). `DesignSystemProvider` needs a home — either a new `src/providers/` directory or `src/components/DesignSystemProvider/`. Given the project pattern of one folder per component, `src/providers/` is cleaner for the root wrapper.

### Anti-Patterns to Avoid

- **Storing the Promise resolver in state:** Causes infinite loops. Use `useRef`.
- **Rendering a Confirm "component" separately from the provider:** The Confirm UI is internal to ConfirmProvider — no external `<Confirm />` element needed at the app level. The Vue version required manually placing `<Confirm />` in the app; the React version should not.
- **Using separate `visible` + setTimeout for both HIDE and REMOVE in reducer directly:** The setTimeout belongs in the provider's dispatch handler, not the reducer. The reducer stays pure.
- **Re-registering the auto-dismiss setTimeout on every render:** Capture the timeout in a cleanup-returning `useEffect` or manage it alongside the toast data (store the timeout ID).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Mount/unmount animation timing | Custom timer logic | `useTransition` hook (already in project) | Handles RAF + cleanup, tested |
| Portal to body | Inline `document.body.appendChild` | `createPortal(…, document.body)` (react-dom) | SSR-safe, unmounts with tree |
| Conditional classes | Template literal class strings | `clsx` (already in project) | Handles undefined/false correctly |
| Toast ID generation | Date.now or counter | `crypto.randomUUID()` | Collision-free, no dep, available in jsdom |

---

## Common Pitfalls

### Pitfall 1: useConfirm called outside provider
**What goes wrong:** `useContext(ConfirmContext)` returns `null`, calling `confirm()` throws.
**Why it happens:** Consumer forgets to wrap app in `DesignSystemProvider` or `ConfirmProvider`.
**How to avoid:** Guard the hook with a null check and throw a descriptive error:
```typescript
const ctx = useContext(ConfirmContext);
if (!ctx) throw new Error('useConfirm must be used inside ConfirmProvider');
```
**Warning signs:** `Cannot read properties of null (reading 'confirm')` error in console.

### Pitfall 2: Toast visible flag not reset, causing double-fade
**What goes wrong:** A new toast is added with `visible: true`, but a previous toast with the same ID is in the HIDE animation state. On re-render the `useTransition` for the "new" toast starts from `false`.
**Why it happens:** Reusing IDs across add/remove cycles.
**How to avoid:** `crypto.randomUUID()` guarantees no ID reuse. Never reuse an ID.

### Pitfall 3: Dialog shake animation on rapidly repeated outside clicks
**What goes wrong:** `classList.add` followed by `setTimeout(classList.remove, 100)` — if clicked again before 100ms, the remove fires and the animation is cut short.
**Why it happens:** Vue has the same behavior; it is by design (100ms is fast enough). Do not try to "fix" this — match Vue behavior exactly.
**How to avoid:** No action needed; just match Vue's implementation.

### Pitfall 4: auto-dismiss timer leaking after toast removed
**What goes wrong:** `setTimeout(() => dispatch({ type: 'REMOVE', id }), 600)` fires after the component unmounts (ToastProvider unmounted, test completed, etc.).
**Why it happens:** Timeouts are not automatically cancelled on unmount.
**How to avoid:** Store timeout refs in a `Map<string, ReturnType<typeof setTimeout>>` and clear on cleanup or when toast is removed manually before the timer fires.

### Pitfall 5: Dialog useControllable onChange prop naming
**What goes wrong:** Dialog's controlled prop is named `value` (matching Overlay.tsx) while all other open/close components use `modelValue` (Vue naming) or `open`.
**Why it happens:** Inconsistency in prop naming conventions across the codebase.
**How to avoid:** Per CONTEXT.md locked decision, Overlay uses `value` prop. Dialog should follow the same convention (`value`/`defaultValue`/`onChange`) since it wraps Overlay. Do not rename to `open` mid-migration.

### Pitfall 6: Toast CSS animation class conflicts with module CSS
**What goes wrong:** Toast.module.css gives local scoped names to `.slide-right`, `.slide-left`. The `useTransition` hook adds `isActive && 'active'` as a raw string, not a module class.
**Why it happens:** CSS modules rename class names; raw string `'active'` does not match `styles.active`.
**How to avoid:** Use a plain `Toast.css` file (imported directly, not as a module) for the animation classes — same approach as Overlay uses `Overlay.css`. Or consistently use `styles.active` from the module. The Overlay.css precedent (`import '../styles/Overlay.css'`) suggests a plain CSS file is the pattern for animation classes used alongside `clsx`.

### Pitfall 7: createPortal during SSR
**What goes wrong:** `document.body` is undefined in server environments.
**Why it happens:** `createPortal` requires a real DOM node.
**How to avoid:** Guard with `typeof document !== 'undefined'` before calling `createPortal`. This is consistent with the `blendColors` guard pattern already used in Button.tsx. The project is React 19 and browser-only, but the guard avoids Storybook / test environment issues.

---

## Code Examples

### ConfirmProvider full skeleton
```typescript
// Source: Vue Confirm.vue + React context pattern
interface ConfirmState {
  title?: string;
  message?: string;
  acceptLabel?: string;
  cancelLabel?: string;
}

interface ConfirmContextValue {
  confirm: (options: ConfirmState) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConfirmState | null>(null);
  const resolverRef = useRef<((v: boolean) => void) | null>(null);

  function confirm(options: ConfirmState): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
      setState({
        title: options.title ?? '',
        message: options.message ?? '',
        acceptLabel: options.acceptLabel ?? 'Confirm',
        cancelLabel: options.cancelLabel ?? 'Cancel',
      });
    });
  }

  function accept() {
    resolverRef.current?.(true);
    resolverRef.current = null;
    setState(null);
  }

  function cancel() {
    resolverRef.current?.(false);
    resolverRef.current = null;
    setState(null);
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state && createPortal(
        <ConfirmDialog state={state} onAccept={accept} onCancel={cancel} />,
        document.body
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmContextValue {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used inside ConfirmProvider');
  return ctx;
}
```

### ToastProvider add/remove pattern
```typescript
// Source: Vue Toast.vue addToast/removeToast translated to React
function addToast(options: ToastOptions): { id: string; close: () => void } {
  const id = options.id ?? crypto.randomUUID();
  dispatch({ type: 'ADD', toast: { ...defaultToast, ...options, id, visible: true } });

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = options.timeout !== undefined ? options.timeout : 5000;
  if (timeout) {
    timeoutId = setTimeout(() => removeToast(id), timeout);
    timerMapRef.current.set(id, timeoutId);
  }

  return { id, close: () => removeToast(id) };
}

function removeToast(id: string) {
  // Clear auto-dismiss timer if manually closed
  const timer = timerMapRef.current.get(id);
  if (timer) { clearTimeout(timer); timerMapRef.current.delete(id); }

  dispatch({ type: 'HIDE', id });
  setTimeout(() => dispatch({ type: 'REMOVE', id }), 600);
}
```

### DesignSystemProvider
```typescript
// Source: CONTEXT.md architecture decision
export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfirmProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ConfirmProvider>
  );
}
```

### Dialog with useControllable + useTransition
```typescript
// Source: Dialog.vue (105 lines) translated to established React patterns
export function Dialog({
  value, defaultValue, onChange,
  width = 'fit-content', height = 'fit-content',
  noOutsideClose = false,
  children, className,
}: DialogProps) {
  const [isOpen, setOpen] = useControllable({ value, defaultValue, onChange });
  const { isMounted, isActive } = useTransition(isOpen ?? false, { duration: 500 });
  const dialogRef = useRef<HTMLDivElement>(null);

  function handleOverlayClick() {
    if (noOutsideClose) {
      dialogRef.current?.classList.add('no-outside-close-warning');
      setTimeout(() => dialogRef.current?.classList.remove('no-outside-close-warning'), 100);
    } else {
      setOpen(false);
    }
  }

  return (
    <Overlay value={isOpen} zIndex={1002} onClick={handleOverlayClick}>
      {isMounted && (
        <div
          ref={dialogRef}
          className={clsx(styles.dialog, isActive && styles.active, className)}
          style={{ width, height }}
        >
          {children}
        </div>
      )}
    </Overlay>
  );
}
```

**Note on Dialog animation:** The Vue bounce animation uses `@keyframes bounce-in` (scale 0→1 entry, reversed for exit). In React with `useTransition`, `isActive` drives the CSS state. The dialog CSS must include:
- Default (not active): `transform: translate(-50%, -50%) scale(0); opacity: 0`
- Active: `transform: translate(-50%, -50%) scale(1); opacity: 1; transition: all 0.5s`
- `.no-outside-close-warning`: `animation: bounce-warning 0.5s ease` (added/removed by classList)

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Vue event emitter singleton (event.ts) | React Context + hooks | This phase | No app-level wiring needed; providers inject themselves |
| `app.use(DesignSystem)` Vue plugin install | `<DesignSystemProvider>` wrapper | This phase | Consumer wraps their React root, not mounts a plugin |
| Manually place `<Confirm />` and `<Toast />` in app template | Providers render their own portal UI | This phase | Zero consumer-side UI placement needed |

---

## Open Questions

1. **Where does DesignSystemProvider live in the file tree?**
   - What we know: Confirm and Toast have existing `src/components/` subdirectories. DesignSystemProvider is a new file with no Vue counterpart.
   - What's unclear: Whether to use `src/providers/DesignSystemProvider.tsx` (new directory) or `src/components/DesignSystemProvider/DesignSystemProvider.tsx` (follows existing pattern).
   - Recommendation: Create `src/providers/` as a new top-level folder alongside `src/components/` — it is architecturally distinct from visual components and the name is explicit.

2. **Do the existing Confirm/Toast index.ts files need to export both old and new names?**
   - What we know: `src/components/index.ts` exports `Confirm` and `Toast` (the stubs). After migration, the stubs are replaced by the provider implementations.
   - What's unclear: Whether consumers expect a standalone `<Confirm />` component (Vue-style) or only the provider API.
   - Recommendation: The stub export can be removed or kept as a re-export of `ConfirmProvider` for backward compat. The planner should decide whether to clean up or alias. The CONTEXT.md says `src/index.ts` must export `DesignSystemProvider`, `ConfirmProvider`, `ToastProvider`, `useConfirm`, `useToast` — so those are the new canonical exports.

3. **Dialog CSS: module vs plain file?**
   - What we know: Button, Alert, RadioGroup use `.module.css`. Overlay uses a plain `Overlay.css`.
   - What's unclear: Dialog has `bounce-in` and `bounce-warning` keyframe animations applied via `classList.add/remove` (raw class names, not module-scoped names).
   - Recommendation: Use a plain `Dialog.css` for Dialog, consistent with Overlay's approach. Module CSS would require `styles['no-outside-close-warning']` in the classList mutation, which works but is awkward.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x + React Testing Library |
| Config file | `vite.config.ts` (unit project: jsdom + globals) |
| Quick run command | `npx vitest run --project unit --reporter=verbose src/components/Dialog src/components/Confirm src/components/Toast` |
| Full suite command | `npx vitest run --project unit` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PROV-01 | DesignSystemProvider renders children without error | unit | `npx vitest run --project unit src/providers/` | ❌ Wave 0 |
| PROV-02 | useConfirm().confirm() resolves true on accept, false on cancel | unit | `npx vitest run --project unit src/components/Confirm/` | ❌ Wave 0 |
| PROV-02 | useConfirm throws outside provider | unit | same file | ❌ Wave 0 |
| PROV-03 | useToast().toast() adds toast that auto-dismisses after 5000ms | unit | `npx vitest run --project unit src/components/Toast/` | ❌ Wave 0 |
| PROV-03 | toast({ timeout: 0 }) does not auto-dismiss | unit | same file | ❌ Wave 0 |
| PROV-03 | close() returned from toast() removes toast manually | unit | same file | ❌ Wave 0 |
| PROV-04 | Confirm component renders dialog with title/message/labels | unit | `npx vitest run --project unit src/components/Confirm/` | ❌ Wave 0 |
| PROV-05 | Toast component renders Alert with correct type and position classes | unit | `npx vitest run --project unit src/components/Toast/` | ❌ Wave 0 |

**Note on timer tests:** Tests for auto-dismiss (5000ms) and animation exit (600ms) must use `vi.useFakeTimers()` + `vi.advanceTimersByTime()`. Restore with `vi.useRealTimers()` in `afterEach`. This is the same pattern used in Phase 3 for PINInput and Phase 4 for SelectContainer.

### Sampling Rate
- **Per task commit:** `npx vitest run --project unit src/components/Dialog src/components/Confirm src/components/Toast src/providers`
- **Per wave merge:** `npx vitest run --project unit`
- **Phase gate:** Full unit suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/providers/DesignSystemProvider.test.tsx` — covers PROV-01
- [ ] `src/components/Confirm/Confirm.test.tsx` — covers PROV-02, PROV-04
- [ ] `src/components/Toast/Toast.test.tsx` — covers PROV-03, PROV-05
- [ ] `src/components/Dialog/Dialog.test.tsx` — covers Dialog as Dialog dependency for PROV-04

---

## Sources

### Primary (HIGH confidence)
- Direct code audit: `src/components/Confirm/Confirm.vue` — 54-line Vue source, complete
- Direct code audit: `src/components/Toast/Toast.vue` — 151-line Vue source with CSS, complete
- Direct code audit: `src/components/Dialog/Dialog.vue` — 105-line Vue source with CSS, complete
- Direct code audit: `src/utils/event.ts` — event emitter being replaced
- Direct code audit: `src/utils/components/Overlay.tsx` — portal + useTransition pattern
- Direct code audit: `src/hooks/useTransition.ts` — animation timing hook
- Direct code audit: `src/components/Button/Button.tsx` — already migrated, full implementation
- Direct code audit: `src/components/Alert/Alert.tsx` — already migrated, full implementation with `actions` prop
- Direct code audit: `src/components/Spinner/Spinner.tsx` — already migrated, minimal
- Direct code audit: `src/components/RadioGroup/RadioGroup.tsx` — createContext + Provider pattern

### Secondary (MEDIUM confidence)
- React docs pattern: Promise resolver in useRef for imperative confirm dialog — widely documented pattern
- React docs pattern: useReducer for list state (add/remove/update) — official React guidance

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all dependencies are already in the project; no new libraries needed
- Architecture: HIGH — Vue source is fully readable, React patterns are established in this codebase
- Pitfalls: HIGH — identified from direct source code analysis and known React patterns

**Research date:** 2026-03-16
**Valid until:** 2026-04-16 (stable React/project patterns)
