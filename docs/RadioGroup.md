# Name: RadioGroup
## Component Overview

**Purpose**: A container component for grouping related input components with synchronized selection state, commonly used for radio button groups and visual component grouping.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```vue
<template>
    <RadioGroup v-model="selectedValue">
        <radio group-value="1">First Option</radio>
        <radio group-value="2">Second Option</radio>
        <radio group-value="3">Third Option</radio>
    </RadioGroup>
    
    <p>Selected: {{ selectedValue }}</p>
</template>

<script setup lang="ts">

const selectedValue = ref('option1')
</script>
```

---

### Props API

#### v-model
Controls the currently selected component's group-value. Type: `any` (default: `null`)

#### vertical
Arranges grouped components vertically instead of horizontally. Type: `boolean` (default: `false`)

#### disabled
Disables all grouped components. Type: `boolean` (default: `false`)

---

### Events API

#### @update:model-value
Triggered when the selection changes within the group.

### Slots API

#### #default
Contains the grouped components. Each component should have a `group-value` prop for selection tracking.

```vue
<template>
    <RadioGroup v-model="selected">
        <radio group-value="value1">Label 1</radio>
        <radio group-value="value2">Label 2</radio>
    </RadioGroup>
</template>
```

---

### Component Behavior Inside RadioGroup

The RadioGroup component handles different child components in specific ways, applying appropriate styling and behavior based on the component type.

#### Radio Components
Radio buttons maintain individual spacing and selection states.

**Behavior**: Individual spacing with margins between items

```vue
<template>
    <RadioGroup v-model="radioValue">
        <radio group-value="1">First</radio>
        <radio group-value="2">Second</radio>
        <radio group-value="3">Third</radio>
    </RadioGroup>
</template>

<script setup lang="ts">

const radioValue = ref('1')
</script>
```

#### Toggle Components
Toggles are styled as connected button groups with shared borders.

**Behavior**: Connected borders, rounded corners only on first/last items

```vue
<template>
    <RadioGroup v-model="buttonValue">
        <radio-button group-value="1">First</radio-button>
        <radio-button group-value="2">Second</radio-button>
        <radio-button group-value="3">Third</radio-button>
    </RadioGroup>
</template>

<script setup lang="ts">

const buttonValue = ref(null)
</script>
```

#### Custom Radio Divs
Radio buttons can be styled as custom divs using the `is-div` prop for visual variety.

**Behavior**: Custom visual elements with small spacing

```vue
<template>
    <RadioGroup v-model="divValue">
        <radio-button group-value="1" is-div>
            <div class="border-2 h-5 w-5" />
        </radio-button>
        <radio-button group-value="2" is-div>
            <div class="border-2 h-5 w-5 rounded" />
        </radio-button>
        <radio-button group-value="3" is-div>
            <div class="border-2 h-5 w-5 rounded-full" />
        </radio-button>
    </RadioGroup>
</template>

<script setup lang="ts">

const divValue = ref(null)
</script>
```

#### Visual Connectors
Non-radio components are connected with visual lines to show relationships.

**Behavior**: Visual connectors with lines showing flow relationships

```vue
<template>
    <RadioGroup v-model="connectorValue" vertical class="items-center">
        <card class="p-4">
            <input label="Name" placeholder="Type here" />
        </card>
        <round-button variant="positive" />
    </RadioGroup>
</template>

<script setup lang="ts">

const connectorValue = ref(null)
</script>
```

**Important Notes:**
- Model value synchronization works bidirectionally between RadioGroup and child components
- Each grouped component needs a unique `group-value` prop for proper selection tracking
- Visual connectors appear automatically for non-radio components
- Use `vertical` prop to change layout orientation for all grouped components