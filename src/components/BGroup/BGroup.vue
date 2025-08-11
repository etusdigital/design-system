<script setup lang="ts">
import { reactive, watch, provide, computed, ref, onMounted, onUnmounted, nextTick } from "vue";
import type { 
	GroupState, 
	GroupValue, 
	BGroupAccessibilityProps, 
	AccessibleGroupContext,
	GroupItem,
	GroupSelectionType,
	GroupNavigationDirection,
	GroupValidationResult
} from "./BGroup.types";
import { useAriaAttributes, useScreenReader, useKeyboardNavigation } from "#composables";

export interface BGroupProps extends BGroupAccessibilityProps {
	/** Currently selected value */
	modelValue?: GroupValue | GroupValue[];
	/** Whether to arrange items vertically */
	vertical?: boolean;
	/** Whether the group is disabled */
	disabled?: boolean;
	/** HTML id attribute for the group */
	id?: string;
	/** CSS class for the group container */
	class?: string;
}

const emit = defineEmits<{
	"update:modelValue": [value: GroupValue | GroupValue[]];
	/** Emitted when selection changes */
	"selection-change": [selected: GroupValue[], context: AccessibleGroupContext];
	/** Emitted when validation state changes */
	"validation-change": [result: GroupValidationResult];
	/** Emitted when focus changes within the group */
	"focus-change": [focusedValue: GroupValue | null, focusedIndex: number];
	/** Emitted when keyboard navigation occurs */
	"navigate": [direction: GroupNavigationDirection, currentIndex: number];
}>();

const props = withDefaults(defineProps<BGroupProps>(), {
	modelValue: null,
	vertical: false,
	disabled: false,
	selectionType: 'radiogroup',
	orientation: 'vertical',
	announceChanges: true,
	wrapNavigation: true,
	showValidationErrors: true,
	enhancedFocus: true,
	highContrast: false,
	reduceMotion: false,
	minSelections: 0,
	maxSelections: Infinity,
});

// Template refs
const groupElement = ref<HTMLElement | null>(null);
const liveRegionElement = ref<HTMLElement | null>(null);

// Composables
const { useAriaId } = useAriaAttributes();
const { announcePolitely, announceAssertively, useLiveRegion } = useScreenReader();
const { liveRegion, updateLiveRegion } = useLiveRegion();

// Reactive state
const groupId = computed(() => props.id || useAriaId('group'));
const helpTextId = computed(() => props.helpText ? `${groupId.value}-help` : undefined);
const errorId = computed(() => props.errorMessage ? `${groupId.value}-error` : undefined);
const items = ref<Map<GroupValue, { item: GroupItem; element: HTMLElement }>>(new Map());
const focusedIndex = ref<number>(-1);
const lastValidationResult = ref<GroupValidationResult>({ isValid: true, errors: [], warnings: [] });

// Computed properties
const selectedValues = computed((): GroupValue[] => {
	if (props.multiselectable) {
		return Array.isArray(props.modelValue) ? props.modelValue : (props.modelValue ? [props.modelValue] : []);
	}
	return props.modelValue ? [props.modelValue] : [];
});

const isMultiSelectable = computed((): boolean => {
	return props.multiselectable || props.selectionType === 'group' || props.selectionType === 'listbox';
});

const groupRole = computed((): string => {
	switch (props.selectionType) {
		case 'radiogroup':
			return 'radiogroup';
		case 'listbox':
			return 'listbox';
		case 'group':
			return 'group';
		case 'none':
		default:
			return 'group';
	}
});

const orientation = computed((): 'horizontal' | 'vertical' => {
	return props.orientation || (props.vertical ? 'vertical' : 'horizontal');
});

const groupName = computed((): string => {
	return props.groupName || groupId.value;
});

const describedBy = computed((): string | undefined => {
	const ids = [
		props.ariaDescribedBy,
		helpTextId.value,
		errorId.value,
	].filter(Boolean);
	return ids.length > 0 ? ids.join(' ') : undefined;
});

const isDisabled = computed((): boolean => {
	return props.disabled;
});

const itemsArray = computed((): GroupItem[] => {
	return Array.from(items.value.values()).map(({ item }) => item);
});

