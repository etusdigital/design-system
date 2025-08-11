import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import type { Ref } from 'vue';

export interface TouchPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export interface GestureState {
  scale: number;
  rotation: number;
  panX: number;
  panY: number;
  centerX: number;
  centerY: number;
  isActive: boolean;
  gestureType: 'none' | 'pan' | 'pinch' | 'rotate' | 'multi';
}

export interface TouchGestureOptions {
  /** Minimum scale factor */
  minScale?: number;
  /** Maximum scale factor */
  maxScale?: number;
  /** Enable pinch-to-zoom gesture */
  enablePinch?: boolean;
  /** Enable rotation gesture */
  enableRotation?: boolean;
  /** Enable panning gesture */
  enablePan?: boolean;
  /** Minimum distance for gesture recognition */
  minimumDistance?: number;
  /** Velocity threshold for momentum */
  velocityThreshold?: number;
  /** Enable momentum scrolling */
  enableMomentum?: boolean;
  /** Friction factor for momentum (0-1) */
  momentumFriction?: number;
  /** Enable boundary constraints */
  constrainToBounds?: boolean;
}

export interface GestureCallbacks {
  onGestureStart?: (state: GestureState) => void;
  onGestureMove?: (state: GestureState, delta: { x: number; y: number; scale: number; rotation: number }) => void;
  onGestureEnd?: (state: GestureState) => void;
  onPinch?: (scale: number, center: { x: number; y: number }) => void;
  onRotate?: (rotation: number, center: { x: number; y: number }) => void;
  onPan?: (delta: { x: number; y: number }) => void;
}

const DEFAULT_OPTIONS: Required<TouchGestureOptions> = {
  minScale: 0.5,
  maxScale: 5.0,
  enablePinch: true,
  enableRotation: false,
  enablePan: true,
  minimumDistance: 10,
  velocityThreshold: 0.3,
  enableMomentum: true,
  momentumFriction: 0.95,
  constrainToBounds: true
};

