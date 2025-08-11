import { ref, computed, watch, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import type { BTableHeader } from '../components/BTable/BTable.types';

export interface ColumnVisibilityOptions {
  /** Whether to persist visibility state */
  persistVisibility?: boolean;
  /** Storage key for persisting visibility */
  storageKey?: string;
  /** Whether to show visibility toggle UI */
  showToggleUI?: boolean;
  /** Minimum visible columns */
  minVisibleColumns?: number;
  /** Whether to announce visibility changes */
  announceChanges?: boolean;
  /** Default visibility for new columns */
  defaultVisible?: boolean;
}

export interface ColumnVisibilityState {
  /** Visible column keys */
  visibleColumns: Set<string>;
  /** Hidden column keys */
  hiddenColumns: Set<string>;
  /** Whether toggle UI is open */
  toggleUIOpen: boolean;
  /** Total number of columns */
  totalColumns: number;
  /** Number of visible columns */
  visibleCount: number;
  /** Number of hidden columns */
  hiddenCount: number;
}

export interface ColumnVisibilityItem {
  /** Column header */
  header: BTableHeader;
  /** Whether column is visible */
  visible: boolean;
  /** Whether column can be hidden */
  hideable: boolean;
  /** Order for display in toggle UI */
  order: number;
}

const DEFAULT_OPTIONS: Required<ColumnVisibilityOptions> = {
  persistVisibility: true,
  storageKey: 'btable_column_visibility',
  showToggleUI: true,
  minVisibleColumns: 1,
  announceChanges: true,
  defaultVisible: true
};

export function useColumnVisibility(
  headers: Ref<BTableHeader[]>,
  options: ColumnVisibilityOptions = {}
) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // State
  const visibilityState = ref<ColumnVisibilityState>({
    visibleColumns: new Set(),
    hiddenColumns: new Set(),
    toggleUIOpen: false,
    totalColumns: 0,
    visibleCount: 0,
    hiddenCount: 0
  });
  
  // Screen reader announcements
  const announce = (message: string): void => {
    if (!opts.announceChanges) return;
    
    // Create or get live region
    let liveRegion = document.getElementById('column-visibility-announcements');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'column-visibility-announcements';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
  };
  
  // Load persisted visibility state
  const loadPersistedVisibility = (): { visible: Set<string>; hidden: Set<string> } => {
    if (!opts.persistVisibility || typeof window === 'undefined') {
      return { visible: new Set(), hidden: new Set() };
    }
    
    try {
      const stored = localStorage.getItem(opts.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          visible: new Set(parsed.visible || []),
          hidden: new Set(parsed.hidden || [])
        };
      }
    } catch (error) {
      console.warn('[useColumnVisibility] Failed to load persisted visibility:', error);
    }
    
    return { visible: new Set(), hidden: new Set() };
  };
  
  // Save visibility state to localStorage
  const persistVisibility = (visible: Set<string>, hidden: Set<string>): void => {
    if (!opts.persistVisibility || typeof window === 'undefined') return;
    
    try {
      const data = {
        visible: Array.from(visible),
        hidden: Array.from(hidden)
      };
      localStorage.setItem(opts.storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn('[useColumnVisibility] Failed to persist visibility:', error);
    }
  };
  
  // Initialize column visibility
  const initializeVisibility = (): void => {
    const { visible: persistedVisible, hidden: persistedHidden } = loadPersistedVisibility();
    const headerKeys = headers.value.map(h => h.value);
    
    const visibleSet = new Set<string>();
    const hiddenSet = new Set<string>();
    
    headers.value.forEach((header) => {
      const key = header.value;
      
      // Check if column is hideable
      if (header.hideable === false) {
        // Always visible if not hideable
        visibleSet.add(key);
        return;
      }
      
      // Use persisted state if available, otherwise use default
      if (persistedVisible.has(key)) {
        visibleSet.add(key);
      } else if (persistedHidden.has(key)) {
        hiddenSet.add(key);
      } else if (opts.defaultVisible) {
        visibleSet.add(key);
      } else {
        hiddenSet.add(key);
      }
    });
    
    updateVisibilityState(visibleSet, hiddenSet);
  };
  
  // Update visibility state
  const updateVisibilityState = (visible: Set<string>, hidden: Set<string>): void => {
    visibilityState.value = {
      ...visibilityState.value,
      visibleColumns: visible,
      hiddenColumns: hidden,
      totalColumns: headers.value.length,
      visibleCount: visible.size,
      hiddenCount: hidden.size
    };
    
    persistVisibility(visible, hidden);
  };
  
  // Check if column is visible
  const isColumnVisible = (header: BTableHeader): boolean => {
    return visibilityState.value.visibleColumns.has(header.value);
  };
  
  // Check if column can be hidden
  const isColumnHideable = (header: BTableHeader): boolean => {
    return header.hideable !== false;
  };
  
  // Toggle column visibility
  const toggleColumnVisibility = (header: BTableHeader): void => {
    if (!isColumnHideable(header)) return;
    
    const visible = new Set(visibilityState.value.visibleColumns);
    const hidden = new Set(visibilityState.value.hiddenColumns);
    const isVisible = visible.has(header.value);
    
    if (isVisible) {
      // Hide column (if allowed)
      if (visible.size <= opts.minVisibleColumns) {
        announce(`Cannot hide ${header.label || header.value} - minimum ${opts.minVisibleColumns} columns must remain visible`);
        return;
      }
      
      visible.delete(header.value);
      hidden.add(header.value);
      announce(`Hidden ${header.label || header.value} column`);
    } else {
      // Show column
      hidden.delete(header.value);
      visible.add(header.value);
      announce(`Shown ${header.label || header.value} column`);
    }
    
    updateVisibilityState(visible, hidden);
  };
  
  // Show column
  const showColumn = (header: BTableHeader): void => {
    if (!isColumnHideable(header) || isColumnVisible(header)) return;
    
    const visible = new Set(visibilityState.value.visibleColumns);
    const hidden = new Set(visibilityState.value.hiddenColumns);
    
    hidden.delete(header.value);
    visible.add(header.value);
    
    updateVisibilityState(visible, hidden);
    announce(`Shown ${header.label || header.value} column`);
  };
  
  // Hide column
  const hideColumn = (header: BTableHeader): void => {
    if (!isColumnHideable(header) || !isColumnVisible(header)) return;
    
    // Check minimum visible columns
    if (visibilityState.value.visibleCount <= opts.minVisibleColumns) {
      announce(`Cannot hide ${header.label || header.value} - minimum ${opts.minVisibleColumns} columns must remain visible`);
      return;
    }
    
    const visible = new Set(visibilityState.value.visibleColumns);
    const hidden = new Set(visibilityState.value.hiddenColumns);
    
    visible.delete(header.value);
    hidden.add(header.value);
    
    updateVisibilityState(visible, hidden);
    announce(`Hidden ${header.label || header.value} column`);
  };
  
  // Show all columns
  const showAllColumns = (): void => {
    const visible = new Set<string>();
    const hidden = new Set<string>();
    
    headers.value.forEach((header) => {
      visible.add(header.value);
    });
    
    updateVisibilityState(visible, hidden);
    announce('All columns are now visible');
  };
  
  // Hide all hideable columns (respect minimum)
  const hideAllHideableColumns = (): void => {
    const visible = new Set<string>();
    const hidden = new Set<string>();
    let visibleCount = 0;
    
    // First pass: add non-hideable columns
    headers.value.forEach((header) => {
      if (!isColumnHideable(header)) {
        visible.add(header.value);
        visibleCount++;
      }
    });
    
    // Second pass: add hideable columns until minimum is reached
    const hideableHeaders = headers.value.filter(h => isColumnHideable(h));
    
    for (let i = 0; i < hideableHeaders.length && visibleCount < opts.minVisibleColumns; i++) {
      visible.add(hideableHeaders[i].value);
      visibleCount++;
    }
    
    // Third pass: hide remaining columns
    hideableHeaders.forEach((header) => {
      if (!visible.has(header.value)) {
        hidden.add(header.value);
      }
    });
    
    updateVisibilityState(visible, hidden);
    
    const hiddenCount = hidden.size;
    if (hiddenCount > 0) {
      announce(`Hidden ${hiddenCount} columns, keeping ${visibleCount} visible`);
    } else {
      announce('No columns can be hidden due to minimum visible requirement');
    }
  };
  
  // Reset visibility to defaults
  const resetVisibility = (): void => {
    const visible = new Set<string>();
    const hidden = new Set<string>();
    
    headers.value.forEach((header) => {
      if (opts.defaultVisible) {
        visible.add(header.value);
      } else {
        hidden.add(header.value);
      }
    });
    
    updateVisibilityState(visible, hidden);
    
    // Clear persisted state
    if (opts.persistVisibility) {
      try {
        localStorage.removeItem(opts.storageKey);
      } catch (error) {
        console.warn('[useColumnVisibility] Failed to clear persisted visibility:', error);
      }
    }
    
    announce('Column visibility reset to default');
  };
  
  // Get filtered headers (only visible ones)
  const visibleHeaders = computed(() => {
    return headers.value.filter(header => isColumnVisible(header));
  });
  
  // Get hidden headers
  const hiddenHeaders = computed(() => {
    return headers.value.filter(header => !isColumnVisible(header));
  });
  
  // Get visibility items for toggle UI
  const visibilityItems = computed((): ColumnVisibilityItem[] => {
    return headers.value.map((header, index) => ({
      header,
      visible: isColumnVisible(header),
      hideable: isColumnHideable(header),
      order: index
    }));
  });
  
  // Check if can hide more columns
  const canHideMoreColumns = computed(() => {
    return visibilityState.value.visibleCount > opts.minVisibleColumns;
  });
  
  // Check if any columns are hidden
  const hasHiddenColumns = computed(() => {
    return visibilityState.value.hiddenCount > 0;
  });
  
  // Toggle UI methods
  const openToggleUI = (): void => {
    visibilityState.value.toggleUIOpen = true;
    announce('Column visibility menu opened');
  };
  
  const closeToggleUI = (): void => {
    visibilityState.value.toggleUIOpen = false;
    announce('Column visibility menu closed');
  };
  
  const toggleUI = (): void => {
    if (visibilityState.value.toggleUIOpen) {
      closeToggleUI();
    } else {
      openToggleUI();
    }
  };
  
  // Keyboard handling for toggle UI
  const handleToggleUIKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        closeToggleUI();
        break;
        
      case 'Enter':
      case ' ':
        if (event.target && (event.target as HTMLElement).hasAttribute('data-column-key')) {
          event.preventDefault();
          const columnKey = (event.target as HTMLElement).getAttribute('data-column-key');
          const header = headers.value.find(h => h.value === columnKey);
          if (header) {
            toggleColumnVisibility(header);
          }
        }
        break;
    }
  };
  
  // Get visibility summary for screen readers
  const getVisibilitySummary = (): string => {
    const { visibleCount, hiddenCount, totalColumns } = visibilityState.value;
    return `${visibleCount} of ${totalColumns} columns visible${hiddenCount > 0 ? `, ${hiddenCount} hidden` : ''}`;
  };
  
  // Watch headers for changes
  watch(
    () => headers.value,
    () => {
      initializeVisibility();
    },
    { immediate: true }
  );
  
  // Cleanup function
  const cleanup = (): void => {
    // Remove any live region we created
    const liveRegion = document.getElementById('column-visibility-announcements');
    if (liveRegion) {
      document.body.removeChild(liveRegion);
    }
    
    // Close toggle UI
    visibilityState.value.toggleUIOpen = false;
  };
  
  // Auto cleanup on unmount
  onBeforeUnmount(cleanup);
  
  return {
    // State
    visibilityState,
    visibleHeaders,
    hiddenHeaders,
    visibilityItems,
    canHideMoreColumns,
    hasHiddenColumns,
    
    // Visibility methods
    isColumnVisible,
    isColumnHideable,
    toggleColumnVisibility,
    showColumn,
    hideColumn,
    showAllColumns,
    hideAllHideableColumns,
    resetVisibility,
    
    // UI methods
    openToggleUI,
    closeToggleUI,
    toggleUI,
    handleToggleUIKeyDown,
    
    // Utility methods
    getVisibilitySummary,
    initializeVisibility,
    
    // Utils
    cleanup
  };
}