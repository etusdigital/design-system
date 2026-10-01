<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useOptionalModel } from "#composables";
import SelectContainer from "../../utils/components/SelectContainer.vue";
import Option from "@/utils/components/Option.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: number | string;
    expanded?: boolean;
    labelValue?: string;
    options?: number[] | string[];
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    required?: boolean;
    placeholder?: string;
    maxHeight?: string;
    minWidth?: string;
    ariaLabel?: string;
  }>(),
  {
    modelValue: undefined,
    expanded: false,
    labelValue: "",
    disabled: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    required: false,
    placeholder: "Search...",
    maxHeight: "40px",
    minWidth: "15em",
    ariaLabel: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: number | string];
  "update:expanded": [value: boolean];
}>();

const [model, setModel] = useOptionalModel<number | string>(
  props,
  "modelValue",
  emit,
  ""
);
const [expanded, setExpanded] = useOptionalModel<boolean>(
  props,
  "expanded",
  emit,
  false
);

// Track input focus so close attempts triggered by interacting with the input
// (the trigger lives outside the teleported card, so FloatCard would otherwise
// treat clicking/typing in it as an "outside" click) keep the dropdown open.
const focus = ref(false);
const selectedIndex = ref<number | null>(null);
const optionRefs = ref<HTMLElement[]>([]);

const filteredOptions = computed(() => {
  if (!model.value) return props.options ?? [];
  return (props.options ?? []).filter((option: any) =>
    option
      .toString()
      .toLowerCase()
      .includes(model.value?.toString().toLowerCase())
  );
});

watch(expanded, (value) => {
  if (!value) selectedIndex.value = null;
});

watch(model, () => {
  selectedIndex.value = null;
});

watch(
  selectedIndex,
  (index) => {
    if (index == null) return;
    optionRefs.value[index]?.focus();
  },
  { flush: "post" }
);

function handleExpanded(value: boolean, extra?: any) {
  if (extra?.source === "blur") setExpanded(value && focus.value);
  else if (focus.value) setExpanded(true);
  else setExpanded(value);
}

function handleFocus(value: boolean) {
  focus.value = value;
}

function onRootClick() {
  // Defer so it runs after FloatCard's own close handling; while the input is
  // focused this re-opens the card that an input click would otherwise close.
  setTimeout(() => handleExpanded(focus.value));
}

function selectOption(option: number | string) {
  if (props.disabled) return;
  setModel(option);
  setExpanded(false);
}

function onKeyDown(e: KeyboardEvent) {
  const last = filteredOptions.value.length - 1;
  if (last < 0) return;

  const hasSelection = selectedIndex.value != null;
  switch (e.key) {
    case "ArrowUp":
      e.preventDefault();
      if (!expanded.value) setExpanded(true);
      selectedIndex.value = hasSelection
        ? Math.max(selectedIndex.value! - 1, 0)
        : last;
      break;
    case "ArrowDown":
      e.preventDefault();
      if (!expanded.value) setExpanded(true);
      selectedIndex.value = hasSelection
        ? Math.min(selectedIndex.value! + 1, last)
        : 0;
      break;
  }
}

function onOptionKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case " ":
      e.preventDefault();
      break;
    case "Home":
      e.preventDefault();
      selectedIndex.value = 0;
      break;
    case "End":
      e.preventDefault();
      selectedIndex.value = filteredOptions.value.length - 1;
      break;
    default:
      onKeyDown(e);
  }
}
</script>

<template>
  <div class="auto-complete" @click="onRootClick">
    <SelectContainer
      :aria-label="ariaLabel"
      class="auto-complete-content"
      :model-value="expanded"
      :label-value="labelValue"
      :disabled="disabled"
      :is-error="isError"
      :error-message="errorMessage"
      :info-message="infoMessage"
      :required="required"
      :max-height="maxHeight"
      :min-width="minWidth"
      @keydown="onKeyDown"
      @update:model-value="handleExpanded"
    >
      <template #label>
        <Input
          v-model="model"
          :disabled="disabled"
          :is-error="isError"
          :info-message="infoMessage"
          :placeholder="placeholder"
          :min-width="minWidth"
          icon="unfold_more"
          append-icon
          @focus="handleFocus(true)"
          @blur="handleFocus(false)"
        />
      </template>

      <template #options>
        <template v-if="filteredOptions.length">
          <Option
            v-for="(option, index) in filteredOptions"
            :ref="(el: any) => (optionRefs[index] = el?.$el)"
            :key="index"
            :aria-selected="model == option"
            :selected="model == option"
            :class="{ 'font-bold': model == option }"
            @focus="selectedIndex = index"
            @click="selectOption(option)"
            @keydown="onOptionKeyDown"
            @keyup.enter.space="selectOption(option)"
          >
            <slot name="option" :option="option" :index="index">
              {{ option }}
            </slot>
          </Option>
        </template>
        <div v-else class="no-results">
          <slot name="no-options">No options match your search</slot>
        </div>
      </template>
    </SelectContainer>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.no-results {
  @apply text-xs italic text-neutral-foreground-low flex justify-center p-xs;
}
</style>
