<script setup lang="ts">
import { ref, shallowRef, onMounted, onBeforeUnmount, watch, computed, nextTick } from "vue";
import type { Ref } from "vue";
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
} from "../../utils/index";
import { useAriaAttributes, useScreenReader, useKeyboardNavigation } from "#composables";
import BInput from "../BInput/BInput.vue";
import BIcon from "../BIcon/BIcon.vue";
import BCard from "../BCard/BCard.vue";
import type {
	BColorPickerProps,
	BColorPickerEmits,
	ColorType,
	RgbaColor,
	HsvaColor,
	GenericColor,
	HslaColor,
	HwbColor,
	Position,
	PositionEvent,
	ColorContrastInfo,
	PresetColor,
	ColorValidationResult,
	ColorPickerAccessibilityState,
	ColorSpaceUtils,
	ColorPickerKeyboardHandlers,
	ColorPickerAriaAttributes
} from "./BColorPicker.types";

const props = withDefaults(defineProps<BColorPickerProps>(), {
	modelValue: undefined,
	type: "hexa",
	noShadow: false,
	ariaLabel: "Color picker",
	disabled: false,
	invalid: false,
	showColorName: true,
	showContrast: false,
	respectReducedMotion: true,
	highContrast: false,
	accessibility: () => ({
		keyboard: {
			colorAreaStep: 5,
			hueStep: 10,
			opacityStep: 0.05,
			announceChanges: true
		},
		announcements: {
			announceFormat: true,
			announceValue: true,
			announceContrast: false
		},
		contrastValidation: false,
		contrastBackground: "#ffffff",
		alternativeInput: true,
		presetColors: []
	})
});

const emit = defineEmits<BColorPickerEmits>();

// Accessibility composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();
const { useLiveRegion } = screenReader;

// Generate unique IDs for ARIA relationships
const colorPickerId = useAriaId('color-picker');
const colorAreaId = useAriaId('color-area');
const hueSliderid = useAriaId('hue-slider');
const opacitySliderid = useAriaId('opacity-slider');
const formatButtonsId = useAriaId('format-buttons');
const inputId = useAriaId('color-input');
const liveRegionId = useAriaId('live-region');
const presetColorsId = useAriaId('preset-colors');

// Live region for screen reader announcements
const { liveRegion, updateLiveRegion } = useLiveRegion('polite');

// Performance optimization: Memoize color calculations
const colorConversionCache = new Map<string, any>();
const COLOR_CACHE_SIZE = 100;

function memoizeColorConversion<T>(fn: Function, cacheKey: string): T {
	if (colorConversionCache.has(cacheKey)) {
		return colorConversionCache.get(cacheKey);
	}
	
	const result = fn();
	
	// Prevent memory leaks by limiting cache size
	if (colorConversionCache.size >= COLOR_CACHE_SIZE) {
		const firstKey = colorConversionCache.keys().next().value;
		colorConversionCache.delete(firstKey);
	}
	
	colorConversionCache.set(cacheKey, result);
	return result;
}

