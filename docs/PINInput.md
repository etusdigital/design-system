# Name: PIN Input

## Component Overview

**Purpose**: A specialized input component that allows users to enter a sequence of one-character alphanumeric inputs, commonly used for verification codes, PINs, and OTP entries.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [pinValue, setPinValue] = useState('')

const handleComplete = (value: string) => {
    console.log('PIN entered:', value)
}

<PINInput
    value={pinValue}
    onChange={setPinValue}
    length={6}
    onComplete={handleComplete}
/>
```

---

### Props API

#### value
Controls the PIN input value as a string. Type: `string` (default: `""`)

#### onChange
Callback fired when the PIN value changes. Type: `(value: string) => void`

#### length
Number of input fields to display. Type: `number` (default: `6`)

#### disabled
Disables all PIN input fields. Type: `boolean` (default: `false`)

#### placeholder
Placeholder text for each input field. Type: `string` (default: `""`)

#### separator
Character or string to display between input fields. Type: `string` (default: `""`)

#### type
Input field type - use 'password' to mask the entered values. Type: `'text' | 'number' | 'password'` (default: `"text"`)

#### otp
Indicates this is an OTP input for accessibility and autocomplete. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when the PIN value changes. Receives the complete string value.

```tsx
<PINInput
    value={pinValue}
    onChange={handleValueChange}
/>
```

#### onComplete
Triggered when all PIN fields are filled. Receives the complete string value.

```tsx
<PINInput
    length={6}
    onComplete={handleComplete}
/>
```

---

### Methods API

The component exposes the following methods via refs:

#### focus()
Focuses the first empty input field, or the first field if all are filled.

```tsx

const pinInputRef = useRef()
const [pinValue, setPinValue] = useState('')

const focusPinInput = () => {
    pinInputRef.current?.focus()
}

<PINInput ref={pinInputRef} value={pinValue} onChange={setPinValue} />
<button onClick={focusPinInput}>Focus PIN Input</button>
```

#### clear()
Clears all input fields and focuses the first field.

```tsx

const pinInputRef = useRef()
const [pinValue, setPinValue] = useState('')

const clearPinInput = () => {
    pinInputRef.current?.clear()
}

<PINInput ref={pinInputRef} value={pinValue} onChange={setPinValue} />
<button onClick={clearPinInput}>Clear PIN</button>
```

---

### Accessibility Features

- **Keyboard Navigation**: Arrow keys navigate between fields
- **Paste Support**: Ctrl/Cmd+V distributes pasted content across fields
- **Auto Focus**: Automatically focuses next field on input
- **Backspace Handling**: Smart backspace navigation between fields
- **Field Selection**: Selects field content on focus
- **Screen Reader Support**: Proper labeling and OTP indication

---

### Styling & Theming

The PIN Input component uses design system tokens and supports:

- **Focus States**: Visual feedback when fields are focused
- **Filled States**: Different styling for completed fields
- **Disabled States**: Proper disabled appearance and behavior
- **Error States**: Can be combined with form validation
- **Responsive Sizing**: Adapts to different screen sizes

**Important Notes:**
- Each input field accepts only one character
- Supports both text and password input types
- Automatic navigation between fields on input/backspace
- Paste functionality distributes content across all fields
- Complete keyboard accessibility with arrow key navigation
- Optimized for mobile and desktop usage
- Built-in support for verification codes and OTP workflows