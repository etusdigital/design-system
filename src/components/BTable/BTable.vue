<script setup lang="ts" generic="T extends Record<string, unknown>">
	import { ref, shallowRef, watch, onBeforeMount, computed, useSlots, markRaw, nextTick } from "vue";
	import { useAriaAttributes, useScreenReader } from "#composables";
	import { useVirtualList } from '@vueuse/core';

	/**
	 * Interface for table headers
	 */
	export interface BTableHeader {
		/** Display label for the header */
		label?: string;
		/** Key to access the value in the data object */
		value: string;
		/** Whether this column is sortable */
		sortable?: boolean;
		/** Width of the column */
		width?: string;
		/** Alignment of the column content */
		align?: string;
		/** ARIA label for the column */
		ariaLabel?: string;
		/** Description for screen readers */
		ariaDescription?: string;
		/** Whether this is a numeric column (for sorting announcements) */
		numeric?: boolean;
	}

	/**
	 * Interface for table options
	 */
	export interface BTableOptions {
		/** Initial sort column */
		sortBy?: string;
		/** Initial sort direction (true = descending) */
		sortDesc?: boolean;
	}

	/**
	 * Interface for table items with optional selection state
	 */
	export interface BTableItem extends Record<string, unknown> {
		/** Whether the item is selected (when selection is enabled) */
		selected?: boolean;
		/** Whether the item is expanded (for nested rows) */
		expanded?: boolean;
	}

	/**
	 * Props for the BTable component
	 */
	interface BTableProps<T = Record<string, unknown>> {
		/** Table column definitions */
		headers: BTableHeader[];
		/** Table data items */
		items: (T & BTableItem)[];
		/** Table configuration options */
		options?: BTableOptions;
		/** Current page number */
		page?: number;
		/** Number of items per page */
		itemsPerPage?: number;
		/** Total number of items (for backend pagination) */
		numberOfItems?: number;
		/** Whether pagination is handled by backend */
		renderPaginationInBackEnd?: boolean;
		/** Whether to hide the footer */
		hideFooter?: boolean;
		/** Whether to fix the header when scrolling */
		isHeaderFixed?: boolean;
		/** Whether to enable row selection */
		enableSelection?: boolean;
		/** Whether to enable aggregation column */
		enableAggregation?: boolean;
		/** Whether the table is in loading state */
		loading?: boolean;
		/** Whether to hide the shadow */
		noShadow?: boolean;
		/** Whether to enable hover effects on rows */
		hasHover?: boolean;
		/** Accessible label for loading state */
		loadingLabel?: string;
		/** ARIA label for the table */
		ariaLabel?: string;
		/** Table caption for screen readers */
		caption?: string;
		/** Additional description for screen readers */
		ariaDescription?: string;
	}

	const props = withDefaults(
		defineProps<{
			/** Table column definitions */
			headers: BTableHeader[];
			/** Table data items */
			items: (T & BTableItem)[];
			/** Table configuration options */
			options?: BTableOptions;
			/** Current page number */
			page?: number;
			/** Number of items per page */
			itemsPerPage?: number;
			/** Total number of items (for backend pagination) */
			numberOfItems?: number;
			/** Whether pagination is handled by backend */
			renderPaginationInBackEnd?: boolean;
			/** Whether to hide the footer */
			hideFooter?: boolean;
			/** Whether to fix the header when scrolling */
			isHeaderFixed?: boolean;
			/** Whether to enable row selection */
			enableSelection?: boolean;
			/** Whether to enable aggregation column */
			enableAggregation?: boolean;
			/** Whether the table is in loading state */
			loading?: boolean;
			/** Whether to hide the shadow */
			noShadow?: boolean;
			/** Whether to enable hover effects on rows */
			hasHover?: boolean;
			/** Accessible label for loading state */
			loadingLabel?: string;
			/** ARIA label for the table */
			ariaLabel?: string;
			/** Table caption for screen readers */
			caption?: string;
			/** Additional description for screen readers */
			ariaDescription?: string;
			/** Whether to enable virtual scrolling for large datasets */
			virtualized?: boolean;
			/** Row height for virtual scrolling (defaults to 48px) */
			rowHeight?: number;
			/** Container height for virtual scrolling (required when virtualized) */
			containerHeight?: number;
			/** Number of extra items to render outside visible area (overscan) */
			overscan?: number;
		}>(),
		{
			page: 1,
			itemsPerPage: 10,
			numberOfItems: 0,
			renderPaginationInBackEnd: false,
			hideFooter: false,
			isHeaderFixed: false,
			enableSelection: false,
			enableAggregation: false,
			loading: false,
			noShadow: false,
			hasHover: false,
			loadingLabel: "Loading table data",
			ariaLabel: "",
			caption: "",
			ariaDescription: "",
			virtualized: false,
			rowHeight: 48,
			containerHeight: 400,
			overscan: 5,
		}
	);

	/**
	 * Events emitted by the BTable component
	 */
	interface BTableEmits {
		"update:page": [value: number];
		"update:itemsPerPage": [value: number];
		sortBy: [key: string, isSortDesc: boolean];
		pageItems: [page: number, itemsPerPage: number];
		selectAll: [value: boolean];
		"row-click": [item: any, index: number];
		"row-focus": [item: any, index: number];
		"row-select": [item: any, index: number, selected: boolean];
		"cell-focus": [item: any, rowIndex: number, colIndex: number, header: BTableHeader];
	}

	const emit = defineEmits<BTableEmits>();
	const slots = useSlots();

	// Accessibility setup
	const { useBusyAria, useAriaId } = useAriaAttributes();
	const screenReader = useScreenReader();
	const loadingRef = computed(() => props.loading);
	const busyAriaAttrs = useBusyAria(loadingRef, props.loadingLabel);

	// Generate unique IDs for ARIA relationships
	const tableId = useAriaId('table');
	const captionId = useAriaId('table-caption');
	const descriptionId = useAriaId('table-description');
	const statusId = useAriaId('table-status');

	// Keyboard navigation state
	const focusedRowIndex = ref(-1);
	const focusedColIndex = ref(-1);
	const keyboardMode = ref(false);
	const tableRef = ref<HTMLDivElement | null>(null);
	const tableBodyRef = ref<HTMLTableSectionElement | null>(null);
	const virtualScrollContainer = ref<HTMLDivElement | null>(null);

	// Virtual scrolling setup
	const virtualizedData = computed(() => {
		if (!props.virtualized) return pagedItems.value;
		return props.renderPaginationInBackEnd ? props.items : pagedItems.value;
	});

	const {
		list: virtualList,
		containerProps: virtualContainerProps,
		wrapperProps: virtualWrapperProps
	} = useVirtualList(
		virtualizedData,
		{
			itemHeight: props.rowHeight || 48,
			overscan: props.overscan || 5
		}
	);

	// Use virtualized list when enabled, otherwise use regular paged items
	const displayItems = computed(() => {
		return props.virtualized ? virtualList.value : pagedItems.value;
	});

	// Total row count for ARIA
	const totalAriaRowCount = computed(() => {
		return props.virtualized 
			? virtualizedData.value.length + 1 // +1 for header row
			: pagedItems.value.length + 1;
	});

	// Visible row indices for virtual scrolling ARIA support
	const visibleRowIndices = computed(() => {
		if (!props.virtualized) {
			return Array.from({ length: pagedItems.value.length }, (_, i) => i);
		}
		return virtualList.value.map(item => item.index);
	});

	// Handle virtual scroll announcements
	function announceVirtualScrollChange() {
		if (!props.virtualized) return;
		
		const firstVisibleIndex = Math.min(...visibleRowIndices.value);
		const lastVisibleIndex = Math.max(...visibleRowIndices.value);
		const total = virtualizedData.value.length;
		
		const message = `Showing rows ${firstVisibleIndex + 1} to ${lastVisibleIndex + 1} of ${total} total rows`;
		screenReader.announcePolitely(message);
	}

	// Watch virtual list changes for accessibility announcements
	watch(
		virtualList,
		() => {
			if (props.virtualized) {
				nextTick(announceVirtualScrollChange);
			}
		},
		{ deep: true }
	);

	// Optimized selection state management with better dependency tracking
	const selectedItems = computed(() => {
		if (!props.items) return [];
		// Use Array.reduce instead of filter for better performance on large datasets
		return props.items.reduce((acc: (T & BTableItem)[], item) => {
			if (item.selected) acc.push(item);
			return acc;
		}, []);
	});

	// Memoized count to avoid recalculating on every access
	const selectedCount = computed(() => {
		if (!props.items) return 0;
		// Direct count without creating intermediate array
		let count = 0;
		for (const item of props.items) {
			if (item.selected) count++;
		}
		return count;
	});

	const isIndeterminate = computed(() => {
		const count = selectedCount.value;
		const total = props.items?.length || 0;
		return count > 0 && count < total;
	});

	// Computed accessibility properties
	const tableAriaLabel = computed(() => {
		if (props.ariaLabel) return props.ariaLabel;
		if (props.caption) return props.caption;
		return 'Data table';
	});

	const tableDescription = computed(() => {
		let desc = props.ariaDescription || '';
		if (props.enableSelection) desc += 'Table with row selection enabled. ';
		if (props.headers.some(h => h.sortable)) desc += 'Sortable table. Use Enter or Space to sort columns. ';
		desc += 'Use arrow keys to navigate between cells.';
		return desc;
	});

	const statusMessage = computed(() => {
		if (props.loading) return props.loadingLabel;
		const total = props.renderPaginationInBackEnd ? props.numberOfItems : props.items?.length || 0;
		const pageInfo = `Showing ${min.value} to ${max.value} of ${total} items`;
		let message = pageInfo;
		
		if (props.enableSelection && selectedCount.value > 0) {
			message += `. ${selectedCount.value} of ${total} items selected`;
		}
		
		if (sortByName.value) {
			const header = props.headers.find(h => h.value === sortByName.value);
			const sortDirection = sortDesc.value[sortByName.value] ? 'ascending' : 'descending';
			message += `. Sorted by ${header?.label || sortByName.value} ${sortDirection}`;
		}
		
		return message + '.';
	});

	const sortByName = ref(props.options?.sortBy || "");
	// Use shallowRef for large arrays to avoid deep reactivity overhead
	const pagedItems = shallowRef<(T & BTableItem)[]>(props.items || []);
	// Use shallowRef for complex objects that don't need deep reactivity
	const sortDesc = shallowRef<Record<string, boolean>>(getAllHeaderKeys());
	const itemsPerPageHolder = ref(props.itemsPerPage || 10);
	const pageHolder = ref(props.page || 1);
	// Mark static array as raw to prevent reactivity
	const listPerPage = markRaw([5, 10, 20, 50, 100]);
	const allSelected = ref(false);

	const numberPage = computed((): number => {
		if (props.renderPaginationInBackEnd) {
			return Math.ceil(props.numberOfItems / itemsPerPageHolder.value);
		}

		return Math.ceil(props.items?.length / itemsPerPageHolder.value);
	});
	const min = computed((): number =>
		pageHolder.value === 1
			? 1
			: (pageHolder.value - 1) * itemsPerPageHolder.value + 1
	);
	const max = computed(
		(): number =>
			(pageHolder.value - 1) * itemsPerPageHolder.value +
			pagedItems.value.length
	);
	const total = computed((): number =>
		props.renderPaginationInBackEnd
			? props.numberOfItems
			: props.items?.length || 0
	);
	const colspan = computed((): number => {
		let colspan = props.headers.length;
		if (props.enableSelection) colspan++;
		if (props.enableAggregation) colspan++;
		if (slots.actions) colspan++;
		return colspan;
	});

	onBeforeMount(() => {
		if (props.renderPaginationInBackEnd) return;

		if (sortByName.value) {
			sortBy(sortByName.value, props.options?.sortDesc);
		} else {
			pageItems(props.page, props.itemsPerPage);
		}
	});

	watch(
		() => props.itemsPerPage,
		(newValue) => {
			changeItemsPerPage(newValue, false);
		}
	);

	watch(
		() => props.page,
		(newValue) => {
			changePage(newValue, false);
		}
	);

	// Optimized watcher to avoid deep watching large arrays
	watch(
		() => props.items,
		(newItems) => {
			// Use shallow assignment since pagedItems is now shallowRef
			pagedItems.value = newItems || [];

			if (!props.renderPaginationInBackEnd) {
				// Use nextTick to batch DOM updates
				nextTick(() => {
					sortBy(sortByName.value, sortDesc.value[sortByName.value], false);
				});
			}
		},
		{ immediate: true }
	);

	/**
	 * Initializes sort state for all headers
	 */
	function getAllHeaderKeys(): Record<string, boolean> {
		const result: Record<string, boolean> = {};
		props.headers.forEach((header: BTableHeader) => {
			if (header.value == sortByName.value) {
				result[header.value] = !!props.options?.sortDesc;
			} else {
				result[header.value] = false;
			}
		});
		return result;
	}

	/**
	 * Changes the current page
	 */
	function changePage(page: number, emitEvent = true): void {
		pageHolder.value = page;
		if (emitEvent) emit("update:page", page);
		pageItems(page, itemsPerPageHolder.value);
	}

	/**
	 * Changes the number of items per page
	 */
	function changeItemsPerPage(itemsPerPage: number, emitEvent = true): void {
		itemsPerPageHolder.value = itemsPerPage || 10;
		pageHolder.value = 1;

		if (emitEvent) emit("update:itemsPerPage", itemsPerPage);
		emit("update:page", 1);

		sortBy(sortByName.value, sortDesc.value[sortByName.value]);
	}

	/**
	 * Optimized sorting function with better performance for large datasets
	 */
	function sortBy(key: string, isSortDesc = true, emitEvent = true): void {
		const header = props.headers.find(h => h.value === key);
		const direction = isSortDesc ? 'ascending' : 'descending';
		
		// Announce sort change if triggered by user interaction
		if (emitEvent && header) {
			screenReader.announcePolitely(`Sorting by ${header.label || key} ${direction}`);
		}
		if (props.renderPaginationInBackEnd) {
			if (emitEvent) emit("sortBy", key, isSortDesc);
		} else {
			sortByName.value = key;
			// Create new sorted array instead of mutating original
			if (props.items) {
				const sorted = [...props.items].sort((a: T & BTableItem, b: T & BTableItem) => {
					const valueA = a[key];
					const valueB = b[key];

					// Optimized type checking and comparison
					if (valueA == null && valueB == null) return 0;
					if (valueA == null) return isSortDesc ? -1 : 1;
					if (valueB == null) return isSortDesc ? 1 : -1;

					const typeA = typeof valueA;
					const typeB = typeof valueB;

					if (typeA === "string" && typeB === "string") {
						const result = valueA.localeCompare(valueB, undefined, { numeric: true });
						return isSortDesc ? result : -result;
					} else if (typeA === "number" && typeB === "number") {
						return isSortDesc ? valueA - valueB : valueB - valueA;
					} else if (valueA instanceof Date && valueB instanceof Date) {
						const result = valueA.getTime() - valueB.getTime();
						return isSortDesc ? result : -result;
					} else {
						// Fallback to string comparison
						const strA = String(valueA);
						const strB = String(valueB);
						const result = strA.localeCompare(strB, undefined, { numeric: true });
						return isSortDesc ? result : -result;
					}
				});
				pagedItems.value = sorted;
			}
		}
		nextTick(() => {
			pageItems(pageHolder.value, itemsPerPageHolder.value);
		});
	}

	/**
	 * Handles pagination - either emits event for backend or slices array for frontend
	 */
	function pageItems(page: number, itemsPerPage: number): void {
		if (props.renderPaginationInBackEnd) {
			emit("pageItems", page, itemsPerPage);
		} else {
			const startIndex = (page - 1) * itemsPerPage;
			const endIndex = startIndex + itemsPerPage;
			pagedItems.value = props.items?.slice(startIndex, endIndex) || [];
		}
	}

	/**
	 * Selects or deselects all items
	 */
	function selectAll(value: boolean): void {
		emit("selectAll", value);
		props.items?.forEach((item: T & BTableItem) => {
			item.selected = value;
		});
		pagedItems.value = props.items ? [...props.items] : [];
		allSelected.value = value;
		
		// Announce selection change to screen readers
		const count = props.items?.length || 0;
		const message = value 
			? `Selected all ${count} items` 
			: `Deselected all items`;
		screenReader.announcePolitely(message);
	}

	/**
	 * Handles individual row selection
	 */
	function toggleRowSelection(item: any, index: number): void {
		item.selected = !item.selected;
		emit('row-select', item as T & BTableItem, index, item.selected);
		
		// Update select all checkbox state
		const selectedCount = props.items?.filter(item => item.selected).length || 0;
		allSelected.value = selectedCount === props.items?.length;
		
		// Announce selection change
		const message = item.selected 
			? `Selected row ${index + 1}` 
			: `Deselected row ${index + 1}`;
		screenReader.announcePolitely(message);
	}

	// Keyboard navigation functions
	function handleTableKeyDown(e: KeyboardEvent): void {
		keyboardMode.value = true;
		
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				navigateRow(1);
				break;
				
			case 'ArrowUp':
				e.preventDefault();
				navigateRow(-1);
				break;
				
			case 'ArrowLeft':
				e.preventDefault();
				navigateColumn(-1);
				break;
				
			case 'ArrowRight':
				e.preventDefault();
				navigateColumn(1);
				break;
				
			case 'Home':
				e.preventDefault();
				if (e.ctrlKey) {
					// Ctrl+Home: Go to first cell
					focusedRowIndex.value = 0;
					focusedColIndex.value = 0;
				} else {
					// Home: Go to first column in current row
					focusedColIndex.value = 0;
				}
				updateTableFocus();
				break;
				
			case 'End':
				e.preventDefault();
				if (e.ctrlKey) {
					// Ctrl+End: Go to last cell
					focusedRowIndex.value = pagedItems.value.length - 1;
					focusedColIndex.value = props.headers.length - 1;
				} else {
					// End: Go to last column in current row
					focusedColIndex.value = props.headers.length - 1;
				}
				updateTableFocus();
				break;
				
			case 'Enter':
			case ' ':
				e.preventDefault();
				if (focusedRowIndex.value >= 0 && focusedColIndex.value >= 0) {
					const item = pagedItems.value[focusedRowIndex.value];
					// If row selection is enabled and we're on a data cell, toggle selection
					if (props.enableSelection) {
						toggleRowSelection(item, focusedRowIndex.value);
					} else {
						emit('row-click', item, focusedRowIndex.value);
					}
				}
				break;
		}
	}

	function navigateRow(delta: number): void {
		const newIndex = Math.max(0, Math.min(pagedItems.value.length - 1, focusedRowIndex.value + delta));
		if (newIndex !== focusedRowIndex.value) {
			focusedRowIndex.value = newIndex;
			updateTableFocus();
			announceCellFocus();
		}
	}

	function navigateColumn(delta: number): void {
		const newIndex = Math.max(0, Math.min(props.headers.length - 1, focusedColIndex.value + delta));
		if (newIndex !== focusedColIndex.value) {
			focusedColIndex.value = newIndex;
			updateTableFocus();
			announceCellFocus();
		}
	}

	function updateTableFocus(): void {
		if (focusedRowIndex.value >= 0 && focusedColIndex.value >= 0) {
			emit('row-focus', pagedItems.value[focusedRowIndex.value], focusedRowIndex.value);
		}
	}

	function announceCellFocus(): void {
		if (focusedRowIndex.value >= 0 && focusedColIndex.value >= 0) {
			const item = pagedItems.value[focusedRowIndex.value];
			const header = props.headers[focusedColIndex.value];
			const value = item[header.value];
			const message = `Row ${focusedRowIndex.value + 1}, ${header.label || header.value}: ${value}`;
			screenReader.announcePolitely(message);
			
			// Emit cell focus event for external handling
			emit('cell-focus', item, focusedRowIndex.value, focusedColIndex.value, header);
		}
	}

	function handleHeaderKeyDown(e: KeyboardEvent, header: BTableHeader): void {
		if ((e.key === 'Enter' || e.key === ' ') && header.sortable) {
			e.preventDefault();
			const newSortDesc = !sortDesc.value[header.value];
			sortBy(header.value, newSortDesc);
			
			// Announce sort change
			const direction = newSortDesc ? 'descending' : 'ascending';
			screenReader.announcePolitely(`Sorted by ${header.label || header.value} ${direction}`);
		}
	}

	function handleMouseInteraction(): void {
		keyboardMode.value = false;
		focusedRowIndex.value = -1;
		focusedColIndex.value = -1;
	}
