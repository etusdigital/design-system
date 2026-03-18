import clsx from 'clsx';
import { useControllable } from '../../hooks';
import { Container } from './Container';
import type { ContainerModelExtra } from '../types/ContainerModelExtra';

export interface ExpandableContainerProps {
  value?: boolean;              // was modelValue
  defaultValue?: boolean;
  onChange?: (value: boolean, extra: ContainerModelExtra) => void;
  labelValue?: string;          // default: ''
  absolute?: boolean;           // default: true
  disabled?: boolean;           // default: false
  isError?: boolean;            // default: false
  errorMessage?: string;        // default: ''
  infoMessage?: string;         // default: ''
  required?: boolean;           // default: false
  closeOnBlur?: boolean;        // default: true
  alignRight?: boolean;         // default: false
  maxHeight?: string;           // default: '40px'
  minWidth?: string;            // default: 'unset'
  minWidthCard?: string;
  secondary?: boolean;          // default: false
  hideArrow?: boolean;          // default: false
  disableLabelAutoWidth?: boolean; // default: false
  children?: React.ReactNode;       // default slot
  complement?: React.ReactNode;     // complement slot
  label?: React.ReactNode;          // label slot
  card?: React.ReactNode;           // card slot (replaces <slot name="card">)
  content?: React.ReactNode;        // content slot inside card (replaces <slot name="content">)
  className?: string;
}

export function ExpandableContainer({
  value,
  defaultValue,
  onChange,
  labelValue = '',
  absolute = true,
  disabled = false,
  isError = false,
  errorMessage = '',
  infoMessage = '',
  required = false,
  closeOnBlur = true,
  alignRight = false,
  maxHeight = '40px',
  minWidth = 'unset',
  secondary = false,
  hideArrow = false,
  disableLabelAutoWidth = false,
  children,
  complement,
  label,
  card,
  content,
  className,
}: ExpandableContainerProps) {
  const [model, setModel] = useControllable<boolean>({
    value,
    defaultValue,
    onChange: (val) => onChange?.(val, { source: 'click' }),
  });

  const isExpanded = disabled ? false : (model ?? false);
  // absolute defaults to true so dropdowns float by default.
  // isAbsolute simply reflects the absolute prop — content is always rendered
  // (CSS visibility/opacity toggle) so transitions work regardless of expanded state.
  const isAbsolute = absolute;

  function changeModel(val: boolean, extra: ContainerModelExtra) {
    setModel(val);
    onChange?.(val, extra);
  }

  return (
    <Container
      className={clsx('expandable-container', className)}
      value={model}
      onChange={changeModel}
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
      renderContent={(contentMinWidth) => (
        <div
          className={clsx('text-xs top-full w-fit mt-xs', {
            'absolute z-[80]': isAbsolute,
            'left-0': !alignRight,
            'right-0': alignRight,
            'opacity-100 visible': isExpanded,
            'opacity-0 invisible pointer-events-none': !isExpanded,
          })}
          style={{
            minWidth: contentMinWidth,
            transition: 'opacity 150ms ease, visibility 150ms ease',
          }}
        >
          {card || (
            <div className="bg-neutral-surface-default shadow-neutral-selected border-xxs border-neutral-default rounded-sm">
              {content}
            </div>
          )}
        </div>
      )}
    >
      {children}
    </Container>
  );
}
