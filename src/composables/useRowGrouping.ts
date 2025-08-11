import { ref, computed, watch } from 'vue';
import type { Ref } from 'vue';
import type { BTableHeader, BTableItem } from '../components/BTable/BTable.types';

export interface GroupConfiguration {
  /** Column to group by */
  column: string;
  /** Custom group value formatter */
  formatter?: (value: any) => string;
  /** Whether to show group counts */
  showCount?: boolean;
  /** Custom aggregation functions */
  aggregations?: Record<string, (items: any[]) => any>;
}

export interface GroupedRow<T> {
  /** Group key */
  key: string;
  /** Group display value */
  value: string;
  /** Items in this group */
  items: T[];
  /** Whether group is expanded */
  expanded: boolean;
  /** Group aggregation results */
  aggregations: Record<string, any>;
  /** Nesting level */
  level: number;
  /** Parent group key */
  parentKey?: string;
}

export interface GroupingState<T> {
  /** Current grouping configuration */
  groupBy: string[];
  /** Grouped data structure */
  groups: Map<string, GroupedRow<T>>;
  /** Flattened display rows */
  displayRows: (T | GroupedRow<T>)[];
  /** Expanded group keys */
  expandedGroups: Set<string>;
}

export function useRowGrouping<T extends BTableItem>(
  items: Ref<T[]>,
  headers: Ref<BTableHeader[]>
) {
  const groupingState = ref<GroupingState<T>>({
    groupBy: [],
    groups: new Map(),
    displayRows: [],
    expandedGroups: new Set()
  });

  // Group items by configuration
  const groupItems = (groupConfigs: GroupConfiguration[]): void => {
    if (groupConfigs.length === 0) {
      groupingState.value.displayRows = items.value;
      return;
    }

    const groups = new Map<string, GroupedRow<T>>();
    
    items.value.forEach(item => {
      let parentKey = '';
      
      groupConfigs.forEach((config, level) => {
        const value = item[config.column];
        const displayValue = config.formatter ? config.formatter(value) : String(value || '');
        const groupKey = parentKey ? `${parentKey}|${value}` : String(value);
        
        if (!groups.has(groupKey)) {
          const aggregations: Record<string, any> = {};
          
          if (config.aggregations) {
            Object.entries(config.aggregations).forEach(([key, fn]) => {
              aggregations[key] = fn([]);
            });
          }
          
          groups.set(groupKey, {
            key: groupKey,
            value: displayValue,
            items: [],
            expanded: groupingState.value.expandedGroups.has(groupKey),
            aggregations,
            level,
            parentKey: parentKey || undefined
          });
        }
        
        groups.get(groupKey)!.items.push(item);
        parentKey = groupKey;
      });
    });
    
    // Update aggregations
    groups.forEach(group => {
      const config = groupConfigs[group.level];
      if (config.aggregations) {
        Object.entries(config.aggregations).forEach(([key, fn]) => {
          group.aggregations[key] = fn(group.items);
        });
      }
    });
    
    groupingState.value.groups = groups;
    updateDisplayRows();
  };

  // Update flattened display rows
  const updateDisplayRows = (): void => {
    const displayRows: (T | GroupedRow<T>)[] = [];
    
    const addGroupRows = (parentKey = '', level = 0) => {
      const groupsAtLevel = Array.from(groupingState.value.groups.values())
        .filter(g => g.level === level && g.parentKey === (parentKey || undefined));
      
      groupsAtLevel.forEach(group => {
        displayRows.push(group);
        
        if (group.expanded) {
          const hasSubGroups = Array.from(groupingState.value.groups.values())
            .some(g => g.parentKey === group.key);
          
          if (hasSubGroups) {
            addGroupRows(group.key, level + 1);
          } else {
            displayRows.push(...group.items);
          }
        }
      });
    };
    
    addGroupRows();
    groupingState.value.displayRows = displayRows;
  };

  // Toggle group expansion
  const toggleGroup = (groupKey: string): void => {
    if (groupingState.value.expandedGroups.has(groupKey)) {
      groupingState.value.expandedGroups.delete(groupKey);
    } else {
      groupingState.value.expandedGroups.add(groupKey);
    }
    
    const group = groupingState.value.groups.get(groupKey);
    if (group) {
      group.expanded = !group.expanded;
    }
    
    updateDisplayRows();
  };

  // Set grouping configuration
  const setGrouping = (configs: GroupConfiguration[]): void => {
    groupingState.value.groupBy = configs.map(c => c.column);
    groupItems(configs);
  };

  // Clear grouping
  const clearGrouping = (): void => {
    groupingState.value.groupBy = [];
    groupingState.value.groups.clear();
    groupingState.value.displayRows = items.value;
    groupingState.value.expandedGroups.clear();
  };

  return {
    groupingState,
    setGrouping,
    clearGrouping,
    toggleGroup,
    groupItems
  };
}