import { ref, computed, nextTick, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import type { BTableHeader } from '../components/BTable/BTable.types';

export interface ColumnReorderOptions {
  /** Whether to enable keyboard reordering */
  keyboardReorder?: boolean;
  /** Whether to show visual feedback during drag */
  showDragIndicator?: boolean;
  /** Whether to persist column order */
  persistOrder?: boolean;
  /** Storage key for persisting order */
  storageKey?: string;
  /** Animation duration for reorder */
  animationDuration?: number;
  /** Whether to announce reorder to screen readers */
  announceReorder?: boolean;
}

export interface ColumnReorderState {
  /** Currently dragging column */
  draggingColumn: string | null;
  /** Drop target column */
  dropTargetColumn: string | null;
  /** Original column order */
  originalOrder: string[];
  /** Current column order */
  currentOrder: string[];
  /** Whether drag is active */
  isDragging: boolean;
  /** Drag start position */
  dragStartX: number;
  /** Drop indicator position */
  dropIndicatorPosition: 'before' | 'after' | null;
}

const DEFAULT_OPTIONS: Required<ColumnReorderOptions> = {
  keyboardReorder: true,
  showDragIndicator: true,
  persistOrder: true,
  storageKey: 'btable_column_order',
  animationDuration: 200,
  announceReorder: true
};

export function useColumnReorder(
  headers: Ref<BTableHeader[]>,
  options: ColumnReorderOptions = {}
) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // State
  const reorderState = ref<ColumnReorderState>({
    draggingColumn: null,
    dropTargetColumn: null,
    originalOrder: [],
    currentOrder: [],
    isDragging: false,
    dragStartX: 0,
    dropIndicatorPosition: null
  });
  
  // Screen reader announcements
  const announce = (message: string): void => {
    if (!opts.announceReorder) return;
    
    // Create or get live region
    let liveRegion = document.getElementById('column-reorder-announcements');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'column-reorder-announcements';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
  };
  
  // Load persisted column order
  const loadPersistedOrder = (): string[] => {
    if (!opts.persistOrder || typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(opts.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('[useColumnReorder] Failed to load persisted order:', error);
      return [];
    }
  };
  
  // Save column order to localStorage
  const persistOrder = (order: string[]): void => {
    if (!opts.persistOrder || typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(opts.storageKey, JSON.stringify(order));
    } catch (error) {
      console.warn('[useColumnReorder] Failed to persist order:', error);
    }
  };
  
  // Initialize column order
  const initializeColumnOrder = (): void => {
    const headerKeys = headers.value.map(h => h.value);
    const persistedOrder = loadPersistedOrder();
    
    // Validate persisted order (ensure all current columns exist)
    const validPersistedOrder = persistedOrder.filter(key => headerKeys.includes(key));
    const missingColumns = headerKeys.filter(key => !validPersistedOrder.includes(key));
    
    // Combine validated persisted order with any missing columns
    const finalOrder = [...validPersistedOrder, ...missingColumns];
    
    reorderState.value.originalOrder = headerKeys;
    reorderState.value.currentOrder = finalOrder;
  };
  
  // Get ordered headers based on current order
  const orderedHeaders = computed(() => {
    const orderMap = new Map(reorderState.value.currentOrder.map((key, index) => [key, index]));
    
    return [...headers.value].sort((a, b) => {
      const orderA = orderMap.get(a.value) ?? Number.MAX_SAFE_INTEGER;
      const orderB = orderMap.get(b.value) ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });
  });
  
  // Check if column can be reordered
  const isColumnReorderable = (header: BTableHeader): boolean => {
    return header.reorderable !== false;
  };
  
  // Start drag operation
  const startDrag = (header: BTableHeader, event: DragEvent): void => {
    if (!isColumnReorderable(header)) return;
    
    reorderState.value = {
      ...reorderState.value,
      draggingColumn: header.value,
      isDragging: true,
      dragStartX: event.clientX,
      dropIndicatorPosition: null
    };
    
    // Set drag data
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', header.value);
      
      // Create drag image
      const dragImage = createDragImage(header);
      if (dragImage) {
        event.dataTransfer.setDragImage(dragImage, 0, 0);
      }
    }
    
    announce(`Started dragging ${header.label || header.value} column`);
  };
  
  // Create custom drag image
  const createDragImage = (header: BTableHeader): HTMLElement | null => {
    const dragImage = document.createElement('div');
    dragImage.textContent = header.label || header.value;
    dragImage.style.cssText = `
      position: absolute;
      top: -1000px;
      left: -1000px;
      padding: 8px 12px;
      background: var(--color-primary-surface-default);
      border: 1px solid var(--color-primary-border-default);
      border-radius: 4px;
      font-size: 14px;
      color: var(--color-primary-foreground-default);
      pointer-events: none;
      z-index: 1000;
    `;
    
    document.body.appendChild(dragImage);
    
    // Clean up after drag
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 100);
    
    return dragImage;
  };
  
  // Handle drag over
  const handleDragOver = (header: BTableHeader, event: DragEvent): void => {
    if (!reorderState.value.isDragging || !isColumnReorderable(header)) return;
    
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    
    // Determine drop position based on mouse position
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const cellWidth = rect.width;
    
    const dropPosition = mouseX < cellWidth / 2 ? 'before' : 'after';
    
    reorderState.value.dropTargetColumn = header.value;
    reorderState.value.dropIndicatorPosition = dropPosition;
  };
  
  // Handle drag enter
  const handleDragEnter = (header: BTableHeader, event: DragEvent): void => {
    if (!reorderState.value.isDragging) return;
    event.preventDefault();
  };
  
  // Handle drag leave
  const handleDragLeave = (event: DragEvent): void => {
    // Only clear if we're leaving the table area entirely
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (!relatedTarget || !relatedTarget.closest('.b-table')) {
      reorderState.value.dropTargetColumn = null;
      reorderState.value.dropIndicatorPosition = null;
    }
  };
  
  // Handle drop
  const handleDrop = (header: BTableHeader, event: DragEvent): void => {
    event.preventDefault();
    
    const draggedColumnKey = event.dataTransfer?.getData('text/plain');
    if (!draggedColumnKey || !reorderState.value.isDragging || !isColumnReorderable(header)) {
      return;
    }
    
    const targetColumnKey = header.value;
    if (draggedColumnKey === targetColumnKey) {
      endDrag();
      return;
    }
    
    // Perform the reorder
    const newOrder = reorderColumns(draggedColumnKey, targetColumnKey, reorderState.value.dropIndicatorPosition);
    
    // Update state
    reorderState.value.currentOrder = newOrder;
    
    // Persist the new order
    persistOrder(newOrder);
    
    // Announce the change
    const draggedHeader = headers.value.find(h => h.value === draggedColumnKey);
    const targetHeader = headers.value.find(h => h.value === targetColumnKey);
    const position = reorderState.value.dropIndicatorPosition === 'before' ? 'before' : 'after';
    
    announce(
      `Moved ${draggedHeader?.label || draggedColumnKey} column ${position} ${targetHeader?.label || targetColumnKey}`
    );
    
    endDrag();
  };
  
  // Reorder columns in array
  const reorderColumns = (
    draggedKey: string, 
    targetKey: string, 
    position: 'before' | 'after' | null
  ): string[] => {
    const currentOrder = [...reorderState.value.currentOrder];
    const draggedIndex = currentOrder.indexOf(draggedKey);
    const targetIndex = currentOrder.indexOf(targetKey);
    
    if (draggedIndex === -1 || targetIndex === -1) return currentOrder;
    
    // Remove dragged column from current position
    currentOrder.splice(draggedIndex, 1);
    
    // Calculate new target index (accounting for removed item)
    const adjustedTargetIndex = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;
    const insertIndex = position === 'before' ? adjustedTargetIndex : adjustedTargetIndex + 1;
    
    // Insert at new position
    currentOrder.splice(insertIndex, 0, draggedKey);
    
    return currentOrder;
  };
  
  // End drag operation
  const endDrag = (): void => {
    reorderState.value = {
      ...reorderState.value,
      draggingColumn: null,
      dropTargetColumn: null,
      isDragging: false,
      dropIndicatorPosition: null
    };
  };
  
  // Keyboard reordering
  const moveColumnLeft = (header: BTableHeader): void => {
    if (!opts.keyboardReorder || !isColumnReorderable(header)) return;
    
    const currentOrder = [...reorderState.value.currentOrder];
    const currentIndex = currentOrder.indexOf(header.value);
    
    if (currentIndex > 0) {
      // Swap with previous column
      [currentOrder[currentIndex - 1], currentOrder[currentIndex]] = 
      [currentOrder[currentIndex], currentOrder[currentIndex - 1]];
      
      reorderState.value.currentOrder = currentOrder;
      persistOrder(currentOrder);
      
      announce(`Moved ${header.label || header.value} column left`);
    }
  };
  
  const moveColumnRight = (header: BTableHeader): void => {
    if (!opts.keyboardReorder || !isColumnReorderable(header)) return;
    
    const currentOrder = [...reorderState.value.currentOrder];
    const currentIndex = currentOrder.indexOf(header.value);
    
    if (currentIndex < currentOrder.length - 1) {
      // Swap with next column
      [currentOrder[currentIndex], currentOrder[currentIndex + 1]] = 
      [currentOrder[currentIndex + 1], currentOrder[currentIndex]];
      
      reorderState.value.currentOrder = currentOrder;
      persistOrder(currentOrder);
      
      announce(`Moved ${header.label || header.value} column right`);
    }
  };
  
  // Handle keyboard events
  const handleKeyDown = (header: BTableHeader, event: KeyboardEvent): void => {
    if (!opts.keyboardReorder || !isColumnReorderable(header)) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        if (event.ctrlKey) {
          event.preventDefault();
          moveColumnLeft(header);
        }
        break;
        
      case 'ArrowRight':
        if (event.ctrlKey) {
          event.preventDefault();
          moveColumnRight(header);
        }
        break;
        
      case 'Home':
        if (event.ctrlKey) {
          event.preventDefault();
          moveColumnToPosition(header, 0);
        }
        break;
        
      case 'End':
        if (event.ctrlKey) {
          event.preventDefault();
          moveColumnToPosition(header, reorderState.value.currentOrder.length - 1);
        }
        break;
    }
  };
  
  // Move column to specific position
  const moveColumnToPosition = (header: BTableHeader, position: number): void => {
    if (!isColumnReorderable(header)) return;
    
    const currentOrder = [...reorderState.value.currentOrder];
    const currentIndex = currentOrder.indexOf(header.value);
    
    if (currentIndex === -1) return;
    
    // Remove from current position
    const [column] = currentOrder.splice(currentIndex, 1);
    
    // Insert at new position
    const targetPosition = Math.max(0, Math.min(position, currentOrder.length));
    currentOrder.splice(targetPosition, 0, column);
    
    reorderState.value.currentOrder = currentOrder;
    persistOrder(currentOrder);
    
    const positionName = position === 0 ? 'first' : 
                        position === currentOrder.length - 1 ? 'last' : 
                        `position ${position + 1}`;
    
    announce(`Moved ${header.label || header.value} column to ${positionName}`);
  };
  
  // Reset column order
  const resetColumnOrder = (): void => {
    reorderState.value.currentOrder = [...reorderState.value.originalOrder];
    
    if (opts.persistOrder) {
      try {
        localStorage.removeItem(opts.storageKey);
      } catch (error) {
        console.warn('[useColumnReorder] Failed to clear persisted order:', error);
      }
    }
    
    announce('Column order reset to default');
  };
  
  // Get column position
  const getColumnPosition = (header: BTableHeader): number => {
    return reorderState.value.currentOrder.indexOf(header.value);
  };
  
  // Check if column is being dragged
  const isColumnDragging = (header: BTableHeader): boolean => {
    return reorderState.value.draggingColumn === header.value;
  };
  
  // Check if column is drop target
  const isColumnDropTarget = (header: BTableHeader): boolean => {
    return reorderState.value.dropTargetColumn === header.value;
  };
  
  // Get drop indicator class
  const getDropIndicatorClass = (header: BTableHeader): string => {
    if (!isColumnDropTarget(header)) return '';
    
    const position = reorderState.value.dropIndicatorPosition;
    return position ? `drop-indicator-${position}` : '';
  };
  
  // Computed properties
  const isDraggingActive = computed(() => reorderState.value.isDragging);
  const draggingColumn = computed(() => reorderState.value.draggingColumn);
  
  // Initialize on first use
  initializeColumnOrder();
  
  // Cleanup function
  const cleanup = (): void => {
    // Remove any live region we created
    const liveRegion = document.getElementById('column-reorder-announcements');
    if (liveRegion) {
      document.body.removeChild(liveRegion);
    }
    
    // Reset drag state
    if (reorderState.value.isDragging) {
      endDrag();
    }
  };
  
  // Auto cleanup on unmount
  onBeforeUnmount(cleanup);
  
  return {
    // State
    reorderState,
    orderedHeaders,
    isDraggingActive,
    draggingColumn,
    
    // Drag and drop methods
    startDrag,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    endDrag,
    
    // Keyboard methods
    handleKeyDown,
    moveColumnLeft,
    moveColumnRight,
    moveColumnToPosition,
    
    // Utility methods
    isColumnReorderable,
    isColumnDragging,
    isColumnDropTarget,
    getDropIndicatorClass,
    getColumnPosition,
    resetColumnOrder,
    initializeColumnOrder,
    
    // Utils
    cleanup
  };
}