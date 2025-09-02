<script setup lang="ts">
import Group from "../../utils/components/Group.vue";
import Toggle from "../Toggle/Toggle.vue";
import { isObject } from "../../utils";
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    vertical?: boolean;
    disabled?: boolean;
    items: any[];
    type?: "default" | "secondary";
    labelKey?: string;
    valueKey?: string;
    getObject?: boolean;
  }>(),
  {
    modelValue: null,
    vertical: false,
    disabled: false,
    type: "default",
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
    const object = props.items.find((item: any) => getValue(item) === value);
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
    class="toggle-group"
    @update:model-value="setModel"
  >
    <Toggle
      v-for="item in items"
      :key="getValue(item)"
      :group-value="getValue(item)"
      :disabled="getDisabled(item)"
      :type="type"
    >
      {{ getLabel(item) }}
    </Toggle>
  </Group>
</template>

<style scoped>
@reference "../../assets/main.css";

.toggle-group.hor .toggle.default {
  @apply border-r-none first:rounded-l-sm last:rounded-r-sm last:border-r-xxs;
}

.toggle-group.vert .toggle.default {
  @apply border-b-none first:rounded-t-sm last:rounded-b-sm last:border-b-xxs;
}

.toggle-group.hor .toggle.secondary {
  @apply ml-xs first:ml-none;
}

.toggle-group.vert .toggle.secondary {
  @apply mt-xs first:mt-none;
}
</style>
