<script setup lang="ts">
	import { ref, watch, onBeforeMount, computed, nextTick } from "vue";
	import { isObject } from "../../utils";
	import BIcon from "../BIcon/BIcon.vue";
	import { useAriaAttributes, useScreenReader } from "#composables";

	/**
	 * Tab item interface for object-based tabs
	 */
	interface TabItem {
		value: string;
		label?: string;
		icon?: string;
		disabled?: boolean;
		closable?: boolean;
		ariaLabel?: string;
		ariaDescription?: string;
	}

	/**
	 * Tab item type - can be a simple string or TabItem object
	 */
	type TabItemType = string | TabItem;

	/**
	 * Accessibility configuration for the tab component
	 */
	interface TabAccessibilityConfig {
		/** Accessible label for the tab list */
		ariaLabel?: string;
		/** ID of element that describes the tab list */
		ariaDescribedBy?: string;
		/** Orientation of the tab list (affects arrow key navigation) */
		orientation?: 'horizontal' | 'vertical';
		/** Whether to enable automatic tab activation on focus */
		activationMode?: 'automatic' | 'manual';
		/** Whether to enable tab deletion with keyboard */
		enableTabDeletion?: boolean;
		/** Custom screen reader announcements */
		customAnnouncements?: {
			tabChange?: (label: string, position: number, total: number) => string;
			tabClosed?: (label: string) => string;
			tabAdded?: (label: string) => string;
		};
	}

	const props = withDefaults(
		defineProps<{
			modelValue?: TabItemType;
			items: TabItemType[];
			isIcon?: boolean;
			notCard?: boolean;
			/** Accessibility configuration */
			accessibility?: TabAccessibilityConfig;
			/** @deprecated Use accessibility.ariaLabel instead */
			ariaLabel?: string;
			/** Whether tabs can be closed/deleted */
			closableTabs?: boolean;
		}>(),
		{
			modelValue: undefined,
			isIcon: false,
			notCard: false,
			closableTabs: false,
			accessibility: () => ({}),
			ariaLabel: "Tab navigation",
		}
	);

	const model = ref(props.modelValue);
	const focusedTabIndex = ref(0);

	// Accessibility setup
	const { useAriaId, useTabAria, useTabPanelAria } = useAriaAttributes();
	const screenReader = useScreenReader();
	const tablistId = useAriaId('tablist');

	// Computed accessibility config with fallbacks
	const accessibilityConfig = computed(() => ({
		ariaLabel: props.accessibility?.ariaLabel || props.ariaLabel || "Tab navigation",
		ariaDescribedBy: props.accessibility?.ariaDescribedBy,
		orientation: props.accessibility?.orientation || 'horizontal',
		activationMode: props.accessibility?.activationMode || 'automatic',
		enableTabDeletion: props.accessibility?.enableTabDeletion || props.closableTabs,
		customAnnouncements: props.accessibility?.customAnnouncements || {}
	}));

	// Enhanced items with accessibility info
	const enhancedItems = computed(() => 
		props.items.map((item, index) => ({
			original: item,
			value: getValue(item),
			label: getLabel(item),
			icon: getIcon(item),
			disabled: getDisabled(item),
			closable: getClosable(item),
			ariaLabel: getAriaLabel(item),
			ariaDescription: getAriaDescription(item),
			tabId: getTabId(index),
			panelId: getPanelId(index),
			position: index + 1,
			total: props.items.length
		}))
	);

	// Current active item for easy access
	const activeItem = computed(() => 
		enhancedItems.value.find(item => item.value === getValue(model.value))
	);

	// Get current active index
	const activeIndex = computed(() => 
		enhancedItems.value.findIndex(item => item.value === getValue(model.value))
	);

	onBeforeMount(() => {
		const firstItem = props.items[0];
		if (!model.value && firstItem) {
			changeTab(firstItem, 0);
		}
		// Set initial focused tab to current active tab
		const activeIndex = props.items.findIndex(item => getValue(item) === getValue(model.value));
		if (activeIndex >= 0) {
			focusedTabIndex.value = activeIndex;
		}
	});

	watch(
		() => props.modelValue,
		(cur) => {
			model.value = cur;
			// Update focused tab index when model changes externally
			const activeIndex = props.items.findIndex(item => getValue(item) === getValue(cur));
			if (activeIndex >= 0) {
				focusedTabIndex.value = activeIndex;
			}
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: TabItemType];
		"tab-change": [{
			newTab: TabItemType;
			previousTab?: TabItemType;
			newIndex: number;
			previousIndex: number;
		}];
		"tab-close": [{ tab: TabItemType; index: number }];
		"tab-focus": [{ tab: TabItemType; index: number }];
		"before-tab-change": [{
			newTab: TabItemType;
			previousTab?: TabItemType;
			newIndex: number;
			previousIndex: number;
			cancel: () => void;
		}];
	}>();

	async function changeTab(item: TabItemType, index: number, fromKeyboard: boolean = false) {
		if (getDisabled(item)) {
			return;
		}

		const previousTab = model.value;
		const previousIndex = activeIndex.value;

		// Allow cancellation via before-tab-change event
		let cancelled = false;
		const cancelHandler = () => { cancelled = true; };
		
		emit("before-tab-change", {
			newTab: item,
			previousTab,
			newIndex: index,
			previousIndex,
			cancel: cancelHandler
		});

		if (cancelled) {
			return;
		}

		model.value = item;
		focusedTabIndex.value = index;
		emit("update:modelValue", item);
		emit("tab-change", {
			newTab: item,
			previousTab,
			newIndex: index,
			previousIndex
		});

		// Enhanced screen reader announcements
		const label = getLabel(item);
		const enhancedItem = enhancedItems.value[index];
		const customAnnouncement = accessibilityConfig.value.customAnnouncements?.tabChange;
		
		if (customAnnouncement) {
			screenReader.announcePolitely(customAnnouncement(label, enhancedItem.position, enhancedItem.total));
		} else {
			screenReader.announcePolitely(`Selected ${label} tab, ${enhancedItem.position} of ${enhancedItem.total}`);
		}

		// Focus management for keyboard navigation
		if (fromKeyboard) {
			await nextTick();
			focusTab(index);
		}
	}

	function getValue(item: TabItemType | undefined): string {
		if (!item) return '';
		return isObject(item) ? (item as TabItem).value : (item as string);
	}

	function getLabel(item: TabItemType): string {
		if (isObject(item)) {
			const tabItem = item as TabItem;
			return tabItem.label || tabItem.value;
		}
		return item as string;
	}

	function getIcon(item: TabItemType): string | undefined {
		if (isObject(item)) {
			return (item as TabItem).icon;
		}
		return props.isIcon ? (item as string) : undefined;
	}

	function getDisabled(item: TabItemType): boolean {
		if (isObject(item)) {
			return (item as TabItem).disabled || false;
		}
		return false;
	}

	function getClosable(item: TabItemType): boolean {
		if (isObject(item)) {
			return (item as TabItem).closable !== undefined 
				? (item as TabItem).closable! 
				: accessibilityConfig.value.enableTabDeletion;
		}
		return accessibilityConfig.value.enableTabDeletion;
	}

	function getAriaLabel(item: TabItemType): string | undefined {
		if (isObject(item)) {
			return (item as TabItem).ariaLabel;
		}
		return undefined;
	}

	function getAriaDescription(item: TabItemType): string | undefined {
		if (isObject(item)) {
			return (item as TabItem).ariaDescription;
		}
		return undefined;
	}

	async function handleKeydown(event: KeyboardEvent): Promise<void> {
		let handled = false;
		const itemsLength = props.items.length;
		const isHorizontal = accessibilityConfig.value.orientation === 'horizontal';
		const isAutomatic = accessibilityConfig.value.activationMode === 'automatic';

		// Helper function to find next/previous non-disabled tab
		function findNextEnabledTab(currentIndex: number, direction: 1 | -1): number {
			let newIndex = currentIndex;
			const maxAttempts = itemsLength;
			
			for (let attempts = 0; attempts < maxAttempts; attempts++) {
				newIndex = direction === 1
					? (newIndex + 1) % itemsLength
					: newIndex === 0 ? itemsLength - 1 : newIndex - 1;
				
				if (!getDisabled(props.items[newIndex])) {
					return newIndex;
				}
			}
			return currentIndex;
		}

		switch (event.key) {
			case isHorizontal ? 'ArrowRight' : 'ArrowDown':
				event.preventDefault();
				const nextIndex = findNextEnabledTab(focusedTabIndex.value, 1);
				if (nextIndex !== focusedTabIndex.value) {
					focusedTabIndex.value = nextIndex;
					if (isAutomatic) {
						await changeTab(props.items[nextIndex], nextIndex, true);
					} else {
						emit("tab-focus", { tab: props.items[nextIndex], index: nextIndex });
						await nextTick();
						focusTab(nextIndex);
					}
				}
				handled = true;
				break;

			case isHorizontal ? 'ArrowLeft' : 'ArrowUp':
				event.preventDefault();
				const prevIndex = findNextEnabledTab(focusedTabIndex.value, -1);
				if (prevIndex !== focusedTabIndex.value) {
					focusedTabIndex.value = prevIndex;
					if (isAutomatic) {
						await changeTab(props.items[prevIndex], prevIndex, true);
					} else {
						emit("tab-focus", { tab: props.items[prevIndex], index: prevIndex });
						await nextTick();
						focusTab(prevIndex);
					}
				}
				handled = true;
				break;

			case 'Home':
				event.preventDefault();
				const firstEnabled = findNextEnabledTab(-1, 1);
				if (firstEnabled !== focusedTabIndex.value) {
					focusedTabIndex.value = firstEnabled;
					if (isAutomatic) {
						await changeTab(props.items[firstEnabled], firstEnabled, true);
					} else {
						emit("tab-focus", { tab: props.items[firstEnabled], index: firstEnabled });
						await nextTick();
						focusTab(firstEnabled);
					}
				}
				handled = true;
				break;

			case 'End':
				event.preventDefault();
				const lastEnabled = findNextEnabledTab(itemsLength, -1);
				if (lastEnabled !== focusedTabIndex.value) {
					focusedTabIndex.value = lastEnabled;
					if (isAutomatic) {
						await changeTab(props.items[lastEnabled], lastEnabled, true);
					} else {
						emit("tab-focus", { tab: props.items[lastEnabled], index: lastEnabled });
						await nextTick();
						focusTab(lastEnabled);
					}
				}
				handled = true;
				break;

			case 'Enter':
			case ' ':
				event.preventDefault();
				const focusedItem = props.items[focusedTabIndex.value];
				if (focusedItem && !getDisabled(focusedItem)) {
					if (!isAutomatic) {
						// In manual mode, activate the tab
						await changeTab(focusedItem, focusedTabIndex.value, true);
					}
				}
				handled = true;
				break;

			case 'Delete':
			case 'Backspace':
				if (accessibilityConfig.value.enableTabDeletion) {
					event.preventDefault();
					const currentItem = props.items[focusedTabIndex.value];
					if (currentItem && getClosable(currentItem) && !getDisabled(currentItem)) {
						await closeTab(currentItem, focusedTabIndex.value);
					}
					handled = true;
				}
				break;
		}
	}

	function getTabId(index: number): string {
		return `${tablistId}-tab-${index}`;
	}

	function getPanelId(index: number): string {
		return `${tablistId}-panel-${index}`;
	}

	// Enhanced focus management
	function focusTab(index: number): void {
		const tabElement = document.getElementById(getTabId(index));
		if (tabElement) {
			tabElement.focus();
		}
	}

	// Tab closing functionality
	async function closeTab(item: TabItemType, index: number): Promise<void> {
		if (!getClosable(item) || getDisabled(item)) {
			return;
		}

		emit("tab-close", { tab: item, index });

		// Screen reader announcement
		const label = getLabel(item);
		const customAnnouncement = accessibilityConfig.value.customAnnouncements?.tabClosed;
		
		if (customAnnouncement) {
			screenReader.announcePolitely(customAnnouncement(label));
		} else {
			screenReader.announcePolitely(`Closed ${label} tab`);
		}

		// Focus management after closing tab
		if (props.items.length > 1) {
			// If closing active tab, move to next or previous tab
			if (index === activeIndex.value) {
				const newActiveIndex = index === props.items.length - 1 ? index - 1 : index;
				const newActiveItem = props.items[newActiveIndex];
				if (newActiveItem) {
					await nextTick();
					changeTab(newActiveItem, newActiveIndex, true);
				}
			} else {
				// Update focused tab index if needed
				if (focusedTabIndex.value > index) {
					focusedTabIndex.value--;
				}
				await nextTick();
				focusTab(focusedTabIndex.value);
			}
		}
	}

	// Helper function to handle tab clicks
	function handleTabClick(item: TabItemType, index: number): void {
		if (!getDisabled(item)) {
			changeTab(item, index);
		}
	}

	// Helper function to handle close button clicks
	function handleCloseClick(event: MouseEvent, item: TabItemType, index: number): void {
		event.stopPropagation();
		closeTab(item, index);
	}
