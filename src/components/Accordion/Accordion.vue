<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  onUpdated,
  computed,
  watch,
} from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    duration?: number;
    noShadow?: boolean;
  }>(),
  {
    modelValue: false,
    duration: 150,
    noShadow: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const model = ref(props.modelValue);
let card = ref<HTMLDivElement>();
let content = ref<HTMLDivElement>();
const resizeObserver = new ResizeObserver(resize);
const mutationObserver = new MutationObserver(resize);

watch(
  () => props.modelValue,
  () => {
    model.value = props.modelValue;
    resize();
  }
);

const parsedDuration = computed((): number => {
  try {
    const rounded = Math.floor(props.duration);

    return Math.min(Math.max(rounded, 150), 1000);
  } catch (error) {
    return 150;
  }
});

onMounted(() => {
  if (card.value) resizeObserver.observe(card.value, { box: "border-box" });
  if (content.value) {
    resizeObserver.observe(content.value, { box: "border-box" });
    mutationObserver.observe(content.value, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-max-height"],
    });
  }
});

onUpdated(resize);

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect();
  if (mutationObserver) mutationObserver.disconnect();
});

async function resize() {
  if (!content.value) return;

  content.value.style.maxHeight = model.value
    ? `${content.value.scrollHeight}px`
    : "0px";

  if (content.value.style.maxHeight != content.value.dataset.maxHeight)
    content.value.dataset.maxHeight = content.value.style.maxHeight;
}

function changeModel() {
  model.value = !model.value;
  emit("update:modelValue", model.value);
}
</script>

<template>
  <Card class="accordion" :class="{ 'no-shadow': noShadow }">
    <div class="w-full flex flex-col gap-sm" ref="card">
      <div
        class="flex items-center w-full text-base cursor-pointer"
        :class="[$slots.header ? 'justify-between' : 'justify-end']"
        @click="changeModel"
      >
        <slot name="header" />
        <div
          class="flex items-center w-fit h-fit transition-transform ease-in-out duration-300 text-2xl"
          :class="{ 'rotate-180': model }"
        >
          <Icon
            name="expand_more"
            size="xl"
            class="text-neutral-interaction-default font-bold"
          />
        </div>
      </div>
      <Transition name="content">
        <div
          ref="content"
          v-show="model"
          class="transition-[max-height] ease-in-out"
          :class="{ 'overflow-hidden': !model }"
          :style="{ 'transition-duration': `${parsedDuration}ms` }"
          data-max-height="0px"
        >
          <slot />
        </div>
      </Transition>
    </div>
  </Card>
</template>

<style scoped>
@reference "../../assets/main.css";

.accordion {
  @apply px-base py-xs w-full shadow-none transition-colors duration-300 hover:bg-neutral-surface-hover;
}

.no-shadow {
  @apply border-none;
}
</style>