</script>

<template>
	<div 
		ref="tableRef"
		role="region"
		:aria-label="tableAriaLabel"
		:aria-describedby="tableDescription ? descriptionId : undefined"
		class="b-table"
		:class="{ 'header-fixed-table': isHeaderFixed, 'no-shadow': noShadow }"
		v-bind="busyAriaAttrs"
		@click="handleMouseInteraction"
		@mousedown="handleMouseInteraction">
		
		<!-- Screen reader status announcements -->
		<div :id="statusId" aria-live="polite" aria-atomic="true" class="sr-only">
			{{ statusMessage }}
		</div>
		
		<!-- Hidden description for screen readers -->
		<div v-if="tableDescription" :id="descriptionId" class="sr-only">
			{{ tableDescription }}
		</div>
		
		<table 
			:id="tableId"
			class="b-table-style"
			role="table"
			:aria-label="tableAriaLabel"
			:aria-describedby="captionId"
			:aria-rowcount="totalAriaRowCount"
			:aria-colcount="props.headers.length"
			tabindex="0"
			@keydown="handleTableKeyDown">
			<!-- Table caption for screen readers -->
			<caption v-if="caption" :id="captionId" class="sr-only">
				{{ caption }}
			</caption>
			
			<thead v-if="!loading">
				<tr role="row">
					<th
						v-if="enableAggregation"
						:disabled="!pagedItems.length"
						class="first-th pointer-events-none"
						:style="{ width: '2%' }" />
					<th
						v-if="enableSelection"
						:disabled="!pagedItems.length"
						class="hover:bg-neutral-surface-default"
						:class="{ 'first-th': !enableAggregation }"
						:style="{ width: '2%' }"
						role="columnheader"
						aria-label="Select all rows">
						<BCheckbox
							v-model="allSelected"
							:indeterminate="isIndeterminate"
							aria-label="Select all rows"
							:aria-description="`${selectedCount} of ${props.items?.length || 0} rows selected`"
							@update:model-value="selectAll" />
					</th>
					<th
						v-for="(header, index) in headers"
						:key="index"
						role="columnheader"
						:aria-label="header.ariaLabel || header.label"
						:aria-sort="sortByName === header.value ? (sortDesc[header.value] ? 'ascending' : 'descending') : (header.sortable ? 'none' : undefined)"
						:aria-describedby="header.ariaDescription ? `${tableId}-header-${index}-desc` : undefined"
						:tabindex="header.sortable ? 0 : -1"
						class="cursor-pointer"
						:class="{
							'first-th': index === 0 && !enableSelection && !enableAggregation,
							'last-th': !headers[index + 1] && !$slots.actions,
							'pointer-events-none': !header.sortable,
						}"
						:style="{ width: header.width ? header.width : 'fit-content' }"
						@click="header.sortable && sortBy(
							header.value,
							(sortDesc[header.value] = !sortDesc[header.value])
						)"
						@keydown="(e) => handleHeaderKeyDown(e, header)">
						<!-- Hidden description for complex headers -->
						<div v-if="header.ariaDescription" :id="`${tableId}-header-${index}-desc`" class="sr-only">
							{{ header.ariaDescription }}
						</div>
						
						<div
							class="flex w-full items-center gap-xs text-neutral-interaction-default"
							:style="{
								'justify-content': header.align ? header.align : 'flex-start',
							}">
							<p class="truncate">{{ header.label }}</p>
							<span
								v-if="header.sortable"
								class="icon"
								:class="{
									'rotate-180': sortDesc[header.value],
									'icon-active': header.value == sortByName,
								}"
								aria-hidden="true">
								<BIcon name="arrow_upward" />
							</span>
						</div>
					</th>
					<th
						v-if="$slots.actions"
						style="flex: 1"
						class="bg-white pointer-events-none"
						role="columnheader"
						aria-label="Actions" />
				</tr>
			</thead>
			<thead v-else>
				<tr>
					<th
						v-for="header in colspan || 3"
						:key="header"
						class="skeleton-table-cell">
						<div class="skeleton-table-div" />
					</th>
				</tr>
			</thead>
			<tbody v-if="loading || !pagedItems.length">
				<tr
					v-if="loading"
					v-for="index in 10"
					:key="index"
					role="row"
					:aria-rowindex="index">
					<td
						v-for="header in colspan || 3"
						:key="header"
						class="skeleton-table-cell">
						<div class="skeleton-table-div" />
					</td>
					<td
						v-if="$slots.actions"
						class="skeleton-table-cell">
						<div class="skeleton-table-div" />
					</td>
				</tr>
				<tr v-else-if="!pagedItems.length" role="row">
					<td colspan="100%" role="cell" class="text-center py-lg">
						<slot name="empty-state">
							<p>No data available</p>
						</slot>
					</td>
				</tr>
			</tbody>
			<tbody v-else ref="tableBodyRef">
				<!-- Virtual scrolling container -->
				<tr v-if="virtualized">
					<td :colspan="colspan" style="padding: 0;">
						<div 
							ref="virtualScrollContainer" 
							v-bind="virtualContainerProps" 
							:style="{ height: `${containerHeight}px`, overflow: 'auto' }"
							role="rowgroup"
							:aria-label="`Virtual scrolled table content showing ${visibleRowIndices.length} of ${totalAriaRowCount - 1} rows`">
							<div v-bind="virtualWrapperProps">
								<table class="w-full" role="presentation">
									<tbody>
										<template v-for="{ data: item, index } in displayItems" :key="`virtual-${index}`">
											<tr
												role="row"
												:aria-rowindex="index + 2"
												:aria-selected="props.enableSelection ? item.selected : undefined"
												tabindex="-1"
												class="*:py-3 *:px-5 text-neutral-foreground-low transition-colors"
												:class="{ 
													'hover:bg-primary-surface-default': hasHover,
													'keyboard-focus': keyboardMode && focusedRowIndex === index,
													'bg-primary-surface-highlight': item.selected && props.enableSelection
												}"
												:style="{ height: `${rowHeight}px` }"
												@click="emit('row-click', item, index)"
												@focus="emit('row-focus', item, index)">
												<td v-if="enableAggregation" role="cell">
													<slot
														name="aggregation"
														:item="item"
														:index="index" />
												</td>
												<td v-if="enableSelection" role="cell">
													<slot
														name="select"
														:item="item"
														:index="index"
														:toggle-selection="() => toggleRowSelection(item, index)">
														<BCheckbox
															v-model="item.selected"
															:aria-label="`Select row ${index + 1}`"
															@update:model-value="toggleRowSelection(item, index)" />
													</slot>
												</td>
												<td 
													v-for="(header, headerIndex) in headers"
													:key="header.value"
													role="cell"
													:aria-label="header.numeric ? `${header.label || header.value}: ${item[header.value]}` : undefined"
													:aria-describedby="header.ariaDescription ? `${tableId}-cell-${index}-${headerIndex}-desc` : undefined"
													tabindex="-1"
													class="transition-colors focus:outline-none"
													:class="{ 
														'keyboard-focus-cell': keyboardMode && focusedRowIndex === index && focusedColIndex === headerIndex,
														'text-center': header.align === 'center',
														'text-right': header.align === 'right'
													}">
													<!-- Hidden description for complex cells -->
													<div v-if="header.ariaDescription" :id="`${tableId}-cell-${index}-${headerIndex}-desc`" class="sr-only">
														{{ header.ariaDescription }}
													</div>
													<slot
														:name="header.value"
														:item="item"
														:index="index"
														:header="header">
														{{ item[header.value] }}
													</slot>
												</td>
												<td v-if="$slots.actions" role="cell">
													<slot
														name="actions"
														:item="item"
														:index="index" />
												</td>
											</tr>
											<slot
												name="childs"
												:item="item"
												:index="index"
												v-if="item.expanded" />
										</template>
									</tbody>
								</table>
							</div>
						</div>
					</td>
				</tr>
				<!-- Regular non-virtualized rows -->
				<template v-else v-for="(item, index) in displayItems" :key="index">
					<tr
						role="row"
						:aria-rowindex="(pageHolder - 1) * itemsPerPageHolder + index + 2"
						:aria-selected="props.enableSelection ? item.selected : undefined"
						tabindex="-1"
						class="*:py-3 *:px-5 text-neutral-foreground-low transition-colors"
						:class="{ 
							'hover:bg-primary-surface-default': hasHover,
							'keyboard-focus': keyboardMode && focusedRowIndex === index,
							'bg-primary-surface-highlight': item.selected && props.enableSelection
						}"
						@click="emit('row-click', item, index)"
						@focus="emit('row-focus', item, index)">
						<td v-if="enableAggregation" role="cell">
							<slot
								name="aggregation"
								:item="item"
								:index="index" />
						</td>
						<td v-if="enableSelection" role="cell">
							<slot
								name="select"
								:item="item"
								:index="index"
								:toggle-selection="() => toggleRowSelection(item, index)">
								<BCheckbox
									v-model="item.selected"
									:aria-label="`Select row ${index + 1}`"
									@update:model-value="toggleRowSelection(item, index)" />
							</slot>
						</td>
						<td 
							v-for="(header, headerIndex) in headers"
							:key="header.value"
							role="cell"
							:aria-label="header.numeric ? `${header.label || header.value}: ${item[header.value]}` : undefined"
							:aria-describedby="header.ariaDescription ? `${tableId}-cell-${index}-${headerIndex}-desc` : undefined"
							tabindex="-1"
							class="transition-colors focus:outline-none"
							:class="{ 
								'keyboard-focus-cell': keyboardMode && focusedRowIndex === index && focusedColIndex === headerIndex,
								'text-center': header.align === 'center',
								'text-right': header.align === 'right'
							}">
							<!-- Hidden description for complex cells -->
							<div v-if="header.ariaDescription" :id="`${tableId}-cell-${index}-${headerIndex}-desc`" class="sr-only">
								{{ header.ariaDescription }}
							</div>
							<slot
								:name="header.value"
								:item="item"
								:index="index"
								:header="header">
								{{ item[header.value] }}
							</slot>
						</td>
						<td v-if="$slots.actions" role="cell">
							<slot
								name="actions"
								:item="item"
								:index="index" />
						</td>
					</tr>
					<slot
						name="childs"
						:item="item"
						:index="index"
						v-if="item.expanded" />
				</template>
			</tbody>
			<tfoot v-if="$slots.footer">
				<slot name="footer" />
			</tfoot>
		</table>
	</div>
	<footer
		class="flex items-center justify-between mt-base text-neutral-foreground-low flex-wrap"
		v-if="!hideFooter">
		<div class="flex items-center gap-xs">
			<p class="text-sm">
				<slot name="items-per-page"> Items per page </slot>
			</p>
			<BSelect
				v-model="itemsPerPageHolder"
				:items="listPerPage"
				absolute
				@update:model-value="changeItemsPerPage">
				{{ itemsPerPageHolder }}
			</BSelect>
		</div>
		<BPagination
			v-model="pageHolder"
			:length="numberPage"
			@update:model-value="changePage" />
		<div>
			<p class="text-sm">
				<slot
					name="showing-page"
					:min="min"
					:max="max"
					:total="total">
					Showing {{ min }}-{{ max }} of {{ total }}
				</slot>
			</p>
		</div>
	</footer>
