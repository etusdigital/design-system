<script setup lang="ts">
	import { computed, nextTick, ref, watch } from "vue";
	import { useOptionalModel, useAriaAttributes, useScreenReader, useKeyboardNavigation, useFocusTrap } from "#composables";
	import BIcon from "../BIcon/BIcon.vue";
	import type {
		BPaginationProps,
		BPaginationEmits,
		BPaginationAccessibilityProps,
		BPaginationKeyboardNavigation,
		BPaginationScreenReaderConfig,
		BPaginationFocusManagement,
		BPaginationDisplayOptions,
		BPaginationJumpToPage,
		BPaginationExpose
	} from './BPagination.types';

	const props = withDefaults(
		defineProps<{
			modelValue: number;
			length?: number;
			/** Accessible label for the pagination navigation */
			ariaLabel?: string;
			/** Accessibility configuration */
			accessibility?: BPaginationAccessibilityProps;
			/** Keyboard navigation configuration */
			keyboardNavigation?: BPaginationKeyboardNavigation;
			/** Screen reader configuration */
			screenReader?: BPaginationScreenReaderConfig;
			/** Focus management configuration */
			focusManagement?: BPaginationFocusManagement;
			/** Display options configuration */
			display?: BPaginationDisplayOptions;
			/** Jump to page configuration */
			jumpToPage?: BPaginationJumpToPage;
			/** Whether the pagination is disabled */
			disabled?: boolean;
			/** Loading state for async page changes */
			loading?: boolean;
		}>(),
		{
			modelValue: 1,
			length: 1,
			ariaLabel: "Pagination navigation",
			disabled: false,
			loading: false,
			accessibility: () => ({}),
			keyboardNavigation: () => ({ enableArrowKeys: true, enableHomeEndKeys: true }),
			screenReader: () => ({ useLiveRegions: true, announcementPoliteness: 'polite' as const, announceTotalPages: true }),
			focusManagement: () => ({ focusableSelector: 'button:not(:disabled)', focusActiveButton: true }),
			display: () => ({ showFirstLast: true, showPreviousNext: true, maxVisiblePages: 7 }),
			jumpToPage: () => ({}),
		}
	);

	const emit = defineEmits<BPaginationEmits>();

	const [model, setModel] = useOptionalModel<number>(
		props,
		"modelValue",
		emit,
		1
	);

	// Refs and reactive state
	const paginationNav = ref<HTMLElement | null>(null);
	const jumpToPageInput = ref<HTMLInputElement | null>(null);
	const liveRegion = ref<HTMLElement | null>(null);
	const focusedPageButton = ref<HTMLButtonElement | null>(null);
	const jumpToPageValue = ref<string>('');
	const isJumpToPageVisible = ref(false);

	// Accessibility setup
	const { useAriaId, useNavigationAria, useButtonAria } = useAriaAttributes();
	const screenReader = useScreenReader();
	const { useLiveRegion } = screenReader;
	const paginationId = useAriaId(props.accessibility?.id || 'pagination');
	const liveRegionId = useAriaId('pagination-live');
	const jumpToPageId = useAriaId('jump-to-page');

	// Live region for screen reader announcements
	const { liveRegion: srLiveRegion, updateLiveRegion } = useLiveRegion(
		props.screenReader?.announcementPoliteness || 'polite'
	);

	// Focus trap for keyboard navigation (optional)
	const shouldTrapFocus = ref(false);
	const focusTrap = props.focusManagement?.trapFocus ? useFocusTrap(paginationNav, shouldTrapFocus) : null;

	// Navigation ARIA attributes with enhanced context
	const navigationAriaAttrs = computed(() => ({
		role: 'navigation',
		'aria-label': props.accessibility?.ariaLabel || props.ariaLabel,
		'aria-describedby': props.screenReader?.useLiveRegions ? liveRegionId : undefined,
		...props.accessibility?.navigationAriaAttrs,
	}));

	const items = computed((): (number | -1)[] => {
		const result: (number | -1)[] = [];

		for (let i = 1; i <= props.length; i++) {
			if (
				i === 1 ||
				i === props.length ||
				(model.value === 1 && i < 4) ||
				(model.value === props.length && i >= props.length - 2) ||
				model.value - 1 === i ||
				model.value + 1 === i ||
				model.value === i
			) {
				result.push(i);
			} else if (
				(model.value <= props.length - 2 &&
					i === props.length - 1 &&
					props.length > 3) ||
				(model.value > 2 && props.length > 3 && i === 2)
			) {
				result.push(-1);
			}
		}

		for (let i = 0; i < 2; i++) {
			const index =
				i == 0
					? result.findIndex((value: number) => value == -1)
					: result.slice().reverse().findIndex((value: number) => value == -1) !== -1
						? result.length - 1 - result.slice().reverse().findIndex((value: number) => value == -1)
						: -1;
			if (index >= 0 && result[index + 1] - result[index - 1] == 2)
				result[index] = result[index - 1] + 1;
		}

		return result;
	});

	// Enhanced page change with comprehensive accessibility
	function changePage(page: number, source: 'click' | 'keyboard' | 'jump' = 'click') {
		if (page < 1 || page > props.length || page === model.value || props.disabled || props.loading) {
			return;
		}

		const previousPage = model.value;
		
		// Emit page-changing event
		emit('page-changing', previousPage, page);

		// Update model
		setModel(page, { page, source });

		// Screen reader announcements
		if (props.screenReader?.announceTotalPages !== false) {
			const customAnnouncement = props.screenReader?.customAnnouncements?.pageChange;
			const template = typeof customAnnouncement === 'function' 
				? customAnnouncement(page, props.length)
				: props.accessibility?.pageRangeTemplate || 'Page {current} of {total}';
			const message = typeof template === 'string' 
				? template.replace('{current}', String(page)).replace('{total}', String(props.length))
				: template;
			
			if (props.screenReader?.useLiveRegions) {
				updateLiveRegion(message);
			} else {
				screenReader.announcePolitely(message);
			}
		}

		// Boundary announcements
		if (props.screenReader?.announceBoundaryReached) {
			if (page === 1) {
				const message = props.screenReader.customAnnouncements?.firstPage?.() || 'First page reached';
				screenReader.announcePolitely(message);
				emit('first-page', page);
			} else if (page === props.length) {
				const message = props.screenReader.customAnnouncements?.lastPage?.() || 'Last page reached';
				screenReader.announcePolitely(message);
				emit('last-page', page);
			}
		}

		// Focus management
		nextTick(() => {
			if (props.focusManagement?.focusActiveButton && source === 'keyboard') {
				focusCurrentPageButton();
			}
			emit('page-changed', page, previousPage);
		});
	}

	// Enhanced navigation functions
	function goToPreviousPage(source: 'click' | 'keyboard' = 'click') {
		if (model.value > 1) {
			changePage(model.value - 1, source);
		}
	}

	function goToNextPage(source: 'click' | 'keyboard' = 'click') {
		if (model.value < props.length) {
			changePage(model.value + 1, source);
		}
	}

	function goToFirstPage(source: 'click' | 'keyboard' = 'click') {
		changePage(1, source);
	}

	function goToLastPage(source: 'click' | 'keyboard' = 'click') {
		changePage(props.length, source);
	}

	// Enhanced keyboard navigation with configuration support
	function handleKeydown(event: KeyboardEvent, page?: number) {
		if (props.disabled || props.loading) return;

		// Custom handlers first
		if (props.keyboardNavigation?.customKeyHandlers?.[event.key]) {
			props.keyboardNavigation.customKeyHandlers[event.key](event);
			return;
		}

		let handled = false;

		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault();
				if (page !== undefined) {
					changePage(page, 'keyboard');
				}
				handled = true;
				break;
			
			case 'ArrowLeft':
				if (props.keyboardNavigation?.enableArrowKeys !== false) {
					event.preventDefault();
					goToPreviousPage('keyboard');
					handled = true;
				}
				break;
			
			case 'ArrowRight':
				if (props.keyboardNavigation?.enableArrowKeys !== false) {
					event.preventDefault();
					goToNextPage('keyboard');
					handled = true;
				}
				break;
			
			case 'Home':
				if (props.keyboardNavigation?.enableHomeEndKeys !== false) {
					event.preventDefault();
					changePage(1, 'keyboard');
					handled = true;
				}
				break;
			
			case 'End':
				if (props.keyboardNavigation?.enableHomeEndKeys !== false) {
					event.preventDefault();
					changePage(props.length, 'keyboard');
					handled = true;
				}
				break;
			
			case 'PageUp':
				if (props.keyboardNavigation?.enablePageUpDownKeys) {
					event.preventDefault();
					const targetPage = Math.max(1, model.value - 10);
					changePage(targetPage, 'keyboard');
					handled = true;
				}
				break;
			
			case 'PageDown':
				if (props.keyboardNavigation?.enablePageUpDownKeys) {
					event.preventDefault();
					const targetPage = Math.min(props.length, model.value + 10);
					changePage(targetPage, 'keyboard');
					handled = true;
				}
				break;
			
			case 'j':
				if (props.jumpToPage?.enableJumpToPage && event.ctrlKey) {
					event.preventDefault();
					toggleJumpToPage();
					handled = true;
				}
				break;
			
			case 'Escape':
				if (isJumpToPageVisible.value) {
					event.preventDefault();
					hideJumpToPage();
					handled = true;
				}
				break;
		}

		if (handled) {
			emit('keyboard-navigation', event, event.key);
		}
	}

	// Jump to page functionality
	function toggleJumpToPage() {
		isJumpToPageVisible.value = !isJumpToPageVisible.value;
		if (isJumpToPageVisible.value) {
			nextTick(() => {
				jumpToPageInput.value?.focus();
			});
		}
	}

	function hideJumpToPage() {
		isJumpToPageVisible.value = false;
		jumpToPageValue.value = '';
	}

	function handleJumpToPage() {
		const page = parseInt(jumpToPageValue.value, 10);
		if (isNaN(page) || page < 1 || page > props.length) {
			screenReader.announceAssertively(`Invalid page number. Please enter a number between 1 and ${props.length}.`);
			return;
		}
		changePage(page, 'jump');
		emit('jump-to-page', page);
		hideJumpToPage();
	}

	function handleJumpInputKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Enter':
				event.preventDefault();
				handleJumpToPage();
				break;
			case 'Escape':
				event.preventDefault();
				hideJumpToPage();
				break;
		}
	}

	// Focus management utilities
	function focusCurrentPageButton() {
		const currentButton = paginationNav.value?.querySelector(`button[aria-current="page"]`) as HTMLButtonElement;
		if (currentButton) {
			currentButton.focus();
			emit('focus-changed', currentButton, model.value);
		}
	}

	function focusFirstPageButton() {
		const firstButton = paginationNav.value?.querySelector('button:not([disabled])') as HTMLButtonElement;
		if (firstButton) {
			firstButton.focus();
			emit('focus-changed', firstButton, 1);
		}
	}

	function focusLastPageButton() {
		const buttons = paginationNav.value?.querySelectorAll('button:not([disabled])') as NodeListOf<HTMLButtonElement>;
		const lastButton = buttons?.[buttons.length - 1];
		if (lastButton) {
			lastButton.focus();
			emit('focus-changed', lastButton, props.length);
		}
	}

	// Computed properties for accessibility labels
	const previousButtonLabel = computed(() => {
		const template = props.accessibility?.previousLabel || 'Go to previous page, currently on page {current}';
		return template.replace('{current}', String(model.value));
	});

	const nextButtonLabel = computed(() => {
		const template = props.accessibility?.nextLabel || 'Go to next page, currently on page {current}';
		return template.replace('{current}', String(model.value));
	});

	const firstButtonLabel = computed(() => {
		const template = props.accessibility?.firstLabel || 'Go to first page';
		return template;
	});

	const lastButtonLabel = computed(() => {
		const template = props.accessibility?.lastLabel || 'Go to last page';
		return template;
	});

	function getPageButtonLabel(page: number): string {
		if (page === model.value) {
			const template = props.accessibility?.currentPageLabel || 'Current page, page {page} of {total}';
			return template.replace('{page}', String(page)).replace('{total}', String(props.length));
		}
		const template = props.accessibility?.pageLabel || 'Go to page {page} of {total}';
		return template.replace('{page}', String(page)).replace('{total}', String(props.length));
	}

	// Watch for model changes to manage focus
	watch(model, (newPage, oldPage) => {
		if (props.focusManagement?.focusActiveButton && newPage !== oldPage) {
			nextTick(() => focusCurrentPageButton());
		}
	});

	// Expose public methods for parent components
	defineExpose<BPaginationExpose>({
		focusCurrentPage: focusCurrentPageButton,
		focusFirstPage: focusFirstPageButton,
		focusLastPage: focusLastPageButton,
		goToPage: (page: number) => changePage(page, 'click'),
		goToPreviousPage: () => goToPreviousPage('click'),
		goToNextPage: () => goToNextPage('click'),
		announceToScreenReader: (message: string, politeness = 'polite' as const) => {
			if (politeness === 'assertive') {
				screenReader.announceAssertively(message);
			} else {
				screenReader.announcePolitely(message);
			}
		},
		getAccessibilityState: () => ({
			currentPage: model.value,
			totalPages: props.length,
			hasNext: model.value < props.length,
			hasPrevious: model.value > 1,
			isFirstPage: model.value === 1,
			isLastPage: model.value === props.length,
		}),
	});
