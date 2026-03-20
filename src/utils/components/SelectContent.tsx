import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks';
import { Icon } from '../../components/Icon';
import type { ContainerModelExtra } from '../types/ContainerModelExtra';
import '../styles/SelectContent.css';

export type SelectExpandedExtra = {
  source: ContainerModelExtra['source'] | 'value-selected';
};

export interface SelectContentProps {
  value?: string;               // was modelValue — search string
  defaultValue?: string;
  onChange?: (value: string, extra: { index: number }) => void;
  options?: any;                // used to determine placeholder text color
  icon?: string;                // optional icon name
  expanded?: boolean;           // was expanded prop
  defaultExpanded?: boolean;
  onExpandedChange?: (value: boolean, extra: SelectExpandedExtra) => void;
  searchable?: boolean;         // default: false
  disabled?: boolean;           // default: false
  isError?: boolean;            // default: false
  secondary?: boolean;          // default: false
  searchLabel?: React.ReactNode;  // replaces <slot name="search-label">Search</slot>
  status?: React.ReactNode;       // replaces <slot name="status">
  appendIcon?: string;          // optional icon name rendered on right side (overrides nothing — additive)
  className?: string;
}

export function SelectContent({
  value,
  defaultValue = '',
  onChange,
  options,
  icon,
  expanded,
  defaultExpanded,
  onExpandedChange,
  searchable = false,
  disabled = false,
  isError = false,
  secondary = false,
  searchLabel,
  status,
  appendIcon,
  className,
}: SelectContentProps) {
  const [model, setModel] = useControllable<string>({
    value,
    defaultValue,
    onChange: (val) => onChange?.(val, { index: -1 }),
  });

  const [expandedModel, setExpandedModel] = useControllable<boolean>({
    value: expanded,
    defaultValue: defaultExpanded,
    onChange: (val) => onExpandedChange?.(val, { source: 'click' }),
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input when expanded
  useEffect(() => {
    if (expanded && !disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded, disabled]);

  return (
    <>
      {icon && (
        <Icon
          name={icon}
          className={clsx('sc-icon', {
            expanded: expandedModel,
            disabled,
            error: isError,
          })}
        />
      )}
      <span
        className={clsx('flex items-center gap-xs truncate text-sm flex-1', className, {
          'text-neutral-foreground-low': !options,
        })}
      >
        {searchable && !disabled && (
          <div
            className={clsx('flex items-center text-neutral-foreground-high w-full', {
              secondary,
              hidden: !expandedModel,
            })}
            onClick={() => setExpandedModel(true)}
          >
            <Icon
              name="search"
              className={clsx('sc-icon', { expanded: expandedModel, disabled, error: isError })}
            />
            {!model?.length && (
              <div className="relative pointer-events-none">
                <span className="search-placeholder">
                  {searchLabel || 'Search'}
                </span>
              </div>
            )}
            <input
              ref={inputRef}
              type="search"
              className="search"
              disabled={disabled}
              value={model ?? ''}
              onChange={(e) => setModel(e.target.value)}
            />
            {appendIcon && (
              <Icon
                name={appendIcon}
                className={clsx('sc-icon', { expanded: expandedModel, disabled, error: isError })}
              />
            )}
          </div>
        )}
        {status}
      </span>
    </>
  );
}
