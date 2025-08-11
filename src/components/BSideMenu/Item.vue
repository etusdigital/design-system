<script setup lang="ts">
	import { useOptionalModel } from "#composables";
	import { type Item } from "../../utils/types/MenuItem";
	import MenuOption from "../../utils/components/MenuOption.vue";
	import BIcon from "../BIcon/BIcon.vue";
	import { computed, resolveComponent } from "vue";
	import { isObject } from "../../utils";
	import type { TreeNode } from "#composables/useTreeNavigation";

	const props = withDefaults(
		defineProps<{
			modelValue?: string | Item;
			item: Item;
			getObject?: boolean;
			parentPath?: string;
			selected?: boolean;
			bold?: boolean;
			focusedNodeId?: string | null;
			selectedNodeIds?: Set<string>;
			expandedNodeIds?: Set<string>;
			getTreeItemAria?: (nodeId: string) => Record<string, any>;
			treeId?: string;
		}>(),
		{
			modelValue: undefined,
			getObject: false,
			parentPath: "",
			selected: false,
			bold: false,
			focusedNodeId: null,
			selectedNodeIds: () => new Set(),
			expandedNodeIds: () => new Set(),
			getTreeItemAria: () => () => ({}),
			treeId: '',
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: string | Item];
		"update:selected": [value: boolean, item?: Item];
		"item-action": [item: Item];
	}>();

	const [model] = useOptionalModel<string | Item>(props, "modelValue", emit, "");

	const path = computed(() => {
		let path = props.parentPath;
		if (props.item.path) {
			if (!path.endsWith("/") && !props.item.path.startsWith("/")) path += "/";
			else if (path.endsWith("/") && props.item.path.startsWith("/"))
				path = path.slice(0, -1);
			path += props.item.path;
		}
		return path;
	});

	const isSelected = computed(() => {
		return props.item.value == getValue(model.value) || props.selected;
	});

	// Generate node ID for this item
	const nodeId = computed(() => {
		return `${props.parentPath ? props.parentPath.replace(/\//g, '-') + '-' : ''}${props.item.value}`;
	});

	// Check if this item is currently focused
	const isFocused = computed(() => {
		return props.focusedNodeId === nodeId.value;
	});

	// Check if this item is selected in tree navigation
	const isTreeSelected = computed(() => {
		return props.selectedNodeIds?.has(nodeId.value) || false;
	});

	// Check if this item is expanded
	const isExpanded = computed(() => {
		return props.expandedNodeIds?.has(nodeId.value) || props.item.expanded || false;
	});

	// Get ARIA attributes for this tree item
	const treeItemAria = computed(() => {
		const baseAria = props.getTreeItemAria ? props.getTreeItemAria(nodeId.value) : {};
		
		// Add aria-current for currently selected page/item
		const ariaCurrent = isSelected.value ? 'page' : undefined;
		
		return {
			...baseAria,
			'aria-current': ariaCurrent,
		};
	});

	function changeModel(item: Item) {
		// Emit item action for tree navigation handling
		emit('item-action', item);

		// Handle legacy model changes
		if (item.items && item.items.length) {
			item.expanded = !item.expanded;
			return;
		}

		const value = props.getObject ? item : getValue(item);
		model.value = value;
		emit("update:modelValue", value);
	}

	function handleKeydown(event: KeyboardEvent) {
		// Let parent handle tree navigation
		// This prevents duplicate event handling
		if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', ' '].includes(event.key)) {
			return;
		}
	}

	function handleClick(event: MouseEvent) {
		// Focus this item when clicked for keyboard navigation
		const element = event.currentTarget as HTMLElement;
		element.focus();
		changeModel(props.item);
	}

	function getValue(item: string | Item): string {
		return isObject(item) ? (item as Item).value : (item as string);
	}

	function getLinkComponent() {
		// For accessibility, always use button for interactive elements
		// or div with proper ARIA roles for expandable items
		if (props.item.items && props.item.items.length) {
			return "button";
		}
		
		if (typeof resolveComponent("router-link") != "string")
			return "router-link";
		else if (typeof resolveComponent("nuxt-link") != "string")
			return "nuxt-link";
		
		return "button"; // Default to button for accessibility
	}
