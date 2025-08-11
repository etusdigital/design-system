import { ref, nextTick, type Ref } from 'vue';
import { useScreenReader } from '#composables/useScreenReader';
import type { BreadcrumbItemType, MoreOptionsItem } from '#/components/BBreadcrumb/BBreadcrumb.types';

export interface UseBreadcrumbDropdownOptions {
  announceNavigation?: boolean;
  moreOptionsLabel?: string;
  disabled?: boolean;
}

export function useBreadcrumbDropdown(
  emit: (event: string, ...args: any[]) => void,
  options: UseBreadcrumbDropdownOptions = {}
) {
  const screenReader = useScreenReader();
  
  // Dropdown state
  const expanded = ref<boolean[]>([]);

  /**
   * Type guard to check if an item is a MoreOptionsItem
   */
  function isMoreOptionsItem(item: unknown): item is MoreOptionsItem {
    return typeof item === 'object' && 
           item !== null && 
           'icon' in item && 
           (item as MoreOptionsItem).icon === 'more_horiz';
  }

  /**
   * Gets ARIA attributes for more options button
   */
  function getMoreOptionsAriaAttributes(index: number, items: BreadcrumbItemType[]): Record<string, any> {
    return {
      'aria-label': `${options.moreOptionsLabel || 'Show more options'} (${items.length} items)`,
      'aria-expanded': expanded.value[index] || false,
      'aria-controls': `more-options-${index}`,
      'aria-haspopup': 'menu' as const,
      tabindex: options.disabled ? -1 : 0,
    };
  }

  /**
   * Enhanced keyboard navigation for more options button
   */
  function handleMoreOptionsKeydown(event: KeyboardEvent, index: number): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Space':
        event.preventDefault();
        showMoreItems(event as any, index);
        break;
      case 'Escape':
        event.preventDefault();
        closeMoreOptions(index);
        break;
      case 'ArrowDown':
        if (expanded.value[index]) {
          event.preventDefault();
          focusFirstMenuItem(index);
        }
        break;
    }
  }

  /**
   * Closes more options dropdown
   */
  function closeMoreOptions(index: number): void {
    expanded.value[index] = false;
    emit("more-options-close", index);
    
    if (options.announceNavigation) {
      screenReader.announcePolitely("Navigation options closed");
    }
  }

  /**
   * Focuses the first menu item in dropdown
   */
  function focusFirstMenuItem(index: number): void {
    nextTick(() => {
      const dropdown = document.querySelector(`#more-options-${index}`);
      if (dropdown) {
        const firstButton = dropdown.querySelector('button');
        if (firstButton) {
          (firstButton as HTMLElement).focus();
        }
      }
    });
  }

  /**
   * Enhanced dropdown menu handling for "more" items
   */
  async function showMoreItems(event: MouseEvent, index: number, parsedItems?: any[]): Promise<void> {
    if (options.disabled) return;

    expanded.value[index] = !expanded.value[index];
    
    if (!expanded.value[index]) {
      closeMoreOptions(index);
      return;
    }

    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Get the more options items
    if (parsedItems) {
      const moreItem = parsedItems[index] as MoreOptionsItem;
      if (isMoreOptionsItem(moreItem)) {
        emit("more-options-open", moreItem.items, index);
      }
    }

    await nextTick();

    const card = document.querySelector(
      `.more-options[data-index="${index}"]`
    ) as HTMLElement;
    if (!card) return;

    // Position the dropdown
    positionDropdown(card, rect, viewportHeight);

    // Announce dropdown opened
    if (options.announceNavigation && parsedItems) {
      const moreItem = parsedItems[index];
      const itemCount = isMoreOptionsItem(moreItem) ? moreItem.items.length : 0;
      screenReader.announcePolitely(
        `Navigation options opened, ${itemCount} items available`
      );
    }

    setupDropdownEventListeners(index, card, target);
  }

  /**
   * Positions the dropdown relative to the trigger element
   */
  function positionDropdown(card: HTMLElement, rect: DOMRect, viewportHeight: number): void {
    card.style.left = `${rect.left}px`;

    if (rect.bottom + card.offsetHeight > viewportHeight) {
      card.style.bottom = `${viewportHeight - rect.top}px`;
      card.style.top = 'auto';
    } else {
      card.style.top = `${rect.bottom}px`;
      card.style.bottom = 'auto';
    }
  }

  /**
   * Sets up event listeners for dropdown interaction
   */
  function setupDropdownEventListeners(index: number, card: HTMLElement, target: HTMLElement): void {
    const closeHandler = (e: MouseEvent | WheelEvent) => {
      const isScrollable = Math.abs(card.offsetHeight - card.scrollHeight) > 3;
      const isWheel = e.type === "wheel";
      const isCard = card.contains(e.target as Node);
      const shouldClose = isScrollable
        ? isWheel && !isCard
        : isWheel || !isCard;

      if (shouldClose) {
        closeMoreOptions(index);
        document.removeEventListener("click", closeHandler);
        document.removeEventListener("wheel", closeHandler);
      }
    };

    // Handle escape key for dropdown
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMoreOptions(index);
        document.removeEventListener("keydown", keyHandler);
        // Return focus to trigger button
        target.focus();
      }
    };

    setTimeout(() => {
      document.addEventListener("click", closeHandler);
      document.addEventListener("wheel", closeHandler);
      document.addEventListener("keydown", keyHandler);
    }, 200);
  }

  /**
   * Closes all open dropdowns
   */
  function closeAllDropdowns(): void {
    expanded.value = expanded.value.map(() => false);
  }

  /**
   * Gets the expanded state for a specific index
   */
  function isExpanded(index: number): boolean {
    return expanded.value[index] || false;
  }

  /**
   * Sets the expanded state for a specific index
   */
  function setExpanded(index: number, value: boolean): void {
    if (!expanded.value[index]) {
      // Initialize array if needed
      while (expanded.value.length <= index) {
        expanded.value.push(false);
      }
    }
    expanded.value[index] = value;
  }

  return {
    // State
    expanded,
    
    // Methods
    isMoreOptionsItem,
    getMoreOptionsAriaAttributes,
    handleMoreOptionsKeydown,
    showMoreItems,
    closeMoreOptions,
    closeAllDropdowns,
    isExpanded,
    setExpanded,
    focusFirstMenuItem,
  };
}