// Color space utilities with accessibility features and performance optimizations
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
			// Basic color name detection for common colors
			const colorNames: Record<string, string> = {
				'255,255,255': 'white',
				'0,0,0': 'black',
				'255,0,0': 'red',
				'0,255,0': 'green',
				'0,0,255': 'blue',
				'255,255,0': 'yellow',
				'255,0,255': 'magenta',
				'0,255,255': 'cyan',
				'128,128,128': 'gray',
				'192,192,192': 'silver',
				'128,0,0': 'maroon',
				'0,128,0': 'olive',
				'128,128,0': 'olive',
				'0,0,128': 'navy',
				'128,0,128': 'purple',
				'0,128,128': 'teal'
			};

			const key = `${Math.round(color.r)},${Math.round(color.g)},${Math.round(color.b)}`;
			if (colorNames[key]) {
				return colorNames[key];
			}

			// Fallback to RGB description
			return `color with red ${Math.round(color.r)}, green ${Math.round(color.g)}, blue ${Math.round(color.b)}`;
		}, cacheKey);
	},

	getContrastRatio(color1: RgbaColor, color2: RgbaColor): number {
		const cacheKey = `contrast_${color1.r}_${color1.g}_${color1.b}_${color2.r}_${color2.g}_${color2.b}`;
		return memoizeColorConversion(() => {
			// Calculate relative luminance
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
		if (ratio >= 7) {
			return {
				ratio,
				level: 'AAA',
				description: 'Excellent contrast - meets AAA standards'
			};
		} else if (ratio >= 4.5) {
			return {
				ratio,
				level: 'AA',
				description: 'Good contrast - meets AA standards'
			};
		} else if (ratio >= 3) {
			return {
				ratio,
				level: 'A',
				description: 'Acceptable contrast for large text'
			};
		} else {
			return {
				ratio,
				level: 'fail',
				description: 'Poor contrast - does not meet accessibility standards'
			};
		}
	},

	convertToFormat(color: RgbaColor, format: ColorType): string {
		const cacheKey = `convert_${color.r}_${color.g}_${color.b}_${color.a}_${format}`;
		return memoizeColorConversion(() => getColor(color, format), cacheKey);
	}
};

// Current color description for screen readers with performance optimization
const currentColorDescription = computed(() => {
	const rgba = getCurrentRgbaColor();
	if (!rgba) return '';
	
	// Performance: Only recalculate when necessary values change
	const cacheKey = `desc_${rgba.r}_${rgba.g}_${rgba.b}_${rgba.a}_${props.type}`;
	return memoizeColorConversion(() => {
		return colorSpaceUtils.toAccessibleDescription(rgba, props.type || 'hexa');
	}, cacheKey);
});

// Current color name for display with performance optimization
const currentColorName = computed(() => {
	const rgba = getCurrentRgbaColor();
	if (!rgba) return '';
	
	// Performance: Cache color name lookups
	const cacheKey = `name_${Math.round(rgba.r)}_${Math.round(rgba.g)}_${Math.round(rgba.b)}`;
	return memoizeColorConversion(() => {
		return colorSpaceUtils.getReadableColorName(rgba);
	}, cacheKey);
});

// Contrast information if enabled
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

// Format navigation with keyboard support
let handleFormatKeyDown: ((event: KeyboardEvent) => boolean) | null = null;
let activeFormatIndex: Ref<number> | null = null;

// Keyboard navigation state
const focusedElement = ref<'area' | 'hue' | 'opacity' | 'input' | 'format' | null>(null);
const keyboardActive = ref(false);

// Accessibility state
const accessibilityState: ColorPickerAccessibilityState = {
	focusedElement,
	keyboardActive,
	colorDescription: currentColorDescription,
	contrastInfo,
	colorName: currentColorName,
	liveRegion
};

// Performance: Throttled event handlers
const throttledUpdateColor = (event: PositionEvent) => {
	if (mouseMoveThrottleId) return;
	mouseMoveThrottleId = requestAnimationFrame(() => {
		updateColor(event);
		mouseMoveThrottleId = null;
	});
};

const throttledUpdateColorTouch = (event: TouchEvent) => {
	if (mouseMoveThrottleId) return;
	mouseMoveThrottleId = requestAnimationFrame(() => {
		updateColorTouch(event);
		mouseMoveThrottleId = null;
	});
};

// Optimized mouse up/touch end handler
const handleInteractionEnd = () => {
	isDraggingColorSlider.value = false;
	isDraggingOpacitySlider.value = false;
	isDraggingColorArea.value = false;
};

onMounted(() => {
	// Performance: Use throttled event handlers
	window.addEventListener("mousemove", throttledUpdateColor, { passive: true });
	window.addEventListener("mouseup", handleInteractionEnd);
	window.addEventListener("touchmove", throttledUpdateColorTouch, { passive: true });
	window.addEventListener("touchend", handleInteractionEnd);
	
	// Initialize canvas context cache
	const canvas = colorArea.value;
	if (canvas) {
		canvasContext.value = canvas.getContext('2d');
	}
	
	// Initialize color picker
	changeCanvasColor();
	// Use requestAnimationFrame for better performance
	requestAnimationFrame(() => {
		calculateCursor();
	});

	// Set up accessibility announcements
	if (props.accessibility?.announcements?.announceValue) {
		nextTick(() => {
			updateLiveRegion(`Color picker ready. Current color: ${currentColorDescription.value}`);
		});
	}
});

onBeforeUnmount(() => {
	// Cleanup throttled event handlers
	window.removeEventListener("mousemove", throttledUpdateColor);
	window.removeEventListener("mouseup", handleInteractionEnd);
	window.removeEventListener("touchmove", throttledUpdateColorTouch);
	window.removeEventListener("touchend", handleInteractionEnd);
	
	// Cancel any pending animation frames and timeouts
	if (mouseMoveThrottleId) {
		cancelAnimationFrame(mouseMoveThrottleId);
		mouseMoveThrottleId = null;
	}
	if (updateThrottleId) {
		cancelAnimationFrame(updateThrottleId);
		updateThrottleId = null;
	}
	if (cursorCalculationTimeout) {
		clearTimeout(cursorCalculationTimeout);
		cursorCalculationTimeout = null;
	}
	
	// Clear cached canvas and context
	canvasContext.value = null;
	hueGradientCanvas = null;
	lastHueGradientWidth = 0;
	
	// Clear cache to prevent memory leaks
	colorConversionCache.clear();
	
	// Reset cached state
	lastCanvasColor = "";
	lastCanvasOpacity = -1;
	lastCanvasSize = { width: 0, height: 0 };
	lastCursorPosition = { left: -1, top: -1 };
});

watch(
	() => props.type,
	() => {
		const index = colorTypes.value.findIndex((x) => x == props.type);
		colorType.value = index !== -1 ? index : 0;
		move(false);
		
		// Announce format change
		if (props.accessibility?.announcements?.announceFormat) {
			updateLiveRegion(`Color format changed to ${props.type?.toUpperCase()}`);
		}
		
		emit('formatChange', props.type || 'hexa');
	}
);

watch(
	() => props.modelValue,
	() => {
		if (inputColor.value != props.modelValue) {
			inputColor.value = props.modelValue || inputColor.value;
			calculateCursor();
		}
	}
);

// Watch for color changes and emit accessibility events
watch(currentColorDescription, (newDesc, oldDesc) => {
	if (newDesc !== oldDesc) {
		const rgba = getCurrentRgbaColor();
		if (rgba) {
			emit('colorChange', rgba, currentColorName.value);
			
			// Announce color changes if enabled
			if (props.accessibility?.keyboard?.announceChanges && keyboardActive.value) {
				updateLiveRegion(`Color changed: ${newDesc}`);
			}
		}
	}
});

watch(contrastInfo, (newInfo) => {
	if (newInfo && props.accessibility?.announcements?.announceContrast) {
		updateLiveRegion(`Contrast ratio: ${newInfo.ratio.toFixed(1)}, ${newInfo.description}`);
	}
	
	if (newInfo) {
		emit('contrastChange', newInfo);
	}
});

const isDraggingColorSlider = ref(false);
const isDraggingOpacitySlider = ref(false);
const isDraggingColorArea = ref(false);
const cursorColorSlider = ref<HTMLSpanElement>();
const cursorOpacitySlider = ref<HTMLSpanElement>();
const cursorColorArea = ref<HTMLSpanElement>();
const colorArea = ref<HTMLCanvasElement>();
// Performance optimization: Use shallowRef for frequently updated values
const circleBackground = shallowRef(props.modelValue || "rgba(255, 255, 255, 1)");
const sliderColor = shallowRef("hsl(0, 100%, 50%)");
const sliderOpacity = shallowRef(1);
const inputColor = shallowRef(props.modelValue || getWhite());

// Canvas optimization: Cache canvas context and avoid repeated getContext calls
const canvasContext = shallowRef<CanvasRenderingContext2D | null>(null);

// Throttling for performance
let updateThrottleId: number | null = null;
let mouseMoveThrottleId: number | null = null;
const THROTTLE_DELAY = 16; // ~60fps
const colorTypes = ref<ColorType[]>(["hexa", "hsla", "hwb", "hsva", "rgba"]);

// Initialize format navigation after colorTypes is defined
const { activeIndex: _activeFormatIndex, handleKeydown: _handleFormatKeyDown } = useKeyboardNavigation(
	colorTypes,
	(_, index) => {
		colorType.value = index;
		move();
		if (props.accessibility?.announcements?.announceFormat) {
			updateLiveRegion(`Color format changed to ${colorTypes.value[index].toUpperCase()}`);
		}
	},
	{ horizontal: true, loop: true }
);
handleFormatKeyDown = _handleFormatKeyDown;
activeFormatIndex = _activeFormatIndex;

const colorType = ref(
	colorTypes.value.findIndex((x) => x == props.type) !== -1
		? colorTypes.value.findIndex((x) => x == props.type)
		: 0
);
const isMovingDown = ref(false);
const isMovingUp = ref(false);

// ARIA attributes for different elements
const ariaAttributes: ColorPickerAriaAttributes = {
	colorPickerAria: computed(() => ({
		role: 'group',
		'aria-label': props.ariaLabel,
		'aria-describedby': [props.ariaDescribedby, liveRegionId].filter(Boolean).join(' ') || undefined,
		'aria-invalid': props.invalid,
		'aria-disabled': props.disabled
	})),

	colorAreaAria: computed(() => ({
		role: 'slider',
		'aria-label': 'Color saturation and brightness',
		'aria-valuetext': `Saturation and brightness selection. ${currentColorDescription.value}`,
		'aria-describedby': `${colorAreaId}-desc`,
		tabindex: props.disabled ? -1 : 0,
		'aria-disabled': props.disabled
	})),

	hueSliderAria: computed(() => {
		const hsva = getHsvaColor();
		return {
			role: 'slider',
			'aria-label': 'Color hue',
			'aria-valuemin': 0,
			'aria-valuemax': 360,
			'aria-valuenow': Math.round(hsva.h),
			'aria-valuetext': `Hue ${Math.round(hsva.h)} degrees`,
			'aria-describedby': `${hueSliderid}-desc`,
			tabindex: props.disabled ? -1 : 0,
			'aria-disabled': props.disabled
		};
	}),

	opacitySliderAria: computed(() => ({
		role: 'slider',
		'aria-label': 'Color opacity',
		'aria-valuemin': 0,
		'aria-valuemax': 100,
		'aria-valuenow': Math.round(sliderOpacity.value * 100),
		'aria-valuetext': `Opacity ${Math.round(sliderOpacity.value * 100)}%`,
		'aria-describedby': `${opacitySliderid}-desc`,
		tabindex: props.disabled ? -1 : 0,
		'aria-disabled': props.disabled
	})),

	textInputAria: computed(() => ({
		'aria-label': `Color value in ${props.type?.toUpperCase()} format`,
		'aria-describedby': `${inputId}-desc`,
		'aria-invalid': props.invalid,
		'aria-required': false,
		tabindex: props.disabled ? -1 : 0,
		'aria-disabled': props.disabled
	})),

	formatSelectorAria: computed(() => ({
		role: 'radiogroup',
		'aria-label': 'Color format selection',
		'aria-describedby': `${formatButtonsId}-desc`,
		'aria-disabled': props.disabled
	}))
};

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

function getWhite(): string {
	if (props.type == "hexa") return "#ffffffff";
	else if (props.type == "hsla") return "0, 100%, 0%, 1";
	else if (props.type == "hwb") return "0 100% 0% / 1";
	else if (props.type == "hsva") return "0, 0%, 100%, 1";
	return "255, 255, 255, 1";
}

/**
 * Starts dragging the color slider
 */
function startDraggingColorSlider(event: PositionEvent) {
	if (props.disabled) return;
	isDraggingColorSlider.value = true;
	updateColorSlider(event);
	focusedElement.value = 'hue';
	keyboardActive.value = false;
}

/**
 * Starts dragging the opacity slider
 */
function startDraggingOpacitySlider(event: PositionEvent) {
	if (props.disabled) return;
	isDraggingOpacitySlider.value = true;
	updateOpacitySlider(event);
	focusedElement.value = 'opacity';
	keyboardActive.value = false;
}

/**
 * Starts dragging in the color area
 */
function startDraggingColorArea(event: PositionEvent) {
	if (props.disabled) return;
	isDraggingColorArea.value = true;
	updateColorArea(event);
	focusedElement.value = 'area';
	keyboardActive.value = false;
}

/**
 * Updates all color controls based on event position
 */
function updateColor(event: PositionEvent) {
	updateColorSlider(event);
	updateOpacitySlider(event);
	updateColorArea(event);
}

function startDraggingColorAreaTouch(event: TouchEvent) {
	startDraggingColorArea(event.touches[0]);
}

function startDraggingOpacitySliderTouch(event: TouchEvent) {
	startDraggingOpacitySlider(event.touches[0]);
}

function startDraggingColorSliderTouch(event: TouchEvent) {
	startDraggingColorSlider(event.touches[0]);
}

function updateColorTouch(event: TouchEvent) {
	updateColor(event.touches[0]);
}

/**
 * Updates the opacity slider position and value
 * Performance optimized with throttling
 */
function updateOpacitySlider(event: PositionEvent) {
	if (!isDraggingOpacitySlider.value || !cursorOpacitySlider.value) return;
	
	if (updateThrottleId) return; // Skip if already updating
	
	updateThrottleId = requestAnimationFrame(() => {
		if (!cursorOpacitySlider.value) {
			updateThrottleId = null;
			return;
		}
		
		const slider = cursorOpacitySlider.value.closest(".slider");
		if (!slider || !colorArea.value) {
			updateThrottleId = null;
			return;
		}
		
		const clampedLeft = getCursorPosition(event, cursorOpacitySlider.value, slider).left;
		cursorOpacitySlider.value.style.left = clampedLeft + "px";
		
		const opacityFull = slider.clientWidth - 10;
		const opacity = Math.max(0, Math.min(1, clampedLeft / opacityFull));
		
		sliderOpacity.value = opacity;
		changeCanvasColor(sliderColor.value, opacity);
		updatedCircleColor();
		
		updateThrottleId = null;
	});
}

/**
 * Updates the color slider position and value
 * Performance optimized with throttling
 */
function updateColorSlider(event: PositionEvent) {
	if (!isDraggingColorSlider.value || !cursorColorSlider.value) return;
	
	if (updateThrottleId) return; // Skip if already updating
	
	updateThrottleId = requestAnimationFrame(() => {
		if (!cursorColorSlider.value) {
			updateThrottleId = null;
			return;
		}
		
		const slider = cursorColorSlider.value.closest(".slider");
		const sliderOpacityDiv = cursorOpacitySlider.value?.closest(".slider") as HTMLDivElement;
		
		if (!slider || !colorArea.value || !sliderOpacityDiv) {
			updateThrottleId = null;
			return;
		}
		
		const clampedLeft = getCursorPosition(event, cursorColorSlider.value, slider).left;
		cursorColorSlider.value.style.left = clampedLeft + "px";
		
		const color = getPixelColor(slider, clampedLeft);
		sliderColor.value = color;
		
		// Performance: Use more efficient gradient update
		sliderOpacityDiv.style.background = `linear-gradient(to right, #ffffff 0%, ${color})`;
		
		changeCanvasColor(color, sliderOpacity.value);
		updatedCircleColor();
		
		updateThrottleId = null;
	});
}

/**
 * Updates the color area cursor position and selected color
 * Performance optimized with throttling
 */
function updateColorArea(event: PositionEvent) {
	if (!isDraggingColorArea.value || !cursorColorArea.value || !colorArea.value) return;
	
	if (updateThrottleId) return; // Skip if already updating
	
	updateThrottleId = requestAnimationFrame(() => {
		if (!cursorColorArea.value || !colorArea.value) {
			updateThrottleId = null;
			return;
		}
		
		// Use cached canvas context
		const context = canvasContext.value;
		if (!context) {
			updateThrottleId = null;
			return;
		}
		
		const clamped = getCursorPosition(event, cursorColorArea.value, colorArea.value, true);
		
		// Performance: Batch DOM style updates
		cursorColorArea.value.style.cssText += `left: ${clamped.left}px; top: ${clamped.top}px;`;
		
		const clampedLeft = Math.min(colorArea.value.clientWidth - 1, clamped.left + 5);
		const clampedTop = Math.min(colorArea.value.clientHeight - 1, clamped.top);
		
		const pixel = context.getImageData(clampedLeft, clampedTop, 1, 1).data;
		
		// Performance: Build strings more efficiently
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
		
		updateThrottleId = null;
	});
}

// Performance: Cache hue gradient canvas
let hueGradientCanvas: HTMLCanvasElement | null = null;
let lastHueGradientWidth = 0;

function getPixelColor(element: Element, x: number): string {
	const width = element.clientWidth;
	
	// Performance: Reuse hue gradient canvas if dimensions match
	if (!hueGradientCanvas || width !== lastHueGradientWidth) {
		hueGradientCanvas = document.createElement("canvas");
		hueGradientCanvas.width = width;
		hueGradientCanvas.height = 1; // Only need 1 pixel height
		lastHueGradientWidth = width;

		const context = hueGradientCanvas.getContext("2d");
		if (!context) return "";
		
		const gradient = context.createLinearGradient(0, 0, width, 0);
		gradient.addColorStop(0, "hsl(0, 100%, 50%)");
		gradient.addColorStop(1 / 6, "hsl(60, 100%, 50%)");
		gradient.addColorStop(2 / 6, "hsl(120, 100%, 50%)");
		gradient.addColorStop(3 / 6, "hsl(180, 100%, 50%)");
		gradient.addColorStop(4 / 6, "hsl(240, 100%, 50%)");
		gradient.addColorStop(5 / 6, "hsl(300, 100%, 50%)");
		gradient.addColorStop(1, "hsl(360, 100%, 50%)");
		context.fillStyle = gradient;
		context.fillRect(0, 0, width, 1);
	}

	const context = hueGradientCanvas.getContext("2d");
	if (!context) return "";
	
	const pixel = context.getImageData(Math.min(x, width - 1), 0, 1, 1).data;
	return `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
}

// Performance: Track canvas state to avoid unnecessary redraws
let lastCanvasColor = "";
let lastCanvasOpacity = -1;
let lastCanvasSize = { width: 0, height: 0 };

function changeCanvasColor(color = "hsl(0, 100%, 50%)", opacity = 1) {
	const canvas = colorArea.value;
	if (!canvas) return;
	
	// Use cached context
	const context = canvasContext.value || canvas.getContext("2d");
	if (!context) return;
	
	if (!canvasContext.value) {
		canvasContext.value = context;
	}
	
	// Performance: Check if redraw is necessary
	const currentSize = { width: canvas.clientWidth, height: canvas.clientHeight };
	const sizeChanged = currentSize.width !== lastCanvasSize.width || currentSize.height !== lastCanvasSize.height;
	const colorChanged = color !== lastCanvasColor || opacity !== lastCanvasOpacity;
	
	if (!sizeChanged && !colorChanged) {
		return; // Skip unnecessary redraw
	}
	
	// Only resize canvas if dimensions changed
	if (sizeChanged) {
		canvas.width = currentSize.width;
		canvas.height = currentSize.height;
		lastCanvasSize = currentSize;
	}

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.globalAlpha = opacity;

	// Performance: Create gradients only once per color change
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

/**
 * Gets the clamped cursor position within bounds
 */
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

// Performance: Cache cursor positions to avoid repeated DOM queries
let lastCursorPosition = { left: -1, top: -1 };

function updatedCircleColor() {
	if (!cursorColorArea.value || !colorArea.value) return;
	
	// Use cached canvas context
	const context = canvasContext.value;
	if (!context) return;
	
	// Performance: Parse position values only once and cache them
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
	
	// Performance: Build color strings without template literals
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

// Performance: Debounced cursor calculation to avoid excessive updates
let cursorCalculationTimeout: number | null = null;

function calculateCursor() {
	// Debounce cursor calculations
	if (cursorCalculationTimeout) {
		clearTimeout(cursorCalculationTimeout);
	}
	
	cursorCalculationTimeout = window.setTimeout(() => {
		performCursorCalculation();
		cursorCalculationTimeout = null;
	}, 10);
}

function performCursorCalculation() {
	const sliderColorDiv = cursorColorSlider.value?.closest(".slider");
	const sliderOpacityDiv = cursorOpacitySlider.value?.closest(".slider") as HTMLDivElement;
	
	if (!cursorColorSlider.value || !cursorOpacitySlider.value || !cursorColorArea.value || !sliderColorDiv || !sliderOpacityDiv) {
		return;
	}
	
	const hsva = getHsvaColor();
	
	// Performance: Calculate all values upfront
	const sliderWidth = sliderColorDiv.clientWidth - 10;
	const opacityWidth = sliderOpacityDiv.clientWidth - 10;
	
	const colorPercentage = Math.min(1, Math.max(0, hsva.h / 360));
	const colorLeft = Math.min(sliderWidth, Math.max(0, sliderWidth * colorPercentage));
	const opacityLeft = Math.min(opacityWidth, Math.max(0, opacityWidth * hsva.a));
	const opacity = opacityLeft / opacityWidth;
	
	// Performance: Batch all DOM updates
	requestAnimationFrame(() => {
		if (!cursorColorSlider.value || !cursorOpacitySlider.value || !cursorColorArea.value) return;
		
		sliderOpacity.value = opacity;
		cursorColorSlider.value.style.left = colorLeft + "px";
		cursorOpacitySlider.value.style.left = opacityLeft + "px";
		
		const color = getPixelColor(sliderColorDiv, colorLeft);
		sliderColor.value = color;
		sliderOpacityDiv.style.background = `linear-gradient(to right, #ffffff 0%, ${color})`;
		
		changeCanvasColor(color, opacity);
		
		// Performance: Optimize RGBA conversion
		const sValue = typeof hsva.s === 'string' ? Number(hsva.s.replace('%', '')) : hsva.s;
		const vValue = typeof hsva.v === 'string' ? Number(hsva.v.replace('%', '')) : hsva.v;
		
		const rgba = hsvaToRgba(hsva.h, sValue, vValue, hsva.a);
		circleBackground.value = buildColor(rgba);
		
		const colorPosition = findColorPosition(hsva);
		if (colorPosition) {
			cursorColorArea.value.style.cssText += `left: ${colorPosition.x}px; top: ${colorPosition.y}px;`;
		}
		
		emit("update:modelValue", inputColor.value);
	});
}

