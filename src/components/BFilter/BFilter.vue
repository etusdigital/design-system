<script setup lang="ts">
	import { ref, shallowRef, shallowReactive, markRaw, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
	import { 
		useOptionalModel, 
		useAriaAttributes, 
		useScreenReader, 
		useKeyboardNavigation,
		useFocusTrap 
	} from "../../composables";
	import { createDebounce } from "../../utils";
	import { type BContainerModelExtra } from "../../utils/components/BContainerModelExtra.types";
	import Container from "../../utils/components/Container.vue";
	import SelectContent from "../../utils/components/SelectContent.vue";
	import Option from "../../utils/components/Option.vue";
	import BIcon from "../BIcon/BIcon.vue";
	import BButton from "../BButton/BButton.vue";
	import BCheckbox from "../BCheckbox/BCheckbox.vue";
	import { useClickOutside } from "../../composables";
	import type { 
		BFilterProps, 
		BFilterItem, 
		BFilterModelValue, 
		BFilterModelExtra, 
		BFilterEvents,
		DEFAULT_FILTER_ACCESSIBILITY 
	} from './BFilter.types';

	// Re-export interfaces for backward compatibility
	export type { BFilterItem, BFilterModelValue, BFilterModelExtra };

	const props = withDefaults(
		defineProps<BFilterProps>(),
		{
			modelValue: undefined,
			labelValue: "",
			expanded: undefined,
			labelKey: "label",
			selectedKey: "selected",
			searchText: "Search",
			icon: "filter_list",
			searchable: false,
			disabled: false,
			absolute: false,
			error: false,
			errorMessage: "",
			infoMessage: "",
			required: false,
			closeOnBlur: true,
			hideBottom: false,
			maxHeight: "",
			minWidth: "22em",
			secondary: false,
			hideArrow: false,
			// Performance options
			debounceDelay: 300,
			// Accessibility defaults
			enableAccessibility: true,
			ariaLabel: '',
			ariaDescription: '',
			ariaDescribedBy: '',
			ariaLabelledBy: '',
			landmarkRole: 'region' as const,
			announceChanges: true,
			changeAnnouncementTemplate: '{count} filter{plural} selected',
			announceActiveCount: true,
			activeCountAnnouncementTemplate: '{count} of {total} filters active',
			announceSelections: true,
			selectionAnnouncementTemplate: '{label} {state}',
			announceClear: true,
			clearAnnouncementTemplate: 'All filters cleared',
			announceApply: true,
			applyAnnouncementTemplate: 'Filters applied, {count} item{plural} selected',
			instructions: 'Use arrow keys to navigate, Space or Enter to select, Escape to close',
			livePoliteness: 'polite' as const,
			searchAriaLabel: 'Search filter options',
			useComboboxRole: true,
			searchAutocomplete: 'list' as const,
			searchResultsAnnouncement: '{count} result{plural} found',
			noResultsAnnouncement: 'No results found',
			searchHelpText: 'Type to filter options',
			categoryAriaLabel: 'Filter category',
			categoriesCollapsible: true,
			categoryExpandAnnouncement: '{category} expanded',
			categoryCollapseAnnouncement: '{category} collapsed',
			categoryHeadingLevel: 3 as const,
			useCategoryGroups: true,
			selectionMode: 'multi' as const,
			optionRole: 'checkbox' as const,
			optionAriaLabelTemplate: '{label}',
			includeStateInLabels: true,
			includePositionInfo: false,
			enableKeyboardNavigation: true,
			enableTypeahead: true,
			typeaheadTimeout: 1000,
			keyboardLoop: true,
			horizontalCategoryNav: false,
			customKeyboardShortcuts: {} as Record<string, string>,
			trapFocus: true,
			restoreFocus: true,
			initialFocus: 'search' as const,
			focusManagement: 'hybrid' as const,
			showFocusRing: true,
			customFocusStyles: {} as Record<string, string>,
			supportHighContrast: true,
			respectReducedMotion: true,
			supportLargeText: true,
			enhancedTouchTargets: true,
			id: undefined,
			name: undefined,
		}
	);

	const emit = defineEmits<BFilterEvents>();

	const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(
		props,
		"expanded",
		emit,
		false
	);
	
	// State management - optimized with shallow reactivity
	// Use shallowRef for search state object since we only care about top-level key changes
	let itemsSearch = shallowRef<Record<string, string>>({});
	let itemExpanded = ref(-1);
	let selected = ref(getAllSelections());
	const containerRef = ref<HTMLElement | null>(null);
	const triggerRef = ref<HTMLElement | null>(null);
	const searchInputRef = ref<HTMLInputElement | null>(null);
	const activeOptionIndex = ref(-1);
	const typeaheadBuffer = ref('');
	const typeaheadTimeout = ref<NodeJS.Timeout | null>(null);
	
	// Accessibility composables
	const {
		useAriaId,
		useComboboxAria,
		useListboxAria,
		useOptionAria,
		useButtonAria,
		useExpandableAria
	} = useAriaAttributes();
	
	const { announce, useLiveRegion } = useScreenReader();
	const { liveRegion, updateLiveRegion } = useLiveRegion(props.livePoliteness);
	
	// Generate unique IDs for accessibility
	const filterId = computed(() => props.id || useAriaId('filter'));
	const listboxId = computed(() => `${filterId.value}-listbox`);
	const searchId = computed(() => `${filterId.value}-search`);
	const instructionsId = computed(() => `${filterId.value}-instructions`);
	const statusId = computed(() => `${filterId.value}-status`);
	
	// Focus management
	const focusTrapResult = props.trapFocus ? useFocusTrap(containerRef, expandedModel) : null;
	
	// Debounced search handling for performance
	const debouncedSearchEmit = createDebounce((query: string, categoryKey?: string) => {
		emit('search', query, categoryKey);
	}, props.debounceDelay || 300);
	
	// Prepare categories and options for keyboard navigation - optimized with shallow ref
	const flatOptions = computed(() => {
		const options: { categoryIndex: number; itemIndex: number; item: BFilterItem; categoryKey: string }[] = [];
		Object.entries(props.modelValue).forEach(([categoryKey, items], categoryIndex) => {
			items.forEach((item, itemIndex) => {
				if (!item.disabled) {
					options.push({ categoryIndex, itemIndex, item, categoryKey });
				}
			});
		});
		return options;
	});
	
	// Keyboard navigation
	const {
		activeIndex: keyboardActiveIndex,
		handleKeydown: handleNavigationKeydown,
		setActiveIndex: setKeyboardActiveIndex,
		reset: resetKeyboardNavigation
	} = useKeyboardNavigation(
		flatOptions,
		(option, index) => {
			if (option) {
				selectItem(option.item);
			}
		},
		{
			loop: props.keyboardLoop,
			horizontal: props.horizontalCategoryNav,
			customHandlers: {
				...props.customKeyboardShortcuts,
				'Escape': () => {
					setExpandedModel(false);
					resetKeyboardNavigation();
				},
				'Enter': (event) => {
					event.preventDefault();
					const option = flatOptions.value[keyboardActiveIndex.value];
					if (option) {
						selectItem(option.item);
					}
				},
				' ': (event) => {
					event.preventDefault();
					const option = flatOptions.value[keyboardActiveIndex.value];
					if (option) {
						selectItem(option.item);
					}
				}
			}
		}
	);
	
	// ARIA attributes
	const containerAriaAttributes = computed(() => {
		const baseAttrs: Record<string, any> = {
			id: filterId.value,
			...(props.ariaLabel && { 'aria-label': props.ariaLabel }),
			...(props.ariaLabelledBy && { 'aria-labelledby': props.ariaLabelledBy }),
			...(props.ariaDescribedBy && { 'aria-describedby': props.ariaDescribedBy }),
		};
		
		// Add landmark role if specified
		if (props.landmarkRole && props.landmarkRole !== 'none') {
			baseAttrs.role = props.landmarkRole;
		}
		
		return baseAttrs;
	});
	
	const triggerAriaAttributes = computed(() => useButtonAria(
		ref(false), // not pressed
		expandedModel,
		listboxId.value,
		`${statusId.value} ${instructionsId.value}`
	).value);
	
	const searchAriaAttributes = computed(() => {
		if (!props.searchable || !props.useComboboxRole) return {};
		
		return useComboboxAria(
			expandedModel,
			true,
			listboxId.value,
			keyboardActiveIndex.value >= 0 ? ref(`option-${keyboardActiveIndex.value}`) : ref(undefined)
		).value;
	});
	
	const listboxAriaAttributes = computed(() => useListboxAria(
		props.selectionMode === 'multi',
		'vertical'
	).value);

	/**
	 * Gets the total count of all selected items across all categories
	 */
	function getAllSelections(): number {
		let count = 0;
		Object.keys(props.modelValue).forEach((categoryKey: string) => {
			count += props.modelValue[categoryKey].filter(
				(subItem: BFilterItem) => (subItem as Record<string, unknown>)[props.selectedKey] === true
			).length;
		});
		return count;
	}

	/**
	 * Toggles the selection state of a filter item
	 */
	function selectItem(item: BFilterItem): void {
		if (props.disabled) return;
		
		// Create a deep copy of modelValue to avoid prop mutations
		const newModelValue = JSON.parse(JSON.stringify(props.modelValue));
		let updatedItem: BFilterItem | null = null;
		
		// Find and update the item in the copied data
		for (const [categoryKey, items] of Object.entries(newModelValue)) {
			const foundItem = items.find(i => i === item);
			if (foundItem) {
				const itemRecord = foundItem as Record<string, unknown>;
				const wasSelected = itemRecord[props.selectedKey];
				itemRecord[props.selectedKey] = !itemRecord[props.selectedKey];
				updatedItem = foundItem;
				break;
			}
		}
		
		if (!updatedItem) return;
		
		const updatedItemRecord = updatedItem as Record<string, unknown>;
		const isNowSelected = updatedItemRecord[props.selectedKey] as boolean;
		
		// Update count
		if (isNowSelected) selected.value++;
		else selected.value--;
		
		// Find changed categories
		const changedCategories: string[] = [];
		for (const [categoryKey, items] of Object.entries(newModelValue)) {
			if (items.includes(updatedItem)) {
				changedCategories.push(categoryKey);
				break;
			}
		}
		
		const extra: BFilterModelExtra = {
			selected: isNowSelected ? [updatedItem] : [],
			deselected: isNowSelected ? [] : [updatedItem],
			totalSelected: selected.value,
			changedCategories,
			selectionMode: props.selectionMode,
			shouldAnnounce: props.announceSelections
		};
		
		// Emit the updated modelValue
		emit("update:modelValue", newModelValue, extra);
		
		// Announce selection changes
		if (props.announceSelections && props.enableAccessibility) {
			const state = isNowSelected ? 'selected' : 'deselected';
			const label = (updatedItemRecord[props.labelKey] as string) || 'Option';
			
			let announcement = props.selectionAnnouncementTemplate
				.replace('{label}', label)
				.replace('{state}', state);
				
			announce(announcement, props.livePoliteness);
		}
		
		// Update live region with current count
		if (props.announceActiveCount && props.enableAccessibility) {
			updateStatusAnnouncement();
		}
	}

	/**
	 * Toggles the expanded state of a category
	 */
	function toggleSubList(index: number): void {
		const wasExpanded = itemExpanded.value === index;
		itemExpanded.value = wasExpanded ? -1 : index;
		
		// Find category name for announcement
		const categoryEntries = Object.entries(props.modelValue);
		const categoryName = categoryEntries[index]?.[0] || `Category ${index + 1}`;
		
		// Emit category toggle event
		emit('categoryToggle', categoryName, !wasExpanded);
		
		// Announce category state change
		if (props.enableAccessibility && props.categoriesCollapsible) {
			const template = wasExpanded 
				? props.categoryCollapseAnnouncement 
				: props.categoryExpandAnnouncement;
			
			const announcement = template.replace('{category}', categoryName);
			announce(announcement, props.livePoliteness);
		}
		
		// Reset keyboard navigation when category changes
		if (props.enableKeyboardNavigation) {
			resetKeyboardNavigation();
		}
	}

	/**
	 * Gets the count of selected items in a category
	 */
	function getSelected(items: BFilterItem[]): number {
		return items.filter((item: BFilterItem) => (item as Record<string, unknown>)[props.selectedKey] === true).length;
	}

	/**
	 * Filters items based on search text
	 */
	function searchItem(items: BFilterItem[], search: string): BFilterItem[] {
		if (!search) {
			return items;
		}
		return items.filter((item: BFilterItem) => {
			const itemRecord = item as Record<string, unknown>;
			const labelValue = itemRecord[props.labelKey] as string;
			if (labelValue && labelValue.toLowerCase().includes(search.toLowerCase())) {
				return item;
			}
		});
	}

	/**
	 * Clears all selections across all categories
	 */
	function clear(): void {
		// Create a deep copy of modelValue to avoid prop mutations
		const newModelValue = JSON.parse(JSON.stringify(props.modelValue));
		const previouslySelected: BFilterItem[] = [];
		
		Object.keys(newModelValue).forEach((categoryKey: string) => {
			newModelValue[categoryKey] = newModelValue[categoryKey].map((subItem: BFilterItem) => {
				const itemRecord = subItem as Record<string, unknown>;
				if (itemRecord[props.selectedKey]) {
					previouslySelected.push(subItem);
				}
				itemRecord[props.selectedKey] = false;
				return subItem;
			});
		});
		
		selected.value = 0;
		
		// Emit the updated modelValue
		emit('update:modelValue', newModelValue);
		
		// Emit clear event
		emit('clear', previouslySelected);
		
		// Announce clear action
		if (props.announceClear && props.enableAccessibility) {
			announce(props.clearAnnouncementTemplate, props.livePoliteness);
		}
		
		// Update status announcement
		if (props.enableAccessibility) {
			updateStatusAnnouncement();
		}
		
		apply();
	}

	/**
	 * Emits the apply event with accessibility enhancements
	 */
	function apply(): void {
		// Collect all selected items
		const selectedItems: BFilterItem[] = [];
		Object.values(props.modelValue).forEach(items => {
			selectedItems.push(...items.filter(item => 
				(item as Record<string, unknown>)[props.selectedKey] === true
			));
		});
		
		emit("apply", selectedItems, selected.value);
		
		// Announce apply action
		if (props.announceApply && props.enableAccessibility) {
			const plural = selected.value !== 1 ? 's' : '';
			const announcement = props.applyAnnouncementTemplate
				.replace('{count}', selected.value.toString())
				.replace('{plural}', plural);
				
			announce(announcement, props.livePoliteness);
		}
	}
	
	/**
	 * Updates the status announcement for screen readers
	 */
	function updateStatusAnnouncement(): void {
		if (!props.enableAccessibility || !props.announceActiveCount) return;
		
		const totalOptions = flatOptions.value.length;
		const plural = selected.value !== 1 ? 's' : '';
		
		const announcement = props.activeCountAnnouncementTemplate
			.replace('{count}', selected.value.toString())
			.replace('{total}', totalOptions.toString())
			.replace('{plural}', plural);
			
		updateLiveRegion(announcement);
	}
	
	/**
	 * Handles keyboard events for the component
	 */
	function handleKeydown(event: KeyboardEvent): void {
		if (!props.enableKeyboardNavigation || props.disabled) return;
		
		// Handle global shortcuts
		if (event.key === 'Escape') {
			setExpandedModel(false);
			if (props.restoreFocus && triggerRef.value) {
				triggerRef.value.focus();
			}
			return;
		}
		
		// Delegate to navigation handler if expanded
		if (expandedModel.value) {
			const handled = handleNavigationKeydown(event);
			
			// Handle typeahead search
			if (!handled && props.enableTypeahead && event.key.length === 1) {
				handleTypeahead(event.key);
			}
		}
	}
	
	/**
	 * Handles typeahead search functionality
	 */
	function handleTypeahead(char: string): void {
		// Clear existing timeout
		if (typeaheadTimeout.value) {
			clearTimeout(typeaheadTimeout.value);
		}
		
		// Add character to buffer
		typeaheadBuffer.value += char.toLowerCase();
		
		// Find matching option
		const matchingIndex = flatOptions.value.findIndex(option => {
			const label = (option.item as Record<string, unknown>)[props.labelKey] as string || '';
			return label.toLowerCase().startsWith(typeaheadBuffer.value);
		});
		
		if (matchingIndex >= 0) {
			setKeyboardActiveIndex(matchingIndex);
		}
		
		// Set timeout to clear buffer
		typeaheadTimeout.value = setTimeout(() => {
			typeaheadBuffer.value = '';
		}, props.typeaheadTimeout);
	}
	
	/**
	 * Handles search input changes with debouncing for better performance
	 */
	function handleSearch(categoryKey: string, query: string): void {
		// Trigger reactivity for shallowRef by replacing the object
		itemsSearch.value = { ...itemsSearch.value, [categoryKey]: query };
		
		// Use debounced emit for performance
		debouncedSearchEmit(query, categoryKey);
		
		// Announce search results if enabled
		if (props.enableAccessibility && query) {
			const filteredItems = searchItem(props.modelValue[categoryKey], query);
			const count = filteredItems.length;
			const plural = count !== 1 ? 's' : '';
			
			const announcement = count > 0 
				? props.searchResultsAnnouncement.replace('{count}', count.toString()).replace('{plural}', plural)
				: props.noResultsAnnouncement;
				
			announce(announcement, 'polite');
		}
	}
	
	/**
	 * Manages focus when the filter opens/closes
	 */
	function manageFocus(): void {
		if (!props.enableAccessibility) return;
		
		nextTick(() => {
			if (expandedModel.value) {
				// Set initial focus based on configuration
				switch (props.initialFocus) {
					case 'search':
						if (props.searchable && searchInputRef.value) {
							searchInputRef.value.focus();
						}
						break;
					case 'first-option':
						if (flatOptions.value.length > 0) {
							setKeyboardActiveIndex(0);
						}
						break;
					case 'trigger':
					default:
						// Keep focus on trigger
						break;
				}
			} else {
				// Restore focus when closing
				if (props.restoreFocus && triggerRef.value) {
					triggerRef.value.focus();
				}
			}
		});
	}
	
	/**
	 * Handles focus events
	 */
	function handleFocus(target: 'trigger' | 'search' | 'option', payload?: any): void {
		emit('focus', target, payload);
		
		if (target === 'trigger') {
			manageFocus();
		}
	}
	
	/**
	 * Handles blur events
	 */
	function handleBlur(target: 'trigger' | 'search' | 'option', payload?: any): void {
		emit('blur', target, payload);
	}
	
	// Watch for expanded state changes to manage focus
	watch(expandedModel, (newValue) => {
		if (newValue) {
			manageFocus();
		}
		
		// Update status announcement when filter state changes
		if (props.enableAccessibility) {
			updateStatusAnnouncement();
		}
	});
	
	// Watch for model changes to update count
	watch(() => props.modelValue, () => {
		selected.value = getAllSelections();
		
		if (props.enableAccessibility) {
			updateStatusAnnouncement();
		}
	}, { deep: true });
	
	// Cleanup on unmount
	onUnmounted(() => {
		if (typeaheadTimeout.value) {
			clearTimeout(typeaheadTimeout.value);
		}
		debouncedSearchEmit.cancel();
	});
</script>

<template>
	<div 
		ref="containerRef"
		v-bind="containerAriaAttributes"
		class="b-filter-container"
		:class="{
			'high-contrast': supportHighContrast,
			'reduced-motion': respectReducedMotion,
			'enhanced-touch': enhancedTouchTargets
		}"
		@keydown="handleKeydown">
		
		<!-- Live region for screen reader announcements -->
		<div 
			ref="liveRegion"
			:aria-live="livePoliteness"
			aria-atomic="true"
			class="sr-only"
			v-if="enableAccessibility">
		</div>
		
		<!-- Instructions for screen reader users -->
		<div 
			:id="instructionsId"
			class="sr-only"
			v-if="enableAccessibility && instructions">
			{{ instructions }}
		</div>
		
		<!-- Status information -->
		<div 
			:id="statusId"
			class="sr-only"
			v-if="enableAccessibility">
			{{ selected }} filter{{ selected !== 1 ? 's' : '' }} selected
		</div>
		
		<Container
			:modelValue="expandedModel"
			:labelValue="labelValue"
			class="b-filter"
			:disabled="disabled"
			:isError="error"
			:errorMessage="errorMessage"
			:infoMessage="infoMessage"
			:required="required"
			:closeOnBlur="true"
			:hideBottom="false"
			:maxHeight="maxHeight"
			:minWidth="minWidth"
			:secondary="secondary"
			:hideArrow="hideArrow"
			@update:modelValue="(value: boolean, extra: BContainerModelExtra) => $emit('update:expandedModel', value)">
		<SelectContent
			ref="triggerRef"
			v-model:expanded="expandedModel"
			v-bind="triggerAriaAttributes"
			:disabled="disabled"
			:icon="icon"
			:items="[]"
			:class="{
				'focus-visible': showFocusRing,
				'touch-target-enhanced': enhancedTouchTargets
			}"
			@update:expanded="setExpandedModel"
			@focus="handleFocus('trigger')"
			@blur="handleBlur('trigger')">
			<template #status>
				<slot
					v-if="!disabled"
					name="status"
					:selected="selected">
					<span class="font-bold text-neutral-interaction-default">
						<slot
							name="status-text"
							:selected="selected">
							{{ ariaLabel || labelValue || 'Filters' }}
						</slot>
					</span>
				</slot>
				<slot v-else-if="!expandedModel || disabled" />
			</template>
		</SelectContent>

		<template
			#complement
			v-if="selected && !disabled">
			<span class="select-count">{{ selected }}</span>
		</template>

		<template #items>
			<ul 
				v-bind="listboxAriaAttributes"
				:id="listboxId"
				class="filter-categories"
				role="listbox"
				:aria-label="categoryAriaLabel || 'Filter categories'"
				v-if="enableAccessibility">
				
				<li
					v-for="(item, index) in Object.entries(modelValue)"
					:key="item[0]"
					:role="useCategoryGroups ? 'group' : 'listitem'"
					:aria-label="`${item[0]} category`"
					class="flex flex-col gap-[.75em] select-none h-max transition-[height] max-h-[3em] overflow-hidden"
					:class="{ active: itemExpanded === index }"
					style="transition: max-height 0.2s ease">
					
					<!-- Category header -->
					<div
						:role="categoriesCollapsible ? 'button' : 'heading'"
						:aria-level="categoriesCollapsible ? undefined : categoryHeadingLevel"
						:aria-expanded="categoriesCollapsible ? (itemExpanded === index) : undefined"
						:aria-controls="categoriesCollapsible ? `category-${index}` : undefined"
						:tabindex="categoriesCollapsible ? 0 : -1"
						class="flex items-center justify-between text-neutral-interaction-default w-full h-full cursor-pointer *:p-xs hover:text-primary-interaction-default hover:bg-primary-surface-hover"
						:class="{
							'bg-primary-surface-default text-primary-interaction-default font-bold':
								itemExpanded === index,
							'focus-visible': showFocusRing,
							'touch-target-enhanced': enhancedTouchTargets
						}"
						@click.prevent="categoriesCollapsible && toggleSubList(index)"
						@keyup.enter="categoriesCollapsible && toggleSubList(index)"
						@keyup.space="categoriesCollapsible && toggleSubList(index)">
						
						<h3 
							:id="`category-header-${index}`"
							class="text-neutral-interaction-default"
							:class="{ 'sr-only': !categoriesCollapsible }">
							{{ item[0] }}
						</h3>
						
						<div class="flex items-center gap-xs">
							<slot
								v-if="getSelected(item[1])"
								name="status">
								<span
									class="select-count font-normal"
									:class="{
										active: itemExpanded === index,
									}"
									:aria-label="`${getSelected(item[1])} selected in ${item[0]}`">
									{{ getSelected(item[1]) }}
								</span>
							</slot>
							<div
								v-if="categoriesCollapsible"
								class="flex items-center w-fit h-fit transition-transform ease-in-out duration-300 cursor-pointer text-xl"
								:class="[
									itemExpanded === index
										? 'rotate-180 text-primary-interaction-default'
										: 'text-neutral-interaction-default',
									{ 'motion-reduce:transform-none': respectReducedMotion }
								]"
								aria-hidden="true">
								<BIcon
									name="expand_more"
									size="xl" />
							</div>
						</div>
					</div>
				<Transition 
					name="content"
					:class="{ 'motion-reduce:transition-none': respectReducedMotion }">
					<ul
						v-if="itemExpanded === index"
						:id="`category-${index}`"
						:aria-labelledby="`category-header-${index}`"
						:role="optionRole === 'checkbox' ? 'group' : 'listbox'"
						class="flex flex-col gap-xs pb-xxs overflow-auto custom-scroll max-h-[12em] mr-xxs mb-xxs">
						
						<!-- Search input for category -->
						<div
							v-if="searchable && !disabled"
							class="flex items-center text-xl gap-xs pb-xxs border-b-xxs border-neutral-default mb-xxs px-xs">
							<BIcon
								name="search"
								class="text-neutral-foreground-low"
								size="xl"
								aria-hidden="true" />
							<input
								ref="searchInputRef"
								v-bind="searchAriaAttributes"
								:id="`${searchId}-${index}`"
								v-model="itemsSearch[item[0]]"
								type="search"
								class="h-full w-full p-0 m-0 border-none text-xs pb-[.05em] placeholder:text-neutral-foreground-low outline-hidden border-none"
								:class="{ 'focus-visible': showFocusRing }"
								style="box-shadow: none"
								:disabled="disabled"
								:placeholder="searchAriaLabel || searchText"
								:aria-label="searchAriaLabel || `Search ${item[0]} options`"
								:aria-describedby="searchHelpText ? `${searchId}-help-${index}` : undefined"
								@input="handleSearch(item[0], ($event.target as HTMLInputElement).value)"
								@focus="handleFocus('search', { categoryKey: item[0], categoryIndex: index })"
								@blur="handleBlur('search', { categoryKey: item[0], categoryIndex: index })" />
							
							<!-- Search help text -->
							<div 
								v-if="searchHelpText"
								:id="`${searchId}-help-${index}`"
								class="sr-only">
								{{ searchHelpText }}
							</div>
						</div>
						
						<!-- Filter options -->
						<li
							v-for="(subItem, subItemIndex) in searchItem(item[1], itemsSearch[item[0]])"
							:key="subItemIndex"
							:id="`option-${index}-${subItemIndex}`"
							:role="optionRole"
							:aria-selected="optionRole === 'option' ? Boolean((subItem as Record<string, unknown>)[selectedKey]) : undefined"
							:aria-checked="optionRole !== 'option' ? Boolean((subItem as Record<string, unknown>)[selectedKey]) : undefined"
							:aria-disabled="subItem.disabled || undefined"
							:aria-label="subItem.ariaLabel || optionAriaLabelTemplate.replace('{label}', (subItem as Record<string, unknown>)[labelKey] as string)"
							:aria-describedby="subItem.description ? `option-desc-${index}-${subItemIndex}` : undefined"
							:aria-setsize="item[1].length"
							:aria-posinset="subItemIndex + 1"
							:tabindex="keyboardActiveIndex === flatOptions.findIndex(opt => opt.item === subItem) ? 0 : -1"
							class="flex items-center pl-xxs gap-xs"
							:class="{
								'focus-visible': showFocusRing && keyboardActiveIndex === flatOptions.findIndex(opt => opt.item === subItem),
								'touch-target-enhanced': enhancedTouchTargets,
								'option-disabled': subItem.disabled,
								'option-selected': (subItem as Record<string, unknown>)[selectedKey]
							}"
							@click="!subItem.disabled && selectItem(subItem)"
							@keydown.enter.prevent="!subItem.disabled && selectItem(subItem)"
							@keydown.space.prevent="!subItem.disabled && selectItem(subItem)"
							@focus="handleFocus('option', { item: subItem, categoryKey: item[0], categoryIndex: index, optionIndex: subItemIndex })"
							@blur="handleBlur('option', { item: subItem, categoryKey: item[0], categoryIndex: index, optionIndex: subItemIndex })">
							
							<BCheckbox
								v-if="optionRole === 'checkbox' || selectionMode === 'multi'"
								:modelValue="Boolean((subItem as Record<string, unknown>)[selectedKey])"
								:disabled="subItem.disabled"
								:aria-hidden="true"
								tabindex="-1"
								class="pointer-events-none" />
								
							<!-- Option label -->
							<span 
								class="option-label"
								:class="{ 'option-required': subItem.required }">
								{{ (subItem as Record<string, unknown>)[labelKey] }}
								<span v-if="includeStateInLabels" class="sr-only">
									{{ (subItem as Record<string, unknown>)[selectedKey] ? 'selected' : 'not selected' }}
								</span>
								<span v-if="includePositionInfo" class="sr-only">
									{{ subItemIndex + 1 }} of {{ item[1].length }}
								</span>
							</span>
							
							<!-- Option description -->
							<div 
								v-if="subItem.description"
								:id="`option-desc-${index}-${subItemIndex}`"
								class="sr-only">
								{{ subItem.description }}
							</div>
						</li>
						
						<!-- No results message -->
						<div 
							v-if="searchItem(item[1], itemsSearch[item[0]]).length === 0 && itemsSearch[item[0]]"
							class="px-xs py-sm text-neutral-foreground-low text-center"
							role="status"
							:aria-live="livePoliteness">
							{{ noResultsAnnouncement || 'No options found' }}
						</div>
					</ul>
				</Transition>
				</li>
			</ul>
			
			<!-- Fallback for non-accessibility mode -->
			<div v-else class="filter-categories-basic">
				<li
					v-for="(item, index) in Object.entries(modelValue)"
					:key="item[0]"
					class="flex flex-col gap-[.75em] select-none h-max transition-[height] max-h-[3em] overflow-hidden"
					:class="{ active: itemExpanded === index }"
					style="transition: max-height 0.2s ease">
					<div
						class="flex items-center justify-between text-neutral-interaction-default w-full h-full cursor-pointer *:p-xs hover:text-primary-interaction-default hover:bg-primary-surface-hover"
						:class="{
							'bg-primary-surface-default text-primary-interaction-default font-bold':
								itemExpanded === index,
						}"
						@click.prevent="toggleSubList(index)"
						@keyup.space="toggleSubList(index)">
						<p class="text-neutral-interaction-default">
							{{ item[0] }}
						</p>
						<div class="flex items-center gap-xs">
							<slot
								v-if="getSelected(item[1])"
								name="status">
								<span
									class="select-count font-normal"
									:class="{
										active: itemExpanded === index,
									}">
									{{ getSelected(item[1]) }}
								</span>
							</slot>
							<div
								class="flex items-center w-fit h-fit transition-transform ease-in-out duration-300 cursor-pointer text-xl"
								:class="[
									itemExpanded === index
										? 'rotate-180 text-primary-interaction-default'
										: 'text-neutral-interaction-default',
								]">
								<BIcon
									name="expand_more"
									size="xl" />
							</div>
						</div>
					</div>
					<Transition name="content">
						<ul
							v-if="itemExpanded === index"
							class="flex flex-col gap-xs pb-xxs overflow-auto custom-scroll max-h-[12em] mr-xxs mb-xxs">
							<div
								v-if="searchable && !disabled"
								class="flex items-center text-xl gap-xs pb-xxs border-b-xxs border-neutral-default mb-xxs px-xs">
								<BIcon
									name="search"
									class="text-neutral-foreground-low"
									size="xl" />
								<input
									v-model="itemsSearch[item[0]]"
									type="search"
									class="h-full w-full p-0 m-0 border-none text-xs pb-[.05em] placeholder:text-neutral-foreground-low outline-hidden border-none"
									style="box-shadow: none"
									:disabled="disabled"
									:placeholder="searchText" />
							</div>
							<Option
								v-for="(subItem, subItemIndex) in searchItem(
									item[1],
									itemsSearch[item[0]]
								)"
								no-hover
								:disabled="subItem.disabled"
								:key="subItemIndex"
								@click="selectItem(subItem)"
								@key.space="selectItem(subItem)"
								class="flex items-center pl-xxs gap-xs">
								<BCheckbox
									:modelValue="Boolean((subItem as Record<string, unknown>)[selectedKey])"
									class="pointer-events-none" />
								{{ subItem[labelKey] }}
							</Option>
						</ul>
					</Transition>
				</li>
			</div>
		</template>

		<template #actions>
			<slot name="actions">
				<div 
					class="flex items-center gap-xs"
					role="group"
					:aria-label="enableAccessibility ? 'Filter actions' : undefined">
					<BButton
						size="small"
						variant="plain"
						:aria-label="enableAccessibility ? `Clear all filters (${selected} selected)` : undefined"
						:class="{
							'focus-visible': showFocusRing,
							'touch-target-enhanced': enhancedTouchTargets
						}"
						@click="clear"
						:disabled="!selected">
						<slot name="clear-text"> Clear </slot>
					</BButton>
					<BButton
						type="button"
						size="small"
						:aria-label="enableAccessibility ? `Apply ${selected} filter${selected !== 1 ? 's' : ''}` : undefined"
						:class="{
							'focus-visible': showFocusRing,
							'touch-target-enhanced': enhancedTouchTargets
						}"
						:disabled="!selected"
						@click="apply">
						<slot name="apply-text"> Apply </slot>
					</BButton>
				</div>
			</slot>
		</template>
	</Container>
	</div>
