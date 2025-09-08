<script setup lang="ts">
import { ref, watch } from "vue";
import { type Option as OptionType } from "#utils/types/DropOption";
import { isObject } from "../../utils";
import Option from "../../utils/components/Option.vue";

const props = withDefaults(
  defineProps<{
    modelValue: any;
    option: OptionType;
    labelKey: string;
    valueKey: string;
    multiple: boolean;
    selected?: boolean;
    disabled?: boolean;
    getObject?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelKey: "label",
    valueKey: "value",
    multiple: false,
    selected: false,
    disabled: false,
    getObject: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any, add: boolean];
}>();

const expanded = ref(false);
const isSelected = ref<boolean | null>(getSelected());

watch(
  () => props.modelValue,
  () => {
    isSelected.value = getSelected();
    console.log("isSelected", props.option, isSelected.value);
  },
  { immediate: true, deep: true }
);

function getLabel(option: OptionType) {
  return isObject(option) ? (option as any)[props.labelKey] : option;
}

function getIcon(option: OptionType) {
  return isObject(option) ? (option as any).icon : "";
}

function getValue(option: OptionType) {
  return isObject(option) ? (option as any)[props.valueKey] : option;
}

function getModel() {
  if (props.getObject && props.multiple)
    return (
      props.modelValue.find((x: any) => getValue(x) === getValue(props.option))
        ?.options || []
    );
  else return props.modelValue;
}

function getSelected(option: OptionType = props.option, model = props.modelValue) {
  if (Array.isArray(model)) {
    const selected = model.find((x: any) => getValue(x) === getValue(option));

    if (
      ((selected && props.getObject) || (!props.getObject && !selected)) &&
      option.options?.length
    ) {
      if (props.getObject && selected) model = selected.options;

      const isChildSelected = option.options?.filter(
        (x: any) => getSelected(x, model) === true
      );

      console.log("isChildSelected", option, isChildSelected.length, model);
      if (isChildSelected.length == option.options?.length) return true;
      else if (
        option.options?.filter((x: any) => getSelected(x, model) != false).length
      )
        return null;
    }

    return !!selected;
  } else return getValue(model) === getValue(option);
}

function setModel(value: OptionType, add = !isSelected.value && !props.selected) {
  emit("update:modelValue", value, add);
}
</script>

<template>
  <div class="tree-option">
    <div>
      <Option
        :aria-selected="isSelected"
        :disabled="option.disabled || disabled"
        :no-hover="multiple"
        :selected="!multiple && !!isSelected"
        class="tree-option-container"
        :tabindex="-1"
      >
        <Icon
          v-if="option.options && option.options.length"
          name="keyboard_arrow_right"
          :class="{ 'rotate-90': expanded }"
          class="transition-transform"
          @click="expanded = !expanded"
        />
        <div
          class="tree-option-option"
          :class="{ 'pointer-events-none': option.disabled || disabled }"
          tabindex="0"
          @click="setModel(option)"
          @keyup.space="setModel(option)"
          @keyup.enter="setModel(option)"
        >
          <Checkbox
            v-if="multiple"
            :model-value="selected || isSelected"
            allow-indeterminate
            :disabled="option.disabled || disabled"
            class="pointer-events-none"
            @update:model-value="setModel(option)"
          />
          <Icon v-if="getIcon(option)" :name="getIcon(option)" />
          {{ getLabel(option) }}
        </div>
      </Option>
    </div>
    <Transition name="expand">
      <div
        v-if="expanded && option.options && option.options.length"
        class="tree-sub-options"
      >
        <Option
          v-for="subOption in option.options"
          :key="subOption.value"
          :model-value="getModel()"
          :option="subOption"
          :selected="!!isSelected || selected"
          :label-key="labelKey"
          :value-key="valueKey"
          :multiple="multiple"
          :disabled="disabled"
          :get-object="getObject"
          @update:model-value="setModel"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.tree-option {
  @apply flex flex-col;
}

.tree-option-container {
  @apply flex items-center gap-xxs py-xxs px-xs;
}

.tree-option-option {
  @apply flex items-center gap-xxs flex-1;
}

.tree-option-option .icon {
  @apply text-xl;
}

.tree-sub-options {
  @apply pl-xl;
}

.expand-enter-active,
.expand-leave-active {
  @apply transition-all duration-300 overflow-hidden;
}

.expand-enter-from,
.expand-leave-to {
  @apply opacity-0 translate-y-[-10px] max-h-0;
}

.expand-enter-to,
.expand-leave-from {
  @apply opacity-100 max-h-screen;
}
</style>
