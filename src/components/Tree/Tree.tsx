import { createContext, useContext, useState } from 'react';
import clsx from 'clsx';
import { type Option as DropOption } from '../../utils/types/DropOption';
import { useControllable } from '../../hooks/useControllable';
import { Checkbox } from '../Checkbox/Checkbox';
import { Icon } from '../Icon/Icon';
import styles from './Tree.module.css';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface TreeContextValue {
  selectedValue: any;
  onSelect: (option: DropOption, add: boolean) => void;
  expandedNodes: Set<any>;
  onToggleExpand: (nodeKey: any) => void;
  labelKey: string;
  valueKey: string;
  getObject: boolean;
  multiple: boolean;
  disabled: boolean;
}

const TreeContext = createContext<TreeContextValue | null>(null);

// ---------------------------------------------------------------------------
// Pure utility helpers (ported from Tree.vue)
// ---------------------------------------------------------------------------

function getRawValue(option: DropOption, valueKey: string): any {
  return typeof option === 'object' && option !== null ? (option as any)[valueKey] : option;
}

function getParent(
  value: DropOption,
  options: DropOption[],
  valueKey: string
): DropOption | undefined {
  return options?.find((option: DropOption) => {
    if (!option.options || !option.options.length) return false;

    const found = option.options.find(
      (x: DropOption) => getRawValue(x, valueKey) === getRawValue(value, valueKey)
    );
    if (found) return found;

    return getParent(value, option.options, valueKey);
  });
}

function parseOptionMut(option: DropOption, options: DropOption[], add: boolean, valueKey: string) {
  const index = options.findIndex((x) => getRawValue(x, valueKey) === getRawValue(option, valueKey));
  if (index !== -1) options.splice(index, 1);
  if (add) options.push(JSON.parse(JSON.stringify(option)));
}

function updateSelectionMut(
  option: DropOption,
  parent: DropOption,
  modelArr: DropOption[],
  add: boolean,
  valueKey: string
) {
  if (!parent.options) return;

  const isLevel = parent.options.findIndex(
    (x) => getRawValue(x, valueKey) === getRawValue(option, valueKey)
  );

  let index = modelArr.findIndex((x) => getRawValue(x, valueKey) === getRawValue(parent, valueKey));

  if ((!modelArr.length || index === -1) && add) {
    index = modelArr.length;
    modelArr.push({ ...parent, options: [] as DropOption[] });
  }

  if (isLevel === -1) {
    const newParent = getParent(option, parent.options, valueKey);
    if (modelArr[index]?.options && newParent) {
      updateSelectionMut(option, newParent, modelArr[index].options!, add, valueKey);
    }
    return;
  }

  parseOptionMut(option, modelArr[index].options!, add, valueKey);

  if (
    index !== -1 &&
    modelArr[index]?.options &&
    !modelArr[index]?.options?.length &&
    !add
  ) {
    modelArr.splice(index, 1);
  }
}

/**
 * Returns new selection array after toggling `option`.
 * Ported from Tree.vue parseModel.
 */
function updateSelection(
  option: DropOption,
  add: boolean,
  currentSelection: any[],
  valueKey: string,
  getObject: boolean
): any[] {
  const arr = [...currentSelection];

  if (getObject) {
    const parent = getParent(option, [] as DropOption[], valueKey);
    // We don't have the full options tree here so use top-level check via arr
    const topParent = (() => {
      // Try to find parent within existing selected items
      for (const sel of arr) {
        if (sel.options) {
          const found = (sel.options as DropOption[]).find(
            (x: DropOption) => getRawValue(x, valueKey) === getRawValue(option, valueKey)
          );
          if (found) return sel as DropOption;
        }
      }
      return undefined;
    })();

    if (!topParent) {
      parseOptionMut(option, arr as DropOption[], add, valueKey);
    } else {
      updateSelectionMut(option, topParent, arr as DropOption[], add, valueKey);
    }
    return arr.filter((x: any) => x.options?.length);
  } else {
    const rawOptionValue = getRawValue(option, valueKey);
    const index = arr.findIndex((x: any) => getRawValue(x, valueKey) === rawOptionValue);

    if (index !== -1) {
      arr.splice(index, 1);
    } else if (!option.options?.length) {
      arr.push(rawOptionValue);
    }

    if (option.options?.length) {
      option.options.forEach((child: DropOption) => {
        const childResult = updateSelection(child, add, arr, valueKey, getObject);
        arr.length = 0;
        childResult.forEach((v) => arr.push(v));
      });
    }

    return arr;
  }
}

// ---------------------------------------------------------------------------
// Selection check helper
// ---------------------------------------------------------------------------

function getAllLeafValues(options: DropOption[], valueKey: string): any[] {
  const values: any[] = [];
  for (const opt of options) {
    if (opt.options?.length) {
      values.push(...getAllLeafValues(opt.options, valueKey));
    } else {
      values.push((opt as any)[valueKey]);
    }
  }
  return values;
}

