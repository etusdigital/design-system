# Phase 2: Atomic Components - Research

**Researched:** 2026-03-13
**Domain:** Vue-to-React component migration — TSX, CSS Modules, createPortal, useRef/useEffect DOM positioning
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **CSS Scoping:** CSS Modules for component-scoped styles; two module files per component: `colors.module.css` + `Component.module.css`; compose with `clsx`; apply module classes directly to each element rather than relying on CSS nesting; Vue `<style scoped>` blocks → CSS Module files; `@apply` directives preserved as-is inside modules
- **`className` prop** on every component (carried from Phase 1 decision)
- **Slot-to-Children:** Default slot → `children` prop; named slots → compound sub-components for ALL named slots (e.g., `<Alert.Actions>`, `<ActionCard.Card>`, `<Tooltip.Label>`); conditional rendering with `{children && <wrapper>{children}</wrapper>}`; scoped slots → render prop functions
- **Tooltip Positioning:** Port the manual DOM positioning logic (getBoundingClientRect + style.left/top); replicate the ~40-line calculation in useRef + useEffect; NO external positioning library (no @floating-ui); use `createPortal(element, document.body)` directly; use `useTransition` hook from Phase 1 for opacity fade; close tooltip on scroll (wheel event listener)
- **Storybook Stories:** Each component gets `.stories.tsx` migrated alongside; copy existing Vue `.stories.ts` content and adapt for React (change imports, JSX syntax); keep same CSF structure (args, argTypes, story names); delete old `.stories.ts` (Vue) after React story is verified
- **Vue File Cleanup:** Delete `.vue` file after `.tsx` migration is verified; delete `.stories.ts` (Vue) alongside the `.vue` file; clean up per component, not in bulk

### Claude's Discretion
- Migration order of the 20 components (dependency-aware batching)
- Exact CSS Module class naming conventions
- Whether to create a shared pattern/template for common migration steps
- How to handle edge cases in individual components (e.g., Button's `blendColors` hover logic, Breadcrumb's `useOptionalModel` usage)
- Story completeness — adapt what exists, don't add new variants

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ATOM-01 | Button component migrated to React TSX with same props and visual output | Covered by Button Vue analysis, CSS Module + hover state pattern, Spinner dependency graph |
| ATOM-02 | Icon component migrated to React TSX | Already done in Phase 1 — verify only |
| ATOM-03 | Badge component migrated to React TSX | Covered by Badge Vue analysis, v-bind(color) → inline style pattern, Spinner dependency |
| ATOM-04 | StatusBadge component migrated to React TSX | Thin wrapper over Badge — pure composition pattern |
| ATOM-05 | Avatar component migrated to React TSX | Simple computed prop pattern documented |
| ATOM-06 | Spinner component migrated to React TSX | Pure SVG — no-state component pattern |
| ATOM-07 | Skeleton component migrated to React TSX | Pure div — no-state component pattern |
| ATOM-08 | Separator component migrated to React TSX | Simple slot → children with conditional lines |
| ATOM-09 | ProgressBar component migrated to React TSX | Dual render mode (bar vs steps), dynamic component → conditional render |
| ATOM-10 | Alert component migrated to React TSX | Named slot → compound sub-component; ResizeObserver lifecycle; expand state |
| ATOM-11 | Tooltip component migrated to React TSX | createPortal + useTransition + useRef DOM positioning — most complex in phase |
| ATOM-12 | Breadcrumb component migrated to React TSX | useControllable (replaces useOptionalModel); FloatCard dependency; parsedOptions logic |
| ATOM-13 | Card component migrated to React TSX | Trivial — passes className, children |
| ATOM-14 | ActionCard component migrated to React TSX | Named slot → compound sub-component; drag event lifecycle; Card dependency |
| ATOM-15 | IconCard component migrated to React TSX | Named slots → compound; v-bind(color) → inline style; Card + Icon dependencies |
| ATOM-16 | MetricCard component migrated to React TSX | Multiple named slots → compound sub-components; Tooltip + Skeleton + Card dependencies |
| ATOM-17 | FloatCard component migrated to React TSX | createPortal; useRef DOM positioning; click/wheel close handlers; useTransition |
| ATOM-18 | Image component migrated to React TSX | createPortal for preview modal; useTransition; Button + Icon dependencies; keydown listener |
| ATOM-19 | Connector component migrated to React TSX | Wraps Group utility (internal) — must implement inline or defer to Phase 4 |
| ATOM-20 | Profile component migrated to React TSX | useControllable; wraps SelectContainer (internal) — must implement inline or defer to Phase 4 |
</phase_requirements>

