<script setup lang="ts">
	import { computed, nextTick, ref, onMounted, onUnmounted, watch } from "vue";
	import { useOptionalModel, useAriaAttributes, useScreenReader } from "#composables";
	import Option from "../../utils/components/Option.vue";
	import BIcon from "../BIcon/BIcon.vue";
	import BCard from "../BCard/BCard.vue";
	import { isObject } from "../../utils";
	import type {
		BBreadcrumbItem,
		BreadcrumbItemType,
		MoreOptionsItem,
		ParsedBreadcrumbItem,
	} from "./BBreadcrumb.types";
	import {
		BREADCRUMB_CONSTANTS,
		BREADCRUMB_ARIA,
	} from "./BBreadcrumb.types";

	const props = withDefaults(
		defineProps<{
			/** Current selected value */
			modelValue?: unknown;
			/** Array of breadcrumb items */
			items?: BreadcrumbItemType[];
			/** Key to use for label when items are objects */
			labelKey?: string;
			/** Key to use for value when items are objects */
			valueKey?: string;
			/** Key to use for URL when items are objects */
			urlKey?: string;
			/** Whether to return the full object instead of just the value */
			getObject?: boolean;
			/** Unique identifier for the breadcrumb navigation */
			id?: string;
			/** Accessible label for the breadcrumb navigation landmark */
			ariaLabel?: string;
			/** Reference to element that describes the breadcrumb */
			ariaDescribedBy?: string;
			/** Reference to element that labels the breadcrumb */
			ariaLabelledBy?: string;
			/** Whether to include structured data markup for SEO */
			includeStructuredData?: boolean;
			/** Custom separator text for screen readers (visually hidden) */
			separatorText?: string;
			/** Whether to announce navigation changes to screen readers */
			announceNavigation?: boolean;
			/** Whether to show focus indicators */
			showFocusRing?: boolean;
			/** Whether to respect reduced motion preferences */
			respectReducedMotion?: boolean;
			/** High contrast mode support */
			supportHighContrast?: boolean;
			/** Current page indication - which item is the current page */
			currentPage?: unknown;
			/** Whether links should be navigable (clickable) */
			navigable?: boolean;
			/** Whether the current page should be a link */
			currentPageIsLink?: boolean;
			/** Maximum number of items to show before collapsing */
			maxItems?: number;
			/** Whether to show separators */
			showSeparators?: boolean;
			/** Custom separator content */
			separator?: string;
			/** Whether separators are decorative (aria-hidden) */
			separatorsDecorative?: boolean;
			/** Size variant of the breadcrumb */
			size?: "small" | "medium" | "large";
			/** Whether to truncate long item labels */
			truncateLabels?: boolean;
			/** Maximum character length for truncated labels */
			maxLabelLength?: number;
			/** Whether to enable more options dropdown for collapsed items */
			enableMoreOptions?: boolean;
			/** Accessible label for more options button */
			moreOptionsLabel?: string;
			/** Whether the breadcrumb is disabled */
			disabled?: boolean;
			/** Generate actual links (<a> tags) instead of buttons */
			generateLinks?: boolean;
			/** Base URL for generating links */
			baseUrl?: string;
			/** Link target attribute */
			linkTarget?: "_blank" | "_self" | "_parent" | "_top";
		}>(),
		{
			modelValue: undefined,
			items: undefined,
			labelKey: "label",
			valueKey: "value",
			urlKey: "url",
			getObject: false,
			id: undefined,
			ariaLabel: "Breadcrumb navigation",
			ariaDescribedBy: undefined,
			ariaLabelledBy: undefined,
			includeStructuredData: true,
			separatorText: "Navigate to",
			announceNavigation: true,
			showFocusRing: true,
			respectReducedMotion: true,
			supportHighContrast: true,
			currentPage: undefined,
			navigable: true,
			currentPageIsLink: false,
			maxItems: 5,
			showSeparators: true,
			separator: "chevron_right",
			separatorsDecorative: true,
			size: "medium",
			truncateLabels: false,
			maxLabelLength: 30,
			enableMoreOptions: true,
			moreOptionsLabel: "Show more navigation options",
			disabled: false,
			generateLinks: false,
			baseUrl: "",
			linkTarget: "_self",
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: unknown];
		"navigate": [item: BreadcrumbItemType, index: number, event: Event];
		"more-options-open": [items: BreadcrumbItemType[], index: number];
		"more-options-close": [index: number];
		"item-focus": [item: BreadcrumbItemType, index: number];
		"item-blur": [item: BreadcrumbItemType, index: number];
		"navigation-complete": [item: BreadcrumbItemType];
		"navigation-error": [error: Error, item: BreadcrumbItemType];
	}>();

	const [model] = useOptionalModel<unknown>(props, "modelValue", emit, undefined);
	const expanded = ref<boolean[]>([]);
	const navigationHistory = ref<BreadcrumbItemType[]>([]);
	const isNavigating = ref(false);
	const focusedIndex = ref(-1);
	const breadcrumbRef = ref<HTMLElement>();
	const structuredDataId = ref<string>();

	// Accessibility setup
	const { useAriaId, useNavigationAria } = useAriaAttributes();
	const screenReader = useScreenReader();
	const breadcrumbId = props.id || useAriaId('breadcrumb');
	const listId = useAriaId('breadcrumb-list');
	const structuredDataScriptId = useAriaId('breadcrumb-structured-data');
	const navigationAriaAttrs = useNavigationAria(undefined, props.ariaLabel);

	// Enhanced navigation ARIA attributes
	const navigationAttributes = computed(() => ({
		...navigationAriaAttrs.value,
		id: breadcrumbId,
		...(props.ariaDescribedBy && { 'aria-describedby': props.ariaDescribedBy }),
		...(props.ariaLabelledBy && { 'aria-labelledby': props.ariaLabelledBy }),
	}));

	// Enhanced parsed items with accessibility considerations
	const parsedItems = computed((): ParsedBreadcrumbItem[] => {
		if (!props.items?.length) return [];

		const items = [...props.items];
		let selectedIndex = items.findIndex((item) => isActive(item));
		if (selectedIndex === -1) selectedIndex = 0;

		// If maxItems is set and items exceed that, apply intelligent truncation
		if (props.maxItems && items.length > props.maxItems && props.enableMoreOptions) {
			return createTruncatedItems(items, selectedIndex);
		}

		return items;
	});

	/**
	 * Creates truncated items list with "more" options for better UX
	 */
	function createTruncatedItems(items: BreadcrumbItemType[], selectedIndex: number): ParsedBreadcrumbItem[] {
		const result: ParsedBreadcrumbItem[] = [];
		const maxItems = props.maxItems || BREADCRUMB_CONSTANTS.DEFAULT_MAX_ITEMS;

		for (let i = 0; i < items.length; i++) {
			if (
				i === 0 ||
				i === items.length - 1 ||
				(selectedIndex === 0 && i < 2) ||
				(selectedIndex === items.length - 1 && i >= items.length - 2) ||
				selectedIndex - 1 === i ||
				selectedIndex + 1 === i ||
				selectedIndex === i
			) {
				result.push(items[i]);
			} else if (i === 1 && selectedIndex > 1) {
				result.push({
					icon: "more_horiz",
					items: items.slice(1, selectedIndex - 1),
				});
			} else if (i === items.length - 2 && selectedIndex < items.length - 2) {
				result.push({
					icon: "more_horiz",
					items: items.slice(selectedIndex + 2, items.length - 1),
				});
			}
		}

		return result;
	}

	/**
	 * Generates structured data for SEO and accessibility
	 */
	const structuredData = computed(() => {
		if (!props.includeStructuredData || !props.items?.length) return null;

		const breadcrumbList = {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: props.items.map((item, index) => {
				const label = getLabel(item);
				const url = getUrl(item);
				return {
					"@type": "ListItem",
					position: index + 1,
					name: label,
					...(url && { item: url }),
				};
			}),
		};

		return JSON.stringify(breadcrumbList);
	});

	/**
	 * Gets URL for an item (for structured data and links)
	 */
	function getUrl(item: BreadcrumbItemType): string {
		if (isMoreOptionsItem(item)) return '';
		
		const breadcrumbItem = item as BreadcrumbItemType;
		if (isObject(breadcrumbItem) && props.urlKey && breadcrumbItem[props.urlKey]) {
			return String(breadcrumbItem[props.urlKey]);
		}
		
		if (props.baseUrl) {
			const value = getValue(breadcrumbItem);
			return `${props.baseUrl.replace(/\/$/, '')}/${String(value).toLowerCase().replace(/\s+/g, '-')}`;
		}
		
		return '';
	}

	/**
	 * Type guard to check if an item is a MoreOptionsItem
	 */
	function isMoreOptionsItem(item: unknown): item is MoreOptionsItem {
		return isObject(item) && typeof item === 'object' && item !== null && 'icon' in item && (item as MoreOptionsItem).icon === 'more_horiz';
	}

	/**
	 * Enhanced model setter with comprehensive navigation support
	 */
	function setModel(item: unknown, event?: Event): void {
		if (isMoreOptionsItem(item)) {
			return; // Don't set model for "more" items
		}
		
		if (props.disabled || isNavigating.value) {
			return;
		}
		
		const breadcrumbItem = item as BreadcrumbItemType;
		const itemIndex = props.items?.indexOf(breadcrumbItem) ?? -1;
		
		// Check if current page and not navigable
		if (isCurrentPage(breadcrumbItem) && !props.currentPageIsLink) {
			return;
		}

		isNavigating.value = true;
		const value = props.getObject ? breadcrumbItem : getValue(breadcrumbItem);
		expanded.value = expanded.value.map(() => false);

		// Emit navigation event
		if (event) {
			emit("navigate", breadcrumbItem, itemIndex, event);
		}

		try {
			setTimeout(() => {
				model.value = value;
				emit("update:modelValue", value);
				
				// Add to navigation history
				navigationHistory.value.push(breadcrumbItem);
				if (navigationHistory.value.length > 10) {
					navigationHistory.value.shift(); // Keep only last 10 items
				}

				// Announce navigation for screen readers
				if (props.announceNavigation) {
					const label = getLabel(breadcrumbItem);
					const position = itemIndex + 1;
					const total = props.items?.length || 0;
					screenReader.announcePolitely(
						`Navigated to ${label}, item ${position} of ${total}`
					);
				}
				
				emit("navigation-complete", breadcrumbItem);
				isNavigating.value = false;
			}, 200);
		} catch (error) {
			emit("navigation-error", error as Error, breadcrumbItem);
			isNavigating.value = false;
		}
	}

	/**
	 * Checks if an item is the current page
	 */
	function isCurrentPage(item: unknown): boolean {
		if (props.currentPage !== undefined) {
			const itemValue = getValue(item as BreadcrumbItemType);
			return itemValue === props.currentPage;
		}
		return isActive(item);
	}

	/**
	 * Enhanced keyboard navigation for breadcrumb items
	 */
	function handleKeydown(event: KeyboardEvent, item?: unknown, index?: number): void {
		switch (event.key) {
			case 'Enter':
			case ' ':
			case 'Space':
				event.preventDefault();
				if (item !== undefined && props.navigable && (!isCurrentPage(item) || props.currentPageIsLink)) {
					setModel(item, event);
				}
				break;
			case 'ArrowRight':
			case 'ArrowDown':
				event.preventDefault();
				moveFocus(1);
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
				event.preventDefault();
				moveFocus(-1);
				break;
			case 'Home':
				event.preventDefault();
				moveFocus(0, true);
				break;
			case 'End':
				event.preventDefault();
				moveFocus((parsedItems.value.length - 1), true);
				break;
		}
	}

	/**
	 * Moves focus between breadcrumb items
	 */
	function moveFocus(direction: number, absolute: boolean = false): void {
		if (!breadcrumbRef.value) return;

		const items = breadcrumbRef.value.querySelectorAll('button, a');
		if (!items.length) return;

		let newIndex: number;
		if (absolute) {
			newIndex = direction;
		} else {
			newIndex = focusedIndex.value + direction;
		}

		// Clamp to valid range
		newIndex = Math.max(0, Math.min(items.length - 1, newIndex));

		const targetElement = items[newIndex] as HTMLElement;
		if (targetElement) {
			targetElement.focus();
			focusedIndex.value = newIndex;
		}
	}

	/**
	 * Handles focus events for items
	 */
	function handleItemFocus(item: BreadcrumbItemType, index: number, event: FocusEvent): void {
		focusedIndex.value = index;
		emit("item-focus", item, index);
		
		// Announce focused item for screen readers
		if (props.announceNavigation) {
			const label = getLabel(item);
			const position = index + 1;
			const total = parsedItems.value.length;
			const status = isCurrentPage(item) ? "current page" : "link";
			screenReader.announcePolitely(
				`${label}, ${status}, ${position} of ${total}`
			);
		}
	}

	/**
	 * Handles blur events for items
	 */
	function handleItemBlur(item: BreadcrumbItemType, index: number, event: FocusEvent): void {
		emit("item-blur", item, index);
	}

	/**
	 * Enhanced keyboard navigation for more options button
	 */
	function handleMoreOptionsKeydown(event: KeyboardEvent, index: number): void {
		switch (event.key) {
			case 'Enter':
			case ' ':
			case 'Space':
				event.preventDefault();
				showMoreItems(event as any, index);
				break;
			case 'Escape':
				event.preventDefault();
				closeMoreOptions(index);
				break;
			case 'ArrowDown':
				if (expanded.value[index]) {
					event.preventDefault();
					focusFirstMenuItem(index);
				}
				break;
		}
	}

	/**
	 * Closes more options dropdown
	 */
	function closeMoreOptions(index: number): void {
		expanded.value[index] = false;
		emit("more-options-close", index);
		
		if (props.announceNavigation) {
			screenReader.announcePolitely("Navigation options closed");
		}
	}

	/**
	 * Focuses the first menu item in dropdown
	 */
	function focusFirstMenuItem(index: number): void {
		nextTick(() => {
			const dropdown = document.querySelector(`#more-options-${index}`);
			if (dropdown) {
				const firstButton = dropdown.querySelector('button');
				if (firstButton) {
					(firstButton as HTMLElement).focus();
				}
			}
		});
	}

	/**
	 * Gets the display label for an item with truncation support
	 */
	function getLabel(value: unknown): string {
		if (!value) return '';
		if (isMoreOptionsItem(value)) {
			return ''; // "more" items don't have labels
		}
		const breadcrumbItem = value as BreadcrumbItemType;
		let label = isObject(breadcrumbItem) 
			? String((breadcrumbItem as BBreadcrumbItem)[props.labelKey] || '') 
			: String(breadcrumbItem);

		// Apply truncation if enabled
		if (props.truncateLabels && props.maxLabelLength && label.length > props.maxLabelLength) {
			label = label.substring(0, props.maxLabelLength - 3) + '...';
		}

		return label;
	}

	/**
	 * Gets the full label without truncation (for accessibility)
	 */
	function getFullLabel(value: unknown): string {
		if (!value) return '';
		if (isMoreOptionsItem(value)) {
			return '';
		}
		const breadcrumbItem = value as BreadcrumbItemType;
		return isObject(breadcrumbItem) 
			? String((breadcrumbItem as BBreadcrumbItem)[props.labelKey] || '') 
			: String(breadcrumbItem);
	}

	/**
	 * Gets the value from an item
	 */
	function getValue(item: BreadcrumbItemType): unknown {
		return isObject(item) ? (item as BBreadcrumbItem)[props.valueKey] : item;
	}

	/**
	 * Checks if an item is the currently active one
	 */
	function isActive(item: unknown): boolean {
		if (isMoreOptionsItem(item)) {
			return false; // "more" items are never active
		}
		const breadcrumbItem = item as BreadcrumbItemType;
		const value = getValue(breadcrumbItem);
		const selectedValue = getValue(model.value as BreadcrumbItemType);
		return selectedValue === value;
	}

	/**
	 * Enhanced component class computation
	 */
	const breadcrumbClasses = computed(() => {
		const classes = ['b-breadcrumb'];
		
		if (props.size && props.size !== 'medium') {
			classes.push(`b-breadcrumb--${props.size}`);
		}
		
		if (props.disabled) {
			classes.push('b-breadcrumb--disabled');
		}
		
		if (props.supportHighContrast) {
			classes.push('b-breadcrumb--high-contrast');
		}
		
		if (props.respectReducedMotion) {
			classes.push('b-breadcrumb--reduced-motion');
		}
		
		return classes;
	});

	// Lifecycle hooks
	onMounted(() => {
		if (props.includeStructuredData && structuredData.value) {
			// Inject structured data script
			const script = document.createElement('script');
			script.type = 'application/ld+json';
			script.id = structuredDataScriptId;
			script.textContent = structuredData.value;
			document.head.appendChild(script);
			structuredDataId.value = structuredDataScriptId;
		}
	});

	onUnmounted(() => {
		if (structuredDataId.value) {
			const script = document.getElementById(structuredDataId.value);
			if (script) {
				document.head.removeChild(script);
			}
		}
	});

	// Watch for changes in structured data
	watch(structuredData, (newData, oldData) => {
		if (props.includeStructuredData && newData !== oldData) {
			// Update existing script or create new one
			if (structuredDataId.value) {
				const script = document.getElementById(structuredDataId.value);
				if (script && newData) {
					script.textContent = newData;
				}
			}
		}
	});

	/**
	 * Generates a unique key for v-for template
	 */
	function generateKey(item: ParsedBreadcrumbItem, index: number): string {
		if (isMoreOptionsItem(item)) {
			return `more-${index}`;
		}
		const breadcrumbItem = item as BreadcrumbItemType;
		if (isObject(breadcrumbItem)) {
			const value = getValue(breadcrumbItem);
			return String(value || index);
		}
		return String(breadcrumbItem || index);
	}

	/**
	 * Gets ARIA attributes for breadcrumb items
	 */
	function getItemAriaAttributes(item: BreadcrumbItemType, index: number) {
		const isCurrent = isCurrentPage(item);
		const fullLabel = getFullLabel(item);
		const truncatedLabel = getLabel(item);
		const url = getUrl(item);
		
		return {
			...(isCurrent && { 'aria-current': BREADCRUMB_ARIA.CURRENT_PAGE }),
			...(fullLabel !== truncatedLabel && { 'aria-label': fullLabel }),
			...(url && props.generateLinks && { href: url }),
			...(props.linkTarget && props.generateLinks && { target: props.linkTarget }),
			...(props.linkTarget === '_blank' && { rel: 'noopener noreferrer' }),
			tabindex: props.disabled ? -1 : 0,
		};
	}

	/**
	 * Gets ARIA attributes for more options button
	 */
	function getMoreOptionsAriaAttributes(index: number, items: BreadcrumbItemType[]) {
		return {
			'aria-label': `${props.moreOptionsLabel} (${items.length} items)`,
			'aria-expanded': expanded.value[index] || false,
			'aria-controls': `more-options-${index}`,
			'aria-haspopup': 'menu' as const,
			tabindex: props.disabled ? -1 : 0,
		};
	}

	/**
	 * Enhanced dropdown menu handling for "more" items
	 */
	async function showMoreItems(event: MouseEvent, index: number): Promise<void> {
		if (props.disabled) return;

		expanded.value[index] = !expanded.value[index];
		
		if (!expanded.value[index]) {
			closeMoreOptions(index);
			return;
		}

		const target = event.target as HTMLElement;
		const rect = target.getBoundingClientRect();
		const viewportHeight = window.innerHeight;

		// Get the more options items
		const moreItem = parsedItems.value[index] as MoreOptionsItem;
		if (isMoreOptionsItem(moreItem)) {
			emit("more-options-open", moreItem.items, index);
		}

		await nextTick();

		const card = document.querySelector(
			`.more-options[data-index="${index}"]`
		) as HTMLElement;
		if (!card) return;

		// Position the dropdown
		card.style.left = `${rect.left}px`;

		if (rect.bottom + card.offsetHeight > viewportHeight)
			card.style.bottom = `${viewportHeight - rect.top}px`;
		else card.style.top = `${rect.bottom}px`;

		// Announce dropdown opened
		if (props.announceNavigation) {
			const itemCount = isMoreOptionsItem(moreItem) ? moreItem.items.length : 0;
			screenReader.announcePolitely(
				`Navigation options opened, ${itemCount} items available`
			);
		}

		const closeHandler = (e: MouseEvent | WheelEvent) => {
			const isScrollable = Math.abs(card.offsetHeight - card.scrollHeight) > 3;
			const isWheel = e.type === "wheel";
			const isCard = card.contains(e.target as Node);
			const shouldClose = isScrollable
				? isWheel && !isCard
				: isWheel || !isCard;

			if (shouldClose) {
				closeMoreOptions(index);
				document.removeEventListener("click", closeHandler);
				document.removeEventListener("wheel", closeHandler);
			}
		};

		// Handle escape key for dropdown
		const keyHandler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeMoreOptions(index);
				document.removeEventListener("keydown", keyHandler);
				// Return focus to trigger button
				target.focus();
			}
		};

		setTimeout(() => {
			document.addEventListener("click", closeHandler);
			document.addEventListener("wheel", closeHandler);
			document.addEventListener("keydown", keyHandler);
		}, 200);
	}

	// Expose public methods for parent components
	defineExpose({
		focusItem: (index: number) => moveFocus(index, true),
		navigateToItem: (item: BreadcrumbItemType) => setModel(item),
		closeAllDropdowns: () => {
			expanded.value = expanded.value.map(() => false);
		},
		getNavigationHistory: () => navigationHistory.value,
		isNavigating: () => isNavigating.value,
	});
