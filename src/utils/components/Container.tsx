import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useControllable, useClickOutside } from '../../hooks';
import { Label } from './Label';
import { Icon } from '../../components/Icon';
import type { ContainerModelExtra } from '../types/ContainerModelExtra';
import '../styles/Container.css';

export interface ContainerProps {
  value?: boolean;              // was modelValue
  defaultValue?: boolean;       // uncontrolled mode
  onChange?: (value: boolean, extra: ContainerModelExtra) => void;  // was update:modelValue
  labelValue?: string;          // default: ''
  role?: string;                // default: 'listbox'
  disabled?: boolean;           // default: false
  isError?: boolean;            // default: false
  errorMessage?: string;        // default: ''
  infoMessage?: string;         // default: ''
  required?: boolean;           // default: false
  closeOnBlur?: boolean;        // default: true
  hideBottom?: boolean;         // default: false
  maxHeight?: string;           // default: 'none'
  minWidth?: string;            // default: '15em'
  secondary?: boolean;          // default: false
  hideArrow?: boolean;          // default: false
  disableLabelAutoWidth?: boolean;  // default: false
  children?: React.ReactNode;           // default slot
  label?: React.ReactNode;              // slot name="label"
  complement?: React.ReactNode;         // slot name="complement" (right side)
  leadingComplement?: React.ReactNode;  // leading slot (left side, before children)
  renderContent?: (minWidth: string) => React.ReactNode;  // slot name="content" :min-width="contentMinWidth"
  className?: string;
}

export function Container({
  value,
  defaultValue,
  onChange,
  labelValue = '',
  role = 'listbox',
  disabled = false,
  isError = false,
  errorMessage = '',
  infoMessage = '',
  required = false,
  closeOnBlur = true,
  hideBottom = false,
  maxHeight = 'none',
  minWidth = '15em',
  secondary = false,
  hideArrow = false,
  disableLabelAutoWidth = false,
  children,
  label,
  complement,
  leadingComplement,
  renderContent,
  className,
}: ContainerProps) {
  const [model, setModel] = useControllable<boolean>({
    value,
    defaultValue,
    onChange: (val) => onChange?.(val, { source: 'click' }),
  });

  const isExpanded = disabled ? false : (model ?? false);

  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [contentMinWidth, setContentMinWidth] = useState(minWidth);

  function resize() {
    const newVal = (containerRef.current?.scrollWidth ?? 0) + 'px';
    if (newVal !== contentMinWidth) {
      setContentMinWidth(newVal);
    }
    if (!disableLabelAutoWidth && labelRef.current && containerRef.current) {
      labelRef.current.style.width = containerRef.current.scrollWidth + 'px';
    }
  }

  // Close from blur: passes source: 'blur' directly to onChange
  function closeFromBlur() {
    if (closeOnBlur && model) {
      onChange?.(false, { source: 'blur' });
      setModel(false);
    }
  }

  useClickOutside([containerRef, contentRef], closeFromBlur, closeOnBlur);

  // MutationObserver on mount — disconnect on unmount
  useEffect(() => {
    const obs = new MutationObserver(resize);
    if (containerRef.current) {
      obs.observe(containerRef.current, { attributes: true });
    }
    resize();
    return () => obs.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Post-render resize — runs after every render (Vue onUpdated equivalent)
  // Safe because resize only calls setContentMinWidth when value changes
  useEffect(() => {
    resize();
  });

  function toggle() {
    if (disabled) return;
    setModel(!model);
  }

  return (
    <div className={clsx('container', className)}>
      {labelValue && (
        <div className="flex justify-between items-center">
          <Label labelValue={labelValue} infoMessage={infoMessage} required={required} />
        </div>
      )}
      <div
        ref={containerRef}
        role={role}
        aria-disabled={disabled || undefined}
        aria-required={required || undefined}
        className="label-container"
        tabIndex={0}
      >
        {label || (
          <div
            ref={labelRef}
            className={clsx('label-content', {
              disabled,
              secondary,
              expanded: isExpanded,
              'hide-bottom': hideBottom,
              error: isError,
            })}
            style={{ maxHeight, minWidth }}
            onClick={toggle}
            onKeyUp={(e) => { if (e.key === ' ') toggle(); }}
          >
            {leadingComplement}
            {children}

            <div className="flex items-center gap-xs ml-auto">
              {complement}
              {!hideArrow && (
                <Icon
                  name="keyboard_arrow_down"
                  className={clsx('arrow-icon', {
                    'text-neutral-interaction-disabled': disabled,
                    'text-danger-interaction-default': isError,
                    expanded: isExpanded,
                  })}
                />
              )}
            </div>
          </div>
        )}

        {/* Content slot — replaces Vue <Transition name="expand"><slot name="content" :min-width="contentMinWidth" /> */}
        <div ref={contentRef}>
          {renderContent?.(contentMinWidth)}
        </div>
      </div>
      {isError && (
        <small className="text-danger-foreground-low text-start p3">{errorMessage}</small>
      )}
    </div>
  );
}
