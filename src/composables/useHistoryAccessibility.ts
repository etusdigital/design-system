import { computed, ref, watch, nextTick, type Ref } from 'vue';
import { useAriaAttributes, useScreenReader } from '#composables';
import type { 
  BHistoryItem, 
  BHistoryItemContext, 
  BHistoryTimelineMetadata,
  BHistoryPaginationContext 
} from '../components/BHistory/BHistory.types';

interface HistoryAccessibilityOptions {
  /** Announcement prefix for history items */
  announcementPrefix: string;
  /** Live region politeness level */
  liveRegionPoliteness: 'polite' | 'assertive';
  /** Whether to announce navigation changes */
  announceNavigation: boolean;
  /** Whether to announce item counts */
  announceItemCounts: boolean;
  /** Whether to announce date information */
  announceDateInfo: boolean;
  /** Whether to announce orientation */
  announceOrientation: boolean;
  /** Locale for date formatting */
  locale: string;
  /** Date format options */
  dateFormatOptions: Intl.DateTimeFormatOptions;
}

/**
 * Composable for managing BHistory accessibility features
 */
export function useHistoryAccessibility(
  items: Ref<BHistoryItem[]>,
  currentModel: Ref<BHistoryItem | null>,
  position: Ref<string>,
  options: HistoryAccessibilityOptions
) {
  const { useAriaId } = useAriaAttributes();
  const screenReader = useScreenReader();
  const { updateLiveRegion } = screenReader.useLiveRegion(options.liveRegionPoliteness);

  // Generate unique IDs
  const historyId = useAriaId('history-timeline');
  const listId = useAriaId('history-list');

  // Format date for accessibility
  const formatDateForAccessibility = (date: Date | undefined): string => {
    if (!date) return '';
    
    try {
      return date.toLocaleDateString(options.locale, options.dateFormatOptions);
    } catch {
      return date.toLocaleDateString();
    }
  };

  // Generate timeline metadata for accessibility
  const timelineMetadata = computed<BHistoryTimelineMetadata>(() => {
    const selectedIndex = items.value.findIndex(item => item === currentModel.value);
    
    const dates = items.value
      .map(item => item.date)
      .filter(date => date instanceof Date)
      .sort((a, b) => a!.getTime() - b!.getTime());
    
    return {
      totalItems: items.value.length,
      selectedIndex,
      dateRange: dates.length > 0 ? {
        earliest: dates[0]!,
        latest: dates[dates.length - 1]!
      } : undefined,
      isChronological: dates.length > 1,
      orientation: position.value === 'top' || position.value === 'bottom' ? 'horizontal' : 'vertical'
    };
  });

  // Generate item context for accessibility
  const getItemContext = (item: BHistoryItem, index: number, focusedIndex: number): BHistoryItemContext => {
    const isActive = item === currentModel.value;
    const isFocused = index === focusedIndex;
    const totalItems = items.value.length;
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
        'aria-label': `${options.announcementPrefix} ${position}: ${item.label || 'Unlabeled item'}${item.date ? `, ${formatDateForAccessibility(item.date)}` : ''}`,
        ...(isActive && { 'aria-current': 'step' })
      }
    };
  };

  // Main ARIA attributes for the history container
  const historyAriaAttrs = computed(() => ({
    role: 'region',
    id: historyId,
    'aria-label': `History timeline with ${timelineMetadata.value.totalItems} items`,
    ...(options.announceOrientation && {
      'aria-orientation': timelineMetadata.value.orientation
    })
  }));

  // List ARIA attributes
  const listAriaAttrs = computed(() => ({
    role: 'list',
    id: listId,
    'aria-label': `${options.announcementPrefix} list, ${timelineMetadata.value.totalItems} items total`
  }));

  // Announce navigation changes
  const announceNavigation = (item: BHistoryItem, index: number) => {
    if (!options.announceNavigation) return;
    
    const context = getItemContext(item, index, -1);
    const announcement = `${options.announcementPrefix} selected: ${context.itemAriaAttrs['aria-label']}`;
    updateLiveRegion(announcement);
  };

  // Announce item focus changes
  const announceFocusChange = (item: BHistoryItem, index: number) => {
    if (!options.announceNavigation) return;
    
    nextTick(() => {
      const context = getItemContext(item, index, index);
      updateLiveRegion(`Navigated to ${context.itemAriaAttrs['aria-label']}`);
    });
  };

  // Announce pagination changes
  const announcePaginationChange = (paginationContext: BHistoryPaginationContext) => {
    if (!options.announceNavigation) return;
    
    const announcement = `Page ${paginationContext.currentPage} of ${paginationContext.totalPages}, showing items ${paginationContext.itemRange.start} to ${paginationContext.itemRange.end} of ${paginationContext.totalItems}`;
    updateLiveRegion(announcement);
  };

  // Initialize accessibility announcements
  const initializeAccessibility = () => {
    if (options.announceOrientation && options.announceItemCounts) {
      const metadata = timelineMetadata.value;
      const announcement = `${metadata.orientation} history timeline with ${metadata.totalItems} items${
        metadata.dateRange ? ` from ${formatDateForAccessibility(metadata.dateRange.earliest)} to ${formatDateForAccessibility(metadata.dateRange.latest)}` : ''
      }`;
      
      // Delay announcement to avoid conflicts with page load
      setTimeout(() => {
        updateLiveRegion(announcement);
      }, 500);
    }
  };

  return {
    historyId,
    listId,
    timelineMetadata,
    historyAriaAttrs,
    listAriaAttrs,
    getItemContext,
    announceNavigation,
    announceFocusChange,
    announcePaginationChange,
    initializeAccessibility,
    formatDateForAccessibility,
    updateLiveRegion
  };
}