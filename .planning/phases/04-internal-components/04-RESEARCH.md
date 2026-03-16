# Phase 4: Internal Components - Research

**Researched:** 2026-03-16
**Domain:** React portal, observer hooks, context patterns, CSS Modules — Vue-to-React migration of 7 shared utility components
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Portal Strategy (Overlay)**
- Use `createPortal(children, document.body)` — render directly into body, no dedicated portal root div
- Animate with `useTransition` hook from Phase 1 (isMounted + isActive pattern) — consistent with Dialog/Drawer/Toast in later phases
- Keep `zIndex` as a number prop (default 1000) — matches Vue API, consumers can stack overlays
- Apply zIndex via inline `style={{ zIndex }}` — consistent with Icon's dynamic fontSize pattern from Phase 1

**Group State Pattern**
- React Context via `createContext` + `useContext` — same pattern as RadioGroupContext and ToggleGroupContext from Phase 3
- Separate `GroupContext` (not shared with RadioGroup/ToggleGroup) — keeps concerns independent, Group is a utility for Select/Dropdown
- Context value includes: `value`, `select(value)`, `disabled` — children read via `useGroupContext()`
- Group accepts `onChange` prop alongside context `select()` — both internal coordination and external notification
- `disabled` propagated through context — children merge group disabled with their own disabled prop
- `vertical` prop as CSS class toggle (`flex-col` vs `flex-row`) — not through context

**Resize/Observer Logic**
- Faithful port of all observer logic — ResizeObserver, MutationObserver, and setTimeout timing replicated exactly
- SelectContainer: ResizeObserver + MutationObserver in useEffect hooks, 200ms mount delay preserved
- Container: MutationObserver for attribute-watching preserved, triggers min-width recalculation
- ExpandableContainer stays as a separate wrapper around Container — not merged. Handles absolute positioning + card styling

**Click-Outside & Blur**
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

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INTL-01 | Label utility component migrated to React TSX | Already done in Phase 3 (`src/utils/components/Label.tsx`) — skip in Phase 4 implementation |
| INTL-02 | Overlay utility component migrated with createPortal | React `createPortal(children, document.body)` + `useTransition` for fade; test pattern: `vi.mock('react-dom', { createPortal: node => node })` |
| INTL-03 | Container utility component migrated to React TSX | `useControllable<boolean>` + `useClickOutside` hook + `MutationObserver` in `useEffect`; slots become render props/children props |
| INTL-04 | SelectContainer utility component migrated to React TSX | Wraps ExpandableContainer; `ResizeObserver` + `MutationObserver` in `useEffect`; 200ms `setTimeout` on mount |
| INTL-05 | SelectContent utility component migrated to React TSX | `useControllable<string>` for search value; `useEffect` for auto-focus on expanded; render prop for icon/search visibility |
| INTL-06 | Option utility component migrated to React TSX | Pure presentational; `role="option"`, `tabindex={0}`; CSS Modules for state classes |
| INTL-07 | Group utility component migrated to React TSX | `createContext<GroupContextValue | null>` + `Provider` wrapper; exports `GroupContext` for consumer hook |
| INTL-08 | ExpandableContainer utility component migrated to React TSX | Wraps Container; `isAbsolute` derived state; passes `minWidth` down via render prop pattern (replaces Vue scoped slot) |
</phase_requirements>

---

## Summary

Phase 4 migrates 7 shared utility components (Container, ExpandableContainer, Group, Option, Overlay, SelectContainer, SelectContent) from Vue SFCs to React TSX. INTL-01 (Label) is already complete from Phase 3. All required React primitives — `createPortal`, `createContext`, `useEffect`, `useRef`, `useState` — are in the project's established toolkit. The primary challenge is the faithful translation of Vue's `<Transition>`, `provide/inject`, slots with scoped data, and the lifecycle callbacks (`onMounted`, `onUpdated`, `onBeforeUnmount`) into React idioms.

