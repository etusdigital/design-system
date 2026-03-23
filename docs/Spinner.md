# Name: Spinner
## Component Overview

**Purpose**: A loading spinner component with customizable colors and sizes for indicating loading states.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
<Spinner />
```

---

### Props API

#### color
Controls the spinner's color. Can be changed through the **color** CSS property or theme colors.

```tsx
<div className="flex gap-sm">
    <Spinner className="text-neutral-interaction-default" />
    <Spinner className="text-primary-interaction-default" />
    <Spinner className="text-informative-interaction-default" />
    <Spinner className="text-success-interaction-default" />
    <Spinner className="text-warning-interaction-default" />
    <Spinner className="text-danger-interaction-default" />
</div>
```

#### size
Controls the spinner's dimensions. Can be changed through the **font-size** CSS property, or by manipulating **width** and **height** directly.

```tsx
<div className="flex gap-sm">
    <Spinner className="text-xs" />
    <Spinner className="text-xl" />
    <Spinner className="text-3xl" />
    <Spinner className="text-5xl" />
    <Spinner className="text-7xl" />
</div>
```

**Important Notes:**
- Use appropriate sizes for different contexts (small for inline, larger for overlays)
- Consider accessibility by providing loading text or aria-labels
- The spinner inherits color from its parent element unless explicitly styled