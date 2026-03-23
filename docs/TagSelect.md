# Name: TagSelect
## Component Overview

**Purpose**: A tag-based selection component with search functionality, custom tag creation, and removable tag management for collecting multiple values as visual tags.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [selectedTags, setSelectedTags] = useState([])
const [availableTags] = useState([...])

return (
    <TagSelect
        value={selectedTags}
        onChange={setSelectedTags}
        labelValue="Select Tags"
        options={availableTags}
        searchLabel="Search"
        noOptionsFound="No result found"
        emptyState="No tags created yet"
    />
)
```

---

### Props API

#### value
Controls the selected tags array. Type: `any[]` (default: `[]`)

#### onChange
Callback triggered when selected tags change. Type: `(tags: any[]) => void`

#### expanded
Controls the dropdown expanded state. Type: `boolean` (default: `false`)

#### onExpandedChange
Callback triggered when the dropdown expanded state changes. Type: `(expanded: boolean) => void`

#### labelValue
The label displayed for the tag select input. Type: `string` (default: `""`)

#### options
Array of available tag options. Can be strings or objects. Type: `any[]` (default: `[]`)

#### onOptionsChange
Callback triggered when new tags are added to the options array. Type: `(options: any[]) => void`

#### icon
Icon displayed on the tag select input. Type: `string` (default: `""`)

#### labelKey
Property name used for displaying option labels when using object arrays. Type: `string` (default: `"label"`)

#### absolute
Controls absolute positioning of the dropdown. Type: `boolean` (default: `false`)

#### disabled
Disables the tag select interaction. Type: `boolean` (default: `false`)

#### required
Marks the field as required. Type: `boolean` (default: `false`)

#### isError
Activates error styling mode. Type: `boolean` (default: `false`)

#### errorMessage
Error message to display when in error state. Type: `string` (default: `""`)

#### infoMessage
Informational message displayed with tooltip. Type: `string` (default: `""`)

#### buttonLabel
Text displayed on the add button. Type: `string` (default: `"Add"`)

#### searchLabel
Custom placeholder text for the search input. Type: `string`

#### noOptionsFound
Custom content displayed when search yields no results. Type: `string | ReactNode`

#### emptyState
Custom content displayed when no options are available. Type: `string | ReactNode`

---

### Events API

#### onChange
Triggered when the selected tags change. Receives the updated tags array.

#### onOptionsChange
Triggered when new tags are added to the options array. Receives the updated options array.

#### onExpandedChange
Triggered when the dropdown expanded state changes.

**Important Notes:**
- Prevents duplicate tag selection automatically
- Supports both string arrays and object arrays with configurable label keys
- New tags created via search are automatically added to the options array
- Search input is accessible and maintains focus for continuous tag creation
- Visual feedback distinguishes between available and selected options
- Disabled state prevents tag creation while maintaining visual feedback
- Absolute positioning option prevents layout shifts when dropdown opens