The project already has `useTransition` (isMounted + isActive pattern) and `useControllable` hooks that replace Vue's `useOptionalModel` and `<Transition>`. React Context (`createContext` + `useContext`) replaces `provide/inject`, following the exact pattern established in `RadioGroupContext` and `ToggleGroupContext`. Observer logic (`MutationObserver`, `ResizeObserver`) maps to `useEffect` with a cleanup return function.

The highest-risk item is SelectContainer (215 lines, dual observers), and the new `useClickOutside` hook is a non-trivial introduction. Container's scoped-slot system (`#content`, `#label`, `#complement`, plus the `minWidth` render prop) requires a clear render prop strategy.

**Primary recommendation:** Implement in dependency order — Option (simplest, no deps) → Overlay → Group → useClickOutside → Container → ExpandableContainer → SelectContent → SelectContainer. Container is the dependency for ExpandableContainer and SelectContainer.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react | 19 | `createPortal`, `createContext`, `useEffect`, `useRef`, `useState`, `useContext` | Project lock — Phase 1 |
| react-dom | 19 | `createPortal(children, document.body)` | Required for Overlay portal |
| clsx | installed | Conditional className composition | Established in Phase 1, used throughout |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| useControllable (internal) | src/hooks | Controlled/uncontrolled boolean state for Container, SelectContainer, SelectContent | Every component with `value`/`defaultValue`/`onChange` |
| useTransition (internal) | src/hooks | Fade/slide mount-unmount animation | Overlay (fade), Container expand (slide) |
| Icon (internal) | src/components/Icon | Material Symbol `keyboard_arrow_down`, `search` | Container arrow, SelectContent icons |
| Label (internal) | src/utils/components | Form label with tooltip | Container `labelValue` prop |
| CSS Modules | — | Scoped class names, state-based styling | All Phase 4 components |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `mousedown` for click-outside | `click` | `mousedown` fires before React synthetic click, avoids race with portal-unmounted targets |
| `useEffect([expanded])` for focus | `nextTick` callback | React idiom, no Vue dependency |
| `document.body` as portal target | Dedicated `div#portal-root` | Simpler — no extra DOM setup required; consistent with CONTEXT.md decision |

**Installation:** No new packages required. All dependencies already present.

---

## Architecture Patterns

### Recommended Project Structure
```
src/utils/
├── components/
│   ├── Label.tsx            # DONE — Phase 3
│   ├── Overlay.tsx          # INTL-02
│   ├── Container.tsx        # INTL-03
│   ├── ExpandableContainer.tsx  # INTL-08
│   ├── SelectContainer.tsx  # INTL-04
│   ├── SelectContent.tsx    # INTL-05
│   ├── Option.tsx           # INTL-06
│   ├── Group.tsx            # INTL-07
│   └── styles/
│       ├── Label.css        # DONE
│       ├── Container.css    # INTL-03
│       ├── SelectContainer.css  # INTL-04
│       └── Option.css       # INTL-06
├── types/
│   ├── ContainerModelExtra.ts  # Existing
│   ├── Group.ts             # Existing (adapt for React context shape)
│   └── Option.ts            # Existing
└── index.ts                 # Barrel exports
src/composables/
├── OptionalModel.ts         # Existing (Vue composable, leave as-is)
├── index.ts                 # Add useClickOutside export here
└── useClickOutside.ts       # NEW — INTL-03 dependency
```

Note: Label's CSS lives in `src/utils/styles/Label.css` — new components may follow the same `src/utils/styles/` pattern or use inline Tailwind only (like many Phase 2/3 components). Since these are utility components and not full component directories, a flat CSS file per component in `src/utils/styles/` is appropriate.

