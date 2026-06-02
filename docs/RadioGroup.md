# Name: RadioGroup
## Component Overview

**Purpose**: A container component for grouping related input components with synchronized selection state, commonly used for radio button groups and visual component grouping.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [selectedValue, setSelectedValue] = useState('option1')
const options = [...]

<RadioGroup
    value={selectedValue}
    onChange={setSelectedValue}
    options={options}
/>
```

---

### Props API

#### value
Controls the currently selected component's group-value. Type: `any` (default: `null`)

#### onChange
Callback fired when the selection changes within the group. Type: `(value: any) => void`

#### vertical
Arranges grouped components vertically instead of horizontally. Type: `boolean` (default: `false`)

#### disabled
Disables all grouped components. Type: `boolean` (default: `false`)

#### options
Array of objects or primitive values to render as radio options. Type: `any[]` (required)

#### labelKey
Property name to use as display label when options are objects. Type: `string` (default: `"label"`)

#### valueKey
Property name to use as option value when options are objects. Type: `string` (default: `"value"`)

#### getObject
Whether to emit the full object instead of just the value when selection changes. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when the selection changes within the group.

### Children API

This component uses `Radio` internally and doesn't accept custom children.

**Important Notes:**
- Value synchronization works bidirectionally between RadioGroup and child components
- Use `vertical` prop to change layout orientation for all grouped components