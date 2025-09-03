<script setup lang="ts">
import { computed, ref } from "vue";
import Spinner from "../Spinner/Spinner.vue";
import { blendColors } from "../../utils";

const props = withDefaults(
  defineProps<{
    id?: string;
    name?: string;
    type?: "button" | "reset" | "submit";
    color?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
    size?: "small" | "medium" | "large";
    variant?: "default" | "secondary" | "plain" | "reverse";
    disabled?: boolean;
    loading?: boolean;
    progress?: number;
    icon?: string;
    round?: boolean;
    alwaysOpen?: boolean;
    background?: string;
  }>(),
  {
    type: "button",
    color: "primary",
    size: "medium",
    variant: "default",
    disabled: false,
    loading: false,
    progress: 0,
    icon: "",
    round: false,
    alwaysOpen: false,
    background: "",
  }
);

const isHovering = ref(false);

const isLoading = computed(
  (): boolean => !!(props.progress > 0 || props.loading)
);

const labelComponent = computed((): string => {
  if (props.name || props.id) return "label";
  return "div";
});

const slotComponent = computed((): string => {
  if (props.round) return "span";
  return "template";
});

const computedIcon = computed((): string => {
  if (props.icon) return props.icon;
  else if (!props.round) return "";
  else if (
    props.color == "danger" ||
    props.color == "warning" ||
    props.color == "neutral"
  )
    return "close";
  return "add";
});

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
  }
  return style;
});
</script>

<template>
  <button
    :id="id"
    :name="name || id"
    :type="type"
    :disabled="disabled"
    class="button"
    :class="[
      {
        disabled,
        round,
        'pointer-events-none': isLoading,
        'always-open': alwaysOpen,
        hovered: isHovering,
      },
      variant,
      size,
      color,
    ]"
    :style="style"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
  >
    <div
      v-if="isLoading"
      class="progress"
      :class="{ 'rounded-r-sm': progress == 1 }"
      :style="{ width: progress * 100 + '%' }"
    />
    <Spinner v-if="isLoading" />
    <template v-if="$slots.default || round">
      <component
        :is="labelComponent"
        :for="name || id"
        :class="{ invisible: isLoading }"
        class="button-label cursor-[inherit]"
      >
        <Icon :name="computedIcon" />
        <component :is="slotComponent" class="label" v-if="$slots.default">
          <slot />
        </component>
      </component>
    </template>
  </button>
</template>

<style scoped src="./colors.css" />

<style scoped>
@reference "../../assets/main.css";

.button {
  @apply p3 font-semibold leading-base rounded-base relative inline-flex cursor-pointer items-center justify-center tracking-wider capitalize select-none active:scale-95 border-xs text-neutral-foreground-negative;

  .spinner {
    @apply absolute;
  }
}

.button.small {
  @apply py-xs px-base;

  .spinner {
    @apply text-xs;
  }
}

.button.medium {
  @apply py-sm px-base;
}

.button.large {
  @apply py-base px-xl;
}

.progress {
  @apply absolute overflow-hidden top-0 left-0 bottom-0 rounded-l-sm transition-[width] ease-out duration-300;
}

.button.default .progress {
  @apply bg-neutral-surface-default opacity-60;
}

.button-label {
  @apply inline-flex items-center justify-center gap-x-xs;
}

.button.round {
  @apply rounded-full p-xxs;

  .button-label {
    @apply gap-x-none;
  }

  .label {
    @apply opacity-0 scale-0 max-w-none overflow-hidden transition-all
           duration-300 origin-left whitespace-nowrap;
  }
}

.round.always-open {
  @apply w-fit max-w-[none];
}

.round.hovered .label,
.round.always-open .label {
  @apply opacity-100 scale-100 max-w-14xl mr-base;
}

.round.small {
  @apply text-xs py-none;

  .icon {
    @apply text-2xl;
  }
}

.round.medium {
  @apply text-base leading-lg py-2xxs;

  &.hovered .content,
  &.always-open .content {
    @apply gap-x-xs;
  }

  .icon {
    @apply text-4xl;
  }
}

.round.large {
  @apply text-xl leading-xl;

  .hovered .content,
  .always-open .content {
    @apply gap-x-xs;
  }

  .icon {
    @apply text-5xl;
  }
}
</style>
