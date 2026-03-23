# Name: DatePicker
## Component Overview

**Purpose**: A comprehensive date picker React component with predefined options, custom date selection, and comparison mode for advanced filtering in dashboards and reports.

**Import**: Automatic - no need to import any DS components

### Basic Usage

#### Single Date Selection
```tsx
const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

<DatePicker
    value={selectedDate}
    onChange={setSelectedDate}
    type="date"
    labelValue="Select Date"
>
    Choose a date
</DatePicker>
```

#### Date Range Selection
```tsx
const [selectedRange, setSelectedRange] = useState<Date[] | undefined>(undefined);

<DatePicker
    value={selectedRange}
    onChange={setSelectedRange}
    type="period"
    labelValue="Date Range"
>
    Select date range
</DatePicker>
```

#### Comparison Mode
```tsx
const [comparisonDates, setComparisonDates] = useState<Date[][] | undefined>(undefined);
const [dateType, setDateType] = useState<'date' | 'period' | 'compare'>('compare');

<DatePicker
    value={comparisonDates}
    onChange={setComparisonDates}
    type="compare"
    onTypeChange={setDateType}
    labelValue="Compare Periods"
    allowChangeType
    clearLabel="Clear"
    applyLabel="Apply"
    compareLabel="Compare two periods"
>
    Compare periods
</DatePicker>
```

---

### Props API

#### value / onChange
Controls the selected date or date ranges. The type depends on the `type` prop:
- When `type="date"`: `Date | undefined` (single date)
- When `type="period"`: `Date[] | undefined` (date range with start and end)
- When `type="compare"`: `Date[][] | undefined` (two date ranges for comparison)

Type: `Date | Date[] | Date[][] | undefined` (default: `undefined`)

#### expanded / onExpandedChange
Controls the filter dropdown open/close state. Type: `boolean` (default: `false`)

#### type / onTypeChange
Controls the selection mode. Type: `'date' | 'period' | 'compare'` (default: `'date'`)

#### labelValue
Label displayed above the filter component. Type: `string` (default: `""`)

#### lang
Language for date formatting and localization. Type: `string` (default: `"en-US"`)

#### type
Selection mode for the date picker. Type: `'date' | 'period' | 'compare'` (default: `'date'`)

#### allowChangeType
Allows users to switch between different selection modes. Type: `boolean` (default: `false`)

#### minDate
Earliest selectable date constraint. Type: `Date | undefined` (default: `undefined`)

#### maxDate
Latest selectable date constraint. Type: `Date | undefined` (default: `undefined`)

#### options
Array of predefined date range options. Each option should have:
- `label`: string - Display text
- `value`: string - Unique identifier
- `calculate`: () => Date[] - Function that returns the date range
- `selected?`: boolean - Whether this option is pre-selected
- `disabled?`: boolean - Whether this option is disabled

Type: `OptionType[]` (default: predefined options)

#### disabled
Disables the filter interaction. Type: `boolean` (default: `false`)

#### required
Marks the field as required for form validation. Type: `boolean` (default: `false`)

#### infoMessage
Informational message displayed with tooltip. Type: `string` (default: `""`)

#### isError
Activates error visual state. Type: `boolean` (default: `false`)

#### errorMessage
Error message displayed when in error state. Type: `string` (default: `""`)

#### separator
Custom separator text for comparison mode. Type: `string` (default: auto-detected based on language - "and" for English, "e" for Portuguese)

#### hideActions
Hides the default Clear and Apply buttons. Use with the `actions` callback prop for custom actions. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when the selected date or date ranges change. Emits the new value based on the current `type`:
- `Date` when `type="date"`
- `Date[]` when `type="period"`
- `Date[][]` when `type="compare"`

#### onExpandedChange
Triggered when the dropdown open/close state changes. Emits the new expanded state (`boolean`).

#### onTypeChange
Triggered when the selection mode changes (when `allowChangeType` is enabled). Emits the new type: `'date' | 'period' | 'compare'`.

#### onApply
Triggered when the Apply button is clicked. Emits the current model value: `Date | Date[] | Date[][]`.

#### onClear
Triggered when the Clear button is clicked. This event is emitted before the model value is cleared.

### Children API

#### children
Content displayed in the picker trigger area when no date is selected.

#### clearLabel / applyLabel / compareLabel props
Custom text for the Clear button, Apply button, and comparison mode checkbox respectively.

#### actions (via `actions` callback prop)
Custom actions area to replace the default Clear/Apply buttons.

```tsx
const [dateFilter, setDateFilter] = useState(null);
const handleReset = () => {};
const handleSave = () => {};

<DatePicker
    value={dateFilter}
    onChange={setDateFilter}
    hideActions
    actions={
        <>
            <Button size="small" variant="plain" onClick={handleReset}>
                Cancel
            </Button>
            <Button size="small" onClick={handleSave}>
                Save Filter
            </Button>
        </>
    }
>
    Date Filter
</DatePicker>
```

**Important Notes:**
- **Type-based value handling**: The `value` type changes based on the `type` prop:
  - `type="date"` → returns `Date`
  - `type="period"` → returns `Date[]`
  - `type="compare"` → returns `Date[][]`
- **Predefined options**: Quick-select options (Today, Yesterday, Last 7 days, etc.) are available when `type` is not `"date"`. These options calculate dates automatically.
- **Comparison mode**: When `type="compare"`, users can select two separate date ranges for side-by-side comparison.
- **Localization**: Automatic language detection for date formatting and separator text ("and" vs "e").
- **Form integration**: Supports `required`, `disabled`, `isError`, and `errorMessage` props for seamless form validation.
- **Custom actions**: Use `hideActions` prop with the `actions` callback prop to completely customize the action buttons area.
- **Expandable container**: Built on top of `ExpandableContainer` component, providing consistent dropdown behavior across the design system.
- **Apply/Clear workflow**: The component uses an apply/clear pattern where changes are confirmed with the Apply button, optimized for dashboard and analytics use cases.