# Name: History
## Component Overview

**Purpose**: An interactive timeline component for displaying chronological events with customizable positioning, icons, and color themes for tracking progress, version control, or activity feeds.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [selectedOption, setSelectedOption] = useState(null)
const historyOptions = [...]

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}

<History
    value={selectedOption}
    onChange={setSelectedOption}
    options={historyOptions}
    option={({ option, index, active }) => (
        <div className="p-base">
            <p className={`text-sm font-semibold mxs${active ? ' text-primary-default' : ''}`}>
                {option.label}
            </p>
            <p className="text-xs text-neutral-foreground-medium">
                {formatDate(option.date)}
            </p>
        </div>
    )}
/>
```

---

### Props API

#### value
Controls the selected history option from the options array. Type: `any` (default: `null`)

#### onChange
Callback fired when a history option is selected. Type: `(value: any) => void`

#### options
Array of history options to display in the timeline. Type: `any[]` (required)

```typescript
type HistoryOption = {
  label: string;           // Display name for the option
  date?: Date;            // Timestamp for the event
  type?: "primary" | "info" | "success" | "warning" | "danger" | "neutral"; // Color theme
  icon?: string;          // Icon name to display
  isIconRound?: boolean;  // Whether to use round icon styling
  unfilled?: boolean;     // Whether to use unfilled icon variant
  [key: string]: any;     // Additional custom properties
}
```

#### position
Position of the history timeline relative to content. Type: `"top" | "bottom" | "left" | "right"` (default: `"right"`)

#### type
Default color theme for history options (overridden by option.type). Type: `"primary" | "info" | "success" | "warning" | "danger" | "neutral"` (default: `"primary"`)

#### disabled
Disables option selection interaction. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when a history option is selected. Receives the selected option and additional context including the index.

### Children API

#### option (render prop)
Custom rendering for each history option in the timeline.

**Render prop args:**
- `option`: The history option object
- `index`: Position in the options array
- `active`: Whether this option is currently selected

```tsx
<History
    value={selected}
    onChange={setSelected}
    options={options}
    option={({ option, index, active }) => (
        <div className={`p-base border rounded${active ? ' border-primary-default' : ''}`}>
            <h4 className="font-semibold">{option.title}</h4>
            <p className="text-sm text-neutral-foreground-medium">{option.description}</p>
            <div className="flex items-center gap-xs mt-xs">
                <Icon name={option.icon} />
                <span className="text-xs">{formatDate(option.date)}</span>
            </div>
        </div>
    )}
/>
```

**Important Notes:**
- Automatic timeline connector lines between options for visual continuity
- Support for both regular and round icon variants with customizable styling
- Flexible positioning system (top, bottom, left, right) for different layout needs
- Individual option type override allows mixed color themes within a single timeline
- Click interaction for option selection with visual feedback
- Responsive design adapts to different screen sizes and orientations
- Icon support with filled/unfilled variants for different visual emphasis
- Active state management with automatic highlighting
- Disabled mode prevents interaction while maintaining visual presentation
- Z-index management ensures proper layering of timeline elements
- Smooth hover effects and transitions for enhanced user experience
- Accessibility support with proper keyboard navigation and ARIA attributes
- Flexible option structure allows custom properties for extended functionality