# Name: DatePicker
## Component Overview

**Purpose**: A comprehensive date picker component with predefined options, custom date selection, and comparison mode for advanced filtering in dashboards and reports.

**Import**: Automatic - no need to import any DS components

### Basic Usage

#### Single Date Selection
```vue
<template>
    <DatePicker 
        v-model="selectedDate"
        type="date"
        label-value="Select Date"
    >
        Choose a date
    </DatePicker>
</template>

<script setup lang="ts">

const selectedDate = ref<Date | undefined>(undefined)
</script>
```

#### Date Range Selection
```vue
<template>
    <DatePicker 
        v-model="selectedRange"
        type="period"
        label-value="Date Range"
    >
        Select date range
    </DatePicker>
</template>

<script setup lang="ts">

const selectedRange = ref<Date[] | undefined>(undefined)
</script>
```

#### Comparison Mode
```vue
<template>
    <DatePicker 
        v-model="comparisonDates"
        v-model:type="dateType"
        type="compare"
        label-value="Compare Periods"
        allow-change-type
    >
        Compare periods
        <template #clear-label>
            Clear
        </template>
        <template #apply-label>
            Apply
        </template>
        <template #compare-label>
            Compare two periods
        </template>
    </DatePicker>
</template>

<script setup lang="ts">

const comparisonDates = ref<Date[][] | undefined>(undefined)
const dateType = ref<'date' | 'period' | 'compare'>('compare')
</script>
```

---

### Props API

#### v-model
Controls the selected date or date ranges. The type depends on the `type` prop:
- When `type="date"`: `Date | undefined` (single date)
- When `type="period"`: `Date[] | undefined` (date range with start and end)
- When `type="compare"`: `Date[][] | undefined` (two date ranges for comparison)

Type: `Date | Date[] | Date[][] | undefined` (default: `undefined`)

#### v-model:expanded
Controls the filter dropdown open/close state. Type: `boolean` (default: `false`)

#### v-model:type
Controls the selection mode. Type: `'date' | 'period' | 'compare'` (default: `'date'`)

#### label-value
Label displayed above the filter component. Type: `string` (default: `""`)

#### lang
Language for date formatting and localization. Type: `string` (default: `"en-US"`)

#### type
Selection mode for the date picker. Type: `'date' | 'period' | 'compare'` (default: `'date'`)

#### is-compare
Legacy prop for comparison mode (use `type="compare"` instead). Type: `boolean` (default: `false`)

#### allow-change-type
Allows users to switch between different selection modes. Type: `boolean` (default: `false`)

#### min-date
Earliest selectable date constraint. Type: `Date | undefined` (default: `undefined`)

#### max-date
Latest selectable date constraint. Type: `Date | undefined` (default: `undefined`)

#### options
Array of predefined date range options. Each option should have:
- `label`: string - Display text
- `value`: string - Unique identifier
- `calculate`: () => Date[] - Function that returns the date range
- `selected?`: boolean - Whether this option is pre-selected
- `disabled?`: boolean - Whether this option is disabled

Type: `OptionType[]` (default: predefined options)

#### absolute
Uses absolute positioning for the dropdown. Type: `boolean` (default: `false`)

#### disabled
Disables the filter interaction. Type: `boolean` (default: `false`)

#### required
Marks the field as required for form validation. Type: `boolean` (default: `false`)

#### is-error
Activates error visual state. Type: `boolean` (default: `false`)

#### error-message
Error message displayed when in error state. Type: `string` (default: `""`)

#### align-right
Aligns the dropdown to the right (requires absolute=true). Type: `boolean` (default: `false`)

#### separator
Custom separator text for comparison mode. Type: `string` (default: auto-detected based on language - "and" for English, "e" for Portuguese)

#### hide-actions
Hides the default Clear and Apply buttons. Use with the `#actions` slot for custom actions. Type: `boolean` (default: `false`)

---

### Events API

#### @update:model-value
Triggered when the selected date or date ranges change. Emits the new value based on the current `type`:
- `Date` when `type="date"`
- `Date[]` when `type="period"`
- `Date[][]` when `type="compare"`

#### @update:expanded
Triggered when the dropdown open/close state changes. Emits the new expanded state (`boolean`).

#### @update:type
Triggered when the selection mode changes (when `allow-change-type` is enabled). Emits the new type: `'date' | 'period' | 'compare'`.

#### @apply
Triggered when the Apply button is clicked. Emits the current model value: `Date | Date[] | Date[][]`.

#### @clear
Triggered when the Clear button is clicked. This event is emitted before the model value is cleared.

### Slots API

#### #default
Content displayed in the picker trigger area when no date is selected.

#### #compare-label
Custom text for the comparison mode checkbox.

#### #clear-label
Custom text for the Clear button.

#### #apply-label
Custom text for the Apply button.

#### #actions
Custom actions area to replace the default Clear/Apply buttons.

```vue
<template>
    <DatePicker v-model="dateFilter">
        Date Filter
        <template #actions>
            <Button size="small" variant="plain" @click="handleReset">
                Cancel
            </Button>
            <Button size="small" @click="handleSave">
                Save Filter
            </Button>
        </template>
    </DatePicker>
</template>

<script setup lang="ts">

const dateFilter = ref(null)

const handleReset = () => {}

const handleSave = () => {}
</script>
```

**Important Notes:**
- **Type-based value handling**: The `v-model` type changes based on the `type` prop:
  - `type="date"` → returns `Date`
  - `type="period"` → returns `Date[]`
  - `type="compare"` → returns `Date[][]`
- **Predefined options**: Quick-select options (Today, Yesterday, Last 7 days, etc.) are available when `type` is not `"date"`. These options calculate dates automatically.
- **Comparison mode**: When `type="compare"`, users can select two separate date ranges for side-by-side comparison.
- **Localization**: Automatic language detection for date formatting and separator text ("and" vs "e").
- **Form integration**: Supports `required`, `disabled`, `is-error`, and `error-message` props for seamless form validation.
- **Custom actions**: Use `hide-actions` prop with the `#actions` slot to completely customize the action buttons area.
- **Expandable container**: Built on top of `ExpandableContainer` component, providing consistent dropdown behavior across the design system.
- **Apply/Clear workflow**: The component uses an apply/clear pattern where changes are confirmed with the Apply button, optimized for dashboard and analytics use cases.