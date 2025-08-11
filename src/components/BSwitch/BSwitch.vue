<script setup lang="ts">
	import { ref, computed, watch, nextTick, onMounted } from "vue";
	import { useOptionalModel, useAriaAttributes, useScreenReader } from "#composables";
	import type { 
		BSwitchProps, 
		BSwitchEmits, 
		BSwitchState, 
		BSwitchChangeEvent, 
		BSwitchFocusEvent, 
		BSwitchValidationEvent, 
		BSwitchKeyboardEvent,
		BSwitchAnimationEvent,
		BSwitchInteractionMode,
		BSwitchValidationState,
		BSwitchRole 
	} from './BSwitch.types';

	/**
	 * Props for the BSwitch component with comprehensive WCAG 2.1 AA support
	 * iOS-style switch with smooth sliding thumb animation
	 */
	const props = withDefaults(
		defineProps<BSwitchProps>(),
		{
			modelValue: undefined,
			rhs: false,
			disabled: false,
			required: false,
			readonly: false,
			loading: false,
			ariaLabel: "",
			ariaDescription: "",
			announceChanges: true,
			onLabel: "On",
			offLabel: "Off",
			errorMessage: "",
			invalid: false,
			successMessage: "",
			loadingMessage: "Processing...",
			role: "switch",
			grouped: false,
			groupLabel: "",
			groupPosition: undefined,
			groupSize: undefined,
			size: "md",
			variant: "ios",
			validationState: "none",
			autofocus: false,
			showStateText: false,
			showIcons: false,
			onText: "",
			offText: "",
			hapticFeedback: false,
			thumbContent: false,
			showLoadingInThumb: true,
		}
	);

	/**
	 * Events emitted by the BSwitch component
	 */
	const emit = defineEmits<BSwitchEmits>();

	// Accessibility composables
	const { useAriaId } = useAriaAttributes();
	const screenReader = useScreenReader();

	// Generate unique IDs for ARIA relationships
	const switchId = props.id || useAriaId('switch');
	const labelId = useAriaId('switch-label');
	const descriptionId = useAriaId('switch-description');
	const errorId = useAriaId('switch-error');
	const successId = useAriaId('switch-success');
	const groupId = props.grouped ? useAriaId('switch-group') : undefined;

	// Component state
	const [model] = useOptionalModel<boolean>(props, "modelValue", emit, false);
	const switchRef = ref<HTMLDivElement>();
	const trackRef = ref<HTMLDivElement>();
	const thumbRef = ref<HTMLDivElement>();
	const keyboardMode = ref(false);
	const isProcessing = ref(false);
	const validationMessage = ref('');
	const isTransitioning = ref(false);
	const animationProgress = ref(0);
	const startX = ref(0);
	const isDragging = ref(false);

	// Computed accessibility properties
	const switchAriaLabel = computed(() => {
		if (props.ariaLabel) return props.ariaLabel;
		const roleLabel = props.role === 'checkbox' ? 'Checkbox' : 'iOS Switch';
		const state = model.value ? props.onLabel : props.offLabel;
		const position = props.groupPosition && props.groupSize ? ` ${props.groupPosition} of ${props.groupSize}` : '';
		return `${roleLabel}${position}, currently ${state}`;
	});

	const stateDescription = computed(() => {
		const state = model.value ? props.onLabel : props.offLabel;
		let description = `Switch is ${state.toLowerCase()}`;
		if (props.ariaDescription) description += `. ${props.ariaDescription}`;
		if (props.required) description += ". Required field";
		if (props.readonly) description += ". Read-only";
		if (props.loading || isProcessing.value) description += ". Processing";
		return description;
	});

	const computedAriaDescribedBy = computed(() => {
		const ids = [];
		if (props.ariaDescription) ids.push(descriptionId);
		if (props.errorMessage && (props.invalid || props.validationState === 'error')) ids.push(errorId);
		if (props.successMessage && props.validationState === 'success') ids.push(successId);
		return ids.length > 0 ? ids.join(' ') : undefined;
	});

	const isInteractive = computed(() => {
		return !props.disabled && !props.readonly && !props.loading && !isProcessing.value;
	});

	const computedTabIndex = computed(() => {
		if (!isInteractive.value) return -1;
		return 0;
	});

	const validationIcon = computed(() => {
		switch (props.validationState) {
			case 'error': return '⚠️';
			case 'success': return '✓';
			case 'warning': return '⚠';
			default: return '';
		}
	});

	// iOS-style thumb position calculation
	const thumbPosition = computed(() => {
		if (isDragging.value) {
			return `${animationProgress.value * 100}%`;
		}
		return model.value ? '100%' : '0%';
	});

	const thumbTransform = computed(() => {
		const progress = isDragging.value ? animationProgress.value : (model.value ? 1 : 0);
		const translateX = progress * (trackRef.value?.offsetWidth - (thumbRef.value?.offsetWidth || 0) - 4) || 0;
		return `translateX(${translateX}px)`;
	});

	// Current switch state for events
	const currentState = computed((): BSwitchState => ({
		value: model.value,
		previousValue: model.value, // Will be updated during transitions
		hasFocus: keyboardMode.value,
		isInteracting: isDragging.value || isTransitioning.value,
		interactionMode: isDragging.value ? 'swipe' : (keyboardMode.value ? 'keyboard' : 'click'),
		keyboardMode: keyboardMode.value,
		isDisabled: props.disabled || false,
		isReadonly: props.readonly || false,
		isLoading: props.loading || isProcessing.value,
		isProcessing: isProcessing.value,
		validationState: props.validationState || 'none',
		validationMessage: validationMessage.value,
		isRequired: props.required || false,
		isGrouped: props.grouped || false,
		groupPosition: props.groupPosition,
		groupSize: props.groupSize,
		isHighContrast: props.highContrast || false,
		isReducedMotion: props.reduceMotion || false,
		lastAnnouncedMessage: null, // Managed by screen reader composable
		isTransitioning: isTransitioning.value,
		animationProgress: animationProgress.value,
	}));

	/**
	 * Toggles the switch state with iOS-style animation
	 */
	function toggle(event?: Event, source: BSwitchInteractionMode = 'click'): void {
		if (!isInteractive.value) return;
		
		const previousState = model.value;
		isTransitioning.value = true;
		
		// Emit animation start
		const animationStartEvent: BSwitchAnimationEvent = {
			type: 'spring',
			phase: 'start',
			progress: 0,
			state: currentState.value,
		};
		emit('animation-start', animationStartEvent);

		// Animate the change
		animateToggle(previousState, !previousState, () => {
			model.value = !previousState;
			
			// Handle form validation
			if (props.required && !model.value) {
				validationMessage.value = props.errorMessage || 'This field is required';
				emit('error', validationMessage.value);
				screenReader.announceAssertively(`Error: ${validationMessage.value}`);
			} else if (validationMessage.value) {
				validationMessage.value = '';
				if (props.successMessage && model.value) {
					emit('success', props.successMessage);
					screenReader.announcePolitely(props.successMessage);
				}
			}
			
			// Announce state change to screen readers
			if (props.announceChanges && previousState !== model.value) {
				const newState = model.value ? props.onLabel : props.offLabel;
				const roleText = props.role === 'checkbox' ? 'checkbox' : 'switch';
				screenReader.announcePolitely(`${roleText} toggled to ${newState.toLowerCase()}`);
			}

			// Haptic feedback simulation
			if (props.hapticFeedback && 'navigator' in window && 'vibrate' in navigator) {
				navigator.vibrate(50);
			}
			
			const changeEvent: BSwitchChangeEvent = {
				value: model.value,
				previousValue: previousState,
				event: event || new Event('change'),
				state: currentState.value,
				source,
			};
			
			emit('change', changeEvent);
			emit('validate', {
				result: { isValid: true, errors: [], warnings: [], successes: [] },
				value: model.value,
				state: currentState.value,
			} as BSwitchValidationEvent);

			isTransitioning.value = false;
			
			// Emit animation end
			const animationEndEvent: BSwitchAnimationEvent = {
				type: 'spring',
				phase: 'end',
				progress: 1,
				state: currentState.value,
			};
			emit('animation-end', animationEndEvent);
		});
	}

	/**
	 * Animate the toggle transition with iOS-style spring animation
	 */
	function animateToggle(from: boolean, to: boolean, onComplete: () => void): void {
		const duration = props.animationConfig?.duration || 300;
		const easing = props.animationConfig?.easing || 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
		
		if (props.reduceMotion || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
			// Skip animation for reduced motion
			animationProgress.value = to ? 1 : 0;
			onComplete();
			return;
		}

		const startTime = performance.now();
		const startProgress = from ? 1 : 0;
		const endProgress = to ? 1 : 0;

		function animate(currentTime: number) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			
			// Apply easing function (simplified spring)
			const easedProgress = easeOutBack(progress);
			animationProgress.value = startProgress + (endProgress - startProgress) * easedProgress;
			
			// Emit progress event
			const progressEvent: BSwitchAnimationEvent = {
				type: 'spring',
				phase: 'progress',
				progress: animationProgress.value,
				state: currentState.value,
			};
			emit('animation-progress', progressEvent);

			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				animationProgress.value = endProgress;
				onComplete();
			}
		}

		requestAnimationFrame(animate);
	}

	/**
	 * Easing function for iOS-like spring animation
	 */
	function easeOutBack(t: number): number {
		const c1 = 1.70158;
		const c3 = c1 + 1;
		return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
	}

	/**
	 * Enhanced keyboard navigation handler
	 */
	function handleKeyDown(e: KeyboardEvent): void {
		if (!isInteractive.value) return;
		
		keyboardMode.value = true;
		
		const keyboardEvent: BSwitchKeyboardEvent = {
			event: e,
			state: currentState.value,
			handled: false,
		};

		switch (e.key) {
			case ' ':
				// Space key works for both switch and checkbox
				e.preventDefault();
				toggle(e, 'keyboard');
				keyboardEvent.handled = true;
				break;
				
			case 'Enter':
				// Enter key primarily for switch role
				if (props.role === 'switch') {
					e.preventDefault();
					toggle(e, 'keyboard');
					keyboardEvent.handled = true;
				}
				break;
				
			case 'ArrowLeft':
				// Left arrow turns off (for switches)
				if (props.role === 'switch' && model.value) {
					e.preventDefault();
					toggle(e, 'keyboard');
					keyboardEvent.handled = true;
				}
				break;
				
			case 'ArrowRight':
				// Right arrow turns on (for switches)
				if (props.role === 'switch' && !model.value) {
					e.preventDefault();
					toggle(e, 'keyboard');
					keyboardEvent.handled = true;
				}
				break;
				
			case 'Escape':
				// Clear validation message on escape
				if (validationMessage.value) {
					validationMessage.value = '';
					e.preventDefault();
					keyboardEvent.handled = true;
				}
				break;
		}
		
		emit('keydown', keyboardEvent);
	}

	/**
	 * Touch/Mouse interaction handlers for swipe gestures
	 */
	function handleInteractionStart(e: MouseEvent | TouchEvent): void {
		if (!isInteractive.value) return;
		
		keyboardMode.value = false;
		isDragging.value = true;
		
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		startX.value = clientX;
		
		// Prevent text selection during drag
		e.preventDefault();
	}

	function handleInteractionMove(e: MouseEvent | TouchEvent): void {
		if (!isDragging.value || !isInteractive.value) return;
		
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const deltaX = clientX - startX.value;
		const trackWidth = trackRef.value?.offsetWidth || 0;
		const thumbWidth = thumbRef.value?.offsetWidth || 0;
		const maxTravel = trackWidth - thumbWidth - 4; // 4px padding
		
		// Calculate progress (0-1) based on drag distance
		let progress = model.value ? 1 : 0;
		progress += deltaX / maxTravel;
		progress = Math.max(0, Math.min(1, progress));
		
		animationProgress.value = progress;
	}

	function handleInteractionEnd(e: MouseEvent | TouchEvent): void {
		if (!isDragging.value || !isInteractive.value) return;
		
		isDragging.value = false;
		
		// Determine final state based on progress
		const threshold = 0.5;
		const shouldBeOn = animationProgress.value > threshold;
		
		if (shouldBeOn !== model.value) {
			toggle(e, 'swipe');
		} else {
			// Snap back to current state
			animationProgress.value = model.value ? 1 : 0;
		}
	}

	/**
	 * Focus event handler
	 */
	function handleFocus(e: FocusEvent): void {
		keyboardMode.value = true;
		
		const focusEvent: BSwitchFocusEvent = {
			event: e,
			state: currentState.value,
			type: 'focus',
		};
		
		emit('focus', focusEvent);
	}

	/**
	 * Blur event handler
	 */
	function handleBlur(e: FocusEvent): void {
		keyboardMode.value = false;
		
		const blurEvent: BSwitchFocusEvent = {
			event: e,
			state: currentState.value,
			type: 'blur',
		};
		
		emit('blur', blurEvent);
	}

	/**
	 * Handle click events with accessibility considerations
	 */
	function handleClick(event: MouseEvent): void {
		if (!isInteractive.value || isDragging.value) {
			event.preventDefault();
			return;
		}
		toggle(event, 'click');
	}

	/**
	 * Auto-focus handling
	 */
	function handleAutofocus(): void {
		if (props.autofocus && switchRef.value && isInteractive.value) {
			nextTick(() => {
				switchRef.value?.focus();
			});
		}
	}

	// Watch for external state changes to announce them
	watch(() => props.modelValue, (newVal, oldVal) => {
		if (props.announceChanges && newVal !== oldVal && newVal !== undefined) {
			nextTick(() => {
				const state = newVal ? props.onLabel : props.offLabel;
				const roleText = props.role === 'checkbox' ? 'Checkbox' : 'Switch';
				screenReader.announcePolitely(`${roleText} state changed to ${state.toLowerCase()}`);
			});
		}
	});

	// Watch for validation state changes
	watch(() => props.validationState, (newState) => {
		if (newState === 'error' && props.errorMessage) {
			validationMessage.value = props.errorMessage;
			screenReader.announceAssertively(`Error: ${props.errorMessage}`);
		} else if (newState === 'success' && props.successMessage) {
			validationMessage.value = '';
			screenReader.announcePolitely(props.successMessage);
		} else if (newState === 'none') {
			validationMessage.value = '';
		}
	});

	// Watch for loading state changes
	watch(() => props.loading, (isLoading) => {
		if (isLoading && props.loadingMessage) {
			screenReader.announcePolitely(props.loadingMessage);
		} else if (!isLoading && isProcessing.value) {
			screenReader.announcePolitely('Processing complete');
		}
		isProcessing.value = isLoading;
	});

	// Handle autofocus on mount
	onMounted(() => {
		handleAutofocus();
		
		// Add global event listeners for touch/mouse interactions
		document.addEventListener('mousemove', handleInteractionMove);
		document.addEventListener('mouseup', handleInteractionEnd);
		document.addEventListener('touchmove', handleInteractionMove, { passive: false });
		document.addEventListener('touchend', handleInteractionEnd);
	});