/**
 * Type guard to check if a value is a GenericColor object
 */
function isGenericColor(value: string | GenericColor): value is GenericColor {
	return typeof value === 'object' && value !== null;
}

/**
 * Type guard to check if a GenericColor has HSLA properties
 */
function isHslaColor(color: GenericColor): color is HslaColor {
	return 'h' in color && 's' in color && 'l' in color && 'a' in color;
}

/**
 * Type guard to check if a GenericColor has HWB properties
 */
function isHwbColor(color: GenericColor): color is HwbColor {
	return 'h' in color && 'w' in color && 'b' in color;
}

/**
 * Type guard to check if a GenericColor has HSVA properties
 */
function isHsvaColor(color: GenericColor): color is HsvaColor {
	return 'h' in color && 's' in color && 'v' in color && 'a' in color;
}

/**
 * Type guard to check if a GenericColor has RGBA properties
 */
function isRgbaColor(color: GenericColor): color is RgbaColor {
	return 'r' in color && 'g' in color && 'b' in color && 'a' in color;
}

/**
 * Gets the current color as HSVA with performance optimizations
 */
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
		
		// Fallback to white if parsing fails
		return { h: 0, s: 0, v: 100, a: 1 };
	}, cacheKey);
}

/**
 * Converts RGBA color to the selected format with performance optimizations
 */
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

