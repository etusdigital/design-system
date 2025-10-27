<script setup lang="ts">
import { computed, watch } from "vue";
import { useOptionalModel } from "#composables";

const props = withDefaults(
  defineProps<{
    modelValue: number;
    length?: number;
  }>(),
  {
    modelValue: 1,
    length: 1,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const [model, setModel] = useOptionalModel<any>(
  props,
  "modelValue",
  emit,
  null
);

const pageLength = computed(() => props.length < 1 ? 1 : props.length);

const options = computed(() => {
  const result: any = [];
  if (props.length < 1) return result;

  for (let i = 1; i <= props.length; i++) {
    if (
      i === 1 ||
      i === props.length ||
      (model.value === 1 && i < 4) ||
      (model.value === props.length && i >= props.length - 2) ||
      model.value - 1 === i ||
      model.value + 1 === i ||
      model.value === i
    ) {
      result.push(i);
    } else if (
      (model.value <= props.length - 2 &&
        i === props.length - 1 &&
        props.length > 3) ||
      (model.value > 2 && props.length > 3 && i === 2)
    ) {
      result.push(-1);
    }
  }

  for (let i = 0; i < 2; i++) {
    const index =
      i == 0
        ? result.findIndex((value: number) => value == -1)
        : result.findLastIndex((value: number) => value == -1);
    if (result[index + 1] - result[index - 1] == 2)
      result[index] = result[index - 1] + 1;
  }

  return result;
});

watch(() => props.length, () => {
  setModel(1);
});

watch(() => props.modelValue, (newVal) => {
  if (newVal < 1) setModel(1);
  else if (newVal > props.length) setModel(props.length);
});

function changePage(page: number) {
  setModel(page, { page });
}
</script>

<template>
  <div class="pagination">
    <div
      class="page-icon"
      :class="{ disabled: model == 1 }"
      @click="changePage(model - 1)"
    >
      <Icon name="chevron_left" />
    </div>
    <div class="flex">
      <div v-for="page in options" :key="page" class="flex gap-xs">
        <div class="dots" v-if="page == -1">...</div>
        <div
          v-else
          @click="changePage(page as number)"
          class="page-number"
          :class="{ active: page === model }"
        >
          {{ page }}
        </div>
      </div>
    </div>
    <div
      class="page-icon"
      :class="{ disabled: model == pageLength }"
      @click="changePage(model + 1)"
    >
      <Icon name="chevron_right" />
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.pagination {
  @apply flex items-center gap-xs;
}

.page-icon {
  @apply h-fit w-fit flex items-center cursor-pointer text-neutral-interaction-default text-2xl hover:text-primary-interaction-hover;
}

.disabled {
  @apply pointer-events-none text-neutral-interaction-disabled;
}

.page-number {
  @apply text-sm border-xxs border-transparent flex items-end rounded-sm font-medium cursor-pointer px-base py-xs text-neutral-interaction-default hover:text-primary-interaction-hover;
}

.page-number.active {
  @apply border-neutral-default text-neutral-foreground-high hover:text-neutral-foreground-high;
}

.dots {
  @apply flex items-end py-xxs;
}
</style>
