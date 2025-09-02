<script setup lang="ts">
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
  <div class="conector" :class="[vertical ? 'vert' : 'hor']">
    <slot />
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.conector {
  @apply inline-flex;
}

.conector.vert {
  @apply flex-col;
}

.conector.hor {
  @apply items-end;
}

.conector.hor > :slotted(*):not(:last-child) {
  @apply relative mr-base after:border-t-xxs after:w-base after:border-neutral-default after:absolute after:bottom-base after:-right-base;
}

.conector.hor > :slotted(*) {
  div {
    @apply z-[1];
  }
}

.conector.vert > :slotted(*):not(:last-child) {
  @apply relative m-base after:h-base after:border-r-xxs after:border-neutral-default after:absolute after:left-[50%] after:translate-x-[-50%] after:-bottom-base;
}
</style>
