<script setup lang="ts">
	import { ref, watch, onBeforeMount, computed, nextTick, onMounted, onBeforeUnmount } from "vue";
	import { isObject } from "../../utils";
	import type { 
		BStepperProps,
		BStepperEmits,
		BStepperState,
		BStepperAriaAttributes,
		BStepAriaAttributes,
		BStepperItem,
		BStepperModelValue,
		BStepperStepStatus,
		DEFAULT_STEPPER_ACCESSIBILITY_CONFIG,
		DEFAULT_STEPPER_KEYBOARD_CONFIG,
		DEFAULT_STEPPER_ANNOUNCEMENTS
	} from "./BStepper.types";
	import { useAriaAttributes, useScreenReader, useKeyboardNavigation } from "#composables";

	const props = withDefaults(
		defineProps<BStepperProps & {
			/** The currently selected step */
			modelValue?: BStepperModelValue;
			/** Array of step items */
			items: BStepperItem[];
			/** Size of the stepper */
			size?: "small" | "medium" | "large";
			/** Whether the stepper is disabled */
			disabled?: boolean;
			/** Whether users can skip steps */
			allowedSkip?: boolean;
			/** Background color CSS value */
			background?: string;
			/** Visual version of the stepper */
			version?: 1 | 2;
			/** Whether to show step numbers */
			showStepNumbers?: boolean;
			/** Whether to show step labels */
			showStepLabels?: boolean;
		}>(),
		{
			// Legacy props
			modelValue: undefined,
			size: "medium",
			disabled: false,
			allowedSkip: false,
			background: "var(--neutral-background-default)",
			version: 1,
			showStepNumbers: true,
			showStepLabels: true,
			// Accessibility props with defaults
			...DEFAULT_STEPPER_ACCESSIBILITY_CONFIG,
			keyboardConfig: () => DEFAULT_STEPPER_KEYBOARD_CONFIG,
		}
	);

	const emit = defineEmits<BStepperEmits>();

	// Composables
	const { useAriaId } = useAriaAttributes();
	const { announcePolitely, announceAssertively } = useScreenReader();
	const { handleKeyNavigation } = useKeyboardNavigation();

	// Template refs
	const stepperElement = ref<HTMLElement>();
	const stepElements = ref<HTMLElement[]>([]);

	// Generate unique IDs for ARIA relationships
	const stepperId = computed(() => props.id || useAriaId('stepper'));
	const labelId = computed(() => `${stepperId.value}-label`);
	const descriptionId = computed(() => `${stepperId.value}-description`);
	const progressId = computed(() => `${stepperId.value}-progress`);
	const instructionsId = computed(() => `${stepperId.value}-instructions`);

	// Component state
	const model = ref<BStepperModelValue>(props.modelValue);
	const step = ref(0);
	const biggerStepSelected = ref(0);
	const passedIn = ref(new Set<number>());
	const isFocused = ref(false);
	const focusedStepIndex = ref(-1);
	const keyboardMode = ref(false);

	// Initialize first step as completed
	passedIn.value.add(0);

	// Computed properties
	const isDisabled = computed(() => props.disabled);
	const canSkipSteps = computed(() => props.allowedSkip);
	const totalSteps = computed(() => props.items.length);

	// Component state for accessibility
	const stepperState = computed((): BStepperState => ({
		currentStep: step.value,
		totalSteps: totalSteps.value,
		hasFocus: isFocused.value,
		focusedStepIndex: focusedStepIndex.value,
		keyboardMode: keyboardMode.value,
		completedSteps: new Set([...passedIn.value]),
		progressPercentage: Math.round(((step.value + 1) / totalSteps.value) * 100),
		isDisabled: isDisabled.value,
		allowStepSkipping: canSkipSteps.value,
	}));

	// ARIA attributes for stepper container
	const stepperAriaAttributes = computed((): BStepperAriaAttributes => {
		const describedByIds = [
			props.ariaDescribedBy,
			descriptionId.value,
			props.screenReaderInstructions ? instructionsId.value : undefined,
		].filter(Boolean);

		return {
			role: props.role || 'tablist',
			...(props.ariaLabel && { 'aria-label': props.ariaLabel }),
			...(props.ariaLabelledBy && { 'aria-labelledby': props.ariaLabelledBy }),
			...(describedByIds.length > 0 && { 'aria-describedby': describedByIds.join(' ') }),
			'aria-orientation': 'horizontal',
			...(isDisabled.value && { 'aria-disabled': true }),
			...(props.showProgress && { 'aria-live': props.liveRegionPoliteness || 'polite' }),
			...(props.showProgress && { 'aria-atomic': true }),
		};
	});

	// Computed accessibility properties
	const stepperAriaLabel = computed(() => {
		if (props.ariaLabel) return props.ariaLabel;
		return `Step navigation: ${step.value + 1} of ${totalSteps.value}`;
	});

	const stepperDescription = computed(() => {
		let desc = props.ariaDescription || 'Multi-step process navigation. ';
		if (canSkipSteps.value) desc += 'Steps can be skipped. ';
		desc += 'Use arrow keys to navigate between steps and Enter or Space to select.';
		return desc;
	});

	const progressPercentage = computed(() => {
		return Math.round(((step.value + 1) / totalSteps.value) * 100);
	});

	const statusMessage = computed(() => {
		const currentItem = props.items[step.value];
		const label = getStepLabel(currentItem);
		return `Step ${step.value + 1} of ${totalSteps.value}: ${label}. ${progressPercentage.value}% complete.`;
	});

	// Lifecycle hooks
	onBeforeMount(() => {
		const firstItem = props.items[0];
		if (!model.value && firstItem) changeActiveStep(firstItem, 0);
	});

	onMounted(() => {
		// Set initial focused step to current step
		if (focusedStepIndex.value === -1) {
			focusedStepIndex.value = step.value;
		}
	});

	// Watchers
	watch(
		() => props.modelValue,
		(newValue) => {
			model.value = newValue;
			if (model.value) {
				const index = findIndex(model.value);
				if (index === -1) return;

				const previousStep = step.value;
				step.value = index;
				passedIn.value.add(index);
				
				if (biggerStepSelected.value < index && step.value === index) {
					biggerStepSelected.value = index;
				}
				
				// Set initial focused step
				if (focusedStepIndex.value === -1) {
					focusedStepIndex.value = index;
				}

				// Emit progress change
				if (previousStep !== index) {
					emit('progress-change', progressPercentage.value, step.value, totalSteps.value);
				}
			}
		}
	);

	// Watch for progress changes and emit accessibility events
	watch(
		() => progressPercentage.value,
		(newProgress) => {
			if (props.showProgress && props.announceChanges) {
				const message = DEFAULT_STEPPER_ANNOUNCEMENTS.progress
					.replace('{progressPercentage}', newProgress.toString())
					.replace('{stepNumber}', (step.value + 1).toString())
					.replace('{totalSteps}', totalSteps.value.toString());
				
				nextTick(() => announcePolitely(message));
			}
		}
	);

	/**
	 * Gets ARIA attributes for a specific step
	 */
	function getStepAriaAttributes(index: number, item: BStepperItem): BStepAriaAttributes {
		const isCurrentStep = index === step.value;
		const isFocusedStep = index === focusedStepIndex.value;
		const stepLabel = getStepLabel(item);
		const stepStatus = getStepStatus(index);

		return {
			role: props.version === 1 ? 'tab' : 'tab',
			'aria-selected': isCurrentStep,
			'aria-current': isCurrentStep ? 'step' : undefined,
			'aria-disabled': !isStepAccessible(index),
			'aria-label': `Step ${index + 1} of ${totalSteps.value}: ${stepLabel} - ${stepStatus}`,
			'aria-describedby': `step-${index}-status`,
			'aria-posinset': index + 1,
			'aria-setsize': totalSteps.value,
			tabindex: (isCurrentStep || (index === 0 && step.value === -1)) ? 0 : -1,
		};
	}

	/**
	 * Changes the active step to the specified item and index
	 */
	function changeActiveStep(item: BStepperItem, index: number): void {
		const previousStep = step.value;
		const previousStatus = getStepStatus(index);
		
		if (!isDisabled.value) {
			if (
				biggerStepSelected.value + 1 === index ||
				step.value > index ||
				biggerStepSelected.value >= index ||
				canSkipSteps.value
			) {
				step.value = index;
				model.value = item;
				emit("update:modelValue", item);
				
				// Update focus
				focusedStepIndex.value = index;
				
				// Announce step change to screen readers
				if (props.announceChanges && previousStep !== index) {
					const label = getStepLabel(item);
					const message = (props.announcementTemplate || DEFAULT_STEPPER_ANNOUNCEMENTS.stepChange)
						.replace('{stepNumber}', (index + 1).toString())
						.replace('{totalSteps}', totalSteps.value.toString())
						.replace('{stepLabel}', label);
					announcePolitely(message);
				}
			}

			if (biggerStepSelected.value < index && step.value === index) {
				biggerStepSelected.value = index;
			}
		}

		passedIn.value.add(index);
		emit("changeStep", item, index);

		// Emit status change if it changed
		const newStatus = getStepStatus(index);
		if (previousStatus !== newStatus) {
			emit('step-status-change', index, previousStatus, newStatus);
		}

		// Emit progress change
		emit('progress-change', progressPercentage.value, step.value, totalSteps.value);
	}

	function isSkipped(index: number): boolean {
		return (
			!passedIn.value.has(index) &&
			index < biggerStepSelected.value &&
			props.allowedSkip
		);
	}

	/**
	 * Gets the value from a stepper item
	 */
	function getValue(item: BStepperItem): unknown {
		return isObject(item) ? (item as Record<string, unknown>).value : item;
	}

	/**
	 * Finds the index of an item in the items array
	 */
	function findIndex(item: BStepperItem | undefined): number {
		if (!item) return -1;
		return props.items.findIndex((i) => getValue(i) == getValue(item));
	}

	/**
	 * Gets the display label for a step item
	 */
	function getStepLabel(item: BStepperItem): string {
		if (typeof item === 'string') return item;
		if (typeof item === 'object' && item && 'label' in item) {
			return item.label as string || String(item.value || '');
		}
		return String(item);
	}

	/**
	 * Gets the step status for accessibility
	 */
	function getStepStatus(index: number): string {
		if (index === step.value) return 'current';
		if (index <= biggerStepSelected.value || passedIn.value.has(index)) return 'completed';
		if (isSkipped(index)) return 'skipped';
		return 'incomplete';
	}

	/**
	 * Checks if a step is accessible (can be clicked/navigated to)
	 */
	function isStepAccessible(index: number): boolean {
		if (props.disabled) return false;
		return (
			biggerStepSelected.value + 1 === index ||
			step.value > index ||
			biggerStepSelected.value >= index ||
			props.allowedSkip
		);
	}

	// Enhanced keyboard navigation functions
	function handleStepperKeyDown(event: KeyboardEvent): void {
		if (isDisabled.value || !props.keyboardNavigation) return;

		keyboardMode.value = true;
		const keyboardConfig = props.keyboardConfig || DEFAULT_STEPPER_KEYBOARD_CONFIG;
		const { key } = event;

		// Handle navigation keys
		if (keyboardConfig.nextKeys?.includes(key)) {
			event.preventDefault();
			navigateStep(1);
			emit('keyboard', event, 'navigate-next');
			return;
		}

		if (keyboardConfig.prevKeys?.includes(key)) {
			event.preventDefault();
			navigateStep(-1);
			emit('keyboard', event, 'navigate-prev');
			return;
		}

		// Handle activation keys
		if (keyboardConfig.activationKeys?.includes(key)) {
			event.preventDefault();
			activateFocusedStep();
			emit('keyboard', event, 'activate');
			return;
		}

		// Handle first/last navigation
		if (keyboardConfig.firstKeys?.includes(key) && keyboardConfig.homeEndNavigation) {
			event.preventDefault();
			focusedStepIndex.value = 0;
			announceFocusedStep();
			emit('keyboard', event, 'navigate-first');
			return;
		}

		if (keyboardConfig.lastKeys?.includes(key) && keyboardConfig.homeEndNavigation) {
			event.preventDefault();
			focusedStepIndex.value = totalSteps.value - 1;
			announceFocusedStep();
			emit('keyboard', event, 'navigate-last');
			return;
		}

		// Handle numeric navigation (1-9)
		if (keyboardConfig.numericNavigation && /^[1-9]$/.test(key)) {
			const targetIndex = parseInt(key) - 1;
			if (targetIndex < totalSteps.value) {
				event.preventDefault();
				focusedStepIndex.value = targetIndex;
				announceFocusedStep();
				emit('keyboard', event, `navigate-numeric-${key}`);
			}
			return;
		}
	}

	function navigateStep(delta: number): void {
		const currentIndex = focusedStepIndex.value;
		let newIndex = currentIndex + delta;

		const keyboardConfig = props.keyboardConfig || DEFAULT_STEPPER_KEYBOARD_CONFIG;
		
		if (keyboardConfig.wrapNavigation) {
			if (newIndex < 0) {
				newIndex = totalSteps.value - 1;
			} else if (newIndex >= totalSteps.value) {
				newIndex = 0;
			}
		} else {
			newIndex = Math.max(0, Math.min(totalSteps.value - 1, newIndex));
		}

		if (newIndex !== currentIndex) {
			focusedStepIndex.value = newIndex;
			announceFocusedStep();
			
			// Focus the corresponding step element
			nextTick(() => {
				const stepElement = stepElements.value[newIndex];
				if (stepElement) {
					stepElement.focus();
				}
			});
		}
	}

	function activateFocusedStep(): void {
		if (focusedStepIndex.value >= 0 && focusedStepIndex.value < totalSteps.value) {
			const item = props.items[focusedStepIndex.value];
			if (isStepAccessible(focusedStepIndex.value)) {
				changeActiveStep(item, focusedStepIndex.value);
			} else {
				// Announce why step cannot be activated
				const message = `Step ${focusedStepIndex.value + 1} cannot be selected. Complete previous steps first.`;
				announceAssertively(message);
			}
		}
	}

	function announceFocusedStep(): void {
		if (focusedStepIndex.value >= 0 && focusedStepIndex.value < totalSteps.value) {
			const item = props.items[focusedStepIndex.value];
			const label = getStepLabel(item);
			const status = getStepStatus(focusedStepIndex.value);
			const accessible = isStepAccessible(focusedStepIndex.value) ? 'selectable' : 'not selectable';
			
			const message = DEFAULT_STEPPER_ANNOUNCEMENTS.stepFocus
				.replace('{stepNumber}', (focusedStepIndex.value + 1).toString())
				.replace('{totalSteps}', totalSteps.value.toString())
				.replace('{stepLabel}', label)
				.replace('{description}', `Status: ${status}, ${accessible}`);
			
			announcePolitely(message);
		}
	}

	// Focus and blur handlers
	function handleStepperFocus(): void {
		isFocused.value = true;
		
		// Set focused step if none is set
		if (focusedStepIndex.value === -1) {
			focusedStepIndex.value = step.value;
		}
	}

	function handleStepperBlur(): void {
		isFocused.value = false;
	}

	function handleStepFocus(item: BStepperItem, index: number): void {
		focusedStepIndex.value = index;
		isFocused.value = true;
		emit('step-focus', item, index);
	}

	function handleStepBlur(item: BStepperItem, index: number): void {
		emit('step-blur', item, index);
	}

	function handleMouseInteraction(): void {
		keyboardMode.value = false;
	}

	function handleStepClick(item: BStepperItem, index: number, event: MouseEvent): void {
		handleMouseInteraction();
		
		if (isStepAccessible(index)) {
			changeActiveStep(item, index);
		} else {
			event.preventDefault();
			// Provide feedback for inaccessible steps
			const message = `Step ${index + 1} is not accessible. Complete previous steps first.`;
			announceAssertively(message);
		}
	}

	/**
	 * Gets the icon for a step item
	 */
	function getStepIcon(item: BStepperItem): string {
		if (typeof item === 'object' && item && 'icon' in item) {
			return item.icon as string || 'radio-button-on';
		}
		return 'radio-button-on';
	}
