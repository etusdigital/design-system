<script setup lang="ts">
	import { getPosition } from "../../utils/index";
	import { ref, onMounted, onBeforeUnmount, onUpdated, computed, watch, nextTick } from "vue";
	import { useAriaAttributes } from "../../composables/useAriaAttributes";
	import { useScreenReader, screenReaderUtils } from "../../composables/useScreenReader";
	import { useKeyboardNavigation } from "../../composables/useKeyboardNavigation";
	import { useFocusTrap } from "../../composables/useFocusTrap";
	import type { 
		BCropProps, 
		BCropEvents, 
		BCropArea, 
		BCropPreset, 
		BCropMethods,
		BCropAccessibilityProps,
		BCropKeyboardConfig
	} from "./BCrop.types";
	import { DEFAULT_CROP_ANNOUNCEMENTS, CROP_KEYBOARD_SHORTCUTS, CROP_ARIA_CONFIG } from "./BCrop.types";

	/**
	 * SVG property interface for crop area dimensions
	 */
	interface SvgProperty {
		width: number;
		height: number;
	}

	/**
	 * Mouse or touch event interface for position tracking
	 */
	interface PositionEvent {
		clientX: number;
		clientY: number;
	}

	const props = withDefaults(defineProps<BCropProps>(), {
		modelValue: undefined,
		src: undefined,
		width: "360px",
		height: "200px",
		accessibility: () => ({}),
		keyboard: () => ({ enabled: true, moveStep: 1, largeMoveStep: 10, resizeStep: 5, largeResizeStep: 20, zoomStep: 0.1 }),
		presets: () => [],
		loading: () => ({ loading: false }),
		focus: () => ({ trapFocus: false }),
		disabled: false,
		highContrast: false,
		minZoom: 0,
		maxZoom: 2,
		quality: 0.9,
		format: "image/png",
	});

	// Core component state
	const isDraggingArea = ref(false);
	const bCrop = ref<HTMLDivElement>();
	const cropArea = ref<HTMLDivElement>();
	const selectedArea = ref<Element>();
	const zoom = ref(0);
	const parsedImg = ref(new Image());
	const img = new Image();
	img.src = props.src;
	const svgProperty = ref<SvgProperty>({
		width: 0,
		height: 0,
	});
	const resizeObserver = new ResizeObserver(resize);

	// Accessibility state
	const isImageLoading = ref(true);
	const isCropFocused = ref(false);
	const currentCropArea = ref<BCropArea>({
		x: 0,
		y: 0, 
		width: parseInt(props.width || '360'),
		height: parseInt(props.height || '200')
	});
	const isKeyboardMode = ref(false);
	const lastAnnouncedArea = ref<BCropArea | null>(null);
	const cropAreaElement = ref<HTMLDivElement>();
	const instructionsElement = ref<HTMLDivElement>();

	// Accessibility composables
	const { useAriaId, useBusyAria } = useAriaAttributes();
	const { announce, announcePolitely, announceAssertively, useLiveRegion } = useScreenReader();
	const { liveRegion, updateLiveRegion } = useLiveRegion('polite');
	const isFocusTrapActive = ref(false);
	const { activate: trapFocus, deactivate: releaseFocus } = useFocusTrap(bCrop, isFocusTrapActive);

	// Generate unique IDs for ARIA relationships
	const cropWidgetId = useAriaId('crop-widget');
	const cropAreaId = useAriaId('crop-area');
	const instructionsId = useAriaId('crop-instructions');
	const liveRegionId = useAriaId('crop-live-region');
	const imageId = useAriaId('crop-image');
	const zoomSliderId = useAriaId('zoom-slider');

	// Loading state ARIA
	const busyAria = useBusyAria(isImageLoading, 'Loading image for cropping');

	const emit = defineEmits<BCropEvents>();

	// Accessibility configuration with defaults
	const accessibilityConfig = computed(() => ({
		ariaLabel: props.accessibility?.ariaLabel || 'Image cropping widget',
		imageAlt: props.accessibility?.imageAlt || 'Image to crop',
		croppedImageAlt: props.accessibility?.croppedImageAlt || 'Cropped image preview',
		cropAreaLabel: props.accessibility?.cropAreaLabel || 'Crop area selector',
		instructions: props.accessibility?.instructions || 'Use arrow keys to move crop area, plus and minus keys to resize, or drag with mouse',
		announceChanges: props.accessibility?.announceChanges ?? true,
		announcements: { ...DEFAULT_CROP_ANNOUNCEMENTS, ...props.accessibility?.announcements }
	}));

	// Keyboard configuration with defaults
	const keyboardConfig = computed(() => ({
		enabled: props.keyboard?.enabled ?? true,
		moveStep: props.keyboard?.moveStep ?? 1,
		largeMoveStep: props.keyboard?.largeMoveStep ?? 10,
		resizeStep: props.keyboard?.resizeStep ?? 5,
		largeResizeStep: props.keyboard?.largeResizeStep ?? 20,
		zoomStep: props.keyboard?.zoomStep ?? 0.1
	}));

	const computedBorderRadius = computed((): string => {
		if (
			document.readyState === "complete" ||
			document.readyState === "interactive"
		) {
			if (bCrop.value && 'computedStyleMap' in bCrop.value && typeof bCrop.value.computedStyleMap === 'function') {
				try {
					const styleMap = bCrop.value.computedStyleMap();
					const borderRadius = styleMap.get("--border-radius-xl");
					if (borderRadius && 'toString' in borderRadius && typeof borderRadius.toString === 'function') {
						return borderRadius.toString();
					}
				} catch (error) {
					// Fallback if computedStyleMap is not supported
					console.warn('computedStyleMap not supported, using fallback');
				}
			}
			
			// Fallback using getComputedStyle
			if (bCrop.value) {
				const computedStyle = window.getComputedStyle(bCrop.value);
				const borderRadius = computedStyle.getPropertyValue("--border-radius-xl");
				if (borderRadius) return borderRadius;
			}
		}
		return "16px";
	});

	// Computed ARIA attributes for crop area
	const cropAreaAria = computed(() => ({
		...CROP_ARIA_CONFIG.cropArea,
		id: cropAreaId,
		'aria-label': accessibilityConfig.value.cropAreaLabel,
		'aria-describedby': `${instructionsId} ${liveRegionId}`,
		'aria-valuetext': `Crop area at position ${currentCropArea.value.x}, ${currentCropArea.value.y}, size ${currentCropArea.value.width} by ${currentCropArea.value.height}`,
		tabindex: props.disabled ? -1 : 0,
		'aria-disabled': props.disabled,
	}));

	// Computed ARIA attributes for zoom slider
	const zoomSliderAria = computed(() => ({
		...CROP_ARIA_CONFIG.zoomControl,
		id: zoomSliderId,
		'aria-valuemin': props.minZoom * 100,
		'aria-valuemax': props.maxZoom * 100,
		'aria-valuenow': Math.round((zoom.value + 1) * 100),
		'aria-valuetext': `Zoom level ${Math.round((zoom.value + 1) * 100)}%`,
		'aria-label': 'Image zoom level'
	}));

	// Watch for image loading state changes
	watch(isImageLoading, (loading) => {
		if (loading) {
			emit('loading-start');
			if (accessibilityConfig.value.announceChanges) {
				announcePolitely(accessibilityConfig.value.announcements.imageLoading || 'Loading image for cropping');
			}
		} else {
			emit('loading-complete');
			if (accessibilityConfig.value.announceChanges) {
				announcePolitely(accessibilityConfig.value.announcements.imageLoaded || 'Image loaded. Ready to crop.');
			}
		}
	});

	// Watch crop area changes for announcements
	watch(currentCropArea, (newArea, oldArea) => {
		if (!accessibilityConfig.value.announceChanges || !oldArea) return;

		// Debounce announcements to avoid spam
		const hasPositionChanged = newArea.x !== oldArea.x || newArea.y !== oldArea.y;
		const hasSizeChanged = newArea.width !== oldArea.width || newArea.height !== oldArea.height;
		
		if (hasPositionChanged && !isDraggingArea.value) {
			const message = accessibilityConfig.value.announcements.cropMoved
				?.replace('{x}', Math.round(newArea.x).toString())
				?.replace('{y}', Math.round(newArea.y).toString()) 
				|| `Crop area moved to position ${Math.round(newArea.x)}, ${Math.round(newArea.y)}`;
			
			updateLiveRegion(message);
		}

		if (hasSizeChanged && !isDraggingArea.value) {
			const message = accessibilityConfig.value.announcements.cropResized
				?.replace('{width}', Math.round(newArea.width).toString())
				?.replace('{height}', Math.round(newArea.height).toString())
				|| `Crop area resized to ${Math.round(newArea.width)} by ${Math.round(newArea.height)}`;
			
			updateLiveRegion(message);
		}

		emit('crop-change', newArea);
	}, { deep: true });

	// Watch zoom changes
	watch(zoom, (newZoom) => {
		if (accessibilityConfig.value.announceChanges) {
			const zoomPercent = Math.round((newZoom + 1) * 100);
			const message = accessibilityConfig.value.announcements.zoomChanged
				?.replace('{zoom}', `${zoomPercent}%`)
				|| `Zoom level set to ${zoomPercent}%`;
			
			updateLiveRegion(message);
		}
		emit('zoom-change', newZoom);
	});

	// Keyboard event handler for crop area
	function handleCropAreaKeydown(event: KeyboardEvent) {
		if (!keyboardConfig.value.enabled || props.disabled) return;

		const { key, shiftKey, ctrlKey } = event;
		let handled = false;

		// Determine step sizes
		const moveStep = shiftKey ? keyboardConfig.value.largeMoveStep : keyboardConfig.value.moveStep;
		const resizeStep = shiftKey ? keyboardConfig.value.largeResizeStep : keyboardConfig.value.resizeStep;

		// Handle crop movement
		switch (key) {
			case 'ArrowLeft':
				moveCrop(-moveStep, 0);
				handled = true;
				break;
			case 'ArrowRight':
				moveCrop(moveStep, 0);
				handled = true;
				break;
			case 'ArrowUp':
				moveCrop(0, -moveStep);
				handled = true;
				break;
			case 'ArrowDown':
				moveCrop(0, moveStep);
				handled = true;
				break;
		}

		// Handle crop resizing
		switch (key) {
			case '=':
			case '+':
				resizeCrop(resizeStep, resizeStep);
				handled = true;
				break;
			case '-':
				resizeCrop(-resizeStep, -resizeStep);
				handled = true;
				break;
		}

		// Handle zoom with Ctrl modifier
		if (ctrlKey) {
			switch (key) {
				case '=':
				case '+':
					const newZoomUp = Math.min(zoom.value + keyboardConfig.value.zoomStep, props.maxZoom);
					zoom.value = newZoomUp;
					changeZoom(newZoomUp);
					handled = true;
					break;
				case '-':
					const newZoomDown = Math.max(zoom.value - keyboardConfig.value.zoomStep, props.minZoom);
					zoom.value = newZoomDown;
					changeZoom(newZoomDown);
					handled = true;
					break;
				case '0':
					zoom.value = 0;
					changeZoom(0);
					handled = true;
					break;
			}
		}

		// Handle other shortcuts
		switch (key) {
			case 'r':
			case 'R':
				resetCrop();
				handled = true;
				break;
			case 'Enter':
				applyCrop();
				handled = true;
				break;
			case 'Escape':
				if (isCropFocused.value) {
					cropAreaElement.value?.blur();
					handled = true;
				}
				break;
			case '?':
				announceHelp();
				handled = true;
				break;
		}

		if (handled) {
			event.preventDefault();
			event.stopPropagation();
			isKeyboardMode.value = true;
		}
	}

	// Focus management
	function handleCropAreaFocus() {
		isCropFocused.value = true;
		isKeyboardMode.value = true;
		
		if (props.focus?.trapFocus) {
			isFocusTrapActive.value = true;
		}

		announcePolitely(accessibilityConfig.value.announcements.focusEntered || 'Crop area focused. Use keyboard to adjust position and size.');
		emit('focus-enter');
	}

	function handleCropAreaBlur() {
		isCropFocused.value = false;
		isKeyboardMode.value = false;
		
		if (props.focus?.trapFocus) {
			isFocusTrapActive.value = false;
		}

		emit('focus-leave');
	}

	// Crop manipulation methods
	function moveCrop(deltaX: number, deltaY: number) {
		if (!cropArea.value || !cropArea.value.parentElement) return;

		const parentRect = cropArea.value.parentElement.getBoundingClientRect();
		const cropRect = cropArea.value.getBoundingClientRect();
		
		const newX = Math.max(0, Math.min(currentCropArea.value.x + deltaX, parentRect.width - cropRect.width));
		const newY = Math.max(0, Math.min(currentCropArea.value.y + deltaY, parentRect.height - cropRect.height));

		cropArea.value.style.left = `${newX}px`;
		cropArea.value.style.top = `${newY}px`;
		
		if (selectedArea.value) {
			selectedArea.value.setAttribute("x", newX.toString());
			selectedArea.value.setAttribute("y", newY.toString());
		}

		currentCropArea.value.x = newX;
		currentCropArea.value.y = newY;

		crop(cropArea.value, cropArea.value.parentElement);
	}

	function resizeCrop(deltaWidth: number, deltaHeight: number) {
		if (!cropArea.value || !cropArea.value.parentElement) return;

		const parentRect = cropArea.value.parentElement.getBoundingClientRect();
		const minSize = 20; // Minimum crop area size
		
		const newWidth = Math.max(minSize, Math.min(
			currentCropArea.value.width + deltaWidth, 
			parentRect.width - currentCropArea.value.x
		));
		const newHeight = Math.max(minSize, Math.min(
			currentCropArea.value.height + deltaHeight, 
			parentRect.height - currentCropArea.value.y
		));

		cropArea.value.style.width = `${newWidth}px`;
		cropArea.value.style.height = `${newHeight}px`;

		if (selectedArea.value) {
			selectedArea.value.setAttribute("width", newWidth.toString());
			selectedArea.value.setAttribute("height", newHeight.toString());
		}

		currentCropArea.value.width = newWidth;
		currentCropArea.value.height = newHeight;

		crop(cropArea.value, cropArea.value.parentElement);
	}

	function resetCrop() {
		if (!cropArea.value) return;
		
		const defaultWidth = parseInt(props.width || '360');
		const defaultHeight = parseInt(props.height || '200');
		
		cropArea.value.style.left = '0px';
		cropArea.value.style.top = '0px';
		cropArea.value.style.width = `${defaultWidth}px`;
		cropArea.value.style.height = `${defaultHeight}px`;
		
		if (selectedArea.value) {
			selectedArea.value.setAttribute("x", "0");
			selectedArea.value.setAttribute("y", "0");
			selectedArea.value.setAttribute("width", defaultWidth.toString());
			selectedArea.value.setAttribute("height", defaultHeight.toString());
		}

		currentCropArea.value = { x: 0, y: 0, width: defaultWidth, height: defaultHeight };
		
		if (cropArea.value.parentElement) {
			crop(cropArea.value, cropArea.value.parentElement);
		}

		announcePolitely('Crop area reset to default position and size');
	}

	function applyCrop() {
		if (accessibilityConfig.value.announceChanges) {
			announcePolitely(accessibilityConfig.value.announcements.cropCompleted || 'Image cropped successfully');
		}
		emit('crop-complete', props.modelValue || '');
	}

	function announceHelp() {
		announcePolitely(accessibilityConfig.value.announcements.keyboardHelp || 'Use arrow keys to move crop area, plus and minus to resize, Ctrl plus zoom controls');
	}

	// Apply preset
	function applyPreset(preset: BCropPreset) {
		if (!cropArea.value) return;

		const width = typeof preset.width === 'string' ? parseInt(preset.width) : preset.width;
		const height = typeof preset.height === 'string' ? parseInt(preset.height) : preset.height;

		cropArea.value.style.width = `${width}px`;
		cropArea.value.style.height = `${height}px`;
		
		if (selectedArea.value) {
			selectedArea.value.setAttribute("width", width.toString());
			selectedArea.value.setAttribute("height", height.toString());
		}

		currentCropArea.value.width = width;
		currentCropArea.value.height = height;

		if (cropArea.value.parentElement) {
			crop(cropArea.value, cropArea.value.parentElement);
		}

		announcePolitely(`Applied preset: ${preset.label}`);
		emit('preset-applied', preset);
	}

	onMounted(async () => {
		window.addEventListener("mousemove", updateCropArea);
		window.addEventListener("mouseup", () => {
			isDraggingArea.value = false;
		});

		window.addEventListener("touchmove", updateCropAreaTouch);
		window.addEventListener("touchend", () => {
			isDraggingArea.value = false;
		});

		if (bCrop.value) resizeObserver.observe(bCrop.value, { box: "border-box" });
		
		img.onload = () => {
			isImageLoading.value = false;
			changeZoom(zoom.value);
		};
	});

	onUpdated(resize);

	onBeforeUnmount(() => {
		if (resizeObserver) resizeObserver.disconnect();

		window.removeEventListener("mousemove", updateCropArea);
		window.removeEventListener("mouseup", () => {
			isDraggingArea.value = false;
		});

		window.removeEventListener("touchmove", updateCropAreaTouch);
		window.removeEventListener("touchend", () => {
			isDraggingArea.value = false;
		});

		if (props.focus?.trapFocus) {
			isFocusTrapActive.value = false;
		}
	});

	/**
	 * Handles resize events and updates SVG dimensions
	 */
	function resize() {
		svgProperty.value.width = bCrop.value?.clientWidth
			? bCrop.value?.clientWidth + 10
			: 0;
		svgProperty.value.height = bCrop.value?.clientHeight
			? bCrop.value?.clientHeight + 10
			: 0;
	}

	/**
	 * Starts dragging the crop area for touch events
	 */
	function startDraggingAreaTouch(event: TouchEvent) {
		if (props.disabled) return;
		isDraggingArea.value = true;
		isKeyboardMode.value = false;
		updateCropAreaTouch(event);
	}

	/**
	 * Starts dragging the crop area for mouse events
	 */
	function startDraggingArea(event: MouseEvent) {
		if (props.disabled) return;
		isDraggingArea.value = true;
		isKeyboardMode.value = false;
		updateCropArea(event);
	}

	/**
	 * Updates crop area position for touch events
	 */
	function updateCropAreaTouch(event: TouchEvent) {
		updateCropArea(event.touches[0]);
	}

	/**
	 * Updates crop area position based on mouse/touch event
	 */
	function updateCropArea(event: PositionEvent) {
		if (
			!cropArea.value ||
			!cropArea.value.parentElement ||
			!selectedArea.value ||
			!isDraggingArea.value ||
			props.disabled
		)
			return;

		const clamped = getPosition(
			event,
			cropArea.value,
			cropArea.value.parentElement,
			{ left: true, top: true },
			{ x: -1, y: -3 }
		);
		
		cropArea.value.style.top = `${clamped.y}px`;
		cropArea.value.style.left = `${clamped.x}px`;
		selectedArea.value.setAttribute("x", clamped.x.toString());
		selectedArea.value.setAttribute("y", clamped.y.toString());

		currentCropArea.value.x = clamped.x;
		currentCropArea.value.y = clamped.y;

		crop(cropArea.value, cropArea.value.parentElement);
	}

	/**
	 * Changes the zoom level of the image
	 */
	function changeZoom(zoomLevel: number) {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!cropArea.value || !cropArea.value.parentElement || !ctx) return;

		const parsedZoom = Math.max(props.minZoom + 1, Math.min(zoomLevel + 1, props.maxZoom + 1));

		const parentRect = cropArea.value.parentElement.getBoundingClientRect();
		const rect = cropArea.value.getBoundingClientRect();
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

		const croppedImage = canvas.toDataURL(props.format, props.quality);
		parsedImg.value = new Image();
		parsedImg.value.src = croppedImage;
		parsedImg.value.onload = () => {
			if (!cropArea.value || !cropArea.value.parentElement) return;
			crop(cropArea.value, cropArea.value.parentElement);
		};
	}

	/**
	 * Performs the actual cropping operation and emits the result
	 */
	function crop(cropAreaElement: HTMLDivElement, parent: HTMLElement) {
		const rect = cropAreaElement.getBoundingClientRect();
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = rect.width;
		canvas.height = rect.height;

		const parentRect = parent.getBoundingClientRect();
		const cropLeft = rect.left - parentRect.left;
		const cropTop = rect.top - parentRect.top;

		const sourceX = cropLeft;
		const sourceY = cropTop;
		const sourceWidth = rect.width;
		const sourceHeight = rect.height;

		ctx.drawImage(
			parsedImg.value as HTMLImageElement,
			sourceX,
			sourceY,
			sourceWidth,
			sourceHeight,
			0,
			0,
			rect.width,
			rect.height
		);

		const croppedImage = canvas.toDataURL(props.format, props.quality);
		emit("update:modelValue", croppedImage);
	}

	// Expose methods for programmatic control
	defineExpose<BCropMethods>({
		moveCrop,
		resizeCrop,
		setCropArea: (area: BCropArea) => {
			currentCropArea.value = area;
			if (cropArea.value) {
				cropArea.value.style.left = `${area.x}px`;
				cropArea.value.style.top = `${area.y}px`;
				cropArea.value.style.width = `${area.width}px`;
				cropArea.value.style.height = `${area.height}px`;
			}
		},
		applyPreset,
		resetCrop,
		setZoom: (level: number) => {
			zoom.value = Math.max(props.minZoom, Math.min(level, props.maxZoom));
			changeZoom(zoom.value);
		},
		focus: () => cropAreaElement.value?.focus(),
		getCroppedImage: async () => props.modelValue || ''
	});
