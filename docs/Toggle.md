# Name: Toggle
## Component Overview

**Purpose**: A button-style toggle component with two visual variants for creating toggleable button groups and card-style selections.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [isSelected, setIsSelected] = useState(false)

return (
    <Toggle
        value={isSelected}
        onChange={setIsSelected}
        name="buttonGroup"
    >
        Test toggle
    </Toggle>
)
```

---

### Props API

#### value
Controls the toggle button selection state. Type: `boolean` (default: `false`)

#### onChange
Callback triggered when the toggle button selection state changes. Type: `(value: boolean) => void`

#### id
Unique identifier for the toggle button element. Type: `string` (default: `undefined`)

#### name
Name attribute for form grouping and accessibility. Type: `string` (default: `undefined`)

#### groupValue
Value used when toggle is part of a Group component. Type: `any` (default: `undefined`)

#### disabled
Disables toggle button interaction. Type: `boolean` (default: `false`)

#### type
Visual variant of the toggle button. Type: `'default' | 'secondary'` (default: `'default'`)

---

### Events API

#### onChange
Triggered when the toggle button selection state changes.

### Slots API

#### children
Content displayed inside the toggle button.

```tsx
const [selected, setSelected] = useState(false)

return (
    <Toggle value={selected} onChange={setSelected} name="options">
        Slot: default
    </Toggle>
)
```

**Important Notes:**
- Provides two distinct visual styles: default and secondary variants
- Automatically integrates with Group component for grouped selections
- Supports keyboard navigation with Space key activation
- Provides proper ARIA attributes for screen reader accessibility
- Default variant ideal for standard toggle groups and action selections
- Secondary variant features rounded corners and different styling for card-like selections
- Disabled state prevents interaction while maintaining visual feedback
- Minimum sizing ensures consistent layout across different content lengths