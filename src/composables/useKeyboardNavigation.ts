import { ref, watch } from 'vue';
import type { Ref } from 'vue';

export interface KeyboardNavigationOptions {
  /** Whether to loop from last to first item */
  loop?: boolean;
  /** Whether to use horizontal navigation (left/right arrows) */
  horizontal?: boolean;
  /** Custom key handlers */
  customHandlers?: Record<string, (event: KeyboardEvent, currentIndex: number) => void>;
}

/**
 * Composable for managing keyboard navigation in lists, menus, and similar components
 */
export function useKeyboardNavigation<T = any>(
  items: Ref<T[]>,
  onSelect?: (item: T, index: number) => void,
  options: KeyboardNavigationOptions = {}
) {
  const {
    loop = true,
    horizontal = false,
    customHandlers = {}
  } = options;

  const activeIndex = ref<number>(-1);
  const isNavigating = ref(false);

  /**
   * Sets the active index with bounds checking
   */
  function setActiveIndex(newIndex: number): void {
    if (items.value.length === 0) {
      activeIndex.value = -1;
      return;
    }

    if (loop) {
      // Loop around the bounds
      if (newIndex < 0) {
        activeIndex.value = items.value.length - 1;
      } else if (newIndex >= items.value.length) {
        activeIndex.value = 0;
      } else {
        activeIndex.value = newIndex;
      }
    } else {
      // Clamp to bounds
      activeIndex.value = Math.max(0, Math.min(newIndex, items.value.length - 1));
    }

    isNavigating.value = true;
  }

  /**
   * Moves to the next item
   */
  function moveNext(): void {
    setActiveIndex(activeIndex.value + 1);
  }

  /**
   * Moves to the previous item
   */
  function movePrevious(): void {
    setActiveIndex(activeIndex.value - 1);
  }

  /**
   * Moves to the first item
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
    if (activeIndex.value >= 0 && activeIndex.value < items.value.length && onSelect) {
      const item = items.value[activeIndex.value];
      onSelect(item, activeIndex.value);
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
   * Handles keyboard events
   */
  function handleKeydown(event: KeyboardEvent): boolean {
    const { key } = event;
    let handled = false;

    // Check custom handlers first
    if (customHandlers[key]) {
      customHandlers[key](event, activeIndex.value);
      handled = true;
    } else {
      // Standard navigation keys
      switch (key) {
        case horizontal ? 'ArrowRight' : 'ArrowDown':
          moveNext();
          handled = true;
          break;

        case horizontal ? 'ArrowLeft' : 'ArrowUp':
          movePrevious();
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
   * Sets active index by value
   */
  function setActiveByValue(value: T): boolean {
    return findAndSetActive((item) => item === value);
  }

  // Watch for items changes and reset if current index is invalid
  watch(items, (newItems) => {
    if (activeIndex.value >= newItems.length) {
      reset();
    }
  }, { deep: true });

  return {
    activeIndex,
    isNavigating,
    setActiveIndex,
    moveNext,
    movePrevious,
    moveFirst,
    moveLast,
    selectActive,
    reset,
    handleKeydown,
    findAndSetActive,
    setActiveByValue,
  };
}