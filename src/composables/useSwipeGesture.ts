import { ref, computed, readonly, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';

/**
 * Swipe direction enumeration
 */
export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

/**
 * Swipe gesture configuration
 */
export interface SwipeConfig {
  /** Minimum distance to register a swipe (px) */
  threshold: number;
  /** Maximum time for a swipe gesture (ms) */
  timeout: number;
  /** Whether to prevent default touch behavior */
  preventDefault: boolean;
  /** Whether to register passive event listeners */
  passive: boolean;
  /** Velocity threshold for swipe detection */
  velocityThreshold: number;
}

/**
 * Swipe gesture data
 */
export interface SwipeGestureData {
  /** Start position */
  startX: number;
  startY: number;
  /** End position */
  endX: number;
  endY: number;
  /** Total distance */
  distance: number;
  /** Swipe direction */
  direction: SwipeDirection;
  /** Gesture duration */
  duration: number;
  /** Swipe velocity */
  velocity: number;
  /** Whether gesture meets thresholds */
  isValid: boolean;
}

/**
 * Swipe event handlers
 */
export interface SwipeHandlers {
  /** Called when swipe starts */
  onSwipeStart?: (event: TouchEvent | MouseEvent) => void;
  /** Called during swipe movement */
  onSwipeMove?: (event: TouchEvent | MouseEvent, data: Partial<SwipeGestureData>) => void;
  /** Called when swipe ends */
  onSwipeEnd?: (event: TouchEvent | MouseEvent, data: SwipeGestureData) => void;
  /** Called when swipe is detected */
  onSwipe?: (direction: SwipeDirection, data: SwipeGestureData) => void;
  /** Direction-specific handlers */
  onSwipeLeft?: (data: SwipeGestureData) => void;
  onSwipeRight?: (data: SwipeGestureData) => void;
  onSwipeUp?: (data: SwipeGestureData) => void;
  onSwipeDown?: (data: SwipeGestureData) => void;
}

/**
 * Default swipe configuration
 */
const DEFAULT_CONFIG: SwipeConfig = {
  threshold: 50, // 50px minimum swipe distance
  timeout: 300, // 300ms maximum swipe time
  preventDefault: true,
  passive: false,
  velocityThreshold: 0.3, // pixels per millisecond
};

/**
 * Touch/mouse position helper
 */
function getEventPosition(event: TouchEvent | MouseEvent): { x: number; y: number } {
  if ('touches' in event) {
    const touch = event.touches[0] || event.changedTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  return { x: event.clientX, y: event.clientY };
}

/**
 * Calculate swipe direction based on delta values
 */
function calculateDirection(deltaX: number, deltaY: number): SwipeDirection {
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);

  if (absDeltaX > absDeltaY) {
    return deltaX > 0 ? 'right' : 'left';
  } else {
    return deltaY > 0 ? 'down' : 'up';
  }
}

/**
 * Calculate distance between two points
 */
function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

/**
 * Vue composable for handling swipe gestures
 * Supports both touch and mouse events for cross-device compatibility
 */
export function useSwipeGesture(
  target: Ref<HTMLElement | null>,
  handlers: SwipeHandlers = {},
  config: Partial<SwipeConfig> = {}
) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Gesture state
  const isTracking = ref(false);
  const startTime = ref(0);
  const startPosition = ref({ x: 0, y: 0 });
  const currentPosition = ref({ x: 0, y: 0 });
  const lastSwipeDirection = ref<SwipeDirection | null>(null);
  
  // Event handlers
  const handleStart = (event: TouchEvent | MouseEvent): void => {
    if (!target.value) return;
    
    const position = getEventPosition(event);
    
    isTracking.value = true;
    startTime.value = Date.now();
    startPosition.value = position;
    currentPosition.value = position;
    
    // Prevent default if configured
    if (mergedConfig.preventDefault && !mergedConfig.passive) {
      event.preventDefault();
    }
    
    // Call start handler
    handlers.onSwipeStart?.(event);
  };
  
  const handleMove = (event: TouchEvent | MouseEvent): void => {
    if (!isTracking.value || !target.value) return;
    
    const position = getEventPosition(event);
    currentPosition.value = position;
    
    // Create partial gesture data for move handler
    const deltaX = position.x - startPosition.value.x;
    const deltaY = position.y - startPosition.value.y;
    const distance = calculateDistance(
      startPosition.value.x,
      startPosition.value.y,
      position.x,
      position.y
    );
    const direction = calculateDirection(deltaX, deltaY);
    
    const partialData: Partial<SwipeGestureData> = {
      startX: startPosition.value.x,
      startY: startPosition.value.y,
      endX: position.x,
      endY: position.y,
      distance,
      direction,
    };
    
    // Prevent default if configured
    if (mergedConfig.preventDefault && !mergedConfig.passive) {
      event.preventDefault();
    }
    
    // Call move handler
    handlers.onSwipeMove?.(event, partialData);
  };
  
  const handleEnd = (event: TouchEvent | MouseEvent): void => {
    if (!isTracking.value || !target.value) return;
    
    const endTime = Date.now();
    const endPosition = getEventPosition(event);
    const duration = endTime - startTime.value;
    
    const deltaX = endPosition.x - startPosition.value.x;
    const deltaY = endPosition.y - startPosition.value.y;
    const distance = calculateDistance(
      startPosition.value.x,
      startPosition.value.y,
      endPosition.x,
      endPosition.y
    );
    const direction = calculateDirection(deltaX, deltaY);
    const velocity = duration > 0 ? distance / duration : 0;
    
    // Create complete gesture data
    const gestureData: SwipeGestureData = {
      startX: startPosition.value.x,
      startY: startPosition.value.y,
      endX: endPosition.x,
      endY: endPosition.y,
      distance,
      direction,
      duration,
      velocity,
      isValid: distance >= mergedConfig.threshold && 
               duration <= mergedConfig.timeout &&
               velocity >= mergedConfig.velocityThreshold,
    };
    
    // Reset tracking state
    isTracking.value = false;
    
    // Call end handler
    handlers.onSwipeEnd?.(event, gestureData);
    
    // If gesture is valid, call swipe handlers
    if (gestureData.isValid) {
      lastSwipeDirection.value = direction;
      
      // Call general swipe handler
      handlers.onSwipe?.(direction, gestureData);
      
      // Call direction-specific handlers
      switch (direction) {
        case 'left':
          handlers.onSwipeLeft?.(gestureData);
          break;
        case 'right':
          handlers.onSwipeRight?.(gestureData);
          break;
        case 'up':
          handlers.onSwipeUp?.(gestureData);
          break;
        case 'down':
          handlers.onSwipeDown?.(gestureData);
          break;
      }
    }
  };
  
  // Set up event listeners
  const setupEventListeners = (): void => {
    if (!target.value) return;
    
    const element = target.value;
    const options = { passive: mergedConfig.passive };
    
    // Touch events
    element.addEventListener('touchstart', handleStart as EventListener, options);
    element.addEventListener('touchmove', handleMove as EventListener, options);
    element.addEventListener('touchend', handleEnd as EventListener, options);
    element.addEventListener('touchcancel', handleEnd as EventListener, options);
    
    // Mouse events for desktop support
    element.addEventListener('mousedown', handleStart as EventListener, options);
    document.addEventListener('mousemove', handleMove as EventListener, options);
    document.addEventListener('mouseup', handleEnd as EventListener, options);
  };
  
  // Clean up event listeners
  const cleanupEventListeners = (): void => {
    if (!target.value) return;
    
    const element = target.value;
    
    // Touch events
    element.removeEventListener('touchstart', handleStart as EventListener);
    element.removeEventListener('touchmove', handleMove as EventListener);
    element.removeEventListener('touchend', handleEnd as EventListener);
    element.removeEventListener('touchcancel', handleEnd as EventListener);
    
    // Mouse events
    element.removeEventListener('mousedown', handleStart as EventListener);
    document.removeEventListener('mousemove', handleMove as EventListener);
    document.removeEventListener('mouseup', handleEnd as EventListener);
  };
  
  // Lifecycle
  onMounted(() => {
    setupEventListeners();
  });
  
  onBeforeUnmount(() => {
    cleanupEventListeners();
  });
  
  // Manual setup/cleanup methods
  const enable = (): void => {
    cleanupEventListeners();
    setupEventListeners();
  };
  
  const disable = (): void => {
    cleanupEventListeners();
  };
  
  return {
    // State
    isTracking: readonly(isTracking),
    lastSwipeDirection: readonly(lastSwipeDirection),
    
    // Methods
    enable,
    disable,
    
    // Computed properties
    isSwipeActive: computed(() => isTracking.value),
    currentDistance: computed(() => {
      if (!isTracking.value) return 0;
      return calculateDistance(
        startPosition.value.x,
        startPosition.value.y,
        currentPosition.value.x,
        currentPosition.value.y
      );
    }),
  };
}