</script>

<template>
	<!-- Breadcrumb Navigation with Enhanced Accessibility -->
	<nav
		v-bind="navigationAttributes"
		:class="breadcrumbClasses"
		ref="breadcrumbRef">
		<!-- Screen Reader Only Context -->
		<div class="sr-only" aria-live="polite" aria-atomic="true">
			Breadcrumb navigation with {{ parsedItems.length }} items
		</div>
		
		<!-- Breadcrumb List -->
		<ol
			:id="listId"
			class="breadcrumb-list flex items-center gap-xs"
			role="list">
			<li
				v-for="(item, index) in parsedItems"
				:key="generateKey(item, index)"
				class="breadcrumb-item flex items-center gap-xs"
				role="listitem">
				
				<!-- More Options Button -->
				<button
					v-if="isMoreOptionsItem(item)"
					type="button"
					class="more-button"
					v-bind="getMoreOptionsAriaAttributes(index, item.items)"
					@click="showMoreItems($event, index)"
					@keydown="(e) => handleMoreOptionsKeydown(e, index)"
					@focus="handleItemFocus(item, index, $event)"
					@blur="handleItemBlur(item, index, $event)">
					<BIcon 
						name="more_horiz" 
						aria-hidden="true" />
					<span class="sr-only">{{ item.items.length }} hidden items</span>
				</button>
				
				<!-- Regular Breadcrumb Items -->
				<template v-else>
					<!-- Link Version -->
					<a
						v-if="props.generateLinks && (props.navigable && (!isCurrentPage(item) || props.currentPageIsLink))"
						:class="['item', { 'active': isCurrentPage(item) }]"
						v-bind="getItemAriaAttributes(item, index)"
						@click="setModel(item, $event)"
						@keydown="(e) => handleKeydown(e, item, index)"
						@focus="handleItemFocus(item, index, $event)"
						@blur="handleItemBlur(item, index, $event)">
						{{ getLabel(item) }}
					</a>
					
					<!-- Button Version -->
					<button
						v-else-if="!props.generateLinks && props.navigable && (!isCurrentPage(item) || props.currentPageIsLink)"
						type="button"
						:class="['item', { 'active': isCurrentPage(item) }]"
						v-bind="getItemAriaAttributes(item, index)"
						@click="setModel(item, $event)"
						@keydown="(e) => handleKeydown(e, item, index)"
						@focus="handleItemFocus(item, index, $event)"
						@blur="handleItemBlur(item, index, $event)">
						{{ getLabel(item) }}
					</button>
					
					<!-- Current Page (Non-navigable) -->
					<span
						v-else
						:class="['item', 'active', { 'current-page': isCurrentPage(item) }]"
						v-bind="getItemAriaAttributes(item, index)"
						role="text">
						{{ getLabel(item) }}
					</span>
				</template>
				
				<!-- Separator with Screen Reader Support -->
				<template v-if="index < parsedItems.length - 1 && props.showSeparators">
					<BIcon
						:name="props.separator"
						:aria-hidden="props.separatorsDecorative"
						class="separator" />
					<span 
						v-if="!props.separatorsDecorative"
						class="sr-only">
						{{ props.separatorText }}
					</span>
				</template>
					
				<!-- More Options Dropdown -->
				<Teleport
					v-if="isMoreOptionsItem(item)"
					to="body">
					<Transition 
						name="fade"
						:duration="props.respectReducedMotion ? 0 : 200">
						<div
							v-if="expanded[index]"
							class="more-options"
							:id="`more-options-${index}`"
							:data-index="index"
							role="menu"
							:aria-label="`Additional navigation options (${item.items.length} items)`">
							<button
								v-for="(option, optionIndex) in item.items"
								:key="generateKey(option, optionIndex)"
								type="button"
								role="menuitem"
								class="menu-option"
								:aria-label="getFullLabel(option)"
								@click="setModel(option, $event)"
								@keydown="(e) => handleKeydown(e, option, optionIndex)">
								{{ getLabel(option) }}
							</button>
						</div>
					</Transition>
				</Teleport>
			</li>
		</ol>
		
		<!-- Screen Reader Instructions -->
		<div class="sr-only" id="breadcrumb-instructions">
			Use arrow keys to navigate between breadcrumb items. Press Enter or Space to activate.
		</div>
	</nav>
