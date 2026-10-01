<script setup lang="ts">
import StatusBadge from "../StatusBadge/StatusBadge.vue";

withDefaults(
  defineProps<{
    labelValue?: string;
    color?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
    size?: "small" | "medium" | "large";
    loading?: boolean;
    closeable?: boolean;
    icon?: string;
    isAppendedIcon?: boolean;
  }>(),
  {
    labelValue: "",
    color: "primary",
    size: "small",
    loading: false,
    closeable: false,
    icon: "",
    isAppendedIcon: false,
  }
);

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <StatusBadge
    class="chip"
    :label-value="labelValue"
    :color="color"
    :size="size"
    :loading="loading"
    :closeable="closeable"
    :icon="icon"
    :is-appended-icon="isAppendedIcon"
    @close="emit('close')"
  >
    <template #default v-if="labelValue || $slots.default">
      <slot>{{ labelValue }}</slot>
    </template>
  </StatusBadge>
</template>

<style scoped>
@reference "../../assets/main.css";

.chip.status-badge {
  @apply py-2xxs px-xs border-none rounded-sm whitespace-nowrap;
}
</style>
