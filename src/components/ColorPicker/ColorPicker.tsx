import { useState, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import {
  hexaToRgba,
  hsvaToRgba,
  hslaToRgba,
  rgbaToHsva,
  hwbToRgba,
  rgbaToHwb,
  rgbaToHexa,
  rgbaToHsla,
  getPosition,
  onEnterOrSpace,
} from '../../utils/index';
import styles from './ColorPicker.module.css';
import { Icon } from '../Icon/Icon';

export interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  showAlpha?: boolean;
  disabled?: boolean;
  noShadow?: boolean;
  className?: string;
}

type ColorType = 'hexa' | 'rgba' | 'hsla' | 'hsva' | 'hwb';

const COLOR_TYPES: ColorType[] = ['hexa', 'rgba', 'hsla', 'hsva', 'hwb'];

function divideColor(color: string, type = 'rgba', divideBy = ',') {
  if (!color) return {} as any;
  const colorObject: any = {};
  const typeArray = Array.from(type);
  const values = color.split(divideBy);
  typeArray.forEach((s, index) => {
    colorObject[s] =
      typeof values[index] === 'string'
        ? Number(values[index].replace('%', ''))
        : values[index] ?? 1;
  });
  return colorObject;
}

function divideCompleteColor(color: string, divideBy = ','): any {
  if (!color) return null;
  const colorObject: any = {};
  const dividedColor = color.split('(');
  if (dividedColor.length < 2) return null;
  const type = Array.from(dividedColor[0]);
  dividedColor[1] = dividedColor[1].replace(')', '');
  const values = dividedColor[1].split(divideBy);
  type.forEach((s, index) => {
    colorObject[s] =
      typeof values[index] === 'string'
        ? Number(values[index].replace('%', ''))
        : values[index] ?? 1;
  });
  return colorObject;
}

function buildColor(color: any): string {
  let colorString = '';
  let colorTypeName = '';
  const keys = Object.keys(color);
  keys.forEach((key, index) => {
    colorTypeName += key;
    colorString += keys.length - 1 === index ? color[key] : `${color[key]}, `;
  });
  return `${colorTypeName}(${colorString})`;
}

