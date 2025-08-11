<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useOptionalModel, useKeyboardNavigation } from "#composables";
import { useHistoryAccessibility } from '#composables/useHistoryAccessibility';
import HistoryItem from './HistoryItem.vue';
import HistoryPagination from './HistoryPagination.vue';
import type { 
  BHistoryProps, 
  BHistoryEmits,
  BHistoryItem,
  BHistorySelectionEvent,
  BHistoryPaginationContext,
  BHistoryTimelineMetadata,
  BHistoryItemContext,
} from './BHistory.types';

const props = withDefaults(
  defineProps<BHistoryProps>(),
  {
    modelValue: null,
    position: "right",
    type: "primary",
    disabled: false,
    keyboardNavigation: true,
    loopNavigation: true,
    focusOnNavigation: true,
    announceNavigation: true,
    announcementPrefix: "History item",
    reduceMotion: false,
    liveRegionPoliteness: "polite",
    role: "region",
    showPagination: false,
    currentPage: 1,
    itemsPerPage: 10,
    dateFormatOptions: () => ({
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    } as const),
    locale: 'en-US',
    announceItemCounts: true,
    announceDateInfo: true,
    announceOrientation: true
  }
);

const emit = defineEmits<BHistoryEmits>();

// Component refs
const historyRef = ref<HTMLElement | null>(null);
const itemRefs = ref<HTMLElement[]>([]);
const liveRegionRef = ref<HTMLElement | null>(null);

/**
 * Reactive model for the currently selected history item
 */
const [model, setModel] = useOptionalModel<BHistoryItem | null>(
  props,
  "modelValue",
  emit,
  null
);

// Component state
const focusedIndex = ref<number>(-1);

// Pagination computed values
const paginatedItems = computed(() => {
  if (!props.showPagination) return props.items;
  
  const startIndex = (props.currentPage - 1) * props.itemsPerPage;
  const endIndex = startIndex + props.itemsPerPage;
  return props.items.slice(startIndex, endIndex);
});

const paginationContext = computed<BHistoryPaginationContext>(() => {
  const totalItems = props.items.length;
  const totalPages = Math.ceil(totalItems / props.itemsPerPage);
  const currentPage = props.currentPage;
  
  return {
    currentPage,
    totalPages,
    itemsPerPage: props.itemsPerPage,
    totalItems,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
    itemRange: {
      start: (currentPage - 1) * props.itemsPerPage + 1,
      end: Math.min(currentPage * props.itemsPerPage, totalItems)
    }
  };
});

// Timeline metadata
const timelineMetadata = computed<BHistoryTimelineMetadata>(() => {
  const items = props.showPagination ? paginatedItems.value : props.items;
  const selectedIndex = items.findIndex(item => item === model.value);
  
  const dates = items
    .map(item => item.date)
    .filter(date => date instanceof Date)
    .sort((a, b) => a!.getTime() - b!.getTime());
  
  return {
    totalItems: items.length,
    selectedIndex,
    dateRange: dates.length > 0 ? {
      earliest: dates[0]!,
      latest: dates[dates.length - 1]!
    } : undefined,
    isChronological: dates.length > 1,
    orientation: props.position === 'top' || props.position === 'bottom' ? 'horizontal' : 'vertical'
  };
});

// Format date for accessibility
const formatDateForAccessibility = (date: Date | undefined): string => {
  if (!date) return '';
  
  try {
    return date.toLocaleDateString(props.locale, props.dateFormatOptions);
  } catch {
    return date.toLocaleDateString();
  }
};

