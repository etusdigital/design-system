<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    items: any[];
    visible?: number;
    interval?: number;
    disabled?: boolean;
    circular?: boolean;
    vertical?: boolean;
  }>(),
  {
    modelValue: 0,
    visible: 1,
    disabled: false,
    circular: false,
    vertical: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const model = ref(props.modelValue);
const carouselContainer = ref<HTMLElement>();
const carouselItemsContainer = ref<HTMLElement>();
const contentStyle = ref<{ width?: string; height?: string }>({});
const transform = ref("-0px");

const maxIndex = computed(
  () => Math.ceil(props.items.length / props.visible) - 1
);

const itemSections = computed(() => {
  const sections = [];
  for (let i = 0; i < props.items.length; i += props.visible) {
    sections.push(props.items.slice(i, i + props.visible));
  }
  return sections;
});

const gap = computed(() => {
  return parseFloat(
    (carouselItemsContainer.value as any)
      ?.computedStyleMap()
      .get("--spacing-xs")
      .toString()
      .replace("px", "")
  );
});

watch(
  () => props.modelValue,
  () => {
    model.value = Math.min(props.modelValue, maxIndex.value);
    calculateContentStyle();
  }
);

watch(
  () => props.visible,
  () => {
    setModel(0);
  }
);

watch(
  () => props.items.length,
  () => {
    model.value = Math.min(model.value, maxIndex.value);
    calculateContentStyle();
  }
);

onMounted(() => {
  model.value = Math.min(props.modelValue, maxIndex.value);
  calculateContentStyle();
});

function setModel(value: number) {
  const clampedValue = Math.max(0, Math.min(value, maxIndex.value));
  model.value = clampedValue;
  calculateContentStyle();
  emit("update:modelValue", clampedValue);
}

function calculateContentStyle() {
  if (!carouselItemsContainer.value) {
    contentStyle.value = {};
    return;
  }

  const children = carouselItemsContainer.value.children;
  if (children.length === 0) {
    contentStyle.value = {};
    return;
  }

  let totalSize = 0;
  let totalTransform = 0;
  const initial = props.visible * model.value;

  for (
    let i = initial;
    i < Math.min(initial + props.visible, children.length);
    i++
  ) {
    const child = children[i] as HTMLElement;
    if (props.vertical) {
      totalSize = Math.max(totalSize, child.offsetHeight);
    } else {
      totalSize += child.offsetWidth + 1;
      if (i > initial) totalSize += gap.value;
    }
  }

  for (let i = 0; i < initial; i++) {
    const child = children[i] as HTMLElement;
    const rect = child.getBoundingClientRect();
    if (props.vertical) totalTransform += rect.height;
    else totalTransform += rect.width;

    if (initial > 0) totalTransform += gap.value;
  }

  transform.value = `-${Math.floor(totalTransform)}px`;

  contentStyle.value = {
    width: props.vertical ? "" : `${totalSize}px`,
    height: props.vertical ? `${totalSize}px` : "",
  };
}
</script>

<template>
  <div class="carousel" ref="carouselContainer">
    <div class="carousel-content" :class="{ vertical }">
      <div
        class="arrow-icon"
        :class="{ disabled: (model == 0 && !props.circular) || disabled }"
        @click="setModel(model - 1)"
      >
        <Icon :name="vertical ? 'keyboard_arrow_up' : 'chevron_left'" />
      </div>
      <div class="overflow-hidden shrink-0" :style="contentStyle">
                 <div
           class="carousel-items"
           ref="carouselItemsContainer"
           :style="{
             transform: `translate${vertical ? 'Y' : 'X'}(${transform})`,
           }"
         >
           <div 
             v-for="(section, sectionIndex) in itemSections" 
             :key="sectionIndex"
             class="flex gap-xs"
           >
             <slot
               name="item"
               v-for="(item, index) in section"
               :key="index"
               :item="item"
               :index="index"
             />
           </div>
         </div>
      </div>
      <div
        class="arrow-icon"
        :class="{
          disabled: (model >= maxIndex && !props.circular) || disabled,
        }"
        @click="setModel(model + 1)"
      >
        <Icon :name="vertical ? 'keyboard_arrow_down' : 'chevron_right'" />
      </div>
    </div>
    <div class="carousel-indicators">
      <div
        v-for="i in maxIndex + 1"
        :key="i"
        class="carousel-indicator"
        :class="{ active: model == i - 1, disabled }"
        @click="setModel(i - 1)"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.carousel {
  @apply flex flex-col gap-sm w-fit;
}

.arrow-icon {
  @apply h-fit w-fit flex items-center cursor-pointer text-neutral-interaction-default text-2xl hover:text-primary-interaction-hover;
}

.arrow-icon.disabled {
  @apply pointer-events-none text-neutral-interaction-disabled;
}

.carousel-content {
  @apply flex items-center justify-center gap-xs;
}

.carousel-content.vertical {
  @apply flex-col gap-sm;
}

.carousel-items {
  @apply flex items-center justify-center gap-xs transition-transform duration-300 ease-in-out w-max;
}

.vertical .carousel-items {
  @apply flex-col;
}

.carousel-indicators {
  @apply flex items-center justify-center gap-xs w-full;
}

.carousel-indicator {
  @apply w-2xl h-xs rounded-full bg-neutral-surface-disabled cursor-pointer;
}

.carousel-indicator.disabled {
  @apply bg-neutral-interaction-disabled pointer-events-none;
}

.carousel-indicator.active {
  @apply bg-primary-interaction-default;
}
</style>