/**
 * Specialized swipe composable for toast dismissal
 * Pre-configured for optimal toast dismissal UX
 */
export function useToastSwipe(
  target: Ref<HTMLElement | null>,
  onDismiss: (direction: SwipeDirection) => void,
  options: {
    /** Which directions should trigger dismiss */
    dismissDirections?: SwipeDirection[];
    /** Custom threshold for toast dismissal */
    dismissThreshold?: number;
    /** Whether to show visual feedback during swipe */
    showFeedback?: boolean;
  } = {}
) {
  const {
    dismissDirections = ['left', 'right'],
    dismissThreshold = 100,
    showFeedback = true,
  } = options;
  
  // Visual feedback state
  const swipeOffset = ref(0);
  const swipeOpacity = ref(1);
  const isDismissing = ref(false);
  
  const swipeConfig: Partial<SwipeConfig> = {
    threshold: dismissThreshold,
    timeout: 500, // Longer timeout for toast swipes
    velocityThreshold: 0.2, // Lower velocity threshold
  };
  
  const handlers: SwipeHandlers = {
    onSwipeMove: (_event, data) => {
      if (!showFeedback || !data.distance || !data.direction) return;
      
      // Only show feedback for dismiss directions
      if (!dismissDirections.includes(data.direction)) return;
      
      // Calculate visual feedback
      const progress = Math.min(data.distance / dismissThreshold, 1);
      
      if (data.direction === 'left') {
        swipeOffset.value = -data.distance;
      } else if (data.direction === 'right') {
        swipeOffset.value = data.distance;
      }
      
      swipeOpacity.value = 1 - (progress * 0.7); // Fade to 30% opacity
    },
    
    onSwipeEnd: (_event, data) => {
      if (data.isValid && dismissDirections.includes(data.direction)) {
        // Trigger dismissal
        isDismissing.value = true;
        onDismiss(data.direction);
      } else {
        // Reset visual feedback
        swipeOffset.value = 0;
        swipeOpacity.value = 1;
      }
    },
    
    onSwipe: (direction, data) => {
      if (dismissDirections.includes(direction)) {
        onDismiss(direction);
      }
    },
  };
  
  const swipeGesture = useSwipeGesture(target, handlers, swipeConfig);
  
  // Reset visual state
  const resetVisuals = (): void => {
    swipeOffset.value = 0;
    swipeOpacity.value = 1;
    isDismissing.value = false;
  };
  
  return {
    ...swipeGesture,
    
    // Visual feedback state
    swipeOffset: readonly(swipeOffset),
    swipeOpacity: readonly(swipeOpacity),
    isDismissing: readonly(isDismissing),
    
    // Methods
    resetVisuals,
  };
}