/**
 * Divides a color string into component values
 */
function divideColor(color: string, type = "rgba", divideBy = ","): GenericColor | string {
	if (!color) return "";
	const colorObject: GenericColor = {};
	const typeArray = Array.from(type);
	const values = color.split(divideBy);
	return replaceObject(typeArray, values, colorObject);
}

/**
 * Divides a complete color string (e.g., "rgba(255,255,255,1)") into components
 */
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

/**
 * Replaces object properties with parsed values
 */
function replaceObject(array: string[], values: string[], obj: GenericColor): GenericColor {
	array.forEach((s, index) => {
		obj[s] =
			typeof values[index] == "string"
				? Number(values[index].replace("%", ""))
				: Number(values[index]) || 1;
	});
	return obj;
}

/**
 * Builds a color string from a color object
 */
function buildColor(color: GenericColor): string {
	let colorString = "";
	let colorType = "";
	Object.keys(color).forEach((key, index) => {
		colorType += key;
		colorString +=
			Object.keys(color).length - 1 == index ? color[key] : `${color[key]}, `;
	});
	return `${colorType}(${colorString})`;
}

/**
 * Finds the position coordinates for a given HSVA color with performance optimizations
 */
function findColorPosition(color: HsvaColor): Position | undefined {
	const canvas = colorArea.value;
	if (!canvas) return undefined;

	const cacheKey = `pos_${color.h}_${color.s}_${color.v}_${canvas.clientWidth}_${canvas.clientHeight}`;
	return memoizeColorConversion(() => {
		// Performance: Parse values once and cache
		const s = typeof color.s === "string" ? Number(color.s.replace("%", "")) : color.s;
		const v = typeof color.v === "string" ? Number(color.v.replace("%", "")) : color.v;
		
		// Performance: Use more efficient clamping
		const canvasWidth = canvas.clientWidth;
		const canvasHeight = canvas.clientHeight;
		
		const positionX = Math.max(-5, Math.min((s / 100) * (canvasWidth - 5), canvasWidth - 5));
		const positionY = Math.max(0, Math.min((1 - v / 100) * canvasHeight, canvasHeight));

		return { x: positionX, y: positionY };
	}, cacheKey);
}

