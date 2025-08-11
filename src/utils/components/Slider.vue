<script setup lang="ts">
	import { getPosition } from "../index";
	import { ref, shallowRef, onMounted, onBeforeUnmount, watch, computed, markRaw } from "vue";
	import { blendColors } from "../index";
	import { useScreenReader } from "#composables";

	/**
	 * Mouse or touch event types for slider interactions
	 */
	type SliderEvent = MouseEvent | TouchEvent | { clientX: number; clientY: number };

	/**
	 * Extracts client coordinates from various event types
	 */
	function getEventCoordinates(event: SliderEvent): { clientX: number; clientY: number } {
		if ('clientX' in event && 'clientY' in event) {
			return { clientX: event.clientX, clientY: event.clientY };
		} else if ('touches' in event && event.touches.length > 0) {
			return { clientX: event.touches[0].clientX, clientY: event.touches[0].clientY };
		}
		return { clientX: 0, clientY: 0 };
	}

	/**
	 * Style object for slider steps
	 */
	type StepStyle = Record<string, string | undefined>;

	/**
	 * Configuration for slider step values
	 */
	export interface SliderStep {
		/** The step value as a percentage (0-1) */
		value: number;
		/** Optional label for the step */
		label?: string;
	}

	/**
	 * Color configuration for slider fills
	 */
	export type SliderFillColor = string;

	/**
	 * Slider value type - array of numbers for single or range sliders
	 */
	export type SliderValue = number[];

	/**
	 * Accessibility configuration for the slider component
	 */
	export interface SliderAccessibilityConfig {
		/** Whether to announce value changes */
		announceChanges?: boolean;
		/** Custom value formatter for announcements */
		valueFormatter?: (value: number, unit: string) => string;
		/** Whether to use live regions for announcements */
		useLiveRegions?: boolean;
	}

	/**
	 * Props for the internal Slider component
	 */
	export interface SliderProps {
		/** Current slider values */
		modelValue?: SliderValue;
		/** Size variant of the slider */
		size?: "small" | "medium" | "large";
		/** Maximum value for the slider range */
		max?: number;
		/** Unit to display in tooltips */
		unit?: string;
		/** Primary color for the slider */
		color?: string;
		/** Whether to show value tooltips */
		showTooltip?: boolean;
		/** Whether the slider is disabled */
		disabled?: boolean;
		/** Whether to render vertically */
		vertical?: boolean;
		/** Array of colors for gradient fills */
		fillColors?: SliderFillColor[];
		/** Whether this is a range slider */
		isRange?: boolean;
		/** Step values for the slider */
		steps?: number[] | SliderStep[];
		/** Whether to use neutral background */
		neutralBackground?: boolean;
		/** ARIA label for accessibility */
		ariaLabel?: string;
		/** ID for minimum slider handle */
		minSliderId?: string;
		/** ID for maximum slider handle */
		maxSliderId?: string;
		/** ARIA label for minimum handle */
		minHandleLabel?: string;
		/** ARIA label for maximum handle */
		maxHandleLabel?: string;
		/** Accessibility configuration */
		accessibilityConfig?: SliderAccessibilityConfig;
	}

	const props = withDefaults(
		defineProps<SliderProps>(),
		{
			modelValue: undefined,
			max: 0,
			size: "small",
			unit: "",
			color: "",
			showTooltip: false,
			disabled: false,
			vertical: false,
			isRange: false,
			steps: undefined,
			neutralBackground: false,
			ariaLabel: '',
			minSliderId: '',
			maxSliderId: '',
			minHandleLabel: '',
			maxHandleLabel: '',
			accessibilityConfig: () => ({}),
		}
	);

	/**
	 * Events emitted by the Slider component
	 */
	export interface SliderEmits {
		"update:modelValue": [value: SliderValue];
	}

	const emit = defineEmits<SliderEmits>();

	// Accessibility composables
	const screenReader = useScreenReader();

	onMounted(() => {
		// Add passive listeners for better performance
		window.addEventListener("mousemove", updateCursor, { passive: true });
		window.addEventListener("mouseup", stopDragging);
		window.addEventListener("touchmove", updateCursorTouch, { passive: true });
		// Fixed typo: touhend -> touchend
		window.addEventListener("touchend", stopDragging);
		calculateCursor();
	});

	onBeforeUnmount(() => {
		window.removeEventListener("mousemove", updateCursor);
		window.removeEventListener("mouseup", stopDragging);
		window.removeEventListener("touchmove", updateCursorTouch);
		// Fixed typo: touhend -> touchend
		window.removeEventListener("touchend", stopDragging);
	});

	watch(
		() => props.modelValue,
		() => {
			percentage.value = getPercentage();
			calculateCursor();
			const model = getModel();
			if (
				!props.modelValue ||
				!props.modelValue.length ||
				model.find(
					(value, index) => props.modelValue && value != props.modelValue[index]
				) != undefined
			)
				emit("update:modelValue", model);
		}
	);

	watch(
		() => props.vertical,
		() => {
			percentage.value = getPercentage();
			setTimeout(() => {
				calculateCursor();
			}, 200);
		}
	);

	watch(
		() => props.size,
		() => {
			percentage.value = getPercentage();
			setTimeout(() => {
				calculateCursor();
			}, 100);
		}
	);

	// Watch for model changes to update ARIA labels
	watch(
		() => percentage.value,
		() => {
			// Update ARIA values for handles (will be reactive in template)
		},
		{ deep: true }
	);

	watch(
		() => props.max,
		() => {
			emit("update:modelValue", getModel());
		}
	);

	const percentage = ref(getPercentage());
	const isDraggingSlider = ref([false]);
	if (props.isRange) isDraggingSlider.value.push(false);
	const cursors = ref<HTMLSpanElement[]>();
	const fillBar = ref<HTMLDivElement>();
	const slider = ref<HTMLDivElement>();
	
	// Keyboard navigation state
	const focusedHandle = ref(0); // 0 = first handle, 1 = second handle (for range)
	const keyboardMode = ref(false);

	// Generate unique IDs if not provided
	const sliderId = props.minSliderId || `slider-${Date.now()}`;
	const sliderLabelId = `${sliderId}-label`;
	const instructionsId = `${sliderId}-instructions`;

	// Initialize focused handle based on range type
	onMounted(() => {
		focusedHandle.value = 0;
	});

	const tooltipText = computed((): string => {
		const min = Math.min(...percentage.value);
		const max = Math.max(...percentage.value);

		if (!props.isRange) return getTooltipText(max);
		return `${getTooltipText(min)} - ${getTooltipText(max)}`;
	});

	const background = computed((): string => {
		if (props.neutralBackground || !props.color) return "";
		return blendColors(props.color);
	});

	// Computed accessibility values
	const minHandleValue = computed(() => {
		if (!props.isRange) return percentage.value[0];
		return Math.min(...percentage.value);
	});

	const maxHandleValue = computed(() => {
		if (!props.isRange) return percentage.value[0];
		return Math.max(...percentage.value);
	});

	const getActualValue = (percentageVal: number): number => {
		return props.max ? percentageVal * props.max : percentageVal * 100;
	};

	const formatValueForAria = (percentageVal: number): string => {
		const actualValue = getActualValue(percentageVal);
		const unit = props.max ? props.unit : props.unit || '%';
		return `${actualValue.toFixed(1)}${unit}`;
	};

	const ariaInstructions = computed(() => {
		let instructions = 'Use arrow keys to adjust value. ';
		if (props.isRange) {
			instructions += 'Tab to switch between minimum and maximum handles. ';
		}
		instructions += 'Home and End keys jump to minimum and maximum values.';
		if (props.steps) instructions += ' Values snap to predefined steps.';
		return instructions;
	});
	
	// Generate unique handle IDs
	const getHandleId = (index: number): string => {
		if (props.isRange) {
			return index === 0 
				? (props.minSliderId || `${sliderId}-min`)
				: (props.maxSliderId || `${sliderId}-max`);
		}
		return sliderId;
	};

	const getHandleLabel = (index: number): string => {
		// Use provided handle labels if available
		if (props.isRange) {
			if (index === 0 && props.minHandleLabel) return props.minHandleLabel;
			if (index === 1 && props.maxHandleLabel) return props.maxHandleLabel;
		}
		
		// Fall back to aria label if provided
		if (props.ariaLabel) return props.ariaLabel;
		
		// Generate default labels
		if (props.isRange) {
			const value = formatValueForAria(percentage.value[index]);
			return index === 0 ? `Minimum value: ${value}` : `Maximum value: ${value}`;
		}
		
		const value = formatValueForAria(percentage.value[0] || 0);
		return `Value: ${value}`;
	};
	
	function shouldShowKeyboardFocus(handleIndex: number): boolean {
		return keyboardMode.value && focusedHandle.value === handleIndex;
	}
	
	function handleFocus(handleIndex: number): void {
		focusedHandle.value = handleIndex;
		keyboardMode.value = true;
		
		// Announce which handle is focused for range sliders
		if (props.isRange && percentage.value.length === 2) {
			const config = props.accessibilityConfig || {};
			if (config.announceChanges !== false) {
				const handleName = handleIndex === 0 ? 'minimum' : 'maximum';
				const value = formatValueForAria(percentage.value[handleIndex]);
				screenReader.announcePolitely(`Focused on ${handleName} handle: ${value}`);
			}
		}
	}

	function handleBlur(): void {
		keyboardMode.value = false;
	}

	/**
	 * Gets the CSS style for a slider step
	 * @param step - The step value (0-1)
	 * @returns CSS style object for the step
	 */
	function getStepStyle(step: number): StepStyle {
		const value = step * 100 + "%";
		const style: StepStyle = {};

		if (props.vertical) style.bottom = value;
		else style.left = value;

		if (props.disabled) return style;

		if (props.fillColors && props.fillColors.length) {
			const min = Math.min(...percentage.value);
			const total = Math.max(...percentage.value) - min;
			const stepPercentage = step - min;
			const colorRange = total / props.fillColors.length;

			const background = props.fillColors.find((color: SliderFillColor, i: number) => {
				const startRange = i * colorRange;
				const endRange = (i + 1) * colorRange;

				if (
					stepPercentage >= startRange &&
					stepPercentage <= endRange &&
					props.fillColors
				) {
					return props.fillColors[i];
				}
				return undefined;
			});

			style.background = background;
		} else if (props.color && betweenPercentage(step)) {
			style.background = props.color;
		}

		return style;
	}

	/**
	 * Checks if a value is between the current percentage range
	 * @param value - The value to check (0-1)
	 * @returns Whether the value is within the current range
	 */
	function betweenPercentage(value: number): boolean {
		const max = Math.max(...percentage.value);
		const min = Math.min(...percentage.value);
		const actualValue = value;
		return actualValue <= max && actualValue >= min;
	}

	/**
	 * Formats a value for tooltip display
	 * @param value - The percentage value (0-1)
	 * @returns Formatted string with value and unit
	 */
	function getTooltipText(value: number): string {
		const unit = props.max ? props.unit : props.unit || "%";
		return `${((props.max || 100) * value).toFixed(1) + unit}`;
	}

	/**
	 * Stops all dragging operations
	 */
	function stopDragging(): void {
		isDraggingSlider.value = isDraggingSlider.value.map(() => false);
	}

	/**
	 * Converts model values to percentage values (0-1)
	 * @returns Array of percentage values
	 */
	function getPercentage(): number[] {
		const percentage = [0, 0];
		props.modelValue?.forEach((value: number, index: number) => {
			let actualValue = value;
			if (props.max) actualValue = value / props.max;
			percentage[index] = getStepPercentage(
				Math.min(1, Math.max(0, actualValue))
			);
		});
		return percentage;
	}

	/**
	 * Converts percentage values back to model values
	 * @returns Array of model values
	 */
	function getModel(): SliderValue {
		const model = [0, 0];
		percentage.value.forEach((value: number, index: number) => {
			let actualValue = value;
			if (props.max) actualValue = value * props.max;
			model[index] = actualValue;
		});
		return model;
	}

	/**
	 * Snaps a value to the nearest step if steps are defined
	 * @param value - The input value (0-1)
	 * @returns The snapped value or original value if no steps
	 */
	function getStepPercentage(value: number): number {
		if (!props.steps || !props.steps.length) return value;

		// Handle both number[] and SliderStep[] formats
		const stepValues = props.steps.map(step => 
			typeof step === 'number' ? step : step.value
		);

		return stepValues.reduce((prev: number, curr: number) => {
			return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
		});
	}

	/**
	 * Starts dragging from a touch event
	 * @param event - The touch event
	 */
	function startDraggingTouch(event: TouchEvent): void {
		startDragging(event.touches[0]);
	}

	/**
	 * Starts dragging a specific slider handle from touch
	 * @param event - The touch event
	 * @param index - The handle index
	 */
	function startDraggingSliderTouch(event: TouchEvent, index: number): void {
		startDraggingSlider(event.touches[0], index);
	}

	/**
	 * Updates cursor position from touch event
	 * @param event - The touch event
	 */
	function updateCursorTouch(event: TouchEvent): void {
		updateCursor(event.touches[0]);
	}

	/**
	 * Starts dragging the slider from a mouse/touch event
	 * @param event - The input event
	 */
	function startDragging(event: SliderEvent): void {
		if (!slider.value || !cursors.value) return;

		let closestCursorIndex = 0;
		const eventCoords = getEventCoordinates(event);
		const cursorPosition = getPosition(eventCoords, cursors.value[0], slider.value);
		let closestDistance = Infinity;
		if (props.vertical) {
			const cursorPositionY = cursorPosition.y;

			cursors.value.forEach((cursor, index) => {
				const cursorBottom = Number(cursor.style.bottom.replace("px", ""));
				const distance = Math.abs(cursorBottom - cursorPositionY);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestCursorIndex = index;
				}
			});
		} else {
			const cursorPositionX = cursorPosition.x;

			cursors.value.forEach((cursor, index) => {
				const cursorLeft = cursor.offsetLeft;
				const distance = Math.abs(cursorLeft - cursorPositionX);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestCursorIndex = index;
				}
			});
		}

		startDraggingSlider(event, closestCursorIndex);
	}

	/**
	 * Starts dragging a specific slider handle
	 * @param event - The input event
	 * @param index - The handle index
	 */
	function startDraggingSlider(event: SliderEvent, index: number): void {
		if (!cursors.value) return;
		stopDragging();
		isDraggingSlider.value[index] = true;
		updateSlider(
			event,
			cursors.value[index],
			isDraggingSlider.value[index],
			index
		);
	}

	/**
	 * Updates cursor positions based on current dragging state
	 * @param event - The input event
	 */
	function updateCursor(event: SliderEvent): void {
		isDraggingSlider.value.forEach((value: boolean, index: number) => {
			if (!cursors.value) return;
			updateSlider(event, cursors.value[index], value, index);
		});
	}

	/**
	 * Updates a specific slider handle position
	 * @param event - The input event
	 * @param cursor - The cursor element
	 * @param isDragging - Whether this cursor is being dragged
	 * @param index - The cursor index
	 */
	function updateSlider(
		event: SliderEvent,
		cursor: HTMLSpanElement | undefined,
		isDragging: boolean,
		index = 0
	): void {
		if (!isDragging || !cursor || !slider.value) return;

		let percentageValue = 0;
		const eventCoords = getEventCoordinates(event);
		const clamped = getPosition(eventCoords, cursor, slider.value);
		if (props.vertical) {
			const clampedBottom = clamped.y;
			const height = slider.value.clientHeight - cursor.clientHeight / 2;
			percentageValue = getStepPercentage(clampedBottom / height);
		} else {
			const clampedLeft = clamped.x;
			const width = slider.value.clientWidth - cursor.clientWidth / 2;
			percentageValue = getStepPercentage(clampedLeft / width);
		}
		changeFillBarPosition();
		percentage.value[index] = percentageValue;
		emit("update:modelValue", getModel());
	}

	/**
	 * Calculates and updates cursor positions based on current percentage values
	 */
	function calculateCursor(): void {
		cursors.value?.forEach((cursor, index) => {
			if (!cursor || !slider.value) return;

			if (props.vertical) {
				const height = slider.value.clientHeight;
				const bottom = Math.min(
					height,
					Math.max(0, height * percentage.value[index])
				);
				const borderWidth =
					Number(cursor.style.borderWidth.replace("px", "")) / 2;
				cursor.style.bottom =
					bottom - cursor.clientHeight / 3 - borderWidth + "px";

				cursor.style.left = "50%";
			} else {
				const width = slider.value.clientWidth;
				const left = Math.min(
					width,
					Math.max(0, width * percentage.value[index])
				);
				// Safely get border width from computed styles or use fallback
				const computedStyle = getComputedStyle(cursor);
				const borderWidthStr = computedStyle.getPropertyValue('--border-width-xs') || '2px';
				const borderWidth = Number(borderWidthStr.replace('px', '')) / 2;
				cursor.style.left = left - cursor.clientWidth / 3 - borderWidth + "px";

				cursor.style.bottom = "50%";
			}
		});
		changeFillBarPosition();
	}

	/**
	 * Updates the fill bar position based on cursor positions
	 */
	function changeFillBarPosition(): void {
		if (!fillBar.value || !cursors.value || !slider.value) return;

		if (props.vertical) {
			const sliderHeight = slider.value.clientHeight;
			const cursorHeights = cursors.value.map(
				(cursor) => cursor.clientHeight / 2
			);
			const tops = cursors.value.map((cursor) => cursor.offsetTop);

			const bottoms = tops.map(
				(top, index) => sliderHeight - top - cursorHeights[index]
			);

			const minBottom = props.isRange ? Math.min(...bottoms) : 0;
			const maxBottom = Math.max(0, Math.max(...bottoms));

			fillBar.value.style.bottom = minBottom + "px";
			fillBar.value.style.height = Math.abs(maxBottom - minBottom) + "px";

			fillBar.value.style.left = "50%";
			fillBar.value.style.width = "100%";
		} else {
			const lefts = cursors.value.map(
				(cursor) => cursor.offsetLeft + cursor.clientWidth / 3
			);

			const minLeft = props.isRange ? Math.min(...lefts) : 0;
			const maxLeft = Math.max(...lefts);

			fillBar.value.style.left = minLeft + "px";
			fillBar.value.style.width =
				Math.abs(maxLeft - minLeft) + cursors.value[0].clientWidth / 6 + "px";

			fillBar.value.style.bottom = "50%";
			fillBar.value.style.height = "100%";
		}
	}

	// Keyboard navigation functions
	function handleKeyDown(event: KeyboardEvent, handleIndex: number): void {
		if (props.disabled) return;

		// Handle Tab key for switching between handles in range sliders
		if (event.key === 'Tab' && props.isRange && percentage.value.length === 2) {
			// Let Tab naturally move focus between handles
			return;
		}

		const currentPercentage = percentage.value[handleIndex];
		let newPercentage = currentPercentage;
		const step = getKeyboardStep();

		switch (event.key) {
			case 'ArrowRight':
			case 'ArrowUp':
				event.preventDefault();
				newPercentage = Math.min(1, currentPercentage + step);
				break;
			case 'ArrowLeft':
			case 'ArrowDown':
				event.preventDefault();
				newPercentage = Math.max(0, currentPercentage - step);
				break;
			case 'Home':
				event.preventDefault();
				newPercentage = 0;
				break;
			case 'End':
				event.preventDefault();
				newPercentage = 1;
				break;
			case 'PageUp':
				event.preventDefault();
				newPercentage = Math.min(1, currentPercentage + step * 10);
				break;
			case 'PageDown':
				event.preventDefault();
				newPercentage = Math.max(0, currentPercentage - step * 10);
				break;
			default:
				return;
		}

		// Apply step snapping
		newPercentage = getStepPercentage(newPercentage);

		// For range sliders, prevent handles from crossing over with accessibility feedback
		let overlayDetected = false;
		if (props.isRange && percentage.value.length === 2) {
			const otherIndex = handleIndex === 0 ? 1 : 0;
			const otherValue = percentage.value[otherIndex];
			const originalNewValue = newPercentage;

			if (handleIndex === 0) {
				// Min handle - can't go above max handle
				newPercentage = Math.min(newPercentage, otherValue);
				overlayDetected = originalNewValue > otherValue;
			} else {
				// Max handle - can't go below min handle
				newPercentage = Math.max(newPercentage, otherValue);
				overlayDetected = originalNewValue < otherValue;
			}
		}

		// Update the value
		if (newPercentage !== currentPercentage) {
			keyboardMode.value = true;
			percentage.value[handleIndex] = newPercentage;
			calculateCursor();
			changeFillBarPosition();
			emit("update:modelValue", getModel());

			// Announce the change with accessibility config support
			const config = props.accessibilityConfig || {};
			if (config.announceChanges !== false) {
				const formattedValue = formatValueForAria(newPercentage);
				const handleName = props.isRange ? (handleIndex === 0 ? 'Minimum' : 'Maximum') : 'Value';
				screenReader.announcePolitely(`${handleName}: ${formattedValue}`);
			}
		} else if (overlayDetected) {
			// Announce when movement is blocked due to handle collision
			const config = props.accessibilityConfig || {};
			if (config.announceChanges !== false) {
				const limitType = handleIndex === 0 ? 'maximum' : 'minimum';
				screenReader.announcePolitely(`Cannot move beyond ${limitType} handle`);
			}
		}
	}

	function getKeyboardStep(): number {
		// If steps are defined, use the smallest step difference
		if (props.steps && props.steps.length > 1) {
			const stepValues = props.steps.map(step => 
				typeof step === 'number' ? step : step.value
			).sort((a, b) => a - b);
			
			let minDiff = 1;
			for (let i = 1; i < stepValues.length; i++) {
				const diff = stepValues[i] - stepValues[i - 1];
				if (diff > 0) {
					minDiff = Math.min(minDiff, diff);
				}
			}
			return minDiff;
		}
		
		// Default step is 1% or 1/100th of the range
		return 0.01;
	}
