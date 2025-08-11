import { ref, computed, nextTick, type Ref } from 'vue';
import { useScreenReader } from '#composables/useScreenReader';
import type { BreadcrumbItemType } from '#/components/BBreadcrumb/BBreadcrumb.types';

export interface UseBreadcrumbNavigationOptions {
  announceNavigation?: boolean;
  announcementPrefix?: string;
  disabled?: boolean;
  navigable?: boolean;
  currentPageIsLink?: boolean;
  getObject?: boolean;
}

export function useBreadcrumbNavigation(
  items: Ref<BreadcrumbItemType[] | undefined>,
  model: Ref<unknown>,
  emit: (event: string, ...args: any[]) => void,
  options: UseBreadcrumbNavigationOptions = {}
) {
  const screenReader = useScreenReader();
  
  // Navigation state
  const navigationHistory = ref<BreadcrumbItemType[]>([]);
  const isNavigating = ref(false);
  const focusedIndex = ref(-1);

  /**
   * Gets the label from a breadcrumb item
   */
  function getLabel(item: unknown, labelKey = 'label'): string {
    if (!item) return '';
    if (typeof item === 'string') return item;
    if (typeof item === 'object' && item !== null) {
      return String((item as any)[labelKey] || '');
    }
    return String(item);
  }

  /**
   * Gets the value from a breadcrumb item
   */
  function getValue(item: BreadcrumbItemType, valueKey = 'value'): unknown {
    if (typeof item === 'object' && item !== null) {
      return (item as any)[valueKey];
    }
    return item;
  }

  /**
   * Gets the URL from a breadcrumb item
   */
  function getUrl(item: BreadcrumbItemType, urlKey = 'url', baseUrl = ''): string {
    if (typeof item === 'object' && item !== null && urlKey && (item as any)[urlKey]) {
      return String((item as any)[urlKey]);
    }
    
    if (baseUrl) {
      const value = getValue(item);
      return `${baseUrl.replace(/\/$/, '')}/${String(value).toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    return '';
  }

  /**
   * Checks if an item is currently active/selected
   */
  function isActive(item: unknown, valueKey = 'value'): boolean {
    const itemValue = getValue(item as BreadcrumbItemType, valueKey);
    const selectedValue = getValue(model.value as BreadcrumbItemType, valueKey);
    return selectedValue === itemValue;
  }

  /**
   * Checks if an item is the current page
   */
  function isCurrentPage(item: unknown, currentPage?: unknown, valueKey = 'value'): boolean {
    if (currentPage !== undefined) {
      const itemValue = getValue(item as BreadcrumbItemType, valueKey);
      return itemValue === currentPage;
    }
    return isActive(item, valueKey);
  }

  /**
   * Enhanced model setter with comprehensive navigation support
   */
  function navigateToItem(item: unknown, event?: Event): void {
    if (options.disabled || isNavigating.value) {
      return;
    }
    
    const breadcrumbItem = item as BreadcrumbItemType;
    const itemIndex = items.value?.indexOf(breadcrumbItem) ?? -1;
    
    // Check if current page and not navigable
    if (isCurrentPage(breadcrumbItem) && !options.currentPageIsLink) {
      return;
    }

    isNavigating.value = true;
    const value = options.getObject ? breadcrumbItem : getValue(breadcrumbItem);

    // Emit navigation event
    if (event) {
      emit("navigate", breadcrumbItem, itemIndex, event);
    }

    try {
      setTimeout(() => {
        model.value = value;
        emit("update:modelValue", value);
        
        // Add to navigation history
        navigationHistory.value.push(breadcrumbItem);
        if (navigationHistory.value.length > 10) {
          navigationHistory.value.shift(); // Keep only last 10 items
        }

        // Announce navigation for screen readers
        if (options.announceNavigation) {
          const label = getLabel(breadcrumbItem);
          const position = itemIndex + 1;
          const total = items.value?.length || 0;
          screenReader.announcePolitely(
            `Navigated to ${label}, item ${position} of ${total}`
          );
        }
        
        emit("navigation-complete", breadcrumbItem);
        isNavigating.value = false;
      }, 200);
    } catch (error) {
      emit("navigation-error", error as Error, breadcrumbItem);
      isNavigating.value = false;
    }
  }

  /**
   * Enhanced keyboard navigation for breadcrumb items
   */
  function handleKeydown(event: KeyboardEvent, item?: unknown, index?: number): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Space':
        event.preventDefault();
        if (item !== undefined && options.navigable && (!isCurrentPage(item) || options.currentPageIsLink)) {
          navigateToItem(item, event);
        }
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        moveFocus(1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        moveFocus(-1);
        break;
      case 'Home':
        event.preventDefault();
        moveFocus(0, true);
        break;
      case 'End':
        event.preventDefault();
        const totalItems = items.value?.length || 0;
        moveFocus(totalItems - 1, true);
        break;
    }
  }

  /**
   * Moves focus between breadcrumb items
   */
  function moveFocus(direction: number, absolute: boolean = false): void {
    if (!items.value?.length) return;

    let newIndex: number;
    if (absolute) {
      newIndex = direction;
    } else {
      newIndex = focusedIndex.value + direction;
    }

    // Clamp to valid range
    newIndex = Math.max(0, Math.min(items.value.length - 1, newIndex));
    focusedIndex.value = newIndex;

    // Focus the element
    nextTick(() => {
      const breadcrumbElement = document.querySelector(`[data-breadcrumb-index="${newIndex}"]`) as HTMLElement;
      if (breadcrumbElement) {
        breadcrumbElement.focus();
      }
    });
  }

  /**
   * Handles focus events for items
   */
  function handleItemFocus(item: BreadcrumbItemType, index: number, event: FocusEvent): void {
    focusedIndex.value = index;
    emit("item-focus", item, index);
    
    // Announce focused item for screen readers
    if (options.announceNavigation) {
      const label = getLabel(item);
      const position = index + 1;
      const total = items.value?.length || 0;
      const status = isCurrentPage(item) ? "current page" : "link";
      screenReader.announcePolitely(
        `${label}, ${status}, ${position} of ${total}`
      );
    }
  }

  /**
   * Handles blur events for items
   */
  function handleItemBlur(item: BreadcrumbItemType, index: number, event: FocusEvent): void {
    emit("item-blur", item, index);
  }

  /**
   * Gets navigation history
   */
  function getNavigationHistory(): BreadcrumbItemType[] {
    return navigationHistory.value;
  }

  /**
   * Clears navigation history
   */
  function clearNavigationHistory(): void {
    navigationHistory.value = [];
  }

  /**
   * Checks if currently navigating
   */
  function getIsNavigating(): boolean {
    return isNavigating.value;
  }

  return {
    // State
    navigationHistory: computed(() => navigationHistory.value),
    isNavigating: computed(() => isNavigating.value),
    focusedIndex: computed(() => focusedIndex.value),

    // Methods
    getLabel,
    getValue,
    getUrl,
    isActive,
    isCurrentPage,
    navigateToItem,
    handleKeydown,
    handleItemFocus,
    handleItemBlur,
    moveFocus,
    getNavigationHistory,
    clearNavigationHistory,
    getIsNavigating,
  };
}