</script>

<template>
	<!-- Switch group container for grouped switches -->
	<fieldset 
		v-if="grouped && groupLabel"
		:id="groupId"
		class="b-switch-group"
		:aria-labelledby="`${groupId}-legend`">
		<legend :id="`${groupId}-legend`" class="sr-only">{{ groupLabel }}</legend>
		<div
			:id="switchId"
			ref="switchRef"
			:role="role"
			:tabindex="computedTabIndex"
			:aria-checked="role === 'switch' ? model : undefined"
			:aria-selected="role === 'checkbox' ? model : undefined"
			:aria-disabled="disabled"
			:aria-readonly="readonly"
			:aria-required="required"
			:aria-invalid="invalid || validationState === 'error' || !!validationMessage"
			:aria-busy="loading || isProcessing"
			:aria-label="switchAriaLabel"
			:aria-describedby="computedAriaDescribedBy"
			:aria-labelledby="$slots.default ? labelId : undefined"
			:aria-setsize="groupSize"
			:aria-posinset="groupPosition"
			class="b-switch"
			:class="{ 
				'flex-row-reverse': rhs, 
				'disabled': disabled,
				'readonly': readonly,
				'loading': loading || isProcessing,
				'keyboard-focus': keyboardMode,
				'invalid': invalid || validationState === 'error' || !!validationMessage,
				'valid': validationState === 'success',
				'warning': validationState === 'warning',
				[`size-${size}`]: size !== 'md',
				[`variant-${variant}`]: variant !== 'ios',
				[`role-${role}`]: role !== 'switch'
			}"
			@click="handleClick"
			@keydown="handleKeyDown"
			@focus="handleFocus"
			@blur="handleBlur"
			@mousedown="handleInteractionStart"
			@touchstart="handleInteractionStart">
			
			<!-- Hidden descriptions for screen readers -->
			<div 
				v-if="ariaDescription" 
				:id="descriptionId" 
				class="sr-only">
				{{ ariaDescription }}
			</div>
			
			<!-- Error message for screen readers -->
			<div 
				v-if="(errorMessage && (invalid || validationState === 'error')) || validationMessage" 
				:id="errorId" 
				class="sr-only"
				role="alert"
				aria-live="assertive">
				{{ validationMessage || errorMessage }}
			</div>
			
			<!-- Success message for screen readers -->
			<div 
				v-if="successMessage && validationState === 'success'" 
				:id="successId" 
				class="sr-only"
				role="status"
				aria-live="polite">
				{{ successMessage }}
			</div>
			
			<!-- iOS-style Switch Track -->
			<div
				ref="trackRef"
				class="switch-track"
				:class="{ 
					'active': model,
					'keyboard-focus': keyboardMode,
					'loading': loading || isProcessing,
					'invalid': invalid || validationState === 'error' || !!validationMessage,
					'valid': validationState === 'success',
					'warning': validationState === 'warning',
					'readonly': readonly,
					'transitioning': isTransitioning
				}"
				:aria-hidden="true">
				
				<!-- State text inside track -->
				<div v-if="showStateText && !loading && !isProcessing" class="state-text">
					<span class="on-text" :class="{ visible: model }">
						{{ onText || onLabel }}
					</span>
					<span class="off-text" :class="{ visible: !model }">
						{{ offText || offLabel }}
					</span>
				</div>
				
				<!-- iOS-style Sliding Thumb -->
				<div
					ref="thumbRef"
					class="switch-thumb"
					:class="{ 
						'active': model,
						'dragging': isDragging,
						'has-content': thumbContent || showIcons || (showLoadingInThumb && (loading || isProcessing))
					}"
					:style="{ transform: thumbTransform }">
					
					<!-- Loading spinner in thumb -->
					<div 
						v-if="showLoadingInThumb && (loading || isProcessing)"
						class="loading-spinner"
						aria-hidden="true">
						<span class="sr-only">{{ loadingMessage }}</span>
					</div>
					
					<!-- Icons in thumb -->
					<template v-else-if="showIcons && (onIcon || offIcon)">
						<span 
							v-if="model && onIcon" 
							class="thumb-icon on-icon"
							:aria-hidden="true">
							{{ onIcon }}
						</span>
						<span 
							v-else-if="!model && offIcon" 
							class="thumb-icon off-icon"
							:aria-hidden="true">
							{{ offIcon }}
						</span>
					</template>
					
					<!-- Custom thumb content slot -->
					<template v-else-if="thumbContent">
						<slot name="thumb" :active="model" :loading="loading || isProcessing" />
					</template>
					
					<!-- State indicator for screen readers -->
					<span class="sr-only">
						{{ model ? onLabel : offLabel }}
					</span>
					
					<!-- Validation icon -->
					<span 
						v-if="validationIcon && !loading && !isProcessing"
						class="validation-icon"
						aria-hidden="true">
						{{ validationIcon }}
					</span>
				</div>
			</div>
			
			<!-- Switch label -->
			<template v-if="$slots.default">
				<label
					:id="labelId"
					:for="switchId"
					class="switch-label"
					:class="{
						'cursor-pointer': isInteractive,
						'cursor-not-allowed': disabled,
						'cursor-default': readonly || loading || isProcessing,
						'text-error': invalid || validationState === 'error' || !!validationMessage,
						'text-success': validationState === 'success',
						'text-warning': validationState === 'warning'
					}"
					@click="handleClick">
					<slot />
					<!-- Required indicator -->
					<span 
						v-if="required" 
						class="required-indicator"
						aria-hidden="true">
						*
					</span>
				</label>
			</template>
			
			<!-- Validation message display -->
			<div 
				v-if="(invalid || validationState === 'error' || validationMessage) && (errorMessage || validationMessage)"
				class="validation-message error-message"
				role="alert"
				aria-live="assertive">
				{{ validationMessage || errorMessage }}
			</div>
			
			<div 
				v-else-if="validationState === 'success' && successMessage"
				class="validation-message success-message"
				role="status"
				aria-live="polite">
				{{ successMessage }}
			</div>
			
			<!-- Live region for state announcements -->
			<div 
				aria-live="polite" 
				aria-atomic="true" 
				class="sr-only">
				{{ announceChanges ? stateDescription : '' }}
			</div>
		</div>
	</fieldset>
	
	<!-- Standard switch (not grouped) -->
	<div
		v-else
		:id="switchId"
		ref="switchRef"
		:role="role"
		:tabindex="computedTabIndex"
		:aria-checked="role === 'switch' ? model : undefined"
		:aria-selected="role === 'checkbox' ? model : undefined"
		:aria-disabled="disabled"
		:aria-readonly="readonly"
		:aria-required="required"
		:aria-invalid="invalid || validationState === 'error' || !!validationMessage"
		:aria-busy="loading || isProcessing"
		:aria-label="switchAriaLabel"
		:aria-describedby="computedAriaDescribedBy"
		:aria-labelledby="$slots.default ? labelId : undefined"
		class="b-switch"
		:class="{ 
			'flex-row-reverse': rhs, 
			'disabled': disabled,
			'readonly': readonly,
			'loading': loading || isProcessing,
			'keyboard-focus': keyboardMode,
			'invalid': invalid || validationState === 'error' || !!validationMessage,
			'valid': validationState === 'success',
			'warning': validationState === 'warning',
			[`size-${size}`]: size !== 'md',
			[`variant-${variant}`]: variant !== 'ios',
			[`role-${role}`]: role !== 'switch'
		}"
		@click="handleClick"
		@keydown="handleKeyDown"
		@focus="handleFocus"
		@blur="handleBlur"
		@mousedown="handleInteractionStart"
		@touchstart="handleInteractionStart">
		
		<!-- Hidden descriptions for screen readers -->
		<div 
			v-if="ariaDescription" 
			:id="descriptionId" 
			class="sr-only">
			{{ ariaDescription }}
		</div>
		
		<!-- Error message for screen readers -->
		<div 
			v-if="(errorMessage && (invalid || validationState === 'error')) || validationMessage" 
			:id="errorId" 
			class="sr-only"
			role="alert"
			aria-live="assertive">
			{{ validationMessage || errorMessage }}
		</div>
		
		<!-- Success message for screen readers -->
		<div 
			v-if="successMessage && validationState === 'success'" 
			:id="successId" 
			class="sr-only"
			role="status"
			aria-live="polite">
			{{ successMessage }}
		</div>
		
		<!-- iOS-style Switch Track -->
		<div
			ref="trackRef"
			class="switch-track"
			:class="{ 
				'active': model,
				'keyboard-focus': keyboardMode,
				'loading': loading || isProcessing,
				'invalid': invalid || validationState === 'error' || !!validationMessage,
				'valid': validationState === 'success',
				'warning': validationState === 'warning',
				'readonly': readonly,
				'transitioning': isTransitioning
			}"
			:aria-hidden="true">
			
			<!-- State text inside track -->
			<div v-if="showStateText && !loading && !isProcessing" class="state-text">
				<span class="on-text" :class="{ visible: model }">
					{{ onText || onLabel }}
				</span>
				<span class="off-text" :class="{ visible: !model }">
					{{ offText || offLabel }}
				</span>
			</div>
			
			<!-- iOS-style Sliding Thumb -->
			<div
				ref="thumbRef"
				class="switch-thumb"
				:class="{ 
					'active': model,
					'dragging': isDragging,
					'has-content': thumbContent || showIcons || (showLoadingInThumb && (loading || isProcessing))
				}"
				:style="{ transform: thumbTransform }">
				
				<!-- Loading spinner in thumb -->
				<div 
					v-if="showLoadingInThumb && (loading || isProcessing)"
					class="loading-spinner"
					aria-hidden="true">
					<span class="sr-only">{{ loadingMessage }}</span>
				</div>
				
				<!-- Icons in thumb -->
				<template v-else-if="showIcons && (onIcon || offIcon)">
					<span 
						v-if="model && onIcon" 
						class="thumb-icon on-icon"
						:aria-hidden="true">
						{{ onIcon }}
					</span>
					<span 
						v-else-if="!model && offIcon" 
						class="thumb-icon off-icon"
						:aria-hidden="true">
						{{ offIcon }}
					</span>
				</template>
				
				<!-- Custom thumb content slot -->
				<template v-else-if="thumbContent">
					<slot name="thumb" :active="model" :loading="loading || isProcessing" />
				</template>
				
				<!-- State indicator for screen readers -->
				<span class="sr-only">
					{{ model ? onLabel : offLabel }}
				</span>
				
				<!-- Validation icon -->
				<span 
					v-if="validationIcon && !loading && !isProcessing"
					class="validation-icon"
					aria-hidden="true">
					{{ validationIcon }}
				</span>
			</div>
		</div>
		
		<!-- Switch label -->
		<template v-if="$slots.default">
			<label
				:id="labelId"
				:for="switchId"
				class="switch-label"
				:class="{
					'cursor-pointer': isInteractive,
					'cursor-not-allowed': disabled,
					'cursor-default': readonly || loading || isProcessing,
					'text-error': invalid || validationState === 'error' || !!validationMessage,
					'text-success': validationState === 'success',
					'text-warning': validationState === 'warning'
				}"
				@click="handleClick">
				<slot />
				<!-- Required indicator -->
				<span 
					v-if="required" 
					class="required-indicator"
					aria-hidden="true">
					*
				</span>
			</label>
		</template>
		
		<!-- Validation message display -->
		<div 
			v-if="(invalid || validationState === 'error' || validationMessage) && (errorMessage || validationMessage)"
			class="validation-message error-message"
			role="alert"
			aria-live="assertive">
			{{ validationMessage || errorMessage }}
		</div>
		
		<div 
			v-else-if="validationState === 'success' && successMessage"
			class="validation-message success-message"
			role="status"
			aria-live="polite">
			{{ successMessage }}
		</div>
		
		<!-- Live region for state announcements -->
		<div 
			aria-live="polite" 
			aria-atomic="true" 
			class="sr-only">
			{{ announceChanges ? stateDescription : '' }}
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	.b-switch {
		@apply inline-flex text-base gap-xs items-center cursor-pointer relative;
		transition: all 0.2s ease;
		min-height: 44px; /* WCAG touch target minimum */
	}

	.b-switch:focus {
		@apply outline-none;
	}

	/* Keyboard focus styles */
	.b-switch.keyboard-focus {
		@apply outline-none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
		border-radius: var(--rounded-base);
	}

	.b-switch.disabled {
		@apply pointer-events-none opacity-60 cursor-not-allowed;

		.switch-track {
			@apply bg-neutral-surface-disabled border-neutral-border-disabled;
		}

		.switch-label {
			@apply text-neutral-interaction-disabled;
		}
	}

	.b-switch.readonly {
		@apply pointer-events-none;

		.switch-track {
			@apply opacity-75 border-neutral-border-default;
		}

		.switch-label {
			@apply text-neutral-foreground-default;
		}
	}

	.b-switch.loading {
		@apply pointer-events-none;

		.switch-label {
			@apply text-neutral-foreground-low;
		}
	}

	/* Size variants - iOS-style dimensions */
	.b-switch.size-sm {
		@apply text-sm gap-xxs;
	}

	.b-switch.size-sm .switch-track {
		@apply h-[1.375rem] w-[2.25rem]; /* 22px x 36px */
	}

	.b-switch.size-sm .switch-thumb {
		@apply w-[1.125rem] h-[1.125rem]; /* 18px */
	}

	.b-switch.size-lg {
		@apply text-lg gap-sm;
	}

	.b-switch.size-lg .switch-track {
		@apply h-[1.875rem] w-[3.25rem]; /* 30px x 52px */
	}

	.b-switch.size-lg .switch-thumb {
		@apply w-[1.625rem] h-[1.625rem]; /* 26px */
	}

	.b-switch.size-xl {
		@apply text-xl gap-md;
	}

	.b-switch.size-xl .switch-track {
		@apply h-[2.25rem] w-[3.75rem]; /* 36px x 60px */
	}

	.b-switch.size-xl .switch-thumb {
		@apply w-[2rem] h-[2rem]; /* 32px */
	}

	/* iOS-style Switch Track */
	.switch-track {
		@apply relative inline-flex items-center justify-between;
		@apply h-[1.625rem] w-[2.75rem]; /* Default: 26px x 44px */
		@apply bg-neutral-interaction-default border border-neutral-border-default;
		@apply rounded-full overflow-hidden;
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.switch-track.active {
		@apply bg-primary-interaction-default border-primary-border-default;
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.switch-track.loading {
		@apply bg-neutral-interaction-default;
	}

	.switch-track.invalid {
		@apply border-error-border-default;
		box-shadow: 0 0 0 1px var(--color-error-border-default);
	}

	.switch-track.valid {
		@apply border-success-border-default;
		box-shadow: 0 0 0 1px var(--color-success-border-default);
	}

	.switch-track.warning {
		@apply border-warning-border-default;
		box-shadow: 0 0 0 1px var(--color-warning-border-default);
	}

	.switch-track.readonly {
		@apply bg-neutral-surface-disabled border-neutral-border-default;
	}

	.switch-track.keyboard-focus {
		@apply outline-none;
		box-shadow: inset 0 0 0 2px var(--color-neutral-surface-default), 0 0 0 2px var(--color-primary-interaction-default);
	}

	/* iOS-style Sliding Thumb */
	.switch-thumb {
		@apply absolute top-[2px] left-[2px];
		@apply w-[1.375rem] h-[1.375rem]; /* Default: 22px */
		@apply bg-white rounded-full flex items-center justify-center;
		@apply shadow-md;
		transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05);
		will-change: transform;
	}

	.switch-thumb.dragging {
		transition: none; /* Disable transition during drag */
	}

	.switch-thumb.has-content {
		@apply text-xs;
	}

	/* State text inside track */
	.state-text {
		@apply absolute inset-0 flex items-center justify-between px-2 text-xs font-medium pointer-events-none;
		z-index: 1;
	}

	.on-text,
	.off-text {
		@apply transition-opacity duration-300;
		opacity: 0;
	}

	.on-text.visible {
		@apply text-primary-foreground-negative;
		opacity: 1;
	}

	.off-text.visible {
		@apply text-neutral-foreground-low;
		opacity: 1;
	}

	/* Thumb icons */
	.thumb-icon {
		@apply text-xs leading-none;
	}

	.on-icon {
		@apply text-primary-foreground-default;
	}

	.off-icon {
		@apply text-neutral-foreground-low;
	}

	/* Switch label */
	.switch-label {
		@apply text-sm text-neutral-interaction-default select-none;
		transition: color 0.2s ease;
		min-height: 44px;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.switch-label .required-indicator {
		@apply text-error-foreground-default font-medium;
	}

	.switch-label.text-error {
		@apply text-error-foreground-default;
	}

	.switch-label.text-success {
		@apply text-success-foreground-default;
	}

	.switch-label.text-warning {
		@apply text-warning-foreground-default;
	}

	/* Hover states */
	.b-switch:hover:not(.disabled) .switch-track {
		@apply bg-neutral-interaction-hover border-neutral-border-hover;
		transform: scale(1.02);
	}

	.b-switch:hover:not(.disabled) .switch-track.active {
		@apply bg-primary-interaction-hover border-primary-border-hover;
	}

	.b-switch:hover:not(.disabled) .switch-label {
		@apply text-neutral-interaction-hover;
	}

	/* Active/pressed states */
	.b-switch:active:not(.disabled) .switch-track {
		transform: scale(0.98);
	}

	.b-switch:active:not(.disabled) .switch-thumb {
		transform: translateX(var(--thumb-translate-x, 0)) scale(0.95);
	}

	/* Screen reader only content */
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

	/* High contrast support */
	@media (prefers-contrast: high) {
		.b-switch.keyboard-focus {
			box-shadow: 0 0 0 3px var(--color-primary-interaction-default);
		}
		
		.switch-track {
			border-width: 2px;
		}
		
		.switch-track.active {
			border-color: var(--color-primary-border-default);
		}
		
		.switch-track.invalid {
			border: 3px solid var(--color-error-border-default);
		}
		
		.switch-track.valid {
			border: 3px solid var(--color-success-border-default);
		}

		.switch-thumb {
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(0, 0, 0, 0.1);
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.b-switch,
		.switch-track,
		.switch-thumb,
		.switch-label,
		.loading-spinner,
		.state-text,
		.on-text,
		.off-text {
			transition: none !important;
			animation: none !important;
		}
		
		.switch-thumb {
			will-change: auto;
		}
	}

	/* Loading spinner */
	.loading-spinner {
		@apply w-3 h-3 border-2 border-current border-t-transparent rounded-full;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.validation-icon {
		@apply text-xs absolute -top-1 -right-1;
	}

	/* Validation messages */
	.validation-message {
		@apply text-xs mt-1 px-2 py-1 rounded;
	}

	.error-message {
		@apply text-error-foreground-default bg-error-surface-default;
	}

	.success-message {
		@apply text-success-foreground-default bg-success-surface-default;
	}

	/* Switch group styles */
	.b-switch-group {
		@apply border-0 p-0 m-0;
	}

	.b-switch-group legend {
		@apply p-0 m-0;
	}

	/* Variant styles */
	.b-switch.variant-modern .switch-track {
		@apply rounded-lg;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.b-switch.variant-minimal .switch-track {
		@apply border-0 shadow-none;
		background: rgba(0, 0, 0, 0.1);
	}

	.b-switch.variant-compact .switch-track {
		@apply h-5 w-9;
	}

	.b-switch.variant-compact .switch-thumb {
		@apply w-4 h-4;
	}

	/* Role-specific styles */
	.b-switch.role-checkbox .switch-track {
		@apply rounded-md;
	}

	/* Focus visible for modern browsers */
	.b-switch:focus-visible {
		@apply outline-none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
		border-radius: var(--rounded-base);
	}

	/* Touch device optimizations */
	@media (hover: none) and (pointer: coarse) {
		.b-switch {
			min-height: 48px; /* Larger touch target for mobile */
		}
		
		.switch-track {
			transform: none; /* Disable hover scaling on touch devices */
		}
		
		.b-switch:hover:not(.disabled) .switch-track {
			transform: none;
		}
	}
</style>