# Name: StatusBadge
## Component Overview

**Purpose**: A versatile tag component with multiple color schemes, sizes, and visual styles for labeling, categorization, and status indication with support for icons and close functionality.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
<StatusBadge
    labelValue="StatusBadge component"
    icon="star"
/>
```

---

### Props API

#### labelValue
The text content displayed in the tag. Type: `string` (default: `""`)

#### color
Visual color scheme for the tag. Type: `"primary" | "informative" | "success" | "warning" | "danger" | "neutral"` (default: `"primary"`)

#### size
Badge size variant affecting padding and font size. Type: `"small" | "medium" | "large"` (default: `"medium"`)

#### type
Visual style variant affecting background and border appearance. Type: `"default" | "secondary" | "heavy"` (default: `"default"`)

#### loading
Shows spinner animation instead of content. Type: `boolean` (default: `false`)

#### icon
Icon name to display within the tag. Type: `string` (default: `""`)

#### isAppendedIcon
Controls icon position - when true, icon appears after text. Type: `boolean` (default: `false`)

#### closeable
Adds close button functionality with click event emission. Type: `boolean` (default: `false`)

---

### Events API

#### onClose
Triggered when the close button is clicked (only when `closeable` is true).

### Slots API

#### children
Content displayed instead of text prop when provided.

```tsx
<StatusBadge>
   Slot: default
</StatusBadge>
```

**Important Notes:**
- Three visual types: default (filled), secondary (outlined), heavy (high contrast)
- Six semantic color options with consistent theming across all types
- Icon positioning supports both prepend (default) and append modes
- Close functionality automatically adds close icon when enabled
- Loading state replaces all content with animated spinner
- Text automatically truncates with ellipsis for long content
- Responsive sizing with proportional icon scaling
- Accessibility support with proper contrast ratios in all color combinations