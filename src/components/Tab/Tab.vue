<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import { isObject } from "../../utils";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    options: any[];
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
  if (!model.value) changeTab(props.options[0]);
});

watch(
  () => props.modelValue,
  (cur) => (model.value = cur)
);

const emit =
  defineEmits<{
    "update:modelValue": [value: any];
  }>();

function changeTab(option: any) {
  model.value = option;
  emit("update:modelValue", option);
}

function getValue(option: any): string {
  return isObject(option) ? option[props.valueKey] : option;
}

function getLabel(option: any): string {
  return isObject(option) ? option[props.labelKey] : option;
}
</script>

<template>
  <div
    class="tab"
    :class="{
      'bg-neutral-surface-highlight': !notCard,
    }"
  >
    <div class="flex font-bold text-sm gap-xs w-fit">
      <button
        v-for="(option, index) in options"
        :key="index"
        class="default-tab"
        :class="{ 'active-tab': getValue(model) == getValue(option) }"
        @click="changeTab(option)"
      >
        <div v-if="isObject(option)" class="flex items-center gap-xxs">
          <Icon :name="option.icon" v-if="option.icon" />
          <h5 v-if="getLabel(option)">{{ getLabel(option) }}</h5>
        </div>
        <div v-else>
          <Icon :name="option" v-if="isIcon" />
          <h5 v-else>{{ option }}</h5>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.tab {
  @apply p-xxs rounded-sm;
}

.default-tab {
  @apply text-neutral-interaction-default py-xs px-xs rounded-xs hover:text-primary-interaction-hover;

  .icon {
    @apply text-lg;
  }
}

.active-tab {
  @apply shadow-neutral-selected text-neutral-foreground-high bg-neutral-surface-default hover:text-neutral-foreground-high;
}
</style>
