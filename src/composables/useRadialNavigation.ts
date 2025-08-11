import { ref, computed, watch } from 'vue';
import type { Ref } from 'vue';
import { useScreenReader } from './useScreenReader';

export interface RadialNavigationItem {
  id: string;
  label: string;
  position?: number; // 0-based index for circular position
  disabled?: boolean;
}

export interface RadialNavigationOptions {
  /** Whether to loop from last to first item */
  loop?: boolean;
  /** Announce position changes to screen readers */
  announcePositions?: boolean;
  /** Custom position announcer for screen readers */
  positionAnnouncer?: (item: RadialNavigationItem, position: number, total: number) => string;
  /** Custom handlers for specific keys */
  customHandlers?: Record<string, (event: KeyboardEvent, currentIndex: number) => void>;
}

/**
 * Composable for managing keyboard navigation in circular/radial menu layouts
 * Adapts standard arrow key navigation to work intuitively with circular arrangements
 */
export function useRadialNavigation<T extends RadialNavigationItem>(
  items: Ref<T[]>,
  onSelect?: (item: T, index: number) => void,
  options: RadialNavigationOptions = {}
) {
  const {
    loop = true,
    announcePositions = true,
    positionAnnouncer,
    customHandlers = {}
  } = options;

  const activeIndex = ref<number>(-1);
  const isNavigating = ref(false);
  const { announcePolitely } = useScreenReader();

  /**
   * Converts an angle to a clock position description
   */
  function getClockPosition(index: number, total: number): string {
    const angle = (index * 360) / total;
    const normalizedAngle = ((angle % 360) + 360) % 360; // Normalize to 0-360
    
    const clockPositions = [
      '12 o\'clock', '1 o\'clock', '2 o\'clock', '3 o\'clock',
      '4 o\'clock', '5 o\'clock', '6 o\'clock', '7 o\'clock',
      '8 o\'clock', '9 o\'clock', '10 o\'clock', '11 o\'clock'
    ];
    
    const clockIndex = Math.round((normalizedAngle / 30) % 12);
    return clockPositions[clockIndex] || '12 o\'clock';
  }

  /**
   * Default position announcer for screen readers
   */
  function defaultPositionAnnouncer(item: T, position: number, total: number): string {
    const clockPos = getClockPosition(position, total);
    return `${item.label}, item ${position + 1} of ${total} at ${clockPos} position`;
  }

  /**
   * Announces current position to screen readers
   */
  function announcePosition(index: number): void {
    if (!announcePositions || index < 0 || index >= items.value.length) return;
    
    const item = items.value[index];
    const announcer = positionAnnouncer || defaultPositionAnnouncer;
    const announcement = announcer(item, index, items.value.length);
    announcePolitely(announcement);
  }

  /**
   * Sets the active index with bounds checking
   */
  function setActiveIndex(newIndex: number): void {
    if (items.value.length === 0) {
      activeIndex.value = -1;
      return;
    }

    // Skip disabled items
    const enabledItems = items.value
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !item.disabled);

    if (enabledItems.length === 0) {
      activeIndex.value = -1;
      return;
    }

    let targetIndex = newIndex;
    
    if (loop) {
      // Loop around the bounds for enabled items
      if (targetIndex < 0) {
        targetIndex = enabledItems[enabledItems.length - 1].index;
      } else if (targetIndex >= items.value.length) {
        targetIndex = enabledItems[0].index;
      } else {
        // Find nearest enabled item
        const enabledIndex = enabledItems.find(({ index }) => index >= targetIndex)?.index ??
                           enabledItems[0].index;
        targetIndex = enabledIndex;
      }
    } else {
      // Clamp to bounds for enabled items
      const maxEnabledIndex = Math.max(...enabledItems.map(({ index }) => index));
      const minEnabledIndex = Math.min(...enabledItems.map(({ index }) => index));
      
      if (targetIndex < minEnabledIndex) {
        targetIndex = minEnabledIndex;
      } else if (targetIndex > maxEnabledIndex) {
        targetIndex = maxEnabledIndex;
      } else {
        // Find nearest enabled item
        const enabledIndex = enabledItems.find(({ index }) => index >= targetIndex)?.index ??
                           enabledItems[enabledItems.length - 1].index;
        targetIndex = enabledIndex;
      }
    }

    activeIndex.value = targetIndex;
    isNavigating.value = true;
    announcePosition(targetIndex);
  }

  /**
   * Moves clockwise to next item (circular right/down)
   */
  function moveClockwise(): void {
    const currentIndex = activeIndex.value;
    const nextIndex = currentIndex < 0 ? 0 : currentIndex + 1;
    setActiveIndex(nextIndex);
  }

  /**
   * Moves counter-clockwise to previous item (circular left/up)
   */
  function moveCounterClockwise(): void {
    const currentIndex = activeIndex.value;
    const prevIndex = currentIndex <= 0 ? items.value.length - 1 : currentIndex - 1;
    setActiveIndex(prevIndex);
  }

  /**
   * Moves to the first item (typically top of circle)
   */
  function moveFirst(): void {
    setActiveIndex(0);
  }

  /**
   * Moves to the last item
   */
  function moveLast(): void {
    setActiveIndex(items.value.length - 1);
  }

  /**
   * Selects the currently active item
   */
  function selectActive(): void {
    if (activeIndex.value >= 0 && activeIndex.value < items.value.length) {
      const item = items.value[activeIndex.value];
      if (!item.disabled && onSelect) {
        onSelect(item, activeIndex.value);
      }
    }
  }

  /**
   * Resets the navigation state
   */
  function reset(): void {
    activeIndex.value = -1;
    isNavigating.value = false;
  }

  /**
   * Handles keyboard events for radial navigation
   */
  function handleKeydown(event: KeyboardEvent): boolean {
    const { key } = event;
    let handled = false;

    // Check custom handlers first
    if (customHandlers[key]) {
      customHandlers[key](event, activeIndex.value);
      handled = true;
    } else {
      // Radial navigation mapping
      switch (key) {
        case 'ArrowRight':
        case 'ArrowDown':
          // Moving clockwise in circular layout
          moveClockwise();
          handled = true;
          break;

        case 'ArrowLeft':
        case 'ArrowUp':
          // Moving counter-clockwise in circular layout
          moveCounterClockwise();
          handled = true;
          break;

        case 'Home':
          moveFirst();
          handled = true;
          break;

        case 'End':
          moveLast();
          handled = true;
          break;

        case 'Enter':
        case ' ': // Space
          selectActive();
          handled = true;
          break;

        case 'Escape':
          reset();
          handled = true;
          break;
      }
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }

    return handled;
  }

  /**
   * Finds and sets active index based on a predicate
   */
  function findAndSetActive(predicate: (item: T, index: number) => boolean): boolean {
    const index = items.value.findIndex(predicate);
    if (index !== -1) {
      setActiveIndex(index);
      return true;
    }
    return false;
  }

  /**
   * Sets active index by item ID
   */
  function setActiveById(id: string): boolean {
    return findAndSetActive((item) => item.id === id);
  }

  /**
   * Gets the current active item
   */
  const activeItem = computed(() => {
    return activeIndex.value >= 0 ? items.value[activeIndex.value] : null;
  });

  // Watch for items changes and reset if current index is invalid
  watch(items, (newItems) => {
    if (activeIndex.value >= newItems.length) {
      reset();
    }
  }, { deep: true });

  return {
    activeIndex,
    activeItem,
    isNavigating,
    setActiveIndex,
    moveClockwise,
    moveCounterClockwise,
    moveFirst,
    moveLast,
    selectActive,
    reset,
    handleKeydown,
    findAndSetActive,
    setActiveById,
    announcePosition,
    getClockPosition,
  };
}