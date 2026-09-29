import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useControllable } from "../../hooks/useControllable";
import { isObject } from "../../utils";
import { SelectContainer } from "../../utils/components/SelectContainer";
import { Option } from "../../utils/components/Option";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { Icon } from "../Icon/Icon";
import styles from "./TagSelect.module.css";

export interface TagSelectProps {
  value?: any[];
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
  icon?: string;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  absolute?: boolean;
  buttonLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

export function TagSelect({
  value,
  onChange,
  options = [],
  labelKey = "label",
  valueKey = "value",
  getObject: getObjectProp = false,
  disabled = false,
  labelValue = "",
  searchable = false,
  creatable = false,
  isError = false,
  errorMessage = "",
  infoMessage = "",
  required = false,
  placeholder,
  icon,
  expanded: expandedProp,
  onExpandedChange,
  absolute = true,
  buttonLabel,
  className,
  children,
}: TagSelectProps) {
  const [model, setModel] = useControllable<any[]>({
    value,
    defaultValue: [],
    onChange,
  });

  const [searchText, setSearchText] = useState("");
  const [createdOptions, setCreatedOptions] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useControllable<boolean>({
    value: expandedProp,
    defaultValue: false,
    onChange: onExpandedChange,
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expanded = isOpen ?? false;
  const input = useRef<HTMLInputElement>(null);

  const selectedValues: any[] = Array.isArray(model) ? model : [];

  useEffect(() => {
    if (!isOpen) input.current?.blur();
    else input.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    setSelectedIndex(null);
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(null);
  }, [searchText]);

  useEffect(() => {
    if (selectedIndex == null) return;
    optionRefs.current[selectedIndex]?.focus();
  }, [selectedIndex]);

  function getLabel(option: any): string {
    return isObject(option) ? option[labelKey] : String(option ?? "");
  }

  function getValue(option: any): any {
    return isObject(option) ? option[valueKey] : option;
  }

  function isIncluded(arr: any[], option: any): boolean {
    const optionValue = isObject(option) ? option[valueKey] : option;
    return arr.some((i) => {
      const iValue = isObject(i) ? i[valueKey] : i;
      return iValue === optionValue;
    });
  }

  function toggleOption(option: any) {
    if (disabled) return;
    const emitValue = getObjectProp ? option : getValue(option);
    const arr = [...selectedValues];
    const idx = arr.findIndex((m) =>
      isObject(option)
        ? getLabel(m) === getLabel(option)
        : getValue(m) === getValue(option),
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
    const allOptions = [...options, ...createdOptions];
    const existingOption = allOptions.find(
      (o) => getLabel(o).toLowerCase() === searchText.toLowerCase(),
    );
    if (existingOption) {
      if (!isIncluded(selectedValues, existingOption)) {
        toggleOption(existingOption);
      }
      setSearchText("");
      return;
    }
    if (isIncluded(selectedValues, searchText)) {
      setSearchText("");
      return;
    }
    const newOption = { [labelKey]: searchText, [valueKey]: searchText };
    setCreatedOptions((prev) => [...prev, newOption]);
    const emitValue = getObjectProp ? newOption : searchText;
    const arr = [...selectedValues, emitValue];
    setModel(arr);
    setSearchText("");
  }

  const allOptions = [...options, ...createdOptions];

  const filteredOptions = searchText
    ? allOptions.filter((o) =>
        getLabel(o).toLowerCase().includes(searchText.toLowerCase()),
      )
    : allOptions;

  const searchedOptions = filteredOptions;

  const showAddButton =
    creatable &&
    searchText &&
    !filteredOptions.some(
      (o) => getLabel(o).toLowerCase() === searchText.toLowerCase(),
    );

  const tagsNode =
    selectedValues.length > 0 ? (
      <div
        className={clsx(styles.tagContainer)}
        onClick={() => setTimeout(() => setIsOpen(false))}
      >
        {selectedValues.map((option, index) => (
          <StatusBadge
            key={index}
            color="neutral"
            className="py-none max-w-full"
            closeable
            onClose={() => removeTag(index)}
          >
            {isObject(option) ? option[labelKey] : option}
          </StatusBadge>
        ))}
      </div>
    ) : undefined;

  const searchNode = (
    <div className="flex items-center gap-xs w-full">
      {(searchable || creatable) && (
        <input
          ref={input}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && creatable) addCreatableOption();
          }}
          placeholder={placeholder ?? "Search"}
          disabled={disabled}
          className={clsx(
            "text-neutral-interaction-default h-full w-full bg-neutral-surface-default p-none m-none border-none shadow-none outline-none text-sm",
            {
              "text-danger-foreground-low": isError,
              "bg-neutral-surface-disabled text-neutral-foreground-low":
                disabled,
            },
          )}
          style={{ boxShadow: "none" }}
          onClick={() => setTimeout(() => setIsOpen(true))}
        />
      )}
    </div>
  );

  const statusNode =
    !expanded && selectedValues.length > 0
      ? tagsNode
      : searchable || creatable
        ? searchNode
        : children;

  function onKeyDown(e: React.KeyboardEvent) {
    const last = searchedOptions.length - 1;
    if (last < 0) return;

    const hasSelection = selectedIndex != null;
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        setSelectedIndex(hasSelection ? Math.max(selectedIndex - 1, 0) : last);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        setSelectedIndex(hasSelection ? Math.min(selectedIndex + 1, last) : 0);
        break;
    }
  }

  function onOptionKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case " ":
        e.preventDefault();
        break;
      case "Home":
        e.preventDefault();
        setSelectedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setSelectedIndex(searchedOptions.length - 1);
        break;
      default:
        onKeyDown(e);
    }
  }

  const optionsNode = (
    <div className={styles.optionContainer}>
      {filteredOptions.length === 0 && searchText ? (
        <div className={styles.containerText}>No result found</div>
      ) : allOptions.length === 0 ? (
        <div className={styles.containerText}>No tags created yet</div>
      ) : (
        filteredOptions.map((option, index) => (
          <Option
            key={index}
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            selected={isIncluded(selectedValues, option)}
            onClick={() => toggleOption(option)}
            onFocus={() => setSelectedIndex(index)}
            onKeyDown={onOptionKeyDown}
            className={clsx(
              { "font-bold": isIncluded(selectedValues, option) },
              "p-xs",
            )}
          >
            {getLabel(option)}
          </Option>
        ))
      )}
    </div>
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

  const iconNode = icon ? (
    <Icon name={icon} className={styles.nodeIcon} />
  ) : undefined;

  return (
    <SelectContainer
      value={expanded}
      onChange={(val) => setIsOpen(val)}
      labelValue={buttonLabel ?? labelValue}
      disabled={disabled}
      isError={isError}
      errorMessage={errorMessage}
      infoMessage={infoMessage}
      required={required}
      absolute={absolute}
      maxHeight="none"
      minWidth="12em"
      leadingComplement={iconNode}
      options={optionsNode}
      actions={actionsNode}
      className={clsx("tag-select", className)}
      onKeyDown={onKeyDown}
    >
      {statusNode}
    </SelectContainer>
  );
}