function moveDown() {
	if (props.disabled) return;
	isMovingDown.value = true;
	setTimeout(() => {
		isMovingDown.value = false;
		colorType.value =
			colorType.value + 1 > colorTypes.value.length - 1
				? 0
				: colorType.value + 1;
		move();
		if (props.accessibility?.announcements?.announceFormat) {
			updateLiveRegion(`Color format changed to ${colorTypes.value[colorType.value].toUpperCase()}`);
		}
	}, 600);
}

function moveUp() {
	if (props.disabled) return;
	isMovingUp.value = true;
	setTimeout(() => {
		colorType.value =
			colorType.value - 1 < 0
				? colorTypes.value.length - 1
				: colorType.value - 1;
		isMovingUp.value = false;
		move();
		if (props.accessibility?.announcements?.announceFormat) {
			updateLiveRegion(`Color format changed to ${colorTypes.value[colorType.value].toUpperCase()}`);
		}
	}, 600);
}

/**
 * Updates the color value and optionally the color type
 */
function move(updateType = true) {
	const colorObj = divideCompleteColor(circleBackground.value);
	if (colorObj && isRgbaColor(colorObj)) {
		inputColor.value = getColor(colorObj);
		emit("update:modelValue", inputColor.value);
	}
	if (updateType) emit("update:type", colorTypes.value[colorType.value]);
}

