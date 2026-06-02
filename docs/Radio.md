# Name: Radio
## Component Overview

**Purpose**: A radio button component with support for groups, visual variants, and accessibility features for single-choice selection scenarios.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [isSelected, setIsSelected] = useState(false)

<Radio
    value={isSelected}
    onChange={setIsSelected}
    name="radioGroup"
>
    Test radio
</Radio>
```

---

### Props API

#### value
Controls the radio button selection state. Type: `boolean` (default: `false`)

#### onChange
Callback fired when the radio button selection state changes. Type: `(checked: boolean) => void`

#### id
Unique identifier for the radio button element. Type: `string` (default: `undefined`)

#### name
Name attribute for form grouping and accessibility. Type: `string` (default: `undefined`)

#### groupValue
Value used when radio is part of a RadioGroup component. Type: `any` (default: `undefined`)

#### disabled
Disables radio button interaction. Type: `boolean` (default: `false`)

#### variant
Visual styling variant for different contexts. Type: `'default' | 'onboarding'` (default: `"default"`)

---

### Events API

#### onChange
Triggered when the radio button selection state changes.

### Children API

#### children
Content displayed next to the radio button circle.

```tsx

const [selected, setSelected] = useState(false)

<Radio value={selected} onChange={setSelected} name="options">
    Option label
</Radio>
```

**Important Notes:**
- Automatically integrates with RadioGroup component for grouped radio selections
- Supports keyboard navigation with Space key activation
- Provides proper ARIA attributes for screen reader accessibility
- Label element automatically associates with input when name/id is provided
- Onboarding variant provides larger sizing for better visibility in guided flows
- Disabled state prevents interaction while maintaining visual feedback
- Single radio buttons behave as toggles, while grouped radios enforce single selection