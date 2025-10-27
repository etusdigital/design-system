<script setup lang="ts">
import Group from '../../utils/components/Group.vue';

withDefaults(
  defineProps<{
    vertical?: boolean;
  }>(),
  {
    vertical: false,
  }
);
</script>

<template>
  <Group class="connector" :vertical="vertical">
    <slot />
  </Group>
</template>

<style>
@reference "../../assets/main.css";

.connector:not(.vert) {
  @apply items-center;
}

.connector:not(.vert) > *:not(:last-child) {
  @apply relative mr-base;
}

.connector:not(.vert) > *:not(.input, .select):not(:last-child)::after {
  @apply content-[''] w-base h-px bg-neutral-interaction-disabled absolute top-1/2 -translate-y-1/2 -right-base;
}

.connector:not(.vert) > .input:not(:last-child) > div:last-child::after, .connector:not(.vert) > .select:not(:last-child) > div > .label-container::after {
  @apply content-[''] w-base h-px bg-neutral-interaction-disabled absolute top-1/2 -translate-y-1/2 -right-base;
}

.connector:not(.vert) > .input:not(:last-child) > div:last-child, .connector:not(.vert) > .select:not(:last-child) > div > .label-container {
  @apply relative;
}

.connector:not(.vert) > * {
  @apply relative z-10;
}

.connector.vert > *:not(:last-child) {
  @apply relative mb-base;
}

.connector.vert > *:not(:last-child)::after {
  @apply content-[''] w-px h-base bg-neutral-interaction-disabled absolute left-1/2 -translate-x-1/2 -bottom-base;
}

</style>
