<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useOptionalModel, useKeyboardNavigation, useAriaAttributes } from "#composables";
import { useHistoryAccessibility } from '#composables/useHistoryAccessibility';
import BHistoryItem from './BHistoryItem.vue';
import HistoryPagination from './HistoryPagination.vue';
import type { 
	BHistoryProps, 
	BHistoryEmits,
	BHistoryPaginationContext,
	BHistoryItem as BHistoryItemType,
	BHistorySelectionEvent,
	BHistoryTimelineMetadata,
	BHistoryItemContext
} from './BHistory.types';

const props = withDefaults(
	defineProps<BHistoryProps>(),
	{
		modelValue: null,
		position: "right",
		type: "primary",
		disabled: false,
		keyboardNavigation: true,
		loopNavigation: true,
		focusOnNavigation: true,
		announceNavigation: true,
		announcementPrefix: "History item",
		reduceMotion: false,
		liveRegionPoliteness: "polite",
		role: "region",
		showPagination: false,
		currentPage: 1,
		itemsPerPage: 10,
		dateFormatOptions: () => ({
			year: 'numeric',
			month: 'long',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		} as const),
		locale: 'en-US',
		announceItemCounts: true,
		announceDateInfo: true,
		announceOrientation: true
	}
);

const emit = defineEmits<BHistoryEmits>();

// Component refs and state
const historyRef = ref<HTMLElement | null>(null);
const liveRegionRef = ref<HTMLElement | null>(null);
const focusedIndex = ref<number>(-1);

// Accessibility setup
const { useAriaId } = useAriaAttributes();
const historyId = useAriaId('history');
const listId = useAriaId('history-list');

// Live region management
const updateLiveRegion = (message: string) => {
	if (liveRegionRef.value) {
		liveRegionRef.value.textContent = message;
	}
};

/**
 * Reactive model for the currently selected history item
 */
const [model, setModel] = useOptionalModel<BHistoryItemType | null>(
	props,
	"modelValue",
	emit,
	null
);

// Pagination computed values
const paginatedItems = computed(() => {
	if (!props.showPagination) return props.items;
	
	const startIndex = (props.currentPage - 1) * props.itemsPerPage;
	const endIndex = startIndex + props.itemsPerPage;
	return props.items.slice(startIndex, endIndex);
});

const paginationContext = computed<BHistoryPaginationContext>(() => {
	const totalItems = props.items.length;
	const totalPages = Math.ceil(totalItems / props.itemsPerPage);
	const currentPage = props.currentPage;
	
	return {
		currentPage,
		totalPages,
		itemsPerPage: props.itemsPerPage,
		totalItems,
		hasPreviousPage: currentPage > 1,
		hasNextPage: currentPage < totalPages,
		itemRange: {
			start: (currentPage - 1) * props.itemsPerPage + 1,
			end: Math.min(currentPage * props.itemsPerPage, totalItems)
		}
	};
});

// Timeline metadata
const timelineMetadata = computed<BHistoryTimelineMetadata>(() => {
	const items = props.showPagination ? paginatedItems.value : props.items;
	const selectedIndex = items.findIndex(item => item === model.value);
	
	const dates = items
		.map(item => item.date)
		.filter(date => date instanceof Date)
		.sort((a, b) => a!.getTime() - b!.getTime());
	
	return {
		totalItems: items.length,
		selectedIndex,
		dateRange: dates.length > 0 ? {
			earliest: dates[0]!,
			latest: dates[dates.length - 1]!
		} : undefined,
		isChronological: dates.length > 1,
		orientation: props.position === 'top' || props.position === 'bottom' ? 'horizontal' : 'vertical'
	};
});

// Format date for accessibility
const formatDateForAccessibility = (date: Date | undefined): string => {
	if (!date) return '';
	
	try {
		return date.toLocaleDateString(props.locale, props.dateFormatOptions);
	} catch {
		return date.toLocaleDateString();
	}
};

// Generate item context for accessibility
const getItemContext = (item: BHistoryItemType, index: number): BHistoryItemContext => {
	const items = props.showPagination ? paginatedItems.value : props.items;
	const isActive = item === model.value;
	const isFocused = index === focusedIndex.value;
	const totalItems = items.length;
	const position = index + 1;
	
	return {
		item,
		index,
		active: isActive,
		focused: isFocused,
		totalItems,
		positionText: `${position} of ${totalItems}`,
		accessibleDate: formatDateForAccessibility(item.date),
		itemAriaAttrs: {
			role: 'listitem',
			'aria-setsize': totalItems,
			'aria-posinset': position,
			'aria-selected': isActive,
			tabindex: isFocused ? 0 : -1,
			'aria-label': `${props.announcementPrefix} ${position}: ${item.label || 'Unlabeled item'}${item.date ? `, ${formatDateForAccessibility(item.date)}` : ''}`,
			...(isActive && { 'aria-current': 'step' })
		}
	};
};