</script>

<template>
	<div
		ref="bCrop"
		:id="cropWidgetId"
		class="b-crop w-full h-full"
		:class="{ 
			'high-contrast': highContrast,
			'keyboard-mode': isKeyboardMode,
			'crop-focused': isCropFocused,
			'disabled': disabled
		}"
		v-bind="busyAria"
		:aria-label="accessibilityConfig.ariaLabel"
		:aria-describedby="instructionsId">
		
		<!-- Hidden instructions for screen readers -->
		<div
			:id="instructionsId"
			ref="instructionsElement"
			class="sr-only"
			aria-hidden="false">
			{{ accessibilityConfig.instructions }}
		</div>

		<!-- Live region for announcements -->
		<div
			:id="liveRegionId"
			ref="liveRegion"
			class="sr-only"
			aria-live="polite"
			aria-atomic="true">
		</div>

		<!-- Preset buttons -->
		<div
			v-if="presets.length > 0"
			class="preset-controls flex gap-xs mb-xs"
			role="group"
			aria-label="Crop presets">
			<button
				v-for="preset in presets"
				:key="preset.id"
				type="button"
				class="preset-button px-sm py-xs rounded-md text-sm bg-neutral-surface-default hover:bg-neutral-surface-hover focus:bg-neutral-surface-focus border border-neutral-border-default"
				:aria-describedby="preset.description ? `preset-${preset.id}-desc` : undefined"
				@click="applyPreset(preset)">
				{{ preset.label }}
				<span
					v-if="preset.description"
					:id="`preset-${preset.id}-desc`"
					class="sr-only">
					{{ preset.description }}
				</span>
			</button>
		</div>

		<div
			class="relative w-full h-full bg-black rounded-xl"
			:style="{ 'min-width': width, 'min-height': height }">
			<div
				class="crop-img"
				@click="startDraggingArea">
				<svg
					class="absolute z-1"
					:width="svgProperty.width || 0 + 'px'"
					:height="svgProperty.height || 0 + 'px'"
					:viewBox="`0 0 ${svgProperty.width || 0} ${svgProperty.height || 0}`"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true">
					<defs>
						<mask id="highlight-mask">
							<rect
								width="100%"
								height="100%"
								fill="white" />
							<rect
								ref="selectedArea"
								x="0"
								y="0"
								:width="width"
								:height="height"
								:rx="computedBorderRadius"
								:ry="computedBorderRadius"
								fill="black" />
						</mask>
					</defs>
					<rect
						width="100%"
						height="100%"
						fill="rgba(255, 255, 255, 0.7)"
						mask="url(#highlight-mask)" />
				</svg>
				<img
					:id="imageId"
					:src="parsedImg.src"
					:alt="accessibilityConfig.imageAlt"
					role="img" />
				<img
					:src="src"
					style="position: relative; visibility: hidden"
					:alt="accessibilityConfig.imageAlt"
					aria-hidden="true" />
			</div>
			<div
				:ref="(el) => { cropArea = el as HTMLDivElement; cropAreaElement = el as HTMLDivElement }"
				class="crop-area"
				:style="{ width: width, height: height }"
				v-bind="cropAreaAria"
				@mousedown="startDraggingArea"
				@touchstart="startDraggingAreaTouch"
				@keydown="handleCropAreaKeydown"
				@focus="handleCropAreaFocus"
				@blur="handleCropAreaBlur">
				<!-- Focus indicator for keyboard users -->
				<div
					v-if="isKeyboardMode"
					class="crop-focus-indicator"
					aria-hidden="true">
				</div>
			</div>
		</div>
		
		<footer class="crop-controls">
			<BIcon
				name="zoom_out"
				class="select-none"
				role="img"
				aria-label="Zoom out" />
			<BSlider
				v-model="zoom"
				@update:model-value="changeZoom"
				size="small"
				:min="minZoom"
				:max="maxZoom"
				:step="keyboardConfig.zoomStep"
				:disabled="disabled"
				v-bind="zoomSliderAria"
				aria-label="Image zoom level" />
			<BIcon
				name="zoom_in"
				class="select-none"
				role="img"
				aria-label="Zoom in" />
		</footer>

		<!-- Keyboard help tooltip -->
		<div
			v-if="isCropFocused"
			class="keyboard-help"
			role="tooltip"
			:aria-describedby="cropAreaId">
			Press ? for keyboard shortcuts
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";
	
	.b-crop {
		@apply flex flex-col gap-xs;
		border-radius: var(--border-radius-xl);
	}

	.b-crop.disabled {
		@apply opacity-60 pointer-events-none;
	}

	.crop-area {
		@apply z-2 absolute w-full border-xxs border-primary-border-default bg-transparent top-0;
		border-radius: var(--border-radius-xl);
		cursor: move;
		outline: none;
	}

	.crop-area:focus {
		@apply ring-2 ring-primary-border-focus ring-offset-1;
		cursor: move;
	}

	.crop-area.keyboard-mode:focus {
		@apply ring-2 ring-primary-border-focus;
	}

	.crop-focus-indicator {
		@apply absolute inset-0 border-2 border-primary-border-focus rounded-xl opacity-80;
		animation: focus-pulse 2s infinite;
	}

	@keyframes focus-pulse {
		0%, 100% { opacity: 0.8; }
		50% { opacity: 0.4; }
	}

	.high-contrast .crop-area {
		@apply border-4 border-yellow-400;
	}

	.high-contrast .crop-focus-indicator {
		@apply border-4 border-yellow-300;
	}

	.crop-img {
		@apply relative w-full h-full overflow-hidden bg-black;
		border-radius: var(--border-radius-xl);

		img {
			@apply absolute select-none;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	.crop-controls {
		@apply flex items-center gap-base;
		margin: 0 10%;
	}

	.preset-controls {
		@apply flex flex-wrap gap-xs mb-xs;
	}

	.preset-button {
		@apply transition-all duration-200;
	}

	.preset-button:focus {
		@apply ring-2 ring-primary-border-focus ring-offset-1;
	}

	.keyboard-help {
		@apply absolute top-2 right-2 px-xs py-xxs bg-neutral-surface-default text-xs rounded opacity-75;
		pointer-events: none;
	}

	/* Screen reader only utility class */
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

	/* High contrast mode enhancements */
	@media (prefers-contrast: high) {
		.crop-area {
			@apply border-4 border-yellow-400;
		}
		
		.crop-focus-indicator {
			@apply border-4 border-yellow-300;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.crop-focus-indicator {
			animation: none;
			@apply opacity-80;
		}
		
		.preset-button {
			transition: none;
		}
	}
</style>