import { ref, computed, watch, nextTick } from 'vue';
import type { Ref } from 'vue';
import { debounce } from '../utils/index';
import type { BTableHeader, BTableItem } from '../components/BTable/BTable.types';

export interface FilterOperator {
  key: string;
  label: string;
  symbol: string;
  description: string;
  supportedTypes: ('text' | 'number' | 'date' | 'boolean')[];
  requiresValue: boolean;
  multipleValues?: boolean;
}

export interface ColumnFilter {
  column: string;
  operator: string;
  value: any;
  values?: any[];
  enabled: boolean;
  label?: string;
  description?: string;
}

export interface FilterState {
  filters: Record<string, ColumnFilter>;
  activeFilters: ColumnFilter[];
  globalFilter: string;
  isFiltering: boolean;
  filteredCount: number;
  totalCount: number;
  filterUIOpen: Record<string, boolean>;
}

export interface AdvancedFilterOptions {
  /** Whether to enable global search */
  enableGlobalFilter?: boolean;
  /** Debounce delay for filter changes */
  debounceDelay?: number;
  /** Whether to announce filter results */
  announceResults?: boolean;
  /** Case sensitive filtering */
  caseSensitive?: boolean;
  /** Whether to persist filter state */
  persistFilters?: boolean;
  /** Storage key for persisting filters */
  storageKey?: string;
  /** Custom filter operators */
  customOperators?: FilterOperator[];
  /** Whether to show filter count badges */
  showFilterCount?: boolean;
}

const DEFAULT_FILTER_OPERATORS: FilterOperator[] = [
  // Text operators
  { key: 'contains', label: 'Contains', symbol: '∋', description: 'Contains text', supportedTypes: ['text'], requiresValue: true },
  { key: 'notContains', label: 'Does not contain', symbol: '∌', description: 'Does not contain text', supportedTypes: ['text'], requiresValue: true },
  { key: 'startsWith', label: 'Starts with', symbol: '⌐', description: 'Starts with text', supportedTypes: ['text'], requiresValue: true },
  { key: 'endsWith', label: 'Ends with', symbol: '¬', description: 'Ends with text', supportedTypes: ['text'], requiresValue: true },
  { key: 'equals', label: 'Equals', symbol: '=', description: 'Exactly equals', supportedTypes: ['text', 'number', 'date'], requiresValue: true },
  { key: 'notEquals', label: 'Not equals', symbol: '≠', description: 'Does not equal', supportedTypes: ['text', 'number', 'date'], requiresValue: true },
  { key: 'isEmpty', label: 'Is empty', symbol: '∅', description: 'Is empty or null', supportedTypes: ['text'], requiresValue: false },
  { key: 'isNotEmpty', label: 'Is not empty', symbol: '¬∅', description: 'Is not empty or null', supportedTypes: ['text'], requiresValue: false },
  
  // Number operators
  { key: 'greaterThan', label: 'Greater than', symbol: '>', description: 'Greater than value', supportedTypes: ['number', 'date'], requiresValue: true },
  { key: 'greaterThanOrEqual', label: 'Greater than or equal', symbol: '≥', description: 'Greater than or equal to value', supportedTypes: ['number', 'date'], requiresValue: true },
  { key: 'lessThan', label: 'Less than', symbol: '<', description: 'Less than value', supportedTypes: ['number', 'date'], requiresValue: true },
  { key: 'lessThanOrEqual', label: 'Less than or equal', symbol: '≤', description: 'Less than or equal to value', supportedTypes: ['number', 'date'], requiresValue: true },
  { key: 'between', label: 'Between', symbol: '⟷', description: 'Between two values', supportedTypes: ['number', 'date'], requiresValue: true, multipleValues: true },
  
  // Boolean operators
  { key: 'isTrue', label: 'Is true', symbol: '✓', description: 'Value is true', supportedTypes: ['boolean'], requiresValue: false },
  { key: 'isFalse', label: 'Is false', symbol: '✗', description: 'Value is false', supportedTypes: ['boolean'], requiresValue: false },
  
  // Array/Multiple operators
  { key: 'in', label: 'In list', symbol: '∈', description: 'Value is in list', supportedTypes: ['text', 'number'], requiresValue: true, multipleValues: true },
  { key: 'notIn', label: 'Not in list', symbol: '∉', description: 'Value is not in list', supportedTypes: ['text', 'number'], requiresValue: true, multipleValues: true },
];

