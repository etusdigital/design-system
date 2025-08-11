<script setup lang="ts">
	import { onBeforeMount, computed, ref, watch, onMounted } from "vue";
	import { useOptionalModel } from "#composables";
	import { useTreeNavigation, type TreeNode } from "#composables/useTreeNavigation";
	import { useAriaAttributes } from "#composables/useAriaAttributes";
	import { useScreenReader } from "#composables/useScreenReader";
	import { checkPath, isObject } from "../../utils";
	import { type Item as ItemType, type BSideMenuAccessibilityConfig } from "../../utils/types/MenuItem";
	import Item from "./Item.vue";

	const props = withDefaults(
		defineProps<{
			modelValue?: string | ItemType;
			items: ItemType[];
			parentPath?: string;
			getObject?: boolean;
			accessibilityConfig?: BSideMenuAccessibilityConfig;
			multiSelect?: boolean;
			label?: string;
			autoExpand?: boolean;
		}>(),
		{
			modelValue: undefined,
			getObject: false,
			parentPath: "",
			accessibilityConfig: () => ({}),
			multiSelect: false,
			label: "Navigation menu",
			autoExpand: true,
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: string | ItemType];
		"focus-change": [nodeId: string | null];
		"selection-change": [selectedIds: string[]];
		"expansion-change": [expandedIds: string[]];
		"skip-navigation": [];
	}>();

	const [model] = useOptionalModel<string | ItemType>(props, "modelValue", emit, "");

	const containerRef = ref<HTMLElement | null>(null);
	const { useAriaId, useNavigationAria } = useAriaAttributes();
	const { announcePolitely } = useScreenReader();

	const treeId = useAriaId('side-menu-tree');

	const computedHeight = computed((): string => {
		if (
			document.readyState === "complete" ||
			document.readyState === "interactive"
		) {
			const navBarHeight = document.querySelector(".b-navbar")?.clientHeight;
			return navBarHeight ? `calc(100vh - ${navBarHeight}px)` : "100vh";
		}
		return "100vh";
	});

	function convertToTreeNode(item: ItemType, level: number = 0, parentId?: string): TreeNode {
		const nodeId = `${parentId ? parentId + '-' : ''}${item.value}`;
		return {
			id: nodeId,
			label: item.label,
			value: item.value,
			level,
			expanded: item.expanded,
			selected: item.selected,
			disabled: item.disabled,
			parentId,
			children: item.items?.map(child => convertToTreeNode(child, level + 1, nodeId))
		};
	}

	// Convert menu items to tree nodes
	const treeNodes = ref<TreeNode[]>([]);
	
	// Update tree nodes when items change
	watch(() => props.items, (newItems) => {
		treeNodes.value = newItems.map(item => convertToTreeNode(item));
	}, { immediate: true, deep: true });

	// Tree navigation setup
	const {
		focusedNodeId,
		selectedNodeIds,
		expandedNodeIds,
		flatNodes,
		focusableNodes,
		focusedNode,
		focusNode,
		handleKeydown,
		getTreeAria,
		getTreeItemAria,
		selectNode,
		toggleExpansion
	} = useTreeNavigation(treeNodes, {
		announce: props.accessibilityConfig.announceNavigation !== false,
		autoExpand: props.autoExpand,
		multiSelect: props.multiSelect
	});

	// Navigation ARIA attributes  
	const navigationAria = useNavigationAria(
		computed(() => typeof model.value === 'string' ? model.value : (model.value as any)?.value),
		props.label
	);

	onBeforeMount(() => {
		const pathItem = getPaths(props.items, props.parentPath).find((item) =>
			checkPath(item.path)
		);
		if (pathItem) {
			// Find the actual ItemType from props.items that matches the value
			const actualItem = props.items.find(item => item.value === pathItem.value);
			if (actualItem) changeModel(actualItem);
		}
	});

	function getPaths(
		items: ItemType[],
		parentPath: string = ""
	): { path: string; value: string }[] {
		const result: { path: string; value: string }[] = [];

		for (const item of items) {
			const currentPath = parentPath ? `${parentPath}/${item.path}` : item.path;

			if (item.items?.length) {
				result.push(...getPaths(item.items, currentPath));
			} else {
				result.push({ path: currentPath || "", value: item.value });
			}
		}
		return result;
	}

	function changeSelected(items: ItemType[], value: string): boolean {
		let selected = false;
		for (const item of items) {
			if (item.items && item.items.length)
				item.selected = changeSelected(item.items, value);
			else item.selected = item.value == value;

			if (item.selected) selected = true;
		}
		return selected;
	}

	function changeModel(item: string | ItemType) {
		if (typeof item === 'string') {
			// Find the ItemType that matches this string value
			const actualItem = props.items.find(menuItem => menuItem.value === item);
			if (actualItem) {
				const value = props.getObject ? actualItem : getValue(actualItem);
				model.value = value;
				changeSelected(props.items, item);
				emit("update:modelValue", value);
				
				// Update tree selection
				const nodeId = findNodeIdByValue(item);
				if (nodeId) {
					selectNode(nodeId);
				}
			}
		} else {
			const value = props.getObject ? item : getValue(item);
			model.value = value;
			const itemValue = typeof value === 'string' ? value : value.value;
			changeSelected(props.items, itemValue);
			emit("update:modelValue", value);
			
			// Update tree selection
			const nodeId = findNodeIdByValue(itemValue);
			if (nodeId) {
				selectNode(nodeId);
			}
		}
	}

	function findNodeIdByValue(value: string): string | null {
		const node = flatNodes.value.find(n => n.value === value);
		return node?.id || null;
	}

	function handleMenuKeydown(event: KeyboardEvent): void {
		const handled = handleKeydown(event);
		if (handled) {
			// Additional handling if needed
		}
	}

	function handleItemAction(item: ItemType): void {
		const nodeId = findNodeIdByValue(item.value);
		if (!nodeId) return;
		
		if (item.items && item.items.length > 0) {
			// Toggle expansion for parent items
			toggleExpansion(nodeId);
		} else {
			// Select leaf items
			selectNode(nodeId);
			changeModel(item);
		}
	}

	function getValue(item: string | ItemType): string {
		return isObject(item) ? (item as ItemType).value : (item as string);
	}

	// Note: Tree nodes are now watched above in the immediate watch

	// Emit events for parent components
	watch(focusedNodeId, (newFocusedId) => {
		emit('focus-change', newFocusedId);
	});

	watch(selectedNodeIds, (newSelectedIds) => {
		emit('selection-change', Array.from(newSelectedIds));
	}, { deep: true });

	watch(expandedNodeIds, (newExpandedIds) => {
		emit('expansion-change', Array.from(newExpandedIds));
	}, { deep: true });

	onMounted(() => {
		// Set initial focus if enabled
		if (props.accessibilityConfig.autoFocus !== false) {
			const firstFocusableNode = focusableNodes.value[0];
			if (firstFocusableNode) {
				focusNode(firstFocusableNode.id);
			}
		}
	});