// Enhanced keyboard navigation handlers with accessibility
function handleColorAreaKeyDown(event: KeyboardEvent) {
	if (props.disabled || !cursorColorArea.value || !colorArea.value) return;

	const step = props.accessibility?.keyboard?.colorAreaStep || 5;
	const currentLeft = parseInt(cursorColorArea.value.style.left || '0');
	const currentTop = parseInt(cursorColorArea.value.style.top || '0');
	let newLeft = currentLeft;
	let newTop = currentTop;

	switch (event.key) {
		case 'ArrowLeft':
			newLeft = Math.max(-5, currentLeft - step);
			break;
		case 'ArrowRight':
			newLeft = Math.min(colorArea.value.clientWidth - 5, currentLeft + step);
			break;
		case 'ArrowUp':
			newTop = Math.max(0, currentTop - step);
			break;
		case 'ArrowDown':
			newTop = Math.min(colorArea.value.clientHeight, currentTop + step);
			break;
		case 'Home':
			newLeft = -5;
			newTop = 0;
			break;
		case 'End':
			newLeft = colorArea.value.clientWidth - 5;
			newTop = colorArea.value.clientHeight;
			break;
		case 'PageUp':
			newTop = Math.max(0, currentTop - step * 5);
			break;
		case 'PageDown':
			newTop = Math.min(colorArea.value.clientHeight, currentTop + step * 5);
			break;
		default:
			return;
	}

	event.preventDefault();
	keyboardActive.value = true;
	cursorColorArea.value.style.left = newLeft + 'px';
	cursorColorArea.value.style.top = newTop + 'px';

	// Simulate color selection at new position
	const context = colorArea.value.getContext('2d');
	if (context) {
		const pixel = context.getImageData(
			Math.min(colorArea.value.clientWidth - 1, newLeft + 5),
			Math.min(colorArea.value.clientHeight - 1, newTop),
			1,
			1
		).data;
		circleBackground.value = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
		inputColor.value = getColor({
			r: pixel[0],
			g: pixel[1],
			b: pixel[2],
			a: pixel[3] / 255,
		});
		emit('update:modelValue', inputColor.value);
		
		if (props.accessibility?.keyboard?.announceChanges) {
			updateLiveRegion(currentColorDescription.value);
		}
	}
}

function handleSliderKeyDown(event: KeyboardEvent, sliderType: 'hue' | 'opacity') {
	if (props.disabled) return;
	
	const hueStep = props.accessibility?.keyboard?.hueStep || 10;
	const opacityStep = props.accessibility?.keyboard?.opacityStep || 0.05;
	const step = sliderType === 'hue' ? hueStep : opacityStep;
	let newValue = 0;

	keyboardActive.value = true;

	if (sliderType === 'hue') {
		const hsva = getHsvaColor();
		const currentHue = hsva.h;
		
		switch (event.key) {
			case 'ArrowLeft':
			case 'ArrowDown':
				newValue = Math.max(0, currentHue - step);
				break;
			case 'ArrowRight':
			case 'ArrowUp':
				newValue = Math.min(360, currentHue + step);
				break;
			case 'Home':
				newValue = 0;
				break;
			case 'End':
				newValue = 360;
				break;
			case 'PageUp':
				newValue = Math.min(360, currentHue + step * 5);
				break;
			case 'PageDown':
				newValue = Math.max(0, currentHue - step * 5);
				break;
			default:
				return;
		}

		// Update hue slider position
		if (cursorColorSlider.value) {
			const slider = cursorColorSlider.value.closest('.slider');
			if (slider) {
				const percentage = newValue / 360;
				const left = Math.min(slider.clientWidth - 10, Math.max(0, (slider.clientWidth - 10) * percentage));
				cursorColorSlider.value.style.left = left + 'px';
				const color = getPixelColor(slider, left);
				sliderColor.value = color;
				changeCanvasColor(color, sliderOpacity.value);
				updatedCircleColor();
				
				if (props.accessibility?.keyboard?.announceChanges) {
					updateLiveRegion(`Hue changed to ${Math.round(newValue)} degrees`);
				}
			}
		}
	} else {
		// Opacity slider
		const currentOpacity = sliderOpacity.value;
		
		switch (event.key) {
			case 'ArrowLeft':
			case 'ArrowDown':
				newValue = Math.max(0, currentOpacity - step);
				break;
			case 'ArrowRight':
			case 'ArrowUp':
				newValue = Math.min(1, currentOpacity + step);
				break;
			case 'Home':
				newValue = 0;
				break;
			case 'End':
				newValue = 1;
				break;
			case 'PageUp':
				newValue = Math.min(1, currentOpacity + step * 5);
				break;
			case 'PageDown':
				newValue = Math.max(0, currentOpacity - step * 5);
				break;
			default:
				return;
		}

		// Update opacity slider position
		if (cursorOpacitySlider.value) {
			const slider = cursorOpacitySlider.value.closest('.slider');
			if (slider) {
				const opacityFull = slider.clientWidth - 10;
				const left = opacityFull * newValue;
				cursorOpacitySlider.value.style.left = left + 'px';
				sliderOpacity.value = newValue;
				changeCanvasColor(sliderColor.value, newValue);
				updatedCircleColor();
				
				if (props.accessibility?.keyboard?.announceChanges) {
					updateLiveRegion(`Opacity changed to ${Math.round(newValue * 100)}%`);
				}
			}
		}
	}

	event.preventDefault();
}

// Global keyboard handler for component navigation
function handleGlobalKeyDown(event: KeyboardEvent) {
	if (props.disabled) return;

	if (event.key === 'Tab') {
		keyboardActive.value = false;
		return;
	}

	// Handle arrow key navigation between main areas
	if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) {
		const target = event.target as HTMLElement;
		
		// If focus is on color area, handle color area navigation
		if (target.closest('.color-area') || target === cursorColorArea.value) {
			focusedElement.value = 'area';
			handleColorAreaKeyDown(event);
			return;
		}
		
		// If focus is on hue slider, handle hue slider navigation
		if (target === cursorColorSlider.value || target.closest('.slider:not(.slider-opacity)')) {
			focusedElement.value = 'hue';
			handleSliderKeyDown(event, 'hue');
			return;
		}
		
		// If focus is on opacity slider, handle opacity slider navigation
		if (target === cursorOpacitySlider.value || target.closest('.slider-opacity')) {
			focusedElement.value = 'opacity';
			handleSliderKeyDown(event, 'opacity');
			return;
		}
	}

	// Handle format switching
	const target = event.target as HTMLElement;
	if (target.closest(`[data-format-selector]`) && handleFormatKeyDown) {
		focusedElement.value = 'format';
		handleFormatKeyDown(event);
	}
}

// Preset colors functionality
const presetColors = computed((): PresetColor[] => {
	const defaultPresets: PresetColor[] = [
		{ color: '#ff0000', name: 'Red', description: 'Pure red color' },
		{ color: '#00ff00', name: 'Green', description: 'Pure green color' },
		{ color: '#0000ff', name: 'Blue', description: 'Pure blue color' },
		{ color: '#ffff00', name: 'Yellow', description: 'Pure yellow color' },
		{ color: '#ff00ff', name: 'Magenta', description: 'Pure magenta color' },
		{ color: '#00ffff', name: 'Cyan', description: 'Pure cyan color' },
		{ color: '#ffffff', name: 'White', description: 'Pure white color' },
		{ color: '#000000', name: 'Black', description: 'Pure black color' }
	];

	return props.accessibility?.presetColors || defaultPresets;
});

