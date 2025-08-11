<script setup lang="ts" generic="T = unknown">
import { ref, shallowRef, computed, nextTick, watch, markRaw, watchEffect } from "vue";
import { useOptionalModel, useAriaAttributes, useScreenReader, useKeyboardNavigation } from "#composables";
import { type BContainerModelExtra } from "../../utils/components/BContainerModelExtra.types";
import SelectContent from "../../utils/components/SelectContent.vue";
import Option from "../../utils/components/Option.vue";
import BSelectContainer from "../BSelectContainer/BSelectContainer.vue";
import { isObject } from "../../utils";
import BIcon from "../BIcon/BIcon.vue";
import BCheckbox from "../BCheckbox/BCheckbox.vue";
import type {
	BMultiSelectModelExtra,
	BMultiSelectExpandedExtra,
	BMultiSelectItem,
	BMultiSelectItemType,
	BMultiSelectProps,
	BMultiSelectEmits,
	BMultiSelectAccessibilityProps,
	BMultiSelectKeyboardConfig,
	BMultiSelectScreenReaderConfig,
	BMultiSelectSelectedItemConfig
} from './BMultiSelect.types';

const props = withDefaults(
	defineProps<BMultiSelectProps<T>>(),
	{
		modelValue: () => [],
		labelValue: "",
		expanded: undefined,
		labelKey: "label",
		selectedKey: "selected",
		searchable: false,
		disabled: false,
		required: false,
		isError: false,
		errorMessage: "",
		infoMessage: "",
		absolute: true,
		placeholder: "Search...",
		maxSelections: undefined,
		selectionLimitMessage: "Maximum selection limit reached",
		selectionChangeMessage: undefined,
		announceSearchResults: true,
		searchResultsMessage: "$count options available",
		keyboardInstructions: true,
		keyboardInstructionsText: "Use arrow keys to navigate, Space or Enter to select, Escape to close",
		showSelectionCount: true,
		removableSelections: true,
		removeSelectionMessage: "removed from selection",
		groupSelectedItems: false,
		ariaLive: "polite",
		announceStateChanges: true,
		stateChangeMessages: () => ({
			opened: "Options expanded",
			closed: "Options collapsed",
			searching: "Searching options",
			filtered: "$count options found"
		}),
		showSelectAll: false,
		selectAllText: "Select All",
		showClearAll: false,
		clearAllText: "Clear All",
		typeAhead: true,
		searchDebounce: 300,
		minSearchLength: 0,
		noOptionsMessage: "No options available",
		loadingMessage: "Loading options...",
		loading: false,
		keyboardConfig: () => ({
			enabled: true,
			wrapNavigation: true,
			selectOnFocus: false,
			selectionKeys: ['Enter', ' '],
			closeKeys: ['Escape'],
			openKeys: ['ArrowDown', 'ArrowUp', 'Enter', ' '],
			clearSearchOnEscape: true
		}),
		screenReaderConfig: () => ({
			announceSelections: true,
			announceFiltering: true,
			announceOptionCount: true,
			announcementLevel: 'polite',
			announcementDelay: 100
		}),
		selectedItemConfig: () => ({
			displayMode: 'tags',
			focusable: true,
			showRemoveButton: true,
			maxVisibleTags: 3,
			overflowText: "and $count more",
			position: 'below'
		}),
		virtualized: false,
		optionHeight: 40,
		virtualContainerHeight: 250,
		overscan: 5,
		virtualizationThreshold: 100
	}
);

const emit = defineEmits<BMultiSelectEmits<T>>();

const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(
	props,
	"expanded",
	emit,
	false
);

const searchText = ref("");
const searchDebounceTimer = ref<NodeJS.Timeout | null>(null);
const componentRef = ref<HTMLElement>();
const searchInputRef = ref<HTMLInputElement>();
const listboxRef = ref<HTMLElement>();

// Accessibility setup
const { useAriaId, useComboboxAria, useListboxAria, useOptionAria } = useAriaAttributes();
const screenReader = useScreenReader();
const multiSelectId = useAriaId('multiselect');
const listboxId = useAriaId('multiselect-listbox');
const searchInputId = useAriaId('multiselect-search');
const statusId = useAriaId('multiselect-status');
const instructionsId = useAriaId('multiselect-instructions');
const activeDescendantId = ref<string>('');
const keyboardActiveIndex = ref(-1);
const announcementQueue = ref<string[]>([]);

