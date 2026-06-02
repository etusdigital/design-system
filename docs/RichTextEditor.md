# Name: Rich Text Editor
## Component Overview

**Purpose**: A comprehensive WYSIWYG (What You See Is What You Get) rich text editor component with a full-featured toolbar for creating and editing formatted content.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [editorContent, setEditorContent] = useState('')

<RichTextEditor
    value={editorContent}
    onChange={setEditorContent}
    labelValue="Content"
    placeholder="Start typing..."
/>
```

---

### Toolbar Features

The Rich Text Editor includes a comprehensive toolbar with the following features:

#### History Actions
- **Undo** - Reverses the previous action
- **Redo** - Restores actions undone by Undo

#### Text Formatting
- **Bold** - Makes text bold
- **Italic** - Makes text italic
- **Underline** - Underlines text
- **Strikethrough** - Strikes through text

#### Headings
- **Normal Text** - Default paragraph format
- **H1** - Large heading
- **H2** - Medium heading
- **H3** - Small heading

#### Colors
- **Text Color** - Changes text color
- **Background Color** - Changes text background

#### Lists
- **Bulleted List** - Creates unordered lists
- **Numbered List** - Creates ordered lists

#### Alignment
- **Left Align** - Left-aligns text
- **Center Align** - Center-aligns text
- **Right Align** - Right-aligns text

#### Insert Elements
- **Link** - Creates hyperlinks
- **Image** - Inserts images
- **Block Quote** - Creates quoted text blocks

#### Clear Formatting
- **Clear Format** - Removes all formatting from selected text

---

### Props API

#### value
Controls the HTML content of the editor. Type: `string` (default: `""`)

#### onChange
Callback fired when the editor content changes. Type: `(html: string) => void`

#### labelValue
The label displayed above the editor. Type: `string` (default: `""`)

#### placeholder
Placeholder text shown when editor is empty. Type: `string`

#### hasError
Activates error styling mode. Type: `boolean` (default: `false`)

#### errorMessage
Error message to display when in error state. Type: `string` (default: `""`)

#### infoMessage
Informational message displayed with tooltip. Type: `string` (default: `""`)

#### disabled
Disables editor interaction. Type: `boolean` (default: `false`)

#### required
Marks the field as required. Type: `boolean` (default: `false`)

#### tooltipMinWidth
Minimum width for tooltip displaying info messages. Type: `string` (default: `"none"`)

#### noBorder
Removes border from editor. Type: `boolean` (default: `false`)

#### minHeight
Minimum height of editor content area. Type: `string` (default: `"200px"`)

#### maxHeight
Maximum height of editor content area. Type: `string` (default: `"400px"`)

---

### Children API

#### undoLabel
Custom label for the Undo button tooltip. Pass via `undoLabel` prop.

#### redoLabel
Custom label for the Redo button tooltip. Pass via `redoLabel` prop.

#### fontSizeLabel
Custom label for the Font Size selector tooltip. Pass via `fontSizeLabel` prop.

#### boldLabel
Custom label for the Bold button tooltip. Pass via `boldLabel` prop.

#### italicLabel
Custom label for the Italic button tooltip. Pass via `italicLabel` prop.

#### underlineLabel
Custom label for the Underline button tooltip. Pass via `underlineLabel` prop.

#### strikeThroughLabel
Custom label for the Strikethrough button tooltip. Pass via `strikeThroughLabel` prop.

#### colorLabel
Custom label for the Text Color picker tooltip. Pass via `colorLabel` prop.

#### backgroundColorLabel
Custom label for the Background Color picker tooltip. Pass via `backgroundColorLabel` prop.

#### insertUnorderedListLabel
Custom label for the Bulleted List button tooltip. Pass via `insertUnorderedListLabel` prop.

#### insertOrderedListLabel
Custom label for the Numbered List button tooltip. Pass via `insertOrderedListLabel` prop.

#### leftLabel
Custom label for the Left Align button tooltip. Pass via `leftLabel` prop.

#### centerLabel
Custom label for the Center Align button tooltip. Pass via `centerLabel` prop.

#### rightLabel
Custom label for the Right Align button tooltip. Pass via `rightLabel` prop.

#### justifyLabel
Custom label for the Justify button tooltip. Pass via `justifyLabel` prop.

#### linkLabel
Custom label for the Insert Link button tooltip. Pass via `linkLabel` prop.

#### imageLabel
Custom label for the Insert Image button tooltip. Pass via `imageLabel` prop.

#### blockquoteLabel
Custom label for the Blockquote button tooltip. Pass via `blockquoteLabel` prop.

#### removeFormatLabel
Custom label for the Remove Formatting button tooltip. Pass via `removeFormatLabel` prop.

#### addLabel
Custom label for the "Add" button in color picker. Pass via `addLabel` prop.

#### cancelLabel
Custom label for the "Cancel" button in color picker. Pass via `cancelLabel` prop.

---

### Events API

#### onChange
Triggered when the editor content changes. Receives the HTML content string.

#### onFocus
Triggered when the editor gains focus.

#### onBlur
Triggered when the editor loses focus.

**Important Notes:**
- Content is stored as HTML and can be styled with inline styles
- All formatting is preserved when saving/loading content
- Built-in accessibility features and keyboard shortcuts
- Responsive design works on all screen sizes
- Color picker supports custom color palettes
- Toolbar buttons show active state when formatting is applied
- Content area scrolls when exceeding max height
- Based on native browser contentEditable with execCommand API