</template>

<style scoped>
	@import "../../assets/main.css";
	
	/* Base breadcrumb styles */
	.b-breadcrumb {
		@apply flex items-center gap-xs;
	}

	/* Size variants */
	.b-breadcrumb--small {
		@apply text-sm gap-xxs;
	}

	.b-breadcrumb--large {
		@apply text-lg gap-sm;
	}

	/* State variants */
	.b-breadcrumb--disabled {
		@apply opacity-50 pointer-events-none;
	}

	.b-breadcrumb--high-contrast {
		@apply contrast-more;
	}

	.b-breadcrumb--reduced-motion * {
		@apply transition-none;
	}

	/* List styles */
	.breadcrumb-list {
		@apply list-none m-0 p-0;
	}

	.breadcrumb-item {
		@apply list-none;
	}

	/* Item styles */
	.item {
		@apply 
			text-neutral-interaction-default 
			cursor-pointer 
			hover:text-primary-interaction-hover 
			bg-transparent 
			border-0 
			focus:outline-none 
			focus:ring-2 
			focus:ring-primary-foreground-low 
			rounded-xs 
			px-base 
			py-sm 
			min-h-[44px] /* Minimum touch target */
			flex 
			items-center
			transition-colors 
			duration-150;
	}

	.item:hover {
		@apply text-primary-interaction-hover bg-primary-surface-hover;
	}

	.item.active {
		@apply 
			pointer-events-none 
			text-neutral-foreground-high 
			font-medium 
			cursor-default;
	}

	.item.current-page {
		@apply 
			text-primary-foreground-default 
			font-semibold 
			relative;
	}

	.item.current-page::after {
		content: "";
		@apply 
			absolute 
			bottom-0 
			left-0 
			right-0 
			h-0.5 
			bg-primary-foreground-default 
			rounded-full;
	}

	/* Focus styles */
	.item:focus-visible {
		@apply 
			outline-2 
			outline-primary-foreground-default 
			outline-offset-2;
	}

	/* Link specific styles */
	a.item {
		@apply 
			text-decoration-none 
			no-underline;
	}

	a.item:hover {
		@apply text-decoration-none;
	}

	a.item:visited {
		@apply text-neutral-interaction-default;
	}

	/* More button styles */
	.more-button {
		@apply 
			bg-transparent 
			border-0 
			cursor-pointer 
			text-neutral-interaction-default 
			hover:text-primary-interaction-hover 
			hover:bg-primary-surface-hover 
			focus:outline-none 
			focus:ring-2 
			focus:ring-primary-foreground-low 
			rounded-xs 
			p-base 
			min-h-[44px] 
			min-w-[44px] 
			flex 
			items-center 
			justify-center 
			transition-colors 
			duration-150;
	}

	.more-button:focus-visible {
		@apply 
			outline-2 
			outline-primary-foreground-default 
			outline-offset-2;
	}

	/* Menu option styles */
	.menu-option {
		@apply 
			w-full 
			text-left 
			bg-transparent 
			border-0 
			cursor-pointer 
			hover:bg-primary-surface-hover 
			focus:outline-none 
			focus:bg-primary-surface-hover 
			p-base 
			min-h-[44px] 
			flex 
			items-center
			transition-colors 
			duration-150
			text-neutral-foreground-default;
	}

	.menu-option:focus-visible {
		@apply 
			outline-2 
			outline-primary-foreground-default 
			outline-offset-2;
	}

	/* Separator styles */
	.separator {
		@apply 
			text-neutral-interaction-disabled 
			flex-shrink-0 
			select-none;
	}

	/* Dropdown styles */
	.more-options {
		@apply 
			z-1000 
			fixed 
			overflow-auto 
			min-w-9xl 
			max-h-9xl 
			p-xxs 
			shadow-lg 
			border 
			border-neutral-border-default 
			rounded-sm 
			bg-neutral-surface-default;
	}

	.more-options [role="menuitem"] {
		@apply p-xs rounded-xs;
	}

	/* Animation styles */
	.fade-enter-active,
	.fade-leave-active {
		@apply transition-opacity duration-200;
	}

	.fade-enter-from,
	.fade-leave-to {
		@apply opacity-0;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.b-breadcrumb--reduced-motion .fade-enter-active,
		.b-breadcrumb--reduced-motion .fade-leave-active {
			@apply transition-none duration-0;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.b-breadcrumb--high-contrast .item,
		.b-breadcrumb--high-contrast .more-button {
			@apply border border-current;
		}
		
		.b-breadcrumb--high-contrast .item:focus,
		.b-breadcrumb--high-contrast .more-button:focus {
			@apply border-2;
		}
	}

	/* Screen reader only styles */
	.sr-only {
		@apply 
			absolute 
			w-px 
			h-px 
			p-0 
			-m-px 
			overflow-hidden 
			whitespace-nowrap 
			border-0;
		clip: rect(0, 0, 0, 0);
		clip-path: inset(50%);
	}

	/* Print styles */
	@media print {
		.b-breadcrumb {
			@apply text-black;
		}
		
		.item {
			@apply text-black no-underline;
		}
		
		.more-options {
			@apply hidden;
		}
		
		.separator {
			@apply text-black;
		}
	}
</style>
