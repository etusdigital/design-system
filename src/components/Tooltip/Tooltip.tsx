import { useState, useRef, useEffect, useCallback, Children, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useTransition } from '../../hooks/useTransition';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  labelValue?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function TooltipLabel({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function Tooltip({
  labelValue = '',
  position = 'right',
  children,
  className,
  style,
}: TooltipProps) {
  let labelSlotContent: React.ReactNode = null;
  const triggerChildren: React.ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === TooltipLabel) {
      labelSlotContent = (child.props as Record<string, unknown>).children as React.ReactNode;
    } else {
      triggerChildren.push(child);
    }
  });

  const tooltipBody = labelSlotContent || labelValue;

  const [isHovering, setIsHovering] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { isMounted, isActive } = useTransition(isHovering, { duration: 500 });

  const calculatePosition = useCallback(
    (rect: DOMRect, el: HTMLElement) => {
      const padding = 4;
      if (position === 'left' || position === 'right') {
        const horizontalPosition =
          position === 'left'
            ? rect.left - el.offsetWidth - padding
            : rect.right + padding;
        el.style.left = `${Math.max(0, horizontalPosition)}px`;
        el.style.top = `${rect.top + rect.height / 2 - el.offsetHeight / 2}px`;
      } else {
        const verticalPosition =
          position === 'top' ? rect.top - el.offsetHeight : rect.bottom;
        el.style.top = `${Math.max(0, verticalPosition)}px`;
        el.style.left = `${rect.left + rect.width / 2 - el.offsetWidth / 2}px`;
      }
    },
    [position]
  );

  useEffect(() => {
    if (!isMounted || !contentRef.current || !tooltipRef.current) return;

    const rect = (
      contentRef.current.firstElementChild || contentRef.current
    ).getBoundingClientRect();
    calculatePosition(rect, tooltipRef.current);

    const tooltipEl = tooltipRef.current;
    const viewportWidth = window.innerWidth;
    const tooltipRect = tooltipEl.getBoundingClientRect();
    const tooltipContent = tooltipEl.querySelector(
      `.${styles.tooltipContent}`
    ) as HTMLElement;

    if (tooltipContent) {
      tooltipContent.style.maxWidth = 'none';
      tooltipContent.style.wordBreak = 'normal';
      tooltipContent.style.whiteSpace = 'normal';

      if (tooltipRect.left + tooltipRect.width > viewportWidth) {
        const triangleWidth = tooltipRect.width - tooltipContent.offsetWidth;
        tooltipContent.style.maxWidth = `${
          viewportWidth - tooltipRect.left - 4 - triangleWidth
        }px`;
        tooltipContent.style.wordBreak = 'break-all';
        tooltipContent.style.whiteSpace = 'wrap';
        calculatePosition(rect, tooltipEl);
      }
    }

    const closeHandler = () => setIsHovering(false);
    document.addEventListener('wheel', closeHandler);
    return () => document.removeEventListener('wheel', closeHandler);
  }, [isMounted, calculatePosition]);

  return (
    <div
      ref={contentRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={clsx('tooltip', className)}
      style={style}
    >
      {isMounted &&
        createPortal(
          <div
            ref={tooltipRef}
            className={clsx(
              styles.tooltip,
              styles[position],
              isActive && styles.active
            )}
          >
            <div className={styles.tooltipTriangle} />
            <div className={styles.tooltipContent}>{tooltipBody}</div>
          </div>,
          document.body
        )}
      {triggerChildren}
    </div>
  );
}

Tooltip.Label = TooltipLabel;
