<script setup lang="ts">
import { provide, ref, computed, watch, onMounted, nextTick } from "vue";
import type { BRadioGroupValue, BRadioGroupContext } from "./BRadio.vue";
import type { BRadioGroupProps, BRadioOrientation } from "./BRadio.types";
import { useAriaAttributes, useScreenReader, useKeyboardNavigation, announceSelection } from "#composables";

// Re-export props interface for compatibility
export type { BRadioGroupProps } from "./BRadio.types";

const props = withDefaults(defineProps<BRadioGroupProps>(), {
	orientation: "vertical" as BRadioOrientation,
	announceChanges: true,
	navigationLoop: true,
	autoFocus: false,
	supportsHighContrast: true,
});

const emit = defineEmits<{
	"update:modelValue": [value: BRadioGroupValue];
	/** Emitted when selection changes */
	change: [value: BRadioGroupValue];
	/** Emitted when group receives focus */
	focus: [event: FocusEvent];
	/** Emitted when group loses focus */
	blur: [event: FocusEvent];
}>();

// Refs
const groupElement = ref<HTMLElement | null>(null);
const radioElements = ref<Map<BRadioGroupValue, HTMLElement>>(new Map());
const selectedValue = ref<BRadioGroupValue>(props.modelValue);

// Composables
const { useAriaId } = useAriaAttributes();
const { announcePolitely } = useScreenReader();

// Generate unique IDs
const groupId = computed(() => useAriaId('radiogroup'));
const helpTextId = computed(() => props.helpText ? `${groupId.value}-help` : undefined);
const errorId = computed(() => props.errorMessage ? `${groupId.value}-error` : undefined);

// Computed properties
const groupName = computed(() => props.name || groupId.value);

const describedBy = computed((): string | undefined => {
	const ids = [
		props.ariaDescribedBy,
		helpTextId.value,
		errorId.value,
	].filter(Boolean);
	return ids.length > 0 ? ids.join(' ') : undefined;
});

const radioElementsArray = computed(() => Array.from(radioElements.value.values()));

// Keyboard navigation setup
const {
	activeIndex,
	setActiveIndex,
	handleKeydown: navigationHandleKeydown,
} = useKeyboardNavigation(
	radioElementsArray,
	(element, index) => {
		// Find the value for this element
		for (const [value, el] of radioElements.value.entries()) {
			if (el === element) {
				selectRadio(value);
				break;
			}
		}
	},
	{
		loop: true,
		horizontal: props.orientation === 'horizontal',
	}
);

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
	if (newValue !== selectedValue.value) {
		selectedValue.value = newValue;
	}
});

watch(selectedValue, (newValue) => {
	if (newValue !== props.modelValue) {
		emit('update:modelValue', newValue);
		emit('change', newValue);
	}
});

// Radio group context functions
function selectRadio(value: BRadioGroupValue): void {
	if (props.disabled) return;
	
	const oldValue = selectedValue.value;
	selectedValue.value = value;
	
	// Focus the selected radio
	const radioElement = radioElements.value.get(value);
	if (radioElement) {
		radioElement.focus();
	}
	
	// Announce change if enabled
	if (props.announceChanges && value !== oldValue) {
		const radioElement = radioElements.value.get(value);
		const label = radioElement?.textContent?.trim() || `Option ${value}`;
		const position = getRadioPosition(value);
		const total = radioElements.value.size;
		
		if (position && total) {
			announceSelection(label, position, total);
		} else {
			announcePolitely(`Selected ${label}`);
		}
	}
}

function navigateGroup(direction: 'next' | 'previous' | 'first' | 'last'): void {
	const radios = Array.from(radioElements.value.entries());
	if (radios.length === 0) return;
	
	let targetIndex = 0;
	
	switch (direction) {
		case 'next':
			const currentNextIndex = radios.findIndex(([value]) => value === selectedValue.value);
			targetIndex = currentNextIndex >= 0 ? (currentNextIndex + 1) % radios.length : 0;
			break;
		case 'previous':
			const currentPrevIndex = radios.findIndex(([value]) => value === selectedValue.value);
			targetIndex = currentPrevIndex > 0 ? currentPrevIndex - 1 : radios.length - 1;
			break;
		case 'first':
			targetIndex = 0;
			break;
		case 'last':
			targetIndex = radios.length - 1;
			break;
	}
	
	const [targetValue] = radios[targetIndex];
	selectRadio(targetValue);
}

function getGroupRadios(): HTMLElement[] {
	return Array.from(radioElements.value.values());
}

function registerRadio(element: HTMLElement, value: BRadioGroupValue): void {
	radioElements.value.set(value, element);
}

function unregisterRadio(element: HTMLElement): void {
	for (const [value, el] of radioElements.value.entries()) {
		if (el === element) {
			radioElements.value.delete(value);
			break;
		}
	}
}

function getRadioPosition(value: BRadioGroupValue): number | undefined {
	const radios = Array.from(radioElements.value.keys());
	const index = radios.findIndex(v => v === value);
	return index >= 0 ? index + 1 : undefined;
}

// Event handlers
function handleKeydown(event: KeyboardEvent): void {
	const { key } = event;
	
	// Handle arrow keys and Home/End for navigation
	if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) {
		event.preventDefault();
		
		const isHorizontal = props.orientation === 'horizontal';
		
		switch (key) {
			case 'ArrowUp':
				navigateGroup(isHorizontal ? 'previous' : 'previous');
				break;
			case 'ArrowDown':
				navigateGroup(isHorizontal ? 'next' : 'next');
				break;
			case 'ArrowLeft':
				navigateGroup(isHorizontal ? 'previous' : 'previous');
				break;
			case 'ArrowRight':
				navigateGroup(isHorizontal ? 'next' : 'next');
				break;
			case 'Home':
				navigateGroup('first');
				break;
			case 'End':
				navigateGroup('last');
				break;
		}
	}
}

