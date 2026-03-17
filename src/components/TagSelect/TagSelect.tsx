import { useState } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { isObject } from '../../utils';
import { SelectContainer } from '../../utils/components/SelectContainer';
import { Option } from '../../utils/components/Option';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { Icon } from '../Icon/Icon';
import styles from './TagSelect.module.css';

export interface TagSelectProps {
  value?: any[];
  defaultValue?: any[];
  onChange?: (value: any[]) => void;
  options?: any[];
  labelKey?: string;
  valueKey?: string;
  getObject?: boolean;
  disabled?: boolean;
  labelValue?: string;
  searchable?: boolean;
  creatable?: boolean;
  isError?: boolean;
  errorMessage?: string;
  infoMessage?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function TagSelect({
  value,
  defaultValue,
  onChange,
  options = [],
  labelKey = 'label',
  valueKey = 'value',
  getObject: getObjectProp = false,
  disabled = false,
  labelValue = '',
  searchable = false,
  creatable = false,
  isError = false,
  errorMessage = '',
  infoMessage = '',
  required = false,
  placeholder,
  className,
}: TagSelectProps) {
  const [model, setModel] = useControllable<any[]>({
    value,
    defaultValue: defaultValue ?? [],
    onChange,
  });

  const [searchText, setSearchText] = useState('');
  const [expanded, setExpanded] = useState(false);

  const selectedValues: any[] = Array.isArray(model) ? model : [];

  function getLabel(option: any): string {
    return isObject(option) ? option[labelKey] : String(option ?? '');
  }

  function getValue(option: any): any {
    return isObject(option) ? option[valueKey] : option;
  }

  function isIncluded(arr: any[], option: any): boolean {
    if (isObject(option)) {
      return arr.some((i) => getLabel(i) === getLabel(option));
    }
    return arr.includes(option);
  }

  function toggleOption(option: any) {
    if (disabled) return;
    const emitValue = getObjectProp ? option : getValue(option);
    const arr = [...selectedValues];
    const idx = arr.findIndex((m) =>
      isObject(option) ? getLabel(m) === getLabel(option) : getValue(m) === getValue(option)
    );
    if (idx !== -1) {
      arr.splice(idx, 1);
    } else {
      arr.push(emitValue);
    }
    setModel(arr);
  }

  function removeTag(index: number) {
    const arr = [...selectedValues];
    arr.splice(index, 1);
    setModel(arr);
  }

  function addCreatableOption() {
    if (!creatable || !searchText || isError) return;
    if (isIncluded(options, searchText)) {
      setSearchText('');
      return;
    }
    const newOption = { [labelKey]: searchText, [valueKey]: searchText };
    const emitValue = getObjectProp ? newOption : searchText;
    const arr = [...selectedValues, emitValue];
    setModel(arr);
    setSearchText('');
  }

  const filteredOptions = searchText
    ? options.filter((o) => getLabel(o).toLowerCase().includes(searchText.toLowerCase()))
    : options;

  const showAddButton = creatable && searchText && !filteredOptions.some(
    (o) => getLabel(o).toLowerCase() === searchText.toLowerCase()
  );

  const tagsNode = selectedValues.length > 0 ? (
    <div className={clsx(styles.tagContainer)}>
      {selectedValues.map((option, index) => (
        <StatusBadge key={index} color="neutral" className="py-none max-w-full">
          <div className="flex items-center gap-xs py-xxs">
            <p className="font-bold text-xs truncate">
              {isObject(option) ? option[labelKey] : option}
            </p>
            <Icon
              name="close"
              className={clsx(styles.deleteIcon, 'text-neutral-interaction-default')}
              onClick={() => removeTag(index)}
            />
          </div>
        </StatusBadge>
      ))}
    </div>
  ) : undefined;

  const searchNode = (
    <div className="flex items-center gap-xs w-full">
      {(searchable || creatable) && (
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && creatable) addCreatableOption();
          }}
          placeholder={placeholder ?? 'Search'}
          disabled={disabled}
          className={clsx(
            'text-neutral-interaction-default h-full w-full p-none m-none border-none shadow-none outline-none text-sm',
            {
              'text-danger-foreground-low': isError,
              'bg-neutral-surface-disabled text-neutral-foreground-low': disabled,
            }
          )}
          style={{ boxShadow: 'none' }}
        />
      )}
    </div>
  );

  const statusNode = !expanded && selectedValues.length > 0 ? tagsNode : (
    searchable || creatable ? searchNode : undefined
  );

  const optionsNode = (
    <>
      {filteredOptions.length === 0 && searchText ? (
        <div className="text-xs italic text-neutral-foreground-low flex justify-center px-xs py-xxs">
          No result found
        </div>
      ) : options.length === 0 ? (
        <div className="text-xs italic text-neutral-foreground-low flex justify-center px-xs py-xxs">
          No tags created yet
        </div>
      ) : (
        filteredOptions.map((option, index) => (
          <Option
            key={index}
            selected={isIncluded(selectedValues, option)}
            onClick={() => toggleOption(option)}
            className={clsx({ 'font-bold': isIncluded(selectedValues, option) })}
          >
            {getLabel(option)}
          </Option>
        ))
      )}
    </>
  );

  const actionsNode = showAddButton ? (
    <div className="flex justify-center w-full">
      <button
        type="button"
        className="text-xs text-primary-interaction-default hover:underline px-xs py-xxs"
        onClick={addCreatableOption}
      >
        Add &quot;{searchText}&quot;
      </button>
    </div>
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
      maxHeight="none"
      minWidth="12em"
      options={optionsNode}
      actions={actionsNode}
      className={clsx('tag-select', className)}
    >
      {statusNode}
    </SelectContainer>
  );
}