</script>

<template>
	<div class="pagination-container" :class="{ 'pagination-disabled': disabled || loading }">
		<!-- Skip link for keyboard users -->
		<a
			v-if="focusManagement?.provideSkipLink"
			href="#main-content"
			class="skip-link"
			@click="$emit('focus-changed', $event.target as HTMLElement)">
			{{ focusManagement.skipLinkText || 'Skip to main content' }}
		</a>

		<!-- Jump to page input (when visible) -->
		<div
			v-if="isJumpToPageVisible && jumpToPage?.enableJumpToPage"
			class="jump-to-page-container"
			role="group"
			:aria-labelledby="jumpToPageId + '-label'">
			<label
				:id="jumpToPageId + '-label'"
				for="jumpToPageId"
				class="jump-to-page-label">
				{{ jumpToPage.jumpToPageLabel || 'Jump to page' }}
			</label>
			<input
				:id="jumpToPageId"
				ref="jumpToPageInput"
				v-model="jumpToPageValue"
				type="number"
				:min="1"
				:max="length"
				:placeholder="jumpToPage.jumpToPagePlaceholder || 'Page number'"
				class="jump-to-page-input"
				:aria-describedby="jumpToPageId + '-desc'"
				@keydown="handleJumpInputKeydown"
				@blur="hideJumpToPage">
			<div :id="jumpToPageId + '-desc'" class="sr-only">
				Enter a page number between 1 and {{ length }}
			</div>
			<button
				type="button"
				class="jump-to-page-button"
				@click="handleJumpToPage">
				{{ jumpToPage.jumpToPageButtonText || 'Go' }}
			</button>
		</div>

		<!-- Page info (before pagination) -->
		<div
			v-if="display?.showPageInfo && display?.pageInfoPosition === 'before'"
			class="page-info page-info-before"
			role="status"
			aria-live="polite">
			Page {{ model }} of {{ length }}
		</div>

		<!-- Main pagination navigation -->
		<nav
			:id="paginationId"
			ref="paginationNav"
			v-bind="navigationAriaAttrs"
			class="pagination-nav"
			:class="{
				'pagination-loading': loading,
				'pagination-disabled': disabled
			}"
			@keydown="handleKeydown">

			<!-- First page button -->
			<button
				v-if="display?.showFirstLast && model > 2"
				type="button"
				class="page-button page-first"
				:disabled="model === 1 || disabled || loading"
				:aria-label="firstButtonLabel"
				@click="goToFirstPage()">
				<BIcon name="keyboard_double_arrow_left" aria-hidden="true" />
				<span class="sr-only">First page</span>
			</button>

			<!-- Previous page button -->
			<button
				v-if="display?.showPreviousNext"
				type="button"
				class="page-button page-prev"
				:disabled="model === 1 || disabled || loading"
				:aria-label="previousButtonLabel"
				@click="goToPreviousPage()">
				<BIcon name="chevron_left" aria-hidden="true" />
				<span class="sr-only">Previous page</span>
			</button>

			<!-- Page numbers group -->
			<div 
				class="page-numbers-group"
				role="group" 
				:aria-label="`Page numbers, current page ${model} of ${length}`">
				<template v-for="page in items" :key="page">
					<!-- Ellipsis for truncated pages -->
					<span
						v-if="page === -1"
						class="page-ellipsis"
						aria-hidden="true"
						role="presentation">
						<span>…</span>
					</span>
					
					<!-- Page number button -->
					<button
						v-else
						type="button"
						class="page-button page-number"
						:class="{ 'page-current': page === model }"
						:disabled="disabled || loading"
						:aria-label="getPageButtonLabel(page)"
						:aria-current="page === model ? 'page' : undefined"
						:tabindex="page === model ? 0 : -1"
						@click="changePage(page)"
						@keydown="(e) => handleKeydown(e, page)">
						{{ page }}
					</button>
				</template>
			</div>

			<!-- Next page button -->
			<button
				v-if="display?.showPreviousNext"
				type="button"
				class="page-button page-next"
				:disabled="model === length || disabled || loading"
				:aria-label="nextButtonLabel"
				@click="goToNextPage()">
				<BIcon name="chevron_right" aria-hidden="true" />
				<span class="sr-only">Next page</span>
			</button>

			<!-- Last page button -->
			<button
				v-if="display?.showFirstLast && model < length - 1"
				type="button"
				class="page-button page-last"
				:disabled="model === length || disabled || loading"
				:aria-label="lastButtonLabel"
				@click="goToLastPage()">
				<BIcon name="keyboard_double_arrow_right" aria-hidden="true" />
				<span class="sr-only">Last page</span>
			</button>

			<!-- Jump to page trigger button -->
			<button
				v-if="jumpToPage?.enableJumpToPage && !isJumpToPageVisible"
				type="button"
				class="page-button jump-trigger"
				:disabled="disabled || loading"
				aria-label="Jump to a specific page"
				title="Press Ctrl+J or click to jump to a specific page"
				@click="toggleJumpToPage()">
				<BIcon name="more_horiz" aria-hidden="true" />
				<span class="sr-only">Jump to page</span>
			</button>
		</nav>

		<!-- Page info (after pagination) -->
		<div
			v-if="display?.showPageInfo && display?.pageInfoPosition !== 'before'"
			class="page-info page-info-after"
			role="status"
			aria-live="polite">
			Page {{ model }} of {{ length }}
		</div>

		<!-- Screen reader live region for announcements -->
		<div
			v-if="screenReader?.useLiveRegions"
			:id="liveRegionId"
			ref="srLiveRegion"
			class="sr-only"
			:aria-live="screenReader.announcementPoliteness || 'polite'"
			aria-atomic="true"
			role="status">
			<!-- Screen reader announcements appear here -->
		</div>

		<!-- Loading state indicator -->
		<div
			v-if="loading"
			class="pagination-loading-indicator"
			role="status"
			aria-live="polite">
			<span class="sr-only">Loading new page...</span>
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";
	
	/* Container and layout */
	.pagination-container {
		@apply flex flex-col items-center gap-sm;
	}

	.pagination-container.pagination-disabled {
		@apply opacity-60 pointer-events-none;
	}

	.pagination-nav {
		@apply flex items-center gap-xs;
	}

	.pagination-nav.pagination-loading {
		@apply opacity-75;
	}

	.pagination-nav.pagination-disabled {
		@apply opacity-50;
	}

	/* Skip link for keyboard navigation */
	.skip-link {
		@apply absolute left-[-10000px] w-px h-px overflow-hidden;
		@apply focus:relative focus:left-0 focus:w-auto focus:h-auto focus:overflow-visible;
		@apply focus:bg-primary-surface-default focus:text-primary-foreground-high;
		@apply focus:px-base focus:py-xs focus:rounded-xs focus:z-50;
		@apply focus:outline-none focus:ring-2 focus:ring-primary-foreground-low;
	}

	/* Page buttons - unified styling */
	.page-button {
		@apply h-fit w-fit flex items-center justify-center;
		@apply border-xxs border-transparent bg-transparent cursor-pointer;
		@apply text-neutral-interaction-default text-sm font-medium;
		@apply hover:text-primary-interaction-hover hover:bg-primary-surface-hover;
		@apply focus:outline-none focus:ring-2 focus:ring-primary-foreground-low focus:ring-offset-1;
		@apply rounded-xs transition-colors duration-200;
		@apply px-base py-xs min-w-[44px] min-h-[44px]; /* Minimum touch target size */
	}

	.page-button:disabled {
		@apply pointer-events-none text-neutral-interaction-disabled cursor-not-allowed;
		@apply hover:text-neutral-interaction-disabled hover:bg-transparent;
	}

	/* Page number specific styling */
	.page-number {
		@apply text-sm font-medium;
	}

	.page-number.page-current {
		@apply border-primary-border-default bg-primary-surface-default;
		@apply text-primary-foreground-high font-semibold;
		@apply hover:text-primary-foreground-high hover:bg-primary-surface-hover;
	}

	/* Navigation buttons (prev, next, first, last) */
	.page-first,
	.page-last,
	.page-prev,
	.page-next {
		@apply text-lg;
	}

	/* Page numbers group */
	.page-numbers-group {
		@apply flex items-center gap-xs;
	}

	/* Ellipsis styling */
	.page-ellipsis {
		@apply flex items-center justify-center px-xs py-xs text-neutral-interaction-default;
		@apply min-w-[44px] min-h-[44px] text-sm font-medium;
	}

	/* Jump to page functionality */
	.jump-to-page-container {
		@apply flex items-center gap-xs p-base border border-neutral-border-default;
		@apply rounded-base bg-neutral-surface-default;
	}

	.jump-to-page-label {
		@apply text-sm font-medium text-neutral-foreground-high whitespace-nowrap;
	}

	.jump-to-page-input {
		@apply w-20 px-xs py-xs text-sm border border-neutral-border-default rounded-xs;
		@apply focus:outline-none focus:ring-2 focus:ring-primary-foreground-low;
		@apply text-neutral-foreground-high bg-neutral-surface-default;
	}

	.jump-to-page-button {
		@apply px-sm py-xs text-sm font-medium rounded-xs;
		@apply bg-primary-interaction-default text-white;
		@apply hover:bg-primary-interaction-hover;
		@apply focus:outline-none focus:ring-2 focus:ring-primary-foreground-low;
		@apply transition-colors duration-200;
	}

	.jump-trigger {
		@apply text-neutral-interaction-default;
	}

	/* Page info display */
	.page-info {
		@apply text-sm text-neutral-foreground-low font-medium;
	}

	.page-info-before {
		@apply mb-xs;
	}

	.page-info-after {
		@apply mt-xs;
	}

	/* Loading indicator */
	.pagination-loading-indicator {
		@apply absolute inset-0 flex items-center justify-center;
		@apply bg-neutral-surface-default opacity-75;
	}

	/* Screen reader only content */
	.sr-only {
		@apply absolute w-px h-px p-0 -m-px overflow-hidden border-0;
		clip-path: inset(50%);
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.page-button {
			@apply border-current;
		}

		.page-number.page-current {
			@apply border-2 border-current;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.page-button {
			@apply transition-none;
		}
	}

	/* Focus visible for better keyboard navigation */
	.page-button:focus-visible {
		@apply ring-2 ring-primary-foreground-low ring-offset-2;
	}

	/* Dark mode compatibility */
	@media (prefers-color-scheme: dark) {
		.skip-link:focus {
			@apply bg-gray-800 text-white;
		}
		
		.jump-to-page-container {
			@apply bg-gray-800 border-gray-600;
		}
		
		.jump-to-page-input {
			@apply bg-gray-700 border-gray-600 text-white;
		}
	}

	/* Ensure keyboard focus is visible in all browsers */
	.page-button:focus:not(:focus-visible) {
		@apply ring-0;
	}

	.page-button:focus-visible {
		@apply ring-2 ring-primary-foreground-low ring-offset-1;
	}
</style>
