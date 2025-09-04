<script setup lang="ts">
import Group from "../../utils/components/Group.vue";
import { isObject } from "../../utils";
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    vertical?: boolean;
    disabled?: boolean;
    options: any[];
    labelKey?: string;
    valueKey?: string;
    getObject?: boolean;
  }>(),
  {
    modelValue: null,
    vertical: false,
    disabled: false,
    labelKey: "label",
    valueKey: "value",
    getObject: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

const model = ref<any>(getValue(props.modelValue));

watch(
  () => props.modelValue,
  (newVal) => {
    model.value = getValue(newVal);
  }
);

function setModel(value: string) {
  let valueToEmit = value;
  model.value = value;
  if (props.getObject) {
    const object = props.options.find((item: any) => getValue(item) === value);
    valueToEmit = object;
  }
  emit("update:modelValue", valueToEmit);
}

function getLabel(value: any): string {
  return isObject(value) ? value[props.labelKey] : value;
}

function getValue(item: any): any {
  return isObject(item) ? item[props.valueKey] : item;
}

function getDisabled(item: any): boolean {
  return isObject(item) ? item.disabled : false;
}
</script>

<template>
  <Group
    v-model="model"
    :vertical="vertical"
    :disabled="disabled"
    class="radio-group"
    @update:model-value="setModel"
  >
    <Radio
      v-for="item in options"
      :key="getValue(item)"
      :group-value="getValue(item)"
      :disabled="getDisabled(item)"
    >
      {{ getLabel(item) }}
    </Radio>
  </Group>
</template>

<style scoped>
@reference "../../assets/main.css";

.radio-group.hor .radio {
  @apply ml-sm first:ml-none;
}

.radio-group.vert .radio {
  @apply mt-sm first:mt-none;
}
</style>
