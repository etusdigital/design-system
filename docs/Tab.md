# Name: Tab
## Component Overview

**Purpose**: A tab navigation component with support for text and icon modes, flexible sizing, and card or plain styling variants for organizing content sections.

**Import**: Automatic - no need to import any DS components

### Basic Usage

#### String Array
```tsx
const [selectedTab, setSelectedTab] = useState<string | undefined>(undefined)

return (
    <Tab
        value={selectedTab}
        onChange={setSelectedTab}
        options={['Home', 'About', 'Contact']}
    />
)
```

#### Object Array
```tsx
interface TabOption {
  label: string
  value: string
  icon?: string
}

const [selectedTab, setSelectedTab] = useState<string | undefined>(undefined)
const tabs: TabOption[] = [
  { label: 'Home', value: 'home', icon: 'home' },
  { label: 'Settings', value: 'settings', icon: 'settings' },
  { label: 'Profile', value: 'profile', icon: 'person' }
]

return (
    <Tab
        value={selectedTab}
        onChange={setSelectedTab}
        options={tabs}
    />
)
```

#### With Icons Only
```tsx
const [selectedTab, setSelectedTab] = useState<string | undefined>(undefined)

return (
    <Tab
        value={selectedTab}
        onChange={setSelectedTab}
        options={['home', 'settings', 'person']}
        isIcon
    />
)
```

#### Get Full Object
```tsx
interface TabOption {
  label: string
  value: string
  icon: string
  route: string
}

const [selectedTab, setSelectedTab] = useState<TabOption | undefined>(undefined)
const tabs: TabOption[] = [
  { label: 'Home', value: 'home', icon: 'home', route: '/home' },
  { label: 'About', value: 'about', icon: 'info', route: '/about' }
]

// Access full object: selectedTab?.route

return (
    <Tab
        value={selectedTab}
        onChange={setSelectedTab}
        options={tabs}
        getObject
    />
)
```

---

### Props API

#### value
Controls the currently selected tab. The value type depends on the `getObject` prop:
- When `getObject={false}` (default): Returns the value from the selected option (string or `valueKey` property)
- When `getObject={true}`: Returns the entire option object

Type: `any` (default: `undefined`)

#### onChange
Callback triggered when the selected tab changes. Type: `(value: any) => void`

#### options
Array of tab options. Can be:
- **String array**: `["Option 1", "Option 2", "Option 3"]`
- **Object array**: Objects with `label`, `value`, and optionally `icon` properties
  ```typescript
  [
    { label: "Tab 1", value: "tab1", icon: "home" },
    { label: "Tab 2", value: "tab2", icon: "settings" }
  ]
  ```

Type: `any[]` (required)

#### labelKey
Property name used for displaying option labels when using object arrays. Type: `string` (default: `"label"`)

**Example**: If your objects use `title` instead of `label`, set `labelKey="title"`.

#### valueKey
Property name used for option values when using object arrays. This is used for:
- Comparing which tab is active
- Returning the value when `getObject={false}`

Type: `string` (default: `"value"`)

**Example**: If your objects use `id` instead of `value`, set `valueKey="id"`.

#### isIcon
When `true`, displays Material Design Icons instead of text labels.
- For string arrays: Uses the string as the icon name
- For object arrays: Uses the `icon` property if available, otherwise falls back to the label

Type: `boolean` (default: `false`)

#### notCard
Removes the card wrapper styling (background and padding) for a plain appearance. Useful for inline tab navigation without the elevated card look.

Type: `boolean` (default: `false`)

#### getObject
When `true`, the `value` prop will store the entire option object instead of just its value. Useful when you need access to all properties of the selected option (label, value, icon, etc.).

Type: `boolean` (default: `false`)

**Example**:
```tsx
{/* getObject={false} (default) */}
<Tab value={selected} onChange={setSelected} options={tabs} />
{/* selected = "tab1" (just the value) */}

{/* getObject={true} */}
<Tab value={selected} onChange={setSelected} options={tabs} getObject />
{/* selected = { label: "Tab 1", value: "tab1", icon: "home" } */}
```

---

### Events API

#### onChange
Triggered when the selected tab changes. The emitted value depends on the `getObject` prop:
- When `getObject={false}` (default): Emits the value (string or `valueKey` property)
- When `getObject={true}`: Emits the entire option object

### Slots API

#### children
Content rendered below the tab buttons. Use this to display tab panels or any content associated with the selected tab.

Type: `React.ReactNode`

**Important Notes:**
- **Flexible data structures**: Supports both string arrays and object arrays with configurable property names via `labelKey` and `valueKey`
- **Icon support**:
  - Use `isIcon` for icon-only tabs with string arrays
  - Include `icon` property in object arrays to display icons alongside labels
  - Icons use Material Design Icons by name
- **Value handling**:
  - By default, `value` stores only the value (string or `valueKey` property)
  - Use `getObject={true}` to store the entire option object for access to all properties
- **Styling variants**:
  - Card styling (default) provides elevated appearance with background and shadow
  - Plain styling (`notCard`) offers minimal visual styling for inline use
- **Active state**: The active tab is determined by comparing values using `valueKey` (for objects) or direct comparison (for strings)
- **Responsive design**: Tab widths adapt based on content and container size
- **User experience**: Smooth hover effects and active state transitions with visual feedback
- **Accessibility**: Uses semantic button elements for keyboard navigation support