</template>
<style scoped>
	@import "../../assets/main.css";

	.b-filter-container {
		@apply w-full;
	}

	.b-select {
		@apply w-full;
	}

	.content-enter-active {
		@apply transition-all duration-300 ease-out;
	}

	.content-leave-active {
		@apply transition-all duration-300 ease-out;
	}

	.content-enter-from,
	.content-leave-to {
		@apply h-max;
	}

	.active {
		@apply max-h-[12em];
	}

	.select-count {
		@apply flex items-center justify-center text-neutral-foreground-negative bg-primary-interaction-selected text-xs w-[1.6em] h-[1.6em] rounded-full;
	}

	/* Accessibility Enhancement Styles */
	.sr-only {
		@apply absolute left-[-10000px] w-[1px] h-[1px] overflow-hidden;
		clip: rect(0, 0, 0, 0);
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.focus-visible:focus {
		@apply outline outline-2 outline-offset-2 outline-primary-interaction-default;
	}

	.touch-target-enhanced {
		@apply min-h-[44px] min-w-[44px] touch-manipulation;
	}

	.filter-categories {
		@apply list-none p-0 m-0;
	}

	.filter-categories-basic {
		@apply list-none p-0 m-0;
	}

	.option-label {
		@apply flex-1 text-left;
	}

	.option-required::after {
		content: " *";
		@apply text-danger-interaction-default;
	}

	.option-disabled {
		@apply opacity-50 cursor-not-allowed;
	}

	.option-selected {
		@apply bg-primary-surface-selected;
	}

	/* High Contrast Mode Support */
	.high-contrast .focus-visible:focus {
		outline: 3px solid Highlight;
		outline-offset: 2px;
	}

	.high-contrast .option-selected {
		background-color: Highlight;
		color: HighlightText;
	}

	.high-contrast .select-count {
		background-color: ButtonText;
		color: ButtonFace;
		border: 1px solid ButtonText;
	}

	/* Reduced Motion Support */
	.reduced-motion .content-enter-active,
	.reduced-motion .content-leave-active {
		@apply transition-none duration-0;
	}

	.motion-reduce\:transition-none {
		transition: none !important;
	}

	.motion-reduce\:transform-none {
		transform: none !important;
	}

	/* Enhanced Touch Targets */
	.enhanced-touch .touch-target-enhanced {
		@apply min-h-[48px] min-w-[48px];
	}

	/* Keyboard Navigation Visual Indicators */
	.filter-categories li:focus-within {
		@apply ring-2 ring-primary-interaction-default ring-offset-2;
	}

	/* Search Input Accessibility */
	.filter-categories input[type="search"]:focus {
		@apply ring-2 ring-primary-interaction-default ring-offset-1;
	}

	/* Category Header Accessibility */
	.filter-categories [role="button"]:focus,
	.filter-categories [role="heading"]:focus {
		@apply ring-2 ring-primary-interaction-default ring-offset-2;
	}

	/* Option Focus States */
	.filter-categories [role="checkbox"]:focus,
	.filter-categories [role="option"]:focus {
		@apply ring-2 ring-primary-interaction-default ring-offset-1;
	}

	/* Loading and Status States */
	[aria-busy="true"] {
		cursor: wait;
		opacity: 0.7;
	}

	/* Screen Reader Friendly Status Updates */
	[role="status"] {
		@apply sr-only;
	}

	[role="alert"] {
		@apply sr-only;
	}
</style>
