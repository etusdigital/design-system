import { useRef } from 'react';
import clsx from 'clsx';
import { Overlay } from '../../utils/components/Overlay';
import { useControllable } from '../../hooks/useControllable';
import { useTransition } from '../../hooks/useTransition';
import { useModalFocus } from '../../hooks/useModalFocus';
import { trapFocus } from '../../utils';
import './Drawer.css';

export interface DrawerProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  position?: 'right' | 'left' | 'top' | 'bottom';
  size?: string;
  noOutsideClose?: boolean;
  zIndex?: number;
  children?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export function Drawer({
  value,
  onChange,
  position = 'right',
  size = 'fit-content',
  noOutsideClose = false,
  zIndex = 1002,
  children,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}: DrawerProps) {
  const [isOpen, setOpen] = useControllable<boolean>({ value, defaultValue: false, onChange });
  const { isMounted, isActive } = useTransition(isOpen ?? false, { duration: 500 });
  const drawerRef = useRef<HTMLDivElement>(null);

  useModalFocus(drawerRef, isOpen ?? false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectivePosition = isMobile ? 'bottom' : position;
  const effectiveWidth = isMobile ? '100%' : size;

  function getStyle() {
    if (position == 'top'|| position == 'bottom') return {
      height: size,
      maxHeight: 'calc(100% - var(--spacing-xl))',
    }

    return {
      width: effectiveWidth,
      maxWidth: 'calc(100% - var(--spacing-xl))',
    }
  }

  function handleOverlayClick() {
    if (noOutsideClose) {
      drawerRef.current?.classList.add('no-outside-close-warning');
      setTimeout(() => {
        drawerRef.current?.classList.remove('no-outside-close-warning');
      }, 100);
    } else {
      setOpen(false);
    }
  }

  function handleEscape(e: React.KeyboardEvent<HTMLDivElement>) {
    if (noOutsideClose) return;
    if (e.key !== 'Escape') return;

    e.stopPropagation();
    setOpen(false);
  }

  return (
    <Overlay value={isOpen} zIndex={zIndex} onClick={handleOverlayClick}>
      {isMounted && (
        <div
          ref={drawerRef}
          className={clsx('drawer', effectivePosition, isActive && 'active', className)}
          style={{ ...getStyle(), zIndex }}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          onKeyDown={(e) => {
            handleEscape(e);
            trapFocus(e, drawerRef.current);
          }}
        >
          {children}
        </div>
      )}
    </Overlay>
  );
}
