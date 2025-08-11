import { ref, reactive, computed } from 'vue';

/**
 * Dialog instance information for stack management
 */
export interface DialogStackItem {
  /** Unique dialog ID */
  id: string;
  /** Dialog element reference */
  element?: HTMLElement;
  /** Z-index for stacking */
  zIndex: number;
  /** Dialog variant/type */
  variant: 'dialog' | 'alertdialog';
  /** Whether dialog is dismissible */
  dismissible: boolean;
  /** Focus restoration target */
  returnFocusTo?: HTMLElement;
  /** Creation timestamp */
  createdAt: number;
  /** Custom data */
  metadata?: Record<string, any>;
}

/**
 * Dialog stack configuration
 */
export interface DialogStackConfig {
  /** Base z-index for dialogs */
  baseZIndex: number;
  /** Z-index increment between dialogs */
  zIndexIncrement: number;
  /** Maximum number of dialogs in stack */
  maxStackSize: number;
  /** Whether to allow nested alert dialogs */
  allowNestedAlerts: boolean;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: DialogStackConfig = {
  baseZIndex: 1000,
  zIndexIncrement: 10,
  maxStackSize: 10,
  allowNestedAlerts: true,
};

/**
 * Global dialog stack state
 */
const globalStack = ref<DialogStackItem[]>([]);
const config = reactive<DialogStackConfig>({ ...DEFAULT_CONFIG });

/**
 * Generate unique dialog ID
 */
function generateDialogId(): string {
  return `dialog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calculate z-index for dialog position in stack
 */
function calculateZIndex(stackPosition: number): number {
  return config.baseZIndex + (stackPosition * config.zIndexIncrement);
}

/**
 * Vue composable for dialog stack management
 * Handles z-index stacking, focus management, and nested dialog coordination
 */
export function useDialogStack() {
  
  /**
   * Add dialog to stack
   */
  const push = (options: {
    id?: string;
    element?: HTMLElement;
    variant?: 'dialog' | 'alertdialog';
    dismissible?: boolean;
    returnFocusTo?: HTMLElement;
    metadata?: Record<string, any>;
  } = {}): string => {
    
    // Check stack size limit
    if (globalStack.value.length >= config.maxStackSize) {
      console.warn(`Dialog stack size limit (${config.maxStackSize}) reached`);
      return '';
    }
    
    // Check nested alert dialog restrictions
    if (options.variant === 'alertdialog' && !config.allowNestedAlerts) {
      const hasAlertDialog = globalStack.value.some(item => item.variant === 'alertdialog');
      if (hasAlertDialog) {
        console.warn('Nested alert dialogs are not allowed');
        return '';
      }
    }
    
    const id = options.id || generateDialogId();
    const stackPosition = globalStack.value.length;
    const zIndex = calculateZIndex(stackPosition);
    
    const dialogItem: DialogStackItem = {
      id,
      element: options.element,
      zIndex,
      variant: options.variant || 'dialog',
      dismissible: options.dismissible !== false,
      returnFocusTo: options.returnFocusTo,
      createdAt: Date.now(),
      metadata: options.metadata,
    };
    
    globalStack.value.push(dialogItem);
    
    return id;
  };
  
  /**
   * Remove dialog from stack
   */
  const pop = (id?: string): DialogStackItem | null => {
    if (globalStack.value.length === 0) return null;
    
    if (id) {
      // Remove specific dialog
      const index = globalStack.value.findIndex(item => item.id === id);
      if (index === -1) return null;
      
      const [removed] = globalStack.value.splice(index, 1);
      
      // Recalculate z-indexes for remaining dialogs
      globalStack.value.forEach((item, stackIndex) => {
        item.zIndex = calculateZIndex(stackIndex);
      });
      
      return removed;
    } else {
      // Remove top dialog
      return globalStack.value.pop() || null;
    }
  };
  
  /**
   * Get dialog by ID
   */
  const get = (id: string): DialogStackItem | undefined => {
    return globalStack.value.find(item => item.id === id);
  };
  
  /**
   * Get current top dialog
   */
  const getTop = (): DialogStackItem | undefined => {
    return globalStack.value[globalStack.value.length - 1];
  };
  
  /**
   * Clear all dialogs from stack
   */
  const clear = (): DialogStackItem[] => {
    const removed = [...globalStack.value];
    globalStack.value.length = 0;
    return removed;
  };
  
  /**
   * Close all dismissible dialogs
   */
  const closeDismissible = (): DialogStackItem[] => {
    const removed: DialogStackItem[] = [];
    
    // Filter out dismissible dialogs
    globalStack.value = globalStack.value.filter(item => {
      if (item.dismissible) {
        removed.push(item);
        return false;
      }
      return true;
    });
    
    // Recalculate z-indexes
    globalStack.value.forEach((item, index) => {
      item.zIndex = calculateZIndex(index);
    });
    
    return removed;
  };
  
  /**
   * Update dialog element reference
   */
  const updateElement = (id: string, element: HTMLElement): boolean => {
    const dialog = globalStack.value.find(item => item.id === id);
    if (dialog) {
      dialog.element = element;
      return true;
    }
    return false;
  };
  
  /**
   * Update dialog metadata
   */
  const updateMetadata = (id: string, metadata: Record<string, any>): boolean => {
    const dialog = globalStack.value.find(item => item.id === id);
    if (dialog) {
      dialog.metadata = { ...dialog.metadata, ...metadata };
      return true;
    }
    return false;
  };
  
  /**
   * Check if dialog is at top of stack
   */
  const isTop = (id: string): boolean => {
    const topDialog = getTop();
    return topDialog?.id === id;
  };
  
  /**
   * Get dialog position in stack (0 = bottom)
   */
  const getPosition = (id: string): number => {
    return globalStack.value.findIndex(item => item.id === id);
  };
  
  /**
   * Update stack configuration
   */
  const updateConfig = (newConfig: Partial<DialogStackConfig>): void => {
    Object.assign(config, newConfig);
    
    // Recalculate z-indexes if baseZIndex or increment changed
    if (newConfig.baseZIndex !== undefined || newConfig.zIndexIncrement !== undefined) {
      globalStack.value.forEach((item, index) => {
        item.zIndex = calculateZIndex(index);
      });
    }
  };
  
  // Computed properties
  const stack = computed(() => [...globalStack.value]);
  const stackSize = computed(() => globalStack.value.length);
  const hasDialogs = computed(() => globalStack.value.length > 0);
  const topDialog = computed(() => getTop());
  const alertDialogs = computed(() => globalStack.value.filter(item => item.variant === 'alertdialog'));
  const dismissibleDialogs = computed(() => globalStack.value.filter(item => item.dismissible));
  
  return {
    // State
    stack: readonly(stack),
    stackSize: readonly(stackSize),
    hasDialogs: readonly(hasDialogs),
    topDialog: readonly(topDialog),
    alertDialogs: readonly(alertDialogs),
    dismissibleDialogs: readonly(dismissibleDialogs),
    config: readonly(config),
    
    // Methods
    push,
    pop,
    get,
    getTop,
    clear,
    closeDismissible,
    updateElement,
    updateMetadata,
    isTop,
    getPosition,
    updateConfig,
    
    // Utilities
    generateId: generateDialogId,
  };
}

/**
 * Global dialog stack instance for cross-component coordination
 */
export const dialogStack = useDialogStack();

/**
 * Utility functions for direct access without composable
 */
export const DialogStackManager = {
  push: dialogStack.push,
  pop: dialogStack.pop,
  get: dialogStack.get,
  getTop: dialogStack.getTop,
  clear: dialogStack.clear,
  isTop: dialogStack.isTop,
  getSize: () => dialogStack.stackSize.value,
  hasDialogs: () => dialogStack.hasDialogs.value,
};