---

## Summary

Phase 2 migrates 19 Vue SFCs to React TSX (Icon is already done in Phase 1). The components span a complexity spectrum: trivial presentational components (Skeleton, Spinner, Card, Separator) at one end, and stateful portal components at the other (Tooltip, FloatCard, Image). The core translation patterns — props → typed interface, `v-bind(color)` → inline `style`, `<Transition>` → `useTransition` hook, `<Teleport>` → `createPortal`, named slots → compound sub-components — cover roughly 80% of migration work. Two specific complications require careful planning: (1) Connector and Profile depend on internal utility components (Group, SelectContainer) from Phase 4; these components must either be stubbed or Profile/Connector must render inline equivalents. (2) The `blendColors` utility in Badge and Button mutates `document.body` at render time, which is safe in browser but requires awareness for SSR or test environments.

The recommended migration order groups components by dependency, migrating dependencies before dependents: Spinner/Skeleton first (zero deps), then Card, then Badge/StatusBadge/Avatar/Separator/Skeleton/Icon (verify), then Breadcrumb/Alert/ProgressBar, then FloatCard/Tooltip, then ActionCard/IconCard/MetricCard (which depend on Card + Icon), then Image, and finally Connector/Profile (which depend on internal utilities). Button must land before anything that renders Button as a child (Image toolbar, Profile).

**Primary recommendation:** Follow the dependency-ordered batch strategy. For Connector and Profile, implement their required utilities (Group, SelectContainer) as local inline components within those files — they are small enough (~30 lines each) — rather than blocking on Phase 4. This keeps Phase 2 self-contained.

---

## Standard Stack

### Core (already installed — Phase 1 verified)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react | 19.x | UI rendering | Project base |
| react-dom | 19.x | `createPortal`, DOM rendering | Required for portal pattern |
| clsx | latest | Conditional className composition | Already in use (Icon) |
| @tailwindcss/vite | latest | Tailwind utility classes | Project CSS strategy |

### No New Packages Required
All libraries needed for Phase 2 are already installed. Phase 2 is pure migration work — no new dependencies.

**Installation:** None needed.

---

## Architecture Patterns

### Recommended Component File Structure
```
src/components/ComponentName/
├── ComponentName.tsx          # React component implementation
├── ComponentName.module.css   # Layout/structure scoped styles
├── colors.module.css          # Color variant classes (where applicable)
├── ComponentName.stories.tsx  # Storybook story (React CSF3)
├── index.ts                   # Named re-export (already exists from Phase 1 stub)
```
The `.vue` and `.stories.ts` files are deleted once the React version is verified.

### Pattern 1: Simple Presentational Component (Spinner, Skeleton, Card, Separator)
**What:** No props or minimal props, no state, pure JSX translation.
**When to use:** Components with no `<script>` section or only trivial computed props.

```tsx
// Spinner.tsx — translated from Spinner.vue
import './Spinner.module.css';

export interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <svg className={clsx('spinner', className)} viewBox="0 0 50 50">
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="8" shapeRendering="geometricPrecision" />
    </svg>
  );
}
```

### Pattern 2: Props + Computed Classes (Badge, StatusBadge, Avatar, ProgressBar)
**What:** Vue `withDefaults(defineProps(...))` → TypeScript interface + default parameters. Class bindings `:class="[type, size]"` → `clsx(styles[type], styles[size])`.
**When to use:** Components with enum props, conditional classes, no DOM refs.

```tsx
// Badge.tsx (illustrative pattern)
import clsx from 'clsx';
import styles from './Badge.module.css';
import colors from './colors.module.css';
import { blendColors } from '../../utils';

export interface BadgeProps {
  labelValue?: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  type?: 'default' | 'secondary' | 'heavy';
  loading?: boolean;
  closeable?: boolean;
  icon?: string;
  isAppendedIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export function Badge({
  labelValue = '',
  color = '',
  size = 'medium',
  type = 'default',
  loading = false,
  closeable = false,
  icon = '',
  isAppendedIcon = false,
  children,
  className,
  onClose,
}: BadgeProps) {
  const background = color ? blendColors(color) : undefined;
  // ...
}
```

