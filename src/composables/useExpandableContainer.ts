import { ref, computed, watch, nextTick } from 'vue';
import type { Ref } from 'vue';
import { useAriaAttributes, useScreenReader } from './index';
import type { 
  BExpandableContainerProps,
  BExpandableContainerEmits,
  ExpandableState,
  UseExpandableContainerReturn
} from '../components/BExpandableContainer/BExpandableContainer.types';

/**
 * Composable for managing expandable container accessibility and behavior
 * Implements ARIA disclosure pattern with comprehensive accessibility features
 */
export function useExpandableContainer(
  props: BExpandableContainerProps,
  emit: any
): UseExpandableContainerReturn {
  const { useAriaId, useExpandableAria, useBusyAria } = useAriaAttributes();
  const screenReader = useScreenReader();
  
  // State management
  const isExpanded = ref(props.modelValue || false);
  const isLoading = ref(props.loading || props.accessibility?.loading?.isLoading || false);
  const isAnimating = ref(false);
  
  // Generate unique IDs
  const ids = {
    trigger: useAriaId('expandable-trigger'),
    content: useAriaId('expandable-content'),
    region: useAriaId('expandable-region')
  };
  
  // DOM references
  const triggerRef = ref<HTMLElement | null>(null);
  const contentRef = ref<HTMLElement | null>(null);
  const containerRef = ref<HTMLElement | null>(null);
  
  // Component state
  const state: ExpandableState = {
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
  
  // Watch for model value changes
  watch(() => props.modelValue, (newValue) => {
    if (newValue !== undefined) {
      isExpanded.value = newValue;
    }
  });
  
  watch(isExpanded, (newValue) => {
    emit('update:modelValue', newValue, { source: 'programmatic' });
  });
  
  // ARIA attributes for trigger button
  const triggerAttrs = computed(() => {
    const expandableAttrs = useExpandableAria(isExpanded, ids.content);
    const busyAttrs = useBusyAria(isLoading);
    
    const baseAttrs: Record<string, any> = {
      id: ids.trigger,
      role: 'button',
      tabindex: props.disabled ? -1 : 0,
      'aria-label': props.ariaLabel || 
                   props.accessibility?.disclosure?.ariaLabel || 
                   'Toggle expandable content',
      'aria-disabled': props.disabled,
      ...expandableAttrs.value,
      ...busyAttrs.value
    };

    // Add description if provided
    if (props.accessibility?.disclosure?.ariaDescription) {
      baseAttrs['aria-describedby'] = `${ids.trigger}-description`;
    }

    return baseAttrs;
  });
  
  // ARIA attributes for content region
  const contentAttrs = computed(() => ({
    id: ids.content,
    role: 'region',
    'aria-labelledby': ids.trigger,
    'aria-hidden': !isExpanded.value,
    ...(props.accessibility?.disclosure?.regionLabel && {
      'aria-label': props.accessibility.disclosure.regionLabel
    })
  }));
  
  // Screen reader utilities
  const screenReaderUtils = {
    announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      if (props.accessibility?.disclosure?.disableAnnouncements) return;
      
      if (priority === 'assertive') {
        screenReader.announceAssertively(message);
      } else {
        screenReader.announcePolitely(message);
      }
    },
    
    announceExpanded: () => {
      const customMessage = props.accessibility?.disclosure?.expandAnnouncement;
      const label = props.ariaLabel || 'Content';
      const message = customMessage || `${label} expanded`;
      screenReaderUtils.announce(message);
    },
    
    announceCollapsed: () => {
      const customMessage = props.accessibility?.disclosure?.collapseAnnouncement;
      const label = props.ariaLabel || 'Content';
      const message = customMessage || `${label} collapsed`;
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
      const configDuration = props.accessibility?.animation?.duration || 250;
      return Math.min(Math.max(configDuration, 150), 1000);
    },
    
    shouldAnimate: (): boolean => {
      if (props.accessibility?.animation?.disableAnimations) return false;
      
      // Check for reduced motion preference
      if (props.accessibility?.animation?.respectReducedMotion || 
          props.accessibility?.disclosure?.respectReducedMotion) {
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
      const timingFunction = props.accessibility?.animation?.timingFunction || 'ease-in-out';
      
      return {
        'transition-duration': `${duration}ms`,
        'transition-timing-function': timingFunction,
        'transition-property': 'max-height, opacity, transform'
      };
    }
  };
  
  // Focus management
  function manageFocus(expanding: boolean): void {
    nextTick(() => {
      if (expanding && props.accessibility?.focus?.focusContentOnExpand) {
        // Find first focusable element in content
        const selector = props.accessibility.focus.focusableSelector || 
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusable = contentRef.value?.querySelector(selector) as HTMLElement;
        
        if (firstFocusable) {
          firstFocusable.focus();
        } else if (contentRef.value && contentRef.value.tabIndex >= 0) {
          contentRef.value.focus();
        }
      } else if (!expanding && props.accessibility?.focus?.focusTriggerOnCollapse) {
        triggerRef.value?.focus();
      }
    });
  }
  
  // Event handlers
  const handlers = {
    toggle: () => {
      if (props.disabled) return;
      
      const newValue = !isExpanded.value;
      isExpanded.value = newValue;
      
      if (newValue) {
        emit('expand-start', new Event('expand'));
        screenReaderUtils.announceExpanded();
        manageFocus(true);
        
        // Animation handling
        if (animationUtils.shouldAnimate()) {
          isAnimating.value = true;
          setTimeout(() => {
            isAnimating.value = false;
            emit('expand-end', new Event('expand'));
          }, animationUtils.getDuration());
        } else {
          emit('expand-end', new Event('expand'));
        }
      } else {
        emit('collapse-start', new Event('collapse'));
        screenReaderUtils.announceCollapsed();
        manageFocus(false);
        
        // Animation handling
        if (animationUtils.shouldAnimate()) {
          isAnimating.value = true;
          setTimeout(() => {
            isAnimating.value = false;
            emit('collapse-end', new Event('collapse'));
          }, animationUtils.getDuration());
        } else {
          emit('collapse-end', new Event('collapse'));
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
      if (props.disabled) return;
      
      const activationKeys = props.accessibility?.keyboard?.activationKeys || ['Enter', ' '];
      
      if (activationKeys.includes(event.key)) {
        const shouldPreventDefault = props.accessibility?.keyboard?.preventDefault !== false;
        if (shouldPreventDefault) {
          event.preventDefault();
        }
        
        emit('keyboard-activate', event);
        handlers.toggle();
      }
      
      // Call custom handler if provided
      if (props.accessibility?.keyboard?.onKeyDown) {
        props.accessibility.keyboard.onKeyDown(event);
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
    emit('loading-change', loading);
    
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