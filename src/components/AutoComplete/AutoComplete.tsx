import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { isObject } from '../../utils';
import { SelectContainer } from '../../utils/components/SelectContainer';
import { SelectContent } from '../../utils/components/SelectContent';
import { Option } from '../../utils/components/Option';
import styles from './AutoComplete.module.css';

export interface AutoCompleteProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  options: any[];
  labelKey?: string;
  valueKey?: string;
  getObject?: boolean;
  disabled?: boolean;
  labelValue?: string;
  isError?: boolean;
  errorMessage?: string;
  infoMessage?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function AutoComplete({
  value,
  defaultValue,
  onChange,
  options,
  labelKey = 'label',
  valueKey = 'value',
  getObject: getObjectProp = false,
  disabled = false,
  labelValue = '',
  isError = false,
  errorMessage = '',
  infoMessage = '',
  required = false,
  placeholder = 'Search...',
  className,
}: AutoCompleteProps) {
  const [model, setModel] = useControllable<any>({
    value,
    defaultValue: defaultValue ?? null,
    onChange,
  });

  // Internal search text — not exposed to consumer
  const [searchText, setSearchText] = useState('');
  const [expanded, setExpanded] = useState(false);

  // Sync searchText display when model changes externally (controlled value prop)
  useEffect(() => {
    if (model !== undefined && model !== null && model !== '') {
      const matched = options.find(
        (o) => getValue(o) === (isObject(model) ? getValue(model) : model)
      );
      if (matched) setSearchText(getLabel(matched));
    } else {
      setSearchText('');
    }
  }, [model]); // eslint-disable-line react-hooks/exhaustive-deps

  function getLabel(option: any): string {
    return isObject(option) ? option[labelKey] : String(option ?? '');
  }

  function getValue(option: any): any {
    return isObject(option) ? option[valueKey] : option;
  }

  const filteredOptions = options.filter((o) =>
    getLabel(o).toLowerCase().includes(searchText.toLowerCase())
  );

  function selectOption(option: any) {
    if (disabled) return;
    const emitValue = getObjectProp ? option : getValue(option);
    setModel(emitValue);
    setSearchText(getLabel(option));
    setExpanded(false);
  }

  const optionsNode = filteredOptions.length > 0
    ? filteredOptions.map((option, index) => (
        <Option
          key={index}
          selected={getValue(model) === getValue(option)}
          onClick={() => selectOption(option)}
        >
          {getLabel(option)}
        </Option>
      ))
    : [
        <div key="no-results" className={styles.noResults}>
          No options match your search
        </div>,
      ];

  return (
    <SelectContainer
      value={expanded}
      onChange={(val) => setExpanded(val)}
      labelValue={labelValue}
      absolute={true}
      disabled={disabled}
      isError={isError}
      errorMessage={errorMessage}
      infoMessage={infoMessage}
      required={required}
      options={optionsNode}
      className={clsx('auto-complete', className)}
    >
      <SelectContent
        value={searchText}
        onChange={(val) => setSearchText(val)}
        expanded={expanded}
        onExpandedChange={(val) => setExpanded(val)}
        searchable
        appendIcon="unfold_more"
        disabled={disabled}
        isError={isError}
        searchLabel={placeholder}
        options={options.length > 0 ? options : undefined}
      />
    </SelectContainer>
  );
}