**Key translation:** Vue `color: v-bind(color)` → React `style={{ color, borderColor: color, background }}` as inline style.

### Pattern 3: Hover State with useState (Button)
**What:** Vue `ref(false)` + `@mouseover`/`@mouseout` → React `useState(false)` + `onMouseEnter`/`onMouseLeave`.
**When to use:** Components with `isHovering` state that affects computed styles.

```tsx
const [isHovering, setIsHovering] = useState(false);

// In JSX:
onMouseEnter={() => setIsHovering(true)}
onMouseLeave={() => setIsHovering(false)}
```

### Pattern 4: Named Slot → Compound Sub-Component
**What:** Vue `<slot name="card" />` → static property on component function.
**When to use:** All components with named slots (ActionCard, Alert, IconCard, MetricCard, Tooltip).

```tsx
// ActionCard.tsx
export function ActionCard({ icon, color, hideDrag, children, className, onDragstart, onDragging, onDragend, onDelete }: ActionCardProps) {
  // ...
}

// Sub-component for named slot "card"
ActionCard.Card = function ActionCardCard({ children }: { children?: React.ReactNode }) {
  return <div className="py-sm">{children}</div>;
};

// Usage in Storybook / consumer:
<ActionCard icon="edit">
  Header content
  <ActionCard.Card>
    Card body content
  </ActionCard.Card>
</ActionCard>
```

### Pattern 5: createPortal + useTransition (Tooltip, FloatCard)
**What:** Vue `<Teleport to="body"><Transition name="opacity"><div v-if="isHovering">` → React `createPortal` + `useTransition` hook.
**When to use:** Tooltip, FloatCard — any component that renders outside the DOM tree.

```tsx
import { createPortal } from 'react-dom';
import { useTransition } from '../../hooks/useTransition';

// useTransition returns { isMounted, isActive }
// isMounted: controls whether element is in DOM at all
// isActive: controls the CSS opacity class (transition trigger)
const { isMounted, isActive } = useTransition(isHovering, { duration: 500 });

return (
  <div ref={contentRef} onMouseEnter={showTooltip} onMouseLeave={() => setIsHovering(false)}>
    {isMounted && createPortal(
      <div
        ref={tooltipRef}
        className={clsx(styles.tooltip, styles[position], isActive && styles.active)}
      >
        {/* tooltip content */}
      </div>,
      document.body
    )}
    {children}
  </div>
);
```

**CSS:** The Vue `.opacity-enter-active / .opacity-leave-active / .opacity-enter-from / .opacity-leave-to` pattern becomes two CSS classes: base styles always applied, `.active` class added when `isActive` is true.

```css
/* Tooltip.module.css */
.tooltip {
  transition: opacity 500ms ease-out;
  opacity: 0;
}
.tooltip.active {
  opacity: 1;
}
```

### Pattern 6: DOM Positioning with useRef + useEffect (Tooltip, FloatCard)
**What:** Vue `nextTick() + getBoundingClientRect()` → React `useEffect` after mount (isMounted triggers re-render) + direct ref manipulation.
**When to use:** Tooltip, FloatCard — components that must compute absolute position after render.

```tsx
const contentRef = useRef<HTMLDivElement>(null);
const tooltipRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!isMounted || !contentRef.current || !tooltipRef.current) return;
  const rect = (contentRef.current.firstElementChild || contentRef.current).getBoundingClientRect();
  calculatePosition(rect, tooltipRef.current);
  // ...
}, [isMounted, position]);
```

**Key detail:** The positioning effect must run after `isMounted` becomes true (element is in DOM via portal) but BEFORE the opacity transition fires. The `useTransition` hook uses `requestAnimationFrame` to trigger `isActive` — this gives one frame for positioning to complete before the element becomes visible.

### Pattern 7: Controlled State with useControllable (Breadcrumb, FloatCard, Profile)
**What:** Vue `useOptionalModel` → React `useControllable` hook from Phase 1.
**When to use:** Components that accept optional `value`/`onChange` props (controlled) or manage internal state (uncontrolled).

```tsx
// Breadcrumb.tsx
import { useControllable } from '../../hooks/useControllable';

const [model, setModel] = useControllable({
  value: value,         // controlled: external value
  defaultValue: undefined,
  onChange: onChange,   // controlled: external change handler
});
```