</template>

<style scoped>
	@import "../../assets/main.css";
	.b-table {
		@apply min-w-full max-w-full overflow-x-auto rounded-xl bg-neutral-surface-default border-xxs border-neutral-border-default;
		box-shadow: var(--box-shadow-neutral-selected);
	}

	.b-table.no-shadow {
		@apply shadow-none border-none;
	}

	.b-table.header-fixed-table {
		@apply overflow-y-auto max-h-[35em];

		.b-table-style thead {
			@apply bg-white top-0 sticky;
		}
	}

	.icon {
		@apply h-fit w-fit flex items-center transition-transform ease-in-out duration-300;

		.b-icon {
			@apply text-lg;
		}
	}

	.b-table-style {
		@apply w-full rounded-xl bg-neutral-surface-default;

		thead {
			@apply border-b-xxs border-neutral-border-default;
		}

		tbody {
			@apply divide-y-xxs divide-neutral-border-default w-full;
		}

		tr {
			@apply rounded-xl;
		}

		th {
			@apply py-4 px-5 hover:bg-neutral-surface-highlight;

			.icon.icon-active {
				@apply text-primary-interaction-default opacity-100;
			}

			.icon {
				@apply opacity-0;
				transition: opacity 0.2s ease, transform 0.3s ease;
			}
		}

		th:hover .icon {
			@apply opacity-100;
		}
	}

	.first-th {
		@apply rounded-ss-xl;
	}

	.last-th {
		@apply rounded-se-xl;
	}

	.skeleton-table-cell {
		@apply p-base;
	}

	.skeleton-table-div {
		@apply bg-neutral-surface-disabled h-[14px] w-full bg-linear-to-r from-transparent via-neutral-surface-default to-transparent;
		background-size: 200% 100%;
		animation: moveBar 1.5s linear infinite;
	}

	@keyframes moveBar {
		0% {
			background-position: -100% 0;
		}
		100% {
			background-position: 100% 0;
		}
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

	/* Keyboard navigation focus styles */
	.b-table-style:focus {
		@apply outline-none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
	}

	.b-table-style th:focus {
		@apply outline-none;
		background-color: var(--color-primary-surface-highlight);
		box-shadow: inset 0 0 0 2px var(--color-primary-interaction-default);
	}

	.b-table-style tr.keyboard-focus {
		@apply bg-primary-surface-highlight;
		box-shadow: inset 0 0 0 2px var(--color-primary-interaction-default);
	}

	.b-table-style td.keyboard-focus-cell {
		@apply bg-primary-surface-default;
		box-shadow: inset 0 0 0 2px var(--color-primary-interaction-default);
	}

	/* Enhanced hover states for accessibility */
	.b-table-style th[role="columnheader"][tabindex="0"]:hover {
		@apply bg-primary-surface-highlight;
		transform: translateY(-1px);
	}

	.b-table-style th[role="columnheader"][tabindex="0"] {
		transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;
	}

	.b-table-style tr[role="row"] {
		transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;
	}

	.b-table-style tr[role="row"]:hover {
		transform: translateY(-1px);
	}

	/* High contrast focus indicators for better accessibility */
	.b-table-style:focus-visible {
		@apply outline-none;
		box-shadow: 0 0 0 3px var(--color-primary-interaction-default);
		border-radius: calc(var(--radius-base) + 3px);
	}

	.b-table-style th[role="columnheader"]:focus-visible {
		@apply outline-none;
		background-color: var(--color-primary-surface-highlight);
		box-shadow: inset 0 0 0 3px var(--color-primary-interaction-default);
		border-radius: var(--radius-xs);
	}

	/* Improved visual hierarchy for selected rows */
	.b-table-style tr[role="row"][aria-selected="true"] {
		@apply bg-primary-surface-highlight;
		box-shadow: inset 4px 0 0 var(--color-primary-interaction-default);
	}

	.b-table-style tr[role="row"][aria-selected="true"]:hover {
		@apply bg-primary-surface-default;
		box-shadow: inset 4px 0 0 var(--color-primary-interaction-default), 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	/* Enhanced cell focus indicators */
	.b-table-style td:focus-visible {
		@apply outline-none;
		background-color: var(--color-primary-surface-default);
		box-shadow: inset 0 0 0 2px var(--color-primary-interaction-default);
		border-radius: var(--radius-xs);
		position: relative;
		z-index: 1;
	}

	/* Loading state improvements */
	.b-table-style[aria-busy="true"] {
		opacity: 0.8;
		position: relative;
	}

	.b-table-style[aria-busy="true"]::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
		animation: loading-shimmer 1.5s infinite;
		pointer-events: none;
	}

	@keyframes loading-shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}

	/* Reduced motion preferences */
	@media (prefers-reduced-motion: reduce) {
		.b-table-style,
		.b-table-style *,
		.b-table-style th[role="columnheader"][tabindex="0"],
		.b-table-style tr[role="row"] {
			transition: none !important;
			transform: none !important;
			animation: none !important;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.b-table-style {
			border: 2px solid;
		}

		.b-table-style th {
			border-bottom: 2px solid;
		}

		.b-table-style td {
			border-right: 1px solid;
		}

		.b-table-style tr.keyboard-focus,
		.b-table-style td.keyboard-focus-cell {
			outline: 3px solid;
			outline-offset: 2px;
		}
	}
</style>
