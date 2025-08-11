import { ref, shallowRef, computed, watch, nextTick, type Ref } from "vue";
import { useThrottleFn, useRafFn } from "@vueuse/core";
import type {
  ColorType,
  RgbaColor,
  HsvaColor,
  GenericColor,
  HslaColor,
  HwbColor,
  Position,
  PositionEvent,
  BColorPickerProps,
  ColorContrastInfo,
  ColorSpaceUtils,
  PresetColor,
  ColorValidationResult
} from "#components/BColorPicker/BColorPicker.types";
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
} from "#utils/index";

// Performance optimization: Shared cache across all instances
const globalColorCache = new Map<string, any>();
const MAX_CACHE_SIZE = 200;

/**
 * Optimized memoization function with LRU-style cache management
 */
function memoizeColorConversion<T>(fn: () => T, cacheKey: string): T {
  if (globalColorCache.has(cacheKey)) {
    // Move to end (LRU)
    const value = globalColorCache.get(cacheKey);
    globalColorCache.delete(cacheKey);
    globalColorCache.set(cacheKey, value);
    return value;
  }
  
  const result = fn();
  
  // Prevent memory leaks with LRU eviction
  if (globalColorCache.size >= MAX_CACHE_SIZE) {
    const firstKey = globalColorCache.keys().next().value;
    globalColorCache.delete(firstKey);
  }
  
  globalColorCache.set(cacheKey, result);
  return result;
}