</script>

<template>
	<div
		ref="slider"
		class="slider"
		:class="[
			size,
			{
				disabled: disabled,
				vertical: vertical,
				horizontal: !vertical,
				'step-slider': steps && steps.length,
				'neutral-bg': neutralBackground,
				'is-custom-color': !!background,
			},
		]"
		:id="sliderId"
		role="group"
		:aria-labelledby="sliderLabelId"
		:aria-describedby="instructionsId"
		:aria-disabled="disabled"
		@mousedown="startDragging"
		@touchstart="startDraggingTouch">
		
		<!-- Hidden label and instructions for screen readers -->
		<div :id="sliderLabelId" class="sr-only">
			{{ props.ariaLabel || (props.isRange ? 'Range Slider' : 'Slider') }}
		</div>
		<div :id="instructionsId" class="sr-only">
			{{ ariaInstructions }}
		</div>
		<span
			v-for="(value, index) in isDraggingSlider"
			ref="cursors"
			:key="index"
			class="cursor cursor-slider relative select-none"
			:class="{ 
				grabbing: value, 
				colored: color,
				'keyboard-focus': shouldShowKeyboardFocus(index)
			}"
			:id="getHandleId(index)"
			role="slider"
			:aria-label="getHandleLabel(index)"
			:aria-valuemin="0"
			:aria-valuemax="props.max || 100"
			:aria-valuenow="getActualValue(percentage[index] || 0)"
			:aria-valuetext="formatValueForAria(percentage[index] || 0)"
			:aria-orientation="vertical ? 'vertical' : 'horizontal'"
			:aria-disabled="disabled"
			:tabindex="disabled ? -1 : 0"
			@mousedown="(e: MouseEvent) => startDraggingSlider(e, index)"
			@touchstart="(e: TouchEvent) => startDraggingSliderTouch(e, index)"
			@keydown="(e: KeyboardEvent) => handleKeyDown(e, index)"
			@focus="handleFocus(index)"
			@blur="handleBlur">
			
			<!-- Screen reader only text for handle description -->
			<span class="sr-only" v-if="props.isRange">
				{{ index === 0 ? 'Minimum' : 'Maximum' }} handle of range slider
			</span>
			<BTooltip
				:text="tooltipText"
				:position="vertical ? 'right' : 'top'"
				class="cursor-tooltip select-none"
				aria-hidden="true"
				v-if="showTooltip" />
		</span>
		<div
			ref="fillBar"
			class="fill-bar"
			:class="{
				'flex-col-reverse': vertical,
				'have-fill-colors': fillColors && fillColors.length,
				colored: color && !(fillColors && fillColors.length) && !disabled,
			}">
			<div
				v-for="color in fillColors"
				class="w-full h-full"
				:style="{ background: color }" />
		</div>
		<div
			v-for="(step, index) in steps"
			:key="typeof step === 'number' ? step : step.value"
			class="step"
			:class="{ active: betweenPercentage(typeof step === 'number' ? step : step.value) }"
			:style="getStepStyle(typeof step === 'number' ? step : step.value)" />
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	.slider {
		@apply flex justify-start w-full relative bg-primary-surface-highlight h-[.5em];
		border-radius: var(--rounded-base);

		.cursor,
		.cursor-tooltip {
			@apply w-[1.25em] h-[1.25em];
		}

		.step {
			@apply h-[1.875em] w-[0.3125em];
		}
	}

	.slider.vertical {
		@apply w-[.5em];

		.step {
			@apply w-[1.875em] h-[0.3125em];
		}
	}

	.slider.disabled {
		@apply pointer-events-none;

		.cursor {
			@apply border-neutral-interaction-disabled;
		}

		.fill-bar {
			@apply bg-neutral-interaction-disabled;
		}

		.step.active {
			@apply bg-neutral-interaction-disabled;
		}
	}

	.slider.small {
		@apply text-xs;
	}

	.slider.medium {
		@apply text-base;
	}

	.slider.large {
		@apply text-xl;
	}

	.slider.horizontal {
		.cursor {
			@apply top-[50%] translate-y-[-50%];
			@apply left-[-50px];
		}

		.fill-bar {
			@apply top-[50%] translate-y-[-50%] h-full;
			@apply left-0;
		}
	}

	.slider.vertical {
		@apply h-full items-end;

		.cursor {
			@apply left-[50%] translate-x-[-50%];
			@apply bottom-0;
		}

		.fill-bar {
			@apply left-[50%] translate-x-[-50%] w-full;
			@apply bottom-0;
		}
	}

	.slider.step-slider {
		@apply rounded-none;

		.fill-bar {
			@apply rounded-none;
		}
	}

	.step {
		@apply absolute bg-primary-surface-highlight;
		border-radius: var(--rounded-base);
	}

	.step.active {
		@apply bg-primary-interaction-default;
	}

	.horizontal .step {
		@apply bottom-[50%] translate-y-[50%];
	}

	.vertical .step {
		@apply left-[50%] translate-x-[-50%];
	}

	.cursor {
		@apply cursor-grab border-xs absolute z-1 border-primary-interaction-default bg-neutral-surface-default rounded-full;
		
		&:focus {
			outline: 2px solid var(--primary-interaction-default);
			outline-offset: 2px;
		}
		
		&.keyboard-focus {
			outline: 2px solid var(--primary-interaction-default);
			outline-offset: 2px;
			box-shadow: 0 0 0 4px rgba(var(--primary-rgb), 0.2);
		}
	}

	.cursor.grabbing {
		@apply cursor-grabbing;
	}

	.cursor.colored {
		border-color: v-bind(color);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.fill-bar {
		@apply flex bg-primary-interaction-default absolute overflow-hidden;
		border-radius: var(--rounded-base);
	}

	.fill-bar.colored {
		background: v-bind(color);
	}

	.fill-bar.have-fill-colors {
		@apply bg-transparent;
	}

	.neutral-bg:not(.disabled),
	.neutral-bg:not(.disabled) .step {
		@apply bg-neutral-surface-disabled;
	}

	.neutral-bg.is-custom-color:not(.disabled),
	.neutral-bg.is-custom-color:not(.disabled) .step {
		background: v-bind(background);
	}
</style>