// Keyboard navigation setup - use shallowRef for performance
const navigableItemsRef = shallowRef<BMultiSelectItemType<T>[]>([]);
const keyboardNav = useKeyboardNavigation(navigableItemsRef);

// Optimized selection state computations
const selectedCount = computed(() => {
	if (!props.modelValue) return 0;
	let count = 0;
	for (const item of props.modelValue) {
		if (getSelected(item)) count++;
	}
	return count;
});

// Check if selection limit is reached
const isSelectionLimitReached = computed(() => 
	props.maxSelections !== undefined && selectedCount.value >= props.maxSelections
);

// Get selected items for display - cached for performance
const selectedItems = computed(() => {
	if (!props.modelValue) return [];
	return props.modelValue.reduce((acc: BMultiSelectItemType<T>[], item) => {
		if (getSelected(item)) acc.push(item);
		return acc;
	}, []);
});

// Memoized filtered items with better performance for large datasets
const filteredItems = computed(() => {
	const searchValue = searchText.value;
	if (!searchValue || !props.searchable || searchValue.length < props.minSearchLength) {
		return props.modelValue || [];
	}
	
	// Use optimized search with early return
	const searchLower = searchValue.toLowerCase();
	return (props.modelValue || []).filter((item: BMultiSelectItemType<T>) => {
		const label = getLabel(item);
		return label.toLowerCase().includes(searchLower);
	});
});

// Check if there are any options to display
const hasOptions = computed(() => filteredItems.value.length > 0);

// Auto-enable virtualization if items exceed threshold
const shouldVirtualize = computed(() => {
	return props.virtualized || (filteredItems.value.length >= props.virtualizationThreshold);
});

// Virtual scrolling setup for large lists
const virtualScrollContainer = ref<HTMLDivElement | null>(null);
const {
	list: virtualList,
	containerProps: virtualContainerProps,
	wrapperProps: virtualWrapperProps
} = useVirtualList(
	filteredItems,
	{
		itemHeight: props.optionHeight,
		overscan: props.overscan
	}
);

// Use virtualized list when enabled, otherwise use regular filtered items
const renderedItems = computed(() => {
	return shouldVirtualize.value ? virtualList.value : filteredItems.value.map((data, index) => ({ data, index }));
});

// Legacy computed for backward compatibility
const selected = selectedCount;

// ARIA attributes
const comboboxAriaAttrs = computed(() => ({
	...useComboboxAria(
		expandedModel,
		true,
		listboxId,
		activeDescendantId
	).value,
	id: multiSelectId,
	'aria-label': props.ariaLabel || props.labelValue || 'Multi-select',
	'aria-labelledby': props.ariaLabelledBy,
	'aria-describedby': [props.ariaDescribedBy, statusId, props.keyboardInstructions ? instructionsId : undefined]
		.filter(Boolean).join(' ') || undefined,
	'aria-required': props.required,
	'aria-invalid': props.isError,
	'aria-disabled': props.disabled,
	'aria-multiselectable': true,
	'aria-autocomplete': props.searchable ? 'list' : undefined,
	role: 'combobox'
}));

const listboxAriaAttrs = computed(() => ({
	...useListboxAria(true, 'vertical').value, // multiselectable = true
	id: listboxId,
	'aria-label': `Options for ${props.labelValue || 'multi-select'}`,
	'aria-multiselectable': true
}));

// Status message for screen readers
const statusMessage = computed(() => {
	const count = selectedCount.value;
	if (count === 0) return 'No items selected';
	if (count === 1) return '1 item selected';
	return `${count} items selected`;
});

// Instructions for keyboard navigation
const keyboardInstructionsMessage = computed(() => 
	props.keyboardInstructionsText
);

const showStatus = computed(
	() =>
		selectedCount.value &&
		!props.disabled &&
		((!expandedModel.value && props.searchable) || !props.searchable)
);

/**
 * Gets the selection state from an item
 */