### Pattern 1: createPortal for Overlay (INTL-02)
**What:** Render backdrop div into `document.body` using React portal; conditional mount via `useTransition`
**When to use:** Full-screen overlays, modals, drawers
```typescript
// Source: React docs + Tooltip.tsx established pattern in this project
import { createPortal } from 'react-dom';
import { useTransition } from '../../hooks/useTransition';

export function Overlay({ modelValue = false, zIndex = 1000, onClick, children, className }: OverlayProps) {
  const { isMounted, isActive } = useTransition(modelValue, { duration: 500 });

  return (
    <>
      {isMounted && createPortal(
        <div
          className={clsx(styles.backdrop, isActive && styles.active, className)}
          style={{ zIndex }}
          onClick={onClick}
        />,
        document.body
      )}
      {children}
    </>
  );
}
```

### Pattern 2: React Context for Group (INTL-07)
**What:** Context provider + exported context object for child consumption; mirrors RadioGroupContext/ToggleGroupContext exactly
**When to use:** Coordination between parent Group and child Option/Toggle consumers
```typescript
// Source: RadioGroup.tsx + ToggleGroup.tsx established patterns
import { createContext, useContext } from 'react';

export interface GroupContextValue {
  value: any;
  disabled: boolean;
  select: (value: any) => void;
}

export const GroupContext = createContext<GroupContextValue | null>(null);

export function useGroupContext(): GroupContextValue | null {
  return useContext(GroupContext);
}

export function Group({ value, defaultValue, onChange, vertical = false, disabled = false, children, className }: GroupProps) {
  const [currentValue, setValue] = useControllable<any>({ value, defaultValue, onChange });

  return (
    <GroupContext.Provider value={{ value: currentValue, disabled, select: setValue }}>
      <div className={clsx(styles.group, vertical ? styles.vert : styles.hor, className)}>
        {children}
      </div>
    </GroupContext.Provider>
  );
}
```

### Pattern 3: MutationObserver + ResizeObserver in useEffect (INTL-03, INTL-04)
**What:** Observers registered in useEffect, disconnected in cleanup return
**When to use:** DOM size-tracking that must fire on attribute/content changes
```typescript
// Source: Vue source faithfully ported — onMounted → useEffect([]), onBeforeUnmount → cleanup return
useEffect(() => {
  const mutationObserver = new MutationObserver(resize);
  if (containerRef.current) {
    mutationObserver.observe(containerRef.current, { attributes: true });
  }
  resize();
  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    mutationObserver.disconnect();
  };
}, []); // empty deps — register once on mount

// onUpdated → useEffect with no dep filter, or call resize() after relevant state changes
useEffect(() => {
  resize();
}); // runs after every render — equivalent to onUpdated
```

### Pattern 4: useClickOutside Hook (new, INTL-03 dep)
**What:** Shared hook accepting array of refs + callback; fires on `mousedown` outside all provided rects
**When to use:** Container, then reused in Select/Dropdown/AutoComplete/ColorPicker (Phase 6)
```typescript
// Source: Vue Container.vue onBlur() logic, extracted as hook
// Lives in: src/composables/useClickOutside.ts
import { useEffect } from 'react';

export function useClickOutside(
  refs: React.RefObject<HTMLElement | null>[],
  callback: () => void,
  enabled = true
): void {
  useEffect(() => {
    if (!enabled) return;

    function handleMouseDown(e: MouseEvent) {
      const isOutside = refs.every((ref) => {
        if (!ref.current) return true;
        const rect = ref.current.getBoundingClientRect();
        return (
          e.clientX < rect.left || e.clientX > rect.right ||
          e.clientY < rect.top  || e.clientY > rect.bottom
        );
      });
      if (isOutside) callback();
    }

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps
}
```

### Pattern 5: Vue Scoped Slots → Render Props / Children Props (INTL-03, INTL-08)
**What:** Vue's `<slot name="content" :min-width="contentMinWidth" />` becomes a `renderContent?: (minWidth: string) => React.ReactNode` prop or children with a context-forwarding pattern
**When to use:** Container passes computed `contentMinWidth` to its content slot; ExpandableContainer consumes it

