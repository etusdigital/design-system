<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import { isObject } from "../../utils";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    items: any[];
    labelKey?: string;
    valueKey?: string;
    isIcon?: boolean;
    notCard?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelKey: 'label',
    valueKey: 'value',
    isIcon: false,
    notCard: false,
  }
);

const model = ref(props.modelValue);

onBeforeMount(() => {
  if (!model.value) changeTab(props.items[0]);
});

watch(
  () => props.modelValue,
  (cur) => (model.value = cur)
);

const emit =
  defineEmits<{
    "update:modelValue": [value: any];
  }>();

function changeTab(item: any) {
  model.value = item;
  emit("update:modelValue", item);
}

function getValue(item: any): string {
  return isObject(item) ? item[props.valueKey] : item;
}
</script>

<template>
  <div
    class="b-tab"
    :class="{
      'bg-neutral-surface-highlight': !notCard,
    }"
  >
    <div class="flex font-bold text-sm gap-xs w-fit">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="default-tab"
        :class="{ 'active-tab': getValue(model) == getValue(item) }"
        @click="changeTab(item)"
      >
        <div v-if="isObject(item)" class="flex items-center gap-xxs">
          <BIcon :name="item.icon" v-if="item.icon" />
          <h5 v-if="item[labelKey]">{{ item[labelKey] }}</h5>
        </div>
        <div v-else>
          <BIcon :name="item" v-if="isIcon" />
          <h5 v-else>{{ item }}</h5>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.b-tab {
  @apply p-xxs rounded-sm;
}

.default-tab {
  @apply text-neutral-interaction-default py-xs px-xs rounded-xs hover:text-primary-interaction-hover;

  .b-icon {
    @apply text-lg;
  }
}

.active-tab {
  @apply shadow-neutral-selected text-neutral-foreground-high bg-neutral-surface-default hover:text-neutral-foreground-high;
}
</style>
