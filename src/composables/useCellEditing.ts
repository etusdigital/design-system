import { ref, computed, nextTick, watch } from 'vue';
import type { Ref, Component } from 'vue';
import type { BTableHeader, BTableItem } from '../components/BTable/BTable.types';

export interface CellEditor {
  /** Editor component */
  component: Component | string;
  /** Props to pass to editor component */
  props?: Record<string, any>;
  /** Whether to validate on input */
  validateOnInput?: boolean;
  /** Whether to validate on blur */
  validateOnBlur?: boolean;
  /** Custom validation function */
  validator?: (value: any, item: BTableItem, header: BTableHeader) => string | null;
  /** Transform value before saving */
  transformer?: (value: any, item: BTableItem, header: BTableHeader) => any;
}

export interface ValidationRule {
  /** Rule name/type */
  type: string;
  /** Error message */
  message: string;
  /** Rule parameters */
  params?: any;
  /** Custom validation function */
  validator?: (value: any, params?: any) => boolean;
}

export interface CellEditingState {
  /** Currently editing cell */
  editingCell: { row: number; column: string } | null;
  /** Original value before editing */
  originalValue: any;
  /** Current edit value */
  currentValue: any;
  /** Whether edit is valid */
  isValid: boolean;
  /** Current validation errors */
  validationErrors: string[];
  /** Whether changes are pending */
  hasChanges: boolean;
  /** Edit history for undo/redo */
  editHistory: EditHistoryEntry[];
  /** Current history position */
  historyPosition: number;
}

export interface EditHistoryEntry {
  row: number;
  column: string;
  oldValue: any;
  newValue: any;
  timestamp: number;
}

export interface CellEditingOptions {
  /** Default editor for different data types */
  defaultEditors?: Record<string, CellEditor>;
  /** Global validation rules */
  globalValidationRules?: ValidationRule[];
  /** Whether to enable undo/redo */
  enableHistory?: boolean;
  /** Maximum history entries */
  maxHistoryEntries?: number;
  /** Auto-save interval (0 to disable) */
  autoSaveInterval?: number;
  /** Whether to announce validation errors */
  announceErrors?: boolean;
  /** Validation debounce delay */
  validationDebounce?: number;
  /** Whether to validate on type */
  validateOnType?: boolean;
}

