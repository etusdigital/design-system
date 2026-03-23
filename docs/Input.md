# Name: Input
## Component Overview

**Purpose**: A comprehensive input component with multiple types, validation, masking, file upload, and extensive customization options for form data collection.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [inputValue, setInputValue] = useState('')

<Input
    value={inputValue}
    onChange={setInputValue}
    labelValue="label"
/>
```

---

### Props API

#### value
Controls the input value. Type: `any` (default: `undefined`)

#### onChange
Callback fired when the input value changes. Type: `(value: any) => void`

#### labelValue
The label displayed above the input. Type: `string` (default: `""`)

#### type
Input type determining behavior and validation. Type: `'text' | 'number' | 'search' | 'color' | 'password' | 'file' | 'email'` (default: `"text"`)

#### mask
Input mask for automatic formatting. Type: `'cpf' | 'cnpj' | 'cep' | 'domain' | 'url'` (default: `undefined`)

#### max
Maximum value for numbers or character limit for text. Type: `number` (default: `undefined`)

#### min
Minimum value for number inputs. Type: `number` (default: `undefined`)

#### step
Increment/decrement step for number inputs. Type: `number` (default: `1`)

#### isError
Activates error styling mode. Type: `boolean` (default: `false`)

#### errorMessage
Error message to display when in error state. Type: `string` (default: `""`)

#### infoMessage
Informational message displayed with tooltip. Type: `string` (default: `""`)

#### disabled
Disables input interaction. Type: `boolean` (default: `false`)

#### required
Marks the field as required. Type: `boolean` (default: `false`)

#### placeholder
Placeholder text for the input. Type: `string` (default: `""`)

#### textAlign
Text alignment within input. Type: `'left' | 'center' | 'right'` (default: `"start"`)

#### tooltipMinWidth
Minimum width for info tooltip. Type: `string` (default: `"none"`)

#### icon
Icon name to display in input. Type: `string` (default: `""`)

#### appendIcon
Position icon at end of input. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when the input value changes.

#### onFocus
Triggered when the input gains focus. Receives the current value.

#### onBlur
Triggered when the input loses focus. Receives the current value.

---

### Children API

#### iconSlot (render prop)
Custom icon content for prepended (left-side) icons. This prop allows you to override the default prepend icon with custom content and behavior.

```tsx

const [inputValue, setInputValue] = useState('')

const performSearch = () => {}

<Input
    value={inputValue}
    onChange={setInputValue}
    labelValue="Search"
    icon="search"
    placeholder="Enter search term"
    iconSlot={
        <Icon
            name="search"
            className="side-icon text-primary-interaction-default cursor-pointer hover:text-primary-foreground-low"
            onClick={performSearch}
        />
    }
/>
```

#### appendedIconSlot (render prop)
Custom icon content specifically for appended (right-side) icons. This prop is independent of the `appendIcon` prop and allows full control over appended icon behavior.

```tsx

const [passwordValue, setPasswordValue] = useState('')
const [showPassword, setShowPassword] = useState(false)

const togglePassword = () => setShowPassword(prev => !prev)

<Input
    value={passwordValue}
    onChange={setPasswordValue}
    type="password"
    labelValue="Password"
    placeholder="Enter your password"
    appendedIconSlot={
        <Icon
            name={showPassword ? 'visibility_off' : 'visibility'}
            className="side-icon cursor-pointer text-neutral-interaction-default hover:text-primary-foreground-low"
            onClick={togglePassword}
        />
    }
/>
```

**Important Notes:**
- Supports multiple input types with appropriate validation and behavior
- Built-in masking for common formats (CPF, CNPJ, CEP, domain, URL)
- Automatic validation for email, domain, and URL types
- File upload with drag-and-drop support and custom preview callback props
- Number inputs include increment/decrement controls and min/max validation
- Comprehensive error handling and visual feedback
- Icon support with flexible positioning (prepend or append)
- Responsive sizing options from extra small to full width
- Built-in accessibility features and keyboard navigation