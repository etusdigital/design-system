<script setup lang="ts">
import Group from '../../utils/components/Group.vue';

const props = withDefaults(
  defineProps<{
    vertical?: boolean;
  }>(),
  {
    vertical: false,
  }
);
</script>

<template>
  <Group class="conector" :vertical="vertical">
    <slot />
  </Group>
</template>

<style>
@reference "../../assets/main.css";

.conector:not(.vert) {
  @apply items-center;
}

.conector:not(.vert) > *:not(:last-child) {
  @apply relative mr-base;
}

.conector:not(.vert) > *:not(.input, .select):not(:last-child)::after {
  @apply content-[''] w-base h-px bg-neutral-interaction-disabled absolute top-1/2 -translate-y-1/2 -right-base;
}

.conector:not(.vert) > .input:not(:last-child) > div:last-child::after, .conector:not(.vert) > .select:not(:last-child) > div > .label-container::after {
  @apply content-[''] w-base h-px bg-neutral-interaction-disabled absolute top-1/2 -translate-y-1/2 -right-base;
}

.conector:not(.vert) > .input:not(:last-child) > div:last-child, .conector:not(.vert) > .select:not(:last-child) > div > .label-container {
  @apply relative;
}

.conector:not(.vert) > * {
  @apply relative z-10;
}

.conector.vert > *:not(:last-child) {
  @apply relative mb-base;
}

.conector.vert > *:not(:last-child)::after {
  @apply content-[''] w-px h-base bg-neutral-interaction-disabled absolute left-1/2 -translate-x-1/2 -bottom-base;
}

</style>
