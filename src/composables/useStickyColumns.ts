import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import type { BTableHeader } from '../components/BTable/BTable.types';

export interface StickyColumnConfig {
  /** Sticky position */
  position: 'left' | 'right';
  /** Z-index for layering */
  zIndex?: number;
  /** Shadow configuration */
  showShadow?: boolean;
  /** Custom shadow style */
  shadowStyle?: string;
}

export interface StickyColumnState {
  /** Left sticky columns */
  leftColumns: string[];
  /** Right sticky columns */
  rightColumns: string[];
  /** Column positions */
  columnPositions: Map<string, number>;
  /** Whether table is scrolled */
  isScrolled: boolean;
  /** Scroll position */
  scrollLeft: number;
  /** Container width */
  containerWidth: number;
  /** Content width */
  contentWidth: number;
}

export function useStickyColumns(
  headers: Ref<BTableHeader[]>,
  tableRef: Ref<HTMLElement | null>
) {
  const stickyState = ref<StickyColumnState>({
    leftColumns: [],
    rightColumns: [],
    columnPositions: new Map(),
    isScrolled: false,
    scrollLeft: 0,
    containerWidth: 0,
    contentWidth: 0
  });

  const resizeObserver = ref<ResizeObserver | null>(null);
  const scrollHandler = ref<((event: Event) => void) | null>(null);

  // Initialize sticky columns
  const initializeStickyColumns = (): void => {
    const leftColumns: string[] = [];
    const rightColumns: string[] = [];

    headers.value.forEach(header => {
      if (header.sticky === 'left') {
        leftColumns.push(header.value);
      } else if (header.sticky === 'right') {
        rightColumns.push(header.value);
      }
    });

    stickyState.value.leftColumns = leftColumns;
    stickyState.value.rightColumns = rightColumns;
    
    calculateColumnPositions();
  };

  // Calculate column positions
  const calculateColumnPositions = (): void => {
    if (!tableRef.value) return;

    const positions = new Map<string, number>();
    let leftOffset = 0;
    let rightOffset = 0;

    // Calculate left sticky positions
    stickyState.value.leftColumns.forEach(columnKey => {
      positions.set(columnKey, leftOffset);
      const header = headers.value.find(h => h.value === columnKey);
      if (header?.width) {
        leftOffset += parseInt(String(header.width)) || 150;
      } else {
        leftOffset += 150; // Default width
      }
    });

    // Calculate right sticky positions
    const rightColumns = [...stickyState.value.rightColumns].reverse();
    rightColumns.forEach(columnKey => {
      const header = headers.value.find(h => h.value === columnKey);
      const width = header?.width ? parseInt(String(header.width)) || 150 : 150;
      positions.set(columnKey, rightOffset);
      rightOffset += width;
    });

    stickyState.value.columnPositions = positions;
    updateStickyStyles();
  };

  // Update sticky column styles
  const updateStickyStyles = (): void => {
    if (!tableRef.value) return;

    headers.value.forEach(header => {
      if (!header.sticky) return;

      const columnCells = tableRef.value!.querySelectorAll(
        `th[data-column="${header.value}"], td[data-column="${header.value}"]`
      );

      const position = stickyState.value.columnPositions.get(header.value) || 0;

      columnCells.forEach(cell => {
        const element = cell as HTMLElement;
        element.style.position = 'sticky';
        element.style.zIndex = '10';
        
        if (header.sticky === 'left') {
          element.style.left = `${position}px`;
          element.style.right = 'auto';
        } else {
          element.style.right = `${position}px`;
          element.style.left = 'auto';
        }

        // Add shadow effect
        if (stickyState.value.isScrolled) {
          if (header.sticky === 'left' && position === Math.max(...Array.from(stickyState.value.columnPositions.values()))) {
            element.style.boxShadow = '2px 0 4px rgba(0,0,0,0.1)';
          } else if (header.sticky === 'right' && position === Math.max(...Array.from(stickyState.value.columnPositions.values()))) {
            element.style.boxShadow = '-2px 0 4px rgba(0,0,0,0.1)';
          }
        } else {
          element.style.boxShadow = 'none';
        }
      });
    });
  };

  // Handle scroll events
  const handleScroll = (event: Event): void => {
    const target = event.target as HTMLElement;
    stickyState.value.scrollLeft = target.scrollLeft;
    stickyState.value.isScrolled = target.scrollLeft > 0;
    updateStickyStyles();
  };

  // Set up event listeners
  const setupEventListeners = (): void => {
    if (!tableRef.value) return;

    const container = tableRef.value.querySelector('.table-container') || tableRef.value;
    
    scrollHandler.value = handleScroll;
    container.addEventListener('scroll', scrollHandler.value, { passive: true });

    // Set up resize observer
    resizeObserver.value = new ResizeObserver(() => {
      calculateColumnPositions();
    });

    resizeObserver.value.observe(container);
  };

  // Cleanup event listeners
  const cleanupEventListeners = (): void => {
    if (scrollHandler.value && tableRef.value) {
      const container = tableRef.value.querySelector('.table-container') || tableRef.value;
      container.removeEventListener('scroll', scrollHandler.value);
    }

    if (resizeObserver.value) {
      resizeObserver.value.disconnect();
    }
  };

  // Make column sticky
  const makeStickyColumn = (columnKey: string, position: 'left' | 'right'): void => {
    const header = headers.value.find(h => h.value === columnKey);
    if (!header) return;

    header.sticky = position;
    
    if (position === 'left' && !stickyState.value.leftColumns.includes(columnKey)) {
      stickyState.value.leftColumns.push(columnKey);
      stickyState.value.rightColumns = stickyState.value.rightColumns.filter(c => c !== columnKey);
    } else if (position === 'right' && !stickyState.value.rightColumns.includes(columnKey)) {
      stickyState.value.rightColumns.push(columnKey);
      stickyState.value.leftColumns = stickyState.value.leftColumns.filter(c => c !== columnKey);
    }

    calculateColumnPositions();
  };

  // Remove sticky from column
  const removeStickyColumn = (columnKey: string): void => {
    const header = headers.value.find(h => h.value === columnKey);
    if (!header) return;

    delete header.sticky;
    
    stickyState.value.leftColumns = stickyState.value.leftColumns.filter(c => c !== columnKey);
    stickyState.value.rightColumns = stickyState.value.rightColumns.filter(c => c !== columnKey);

    // Remove styles
    const columnCells = tableRef.value?.querySelectorAll(
      `th[data-column="${columnKey}"], td[data-column="${columnKey}"]`
    );

    columnCells?.forEach(cell => {
      const element = cell as HTMLElement;
      element.style.position = '';
      element.style.left = '';
      element.style.right = '';
      element.style.zIndex = '';
      element.style.boxShadow = '';
    });

    calculateColumnPositions();
  };

  // Get column sticky style
  const getColumnStickyStyle = (header: BTableHeader): Record<string, any> => {
    if (!header.sticky) return {};

    const position = stickyState.value.columnPositions.get(header.value) || 0;
    const style: Record<string, any> = {
      position: 'sticky',
      zIndex: 10
    };

    if (header.sticky === 'left') {
      style.left = `${position}px`;
    } else {
      style.right = `${position}px`;
    }

    return style;
  };

  // Computed properties
  const hasStickyColumns = computed(() => 
    stickyState.value.leftColumns.length > 0 || stickyState.value.rightColumns.length > 0
  );

  const stickyColumnCount = computed(() => 
    stickyState.value.leftColumns.length + stickyState.value.rightColumns.length
  );

  onMounted(() => {
    nextTick(() => {
      initializeStickyColumns();
      setupEventListeners();
    });
  });

  onBeforeUnmount(() => {
    cleanupEventListeners();
  });

  return {
    stickyState,
    hasStickyColumns,
    stickyColumnCount,
    makeStickyColumn,
    removeStickyColumn,
    getColumnStickyStyle,
    initializeStickyColumns
  };
}