function getSelected(item: BMultiSelectItemType<T>): boolean {
	if (item === null || item === undefined) return false;
	return isObject(item) ? Boolean((item as BMultiSelectItem)[props.selectedKey]) : false;
}

/**
 * Gets the disabled state from an item
 */
function getDisabled(item: BMultiSelectItemType<T>): boolean {
	if (item === null || item === undefined) return false;
	return isObject(item) ? Boolean((item as BMultiSelectItem).disabled) : false;
}

/**
 * Gets the display label for an item
 */
function getLabel(item: BMultiSelectItemType<T>): string {
	if (item === null || item === undefined) return '';
	if (props.labelFormatter) {
		return props.labelFormatter(item);
	}
	return isObject(item) ? String((item as BMultiSelectItem)[props.labelKey] || '') : String(item);
}

/**
 * Sets the selection state of an item
 */
function setSelected(item: BMultiSelectItemType<T>, selected: boolean): void {
	if (isObject(item)) {
		(item as BMultiSelectItem)[props.selectedKey] = selected;
	}
}

/**
 * Queue an announcement for screen readers
 */
function queueAnnouncement(message: string, immediate: boolean = false): void {
	if (!props.screenReaderConfig?.announceSelections) return;
	
	if (immediate) {
		screenReader.announce(message, props.ariaLive);
	} else {
		setTimeout(() => {
			screenReader.announce(message, props.ariaLive);
		}, props.screenReaderConfig?.announcementDelay || 100);
	}
}

/**
 * Announce search results
 */
function announceSearchResults(count: number): void {
	if (!props.announceSearchResults || !props.screenReaderConfig?.announceFiltering) return;
	
	const message = props.searchResultsMessage?.replace('$count', count.toString()) || 
		`${count} option${count === 1 ? '' : 's'} available`;
	queueAnnouncement(message);
}

/**
 * Format selection change message
 */
function getSelectionChangeMessage(item: BMultiSelectItemType<T>, selected: boolean): string {
	if (props.selectedItemsAnnouncement) {
		return props.selectedItemsAnnouncement(selectedCount.value, selectedItems.value);
	}
	
	if (props.selectionChangeMessage) {
		return props.selectionChangeMessage;
	}
	
	const label = getLabel(item);
	const action = selected ? 'selected' : 'deselected';
	const count = selectedCount.value;
	return `${label} ${action}. ${count} item${count === 1 ? '' : 's'} selected`;
}

/**
 * Handles item selection/deselection
 */
function selectItem(item: BMultiSelectItemType<T>): void {
	if (props.disabled || getDisabled(item)) return;
	
	const currentlySelected = getSelected(item);
	const newSelectedState = !currentlySelected;
	
	// Check selection limit
	if (newSelectedState && isSelectionLimitReached.value) {
		queueAnnouncement(props.selectionLimitMessage!, true);
		emit('selectionLimitReached', props.maxSelections!);
		return;
	}
	
	setSelected(item, newSelectedState);
	
	const extra: BMultiSelectModelExtra<BMultiSelectItemType<T>> = newSelectedState
		? { selected: [item], deselected: [] }
		: { selected: [], deselected: [item] };

	emit("update:modelValue", props.modelValue, extra);
	
	// Announce selection change
	const message = getSelectionChangeMessage(item, newSelectedState);
	queueAnnouncement(message);
}

/**
 * Select all items
 */
function selectAll(): void {
	if (props.disabled) return;
	
	const availableItems = filteredItems.value.filter(item => !getDisabled(item));
	const unselectedItems = availableItems.filter(item => !getSelected(item));
	
	// Check selection limit
	if (props.maxSelections && selectedCount.value + unselectedItems.length > props.maxSelections) {
		queueAnnouncement(props.selectionLimitMessage!, true);
		emit('selectionLimitReached', props.maxSelections);
		return;
	}
	
	unselectedItems.forEach(item => setSelected(item, true));
	
	const extra: BMultiSelectModelExtra<BMultiSelectItemType<T>> = {
		selected: unselectedItems,
		deselected: []
	};
	
	emit("update:modelValue", props.modelValue, extra);
	queueAnnouncement(`All available items selected. ${selectedCount.value} items selected`);
}

/**
 * Clear all selections
 */
