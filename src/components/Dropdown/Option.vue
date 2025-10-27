<script setup lang="ts">
import { ref } from "vue";
import { useOptionalModel } from "#composables";
import { type Option } from "#utils/types/DropOption";
import { isObject } from "../../utils";
import Options from "./Options.vue";

const props = withDefaults(
  defineProps<{
    modelValue: any;
    selected: boolean | undefined;
    option: Option;
    getObject: boolean;
  }>(),
  {
    modelValue: undefined,
    selected: false,
    getObject: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
  "update:selected": [value: boolean];
}>();

const [model] = useOptionalModel<any>(props, "modelValue", emit, "");
const [isSelected] = useOptionalModel<boolean>(props, "selected", emit, false);

const expanded = ref(false);

function selectOption(option: Option) {
  if (!props.option.options?.length) {
    model.value = props.getObject ? option : option.value;
    isSelected.value = true;
    emit("update:selected", true);
  } else {
    expanded.value = !expanded.value;
  }
}

function changeSelected(selected: boolean) {
  isSelected.value = selected;
  emit("update:selected", selected);
}

function handleBlur() {
  expanded.value = false;
}

function getValue(option: any): any {
  return isObject(option) ? option.value : option;
}
</script>

<template>
  <div class="relative" tabindex="0" @blur="handleBlur">
    <div
      class="option"
      :class="{
        selected: option.value === getValue(model) || isSelected,
        disabled: option.disabled,
      }"
      @click="selectOption(option)"
      @keydown.enter="selectOption(option)"
    >
      <div class="flex items-center gap-xs">
        <Icon :name="option.icon" class="icon" v-if="option.icon" />
        <p class="label">{{ option.label }}</p>
      </div>
      <Icon
        v-if="option.options && option.options.length"
        name="chevron_right"
        class="icon icon-small"
      />
    </div>
    <Options
      v-if="expanded && option.options && option.options.length"
      class="sub-options"
      :options="option.options"
    >
      <template #default="{ options }">
        <Option
          v-for="option in options"
          v-model="model"
          v-model:selected="option.selected"
          :option="option"
          :get-object="getObject"
          @update:model-value="selectOption"
          @update:selected="changeSelected"
        />
      </template>
    </Options>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.custom-card {
  :first-child .option {
    @apply rounded-b-none;
  }

  :last-child .option {
    @apply rounded-t-none;
  }
}

.option {
  @apply overflow-hidden text-neutral-interaction-default w-full flex items-center justify-between gap-xs px-base py-sm cursor-pointer
    hover:bg-primary-surface-hover hover:text-primary-interaction-hover;

  .label {
    @apply text-sm whitespace-nowrap;
  }

  .icon.icon {
    @apply text-xl flex items-center;
  }
}

.option.selected {
  @apply bg-primary-surface-default text-primary-interaction-selected;
}

.option.disabled {
  @apply pointer-events-none text-neutral-interaction-disabled;
}

.sub-options {
  @apply absolute top-0 z-[60] bg-neutral-surface-default rounded-base flex flex-col shadow-neutral-default max-h-[12em];
  left: calc(100% + var(--spacing-xs));
}

.option .icon.icon.icon-small {
  @apply text-base;
}
</style>
