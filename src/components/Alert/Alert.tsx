import { useState, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon/Icon';
import styles from './Alert.module.css';

export interface AlertProps {
  title?: string;
  message?: string;
  type?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  expandable?: boolean;
  closable?: boolean;
  hideIcon?: boolean;
  iconPosition?: 'start' | 'center' | 'end';
  children?: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

function getTypeIcon(type: string): string {
  switch (type) {
    case 'info':
    case 'neutral':
      return 'info';
    case 'warning':
    case 'danger':
      return 'error';
    case 'success':
      return 'check_circle';
    default:
      return 'info';
  }
}

export function Alert({
  title,
  message = '',
  type = 'info',
  size = 'medium',
  icon = '',
  expandable = false,
  closable = false,
  hideIcon = false,
  iconPosition = 'start',
  children,
  actions,
  onClose,
  className,
}: AlertProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const resize = useCallback(() => {
    if (!contentRef.current || !cardRef.current) return;

    const cardStyles = getComputedStyle(cardRef.current);
    const paddingTop = parseInt(cardStyles.paddingTop);
    const paddingBottom = parseInt(cardStyles.paddingBottom);
    cardRef.current.style.height = `${
      contentRef.current.scrollHeight + paddingTop + paddingBottom
    }px`;
    contentRef.current.style.width = 'fit-content';
    const maxWidth = contentRef.current.offsetWidth;

    if (
      cardRef.current.style.width ||
      cardRef.current.offsetWidth !== maxWidth
    ) {
      contentRef.current.style.width = '100%';
    } else {
      contentRef.current.style.width = `${maxWidth}px`;
    }
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(resize);
    if (cardRef.current) observer.observe(cardRef.current, { box: 'border-box' });
    if (contentRef.current) observer.observe(contentRef.current, { box: 'border-box' });
    return () => observer.disconnect();
  }, [resize]);

  // Re-run resize on every render (replaces Vue onUpdated)
  useEffect(() => {
    resize();
  });

  const typeIcon = icon || getTypeIcon(type);

  return (
    <div
      ref={cardRef}
      className={clsx(
        styles.alert,
        'alert',
        styles[type],
        styles[size],
        expandable && styles.itemsStart,
        (!expandable || !isExpanded) && styles.itemsCenter,
        className
      )}
    >
      <div
        ref={contentRef}
        className={clsx(styles.contentWrapper, styles[`items-${iconPosition}`])}
      >
        {!hideIcon && (
          <div className={styles.typeIcon}>
            <Icon name={typeIcon} />
          </div>
        )}
        <div className={styles.body}>
          {children || (
            <div className={styles.textContent}>
              {title && <h6 className={styles.title}>{title}</h6>}
              {(!expandable || isExpanded) && message && (
                <p className={styles.message}>{message}</p>
              )}
            </div>
          )}
        </div>
      </div>
      {actions || (
        <div className={clsx(styles.typeIcon, styles.actionIcon)}>
          {expandable && (
            <div
              className={clsx(
                styles.expandToggle,
                isExpanded && styles.rotated
              )}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name="expand_more" />
            </div>
          )}
          {closable && (
            <Icon name="close" onClick={onClose} className={styles.clickable} />
          )}
        </div>
      )}
    </div>
  );
}

Alert.Actions = function AlertActions({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <>{children}</>;
};