The cleanest approach given the component boundary (ExpandableContainer wraps Container) is to pass `minWidth` as a prop on ExpandableContainer's content area directly. Container exposes a `renderContent?: (minWidth: string) => ReactNode` prop for the one case where dynamic minWidth is needed. All other slots become named children props (`label`, `complement`, `content`, `actions`).

```typescript
// Container simplified render prop for content slot
interface ContainerProps {
  // ...
  label?: React.ReactNode;         // replaces <slot name="label">
  complement?: React.ReactNode;    // replaces <slot name="complement">
  renderContent?: (minWidth: string) => React.ReactNode;  // replaces <slot name="content" :min-width="contentMinWidth">
  children?: React.ReactNode;      // replaces default <slot />
}
```

### Pattern 6: SelectContainer 200ms Mount Delay
**What:** Vue's `setTimeout(() => resize(), 200)` inside `onMounted` — preserved exactly
**When to use:** SelectContainer only — compensates for dynamic content rendering delay
```typescript
useEffect(() => {
  // 200ms delay from Vue source — preserved for faithful parity
  const timer = setTimeout(() => {
    resize();
  }, 200);
  return () => clearTimeout(timer);
}, []); // mount-only
```

### Anti-Patterns to Avoid
- **Merging ExpandableContainer into Container:** Keep separate — locked decision, separation needed for Phase 6 consumers
- **Using `click` instead of `mousedown` for click-outside:** `click` fires after React's synthetic events complete; `mousedown` fires first, preventing race conditions with portal-unmounted content
- **Using `useLayoutEffect` for observers:** Standard `useEffect` suffices; `useLayoutEffect` is for synchronous DOM reads before paint
- **Re-registering observers on every render:** Use empty `[]` dep array for mount-only observer registration; use a separate `useEffect` with relevant deps for the `resize()` call
- **Sharing GroupContext with RadioGroupContext or ToggleGroupContext:** Keep independent — Group is for Select/Dropdown, different consumers
- **Using `document.addEventListener('click')` in Container:** Vue used `click`, locked decision changes this to `mousedown` via `useClickOutside` hook

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Controlled/uncontrolled boolean state | Custom useState wrapper | `useControllable<boolean>` (src/hooks) | Already handles controlled/uncontrolled switching with dev warning |
| Mount-unmount animation timing | Custom timer logic | `useTransition` (src/hooks) | Handles RAF + setTimeout cleanup, proven in tests |
| Portal rendering | Manual DOM appendChild | `createPortal(children, document.body)` | React's official API, handles event bubbling correctly |
| Conditional class names | String concatenation | `clsx` (installed) | Handles falsy values, arrays, objects — used throughout project |
| Context null-safety guard | Inline null check everywhere | `useGroupContext()` returning `null` with callsite null-check | Consistent with how RadioGroup/ToggleGroup consumers check context |

**Key insight:** The heaviest logic (observer cleanup, controlled state) is already solved by existing hooks. Phase 4 is primarily wiring — connect the hooks to the right DOM refs and props.

---

## Common Pitfalls

### Pitfall 1: Observer Callback with Stale Closure
**What goes wrong:** `MutationObserver` callback references a state value or ref that is stale at the time it fires
**Why it happens:** Observer callback is created once at mount; closes over the initial render's values
**How to avoid:** Have the observer callback read from a `useRef` (mutable ref, not state) rather than closed-over state. For `contentMinWidth`, store it in a `useRef<string>` and update it inside the observer callback with `setContentMinWidth(ref.current)` pattern — or better, just call `setState` from the observer callback directly (React batches these correctly in React 18+/19)
**Warning signs:** Container label width not updating when content changes

