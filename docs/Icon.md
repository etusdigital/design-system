# Name: Icon
## Component Overview

**Purpose**: A wrapper component for Google Material Symbols that provides easy icon usage in React applications.

**Import**: Automatic - no need to import any DS components

**Icon** is just a wrapper for **Google Material Symbols**. The usage is identical to the original since parameters fall through to the **Google Material Symbols** component. You can check its usage [here](https://fonts.google.com/icons?icon.style=Rounded).

### Basic Usage

```tsx
<Icon name="sentiment_satisfied" />
```

---

### Props API

#### name
The icon name from Google Material Symbols. Type: `string` (required)

Find available icons at [Google Material Symbols](https://fonts.google.com/icons?icon.style=Rounded).

```tsx
<Icon name="favorite" className="favorite-icon" />
```

#### filled
Changes the icon style to filled version. Type: `boolean` (default: `false`)

#### onClick
Allow icon to have the click action

**Important Notes:**
- Icons are based on Google Material Symbols with rounded style
- Use meaningful icon names that match the action or content they represent
- Icons automatically inherit text color from parent elements