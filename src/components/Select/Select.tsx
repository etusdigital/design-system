import { useState } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { isObject } from '../../utils';
import { SelectContainer } from '../../utils/components/SelectContainer';
import { SelectContent } from '../../utils/components/SelectContent';
import { Option } from '../../utils/components/Option';
import { Checkbox } from '../Checkbox';
import { Button } from '../Button';
import styles from './Select.module.css';

export interface SelectProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  options?: any[];
  labelKey?: string;
  valueKey?: string;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  labelValue?: string;
  getObject?: boolean;
  isError?: boolean;
  errorMessage?: string;
  infoMessage?: string;
  required?: boolean;
  placeholder?: string;
  secondary?: boolean;
  absolute?: boolean;
  icon?: string;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  // Render-prop equivalents for Vue named slots
  renderSearchLabel?: () => React.ReactNode;
  renderOption?: (option: any, isSelected: boolean) => React.ReactNode;
  renderStatus?: (count: number) => React.ReactNode;
  renderActions?: () => React.ReactNode;
  renderClearLabel?: () => React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function Select({
  value,
  defaultValue,
  onChange,
  options = [],
  labelKey = 'label',
  valueKey = 'value',
  multiple = false,
  searchable = false,
  clearable = false,
  disabled = false,
  labelValue = '',
  getObject: getObjectProp = false,
  isError = false,
  errorMessage = '',
  infoMessage = '',
  required = false,
  placeholder,
  secondary = false,
  absolute = false,
  icon,
  expanded,
  onExpandedChange,
  renderSearchLabel,
  renderOption,
  renderStatus,
  renderActions,
  renderClearLabel,
  children,
  className,
}: SelectProps) {
  // Normalise defaultValue for multiple mode
  const normalizedDefault = multiple
    ? Array.isArray(defaultValue) ? defaultValue : defaultValue != null ? [defaultValue] : []
    : Array.isArray(defaultValue) ? defaultValue[0] : defaultValue ?? null;

  const [model, setModel] = useControllable<any>({
    value,
    defaultValue: normalizedDefault,
    onChange,
  });

  const [searchText, setSearchText] = useState('');

  const [isOpen, setIsOpen] = useControllable<boolean>({
    value: expanded,
    defaultValue: false,
    onChange: onExpandedChange,
  });

  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  function getLabel(option: any): string {
    return isObject(option) ? option[labelKey] : String(option ?? '');
  }

  function getValue(option: any): any {
    return isObject(option) ? option[valueKey] : option;
  }

  function isOptionSelected(option: any): boolean {
    if (multiple) {
      const arr: any[] = Array.isArray(model) ? model : [];
      return arr.some((m) => getValue(m) === getValue(option));
    }
    return getValue(model) === getValue(option);
  }

  function selectOption(option: any) {
    if (disabled) return;
    const emitValue = getObjectProp ? option : getValue(option);
    if (multiple) {
      const arr: any[] = Array.isArray(model) ? [...model] : [];
      const idx = arr.findIndex((m) => getValue(m) === getValue(option));
      if (idx !== -1) {
        arr.splice(idx, 1);
      } else {
        arr.push(emitValue);
      }
      setModel(arr);
    } else {
      setModel(emitValue);
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  }

  function clearModel() {
    if (multiple) {
      setModel([]);
    } else {
      setModel(null);
    }
  }

  const filteredOptions = searchable && searchText
    ? options.filter((o) => getLabel(o).toLowerCase().includes(searchText.toLowerCase()))
    : options;

  // Build display label for status slot
  function getDisplayLabel(): string {
    if (multiple) {
      const arr: any[] = Array.isArray(model) ? model : [];
      if (arr.length === 0) return '';
      return arr.map((m) => {
        const found = options.find((o) => getValue(o) === getValue(m));
        return found ? getLabel(found) : getLabel(m);
      }).join(', ');
    }
    if (model == null) return '';
    const found = options.find((o) => getValue(o) === getValue(model));
    return found ? getLabel(found) : getLabel(model);
  }

  const displayLabel = getDisplayLabel();
  const hasValue = multiple
    ? (Array.isArray(model) && model.length > 0)
    : model != null;

  // Keyboard navigation handler
  function handleKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(filteredOptions.length - 1);
        } else {
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        break;
      case 'Home':
        e.preventDefault();
        if (isOpen && filteredOptions.length > 0) {
          setHighlightedIndex(0);
        }
        break;
      case 'End':
        e.preventDefault();
        if (isOpen && filteredOptions.length > 0) {
          setHighlightedIndex(filteredOptions.length - 1);
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          selectOption(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  }

  // Reset highlight when dropdown closes
  function handleExpandedChange(val: boolean) {
    setIsOpen(val);
    if (!val) {
      setHighlightedIndex(-1);
    }
  }

  // Status node: use renderStatus if provided, otherwise use displayLabel
  let statusNode: React.ReactNode;
  if (renderStatus && multiple) {
    const arr: any[] = Array.isArray(model) ? model : [];
    if (arr.length > 0 && !isOpen) {
      statusNode = renderStatus(arr.length);
    }
  } else if (displayLabel && !isOpen) {
    statusNode = <span className={styles.displayLabel}>{displayLabel}</span>;
  } else if (!hasValue && placeholder && !isOpen) {
    statusNode = <span className={clsx(styles.displayLabel, 'text-neutral-foreground-low')}>{placeholder}</span>;
  }

  const optionsNode = filteredOptions.map((option, index) => (
    <Option
      key={index}
      selected={!multiple && isOptionSelected(option)}
      disabled={option?.disabled}
      secondary={secondary}
      noHover={multiple}
      className={clsx(styles.optionContent, index === highlightedIndex && styles.highlighted)}
      onClick={() => selectOption(option)}
    >
      {multiple && (
        <Checkbox value={isOptionSelected(option)} className="pointer-events-none" />
      )}
      {renderOption
        ? renderOption(option, isOptionSelected(option))
        : (children ?? <span>{getLabel(option)}</span>)
      }
    </Option>
  ));

  const actionsNode = renderActions ? renderActions() : clearable ? (
    <Button variant="plain" size="small" onClick={clearModel}>
      {renderClearLabel ? renderClearLabel() : 'Clear'}
    </Button>
  ) : undefined;

  return (
    <div onKeyDown={handleKeyDown}>
      <SelectContainer
        value={isOpen}
        onChange={handleExpandedChange}
        labelValue={labelValue}
        disabled={disabled}
        isError={isError}
        errorMessage={errorMessage}
        infoMessage={infoMessage}
        required={required}
        secondary={secondary}
        absolute={absolute}
        options={optionsNode}
        actions={actionsNode}
        className={clsx('select', className)}
      >
        <SelectContent
          value={searchText}
          onChange={(val) => setSearchText(val)}
          expanded={isOpen}
          onExpandedChange={(val) => handleExpandedChange(val)}
          searchable={searchable}
          disabled={disabled}
          isError={isError}
          secondary={secondary}
          icon={icon}
          searchLabel={renderSearchLabel ? renderSearchLabel() : undefined}
          status={statusNode}
          options={hasValue ? options : undefined}
        />
      </SelectContainer>
    </div>
  );
}