// Keyboard navigation setup
const displayedItems = computed(() => props.showPagination ? paginatedItems.value : props.items);
const {
	activeIndex,
	isNavigating,
	handleKeydown,
	setActiveIndex,
	reset: resetNavigation
} = useKeyboardNavigation(
	displayedItems,
	(item, index) => handleItemSelection(item, { index }),
	{
		loop: props.loopNavigation,
		horizontal: props.position === 'top' || props.position === 'bottom',
		customHandlers: {
			'PageUp': () => {
				if (props.showPagination && paginationContext.value.hasPreviousPage) {
					emit('update:currentPage', props.currentPage - 1);
				}
			},
			'PageDown': () => {
				if (props.showPagination && paginationContext.value.hasNextPage) {
					emit('update:currentPage', props.currentPage + 1);
				}
			}
		}
	}
);

// Main ARIA attributes for the history container
const historyAriaAttrs = computed(() => {
	const attrs: Record<string, any> = {
		role: props.role,
		id: historyId,
		'aria-label': props['aria-label'] || `History timeline with ${timelineMetadata.value.totalItems} items`,
		...(props['aria-labelledby'] && { 'aria-labelledby': props['aria-labelledby'] }),
		...(props['aria-describedby'] && { 'aria-describedby': props['aria-describedby'] }),
	};
	
	// Add orientation for screen reader context
	if (props.announceOrientation) {
		attrs['aria-orientation'] = timelineMetadata.value.orientation;
	}
	
	return attrs;
});

// List ARIA attributes
const listAriaAttrs = computed(() => ({
	role: 'list',
	id: listId,
	'aria-label': `${props.announcementPrefix} list, ${timelineMetadata.value.totalItems} items total`
}));

/**
 * Handles history item selection with proper event payload and accessibility announcements
 */
const handleItemSelection = (item: BHistoryItemType, event: BHistorySelectionEvent): void => {
	if (props.disabled) return;
	
	setModel(item, event);
	
	// Update focused index to match selection
	focusedIndex.value = event.index;
	
	// Announce selection change
	if (props.announceNavigation) {
		const context = getItemContext(item, event.index);
		const announcement = `${props.announcementPrefix} selected: ${context.itemAriaAttrs['aria-label']}`;
		updateLiveRegion(announcement);
	}
};

/**
 * Handles keyboard events for the history timeline
 */
const handleHistoryKeydown = (event: KeyboardEvent): void => {
	if (!props.keyboardNavigation || props.disabled) return;
	handleKeydown(event);
};

/**
 * Handles item focus events
 */
const handleItemFocus = (item: BHistoryItemType, index: number): void => {
	focusedIndex.value = index;
	emit('focus-change', item, index);
};

/**
 * Handles item blur events
 */
const handleItemBlur = (): void => {
	// Only reset focus if we're not navigating
	if (!isNavigating.value) {
		focusedIndex.value = -1;
	}
};

// Watch for active index changes and update focus
watch(activeIndex, (newIndex) => {
	focusedIndex.value = newIndex;
	
	if (newIndex >= 0 && props.focusOnNavigation) {
		nextTick(() => {
			if (props.announceNavigation) {
				const item = displayedItems.value[newIndex];
				const context = getItemContext(item, newIndex);
				updateLiveRegion(`Navigated to ${context.itemAriaAttrs['aria-label']}`);
			}
			
			emit('focus-change', displayedItems.value[newIndex], newIndex);
		});
	}
});

// Initialize component on mount
onMounted(() => {
	// Set initial focus if there's a selected item
	if (model.value) {
		const selectedIndex = displayedItems.value.findIndex(item => item === model.value);
		if (selectedIndex >= 0) {
			focusedIndex.value = selectedIndex;
		}
	}
	
	// Announce timeline description if enabled
	if (props.announceOrientation && props.announceItemCounts) {
		const metadata = timelineMetadata.value;
		const announcement = `${metadata.orientation} history timeline with ${metadata.totalItems} items${metadata.dateRange ? ` from ${formatDateForAccessibility(metadata.dateRange.earliest)} to ${formatDateForAccessibility(metadata.dateRange.latest)}` : ''}`;
		
		// Delay announcement to avoid conflicts with page load
		setTimeout(() => {
			updateLiveRegion(announcement);
		}, 500);
	}
});

// Cleanup on unmount
onUnmounted(() => {
	resetNavigation();
});

// Watch for pagination changes and announce
watch(() => props.currentPage, (newPage) => {
	if (props.showPagination && props.announceNavigation) {
		const context = paginationContext.value;
		const announcement = `Page ${newPage} of ${context.totalPages}, showing items ${context.itemRange.start} to ${context.itemRange.end} of ${context.totalItems}`;
		updateLiveRegion(announcement);
	}
});
</script>

