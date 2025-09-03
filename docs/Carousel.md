# Name: Carousel
## Component Overview

**Purpose**: A carousel component that displays a collection of items with navigation controls and pagination indicators.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```vue
<template>
    <Carousel 
        v-model="currentIndex"
        :items="items"
        :visible="3"
        :vertical="false"
        :disabled="false"
        :circular="false"
    >
        <template #item="{ item, index }">
            <Card class="p-base">
                {{ item.label }}
            </Card>
        </template>
    </Carousel>
</template>
```

---

### Props API

#### modelValue
Current active index of the carousel. Type: `number` (default: `0`)

#### items
Array of items to display in the carousel. Type: `any[]` (required)

#### visible
Number of items visible at once. Type: `number` (default: `1`)

#### interval
Auto-play interval in milliseconds. Type: `number` (default: `3000`)

#### disabled
Disables navigation controls. Type: `boolean` (default: `false`)

#### circular
Enables circular navigation. Type: `boolean` (default: `false`)

#### vertical
Arranges carousel vertically. Type: `boolean` (default: `false`)

---

### Events API

#### @update:model-value
Emitted when the active index changes. Payload: `number`

---

### Slots API

#### #item
Slot for rendering individual carousel items.

```vue
<template>
    <Carousel :items="items">
        <template #item="{ item, index }">
            <div>{{ item.label }}</div>
        </template>
    </Carousel>
</template>
```

**Important Notes:**
- Use the `#item` slot to customize how each item is rendered
- Navigation arrows automatically adjust for vertical/horizontal orientation
- Pagination indicators show current position
- Supports both manual and automatic navigation