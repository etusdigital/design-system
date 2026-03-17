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
  const [expanded, setExpanded] = useState(false);

  function getLabel(option: any): string {
    return isObject(option) ? option[labelKey] : String(option ?? '');
  }

  function getValue(option: any): any {
    return isObject(option) ? option[valueKey] : option;
  }

  function isSelected(option: any): boolean {
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
      setExpanded(false);
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

  const statusNode = displayLabel && !expanded ? (
    <span className={styles.displayLabel}>{displayLabel}</span>
  ) : undefined;

  const optionsNode = filteredOptions.map((option, index) => (
    <Option
      key={index}
      selected={!multiple && isSelected(option)}
      disabled={option?.disabled}
      secondary={secondary}
      noHover={multiple}
      className={clsx(styles.optionContent)}
      onClick={() => selectOption(option)}
    >
      {multiple && (
        <Checkbox value={isSelected(option)} className="pointer-events-none" />
      )}
      {children ?? <span>{getLabel(option)}</span>}
    </Option>
  ));

  const actionsNode = clearable ? (
    <Button variant="plain" size="small" onClick={clearModel}>
      Clear
    </Button>
  ) : undefined;

  return (
    <SelectContainer
      value={expanded}
      onChange={(val) => setExpanded(val)}
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
        expanded={expanded}
        onExpandedChange={(val) => setExpanded(val)}
        searchable={searchable}
        disabled={disabled}
        isError={isError}
        secondary={secondary}
        status={statusNode}
        options={hasValue ? options : undefined}
      />
    </SelectContainer>
  );
}
