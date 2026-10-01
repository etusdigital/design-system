# Name: Chip
## Component Overview

**Purpose**: A compact, flat label built on `StatusBadge` for short metadata such as categories, statuses or counts inside tables, cards and lists.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```vue
<template>
    <Chip label-value="Active" color="success" />
</template>
```

---

### Props API

#### label-value
The text content displayed in the chip. Type: `string` (default: `""`)

#### color
Visual color scheme for the chip. Type: `"primary" | "info" | "success" | "warning" | "danger" | "neutral"` (default: `"primary"`)

#### size
Chip size variant affecting font and icon size. Type: `"small" | "medium" | "large"` (default: `"small"`)

#### loading
Shows a spinner instead of the content. Type: `boolean` (default: `false`)

#### icon
Icon name displayed within the chip. Type: `string` (default: `""`)

#### is-appended-icon
When true, the icon appears after the text. Type: `boolean` (default: `false`)

#### closeable
Adds a close button that emits `@close`. The button is keyboard accessible and named "Remove". Type: `boolean` (default: `false`)

---

### Events API

#### @close
Triggered when the close button is activated (only when `closeable` is true).

### Slots API

#### #default
Content displayed instead of `label-value` when provided.

```vue
<template>
    <Chip color="info">
       Slot: default
    </Chip>
</template>
```

**Important Notes:**
- Same colors, sizes, icon and close behavior as `StatusBadge`, with a flat, borderless and tighter look
- Text never wraps; long content keeps a single line