</script>

<template>
	<component
		:key="item.value"
		:is="getLinkComponent()"
		class="item"
		:class="{ 
			selected: isSelected || isTreeSelected,
			focused: isFocused,
			expanded: isExpanded,
			disabled: item.disabled
		}"
		v-bind="treeItemAria"
		:to="getLinkComponent().includes('link') ? path : undefined"
		:href="getLinkComponent() === 'button' ? undefined : path"
		:type="getLinkComponent() === 'button' ? 'button' : undefined"
		:disabled="item.disabled"
		@click="handleClick"
		@keydown="handleKeydown">
		
		<MenuOption
			class="menu-item"
			:class="{ 
				expanded: isExpanded, 
				bold: bold,
				focused: isFocused
			}"
			:label="item.label"
			:icon="item.icon"
			:selected="isSelected || isTreeSelected"
			:disabled="item.disabled"
			@click="changeModel(item)">
			
			<!-- Expand/collapse icon -->
			<BIcon
				v-if="item.items && item.items.length"
				name="keyboard_arrow_down"
				:class="{ 'rotate-180': isExpanded }"
				class="transition-transform expand-icon"
				:aria-hidden="true" />
		</MenuOption>
		
		<!-- Nested items -->
		<Transition name="expand">
			<div
				v-if="item.items && item.items.length && isExpanded"
				class="items-container"
				role="group"
				:aria-labelledby="nodeId">
				<Item
					v-for="subItem in item.items"
					v-model="model"
					v-model:selected="item.selected"
					:key="subItem.value"
					:item="subItem"
					:get-object="getObject"
					:parent-path="path"
					:focused-node-id="focusedNodeId"
					:selected-node-ids="selectedNodeIds"
					:expanded-node-ids="expandedNodeIds"
					:get-tree-item-aria="getTreeItemAria"
					:tree-id="treeId"
					@item-action="emit('item-action', $event)"
					bold />
			</div>
		</Transition>
	</component>
</template>

<style scoped>
	@import "../../assets/main.css";
	
	.item {
		@apply relative block w-full text-left border-none bg-transparent cursor-pointer;
		border-radius: var(--rounded-base);
		transition: background-color 0.2s ease, box-shadow 0.2s ease;
	}

	.item:hover:not(.disabled) {
		@apply no-underline bg-primary-surface-default;
	}

	.item:focus {
		@apply outline-none;
	}

	.item.focused {
		@apply bg-primary-surface-default;
		box-shadow: 0 0 0 2px var(--color-primary-500);
	}

	.item.selected {
		@apply bg-primary-surface-default font-medium;
	}

	.item.disabled {
		@apply opacity-50 cursor-not-allowed;
	}

	.item.disabled:hover {
		@apply bg-transparent;
	}

	.menu-item.expanded {
		@apply hover:rounded-b-none;
	}

	.menu-item.selected.bold {
		@apply font-bold;
	}

	.menu-item.focused {
		@apply font-medium;
	}

	.expand-icon {
		@apply flex-shrink-0;
	}

	.items-container {
		@apply pl-xl;
		border-bottom-left-radius: var(--rounded-sm);
		border-bottom-right-radius: var(--rounded-sm);
	}

	.expand-enter-active,
	.expand-leave-active {
		@apply transition-all duration-300 overflow-hidden;
	}

	.expand-enter-from,
	.expand-leave-to {
		@apply opacity-0 translate-y-[-10px] max-h-0;
	}

	.expand-enter-to,
	.expand-leave-from {
		@apply opacity-100 max-h-screen;
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.item.focused {
			box-shadow: 0 0 0 3px var(--color-primary-500);
			border: 2px solid var(--color-primary-500);
		}
		
		.item.selected {
			border: 2px solid var(--color-primary-700);
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.item, .expand-icon {
			transition: none !important;
		}
		
		.expand-enter-active,
		.expand-leave-active {
			transition: none !important;
		}
	}

	/* Touch-friendly interaction areas */
	@media (pointer: coarse) {
		.item {
			@apply min-h-[44px];
		}
	}
</style>
