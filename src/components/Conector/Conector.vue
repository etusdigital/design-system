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

<style scoped>
@reference "../../assets/main.css";

.conector.hor > :slotted(*):not(:last-child) {
  @apply relative mr-base after:content-[''] after:border-t-xxs after:w-base after:border-neutral-default after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-base;
}

.conector.hor > :slotted(*) {
  @apply relative z-10;
}

.conector.vert > :slotted(*):not(:last-child) {
  @apply relative mb-base after:content-[''] after:h-base after:border-r-xxs after:border-neutral-default after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-base;
}
</style>
