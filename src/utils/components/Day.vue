<script setup lang="ts">
import { isRange } from "../index";

const props = withDefaults(
  defineProps<{
    modelValue: any[] | any[][];
    hovered?: Date;
    day?: Date | undefined;
    isCompare?: boolean;
    maxInit?: Date;
    maxEnd?: Date;
    index?: number;
    size?: number;
    position?: "start" | "middle" | "end";
  }>(),
  {
    isCompare: false,
    index: 0,
    size: 1,
    position: "middle",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: Date[]];
  "update:hovered": [value: Date | null];
  "select": [value: Date];
}>();

function isInRange(day: Date, index = 0, isSelected = false) {
  if (!props.modelValue || (index > 0 && (props.size == 1 || !props.isCompare)))
    return false;

  let dates = getDates(index);

  if (dates?.length > 1) {
    return isRange(dates[0], dates[1], day, isSelected);
  }

  return (
    isSelected &&
    dates[0]?.toISOString().substr(0, 10) === day?.toISOString().substr(0, 10)
  );
}

function getHovered(day: Date, index = 0) {
  if (
    !props.hovered ||
    !props.modelValue ||
    (index > 0 && !props.isCompare && props.size == 1) ||
    (props.size == 1 && !props.isCompare)
  )
    return false;

  let dates = getDates(index);

  return dates.length === 1 && isRange(dates[0], props.hovered, day);
}

function getDifference(day: Date, index = 0) {
  if (!props.modelValue || (!props.isCompare && props.size == 1)) return false;

  let dates = getDates(index);

  const parsedDay = day?.toISOString().substr(0, 10);
  let toCompare = props.hovered?.toISOString().substr(0, 10);
  let start = dates[0]?.toISOString().substr(0, 10);

  if (dates.length > 1) toCompare = dates[1]?.toISOString().substr(0, 10);
  if (start != parsedDay && parsedDay != toCompare) return;

  if (toCompare == parsedDay) toCompare = start;

  if (!toCompare || !parsedDay) return false;

  if (parsedDay < toCompare) return "is-bigger";
  else if (parsedDay > toCompare) return "is-smaller";
}

function getDisabled(day: Date) {
  if (props.maxInit)
    return (
      day.toISOString().substr(0, 10) <=
      props.maxInit.toISOString().substr(0, 10)
    );
  else if (props.maxEnd)
    return (
      day.toISOString().substr(0, 10) >=
      props.maxEnd.toISOString().substr(0, 10)
    );
  return false;
}

function getDates(index = 0) {
  if (!props.modelValue) return [];

  let dates = props.modelValue;
  if (props.isCompare && props.size > 1) dates = props.modelValue[index];

  return dates;
}
</script>

<template>
  <div
    v-if="day"
    class="day"
    :class="[
      {
        'range-primary': isInRange(day),
        'range-secondary': isInRange(day, 1),
        'selected-primary': isInRange(day, 0, true),
        'selected-secondary': isInRange(day, 1, true),
        disabled: getDisabled(day),
        'hovered-primary': getHovered(day),
        'hovered-secondary': getHovered(day, 1),
        'is-compare': isCompare || size > 1,
      },
      getDifference(day),
      getDifference(day, 1),
      position,
    ]"
    @mouseover="emit('update:hovered', day)"
    @mouseleave="emit('update:hovered', null)"
    @click="emit('select', day)"
  >
    <div
      v-if="
        ((hovered == day && getDates(0).length > 1) || isInRange(day, 1, true)) &&
        isInRange(day, 0, true) &&
        (getDates(1).length < 2 || isInRange(day, 1, true)) &&
        size > 1 &&
        isCompare
      "
      class="flex absolute w-full h-full"
    >
      <div class="half-day bg-primary-interaction-default" />
      <div
        class="half-day"
        :class="
          isInRange(day, 1, true)
            ? 'bg-primary-interaction-selected'
            : 'bg-primary-surface-hover'
        "
      />
    </div>
    <span class="relative z-[1]">
      {{ day.getDate() }}
    </span>
  </div>
</template>

<style scoped>
.day {
  @apply flex items-center justify-center rounded-xs cursor-pointer p-xs text-sm font-semibold text-neutral-interaction-default
  relative overflow-hidden hover:text-primary-interaction-hover hover:bg-primary-surface-hover;
}

.day.disabled {
  @apply text-neutral-interaction-disabled pointer-events-none;
}

.day.selected-primary {
  @apply bg-primary-interaction-default text-neutral-foreground-negative
    hover:bg-primary-interaction-default hover:text-neutral-foreground-negative;
}

.day.selected-secondary {
  @apply bg-primary-interaction-selected text-neutral-foreground-negative
    hover:bg-primary-interaction-selected hover:text-neutral-foreground-negative;
}

.hovered-primary,
.range-primary,
.hovered-secondary,
.range-secondary {
  @apply text-primary-foreground-high bg-primary-surface-default;
}

.day.is-compare.range-primary:not(.is-bigger):not(.is-smaller),
.day.is-compare.hovered-primary:not(.is-bigger):not(.is-smaller),
.is-compare.range-secondary:not(.is-bigger):not(.is-smaller),
.is-compare.hovered-secondary:not(.is-bigger):not(.is-smaller) {
  &.start {
    @apply rounded-r-none;
  }

  &.middle {
    @apply rounded-none;
  }

  &.end {
    @apply rounded-l-none;
  }
}

.is-bigger {
  @apply rounded-r-none;
}

.is-smaller {
  @apply rounded-l-none;
}

.half-day {
  @apply w-1/2 h-full;
}
</style>