**Prop mapping:** Vue `modelValue` → React `value`; Vue `emit('update:modelValue', v)` → React `onChange(v)`.

### Pattern 8: ResizeObserver Lifecycle (Alert)
**What:** Vue `onMounted` + `onUpdated` + `onBeforeUnmount` → React `useEffect` with cleanup.
**When to use:** Alert (and similar) that use ResizeObserver to adjust height dynamically.

```tsx
const cardRef = useRef<HTMLDivElement>(null);
const contentRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new ResizeObserver(resize);
  if (cardRef.current) observer.observe(cardRef.current, { box: 'border-box' });
  if (contentRef.current) observer.observe(contentRef.current, { box: 'border-box' });
  return () => observer.disconnect();
}, []); // mount/unmount only

// Re-run resize on every render (replaces onUpdated):
useEffect(() => {
  resize();
}); // no deps array = runs after every render
```

### Pattern 9: Dynamic Component → Conditional Render (ProgressBar)
**What:** Vue `:is="component"` where `component` is a computed string ('Tooltip' or 'div') → React ternary or inline conditional.
**When to use:** ProgressBar uses `<component :is="Tooltip">` when `infoMessage` is set.

```tsx
// ProgressBar — icon wrapper
{!animationType && (icon || iconSlot) && (
  infoMessage
    ? <Tooltip labelValue={infoMessage} position="bottom" style={{ left: progressWidth, color }}>
        {iconContent}
      </Tooltip>
    : <div className={styles.progressIcon} style={{ left: progressWidth, color }}>
        {iconContent}
      </div>
)}
```

### Pattern 10: Storybook Story Migration (CSF3 React)
**What:** Vue `.stories.ts` with `@storybook/vue3` → React `.stories.tsx` with `@storybook/react`.
**Key changes:**
- Import: `from '@storybook/vue3'` → `from '@storybook/react'`
- Import component from `.tsx` not `.vue`
- Remove `render: (args) => ({ components: { Button }, setup() { return { args }; }, template: '...' })`
- Replace with: `render: (args) => <Button {...args}>Label</Button>`
- `ComponentPropsAndSlots` → not needed, use standard TypeScript prop types
- `satisfies Meta<typeof Component>` — keep this pattern (works in React Storybook)

```tsx
// Example React story pattern (from Icon.stories.tsx)
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  component: Button,
  argTypes: { /* same as Vue version */ },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { color: 'primary', variant: 'default', size: 'medium' },
  render: (args) => <Button {...args}>Label</Button>,
};
```

### Anti-Patterns to Avoid
- **Importing `.vue` files in `.tsx`:** React cannot process Vue SFCs. Always import from `.tsx`.
- **CSS nesting for descendant selectors:** CSS Modules with Tailwind support nesting, but class names must be applied to the specific element. Don't rely on `.button .icon` to style icons — add the module class directly to the Icon element.
- **Vue `$slots.default` check:** Replace with `{children && ...}`. There is no `$slots` in React.
- **Vue `$slots['slot-name']` check:** Replace with dedicated prop (compound sub-component children).
- **Vue `nextTick()`:** Replace with `useEffect` — React batches DOM updates, `useEffect` runs after commit.
- **`computedStyleMap()` in ProgressBar/Tooltip:** This Web API is not universally supported. Keep as-is but note it falls back to `4` — this is acceptable.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Opacity enter/leave timing for portals | Manual setTimeout state machine | `useTransition` hook (Phase 1, `src/hooks/useTransition.ts`) | Already handles mount/unmount timing with RAF for enter, setTimeout for leave |
| Controlled/uncontrolled state | Custom value sync logic | `useControllable` hook (Phase 1, `src/hooks/useControllable.ts`) | Handles controlled/uncontrolled detection, dev warning |
| Color blending for Badge/Button custom backgrounds | Custom color math | `blendColors()` from `src/utils/index.ts` | Already implemented, handles CSS color resolution via DOM |
| Conditional class composition | String concatenation | `clsx` | Handles falsy values, arrays, objects |
| Portal rendering | Custom mount/unmount DOM node | `createPortal` from `react-dom` | React-managed lifecycle |

**Key insight:** All utility logic from Vue (`blendColors`, `isObject`, color conversion functions) lives in `src/utils/index.ts` — this is already framework-agnostic and can be imported directly in React TSX files with zero modification.