// Legacy group state for backward compatibility
const groupState = reactive<GroupState>({
	selected: Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue,
	get disabled(): boolean {
		return isDisabled.value;
	},
	select: updateSelection,
});

// Enhanced accessible group context
const accessibleGroupContext = reactive<AccessibleGroupContext>({
	groupId: groupId.value,
	selectionType: props.selectionType || 'radiogroup',
	selectedValues: selectedValues.value,
	multiselectable: isMultiSelectable.value,
	isDisabled: isDisabled.value,
	orientation: orientation.value,
	wrapNavigation: props.wrapNavigation || true,
	groupName: groupName.value,
	isRequired: props.required || false,
	errorMessage: props.errorMessage,
	helpText: props.helpText,
	announceChanges: props.announceChanges || true,
	highContrast: props.highContrast || false,
	reduceMotion: props.reduceMotion || false,
	items: itemsArray.value,
	focusedIndex: focusedIndex.value,
	selectItem,
	toggleItem,
	navigate,
	focusItem,
	focusItemByValue,
	registerItem,
	unregisterItem,
	validate,
	getItem,
	getElements,
	getElementByValue,
});

// Provide contexts
provide<GroupState>("groupState", groupState);
provide<AccessibleGroupContext>("accessibleGroupContext", accessibleGroupContext);

// Watch for prop changes and update context
watch(
	() => [
		props.selectionType, 
		selectedValues.value, 
		isMultiSelectable.value, 
		isDisabled.value,
		orientation.value,
		props.errorMessage,
		props.helpText,
		itemsArray.value,
		focusedIndex.value
	],
	() => {
		Object.assign(accessibleGroupContext, {
			selectionType: props.selectionType || 'radiogroup',
			selectedValues: selectedValues.value,
			multiselectable: isMultiSelectable.value,
			isDisabled: isDisabled.value,
			orientation: orientation.value,
			errorMessage: props.errorMessage,
			helpText: props.helpText,
			items: itemsArray.value,
			focusedIndex: focusedIndex.value,
		});
	},
	{ deep: true }
);

// Watch for model value changes
watch(
	() => props.modelValue,
	(newValue) => {
		const newSelected = Array.isArray(newValue) ? newValue[0] : newValue;
		groupState.selected = newSelected;
		
		// Update focused index based on selection
		if (newSelected !== null && newSelected !== undefined) {
			const index = itemsArray.value.findIndex(item => item.value === newSelected);
			if (index !== -1) {
				focusedIndex.value = index;
			}
		}
	}
);

/**
 * Updates the selected value and emits the change
 */
function updateSelection(value: GroupValue | GroupValue[]) {
	const normalizedValue = Array.isArray(value) ? value : [value];
	
	// Update legacy group state
	groupState.selected = normalizedValue[0];
	
	// Emit model update
	if (isMultiSelectable.value) {
		emit("update:modelValue", normalizedValue);
	} else {
		emit("update:modelValue", normalizedValue[0]);
	}
	
	// Emit selection change event
	emit("selection-change", normalizedValue, accessibleGroupContext);
	
	// Update live region for screen readers
	if (props.announceChanges && normalizedValue.length > 0) {
		announceSelectionChange(normalizedValue);
	}
}

/**
 * Selects an item (single selection)
 */
function selectItem(value: GroupValue, announce: boolean = true): void {
	if (isDisabled.value) return;
	
	const item = getItem(value);
	if (!item || item.disabled) return;
	
	updateSelection(value);
	
	if (announce && props.announceChanges) {
		announceItemSelection(item, 'selected');
	}
}

/**
 * Toggles an item (multi-selection)
 */
function toggleItem(value: GroupValue, announce: boolean = true): void {
	if (isDisabled.value || !isMultiSelectable.value) return;
	
	const item = getItem(value);
	if (!item || item.disabled) return;
	
	const currentSelected = selectedValues.value;
	const isSelected = currentSelected.includes(value);
	
	let newSelected: GroupValue[];
	if (isSelected) {
		// Check minimum selections
		if (currentSelected.length <= (props.minSelections || 0)) {
			if (announce) {
				announceAssertively(`Cannot deselect ${item.label}. Minimum ${props.minSelections} selections required.`);
			}
			return;
		}
		newSelected = currentSelected.filter(v => v !== value);
	} else {
		// Check maximum selections
		if (currentSelected.length >= (props.maxSelections || Infinity)) {
			if (announce) {
				announceAssertively(`Cannot select ${item.label}. Maximum ${props.maxSelections} selections allowed.`);
			}
			return;
		}
		newSelected = [...currentSelected, value];
	}
	
	updateSelection(newSelected);
	
	if (announce && props.announceChanges) {
		announceItemSelection(item, isSelected ? 'deselected' : 'selected');
	}
}

