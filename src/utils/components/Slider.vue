<script setup lang="ts">
import { getPosition } from "../index";
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { blendColors } from "../index";

const props = withDefaults(
  defineProps<{
    modelValue?: number[];
    size?: "small" | "medium" | "large";
    max?: number;
    unit?: string;
    color?: string;
    showTooltip?: boolean;
    disabled?: boolean;
    vertical?: boolean;
    fillColors?: any[];
    isRange?: boolean;
    steps?: any[];
    neutralBackground?: boolean;
  }>(),
  {
    modelValue: undefined,
    max: 0,
    size: "small",
    unit: "",
    color: "",
    showTooltip: false,
    disabled: false,
    vertical: false,
    isRange: false,
    steps: undefined,
    neutralBackground: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: number[]];
}>();

onMounted(() => {
  window.addEventListener("mousemove", updateCursor);
  window.addEventListener("mouseup", stopDragging);
  window.addEventListener("touchmove", updateCursorTouch);
  window.addEventListener("touhend", stopDragging);
  calculateCursor();
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", updateCursor);
  window.removeEventListener("mouseup", stopDragging);
  window.removeEventListener("touchmove", updateCursorTouch);
  window.removeEventListener("touhend", stopDragging);
});

watch(
  () => props.modelValue,
  () => {
    percentage.value = getPercentage();
    calculateCursor();
    const model = getModel();
    if (
      !props.modelValue ||
      !props.modelValue.length ||
      model.find(
        (value, index) => props.modelValue && value != props.modelValue[index]
      ) != undefined
    )
      emit("update:modelValue", model);
  }
);

watch(
  () => props.vertical,
  () => {
    percentage.value = getPercentage();
    setTimeout(() => {
      calculateCursor();
    }, 200);
  }
);

watch(
  () => props.size,
  () => {
    percentage.value = getPercentage();
    setTimeout(() => {
      calculateCursor();
    }, 100);
  }
);

watch(
  () => props.max,
  () => {
    emit("update:modelValue", getModel());
  }
);

const percentage = ref(getPercentage());
const isDraggingSlider = ref([false]);
if (props.isRange) isDraggingSlider.value.push(false);
const cursors = ref<HTMLSpanElement[]>();
const fillBar = ref<HTMLDivElement>();
const slider = ref<HTMLDivElement>();
const tooltipText = computed((): string => {
  const min = Math.min(...percentage.value);
  const max = Math.max(...percentage.value);

  if (!props.isRange) return getTooltipText(max);
  return `${getTooltipText(min)} - ${getTooltipText(max)}`;
});

const background = computed((): string => {
  if (props.neutralBackground || !props.color) return "";
  return blendColors(props.color);
});

function getStepStyle(step: number) {
  const value = step * 100 + "%";
  const style: any = {};

  if (props.vertical) style.bottom = value;
  else style.left = value;

  if (props.disabled) return style;

  if (props.fillColors && props.fillColors.length) {
    const min = Math.min(...percentage.value);
    const total = Math.max(...percentage.value) - min;
    const stepPercentage = step - min;
    const colorRange = total / props.fillColors.length;

    const background = props.fillColors.find((_: any, i: number) => {
      const startRange = i * colorRange;
      const endRange = (i + 1) * colorRange;

      if (
        stepPercentage >= startRange &&
        stepPercentage <= endRange &&
        props.fillColors
      ) {
        return props.fillColors[i];
      }
    });

    style.background = background;
  } else if (props.color && betweenPercentage(step)) {
    style.background = props.color;
  }

  return style;
}

function betweenPercentage(value: number) {
  const max = Math.max(...percentage.value);
  const min = Math.min(...percentage.value);
  const actualValue = value;
  return actualValue <= max && actualValue >= min;
}

function getTooltipText(value: number) {
  const unit = props.max ? props.unit : props.unit || "%";
  return `${((props.max || 100) * value).toFixed(1) + unit}`;
}

function stopDragging() {
  isDraggingSlider.value = isDraggingSlider.value.map(() => false);
}

function getPercentage() {
  const percentage = [0, 0];
  props.modelValue?.forEach((value: any, index: number) => {
    let actualValue = value;
    if (props.max) actualValue = value / props.max;
    percentage[index] = getStepPercentage(
      Math.min(1, Math.max(0, actualValue))
    );
  });
  return percentage;
}

function getModel() {
  const model = [0, 0];
  percentage.value.forEach((value: number, index: number) => {
    let actualValue = value;
    if (props.max) actualValue = value * props.max;
    model[index] = actualValue;
  });
  return model;
}

