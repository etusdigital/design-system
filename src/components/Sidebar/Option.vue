<script setup lang="ts">
import Option from "../../utils/components/Option.vue";

withDefaults(
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
  <Option :selected="selected" :disabled="disabled" class="sidebar-option">
    <Icon v-if="icon" :name="icon" />
    <span v-if="label" class="flex-1">{{ label }}</span>
    <slot />
  </Option>
</template>

<style scoped>
@reference "../../assets/main.css";

.sidebar-option {
  @apply flex items-center gap-xs p-sm rounded-base;
}

.icon {
  @apply text-xl leading-[unset];
}
</style>
