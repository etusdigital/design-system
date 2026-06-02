# Name: MetricCard
## Component Overview

**Purpose**: A flexible metric display card component with multiple visual themes, loading states, and customizable content children props for showcasing key performance indicators and statistical data.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [isLoading, setIsLoading] = useState(false)

const viewDetails = () => {
    console.log('View revenue details')
}

<div className="grid grid-cols-1 md:grid-cols-3 gap-base">
    <MetricCard
        title="Total Revenue"
        value="$124,500"
        description="+12% from last month"
        icon="trending_up"
        type="success"
        onClick={viewDetails}
    />

    <MetricCard
        title="Active Users"
        value="2,450"
        description="+5% from last week"
        icon="people"
        loading={isLoading}
    />

    <MetricCard
        title="Conversion Rate"
        value="3.2%"
        description="-0.5% from last month"
        icon="analytics"
        type="danger"
        infoMessage="Below target"
        infoType="warning"
    />
</div>
```

---

### Props API

#### title
The main title displayed at the top of the card. Type: `string` (default: `""`)

#### value
The primary metric value to be displayed prominently. Type: `string | number` (default: `""`)

#### description
Additional descriptive text or secondary metric. Type: `string | number` (default: `""`)

#### icon
Icon name to display alongside the title. Type: `string` (default: `""`)

#### type
Visual theme variant for the card styling. Type: `"default" | "dashed" | "card"` (default: `"default"`)

#### size
Size variant affecting typography and spacing. Type: `"small" | "medium" | "large"` (default: `"medium"`)

#### color
Custom color for the value text (only applies to 'card' type). Type: `"primary" | "info" | "success" | "danger" | "warning" | "neutral"` (default: `"neutral"`)

#### infoMessage
Additional informational message displayed with tooltip or text. Type: `string` (default: `""`)

#### infoType
Color theme for the info message display. Type: `"primary" | "info" | "success" | "danger" | "warning" | "neutral"` (default: `"neutral"`)

#### tooltipMinWidth
Minimum width for the info tooltip container. Type: `string` (default: `"none"`)

#### loading
Shows skeleton loading animation instead of content. Type: `boolean` (default: `false`)

#### noTooltip
Displays info message as text instead of in a tooltip. Type: `boolean` (default: `false`)

#### boldTitle
Makes the title text bold for emphasis. Type: `boolean` (default: `false`)

---

### Events API

This React component supports standard DOM events like `onClick`.

### Children API

#### children
Additional content displayed below the main card information.

```tsx
<MetricCard
    className="w-fit"
    title="Your June recipe"
    value="$100,000.00"
    color="primary"
    type="card"
    size="large"
    boldTitle
    descriptionSlot={
        <div className="flex items-center h-full pt-xs">
            <Tooltip text="info">
                <Icon name="info" className="info-icon" />
            </Tooltip>
        </div>
    }
>
    <div className="flex flex-col gap-sm mt-sm">
        <div className="flex items-center gap-xs text-neutral-foreground-high">
            <Icon name="calendar_month" className="calendar-icon" />
            <p className="text-sm">Payment will be made by 04/30/2024</p>
        </div>
        <div className="flex gap-xs self-end">
            <Tag text="Processing payment" size="small" />
            <button variant="secondary" size="small">
                View Details
            </button>
        </div>
    </div>
</MetricCard>
```

#### titleSlot
Custom content to replace the default title text. Pass via `titleSlot` prop.

#### valueSlot
Custom content to replace the default value display. Pass via `valueSlot` prop.

#### descriptionSlot
Custom content to replace the default description text. Pass via `descriptionSlot` prop.

#### content
Custom content to replace both value and description sections. Pass via `content` prop.

#### info
Custom content displayed next to the title for additional information. Pass via `info` prop.

**Important Notes:**
- Built on top of Card component for consistent styling and layout
- Skeleton loading animation provides smooth user experience during data fetching
- Multiple theme variants (default, dashed, card) for different contexts
- Flexible sizing system (small, medium, large) adapts to various dashboard layouts
- Info message system with tooltip or text display options for additional context
- Icon integration enhances visual hierarchy and quick recognition
- Prop-based architecture allows complete customization of content areas
- Responsive typography that scales appropriately across different sizes
- Loading state management prevents layout shift during data updates
- Accessibility support with proper semantic structure and color contrast