### Pitfall 2: createPortal Test Failures
**What goes wrong:** Tests fail because portal content renders into `document.body` outside the test container, so `screen.getByText()` can't find elements — OR assertions on `toBeInTheDocument()` work but structural assertions (`.closest()`) break
**Why it happens:** jsdom's `document.body` is separate from the React Testing Library render container
**How to avoid:** Mock `createPortal` in test files (already established pattern — see Tooltip.test.tsx):
```typescript
vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-dom')>();
  return { ...actual, createPortal: (node: React.ReactNode) => node };
});
```
**Warning signs:** Test passes in isolation but `queryByRole` returns null for portal content

### Pitfall 3: onUpdated Equivalent Causes Infinite Loop
**What goes wrong:** `useEffect(() => { resize(); })` with no deps array runs after every render and `resize()` calls `setState` (e.g., `setContentMinWidth`), which triggers another render, which runs the effect again
**Why it happens:** Vue's `onUpdated` fires after DOM updates but not after its own changes (Vue tracks this internally); React's `useEffect` without deps runs after every render unconditionally
**How to avoid:** Use `useRef` to store the computed value and apply it imperatively (via `ref.current.style.minWidth = ...`) instead of storing in state. This breaks the state-update-re-render cycle. Alternatively, only call `setState` when the value actually changes (compare before setting).
**Warning signs:** Component re-renders infinitely after mount; browser tab freezes

### Pitfall 4: ResizeObserver Not Available in jsdom
**What goes wrong:** Tests throw `ReferenceError: ResizeObserver is not defined`
**Why it happens:** jsdom does not implement `ResizeObserver`
**How to avoid:** Add a minimal mock in the test file or `vitest.setup.ts`:
```typescript
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
```
**Warning signs:** Unit tests for SelectContainer crash immediately on render

### Pitfall 5: SelectContent Vue Model Duality (search value + expanded state)
**What goes wrong:** SelectContent manages two separate `useOptionalModel` calls in Vue (one for `modelValue`/search string, one for `expanded`). In React this becomes two `useControllable` calls with different types
**Why it happens:** The component is simultaneously an input (search string) and a visibility controller (expanded boolean)
**How to avoid:** Keep two separate `useControllable` calls — `useControllable<string>` for search and `useControllable<boolean>` for expanded. Emit both via separate `onChange` and `onExpandedChange` props.
**Warning signs:** Search input value bleeds into expanded state or vice versa

### Pitfall 6: useClickOutside Stale Callback
**What goes wrong:** The `callback` passed to `useClickOutside` captures stale state because the hook's `useEffect` dependency array only includes `enabled`, not `callback`
**Why it happens:** `callback` is a new function reference on every render; adding it to deps causes the handler to re-register every render
**How to avoid:** Wrap `callback` in `useRef` inside the hook and call `callbackRef.current()` from the handler. This is the standard pattern for stable event handlers in hooks.

---

## Code Examples

Verified patterns from Vue source files and established React patterns in this project:

### Overlay: createPortal + useTransition
```typescript
// Based on: Overlay.vue + Tooltip.tsx (portal mock pattern) + useTransition.ts
import { createPortal } from 'react-dom';
import { useTransition } from '../../hooks/useTransition';
import clsx from 'clsx';

// Fade duration matches Vue: transition: opacity 0.5s ease
const FADE_DURATION = 500;

export function Overlay({ modelValue = false, zIndex = 1000, onClick, children, className }: OverlayProps) {
  const { isMounted, isActive } = useTransition(modelValue, { duration: FADE_DURATION });

  return (
    <>
      {isMounted && createPortal(
        <div
          className={clsx(styles.backdrop, isActive && styles.active, className)}
          style={{ zIndex }}
          onClick={onClick}
        />,
        document.body
      )}
      {children}
    </>
  );
}
// CSS: .backdrop { position: fixed; inset: 0; width: 100vw; height: 100vh; background: var(--neutral-background-negative); opacity: 0; transition: opacity 0.5s ease; }
// CSS: .backdrop.active { opacity: 0.6; }
```

