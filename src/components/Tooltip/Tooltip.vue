<script setup lang="ts">
import {
  ref,
  nextTick,
  computed,
} from "vue";

const props = withDefaults(
  defineProps<{
    labelValue?: string;
    text?: string;
    position?: "top" | "bottom" | "left" | "right";
  }>(),
  {
    labelValue: "",
    text: "",
    position: "right",
  }
);

let isHovering = ref(false);
const content = ref<HTMLElement>();
const tooltip = ref<HTMLElement>();

const computedPadding = computed((): number => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    return Number(
      (
        (content.value as any)
          ?.computedStyleMap()
          .get("--spacing-xxs")
          ?.toString() || "4px"
      ).replace("px", "")
    );
  }
  return 4;
});

async function showTooltip() {
  isHovering.value = true;
  await nextTick();

  if (!content.value || !tooltip.value) return;

  const rect = (content.value.firstElementChild || content.value).getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  console.log(rect, rect.bottom, window.innerHeight);
  calculatePosition(rect, tooltip.value);

  const closeHandler = () => {
    isHovering.value = false;
    document.removeEventListener("wheel", closeHandler);
  };

  document.addEventListener("wheel", closeHandler);

  const tooltipRect = tooltip.value.getBoundingClientRect();
  const tooltipContent = tooltip.value.querySelector(
    ".tooltip-content"
  ) as HTMLElement;
  if (!tooltipContent) return;

  tooltipContent.style.maxWidth = "none";
  tooltipContent.style.wordBreak = "normal";
  tooltipContent.style.whiteSpace = "normal";

  if (tooltipRect.left + tooltipRect.width > viewportWidth) {
    const triangleWidth = tooltipRect.width - tooltipContent.offsetWidth;
    tooltipContent.style.maxWidth = `${
      viewportWidth - tooltipRect.left - computedPadding.value - triangleWidth
    }px`;
    tooltipContent.style.wordBreak = "break-all";
    tooltipContent.style.whiteSpace = "wrap";
    calculatePosition(rect, tooltip.value);
  }
}

function calculatePosition(rect: DOMRect, tooltip: HTMLElement) {
  if (props.position === "left" || props.position === "right") {
    const horizontalPosition =
      props.position === "left"
        ? rect.left - tooltip.offsetWidth - computedPadding.value
        : rect.right + computedPadding.value;

    tooltip.style.left = `${Math.max(0, horizontalPosition)}px`;
    tooltip.style.top = `${
      rect.top + rect.height / 2 - tooltip.offsetHeight / 2
    }px`;
  } else {
    const verticalPosition =
      props.position === "top" ? rect.top - tooltip.offsetHeight : rect.bottom;

    tooltip.style.top = `${Math.max(0, verticalPosition)}px`;
    tooltip.style.left = `${
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2
    }px`;
  }
}
</script>

<template>
  <div ref="content" @mouseenter="showTooltip" @mouseleave="isHovering = false">
    <Teleport to="body">
      <Transition name="opacity">
        <div
          v-if="isHovering"
          class="tooltip"
          ref="tooltip"
          :class="[position]"
        >
          <div class="tooltip-triangle" />
          <div class="tooltip-content">
            <slot name="label">
              {{ labelValue || text }}
            </slot>
          </div>
        </div>
      </Transition>
    </Teleport>
    <slot />
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.opacity-enter-active,
.opacity-leave-active {
  @apply transition-opacity duration-500 ease-out;
}

.opacity-enter-from,
.opacity-leave-to {
  @apply opacity-0;
}

.tooltip {
  @apply z-[1004] fixed flex items-center;

  .tooltip-triangle {
    @apply w-0 h-0 border-[9px] border-r-0 border-[9px] border-l-[11px] border-l-negative border-transparent relative;
  }

  .tooltip-content {
    @apply flex items-center justify-center bg-negative p-xs rounded-base font-normal text-neutral-foreground-negative text-xs w-fit whitespace-nowrap;
  }
}

.right {
  @apply flex-row;

  .tooltip-triangle {
    @apply rotate-180 right-[-2px];
  }
}

.left {
  @apply flex-row-reverse;

  .tooltip-triangle {
    @apply left-[-2px];
  }
}

.top {
  @apply flex-col-reverse;

  .tooltip-triangle {
    @apply rotate-90 top-[-5px];
  }
}

.bottom {
  @apply flex-col;

  .tooltip-triangle {
    @apply rotate-[-90deg] bottom-[-5px];
  }
}
</style>
