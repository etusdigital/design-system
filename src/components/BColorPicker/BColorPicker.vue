<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from "vue";
import { useThrottleFn } from "@vueuse/core";
import { useAriaAttributes, useScreenReader, useKeyboardNavigation } from "#composables";
import { useColorPicker } from "#composables/useColorPicker";
import BInput from "../BInput/BInput.vue";
import BIcon from "../BIcon/BIcon.vue";
import BCard from "../BCard/BCard.vue";
import type {
	BColorPickerProps,
	BColorPickerEmits,
	ColorType,
	RgbaColor,
	PositionEvent,
	ColorContrastInfo,
	PresetColor,
	ColorValidationResult,
	ColorPickerAccessibilityState,
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

// Use the optimized color picker composable
const {
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
	// Methods
	changeCanvasColor,
	updateColor,
	updateColorSlider,
	updateOpacitySlider,
	calculateCursor,
	getHsvaColor,
	getCurrentRgbaColor,
	cleanup,
	// Computed
	currentColorDescription,
	currentColorName,
	contrastInfo,
	// Utils
	colorSpaceUtils,
	getWhite
} = useColorPicker(props, emit);

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

// Keyboard navigation and focus management
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

// Format navigation with keyboard support
let handleFormatKeyDown: ((event: KeyboardEvent) => boolean) | null = null;
let activeFormatIndex: Ref<number> | null = null;

// Initialize format navigation
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

// Throttled event handlers for better performance
const throttledUpdateColor = useThrottleFn((event: PositionEvent) => {
	updateColor(event);
}, 16); // ~60fps

const throttledUpdateColorTouch = useThrottleFn((event: TouchEvent) => {
	updateColorTouch(event);
}, 16);

// Optimized interaction handlers
const handleInteractionEnd = () => {
	isDraggingColorSlider.value = false;
	isDraggingOpacitySlider.value = false;
	isDraggingColorArea.value = false;
};

// Touch event handlers
function updateColorTouch(event: TouchEvent) {
	if (event.touches.length > 0) {
		updateColor(event.touches[0]);
	}
}

function startDraggingColorAreaTouch(event: TouchEvent) {
	if (event.touches.length > 0) {
		startDraggingColorArea(event.touches[0]);
	}
}

function startDraggingOpacitySliderTouch(event: TouchEvent) {
	if (event.touches.length > 0) {
		startDraggingOpacitySlider(event.touches[0]);
	}
}

function startDraggingColorSliderTouch(event: TouchEvent) {
	if (event.touches.length > 0) {
		startDraggingColorSlider(event.touches[0]);
	}
}

// Optimized interaction handlers
function startDraggingColorSlider(event: PositionEvent) {
	if (props.disabled) return;
	isDraggingColorSlider.value = true;
	updateColorSlider(event);
	focusedElement.value = 'hue';
	keyboardActive.value = false;
}

function startDraggingOpacitySlider(event: PositionEvent) {
	if (props.disabled) return;
	isDraggingOpacitySlider.value = true;
	updateOpacitySlider(event);
	focusedElement.value = 'opacity';
	keyboardActive.value = false;
}

function startDraggingColorArea(event: PositionEvent) {
	if (props.disabled) return;
	isDraggingColorArea.value = true;
	updateColor(event);
	focusedElement.value = 'area';
	keyboardActive.value = false;
}

onMounted(() => {
	// Use throttled event handlers for better performance
	window.addEventListener("mousemove", throttledUpdateColor, { passive: true });
	window.addEventListener("mouseup", handleInteractionEnd);
	window.addEventListener("touchmove", throttledUpdateColorTouch, { passive: true });
	window.addEventListener("touchend", handleInteractionEnd);
	
	// Initialize color picker with optimized timing
	changeCanvasColor();
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
	// Cleanup event handlers
	window.removeEventListener("mousemove", throttledUpdateColor);
	window.removeEventListener("mouseup", handleInteractionEnd);
	window.removeEventListener("touchmove", throttledUpdateColorTouch);
	window.removeEventListener("touchend", handleInteractionEnd);
	
	// Cleanup composable resources
	cleanup();
});

watch(
	() => props.type,
	() => {
		const index = colorTypes.value.findIndex((x) => x === props.type);
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
		if (inputColor.value !== props.modelValue) {
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
	const rgba = getCurrentRgbaColor();
	if (rgba) {
		inputColor.value = colorSpaceUtils.convertToFormat(rgba, colorTypes.value[colorType.value] as ColorType);
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

	// Update color based on new position
	const context = colorArea.value.getContext('2d');
	if (context) {
		const pixel = context.getImageData(
			Math.min(colorArea.value.clientWidth - 1, newLeft + 5),
			Math.min(colorArea.value.clientHeight - 1, newTop),
			1,
			1
		).data;
		circleBackground.value = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
		const rgba = getCurrentRgbaColor();
		if (rgba) {
			inputColor.value = colorSpaceUtils.convertToFormat(rgba, colorTypes.value[colorType.value] as ColorType);
			emit('update:modelValue', inputColor.value);
		}
		
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

		// Update hue slider position and color
		if (cursorColorSlider.value) {
			const slider = cursorColorSlider.value.closest('.slider');
			if (slider) {
				const percentage = newValue / 360;
				const left = Math.min(slider.clientWidth - 10, Math.max(0, (slider.clientWidth - 10) * percentage));
				cursorColorSlider.value.style.left = left + 'px';
				
				// Force color update
				updateColorSlider({ clientX: left, clientY: 0 } as PositionEvent);
				
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
				
				// Update color with new opacity
				const rgba = getCurrentRgbaColor();
				if (rgba) {
					inputColor.value = colorSpaceUtils.convertToFormat(rgba, colorTypes.value[colorType.value] as ColorType);
					emit('update:modelValue', inputColor.value);
				}
				
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