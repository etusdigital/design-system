import { useRef, useState, useEffect, useCallback, useId } from 'react';
import { getPosition } from '../../utils';
import { Icon } from '../Icon';
import { Slider } from '../Slider';
import styles from './Crop.module.css';

interface CropProps {
  src?: string;
  value?: string;
  onChange?: (croppedDataUrl: string) => void;
  width?: string;
  height?: string;
  className?: string;
}

export function Crop({
  src,
  onChange,
  width = '360px',
  height = '200px',
  className,
}: CropProps) {
  const maskId = useId();
  const bCropRef = useRef<HTMLDivElement>(null);
  const cropAreaRef = useRef<HTMLDivElement>(null);
  const selectedAreaRef = useRef<SVGRectElement>(null);
  const isDraggingRef = useRef(false);
  const parsedImgRef = useRef(new Image());
  const imgRef = useRef(new Image());

  const [zoom, setZoom] = useState(0);
  const [svgDims, setSvgDims] = useState({ width: 0, height: 0 });
  const [parsedImgSrc, setParsedImgSrc] = useState('');

  const resize = useCallback(() => {
    if (!bCropRef.current) return;
    setSvgDims({
      width: bCropRef.current.clientWidth ? bCropRef.current.clientWidth + 10 : 0,
      height: bCropRef.current.clientHeight ? bCropRef.current.clientHeight + 10 : 0,
    });
  }, []);

  const crop = useCallback((cropArea: HTMLDivElement, parent: HTMLElement) => {
    const rect = cropArea.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = rect.width;
    canvas.height = rect.height;

    const parentRect = parent.getBoundingClientRect();
    const cropLeft = rect.left - parentRect.left;
    const cropTop = rect.top - parentRect.top;

    ctx.drawImage(
      parsedImgRef.current,
      cropLeft,
      cropTop,
      rect.width,
      rect.height,
      0,
      0,
      rect.width,
      rect.height
    );

    const croppedImage = canvas.toDataURL('image/png');
    onChange?.(croppedImage);
  }, [onChange]);

  const updateCropArea = useCallback((event: any) => {
    if (
      !cropAreaRef.current ||
      !cropAreaRef.current.parentElement ||
      !selectedAreaRef.current ||
      !isDraggingRef.current
    )
      return;

    const clamped = getPosition(
      event,
      cropAreaRef.current,
      cropAreaRef.current.parentElement,
      { left: true, top: true },
      { x: -1, y: -3 }
    );
    cropAreaRef.current.style.top = `${clamped.y}px`;
    cropAreaRef.current.style.left = `${clamped.x}px`;
    selectedAreaRef.current.setAttribute('x', clamped.x.toString());
    selectedAreaRef.current.setAttribute('y', clamped.y.toString());

    crop(cropAreaRef.current, cropAreaRef.current.parentElement);
  }, [crop]);

  const changeZoom = useCallback((zoomVal: number) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!cropAreaRef.current || !cropAreaRef.current.parentElement || !ctx) return;

    const img = imgRef.current;
    const parsedZoom = zoomVal + 1;

    const parentRect = cropAreaRef.current.parentElement.getBoundingClientRect();
    const rect = cropAreaRef.current.getBoundingClientRect();
    canvas.width = parentRect.width;
    canvas.height = parentRect.height;

    const sourceX = (parentRect.width - img.width) / 2;
    const sourceY = (parentRect.height - img.height) / 2;

    ctx.drawImage(img, sourceX, sourceY);
    const zoomX = rect.left + rect.width / 2 - parentRect.left;
    const zoomY = rect.top + rect.height / 2 - parentRect.top;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(zoomX, zoomY);
    ctx.scale(parsedZoom, parsedZoom);
    ctx.translate(-zoomX, -zoomY);
    ctx.drawImage(img, sourceX, sourceY);
    ctx.restore();

    const croppedImage = canvas.toDataURL('image/png');
    const newImg = new Image();
    newImg.src = croppedImage;
    newImg.onload = () => {
      parsedImgRef.current = newImg;
      setParsedImgSrc(croppedImage);
      if (cropAreaRef.current && cropAreaRef.current.parentElement) {
        crop(cropAreaRef.current, cropAreaRef.current.parentElement);
      }
    };
  }, [crop]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => updateCropArea(e);
    const handleMouseUp = () => { isDraggingRef.current = false; };
    const handleTouchMove = (e: TouchEvent) => updateCropArea(e.touches[0]);
    const handleTouchEnd = () => { isDraggingRef.current = false; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    let resizeObserver: ResizeObserver | undefined;
    if (bCropRef.current) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(bCropRef.current, { box: 'border-box' });
    }

    if (src) {
      imgRef.current.src = src;
      imgRef.current.onload = () => {
        setParsedImgSrc(src);
        parsedImgRef.current = imgRef.current;
        changeZoom(0);
      };
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      resizeObserver?.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function startDragging(event: React.MouseEvent) {
    isDraggingRef.current = true;
    updateCropArea(event.nativeEvent);
  }

  function startDraggingTouch(event: React.TouchEvent) {
    isDraggingRef.current = true;
    updateCropArea(event.touches[0]);
  }

  function handleZoomChange(val: number | [number, number]) {
    const v = typeof val === 'number' ? val : val[0];
    setZoom(v);
    changeZoom(v);
  }

  const computedBorderRadius = (() => {
    if (bCropRef.current) {
      return getComputedStyle(bCropRef.current).getPropertyValue('--border-radius-xl') || '16px';
    }
    return '16px';
  })();

  return (
    <div ref={bCropRef} className={`${styles.crop} crop${className ? ` ${className}` : ''}`}>
      <div
        className="relative w-full h-full bg-black rounded-xl"
        style={{ minWidth: width, minHeight: height }}
      >
        <div className={styles.cropImg} onClick={startDragging}>
          <svg
            className="absolute z-[1]"
            width={`${svgDims.width || 0}px`}
            height={`${svgDims.height || 0}px`}
            viewBox={`0 0 ${svgDims.width || 0} ${svgDims.height || 0}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id={maskId}>
                <rect width="100%" height="100%" fill="white" />
                <rect
                  ref={selectedAreaRef}
                  x="0"
                  y="0"
                  width={width}
                  height={height}
                  rx={computedBorderRadius}
                  ry={computedBorderRadius}
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="rgba(255, 255, 255, 0.7)"
              mask={`url(#${maskId})`}
            />
          </svg>
          {parsedImgSrc && <img src={parsedImgSrc} alt="model value" />}
          {src && <img src={src} style={{ position: 'relative', visibility: 'hidden' }} alt="" />}
        </div>
        <div
          ref={cropAreaRef}
          className={styles.cropArea}
          style={{ width, height }}
          onMouseDown={startDragging}
          onTouchStart={startDraggingTouch}
        />
      </div>
      <footer className={styles.footer}>
        <Icon name="zoom_out" className="select-none leading-xxs" />
        <Slider
          value={zoom}
          onChange={handleZoomChange}
          size="small"
          max={2}
        />
        <Icon name="zoom_in" className="select-none leading-xxs" />
      </footer>
    </div>
  );
}
