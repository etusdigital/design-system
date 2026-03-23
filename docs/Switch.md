# Name: Switch
## Component Overview

**Purpose**: A switch component with customizable positioning and accessibility features for binary state control with visual feedback and keyboard navigation support.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [isEnabled, setIsEnabled] = useState(false)

return (
    <Switch
        value={isEnabled}
        onChange={setIsEnabled}
    >
        Switch Label
    </Switch>
)
```

---

### Props API

#### value
Controls the switch state (on/off). Type: `boolean` (default: `false`)

#### onChange
Callback triggered when the switch state changes. Type: `(value: boolean) => void`

#### id
HTML id attribute for the switch element. Type: `string` (default: `undefined`)

#### name
HTML name attribute for form integration. Type: `string` (default: `undefined`)

#### rhs
Positions the switch button on the right-hand side of the label. Type: `boolean` (default: `false`)

#### disabled
Disables the switch interaction. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when the switch state changes. Receives the new boolean value.

### Slots API

#### children
Content displayed as the switch label next to the switch.

```tsx
const [setting, setSetting] = useState(false)

return (
    <Switch value={setting} onChange={setSetting}>
        Slot: default
    </Switch>
)
```

**Important Notes:**
- Full keyboard accessibility with Space key activation and proper ARIA attributes
- Smooth animation transitions for state changes with optimal timing
- Automatic label association when id or name props are provided
- Visual disabled state prevents interaction while maintaining clear feedback
- Right-hand side positioning option for flexible layout integration
- Switch role and aria-checked attributes for screen reader compatibility
- Focus management with tabindex and keyboard event handling
- Consistent sizing and color theming across all interaction states