/**
 * Navigates the group with keyboard
 */
function navigate(direction: GroupNavigationDirection): void {
	if (isDisabled.value || itemsArray.value.length === 0) return;
	
	const enabledItems = itemsArray.value.filter(item => !item.disabled);
	if (enabledItems.length === 0) return;
	
	let newIndex: number;
	const currentEnabledIndex = enabledItems.findIndex(item => {
		const itemIndex = itemsArray.value.findIndex(i => i.value === item.value);
		return itemIndex === focusedIndex.value;
	});
	
	switch (direction) {
		case 'next':
			newIndex = currentEnabledIndex + 1;
			if (newIndex >= enabledItems.length) {
				newIndex = props.wrapNavigation ? 0 : enabledItems.length - 1;
			}
			break;
		case 'previous':
			newIndex = currentEnabledIndex - 1;
			if (newIndex < 0) {
				newIndex = props.wrapNavigation ? enabledItems.length - 1 : 0;
			}
			break;
		case 'first':
		case 'home':
			newIndex = 0;
			break;
		case 'last':
		case 'end':
			newIndex = enabledItems.length - 1;
			break;
		default:
			return;
	}
	
	const targetItem = enabledItems[newIndex];
	if (targetItem) {
		focusItemByValue(targetItem.value);
		emit("navigate", direction, newIndex);
	}
}

/**
 * Focuses an item by index
 */
function focusItem(index: number): void {
	if (index < 0 || index >= itemsArray.value.length) return;
	
	const item = itemsArray.value[index];
	const element = getElementByValue(item.value);
	
	if (element && !item.disabled) {
		focusedIndex.value = index;
		element.focus();
		emit("focus-change", item.value, index);
	}
}

/**
 * Focuses an item by value
 */
function focusItemByValue(value: GroupValue): void {
	const index = itemsArray.value.findIndex(item => item.value === value);
	if (index !== -1) {
		focusItem(index);
	}
}

/**
 * Registers an item with the group
 */
function registerItem(item: GroupItem, element: HTMLElement): void {
	items.value.set(item.value, { item, element });
	
	// Set initial focus if this is the first item or selected item
	nextTick(() => {
		if (focusedIndex.value === -1 || selectedValues.value.includes(item.value)) {
			const index = itemsArray.value.findIndex(i => i.value === item.value);
			if (index !== -1) {
				focusedIndex.value = index;
			}
		}
	});
}

/**
 * Unregisters an item from the group
 */
function unregisterItem(value: GroupValue): void {
	items.value.delete(value);
	
	// Update focused index if needed
	if (focusedIndex.value >= itemsArray.value.length) {
		focusedIndex.value = Math.max(0, itemsArray.value.length - 1);
	}
}

/**
 * Validates the group selections
 */
function validate(): GroupValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];
	
	const currentSelected = selectedValues.value;
	
	// Check required
	if (props.required && currentSelected.length === 0) {
		errors.push('Selection is required.');
	}
	
	// Check minimum selections
	if (props.minSelections && currentSelected.length < props.minSelections) {
		errors.push(`At least ${props.minSelections} selections required.`);
	}
	
	// Check maximum selections
	if (props.maxSelections && currentSelected.length > props.maxSelections) {
		errors.push(`Maximum ${props.maxSelections} selections allowed.`);
	}
	
	const result: GroupValidationResult = {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
	
	lastValidationResult.value = result;
	emit("validation-change", result);
	
	return result;
}

/**
 * Gets an item by value
 */
function getItem(value: GroupValue): GroupItem | undefined {
	return items.value.get(value)?.item;
}

/**
 * Gets all registered elements
 */
