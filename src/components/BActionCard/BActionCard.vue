<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    icon?: string;
    color?: string;
    hideDrag?: boolean;
  }>(),
  {
    icon: "",
    color: "",
    hideDrag: false,
  }
);

const isDragging = ref(false);

const emit = defineEmits<{
  dragstart: [event: Event];
  dragging: [event: Event];
  dragend: [event: Event];
  delete: [];
}>();

onMounted(() => {
  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", end);
  window.addEventListener("touchmove", move);
  window.addEventListener("touhend", end);
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", move);
  window.removeEventListener("mouseup", end);
  window.removeEventListener("touchmove", move);
  window.removeEventListener("touhend", end);
});

function changeState(value: boolean, event: Event) {
  isDragging.value = value;
  if (value) emit("dragstart", event);
  else emit("dragend", event);
}

function start(event: Event) {
  changeState(true, getEvent(event));
}

function move(event: Event) {
  if (!isDragging.value) return;
  emit("dragging", getEvent(event));
}

function end(event: Event) {
  if (!isDragging.value) return;
  changeState(false, getEvent(event));
}

function getEvent(event: Event): Event {
  if (event instanceof TouchEvent) return event.touches[0] as unknown as Event;
  return event;
}
</script>

<template>
  <div class="b-action-card">
    <BIcon
      v-if="!hideDrag"
      class="icon cursor-grab"
      :class="{ 'cursor-grabbing': isDragging }"
      name="drag_indicator"
      @mousedown="start"
      @touchstart="start"
    />
    <BCard class="rounded-base [&>*]:px-xl">
      <header
        class="flex items-center gap-xs bg-primary-interaction-default text-neutral-foreground-negative rounded-base py-sm"
        :class="{ 'rounded-b-none': $slots.card }"
        :style="{ background: color }"
      >
        <BIcon :name="icon" v-if="icon" />
        <slot />
      </header>
      <div class="py-sm" v-if="$slots.card">
        <slot name="card" />
      </div>
    </BCard>
    <BIcon class="icon cursor-pointer" name="delete" @click="emit('delete')" />
  </div>
</template>

<style scoped>
.b-action-card {
  @apply flex items-center gap-xxs transition-transform;
}

.b-action-card:hover {
  @apply flex scale-105;

  .icon {
    @apply text-neutral-interaction-default;
  }
}

.icon {
  @apply flex items-center text-neutral-interaction-disabled;
}
</style>