function handleFocus(event: FocusEvent): void {
	emit('focus', event);
}

function handleBlur(event: FocusEvent): void {
	emit('blur', event);
}

// Provide radio group context
const radioGroupContext: BRadioGroupContext = {
	selectedValue: selectedValue.value,
	groupName: groupName.value,
	isDisabled: props.disabled || false,
	orientation: props.orientation,
	groupLabel: props.groupLabel,
	helpText: props.helpText,
	errorMessage: props.errorMessage,
	isRequired: props.required || false,
	selectRadio,
	navigateGroup,
	getGroupRadios,
	registerRadio,
	unregisterRadio,
};

provide("radioGroupContext", radioGroupContext);

// Set initial focus to selected radio or first radio
onMounted(async () => {
	await nextTick();
	
	// If there's a selected value, focus it, otherwise focus first radio
	const targetValue = selectedValue.value || Array.from(radioElements.value.keys())[0];
	if (targetValue !== undefined) {
		const targetElement = radioElements.value.get(targetValue);
		if (targetElement) {
			setActiveIndex(Array.from(radioElements.value.values()).indexOf(targetElement));
		}
	}
});
</script>

<template>
	<fieldset
		ref="groupElement"
		:id="groupId"
		role="radiogroup"
		:aria-labelledby="ariaLabelledBy"
		:aria-label="ariaLabel || (!groupLabel ? 'Radio group' : undefined)"
		:aria-describedby="describedBy"
		:aria-required="required || undefined"
		:aria-disabled="disabled || undefined"
		:aria-orientation="orientation"
		:aria-invalid="(required && !selectedValue) || undefined"
		:data-testid="`b-radio-group-${groupId}`"
		data-component="BRadioGroup"
		:data-high-contrast="supportsHighContrast || undefined"
		class="b-radio-group"
		:class="{ 
			'horizontal': orientation === 'horizontal',
			'vertical': orientation === 'vertical',
			'disabled': disabled,
			'required': required,
			'invalid': required && !selectedValue
		}"
		@keydown="handleKeydown"
		@focus="handleFocus"
		@blur="handleBlur">
		
		<!-- Group legend/label -->
		<legend
			v-if="$slots.label || groupLabel"
			:data-testid="`b-radio-group-legend-${groupId}`"
			class="radio-group-legend"
			:class="{ 
				'sr-only': !$slots.label && !groupLabel,
				'required': required
			}">
			<slot name="label" :required="required" :groupLabel="groupLabel">
				{{ groupLabel }}
				<span v-if="required" class="required-indicator" aria-label="required">
					*
				</span>
			</slot>
		</legend>
		
		<!-- Radio options -->
		<div 
			class="radio-group-content"
			:class="{
				'flex flex-col gap-2': orientation === 'vertical',
				'flex flex-row gap-4': orientation === 'horizontal'
			}">
			<slot />
		</div>
		
		<!-- Help text -->
		<div
			v-if="helpText || $slots.help"
			:id="helpTextId"
			:data-testid="`b-radio-group-help-${groupId}`"
			class="radio-group-help-text text-sm text-gray-600 mt-2"
			:class="{ 'text-gray-400': disabled }">
			<slot name="help">{{ helpText }}</slot>
		</div>
		
		<!-- Error message -->
		<div
			v-if="errorMessage || $slots.error"
			:id="errorId"
			:data-testid="`b-radio-group-error-${groupId}`"
			class="radio-group-error-text text-sm text-red-600 mt-2"
			:class="{ 'text-red-400': disabled }"
			role="alert"
			aria-live="assertive">
			<slot name="error">{{ errorMessage }}</slot>
		</div>
	</fieldset>
</template>

<style scoped>
@import "../../assets/main.css";

.b-radio-group {
	@apply border-0 p-0 m-0;
	min-width: 0; /* Reset fieldset min-width */
}

.b-radio-group.disabled {
	@apply opacity-60;
}

.b-radio-group.invalid {
	@apply border-l-4 border-red-500 pl-3;
}

.b-radio-group.required .radio-group-legend::after {
	content: ' *';
	@apply text-red-500 ml-1;
}

.radio-group-legend {
	@apply text-base font-medium text-gray-900 mb-3;
	@apply block w-full p-0 border-0;
}

.required-indicator {
	@apply text-red-500 ml-1;
	font-size: 1.2em;
	line-height: 1;
}

.b-radio-group.disabled .radio-group-legend {
	@apply text-gray-400;
}

.radio-group-content {
	@apply w-full;
}

.radio-group-content.horizontal {
	@apply flex-wrap;
}

.radio-group-help-text {
	@apply leading-5;
}

.radio-group-error-text {
	@apply font-medium leading-5;
}

/* Focus management */
.b-radio-group:focus-within .radio-group-legend {
	@apply text-blue-600;
}

/* High contrast mode support */
.b-radio-group[data-high-contrast] .radio-group-legend {
	@apply text-black;
}

.b-radio-group[data-high-contrast].disabled .radio-group-legend {
	@apply text-gray-600;
}

/* Screen reader only styles */
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

/* Dark mode support */
@media (prefers-color-scheme: dark) {
	.radio-group-legend {
		@apply text-gray-100;
	}
	
	.b-radio-group.disabled .radio-group-legend {
		@apply text-gray-500;
	}
	
	.radio-group-help-text {
		@apply text-gray-400;
	}
	
	.b-radio-group.disabled .radio-group-help-text {
		@apply text-gray-600;
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.radio-group-legend,
	.radio-group-content {
		transition: none !important;
	}
}
</style>