function clearAll(): void {
	if (props.disabled) return;
	
	const currentSelected = selectedItems.value;
	currentSelected.forEach(item => setSelected(item, false));
	
	const extra: BMultiSelectModelExtra<BMultiSelectItemType<T>> = {
		selected: [],
		deselected: currentSelected
	};
	
	emit("update:modelValue", props.modelValue, extra);
	queueAnnouncement('All selections cleared');
}

/**
 * Remove a specific selected item
 */
function removeSelectedItem(item: BMultiSelectItemType<T>): void {
	if (props.disabled || !getSelected(item)) return;
	
	setSelected(item, false);
	
	const extra: BMultiSelectModelExtra<BMultiSelectItemType<T>> = {
		selected: [],
		deselected: [item]
	};
	
	emit("update:modelValue", props.modelValue, extra);
	
	const label = getLabel(item);
	queueAnnouncement(`${label} ${props.removeSelectionMessage}`);
}

/**
 * Handles keyboard navigation for multi-select
 */
function handleKeydown(event: KeyboardEvent): boolean {
	if (!props.keyboardConfig?.enabled) return false;
	
	const items = navigableItems.value;
	if (items.length === 0) return false;
	
	let handled = false;
	const config = props.keyboardConfig;
	
	switch (event.key) {
		case 'ArrowDown':
			event.preventDefault();
			if (keyboardActiveIndex.value < items.length - 1) {
				keyboardActiveIndex.value++;
			} else if (config?.wrapNavigation) {
				keyboardActiveIndex.value = 0;
			}
			handled = true;
			break;
			
		case 'ArrowUp':
			event.preventDefault();
			if (keyboardActiveIndex.value > 0) {
				keyboardActiveIndex.value--;
			} else if (config?.wrapNavigation) {
				keyboardActiveIndex.value = items.length - 1;
			}
			handled = true;
			break;
			
		case 'Home':
			event.preventDefault();
			keyboardActiveIndex.value = 0;
			handled = true;
			break;
			
		case 'End':
			event.preventDefault();
			keyboardActiveIndex.value = items.length - 1;
			handled = true;
			break;
			
		case 'Enter':
		case ' ':
			if (config?.selectionKeys?.includes(event.key)) {
				event.preventDefault();
				if (keyboardActiveIndex.value >= 0) {
					const selectedItem = items[keyboardActiveIndex.value];
					selectItem(selectedItem);
					if (config?.selectOnFocus) {
						// Move to next item for continuous selection
						if (keyboardActiveIndex.value < items.length - 1) {
							keyboardActiveIndex.value++;
						}
					}
				}
				handled = true;
			}
			break;
			
		case 'Escape':
			if (config?.closeKeys?.includes(event.key)) {
				event.preventDefault();
				if (config?.clearSearchOnEscape && props.searchable) {
					clearSearch();
				}
				setExpandedModel(false, { source: "keyboard" });
				handled = true;
			}
			break;
			
		case 'a':
		case 'A':
			// Ctrl+A or Cmd+A to select all
			if ((event.ctrlKey || event.metaKey) && props.showSelectAll) {
				event.preventDefault();
				selectAll();
				handled = true;
			}
			break;
			
		default:
			// Type-ahead search
			if (props.typeAhead && event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
				handleTypeAhead(event.key);
				handled = true;
			}
			break;
	}
	
	// Update active descendant for screen readers
	if (handled && keyboardActiveIndex.value >= 0 && keyboardActiveIndex.value < items.length) {
		const activeIndex = filteredItems.value.indexOf(items[keyboardActiveIndex.value]);
		activeDescendantId.value = `multiselect-option-${activeIndex}`;
		
		// Scroll into view if needed
		nextTick(() => {
			const activeElement = document.getElementById(activeDescendantId.value);
			if (activeElement && listboxRef.value) {
				scrollIntoViewIfNeeded(activeElement, listboxRef.value);
			}
		});
	}
	
	return handled;
}

/**
 * Handle type-ahead search
 */