<template>
	<div
		ref="historyRef"
		class="b-history"
		:class="{ 
			'timeline-horizontal': position === 'top' || position === 'bottom',
			'timeline-vertical': position === 'left' || position === 'right',
			'reduce-motion': reduceMotion
		}"
		v-bind="historyAriaAttrs"
		@keydown="handleHistoryKeydown"
	>
		<!-- Screen reader live region for announcements -->
		<div
			ref="liveRegion"
			:aria-live="liveRegionPoliteness"
			aria-atomic="true"
			aria-relevant="text"
			class="sr-only"
		></div>

		<!-- History timeline list -->
		<ol
			v-bind="listAriaAttrs"
			class="history-list"
			:class="`position-${position}`"
		>
			<BHistoryItem
				v-for="(item, index) in displayedItems"
				:key="item.id || index"
				:item="item"
				:position="position"
				:type="item.type || type"
				:active="(index === 0 && !model && !disabled) || item === model"
				:disabled="disabled"
				:is-first="index === 0"
				:is-last="index === displayedItems.length - 1"
				:index="index"
				:total-items="displayedItems.length"
				:context="getItemContext(item, index)"
				@click="handleItemSelection"
				@focus="handleItemFocus"
				@blur="handleItemBlur"
			>
				<template #default="{ item: slotItem, index: slotIndex, active, context }">
					<slot
						name="item"
						:item="slotItem"
						:index="slotIndex"
						:active="active"
						:context="context"
					/>
				</template>
			</BHistoryItem>
		</ol>

		<!-- Pagination controls (if enabled) -->
		<nav
			v-if="showPagination && paginationContext.totalPages > 1"
			class="history-pagination"
			aria-label="History pagination"
		>
			<button
				type="button"
				:disabled="!paginationContext.hasPreviousPage"
				:aria-label="`Go to previous page, page ${currentPage - 1}`"
				@click="emit('update:currentPage', currentPage - 1)"
				class="pagination-button"
			>
				Previous
			</button>
			
			<span 
				aria-live="polite"
				class="pagination-info"
			>
				Page {{ currentPage }} of {{ paginationContext.totalPages }}
			</span>
			
			<button
				type="button"
				:disabled="!paginationContext.hasNextPage"
				:aria-label="`Go to next page, page ${currentPage + 1}`"
				@click="emit('update:currentPage', currentPage + 1)"
				class="pagination-button"
			>
				Next
			</button>
		</nav>
	</div>
</template>

<style scoped>
@import "../../assets/main.css";

/* CSS Custom Properties for easier theming */
:root {
	--history-timeline-gap: theme(spacing.base);
	--history-item-padding: theme(spacing.base);
	--history-border-width: 1.5px;
	--history-border-color: theme(colors.neutral.border.default);
	--history-transition-duration: theme(transitionDuration.200);
}

.b-history {
	@apply relative;
	
	/* Support for CSS custom properties */
	--timeline-gap: var(--history-timeline-gap);
	--item-padding: var(--history-item-padding);
	--border-width: var(--history-border-width);
	--border-color: var(--history-border-color);
}

.b-history.reduce-motion * {
	animation-duration: 0.01ms !important;
	animation-iteration-count: 1 !important;
	transition-duration: 0.01ms !important;
}

/* Timeline orientation classes */
.timeline-horizontal {
	@apply flex;
}

.timeline-vertical {
	@apply block;
}

/* History list base styles */
.history-list {
	@apply list-none p-0 m-0;
}

/* Position-specific list layouts */
.history-list.position-top,
.history-list.position-bottom {
	@apply flex flex-row gap-base;
}

.history-list.position-left,
.history-list.position-right {
	@apply flex flex-col;
}

/* Screen reader only class */
.sr-only {
	@apply absolute w-px h-px p-0 -m-px overflow-hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

/* Pagination styles */
.history-pagination {
	@apply flex items-center justify-center gap-base mt-base px-base py-sm;
	@apply border-t border-neutral-border-default;
}

.pagination-button {
	@apply px-base py-sm border border-neutral-border-default rounded-base;
	@apply bg-neutral-surface-default hover:bg-neutral-surface-highlight;
	@apply text-neutral-foreground-high;
	@apply transition-colors duration-200 ease-in-out;
}

.pagination-button:disabled {
	@apply opacity-50 cursor-not-allowed hover:bg-neutral-surface-default;
}

.pagination-button:focus {
	@apply outline-none ring-2 ring-primary-interaction-default ring-offset-2;
}

.pagination-info {
	@apply text-sm text-neutral-foreground-medium font-medium;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.pagination-button:focus {
		@apply ring-4 ring-black;
	}
	
	.pagination-button {
		@apply border-2;
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.b-history,
	.pagination-button {
		transition: none !important;
		animation: none !important;
	}
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
	:root {
		--history-border-color: theme(colors.neutral.border.default.dark);
	}
	
	.pagination-info {
		@apply text-neutral-foreground-medium-dark;
	}
	
	.pagination-button {
		@apply bg-neutral-surface-default-dark border-neutral-border-default-dark;
		@apply text-neutral-foreground-high-dark;
		@apply hover:bg-neutral-surface-highlight-dark;
	}
}

/* Container queries for responsive design (if supported) */
@container (max-width: 768px) {
	.timeline-horizontal .history-list {
		@apply flex-col;
	}
	
	.history-pagination {
		@apply flex-col gap-xs;
	}
	
	.pagination-button {
		@apply w-full;
	}
}
</style>