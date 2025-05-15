<script setup lang="ts">
import { useOptionalModel } from "#composables";
import { type BContainerModelExtra } from "./BContainerModelExtra.types";

type BSelectExpandedExtra = {
  source: BContainerModelExtra["source"] | "value-selected";
};

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    items: any;
    icon?: string;
    expanded?: boolean;
    searchable?: boolean;
    disabled?: boolean;
    secondary?: boolean;
  }>(),
  {
    modelValue: "",
    expanded: undefined,
    searchable: false,
    disabled: false,
    secondary: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any, extra: { index: number }];
  "update:expanded": [value: boolean, extra: BSelectExpandedExtra];
}>();

const [model] = useOptionalModel<string>(
  props,
  "modelValue",
  emit,
  ""
);
const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(
  props,
  "expanded",
  emit,
  false
);
</script>

<template>
  <BIcon
    v-if="icon"
    :name="icon"
    class="icon shrink-0"
    :class="{ 'text-primary-interaction-default': expandedModel }"
  />
  <span
    class="flex items-center gap-xs truncate"
    :class="{ 'text-neutral-foreground-low': !items }"
  >
    <div
      v-if="searchable && !disabled"
      class="flex items-center text-neutral-foreground-high"
      :class="{ secondary, hidden: !expandedModel }"
      @click="setExpandedModel(true, { source: 'click' })"
    >
      <BIcon name="search" class="icon" />
      <div v-show="!model.length" class="relative pointer-events-none">
        <span
          class="search-placeholder"
        >
          <slot name="searchText">Search</slot>
        </span>
      </div>
      <input
        v-model="model"
        type="search"
        class="search"
        :disabled="disabled"
      />
    </div>
    <slot name="status" />
  </span>
</template>
<style scoped>
.search {
  @apply h-full w-full pl-xxs p-0 m-0 border-none shadow-none outline-none text-xs;
}

.secondary .search {
  @apply bg-primary-interaction-default text-neutral-foreground-negative placeholder:text-neutral-foreground-negative;
}

.icon.b-icon {
  @apply text-neutral-interaction-default text-base;
}

.secondary .icon.b-icon {
  @apply text-neutral-foreground-negative;
}

.search-placeholder {
  @apply absolute text-neutral-foreground-low left-[.5em] top-[50%] translate-y-[-50%];
}

.secondary .search-placeholder {
  @apply text-neutral-foreground-negative;
}
</style>