function getElements(): HTMLElement[] {
	return Array.from(items.value.values()).map(({ element }) => element);
}

/**
 * Gets element by value
 */
function getElementByValue(value: GroupValue): HTMLElement | undefined {
	return items.value.get(value)?.element;
}

/**
 * Announces selection changes to screen readers
 */
function announceSelectionChange(selectedValues: GroupValue[]): void {
	if (!props.announceChanges) return;
	
	if (selectedValues.length === 0) {
		announcePolitely('No items selected');
		return;
	}
	
	const selectedItems = selectedValues.map(value => getItem(value)).filter(Boolean) as GroupItem[];
	const labels = selectedItems.map(item => item.label);
	
	let message: string;
	if (props.announcementTemplate) {
		message = props.announcementTemplate
			.replace('{count}', selectedValues.length.toString())
			.replace('{items}', labels.join(', '))
			.replace('{total}', itemsArray.value.length.toString());
	} else {
		if (selectedValues.length === 1) {
			message = `Selected ${labels[0]}`;
		} else {
			message = `Selected ${selectedValues.length} items: ${labels.join(', ')}`;
		}
	}
	
	announcePolitely(message);
}

/**
 * Announces individual item selection/deselection
 */
function announceItemSelection(item: GroupItem, action: 'selected' | 'deselected'): void {
	if (!props.announceChanges) return;
	
	const position = itemsArray.value.findIndex(i => i.value === item.value) + 1;
	const total = itemsArray.value.length;
	
	let message = `${action === 'selected' ? 'Selected' : 'Deselected'} ${item.label}`;
	
	if (isMultiSelectable.value) {
		const selectedCount = selectedValues.value.length;
		message += `. ${selectedCount} of ${total} selected`;
	} else {
		message += `. ${position} of ${total}`;
	}
	
	announcePolitely(message);
}

/**
 * Handles keyboard events for group navigation
 */
function handleKeydown(event: KeyboardEvent): void {
	if (isDisabled.value) return;
	
	const { key } = event;
	
	// Handle navigation keys based on orientation
	const isHorizontal = orientation.value === 'horizontal';
	
	switch (key) {
		case 'ArrowUp':
			if (!isHorizontal) {
				event.preventDefault();
				navigate('previous');
			}
			break;
		case 'ArrowDown':
			if (!isHorizontal) {
				event.preventDefault();
				navigate('next');
			}
			break;
		case 'ArrowLeft':
			if (isHorizontal) {
				event.preventDefault();
				navigate('previous');
			}
			break;
		case 'ArrowRight':
			if (isHorizontal) {
				event.preventDefault();
				navigate('next');
			}
			break;
		case 'Home':
			event.preventDefault();
			navigate('home');
			break;
		case 'End':
			event.preventDefault();
			navigate('end');
			break;
		case 'Tab':
			// Allow normal tab behavior
			break;
		default:
			// Don't handle other keys at group level
			break;
	}
}

// Lifecycle
onMounted(() => {
	// Validate initial state
	validate();
	
	// Set up keyboard event listener
	if (groupElement.value) {
		groupElement.value.addEventListener('keydown', handleKeydown);
	}
});

// Cleanup
onUnmounted(() => {
	if (groupElement.value) {
		groupElement.value.removeEventListener('keydown', handleKeydown);
	}
});
</script>

