<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, onUpdated, ref } from "vue";
import BIcon from "../BIcon/BIcon.vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    message?: string;
    type?: "info" | "success" | "warning" | "danger" | "neutral";
    size?: "small" | "medium" | "large";
    icon?: string;
    expandable?: boolean;
    closable?: boolean;
    hideIcon?: boolean;
    iconPosition?: "start" | "center" | "end";
  }>(),
  {
    message: "",
    type: "info",
    size: "medium",
    icon: "",
    expandable: false,
    closable: false,
    hideIcon: false,
    iconPosition: "start",
  }
);

const emit = defineEmits<{
  close: [];
}>();

let isExpanded = ref(false);
let card = ref<HTMLDivElement>();
let content = ref<HTMLDivElement>();
const resizeObserver = new ResizeObserver(resize);
const typeIcon = computed(
  (): "info" | "content_copy" | "check_circle" | "error" => {
    switch (props.type) {
      case "info":
      case "neutral":
        return "info";
      case "warning":
      case "danger":
        return "error";
      case "success":
        return "check_circle";
      default:
        return "info";
    }
  }
);

onMounted(() => {
  if (card.value) resizeObserver.observe(card.value, { box: "border-box" });
  if (content.value)
    resizeObserver.observe(content.value, { box: "border-box" });
});

onUpdated(resize);

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect();
});

function resize() {
  if (!content.value || !card.value) return;

  const cardStyles = getComputedStyle(card.value);
  const paddingTop = parseInt(cardStyles.paddingTop);
  const paddingBottom = parseInt(cardStyles.paddingBottom);
  card.value.style.height = `${
    content.value.scrollHeight + paddingTop + paddingBottom
  }px`;
  content.value.style.width = "fit-content";
  const maxWidth = Math.max(content.value.offsetWidth);

  if (
    card.value &&
    (card.value.style.width || card.value.offsetWidth != maxWidth)
  ) {
    content.value.style.width = "100%";
  } else {
    content.value.style.width = `${maxWidth}px`;
  }
}
</script>

<template>
  <div
    ref="card"
    :class="[
      type,
      size,
      {
        'items-start': expandable,
        'items-center': !expandable || !isExpanded,
      },
    ]"
    class="b-alert"
  >
    <Transition name="content">
      <div
        ref="content"
        class="flex gap-sm transition-[max-height] duration-300"
        :class="[`items-${iconPosition}`]"
      >
        <div
          class="type-icon"
          v-if="!hideIcon"
        >
          <BIcon :name="icon || typeIcon" />
        </div>
        <div class="self-center flex-1">
          <slot>
            <div class="flex flex-col gap-xxs">
              <h6 v-if="title" class="title">{{ title }}</h6>
              <p class="message" v-if="!expandable || isExpanded">
                {{ message }}
              </p>
            </div>
          </slot>
        </div>
      </div>
    </Transition>
    <slot name="actions">
      <div class="type-icon cursor-pointer rotate-transition group">
        <div
          class="flex items-center transition-transform ease-in-out duration-300"
          :class="{ 'rotate-180': isExpanded }"
        >
          <BIcon
            name="expand_more"
            v-if="expandable"
            @click="isExpanded = !isExpanded"
          />
        </div>
        <BIcon name="close" v-if="closable" @click="emit('close')" />
      </div>
    </slot>
  </div>
</template>

<style scoped>
.b-alert {
  @apply flex justify-between p-base rounded-base border-xxs gap-base transition-[height] duration-100;

  .title {
    @apply font-bold;
  }
}

.b-alert.small {
  .title {
    @apply text-sm;
  }

  .message {
    @apply text-xs;
  }

  .type-icon .b-type-icon,
  .b-icon {
    @apply text-xl;
  }
}

.b-alert.medium {
  .title {
    @apply text-base;
  }

  .message {
    @apply text-sm;
  }

  .type-icon .b-type-icon,
  .b-icon {
    @apply text-2xl;
  }
}

.b-alert.large {
  .title {
    @apply text-xl;
  }

  .message {
    @apply text-base;
  }

  .type-icon .b-type-icon,
  .b-icon {
    @apply text-2xl;
  }
}

.info {
  @apply bg-informative-surface-default border-informative-default text-informative-interaction-default;

  .title {
    @apply text-informative-foreground-high;
  }

  .type-icon,
  .message {
    @apply text-informative-foreground-low;
  }
}

.success {
  @apply bg-success-surface-default border-success-default text-success-interaction-default;

  .title {
    @apply text-success-foreground-high;
  }

  .type-icon,
  .message {
    @apply text-success-foreground-low;
  }
}

.warning {
  @apply bg-warning-surface-default border-warning-default text-warning-interaction-default;

  .title {
    @apply text-warning-foreground-high;
  }

  .type-icon,
  .message {
    @apply text-warning-foreground-low;
  }
}

.danger {
  @apply bg-danger-surface-default border-danger-default text-danger-interaction-default;

  .title {
    @apply text-danger-foreground-high;
  }

  .type-icon,
  .message {
    @apply text-danger-foreground-low;
  }
}

.neutral {
  @apply bg-neutral-surface-default border-neutral-default text-neutral-interaction-default;

  .title {
    @apply text-neutral-foreground-high;
  }

  .type-icon,
  .message {
    @apply text-neutral-foreground-low;
  }
}

.type-icon {
  @apply flex transition-transform duration-500;
}
</style>
