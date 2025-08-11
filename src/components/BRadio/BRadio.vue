<script setup lang="ts">
import { watch, inject, computed, ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import type { GroupState } from "../BGroup";
import { useOptionalModel, useAriaAttributes, useScreenReader, announceSelection } from "#composables";
import type { 
	BRadioProps, 
	BRadioGroupValue, 
	BRadioGroupContext, 
	BRadioVariant, 
	BRadioOrientation,
	BRadioNavigationDirection,
	BRadioEvents
} from "./BRadio.types";

// Re-export types for compatibility
export type { BRadioGroupValue, BRadioGroupContext } from "./BRadio.types";

const props = withDefaults(defineProps<BRadioProps>(), {
	modelValue: undefined,
	disabled: false,
	variant: "default" as BRadioVariant,
	announceChanges: true,
	supportsHighContrast: true,
});

const emit = defineEmits<BRadioEvents & {
	"update:modelValue": [value: boolean];
}>();

const [model] = useOptionalModel<boolean>(props, "modelValue", emit, false);
const groupState = inject<GroupState | null>("groupState", null);
const radioGroupContext = inject<BRadioGroupContext | null>("radioGroupContext", null);
const radioElement = ref<HTMLElement | null>(null);
const inputElement = ref<HTMLInputElement | null>(null);

// Composables
const { useAriaId } = useAriaAttributes();
const { announcePolitely } = useScreenReader();

// Generate unique IDs
const radioId = computed(() => props.id || useAriaId('radio'));
const helpTextId = computed(() => props.helpText ? `${radioId.value}-help` : undefined);
const errorId = computed(() => props.errorMessage ? `${radioId.value}-error` : undefined);

// Computed properties
const isDisabled = computed((): boolean => {
	return radioGroupContext?.isDisabled || groupState?.disabled || props.disabled || false;
});

const isSelected = computed((): boolean => {
	if (radioGroupContext && props.groupValue !== undefined) {
		return radioGroupContext.selectedValue === props.groupValue;
	}
	return model.value;
});

const groupName = computed((): string => {
	return radioGroupContext?.groupName || props.name || radioId.value;
});

const describedBy = computed((): string | undefined => {
	const ids = [
		props.ariaDescribedBy,
		helpTextId.value,
		errorId.value,
	].filter(Boolean);
	return ids.length > 0 ? ids.join(' ') : undefined;
});

const tabIndex = computed((): number => {
	// Only the selected radio or the first radio in the group should be tabbable
	if (radioGroupContext) {
		if (isSelected.value) return 0;
		// If no radio is selected, make the first one tabbable
		const radios = radioGroupContext.getGroupRadios();
		return radios.length > 0 && radios[0] === radioElement.value ? 0 : -1;
	}
	return isDisabled.value ? -1 : 0;
});

// Watch for model changes
watch(model, (cur, prev) => {
	if (cur && !prev) {
		if (groupState && props.groupValue !== undefined) {
			groupState.select(props.groupValue);
		}
		if (radioGroupContext && props.groupValue !== undefined) {
			radioGroupContext.selectRadio(props.groupValue);
		}
		if (props.announceChanges && props.groupValue !== undefined) {
			const label = radioElement.value?.textContent?.trim() || `Radio ${props.groupValue}`;
			if (props.position && props.total) {
				announceSelection(label, props.position, props.total);
			} else {
				announcePolitely(`Selected ${label}`);
			}
		}
		emit('change', props.groupValue, true);
	}
});

// Watch for group state changes
watch(
	() => groupState?.selected,
	(cur) => {
		if (cur && groupState && props.groupValue !== undefined) {
			model.value = cur == props.groupValue;
		}
	}
);

// Watch for radio group context changes
watch(
	() => radioGroupContext?.selectedValue,
	(selectedValue) => {
		if (radioGroupContext && props.groupValue !== undefined) {
			model.value = selectedValue === props.groupValue;
		}
	}
);

// Functions
function toggle() {
	if (isDisabled.value) return;
	if (!isSelected.value) {
		model.value = true;
	}
}

function handleFocus(event: FocusEvent) {
	emit('focus', event);
}

function handleBlur(event: FocusEvent) {
	emit('blur', event);
}

function handleKeydown(event: KeyboardEvent) {
	const { key } = event;
	
	// Handle space key for selection
	if (key === ' ') {
		event.preventDefault();
		toggle();
		return;
	}
	
	// Handle arrow keys for group navigation
	if (radioGroupContext && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
		event.preventDefault();
		
		const isHorizontal = radioGroupContext.orientation === 'horizontal';
		let direction: 'next' | 'previous' | 'first' | 'last';
		
		switch (key) {
			case 'ArrowUp':
				direction = isHorizontal ? 'previous' : 'previous';
				break;
			case 'ArrowDown':
				direction = isHorizontal ? 'next' : 'next';
				break;
			case 'ArrowLeft':
				direction = isHorizontal ? 'previous' : 'previous';
				break;
			case 'ArrowRight':
				direction = isHorizontal ? 'next' : 'next';
				break;
			default:
				return;
		}
		
		radioGroupContext.navigateGroup(direction);
	} else if (['Home', 'End'].includes(key) && radioGroupContext) {
		event.preventDefault();
		radioGroupContext.navigateGroup(key === 'Home' ? 'first' : 'last');
	}
}

// Lifecycle
onMounted(() => {
	// Register with radio group context if available
	if (radioGroupContext && radioElement.value && props.groupValue !== undefined) {
		radioGroupContext.registerRadio(radioElement.value, props.groupValue);
	}
});

// Cleanup on unmount
onBeforeUnmount(() => {
	if (radioGroupContext && radioElement.value) {
		radioGroupContext.unregisterRadio(radioElement.value);
	}
});
</script>

<template>
	<div
		ref="radioElement"
		:id="radioId"
		role="radio"
		:aria-checked="isSelected"
		:aria-disabled="isDisabled"
		:aria-label="ariaLabel"
		:aria-labelledby="ariaLabelledBy"
		:aria-describedby="describedBy"
		:aria-required="required"
		:aria-setsize="total"
		:aria-posinset="position"
		:tabindex="tabIndex"
		:data-testid="`b-radio-${radioId}`"
		data-component="BRadio"
		class="b-radio focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		:class="[
			variant, 
			{ 
				disabled: isDisabled, 
				active: isSelected,
				'high-contrast': $attrs['data-high-contrast'] || supportsHighContrast
			}
		]"
		@click="toggle"
		@keydown="handleKeydown"
		@focus="handleFocus"
		@blur="handleBlur">
		
		<!-- Hidden native input for form compatibility -->
		<input
			ref="inputElement"
			type="radio"
			:name="groupName"
			:value="groupValue"
			:checked="isSelected"
			:disabled="isDisabled"
			:required="required"
			:data-testid="`b-radio-input-${radioId}`"
			class="sr-only"
			tabindex="-1"
			@change="toggle">
		
		<!-- Custom radio button visual -->
		<span 
			class="out-circle relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer"
			:class="{ 'cursor-not-allowed': isDisabled }">
			<span 
				class="inside-circle transition-all duration-200 ease-in-out"
				:class="{
					'scale-100 opacity-100': isSelected,
					'scale-0 opacity-0': !isSelected
				}" />
		</span>
		
		<!-- Label content -->
		<template v-if="$slots.default">
			<label
				v-if="radioId"
				:for="radioId"
				:data-testid="`b-radio-label-${radioId}`"
				class="radio-label cursor-[inherit] select-none"
				:class="{ 'cursor-not-allowed': isDisabled }">
				<slot />
			</label>
			<div
				v-else
				:data-testid="`b-radio-text-${radioId}`"
				class="radio-text select-none"
				:class="{ 'opacity-50': isDisabled }">
				<slot />
			</div>
		</template>
		
		<!-- Help text -->
		<div
			v-if="helpText"
			:id="helpTextId"
			:data-testid="`b-radio-help-${radioId}`"
			class="radio-help-text text-sm text-gray-600 mt-1"
			:class="{ 'text-gray-400': isDisabled }">
			{{ helpText }}
		</div>
		
		<!-- Error message -->
		<div
			v-if="errorMessage"
			:id="errorId"
			:data-testid="`b-radio-error-${radioId}`"
			class="radio-error-text text-sm text-red-600 mt-1"
			:class="{ 'text-red-400': isDisabled }"
			role="alert"
			aria-live="assertive">
			{{ errorMessage }}
		</div>
	</div>
