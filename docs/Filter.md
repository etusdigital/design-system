# Name: Filter
## Component Overview

**Purpose**: A multi-level filter component with search functionality, nested options, and customizable actions for complex data filtering scenarios.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [selectedFilters, setSelectedFilters] = useState({})
const filterOptions = [...]

<Filter
    value={selectedFilters}
    onChange={setSelectedFilters}
    options={filterOptions}
    labelValue="label"
/>
```

---

### Props API

#### value
Controls the selected filter values by category. Type: `SelectedFilters` (required)

```typescript
type SelectedFilters = {
  [categoryKey: string]: any[];  // Array of selected option indices per category
}
```

#### expanded / onExpandedChange
Controls the filter dropdown expanded state. Type: `boolean` (default: `false`)

#### options
Array of filter categories with their available options. Type: `FilterOption[]` (required)

```typescript
type FilterOption = {
  [labelKey]: string | number;        // Display text for filter option
  [valueKey]: any;        // Unique value for the option
  options: any[];   // Additional custom properties
}
```

#### labelValue
The label displayed for the filter button. Type: `string` (default: `""`)

#### labelKey
Property name used for displaying option labels. Type: `string` (default: `"label"`)

#### valueKey
Property name used for option values in the data structure. Type: `string` (default: `"value"`)

#### icon
Icon displayed on the filter button. Type: `string` (default: `"filter_list"`)

#### searchLabel
Placeholder text for search input when searchable is enabled. Type: `string` (default: `"Search"`)

#### searchable
Enables search functionality within filter categories. Type: `boolean` (default: `false`)

#### disabled
Disables the filter interaction. Type: `boolean` (default: `false`)

#### getObject
Returns the full object instead of just the value. Type: `boolean` (default: `false`)

#### hideActions
Hides the default Clear and Apply buttons. Use with the `actions` callback prop for custom actions. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when filter selections change. Receives updated filter data and selection details.

#### onExpandedChange
Triggered when the filter dropdown expanded state changes.

#### onApply
Triggered when the Apply button is clicked to confirm filter selections.

#### onClear
Triggered when the Clear button is clicked to confirm filter selections.

### Children API

#### status
Custom content for displaying filter status when options are selected.

#### statusLabel
Custom text for the filter status display.

#### clearLabel
Custom text for the Clear button.

#### applyLabel
Custom text for the Apply button.

#### actions
Custom action buttons to replace the default Clear/Apply buttons.

**Important Notes:**
- Supports hierarchical filter categories with unlimited options per category
- Built-in search functionality for finding specific filter options quickly
- Automatic selection counting and status display
- Expandable categories with smooth animations and visual feedback
- Flexible data structure allows custom properties on filter options
- Clear and Apply actions for batch filter management
- Disabled state preserves selections while preventing modifications
- Absolute positioning option prevents layout shifts when dropdown opens