import { computed, ref, unref, watch } from 'vue';
import { useFloating, autoUpdate, flip, shift, offset as floatingOffset, arrow, hide, size } from '@floating-ui/vue';
import type { Ref, MaybeRefOrGetter, ComputedRef } from 'vue';
import type { Placement, Strategy, Middleware } from '@floating-ui/vue';

/**
 * Configuration options for useFloatingUI
 */
export interface UseFloatingUIOptions {
  /** Placement of the floating element relative to reference */
  placement?: MaybeRefOrGetter<Placement>;
  /** Positioning strategy */
  strategy?: MaybeRefOrGetter<Strategy>;
  /** Offset distance from reference element */
  offset?: MaybeRefOrGetter<number>;
  /** Whether to enable collision detection and flipping */
  flip?: boolean;
  /** Whether to shift element to stay in viewport */
  shift?: boolean;
  /** Padding from viewport edges */
  padding?: number;
  /** Whether to hide element when reference is hidden */
  autoHide?: boolean;
  /** Whether to auto-update position on scroll/resize */
  autoUpdate?: boolean;
  /** Custom middleware array */
  middleware?: MaybeRefOrGetter<Middleware[]>;
  /** Whether floating element should match reference width */
  sameWidth?: boolean;
  /** Maximum width for the floating element */
  maxWidth?: MaybeRefOrGetter<number>;
  /** Maximum height for the floating element */
  maxHeight?: MaybeRefOrGetter<number>;
}

/**
 * Return type for useFloatingUI composable
 */
export interface UseFloatingUIReturn {
  /** Reference to the reference element */
  reference: Ref<HTMLElement | null>;
  /** Reference to the floating element */
  floating: Ref<HTMLElement | null>;
  /** Reference to the arrow element (optional) */
  arrow: Ref<HTMLElement | null>;
  /** Computed styles for the floating element */
  floatingStyles: ComputedRef<Record<string, string>>;
  /** Computed styles for the arrow element */
  arrowStyles: ComputedRef<Record<string, string>>;
  /** Current placement of the floating element */
  placement: ComputedRef<Placement>;
  /** Whether the floating element should be hidden */
  isHidden: ComputedRef<boolean>;
  /** Manual position update function */
  update: () => Promise<void>;
  /** Cleanup function to stop auto-updates */
  cleanup: () => void;
}

/**
 * Composable for advanced floating element positioning using Floating UI
 * 
 * Provides collision detection, auto-placement, and responsive positioning
 * for dropdowns, tooltips, popovers, and other floating elements.
 * 
 * @param options - Configuration options for positioning behavior
 * @returns Reactive positioning utilities and styles
 * 
 * @example
 * ```typescript
 * const { 
 *   reference, 
 *   floating, 
 *   floatingStyles,
 *   placement 
 * } = useFloatingUI({
 *   placement: 'bottom-start',
 *   offset: 8,
 *   flip: true,
 *   shift: true
 * });
 * 
 * // In template:
 * // <button ref="reference">Trigger</button>
 * // <div ref="floating" :style="floatingStyles">Floating content</div>
 * ```
 */
export function useFloatingUI(options: UseFloatingUIOptions = {}): UseFloatingUIReturn {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    offset = 0,
    flip: enableFlip = true,
    shift: enableShift = true,
    padding = 8,
    autoHide = false,
    autoUpdate: enableAutoUpdate = true,
    middleware: customMiddleware,
    sameWidth = false,
    maxWidth,
    maxHeight
  } = options;

  // Element references
  const reference = ref<HTMLElement | null>(null);
  const floating = ref<HTMLElement | null>(null);
  const arrowElement = ref<HTMLElement | null>(null);

  // Build middleware array based on options
  const middleware = computed<Middleware[]>(() => {
    if (customMiddleware) {
      return unref(customMiddleware);
    }

    const middlewareArray: Middleware[] = [];

    // Add offset middleware
    const offsetValue = unref(offset);
    if (offsetValue) {
      middlewareArray.push(floatingOffset(offsetValue));
    }

    // Add flip middleware for collision detection
    if (enableFlip) {
      middlewareArray.push(flip({
        padding,
        fallbackPlacements: ['top', 'right', 'bottom', 'left'],
      }));
    }

    // Add shift middleware to stay in viewport
    if (enableShift) {
      middlewareArray.push(shift({ padding }));
    }

    // Add arrow middleware if arrow element exists
    if (arrowElement.value) {
      middlewareArray.push(arrow({ element: arrowElement }));
    }

    // Add hide middleware to detect when reference is hidden
    if (autoHide) {
      middlewareArray.push(hide());
    }

    // Add size middleware for responsive sizing
    middlewareArray.push(size({
      apply({ availableWidth, availableHeight, elements }) {
        const maxW = maxWidth ? unref(maxWidth) : availableWidth;
        const maxH = maxHeight ? unref(maxHeight) : availableHeight;
        
        Object.assign(elements.floating.style, {
          maxWidth: `${maxW}px`,
          maxHeight: `${maxH}px`,
          ...(sameWidth && { width: `${elements.reference.getBoundingClientRect().width}px` }),
        });
      },
    }));

    return middlewareArray;
  });

  // Use Floating UI with reactive options
  const {
    floatingStyles: baseFloatingStyles,
    placement: currentPlacement,
    middlewareData,
    update
  } = useFloating(reference, floating, {
    placement: computed(() => unref(placement)),
    strategy: computed(() => unref(strategy)),
    middleware,
    whileElementsMounted: enableAutoUpdate ? autoUpdate : undefined,
  });

  // Enhanced floating styles with z-index and other improvements
  const floatingStyles = computed<Record<string, string>>(() => ({
    ...baseFloatingStyles.value,
    zIndex: '1000',
    // Ensure visibility is controlled properly
    visibility: isHidden.value ? 'hidden' : 'visible',
  }));

  // Arrow styles computation
  const arrowStyles = computed<Record<string, string>>(() => {
    const { arrow: arrowData } = middlewareData.value;
    
    if (!arrowData) {
      return {};
    }

    const { x, y } = arrowData;
    const side = currentPlacement.value.split('-')[0];

    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[side];

    return {
      left: x != null ? `${x}px` : '',
      top: y != null ? `${y}px` : '',
      right: '',
      bottom: '',
      [staticSide!]: '-4px', // Half of arrow height/width
      position: 'absolute',
    };
  });

  // Hidden state computation
  const isHidden = computed<boolean>(() => {
    if (!autoHide) return false;
    
    const { hide: hideData } = middlewareData.value;
    return hideData?.hidden ?? false;
  });

  // Cleanup function
  let cleanupFn: (() => void) | null = null;

  const cleanup = () => {
    if (cleanupFn) {
      cleanupFn();
      cleanupFn = null;
    }
  };

  // Watch for arrow element changes to update middleware
  watch(arrowElement, () => {
    if (update) {
      update();
    }
  });

  return {
    reference,
    floating,
    arrow: arrowElement,
    floatingStyles,
    arrowStyles,
    placement: currentPlacement,
    isHidden,
    update: update || (() => Promise.resolve()),
    cleanup,
  };
}

