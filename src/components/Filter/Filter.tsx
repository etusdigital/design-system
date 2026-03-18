import { useState } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { isObject } from '../../utils';
import { SelectContainer } from '../../utils/components/SelectContainer';
import { Checkbox } from '../Checkbox/Checkbox';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import styles from './Filter.module.css';

export interface FilterProps {
  value?: Record<string, any[]>;
  defaultValue?: Record<string, any[]>;
  onChange?: (value: Record<string, any[]>) => void;
  onApply?: (value: Record<string, any[]>) => void;
  options?: Array<{ label: string; value: string; options: any[] }>;
  labelKey?: string;
  valueKey?: string;
  disabled?: boolean;
  labelValue?: string;
  clearLabel?: string;
  applyLabel?: string;
  statusLabel?: string;
  isError?: boolean;
  errorMessage?: string;
  className?: string;
}

export function Filter({
  value,
  defaultValue,
  onChange,
  onApply,
  options = [],
  labelKey = 'label',
  valueKey = 'value',
  disabled = false,
  labelValue = '',
  clearLabel = 'Clear selection',
  applyLabel = 'Apply filters',
  statusLabel = 'Status',
  isError = false,
  errorMessage = '',
  className,
}: FilterProps) {
  const [model, setModel] = useControllable<Record<string, any[]>>({
    value,
    defaultValue: defaultValue ?? {},
    onChange,
  });

  const [expanded, setExpanded] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const currentModel: Record<string, any[]> = model ?? {};

  function getCategoryKey(category: any): string {
    return isObject(category) ? category[valueKey] : String(category);
  }

  function getLabel(option: any): string {
    return isObject(option) ? option[labelKey] : String(option ?? '');
  }

  function getOptionValue(option: any): any {
    return isObject(option) ? option[valueKey] : option;
  }

  function toggleCategory(categoryKey: string) {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  }

  function isSubOptionSelected(categoryKey: string, subOption: any): boolean {
    const selected = currentModel[categoryKey] ?? [];
    const subVal = getOptionValue(subOption);
    return selected.some((x: any) => getOptionValue(x) === subVal);
  }

  function toggleSubOption(category: any, subOption: any) {
    if (disabled) return;
    const key = getCategoryKey(category);
    const selected = [...(currentModel[key] ?? [])];
    const subVal = getOptionValue(subOption);
    const idx = selected.findIndex((x: any) => getOptionValue(x) === subVal);
    if (idx !== -1) {
      selected.splice(idx, 1);
    } else {
      selected.push(subVal);
    }
    const newModel = { ...currentModel, [key]: selected };
    setModel(newModel);
  }

  function clearAll() {
    setModel({});
  }

  function applyFilters() {
    onApply?.(currentModel);
  }

  // Count total selected items across all categories
  const totalSelected = Object.values(currentModel).reduce(
    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
    0
  );

  const optionsNode = (
    <div className="w-full">
      {options.map((category) => {
        const key = getCategoryKey(category);
        const isExpanded = !!expandedCategories[key];
        const categorySelectedCount = (currentModel[key] ?? []).length;

        return (
          <div key={key} className="w-full">
            <div
              className={styles.categoryHeader}
              onClick={() => toggleCategory(key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') toggleCategory(key);
              }}
            >
              <span className="text-sm text-neutral-interaction-default">
                {getLabel(category)}
              </span>
              <div className="flex items-center gap-xs">
                {categorySelectedCount > 0 && (
                  <span className="flex items-center justify-center text-neutral-foreground-negative bg-primary-interaction-selected text-xs w-[1.6em] h-[1.6em] rounded-full">
                    {categorySelectedCount}
                  </span>
                )}
                <Icon
                  name="expand_more"
                  className={clsx(styles.chevron, { [styles.expanded]: isExpanded })}
                />
              </div>
            </div>
            <div
              className={clsx(styles.categoryContent, { [styles.collapsed]: !isExpanded })}
              style={{ maxHeight: isExpanded ? '400px' : '0' }}
            >
              <ul className="flex flex-col">
                {category.options.map((subOption, subIdx) => (
                  <div
                    key={subIdx}
                    className={styles.subOption}
                    role="option"
                    aria-selected={isSubOptionSelected(key, subOption)}
                    onClick={() => toggleSubOption(category, subOption)}
                  >
                    <Checkbox
                      value={isSubOptionSelected(key, subOption)}
                      className="pointer-events-none"
                    />
                    <span className={styles.subOptionLabel}>{getLabel(subOption)}</span>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );

  const statusNode = (
    <span className="font-bold text-neutral-interaction-default">
      {totalSelected > 0 ? `${statusLabel}: ${totalSelected}` : statusLabel}
    </span>
  );

  const actionsNode = (
    <div className={styles.actions}>
      <Button
        variant="plain"
        size="small"
        disabled={totalSelected === 0}
        onClick={clearAll}
      >
        {clearLabel}
      </Button>
      <Button
        size="small"
        disabled={totalSelected === 0}
        onClick={applyFilters}
      >
        {applyLabel}
      </Button>
    </div>
  );

  return (
    <SelectContainer
      value={expanded}
      onChange={(val) => setExpanded(val)}
      labelValue={labelValue}
      disabled={disabled}
      isError={isError}
      errorMessage={errorMessage}
      dontHaveMaxHeight
      minWidth="22em"
      content={optionsNode}
      actions={actionsNode}
      className={clsx('filter', className)}
    >
      {statusNode}
    </SelectContainer>
  );
}