function checkIsSelected(selectedValue: any, nodeValue: any, ctx: TreeContextValue, option?: DropOption): boolean | null {
  if (ctx.multiple) {
    if (!Array.isArray(selectedValue)) return false;

    const isValueMatch = (v: any) => {
      if (ctx.getObject && typeof v === 'object' && v !== null) {
        return (v as any)[ctx.valueKey] === nodeValue;
      }
      const raw = typeof v === 'object' && v !== null ? (v as any)[ctx.valueKey] : v;
      return raw === nodeValue;
    };

    const directMatch = selectedValue.some(isValueMatch);
    if (directMatch) return true;

    // If this node has children, check for indeterminate state
    if (option?.options?.length) {
      const childValues = getAllLeafValues(option.options, ctx.valueKey);
      const isChildSelected = (cv: any) =>
        selectedValue.some((v: any) => {
          if (ctx.getObject && typeof v === 'object' && v !== null) {
            return (v as any)[ctx.valueKey] === cv;
          }
          const raw = typeof v === 'object' && v !== null ? (v as any)[ctx.valueKey] : v;
          return raw === cv;
        });

      const someSelected = childValues.some(isChildSelected);
      const allSelected = childValues.length > 0 && childValues.every(isChildSelected);
      if (allSelected) return true;
      if (someSelected) return null; // indeterminate
    }

    return false;
  } else {
    if (ctx.getObject && typeof selectedValue === 'object' && selectedValue !== null) {
      return (selectedValue as any)[ctx.valueKey] === nodeValue;
    }
    return selectedValue === nodeValue;
  }
}

// ---------------------------------------------------------------------------
// TreeNode (recursive, module scope)
// ---------------------------------------------------------------------------

function TreeNode({ option, depth = 0 }: { option: DropOption; depth?: number }) {
  const ctx = useContext(TreeContext)!;
  const nodeValue = (option as any)[ctx.valueKey];
  const nodeLabel = (option as any)[ctx.labelKey];
  const isExpanded = ctx.expandedNodes.has(nodeValue);
  const hasChildren = Boolean(option.options && option.options.length > 0);
  const isSelected = checkIsSelected(ctx.selectedValue, nodeValue, ctx, option);

  return (
    <div className={styles.treeOption} style={{ paddingLeft: depth * 16 }}>
      <div
        className={clsx(
          styles.nodeRow,
          isSelected === true && styles.selected,
          ctx.multiple && styles.multiple,
          (ctx.disabled || option.disabled) && styles.disabled
        )}
        onClick={() => {
          if (!ctx.disabled && !option.disabled) {
            ctx.onSelect(option, !isSelected);
          }
        }}
      >
        {hasChildren && (
          <Icon
            name="keyboard_arrow_right"
            className={clsx(styles.expandIcon, isExpanded && styles.expandIconOpen)}
            onClick={(e: any) => {
              e.stopPropagation();
              ctx.onToggleExpand(nodeValue);
            }}
          />
        )}
        {ctx.multiple && (
          <Checkbox
            value={isSelected}
            onChange={() => {}}
            disabled={ctx.disabled || option.disabled}
            allowIndeterminate
          />
        )}
        {option.icon && (
          <Icon name={option.icon} className={styles.nodeIcon} />
        )}
        <span className={clsx(styles.nodeLabel)}>
          {nodeLabel}
        </span>
      </div>
      {isExpanded && hasChildren &&
        option.options!.map((child) => (
          <TreeNode key={(child as any)[ctx.valueKey]} option={child} depth={depth + 1} />
        ))
      }
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tree (exported)
// ---------------------------------------------------------------------------

export interface TreeProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  options: DropOption[];
  labelKey?: string;
  valueKey?: string;
  getObject?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Tree({
  value,
  defaultValue,
  onChange,
  options,
  labelKey = 'label',
  valueKey = 'value',
  getObject = false,
  multiple = false,
  disabled = false,
  className,
}: TreeProps) {
  const [selectedValue, setSelectedValue] = useControllable<any>({
    value,
    defaultValue: defaultValue ?? (multiple ? [] : undefined),
    onChange,
  });

  const [expandedNodes, setExpandedNodes] = useState<Set<any>>(new Set());

  const handleToggle = (nodeKey: any) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeKey)) {
        next.delete(nodeKey);
      } else {
        next.add(nodeKey);
      }
      return next;
    });
  };

  const handleSelect = (option: DropOption, add: boolean) => {
    if (multiple) {
      const newSelection = updateSelection(
        option,
        add,
        selectedValue ?? [],
        valueKey,
        getObject
      );
      setSelectedValue(newSelection);
    } else {
      const newValue = getObject ? option : (option as any)[valueKey];
      setSelectedValue(newValue);
    }
  };

  return (
    <TreeContext.Provider
      value={{
        selectedValue,
        onSelect: handleSelect,
        expandedNodes,
        onToggleExpand: handleToggle,
        labelKey,
        valueKey,
        getObject,
        multiple,
        disabled,
      }}
    >
      <div className={clsx(styles.tree, className)}>
        {options.map((option) => (
          <TreeNode key={(option as any)[valueKey]} option={option} />
        ))}
      </div>
    </TreeContext.Provider>
  );
}
