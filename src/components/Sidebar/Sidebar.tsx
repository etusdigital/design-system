import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { useControllable } from "../../hooks/useControllable";
import { checkPath, isObject, focusByArrowKey } from "../../utils";
import { type Option as SidebarOptionType } from "../../utils/types/SidebarOption";
import styles from "./Sidebar.module.css";
import { Icon } from "../Icon";
import { Button } from "../Button";

let RouterLink: React.ComponentType<any> | null = null;
let linkPropName: "to" | "href" = "to";
try {
  RouterLink = require("react-router-dom").Link;
  linkPropName = "to";
} catch {}
if (!RouterLink) {
  try {
    RouterLink = require("next/link");
    linkPropName = "href";
  } catch {}
}
interface SidebarContextValue {
  currentValue: any;
  onChange: (option: SidebarOptionType) => void;
  getObject?: boolean;
}

const SidebarContext = createContext<SidebarContextValue>({
  currentValue: undefined,
  onChange: () => {},
});

function getValue(option: any): any {
  return isObject(option) ? option.value : option;
}

function getPath(path: string | undefined): string {
  if (!path) return "";
  if (!path.startsWith("/")) return "/" + path;
  return path;
}

interface SidebarSubOptionProps {
  option: SidebarOptionType;
  depth: number;
  parentPath?: string;
}

