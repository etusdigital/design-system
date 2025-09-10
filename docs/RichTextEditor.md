# Name: Rich Text Editor
## Component Overview

**Purpose**: A comprehensive WYSIWYG (What You See Is What You Get) rich text editor component with a full-featured toolbar for creating and editing formatted content.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```vue
<template>
    <RichTextEditor 
        v-model="editorContent"
        label-value="Content"
        placeholder="Start typing..."
    />
</template>

<script setup lang="ts">

const editorContent = ref('')
</script>
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

### Theme Variants

#### Compact Theme
Apply the `compact` prop to make the toolbar more compact:

#### No Border Theme
Apply the `no-border` prop to remove the editor's border:

---

### Props API

#### v-model
Controls the HTML content of the editor. Type: `string` (default: `""`)

#### label-value
The label displayed above the editor. Type: `string` (default: `""`)

#### placeholder
Placeholder text shown when editor is empty. Type: `string` (default: `"Digite seu texto..."`)

#### is-error
Activates error styling mode. Type: `boolean` (default: `false`)

#### error-message
Error message to display when in error state. Type: `string` (default: `""`)

#### info-message
Informational message displayed with tooltip. Type: `string` (default: `""`)

#### disabled
Disables editor interaction. Type: `boolean` (default: `false`)

#### required
Marks the field as required. Type: `boolean` (default: `false`)

#### compact
Uses compact toolbar style. Type: `boolean` (default: `false`)

#### no-border
Removes border from editor. Type: `boolean` (default: `false`)

#### min-height
Minimum height of editor content area. Type: `string` (default: `"200px"`)

#### max-height
Maximum height of editor content area. Type: `string` (default: `"400px"`)

---

### Events API

#### @update:model-value
Triggered when the editor content changes. Receives the HTML content string.

#### @focus
Triggered when the editor gains focus.

#### @blur
Triggered when the editor loses focus.

---

### Advanced Usage

```vue
<template>
    <RichTextEditor 
        v-model="content"
        label-value="Article Content"
        info-message="Use the toolbar to format your article"
        min-height="300px"
        max-height="600px"
        compact
        required
        @focus="onFocus"
        @blur="onBlur"
    />
</template>

<script setup lang="ts">

const content = ref('<h1>My Article</h1><p>Start writing...</p>')

const onFocus = () => console.log('Editor focused')
const onBlur = () => console.log('Editor blurred')
</script>
```

**Important Notes:**
- Content is stored as HTML and can be styled with inline styles
- All formatting is preserved when saving/loading content
- Built-in accessibility features and keyboard shortcuts
- Responsive design works on all screen sizes
- Color picker supports custom color palettes
- Toolbar buttons show active state when formatting is applied
- Content area scrolls when exceeding max height
- Based on native browser contentEditable with execCommand API