</script>
<template>
	<!-- Main stepper container with accessibility attributes -->
	<div
		ref="stepperElement"
		:id="stepperId"
		class="b-stepper"
		:class="{
			disabled: isDisabled,
			'high-contrast': highContrast,
			'reduced-motion': reduceMotion,
			'enhanced-focus': enhancedFocus,
			'min-touch-target': minTouchTarget,
			'keyboard-mode': keyboardMode,
			[`version-${version}`]: true,
			[size]: true,
		}"
		v-bind="stepperAriaAttributes"
		@keydown="handleStepperKeyDown"
		@focus="handleStepperFocus"
		@blur="handleStepperBlur">

		<!-- Version 1: Horizontal connected steps -->
		<div
			v-if="version === 1"
			class="stepper-v1 flex w-full"
			role="tablist"
			:aria-label="stepperAriaLabel">
			<button
				v-for="(item, index) in items"
				:key="`step-button-${index}`"
				:ref="(el) => (stepElements[index] = el as HTMLElement)"
				class="step-button"
				:class="[
					size,
					{
						'active-button': index === step,
						'first-button': index === 0,
						'last-button': !items[index + 1],
						'middle-button': index !== 0 && items[index + 1],
						'even-button': index % 2 === 0,
						'past-button': index <= biggerStepSelected,
						'keyboard-focus': keyboardMode && focusedStepIndex === index,
						'skip-button': isSkipped(index),
					},
				]"
				v-bind="getStepAriaAttributes(index, item)"
				@click="handleStepClick(item, index, $event)"
				@focus="handleStepFocus(item, index)"
				@blur="handleStepBlur(item, index)">
				
				<!-- Step number (optional) -->
				<span
					v-if="showStepNumbers"
					class="step-number"
					:aria-hidden="true">
					{{ index + 1 }}
				</span>

				<!-- Step label -->
				<span
					v-if="showStepLabels"
					class="step-value"
					:class="{ 'mr-[.6em]': showStepNumbers }">
					{{ getStepLabel(item) }}
				</span>

				<!-- Visual connectors -->
				<span
					v-if="index !== 0"
					class="before-triangle-cover"
					aria-hidden="true"></span>
				<span
					v-if="items[index + 1]"
					class="after-triangle-cover"
					aria-hidden="true"></span>

				<!-- Screen reader status for each step -->
				<span
					:id="`step-${index}-status`"
					class="sr-only">
					{{ getStepStatus(index) === 'completed' ? 'Completed' : 
						getStepStatus(index) === 'current' ? 'Current step' : 
						getStepStatus(index) === 'skipped' ? 'Skipped' :
						'Not completed' }}
				</span>
			</button>
		</div>

		<!-- Version 2: Circular steps with connecting lines -->
		<div
			v-if="version === 2"
			class="stepper-v2 flex justify-end"
			role="tablist"
			:aria-label="stepperAriaLabel">
			<div
				v-for="(item, index) in items"
				:key="`step-container-${index}`"
				class="step-container flex items-center"
				:class="[size, items[index + 1] ? 'w-full' : 'w-fit']">
				
				<!-- Progress indicator for screen readers -->
				<div 
					:id="`step-${index}-status`"
					class="sr-only">
					{{ getStepStatus(index) === 'completed' ? 'Completed' : 
						getStepStatus(index) === 'current' ? 'Current step' : 
						getStepStatus(index) === 'skipped' ? 'Skipped' :
						'Not completed' }}
				</div>

				<!-- Step button container with scaling -->
				<div
					class="button-container"
					:class="{
						'scale-[1.2]': index === step,
						'keyboard-focus-container': keyboardMode && focusedStepIndex === index,
					}">
					
					<!-- Background indicator (current step) -->
					<div
						v-if="index === step"
						class="background"
						aria-hidden="true">
						<div class="bg-primary-interaction-default h-[52.5%]" />
						<div class="neutral-border-color h-[47%]" />
					</div>
					<div
						v-else
						class="background"
						:class="[
							isSkipped(index) || index <= biggerStepSelected
								? 'bg-primary-interaction-default'
								: 'neutral-border-color',
						]"
						aria-hidden="true" />

					<!-- Circular step button -->
					<button
						:ref="(el) => (stepElements[index] = el as HTMLElement)"
						class="step-button-circle"
						:class="{
							'active-button': index === step,
							'past-button': index <= biggerStepSelected,
							'skip-button': isSkipped(index),
							'keyboard-focus': keyboardMode && focusedStepIndex === index,
						}"
						v-bind="getStepAriaAttributes(index, item)"
						:data-step-label="getStepLabel(item)"
						@click="handleStepClick(item, index, $event)"
						@focus="handleStepFocus(item, index)"
						@blur="handleStepBlur(item, index)">
						
						<!-- Step icon -->
						<BIcon 
							:name="getStepIcon(item)"
							aria-hidden="true" />

						<!-- Step number overlay (optional) -->
						<span
							v-if="showStepNumbers"
							class="step-number-overlay"
							aria-hidden="true">
							{{ index + 1 }}
						</span>
					</button>

					<!-- Step label below button (optional) -->
					<div
						v-if="showStepLabels"
						class="step-label-below"
						:class="{
							'active-label': index === step,
							'past-label': index <= biggerStepSelected,
						}"
						aria-hidden="true">
						{{ getStepLabel(item) }}
					</div>
				</div>

				<!-- Connection line to next step -->
				<div 
					v-if="items[index + 1]"
					class="right-line"
					:class="[
						index < biggerStepSelected
							? 'bg-primary-interaction-default'
							: 'neutral-border-color',
					]"
					role="separator"
					:aria-label="`Connection between step ${index + 1} and ${index + 2}`" />
			</div>
		</div>

		<!-- Screen reader descriptions and instructions -->
		<div
			:id="descriptionId"
			class="sr-only">
			{{ stepperDescription }}
		</div>

		<div
			v-if="screenReaderInstructions"
			:id="instructionsId"
			class="sr-only">
			{{ screenReaderInstructions }}
		</div>

		<!-- Progress information for screen readers -->
		<div
			v-if="showProgress"
			:id="progressId"
			class="sr-only"
			:aria-live="liveRegionPoliteness"
			aria-atomic="true">
			{{ statusMessage }}
		</div>

		<!-- Live region for dynamic announcements -->
		<div
			v-if="announceChanges"
			class="sr-only"
			:aria-live="liveRegionPoliteness"
			aria-atomic="true">
			<!-- Dynamic announcements will be inserted here -->
		</div>
	</div>