function SidebarSubOption({
  option,
  depth,
  parentPath = "",
}: SidebarSubOptionProps) {
  const [expanded, setExpanded] = useState(false);
  const { currentValue, onChange } = useContext(SidebarContext);

  let fullPath = parentPath;
  if (option.path) {
    if (!fullPath.endsWith("/") && !option.path.startsWith("/"))
      fullPath += "/";
    else if (fullPath.endsWith("/") && option.path.startsWith("/"))
      fullPath = fullPath.slice(0, -1);
    fullPath += option.path;
  }

  const hasChildren = !!(option.options && option.options.length);

  function isSelected(opt: SidebarOptionType = option): boolean {
    return (
      getValue(currentValue) === getValue(opt) ||
      (!!opt.options && opt.options.some((child) => isSelected(child)))
    );
  }

  const selected = isSelected();

  function handleClick(_e: React.MouseEvent | React.KeyboardEvent) {
    if (option.disabled) return;
    if (hasChildren) {
      setExpanded((prev) => !prev);
    } else {
      onChange(option);
    }
  }

  function handleKeyUp(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleClick(e);
  }

  const subOptionClasses = [
    styles.subOption,
    selected ? styles.subOptionActive : "",
    expanded ? styles.subOptionExpanded : "",
    option.disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  const indentStyle: React.CSSProperties = {
    paddingLeft: `${depth * 16 + 16}px`,
  };

  const isLink = !hasChildren && !!option.path;
  const focusIndex = option.disabled ? -1 : 0;

  const content = (
    <div
      className={subOptionClasses}
      style={indentStyle}
      tabIndex={isLink ? undefined : focusIndex}
      onClick={isLink ? undefined : handleClick}
      onKeyUp={isLink ? undefined : handleKeyUp}
      role={hasChildren ? "button" : undefined}
    >
      {option.icon && (
        <Icon className={`${styles.optionIcon}`} name={option.icon} />
      )}
      <span className={styles.subOptionLabel}>{option.label}</span>
      {hasChildren && (
        <Icon
          className={`${styles.subOptionChevron} ${expanded ? `${styles.rotated}` : ""}`}
          name="keyboard_arrow_down"
        />
      )}
    </div>
  );

  let wrapper: React.ReactNode;
  if (hasChildren) {
    wrapper = content;
  } else if (RouterLink && option.path) {
    wrapper = (
      <RouterLink
        {...{ [linkPropName]: fullPath }}
        tabIndex={focusIndex}
        className={styles.subOptionLink}
        onClick={handleClick}
        aria-label={option.label}
        aria-current={selected ? 'page' : undefined}
      >
        {content}
      </RouterLink>
    );
  } else if (option.path) {
    wrapper = (
      <a
        href={fullPath}
        tabIndex={focusIndex}
        className={styles.subOptionLink}
        onClick={handleClick}
        aria-label={option.label}
        aria-current={selected ? 'page' : undefined}
      >
        {content}
      </a>
    );
  } else {
    wrapper = content;
  }

  return (
    <>
      {wrapper}
      {hasChildren &&
        expanded &&
        option.options?.map((child) => (
          <SidebarSubOption
            key={child.value}
            option={child}
            depth={depth + 1}
            parentPath={fullPath}
          />
        ))}
    </>
  );
}

interface SidebarOptionComponentProps {
  option: SidebarOptionType;
  sidebarExpanded: boolean;
  onRailClick: (option: SidebarOptionType) => void;
  activeParentValue: any;
  openedParentValue?: any;
}

function SidebarOption({
  option,
  sidebarExpanded,
  onRailClick,
  activeParentValue,
  openedParentValue,
}: SidebarOptionComponentProps) {
  const hasChildren = !!(option.options && option.options.length);
  const isActive = getValue(option) === getValue(activeParentValue);

  const optionClasses = [
    styles.option,
    isActive ? styles.optionActive : "",
    option.disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  function handleClick() {
    if (option.disabled) return;
    onRailClick(option);
  }

  function handleKeyUp(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleClick();
  }

  const isLink = !hasChildren && !!option.path;
  const focusIndex = option.disabled ? -1 : 0;

  const optionContent = (
    <div
      className={optionClasses}
      role={hasChildren ? "button" : undefined}
      tabIndex={isLink ? undefined : focusIndex}
      onClick={isLink ? undefined : handleClick}
      onKeyUp={isLink ? undefined : handleKeyUp}
      aria-expanded={
        hasChildren ? getValue(option) === getValue(openedParentValue) : undefined
      }
      aria-label={hasChildren ? option.label : undefined}
      data-sidebar-value={hasChildren ? String(getValue(option)) : undefined}
    >
      <span className={styles.optionIconContainer}>
        {option.icon && (
          <Icon name={option.icon} className={styles.optionIcon} />
        )}
      </span>
      {sidebarExpanded && (
        <span className={styles.optionLabel}>{option.label}</span>
      )}
    </div>
  );

  if (hasChildren) {
    return optionContent;
  }

  if (RouterLink && option.path) {
    return (
      <RouterLink
        {...{ [linkPropName]: getPath(option.path) }}
        tabIndex={focusIndex}
        className={styles.optionLink}
        onClick={handleClick}
        aria-label={option.label}
        aria-current={isActive ? 'page' : undefined}
      >
        {optionContent}
      </RouterLink>
    );
  }

  if (option.path) {
    return (
      <a
        href={getPath(option.path)}
        tabIndex={focusIndex}
        className={styles.optionLink}
        onClick={handleClick}
        aria-label={option.label}
        aria-current={isActive ? 'page' : undefined}
      >
        {optionContent}
      </a>
    );
  }

  return optionContent;
}

interface SidebarProps {
  value?: any;
  onChange?: (value: any) => void;
  expanded?: boolean;
  collapsible?: boolean;
  onExpandedChange?: (value: boolean) => void;
  options: SidebarOptionType[];
  getObject?: boolean;
  className?: string;
}

export function Sidebar({
  value,
  onChange,
  expanded = false,
  collapsible = false,
  onExpandedChange,
  options,
  getObject = false,
  className,
}: SidebarProps) {
  const [currentValue, setCurrentValue] = useControllable<any>({
    value,
    onChange,
  });

  const [isSubPanelOpen, setIsSubPanelOpen] = useState(false);
  const [clickedOption, setClickedOption] = useState<
    SidebarOptionType | undefined
  >(undefined);
  const [selfExpanded, setSelfExpanded] = useState(expanded);
  const [height, setHeight] = useState<string>("100vh");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const subPanelRef = useRef<HTMLDivElement>(null);
  const focusFirstSubOption = useRef(false);
  const optionsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelfExpanded(expanded);
  }, [expanded]);

  function toggleExpanded() {
    setSelfExpanded((prev) => {
      const next = !prev;
      onExpandedChange?.(next);
      return next;
    });
  }

  useEffect(() => {
    function calcHeight() {
      const navBarHeight = document
        .querySelector(".navbar")
        ?.getBoundingClientRect()?.height;
      setHeight(navBarHeight ? `calc(100vh - ${navBarHeight}px)` : "100vh");
    }

    calcHeight();
    window.addEventListener("resize", calcHeight);
    return () => window.removeEventListener("resize", calcHeight);
  }, []);

  useEffect(() => {
    const found = getSelected(options);
    if (found) handleChange(found);
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  function getSelected(
    opts: SidebarOptionType[],
    parentPath = "",
  ): SidebarOptionType | undefined {
    for (const opt of opts) {
      const fullPath = buildPath(parentPath, opt.path);
      if (checkPath(fullPath)) return opt;
      const nested = getSelected(opt.options || [], fullPath);
      if (nested) return nested;
    }
    return undefined;
  }

  function buildPath(parent: string, child?: string): string {
    if (!child) return parent;
    let p = parent;
    if (!p.endsWith("/") && !child.startsWith("/")) p += "/";
    else if (p.endsWith("/") && child.startsWith("/")) p = p.slice(0, -1);
    return p + child;
  }

  function handleChange(option: SidebarOptionType) {
    if (option.disabled) return;
    const emitValue = getObject ? option : getValue(option);
    setCurrentValue(emitValue);
  }

  function getParent(
    opts: SidebarOptionType[],
    val: any,
  ): SidebarOptionType | undefined {
    return opts.find((opt) => {
      if (getValue(opt) === getValue(val)) return true;
      return !!getParent(opt.options || [], val);
    });
  }

  const activeParent = getParent(options, currentValue);

  const topOptions = options.filter((o) => !o.bottom);
  const bottomOptions = options.filter((o) => o.bottom);

  function handleRailClick(option: SidebarOptionType) {
    if (option.disabled) return;
    const hasChildren = !!(option.options && option.options.length);
    if (hasChildren) {
      if (clickedOption?.value === option.value) {
        setIsSubPanelOpen((prev) => !prev);
      } else {
        setClickedOption(option);
        setIsSubPanelOpen(true);
      }
    } else {
      setIsSubPanelOpen(false);
      handleChange(option);
    }
  }

  function handleBlur(e: React.FocusEvent) {
    const relatedTarget = e.relatedTarget as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      setIsSubPanelOpen(false);
    }
  }

  function getFocusables(container?: HTMLElement | null): HTMLElement[] {
    return Array.from(
      container?.querySelectorAll<HTMLElement>("a[href], [tabindex]") ?? []
    ).filter((el) => el.tabIndex >= 0);
  }

  useEffect(() => {
    if (!isSubPanelOpen || !focusFirstSubOption.current) return;
    focusFirstSubOption.current = false;

    let attempts = 30;
    const tryFocus = () => {
      const first = getFocusables(subPanelRef.current)[0];
      first?.focus();
      if (document.activeElement !== first && attempts-- > 0) requestAnimationFrame(tryFocus);
    };
    tryFocus();
  }, [isSubPanelOpen, clickedOption]);

  function closeSubOptions() {
    setIsSubPanelOpen(false);
    const openedOption = sidebarRef.current?.querySelector<HTMLElement>('[aria-expanded="true"]');
    if (openedOption) {
      openedOption.focus();
    }
  }

  function openSubOptions(option: SidebarOptionType) {
    if (option.disabled || !option.options?.length) return;
    setClickedOption(option);
    setIsSubPanelOpen(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const target = e.target as HTMLElement;
    const inSubPanel = subPanelRef.current?.contains(target);

    if (inSubPanel && e.key === 'ArrowLeft') {
      e.preventDefault();
      closeSubOptions();
      return;
    }

    if (inSubPanel && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Home' || e.key === 'End')) {
      const subItems = getFocusables(subPanelRef.current);
      focusByArrowKey(e, subItems, 'vertical');
      return;
    }

    if (!inSubPanel && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Home' || e.key === 'End')) {
      const mainItems = getFocusables(optionsListRef.current);
      focusByArrowKey(e, mainItems, 'vertical');
      return;
    }

    if (!inSubPanel && e.key === 'ArrowRight') {
      const value = target.closest<HTMLElement>('[data-sidebar-value]')?.dataset.sidebarValue;
      const targetOption = options.find((opt) => String(getValue(opt)) === value);
      if (!targetOption?.options?.length || targetOption.disabled) return;
      e.preventDefault();
      focusFirstSubOption.current = true;
      openSubOptions(targetOption);
      return;
    }

    if (e.key === 'Escape' && isSubPanelOpen) {
      e.stopPropagation();
      closeSubOptions();
      return;
    }
  }

  const sidebarClasses = [styles.sidebar, "sidebar", className]
    .filter(Boolean)
    .join(" ");

  const subPanelClasses = [
    styles.subPanel,
    isSubPanelOpen ? styles.subPanelVisible : styles.subPanelHidden,
  ]
    .filter(Boolean)
    .join(" ");

  const contextValue: SidebarContextValue = {
    currentValue,
    onChange: handleChange,
    getObject,
  };

  function renderOption(option: SidebarOptionType) {
    return (
      <SidebarOption
        key={option.value}
        option={option}
        sidebarExpanded={selfExpanded}
        onRailClick={handleRailClick}
        activeParentValue={activeParent}
        openedParentValue={isSubPanelOpen ? clickedOption : undefined}
      />
    );
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        ref={sidebarRef}
        className={sidebarClasses}
        style={{ height }}
        tabIndex={0}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        <div ref={optionsListRef} className={styles.optionsList}>
          <div className={styles.optionsContainer}>
            {topOptions.map(renderOption)}
          </div>
          {(bottomOptions.length > 0 || collapsible) && (
            <div className={styles.bottomOptions}>
              {bottomOptions.map(renderOption)}
              {collapsible && (
                <Button
                  className={[
                    styles.toggleButton,
                    selfExpanded ? styles.toggleOpen : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  variant="plain"
                  color="neutral"
                  icon="keyboard_arrow_right"
                  round
                  onClick={toggleExpanded}
                />
              )}
            </div>
          )}
        </div>

        <div ref={subPanelRef} className={subPanelClasses}>
          {clickedOption &&
            clickedOption.options &&
            clickedOption.options.length > 0 &&
            clickedOption.options.map((subOpt) => (
              <SidebarSubOption
                key={subOpt.value}
                option={subOpt}
                depth={0}
                parentPath={getPath(clickedOption.path)}
              />
            ))}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
