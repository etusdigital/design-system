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
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-base);
  border-radius: var(--border-radius-base);
  border-width: var(--border-width-xs);
  gap: var(--spacing-base);
  transition: height 0.1s ease-in-out;

  .title {
    font-weight: var(--font-weight-bold);
  }
}

.b-alert.small {
  .title {
    font-size: var(--font-size-sm);
  }

  .message {
    font-size: var(--font-size-xs);
  }

  .type-icon .b-type-icon,
  .b-icon {
    font-size: var(--font-size-xl);
  }
}

.b-alert.medium {
  .title {
    font-size: var(--font-size-base);
  }

  .message {
    font-size: var(--font-size-sm);
  }

  .type-icon .b-type-icon,
  .b-icon {
    font-size: var(--font-size-2xl);
  }
}

.b-alert.large {
  .title {
    font-size: var(--font-size-xl);
  }

  .message {
    font-size: var(--font-size-base);
  }

  .type-icon .b-type-icon,
  .b-icon {
    font-size: var(--font-size-2xl);
  }
}

.info {
  background-color: var(--informative-surface-default);
  border-color: var(--informative-default);
  color: var(--informative-interaction-default);

  .title {
    color: var(--informative-foreground-high);
  }

  .type-icon,
  .message {
    color: var(--informative-foreground-low);
  }
}

.success {
  background-color: var(--success-surface-default);
  border-color: var(--success-default);
  color: var(--success-interaction-default);

  .title {
    color: var(--success-foreground-high);
  }

  .type-icon,
  .message {
    color: var(--success-foreground-low);
  }
}

.warning {
  background-color: var(--warning-surface-default);
  border-color: var(--warning-default);
  color: var(--warning-interaction-default);

  .title {
    color: var(--warning-foreground-high);
  }

  .type-icon,
  .message {
    color: var(--warning-foreground-low);
  }
}

.danger {
  background-color: var(--danger-surface-default);
  border-color: var(--danger-default);
  color: var(--danger-interaction-default);

  .title {
    color: var(--danger-foreground-high);
  }

  .type-icon,
  .message {
    color: var(--danger-foreground-low);
  }
}

.neutral {
  background-color: var(--neutral-surface-default);
  border-color: var(--neutral-default);
  color: var(--neutral-interaction-default);

  .title {
    color: var(--neutral-foreground-high);
  }

  .type-icon,
  .message {
    color: var(--neutral-foreground-low);
  }
}

.type-icon {
  display: flex;
  transition: transform 0.5s ease-in-out;
}
</style>