### Container: useControllable + MutationObserver + useClickOutside
```typescript
// Based on: Container.vue faithfully ported
const containerRef = useRef<HTMLDivElement>(null);
const labelRef = useRef<HTMLDivElement>(null);
const contentRef = useRef<HTMLDivElement>(null); // for click-outside
const [contentMinWidth, setContentMinWidth] = useState(minWidth);
const [model, setModel] = useControllable<boolean>({ value, defaultValue, onChange });

const isExpanded = disabled ? false : (model ?? false);

function resize() {
  const width = containerRef.current?.scrollWidth + 'px';
  setContentMinWidth(width ?? minWidth);
  if (!disableLabelAutoWidth && labelRef.current) {
    labelRef.current.style.width = width ?? minWidth;
  }
}

useClickOutside([containerRef, contentRef], () => {
  if (closeOnBlur && model) setModel(false);
}, closeOnBlur);

useEffect(() => {
  const obs = new MutationObserver(resize);
  if (containerRef.current) obs.observe(containerRef.current, { attributes: true });
  resize();
  return () => obs.disconnect();
}, []);

// onUpdated equivalent — only run resize when relevant state/props change
useEffect(() => { resize(); }); // no deps = after every render; see Pitfall 3 mitigation below
```

Note on Pitfall 3 mitigation for Container: `resize()` updates `labelRef.current.style.width` imperatively (no setState for label width) and only calls `setContentMinWidth` — which won't cause a loop if the value doesn't change (React bails out of state updates when the new value is identical via Object.is).

### Group: Context Provider
```typescript
// Based on: Group.vue + RadioGroup.tsx pattern
export const GroupContext = createContext<GroupContextValue | null>(null);
export function useGroupContext() { return useContext(GroupContext); }

export function Group({ value, defaultValue, onChange, vertical, disabled, children, className }: GroupProps) {
  const [currentValue, setValue] = useControllable<any>({ value, defaultValue, onChange });
  return (
    <GroupContext.Provider value={{ value: currentValue ?? null, disabled, select: setValue }}>
      <div className={clsx(styles.group, vertical ? styles.vert : styles.hor, className)}>
        {children}
      </div>
    </GroupContext.Provider>
  );
}
```

### SelectContainer: Dual Observer + 200ms Delay
```typescript
// Based on: SelectContainer.vue
useEffect(() => {
  const fatherEl = fatherRef.current;
  if (!fatherEl) return;
  const containerEl = fatherEl.querySelector('.label-container') as HTMLDivElement | null;
  const contentEl = contentRef.current;

  const resizeObs = new ResizeObserver(resize);
  const mutationObs = new MutationObserver(resize);

  if (containerEl) {
    mutationObs.observe(containerEl, { characterData: true, subtree: true, childList: true });
    resizeObs.observe(containerEl, { box: 'border-box' });
  }
  if (contentEl) resizeObs.observe(contentEl, { box: 'border-box' });

  const timer = setTimeout(() => resize(), 200); // preserved from Vue

  return () => {
    resizeObs.disconnect();
    mutationObs.disconnect();
    clearTimeout(timer);
  };
}, []);
```

