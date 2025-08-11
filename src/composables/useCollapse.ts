import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import type { Ref } from 'vue';
import { useAriaAttributes, useScreenReader } from './index';
import type { 
  CollapseProps, 
  CollapseEmits, 
  CollapseState, 
  UseCollapseReturn,
  AccordionState 
} from '../components/BCollapse/BCollapse.types';

// Global accordion state management
const accordionStates = new Map<string, AccordionState>();

/**
 * Creates or gets accordion state
 */
function getAccordionState(accordionId: string): AccordionState {
  if (!accordionStates.has(accordionId)) {
    const instances = new Map<string, CollapseState>();
    const activeInstance = ref<string | null>(null);
    
    const state: AccordionState = {
      instances,
      activeInstance,
      register: (id: string, instance: CollapseState) => {
        instances.set(id, instance);
      },
      unregister: (id: string) => {
        instances.delete(id);
      },
      expand: (id: string) => {
        const instance = instances.get(id);
        if (instance) {
          instance.isExpanded.value = true;
          activeInstance.value = id;
        }
      },
      collapse: (id: string) => {
        const instance = instances.get(id);
        if (instance) {
          instance.isExpanded.value = false;
          if (activeInstance.value === id) {
            activeInstance.value = null;
          }
        }
      },
      toggle: (id: string) => {
        const instance = instances.get(id);
        if (!instance) return;
        
        if (instance.isExpanded.value) {
          state.collapse(id);
        } else {
          // For exclusive accordions, collapse others first
          const isExclusive = true; // This should come from config
          if (isExclusive && activeInstance.value && activeInstance.value !== id) {
            state.collapse(activeInstance.value);
          }
          state.expand(id);
        }
      }
    };
    
    accordionStates.set(accordionId, state);
  }
  
  return accordionStates.get(accordionId)!;
}

/**
 * Composable for managing collapse component accessibility and behavior
 */
