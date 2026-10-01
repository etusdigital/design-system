import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useControllable } from "../../hooks/useControllable";
import { SelectContainer } from "../../utils/components/SelectContainer";
import { Option } from "../../utils/components/Option";
import styles from "./AutoComplete.module.css";
import { Input } from "../Input";

export interface AutoCompleteProps {
  value?: string | number;
  onChange?: (value: any) => void;
  options: string[] | number[];
  disabled?: boolean;
  labelValue?: string;
  ariaLabel?: string;
  isError?: boolean;
  errorMessage?: string;
  infoMessage?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function AutoComplete({
  value,
  onChange,
  options,
  disabled = false,
  labelValue = "",
  ariaLabel,
  isError = false,
  errorMessage = "",
  infoMessage = "",
  required = false,
  placeholder = "Search...",
  className,
}: AutoCompleteProps) {
  const [model, setModel] = useControllable<any>({
    value,
    onChange,
  });

  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  let focus = false

  useEffect(() => {
    if (expanded) return;
    setSelectedIndex(null);
  }, [expanded]);

  useEffect(() => {
    setSelectedIndex(null);
  }, [model]);

  useEffect(() => {
    if (selectedIndex == null) return;
    optionRefs.current[selectedIndex]?.focus();
  }, [selectedIndex]);

  function handleExpanded(val: boolean, extra?: any) {
    if (extra?.source == "blur") setExpanded(val && focus);
    else if (focus) setExpanded(true)
    else setExpanded(val);
  }

  function handleFocus(val: boolean) {
    focus = val
  }

  const filteredOptions = options.filter((o) =>
    String(o)
      .toLowerCase()
      .includes(model?.toLowerCase() || ""),
  );

  function selectOption(option: string | number) {
    if (disabled) return;

    setModel(option);
    setExpanded(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const last = filteredOptions.length - 1;
    if (last < 0) return;

    const hasSelection = selectedIndex != null;
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (!expanded) setExpanded(true);
        setSelectedIndex(hasSelection ? Math.max(selectedIndex - 1, 0) : last);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!expanded) setExpanded(true);
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
        setSelectedIndex(filteredOptions.length - 1);
        break;
      default:
        onKeyDown(e);
    }
  }

  const optionsNode =
    filteredOptions.length > 0
      ? filteredOptions.map((option, index) => (
          <Option
            key={index}
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            selected={model === option}
            onClick={() => selectOption(option)}
            onFocus={() => setSelectedIndex(index)}
            onKeyDown={onOptionKeyDown}
          >
            {option}
          </Option>
        ))
      : [
          <div key="no-results" className={styles.noResults}>
            No options match your search
          </div>,
        ];

  return (
    <div className="auto-complete" onClick={() => setTimeout(() => handleExpanded(focus))} onKeyDown={onKeyDown}>
      <SelectContainer
        value={expanded}
        onChange={handleExpanded}
        labelValue={labelValue}
        ariaLabel={ariaLabel}
        absolute={true}
        disabled={disabled}
        isError={isError}
        errorMessage={errorMessage}
        infoMessage={infoMessage}
        required={required}
        options={optionsNode}
        label={
          <Input
            value={model}
            disabled={disabled}
            isError={isError}
            infoMessage={infoMessage}
            placeholder={placeholder}
            appendIcon="unfold_more"
            onChange={setModel}
            onFocus={() => {handleFocus(true)}}
            onBlur={() => handleFocus(false)}
          />
        }
        className={clsx("auto-complete-content", className)}
      />
    </div>
  );
}
