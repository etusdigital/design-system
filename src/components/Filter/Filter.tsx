import { useState, useRef } from "react";
import clsx from "clsx";
import { useControllable } from "../../hooks/useControllable";
import { focusWhenReady, isObject } from "../../utils";
import { SelectContainer } from "../../utils/components/SelectContainer";
import { Checkbox } from "../Checkbox/Checkbox";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import styles from "./Filter.module.css";

export interface FilterProps {
  value?: Record<string, any[]>;
  onChange?: (value: Record<string, any[]>) => void;
  onApply?: (value: Record<string, any[]>) => void;
  onClear?: () => void;
  options?: any[];
  labelKey?: string;
  valueKey?: string;
  disabled?: boolean;
  searchable?: boolean;
  searchLabel?: string;
  labelValue?: string;
  clearLabel?: string;
  applyLabel?: string;
  statusLabel?: string;
  isError?: boolean;
  hideActions?: boolean;
  errorMessage?: string;
  className?: string;
  actions?: React.ReactNode;
}

export function Filter({
  value,
  onChange,
  onApply,
  onClear,
  options = [],
  labelKey = "label",
  valueKey = "value",
  disabled = false,
  searchable = false,
  searchLabel = "Search...",
  labelValue = "",
  clearLabel = "Clear selection",
  applyLabel = "Apply filters",
  statusLabel = "Status",
  isError = false,
  hideActions = false,
  errorMessage = "",
  className,
  actions,
}: FilterProps) {
  const [model, setModel] = useControllable<Record<string, any[]>>({
    value,
    defaultValue: {},
    onChange,
  });

  const [expanded, setExpanded] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [searchText, setSearchText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const currentModel: Record<string, any[]> = model ?? {};

  function getCategoryKey(category: any): string {
    return isObject(category) ? category[valueKey] : String(category);
  }

  function getLabel(option: any): string {
    return isObject(option) ? option[labelKey] : String(option ?? "");
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
    if (disabled || subOption?.disabled) return;
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
    onClear?.();
  }

  function applyFilters() {
    onApply?.(currentModel);
  }

  function getItems(): HTMLElement[] {
    return Array.from(
      listRef.current?.querySelectorAll<HTMLElement>("[data-filter-item]") ?? []
    ).filter((item) => item.tabIndex >= 0);
  }

  function focusItem(index: number) {
    const items = getItems();
    items[Math.min(Math.max(index, 0), items.length - 1)]?.focus();
  }

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (disabled || (e.key !== "ArrowDown" && e.key !== "ArrowUp")) return;

    e.preventDefault();
    if (!expanded) setExpanded(true);
    const first = e.key === "ArrowDown";
    focusWhenReady(() => {
      const items = getItems();
      return first ? items[0] : items[items.length - 1];
    });
  }

  function onSearchKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowDown") return;

    e.preventDefault();
    focusItem(0);
  }

  function onItemKeyDown(e: React.KeyboardEvent, option: any, subOption?: any) {
    const item = e.currentTarget as HTMLElement;
    if (e.target !== item) return;

    const index = getItems().indexOf(item);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusItem(index + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusItem(index - 1);
        break;
      case "Home":
        e.preventDefault();
        focusItem(0);
        break;
      case "End":
        e.preventDefault();
        focusItem(getItems().length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        e.stopPropagation();
        if (subOption) toggleSubOption(option, subOption);
        else toggleCategory(getCategoryKey(option));
        break;
      case "ArrowRight":
        if (subOption || expandedCategories[getCategoryKey(option)]) break;
        e.preventDefault();
        toggleCategory(getCategoryKey(option));
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (subOption)
          item
          .closest("[data-filter-category]")
          ?.querySelector<HTMLElement>("[data-filter-item]")
          ?.focus();
        else if (expandedCategories[getCategoryKey(option)] && !searchText)
          toggleCategory(getCategoryKey(option));
        break;
    }
  }

  const totalSelected = Object.values(currentModel).reduce(
    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
    0,
  );

  const searchLower = searchText.toLowerCase();

  const filteredCategories =
    searchable && searchText
      ? (options
          .map((category) => {
            const categoryLabel = getLabel(category).toLowerCase();
            const matchingSubOptions = category.options.filter((sub: any) =>
              getLabel(sub).toLowerCase().includes(searchLower),
            );
            if (
              categoryLabel.includes(searchLower) ||
              matchingSubOptions.length > 0
            ) {
              return {
                ...category,
                options: categoryLabel.includes(searchLower)
                  ? category.options
                  : matchingSubOptions,
              };
            }
            return null;
          })
          .filter(Boolean) as typeof options)
      : options;

  const optionsNode = (
    <div ref={listRef} className="w-full">
      {searchable && (
        <div className={styles.searchBox}>
          <Icon name="search" className="text-lg text-neutral-foreground-low" />
          <input
            type="text"
            className={styles.searchInput}
            placeholder={searchLabel}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={onSearchKeyDown}
          />
          {searchText && (
            <button
              className={styles.searchClear}
              onClick={() => setSearchText("")}
              aria-label="Clear search"
              type="button"
            >
              <Icon name="close" className="text-base" />
            </button>
          )}
        </div>
      )}
      {filteredCategories.map((category) => {
        const key = getCategoryKey(category);
        const isSearching = searchable && !!searchText;
        const isExpanded = isSearching || !!expandedCategories[key];
        const categorySelectedCount = (currentModel[key] ?? []).length;

        return (
          <div key={key} className="w-full" data-filter-category>
            <div
              className={styles.categoryHeader}
              onClick={() => toggleCategory(key)}
              role="button"
              tabIndex={0}
              data-filter-item
              onKeyDown={(e) => onItemKeyDown(e, category)}
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
                  className={clsx(styles.chevron, {
                    [styles.expanded]: isExpanded,
                  })}
                />
              </div>
            </div>
            <div
              className={clsx(styles.categoryContent, {
                [styles.collapsed]: !isExpanded,
              })}
              style={{ maxHeight: isExpanded ? "400px" : "0" }}
            >
              <ul className="flex flex-col">
                {category.options.map((subOption: any, subIdx: number) => (
                  <div
                    key={subIdx}
                    className={clsx(
                      styles.subOption,
                      subOption?.disabled && "pointer-events-none text-neutral-interaction-disabled",
                    )}
                    role="option"
                    aria-selected={isSubOptionSelected(key, subOption)}
                    aria-disabled={!!subOption?.disabled}
                    tabIndex={isExpanded && !subOption?.disabled ? 0 : -1}
                    data-filter-item
                    onClick={() => toggleSubOption(category, subOption)}
                    onKeyDown={(e) => onItemKeyDown(e, category, subOption)}
                  >
                    <Checkbox
                      value={isSubOptionSelected(key, subOption)}
                      className="pointer-events-none"
                      disabled={!!subOption?.disabled}
                      tabIndex={-1}
                    />
                    <span className={styles.subOptionLabel}>
                      {getLabel(subOption)}
                    </span>
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
      {statusLabel}
    </span>
  );

  const complementNode =
    totalSelected > 0 && !disabled ? (
      <span className={styles.selectCount}>{totalSelected}</span>
    ) : undefined;

  const actionsNode =
    !hideActions &&
    (actions || (
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
    ));

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
      complement={complementNode}
      className={clsx("filter", className)}
      onKeyDown={onTriggerKeyDown}
    >
      {statusNode}
    </SelectContainer>
  );
}
