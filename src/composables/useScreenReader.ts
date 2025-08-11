import { onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';

export type AnnouncementPoliteness = 'polite' | 'assertive';

/**
 * Composable for managing screen reader announcements and live regions
 */
export function useScreenReader() {
  const announcer = ref<HTMLElement | null>(null);

  /**
   * Creates a live region element for screen reader announcements
   */
  function createAnnouncer(politeness: AnnouncementPoliteness = 'polite'): HTMLElement {
    if (typeof window === 'undefined') {
      // Return a mock element for SSR
      return document.createElement('div');
    }

    const element = document.createElement('div');
    element.setAttribute('aria-live', politeness);
    element.setAttribute('aria-atomic', 'true');
    element.setAttribute('aria-relevant', 'text');
    element.style.position = 'absolute';
    element.style.left = '-10000px';
    element.style.width = '1px';
    element.style.height = '1px';
    element.style.overflow = 'hidden';
    element.style.clip = 'rect(0, 0, 0, 0)';
    element.style.clipPath = 'inset(50%)';
    element.style.whiteSpace = 'nowrap';

    document.body.appendChild(element);
    return element;
  }

  /**
   * Announces a message to screen readers
   */
  function announce(
    message: string,
    politeness: AnnouncementPoliteness = 'polite'
  ): void {
    if (typeof window === 'undefined' || !message.trim()) return;

    // Create announcer if it doesn't exist or politeness changed
    if (!announcer.value || announcer.value.getAttribute('aria-live') !== politeness) {
      // Clean up existing announcer
      if (announcer.value && announcer.value.parentNode) {
        announcer.value.parentNode.removeChild(announcer.value);
      }
      announcer.value = createAnnouncer(politeness);
    }

    // Clear and set the message with a small delay to ensure screen readers pick it up
    announcer.value.textContent = '';
    setTimeout(() => {
      if (announcer.value) {
        announcer.value.textContent = message;
      }
    }, 100);
  }

  /**
   * Announces a message politely (non-interrupting)
   */
  function announcePolitely(message: string): void {
    announce(message, 'polite');
  }

  /**
   * Announces a message assertively (interrupting current speech)
   */
  function announceAssertively(message: string): void {
    announce(message, 'assertive');
  }

  /**
   * Creates a live region ref that can be used in templates
   */
  function useLiveRegion(politeness: AnnouncementPoliteness = 'polite'): {
    liveRegion: Ref<HTMLElement | null>;
    updateLiveRegion: (message: string) => void;
  } {
    const liveRegion = ref<HTMLElement | null>(null);

    const updateLiveRegion = (message: string): void => {
      if (!liveRegion.value) return;

      // Clear and set with delay for screen reader pickup
      liveRegion.value.textContent = '';
      setTimeout(() => {
        if (liveRegion.value) {
          liveRegion.value.textContent = message;
        }
      }, 100);
    };

    return {
      liveRegion,
      updateLiveRegion,
    };
  }

  /**
   * Clean up announcer on unmount
   */
  onUnmounted(() => {
    if (announcer.value && announcer.value.parentNode) {
      announcer.value.parentNode.removeChild(announcer.value);
    }
  });

  return {
    announce,
    announcePolitely,
    announceAssertively,
    useLiveRegion,
  };
}

/**
 * Singleton instance for global announcements
 */
let globalScreenReader: ReturnType<typeof useScreenReader> | null = null;

/**
 * Gets or creates a global screen reader instance
 */
export function getGlobalScreenReader(): ReturnType<typeof useScreenReader> {
  if (!globalScreenReader) {
    globalScreenReader = useScreenReader();
  }
  return globalScreenReader;
}

/**
 * Utility functions for common announcement patterns
 */
export const screenReaderUtils = {
  /**
   * Announces form validation errors
   */
  announceError(fieldName: string, error: string): void {
    getGlobalScreenReader().announceAssertively(
      `Error in ${fieldName}: ${error}`
    );
  },

  /**
   * Announces successful actions
   */
  announceSuccess(message: string): void {
    getGlobalScreenReader().announcePolitely(message);
  },

  /**
   * Announces loading states
   */
  announceLoading(message: string = 'Loading'): void {
    getGlobalScreenReader().announcePolitely(message);
  },

  /**
   * Announces completion of loading
   */
  announceLoaded(message: string = 'Content loaded'): void {
    getGlobalScreenReader().announcePolitely(message);
  },

  /**
   * Announces navigation changes
   */
  announceNavigation(destination: string): void {
    getGlobalScreenReader().announcePolitely(
      `Navigated to ${destination}`
    );
  },

  /**
   * Announces selection changes
   */
  announceSelection(selectedItem: string, position?: number, total?: number): void {
    const positionText = position && total 
      ? ` ${position} of ${total}` 
      : '';
    getGlobalScreenReader().announcePolitely(
      `Selected ${selectedItem}${positionText}`
    );
  },
};

/**
 * Announce selection change utility - for backwards compatibility
 */
export function announceSelection(selectedItem: string, position?: number, total?: number): void {
  screenReaderUtils.announceSelection(selectedItem, position, total);
}