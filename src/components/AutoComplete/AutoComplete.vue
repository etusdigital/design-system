<script setup lang="ts">
import { ref, computed } from "vue";
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

const filteredOptions = computed(() => {
  if (!model.value) return props.options ?? [];
  return (props.options ?? []).filter((option: any) =>
    option
      .toString()
      .toLowerCase()
      .includes(model.value?.toString().toLowerCase())
  );
});

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
</script>

<template>
  <div class="auto-complete" @click="onRootClick">
    <SelectContainer
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
            :key="index"
            :aria-selected="model == option"
            :selected="model == option"
            :class="{ 'font-bold': model == option }"
            @click="selectOption(option)"
            @keyup.space="selectOption(option)"
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
