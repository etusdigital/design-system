import clsx from "clsx";
import { useState } from "react";
import { useControllable } from "../../hooks";
import { ExpandableContainer } from "../../utils/components/ExpandableContainer";
import { isObject } from "../../utils";
import styles from "./Dropdown.module.css";
import "./Dropdown.css";
import { Icon } from "../Icon/Icon";
import { SelectContent } from "@/utils/components/SelectContent.tsx";
import { Separator } from "../Separator";

// -----------------------------------------------------------------------
// Option type (local — mirrors DropOption)
// -----------------------------------------------------------------------
export interface DropdownOptionItem {
  label: string;
  value: any;
  icon?: string;
  disabled?: boolean;
  bottom?: boolean;
  options?: DropdownOptionItem[];
  [key: string]: any;
}

// -----------------------------------------------------------------------
// Private sub-component: DropdownOption
// Renders a single option or a group header + recursive DropdownOptions.
// Must be declared at module scope (RESEARCH.md pitfall 5).
// -----------------------------------------------------------------------
interface DropdownOptionProps {
  option: DropdownOptionItem;
  labelKey: string;
  valueKey: string;
  selectedValue: any;
  onSelect: (option: DropdownOptionItem) => void;
  depth?: number;
}

function DropdownOption({
  option,
  labelKey,
  valueKey,
  selectedValue,
  onSelect,
  depth = 0,
}: DropdownOptionProps) {
  const [subExpanded, setSubExpanded] = useState(false);
  const label = getLabel(option);
  const value = getValue(option);
  const isSelected =
    selectedValue !== undefined &&
    selectedValue !== null &&
    selectedValue === value;

  function getLabel(option: any) {
    return isObject(option) ? option[labelKey] || option.label : option;
  }

  function getValue(option: any) {
    return isObject(option) ? option[valueKey] || option.value : option;
  }

  if (option.options && option.options.length > 0) {
    function isChildSelected(options: any) {
      return options.find((option: any) => {
        if (selectedValue == getValue(option)) return true;
        else if (option?.options) return isChildSelected(option.options);
      });
    }

    return (
      <div className="relative">
        <div
          className={clsx(styles.optionItem, {
            [styles.disabled]: option.disabled,
            [styles.selected]: isChildSelected(option.options)
          }, 'justify-between')}
          onClick={() => !option.disabled && setSubExpanded((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !option.disabled)
              setSubExpanded((prev) => !prev);
          }}
          tabIndex={option.disabled ? -1 : 0}
          role="option"
          aria-haspopup="listbox"
          aria-expanded={subExpanded}
        >
          <div className="flex item-center gap-xs">
            {option.icon && <Icon className="dropdown-icon" name={option.icon} />}
            <span className={styles.groupLabel}>{label}</span>
          </div>
          <Icon className={styles.chevronIcon} name="chevron_right" />
        </div>
        {subExpanded && (
          <div className={styles.flyoutCard}>
            <div className="bg-neutral-surface-default shadow-neutral-selected border-xxs border-neutral-default rounded-sm">
              <DropdownOptions
                options={option.options}
                labelKey={labelKey}
                valueKey={valueKey}
                selectedValue={selectedValue}
                onSelect={onSelect}
                depth={depth + 1}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={clsx(styles.optionItem, {
        [styles.selected]: isSelected,
        [styles.disabled]: option.disabled,
      })}
      onClick={() => !option.disabled && onSelect(option)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !option.disabled) onSelect(option);
      }}
      tabIndex={option.disabled ? -1 : 0}
      role="option"
      aria-selected={isSelected}
    >
      {option.icon && <Icon className="dropdown-icon" name={option.icon} />}
      <span>{label}</span>
    </div>
  );
}

// -----------------------------------------------------------------------
// Private sub-component: DropdownOptions
// Renders a list of options with recursive group support.
// -----------------------------------------------------------------------
interface DropdownOptionsProps {
  options: DropdownOptionItem[];
  labelKey: string;
  valueKey: string;
  selectedValue: any;
  onSelect: (option: DropdownOptionItem) => void;
  depth?: number;
}

function DropdownOptions({
  options,
  labelKey,
  valueKey,
  selectedValue,
  onSelect,
  depth = 0,
}: DropdownOptionsProps) {
  const parsedOptions = [
    options.filter((option) => !option.bottom),
    options.filter((option) => option.bottom),
  ].filter((options) => options.length);
  return (
    <div role="listbox" className={styles.optionsContainer}>
      {parsedOptions.map((options, index) => (
        <>
          {options.map((option, index) => (
            <DropdownOption
              key={index}
              option={option}
              labelKey={labelKey}
              valueKey={valueKey}
              selectedValue={selectedValue}
              onSelect={onSelect}
              depth={depth}
            />
          ))}
          {index == 0 && parsedOptions.length > 1 && <Separator />}
        </>
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------
// Helper: flatten nested options for search filtering
// -----------------------------------------------------------------------
function filterOptions(
  options: DropdownOptionItem[],
  search: string,
  labelKey: string,
): DropdownOptionItem[] {
  const results: DropdownOptionItem[] = [];
  for (const option of options) {
    const label = (option[labelKey] ?? option.label ?? "")
      .toString()
      .toLowerCase();
    if (option.options && option.options.length > 0) {
      const nestedResults = filterOptions(option.options, search, labelKey);
      if (label.includes(search.toLowerCase()) || nestedResults.length > 0) {
        results.push({
          ...option,
          options: nestedResults.length > 0 ? nestedResults : option.options,
        });
      }
    } else if (label.includes(search.toLowerCase())) {
      results.push(option);
    }
  }
  return results;
}

// -----------------------------------------------------------------------
// Helper: find label for selected value in nested options
// -----------------------------------------------------------------------
function findOptionByValue(
  options: DropdownOptionItem[],
  value: any,
  valueKey: string,
  labelKey: string,
): DropdownOptionItem | undefined {
  for (const option of options) {
    const optVal = option[valueKey] ?? option.value;
    if (
      optVal === (isObject(value) ? (value[valueKey] ?? value.value) : value)
    ) {
      return option;
    }
    if (option.options && option.options.length > 0) {
      const found = findOptionByValue(
        option.options,
        value,
        valueKey,
        labelKey,
      );
      if (found) return found;
    }
  }
  return undefined;
}

// -----------------------------------------------------------------------
// Main component props
// -----------------------------------------------------------------------
export interface DropdownProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  options: DropdownOptionItem[];
  labelKey?: string;
  valueKey?: string;
  getObject?: boolean;
  disabled?: boolean;
  labelValue?: string;
  searchable?: boolean;
  alignRight?: boolean;
  isError?: boolean;
  errorMessage?: string;
  required?: boolean;
  infoMessage?: string;
  maxHeight?: string;
  minWidth?: string;
  children?: React.ReactNode;
  className?: string;
}

// -----------------------------------------------------------------------
// Main component: Dropdown
// -----------------------------------------------------------------------
export function Dropdown({
  value,
  defaultValue,
  onChange,
  options,
  labelKey = "label",
  valueKey = "value",
  getObject = false,
  disabled = false,
  labelValue = "",
  searchable = false,
  alignRight = false,
  isError = false,
  errorMessage = "",
  required = false,
  infoMessage,
  maxHeight,
  minWidth,
  children,
  className,
}: DropdownProps) {
  const [selectedValue, setSelectedValue] = useControllable<any>({
    value,
    defaultValue: defaultValue ?? null,
    onChange,
  });

  const [searchText, setSearchText] = useState("");
  const [expanded, setExpanded] = useState(false);

  function getValue(option: any): any {
    return isObject(option) ? (option[valueKey] ?? option.value) : option;
  }

  function selectOption(option: DropdownOptionItem) {
    const emitValue = getObject ? option : getValue(option);
    setSelectedValue(emitValue);
    setTimeout(() => setExpanded(false));
    setSearchText("");
  }

  const selectedOption =
    selectedValue != null
      ? findOptionByValue(options, selectedValue, valueKey, labelKey)
      : undefined;

  const filteredOptions =
    searchable && searchText
      ? filterOptions(options, searchText, labelKey)
      : options;

  let statusNode: React.ReactNode;
  if (selectedOption)
    statusNode = (
      <span className={styles.displayLabel}>
        {selectedOption[labelKey] ?? selectedOption.label ?? ""}
      </span>
    );
  else statusNode = children;

  const card = (
    <DropdownOptions
      options={filteredOptions}
      labelKey={labelKey}
      valueKey={valueKey}
      selectedValue={selectedValue != null ? getValue(selectedValue) : null}
      onSelect={selectOption}
    />
  );

  return (
    <ExpandableContainer
      value={expanded}
      onChange={(val) => setExpanded(val)}
      labelValue={labelValue}
      disabled={disabled}
      isError={isError}
      errorMessage={errorMessage}
      alignRight={alignRight}
      required={required}
      infoMessage={infoMessage}
      maxHeight={maxHeight}
      minWidth={minWidth}
      card={card}
      className={clsx("dropdown", className)}
    >
      <SelectContent
        value={searchText}
        onChange={setSearchText}
        expanded={expanded}
        onExpandedChange={setExpanded}
        searchable={searchable}
        disabled={disabled}
        isError={isError}
        status={statusNode}
        options={selectedOption ? options : undefined}
      />
    </ExpandableContainer>
  );
}

// -----------------------------------------------------------------------
// Compound sub-component static properties
// -----------------------------------------------------------------------
Dropdown.Options = DropdownOptions;
Dropdown.Option = DropdownOption;
