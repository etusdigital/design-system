import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { onEnterOrSpace } from '../../utils/index';
import { useTransition } from '../../hooks/useTransition';
import styles from './Image.module.css';

export interface ImageProps {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  icon?: string;
  preview?: boolean;
  className?: string;
  onShow?: () => void;
  onHide?: () => void;
}

export function Image({
  src,
  alt,
  width,
  height,
  icon = 'visibility',
  preview = false,
  className,
  onShow,
  onHide,
}: ImageProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);

  const { isMounted, isActive } = useTransition(isPreviewOpen, { duration: 150 });

  const triggerRef = useRef<HTMLSpanElement>(null);

  const imageStyle: React.CSSProperties = {};
  if (width) {
    imageStyle.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height) {
    imageStyle.height = typeof height === 'number' ? `${height}px` : height;
  }

  const previewImageStyle: React.CSSProperties = {
    transform: `rotate(${rotate}deg) scale(${scale})`,
    transition: 'transform 0.15s',
  };

  function showPreview() {
    setIsPreviewOpen(true);
    document.body.style.overflow = 'hidden';
    onShow?.();
  }

  function hidePreview() {
    setIsPreviewOpen(false);
    document.body.style.overflow = '';
    setRotate(0);
    setScale(1);
    triggerRef.current?.focus({ preventScroll: true });
    onHide?.();
  }

  function rotateLeft() {
    setRotate((r) => r - 90);
  }

  function rotateRight() {
    setRotate((r) => r + 90);
  }

  function zoomIn() {
    setScale((s) => Math.min(s + 0.1, 1.5));
  }

  function zoomOut() {
    setScale((s) => Math.max(s - 0.1, 0.5));
  }


  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const tools = [
    {
      icon: 'rotate_left',
      label: 'Rotate Left',
      disabled: false,
      onClick: rotateLeft,
    },
    {
      icon: 'rotate_right',
      label: 'Rotate Right',
      disabled: false,
      onClick: rotateRight,
    },
    {
      icon: 'zoom_out',
      label: 'Zoom Out',
      disabled: scale <= 0.5,
      onClick: zoomOut,
    },
    {
      icon: 'zoom_in',
      label: 'Zoom In',
      disabled: scale >= 1.5,
      onClick: zoomIn,
    },
    {
      icon: 'close',
      label: 'Close',
      disabled: false,
      onClick: hidePreview,
    },
  ];

  const backdropRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPreviewOpen && isMounted) toolbarRef.current?.focus({ preventScroll: true });
  }, [isPreviewOpen, isMounted]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === backdropRef.current) {
      hidePreview();
    }
  }

  function handlePreviewEscape(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'Escape') return;
    e.stopPropagation();
    hidePreview();
  }

  return (
    <span
      ref={triggerRef}
      tabIndex={preview ? 0 : -1}
      className={clsx(styles.image, 'image', className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onKeyUp={preview ? onEnterOrSpace(showPreview) : undefined}
    >
      <img src={src} alt={alt} style={imageStyle} className={styles.imageContent} />

      {preview && (
        <div
          className={clsx(styles.imagePreviewOverlay, isHovering && styles.imagePreviewOverlayVisible)}
          onClick={showPreview}
        >
          <div className={styles.imagePreviewOverlayContent}>
            <Icon name={icon} />
          </div>
        </div>
      )}

      {isMounted &&
        createPortal(
          <div
            ref={backdropRef}
            className={clsx(styles.backdrop, isActive && styles.backdropActive)}
            onClick={handleBackdropClick}
          >
            <div
              className={clsx(
                styles.previewModal,
                styles.imagePreviewContainer,
                isActive && styles.previewImageActive
              )}
              tabIndex={-1}
              onKeyDown={handlePreviewEscape}
            >
              <img
                src={src}
                alt={alt}
                style={previewImageStyle}
                className={styles.imagePreview}
              />
            </div>

            <div
              className={clsx(
                styles.previewModal,
                styles.imagePreviewToolbar,
                isActive && styles.toolbarActive
              )}
              ref={toolbarRef}
              role="dialog"
              aria-modal
              tabIndex={-1}
              onKeyDown={handlePreviewEscape}
            >
              {tools.map((tool) => (
                <Button
                  key={tool.icon}
                  icon={tool.icon}
                  aria-label={tool.label}
                  disabled={tool.disabled}
                  className={styles.tool}
                  color="neutral"
                  variant="plain"
                  size="small"
                  round
                  onClick={tool.onClick}
                />
              ))}
            </div>
          </div>,
          document.body
        )}
    </span>
  );
}
