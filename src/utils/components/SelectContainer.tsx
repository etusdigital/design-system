import { useEffect, useRef, useId } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks';
import { ExpandableContainer } from './ExpandableContainer';
import type { ContainerModelExtra } from '../types/ContainerModelExtra';
import '../styles/SelectContainer.css';

export interface SelectContainerProps {
  value?: boolean;
  onChange?: (value: boolean, extra: ContainerModelExtra) => void;
  labelValue?: string;
  popupRole?: 'listbox' | 'menu' | 'dialog';
  ariaMultiselectable?: boolean;
  ariaLabel?: string;
  absolute?: boolean;
  disabled?: boolean;
  isError?: boolean;
  errorMessage?: string;
  infoMessage?: string;
  required?: boolean;
  closeOnBlur?: boolean;
  dontHaveMaxHeight?: boolean;
  maxHeight?: string;
  minWidth?: string;
  secondary?: boolean;
  hideArrow?: boolean;
  icon?: string;
  children?: React.ReactNode;
  complement?: React.ReactNode;
  leadingComplement?: React.ReactNode;
  label?: React.ReactNode;
  content?: React.ReactNode;
  options?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export function SelectContainer({
  value,
  onChange,
  labelValue = '',
  absolute = false,
  popupRole = 'listbox',
  ariaMultiselectable,
  ariaLabel,
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
  icon,
  children,
  complement,
  leadingComplement,
  label,
  content,
  options,
  actions,
  className,
  onKeyDown,
}: SelectContainerProps) {
  const [model, setModel] = useControllable<boolean>({
    value,
  });

  const isExpanded = disabled ? false : (model ?? false);

  const isExpandedRef = useRef(isExpanded);
  isExpandedRef.current = isExpanded;

  const popupId = useId();
  const fatherRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function resize() {
    if (!contentRef.current) return;
    contentRef.current.style.maxHeight = isExpandedRef.current
      ? `${contentRef.current.scrollHeight + 1}px`
      : '0px';
  }

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
        popupRole={popupRole}
        popupId={popupRole === 'listbox' ? popupId : undefined}
        ariaLabel={ariaLabel}
        label={label}
        complement={complement}
        leadingComplement={leadingComplement}
        icon={icon}
        onKeyDown={onKeyDown}
        content={
          <div
            ref={contentRef}
            className="content-wrapper"
          >
            <div
              id={content ? popupId : undefined}
              className={clsx('sc-content', 'transition-translate', {
                secondary,
                expanded: isExpanded,
                'has-max-height': !dontHaveMaxHeight,
              })}
            >
              {content || (
                <ul
                  id={popupId}
                  role={popupRole === 'listbox' ? 'listbox' : 'none'}
                  aria-label={popupRole === 'listbox' ? labelValue || ariaLabel : undefined}
                  aria-multiselectable={popupRole === 'listbox' ? ariaMultiselectable : undefined}
                  className={clsx('options-list', {
                    'p-xxs [&>*]:p-xs': !dontHaveMaxHeight,
                  })}
                >
                  {options}
                </ul>
              )}

              {actions && (
                <div className="sc-actions">
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