---

## Common Pitfalls

### Pitfall 1: CSS Module Class Names Break Descendant Selectors
**What goes wrong:** Vue scoped CSS uses `.button .spinner { ... }` to target child components. When migrated to CSS Modules, `.button` gets a mangled name like `_button_a1b2c3` but the Spinner renders its own `.spinner` class — the descendant selector no longer matches.
**Why it happens:** CSS Modules scope the parent's class names but not the child component's class names. The child (Spinner, Icon) renders its own CSS class from its own file.
**How to avoid:** In the parent CSS Module, use a global selector for child component classes: `:global(.spinner) { ... }` OR pass a `className` prop to the child component: `<Spinner className={styles.buttonSpinner} />`.
**Warning signs:** Spinner/Icon sizes controlled from Button/Badge/Alert CSS not applying.

### Pitfall 2: Portal Positioning Runs Before DOM Paint
**What goes wrong:** The tooltip element is mounted via `createPortal` and the positioning `useEffect` runs, but `tooltipRef.current.offsetWidth` returns 0 because the browser hasn't painted yet.
**Why it happens:** `useEffect` runs synchronously after commit but the layout hasn't been calculated for portal-mounted elements in all browsers.
**How to avoid:** Use `requestAnimationFrame` inside the positioning effect, or rely on the fact that `useTransition` already delays `isActive` by one RAF. The element is invisible during the first frame, giving layout time to settle. Alternatively, calculate position inside a `setTimeout(fn, 0)` as the Vue `showCard` function already does for the click handler.
**Warning signs:** Tooltip or FloatCard appears at position (0, 0) on first open, then jumps to correct position.

### Pitfall 3: wheel Event Listener Persists After Component Unmount
**What goes wrong:** Tooltip and FloatCard add `document.addEventListener('wheel', closeHandler)` — if the component unmounts before the user scrolls, this listener leaks.
**Why it happens:** Event listeners added to `document` are not tracked by React's synthetic event system and must be manually removed.
**How to avoid:** Always return a cleanup function from `useEffect` that removes the listener. OR store the handler in a `useRef` and remove it in the same effect's cleanup.
**Warning signs:** "Cannot perform a React state update on an unmounted component" warnings after Tooltip closes.

### Pitfall 4: Stale Closure in Position Calculation
**What goes wrong:** The Tooltip's `calculatePosition` function references `position` prop inside an effect but `position` is captured at the time the effect ran — if `position` changes, it uses the stale value.
**Why it happens:** Closures in effects capture variables by reference at creation time. Without the prop in the dependency array, changes are missed.
**How to avoid:** Include all props used inside effects in the dependency array. For Tooltip: `useEffect(() => { ... }, [isMounted, position])`.

### Pitfall 5: Badge/Button `blendColors` Called During Server Render or Test
**What goes wrong:** `blendColors` calls `document.createElement('div')` and `document.body.appendChild(div)` — this throws in jsdom tests or SSR environments when `document.body` is not fully set up.
**Why it happens:** `blendColors` is designed for browser-only use, resolving CSS color names via computed style.
**How to avoid:** Wrap calls in a guard: `if (typeof document !== 'undefined' && color) { ... }`. For tests, `jsdom` does provide a `document.body` so this typically works, but ensure tests don't run in a Node-only environment. The existing tests for Icon already use jsdom — the same setup applies.

### Pitfall 6: Profile and Connector Depend on Phase 4 Internal Utilities
**What goes wrong:** `Profile.vue` renders `<SelectContainer>` and `Connector.vue` renders `<Group>` — both are internal utility components from `src/utils/components/` not scheduled for Phase 2.
**Why it happens:** These utility components are "internal" components that Phase 4 will properly migrate.
**How to avoid:** For Phase 2, implement the required structural behavior inline within Profile and Connector. `Group` is a ~10-line flex container wrapper. `SelectContainer` is a more complex dropdown container — for Profile in Phase 2, implement the minimum needed for visual correctness as a local component, leaving full Phase 4 refactoring for later.

### Pitfall 7: ActionCard Touch Events — Typo in Vue Source
**What goes wrong:** The Vue source has a typo: `window.addEventListener('touhend', end)` (should be `touchend`). Copying this verbatim replicates the bug.
**Why it happens:** The original Vue source has a typo on line 37 of ActionCard.vue.
**How to avoid:** Fix the typo when migrating — use `touchend` (correct spelling) in the React version.

