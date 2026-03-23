# Name: Tree
## Component Overview

**Purpose**: A hierarchical tree component with advanced selection management, supporting both single and multiple selection modes with intelligent parent-child relationship handling.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx
const [selectedOptions, setSelectedOptions] = useState([])

return (
    <Tree
        value={selectedOptions}
        onChange={setSelectedOptions}
        options={treeData}
        multiple={true}
        getObject={true}
    />
)
```

---

### Props API

#### value
The selected value(s). Can be a single option or array for multiple selection. Type: `any` (default: `undefined`)

#### onChange
Callback triggered when selection changes. Type: `(value: any) => void`

#### options
The tree data structure with nested options. Type: `array` (required)

#### labelKey
The property name to use for displaying option labels. Type: `string` (default: `"label"`)

#### valueKey
The property name to use for option values/identification. Type: `string` (default: `"value"`)

#### getObject
When true, returns complete objects in selection. When false, returns only values. Type: `boolean` (default: `false`)

#### multiple
Enables multiple option selection with hierarchical relationship management. Type: `boolean` (default: `false`)

#### disabled
Disables the entire tree component. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when selection changes. Payload contains the selected option(s) based on `getObject` and `multiple` settings.

### Children API

The Tree component uses compound sub-components:

```tsx
<Tree value={selected} onChange={setSelected} options={treeData}>
    <Tree.Node />
</Tree>
```

### Selection Behavior

#### Hierarchical Selection (getObject: true, multiple: true)
- Selecting a child automatically adds all parent ancestors to maintain hierarchy
- Removing a child removes parents only if they have no other selected children
- Selected options maintain the tree structure with only selected branches

#### Example Selection Flow:
1. Select "Settings.txt" → Model contains: `[{Documents: {options: [{Work: {options: ["Settings.txt"]}}]}}]`
2. Select "Code.js" → Adds to Work's options
3. Remove "Settings.txt" → Removes only that option, keeps Work with Code.js
4. Remove "Code.js" → Removes Work, and Documents if no other children

**Important Notes:**
- Intelligent parent-child relationship management prevents orphaned selections
- Hierarchical structure is preserved in the model when `getObject: true`
- Memory efficient with automatic cleanup of empty parent nodes
- Deep cloning prevents mutation of original data structure
- Supports unlimited nesting levels with recursive selection handling