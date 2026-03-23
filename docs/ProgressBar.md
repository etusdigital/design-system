# Name: ProgressBar
## Component Overview

**Purpose**: A versatile progress indicator component supporting both percentage-based and step-based progress tracking with customizable styling, animations, and display options.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [uploadProgress, setUploadProgress] = useState(0.5)

<ProgressBar value={uploadProgress} />
```

---

### Props API

#### value
The current progress value (0-1 for percentage, or step number when using steps). Type: `number` (default: `0`)

#### type
Color theme variant for the progress bar styling. Type: `"primary" | "info" | "success" | "warning" | "danger" | "neutral"` (default: `"primary"`)

#### size
Size variant affecting height and typography. Type: `"small" | "medium" | "large"` (default: `"medium"`)

#### steps
Number of discrete steps for step-based progress. Type: `number` (default: `0`)

#### animationType
Animation type for loading states. Type: `"indeterminate" | "query" | undefined` (default: `undefined`)

#### displayPercentage
Location for displaying the percentage text. Type: `"center" | "bar" | undefined` (default: `undefined`)

#### color
Custom color for the progress bar fill. Type: `string` (default: `""`)

#### icon
Icon displayed at the end of the progress bar. Type: `string` (default: `""`)

#### infoMessage
Tooltip message displayed when hovering over the icon. Type: `string` (default: `""`)

#### neutralBackground
Uses neutral background color instead of theme-based background. Type: `boolean` (default: `false`)

---

### Events API

This React component does not emit custom events but supports `value` prop for reactive progress updates.

### Children API

#### iconSlot
Custom content to replace the default icon at the end of the progress bar. Pass via `iconSlot` prop.

```tsx
<ProgressBar
    value={progress}
    displayPercentage="bar"
    iconSlot="Custom icon content"
/>
```

**Important Notes:**
- Supports both percentage-based (0-1) and step-based progress tracking
- Smooth CSS transitions for progress changes with configurable duration
- Multiple animation types (indeterminate, query) for loading states
- Flexible percentage display options (center, bar, or hidden)
- Icon integration with tooltip support for additional context
- Custom color support with automatic background color blending
- Responsive design adapts to different container sizes
- Theme-based styling with support for all design system color variants
- Step-based progress automatically calculates percentage from current step
- Neutral background option for contexts requiring subdued styling
- Prop-based architecture allows complete customization of progress indicators
- Accessibility support with proper ARIA attributes and semantic markup
- Performance optimized with minimal DOM updates during progress changes
- CSS custom properties integration for advanced theming capabilities