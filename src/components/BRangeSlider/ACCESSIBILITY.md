# BRangeSlider Accessibility Implementation

## Overview

The BRangeSlider component has been enhanced with comprehensive WCAG 2.1 AA accessibility features, making it fully accessible to users with disabilities including those using screen readers, keyboard navigation, and other assistive technologies.

## Key Accessibility Features

### 1. ARIA Compliance

#### Dual ARIA Slider Pattern
- Each handle implements `role="slider"` with proper ARIA attributes
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for current state
- `aria-valuetext` for human-readable value descriptions
- `aria-orientation` indicates horizontal/vertical layout
- `aria-disabled` for disabled states

#### ARIA Relationships
- `role="group"` container with proper labeling
- `aria-labelledby` links to descriptive labels
- `aria-describedby` provides usage instructions
- Unique IDs for all ARIA relationships

#### Handle Identification
- Minimum handle: Custom labeling with position context
- Maximum handle: Custom labeling with position context
- Screen reader only text for handle descriptions

### 2. Keyboard Navigation

#### Core Navigation
- **Tab**: Switch focus between min/max handles
- **Arrow Keys**: Adjust values (Left/Down decrease, Right/Up increase)
- **Home**: Jump to minimum value (0)
- **End**: Jump to maximum value (maximum)
- **Page Up**: Large step increase (10x normal step)
- **Page Down**: Large step decrease (10x normal step)

#### Range-Specific Features
- Handle collision prevention with accessibility feedback
- Visual and auditory feedback when handles reach boundaries
- Proper step navigation with configurable step values

### 3. Screen Reader Support

#### Smart Announcements
- Value changes announced politely (non-interrupting)
- Handle focus announcements ("Focused on minimum handle")
- Range validation feedback ("Cannot move beyond maximum handle")
- Custom value formatting support

#### Live Regions
- Configurable live region announcements
- Polite announcements for value changes
- Range overlap prevention notifications

#### Value Formatting
- Customizable value formatters for announcements
- Unit-aware formatting (dollars, percentages, etc.)
- Human-readable value descriptions

### 4. Focus Management

#### Visual Indicators
- Clear focus outlines on active handles
- Keyboard mode detection and styling
- Focus ring with proper contrast ratios

#### Focus Flow
- Logical tab order between handles
- Disabled handles excluded from tab sequence
- Proper focus restoration after interactions

### 5. Touch Accessibility

#### Touch Targets
- Minimum 44px touch targets for handles
- Adequate spacing between interactive elements
- Touch-friendly drag interactions

## Configuration

### Basic Accessibility Props

```typescript
// Direct props
<BRangeSlider
  aria-label="Price range selector"
  aria-description="Select minimum and maximum prices"
  :model-value="[200, 800]"
/>
```

### Advanced Accessibility Configuration

```typescript
// Using accessibility config object
<BRangeSlider
  :model-value="[25, 75]"
  :accessibility="{
    ariaLabel: 'Budget range selector',
    ariaDescription: 'Adjust min and max budget for search',
    minHandleLabel: 'Minimum budget',
    maxHandleLabel: 'Maximum budget',
    announceChanges: true,
    valueFormatter: (value, unit) => `${value} dollars`,
    instructions: 'Custom keyboard instructions...',
    useLiveRegions: true
  }"
/>
```

### Accessibility Configuration Interface

```typescript
interface RangeSliderAccessibilityConfig {
  /** Custom ARIA label for the entire range slider */
  ariaLabel?: string;
  
  /** Custom ARIA description for the range slider */
  ariaDescription?: string;
  
  /** ARIA label for the minimum handle */
  minHandleLabel?: string;
  
  /** ARIA label for the maximum handle */
  maxHandleLabel?: string;
  
  /** Whether to announce range changes (default: true) */
  announceChanges?: boolean;
  
  /** Custom format function for value announcements */
  valueFormatter?: (value: number, unit: string) => string;
  
  /** Instructions text for screen readers */
  instructions?: string;
  
  /** Whether to use live regions for announcements (default: true) */
  useLiveRegions?: boolean;
}
```

## Testing Guidelines

### Automated Testing
- ARIA attributes validation
- Keyboard navigation testing
- Focus management verification
- Value validation testing

### Manual Testing
- Screen reader compatibility (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- High contrast mode support
- Zoom level testing (up to 200%)

### Screen Reader Testing Checklist

1. **Navigation**
   - [ ] Tab moves between handles correctly
   - [ ] Handle roles and labels are announced
   - [ ] Current values are announced clearly
   - [ ] Instructions are provided and clear

2. **Value Changes**
   - [ ] Arrow key changes are announced
   - [ ] Value format is human-readable
   - [ ] Range boundaries are respected and announced
   - [ ] Handle collision prevention works

3. **State Changes**
   - [ ] Disabled state is announced
   - [ ] Focus changes are clear
   - [ ] Error states are announced appropriately

## Implementation Examples

### Price Range Selector
```vue
<BRangeSlider
  v-model="priceRange"
  :max="1000"
  unit="$"
  :accessibility="{
    ariaLabel: 'Price range filter',
    ariaDescription: 'Set minimum and maximum price for product search',
    valueFormatter: (value, unit) => `${value.toFixed(0)} dollars`,
    minHandleLabel: 'Minimum price',
    maxHandleLabel: 'Maximum price'
  }"
/>
```

### Temperature Range
```vue
<BRangeSlider
  v-model="tempRange"
  :max="100"
  unit="°C"
  vertical
  :accessibility="{
    ariaLabel: 'Temperature range selector',
    ariaDescription: 'Set comfortable temperature range',
    valueFormatter: (value, unit) => `${value.toFixed(1)} degrees Celsius`
  }"
/>
```

### Stepped Progress Range
```vue
<BRangeSlider
  v-model="progressRange"
  :max="100"
  unit="%"
  :steps="[0, 0.25, 0.5, 0.75, 1]"
  :accessibility="{
    ariaLabel: 'Progress range selector',
    instructions: 'Values snap to 25% increments. Use arrow keys to adjust.',
    announceChanges: true
  }"
/>
```

## WCAG 2.1 AA Compliance

### Success Criteria Met

- **1.3.1 Info and Relationships**: Proper semantic structure with ARIA
- **1.4.3 Contrast**: Focus indicators meet 3:1 contrast ratio
- **2.1.1 Keyboard**: Full keyboard accessibility
- **2.1.2 No Keyboard Trap**: Proper focus management
- **2.4.3 Focus Order**: Logical tab sequence
- **2.4.7 Focus Visible**: Clear focus indicators
- **3.2.2 On Input**: No unexpected context changes
- **4.1.2 Name, Role, Value**: Complete ARIA implementation
- **4.1.3 Status Messages**: Live region announcements

### Additional Enhancements

- Enhanced error messaging and validation feedback
- Customizable value formatters for different locales
- Support for complex step configurations
- Touch accessibility improvements
- High contrast mode support

## Browser Support

Tested and supported in:
- Chrome 90+ (with screen readers)
- Firefox 88+ (with screen readers)  
- Safari 14+ (with VoiceOver)
- Edge 90+ (with Narrator)

## Known Limitations

- Some screen readers may require user configuration for optimal live region announcements
- Touch drag interaction feedback varies by platform
- Very small step sizes may require multiple key presses for noticeable changes