function getStepPercentage(value: number) {
  if (!props.steps || !props.steps.length) return value;

  return props.steps.reduce((prev: number, curr: number) => {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
  });
}

function startDraggingTouch(event: TouchEvent) {
  startDragging(event.touches[0]);
}

function startDraggingSliderTouch(event: TouchEvent, index: number) {
  startDraggingSlider(event.touches[0], index);
}

function updateCursorTouch(event: TouchEvent) {
  updateCursor(event.touches[0]);
}

function startDragging(event: any) {
  if (!slider.value || !cursors.value) return;

  let closestCursorIndex = 0;
  const cursorPosition = getPosition(event, cursors.value[0], slider.value);
  let closestDistance = Infinity;
  if (props.vertical) {
    const cursorPositionY = cursorPosition.y;

    cursors.value.forEach((cursor, index) => {
      const cursorBottom = Number(cursor.style.bottom.replace("px", ""));
      const distance = Math.abs(cursorBottom - cursorPositionY);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCursorIndex = index;
      }
    });
  } else {
    const cursorPositionX = cursorPosition.x;

    cursors.value.forEach((cursor, index) => {
      const cursorLeft = cursor.offsetLeft;
      const distance = Math.abs(cursorLeft - cursorPositionX);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCursorIndex = index;
      }
    });
  }

  startDraggingSlider(event, closestCursorIndex);
}

function startDraggingSlider(event: any, index: number) {
  if (!cursors.value) return;
  stopDragging();
  isDraggingSlider.value[index] = true;
  updateSlider(
    event,
    cursors.value[index],
    isDraggingSlider.value[index],
    index
  );
}

function updateCursor(event: any) {
  isDraggingSlider.value.forEach((value: any, index: number) => {
    if (!cursors.value) return;
    updateSlider(event, cursors.value[index], value, index);
  });
}

function updateSlider(
  event: any,
  cursor: HTMLSpanElement | undefined,
  isDragging: boolean,
  index = 0
) {
  if (!isDragging || !cursor || !slider.value) return;

  let percentageValue = 0;
  const clamped = getPosition(event, cursor, slider.value);
  if (props.vertical) {
    const clampedBottom = clamped.y;
    const height = slider.value.clientHeight - (cursor.clientHeight / 2);
    percentageValue = getStepPercentage(clampedBottom / height);
  } else {
    const clampedLeft = clamped.x;
    const width = slider.value.clientWidth - (cursor.clientWidth / 2);
    percentageValue = getStepPercentage(clampedLeft / width);
  }
  changeFillBarPosition();
  percentage.value[index] = percentageValue;
  emit("update:modelValue", getModel());
}

function calculateCursor() {
  cursors.value?.forEach((cursor, index) => {
    if (!cursor || !slider.value) return;

    if (props.vertical) {
      const height = slider.value.clientHeight;
      const bottom = Math.min(
        height,
        Math.max(0, height * percentage.value[index])
      );
      const borderWidth =
        Number(cursor.style.borderWidth.replace("px", "")) / 2;
      cursor.style.bottom =
        bottom - cursor.clientHeight / 3 - borderWidth + "px";

      cursor.style.left = "50%";
    } else {
      const width = slider.value.clientWidth;
      const left = Math.min(
        width,
        Math.max(0, width * percentage.value[index])
      );
      const borderWidth =
        Number(
          (cursor as any)
            ?.computedStyleMap()
            .get("--border-width-xs")
            .toString()
            .replace("px", "")
        ) / 2;
      cursor.style.left = left - cursor.clientWidth / 3 - borderWidth + "px";

      cursor.style.bottom = "50%";
    }
  });
  changeFillBarPosition();
}

function changeFillBarPosition() {
  if (!fillBar.value || !cursors.value || !slider.value) return;

  if (props.vertical) {
    const sliderHeight = slider.value.clientHeight;
    const cursorHeights = cursors.value.map(
      (cursor) => cursor.clientHeight / 2
    );
    const tops = cursors.value.map((cursor) => cursor.offsetTop);

    const bottoms = tops.map(
      (top, index) => sliderHeight - top - cursorHeights[index]
    );

    const minBottom = props.isRange ? Math.min(...bottoms) : 0;
    const maxBottom = Math.max(0, Math.max(...bottoms));

    fillBar.value.style.bottom = minBottom + "px";
    fillBar.value.style.height = Math.abs(maxBottom - minBottom) + "px";

    fillBar.value.style.left = "50%";
    fillBar.value.style.width = "100%";
  } else {
    const lefts = cursors.value.map(
      (cursor) => cursor.offsetLeft + cursor.clientWidth / 3
    );

    const minLeft = props.isRange ? Math.min(...lefts) : 0;
    const maxLeft = Math.max(...lefts);

    fillBar.value.style.left = minLeft + "px";
    fillBar.value.style.width =
      Math.abs(maxLeft - minLeft) + cursors.value[0].clientWidth / 6 + "px";

    fillBar.value.style.bottom = "50%";
    fillBar.value.style.height = "100%";
  }
}
</script>