// Preset color selection
function selectPresetColor(presetColor: PresetColor) {
	if (props.disabled) return;
	
	inputColor.value = presetColor.color;
	calculateCursor();
	emit('update:modelValue', presetColor.color);
	
	if (props.accessibility?.announcements?.announceValue) {
		updateLiveRegion(`Selected preset color: ${presetColor.name}. ${presetColor.description || ''}`);
	}
}

// Focus event handlers
function handleFocus(event: FocusEvent) {
	keyboardActive.value = true;
	emit('focus', event);
}

function handleBlur(event: FocusEvent) {
	keyboardActive.value = false;
	focusedElement.value = null;
	emit('blur', event);
}

// Input validation
function validateColorInput(value: string): ColorValidationResult {
	try {
		// Basic validation based on format
		const currentFormat = colorTypes.value[colorType.value];
		
		if (currentFormat === 'hexa') {
			if (!/^#?[0-9a-fA-F]{3,8}$/.test(value)) {
				return {
					isValid: false,
					errorMessage: 'Invalid hex color format. Use #RRGGBB or #RRGGBBAA',
					suggestion: '#ffffff'
				};
			}
		}
		
		return { isValid: true };
	} catch {
		return {
			isValid: false,
			errorMessage: 'Invalid color format',
			suggestion: getWhite()
		};
	}
}
</script>

<template>
	<BCard
		:id="colorPickerId"
		class="p-base flex flex-col gap-sm"
		:class="{ 
			'no-shadow': noShadow,
			'high-contrast': highContrast,
			'keyboard-active': keyboardActive
		}"
		v-bind="ariaAttributes.colorPickerAria.value"
		@keydown="handleGlobalKeyDown"
		@focus="handleFocus"
		@blur="handleBlur">
		
		<!-- Color area with enhanced accessibility -->
		<div class="relative" :aria-describedby="`${colorAreaId}-desc`">
			<span
				class="cursor cursor-area"
				ref="cursorColorArea"
				v-bind="ariaAttributes.colorAreaAria.value"
				@mousedown="startDraggingColorArea"
				@touchstart="startDraggingColorAreaTouch"
				@keydown="handleColorAreaKeyDown" />
			<canvas
				class="color-area"
				ref="colorArea"
				@mousedown="startDraggingColorArea"
				@touchstart="startDraggingColorAreaTouch" />
			<div :id="`${colorAreaId}-desc`" class="sr-only">
				Color saturation and brightness selection area. Use arrow keys to adjust color, Home/End for corners, Page Up/Down for large steps.
			</div>
		</div>

		<!-- Color preview and sliders -->
		<div class="flex items-center gap-sm">
			<div
				class="color-circle"
				:style="{ background: circleBackground }"
				:aria-label="`Current color preview: ${currentColorName}`" />
			<div class="flex flex-col gap-xs w-full">
				<!-- Hue slider -->
				<div
					class="slider"
					:aria-describedby="`${hueSliderid}-desc`"
					@mousedown="startDraggingColorSlider"
					@touchstart="startDraggingColorSliderTouch">
					<span
						ref="cursorColorSlider"
						class="cursor cursor-slider"
						v-bind="ariaAttributes.hueSliderAria.value"
						@mousedown="startDraggingColorSlider"
						@touchstart="startDraggingColorSliderTouch"
						@keydown="(e) => handleSliderKeyDown(e, 'hue')" />
					<div :id="`${hueSliderid}-desc`" class="sr-only">
						Hue slider. Use arrow keys or drag to adjust hue. Home for 0 degrees, End for 360 degrees.
					</div>
				</div>
				
				<!-- Opacity slider -->
				<div
					class="slider-opacity slider flex justify-end"
					:aria-describedby="`${opacitySliderid}-desc`"
					@mousedown="startDraggingOpacitySlider"
					@touchstart="startDraggingOpacitySliderTouch">
					<span
						class="cursor cursor-slider"
						ref="cursorOpacitySlider"
						v-bind="ariaAttributes.opacitySliderAria.value"
						@mousedown="startDraggingOpacitySlider"
						@touchstart="startDraggingOpacitySliderTouch"
						@keydown="(e) => handleSliderKeyDown(e, 'opacity')" />
					<div :id="`${opacitySliderid}-desc`" class="sr-only">
						Opacity slider. Use arrow keys or drag to adjust opacity. Home for 0%, End for 100%.
					</div>
				</div>
			</div>
		</div>

		<!-- Color input and format selection -->
		<div class="flex items-center gap-sm">
			<BInput
				v-model="inputColor"
				v-bind="ariaAttributes.textInputAria.value"
				@update:model-value="calculateCursor"
				@keydown="handleGlobalKeyDown"
				text-align="center"
				class="flex-1"
				:disabled="disabled"
				:aria-describedby="`${inputId}-desc`" />
			
			<!-- Format selector with accessibility -->
			<div 
				class="flex items-center gap-xxs"
				v-bind="ariaAttributes.formatSelectorAria.value"
				data-format-selector>
				<div
					class="flex flex-col items-center overflow-hidden relative h-[1em] w-fit text-neutral-interaction-default"
					:aria-describedby="`${formatButtonsId}-desc`">
					<p
						v-show="isMovingDown"
						class="font-bold slide-down"
						aria-hidden="true">
						{{
							colorTypes[
								colorType + 1 > colorTypes.length - 1 ? 0 : colorType + 1
							].toUpperCase()
						}}
					</p>
					<p
						class="font-bold"
						:class="{ 'slide-down': isMovingDown, 'slide-up': isMovingUp }"
						:aria-label="`Current format: ${colorTypes[colorType].toUpperCase()}`">
						{{ colorTypes[colorType].toUpperCase() }}
					</p>
					<p
						v-show="isMovingUp"
						class="font-bold slide-up"
						aria-hidden="true">
						{{
							colorTypes[
								colorType - 1 < 0 ? colorTypes.length - 1 : colorType - 1
							].toUpperCase()
						}}
					</p>
				</div>
				<div class="flex flex-col">
					<BIcon
						name="arrow_drop_up"
						class="cursor-pointer flex items-center h-[.8em] text-neutral-interaction-default"
						:class="{ 'opacity-50 cursor-not-allowed': disabled }"
						@click="moveUp"
						role="button"
						:aria-label="`Change to ${colorTypes[colorType - 1 < 0 ? colorTypes.length - 1 : colorType - 1].toUpperCase()} format`"
						:tabindex="disabled ? -1 : 0"
						:aria-disabled="disabled" />
					<BIcon
						name="arrow_drop_down"
						class="cursor-pointer flex items-center h-[.8em] text-neutral-interaction-default"
						:class="{ 'opacity-50 cursor-not-allowed': disabled }"
						@click="moveDown"
						role="button"
						:aria-label="`Change to ${colorTypes[colorType + 1 > colorTypes.length - 1 ? 0 : colorType + 1].toUpperCase()} format`"
						:tabindex="disabled ? -1 : 0"
						:aria-disabled="disabled" />
				</div>
			</div>
		</div>

		<!-- Color name display -->
		<div v-if="showColorName && currentColorName" class="text-sm text-neutral-content-moderate">
			<span class="font-medium">Color:</span> {{ currentColorName }}
		</div>

		<!-- Contrast information -->
		<div v-if="contrastInfo" class="text-sm" :class="{
			'text-success-content-default': contrastInfo.level === 'AAA',
			'text-primary-content-default': contrastInfo.level === 'AA',
			'text-warning-content-default': contrastInfo.level === 'A',
			'text-danger-content-default': contrastInfo.level === 'fail'
		}">
			<span class="font-medium">Contrast:</span> {{ contrastInfo.ratio.toFixed(1) }} ({{ contrastInfo.level }}) - {{ contrastInfo.description }}
		</div>

		<!-- Preset colors -->
		<div v-if="presetColors.length > 0" class="flex flex-col gap-xs">
			<div class="text-sm font-medium text-neutral-content-default">Preset Colors</div>
			<div 
				class="flex flex-wrap gap-xs"
				role="group"
				:aria-label="'Preset color options'"
				:id="presetColorsId">
				<button
					v-for="(preset, index) in presetColors"
					:key="index"
					:style="{ backgroundColor: preset.color }"
					class="w-6 h-6 rounded-xs border border-neutral-border-default cursor-pointer focus:ring-2 focus:ring-primary-interaction-default focus:outline-none"
					:class="{ 'opacity-50 cursor-not-allowed': disabled }"
					:aria-label="`Select ${preset.name}${preset.description ? ': ' + preset.description : ''}`"
					:disabled="disabled"
					@click="selectPresetColor(preset)"
					@keydown.enter="selectPresetColor(preset)"
					@keydown.space.prevent="selectPresetColor(preset)" />
			</div>
		</div>

		<!-- Hidden descriptions for screen readers -->
		<div :id="`${inputId}-desc`" class="sr-only">
			Color value input in {{ colorTypes[colorType].toUpperCase() }} format. Enter color values directly or use the color picker above.
		</div>
		
		<div :id="`${formatButtonsId}-desc`" class="sr-only">
			Color format selector. Use up and down arrow keys or click arrows to change between HEX, HSL, HWB, HSV, and RGB formats.
		</div>

		<!-- Live region for accessibility announcements -->
		<div
			ref="liveRegion"
			:id="liveRegionId"
			aria-live="polite"
			aria-atomic="true"
			class="sr-only" />
	</BCard>
