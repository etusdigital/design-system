# Name: Dropdown
## Component Overview

**Purpose**: A flexible dropdown React component with multi-level navigation, search functionality, and customizable trigger elements for complex menu structures.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [selectedValue, setSelectedValue] = useState('');
const menuOptions = [...];

<Dropdown
    value={selectedValue}
    onChange={setSelectedValue}
    labelValue="label"
    options={menuOptions}
/>
```

---

### Props API

#### value / onChange
Controls the selected value. Type: `any` (default: `undefined`)

#### expanded / onExpandedChange
Controls the dropdown expanded state. Type: `boolean` (default: `false`)

#### labelValue
The label displayed for the dropdown. Type: `string` (default: `""`)

#### options
Array of menu options with hierarchical support. Type: `Option[]` (required)

```typescript
type Option = {
  label: string;        // Display text for menu option
  value: string;        // Unique identifier/value for selection
  icon?: string;        // Material icon name for the option
  disabled?: boolean;   // Disable interaction for this option
  bottom?: boolean;     // Position option at bottom of menu (for special options)
  options?: Option[];   // Nested sub-menu options for hierarchical structure
}
```

#### disabled
Disables the dropdown interaction. Type: `boolean` (default: `false`)

#### required
Marks the field as required. Type: `boolean` (default: `false`)

#### searchable
Enables search functionality within the dropdown. Type: `boolean` (default: `false`)

#### isError
Activates error styling mode. Type: `boolean` (default: `false`)

#### errorMessage
Error message to display when in error state. Type: `string` (default: `""`)

#### infoMessage
Information message to display. Type: `string` (default: `""`)

#### maxHeight
Maximum height of the dropdown container. Type: `string` (default: `"40px"`)

#### minWidth
Minimum width of the dropdown menu. Type: `string` (default: `"15em"`)

#### getObject
Returns the full object instead of just the value. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when the selected value changes.

#### onExpandedChange
Triggered when the dropdown expanded state changes.

### Children API

#### children
Custom trigger element to replace the default dropdown button.

```tsx
const [selectedValue, setSelectedValue] = useState('');
const [isExpanded, setIsExpanded] = useState(false);
const menuOptions = [...];

<Dropdown
    value={selectedValue}
    onChange={setSelectedValue}
    options={menuOptions}
    expanded={isExpanded}
    onExpandedChange={setIsExpanded}
>
    <button onClick={() => setIsExpanded(!isExpanded)}>
        Custom Trigger
    </button>
</Dropdown>
```

**Important Notes:**
- Supports hierarchical menu structures with unlimited nesting levels
- Searchable mode transforms the component into a filterable select
- Custom trigger children allow complete control over the dropdown appearance
- Automatic option selection state management for nested structures
- Bottom positioning option for special menu options (like logout/settings)
- Keyboard navigation support for accessibility
- Absolute positioning ensures dropdown menu doesn't affect layout