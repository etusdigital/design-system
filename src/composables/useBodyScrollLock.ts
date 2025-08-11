import { ref, computed, readonly, onBeforeUnmount } from 'vue';

/**
 * Body scroll lock state and configuration
 */
export interface BodyScrollLockState {
  /** Whether scroll is currently locked */
  isLocked: boolean;
  /** Original body overflow style */
  originalOverflow: string;
  /** Original body padding-right */
  originalPaddingRight: string;
  /** Scrollbar width compensation */
  scrollbarWidth: number;
  /** Stored scroll position */
  scrollPosition: { x: number; y: number };
}

/**
 * Body scroll lock configuration options
 */
export interface BodyScrollLockOptions {
  /** Whether to compensate for scrollbar width */
  compensateScrollbar?: boolean;
  /** Whether to preserve scroll position */
  preserveScrollPosition?: boolean;
  /** Whether to handle touch devices */
  handleTouch?: boolean;
  /** Whether to lock on iOS devices */
  lockOnIOS?: boolean;
}

/**
 * Default options for body scroll lock
 */
const DEFAULT_OPTIONS: Required<BodyScrollLockOptions> = {
  compensateScrollbar: true,
  preserveScrollPosition: true,
  handleTouch: true,
  lockOnIOS: true,
};

/**
 * Global state to track scroll lock across components
 */
const globalLockCount = ref(0);
const globalState = ref<BodyScrollLockState>({
  isLocked: false,
  originalOverflow: '',
  originalPaddingRight: '',
  scrollbarWidth: 0,
  scrollPosition: { x: 0, y: 0 },
});

/**
 * Detect if device is iOS
 */
function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}

/**
 * Get scrollbar width by creating temporary element
 */
function getScrollbarWidth(): number {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  
  outer.parentNode?.removeChild(outer);
  
  return scrollbarWidth;
}

/**
 * Store current scroll position
 */
function storeScrollPosition(): void {
  globalState.value.scrollPosition = {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  };
}

/**
 * Restore scroll position
 */
function restoreScrollPosition(): void {
  const { x, y } = globalState.value.scrollPosition;
  window.scrollTo(x, y);
}

/**
 * Prevent touch move on iOS to stop bounce scrolling
 */
function preventDefault(event: Event): void {
  event.preventDefault();
}

/**
 * Lock body scroll with scrollbar width compensation
 */
