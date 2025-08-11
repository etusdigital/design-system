<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';
import BIcon from '../BIcon/BIcon.vue';
import type { BHistoryItem, BHistoryItemContext } from './BHistory.types';

interface HistoryItemProps {
  /** History item data */
  item: BHistoryItem;
  /** Item index in the list */
  index: number;
  /** Timeline position */
  position: "top" | "bottom" | "left" | "right";
  /** Theme type for the item */
  type: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
  /** Whether this item is active/selected */
  active: boolean;
  /** Whether this item is focused */
  focused: boolean;
  /** Whether this is the first item */
  isFirst: boolean;
  /** Whether this is the last item */
  isLast: boolean;
  /** Whether the component is disabled */
  disabled: boolean;
  /** Accessibility context for the item */
  context: BHistoryItemContext;
}

const props = defineProps<HistoryItemProps>();

const emit = defineEmits<{
  'item-click': [item: BHistoryItem, event: { index: number }];
  'item-focus': [item: BHistoryItem, index: number];
  'item-blur': [];
}>();

// Computed classes for the item
const itemClasses = computed(() => [
  'history-item',
  'item',
  props.position,
  props.item.type ? props.item.type : props.type,
  'theme-variant-hover',
  {
    'last-item': props.isLast,
    'first-item': props.isFirst,
    'active': props.active,
    'disabled': props.disabled,
    'focused': props.focused,
    'theme-variant-active': props.active,
    'theme-variant-disabled': props.disabled,
    'focus-ring': true,
  },
]);

// Circle classes for the timeline indicator
const circleClasses = computed(() => ({
  'circle': true,
  'circle-icon': !!props.item.icon && !props.item.isIconRound,
  'round-icon': !!props.item.icon && props.item.isIconRound,
}));

// Border classes for the connecting line
const borderClasses = computed(() => ({
  'custom-border': true,
  'have-icon': !!props.item.icon && !props.item.isIconRound
}));

// Handlers
const handleClick = () => {
  emit('item-click', props.item, { index: props.index });
};

const handleFocus = () => {
  emit('item-focus', props.item, props.index);
};

const handleBlur = () => {
  emit('item-blur');
};
</script>

<template>
  <li
    :class="itemClasses"
    v-bind="context.itemAriaAttrs"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- Visual timeline indicator -->
    <div
      :class="circleClasses"
      aria-hidden="true"
    >
      <BIcon
        :name="item.icon"
        v-if="item.icon"
        :filled="!item.unfilled" 
      />
    </div>
    
    <!-- Timeline connecting line -->
    <div
      :class="borderClasses"
      aria-hidden="true" 
    />
    
    <!-- Item content slot -->
    <div class="data-list">
      <slot
        name="item-content"
        :item="item"
        :index="index"
        :active="active"
        :context="context"
      />
    </div>
  </li>
</template>

<style scoped>
@import "../../assets/styles/components/theme-variants.css";
@import "../../assets/styles/components/accessibility.css";

.history-item {
  @apply w-full relative cursor-pointer;
}

.circle {
  @apply bg-neutral-surface-disabled absolute w-[10px] h-[10px] rounded-full;
}

.custom-border {
  @apply border-neutral-border-default absolute;
}

.data-list {
  @apply border-neutral-border-default;
}

.circle.circle-icon {
  @apply flex items-center justify-center p-sm text-neutral-foreground-negative bg-neutral-surface-disabled;
  
  span {
    @apply text-base;
  }
}

.circle.round-icon {
  @apply bg-neutral-surface-default w-fit h-[20px] text-neutral-surface-disabled;
  
  .b-icon {
    @apply text-3xl;
  }
}

/* Position-specific styles */
.right {
  @apply pl-[20.5px] pr-[16px];
  
  .circle {
    @apply top-[22px] left-[21px];
  }
  
  .circle.round-icon {
    @apply top-[22px] left-[11px];
  }
  
  .circle.circle-icon {
    @apply top-[22px] left-[15px];
  }
  
  .data-list {
    @apply border-l-[1.5px] border-neutral-border-default pb-[16px] pt-[20px] ml-[5px] pl-[20px];
  }
}