### SelectContent: Auto-focus on Expand
```typescript
// Based on: SelectContent.vue nextTick → useEffect idiom
const searchRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (expanded && !disabled && searchRef.current) {
    searchRef.current.focus();
  }
}, [expanded, disabled]);
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Vue `provide/inject` | React `createContext` + `useContext` | Phase 3 (RadioGroup, ToggleGroup) | GroupContext follows same pattern |
| Vue `useOptionalModel` | `useControllable` hook | Phase 1 | Handles controlled/uncontrolled for all boolean props |
| Vue `<Transition>` | `useTransition` (isMounted + isActive) | Phase 1 | Overlay uses this directly |
| Vue `onMounted`/`onBeforeUnmount` | `useEffect` with cleanup return | All phases | Standard React — all observers use this |
| Vue `onUpdated` | `useEffect()` (no deps) or imperative DOM update | Phase 4 | Careful: must avoid infinite loops (see Pitfall 3) |
| Vue `v-bind` dynamic CSS | inline `style={{ zIndex }}` | Phase 1 (Icon) | Overlay zIndex follows same pattern |
| Vue scoped slot with data | render prop `renderContent?: (minWidth: string) => ReactNode` | Phase 4 | Only Container needs this; ExpandableContainer/SelectContainer consume it |
| Vue `nextTick()` | `useEffect([dep])` | Phase 4 | SelectContent auto-focus |

**Deprecated/outdated:**
- Vue `v-bind:class` object syntax: Replaced by `clsx(styles.foo, condition && styles.bar)` — established Phase 1 pattern
- Vue `<slot name="X">`: Replaced by named prop pattern (`label?: ReactNode`, `complement?: ReactNode`, `renderContent?: fn`) — no `<slot>` in React

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x + React Testing Library + jsdom |
| Config file | `vite.config.ts` (test.projects[1] — "unit" project) |
| Quick run command | `npx vitest run --project unit src/utils/` |
| Full suite command | `npx vitest run --project unit` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INTL-01 | Label already migrated — renders null when no labelValue, renders h5 with text when provided | unit | `npx vitest run --project unit src/utils/` | ❌ Wave 0 (Label.tsx exists, no test file) |
| INTL-02 | Overlay renders backdrop into document.body via createPortal when modelValue=true | unit | `npx vitest run --project unit src/utils/` | ❌ Wave 0 |
| INTL-03 | Container associates label via htmlFor/id, toggles expanded on click, closes on outside mousedown | unit | `npx vitest run --project unit src/utils/` | ❌ Wave 0 |
| INTL-04 | SelectContainer renders ExpandableContainer child, observers set up (mocked), 200ms delay fires resize | unit | `npx vitest run --project unit src/utils/` | ❌ Wave 0 |
| INTL-05 | SelectContent shows search input when searchable+expanded, auto-focuses on expand | unit | `npx vitest run --project unit src/utils/` | ❌ Wave 0 |
| INTL-06 | Option renders with role="option", tabindex="0", applies selected/disabled classes | unit | `npx vitest run --project unit src/utils/` | ❌ Wave 0 |
| INTL-07 | Group provides context, children receive value+select+disabled via useGroupContext | unit | `npx vitest run --project unit src/utils/` | ❌ Wave 0 |
| INTL-08 | ExpandableContainer wraps Container, renders card with absolute positioning when expanded | unit | `npx vitest run --project unit src/utils/` | ❌ Wave 0 |

### Required Test Mocks (Wave 0 setup)
The following mocks must be in each test file or a shared setup:
1. `ResizeObserver` — jsdom does not implement it (see Pitfall 4)
2. `createPortal` mock for Overlay tests (pattern from `Tooltip.test.tsx`)

### Sampling Rate
- **Per task commit:** `npx vitest run --project unit src/utils/`
- **Per wave merge:** `npx vitest run --project unit`
- **Phase gate:** Full unit suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/utils/components/Label.test.tsx` — covers INTL-01 (component exists, test missing)
- [ ] `src/utils/components/Overlay.test.tsx` — covers INTL-02
- [ ] `src/utils/components/Container.test.tsx` — covers INTL-03
- [ ] `src/utils/components/SelectContainer.test.tsx` — covers INTL-04
- [ ] `src/utils/components/SelectContent.test.tsx` — covers INTL-05
- [ ] `src/utils/components/Option.test.tsx` — covers INTL-06
- [ ] `src/utils/components/Group.test.tsx` — covers INTL-07
- [ ] `src/utils/components/ExpandableContainer.test.tsx` — covers INTL-08
- [ ] `src/composables/useClickOutside.ts` + `src/composables/useClickOutside.test.ts` — new hook (INTL-03 dep)
- [ ] ResizeObserver global mock — add to `vitest.setup.ts` OR individual test files