const DEFAULT_OPTIONS: Required<AdvancedFilterOptions> = {
  enableGlobalFilter: true,
  debounceDelay: 300,
  announceResults: true,
  caseSensitive: false,
  persistFilters: true,
  storageKey: 'btable_advanced_filters',
  customOperators: [],
  showFilterCount: true
};

export function useAdvancedFiltering<T extends BTableItem>(
  items: Ref<T[]>,
  headers: Ref<BTableHeader[]>,
  options: AdvancedFilterOptions = {}
) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Available operators (default + custom)
  const availableOperators = [...DEFAULT_FILTER_OPERATORS, ...opts.customOperators];
  
  // State
  const filterState = ref<FilterState>({
    filters: {},
    activeFilters: [],
    globalFilter: '',
    isFiltering: false,
    filteredCount: 0,
    totalCount: 0,
    filterUIOpen: {}
  });
  
  // Screen reader announcements
  const announce = (message: string): void => {
    if (!opts.announceResults) return;
    
    // Create or get live region
    let liveRegion = document.getElementById('filter-announcements');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'filter-announcements';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
  };
  
  // Load persisted filters
  const loadPersistedFilters = (): Record<string, ColumnFilter> => {
    if (!opts.persistFilters || typeof window === 'undefined') return {};
    
    try {
      const stored = localStorage.getItem(opts.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('[useAdvancedFiltering] Failed to load persisted filters:', error);
      return {};
    }
  };
  
  // Save filters to localStorage
  const persistFilters = (filters: Record<string, ColumnFilter>): void => {
    if (!opts.persistFilters || typeof window === 'undefined') return;
    
    try {
      // Only persist enabled filters
      const enabledFilters = Object.fromEntries(
        Object.entries(filters).filter(([, filter]) => filter.enabled)
      );
      localStorage.setItem(opts.storageKey, JSON.stringify(enabledFilters));
    } catch (error) {
      console.warn('[useAdvancedFiltering] Failed to persist filters:', error);
    }
  };
  
  // Initialize filters
  const initializeFilters = (): void => {
    const persistedFilters = loadPersistedFilters();
    filterState.value.filters = persistedFilters;
    updateActiveFilters();
  };
  
  // Get column data type
  const getColumnDataType = (header: BTableHeader): 'text' | 'number' | 'date' | 'boolean' => {
    if (header.dataType) return header.dataType;
    
    // Try to infer from sample data
    if (items.value.length > 0) {
      const sampleValue = items.value[0][header.value];
      
      if (typeof sampleValue === 'number') return 'number';
      if (typeof sampleValue === 'boolean') return 'boolean';
      if (sampleValue instanceof Date) return 'date';
      if (typeof sampleValue === 'string' && !isNaN(Date.parse(sampleValue))) return 'date';
    }
    
    return 'text';
  };
  
  // Get available operators for column
  const getOperatorsForColumn = (header: BTableHeader): FilterOperator[] => {
    const dataType = getColumnDataType(header);
    return availableOperators.filter(op => op.supportedTypes.includes(dataType));
  };
  
  // Apply single filter
  const applyFilter = (item: T, filter: ColumnFilter): boolean => {
    if (!filter.enabled) return true;
    
    const value = item[filter.column];
    const operator = availableOperators.find(op => op.key === filter.operator);
    
    if (!operator) return true;
    
    return evaluateFilterCondition(value, filter, operator);
  };
  
  // Evaluate filter condition
  const evaluateFilterCondition = (value: any, filter: ColumnFilter, operator: FilterOperator): boolean => {
    const filterValue = filter.value;
    const caseSensitive = opts.caseSensitive;
    
    // Handle null/undefined values
    if (value == null) {
      return ['isEmpty', 'isFalse'].includes(operator.key);
    }
    
    // Convert values for comparison if needed
    const normalizedValue = caseSensitive ? String(value) : String(value).toLowerCase();
    const normalizedFilterValue = caseSensitive ? String(filterValue) : String(filterValue || '').toLowerCase();
    
    switch (operator.key) {
      case 'contains':
        return normalizedValue.includes(normalizedFilterValue);
        
      case 'notContains':
        return !normalizedValue.includes(normalizedFilterValue);
        
      case 'startsWith':
        return normalizedValue.startsWith(normalizedFilterValue);
        
      case 'endsWith':
        return normalizedValue.endsWith(normalizedFilterValue);
        
      case 'equals':
        return normalizedValue === normalizedFilterValue;
        
      case 'notEquals':
        return normalizedValue !== normalizedFilterValue;
        
      case 'isEmpty':
        return value == null || String(value).trim() === '';
        
      case 'isNotEmpty':
        return value != null && String(value).trim() !== '';
        
      case 'greaterThan':
        return Number(value) > Number(filterValue);
        
      case 'greaterThanOrEqual':
        return Number(value) >= Number(filterValue);
        
      case 'lessThan':
        return Number(value) < Number(filterValue);
        
      case 'lessThanOrEqual':
        return Number(value) <= Number(filterValue);
        
      case 'between':
        if (filter.values && filter.values.length === 2) {
          const [min, max] = filter.values.map(Number);
          const numValue = Number(value);
          return numValue >= min && numValue <= max;
        }
        return true;
        
      case 'isTrue':
        return Boolean(value) === true;
        
      case 'isFalse':
        return Boolean(value) === false;
        
      case 'in':
        if (filter.values) {
          return filter.values.some(v => 
            caseSensitive ? String(value) === String(v) : String(value).toLowerCase() === String(v).toLowerCase()
          );
        }
        return true;
        
      case 'notIn':
        if (filter.values) {
          return !filter.values.some(v => 
            caseSensitive ? String(value) === String(v) : String(value).toLowerCase() === String(v).toLowerCase()
          );
        }
        return true;
        
      default:
        return true;
    }
  };
  
  // Apply global filter
  const applyGlobalFilter = (item: T, searchTerm: string): boolean => {
    if (!searchTerm.trim()) return true;
    
    const normalizedSearchTerm = opts.caseSensitive ? searchTerm : searchTerm.toLowerCase();
    
    // Search in all string values
    return headers.value.some(header => {
      const value = item[header.value];
      if (value == null) return false;
      
      const normalizedValue = opts.caseSensitive ? String(value) : String(value).toLowerCase();
      return normalizedValue.includes(normalizedSearchTerm);
    });
  };
  
  // Update active filters
  const updateActiveFilters = (): void => {
    const active = Object.values(filterState.value.filters).filter(f => f.enabled);
    filterState.value.activeFilters = active;
    filterState.value.isFiltering = active.length > 0 || filterState.value.globalFilter.trim() !== '';
  };
  
  // Filter items
  const filteredItems = computed(() => {
    let result = items.value;
    
    // Apply column filters
    filterState.value.activeFilters.forEach(filter => {
      result = result.filter(item => applyFilter(item, filter));
    });
    
    // Apply global filter
    if (opts.enableGlobalFilter && filterState.value.globalFilter.trim()) {
      result = result.filter(item => applyGlobalFilter(item, filterState.value.globalFilter));
    }
    
    // Update counts
    filterState.value.filteredCount = result.length;
    filterState.value.totalCount = items.value.length;
    
    return result;
  });
  
  // Debounced filter update
  const debouncedFilterUpdate = debounce(() => {
    updateActiveFilters();
    persistFilters(filterState.value.filters);
  }, opts.debounceDelay);
  
  // Set column filter
  const setColumnFilter = (column: string, operator: string, value: any, values?: any[]): void => {
    const header = headers.value.find(h => h.value === column);
    if (!header) return;
    
    const filter: ColumnFilter = {
      column,
      operator,
      value,
      values,
      enabled: true,
      label: header.label || column,
      description: `${header.label || column} ${availableOperators.find(op => op.key === operator)?.label || operator} ${value}`
    };
    
    filterState.value.filters[column] = filter;
    debouncedFilterUpdate();
    
    const operatorLabel = availableOperators.find(op => op.key === operator)?.label || operator;
    announce(`Filter applied: ${header.label || column} ${operatorLabel} ${value}`);
  };
  
  // Clear column filter
  const clearColumnFilter = (column: string): void => {
    if (filterState.value.filters[column]) {
      delete filterState.value.filters[column];
      debouncedFilterUpdate();
      
      const header = headers.value.find(h => h.value === column);
      announce(`Filter cleared for ${header?.label || column}`);
    }
  };
  
  // Toggle column filter
  const toggleColumnFilter = (column: string): void => {
    const filter = filterState.value.filters[column];
    if (filter) {
      filter.enabled = !filter.enabled;
      debouncedFilterUpdate();
      
      const header = headers.value.find(h => h.value === column);
      const action = filter.enabled ? 'enabled' : 'disabled';
      announce(`Filter ${action} for ${header?.label || column}`);
    }
  };
  
  // Set global filter
  const setGlobalFilter = (searchTerm: string): void => {
    filterState.value.globalFilter = searchTerm;
    debouncedFilterUpdate();
    
    if (searchTerm.trim()) {
      announce(`Global search applied: "${searchTerm}"`);
    } else {
      announce('Global search cleared');
    }
  };
  
  // Clear all filters
  const clearAllFilters = (): void => {
    filterState.value.filters = {};
    filterState.value.globalFilter = '';
    updateActiveFilters();
    persistFilters({});
    
    announce('All filters cleared');
  };
  
  // Get filter count for column
  const getColumnFilterCount = (column: string): number => {
    const filter = filterState.value.filters[column];
    return filter && filter.enabled ? 1 : 0;
  };
  
  // Check if column has active filter
  const hasColumnFilter = (column: string): boolean => {
    const filter = filterState.value.filters[column];
    return Boolean(filter && filter.enabled);
  };
  
  // Get filter summary
  const getFilterSummary = (): string => {
    const activeCount = filterState.value.activeFilters.length;
    const globalFilterActive = filterState.value.globalFilter.trim() !== '';
    const totalFilters = activeCount + (globalFilterActive ? 1 : 0);
    
    if (totalFilters === 0) {
      return `Showing all ${filterState.value.totalCount} items`;
    }
    
    return `Showing ${filterState.value.filteredCount} of ${filterState.value.totalCount} items (${totalFilters} filter${totalFilters > 1 ? 's' : ''} active)`;
  };
  
  // Export filter configuration
  const exportFilters = (): string => {
    const config = {
      filters: filterState.value.filters,
      globalFilter: filterState.value.globalFilter,
      timestamp: Date.now()
    };
    
    return JSON.stringify(config, null, 2);
  };
  
  // Import filter configuration
  const importFilters = (configJson: string): boolean => {
    try {
      const config = JSON.parse(configJson);
      
      if (config.filters && typeof config.filters === 'object') {
        filterState.value.filters = config.filters;
        filterState.value.globalFilter = config.globalFilter || '';
        updateActiveFilters();
        persistFilters(filterState.value.filters);
        
        announce('Filters imported successfully');
        return true;
      }
    } catch (error) {
      console.warn('[useAdvancedFiltering] Failed to import filters:', error);
      announce('Failed to import filters');
    }
    
    return false;
  };
  
  // Toggle filter UI for column
  const toggleFilterUI = (column: string): void => {
    const currentState = filterState.value.filterUIOpen[column] || false;
    
    // Close all other filter UIs
    filterState.value.filterUIOpen = {};
    
    // Toggle the requested one
    filterState.value.filterUIOpen[column] = !currentState;
  };
  
  // Close all filter UIs
  const closeAllFilterUI = (): void => {
    filterState.value.filterUIOpen = {};
  };
  
  // Initialize on first use
  initializeFilters();
  
  // Watch items for count updates
  watch(
    () => items.value.length,
    (newLength) => {
      filterState.value.totalCount = newLength;
    },
    { immediate: true }
  );
  
  return {
    // State
    filterState,
    filteredItems,
    availableOperators,
    
    // Filter methods
    setColumnFilter,
    clearColumnFilter,
    toggleColumnFilter,
    setGlobalFilter,
    clearAllFilters,
    
    // Query methods
    getOperatorsForColumn,
    getColumnDataType,
    getColumnFilterCount,
    hasColumnFilter,
    getFilterSummary,
    
    // UI methods
    toggleFilterUI,
    closeAllFilterUI,
    
    // Import/Export
    exportFilters,
    importFilters,
    
    // Utils
    initializeFilters
  };
}