function handleTypeAhead(char: string): void {
	if (!props.typeAhead) return;
	
	// Add character to search
	searchText.value += char;
	
	// Find first matching item
	const items = navigableItems.value;
	const searchLower = searchText.value.toLowerCase();
	const matchIndex = items.findIndex(item => 
		getLabel(item).toLowerCase().startsWith(searchLower)
	);
	
	if (matchIndex >= 0) {
		keyboardActiveIndex.value = matchIndex;
	}
}

/**
 * Scroll element into view if needed
 */
function scrollIntoViewIfNeeded(element: HTMLElement, container: HTMLElement): void {
	const elementRect = element.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();
	
	if (elementRect.top < containerRect.top) {
		element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
	} else if (elementRect.bottom > containerRect.bottom) {
		element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
	}
}

/**
 * Handles keyboard events for the multi-select
 */
function onKeyUp(event: KeyboardEvent) {
	if (!expandedModel.value) {
		// Open dropdown on configured keys
		if (props.keyboardConfig?.openKeys?.includes(event.key)) {
			event.preventDefault();
			setExpandedModel(true, { source: "keyboard" });
			
			// Set initial focus to first selected item or first item
			const items = navigableItems.value;
			if (items.length > 0) {
				const firstSelectedIndex = items.findIndex(item => getSelected(item));
				keyboardActiveIndex.value = firstSelectedIndex >= 0 ? firstSelectedIndex : 0;
			}
			return;
		}
	}
	
	// Handle keyboard navigation when expanded
	if (expandedModel.value) {
		handleKeydown(event);
	}
}

/**
 * Handle search input changes
 */
function onSearchInput(value: string): void {
	if (searchDebounceTimer.value) {
		clearTimeout(searchDebounceTimer.value);
	}
	
	searchDebounceTimer.value = setTimeout(() => {
		searchText.value = value;
		keyboardActiveIndex.value = 0; // Reset to first item
		activeDescendantId.value = '';
		
		// Announce search results
		const resultCount = filteredItems.value.length;
		announceSearchResults(resultCount);
		
		emit('search', value);
	}, props.searchDebounce);
}

/**
 * Clear search input
 */
function clearSearch(): void {
	if (searchDebounceTimer.value) {
		clearTimeout(searchDebounceTimer.value);
	}
	searchText.value = '';
	keyboardActiveIndex.value = -1;
	activeDescendantId.value = '';
}

// Removed searchItem function - logic moved to filteredItems computed for better performance

// Filter items for keyboard navigation (exclude disabled items)
const navigableItems = computed(() => {
	const filtered = filteredItems.value;
	return filtered.filter(item => !getDisabled(item));
});

// Update navigable items ref for keyboard navigation composable
watch(navigableItems, (newItems) => {
	navigableItemsRef.value = newItems;
}, { immediate: true });

/**
 * Handles expanded state changes
 */
function changeExpanded(value: boolean, extra: BMultiSelectExpandedExtra): void {
	if (props.searchable && extra?.source === "click")
		setExpandedModel(true, extra as any);
	else setExpandedModel(value, extra as any);
	
	// Announce state changes with virtual scrolling context
	if (props.announceStateChanges) {
		let message = value 
			? props.stateChangeMessages?.opened 
			: props.stateChangeMessages?.closed;
		
		// Add virtual scrolling context to opening announcement
		if (value && message && shouldVirtualize.value) {
			message += '. Virtual scrolling enabled for better performance with large lists.';
		}
		
		if (message) {
			queueAnnouncement(message);
		}
	}
	
	// Reset keyboard navigation when closing
	if (!value) {
		keyboardActiveIndex.value = -1;
		activeDescendantId.value = '';
		clearSearch();
	} else {
		// Focus search input if searchable
		if (props.searchable && searchInputRef.value) {
			nextTick(() => {
				searchInputRef.value?.focus();
			});
		}
	}
}

/**
 * Handle focus events
 */
function onFocus(event: FocusEvent): void {
	emit('focus', event);
}

/**
 * Handle blur events
 */
function onBlur(event: FocusEvent): void {
	emit('blur', event);
}

// Watch for changes that should trigger announcements
watch(
	() => filteredItems.value.length,
	(newCount, oldCount) => {
		if (props.searchable && searchText.value && oldCount !== undefined && newCount !== oldCount) {
			const message = props.stateChangeMessages?.filtered?.replace('$count', newCount.toString()) ||
				`${newCount} option${newCount === 1 ? '' : 's'} found`;
			queueAnnouncement(message);
		}
	}
);

