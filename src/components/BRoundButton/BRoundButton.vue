<script setup lang="ts">
import { ref, computed } from "vue";
import { blendColors } from "../../utils";

const props = withDefaults(
  defineProps<{
    id?: string;
    name?: string;
    text?: string;
    icon?: string;
    background?: string;
    type?: "button" | "reset" | "submit";
    color?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
    size?: "small" | "medium" | "large";
    variant?: "default" | "secondary" | "plain" | "reverse";
    disabled?: boolean;
    alwaysOpen?: boolean;
  }>(),
  {
    type: "button",
    color: "primary",
    size: "small",
    variant: "default",
    disabled: false,
    alwaysOpen: false,
  }
);

let isHovering = ref(false);
const style = computed((): any => {
  const style: any = {};

  if (props.disabled) return style;

  if (props.background && props.variant != "plain") style["border-color"] = props.background;

  if (props.background && props.variant != "default") style.color = props.background;
  else style.background = props.background;

  if (isHovering.value) {
    if (props.background && props.variant == "default") {
      const background = blendColors(props.background, 0.5, [0, 0, 0]);
      style.background = background;
      style["border-color"] = background;
    } else if (props.background && props.variant == "reverse") {
      style.background = props.background;
      style.color = "white";
    } else if (props.background) {
      const background = blendColors(props.background, 0.4);
      style.background = background;
    }

    if (!props.alwaysOpen) style["z-index"] = 50;
  }
  return style;
});

const computedIcon = computed((): string => {
  if (props.icon) return props.icon;
  else if (props.color == "danger" || props.color == "warning" || props.color == "neutral") return "close";
  return "add";
});
</script>

<template>
  <button
    :id="id"
    :name="name || id"
    :type="type"
    :disabled="disabled"
    class="b-round-button"
    :class="[
      size,
      color,
      variant,
      {
        disabled: disabled,
        'always-open': alwaysOpen,
        hovered: isHovering,
      },
    ]"
    :style="style"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
  >
    <div class="content">
      <BIcon :name="computedIcon" class="icon" />
      <span class="text" v-if="text">{{ text }}</span>
    </div>
  </button>
</template>

<style scoped src="@/utils/styles/button.css" />

<style scoped>
.b-round-button {
  @apply border-xxs relative inline-flex cursor-pointer max-h-fit items-center font-bold tracking-wider select-none active:scale-95
    cursor-pointer items-center font-bold tracking-wider capitalize select-none rounded-full text-neutral-foreground-negative;
}

.content {
  @apply flex items-center;
}

.hovered .content,
.always-open .content {
  @apply gap-xxs;
}

.text {
  @apply opacity-0 scale-0 max-w-0 overflow-hidden transition-all duration-300 origin-left whitespace-nowrap;
}

.b-round-button.hovered .text,
.b-round-button.always-open .text {
  @apply opacity-100 scale-100 max-w-[200px] mr-base;
}

.b-round-button.always-open {
  @apply w-fit max-w-none;

  .icon {
    @apply rotate-0;
  }
}

.small {
  @apply text-xl;

  .icon {
    @apply text-2xl;
  }

  .text {
    @apply text-xs;
  }
}

.medium {
  @apply text-3xl;

  &.hovered .content,
  &.always-open .content {
    @apply gap-xs;
  }

  .icon {
    @apply text-4xl;
  }

  .text {
    @apply text-base;
  }
}

.large {
  @apply text-5xl;

  .hovered .content,
  .always-open .content {
    @apply gap-xs;
  }

  .icon {
    @apply text-5xl;
  }

  .text {
    @apply text-xl;
  }
}
</style>