const DEFAULT_VALIDATION_RULES: ValidationRule[] = [
  {
    type: 'required',
    message: 'This field is required',
    validator: (value) => value != null && String(value).trim() !== ''
  },
  {
    type: 'email',
    message: 'Invalid email address',
    validator: (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
  },
  {
    type: 'url',
    message: 'Invalid URL',
    validator: (value) => !value || /^https?:\/\/.+/.test(String(value))
  },
  {
    type: 'min',
    message: 'Value is too small',
    validator: (value, min) => !value || Number(value) >= min
  },
  {
    type: 'max',
    message: 'Value is too large',
    validator: (value, max) => !value || Number(value) <= max
  },
  {
    type: 'minLength',
    message: 'Text is too short',
    validator: (value, minLength) => !value || String(value).length >= minLength
  },
  {
    type: 'maxLength',
    message: 'Text is too long',
    validator: (value, maxLength) => !value || String(value).length <= maxLength
  },
  {
    type: 'pattern',
    message: 'Invalid format',
    validator: (value, pattern) => !value || new RegExp(pattern).test(String(value))
  },
  {
    type: 'integer',
    message: 'Must be a whole number',
    validator: (value) => !value || Number.isInteger(Number(value))
  },
  {
    type: 'positive',
    message: 'Must be positive',
    validator: (value) => !value || Number(value) > 0
  }
];

const DEFAULT_OPTIONS: Required<CellEditingOptions> = {
  defaultEditors: {},
  globalValidationRules: DEFAULT_VALIDATION_RULES,
  enableHistory: true,
  maxHistoryEntries: 50,
  autoSaveInterval: 0,
  announceErrors: true,
  validationDebounce: 300,
  validateOnType: true
};

export function useCellEditing<T extends BTableItem>(
  items: Ref<T[]>,
  headers: Ref<BTableHeader[]>,
  options: CellEditingOptions = {}
) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // State
  const editingState = ref<CellEditingState>({
    editingCell: null,
    originalValue: null,
    currentValue: null,
    isValid: true,
    validationErrors: [],
    hasChanges: false,
    editHistory: [],
    historyPosition: -1
  });
  
  // Auto-save timer
  const autoSaveTimer = ref<NodeJS.Timeout | null>(null);
  
  // Screen reader announcements
  const announce = (message: string): void => {
    if (!opts.announceErrors) return;
    
    let liveRegion = document.getElementById('cell-editing-announcements');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'cell-editing-announcements';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
  };
  
  // Get cell editor configuration
  const getCellEditor = (header: BTableHeader): CellEditor | null => {
    // Column-specific editor
    if (header.editor) {
      if (typeof header.editor === 'string') {
        return opts.defaultEditors[header.editor] || null;
      }
      return header.editor as CellEditor;
    }
    
    // Default editor based on data type
    const dataType = header.dataType || 'text';
    return opts.defaultEditors[dataType] || null;
  };
  
  // Validate cell value
  const validateCellValue = (
    value: any,
    header: BTableHeader,
    item: T
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // Column-specific validation
    if (header.validator) {
      const customError = header.validator(value, item, header);
      if (customError) {
        errors.push(customError);
      }
    }
    
    // Editor-specific validation
    const editor = getCellEditor(header);
    if (editor?.validator) {
      const editorError = editor.validator(value, item, header);
      if (editorError) {
        errors.push(editorError);
      }
    }
    
    // Apply global validation rules
    if (header.validationRules) {
      header.validationRules.forEach(rule => {
        const globalRule = opts.globalValidationRules.find(r => r.type === rule.type);
        if (globalRule?.validator && !globalRule.validator(value, rule.params)) {
          errors.push(rule.message || globalRule.message);
        }
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  // Check if cell is editable
  const isCellEditable = (header: BTableHeader, item: T): boolean => {
    // Global editable flag
    if (!header.editable) return false;
    
    // Item-specific disabled state
    if (item.disabled) return false;
    
    // Custom editable function
    if (typeof header.editable === 'function') {
      return header.editable(item, header);
    }
    
    return true;
  };
  
  // Start editing cell
  const startEdit = (rowIndex: number, columnKey: string): boolean => {
    const item = items.value[rowIndex];
    const header = headers.value.find(h => h.value === columnKey);
    
    if (!item || !header || !isCellEditable(header, item)) {
      return false;
    }
    
    // Save any existing edit first
    if (editingState.value.editingCell) {
      saveEdit();
    }
    
    const currentValue = item[columnKey];
    
    editingState.value = {
      ...editingState.value,
      editingCell: { row: rowIndex, column: columnKey },
      originalValue: currentValue,
      currentValue: currentValue,
      isValid: true,
      validationErrors: [],
      hasChanges: false
    };
    
    // Set up auto-save if enabled
    if (opts.autoSaveInterval > 0) {
      autoSaveTimer.value = setTimeout(() => {
        saveEdit();
      }, opts.autoSaveInterval);
    }
    
    announce(`Editing ${header.label || columnKey}`);
    return true;
  };
  
  // Update edit value
  const updateEditValue = (value: any): void => {
    if (!editingState.value.editingCell) return;
    
    const { row, column } = editingState.value.editingCell;
    const header = headers.value.find(h => h.value === column);
    const item = items.value[row];
    
    if (!header || !item) return;
    
    editingState.value.currentValue = value;
    editingState.value.hasChanges = value !== editingState.value.originalValue;
    
    // Validate if enabled
    if (opts.validateOnType) {
      const validation = validateCellValue(value, header, item);
      editingState.value.isValid = validation.isValid;
      editingState.value.validationErrors = validation.errors;
      
      if (!validation.isValid && opts.announceErrors) {
        announce(`Validation error: ${validation.errors.join(', ')}`);
      }
    }
    
    // Reset auto-save timer
    if (autoSaveTimer.value) {
      clearTimeout(autoSaveTimer.value);
      autoSaveTimer.value = setTimeout(() => {
        saveEdit();
      }, opts.autoSaveInterval);
    }
  };
  
  // Save current edit
  const saveEdit = (): boolean => {
    if (!editingState.value.editingCell || !editingState.value.hasChanges) {
      cancelEdit();
      return true;
    }
    
    const { row, column } = editingState.value.editingCell;
    const header = headers.value.find(h => h.value === column);
    const item = items.value[row];
    
    if (!header || !item) return false;
    
    // Final validation
    const validation = validateCellValue(editingState.value.currentValue, header, item);
    if (!validation.isValid) {
      editingState.value.isValid = false;
      editingState.value.validationErrors = validation.errors;
      announce(`Cannot save: ${validation.errors.join(', ')}`);
      return false;
    }
    
    // Transform value if needed
    const editor = getCellEditor(header);
    let finalValue = editingState.value.currentValue;
    
    if (editor?.transformer) {
      finalValue = editor.transformer(finalValue, item, header);
    }
    
    // Add to history
    if (opts.enableHistory) {
      addToHistory(row, column, editingState.value.originalValue, finalValue);
    }
    
    // Update the item
    (item as any)[column] = finalValue;
    
    // Clear editing state
    clearEditingState();
    
    announce(`Cell saved`);
    return true;
  };
  
  // Cancel current edit
  const cancelEdit = (): void => {
    clearEditingState();
    announce('Edit cancelled');
  };
  
  // Clear editing state
  const clearEditingState = (): void => {
    if (autoSaveTimer.value) {
      clearTimeout(autoSaveTimer.value);
      autoSaveTimer.value = null;
    }
    
    editingState.value = {
      ...editingState.value,
      editingCell: null,
      originalValue: null,
      currentValue: null,
      isValid: true,
      validationErrors: [],
      hasChanges: false
    };
  };
  
  // Add entry to edit history
  const addToHistory = (
    row: number,
    column: string,
    oldValue: any,
    newValue: any
  ): void => {
    const entry: EditHistoryEntry = {
      row,
      column,
      oldValue,
      newValue,
      timestamp: Date.now()
    };
    
    // Remove any entries after current position (if we're in middle of history)
    const newHistory = [
      ...editingState.value.editHistory.slice(0, editingState.value.historyPosition + 1),
      entry
    ];
    
    // Limit history size
    if (newHistory.length > opts.maxHistoryEntries) {
      newHistory.shift();
    } else {
      editingState.value.historyPosition++;
    }
    
    editingState.value.editHistory = newHistory;
  };
  
  // Undo last edit
  const undoEdit = (): boolean => {
    if (!canUndo.value) return false;
    
    const entry = editingState.value.editHistory[editingState.value.historyPosition];
    const item = items.value[entry.row];
    
    if (!item) return false;
    
    // Restore old value
    (item as any)[entry.column] = entry.oldValue;
    editingState.value.historyPosition--;
    
    const header = headers.value.find(h => h.value === entry.column);
    announce(`Undid change to ${header?.label || entry.column}`);
    return true;
  };
  
  // Redo last undone edit
  const redoEdit = (): boolean => {
    if (!canRedo.value) return false;
    
    editingState.value.historyPosition++;
    const entry = editingState.value.editHistory[editingState.value.historyPosition];
    const item = items.value[entry.row];
    
    if (!item) return false;
    
    // Apply new value
    (item as any)[entry.column] = entry.newValue;
    
    const header = headers.value.find(h => h.value === entry.column);
    announce(`Redid change to ${header?.label || entry.column}`);
    return true;
  };
  
  // Clear edit history
  const clearHistory = (): void => {
    editingState.value.editHistory = [];
    editingState.value.historyPosition = -1;
    announce('Edit history cleared');
  };
  
  // Handle keyboard events
  const handleKeyDown = (event: KeyboardEvent): boolean => {
    if (!editingState.value.editingCell) return false;
    
    switch (event.key) {
      case 'Enter':
        if (!event.shiftKey) {
          event.preventDefault();
          return saveEdit();
        }
        break;
        
      case 'Escape':
        event.preventDefault();
        cancelEdit();
        return true;
        
      case 'Tab':
        event.preventDefault();
        if (saveEdit()) {
          // Move to next editable cell
          const direction = event.shiftKey ? -1 : 1;
          moveToNextEditableCell(direction);
        }
        return true;
        
      case 'z':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          if (event.shiftKey) {
            return redoEdit();
          } else {
            return undoEdit();
          }
        }
        break;
        
      case 'y':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          return redoEdit();
        }
        break;
    }
    
    return false;
  };
  
  // Move to next editable cell
  const moveToNextEditableCell = (direction: 1 | -1): void => {
    if (!editingState.value.editingCell) return;
    
    const { row, column } = editingState.value.editingCell;
    const currentHeaderIndex = headers.value.findIndex(h => h.value === column);
    const editableHeaders = headers.value.filter(h => h.editable !== false);
    
    let nextRow = row;
    let nextHeaderIndex = currentHeaderIndex;
    
    // Try next column first
    nextHeaderIndex += direction;
    
    // Wrap to next/previous row if needed
    if (nextHeaderIndex >= editableHeaders.length) {
      nextHeaderIndex = 0;
      nextRow = Math.min(items.value.length - 1, row + 1);
    } else if (nextHeaderIndex < 0) {
      nextHeaderIndex = editableHeaders.length - 1;
      nextRow = Math.max(0, row - 1);
    }
    
    // Start editing next cell
    if (nextRow !== row || nextHeaderIndex !== currentHeaderIndex) {
      const nextHeader = editableHeaders[nextHeaderIndex];
      if (nextHeader && nextRow >= 0 && nextRow < items.value.length) {
        nextTick(() => {
          startEdit(nextRow, nextHeader.value);
        });
      }
    }
  };
  
  // Bulk edit multiple cells
  const bulkEdit = (
    changes: Array<{ row: number; column: string; value: any }>
  ): { success: boolean; errors: string[] } => {
    const errors: string[] = [];
    const validChanges: typeof changes = [];
    
    // Validate all changes first
    changes.forEach(change => {
      const item = items.value[change.row];
      const header = headers.value.find(h => h.value === change.column);
      
      if (!item || !header) {
        errors.push(`Invalid cell reference: row ${change.row}, column ${change.column}`);
        return;
      }
      
      if (!isCellEditable(header, item)) {
        errors.push(`Cell is not editable: row ${change.row}, column ${change.column}`);
        return;
      }
      
      const validation = validateCellValue(change.value, header, item);
      if (!validation.isValid) {
        errors.push(`Validation failed for row ${change.row}, column ${change.column}: ${validation.errors.join(', ')}`);
        return;
      }
      
      validChanges.push(change);
    });
    
    // Apply valid changes
    if (errors.length === 0) {
      validChanges.forEach(change => {
        const item = items.value[change.row];
        const header = headers.value.find(h => h.value === change.column)!;
        
        // Add to history
        if (opts.enableHistory) {
          addToHistory(change.row, change.column, item[change.column], change.value);
        }
        
        // Apply change
        (item as any)[change.column] = change.value;
      });
      
      announce(`Bulk edit completed: ${validChanges.length} cells updated`);
      return { success: true, errors: [] };
    }
    
    announce(`Bulk edit failed: ${errors.length} errors`);
    return { success: false, errors };
  };
  
  // Computed properties
  const isEditing = computed(() => editingState.value.editingCell !== null);
  const canUndo = computed(() => editingState.value.historyPosition >= 0);
  const canRedo = computed(() => editingState.value.historyPosition < editingState.value.editHistory.length - 1);
  
  const currentEditInfo = computed(() => {
    if (!editingState.value.editingCell) return null;
    
    const { row, column } = editingState.value.editingCell;
    const header = headers.value.find(h => h.value === column);
    const item = items.value[row];
    
    return {
      row,
      column,
      header,
      item,
      originalValue: editingState.value.originalValue,
      currentValue: editingState.value.currentValue,
      isValid: editingState.value.isValid,
      errors: editingState.value.validationErrors,
      hasChanges: editingState.value.hasChanges
    };
  });
  
  // Watch for item changes to sync validation
  watch(
    () => editingState.value.currentValue,
    () => {
      if (editingState.value.editingCell && opts.validateOnType) {
        const { row, column } = editingState.value.editingCell;
        const header = headers.value.find(h => h.value === column);
        const item = items.value[row];
        
        if (header && item) {
          const validation = validateCellValue(editingState.value.currentValue, header, item);
          editingState.value.isValid = validation.isValid;
          editingState.value.validationErrors = validation.errors;
        }
      }
    }
  );
  
  return {
    // State
    editingState,
    isEditing,
    canUndo,
    canRedo,
    currentEditInfo,
    
    // Edit methods
    startEdit,
    updateEditValue,
    saveEdit,
    cancelEdit,
    
    // History methods
    undoEdit,
    redoEdit,
    clearHistory,
    
    // Utility methods
    isCellEditable,
    validateCellValue,
    getCellEditor,
    handleKeyDown,
    bulkEdit,
    
    // Navigation
    moveToNextEditableCell
  };
}