</template>
<style scoped>
	@import "../../assets/main.css";

	/* Base stepper container */
	.b-stepper {
		@apply relative;
	}

	.b-stepper:focus-within {
		outline: none;
	}

	/* Version 1 Styles - Horizontal connected steps */
	.stepper-v1 {
		@apply flex w-full;
	}

	.step-button {
		@apply flex items-center justify-center border-xxs h-[2.2em] border-neutral-border-default text-neutral-interaction-default pl-base ml-xs font-bold uppercase text-sm text-start relative transition-colors;
		border-top-right-radius: var(--rounded-xxs);
		border-bottom-right-radius: var(--rounded-xxs);
		width: 100%;
		background: v-bind(background);
		min-height: 44px; /* WCAG touch target minimum */

		.step-number {
			@apply text-xs font-semibold mr-2;
		}

		.step-value {
			@apply text-xs font-medium;
		}

		&::after {
			@apply right-[-19px];
		}
	}

	/* Interactive states for Version 1 */
	.step-button:hover:not([aria-disabled="true"]) {
		@apply bg-neutral-surface-highlight;
	}

	.step-button:focus-visible {
		@apply outline-none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
		z-index: 10;
	}

	.step-button.keyboard-focus {
		@apply outline-none;
		box-shadow: 0 0 0 3px var(--color-primary-interaction-default);
		z-index: 10;
	}

	/* Version 1 Button States and Connectors */
	.step-button:not(.first-button) {
		@apply border-l-0;
	}

	.step-button:not(.last-button) {
		@apply border-r-0;
	}

	.step-button:not(.first-button)::before {
		@apply z-2 absolute w-[20px] h-full -left-px top-1/2 translate-y-[-50%];
		content: "";
		background: v-bind(background);
		clip-path: polygon(0 0, 0 100%, 100% 50%);
	}

	.before-triangle-cover {
		@apply z-1 absolute w-[20px] h-full left-0 top-1/2 translate-y-[-50%];
		content: "";
		background: var(--neutral-border-default);
		clip-path: polygon(0 0, 0 100%, 100% 50%);
	}

	.step-button:not(.last-button)::after {
		@apply z-4 absolute w-[20px] h-full top-1/2 translate-y-[-50%] bg-inherit border-inherit;
		content: "";
		clip-path: polygon(0 0, 0 100%, 100% 50%);
	}

	.after-triangle-cover {
		@apply z-3 absolute w-[20px] h-[102%] right-[-20px] top-1/2 translate-y-[-50%] bg-inherit border-inherit;
		content: "";
		background: var(--neutral-border-default);
		clip-path: polygon(0 0, 0 100%, 100% 50%);
	}

	/* Step Button States */
	.step-button.active-button {
		@apply bg-primary-interaction-default text-neutral-foreground-negative border-primary-border-default;

		.before-triangle-cover,
		.after-triangle-cover {
			background: var(--color-primary-border-default);
		}
	}

	.step-button.active-button:hover:not([aria-disabled="true"]) {
		@apply bg-primary-interaction-hover border-primary-border-hover;

		.before-triangle-cover,
		.after-triangle-cover {
			background: var(--color-primary-border-hover);
		}
	}

	.step-button.past-button {
		@apply text-primary-interaction-default border-primary-border-default;

		.before-triangle-cover,
		.after-triangle-cover {
			background: var(--color-primary-border-default);
		}
	}

	.step-button.past-button:hover:not([aria-disabled="true"]) {
		@apply bg-primary-interaction-hover text-neutral-foreground-negative border-primary-border-hover;
	}

	.step-button.skip-button {
		@apply bg-warning-surface-subtle border-warning-border-default text-warning-interaction-default;
	}

	/* Size variations */
	.step-button.first-button {
		@apply rounded-s-full ml-0;

		&::after,
		.after-triangle-cover {
			@apply h-[104%];
		}
	}

	.step-button.last-button {
		@apply rounded-e-full;
	}

	.step-button.large {
		@apply h-[3em] ml-xs;

		.step-number {
			@apply text-sm;
		}

		.step-value {
			@apply text-sm;
		}
	}

	.step-button.small {
		@apply h-[1.8em] text-xs;

		.step-number {
			@apply text-xs;
		}

		.step-value {
			@apply text-xs;
		}
	}

	/* Version 2 Styles - Circular steps */
	.stepper-v2 {
		@apply flex justify-end;
	}

	.step-container {
		@apply flex items-center;
	}

	.button-container {
		@apply p-xxs rounded-full relative transition-transform;
		min-width: 44px; /* WCAG touch target minimum */
		min-height: 44px;
	}

	.button-container:hover:not([aria-disabled="true"]) {
		@apply scale-110;
	}

	.keyboard-focus-container {
		outline: 3px solid var(--color-primary-interaction-default);
		outline-offset: 2px;
	}

	.background {
		@apply flex flex-col w-full h-full rounded-full overflow-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;

		div {
			@apply w-full;
		}
	}

	.step-button-circle {
		@apply flex items-center justify-center p-sm rounded-full text-neutral-interaction-default relative transition-colors;
		background: v-bind(background);
		min-width: 44px; /* WCAG touch target minimum */
		min-height: 44px;
	}

	.step-button-circle:focus-visible {
		@apply outline-none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
		z-index: 10;
	}

	.step-button-circle.keyboard-focus {
		@apply outline-none;
		box-shadow: 0 0 0 3px var(--color-primary-interaction-default);
		z-index: 10;
	}

	.step-button-circle.active-button {
		@apply text-primary-interaction-default;
		background: v-bind(background);
	}

	.step-button-circle.past-button:not(.active-button) {
		@apply bg-primary-interaction-default text-neutral-foreground-negative;
	}

	.step-button-circle.skip-button,
	.step-button-circle.skip-button.past-button {
		@apply text-warning-interaction-default bg-warning-surface-subtle;
	}

	/* Step number overlay */
	.step-number-overlay {
		@apply absolute top-[-8px] right-[-8px] bg-primary-interaction-default text-neutral-foreground-negative text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center;
		min-width: 20px;
		min-height: 20px;
	}

	/* Step labels */
	.step-label-below {
		@apply absolute bottom-[-2em] font-bold text-xs truncate text-center;
		width: max-content;
		max-width: 80px;
		left: 50%;
		transform: translateX(-50%);
	}

	.step-label-below.active-label {
		@apply text-primary-interaction-default;
	}

	.step-label-below.past-label {
		@apply text-primary-interaction-default;
	}

	/* Connection lines */
	.right-line {
		@apply w-full transition-colors;
		height: 0.2em;
	}

	.neutral-border-color {
		background: var(--neutral-border-default);
	}

	/* Size variations for Version 2 */
	.stepper-v2.large .step-button-circle {
		@apply p-base;
		min-width: 52px;
		min-height: 52px;
	}

	.stepper-v2.large .step-button-circle .b-icon {
		@apply text-3xl;
	}

	.stepper-v2.small .step-button-circle {
		@apply p-xs;
		min-width: 36px;
		min-height: 36px;
	}

	.stepper-v2.small .step-button-circle .b-icon {
		@apply text-base;
	}

	/* Disabled states */
	.step-button[aria-disabled="true"],
	.step-button-circle[aria-disabled="true"] {
		@apply opacity-50 cursor-not-allowed;
	}

	.step-button[aria-disabled="true"]:hover,
	.step-button-circle[aria-disabled="true"]:hover {
		@apply transform-none bg-inherit;
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

	/* Accessibility enhancements */
	.high-contrast .step-button,
	.high-contrast .step-button-circle {
		border: 2px solid var(--color-neutral-border-default);
	}

	.high-contrast .step-button:focus-visible,
	.high-contrast .step-button-circle:focus-visible,
	.high-contrast .step-button.keyboard-focus,
	.high-contrast .step-button-circle.keyboard-focus {
		border-color: var(--color-primary-interaction-default);
		background-color: var(--color-primary-surface-subtle);
	}

	.enhanced-focus .step-button:focus-visible,
	.enhanced-focus .step-button-circle:focus-visible {
		outline: 3px solid var(--color-primary-interaction-default);
		outline-offset: 3px;
	}

	.min-touch-target .step-button {
		min-height: 44px;
		min-width: 44px;
	}

	.min-touch-target .step-button-circle {
		min-height: 44px;
		min-width: 44px;
	}

	/* Reduced motion support */
	.reduced-motion,
	.reduced-motion * {
		transition: none !important;
		animation: none !important;
		transform: none !important;
	}

	.reduced-motion .button-container:hover {
		transform: none !important;
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.step-button,
		.step-button-circle {
			border: 2px solid CanvasText;
		}

		.step-button.keyboard-focus,
		.step-button-circle.keyboard-focus {
			box-shadow: 0 0 0 4px Highlight;
		}

		.step-button.active-button,
		.step-button-circle.active-button {
			background-color: Canvas;
			color: CanvasText;
		}
	}

	/* Reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		.step-button,
		.step-button-circle,
		.button-container,
		.right-line {
			transition: none !important;
			animation: none !important;
		}

		.button-container:hover {
			transform: none !important;
		}
	}

	/* Dark mode adjustments */
	@media (prefers-color-scheme: dark) {
		.step-button:hover:not([aria-disabled="true"]) {
			background-color: var(--color-neutral-surface-hover);
		}

		.step-button.active-button {
			background-color: var(--color-primary-interaction-default);
		}
	}
</style>