function lockBodyScroll(options: Required<BodyScrollLockOptions>): void {
  if (globalState.value.isLocked) return;

  const body = document.body;
  const documentElement = document.documentElement;

  // Store original values
  globalState.value.originalOverflow = body.style.overflow;
  globalState.value.originalPaddingRight = body.style.paddingRight;
  
  // Store scroll position if requested
  if (options.preserveScrollPosition) {
    storeScrollPosition();
  }

  // Calculate scrollbar width for compensation
  if (options.compensateScrollbar) {
    globalState.value.scrollbarWidth = getScrollbarWidth();
    
    // Only add padding if there's actually a scrollbar
    const hasScrollbar = documentElement.scrollHeight > documentElement.clientHeight;
    if (hasScrollbar && globalState.value.scrollbarWidth > 0) {
      const currentPadding = parseInt(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${currentPadding + globalState.value.scrollbarWidth}px`;
    }
  }

  // Lock scroll
  body.style.overflow = 'hidden';
  
  // Handle iOS touch devices
  if (options.handleTouch && options.lockOnIOS && isIOS()) {
    document.addEventListener('touchmove', preventDefault, { passive: false });
  }

  globalState.value.isLocked = true;
}

/**
 * Unlock body scroll and restore original state
 */
function unlockBodyScroll(options: Required<BodyScrollLockOptions>): void {
  if (!globalState.value.isLocked) return;

  const body = document.body;

  // Restore original styles
  body.style.overflow = globalState.value.originalOverflow;
  body.style.paddingRight = globalState.value.originalPaddingRight;

  // Remove iOS touch prevention
  if (options.handleTouch && options.lockOnIOS && isIOS()) {
    document.removeEventListener('touchmove', preventDefault);
  }

  // Restore scroll position if requested
  if (options.preserveScrollPosition) {
    restoreScrollPosition();
  }

  globalState.value.isLocked = false;
}

/**
 * Vue composable for managing body scroll lock
 * Uses reference counting to support nested dialogs/modals
 */
export function useBodyScrollLock(options: BodyScrollLockOptions = {}) {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const isActivated = ref(false);

  /**
   * Lock body scroll (increases reference count)
   */
  const lock = (): void => {
    if (isActivated.value) return;

    globalLockCount.value++;
    isActivated.value = true;

    // Only lock if this is the first lock request
    if (globalLockCount.value === 1) {
      lockBodyScroll(mergedOptions);
    }
  };

  /**
   * Unlock body scroll (decreases reference count)
   */
  const unlock = (): void => {
    if (!isActivated.value) return;

    globalLockCount.value = Math.max(0, globalLockCount.value - 1);
    isActivated.value = false;

    // Only unlock if this was the last lock request
    if (globalLockCount.value === 0) {
      unlockBodyScroll(mergedOptions);
    }
  };

  /**
   * Toggle scroll lock
   */
  const toggle = (shouldLock?: boolean): void => {
    const targetState = shouldLock ?? !isActivated.value;
    if (targetState) {
      lock();
    } else {
      unlock();
    }
  };

  /**
   * Force unlock (emergency unlock, ignores reference count)
   */
  const forceUnlock = (): void => {
    if (globalState.value.isLocked) {
      unlockBodyScroll(mergedOptions);
      globalLockCount.value = 0;
      isActivated.value = false;
    }
  };

  // Cleanup on unmount
  onBeforeUnmount(() => {
    if (isActivated.value) {
      unlock();
    }
  });

  return {
    // State
    isLocked: readonly(computed(() => globalState.value.isLocked)),
    isActivated: readonly(isActivated),
    lockCount: readonly(globalLockCount),
    
    // Methods
    lock,
    unlock,
    toggle,
    forceUnlock,
    
    // Utilities
    getScrollPosition: () => ({ ...globalState.value.scrollPosition }),
    getScrollbarWidth: () => globalState.value.scrollbarWidth,
  };
}

/**
 * Directive version for easy template usage
 */
export const vBodyScrollLock = {
  mounted(el: HTMLElement, binding: { value: boolean; modifiers: any }) {
    const scrollLock = useBodyScrollLock({
      compensateScrollbar: !binding.modifiers.noCompensate,
      preserveScrollPosition: !binding.modifiers.noPreserve,
      handleTouch: !binding.modifiers.noTouch,
      lockOnIOS: !binding.modifiers.noIOS,
    });

    // Store scroll lock instance on element
    (el as any).__scrollLock = scrollLock;

    if (binding.value) {
      scrollLock.lock();
    }
  },

  updated(el: HTMLElement, binding: { value: boolean }) {
    const scrollLock = (el as any).__scrollLock;
    if (!scrollLock) return;

    scrollLock.toggle(binding.value);
  },

  beforeUnmount(el: HTMLElement) {
    const scrollLock = (el as any).__scrollLock;
    if (scrollLock) {
      scrollLock.unlock();
      delete (el as any).__scrollLock;
    }
  },
};

/**
 * Global utility functions (for non-Vue usage)
 */
export const bodyScrollLock = {
  lock: (options?: BodyScrollLockOptions) => {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
    if (globalLockCount.value === 0) {
      lockBodyScroll(mergedOptions);
    }
    globalLockCount.value++;
  },

  unlock: (options?: BodyScrollLockOptions) => {
    globalLockCount.value = Math.max(0, globalLockCount.value - 1);
    if (globalLockCount.value === 0) {
      const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
      unlockBodyScroll(mergedOptions);
    }
  },

  isLocked: () => globalState.value.isLocked,
  getLockCount: () => globalLockCount.value,
};