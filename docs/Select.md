# Name: Select
## Component Overview

**Purpose**: An intelligent selection component that dynamically adapts between single and multi-selection modes, offering unified API and enhanced functionality for both scenarios.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [selectedOption, setSelectedOption] = useState(null)
const options = [...]

<Select
    value={selectedOption}
    onChange={setSelectedOption}
    labelValue="label"
    options={options}
>
    Placeholder
</Select>
```

---

### Props API

#### value
Controls the selected option(s) value. Type: `any` (single) or `any[]` (multiple) (default: `null`)

#### onChange
Callback fired when the selected option(s) change. Type: `(value: any | any[]) => void`

#### expanded / onExpandedChange
Controls the dropdown expanded state. Type: `boolean` (default: `false`)

#### labelValue
The label displayed for the select button. Type: `string` (default: `""`)

#### options
Array of options to select from. Can be strings or objects. Type: `any[]` (required)

#### icon
Icon displayed on the select button. Type: `string` (default: `""`)

#### labelKey
Property name used for displaying option labels when using object arrays. Type: `string` (default: `"label"`)

#### valueKey
Property name used for option values when using object arrays. Type: `string` (default: `"value"`)

#### disabled
Disables the select interaction. Type: `boolean` (default: `false`)

#### required
Marks the field as required. Type: `boolean` (default: `false`)

#### searchable
Enables search functionality within the options. Type: `boolean` (default: `false`)

#### clearable
Adds clear button functionality to reset selections. Type: `boolean` (default: `false`)

#### multiple
Enables multi-selection mode, transforming component behavior and return types. Type: `boolean` (default: `false`)

#### secondary
Enables secondary styling variant. Type: `boolean` (default: `false`)

#### isError
Activates error styling mode. Type: `boolean` (default: `false`)

#### errorMessage
Error message to display when in error state. Type: `string` (default: `""`)

#### infoMessage
Informational message displayed with tooltip. Type: `string` (default: `""`)

#### getObject
Returns complete objects instead of just values when enabled. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when the selected option(s) change. Returns value(s) based on `multiple` and `getObject` settings.

#### onExpandedChange
Triggered when the dropdown expanded state changes.

### Children API

#### children (default)
Content displayed in the collapsed state of the select.

```tsx

const [selected, setSelected] = useState(null)
const options = [...]

<Select value={selected} onChange={setSelected} options={options}>
    Placeholder text
</Select>
```

#### searchLabel
Custom placeholder text for the search input when searchable is enabled. Pass via `searchLabel` prop.

#### status
Custom content for displaying the selected option (single mode only). Pass via `status` prop.

#### statusLabel
Custom text for the status display (multi-selection mode only). Pass via `statusLabel` prop.

#### clearLabel
Custom text for the clear button when clearable is enabled. Pass via `clearLabel` prop.

#### option (render prop)
Custom rendering for individual options in the dropdown.

```tsx

const [selected, setSelected] = useState(null)
const options = [...]

<Select
    value={selected}
    onChange={setSelected}
    options={options}
    option={({ option }) => (
        <div className="flex items-center gap-xs">
            <Icon name={option.icon} />
            {option.label}
        </div>
    )}
>
    Placeholder
</Select>
```

**Important Notes:**
- Dynamically switches between Select and MultiSelect components based on `multiple` prop
- Unified API provides consistent interface regardless of selection mode
- Intelligent value parsing handles both value extraction and object return modes
- Clear functionality automatically adapts to single or multiple selection contexts
- Maintains all functionality from underlying Select and MultiSelect components
- Seamless migration path from individual select components to unified solution
- Enhanced callback prop forwarding ensures all customization options remain available
- Optimized performance through component-level switching rather than conditional rendering