</template>

<style scoped>
@import "../../assets/main.css";

.b-radio {
	@apply flex items-start gap-3 p-2 rounded-md;
	@apply transition-all duration-200 ease-in-out;
	@apply hover:bg-gray-50 focus-within:bg-gray-50;
	
	/* Ensure minimum touch target size */
	min-height: 44px;
	min-width: 44px;
}

.b-radio.disabled {
	@apply opacity-60 cursor-not-allowed;
	@apply hover:bg-transparent;
}

.out-circle {
	@apply w-5 h-5 rounded-full border-2 border-gray-300;
	@apply bg-white transition-all duration-200 ease-in-out;
	@apply flex items-center justify-center;
	flex-shrink: 0;
}

.b-radio:not(.disabled) .out-circle {
	@apply hover:border-blue-400;
}

.b-radio.active .out-circle {
	@apply border-blue-500 bg-blue-500;
}

.b-radio.disabled .out-circle {
	@apply border-gray-200 bg-gray-100;
}

.inside-circle {
	@apply w-2 h-2 rounded-full bg-white;
	@apply transform transition-transform duration-200 ease-in-out;
}

.radio-label {
	@apply text-gray-900 leading-5;
	@apply transition-colors duration-200 ease-in-out;
}

.b-radio.disabled .radio-label {
	@apply text-gray-400;
}

