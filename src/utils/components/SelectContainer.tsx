import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks';
import { ExpandableContainer } from './ExpandableContainer';
import type { ContainerModelExtra } from '../types/ContainerModelExtra';
import '../styles/SelectContainer.css';

export interface SelectContainerProps {
  value?: boolean;              // was modelValue — expanded state
  defaultValue?: boolean;
  onChange?: (value: boolean, extra: ContainerModelExtra) => void;
  labelValue?: string;          // default: ''
  role?: string;                // default: 'listbox'
  absolute?: boolean;           // default: false
  disabled?: boolean;           // default: false
  isError?: boolean;            // default: false
  errorMessage?: string;        // default: ''
  infoMessage?: string;         // default: ''
  required?: boolean;           // default: false
  closeOnBlur?: boolean;        // default: true
  dontHaveMaxHeight?: boolean;  // default: false
  maxHeight?: string;           // default: '40px'
  minWidth?: string;            // default: '15em'
  secondary?: boolean;          // default: false
  hideArrow?: boolean;          // default: false
  disableLabelAutoWidth?: boolean; // default: false
  children?: React.ReactNode;       // default slot (label area content)
  complement?: React.ReactNode;     // complement slot (right side)
  leadingComplement?: React.ReactNode; // leading slot (left side)
  label?: React.ReactNode;          // label slot override
  content?: React.ReactNode;        // content slot (replaces <slot name="content">)
  options?: React.ReactNode;        // options slot (replaces <slot name="options">)
  actions?: React.ReactNode;        // actions slot
  className?: string;
}

export function SelectContainer({
  value,
  defaultValue,
  onChange,
  labelValue = '',
  absolute = false,
  disabled = false,
  isError = false,
  errorMessage = '',
  infoMessage = '',
  required = false,
  closeOnBlur = true,
  dontHaveMaxHeight = false,
  maxHeight = '40px',
  minWidth = '15em',
  secondary = false,
  hideArrow = false,
  disableLabelAutoWidth = false,
  children,
  complement,
  leadingComplement,
  label,
  content,
  options,
  actions,
  className,
}: SelectContainerProps) {
  const [model, setModel] = useControllable<boolean>({
    value,
    defaultValue,
    onChange: (val) => onChange?.(val, { source: 'click' }),
  });

  const isExpanded = disabled ? false : (model ?? false);

  // Use ref to avoid stale closure in observer callbacks
  const isExpandedRef = useRef(isExpanded);
  isExpandedRef.current = isExpanded;

  const fatherRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function resize() {
    if (!contentRef.current) return;
    contentRef.current.style.maxHeight = isExpandedRef.current
      ? `${contentRef.current.scrollHeight + 1}px`
      : '0px';
  }

  // Mount effect: set up ResizeObserver + MutationObserver + 200ms initial resize
  useEffect(() => {
    const fatherEl = fatherRef.current;
    if (!fatherEl) return;
    const containerEl = fatherEl.querySelector('.label-container') as HTMLDivElement | null;
    const contentEl = contentRef.current;

    const resizeObs = new ResizeObserver(() => resize());
    const mutationObs = new MutationObserver(() => resize());

    if (containerEl) {
      mutationObs.observe(containerEl, { characterData: true, subtree: true, childList: true });
      resizeObs.observe(containerEl, { box: 'border-box' });
    }
    if (contentEl) resizeObs.observe(contentEl, { box: 'border-box' });

    const timer = setTimeout(() => resize(), 200);

    return () => {
      resizeObs.disconnect();
      mutationObs.disconnect();
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Post-render resize (Vue onUpdated equivalent)
  // Safe: resize() only sets style.maxHeight imperatively (no setState -> no infinite loop)
  useEffect(() => {
    resize();
  });

  return (
    <div ref={fatherRef}>
      <ExpandableContainer
        className={clsx('select-container', className)}
        value={model}
        onChange={(val, extra) => {
          setModel(val);
          onChange?.(val, extra);
        }}
        absolute={absolute}
        labelValue={labelValue}
        closeOnBlur={closeOnBlur}
        disabled={disabled}
        isError={isError}
        errorMessage={errorMessage}
        infoMessage={infoMessage}
        required={required}
        maxHeight={maxHeight}
        minWidth={minWidth}
        secondary={secondary}
        hideArrow={hideArrow}
        disableLabelAutoWidth={disableLabelAutoWidth}
        label={label}
        complement={complement}
        leadingComplement={leadingComplement}
        content={
          <div
            ref={contentRef}
            className="content-wrapper"
          >
            <div
              className={clsx('sc-content', 'transition-translate', {
                secondary,
                expanded: isExpanded,
                'has-max-height': !dontHaveMaxHeight,
              })}
            >
              {content || (
                <ul
                  role="list"
                  className={clsx('options-list', {
                    'p-xxs [&>*]:p-xs': !dontHaveMaxHeight,
                  })}
                >
                  {options}
                </ul>
              )}

              {actions && (
                <div className="sc-actions" tabIndex={0}>
                  {actions}
                </div>
              )}
            </div>
          </div>
        }
      >
        {children}
      </ExpandableContainer>
    </div>
  );
}