</script>

<template>
	<nav 
		ref="containerRef"
		class="b-side-menu"
		v-bind="navigationAria"
		@keydown="handleMenuKeydown">
		
		<!-- Skip link -->
		<a 
			v-if="accessibilityConfig.showSkipLinks"
			href="#main-content" 
			class="skip-link"
			@click="$emit('skip-navigation')">
			Skip to main content
		</a>
		<!-- Screen reader instructions -->
		<div class="sr-only" :id="`${treeId}-instructions`">
			{{ accessibilityConfig.announcementPrefix || 'Navigation menu.' }}
			Use arrow keys to navigate between items. 
			Press Enter or Space to select items.
			<template v-if="flatNodes.some(n => n.children?.length)">
				Use Right arrow to expand items, Left arrow to collapse or move to parent.
				Press asterisk (*) to expand all items at current level.
			</template>
			<template v-if="multiSelect">
				Hold Ctrl and press Enter to add items to selection.
			</template>
			<template v-if="accessibilityConfig.announceLevels !== false">
				Level information is announced for nested items.
			</template>
		</div>
		
		<!-- Tree container -->
		<div 
			:id="treeId"
			v-bind="getTreeAria()"
			:aria-describedby="`${treeId}-instructions`"
			class="b-side-menu__tree">
			<Item
				v-for="item in items"
				v-model="model"
				v-model:selected="item.selected"
				:key="item.value"
				:item="item"
				:get-object="getObject"
				:parent-path="parentPath"
				:focused-node-id="focusedNodeId"
				:selected-node-ids="selectedNodeIds"
				:expanded-node-ids="expandedNodeIds"
				:get-tree-item-aria="getTreeItemAria"
				:tree-id="treeId"
				@update:model-value="changeModel"
				@item-action="handleItemAction" />
		</div>
	</nav>
</template>

<style scoped>
	@import "../../assets/main.css";
	.b-side-menu {
		@apply flex flex-col gap-3 w-fit py-5 px-3 bg-default border-r-xxs border-r-neutral-border-default;
		height: v-bind(computedHeight);
	}

	.b-side-menu__tree {
		@apply flex flex-col gap-sm;
	}

	/* Screen reader only content */
	.sr-only {
		@apply absolute -left-[10000px] w-px h-px overflow-hidden;
		clip: rect(0, 0, 0, 0);
		clip-path: inset(50%);
		white-space: nowrap;
	}

	/* Skip link for keyboard navigation */
	.skip-link {
		@apply absolute -top-full left-4 bg-primary-interaction-default text-white px-4 py-2 rounded transition-all;
		z-index: 1000;
	}

	.skip-link:focus {
		@apply top-4;
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.b-side-menu {
			@apply border-r-2;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.b-side-menu * {
			transition: none !important;
		}
	}

	.items-container {
		@apply flex flex-col gap-sm;
	}
</style>