export function useTouchGestures(
  element: Ref<HTMLElement | null>,
  options: TouchGestureOptions = {},
  callbacks: GestureCallbacks = {}
) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Touch tracking state
  const activeTouches = ref<Map<number, TouchPoint>>(new Map());
  const gestureState = ref<GestureState>({
    scale: 1,
    rotation: 0,
    panX: 0,
    panY: 0,
    centerX: 0,
    centerY: 0,
    isActive: false,
    gestureType: 'none'
  });
  
  // Previous gesture state for delta calculations
  const prevState = ref<Partial<GestureState>>({});
  
  // Momentum state
  const momentum = ref({
    velocityX: 0,
    velocityY: 0,
    isAnimating: false,
    animationId: null as number | null
  });
  
  // Helper functions
  const getTouchPoint = (touch: Touch): TouchPoint => ({
    id: touch.identifier,
    x: touch.clientX,
    y: touch.clientY,
    timestamp: Date.now()
  });
  
  const getDistance = (p1: TouchPoint, p2: TouchPoint): number => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };
  
  const getAngle = (p1: TouchPoint, p2: TouchPoint): number => {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  };
  
  const getCenter = (touches: TouchPoint[]): { x: number; y: number } => {
    const x = touches.reduce((sum, touch) => sum + touch.x, 0) / touches.length;
    const y = touches.reduce((sum, touch) => sum + touch.y, 0) / touches.length;
    return { x, y };
  };
  
  // Calculate gesture state from active touches
  const calculateGestureState = (): GestureState => {
    const touches = Array.from(activeTouches.value.values());
    const touchCount = touches.length;
    
    if (touchCount === 0) {
      return {
        ...gestureState.value,
        isActive: false,
        gestureType: 'none'
      };
    }
    
    const center = getCenter(touches);
    const newState: GestureState = {
      scale: gestureState.value.scale,
      rotation: gestureState.value.rotation,
      panX: gestureState.value.panX,
      panY: gestureState.value.panY,
      centerX: center.x,
      centerY: center.y,
      isActive: true,
      gestureType: 'pan'
    };
    
    if (touchCount === 1) {
      // Single touch - panning
      newState.gestureType = 'pan';
    } else if (touchCount === 2) {
      // Two touches - pinch/zoom and rotation
      const [touch1, touch2] = touches;
      const distance = getDistance(touch1, touch2);
      const angle = getAngle(touch1, touch2);
      
      if (opts.enablePinch) {
        // Calculate scale change
        const initialDistance = gestureState.value.scale > 0 ? distance / gestureState.value.scale : distance;
        newState.scale = Math.max(opts.minScale, Math.min(opts.maxScale, distance / (initialDistance || distance)));
        newState.gestureType = 'pinch';
      }
      
      if (opts.enableRotation) {
        newState.rotation = angle;
        newState.gestureType = newState.gestureType === 'pinch' ? 'multi' : 'rotate';
      }
    } else {
      // Multi-touch
      newState.gestureType = 'multi';
    }
    
    return newState;
  };
  
  // Calculate velocity for momentum
  const calculateVelocity = (current: TouchPoint, previous: TouchPoint): { x: number; y: number } => {
    const deltaTime = current.timestamp - previous.timestamp;
    if (deltaTime === 0) return { x: 0, y: 0 };
    
    return {
      x: (current.x - previous.x) / deltaTime,
      y: (current.y - previous.y) / deltaTime
    };
  };
  
  // Start momentum animation
  const startMomentum = (velocityX: number, velocityY: number) => {
    if (!opts.enableMomentum) return;
    
    momentum.value.velocityX = velocityX;
    momentum.value.velocityY = velocityY;
    momentum.value.isAnimating = true;
    
    const animate = () => {
      if (!momentum.value.isAnimating) return;
      
      // Apply friction
      momentum.value.velocityX *= opts.momentumFriction;
      momentum.value.velocityY *= opts.momentumFriction;
      
      // Stop if velocity is too low
      if (Math.abs(momentum.value.velocityX) < 0.01 && Math.abs(momentum.value.velocityY) < 0.01) {
        momentum.value.isAnimating = false;
        return;
      }
      
      // Apply momentum to pan
      gestureState.value.panX += momentum.value.velocityX * 16; // Assume 60fps
      gestureState.value.panY += momentum.value.velocityY * 16;
      
      // Constrain to bounds if enabled
      if (opts.constrainToBounds && element.value) {
        const rect = element.value.getBoundingClientRect();
        gestureState.value.panX = Math.max(-rect.width * 0.5, Math.min(rect.width * 0.5, gestureState.value.panX));
        gestureState.value.panY = Math.max(-rect.height * 0.5, Math.min(rect.height * 0.5, gestureState.value.panY));
      }
      
      // Trigger callback
      callbacks.onPan?.({ x: momentum.value.velocityX * 16, y: momentum.value.velocityY * 16 });
      
      momentum.value.animationId = requestAnimationFrame(animate);
    };
    
    momentum.value.animationId = requestAnimationFrame(animate);
  };
  
  // Stop momentum animation
  const stopMomentum = () => {
    momentum.value.isAnimating = false;
    if (momentum.value.animationId) {
      cancelAnimationFrame(momentum.value.animationId);
      momentum.value.animationId = null;
    }
  };
  
  // Touch event handlers
  const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault();
    
    // Stop any momentum animation
    stopMomentum();
    
    // Add new touches
    for (const touch of event.changedTouches) {
      const touchPoint = getTouchPoint(touch);
      activeTouches.value.set(touch.identifier, touchPoint);
    }
    
    // Update gesture state
    const newState = calculateGestureState();
    
    // Store initial values for relative calculations
    if (!gestureState.value.isActive) {
      prevState.value = { ...gestureState.value };
    }
    
    gestureState.value = newState;
    callbacks.onGestureStart?.(newState);
  };
  
  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    
    if (activeTouches.value.size === 0) return;
    
    // Update touch positions
    for (const touch of event.changedTouches) {
      if (activeTouches.value.has(touch.identifier)) {
        const touchPoint = getTouchPoint(touch);
        activeTouches.value.set(touch.identifier, touchPoint);
      }
    }
    
    const newState = calculateGestureState();
    
    // Calculate deltas
    const deltaX = newState.centerX - gestureState.value.centerX;
    const deltaY = newState.centerY - gestureState.value.centerY;
    const deltaScale = newState.scale / gestureState.value.scale;
    const deltaRotation = newState.rotation - gestureState.value.rotation;
    
    // Update pan position for single touch
    if (activeTouches.value.size === 1 && opts.enablePan) {
      gestureState.value.panX += deltaX;
      gestureState.value.panY += deltaY;
      newState.panX = gestureState.value.panX;
      newState.panY = gestureState.value.panY;
      
      callbacks.onPan?.({ x: deltaX, y: deltaY });
    }
    
    // Handle pinch gesture
    if (activeTouches.value.size === 2 && opts.enablePinch && deltaScale !== 1) {
      callbacks.onPinch?.(newState.scale, { x: newState.centerX, y: newState.centerY });
    }
    
    // Handle rotation gesture
    if (activeTouches.value.size === 2 && opts.enableRotation && Math.abs(deltaRotation) > 0.01) {
      callbacks.onRotate?.(deltaRotation, { x: newState.centerX, y: newState.centerY });
    }
    
    gestureState.value = newState;
    
    callbacks.onGestureMove?.(newState, {
      x: deltaX,
      y: deltaY,
      scale: deltaScale,
      rotation: deltaRotation
    });
  };
  
  const handleTouchEnd = (event: TouchEvent) => {
    // Calculate velocity for momentum before removing touches
    let velocityX = 0, velocityY = 0;
    
    if (opts.enableMomentum && activeTouches.value.size === 1) {
      const touch = event.changedTouches[0];
      const currentTouch = activeTouches.value.get(touch.identifier);
      if (currentTouch) {
        const newTouch = getTouchPoint(touch);
        const velocity = calculateVelocity(newTouch, currentTouch);
        velocityX = velocity.x;
        velocityY = velocity.y;
      }
    }
    
    // Remove ended touches
    for (const touch of event.changedTouches) {
      activeTouches.value.delete(touch.identifier);
    }
    
    const newState = calculateGestureState();
    gestureState.value = newState;
    
    // Start momentum if gesture ended and velocity is high enough
    if (activeTouches.value.size === 0 && 
        opts.enableMomentum && 
        (Math.abs(velocityX) > opts.velocityThreshold || Math.abs(velocityY) > opts.velocityThreshold)) {
      startMomentum(velocityX, velocityY);
    }
    
    callbacks.onGestureEnd?.(newState);
  };
  
  const handleTouchCancel = (event: TouchEvent) => {
    // Remove all touches on cancel
    for (const touch of event.changedTouches) {
      activeTouches.value.delete(touch.identifier);
    }
    
    gestureState.value = {
      scale: 1,
      rotation: 0,
      panX: 0,
      panY: 0,
      centerX: 0,
      centerY: 0,
      isActive: false,
      gestureType: 'none'
    };
    
    stopMomentum();
    callbacks.onGestureEnd?.(gestureState.value);
  };
  
  // Reset gesture state
  const reset = () => {
    activeTouches.value.clear();
    stopMomentum();
    gestureState.value = {
      scale: 1,
      rotation: 0,
      panX: 0,
      panY: 0,
      centerX: 0,
      centerY: 0,
      isActive: false,
      gestureType: 'none'
    };
  };
  
  // Setup event listeners
  const setupEventListeners = () => {
    if (!element.value) return;
    
    element.value.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.value.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.value.addEventListener('touchend', handleTouchEnd);
    element.value.addEventListener('touchcancel', handleTouchCancel);
  };
  
  // Cleanup event listeners
  const cleanupEventListeners = () => {
    if (!element.value) return;
    
    element.value.removeEventListener('touchstart', handleTouchStart);
    element.value.removeEventListener('touchmove', handleTouchMove);
    element.value.removeEventListener('touchend', handleTouchEnd);
    element.value.removeEventListener('touchcancel', handleTouchCancel);
  };
  
  // Computed properties
  const isGestureActive = computed(() => gestureState.value.isActive);
  const currentScale = computed(() => gestureState.value.scale);
  const currentRotation = computed(() => gestureState.value.rotation);
  const currentPan = computed(() => ({ x: gestureState.value.panX, y: gestureState.value.panY }));
  const touchCount = computed(() => activeTouches.value.size);
  const isMomentumActive = computed(() => momentum.value.isAnimating);
  
  // Lifecycle management
  onMounted(() => {
    nextTick(() => {
      setupEventListeners();
    });
  });
  
  onBeforeUnmount(() => {
    cleanupEventListeners();
    stopMomentum();
  });
  
  return {
    // State
    gestureState,
    isGestureActive,
    currentScale,
    currentRotation,
    currentPan,
    touchCount,
    isMomentumActive,
    
    // Control functions
    reset,
    stopMomentum,
    
    // Setup functions (for manual management)
    setupEventListeners,
    cleanupEventListeners
  };
}