<template>
	<div
		ref="groupElement"
		:id="groupId"
		:role="groupRole"
		:aria-label="ariaLabel"
		:aria-labelledby="ariaLabelledBy"
		:aria-describedby="describedBy"
		:aria-required="required"
		:aria-disabled="isDisabled"
		:aria-multiselectable="isMultiSelectable ? 'true' : undefined"
		:aria-orientation="orientation"
		:aria-invalid="!lastValidationResult.isValid"
		:data-high-contrast="highContrast"
		:data-reduce-motion="reduceMotion"
		class="b-group inline-flex focus-within:outline-none"
		:class="[
			vertical || orientation === 'vertical' ? 'vert' : 'hor items-end',
			{ 
				'group-disabled': isDisabled,
				'group-invalid': !lastValidationResult.isValid,
				'group-high-contrast': highContrast,
				'group-reduce-motion': reduceMotion
			}
		]">
		
		<!-- Group label (visually hidden if using aria-label) -->
		<div
			v-if="ariaLabel && !ariaLabelledBy"
			:id="`${groupId}-label`"
			class="sr-only"
			aria-hidden="true">
			{{ ariaLabel }}
		</div>
		
		<!-- Help text -->
		<div
			v-if="helpText"
			:id="helpTextId"
			class="group-help-text text-sm text-gray-600 mb-sm">
			{{ helpText }}
		</div>
		
		<!-- Group content -->
		<div class="group-content flex" :class="[vertical || orientation === 'vertical' ? 'flex-col' : 'flex-row']">
			<slot />
		</div>
		
		<!-- Error message -->
		<div
			v-if="errorMessage || (!lastValidationResult.isValid && showValidationErrors)"
			:id="errorId"
			class="group-error-text text-sm text-red-600 mt-sm"
			role="alert"
			aria-live="assertive">
			{{ errorMessage || lastValidationResult.errors[0] }}
		</div>
		
		<!-- Live region for announcements -->
		<div
			ref="liveRegion"
			aria-live="polite"
			aria-atomic="true"
			class="sr-only" />
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	.vert {
		@apply flex-col;
	}

	.b-group.hor :slotted(.b-radio) {
		@apply ml-sm first:ml-0;
	}
	.b-group.vert :slotted(.b-radio) {
		@apply mt-sm first:mt-0;
	}

	.b-group.hor :slotted(.b-radio-button) {
		@apply border-r-0 first:rounded-l-sm last:rounded-r-sm last:border-r-xxs;
	}
	.b-group.vert :slotted(.b-radio-button) {
		@apply border-b-0 first:rounded-t-sm last:rounded-b-sm last:border-b-xxs;
	}

	.b-group.hor :slotted(.b-radio-button) {
		@apply border-r-0 first:rounded-l-sm last:rounded-r-sm last:border-r-xxs;
	}
	.b-group.vert :slotted(.b-radio-button) {
		@apply border-b-0 first:rounded-t-sm last:rounded-b-sm last:border-b-xxs;
	}

	.b-group.hor :slotted(.b-radio-div) {
		@apply ml-xs first:ml-0;
	}
	.b-group.vert :slotted(.b-radio-div) {
		@apply mt-xs first:mt-0;
	}

	.b-group.hor
		> :slotted(:not(.b-radio-button):not(.b-radio):not(.b-radio-div)):not(
			:last-child
		) {
		@apply relative mr-base after:border-t-xxs after:w-base after:absolute after:bottom-base after:-right-base;
		&::after {
			border-color: var(--color-neutral-border-default);
		}
	}

	.b-group.hor
		> :slotted(:not(.b-radio-button):not(.b-radio):not(.b-radio-div)) {
		div {
			@apply z-[1];
		}
	}

	.b-group.vert
		> :slotted(:not(.b-radio-button):not(.b-radio):not(.b-radio-div)):not(
			:last-child
		) {
		@apply relative mb-base after:h-base after:border-r-xxs after:absolute after:left-[50%] after:translate-x-[-50%] after:-bottom-base;
		&::after {
			border-color: var(--color-neutral-border-default);
		}
	}

	/* Accessibility enhancements */
	.b-group {
		@apply focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2;
		@apply transition-all duration-200 ease-in-out;
	}

	.b-group.group-disabled {
		@apply opacity-60 cursor-not-allowed;
	}

	.b-group.group-invalid {
		@apply ring-2 ring-red-500 ring-offset-2;
	}

	.group-help-text {
		@apply px-base py-sm;
	}

	.group-error-text {
		@apply px-base py-sm font-medium;
	}

	/* High contrast mode */
	.b-group.group-high-contrast {
		@apply border-2 border-black;
	}

	.b-group.group-high-contrast.group-invalid {
		@apply border-red-600;
	}

	/* Reduced motion */
	.b-group.group-reduce-motion,
	.b-group.group-reduce-motion * {
		@apply transition-none;
	}

	/* Screen reader only */
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

	/* Focus management for enhanced accessibility */
	.b-group:focus-within .group-content {
		@apply outline-none;
	}
</style>