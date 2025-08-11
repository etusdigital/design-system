import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { BTableItem } from '../components/BTable/BTable.types';

export interface EnhancedSelectionState<T> {
  /** Selected item IDs */
  selectedIds: Set<string | number>;
  /** Last selected index for range selection */
  lastSelectedIndex: number;
  /** Selection anchor for range selection */
  anchorIndex: number;
  /** Whether shift is held */
  shiftHeld: boolean;
  /** Whether ctrl is held */
  ctrlHeld: boolean;
}

export function useEnhancedSelection<T extends BTableItem>(
  items: Ref<T[]>
) {
  const selectionState = ref<EnhancedSelectionState<T>>({
    selectedIds: new Set(),
    lastSelectedIndex: -1,
    anchorIndex: -1,
    shiftHeld: false,
    ctrlHeld: false
  });

  // Handle row click with modifier keys
  const handleRowClick = (item: T, index: number, event: MouseEvent): void => {
    const id = item.id || index;
    
    if (event.shiftKey && selectionState.value.anchorIndex !== -1) {
      // Range selection
      selectRange(selectionState.value.anchorIndex, index);
    } else if (event.ctrlKey || event.metaKey) {
      // Toggle selection
      toggleSelection(id);
    } else {
      // Single selection
      clearSelection();
      selectItem(id);
      selectionState.value.anchorIndex = index;
    }
    
    selectionState.value.lastSelectedIndex = index;
  };

  // Select range of items
  const selectRange = (start: number, end: number): void => {
    const startIndex = Math.min(start, end);
    const endIndex = Math.max(start, end);
    
    for (let i = startIndex; i <= endIndex; i++) {
      const item = items.value[i];
      if (item) {
        const id = item.id || i;
        selectionState.value.selectedIds.add(id);
      }
    }
  };

  // Toggle item selection
  const toggleSelection = (id: string | number): void => {
    if (selectionState.value.selectedIds.has(id)) {
      selectionState.value.selectedIds.delete(id);
    } else {
      selectionState.value.selectedIds.add(id);
    }
  };

  // Select single item
  const selectItem = (id: string | number): void => {
    selectionState.value.selectedIds.add(id);
  };

  // Clear all selections
  const clearSelection = (): void => {
    selectionState.value.selectedIds.clear();
  };

  // Select all items
  const selectAll = (): void => {
    items.value.forEach((item, index) => {
      const id = item.id || index;
      selectionState.value.selectedIds.add(id);
    });
  };

  // Check if item is selected
  const isItemSelected = (item: T, index: number): boolean => {
    const id = item.id || index;
    return selectionState.value.selectedIds.has(id);
  };

  // Computed properties
  const selectedItems = computed(() => 
    items.value.filter((item, index) => isItemSelected(item, index))
  );

  const selectedCount = computed(() => 
    selectionState.value.selectedIds.size
  );

  const isAllSelected = computed(() => 
    items.value.length > 0 && selectedCount.value === items.value.length
  );

  const isIndeterminate = computed(() => 
    selectedCount.value > 0 && selectedCount.value < items.value.length
  );

  return {
    selectionState,
    selectedItems,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    handleRowClick,
    selectRange,
    toggleSelection,
    selectItem,
    clearSelection,
    selectAll,
    isItemSelected
  };
}