/**
 * Preset configurations for common floating element use cases
 */
export const floatingPresets = {
  /** Tooltip configuration */
  tooltip: (options: Partial<UseFloatingUIOptions> = {}): UseFloatingUIOptions => ({
    placement: 'top',
    offset: 8,
    flip: true,
    shift: true,
    autoHide: true,
    strategy: 'absolute',
    ...options,
  }),

  /** Dropdown menu configuration */
  dropdown: (options: Partial<UseFloatingUIOptions> = {}): UseFloatingUIOptions => ({
    placement: 'bottom-start',
    offset: 4,
    flip: true,
    shift: true,
    sameWidth: true,
    strategy: 'absolute',
    ...options,
  }),

  /** Popover configuration */
  popover: (options: Partial<UseFloatingUIOptions> = {}): UseFloatingUIOptions => ({
    placement: 'bottom',
    offset: 8,
    flip: true,
    shift: true,
    autoHide: false,
    strategy: 'absolute',
    maxWidth: 320,
    ...options,
  }),

  /** Context menu configuration */
  contextMenu: (options: Partial<UseFloatingUIOptions> = {}): UseFloatingUIOptions => ({
    placement: 'bottom-start',
    offset: 0,
    flip: true,
    shift: true,
    strategy: 'fixed',
    ...options,
  }),

  /** Combobox/Select configuration */
  combobox: (options: Partial<UseFloatingUIOptions> = {}): UseFloatingUIOptions => ({
    placement: 'bottom-start',
    offset: 4,
    flip: true,
    shift: true,
    sameWidth: true,
    strategy: 'absolute',
    maxHeight: 200,
    ...options,
  }),
};

/**
 * Utility function to create floating elements with preset configurations
 * 
 * @param preset - Preset name or custom options
 * @param overrides - Additional options to override preset defaults
 * @returns useFloatingUI result with preset configuration
 * 
 * @example
 * ```typescript
 * const tooltip = createFloating('tooltip', { placement: 'right' });
 * const dropdown = createFloating('dropdown');
 * const custom = createFloating({ placement: 'top', offset: 16 });
 * ```
 */
export function createFloating(
  preset: keyof typeof floatingPresets | UseFloatingUIOptions,
  overrides: Partial<UseFloatingUIOptions> = {}
): UseFloatingUIReturn {
  const options = typeof preset === 'string' 
    ? floatingPresets[preset](overrides)
    : { ...preset, ...overrides };
    
  return useFloatingUI(options);
}

/**
 * Hook for managing floating element lifecycle with show/hide state
 * 
 * @param options - Floating UI options
 * @returns Extended floating utilities with show/hide management
 * 
 * @example
 * ```typescript
 * const {
 *   reference,
 *   floating,
 *   floatingStyles,
 *   isVisible,
 *   show,
 *   hide,
 *   toggle
 * } = useFloatingState({
 *   placement: 'bottom-start'
 * });
 * ```
 */
export function useFloatingState(options: UseFloatingUIOptions = {}) {
  const isVisible = ref(false);
  
  const floating = useFloatingUI({
    ...options,
    autoUpdate: computed(() => options.autoUpdate !== false && isVisible.value),
  });

  const show = () => {
    isVisible.value = true;
  };

  const hide = () => {
    isVisible.value = false;
  };

  const toggle = () => {
    isVisible.value = !isVisible.value;
  };

  // Enhanced styles that include visibility
  const floatingStyles = computed(() => ({
    ...floating.floatingStyles.value,
    display: isVisible.value ? 'block' : 'none',
  }));

  return {
    ...floating,
    floatingStyles,
    isVisible,
    show,
    hide,
    toggle,
  };
}