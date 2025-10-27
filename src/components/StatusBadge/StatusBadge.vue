<script setup lang="ts">
withDefaults(
  defineProps<{
    labelValue?: string;
    color?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
    size?: "small" | "medium" | "large";
    type?: "default" | "secondary" | "heavy";
    loading?: boolean;
    closeable?: boolean;
    icon?: string;
    isAppendedIcon?: boolean;
  }>(),
  {
    labelValue: "",
    color: "primary",
    size: "medium",
    type: "default",
    loading: false,
    icon: "",
    closeable: false,
    isAppendedIcon: false,
  }
);

const emit = defineEmits(["close"]);
</script>

<template>
  <Badge
    :class="[color]"
    class="status-badge"
    :label-value="labelValue"
    :type="type"
    :size="size"
    :loading="loading"
    :closeable="closeable"
    :icon="icon"
    :is-appended-icon="isAppendedIcon"
    @close="emit('close')"
  >
    <template #default>
      <slot>{{ labelValue }}</slot>
    </template>
  </Badge>
</template>

<style scoped>
@reference "../../assets/main.css";

.status-badge.primary {
  @apply bg-primary-surface-highlight border-primary-default text-primary-foreground-high;
}

.status-badge.info {
  @apply bg-informative-surface-highlight border-informative-default text-informative-foreground-high;
}

.status-badge.success {
  @apply bg-success-surface-highlight border-success-default text-success-foreground-high;
}

.status-badge.warning {
  @apply bg-warning-surface-highlight border-warning-default text-warning-foreground-high;
}

.status-badge.danger {
  @apply bg-danger-surface-highlight border-danger-default text-danger-foreground-high;
}

.status-badge.neutral {
  @apply bg-neutral-surface-highlight border-neutral-default text-neutral-foreground-low;
}

.status-badge.secondary {
  @apply bg-transparent;
}

.status-badge.secondary.primary {
  @apply text-primary-foreground-low;
}

.status-badge.secondary.info {
  @apply text-informative-foreground-low;
}

.status-badge.secondary.success {
  @apply text-success-foreground-low;
}

.status-badge.secondary.warning {
  @apply text-warning-foreground-low;
}

.status-badge.secondary.danger {
  @apply text-danger-foreground-low;
}

.status-badge.secondary.neutral {
  @apply text-neutral-foreground-low;
}

.status-badge.heavy .colored {
  @apply text-white;
}

.status-badge.heavy.primary {
  @apply text-neutral-foreground-negative bg-primary-interaction-default border-primary-interaction-default;
}

.status-badge.heavy.info {
  @apply text-neutral-foreground-negative bg-informative-interaction-default border-informative-interaction-default;
}

.status-badge.heavy.success {
  @apply text-neutral-foreground-negative bg-success-interaction-default border-success-interaction-default;
}

.status-badge.heavy.warning {
  @apply text-neutral-foreground-negative bg-warning-interaction-default border-warning-interaction-default;
}

.status-badge.heavy.danger {
  @apply text-neutral-foreground-negative bg-danger-interaction-default border-danger-interaction-default;
}

.status-badge.heavy.neutral {
  @apply text-neutral-foreground-negative bg-neutral-interaction-default border-neutral-interaction-default;
}
</style>