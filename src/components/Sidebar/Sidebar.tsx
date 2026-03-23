import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { useControllable } from '../../hooks/useControllable';
import { checkPath, isObject } from '../../utils';
import { type Option as SidebarOptionType } from '../../utils/types/SidebarOption';
import styles from './Sidebar.module.css';

// ─── react-router-dom auto-detection ───────────────────────────────────────
let RouterLink: React.ComponentType<any> | null = null;
try {
  RouterLink = require('react-router-dom').Link;
} catch {
  // Fall back to <a>
}

// ─── Context ────────────────────────────────────────────────────────────────
interface SidebarContextValue {
  currentValue: any;
  onChange: (option: SidebarOptionType) => void;
  getObject?: boolean;
}

const SidebarContext = createContext<SidebarContextValue>({
  currentValue: undefined,
  onChange: () => {},
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getValue(option: any): any {
  return isObject(option) ? option.value : option;
}

function getPath(path: string | undefined): string {
  if (!path) return '';
  if (!path.startsWith('/')) return '/' + path;
  return path;
}

// ─── SidebarSubOption ────────────────────────────────────────────────────────
interface SidebarSubOptionProps {
  option: SidebarOptionType;
  depth: number;
  parentPath?: string;
}

function SidebarSubOption({ option, depth, parentPath = '' }: SidebarSubOptionProps) {
  const [expanded, setExpanded] = useState(false);
  const { currentValue, onChange } = useContext(SidebarContext);

  // Build full path for this sub-option
  let fullPath = parentPath;
  if (option.path) {
    if (!fullPath.endsWith('/') && !option.path.startsWith('/')) fullPath += '/';
    else if (fullPath.endsWith('/') && option.path.startsWith('/')) fullPath = fullPath.slice(0, -1);
    fullPath += option.path;
  }

  const hasChildren = !!(option.options && option.options.length);

  function isSelected(opt: SidebarOptionType = option): boolean {
    return getValue(currentValue) === getValue(opt) ||
      (!!opt.options && opt.options.some((child) => isSelected(child)));
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
    if (e.key === 'Enter') handleClick(e);
  }

  const subOptionClasses = [
    styles.subOption,
    selected ? styles.subOptionActive : '',
    expanded ? styles.subOptionExpanded : '',
    option.disabled ? styles.disabled : '',
  ].filter(Boolean).join(' ');

  // Indent style based on depth
  const indentStyle: React.CSSProperties = { paddingLeft: `${depth * 16 + 16}px` };

  const content = (
    <div
      className={subOptionClasses}
      style={indentStyle}
      tabIndex={0}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      role={hasChildren ? 'button' : undefined}
    >
      {option.icon && <span className={`${styles.subOptionIcon} material-symbols-rounded`}>{option.icon}</span>}
      <span className={styles.subOptionLabel}>{option.label}</span>
      {hasChildren && (
        <span
          className={`${styles.subOptionChevron} material-symbols-rounded${expanded ? ` ${styles.rotated}` : ''}`}
        >
          keyboard_arrow_down
        </span>
      )}
    </div>
  );

  let wrapper: React.ReactNode;
  if (hasChildren) {
    wrapper = content;
  } else if (RouterLink && option.path) {
    wrapper = (
      <RouterLink to={fullPath} tabIndex={0} className={styles.subOptionLink} onClick={() => onChange(option)}>
        {content}
      </RouterLink>
    );
  } else if (option.path) {
    wrapper = (
      <a href={fullPath} tabIndex={0} className={styles.subOptionLink}>
        {content}
      </a>
    );
  } else {
    wrapper = content;
  }

  return (
    <>
      {wrapper}
      {hasChildren && expanded && option.options?.map((child) => (
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

// ─── SidebarOption ───────────────────────────────────────────────────────────
interface SidebarOptionComponentProps {
  option: SidebarOptionType;
  sidebarExpanded: boolean;
  onRailClick: (option: SidebarOptionType) => void;
  activeParentValue: any;
}

function SidebarOption({ option, sidebarExpanded, onRailClick, activeParentValue }: SidebarOptionComponentProps) {
  const hasChildren = !!(option.options && option.options.length);
  const isActive = getValue(option) === getValue(activeParentValue);

  const optionClasses = [
    styles.option,
    isActive ? styles.optionActive : '',
    option.disabled ? styles.disabled : '',
  ].filter(Boolean).join(' ');

  function handleClick() {
    if (option.disabled) return;
    onRailClick(option);
  }

  function handleKeyUp(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleClick();
  }

  const optionContent = (
    <div
      className={optionClasses}
      tabIndex={0}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      role={hasChildren ? 'button' : undefined}
      aria-expanded={hasChildren ? isActive : undefined}
    >
      <span className={styles.optionIcon}>
        {option.icon && <span className="material-symbols-rounded">{option.icon}</span>}
      </span>
      {sidebarExpanded && <span className={styles.optionLabel}>{option.label}</span>}
    </div>
  );

  if (hasChildren) {
    return optionContent;
  }

  if (RouterLink && option.path) {
    return (
      <RouterLink to={getPath(option.path)} tabIndex={0} className={styles.optionLink}>
        {optionContent}
      </RouterLink>
    );
  }

  if (option.path) {
    return (
      <a href={getPath(option.path)} tabIndex={0} className={styles.optionLink}>
        {optionContent}
      </a>
    );
  }

  return optionContent;
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
interface SidebarProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  expanded?: boolean;
  options: SidebarOptionType[];
  getObject?: boolean;
  className?: string;
}

export function Sidebar({
  value,
  defaultValue,
  onChange,
  expanded = false,
  options,
  getObject = false,
  className,
}: SidebarProps) {
  const [currentValue, setCurrentValue] = useControllable<any>({
    value,
    defaultValue,
    onChange,
  });

  const [isSubPanelOpen, setIsSubPanelOpen] = useState(false);
  const [clickedOption, setClickedOption] = useState<SidebarOptionType | undefined>(undefined);
  const [height, setHeight] = useState<string>('100vh');
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Height calculation from navbar
  useEffect(() => {
    function calcHeight() {
      const navBarHeight = document.querySelector('.navbar')?.getBoundingClientRect()?.height;
      setHeight(navBarHeight ? `calc(100vh - ${navBarHeight}px)` : '100vh');
    }

    calcHeight();
    window.addEventListener('resize', calcHeight);
    return () => window.removeEventListener('resize', calcHeight);
  }, []);

  // Auto-select from path on mount
  useEffect(() => {
    const found = getSelected(options);
    if (found) handleChange(found);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getSelected(opts: SidebarOptionType[], parentPath = ''): SidebarOptionType | undefined {
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
    if (!p.endsWith('/') && !child.startsWith('/')) p += '/';
    else if (p.endsWith('/') && child.startsWith('/')) p = p.slice(0, -1);
    return p + child;
  }

  function handleChange(option: SidebarOptionType) {
    if (option.disabled) return;
    const emitValue = getObject ? option : getValue(option);
    setCurrentValue(emitValue);
  }

  function getParent(opts: SidebarOptionType[], val: any): SidebarOptionType | undefined {
    return opts.find((opt) => {
      if (getValue(opt) === getValue(val)) return true;
      return !!getParent(opt.options || [], val);
    });
  }

  const activeParent = getParent(options, currentValue);

  // Split options into top and bottom
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

  const sidebarClasses = [
    styles.sidebar,
    expanded ? styles.expanded : styles.collapsed,
    className,
  ].filter(Boolean).join(' ');

  const subPanelClasses = [
    styles.subPanel,
    isSubPanelOpen ? styles.subPanelVisible : styles.subPanelHidden,
  ].filter(Boolean).join(' ');

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
        sidebarExpanded={expanded}
        onRailClick={handleRailClick}
        activeParentValue={activeParent}
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
      >
        {/* Main rail */}
        <div className={styles.optionsList}>
          <div className={styles.optionsContainer}>
            {topOptions.map(renderOption)}
          </div>
          {bottomOptions.length > 0 && (
            <div className={styles.bottomOptions}>
              {bottomOptions.map(renderOption)}
            </div>
          )}
        </div>

        {/* Sub-panel — always in DOM so CSS transition works on first open */}
        <div className={subPanelClasses}>
          {clickedOption && clickedOption.options && clickedOption.options.length > 0 &&
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
