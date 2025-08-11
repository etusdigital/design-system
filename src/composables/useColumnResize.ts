import { ref, computed, nextTick, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import type { BTableHeader } from '../components/BTable/BTable.types';

export interface ColumnResizeOptions {
  /** Minimum column width in pixels */
  minWidth?: number;
  /** Maximum column width in pixels */
  maxWidth?: number;
  /** Whether to show resize handles */
  showHandles?: boolean;
  /** Cursor style during resize */
  resizeCursor?: string;
  /** Whether to persist column widths */
  persistWidths?: boolean;
  /** Storage key for persisting widths */
  storageKey?: string;
  /** Debounce delay for resize events */
  debounceDelay?: number;
}

export interface ColumnResizeState {
  /** Currently resizing column */
  resizingColumn: string | null;
  /** Initial mouse position */
  initialX: number;
  /** Initial column width */
  initialWidth: number;
  /** Current column widths */
  columnWidths: Record<string, number>;
  /** Whether resize is active */
  isResizing: boolean;
}

const DEFAULT_OPTIONS: Required<ColumnResizeOptions> = {
  minWidth: 50,
  maxWidth: 800,
  showHandles: true,
  resizeCursor: 'col-resize',
  persistWidths: true,
  storageKey: 'btable_column_widths',
  debounceDelay: 100
};

export function useColumnResize(
  headers: Ref<BTableHeader[]>,
  tableRef: Ref<HTMLElement | null>,
  options: ColumnResizeOptions = {}
) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // State
  const resizeState = ref<ColumnResizeState>({
    resizingColumn: null,
    initialX: 0,
    initialWidth: 0,
    columnWidths: {},
    isResizing: false
  });
  
  // Tracking active listeners for cleanup
  const activeListeners = ref(new Set<() => void>());
  
  // Load persisted column widths on initialization
  const loadPersistedWidths = (): Record<string, number> => {
    if (!opts.persistWidths || typeof window === 'undefined') return {};
    
    try {
      const stored = localStorage.getItem(opts.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('[useColumnResize] Failed to load persisted widths:', error);
      return {};
    }
  };
  
  // Save column widths to localStorage
  const persistWidths = (widths: Record<string, number>): void => {
    if (!opts.persistWidths || typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(opts.storageKey, JSON.stringify(widths));
    } catch (error) {
      console.warn('[useColumnResize] Failed to persist widths:', error);
    }
  };
  
  // Initialize column widths
  const initializeColumnWidths = (): void => {
    const persistedWidths = loadPersistedWidths();
    const newWidths: Record<string, number> = {};
    
    headers.value.forEach((header) => {
      if (header.resizable !== false) {
        // Use persisted width, then header width, then calculate from content
        const persistedWidth = persistedWidths[header.value];
        const headerWidth = header.width ? parseInt(String(header.width)) : null;
        
        newWidths[header.value] = persistedWidth || headerWidth || 150; // Default 150px
      }
    });
    
    resizeState.value.columnWidths = newWidths;
  };
  
  // Get column width with fallback
  const getColumnWidth = (header: BTableHeader): number => {
    if (header.resizable === false) {
      return header.width ? parseInt(String(header.width)) : 150;
    }
    return resizeState.value.columnWidths[header.value] || 150;
  };
  
  // Get column style object
  const getColumnStyle = (header: BTableHeader): Record<string, any> => {
    const width = getColumnWidth(header);
    return {
      width: `${width}px`,
      minWidth: `${Math.max(opts.minWidth, width)}px`,
      maxWidth: header.maxWidth || `${opts.maxWidth}px`,
    };
  };
  
  // Check if column is resizable
  const isColumnResizable = (header: BTableHeader): boolean => {
    return header.resizable !== false && opts.showHandles;
  };
  
  // Start resize operation
  const startResize = (header: BTableHeader, event: MouseEvent): void => {
    if (!isColumnResizable(header)) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    const currentWidth = getColumnWidth(header);
    
    resizeState.value = {
      resizingColumn: header.value,
      initialX: event.clientX,
      initialWidth: currentWidth,
      columnWidths: { ...resizeState.value.columnWidths },
      isResizing: true
    };
    
    // Set cursor on document to show resize state
    document.body.style.cursor = opts.resizeCursor;
    document.body.style.userSelect = 'none';
    
    // Attach global event listeners
    const handleMouseMove = (e: MouseEvent) => handleResize(e);
    const handleMouseUp = () => endResize();
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Store cleanup functions
    const cleanup = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    activeListeners.value.add(cleanup);
  };
  
  // Handle resize during drag
  const handleResize = (event: MouseEvent): void => {
    if (!resizeState.value.isResizing || !resizeState.value.resizingColumn) return;
    
    const deltaX = event.clientX - resizeState.value.initialX;
    const newWidth = Math.max(
      opts.minWidth,
      Math.min(opts.maxWidth, resizeState.value.initialWidth + deltaX)
    );
    
    // Update column width
    resizeState.value.columnWidths[resizeState.value.resizingColumn] = newWidth;
    
    // Apply width immediately for visual feedback
    if (tableRef.value) {
      const header = headers.value.find(h => h.value === resizeState.value.resizingColumn);
      if (header) {
        updateColumnWidthInDOM(header, newWidth);
      }
    }
  };
  
  // Update column width directly in DOM for immediate feedback
  const updateColumnWidthInDOM = (header: BTableHeader, width: number): void => {
    if (!tableRef.value) return;
    
    const headerCells = tableRef.value.querySelectorAll(`th[data-column="${header.value}"], td[data-column="${header.value}"]`);
    headerCells.forEach((cell) => {
      if (cell instanceof HTMLElement) {
        cell.style.width = `${width}px`;
      }
    });
  };
  
  // End resize operation
  const endResize = (): void => {
    if (!resizeState.value.isResizing) return;
    
    // Restore cursor and user selection
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    
    // Persist the new widths
    persistWidths(resizeState.value.columnWidths);
    
    // Emit resize event if callback provided
    const header = headers.value.find(h => h.value === resizeState.value.resizingColumn);
    if (header && resizeState.value.resizingColumn) {
      const newWidth = resizeState.value.columnWidths[resizeState.value.resizingColumn];
      emitResizeEvent(header, newWidth);
    }
    
    // Clean up listeners
    activeListeners.value.forEach(cleanup => cleanup());
    activeListeners.value.clear();
    
    // Reset state
    resizeState.value.resizingColumn = null;
    resizeState.value.isResizing = false;
  };
  
  // Emit resize event (can be overridden by parent)
  const emitResizeEvent = (header: BTableHeader, newWidth: number): void => {
    // This would typically emit to parent component
    // For now, we just log the event
    console.log(`[useColumnResize] Column ${header.value} resized to ${newWidth}px`);
  };
  
  // Handle touch events for mobile
  const handleTouchStart = (header: BTableHeader, event: TouchEvent): void => {
    if (!isColumnResizable(header) || event.touches.length !== 1) return;
    
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
      button: 0
    });
    
    startResize(header, mouseEvent);
  };
  
  // Set column width programmatically
  const setColumnWidth = (columnKey: string, width: number): void => {
    const constrainedWidth = Math.max(opts.minWidth, Math.min(opts.maxWidth, width));
    resizeState.value.columnWidths[columnKey] = constrainedWidth;
    
    if (opts.persistWidths) {
      persistWidths(resizeState.value.columnWidths);
    }
  };
  
  // Reset all column widths
  const resetColumnWidths = (): void => {
    resizeState.value.columnWidths = {};
    
    if (opts.persistWidths) {
      try {
        localStorage.removeItem(opts.storageKey);
      } catch (error) {
        console.warn('[useColumnResize] Failed to clear persisted widths:', error);
      }
    }
    
    nextTick(() => {
      initializeColumnWidths();
    });
  };
  
  // Auto-fit column to content
  const autoFitColumn = (header: BTableHeader): void => {
    if (!tableRef.value) return;
    
    // Create temporary element to measure content
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.whiteSpace = 'nowrap';
    tempDiv.style.fontSize = getComputedStyle(tableRef.value).fontSize;
    tempDiv.style.fontFamily = getComputedStyle(tableRef.value).fontFamily;
    
    // Get all cell content for this column
    const cells = tableRef.value.querySelectorAll(`td[data-column="${header.value}"], th[data-column="${header.value}"]`);
    let maxWidth = 0;
    
    cells.forEach((cell) => {
      tempDiv.textContent = cell.textContent || '';
      document.body.appendChild(tempDiv);
      maxWidth = Math.max(maxWidth, tempDiv.offsetWidth + 32); // Add padding
      document.body.removeChild(tempDiv);
    });
    
    // Constrain to min/max bounds
    const finalWidth = Math.max(opts.minWidth, Math.min(opts.maxWidth, maxWidth));
    setColumnWidth(header.value, finalWidth);
  };
  
  // Computed properties
  const isResizingActive = computed(() => resizeState.value.isResizing);
  const resizingColumn = computed(() => resizeState.value.resizingColumn);
  
  // Initialize on first use
  initializeColumnWidths();
  
  // Cleanup function
  const cleanup = (): void => {
    // End any active resize
    if (resizeState.value.isResizing) {
      endResize();
    }
    
    // Clean up any remaining listeners
    activeListeners.value.forEach(cleanupFn => cleanupFn());
    activeListeners.value.clear();
    
    // Restore body styles
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };
  
  // Auto cleanup on unmount
  onBeforeUnmount(cleanup);
  
  return {
    // State
    resizeState,
    isResizingActive,
    resizingColumn,
    
    // Methods
    startResize,
    handleTouchStart,
    getColumnWidth,
    getColumnStyle,
    isColumnResizable,
    setColumnWidth,
    resetColumnWidths,
    autoFitColumn,
    initializeColumnWidths,
    
    // Utils
    cleanup
  };
}