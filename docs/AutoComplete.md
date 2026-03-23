# Name: AutoComplete
## Component Overview

**Purpose**: An autocomplete input component that provides filtered suggestions as the user types, with customizable option rendering and form validation support.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [selectedValue, setSelectedValue] = useState('');
const [isExpanded, setIsExpanded] = useState(false);
const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

<AutoComplete
    value={selectedValue}
    onChange={setSelectedValue}
    expanded={isExpanded}
    onExpandedChange={setIsExpanded}
    labelValue="label"
    placeholder="Placeholder"
    options={options}
/>
```

---

### Props API

#### value / onChange
The current input value. Type: `string` (default: `""`)

#### expanded / onExpandedChange
Controls whether the dropdown is open. Type: `boolean` (default: `false`)

#### labelValue
Label displayed above the input. Type: `string` (default: `""`)

#### options
Array of string options to filter and display. Type: `number[] | string[]` (required)

#### placeholder
Placeholder text for the input field. Type: `string` (default: `""`)

#### absolute
Uses absolute positioning for the dropdown. Type: `boolean` (default: `true`)

#### required
Marks the field as required for form validation. Type: `boolean` (default: `false`)

#### disabled
Disables the input and dropdown. Type: `boolean` (default: `false`)

#### isError
Activates error visual state. Type: `boolean` (default: `false`)

#### errorMessage
Error message displayed when in error state. Type: `string` (default: `""`)

#### infoMessage
Informational message displayed below the input. Type: `string` (default: `""`)

#### maxHeight
Maximum height of the input area. Type: `string` (default: `"40px"`)

#### minWidth
Minimum width of the component. Type: `string` (default: `"15em"`)

---

### Events API

#### onChange
Triggered when the input value changes.

#### onExpandedChange
Triggered when the dropdown open/close state changes.

### Children API

#### option render prop
Customizes the rendering of each dropdown option. Receives `option` and `index`.

```tsx
const [selectedValue, setSelectedValue] = useState('');
const [isExpanded, setIsExpanded] = useState(false);
const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

<AutoComplete
    value={selectedValue}
    onChange={setSelectedValue}
    expanded={isExpanded}
    onExpandedChange={setIsExpanded}
    labelValue="label"
    placeholder="Placeholder"
    options={options}
    renderOption={(option, index) => (
        <><Icon name="account_circle" /> {option}</>
    )}
/>
```

**Important Notes:**
- Filtering is case-insensitive and matches partial strings
- Built on top of SelectContainer for consistent styling and behavior
- Dropdown automatically opens on focus and closes when an option is selected
- Use the `renderOption` callback prop for rich content like icons, badges, or structured data
- Input value can be different from available options for flexible user input