<script setup lang="ts">
	import { ref, watch, computed, nextTick, onMounted, onUnmounted } from "vue";
	import { useOptionalModel, useAriaAttributes, useScreenReader, useKeyboardNavigation } from "#composables";
	import { type BContainerModelExtra } from "../../utils/components/BContainerModelExtra.types";
	import SelectContent from "../../utils/components/SelectContent.vue";
	import Option from "../../utils/components/Option.vue";
	import { isObject } from "../../utils";
	import type {
		BTagSelectProps,
		BTagSelectEmits,
		BTagSelectItem,
		BTagSelectModelValue,
		BTagSelectState,
		BTagSelectAriaAttributes,
		BTagSelectOptionAriaAttributes,
		BTagSelectTagAriaAttributes,
		BTagSelectKeyboardConfig,
		BTagSelectSearchConfig,
		BTagSelectValidationResult,
		BTagSelectAnnouncementTemplates,
		BSelectExpandedExtra,
		DEFAULT_TAG_SELECT_KEYBOARD_CONFIG,
		DEFAULT_TAG_SELECT_ACCESSIBILITY_CONFIG,
		DEFAULT_TAG_SELECT_SEARCH_CONFIG,
		DEFAULT_TAG_SELECT_ANNOUNCEMENTS,
	} from "./BTagSelect.types";

	/**
	 * Re-export types for external use
	 */
	export type { BTagSelectItem, BTagSelectModelValue, BTagSelectProps };

	const props = withDefaults(defineProps<BTagSelectProps>(), {
		modelValue: undefined,
		items: undefined,
		labelValue: "",
		errorMessage: "",
		expanded: false,
		labelKey: "label",
		valueKey: "value",
		infoMessage: "",
		disabled: false,
		required: false,
		isError: false,
		absolute: false,
		buttonText: "Add",
		// Accessibility defaults
		ariaLabel: "",
		ariaLabelledBy: "",
		ariaDescribedBy: "",
		ariaDescription: "",
		announceChanges: true,
		announcementTemplate: DEFAULT_TAG_SELECT_ACCESSIBILITY_CONFIG.announcementTemplate,
		highContrast: false,
		reduceMotion: false,
		enhancedFocus: true,
		minTouchTarget: true,
		screenReaderInstructions: DEFAULT_TAG_SELECT_ACCESSIBILITY_CONFIG.screenReaderInstructions,
		showTagCount: true,
		announceSelectionStatus: true,
		liveRegionPoliteness: "polite",
		role: "combobox",
		keyboardNavigation: true,
		wrapNavigation: true,
		typeAheadSearch: true,
		multiSelection: true,
		size: "medium",
		maxTags: undefined,
		allowDuplicates: false,
		showSelectedCount: false,
		searchPlaceholder: "Search tags...",
		autoFocus: false,
	});

	const emit = defineEmits<BTagSelectEmits>();


	// Enhanced search functionality
	const searchedItems = computed((): BTagSelectItem[] => {
		const searchConfig = props.searchConfig || DEFAULT_TAG_SELECT_SEARCH_CONFIG;
		
		if (!searchText.value || searchText.value.length < searchConfig.minCharacters) {
			return itemsModel.value;
		}

		// Use custom search function if provided
		if (searchConfig.searchFunction) {
			return searchConfig.searchFunction(itemsModel.value, searchText.value);
		}

		// Default search implementation
		const query = searchConfig.caseSensitive 
			? searchText.value 
			: searchText.value.toLowerCase();

		return itemsModel.value.filter((item: BTagSelectItem) => {
			if (isObject(item)) {
				const itemObj = item as Record<string, unknown>;
				const labelValue = itemObj[props.labelKey] as string;
				const searchValue = searchConfig.caseSensitive 
					? labelValue 
					: labelValue?.toLowerCase();
				
				if (typeof labelValue === 'string' && searchValue.includes(query)) {
					return true;
				}

				// Search in description if enabled
				if (searchConfig.searchDescriptions && itemObj.description) {
					const descValue = searchConfig.caseSensitive
						? itemObj.description as string
						: (itemObj.description as string).toLowerCase();
					return descValue.includes(query);
				}
			} else if (typeof item === 'string') {
				const searchValue = searchConfig.caseSensitive ? item : item.toLowerCase();
				return searchValue.includes(query);
			}
			return false;
		});
	});

	// Component state computed properties
	const componentState = computed((): BTagSelectState => ({
		selectedCount: model.value.length,
		availableCount: itemsModel.value.length,
		isExpanded: expandedModel.value,
		hasFocus: keyboardMode.value,
		focusedOptionIndex: focusedOptionIndex.value,
		focusedTagIndex: focusedTagIndex.value,
		keyboardMode: keyboardMode.value,
		searchValue: searchText.value,
		hasError: props.isError || false,
		errorMessage: props.errorMessage || '',
		isDisabled: props.disabled || false,
		isRequired: props.required || false,
		filteredItems: searchedItems.value,
	}));

	// Accessibility computed properties
	const keyboardConfig = computed(() => ({
		...DEFAULT_TAG_SELECT_KEYBOARD_CONFIG,
		...props.keyboardConfig,
	}));

	const searchConfig = computed(() => ({
		...DEFAULT_TAG_SELECT_SEARCH_CONFIG,
		...props.searchConfig,
	}));

	const announcementTemplates = computed(() => ({
		...DEFAULT_TAG_SELECT_ANNOUNCEMENTS,
		...props.announcementTemplate,
	}));

	// ARIA attributes for main container
	const tagSelectAriaAttributes = computed((): BTagSelectAriaAttributes => ({
		role: props.role || 'combobox',
		'aria-label': props.ariaLabel || `Tag select with ${componentState.value.selectedCount} tags selected`,
		'aria-labelledby': props.ariaLabelledBy,
		'aria-describedby': [props.ariaDescribedBy, descriptionId.value].filter(Boolean).join(' '),
		'aria-invalid': props.isError,
		'aria-disabled': props.disabled,
		'aria-required': props.required,
		'aria-expanded': expandedModel.value,
		'aria-controls': dropdownId.value,
		'aria-autocomplete': props.typeAheadSearch ? 'list' : 'none',
		'aria-multiselectable': props.multiSelection,
		'aria-live': props.liveRegionPoliteness,
		'aria-atomic': true,
	}));

	// ARIA attributes for options
	const getOptionAriaAttributes = (index: number, item: BTagSelectItem): BTagSelectOptionAriaAttributes => {
		return {
			role: 'option',
			'aria-selected': isIncluded(model.value, item),
			'aria-label': getItemLabel(item),
			'aria-describedby': isIncluded(model.value, item) ? `${componentId.value}-selected` : undefined,
			'aria-posinset': index + 1,
			'aria-setsize': searchedItems.value.length,
			tabindex: index === focusedOptionIndex.value ? 0 : -1,
			'aria-disabled': isOptionDisabled(item),
		};
	};

	// ARIA attributes for selected tags
	const getTagAriaAttributes = (index: number, tag: BTagSelectItem): BTagSelectTagAriaAttributes => {
		return {
			role: 'listitem',
			'aria-label': `Selected tag: ${getItemLabel(tag)}. Press Backspace or Delete to remove`,
			'aria-describedby': `${componentId.value}-tag-help`,
			'aria-posinset': index + 1,
			'aria-setsize': model.value.length,
			tabindex: index === focusedTagIndex.value ? 0 : -1,
			'aria-roledescription': 'removable tag',
		};
	};

	// Core state management
	const [model, setModel] = useOptionalModel<BTagSelectModelValue>(
		props,
		"modelValue",
		emit,
		[]
	);
	model.value = model.value || [];
	const [itemsModel, setItemsModel] = useOptionalModel<BTagSelectItem[]>(
		props,
		"items",
		emit,
		[]
	);

	const expandedModel = ref(props.expanded);
	const searchText = ref("");

	// Accessibility state
	const componentId = ref(`tag-select-${Math.random().toString(36).substr(2, 9)}`);
	const dropdownId = ref(`${componentId.value}-dropdown`);
	const searchInputId = ref(`${componentId.value}-search`);
	const liveRegionId = ref(`${componentId.value}-live`);
	const descriptionId = ref(`${componentId.value}-desc`);

	// Focus and navigation state
	const focusedOptionIndex = ref(-1);
	const focusedTagIndex = ref(-1);
	const keyboardMode = ref(false);
	const lastAction = ref('');

	// Component references
	const containerRef = ref<HTMLElement>();
	const searchInputRef = ref<HTMLInputElement>();
	const dropdownRef = ref<HTMLElement>();
	const liveRegionRef = ref<HTMLElement>();

	// Accessibility composables
	const { announceToScreenReader } = useScreenReader();
	const { setupAriaAttributes } = useAriaAttributes();
	const {
		handleKeydown,
		setupKeyboardNavigation,
		cleanupKeyboardNavigation
	} = useKeyboardNavigation();

	// Utility functions
	function getItemLabel(item: BTagSelectItem): string {
		if (isObject(item)) {
			const itemObj = item as Record<string, unknown>;
			return (itemObj[props.labelKey] as string) || '';
		}
		return item as string;
	}

	function getItemValue(item: BTagSelectItem): unknown {
		if (isObject(item)) {
			const itemObj = item as Record<string, unknown>;
			return props.valueKey ? itemObj[props.valueKey] : itemObj[props.labelKey];
		}
		return item;
	}

	function isOptionDisabled(item: BTagSelectItem): boolean {
		if (isObject(item)) {
			const itemObj = item as Record<string, unknown>;
			return itemObj.disabled === true;
		}
		return false;
	}

	// Validation functions
	function validateSelection(): BTagSelectValidationResult {
		const errors: string[] = [];
		const warnings: string[] = [];

		// Check maximum tags limit
		if (props.maxTags && model.value.length >= props.maxTags) {
			errors.push(`Maximum ${props.maxTags} tags allowed`);
		}

		return {
			isValid: errors.length === 0,
			errors,
			warnings,
			selectedCount: model.value.length,
		};
	}

	function announceChange(action: string, item: BTagSelectItem, count?: number) {
		if (!props.announceChanges) return;

		const template = props.announcementTemplate || DEFAULT_TAG_SELECT_ACCESSIBILITY_CONFIG.announcementTemplate;
		const message = template
			.replace('{action}', action)
			.replace('{tag}', getItemLabel(item))
			.replace('{count}', (count ?? model.value.length).toString());

		announceToScreenReader(message, props.liveRegionPoliteness);
		emit('accessibility', 'announcement', { action, item, message });
	}

	/**
	 * Adds a new tag to the items list
	 */
	function addTag(tag: string) {
		if (props.isError || !tag.trim()) return;

		// Validate before adding
		const validation = validateSelection();
		if (!validation.isValid) {
			const error = validation.errors[0];
			announceToScreenReader(error, 'assertive');
			emit('validation-error', error);
			if (props.maxTags && model.value.length >= props.maxTags) {
				emit('max-reached', model.value.length, props.maxTags);
			}
			return;
		}

		// Check for duplicates if not allowed
		if (!props.allowDuplicates && isIncluded(itemsModel.value, tag)) {
			searchText.value = "";
			announceToScreenReader(`Tag "${tag}" already exists`, 'polite');
			return;
		}

		// Add to items if not exists
		if (!isIncluded(itemsModel.value, tag)) {
			itemsModel.value.push(tag);
			setItemsModel(itemsModel.value, { index: itemsModel.value.length - 1 });
		}

		// Add to selection
		if (!isIncluded(model.value, tag)) {
			const newSelection = [...model.value, tag];
			setModel(newSelection, { index: newSelection.length - 1 });
			announceChange('Selected', tag);
			emit('tag-selected', tag, newSelection.length - 1);
		}

		searchText.value = "";
		focusedOptionIndex.value = -1;
	}

	/**
	 * Removes a tag from the selection
	 */
	function removeTag(index: number) {
		if (index < 0 || index >= model.value.length) return;

		const removedTag = model.value[index];
		model.value.splice(index, 1);
		setModel([...model.value], { index });
		
		announceChange('Removed', removedTag);
		emit('tag-removed', removedTag, index);
		
		// Adjust focused tag index
		if (focusedTagIndex.value >= index) {
			focusedTagIndex.value = Math.max(0, focusedTagIndex.value - 1);
		}
		
		// Focus management after removal
		nextTick(() => {
			if (model.value.length === 0) {
				focusSearchInput();
			} else if (focusedTagIndex.value < model.value.length) {
				focusTag(focusedTagIndex.value);
			}
		});
	}

	// Enhanced keyboard navigation
	function handleKeyboardNavigation(e: KeyboardEvent) {
		if (!props.keyboardNavigation) return;

		keyboardMode.value = true;
		lastAction.value = e.key;

		// Handle different contexts
		if (e.target === searchInputRef.value) {
			handleSearchInputKeydown(e);
		} else if ((e.target as Element)?.closest('[role="option"]')) {
			handleOptionKeydown(e);
		} else if ((e.target as Element)?.closest('[data-tag]')) {
			handleTagKeydown(e);
		}

		emit('keyboard', e, lastAction.value);
	}

	function handleSearchInputKeydown(e: KeyboardEvent) {
		const config = keyboardConfig.value;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if (searchedItems.value.length > 0) {
					expandedModel.value = true;
					focusedOptionIndex.value = 0;
					focusOption(0);
				}
				break;

			case 'ArrowUp':
				e.preventDefault();
				if (searchedItems.value.length > 0) {
					expandedModel.value = true;
					focusedOptionIndex.value = searchedItems.value.length - 1;
					focusOption(focusedOptionIndex.value);
				}
				break;

			case 'ArrowLeft':
				if (searchText.value === '' && model.value.length > 0) {
					e.preventDefault();
					focusedTagIndex.value = model.value.length - 1;
					focusTag(focusedTagIndex.value);
				}
				break;

			case 'Enter':
			case 'Tab':
				if (searchText.value.trim()) {
					e.preventDefault();
					addTag(searchText.value.trim());
				}
				break;

			case 'Escape':
				e.preventDefault();
				expandedModel.value = false;
				searchText.value = '';
				focusedOptionIndex.value = -1;
				break;

			case 'Backspace':
				if (searchText.value === '' && model.value.length > 0) {
					e.preventDefault();
					removeTag(model.value.length - 1);
				}
				break;
		}
	}

	function handleOptionKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				navigateOptions(1);
				break;

			case 'ArrowUp':
				e.preventDefault();
				navigateOptions(-1);
				break;

			case 'Enter':
			case ' ':
				e.preventDefault();
				if (focusedOptionIndex.value >= 0 && focusedOptionIndex.value < searchedItems.value.length) {
					selectItem(searchedItems.value[focusedOptionIndex.value], focusedOptionIndex.value);
				}
				break;

			case 'Escape':
				e.preventDefault();
				expandedModel.value = false;
				focusSearchInput();
				break;

			case 'Home':
				e.preventDefault();
				focusedOptionIndex.value = 0;
				focusOption(0);
				break;

			case 'End':
				e.preventDefault();
				focusedOptionIndex.value = searchedItems.value.length - 1;
				focusOption(focusedOptionIndex.value);
				break;
		}
	}

	function handleTagKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowLeft':
				e.preventDefault();
				navigateTagsF(focusedTagIndex.value - 1);
				break;

			case 'ArrowRight':
				e.preventDefault();
				if (focusedTagIndex.value < model.value.length - 1) {
					navigateTagsF(focusedTagIndex.value + 1);
				} else {
					// Move to search input
					focusedTagIndex.value = -1;
					focusSearchInput();
				}
				break;

			case 'Backspace':
			case 'Delete':
				e.preventDefault();
				removeTag(focusedTagIndex.value);
				break;

			case 'Home':
				e.preventDefault();
				focusedTagIndex.value = 0;
				focusTag(0);
				break;

			case 'End':
				e.preventDefault();
				focusedTagIndex.value = model.value.length - 1;
				focusTag(focusedTagIndex.value);
				break;
		}
	}

	function navigateOptions(direction: number) {
		const newIndex = focusedOptionIndex.value + direction;
		
		if (newIndex < 0) {
			if (keyboardConfig.value.wrapNavigation) {
				focusedOptionIndex.value = searchedItems.value.length - 1;
			} else {
				// Move back to search input
				focusedOptionIndex.value = -1;
				focusSearchInput();
				return;
			}
		} else if (newIndex >= searchedItems.value.length) {
			if (keyboardConfig.value.wrapNavigation) {
				focusedOptionIndex.value = 0;
			} else {
				return;
			}
		} else {
			focusedOptionIndex.value = newIndex;
		}

		focusOption(focusedOptionIndex.value);
	}

	function navigateTagsF(newIndex: number) {
		if (newIndex < 0) {
			if (keyboardConfig.value.wrapNavigation) {
				focusedTagIndex.value = model.value.length - 1;
			} else {
				return;
			}
		} else if (newIndex >= model.value.length) {
			if (keyboardConfig.value.wrapNavigation) {
				focusedTagIndex.value = 0;
			} else {
				return;
			}
		} else {
			focusedTagIndex.value = newIndex;
		}

		focusTag(focusedTagIndex.value);
	}

	// Focus management functions
	function focusSearchInput() {
		nextTick(() => {
			searchInputRef.value?.focus();
			keyboardMode.value = true;
		});
	}

	function focusOption(index: number) {
		nextTick(() => {
			const option = dropdownRef.value?.querySelector(`[data-option-index="${index}"]`) as HTMLElement;
			if (option) {
				option.focus();
				option.scrollIntoView({ block: 'nearest' });
				emit('option-focus', searchedItems.value[index], index);
			}
		});
	}

	function focusTag(index: number) {
		nextTick(() => {
			const tag = containerRef.value?.querySelector(`[data-tag-index="${index}"]`) as HTMLElement;
			if (tag) {
				tag.focus();
				tag.scrollIntoView({ block: 'nearest' });
				emit('tag-focus', model.value[index], index);
			}
		});
	}

	// Legacy keyboard handler for backward compatibility
	function onKeyUp(e: KeyboardEvent) {
		handleKeyboardNavigation(e);
	}

	/**
	 * Selects an item from the dropdown
	 */
	function selectItem(item: BTagSelectItem, index: number) {
		if (props.disabled || isOptionDisabled(item)) return;

		// Check if already selected and handle duplicates
		if (isIncluded(model.value, item) && !props.allowDuplicates) {
			announceToScreenReader(`"${getItemLabel(item)}" is already selected`, 'polite');
			return;
		}

		// Validate selection
		const validation = validateSelection();
		if (!validation.isValid) {
			const error = validation.errors[0];
			announceToScreenReader(error, 'assertive');
			emit('validation-error', error);
			if (props.maxTags && model.value.length >= props.maxTags) {
				emit('max-reached', model.value.length, props.maxTags);
			}
			return;
		}

		// Add to selection
		const newSelection = [...model.value, item];
		setModel(newSelection, { index: newSelection.length - 1 });
		
		// Close dropdown and announce
		expandedModel.value = false;
		emit("update:expanded", false, { source: "value-selected" });
		
		announceChange('Selected', item);
		emit('tag-selected', item, newSelection.length - 1);

		// Reset search and focus
		searchText.value = '';
		focusedOptionIndex.value = -1;
		focusSearchInput();
	}

	/**
	 * Checks if an item is included in the items array
	 */
	function isIncluded(items: BTagSelectItem[], item: BTagSelectItem): boolean {
		if (isObject(item)) {
			const itemObj = item as Record<string, unknown>;
			const itemValue = getItemValue(item);
			return !!items.find((i: BTagSelectItem) => {
				if (isObject(i)) {
					const iValue = getItemValue(i);
					return iValue === itemValue;
				}
				return i === itemValue;
			});
		}
		return items?.includes(item) || false;
	}

	function handleSlotClick(e: MouseEvent) {
		if (!e.target || props.disabled) return;
		
		setTimeout(() => {
			if (!(e.target as Element)?.classList?.contains("close-icon")) {
				expandedModel.value = true;
				emit("update:expanded", true, { source: "click" });
				emit('dropdown-open', e);
				focusSearchInput();
				
				// Announce dropdown opening
				if (props.announceChanges) {
					const message = `Dropdown opened. ${searchedItems.value.length} options available`;
					announceToScreenReader(message, 'polite');
				}
			}
		}, 1);
	}

	/**
	 * Changes the expanded state
	 */
	function changeExpanded(value: boolean, extra: BSelectExpandedExtra) {
		if (props.disabled) return;
		
		const previousValue = expandedModel.value;
		expandedModel.value = value;
		emit("update:expanded", value, extra);
		
		// Handle focus and announcements
		if (value && !previousValue) {
			// Opening
			focusSearchInput();
			emit('dropdown-open', new Event('dropdown-open'));
			if (props.announceChanges) {
				const message = `Dropdown opened. ${searchedItems.value.length} options available`;
				announceToScreenReader(message, 'polite');
			}
		} else if (!value && previousValue) {
			// Closing
			focusedOptionIndex.value = -1;
			emit('dropdown-close', new Event('dropdown-close'));
			if (props.announceChanges) {
				const message = `Dropdown closed. ${model.value.length} tags selected`;
				announceToScreenReader(message, 'polite');
			}
		}
	}

	/**
	 * Checks the source and updates expanded state accordingly
	 */
	function checkSource(value: boolean, extra: BSelectExpandedExtra) {
		if (extra?.source == "click") changeExpanded(true, extra);
		else changeExpanded(value, extra);
	}

	// Lifecycle hooks
	onMounted(() => {
		if (props.autoFocus) {
			focusSearchInput();
		}

		// Setup keyboard navigation
		if (containerRef.value) {
			containerRef.value.addEventListener('keydown', handleKeyboardNavigation);
		}

		// Setup accessibility attributes
		setupAriaAttributes(containerRef.value, tagSelectAriaAttributes.value);
	});

	onUnmounted(() => {
		if (containerRef.value) {
			containerRef.value.removeEventListener('keydown', handleKeyboardNavigation);
		}
		cleanupKeyboardNavigation();
	});

	// Watch for search text changes to announce results
	watch(searchText, (newValue, oldValue) => {
		if (props.announceChanges && newValue !== oldValue && expandedModel.value) {
			const resultCount = searchedItems.value.length;
			const message = `${resultCount} option${resultCount !== 1 ? 's' : ''} found${newValue ? ` for "${newValue}"` : ''}`;
			announceToScreenReader(message, 'polite');
			emit('search', newValue, searchedItems.value);
		}
	});

	// Watch for expanded changes
	watch(
		() => props.expanded,
		(newValue) => {
			if (newValue !== expandedModel.value) {
				expandedModel.value = newValue;
			}
		}
	);