</script>

<template>
	<div
		class="b-tab"
		:class="{
			'bg-neutral-surface-highlight': !notCard,
		}">
		<div
			class="flex font-bold text-sm gap-xs w-fit"
			role="tablist"
			:id="tablistId"
			:aria-label="accessibilityConfig.ariaLabel"
			:aria-describedby="accessibilityConfig.ariaDescribedBy"
			:aria-orientation="accessibilityConfig.orientation"
			@keydown="handleKeydown">
			<button
				v-for="(enhancedItem, index) in enhancedItems"
				:key="index"
				type="button"
				role="tab"
				class="default-tab"
				:class="{ 
					'active-tab': getValue(model) == enhancedItem.value,
					'disabled-tab': enhancedItem.disabled
				}"
				:id="enhancedItem.tabId"
				:aria-controls="enhancedItem.panelId"
				:aria-selected="getValue(model) == enhancedItem.value"
				:aria-disabled="enhancedItem.disabled || undefined"
				:aria-label="enhancedItem.ariaLabel || undefined"
				:aria-describedby="enhancedItem.ariaDescription ? `${enhancedItem.tabId}-desc` : undefined"
				:tabindex="getValue(model) == enhancedItem.value ? 0 : -1"
				:disabled="enhancedItem.disabled"
				@click="handleTabClick(enhancedItem.original, index)">
				
				<!-- Tab content -->
				<div class="flex items-center gap-xxs">
					<!-- Icon -->
					<BIcon
						v-if="enhancedItem.icon"
						:name="enhancedItem.icon"
						class="tab-icon"
						:class="{ 'icon-disabled': enhancedItem.disabled }" />
					
					<!-- Label -->
					<span 
						v-if="!props.isIcon || enhancedItem.label"
						class="tab-label"
						:class="{ 'label-disabled': enhancedItem.disabled }">
						{{ enhancedItem.label }}
					</span>
					
					<!-- Close button -->
					<button
						v-if="enhancedItem.closable && !enhancedItem.disabled"
						type="button"
						class="tab-close-button"
						:aria-label="`Close ${enhancedItem.label} tab`"
						tabindex="-1"
						@click="handleCloseClick($event, enhancedItem.original, index)">
						<BIcon name="x" class="tab-close-icon" />
					</button>
				</div>
				
				<!-- Hidden description for screen readers -->
				<span
					v-if="enhancedItem.ariaDescription"
					:id="`${enhancedItem.tabId}-desc`"
					class="sr-only">
					{{ enhancedItem.ariaDescription }}
				</span>
			</button>
		</div>
		
		<!-- Tab panels slot for content -->
		<div class="tab-content">
			<div
				v-for="(enhancedItem, index) in enhancedItems"
				:key="`panel-${index}`"
				:id="enhancedItem.panelId"
				role="tabpanel"
				:aria-labelledby="enhancedItem.tabId"
				:hidden="getValue(model) !== enhancedItem.value"
				tabindex="0">
				<slot
					:name="`panel-${enhancedItem.value}`"
					:item="enhancedItem.original"
					:enhanced="enhancedItem"
					:index="index"
					:isActive="getValue(model) == enhancedItem.value" />
			</div>
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	.b-tab {
		@apply p-xxs rounded-xs;
	}

	.default-tab {
		@apply text-neutral-interaction-default py-xs px-xs rounded-xs hover:text-primary-interaction-hover border-0 bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-foreground-low transition-all duration-150 min-h-touch;
		position: relative;

		.b-icon {
			@apply text-lg;
		}
	}

	.active-tab {
		@apply text-neutral-foreground-high bg-neutral-surface-default hover:text-neutral-foreground-high;
		box-shadow: var(--box-shadow-neutral-selected);
	}

	/* Disabled tab styles */
	.disabled-tab {
		@apply cursor-not-allowed opacity-50;
		
		&:hover {
			@apply text-neutral-interaction-default;
		}
		
		&:focus {
			@apply focus:ring-neutral-border-default;
		}
	}

	.disabled-tab .tab-label,
	.disabled-tab .tab-icon {
		@apply opacity-60;
	}

	/* Tab content styles */
	.tab-label {
		@apply transition-colors duration-150;
	}

	.tab-icon {
		@apply transition-colors duration-150;
	}

	/* Close button styles */
	.tab-close-button {
		@apply ml-xs p-xxs rounded-xs hover:bg-neutral-surface-hover focus:outline-none focus:ring-2 focus:ring-primary-foreground-low transition-all duration-150;
		margin-left: 0.25rem;
	}

	.tab-close-icon {
		@apply w-xs h-xs text-neutral-interaction-default hover:text-danger-interaction-default;
	}

	.tab-content {
		@apply mt-xs;
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

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.default-tab {
			border: 1px solid transparent;
		}
		
		.default-tab:focus {
			border-color: currentColor;
		}
		
		.active-tab {
			border-color: currentColor;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.default-tab,
		.tab-close-button,
		.tab-label,
		.tab-icon {
			transition: none;
		}
	}
</style>
