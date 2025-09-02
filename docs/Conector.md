# Name: Conector
## Component Overview

**Purpose**: A visual connector component that adds connecting lines between grouped elements to show relationships and flow.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```vue
<template>
    <Conector :vertical="true" class="items-center">
        <Card class="p-base">
            <Conector>
                <Input label-value="label" placeholder="Type here" />
                <Select
                    label-value="label"
                    :items="[
                        { label: 'Option 1', something: 0, selected: false },
                        { label: 'Option 2', something: 1, selected: true },
                        { label: 'Option 3', something: 2, selected: false },
                        { label: 'Option 4', something: 3, selected: false },
                        { label: 'Option 5', something: 4, selected: false },
                    ]"
                >
                    Select
                </Select>
                <Input label-value="label" placeholder="Type here" />
            </Conector>
        </Card>
        <RoundButton variant="success" />
    </Conector>
</template>
```

---

### Props API

#### vertical
Arranges connector lines vertically instead of horizontally. Type: `boolean` (default: `false`)

---

### Events API

Conector does not emit any custom events. It's a simple conector component that passes through standard DOM events from the underlying div element.

---

### Slots API

#### #default
Contains the elements to be connected with visual lines.

```vue
<template>
    <Conector>
        Slot: default
    </Conector>
</template>
```

**Important Notes:**
- Visual connectors appear automatically between all child elements except the last one
- Use the `vertical` prop to change connector orientation
- Elements are styled with relative positioning to accommodate connector lines
- Connectors use neutral border styling for subtle visual connection