// Generate item context for accessibility
const getItemContext = (item: BHistoryItem, index: number): BHistoryItemContext => {
  const items = props.showPagination ? paginatedItems.value : props.items;
  const isActive = item === model.value;
  const isFocused = index === focusedIndex.value;
  const totalItems = items.length;
  const position = index + 1;
  
  return {
    item,
    index,
    active: isActive,
    focused: isFocused,
    totalItems,
    positionText: `${position} of ${totalItems}`,
    accessibleDate: formatDateForAccessibility(item.date),
    itemAriaAttrs: {
      role: 'listitem',
      'aria-setsize': totalItems,
      'aria-posinset': position,
      'aria-selected': isActive,
      tabindex: isFocused ? 0 : -1,
      'aria-label': `${props.announcementPrefix} ${position}: ${item.label || 'Unlabeled item'}${item.date ? `, ${formatDateForAccessibility(item.date)}` : ''}`,
      ...(isActive && { 'aria-current': 'step' })
    }
  };
};

// Keyboard navigation setup
const displayedItems = computed(() => props.showPagination ? paginatedItems.value : props.items);
const {
  activeIndex,
  isNavigating,
  handleKeydown,
  setActiveIndex,
  reset: resetNavigation
} = useKeyboardNavigation(
  displayedItems,
  (item, index) => handleItemSelection(item, { index }),
  {
    loop: props.loopNavigation,
    horizontal: props.position === 'top' || props.position === 'bottom',
    customHandlers: {
      'PageUp': () => {
        if (props.showPagination && paginationContext.value.hasPreviousPage) {
          emit('update:currentPage', props.currentPage - 1);
        }
      },
      'PageDown': () => {
        if (props.showPagination && paginationContext.value.hasNextPage) {
          emit('update:currentPage', props.currentPage + 1);
        }
      }
    }
  }
);

// Watch for active index changes and update focus
watch(activeIndex, (newIndex) => {
  focusedIndex.value = newIndex;
  
  if (newIndex >= 0 && props.focusOnNavigation) {
    nextTick(() => {
      const itemElement = itemRefs.value[newIndex];
      if (itemElement) {
        itemElement.focus();
        
        // Announce navigation if enabled
        if (props.announceNavigation) {
          const item = displayedItems.value[newIndex];
          const context = getItemContext(item, newIndex);
          updateLiveRegion(`Navigated to ${context.itemAriaAttrs['aria-label']}`);
        }
        
        emit('focus-change', displayedItems.value[newIndex], newIndex);
      }
    });
  }
});

// Accessibility setup
const { historyId, listId, updateLiveRegion } = useHistoryAccessibility(props);

// Main ARIA attributes for the history container
const historyAriaAttrs = computed(() => {
  const attrs: Record<string, any> = {
    role: props.role,
    id: historyId,
    'aria-label': props['aria-label'] || `History timeline with ${timelineMetadata.value.totalItems} items`,
    ...(props['aria-labelledby'] && { 'aria-labelledby': props['aria-labelledby'] }),
    ...(props['aria-describedby'] && { 'aria-describedby': props['aria-describedby'] }),
  };
  
  // Add orientation for screen reader context
  if (props.announceOrientation) {
    attrs['aria-orientation'] = timelineMetadata.value.orientation;
  }
  
  return attrs;
});

// List ARIA attributes
const listAriaAttrs = computed(() => ({
  role: 'list',
  id: listId,
  'aria-label': `${props.announcementPrefix} list, ${timelineMetadata.value.totalItems} items total`
}));

/**
 * Handles history item selection with proper event payload and accessibility announcements
 */
const handleItemSelection = (item: BHistoryItem, event: BHistorySelectionEvent): void => {
  if (props.disabled) return;
  
  setModel(item, event);
  
  // Update focused index to match selection
  focusedIndex.value = event.index;
  
  // Announce selection change
  if (props.announceNavigation) {
    const context = getItemContext(item, event.index);
    const announcement = `${props.announcementPrefix} selected: ${context.itemAriaAttrs['aria-label']}`;
    updateLiveRegion(announcement);
  }
};

/**
 * Handles keyboard events for the history timeline
 */
const handleHistoryKeydown = (event: KeyboardEvent): void => {
  if (!props.keyboardNavigation || props.disabled) return;
  
  handleKeydown(event);
};