<template>
  <div
    ref="slider"
    class="slider"
    :class="[
      size,
      {
        disabled: disabled,
        vertical: vertical,
        horizontal: !vertical,
        'step-slider': steps && steps.length,
        'neutral-bg': neutralBackground,
        'is-custom-color': !!background
      },
    ]"
    :aria-disabled="disabled"
    @mousedown="startDragging"
    @touchstart="startDraggingTouch"
  >
    <span
      v-for="(value, index) in isDraggingSlider"
      ref="cursors"
      :key="index"
      class="cursor cursor-slider relative select-none"
      :class="{ grabbing: value, colored: color }"
      @mousedown="(e: MouseEvent) => startDraggingSlider(e, index)"
      @touchstart="(e: TouchEvent) => startDraggingSliderTouch(e, index)"
    >
      <Tooltip
        :label-value="tooltipText"
        :position="vertical ? 'right' : 'top'"
        class="cursor-tooltip select-none"
        v-if="showTooltip"
      />
    </span>
    <div
      ref="fillBar"
      class="fill-bar"
      :class="{
        'flex-col-reverse': vertical,
        'have-fill-colors': fillColors && fillColors.length,
        colored: color && !(fillColors && fillColors.length) && !disabled,
      }"
    >
      <div
        v-for="color in fillColors"
        class="w-full h-full"
        :style="{ background: color }"
      />
    </div>
    <div
      v-for="step in steps"
      :key="step"
      class="step"
      :class="{ active: betweenPercentage(step) }"
      :style="getStepStyle(step)"
    />
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.slider {
  @apply flex justify-start w-full rounded-base relative bg-primary-surface-highlight h-[.5em];

  .cursor,
  .cursor-tooltip {
    @apply w-[1.25em] h-[1.25em];
  }

  .step {
    @apply h-[1.875em] w-[0.3125em];
  }
}

.slider.vertical {
  @apply w-[.5em];

  .step {
    @apply w-[1.875em] h-[0.3125em];
  }
}

.slider.disabled {
  @apply pointer-events-none bg-neutral-surface-disabled;

  .cursor {
    @apply border-neutral-interaction-disabled;
  }

  .fill-bar {
    @apply bg-neutral-interaction-disabled;
  }

  .step.active {
    @apply bg-neutral-interaction-disabled;
  }
}

.slider.small {
  @apply text-xs;
}

.slider.medium {
  @apply text-base;
}

.slider.large {
  @apply text-xl;
}

.slider.horizontal {
  .cursor {
    @apply top-[50%] translate-y-[-50%];
    @apply left-[-50px];
  }

  .fill-bar {
    @apply top-[50%] translate-y-[-50%] h-full;
    @apply left-0;
  }
}

.slider.vertical {
  @apply h-full items-end;

  .cursor {
    @apply left-[50%] translate-x-[-50%];
    @apply bottom-0;
  }

  .fill-bar {
    @apply left-[50%] translate-x-[-50%] w-full;
    @apply bottom-0;
  }
}

.slider.step-slider {
  @apply rounded-none;

  .fill-bar {
    @apply rounded-none;
  }
}

.step {
  @apply absolute bg-primary-surface-highlight rounded-base;
}

.step.active {
  @apply bg-primary-interaction-default;
}

.horizontal .step {
  @apply bottom-[50%] translate-y-[50%];
}

.vertical .step {
  @apply left-[50%] translate-x-[-50%];
}

.cursor {
  @apply cursor-grab border-xs absolute z-[1] border-primary-interaction-default bg-neutral-surface-default rounded-full;
}

.cursor.grabbing {
  @apply cursor-grabbing;
}

.cursor.colored {
  border-color: v-bind(color);
}

.fill-bar {
  @apply flex bg-primary-interaction-default rounded-base absolute overflow-hidden;
}

.fill-bar.colored {
  background: v-bind(color);
}

.fill-bar.have-fill-colors {
  @apply bg-transparent;
}

.neutral-bg:not(.disabled),
.neutral-bg:not(.disabled) .step {
  @apply bg-neutral-surface-disabled;
}

.neutral-bg.is-custom-color:not(.disabled),
.neutral-bg.is-custom-color:not(.disabled) .step {
  background: v-bind(background);
}
</style>
