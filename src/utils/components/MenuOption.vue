<script setup lang="ts">
import Option from "./Option.vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    icon?: string;
    selected?: boolean;
    disabled?: boolean;
  }>(),
  {
    label: "",
    icon: "",
    selected: false,
    disabled: false,
  }
);
</script>

<template>
  <Option :selected="selected" :disabled="disabled" class="b-menu-option">
    <BIcon v-if="icon" :name="icon" />
    <span v-if="label" class="flex-1">{{ label }}</span>
    <slot />
  </Option>
</template>

<style scoped>
@reference "../../assets/main.css";

.b-menu-option {
  @apply flex items-center gap-xs p-sm rounded-base;
}

.b-icon {
  @apply text-xl;
}
</style>
