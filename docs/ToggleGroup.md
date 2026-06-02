# Name: ToggleGroup
## Component Overview

**Purpose**: A container component for grouping related input components with synchronized selection state, commonly used for toggle button groups and visual component grouping.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [selectedValue, setSelectedValue] = useState('option1')
const options = [...]

return (
    <>
        <ToggleGroup value={selectedValue} onChange={setSelectedValue} options={options} />
        <p>Selected: {selectedValue}</p>
    </>
)
```

---

### Props API

#### value
Controls the currently selected component's groupValue. Type: `any` (default: `null`)

#### onChange
Callback triggered when the selection changes within the group. Type: `(value: any) => void`

#### vertical
Arranges grouped components vertically instead of horizontally. Type: `boolean` (default: `false`)

#### disabled
Disables all grouped components. Type: `boolean` (default: `false`)

#### type
Visual variant applied to all toggle buttons in the group. Type: `'default' | 'secondary'` (default: `'default'`)

---

### Events API

#### onChange
Triggered when the selection changes within the group.

### Slots API

This component uses `Toggle` internally and doesn't expose custom slots.

**Important Notes:**
- Value synchronization works bidirectionally between ToggleGroup and child components
- Use `vertical` prop to change layout orientation for all grouped components