</template>

<style scoped>
@import "../../assets/main.css";

.slider {
	@apply w-full h-[8px] rounded-xs relative cursor-pointer;
	background: linear-gradient(
		to right,
		hsl(0, 100%, 50%),
		hsl(60, 100%, 50%),
		hsl(120, 100%, 50%),
		hsl(180, 100%, 50%),
		hsl(240, 100%, 50%),
		hsl(300, 100%, 50%),
		hsl(360, 100%, 50%)
	);
}

.slider-opacity {
	background: linear-gradient(to right, #ffffff 0%, hsl(0, 100%, 50%));
}

.color-area {
	@apply w-full h-[8em] relative cursor-crosshair;
}

.cursor-area {
	@apply top-0 left-[-5px] border-xxs border-neutral-border-default;
}

.cursor {
	@apply cursor-grab w-[12px] h-[12px] absolute z-1 bg-neutral-interaction-default translate-y-[-50%] select-none;
	border-radius: var(--rounded-base);
	transition: box-shadow 0.2s ease;
}

.cursor-slider {
	@apply top-[50%];
}

.color-circle {
	@apply h-[2em] w-[2.2em] rounded-full border-xxs border-neutral-border-default;
}

.slide-up {
	animation: slide-up 0.6s ease;
}

.slide-down {
	animation: slide-down 0.6s ease;
}

@keyframes slide-up {
	0% {
		transform: translateY(0%);
	}
	100% {
		transform: translateY(-100%);
	}
}

@keyframes slide-down {
	0% {
		transform: translateY(-100%);
	}
	100% {
		transform: translateY(0%);
	}
}

.no-shadow {
	@apply shadow-none border-none;
}

.sr-only {
	@apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
	clip: rect(0, 0, 0, 0);
}

/* Enhanced focus styles for accessibility */
.cursor:focus,
.cursor:focus-visible {
	@apply outline-none;
	box-shadow: 
		0 0 0 2px var(--color-primary-interaction-default), 
		0 0 0 4px var(--color-neutral-background-default);
}

[role="button"]:focus,
[role="button"]:focus-visible,
[tabindex]:focus,
[tabindex]:focus-visible {
	@apply outline-none;
	box-shadow: 
		0 0 0 2px var(--color-primary-interaction-default), 
		0 0 0 3px var(--color-neutral-background-default);
}

/* Keyboard navigation indicators */
.keyboard-active .cursor:focus {
	box-shadow: 
		0 0 0 3px var(--color-primary-interaction-default), 
		0 0 0 5px var(--color-neutral-background-default);
}

/* High contrast mode support */
.high-contrast {
	@apply border-2 border-solid;
}

.high-contrast .cursor {
	@apply border-2 border-solid border-black;
}

.high-contrast .slider,
.high-contrast .color-area {
	@apply border border-solid border-neutral-border-strong;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.slide-up,
	.slide-down {
		animation: none;
	}
	
	.cursor {
		transition: none;
	}
}

/* Disabled state */
[aria-disabled="true"] {
	@apply opacity-50 cursor-not-allowed;
	pointer-events: none;
}

/* Color format buttons hover states */
[role="button"]:hover:not([aria-disabled="true"]) {
	@apply text-primary-interaction-hover;
}

[role="button"]:active:not([aria-disabled="true"]) {
	@apply text-primary-interaction-pressed;
}

/* Preset color button focus states */
.preset-color-button:focus-visible {
	@apply outline-none;
	box-shadow: 
		0 0 0 2px var(--color-primary-interaction-default), 
		0 0 0 4px var(--color-neutral-background-default);
}
</style>