---

## Code Examples

### Tooltip Full Migration Pattern
```tsx
// Source: Tooltip.vue analysis + React createPortal + useTransition hook
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useTransition } from '../../hooks/useTransition';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  labelValue?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
}

// Named slot → compound sub-component
Tooltip.Label = function TooltipLabel({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
};

export function Tooltip({ labelValue = '', position = 'right', children, className }: TooltipProps) {
  const [isHovering, setIsHovering] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { isMounted, isActive } = useTransition(isHovering, { duration: 500 });

  const calculatePosition = useCallback((rect: DOMRect, el: HTMLElement) => {
    const padding = 4; // fallback, computedStyleMap not universal
    if (position === 'left' || position === 'right') {
      const h = position === 'left'
        ? rect.left - el.offsetWidth - padding
        : rect.right + padding;
      el.style.left = `${Math.max(0, h)}px`;
      el.style.top = `${rect.top + rect.height / 2 - el.offsetHeight / 2}px`;
    } else {
      const v = position === 'top' ? rect.top - el.offsetHeight : rect.bottom;
      el.style.top = `${Math.max(0, v)}px`;
      el.style.left = `${rect.left + rect.width / 2 - el.offsetWidth / 2}px`;
    }
  }, [position]);

  useEffect(() => {
    if (!isMounted || !contentRef.current || !tooltipRef.current) return;
    const rect = (contentRef.current.firstElementChild || contentRef.current).getBoundingClientRect();
    calculatePosition(rect, tooltipRef.current);

    const closeHandler = () => setIsHovering(false);
    document.addEventListener('wheel', closeHandler);
    return () => document.removeEventListener('wheel', closeHandler);
  }, [isMounted, calculatePosition]);

  return (
    <div ref={contentRef} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className={className}>
      {isMounted && createPortal(
        <div ref={tooltipRef} className={clsx(styles.tooltip, styles[position], isActive && styles.active)}>
          <div className={styles.tooltipTriangle} />
          <div className={styles.tooltipContent}>{labelValue}</div>
        </div>,
        document.body
      )}
      {children}
    </div>
  );
}
```

### CSS Module for Tooltip (transition pattern)
```css
/* Tooltip.module.css */
.tooltip {
  z-index: 1004;
  position: fixed;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 500ms ease-out;
}

.tooltip.active {
  opacity: 1;
}
```

