import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { Ref } from 'vue';

/**
 * Composable for managing focus trap within a container element.
 * Useful for modals, dialogs, and other overlay components.
 */
export function useFocusTrap(
  containerRef: Ref<HTMLElement | null>,
  isActive: Ref<boolean>
) {
  const previouslyFocusedElement = ref<HTMLElement | null>(null);

  const focusableSelectors = [
    'button',
    '[href]',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]',
  ].join(',');

  /**
   * Gets all focusable elements within the container
   */
  function getFocusableElements(): HTMLElement[] {
    if (!containerRef.value) return [];
    
    const elements = Array.from(
      containerRef.value.querySelectorAll<HTMLElement>(focusableSelectors)
    );
    
    return elements.filter(element => 
      !element.hasAttribute('disabled') &&
      element.tabIndex >= 0 &&
      element.offsetParent !== null
    );
  }

  /**
   * Focuses the first focusable element
   */
  function focusFirstElement(): void {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  /**
   * Focuses the last focusable element
   */
  function focusLastElement(): void {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    }
  }

  /**
   * Handles Tab key navigation within the trap
   */
  function handleTabKey(event: KeyboardEvent): void {
    if (!isActive.value || !containerRef.value) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    if (event.shiftKey) {
      // Shift + Tab: move backwards
      if (activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: move forwards
      if (activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Handles keydown events for the focus trap
   */
  function handleKeydown(event: KeyboardEvent): void {
    if (!isActive.value) return;

    if (event.key === 'Tab') {
      handleTabKey(event);
    }
  }

  /**
   * Activates the focus trap
   */
  function activate(): void {
    // Store the currently focused element to restore later
    previouslyFocusedElement.value = document.activeElement as HTMLElement;
    
    // Focus the first focusable element in the container
    focusFirstElement();
  }

  /**
   * Deactivates the focus trap
   */
  function deactivate(): void {
    // Restore focus to the previously focused element
    if (previouslyFocusedElement.value) {
      previouslyFocusedElement.value.focus();
      previouslyFocusedElement.value = null;
    }
  }

  // Watch for changes in the active state
  watch(isActive, (newValue) => {
    if (newValue) {
      activate();
    } else {
      deactivate();
    }
  });

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
    
    // If initially active, activate the trap
    if (isActive.value) {
      activate();
    }
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
    
    // Ensure focus is restored when component is unmounted
    if (isActive.value) {
      deactivate();
    }
  });

  return {
    focusFirstElement,
    focusLastElement,
    activate,
    deactivate,
  };
}