</script>

<template>
	<!-- Main container with accessibility attributes -->
	<div 
		ref="containerRef"
		:id="componentId"
		class="tag-select-container"
		v-bind="tagSelectAriaAttributes"
		:class="{
			'tag-select-high-contrast': highContrast,
			'tag-select-reduced-motion': reduceMotion,
			'tag-select-enhanced-focus': enhancedFocus,
			'tag-select-disabled': disabled,
			'tag-select-error': isError,
			'tag-select-keyboard-mode': keyboardMode,
		}">

		<!-- Hidden description for screen readers -->
		<div :id="descriptionId" class="sr-only">
			{{ ariaDescription || screenReaderInstructions }}
			<span v-if="showTagCount">
				{{ selectedCount }} of {{ maxTags || 'unlimited' }} tags selected.
			</span>
		</div>

		<!-- Live region for announcements -->
		<div 
			ref="liveRegionRef"
			:id="liveRegionId"
			:aria-live="liveRegionPoliteness"
			aria-atomic="true"
			class="sr-only"
		></div>

		<!-- Tag count display (optional) -->
		<div v-if="showSelectedCount && selectedCount > 0" class="tag-count-display">
			<span class="text-sm text-neutral-foreground-medium">
				{{ selectedCount }} tag{{ selectedCount !== 1 ? 's' : '' }} selected
				<span v-if="maxTags"> ({{ maxTags - selectedCount }} remaining)</span>
			</span>
		</div>

	<BSelectContainer
		v-model="expandedModel"
		:required="required"
		:label-value="labelValue"
		:disabled="disabled"
		:absolute="absolute"
		:is-error="isError"
		:error-message="errorMessage"
		:info-message="infoMessage"
		max-height="none"
		min-width="12em"
		@keyup="onKeyUp"
		@keydown="handleKeyboardNavigation"
		@click="changeExpanded(true, { source: 'click' })"
		@update:model-value="checkSource"
		:aria-describedby="descriptionId">
		<SelectContent
			v-model="searchText"
			v-model:expanded="expandedModel"
			:disabled="disabled"
			:icon="icon"
			:items="items"
			@click="handleSlotClick"
			@update:expanded="changeExpanded"
			:aria-controls="dropdownId">
			<template #searchText>
				<slot name="search-text">{{ searchPlaceholder }}</slot>
			</template>
			<template #status>
				<!-- Search input when expanded or no tags -->
				<div
					class="relative"
					v-if="expandedModel || !modelValue?.length">
					<div
						v-show="!searchText.length"
						class="pointer-events-none w-0 h-0">
						<span
							class="absolute text-neutral-foreground-low top-[50%] translate-y-[-50%]"
							:class="{ 'text-danger-foreground-low': isError }">
							<slot name="search-text">{{ searchPlaceholder }}</slot>
						</span>
					</div>
					<input
						ref="searchInputRef"
						v-model="searchText"
						type="text"
						:id="searchInputId"
						class="search"
						role="combobox"
						:aria-label="ariaLabel || 'Search and select tags'"
						:aria-describedby="descriptionId"
						:aria-expanded="expandedModel"
						:aria-controls="dropdownId"
						:aria-autocomplete="typeAheadSearch ? 'list' : 'none'"
						aria-haspopup="listbox"
						@keydown="handleKeyboardNavigation"
						@keydown.enter="addTag(searchText)"
						@keydown.prevent.tab="addTag(searchText)"
						@focus="keyboardMode = true"
						style="--tw-ring-color: none !important"
						:disabled="disabled"
						:placeholder="searchPlaceholder"
						:class="{
							'bg-danger-surface-default text-danger-foreground-low': isError,
							'bg-neutral-surface-disabled text-neutral-foreground-low': disabled,
							'search-enhanced-focus': enhancedFocus,
							'search-high-contrast': highContrast,
						}" />
				</div>

				<!-- Selected tags display -->
				<div
					class="flex flex-wrap gap-xxs my-xs max-w-[40em]"
					v-else
					role="list"
					:aria-label="`${model.length} selected tag${model.length !== 1 ? 's' : ''}. Use arrow keys to navigate, Backspace to remove`">
					
					<!-- Help text for screen readers -->
					<div :id="componentId + '-tag-help'" class="sr-only">
						Press Backspace or Delete to remove tags. Use arrow keys to navigate between tags.
					</div>

					<BTag
						color="transparent"
						class="tag"
						:class="{
							'tag-focused': index === focusedTagIndex,
							'tag-enhanced-focus': enhancedFocus,
							'tag-high-contrast': highContrast,
							'tag-min-touch': minTouchTarget,
						}"
						v-for="(item, index) in model"
						:key="`selected-${index}`"
						:data-tag-index="index"
						v-bind="getTagAriaAttributes(index, item)"
						@keydown="handleKeyboardNavigation"
						@focus="focusedTagIndex = index; emit('tag-focus', item, index)"
						@blur="emit('tag-blur', item, index)">
						
						<div class="tag-default py-xxs">
							<p class="font-bold text-xs truncate" :title="getItemLabel(item)">
								{{ tagRenderer ? tagRenderer(item, index) : getItemLabel(item) }}
							</p>
							<BIcon
								name="close"
								@click="removeTag(index)"
								class="close-icon"
								:class="{
									'close-icon-enhanced': enhancedFocus,
									'close-icon-high-contrast': highContrast,
									'close-icon-min-touch': minTouchTarget,
								}"
								:aria-label="`Remove ${getItemLabel(item)} tag`"
								tabindex="-1" />
						</div>
					</BTag>
				</div>
			</template>
		</SelectContent>

		<template #items>
			<!-- Dropdown options container -->
			<div 
				ref="dropdownRef"
				:id="dropdownId"
				role="listbox"
				:aria-label="`Available tags. ${searchedItems.length} options available`"
				:aria-multiselectable="multiSelection"
				:aria-activedescendant="focusedOptionIndex >= 0 ? `${componentId}-option-${focusedOptionIndex}` : undefined"
				class="dropdown-options"
				:class="{
					'dropdown-high-contrast': highContrast,
					'dropdown-enhanced-focus': enhancedFocus,
				}">

				<!-- No results message -->
				<div
					class="text-xs italic text-neutral-foreground-low flex justify-center p-4"
					role="status"
					aria-live="polite"
					v-if="!searchedItems.length && searchText.length">
					<slot name="no-items-found"> No results found for "{{ searchText }}". </slot>
				</div>

				<!-- No items message -->
				<div
					class="text-xs italic text-neutral-foreground-low flex justify-center p-4"
					role="status"
					v-else-if="!itemsModel.length">
					<slot name="no-items"> No tags available yet. </slot>
				</div>

				<!-- Options list -->
				<template v-else>
					<Option
						v-for="(item, index) in searchedItems"
						:key="`option-${getItemValue(item)}-${index}`"
						v-bind="getOptionAriaAttributes(index, item)"
						:id="`${componentId}-option-${index}`"
						:data-option-index="index"
						class="option"
						:class="{ 
							'font-bold': isIncluded(model, item),
							'option-focused': index === focusedOptionIndex,
							'option-selected': isIncluded(model, item),
							'option-disabled': isOptionDisabled(item),
							'option-enhanced-focus': enhancedFocus,
							'option-high-contrast': highContrast,
							'option-min-touch': minTouchTarget,
						}"
						@click="!isOptionDisabled(item) && selectItem(item, index)"
						@keydown="handleKeyboardNavigation"
						@focus="focusedOptionIndex = index; emit('option-focus', item, index)"
						@blur="emit('option-blur', item, index)">
						
						<slot
							name="item"
							:item="item"
							:index="index"
							:selected="isIncluded(model, item)"
							:disabled="isOptionDisabled(item)"
							:focused="index === focusedOptionIndex">
							{{ optionRenderer ? optionRenderer(item, index) : getItemLabel(item) }}
							<!-- Visual indicator for selected items -->
							<BIcon 
								v-if="isIncluded(model, item)"
								name="checkmark"
								class="ml-auto text-success-foreground-default"
								:aria-hidden="true" />
						</slot>
					</Option>
				</template>
			</div>
		</template>
		<template #actions>
			<div class="flex justify-center w-full">
				<BRoundButton
					@click="addTag(searchText)"
					:text="buttonText"
					:disabled="!searchText.trim() || disabled"
					:aria-label="`Add tag: ${searchText || 'enter text to add'}`"
					always-open
					:class="{
						'button-enhanced-focus': enhancedFocus,
						'button-high-contrast': highContrast,
						'button-min-touch': minTouchTarget,
					}" />
			</div>
		</template>
	</BSelectContainer>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	/* Base component styles */
	.tag-select-container {
		@apply relative;
	}

	.tag-default {
		@apply flex items-center gap-xs;
	}

	.search {
		@apply text-neutral-interaction-default h-full w-full p-0 m-0 border-none shadow-none outline-hidden p3;
	}

	.tag {
		@apply py-0 max-w-full transition-colors duration-200;
	}

	.close-icon {
		@apply text-base text-neutral-interaction-default cursor-pointer transition-colors duration-200;
	}

	/* Accessibility enhancements */
	.tag-select-enhanced-focus .search:focus {
		@apply ring-4 ring-brand-surface-default ring-opacity-50 border-brand-border-default;
	}

	.tag-select-enhanced-focus .tag:focus {
		@apply ring-2 ring-brand-surface-default ring-opacity-50;
	}

	.tag-select-enhanced-focus .option:focus,
	.option-focused {
		@apply bg-brand-surface-subtle ring-2 ring-brand-surface-default ring-opacity-50;
	}

	/* High contrast mode */
	.tag-select-high-contrast {
		@apply contrast-more;
	}

	.tag-select-high-contrast .search {
		@apply border-2 border-neutral-border-strong;
	}

	.tag-select-high-contrast .tag {
		@apply border-2 border-neutral-border-strong;
	}

	.tag-select-high-contrast .option {
		@apply border-l-4 border-l-transparent;
	}

	.tag-select-high-contrast .option-selected {
		@apply border-l-brand-border-default bg-brand-surface-subtle;
	}

	.tag-select-high-contrast .option-focused {
		@apply border-l-brand-border-strong bg-brand-surface-default;
	}

	/* Reduced motion */
	.tag-select-reduced-motion * {
		@apply transition-none;
	}

	/* Minimum touch target sizes */
	.tag-min-touch {
		min-height: 44px;
		min-width: 44px;
	}

	.close-icon-min-touch {
		min-height: 24px;
		min-width: 24px;
		@apply p-1;
	}

	.option-min-touch {
		min-height: 44px;
	}

	.button-min-touch {
		min-height: 44px;
		min-width: 44px;
	}

	/* Focus states */
	.tag-focused {
		@apply ring-2 ring-brand-surface-default ring-opacity-50;
	}

	.option-disabled {
		@apply opacity-50 cursor-not-allowed;
	}

	/* Screen reader only content */
	.sr-only {
		@apply absolute -inset-[1px] w-[1px] h-[1px] p-0 border-0 overflow-hidden clip-rect-0 whitespace-nowrap;
	}

	/* Tag count display */
	.tag-count-display {
		@apply mb-2 px-2 py-1 bg-neutral-surface-subtle rounded-lg;
	}

	/* Keyboard mode indicators */
	.tag-select-keyboard-mode .search:focus {
		@apply ring-2 ring-brand-surface-default;
	}

	.tag-select-keyboard-mode .tag:focus-within {
		@apply ring-2 ring-brand-surface-default;
	}

	/* Error states */
	.tag-select-error .search {
		@apply border-danger-border-default;
	}

	.tag-select-error .tag {
		@apply border-danger-border-subtle;
	}

	/* Disabled states */
	.tag-select-disabled {
		@apply opacity-60 cursor-not-allowed;
	}

	.tag-select-disabled .search,
	.tag-select-disabled .tag,
	.tag-select-disabled .close-icon {
		@apply cursor-not-allowed;
	}
</style>