### Storybook React Story (adapted from Vue .stories.ts)
```tsx
// Button.stories.tsx — migrated from Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  component: Button,
  argTypes: {
    type: { control: 'select', options: ['button', 'reset', 'submit'] },
    color: { control: 'select', options: ['primary', 'info', 'success', 'warning', 'danger', 'neutral'] },
    variant: { control: 'select', options: ['default', 'secondary', 'plain', 'reverse'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    round: { control: 'boolean' },
    alwaysOpen: { control: 'boolean' },
    loading: { control: 'boolean' },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.0001 } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { color: 'primary', variant: 'default', size: 'medium' },
  render: (args) => <Button {...args}>Label</Button>,
};
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Vue `<Teleport to="body">` | `createPortal(jsx, document.body)` from react-dom | Phase 2 | Direct replacement |
| Vue `<Transition name="X">` | `useTransition` hook (Phase 1) | Phase 1 | isMounted/isActive pattern replaces enter/leave classes |
| Vue `useOptionalModel` | `useControllable` hook (Phase 1) | Phase 1 | Same controlled/uncontrolled contract |
| Vue `:class="[type, size]"` | `clsx(styles[type], styles[size])` | Phase 2 | CSS Modules require object-keyed lookup |
| Vue `v-bind(color)` in CSS | React `style={{ color }}` as inline style | Phase 2 | CSS custom property injection not available in CSS Modules |
| Vue `$slots.default` | `{children && ...}` | Phase 2 | React children are always available or undefined |
| Vue `$slots['name']` | Compound sub-component (static property) | Phase 2 | Named slots require explicit composition pattern |
| Vue `.stories.ts` with `@storybook/vue3` | `.stories.tsx` with `@storybook/react` | Phase 2 | `render` function is JSX, not `template:` string |

---

## Migration Order (Recommended)

Ordered by dependency depth — implement dependencies before dependents.

**Wave 1 — Zero dependencies (pure presentational):**
1. Spinner (SVG only, no deps)
2. Skeleton (div only, no deps)
3. Card (children only, no deps)
4. Separator (children only, no deps)

**Wave 2 — Depend only on Wave 1 or Icon (already done):**
5. Icon — verify only (Phase 1 complete)
6. Badge (depends on Spinner, Icon)
7. StatusBadge (depends on Badge)
8. Avatar (no deps)
9. ProgressBar (depends on Tooltip — implement Tooltip first, OR use conditional render without Tooltip and note it)

**Wave 3 — Portal components (depend on Wave 1-2):**
10. Tooltip (depends on createPortal, useTransition)
11. FloatCard (depends on createPortal, Card, useTransition)

**Wave 4 — Complex cards (depend on Wave 1-3):**
12. Alert (depends on Icon, ResizeObserver, named slot)
13. ActionCard (depends on Card, Icon, drag events)
14. IconCard (depends on Card, Icon)
15. MetricCard (depends on Card, Skeleton, Tooltip, Icon)

**Wave 5 — High-complexity / internal utility dependents:**
16. Button (depends on Spinner, Icon, hover state, blendColors)
17. Breadcrumb (depends on FloatCard, Icon, useControllable)
18. Image (depends on Button, Icon, createPortal, useTransition)
19. Connector (depends on Group utility — implement inline)
20. Profile (depends on SelectContainer, Avatar, Button, Icon, useControllable — implement SelectContainer subset inline)

**Rationale for Button in Wave 5:** Button is needed by Image and Profile. While Button is architecturally simple, migrating it after Wave 1-4 ensures Spinner is available as a verified dependency.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest (via vite.config.ts) + React Testing Library |
| Config file | `vite.config.ts` — `test.projects[1]` (unit project) |
| Quick run command | `npx vitest run --project unit src/components/Icon` |
| Full suite command | `npx vitest run --project unit` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ATOM-02 | Icon renders span with material-symbols-rounded | unit | `npx vitest run --project unit src/components/Icon/Icon.test.tsx` | Yes |
| ATOM-01 | Button renders with correct color/variant classes | unit | `npx vitest run --project unit src/components/Button/Button.test.tsx` | No — Wave 0 |
| ATOM-06 | Spinner renders SVG with correct structure | unit | `npx vitest run --project unit src/components/Spinner/Spinner.test.tsx` | No — Wave 0 |
| ATOM-07 | Skeleton renders div with skeleton class | unit | `npx vitest run --project unit src/components/Skeleton/Skeleton.test.tsx` | No — Wave 0 |
| ATOM-13 | Card renders children in div with card class | unit | `npx vitest run --project unit src/components/Card/Card.test.tsx` | No — Wave 0 |
| ATOM-11 | Tooltip shows/hides content on hover via portal | unit | `npx vitest run --project unit src/components/Tooltip/Tooltip.test.tsx` | No — Wave 0 |
| ATOM-17 | FloatCard opens/closes card panel via portal | unit | `npx vitest run --project unit src/components/FloatCard/FloatCard.test.tsx` | No — Wave 0 |
| ATOM-03–ATOM-20 | Components render without errors | unit (smoke) | `npx vitest run --project unit` | No — Wave 0 |

**Note on Storybook test project:** The `storybook` project in vitest runs stories in a browser (Playwright/Chromium headless). This serves visual smoke tests — confirm each story renders without console errors.

### Sampling Rate
- **Per component commit:** `npx vitest run --project unit src/components/[ComponentName]/[ComponentName].test.tsx`
- **Per wave merge:** `npx vitest run --project unit`
- **Phase gate:** Full unit suite green before `/gsd:verify-work`

### Wave 0 Gaps
The following test files do not exist and must be created before or alongside each component implementation:
- [ ] `src/components/Button/Button.test.tsx` — covers ATOM-01
- [ ] `src/components/Badge/Badge.test.tsx` — covers ATOM-03
- [ ] `src/components/StatusBadge/StatusBadge.test.tsx` — covers ATOM-04
- [ ] `src/components/Avatar/Avatar.test.tsx` — covers ATOM-05
- [ ] `src/components/Spinner/Spinner.test.tsx` — covers ATOM-06
- [ ] `src/components/Skeleton/Skeleton.test.tsx` — covers ATOM-07
- [ ] `src/components/Separator/Separator.test.tsx` — covers ATOM-08
- [ ] `src/components/ProgressBar/ProgressBar.test.tsx` — covers ATOM-09
- [ ] `src/components/Alert/Alert.test.tsx` — covers ATOM-10
- [ ] `src/components/Tooltip/Tooltip.test.tsx` — covers ATOM-11
- [ ] `src/components/Breadcrumb/Breadcrumb.test.tsx` — covers ATOM-12
- [ ] `src/components/Card/Card.test.tsx` — covers ATOM-13
- [ ] `src/components/ActionCard/ActionCard.test.tsx` — covers ATOM-14
- [ ] `src/components/IconCard/IconCard.test.tsx` — covers ATOM-15
- [ ] `src/components/MetricCard/MetricCard.test.tsx` — covers ATOM-16
- [ ] `src/components/FloatCard/FloatCard.test.tsx` — covers ATOM-17
- [ ] `src/components/Image/Image.test.tsx` — covers ATOM-18
- [ ] `src/components/Connector/Connector.test.tsx` — covers ATOM-19
- [ ] `src/components/Profile/Profile.test.tsx` — covers ATOM-20

Existing: `src/components/Icon/Icon.test.tsx` — covers ATOM-02

---

## Open Questions

1. **Connector and Profile depend on internal utilities not yet migrated**
   - What we know: `Connector.vue` wraps `Group.vue` (a flex container from `src/utils/components/`); `Profile.vue` wraps `SelectContainer.vue` (a complex dropdown container)
   - What's unclear: Whether implementing inline stubs in Phase 2 will diverge enough from Phase 4's proper implementation to cause rework
   - Recommendation: For `Group` — implement inline (it is ~10-line flex wrapper). For `SelectContainer` used in Profile — implement a minimal local version that handles the open/closed dropdown and click-outside behavior. Document clearly that it will be replaced in Phase 4.

2. **ProgressBar uses `<component :is="'Tooltip'">` before Tooltip is migrated**
   - What we know: ProgressBar conditionally renders either a Tooltip or a plain div as the icon wrapper
   - What's unclear: Migration order — if ProgressBar is migrated before Tooltip, this slot renders as a plain div
   - Recommendation: Migrate ProgressBar after Tooltip (Wave 3/4 boundary above). The `component` dynamic pattern is resolved by a React ternary — no special handling needed once Tooltip exists.

3. **`computedStyleMap()` Web API availability**
   - What we know: Tooltip.vue and FloatCard.vue call `element.computedStyleMap().get('--spacing-xxs')` to read a CSS custom property; this API is not supported in Firefox
   - What's unclear: Whether the existing Vue version actually works cross-browser or whether the fallback value (4px) is always used
   - Recommendation: When porting to React, keep the same logic with the same fallback. The API is not required for correctness.

---

## Sources

### Primary (HIGH confidence)
- Direct inspection of Vue source files — 20 component `.vue` files read directly
- `src/hooks/useTransition.ts` — verified implementation
- `src/hooks/useControllable.ts` — verified implementation
- `src/utils/index.ts` — verified `blendColors` and other utilities
- `src/components/Icon/Icon.tsx` + `Icon.test.tsx` + `Icon.stories.tsx` — verified Phase 1 patterns
- `vite.config.ts` test section — verified vitest project config with jsdom + RTL + storybook

### Secondary (MEDIUM confidence)
- `react-dom` createPortal API — stable React API, HIGH confidence from React 16+
- CSS Modules `@apply` preservation — verified by existing `Icon.css` using Tailwind utilities in a plain CSS file, same pattern applies to `.module.css`

### Tertiary (LOW confidence)
- `computedStyleMap()` cross-browser support — not independently verified against caniuse; falls back to 4px

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already installed and verified working
- Architecture patterns: HIGH — derived from direct source code inspection of all 20 Vue files and existing React patterns (Icon)
- Pitfalls: HIGH — most identified from direct code analysis (ActionCard typo, CSS scoping, portal timing)
- Migration order: HIGH — based on dependency graph derived from import analysis

**Research date:** 2026-03-13
**Valid until:** 2026-05-13 (stable — React 19, CSS Modules, Tailwind are stable; no fast-moving dependencies)
