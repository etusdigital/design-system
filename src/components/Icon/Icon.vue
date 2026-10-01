<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    name?: string;
    filled?: boolean;
    tabindex?: string | number
  }>(),
  {
    filled: false,
    tabindex: -1
  }
);

const interactive = computed(() => Number(props.tabindex) >= 0);
</script>

<template>
  <span
    class="material-symbols-rounded icon"
    :tabindex="tabindex"
    :class="{ filled: filled }"
    :role="interactive ? 'button' : undefined"
    :aria-hidden="interactive ? undefined : 'true'"
  >
    {{ name }}
  </span>
</template>

<style>
.material-symbols-rounded {
  font-family: "Material Symbols Rounded";
  user-select: none;
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}

.material-symbols-rounded.filled {
  font-variation-settings:
    "FILL" 1,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
}
</style>
