<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { useOptionalModel } from "#composables";
import { type ContainerModelExtra } from "../types/ContainerModelExtra";

type SelectExpandedExtra = {
  source: ContainerModelExtra["source"] | "value-selected";
};

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    options: any;
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
  "update:expanded": [value: boolean, extra: SelectExpandedExtra];
}>();

const [model] = useOptionalModel<string>(props, "modelValue", emit, "");
const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(
  props,
  "expanded",
  emit,
  false
);
const inputRef = ref<HTMLInputElement>();

watch(
  () => props.expanded,
  () => {
    if (!props.expanded || props.disabled) return;

    nextTick(() => {
      if (!inputRef.value) return;

      inputRef.value.focus();
    });
  }
);
</script>

<template>
  <Icon
    v-if="icon"
    :name="icon"
    class="icon shrink-0"
    :class="{ 'text-primary-interaction-default': expandedModel }"
  />
  <span
    class="flex items-center gap-xs truncate leading-xxs"
    :class="{ 'text-neutral-foreground-low': !options }"
  >
    <div
      v-if="searchable && !disabled"
      class="flex items-center text-neutral-foreground-high"
      :class="{ secondary, hidden: !expandedModel }"
      @click="setExpandedModel(true, { source: 'click' })"
    >
      <Icon name="search" class="icon" />
      <div v-show="!model.length" class="relative pointer-events-none">
        <span class="search-placeholder">
          <slot name="search-label">Search</slot>
        </span>
      </div>
      <input
        v-model="model"
        ref="inputRef"
        type="search"
        class="search"
        :disabled="disabled"
      />
    </div>
    <slot name="status" />
  </span>
</template>
<style scoped>
@reference "../../assets/main.css";

.search {
  @apply h-full w-full pl-xxs p-0 m-0 border-none shadow-none outline-none text-xs;
}

.secondary .search {
  @apply bg-primary-interaction-default text-neutral-foreground-negative placeholder:text-neutral-foreground-negative;
}

.icon.icon {
  @apply text-neutral-interaction-default text-base;
}

.secondary .icon.icon {
  @apply text-neutral-foreground-negative;
}

.search-placeholder {
  @apply absolute text-neutral-foreground-low left-[.5em] top-[50%] translate-y-[-50%];
}

.secondary .search-placeholder {
  @apply text-neutral-foreground-negative;
}
</style>
