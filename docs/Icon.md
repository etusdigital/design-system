# Name: Icon
## Component Overview

**Purpose**: A wrapper component for Google Material Symbols that provides easy icon usage without custom element warnings in Vue applications.

**Import**: Automatic - no need to import any DS components

**Icon** is just a wrapper for **Google Material Symbols**. We do this to avoid the need to setup Vue to hide the custom element warning. The usage is identical to the original since parameters fall through to the **Google Material Symbols** component. You can check it's usage [here](https://fonts.google.com/icons?icon.style=Rounded).

### Basic Usage

```vue
<template>
    <Icon name="sentiment_satisfied" />
</template>
```

---

### Props API

#### name
The icon name from Google Material Symbols. Type: `string` (required)

Find available icons at [Google Material Symbols](https://fonts.google.com/icons?icon.style=Rounded).

#### filled
Changes the icon style to filled version. Type: `boolean` (default: `false`)

#### @click
Allow the icon to have a click action. Native events fall through to the underlying `<span>`.

```vue
<template>
    <Icon name="favorite" @click="onClick" />
</template>
```

**Important Notes:**
- Icons are based on Google Material Symbols with rounded style
- Use meaningful icon names that match the action or content they represent
- Icons automatically inherit text color from parent elements