export function ColorPicker(props: ColorPickerProps) {
  const {
    value,
    onChange,
    showAlpha = true,
    disabled = false,
    noShadow = false,
    className,
  } = props;

  const [model, setModel] = useControllable<string>({
    value,
    defaultValue: '#ffffff',
    onChange,
  });

  const [colorTypeIndex, setColorTypeIndex] = useState<number>(0);
  const [inputColor, setInputColor] = useState<string>(() => model || '#ffffff');
  const [sliderColor, setSliderColor] = useState<string>('hsl(0, 100%, 50%)');
  const [sliderOpacity, setSliderOpacity] = useState<number>(1);
  const [circleBackground, setCircleBackground] = useState<string>(model || '');
  const [isMovingDown, setIsMovingDown] = useState(false);
  const [isMovingUp, setIsMovingUp] = useState(false);
  const [opacityTrackBg, setOpacityTrackBg] = useState<string>('linear-gradient(to right, var(--neutral-surface-default) 0%, hsl(0, 100%, 50%))');

  const isDraggingColorSlider = useRef(false);
  const isDraggingOpacitySlider = useRef(false);
  const isDraggingColorArea = useRef(false);

  const cursorColorSliderRef = useRef<HTMLSpanElement>(null);
  const cursorOpacitySliderRef = useRef<HTMLSpanElement>(null);
  const cursorColorAreaRef = useRef<HTMLSpanElement>(null);
  const colorAreaRef = useRef<HTMLCanvasElement>(null);
  const sliderColorDivRef = useRef<HTMLDivElement>(null);
  const sliderOpacityDivRef = useRef<HTMLDivElement>(null);

  const sliderColorRef = useRef(sliderColor);
  const sliderOpacityRef = useRef(sliderOpacity);
  const colorTypeIndexRef = useRef(colorTypeIndex);
  const hueRef = useRef(0);

  sliderColorRef.current = sliderColor;
  sliderOpacityRef.current = sliderOpacity;
  colorTypeIndexRef.current = colorTypeIndex;

  function getColor(color: any): string {
    const idx = colorTypeIndexRef.current;
    if (idx === 0) {
      return rgbaToHexa(color.r, color.g, color.b, color.a);
    } else if (idx === 1) {
      const hsla = rgbaToHsla(color.r, color.g, color.b, color.a);
      return `${hsla.h.toFixed(0)}, ${hsla.s}, ${hsla.l}, ${hsla.a < 1 ? hsla.a.toFixed(2) : hsla.a}`;
    } else if (idx === 2) {
      const hwb = rgbaToHwb(color.r, color.g, color.b, color.a);
      return `${hwb.h} ${hwb.w} ${hwb.b} / ${hwb.a < 1 ? hwb.a.toFixed(2) : hwb.a}`;
    } else if (idx === 3) {
      const hsva = rgbaToHsva(color.r, color.g, color.b, color.a);
      return `${hsva.h}, ${hsva.s}, ${hsva.v}, ${hsva.a < 1 ? hsva.a.toFixed(2) : hsva.a}`;
    }
    return `${color.r}, ${color.g}, ${color.b}, ${color.a < 1 ? color.a.toFixed(2) : color.a}`;
  }

  function getHsvaColor(currentInput: string, currentTypeIndex: number): any {
    if (currentTypeIndex === 0) {
      const rgba = hexaToRgba(currentInput);
      return rgbaToHsva(rgba.r, rgba.g, rgba.b, isNaN(rgba.a) ? 1 : rgba.a);
    } else if (currentTypeIndex === 1) {
      const hsla = divideColor(currentInput, 'hlsa');
      const rgba = hslaToRgba(hsla.h, hsla.s, hsla.l, hsla.a);
      return rgbaToHsva(rgba.r, rgba.g, rgba.b, isNaN(rgba.a) ? 1 : rgba.a);
    } else if (currentTypeIndex === 2) {
      const hwb = divideColor(currentInput, 'hwb', ' ');
      const dividedColor = currentInput.split('/');
      const rgba = hwbToRgba(hwb.h, hwb.w, hwb.b, Number(dividedColor[1]?.replace(')', '')));
      return rgbaToHsva(rgba.r, rgba.g, rgba.b, isNaN(rgba.a) ? 1 : rgba.a);
    } else if (currentTypeIndex === 3) {
      return divideColor(currentInput, 'hsva');
    }
    const rgba = divideColor(currentInput);
    return rgbaToHsva(rgba.r, rgba.g, rgba.b, isNaN(rgba.a) ? 1 : rgba.a);
  }

  function getPixelColor(element: Element, x: number): string {
    const canvas = document.createElement('canvas');
    canvas.width = element.clientWidth;
    canvas.height = element.clientHeight;
    const context = canvas.getContext('2d');
    if (!context) return 'hsl(0, 100%, 50%)';
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'hsl(0, 100%, 50%)');
    gradient.addColorStop(1 / 6, 'hsl(60, 100%, 50%)');
    gradient.addColorStop(2 / 6, 'hsl(120, 100%, 50%)');
    gradient.addColorStop(3 / 6, 'hsl(180, 100%, 50%)');
    gradient.addColorStop(4 / 6, 'hsl(240, 100%, 50%)');
    gradient.addColorStop(5 / 6, 'hsl(300, 100%, 50%)');
    gradient.addColorStop(1, 'hsl(360, 100%, 50%)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    const pixel = context.getImageData(x, 0, 1, 1).data;
    return `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
  }

  function changeCanvasColor(color = 'hsl(0, 100%, 50%)', opacity = 1) {
    const canvas = colorAreaRef.current;
    const context = canvas?.getContext('2d');
    if (!context || !canvas) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = opacity;
    const gradientBefore = context.createLinearGradient(0, 0, canvas.width, 0);
    gradientBefore.addColorStop(0, '#ffffff');
    gradientBefore.addColorStop(1, color);
    const gradientAfter = context.createLinearGradient(0, 0, 0, canvas.height);
    gradientAfter.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradientAfter.addColorStop(1, '#000000');
    context.fillStyle = gradientBefore;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = gradientAfter;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function calculateColorFromPosition(x: number, y: number): number[] {
    const canvas = colorAreaRef.current;
    if (!canvas) return [0, 0, 0, 255];
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const normalizedX = Math.max(0, Math.min(1, x / width));
    const normalizedY = Math.max(0, Math.min(1, y / height));
    const saturation = normalizedX * 100;
    const val = (1 - normalizedY) * 100;
    const rgba = hsvaToRgba(hueRef.current, saturation, val, sliderOpacityRef.current);
    return [Math.round(rgba.r), Math.round(rgba.g), Math.round(rgba.b), Math.round(rgba.a * 255)];
  }

  function getCursorPosition(event: MouseEvent | Touch, cursor: HTMLSpanElement, parent: Element, isArea = false) {
    const clamped = getPosition(
      event,
      cursor,
      parent,
      { top: true, left: true },
      { x: isArea ? 5 : 1, y: cursor.clientHeight },
      { x: isArea ? -5 : 0 }
    );
    return { left: clamped.x, top: clamped.y };
  }

  function updateColorFromPixel(pixel: number[], circleBg?: string) {
    let alpha = pixel[3] / 255;
    if (alpha >= 0.98) alpha = 1;
    if (alpha <= 0.02) alpha = 0;
    const newCircle = circleBg ?? `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${alpha})`;
    const newInput = getColor({ r: pixel[0], g: pixel[1], b: pixel[2], a: alpha });
    setCircleBackground(newCircle);
    setInputColor(newInput);
    setModel(newInput);
  }

  function updatedCircleColorFromArea() {
    const cursor = cursorColorAreaRef.current;
    const canvas = colorAreaRef.current;
    if (!cursor || !canvas) return;
    const left = Number(cursor.style.left.replace('px', '')) + 5;
    const top = Number(cursor.style.top.replace('px', ''));
    const pixel = calculateColorFromPosition(left, top);
    updateColorFromPixel(pixel);
  }

  const handleMouseMoveRef = useRef<(e: MouseEvent) => void>(() => {});
  const handleMouseUpRef = useRef<() => void>(() => {});
  const handleTouchMoveRef = useRef<(e: TouchEvent) => void>(() => {});
  const handleTouchEndRef = useRef<() => void>(() => {});

  useEffect(() => {
    handleMouseMoveRef.current = (event: MouseEvent) => {
      updateOpacitySlider(event);
      updateColorSlider(event);
      updateColorArea(event);
    };
    handleMouseUpRef.current = () => {
      isDraggingColorSlider.current = false;
      isDraggingOpacitySlider.current = false;
      isDraggingColorArea.current = false;
    };
    handleTouchMoveRef.current = (event: TouchEvent) => {
      if (event.touches[0]) {
        updateOpacitySlider(event.touches[0] as any);
        updateColorSlider(event.touches[0] as any);
        updateColorArea(event.touches[0] as any);
      }
    };
    handleTouchEndRef.current = () => {
      isDraggingColorSlider.current = false;
      isDraggingOpacitySlider.current = false;
      isDraggingColorArea.current = false;
    };
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMouseMoveRef.current(e);
    const handleMouseUp = () => handleMouseUpRef.current();
    const handleTouchMove = (e: TouchEvent) => handleTouchMoveRef.current(e);
    const handleTouchEnd = () => handleTouchEndRef.current();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    changeCanvasColor();
    const timer = setTimeout(() => {
      calculateCursor();
    }, 100);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function setOpacitySliderPosition(left: number) {
    const cursor = cursorOpacitySliderRef.current;
    const sliderDiv = sliderOpacityDivRef.current;
    if (!cursor || !sliderDiv) return;
    cursor.style.left = left + 'px';
    const opacityFull = sliderDiv.clientWidth - 10;
    let opacity = left / opacityFull;
    if (opacity >= 0.98) opacity = 1;
    if (opacity <= 0.02) opacity = 0;
    setSliderOpacity(opacity);
    sliderOpacityRef.current = opacity;
    changeCanvasColor(sliderColorRef.current, opacity);
    updatedCircleColorFromArea();
  }

  function setColorSliderPosition(left: number) {
    const cursor = cursorColorSliderRef.current;
    const sliderDiv = sliderColorDivRef.current;
    const sliderOpacityDiv = sliderOpacityDivRef.current;
    if (!cursor || !sliderDiv || !sliderOpacityDiv) return;
    cursor.style.left = left + 'px';
    const trackWidth = sliderDiv.clientWidth - 10;
    hueRef.current = trackWidth > 0 ? Math.round((left / trackWidth) * 360) : 0;
    const color = getPixelColor(sliderDiv, left);
    setSliderColor(color);
    sliderColorRef.current = color;
    const newBg = `linear-gradient(to right, var(--neutral-surface-default) 0%, ${color})`;
    setOpacityTrackBg(newBg);
    changeCanvasColor(color, sliderOpacityRef.current);
    updatedCircleColorFromArea();
  }

  function setColorAreaPosition(left: number, top: number) {
    const cursor = cursorColorAreaRef.current;
    if (!cursor) return;
    cursor.style.left = left + 'px';
    cursor.style.top = top + 'px';
    const pixel = calculateColorFromPosition(left + 5, top);
    updateColorFromPixel(pixel);
  }

  function updateOpacitySlider(event: MouseEvent | Touch) {
    if (!isDraggingOpacitySlider.current) return;
    const cursor = cursorOpacitySliderRef.current;
    const sliderDiv = sliderOpacityDivRef.current;
    if (!cursor || !sliderDiv) return;
    const clamped = getCursorPosition(event, cursor, sliderDiv);
    setOpacitySliderPosition(clamped.left);
  }

  function updateColorSlider(event: MouseEvent | Touch) {
    if (!isDraggingColorSlider.current) return;
    const cursor = cursorColorSliderRef.current;
    const sliderDiv = sliderColorDivRef.current;
    if (!cursor || !sliderDiv) return;
    const clamped = getCursorPosition(event, cursor, sliderDiv);
    setColorSliderPosition(clamped.left);
  }

  function updateColorArea(event: MouseEvent | Touch) {
    if (!isDraggingColorArea.current) return;
    const cursor = cursorColorAreaRef.current;
    const canvas = colorAreaRef.current;
    if (!cursor || !canvas) return;
    const clamped = getCursorPosition(event, cursor, canvas, true);
    setColorAreaPosition(clamped.left, clamped.top);
  }

  function findColorPosition(color: any) {
    const canvas = colorAreaRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const s = typeof color.s === 'string' ? Number(color.s.replace('%', '')) : (color.s ?? 0);
    const v = typeof color.v === 'string' ? Number(color.v.replace('%', '')) : (color.v ?? 0);
    const positionX = Math.max(-5, Math.min((s / 100) * (canvas.clientWidth - 5), canvas.clientWidth - 5));
    const positionY = Math.max(0, Math.min((1 - v / 100) * canvas.clientHeight, canvas.clientHeight));
    return { x: positionX, y: positionY };
  }

  const calculateCursor = useCallback(() => {
    const cursorSlider = cursorColorSliderRef.current;
    const cursorOpacity = cursorOpacitySliderRef.current;
    const cursorArea = cursorColorAreaRef.current;
    const sliderDiv = sliderColorDivRef.current;
    const sliderOpacityDiv = sliderOpacityDivRef.current;
    if (!cursorSlider || !cursorOpacity || !cursorArea || !sliderDiv || !sliderOpacityDiv) return;

    const currentInput = inputColor;
    const hsva = getHsvaColor(currentInput, colorTypeIndexRef.current);
    hueRef.current = hsva.h ?? 0;
    const colorPercentage = Math.min(1, (hsva.h ?? 0) / 360);
    const colorLeft = Math.min(
      sliderDiv.clientWidth - 10,
      Math.max(0, (sliderDiv.clientWidth - 10) * colorPercentage)
    );
    const opacityFull = sliderOpacityDiv.clientWidth - 10;
    const opacityLeft = Math.min(opacityFull, Math.max(0, opacityFull * (hsva.a ?? 1)));
    const opacity = opacityFull > 0 ? opacityLeft / opacityFull : 1;

    setSliderOpacity(opacity);
    sliderOpacityRef.current = opacity;
    cursorSlider.style.left = colorLeft + 'px';
    cursorOpacity.style.left = opacityLeft + 'px';

    const color = getPixelColor(sliderDiv, colorLeft);
    setSliderColor(color);
    sliderColorRef.current = color;
    const newBg = `linear-gradient(to right, var(--neutral-surface-default) 0%, ${color})`;
    setOpacityTrackBg(newBg);
    changeCanvasColor(color, opacity);

    const s = typeof hsva.s === 'string' ? Number(hsva.s.replace('%', '')) : (hsva.s ?? 0);
    const v = typeof hsva.v === 'string' ? Number(hsva.v.replace('%', '')) : (hsva.v ?? 0);
    const rgba = hsvaToRgba(hsva.h ?? 0, s, v, hsva.a ?? 1);
    setCircleBackground(buildColor(rgba));

    const colorPosition = findColorPosition(hsva);
    cursorArea.style.left = colorPosition.x + 'px';
    cursorArea.style.top = colorPosition.y + 'px';
  }, [inputColor]);

  function moveDown() {
    setIsMovingDown(true);
    setTimeout(() => {
      setIsMovingDown(false);
      setColorTypeIndex((prev) => {
        const next = prev + 1 > COLOR_TYPES.length - 1 ? 0 : prev + 1;
        moveToType(next);
        return next;
      });
    }, 600);
  }

  function moveUp() {
    setIsMovingUp(true);
    setTimeout(() => {
      setIsMovingUp(false);
      setColorTypeIndex((prev) => {
        const next = prev - 1 < 0 ? COLOR_TYPES.length - 1 : prev - 1;
        moveToType(next);
        return next;
      });
    }, 600);
  }

  function moveToType(newTypeIndex: number) {
    colorTypeIndexRef.current = newTypeIndex;
    const parsed = divideCompleteColor(circleBackground);
    if (!parsed) return;
    const newInput = getColor(parsed);
    setInputColor(newInput);
    setModel(newInput);
  }

  function onSliderCursorKeyDown(
    event: React.KeyboardEvent<HTMLSpanElement>,
    cursor: HTMLSpanElement | null,
    setPosition: (left: number) => void
  ) {
    if (disabled || !cursor) return;

    let direction = 0;
    if (event.key === 'ArrowRight') direction = 1;
    else if (event.key === 'ArrowLeft') direction = -1;
    else return;

    const slider = cursor.closest('.slider');
    if (!slider) return;

    event.preventDefault();
    const max = slider.clientWidth - (cursor.clientWidth - 1);
    const left = getStylePixels(cursor.style.left) + (direction * max) / 100;
    setPosition(Math.min(max, Math.max(0, left)));
  }

  function onAreaCursorKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
    const cursor = cursorColorAreaRef.current;
    const area = colorAreaRef.current;
    if (disabled || !cursor || !area) return;

    const directions: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    const direction = directions[event.key];
    if (!direction) return;

    event.preventDefault();
    const minX = -5;
    const maxX = area.clientWidth - (cursor.clientWidth - 5);
    const maxY = area.clientHeight;
    const left = getStylePixels(cursor.style.left) + (direction[0] * (maxX - minX)) / 100;
    const top = getStylePixels(cursor.style.top) + (direction[1] * maxY) / 100;
    setColorAreaPosition(Math.min(maxX, Math.max(minX, left)), Math.min(maxY, Math.max(0, top)));
  }

  function getStylePixels(value: string) {
    return Number(value.replace('px', '')) || 0;
  }

  const currentTypeName = COLOR_TYPES[colorTypeIndex];
  const nextTypeName = COLOR_TYPES[colorTypeIndex + 1 > COLOR_TYPES.length - 1 ? 0 : colorTypeIndex + 1];
  const prevTypeName = COLOR_TYPES[colorTypeIndex - 1 < 0 ? COLOR_TYPES.length - 1 : colorTypeIndex - 1];

  return (
    <div
      className={clsx(styles.colorPicker, 'color-picker', noShadow && styles.noShadow, disabled && styles.disabled, className)}
      data-component="ColorPicker"
    >
      <div className={styles.colorAreaWrapper}>
        <span
          ref={cursorColorAreaRef}
          className={styles.colorAreaCursor}
          style={{ left: '-5px', top: '0px' }}
          tabIndex={disabled ? -1 : 0}
          onMouseDown={(e) => {
            if (disabled) return;
            isDraggingColorArea.current = true;
            updateColorArea(e as any);
          }}
          onTouchStart={(e) => {
            if (disabled) return;
            isDraggingColorArea.current = true;
            updateColorArea(e.touches[0] as any);
          }}
          onKeyDown={onAreaCursorKeyDown}
        />
        <canvas
          ref={colorAreaRef}
          className={styles.colorArea}
          onMouseDown={(e) => {
            if (disabled) return;
            isDraggingColorArea.current = true;
            updateColorArea(e as any);
          }}
          onTouchStart={(e) => {
            if (disabled) return;
            isDraggingColorArea.current = true;
            updateColorArea(e.touches[0] as any);
          }}
        />
      </div>

      <div className="flex items-center gap-sm">
        <div
          className={styles.colorCircle}
          style={{ background: circleBackground }}
        />

        <div className="flex flex-col gap-xs w-full">
          <div
            ref={sliderColorDivRef}
            className={clsx(styles.sliderTrack, styles.hueTrack, 'slider')}
            onMouseDown={(e) => {
              if (disabled) return;
              isDraggingColorSlider.current = true;
              updateColorSlider(e as any);
            }}
            onTouchStart={(e) => {
              if (disabled) return;
              isDraggingColorSlider.current = true;
              updateColorSlider(e.touches[0] as any);
            }}
          >
            <span
              ref={cursorColorSliderRef}
              className={clsx(styles.sliderCursor)}
              style={{ left: '0px' }}
              tabIndex={disabled ? -1 : 0}
              onMouseDown={(e) => {
                e.stopPropagation();
                if (disabled) return;
                isDraggingColorSlider.current = true;
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                if (disabled) return;
                isDraggingColorSlider.current = true;
              }}
              onKeyDown={(e) => onSliderCursorKeyDown(e, cursorColorSliderRef.current, setColorSliderPosition)}
            />
          </div>

          {showAlpha && (
            <div
              ref={sliderOpacityDivRef}
              className={clsx(styles.sliderTrack, styles.opacityTrack, 'slider')}
              style={{ background: opacityTrackBg }}
              onMouseDown={(e) => {
                if (disabled) return;
                isDraggingOpacitySlider.current = true;
                updateOpacitySlider(e as any);
              }}
              onTouchStart={(e) => {
                if (disabled) return;
                isDraggingOpacitySlider.current = true;
                updateOpacitySlider(e.touches[0] as any);
              }}
            >
              <span
                ref={cursorOpacitySliderRef}
                className={clsx(styles.sliderCursor)}
                style={{ left: '0px' }}
                tabIndex={disabled ? -1 : 0}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  if (disabled) return;
                  isDraggingOpacitySlider.current = true;
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  if (disabled) return;
                  isDraggingOpacitySlider.current = true;
                }}
                onKeyDown={(e) => onSliderCursorKeyDown(e, cursorOpacitySliderRef.current, setOpacitySliderPosition)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-sm">
        <input
          type="text"
          className={clsx(styles.colorInput, 'flex-1')}
          value={inputColor}
          onChange={(e) => {
            setInputColor(e.target.value);
            setModel(e.target.value);
            setTimeout(() => calculateCursor(), 0);
          }}
          disabled={disabled}
        />

        <div className="flex items-center gap-xxs">
          <div className="flex flex-col items-center overflow-hidden relative h-lg w-fit text-neutral-interaction-default">
            {isMovingDown && (
              <p className="font-bold" style={{ animation: 'slide-down 0.6s ease' }}>
                {nextTypeName.toUpperCase()}
              </p>
            )}
            <p
              className="font-bold"
              style={{
                animation: isMovingDown ? 'slide-down 0.6s ease' : isMovingUp ? 'slide-up 0.6s ease' : undefined,
              }}
            >
              {currentTypeName.toUpperCase()}
            </p>
            {isMovingUp && (
              <p className="font-bold" style={{ animation: 'slide-up 0.6s ease' }}>
                {prevTypeName.toUpperCase()}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <Icon
              name="arrow_drop_up"
              className={clsx(styles.colorArrows, disabled && styles.disabled)}
              tabIndex={disabled ? -1 : 0}
              onClick={moveUp}
              onKeyUp={onEnterOrSpace(moveUp)}
              aria-label="Previous color format"
            />
            <Icon
              name="arrow_drop_down"
              className={clsx(styles.colorArrows, disabled && styles.disabled)}
              tabIndex={disabled ? -1 : 0}
              onClick={moveDown}
              onKeyUp={onEnterOrSpace(moveDown)}
              aria-label="Next color format"
            />
          </div>
        </div>
      </div>

      <div className={styles.typeToggles}>
        {COLOR_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className={clsx(styles.typeToggle, type === currentTypeName && styles.active)}
            onClick={() => {
              if (disabled) return;
              const newIndex = COLOR_TYPES.indexOf(type);
              setColorTypeIndex(newIndex);
              colorTypeIndexRef.current = newIndex;
              moveToType(newIndex);
            }}
            disabled={disabled}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

export type { ColorType };