export function useCollapse(
  props: CollapseProps,
  emit: (event: keyof CollapseEmits, ...args: any[]) => void
): UseCollapseReturn {
  const { useAriaId, useExpandableAria, useBusyAria } = useAriaAttributes();
  const screenReader = useScreenReader();
  
  // State management
  const isExpanded = ref(props.modelValue);
  const isLoading = ref(props.loading || props.accessibility?.loading?.isLoading || false);
  const isAnimating = ref(false);
  
  // Generate unique IDs
  const ids = {
    trigger: useAriaId('collapse-trigger'),
    content: useAriaId('collapse-content'),
    region: useAriaId('collapse-region')
  };
  
  // DOM references
  const triggerRef = ref<HTMLElement | null>(null);
  const contentRef = ref<HTMLElement | null>(null);
  const containerRef = ref<HTMLElement | null>(null);
  
  // Component state
  const state: CollapseState = {
    isExpanded,
    isLoading,
    isAnimating,
    ids,
    refs: {
      trigger: triggerRef,
      content: contentRef,
      container: containerRef
    }
  };
  
  // Accordion coordination
  let accordionState: AccordionState | null = null;
  if (props.accessibility?.accordion && props.accessibility.accordionId) {
    accordionState = getAccordionState(props.accessibility.accordionId);
    accordionState.register(ids.trigger, state);
  }
  
  // Clean up accordion registration
  onUnmounted(() => {
    if (accordionState) {
      accordionState.unregister(ids.trigger);
    }
  });
  
  // Watch for model value changes
  watch(() => props.modelValue, (newValue) => {
    isExpanded.value = newValue;
  });
  
  watch(isExpanded, (newValue) => {
    emit('update:modelValue', newValue);
  });
  
  // ARIA attributes for trigger button
  const triggerAttrs = computed(() => {
    const expandableAttrs = useExpandableAria(isExpanded, ids.content);
    const busyAttrs = useBusyAria(isLoading);
    
    return {
      id: ids.trigger,
      type: 'button',
      'aria-label': props.ariaLabel || props.accessibility?.ariaLabel || 'Toggle content',
      ...expandableAttrs.value,
      ...busyAttrs.value,
      ...(props.accessibility?.ariaDescription && {
        'aria-describedby': `${ids.trigger}-description`
      })
    };
  });
  
  // ARIA attributes for content region
  const contentAttrs = computed(() => ({
    id: ids.content,
    role: 'region',
    'aria-labelledby': ids.trigger,
    'aria-hidden': !isExpanded.value,
    ...(props.accessibility?.regionLabel && {
      'aria-label': props.accessibility.regionLabel
    })
  }));
  
  // Screen reader utilities
  const screenReaderUtils = {
    announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      if (props.accessibility?.disableAnnouncements) return;
      
      if (priority === 'assertive') {
        screenReader.announceAssertively(message);
      } else {
        screenReader.announcePolitely(message);
      }
    },
    
    announceExpanded: () => {
      const message = props.accessibility?.expandAnnouncement || 'Content expanded';
      screenReaderUtils.announce(message);
    },
    
    announceCollapsed: () => {
      const message = props.accessibility?.collapseAnnouncement || 'Content collapsed';
      screenReaderUtils.announce(message);
    },
    
    announceLoading: () => {
      const message = props.accessibility?.loading?.loadingText || 
                     props.loadingText || 
                     'Loading content';
      screenReaderUtils.announce(message);
    },
    
    announceLoaded: () => {
      const message = props.accessibility?.loading?.loadedText || 'Content loaded';
      screenReaderUtils.announce(message);
    }
  };
  
  // Animation utilities
  const animationUtils = {
    getDuration: (): number => {
      const configDuration = props.animation?.duration || props.duration || 150;
      return Math.min(Math.max(configDuration, 150), 1000);
    },
    
    shouldAnimate: (): boolean => {
      if (props.animation?.disableAnimations) return false;
      
      // Check for reduced motion preference
      if (props.animation?.respectReducedMotion || props.accessibility?.respectReducedMotion) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return false;
      }
      
      return true;
    },
    
    getTransitionStyle: (): Record<string, string> => {
      if (!animationUtils.shouldAnimate()) {
        return { transition: 'none' };
      }
      
      const duration = animationUtils.getDuration();
      const timingFunction = props.animation?.timingFunction || 'ease-in-out';
      
      return {
        'transition-duration': `${duration}ms`,
        'transition-timing-function': timingFunction,
        'transition-property': 'max-height, opacity'
      };
    }
  };
  
  // Focus management
  function manageFocus(expanding: boolean): void {
    nextTick(() => {
      if (expanding && props.focus?.focusContentOnExpand) {
        // Find first focusable element in content
        const selector = props.focus.focusableSelector || 
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusable = contentRef.value?.querySelector(selector) as HTMLElement;
        
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          contentRef.value?.focus();
        }
      } else if (!expanding && props.focus?.focusTriggerOnCollapse) {
        triggerRef.value?.focus();
      }
    });
  }
  
  // Event handlers
  const handlers = {
    toggle: () => {
      if (accordionState && props.accessibility?.accordion) {
        accordionState.toggle(ids.trigger);
      } else {
        const newValue = !isExpanded.value;
        isExpanded.value = newValue;
        
        if (newValue) {
          emit('expand-start', {} as Event);
          screenReaderUtils.announceExpanded();
          manageFocus(true);
        } else {
          emit('collapse-start', {} as Event);
          screenReaderUtils.announceCollapsed();
          manageFocus(false);
        }
      }
    },
    
    expand: () => {
      if (!isExpanded.value) {
        handlers.toggle();
      }
    },
    
    collapse: () => {
      if (isExpanded.value) {
        handlers.toggle();
      }
    },
    
    handleKeydown: (event: KeyboardEvent) => {
      const activationKeys = props.keyboard?.activationKeys || ['Enter', ' '];
      
      if (activationKeys.includes(event.key)) {
        const shouldPreventDefault = props.keyboard?.preventDefault !== false;
        if (shouldPreventDefault) {
          event.preventDefault();
        }
        
        emit('keyboard-activate', event);
        handlers.toggle();
      }
      
      // Call custom handler if provided
      if (props.keyboard?.onKeyDown) {
        props.keyboard.onKeyDown(event);
      }
    },
    
    handleFocus: (event: FocusEvent) => {
      emit('focus', event);
    },
    
    handleBlur: (event: FocusEvent) => {
      emit('blur', event);
    }
  };
  
  // Watch loading state changes
  watch(isLoading, (loading) => {
    if (loading) {
      screenReaderUtils.announceLoading();
    } else {
      screenReaderUtils.announceLoaded();
    }
  });
  
  // Watch for external loading prop changes
  watch(() => props.loading, (loading) => {
    if (loading !== undefined) {
      isLoading.value = loading;
    }
  });
  
  watch(() => props.accessibility?.loading?.isLoading, (loading) => {
    if (loading !== undefined) {
      isLoading.value = loading;
    }
  });
  
  return {
    state,
    triggerAttrs,
    contentAttrs,
    handlers,
    screenReader: screenReaderUtils,
    animation: animationUtils
  };
}

/**
 * Cleanup function for accordion states
 */
export function cleanupAccordionStates(): void {
  accordionStates.clear();
}