.radio-text {
	@apply text-gray-900 leading-5;
}

.radio-help-text {
	@apply text-xs leading-4;
	margin-left: 2rem; /* Align with radio button */
}

.radio-error-text {
	@apply text-xs leading-4 font-medium;
	margin-left: 2rem; /* Align with radio button */
}

/* High contrast mode support */
.b-radio[data-high-contrast] .out-circle {
	@apply border-black border-3;
}

.b-radio[data-high-contrast].active .out-circle {
	@apply bg-black border-black;
}

.b-radio[data-high-contrast] .inside-circle {
	@apply bg-white;
}

/* Onboarding variant */
.b-radio.onboarding {
	@apply bg-transparent border border-gray-200 rounded-lg p-4;
	@apply hover:border-blue-300 hover:bg-blue-50;
}

.b-radio.onboarding.active {
	@apply border-blue-500 bg-blue-50;
}

.b-radio.onboarding.disabled {
	@apply bg-gray-50 border-gray-100;
}

/* Focus styles */
.b-radio:focus-visible {
	@apply outline-2 outline-offset-2 outline-blue-500;
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

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.b-radio,
	.out-circle,
	.inside-circle,
	.radio-label {
		transition: none !important;
	}
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
	.b-radio {
		@apply hover:bg-gray-800 focus-within:bg-gray-800;
	}
	
	.out-circle {
		@apply border-gray-600 bg-gray-900;
	}
	
	.b-radio:not(.disabled) .out-circle {
		@apply hover:border-blue-400;
	}
	
	.radio-label,
	.radio-text {
		@apply text-gray-100;
	}
	
	.radio-help-text {
		@apply text-gray-400;
	}
	
	.b-radio.disabled .radio-label,
	.b-radio.disabled .radio-text {
		@apply text-gray-500;
	}
}
</style>