.right.first-item {
  @apply pt-[20px];
  
  .custom-border {
    @apply border-r-[1.5px] border-neutral-border-default mr-[5px] pr-[20px] pb-[16px] pt-[20px];
  }
  
  .data-list {
    @apply pt-[0px];
  }
  
  .circle {
    @apply top-[26px];
  }
  
  .circle.circle-icon,
  .circle.round-icon {
    @apply top-[22px];
  }
}

.right.last-item {
  .custom-border {
    @apply border-r-xxs h-[22px] w-[.5px] mt-[0] ml-[5px];
  }
}

.left {
  @apply pl-[16px] pr-[20.5px];
  
  .circle {
    @apply top-[22px] right-[21px];
  }
  
  .circle.round-icon {
    @apply top-[22px] right-[13.5px];
  }
  
  .circle.circle-icon {
    @apply top-[22px] right-[14.5px];
  }
  
  .data-list {
    @apply border-r-[1.5px] border-neutral-border-default mr-[5px] pr-[20px] pb-[16px] pt-[20px];
  }
}

.left.first-item {
  @apply pt-[20px];
  
  .custom-border {
    @apply border-t-[1.5px] border-neutral-border-default pt-[20px] px-[16px] ml-0;
  }
  
  .data-list {
    @apply pt-[0px];
  }
  
  .circle {
    @apply top-[26px];
  }
  
  .circle.circle-icon,
  .circle.round-icon {
    @apply top-[22px];
  }
}

.left.last-item {
  .custom-border {
    @apply border-l-xxs h-[22px] w-[.5px] right-[26px];
  }
}

.top {
  .circle {
    @apply top-[16px] left-[16px];
  }
  
  .circle.round-icon {
    @apply top-[7px] left-[16px];
  }
  
  .circle.circle-icon {
    @apply top-[9.5px] left-[16px];
  }
  
  .data-list {
    @apply border-t-[1.5px] border-neutral-border-default pt-[20px] px-[16px] ml-0;
  }
  
  .custom-border {
    @apply h-[.5px] w-full;
  }
}

.top.item {
  @apply pt-[20px] pb-[16px];
}

.top.first-item {
  .custom-border {
    @apply border-t-xxs ml-[26px] 2xl:mt-[0.5%];
  }
  
  .custom-border.have-icon {
    @apply mt-[1px];
  }
  
  .circle {
    @apply left-[26px];
  }
  
  .circle.round-icon,
  .circle.circle-icon {
    @apply left-[17px];
  }
}

.top.last-item {
  .custom-border {
    @apply border-t-xxs w-[22px] left-[-5px] 2xl:mt-[0.5%];
  }
  
  .custom-border.have-icon {
    @apply mt-[1px];
  }
}

.bottom {
  @apply pb-[20.5px] pt-[16px];
  
  .circle {
    @apply bottom-[16px] left-[16px];
  }
  
  .circle.round-icon {
    @apply bottom-[14px] left-[16px];
  }
  
  .circle.circle-icon {
    @apply bottom-[10px] left-[16px];
  }
  
  .data-list {
    @apply border-b-[1.5px] border-neutral-border-default pb-[20px] px-[16px];
  }
  
  .custom-border {
    @apply h-[.5px] w-full;
  }
}

.bottom.first-item {
  .custom-border {
    @apply border-b-xxs ml-[26px] bottom-[20.5px];
  }
  
  .circle {
    @apply left-[26px];
  }
  
  .circle.round-icon,
  .circle.circle-icon {
    @apply left-[17px];
  }
}

.bottom.last-item {
  .custom-border {
    @apply border-b-xxs w-[22px] left-[-5px] bottom-[20.5px];
  }
}

/* First and last item special cases */
.first-item {
  .data-list {
    @apply border-none;
  }
  
  .circle {
    @apply z-[1];
  }
}

.last-item {
  .data-list {
    @apply border-none;
  }
}

.first-item.last-item {
  .custom-border {
    @apply hidden;
  }
}
</style>