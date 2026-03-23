# Name: TagInput
## Component Overview

**Purpose**: An interactive input component for creating and managing multiple tags with validation, duplicate prevention, masking support, and flexible constraints for collecting structured data entries.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [tags, setTags] = useState([])

return (
    <TagInput
        value={tags}
        onChange={setTags}
        labelValue="label"
        hintMessage="Press enter to add a new tag"
    />
)
```

---

### Props API

#### value
Controls the array of tag values. Type: `any[]` (required)

#### onChange
Callback triggered when the tag array changes. Type: `(tags: any[]) => void`

#### labelValue
The label displayed above the input field. Type: `string` (default: `""`)

#### placeholder
Placeholder text shown in the input area. Type: `string` (default: `""`)

#### isError
Activates error styling mode. Type: `boolean` (default: `false`)

#### errorMessage
Error message to display when in error state. Type: `string` (default: `""`)

#### infoMessage
Informational message displayed with tooltip. Type: `string` (default: `""`)

#### disabled
Disables the input interaction. Type: `boolean` (default: `false`)

#### required
Marks the field as required. Type: `boolean` (default: `false`)

#### allowDuplicate
Allows duplicate tag values when enabled. Type: `boolean` (default: `false`)

#### max
Maximum number of tags allowed. Type: `number` (default: `undefined`)

#### mask
Input validation mask for specific data formats. Type: `"cpf" | "cnpj" | "cep" | "domain" | "url" | "email"` (default: `undefined`)

#### icon
Icon name to display in input. Type: `string` (default: `""`)

#### appendIcon
Position icon at end of input. Type: `boolean` (default: `false`)

#### hintMessage
Custom informational text displayed below the input area. Type: `string`

#### iconSlot
Custom icon content for prepended (left-side) icons.

```tsx
const handleCreate = () => {}

return (
    <TagInput
        value={inputValue}
        onChange={setInputValue}
        labelValue="label"
        iconSlot={
            <Icon
                name="plus"
                className="side-icon cursor-pointer text-neutral-interaction-default hover:text-primary-foreground-low"
                onClick={handleCreate}
            />
        }
    />
)
```

#### appendedIconSlot
Custom icon content for appended (right-side) icons.

```tsx
const handleCreate = () => {}

return (
    <TagInput
        value={inputValue}
        onChange={setInputValue}
        labelValue="label"
        appendedIconSlot={
            <Icon
                name="plus"
                className="side-icon cursor-pointer text-neutral-interaction-default hover:text-primary-foreground-low"
                onClick={handleCreate}
            />
        }
    />
)
```

---

### Events API

#### onChange
Triggered when the tag array changes (addition or removal). Receives the updated array.

**Important Notes:**
- Support for multiple input methods: Enter key, Tab key, comma separation, and line breaks
- Built-in validation for email, domain, URL, CPF, CNPJ, and CEP formats when using masks
- Automatic duplicate detection and prevention (configurable via allowDuplicate)
- Visual feedback with error animations and color-coded states
- Tag tooltips show full content for long values with text wrapping
- Maximum tag limit with visual counter display
- Backspace key removes last tag when input is empty
- Real-time error messaging with auto-dismiss functionality
- Accessible keyboard navigation and focus management
- Responsive design adapts to container width with tag wrapping