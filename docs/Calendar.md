# Name: Calendar
## Component Overview

**Purpose**: A calendar component with support for single date selection, date ranges, and localization for flexible date input handling.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [selectedDate, setSelectedDate] = useState<Date | null>(null);

<Calendar
    value={selectedDate}
    onChange={setSelectedDate}
/>
```

---

### Props API

#### value / onChange
Controls the selected date or date range. Type: `Date | Date[] | Date[][] | null` (default: `null`)

#### lang
Language for date formatting and localization. Type: `string` (default: `"en-US"`)

#### type
Selection mode for the calendar. Type: `"date" | "period" | "compare"` (default: `"date"`)
- `"date"`: Single date selection
- `"period"`: Date range selection
- `"compare"`: Comparison mode with two date ranges

#### doubleCalendar
Shows two calendar months side by side. Type: `boolean` (default: `false`)

#### minDate
Earliest selectable date constraint. Type: `Date` (default: `undefined`)

#### maxDate
Latest selectable date constraint. Type: `Date` (default: `undefined`)

---

### Events API

#### onChange
Triggered when the selected date or date range changes.

### Children API

This component uses the internal Calendar component and doesn't accept children.

**Important Notes:**
- Supports single date, date range, and comparison modes via `type` prop
- Use `doubleCalendar` prop to show two months side by side
- Automatically handles locale-specific date formatting and display
- Date constraints can be applied using `minDate` and `maxDate` props
- Returns `Date` for single selection, `Date[]` for ranges, or `Date[][]` for comparison mode