// Component instance methods for external control
defineExpose({
	focus: () => componentRef.value?.focus(),
	blur: () => componentRef.value?.blur(),
	open: () => setExpandedModel(true, { source: 'click' }),
	close: () => setExpandedModel(false, { source: 'click' }),
	selectAll,
	clearAll,
	selectItem,
	removeSelectedItem,
	getSelectedItems: () => selectedItems.value,
	getFilteredItems: () => filteredItems.value,
	setSearchQuery: (query: string) => { searchText.value = query; },
	clearSearch
});
</script>

<template>
	<div 
		ref="componentRef"
		class="b-multiselect-wrapper"
		@focus="onFocus"
		@blur="onBlur">
		
		<!-- Screen reader status and instructions -->
		<div 
			:id="statusId"
			class="sr-only" 
			:aria-live="ariaLive">
			{{ statusMessage }}
		</div>
		
		<div 
			v-if="keyboardInstructions"
			:id="instructionsId"
			class="sr-only">
			{{ keyboardInstructionsMessage }}
		</div>

		<!-- Selected items display (when configured to show above input) -->
		<div 
			v-if="selectedItemConfig?.position === 'above' && selectedItems.length > 0"
			class="b-multiselect-selected-items mb-xs"
			role="group"
			:aria-label="`${selectedItems.length} selected items`">
			<div class="flex flex-wrap gap-xs">
				<template v-if="selectedItemConfig?.displayMode === 'tags'">
					<div
						v-for="(item, index) in selectedItems.slice(0, selectedItemConfig?.maxVisibleTags)"
						:key="index"
						class="b-multiselect-tag inline-flex items-center gap-xs px-sm py-xs bg-primary-interaction-low rounded-md text-sm"
						:tabindex="selectedItemConfig?.focusable ? 0 : -1"
						role="button"
						:aria-label="`Selected: ${getLabel(item)}. Press Delete to remove.`"
						@keydown.delete.prevent="removeSelectedItem(item)"
						@keydown.backspace.prevent="removeSelectedItem(item)">
						<span>{{ getLabel(item) }}</span>
						<button
							v-if="selectedItemConfig?.showRemoveButton && removableSelections"
							type="button"
							class="b-multiselect-tag-remove w-4 h-4 flex items-center justify-center hover:bg-primary-interaction-selected rounded-full"
							:aria-label="`Remove ${getLabel(item)} from selection`"
							@click.stop="removeSelectedItem(item)">
							<BIcon name="close" class="w-3 h-3" />
						</button>
					</div>
					<div
						v-if="selectedItems.length > (selectedItemConfig?.maxVisibleTags || 3)"
						class="b-multiselect-overflow px-sm py-xs bg-neutral-background-subtle rounded-md text-sm text-neutral-foreground-negative">
						{{ selectedItemConfig?.overflowText?.replace('$count', (selectedItems.length - (selectedItemConfig?.maxVisibleTags || 3)).toString()) }}
					</div>
				</template>
			</div>
		</div>

		<BSelectContainer
			v-model="expandedModel"
			:labelValue="labelValue"
			class="b-select"
			:disabled="disabled"
			:required="required"
			:is-error="isError"
			:error-message="errorMessage"
			:info-message="infoMessage"
			:absolute="absolute"
			v-bind="comboboxAriaAttrs"
			@keyup="onKeyUp"
			@update:model-value="changeExpanded">
			
			<SelectContent
				ref="searchInputRef"
				v-model="searchText"
				v-model:expanded="expandedModel"
				:disabled="disabled"
				:icon="icon"
				:items="modelValue"
				:searchable="searchable"
				:placeholder="placeholder"
				@update:expanded="changeExpanded"
				@input="onSearchInput">
				
				<template
					#searchText
					v-if="$slots.searchText">
					<slot name="searchText" />
				</template>
				
				<template #status>
					<slot
						v-if="showStatus"
						name="status"
						:selected="selectedCount">
						<slot
							name="status-text"
							:selected="selectedCount">
							<span class="font-bold">Selected</span>
						</slot>
					</slot>
					<slot v-else-if="(!expandedModel && searchable) || !searchable" />
				</template>
			</SelectContent>

			<template
				#complement
				v-if="showStatus && showSelectionCount">
				<span 
					class="select-count"
					:aria-label="`${selectedCount} items selected`">
					{{ selectedCount }}
				</span>
			</template>

			<template #items>
				<!-- Header actions -->
				<div 
					v-if="showSelectAll || showClearAll"
					class="b-multiselect-actions border-b border-neutral-stroke-subtle pb-xs mb-xs">
					<div class="flex gap-xs">
						<button
							v-if="showSelectAll"
							type="button"
							class="btn-sm btn-secondary flex-1"
							:disabled="disabled || !hasOptions || isSelectionLimitReached"
							@click="selectAll">
							{{ selectAllText }}
						</button>
						<button
							v-if="showClearAll"
							type="button"
							class="btn-sm btn-secondary flex-1"
							:disabled="disabled || selectedCount === 0"
							@click="clearAll">
							{{ clearAllText }}
						</button>
					</div>
				</div>

				<!-- Header slot -->
				<slot 
					name="header"
					:selectedCount="selectedCount"
					:totalCount="filteredItems.length" />

				<!-- Options list -->
				<div
					ref="listboxRef"
					v-bind="listboxAriaAttrs"
					class="b-multiselect-listbox">
					
					<!-- Loading state -->
					<div 
						v-if="loading"
						class="p-md text-center text-neutral-foreground-negative"
						role="status"
						:aria-live="ariaLive">
						<slot name="loading">
							{{ loadingMessage }}
						</slot>
					</div>

					<!-- No options state -->
					<div 
						v-else-if="!hasOptions"
						class="p-md text-center text-neutral-foreground-negative"
						role="status"
						:aria-live="ariaLive">
						<slot name="no-options">
							{{ noOptionsMessage }}
						</slot>
					</div>

					<!-- Options -->
					<template v-else>
						<!-- Virtual scrolling container -->
						<div v-if="shouldVirtualize" 
							 ref="virtualScrollContainer"
							 v-bind="virtualContainerProps"
							 :style="{ height: `${virtualContainerHeight}px`, overflow: 'auto' }"
							 role="listbox"
							 :aria-label="`${renderedItems.length} options available, use arrow keys to navigate`">
							<div v-bind="virtualWrapperProps">
								<Option
									v-for="{ data: item, index } in renderedItems"
									:key="`virtual-${index}`"
									:id="`multiselect-option-${index}`"
									:aria-selected="getSelected(item)"
									:disabled="getDisabled(item)"
									:style="{ height: `${optionHeight}px` }"
									:class="{ 
										'keyboard-active': keyboardActiveIndex === index,
										'option-selected': getSelected(item)
									}"
									no-hover
									class="flex items-center gap-xs"
									role="option"
									@click="selectItem(item)"
									@keyup.space="selectItem(item)">
									
									<BCheckbox
										:model-value="getSelected(item)"
										:disabled="getDisabled(item) || (isSelectionLimitReached && !getSelected(item))"
										:aria-label="`${getSelected(item) ? 'Deselect' : 'Select'} ${getLabel(item)}`"
										tabindex="-1"
										@change="selectItem(item)" />
									
									<span class="flex-1">{{ getLabel(item) }}</span>
								</Option>
							</div>
						</div>
						<!-- Regular non-virtual scrolling -->
						<template v-else>
							<Option
								v-for="(item, index) in filteredItems"
								:key="index"
								:id="`multiselect-option-${index}`"
								:aria-selected="getSelected(item)"
								:disabled="getDisabled(item)"
								:class="{ 
									'keyboard-active': keyboardActiveIndex === navigableItems.indexOf(item),
									'option-selected': getSelected(item)
								}"
								no-hover
								class="flex items-center gap-xs"
								role="option"
								@click="selectItem(item)"
								@keyup.space="selectItem(item)">
								
								<BCheckbox
								:modelValue="getSelected(item)"
								:disabled="getDisabled(item)"
								:aria-hidden="true"
								class="pointer-events-none" />
							
							<slot
								name="item"
								:item="item"
								:index="index"
								:selected="getSelected(item)">
								<span class="flex-1">{{ getLabel(item) }}</span>
							</slot>
							
							<!-- Selection limit indicator -->
							<BIcon 
								v-if="isSelectionLimitReached && !getSelected(item)"
								name="block"
								class="w-4 h-4 text-neutral-foreground-negative"
								:aria-label="selectionLimitMessage" />
						</Option>
					</template>
				</template>
				</div>

				<!-- Footer slot -->
				<slot 
					name="footer"
					:selectedCount="selectedCount"
					:totalCount="filteredItems.length" />
			</template>

			<template
				v-if="$slots.actions"
				#actions>
				<slot name="actions" />
			</template>
		</BSelectContainer>

		<!-- Selected items display (when configured to show below input) -->
		<div 
			v-if="selectedItemConfig?.position === 'below' && selectedItems.length > 0"
			class="b-multiselect-selected-items mt-xs"
			role="group"
			:aria-label="`${selectedItems.length} selected items`">
			<div class="flex flex-wrap gap-xs">
				<template v-if="selectedItemConfig?.displayMode === 'tags'">
					<div
						v-for="(item, index) in selectedItems.slice(0, selectedItemConfig?.maxVisibleTags)"
						:key="index"
						class="b-multiselect-tag inline-flex items-center gap-xs px-sm py-xs bg-primary-interaction-low rounded-md text-sm"
						:tabindex="selectedItemConfig?.focusable ? 0 : -1"
						role="button"
						:aria-label="`Selected: ${getLabel(item)}. Press Delete to remove.`"
						@keydown.delete.prevent="removeSelectedItem(item)"
						@keydown.backspace.prevent="removeSelectedItem(item)">
						<span>{{ getLabel(item) }}</span>
						<button
							v-if="selectedItemConfig?.showRemoveButton && removableSelections"
							type="button"
							class="b-multiselect-tag-remove w-4 h-4 flex items-center justify-center hover:bg-primary-interaction-selected rounded-full"
							:aria-label="`Remove ${getLabel(item)} from selection`"
							@click.stop="removeSelectedItem(item)">
							<BIcon name="close" class="w-3 h-3" />
						</button>
					</div>
					<div
						v-if="selectedItems.length > (selectedItemConfig?.maxVisibleTags || 3)"
						class="b-multiselect-overflow px-sm py-xs bg-neutral-background-subtle rounded-md text-sm text-neutral-foreground-negative">
						{{ selectedItemConfig?.overflowText?.replace('$count', (selectedItems.length - (selectedItemConfig?.maxVisibleTags || 3)).toString()) }}
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	.select-count {
		@apply flex items-center justify-center text-neutral-foreground-negative bg-primary-interaction-selected text-xs w-[1.6em] h-[1.6em] rounded-full;
	}

	.keyboard-active {
		@apply ring-2 ring-primary-foreground-low;
	}

	.option-selected {
		@apply bg-primary-interaction-low;
	}

	.b-multiselect-tag {
		@apply transition-colors duration-200;
	}

	.b-multiselect-tag:hover {
		@apply bg-primary-interaction-selected;
	}

	.b-multiselect-tag:focus {
		@apply outline-none ring-2 ring-primary-foreground-low;
	}

	.b-multiselect-tag-remove {
		@apply transition-colors duration-200;
	}

	.b-multiselect-tag-remove:focus {
		@apply outline-none ring-1 ring-primary-foreground-low;
	}

	.sr-only {
		@apply absolute w-1 h-1 p-0 -m-1 overflow-hidden clip-rect-0 whitespace-nowrap border-0;
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.keyboard-active {
			@apply ring-4 ring-contrast-high;
		}
		
		.option-selected {
			@apply bg-contrast-high text-contrast-low;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.b-multiselect-tag,
		.b-multiselect-tag-remove {
			@apply transition-none;
		}
	}

	/* Focus-visible support for modern browsers */
	.b-multiselect-tag:focus-visible {
		@apply ring-2 ring-primary-foreground-low;
	}

	.b-multiselect-tag-remove:focus-visible {
		@apply ring-1 ring-primary-foreground-low;
	}
</style>