---

## Open Questions

1. **Container's `onUpdated` / resize loop risk**
   - What we know: Vue's `onUpdated` fires after each render triggered by child/prop changes; React's `useEffect()` (no deps) fires after every render including those caused by the effect itself
   - What's unclear: Whether `setContentMinWidth(newVal)` in the resize callback will cause infinite loops in practice (depends on whether the value actually changes each time)
   - Recommendation: Implement resize using imperative DOM style updates (`ref.current.style.minWidth`) for the label element, and use `Object.is` guard before calling `setContentMinWidth`. If still problematic, use `useLayoutEffect` for the DOM-reading resize callback.

2. **Container's `.content` querySelector for click-outside bounds check**
   - What we know: Vue's `onBlur` queries `container.value.querySelector('[slot="content"], .content')` to include the expanded dropdown content area in the "inside" check
   - What's unclear: In React the content is rendered by ExpandableContainer/SelectContainer as a separate child — the Container's `useClickOutside` needs refs to both the trigger and the content area
   - Recommendation: `useClickOutside(refs[], callback)` already accepts an array of refs. ExpandableContainer/SelectContainer should pass a `contentRef` back to Container via a prop or expose it so both areas are covered. Alternatively, Container accepts an optional `contentRef` prop.

3. **`src/composables/` vs `src/hooks/` location for useClickOutside**
   - What we know: CONTEXT.md says `src/composables/` (same as useControllable, useTransition) but the actual React hooks live in `src/hooks/` — the composables barrel re-exports Vue's OptionalModel only
   - What's unclear: Whether to put useClickOutside in `src/hooks/` (where React hooks live) or `src/composables/` (where CONTEXT.md says)
   - Recommendation: The planner should place it in `src/hooks/` alongside `useControllable.ts` and `useTransition.ts` for consistency with the established React hook location, and export from `src/hooks/index.ts`. Update the CONTEXT.md directive to `src/hooks/` accordingly.

---

## Sources

### Primary (HIGH confidence)
- Vue source files read directly: `Container.vue`, `ExpandableContainer.vue`, `SelectContainer.vue`, `Group.vue`, `Option.vue`, `Overlay.vue`, `SelectContent.vue` — exact behavior documented
- React reference files read directly: `RadioGroup.tsx`, `ToggleGroup.tsx`, `useControllable.ts`, `useTransition.ts`, `Label.tsx` — established patterns confirmed
- Test reference files read directly: `Tooltip.test.tsx` (createPortal mock pattern), `useTransition.test.ts` (hook test patterns), `RadioGroup.test.tsx` (context test patterns)
- `vite.config.ts` — vitest configuration confirmed (unit project, jsdom, globals: true)
- `04-CONTEXT.md` — locked decisions and discretion areas
- `04-UI-SPEC.md` — interaction contracts and design tokens confirmed

### Secondary (MEDIUM confidence)
- React documentation pattern for `createPortal` — established project usage in Tooltip.tsx confirms the API
- `useEffect` cleanup pattern for observers — standard React pattern, confirmed by project's existing hook implementations

### Tertiary (LOW confidence)
- None — all claims are grounded in direct file reads from this project

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries confirmed present in project, no new dependencies needed
- Architecture: HIGH — patterns directly read from established project files (RadioGroup, ToggleGroup, Tooltip)
- Pitfalls: HIGH — identified from direct Vue source analysis + project test infrastructure examination
- Observer strategy: HIGH — Vue source faithfully documents the exact observer setup; React port is mechanical
- useClickOutside: MEDIUM — design derived from Vue's onBlur logic; exact callbackRef pattern for stale closure is standard but not yet implemented in this project

**Research date:** 2026-03-16
**Valid until:** 2026-04-16 (stable APIs — React 19, established patterns)