/**
 * Handles item focus events
 */
const handleItemFocus = (item: BHistoryItem, index: number): void => {
  focusedIndex.value = index;
  emit('focus-change', item, index);
};

/**
 * Handles item blur events
 */
const handleItemBlur = (): void => {
  // Only reset focus if we're not navigating
  if (!isNavigating.value) {
    focusedIndex.value = -1;
  }
};

// Initialize component on mount
onMounted(() => {
  // Set initial focus if there's a selected item
  if (model.value) {
    const selectedIndex = displayedItems.value.findIndex(item => item === model.value);
    if (selectedIndex >= 0) {
      focusedIndex.value = selectedIndex;
    }
  }
  
  // Announce timeline description if enabled
  if (props.announceOrientation && props.announceItemCounts) {
    const metadata = timelineMetadata.value;
    const announcement = `${metadata.orientation} history timeline with ${metadata.totalItems} items${metadata.dateRange ? ` from ${formatDateForAccessibility(metadata.dateRange.earliest)} to ${formatDateForAccessibility(metadata.dateRange.latest)}` : ''}`;
    
    // Delay announcement to avoid conflicts with page load
    setTimeout(() => {
      updateLiveRegion(announcement);
    }, 500);
  }
});

// Cleanup on unmount
onUnmounted(() => {
  resetNavigation();
});

// Watch for pagination changes and announce
watch(() => props.currentPage, (newPage) => {
  if (props.showPagination && props.announceNavigation) {
    const context = paginationContext.value;
    const announcement = `Page ${newPage} of ${context.totalPages}, showing items ${context.itemRange.start} to ${context.itemRange.end} of ${context.totalItems}`;
    updateLiveRegion(announcement);
  }
});
</script>

<template>
  <div
    ref="historyRef"
    class="b-history"
    :class="{ 
      flex: position === 'top' || position === 'bottom',
      'reduce-motion': reduceMotion
    }"
    v-bind="historyAriaAttrs"
    @keydown="handleHistoryKeydown"
  >
    <!-- Screen reader live region for announcements -->
    <div
      ref="liveRegion"
      :aria-live="liveRegionPoliteness"
      aria-atomic="true"
      aria-relevant="text"
      class="sr-only"
    ></div>

    <!-- History timeline list -->
    <ol v-bind="listAriaAttrs" class="history-list">
      <HistoryItem
        v-for="(item, index) in displayedItems"
        :key="item.id || index"
        ref="itemRefs"
        :item="item"
        :index="index"
        :context="getItemContext(item, index)"
        :position="position"
        :type="item.type || type"
        :disabled="disabled"
        :is-last="!displayedItems[index + 1]"
        :is-first="index === 0"
        :is-active="(index === 0 && !model && !disabled) || item === model"
        :is-focused="index === focusedIndex"
        @click="handleItemSelection(item, { index })"
        @focus="handleItemFocus(item, index)"
        @blur="handleItemBlur"
      >
        <template #item="{ item, index, active, context }">
          <slot
            name="item"
            :item="item"
            :index="index"
            :active="active"
            :context="context"
          />
        </template>
      </HistoryItem>
    </ol>

    <!-- Pagination controls (if enabled) -->
    <HistoryPagination
      v-if="showPagination && paginationContext.totalPages > 1"
      :context="paginationContext"
      :current-page="currentPage"
      @update:current-page="emit('update:currentPage', $event)"
    />
  </div>
</template>

<style scoped>
  @import "../../assets/main.css";

  .b-history {
    @apply relative;
  }

  .b-history.reduce-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .history-list {
    @apply list-none p-0 m-0;
  }

  /* Screen reader only class */
  .sr-only {
    @apply absolute w-px h-px p-0 -m-px overflow-hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .b-history {
      border: 2px solid currentColor;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .b-history {
      transition: none !important;
      animation: none !important;
    }
  }
</style>