import { ref, computed, watch, type Ref } from 'vue';
import { useScreenReader } from './useScreenReader';

export interface TreeNode {
  id: string;
  label: string;
  value: string;
  level: number;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  parentId?: string;
  children?: TreeNode[];
}

export interface TreeNavigationOptions {
  /** Whether to announce navigation changes */
  announce?: boolean;
  /** Whether to auto-expand parent nodes when selecting children */
  autoExpand?: boolean;
  /** Whether multiple items can be selected */
  multiSelect?: boolean;
}

/**
 * Composable for managing tree navigation with ARIA compliance
 */
export function useTreeNavigation(
  nodes: Ref<TreeNode[]>,
  options: TreeNavigationOptions = {}
) {
  const { announce = true, autoExpand = true, multiSelect = false } = options;
  const { announcePolitely } = useScreenReader();

  const focusedNodeId = ref<string | null>(null);
  const selectedNodeIds = ref<Set<string>>(new Set());
  const expandedNodeIds = ref<Set<string>>(new Set());

  /**
   * Flattens the tree structure for easier navigation
   */
  const flatNodes = computed(() => {
    const flatten = (nodes: TreeNode[], parentLevel = 0): TreeNode[] => {
      const result: TreeNode[] = [];
      
      for (const node of nodes) {
        const flatNode = { ...node, level: parentLevel };
        result.push(flatNode);
        
        if (node.children && expandedNodeIds.value.has(node.id)) {
          result.push(...flatten(node.children, parentLevel + 1));
        }
      }
      
      return result;
    };
    
    return flatten(nodes.value);
  });

  /**
   * Gets all focusable (non-disabled) nodes
   */
  const focusableNodes = computed(() => {
    return flatNodes.value.filter(node => !node.disabled);
  });

  /**
   * Gets the currently focused node
   */
  const focusedNode = computed(() => {
    return flatNodes.value.find(node => node.id === focusedNodeId.value) || null;
  });

  /**
   * Moves focus to a specific node
   */
  function focusNode(nodeId: string | null): void {
    if (!nodeId) {
      focusedNodeId.value = null;
      return;
    }

    const node = flatNodes.value.find(n => n.id === nodeId);
    if (node && !node.disabled) {
      focusedNodeId.value = nodeId;
      
      if (announce) {
        const position = focusableNodes.value.findIndex(n => n.id === nodeId) + 1;
        const total = focusableNodes.value.length;
        const levelText = node.level > 0 ? `, level ${node.level + 1}` : '';
        const expandedText = node.children && node.children.length > 0 
          ? (expandedNodeIds.value.has(nodeId) ? ', expanded' : ', collapsed')
          : '';
        const selectedText = selectedNodeIds.value.has(nodeId) ? ', selected' : '';
        
        announcePolitely(
          `${node.label}${levelText}${expandedText}${selectedText}, ${position} of ${total}`
        );
      }
    }
  }

  /**
   * Moves focus to the next focusable node
   */
  function focusNext(): void {
    const currentIndex = focusedNodeId.value 
      ? focusableNodes.value.findIndex(node => node.id === focusedNodeId.value)
      : -1;
    
    const nextIndex = currentIndex + 1;
    if (nextIndex < focusableNodes.value.length) {
      focusNode(focusableNodes.value[nextIndex].id);
    } else {
      // Loop to first node
      focusNode(focusableNodes.value[0]?.id || null);
    }
  }

  /**
   * Moves focus to the previous focusable node
   */
  function focusPrevious(): void {
    const currentIndex = focusedNodeId.value 
      ? focusableNodes.value.findIndex(node => node.id === focusedNodeId.value)
      : -1;
    
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      focusNode(focusableNodes.value[prevIndex].id);
    } else {
      // Loop to last node
      const lastNode = focusableNodes.value[focusableNodes.value.length - 1];
      focusNode(lastNode?.id || null);
    }
  }

  /**
   * Moves focus to the first node
   */
  function focusFirst(): void {
    const firstNode = focusableNodes.value[0];
    if (firstNode) {
      focusNode(firstNode.id);
    }
  }

  /**
   * Moves focus to the last node
   */
  function focusLast(): void {
    const lastNode = focusableNodes.value[focusableNodes.value.length - 1];
    if (lastNode) {
      focusNode(lastNode.id);
    }
  }

  /**
   * Expands a node
   */
  function expandNode(nodeId: string): void {
    const node = flatNodes.value.find(n => n.id === nodeId);
    if (node && node.children && node.children.length > 0) {
      expandedNodeIds.value.add(nodeId);
      
      if (announce) {
        announcePolitely(`${node.label} expanded`);
      }
    }
  }

  /**
   * Collapses a node
   */
  function collapseNode(nodeId: string): void {
    const node = flatNodes.value.find(n => n.id === nodeId);
    if (node && expandedNodeIds.value.has(nodeId)) {
      expandedNodeIds.value.delete(nodeId);
      
      if (announce) {
        announcePolitely(`${node.label} collapsed`);
      }
    }
  }

  /**
   * Toggles expansion of a node
   */
  function toggleExpansion(nodeId: string): void {
    if (expandedNodeIds.value.has(nodeId)) {
      collapseNode(nodeId);
    } else {
      expandNode(nodeId);
    }
  }

  /**
   * Selects a node
   */
  function selectNode(nodeId: string, addToSelection = false): void {
    const node = flatNodes.value.find(n => n.id === nodeId);
    if (!node || node.disabled) return;

    if (multiSelect && addToSelection) {
      selectedNodeIds.value.add(nodeId);
    } else {
      // Single selection or replace selection
      selectedNodeIds.value.clear();
      selectedNodeIds.value.add(nodeId);
    }

    // Auto-expand parent nodes if needed
    if (autoExpand) {
      let parentId = node.parentId;
      while (parentId) {
        expandedNodeIds.value.add(parentId);
        const parentNode = flatNodes.value.find(n => n.id === parentId);
        parentId = parentNode?.parentId;
      }
    }

    if (announce) {
      announcePolitely(`Selected ${node.label}`);
    }
  }

  /**
   * Deselects a node
   */
  function deselectNode(nodeId: string): void {
    const node = flatNodes.value.find(n => n.id === nodeId);
    if (node && selectedNodeIds.value.has(nodeId)) {
      selectedNodeIds.value.delete(nodeId);
      
      if (announce) {
        announcePolitely(`Deselected ${node.label}`);
      }
    }
  }

  /**
   * Toggles selection of a node
   */
  function toggleSelection(nodeId: string, addToSelection = false): void {
    if (selectedNodeIds.value.has(nodeId)) {
      deselectNode(nodeId);
    } else {
      selectNode(nodeId, addToSelection);
    }
  }

  /**
   * Handles keyboard navigation
   */
  function handleKeydown(event: KeyboardEvent): boolean {
    const { key, ctrlKey, metaKey } = event;
    let handled = false;

    switch (key) {
      case 'ArrowDown':
        focusNext();
        handled = true;
        break;

      case 'ArrowUp':
        focusPrevious();
        handled = true;
        break;

      case 'ArrowRight':
        if (focusedNodeId.value) {
          const node = flatNodes.value.find(n => n.id === focusedNodeId.value);
          if (node?.children?.length) {
            if (!expandedNodeIds.value.has(focusedNodeId.value)) {
              expandNode(focusedNodeId.value);
            } else {
              // Already expanded, move to first child
              const firstChild = node.children[0];
              if (firstChild && !firstChild.disabled) {
                focusNode(firstChild.id);
              }
            }
          }
        }
        handled = true;
        break;

      case 'ArrowLeft':
        if (focusedNodeId.value) {
          const node = flatNodes.value.find(n => n.id === focusedNodeId.value);
          if (node) {
            if (expandedNodeIds.value.has(focusedNodeId.value) && node.children?.length) {
              // Collapse if expanded
              collapseNode(focusedNodeId.value);
            } else if (node.parentId) {
              // Move to parent if not expanded or no children
              focusNode(node.parentId);
            }
          }
        }
        handled = true;
        break;

      case 'Home':
        focusFirst();
        handled = true;
        break;

      case 'End':
        focusLast();
        handled = true;
        break;

      case 'Enter':
      case ' ': // Space
        if (focusedNodeId.value) {
          const isModifierPressed = ctrlKey || metaKey;
          if (multiSelect && isModifierPressed) {
            toggleSelection(focusedNodeId.value, true);
          } else {
            selectNode(focusedNodeId.value);
          }
        }
        handled = true;
        break;

      case '*':
        // Expand all nodes at the same level as focused node
        if (focusedNodeId.value) {
          const focusedNode = flatNodes.value.find(n => n.id === focusedNodeId.value);
          if (focusedNode) {
            const sameLevel = flatNodes.value.filter(n => 
              n.level === focusedNode.level && n.children?.length
            );
            sameLevel.forEach(node => expandNode(node.id));
          }
        }
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }

    return handled;
  }

  /**
   * Gets ARIA attributes for the tree container
   */
  function getTreeAria() {
    return {
      role: 'tree',
      'aria-multiselectable': multiSelect,
    };
  }

  /**
   * Gets ARIA attributes for a tree item
   */
  function getTreeItemAria(nodeId: string) {
    const node = flatNodes.value.find(n => n.id === nodeId);
    if (!node) return {};

    const position = focusableNodes.value.findIndex(n => n.id === nodeId) + 1;
    const total = focusableNodes.value.length;

    return {
      id: nodeId,
      role: 'treeitem',
      'aria-level': node.level + 1,
      'aria-posinset': position,
      'aria-setsize': total,
      'aria-selected': selectedNodeIds.value.has(nodeId),
      'aria-expanded': node.children?.length 
        ? expandedNodeIds.value.has(nodeId) 
        : undefined,
      'aria-disabled': node.disabled || undefined,
      tabindex: focusedNodeId.value === nodeId ? 0 : -1,
    };
  }

  // Initialize with first focusable node
  watch(focusableNodes, (newNodes) => {
    if (newNodes.length > 0 && !focusedNodeId.value) {
      focusedNodeId.value = newNodes[0].id;
    }
  }, { immediate: true });

  return {
    focusedNodeId,
    selectedNodeIds,
    expandedNodeIds,
    flatNodes,
    focusableNodes,
    focusedNode,
    focusNode,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    expandNode,
    collapseNode,
    toggleExpansion,
    selectNode,
    deselectNode,
    toggleSelection,
    handleKeydown,
    getTreeAria,
    getTreeItemAria,
  };
}