export function useColorPicker(props: BColorPickerProps, emit: any) {
  // Reactive state with performance optimizations
  const isDraggingColorSlider = ref(false);
  const isDraggingOpacitySlider = ref(false);
  const isDraggingColorArea = ref(false);
  const isMovingDown = ref(false);
  const isMovingUp = ref(false);

  // DOM refs
  const cursorColorSlider = ref<HTMLSpanElement>();
  const cursorOpacitySlider = ref<HTMLSpanElement>();
  const cursorColorArea = ref<HTMLSpanElement>();
  const colorArea = ref<HTMLCanvasElement>();

  // Performance: Use shallowRef for frequently updated values
  const circleBackground = shallowRef(props.modelValue || "rgba(255, 255, 255, 1)");
  const sliderColor = shallowRef("hsl(0, 100%, 50%)");
  const sliderOpacity = shallowRef(1);
  const inputColor = shallowRef(props.modelValue || getWhite(props.type));

  // Canvas optimization: Cache context and minimize redraws
  const canvasContext = shallowRef<CanvasRenderingContext2D | null>(null);
  let lastCanvasColor = "";
  let lastCanvasOpacity = -1;
  let lastCanvasSize = { width: 0, height: 0 };

  // Color types and format management
  const colorTypes = ref<ColorType[]>(["hexa", "hsla", "hwb", "hsva", "rgba"]);
  const colorType = ref(
    colorTypes.value.findIndex((x) => x === props.type) !== -1
      ? colorTypes.value.findIndex((x) => x === props.type)
      : 0
  );

  // Performance: Debounced/throttled operations
  const THROTTLE_INTERVAL = 16; // ~60fps
  
  function getWhite(type?: ColorType): string {
    if (type === "hexa") return "#ffffffff";
    else if (type === "hsla") return "0, 100%, 0%, 1";
    else if (type === "hwb") return "0 100% 0% / 1";
    else if (type === "hsva") return "0, 0%, 100%, 1";
    return "255, 255, 255, 1";
  }

  // Color space utilities with optimized caching
  const colorSpaceUtils: ColorSpaceUtils = {
    toAccessibleDescription(color: RgbaColor, format: ColorType): string {
      const cacheKey = `desc_${color.r}_${color.g}_${color.b}_${color.a}_${format}`;
      return memoizeColorConversion(() => {
        const colorName = this.getReadableColorName(color);
        switch (format) {
          case 'hexa':
            return `${colorName}, hex value ${rgbaToHexa(color.r, color.g, color.b, color.a)}`;
          case 'hsla':
            const hsla = rgbaToHsla(color.r, color.g, color.b, color.a);
            return `${colorName}, hue ${Math.round(hsla.h)}, saturation ${typeof hsla.s === 'string' ? hsla.s : Math.round(hsla.s)}, lightness ${typeof hsla.l === 'string' ? hsla.l : Math.round(hsla.l)}, alpha ${Math.round(color.a * 100)}%`;
          case 'rgba':
            return `${colorName}, red ${color.r}, green ${color.g}, blue ${color.b}, alpha ${Math.round(color.a * 100)}%`;
          case 'hwb':
            const hwb = rgbaToHwb(color.r, color.g, color.b, color.a);
            return `${colorName}, hue ${Math.round(hwb.h)}, whiteness ${typeof hwb.w === 'string' ? hwb.w : `${Math.round(Number(hwb.w))}%`}, blackness ${typeof hwb.b === 'string' ? hwb.b : `${Math.round(Number(hwb.b))}%`}`;
          case 'hsva':
            const hsva = rgbaToHsva(color.r, color.g, color.b, color.a);
            return `${colorName}, hue ${Math.round(hsva.h)}, saturation ${Math.round(typeof hsva.s === 'string' ? parseFloat(hsva.s.replace('%', '')) : hsva.s)}%, value ${Math.round(typeof hsva.v === 'string' ? parseFloat(hsva.v.replace('%', '')) : hsva.v)}%`;
          default:
            return colorName;
        }
      }, cacheKey);
    },

    getReadableColorName(color: RgbaColor): string {
      if (props.getColorName) {
        return props.getColorName(color);
      }
      
      const cacheKey = `name_${Math.round(color.r)}_${Math.round(color.g)}_${Math.round(color.b)}`;
      return memoizeColorConversion(() => {
        const colorNames: Record<string, string> = {
          '255,255,255': 'white', '0,0,0': 'black', '255,0,0': 'red',
          '0,255,0': 'green', '0,0,255': 'blue', '255,255,0': 'yellow',
          '255,0,255': 'magenta', '0,255,255': 'cyan', '128,128,128': 'gray',
          '192,192,192': 'silver', '128,0,0': 'maroon', '0,128,0': 'olive',
          '128,128,0': 'olive', '0,0,128': 'navy', '128,0,128': 'purple',
          '0,128,128': 'teal'
        };

        const key = `${Math.round(color.r)},${Math.round(color.g)},${Math.round(color.b)}`;
        return colorNames[key] || `color with red ${Math.round(color.r)}, green ${Math.round(color.g)}, blue ${Math.round(color.b)}`;
      }, cacheKey);
    },

    getContrastRatio(color1: RgbaColor, color2: RgbaColor): number {
      const cacheKey = `contrast_${color1.r}_${color1.g}_${color1.b}_${color2.r}_${color2.g}_${color2.b}`;
      return memoizeColorConversion(() => {
        const getLuminance = (color: RgbaColor) => {
          const { r, g, b } = color;
          const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        };

        const l1 = getLuminance(color1);
        const l2 = getLuminance(color2);
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);

        return (lighter + 0.05) / (darker + 0.05);
      }, cacheKey);
    },

    getContrastLevel(ratio: number): ColorContrastInfo {
      if (ratio >= 7) return { ratio, level: 'AAA', description: 'Excellent contrast - meets AAA standards' };
      if (ratio >= 4.5) return { ratio, level: 'AA', description: 'Good contrast - meets AA standards' };
      if (ratio >= 3) return { ratio, level: 'A', description: 'Acceptable contrast for large text' };
      return { ratio, level: 'fail', description: 'Poor contrast - does not meet accessibility standards' };
    },

    convertToFormat(color: RgbaColor, format: ColorType): string {
      const cacheKey = `convert_${color.r}_${color.g}_${color.b}_${color.a}_${format}`;
      return memoizeColorConversion(() => getColor(color, format), cacheKey);
    }
  };

  // Optimized canvas operations
  function changeCanvasColor(color = "hsl(0, 100%, 50%)", opacity = 1) {
    const canvas = colorArea.value;
    if (!canvas) return;
    
    const context = canvasContext.value || canvas.getContext("2d");
    if (!context) return;
    
    if (!canvasContext.value) {
      canvasContext.value = context;
    }
    
    const currentSize = { width: canvas.clientWidth, height: canvas.clientHeight };
    const sizeChanged = currentSize.width !== lastCanvasSize.width || currentSize.height !== lastCanvasSize.height;
    const colorChanged = color !== lastCanvasColor || opacity !== lastCanvasOpacity;
    
    if (!sizeChanged && !colorChanged) return;
    
    if (sizeChanged) {
      canvas.width = currentSize.width;
      canvas.height = currentSize.height;
      lastCanvasSize = currentSize;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = opacity;

    if (colorChanged || sizeChanged) {
      const gradientBefore = context.createLinearGradient(0, 0, canvas.width, 0);
      gradientBefore.addColorStop(0, "#ffffff");
      gradientBefore.addColorStop(1, color);

      const gradientAfter = context.createLinearGradient(0, 0, 0, canvas.height);
      gradientAfter.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradientAfter.addColorStop(1, "#000000");

      context.fillStyle = gradientBefore;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = gradientAfter;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      lastCanvasColor = color;
      lastCanvasOpacity = opacity;
    }
  }

  // Optimized hue gradient with caching
  let hueGradientCanvas: HTMLCanvasElement | null = null;
  let lastHueGradientWidth = 0;

  function getPixelColor(element: Element, x: number): string {
    const width = element.clientWidth;
    
    if (!hueGradientCanvas || width !== lastHueGradientWidth) {
      hueGradientCanvas = document.createElement("canvas");
      hueGradientCanvas.width = width;
      hueGradientCanvas.height = 1;
      lastHueGradientWidth = width;

      const context = hueGradientCanvas.getContext("2d");
      if (!context) return "";
      
      const gradient = context.createLinearGradient(0, 0, width, 0);
      const stops = [
        [0, "hsl(0, 100%, 50%)"],
        [1/6, "hsl(60, 100%, 50%)"],
        [2/6, "hsl(120, 100%, 50%)"],
        [3/6, "hsl(180, 100%, 50%)"],
        [4/6, "hsl(240, 100%, 50%)"],
        [5/6, "hsl(300, 100%, 50%)"],
        [1, "hsl(360, 100%, 50%)"]
      ] as const;
      
      stops.forEach(([pos, color]) => gradient.addColorStop(pos, color));
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, 1);
    }

    const context = hueGradientCanvas.getContext("2d");
    if (!context) return "";
    
    const pixel = context.getImageData(Math.min(x, width - 1), 0, 1, 1).data;
    return `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
  }

  // Optimized cursor position calculation with caching
  let lastCursorPosition = { left: -1, top: -1 };

  function getCursorPosition(
    event: PositionEvent,
    cursor: HTMLSpanElement,
    parent: Element,
    isArea = false
  ) {
    const clamped = getPosition(
      event,
      cursor,
      parent,
      { top: true, left: true },
      { x: isArea ? 5 : 1, y: cursor.clientHeight },
      { x: isArea ? -5 : 0 }
    );
    return {
      left: clamped.x,
      top: clamped.y,
    };
  }

  // Throttled event handlers using VueUse
  const throttledUpdateColorArea = useThrottleFn((event: PositionEvent) => {
    if (!isDraggingColorArea.value || !cursorColorArea.value || !colorArea.value) return;
    
    const context = canvasContext.value;
    if (!context) return;
    
    const clamped = getCursorPosition(event, cursorColorArea.value, colorArea.value, true);
    
    // Batch DOM updates
    requestAnimationFrame(() => {
      if (!cursorColorArea.value || !colorArea.value) return;
      
      cursorColorArea.value.style.left = clamped.left + "px";
      cursorColorArea.value.style.top = clamped.top + "px";
      
      const clampedLeft = Math.min(colorArea.value.clientWidth - 1, clamped.left + 5);
      const clampedTop = Math.min(colorArea.value.clientHeight - 1, clamped.top);
      
      const pixel = context.getImageData(clampedLeft, clampedTop, 1, 1).data;
      const alpha = pixel[3] / 255;
      const rgbaString = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${alpha})`;
      
      circleBackground.value = rgbaString;
      
      const colorObj = {
        r: pixel[0],
        g: pixel[1],
        b: pixel[2],
        a: alpha,
      };
      
      inputColor.value = getColor(colorObj);
      emit("update:modelValue", inputColor.value);
    });
  }, THROTTLE_INTERVAL);

  const throttledUpdateColorSlider = useThrottleFn((event: PositionEvent) => {
    if (!isDraggingColorSlider.value || !cursorColorSlider.value) return;
    
    const slider = cursorColorSlider.value.closest(".slider");
    const sliderOpacityDiv = cursorOpacitySlider.value?.closest(".slider") as HTMLDivElement;
    
    if (!slider || !colorArea.value || !sliderOpacityDiv) return;
    
    requestAnimationFrame(() => {
      if (!cursorColorSlider.value) return;
      
      const clampedLeft = getCursorPosition(event, cursorColorSlider.value, slider).left;
      cursorColorSlider.value.style.left = clampedLeft + "px";
      
      const color = getPixelColor(slider, clampedLeft);
      sliderColor.value = color;
      
      sliderOpacityDiv.style.background = `linear-gradient(to right, #ffffff 0%, ${color})`;
      
      changeCanvasColor(color, sliderOpacity.value);
      updatedCircleColor();
    });
  }, THROTTLE_INTERVAL);

  const throttledUpdateOpacitySlider = useThrottleFn((event: PositionEvent) => {
    if (!isDraggingOpacitySlider.value || !cursorOpacitySlider.value) return;
    
    const slider = cursorOpacitySlider.value.closest(".slider");
    if (!slider || !colorArea.value) return;
    
    requestAnimationFrame(() => {
      if (!cursorOpacitySlider.value) return;
      
      const clampedLeft = getCursorPosition(event, cursorOpacitySlider.value, slider).left;
      cursorOpacitySlider.value.style.left = clampedLeft + "px";
      
      const opacityFull = slider.clientWidth - 10;
      const opacity = Math.max(0, Math.min(1, clampedLeft / opacityFull));
      
      sliderOpacity.value = opacity;
      changeCanvasColor(sliderColor.value, opacity);
      updatedCircleColor();
    });
  }, THROTTLE_INTERVAL);

  // Generic update handler that delegates to specific throttled functions
  function updateColor(event: PositionEvent) {
    throttledUpdateColorSlider(event);
    throttledUpdateOpacitySlider(event);
    throttledUpdateColorArea(event);
  }

  function updatedCircleColor() {
    if (!cursorColorArea.value || !colorArea.value) return;
    
    const context = canvasContext.value;
    if (!context) return;
    
    const currentLeft = Number(cursorColorArea.value.style.left.replace("px", "")) + 5;
    const currentTop = Number(cursorColorArea.value.style.top.replace("px", ""));
    
    // Skip if position hasn't changed
    if (currentLeft === lastCursorPosition.left && currentTop === lastCursorPosition.top) {
      return;
    }
    
    lastCursorPosition = { left: currentLeft, top: currentTop };
    
    const clampedLeft = Math.min(colorArea.value.clientWidth - 1, currentLeft);
    const clampedTop = Math.min(colorArea.value.clientHeight - 1, currentTop);
    
    const pixel = context.getImageData(clampedLeft, clampedTop, 1, 1).data;
    const alpha = pixel[3] / 255;
    const rgbaString = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${alpha})`;
    
    circleBackground.value = rgbaString;
    
    const colorObj = {
      r: pixel[0],
      g: pixel[1],
      b: pixel[2],
      a: alpha,
    };
    
    inputColor.value = getColor(colorObj);
    emit("update:modelValue", inputColor.value);
  }

  // Type guards (simplified for performance)
  function isRgbaColor(color: GenericColor): color is RgbaColor {
    return 'r' in color && 'g' in color && 'b' in color && 'a' in color;
  }

  function isGenericColor(value: string | GenericColor): value is GenericColor {
    return typeof value === 'object' && value !== null;
  }

  function isHslaColor(color: GenericColor): color is HslaColor {
    return 'h' in color && 's' in color && 'l' in color && 'a' in color;
  }

  function isHwbColor(color: GenericColor): color is HwbColor {
    return 'h' in color && 'w' in color && 'b' in color;
  }

  function isHsvaColor(color: GenericColor): color is HsvaColor {
    return 'h' in color && 's' in color && 'v' in color && 'a' in color;
  }

  // Optimized color conversion functions
  function getHsvaColor(): HsvaColor {
    const cacheKey = `hsva_${inputColor.value}_${colorType.value}`;
    return memoizeColorConversion(() => {
      try {
        switch (colorType.value) {
          case 0: { // hexa
            const rgba = hexaToRgba(inputColor.value);
            return rgbaToHsva(rgba.r, rgba.g, rgba.b, isNaN(rgba.a) ? 1 : rgba.a);
          }
          case 1: { // hsla
            const hsla = divideColor(inputColor.value, "hlsa");
            if (isGenericColor(hsla) && isHslaColor(hsla)) {
              const rgba = hslaToRgba(
                Number(hsla.h),
                Number(hsla.s.toString().replace('%', '')),
                Number(hsla.l.toString().replace('%', '')),
                Number(hsla.a)
              );
              return rgbaToHsva(rgba.r, rgba.g, rgba.b, isNaN(rgba.a) ? 1 : rgba.a);
            }
            break;
          }
          case 2: { // hwb
            const hwb = divideColor(inputColor.value, "hwb", " ");
            if (isGenericColor(hwb) && isHwbColor(hwb)) {
              const dividedColor = inputColor.value.split("/");
              const rgba = hwbToRgba(
                Number(hwb.h),
                Number(hwb.w.toString().replace('%', '')),
                Number(hwb.b.toString().replace('%', '')),
                Number(dividedColor[1]?.replace(")", "") || hwb.a || 1)
              );
              return rgbaToHsva(rgba.r, rgba.g, rgba.b, isNaN(rgba.a) ? 1 : rgba.a);
            }
            break;
          }
          case 3: { // hsva
            const hsva = divideColor(inputColor.value, "hsva");
            if (isGenericColor(hsva) && isHsvaColor(hsva)) {
              return hsva;
            }
            break;
          }
          default: { // rgba
            const rgba = divideColor(inputColor.value);
            if (isGenericColor(rgba) && isRgbaColor(rgba)) {
              return rgbaToHsva(rgba.r, rgba.g, rgba.b, isNaN(rgba.a) ? 1 : rgba.a);
            }
          }
        }
      } catch (error) {
        console.warn('Color parsing failed, using fallback:', error);
      }
      
      return { h: 0, s: 0, v: 100, a: 1 };
    }, cacheKey);
  }

  function getColor(color: RgbaColor, format?: ColorType): string {
    const targetFormat = format !== undefined ? format : colorType.value;
    const cacheKey = `color_${color.r}_${color.g}_${color.b}_${color.a}_${targetFormat}`;
    
    return memoizeColorConversion(() => {
      switch (targetFormat) {
        case 0:
        case 'hexa':
          return rgbaToHexa(color.r, color.g, color.b, color.a);
          
        case 1:
        case 'hsla': {
          const hsla = rgbaToHsla(color.r, color.g, color.b, color.a);
          const alpha = hsla.a < 1 ? hsla.a.toFixed(2) : hsla.a;
          return `${hsla.h.toFixed(0)}, ${hsla.s}, ${hsla.l}, ${alpha}`;
        }
          
        case 2:
        case 'hwb': {
          const hwb = rgbaToHwb(color.r, color.g, color.b, color.a);
          const alpha = hwb.a < 1 ? hwb.a.toFixed(2) : hwb.a;
          return `${hwb.h} ${hwb.w} ${hwb.b} / ${alpha}`;
        }
          
        case 3:
        case 'hsva': {
          const hsva = rgbaToHsva(color.r, color.g, color.b, color.a);
          const alpha = hsva.a < 1 ? hsva.a.toFixed(2) : hsva.a;
          return `${hsva.h}, ${hsva.s}, ${hsva.v}, ${alpha}`;
        }
          
        default: {
          const alpha = color.a < 1 ? color.a.toFixed(2) : color.a;
          return `${color.r}, ${color.g}, ${color.b}, ${alpha}`;
        }
      }
    }, cacheKey);
  }

  // Helper functions
  function divideColor(color: string, type = "rgba", divideBy = ","): GenericColor | string {
    if (!color) return "";
    const colorObject: GenericColor = {};
    const typeArray = Array.from(type);
    const values = color.split(divideBy);
    return replaceObject(typeArray, values, colorObject);
  }

  function divideCompleteColor(color: string, divideBy = ","): GenericColor | undefined {
    if (!color) return undefined;
    const colorObject: GenericColor = {};
    const dividedColor = color.split("(");
    if (dividedColor.length < 2) return undefined;
    const type = Array.from(dividedColor[0]);
    dividedColor[1] = dividedColor[1].replace(")", "");
    const values = dividedColor[1].split(divideBy);
    return replaceObject(type, values, colorObject);
  }

  function replaceObject(array: string[], values: string[], obj: GenericColor): GenericColor {
    array.forEach((s, index) => {
      obj[s] = typeof values[index] === "string"
        ? Number(values[index].replace("%", ""))
        : Number(values[index]) || 1;
    });
    return obj;
  }

  function buildColor(color: GenericColor): string {
    let colorString = "";
    let colorType = "";
    Object.keys(color).forEach((key, index) => {
      colorType += key;
      colorString += Object.keys(color).length - 1 === index ? color[key] : `${color[key]}, `;
    });
    return `${colorType}(${colorString})`;
  }

  function findColorPosition(color: HsvaColor): Position | undefined {
    const canvas = colorArea.value;
    if (!canvas) return undefined;

    const cacheKey = `pos_${color.h}_${color.s}_${color.v}_${canvas.clientWidth}_${canvas.clientHeight}`;
    return memoizeColorConversion(() => {
      const s = typeof color.s === "string" ? Number(color.s.replace("%", "")) : color.s;
      const v = typeof color.v === "string" ? Number(color.v.replace("%", "")) : color.v;
      
      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;
      
      const positionX = Math.max(-5, Math.min((s / 100) * (canvasWidth - 5), canvasWidth - 5));
      const positionY = Math.max(0, Math.min((1 - v / 100) * canvasHeight, canvasHeight));

      return { x: positionX, y: positionY };
    }, cacheKey);
  }

  function getCurrentRgbaColor(): RgbaColor | null {
    try {
      const colorObj = divideCompleteColor(circleBackground.value);
      if (colorObj && isRgbaColor(colorObj)) {
        return colorObj;
      }
      return null;
    } catch {
      return null;
    }
  }

  // Computed properties with optimized caching
  const currentColorDescription = computed(() => {
    const rgba = getCurrentRgbaColor();
    if (!rgba) return '';
    
    const cacheKey = `desc_${rgba.r}_${rgba.g}_${rgba.b}_${rgba.a}_${props.type}`;
    return memoizeColorConversion(() => {
      return colorSpaceUtils.toAccessibleDescription(rgba, props.type || 'hexa');
    }, cacheKey);
  });

  const currentColorName = computed(() => {
    const rgba = getCurrentRgbaColor();
    if (!rgba) return '';
    
    const cacheKey = `name_${Math.round(rgba.r)}_${Math.round(rgba.g)}_${Math.round(rgba.b)}`;
    return memoizeColorConversion(() => {
      return colorSpaceUtils.getReadableColorName(rgba);
    }, cacheKey);
  });

  const contrastInfo = computed((): ColorContrastInfo | null => {
    if (!props.showContrast || !props.accessibility?.contrastValidation) {
      return null;
    }

    const rgba = getCurrentRgbaColor();
    const backgroundRgba = hexaToRgba(props.accessibility.contrastBackground || '#ffffff');
    
    if (!rgba) return null;

    const ratio = colorSpaceUtils.getContrastRatio(rgba, backgroundRgba);
    return colorSpaceUtils.getContrastLevel(ratio);
  });

  // Debounced cursor calculation for better performance
  let cursorCalculationRAF: number | null = null;

  const calculateCursor = useRafFn(() => {
    const sliderColorDiv = cursorColorSlider.value?.closest(".slider");
    const sliderOpacityDiv = cursorOpacitySlider.value?.closest(".slider") as HTMLDivElement;
    
    if (!cursorColorSlider.value || !cursorOpacitySlider.value || !cursorColorArea.value || !sliderColorDiv || !sliderOpacityDiv) {
      return;
    }
    
    const hsva = getHsvaColor();
    
    const sliderWidth = sliderColorDiv.clientWidth - 10;
    const opacityWidth = sliderOpacityDiv.clientWidth - 10;
    
    const colorPercentage = Math.min(1, Math.max(0, hsva.h / 360));
    const colorLeft = Math.min(sliderWidth, Math.max(0, sliderWidth * colorPercentage));
    const opacityLeft = Math.min(opacityWidth, Math.max(0, opacityWidth * hsva.a));
    const opacity = opacityLeft / opacityWidth;
    
    sliderOpacity.value = opacity;
    cursorColorSlider.value.style.left = colorLeft + "px";
    cursorOpacitySlider.value.style.left = opacityLeft + "px";
    
    const color = getPixelColor(sliderColorDiv, colorLeft);
    sliderColor.value = color;
    sliderOpacityDiv.style.background = `linear-gradient(to right, #ffffff 0%, ${color})`;
    
    changeCanvasColor(color, opacity);
    
    const sValue = typeof hsva.s === 'string' ? Number(hsva.s.replace('%', '')) : hsva.s;
    const vValue = typeof hsva.v === 'string' ? Number(hsva.v.replace('%', '')) : hsva.v;
    
    const rgba = hsvaToRgba(hsva.h, sValue, vValue, hsva.a);
    circleBackground.value = buildColor(rgba);
    
    const colorPosition = findColorPosition(hsva);
    if (colorPosition && cursorColorArea.value) {
      cursorColorArea.value.style.left = colorPosition.x + "px";
      cursorColorArea.value.style.top = colorPosition.y + "px";
    }
    
    emit("update:modelValue", inputColor.value);
  });

  // Cleanup function
  function cleanup() {
    if (cursorCalculationRAF) {
      cancelAnimationFrame(cursorCalculationRAF);
    }
    canvasContext.value = null;
    hueGradientCanvas = null;
    lastHueGradientWidth = 0;
    lastCanvasColor = "";
    lastCanvasOpacity = -1;
    lastCanvasSize = { width: 0, height: 0 };
    lastCursorPosition = { left: -1, top: -1 };
  }

  return {
    // State
    isDraggingColorSlider,
    isDraggingOpacitySlider,
    isDraggingColorArea,
    isMovingDown,
    isMovingUp,
    circleBackground,
    sliderColor,
    sliderOpacity,
    inputColor,
    colorTypes,
    colorType,
    
    // Refs
    cursorColorSlider,
    cursorOpacitySlider,
    cursorColorArea,
    colorArea,
    canvasContext,
    
    // Methods
    changeCanvasColor,
    updateColor: throttledUpdateColorArea,
    updateColorSlider: throttledUpdateColorSlider,
    updateOpacitySlider: throttledUpdateOpacitySlider,
    calculateCursor,
    getHsvaColor,
    getColor,
    getCurrentRgbaColor,
    findColorPosition,
    cleanup,
    
    // Computed
    currentColorDescription,
    currentColorName,
    contrastInfo,
    
    // Utils
    colorSpaceUtils,
    getWhite
  };
}