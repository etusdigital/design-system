import clsx from "clsx";
import { Fragment, useState, useRef } from "react";
import { useControllable } from "../../hooks";
import { ExpandableContainer } from "../../utils/components/ExpandableContainer";
import { focusWhenReady, isObject } from "../../utils";
import { Icon } from "../Icon/Icon";
import { SelectContent } from "../../utils/components/SelectContent";
import { Separator } from "../Separator";
import styles from "./Dropdown.module.css";

export interface DropdownOptionItem {
  label: string;
  value: any;
  icon?: string;
  disabled?: boolean;
  bottom?: boolean;
  options?: DropdownOptionItem[];
  [key: string]: any;
}
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
  const root = useRef<HTMLDivElement>(null);
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

  function getOptionElements(container?: Element | null): HTMLElement[] {
    return (Array.from(container?.children ?? []) as HTMLElement[]).filter(
      (el) => el.hasAttribute("data-dropdown-option") && el.tabIndex >= 0
    );
  }

  function focusFirstSubOption() {
    setSubExpanded(true);
    focusWhenReady(() => {
      const listbox = root.current?.querySelector(".sub-options [role=listbox]");
      return getOptionElements(listbox)[0];
    });
  }

  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (root.current?.contains(e.relatedTarget as Node)) return;
    setSubExpanded(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.target !== root.current) return;

    const siblings = getOptionElements(root.current.parentElement);
    const index = siblings.indexOf(root.current);
    const hasSubOptions = !!option.options?.length;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        siblings[Math.min(index + 1, siblings.length - 1)]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        siblings[Math.max(index - 1, 0)]?.focus();
        break;
      case "Home":
        e.preventDefault();
        siblings[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        siblings[siblings.length - 1]?.focus();
        break;
      case "ArrowRight":
        if (!hasSubOptions) break;
        e.preventDefault();
        focusFirstSubOption();
        break;
      case "ArrowLeft": {
        const parentOption = root.current.parentElement?.closest<HTMLElement>(
          "[data-dropdown-option]"
        );
        if (!parentOption) break;
        e.preventDefault();
        parentOption.focus();
        break;
      }
      case "Enter":
      case " ":
        e.preventDefault();
        if (option.disabled) break;
        if (hasSubOptions) focusFirstSubOption();
        else onSelect(option);
        break;
    }
  }

  if (option.options && option.options.length > 0) {
    function isChildSelected(options: any) {
      return options.find((option: any) => {
        if (selectedValue == getValue(option)) return true;
        else if (option?.options) return isChildSelected(option.options);
      });
    }

    return (
      <div ref={root} className="relative" data-dropdown-option tabIndex={option.disabled ? -1 : 0} role="menuitem" aria-disabled={option.disabled} aria-haspopup="menu" aria-expanded={subExpanded} onKeyDown={onKeyDown} onBlur={handleBlur}>
        <div
          className={clsx(
            styles.optionItem,
            {
              [styles.disabled]: option.disabled,
              [styles.selected]: isChildSelected(option.options),
            },
            "justify-between",
          )}
          onClick={() => !option.disabled && setSubExpanded((prev) => !prev)}
        >
          <div className="flex item-center gap-xs">
            {option.icon && (
              <Icon className={styles.dropwdownIcon} name={option.icon} />
            )}
            <span className={styles.groupLabel}>{label}</span>
          </div>
          <Icon className={styles.chevronIcon} name="chevron_right" />
        </div>
        {subExpanded && (
          <div className={clsx(styles.flyoutCard, "sub-options")}>
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
      ref={root}
      className={clsx(styles.optionItem, {
        [styles.selected]: isSelected,
        [styles.disabled]: option.disabled,
      })}
      data-dropdown-option
      tabIndex={option.disabled ? -1 : 0}
      role="menuitem"
      aria-current={isSelected || undefined}
      aria-disabled={option.disabled}
      onClick={() => !option.disabled && onSelect(option)}
      onKeyDown={onKeyDown}
      onBlur={handleBlur}
    >
      {option.icon && (
        <Icon className={styles.dropwdownIcon} name={option.icon} />
      )}
      <span>{label}</span>
    </div>
  );
}

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
    <div role="menu" className={styles.optionsContainer}>
      {parsedOptions.map((options, index) => (
        <Fragment key={"options-" + index}>
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
        </Fragment>
      ))}
    </div>
  );
}

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
export interface DropdownProps {
  value?: any;
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

export function Dropdown({
  value,
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
    defaultValue: null,
    onChange,
  });

  const [searchText, setSearchText] = useState("");
  const [expanded, setExpanded] = useState(false);
  const optionsCard = useRef<HTMLDivElement>(null);

  function getValue(option: any): any {
    return isObject(option) ? (option[valueKey] ?? option.value) : option;
  }

  function selectOption(option: DropdownOptionItem) {
    const emitValue = getObject ? option : getValue(option);
    setSelectedValue(emitValue);
    setTimeout(() => setExpanded(false));
    setSearchText("");
  }

  const filteredOptions =
    searchable && searchText
      ? filterOptions(options, searchText, labelKey)
      : options;

  const selectedOption =
    selectedValue != null
      ? findOptionByValue(options, selectedValue, valueKey, labelKey)
      : undefined;

  function onKeyDown(e: React.KeyboardEvent) {
    if (disabled || (e.key !== "ArrowDown" && e.key !== "ArrowUp")) return;

    e.preventDefault();
    setExpanded(true);
    const first = e.key === "ArrowDown";
    focusWhenReady(() => {
      const optionElements = Array.from(
        optionsCard.current?.querySelectorAll<HTMLElement>(
          ":scope > [role=listbox] > [data-dropdown-option]"
        ) ?? []
      ).filter((el) => el.tabIndex >= 0);
      return first ? optionElements[0] : optionElements[optionElements.length - 1];
    });
  }

  let statusNode: React.ReactNode;
  if (selectedOption)
    statusNode = (
      <span>{selectedOption[labelKey] ?? selectedOption.label ?? ""}</span>
    );
  else statusNode = children;

  const card = (
    <div ref={optionsCard}>
      <DropdownOptions
        options={filteredOptions}
        labelKey={labelKey}
        valueKey={valueKey}
        selectedValue={selectedValue != null ? getValue(selectedValue) : null}
        onSelect={selectOption}
      />
    </div>
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
      popupRole="menu"
      card={card}
      className={clsx("dropdown", className)}
      onKeyDown={onKeyDown}
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

Dropdown.Options = DropdownOptions;
Dropdown.Option = DropdownOption;
