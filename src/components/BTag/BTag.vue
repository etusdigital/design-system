<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    labelValue?: string;
    text?: string;
    color?:
      | "primary"
      | "informative"
      | "success"
      | "warning"
      | "danger"
      | "neutral";
    size?: "small" | "medium" | "large";
    type?: "default" | "secondary" | "heavy";
    loading?: boolean;
    closeable?: boolean;
    icon?: string;
    isAppendedIcon?: boolean;
  }>(),
  {
    labelValue: "",
    text: "",
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

const prependIcon = computed(() => {
  if (!props.isAppendedIcon) return props.icon;
  return "";
});

const appendedIcon = computed(() => {
  if (props.closeable) return "close";
  else if (props.isAppendedIcon) return props.icon;
  return "";
});
</script>

<template>
  <div :class="[color, type, size]" class="b-tag">
    <BSpinner v-if="loading" class="colored" />
    <template v-else>
      <BIcon class="colored" :name="prependIcon" v-if="prependIcon" />
      <p class="colored font-semibold whitespace-nowrap truncate">
        <slot>{{ labelValue || text }}</slot>
      </p>
      <BIcon
        class="colored"
        :class="{ 'cursor-pointer': closeable }"
        :name="appendedIcon"
        v-if="appendedIcon"
        @click="closeable && emit('close')"
      />
    </template>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.b-tag {
  @apply flex items-center justify-center gap-xxs overflow-hidden relative text-center w-fit h-fit rounded-full border-xxs;
}

.small {
  @apply text-xs py-xxs px-sm;

  .b-icon {
    @apply text-lg;
  }
}

.medium {
  @apply text-sm py-xs px-base;

  .b-icon {
    @apply text-base;
  }
}

.large {
  @apply text-lg py-sm px-lg;

  .b-icon {
    @apply text-2xl;
  }
}

.primary {
  @apply bg-primary-surface-highlight border-primary-default;

  .percentage {
    @apply bg-primary-surface-highlight;
  }

  .colored {
    @apply text-primary-foreground-high;
  }
}

.info {
  @apply bg-informative-surface-highlight border-informative-default;

  .colored {
    @apply text-informative-foreground-high;
  }
}

.success {
  @apply bg-success-surface-highlight border-success-default;

  .colored {
    @apply text-success-foreground-high;
  }
}

.warning {
  @apply bg-warning-surface-highlight border-warning-default;

  .colored {
    @apply text-warning-foreground-high;
  }
}

.danger {
  @apply bg-danger-surface-highlight border-danger-default;

  .colored {
    @apply text-danger-foreground-high;
  }
}

.neutral {
  @apply bg-neutral-surface-highlight border-neutral-default;

  .colored {
    @apply text-neutral-foreground-low;
  }
}

*.secondary {
  @apply bg-transparent;
}

.secondary.primary {
  @apply text-primary-foreground-low;
}

.secondary.info {
  @apply text-informative-foreground-low
}

.secondary.success {
  @apply text-success-foreground-low;
}

.secondary.warning {
  @apply text-warning-foreground-low;
}

.secondary.danger {
  @apply text-danger-foreground-low;
}

.secondary.neutral {
  @apply text-neutral-foreground-low;
}

*.heavy .colored {
  @apply text-white;
}

.heavy.primary {
  @apply text-neutral-foreground-negative bg-primary-interaction-default border-primary-interaction-default;
}

.heavy.info {
  @apply text-neutral-foreground-negative bg-informative-interaction-default border-informative-interaction-default;
}

.heavy.success {
  @apply text-neutral-foreground-negative bg-success-interaction-default border-success-interaction-default;
}

.heavy.warning {
  @apply text-neutral-foreground-negative bg-warning-interaction-default border-warning-interaction-default;
}

.heavy.danger {
  @apply text-neutral-foreground-negative bg-danger-interaction-default border-danger-interaction-default;
}

.heavy.neutral {
  @apply text-neutral-foreground-negative bg-neutral-interaction-default border-neutral-interaction-default;
}
</style>
