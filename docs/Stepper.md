# Name: Stepper
## Component Overview

**Purpose**: A multi-step navigation component with two visual styles, progress tracking, and customizable step validation for creating guided workflows and multi-step forms.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [currentStep, setCurrentStep] = useState(steps[0])

return (
    <Stepper
        value={currentStep}
        onChange={setCurrentStep}
        options={steps}
    />
)
```

---

### Props API

#### value
Controls the currently active step. Type: `any` (default: `undefined`)

#### onChange
Callback triggered when the active step changes. Type: `(value: any) => void`

#### options
Array of step options that can be strings or objects. Type: `any[]` (required)

#### labelKey
Property name used for displaying option labels when using object arrays. Type: `string` (default: `"label"`)

#### valueKey
Property name used for option values when using object arrays. Type: `string` (default: `"value"`)

#### size
Controls the stepper size variant. Type: `'medium' | 'large'` (default: `'medium'`)

#### disabled
Disables step navigation when true. Type: `boolean` (default: `false`)

#### allowedSkip
Allows users to skip steps and jump to any step. Type: `boolean` (default: `false`)

#### background
Custom background color for the stepper. Type: `string` (default: `"var(--neutral-background-default)"`)

#### getObject
Returns the complete option object instead of just the value when true. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when the active step changes. Receives the new step value.

#### onChangeStep
Triggered when any step interaction occurs. Receives the step option and index.

```tsx
const { toast } = useToast()

const [currentStep, setCurrentStep] = useState(steps[0])

const handleStepChange = (option, index) => {
    if (!isValid()) {
        toast({ title: 'Validation error', message: 'Please complete the current step', type: 'warning' })
        return
    }

    if (index !== steps.length - 1) setCurrentStep(steps[index + 1])
    else save()
}

return (
    <Stepper
        value={currentStep}
        onChange={setCurrentStep}
        options={steps}
        disabled
        onChangeStep={handleStepChange}
    />
)
```

---

### Slots API

This component doesn't expose custom slots. Content is controlled through the `options` prop.

**Important Notes:**
- Automatically tracks step progression and prevents skipping unless `allowedSkip` is enabled
- Step validation prevents users from jumping ahead unless explicitly allowed
- Custom background colors apply to button backgrounds and maintain visual consistency
- Progress tracking persists even when users navigate backwards
- Component automatically initializes to first step if no model value is provided