<script setup lang="ts">
	import { ref, computed } from "vue";
	import { useOptionalModel, useAriaAttributes, useScreenReader } from "#composables";
	import { type Item } from "#utils/types/DropItem";
	import { isObject } from "../../utils";
	import Items from "./Items.vue";
	import type { BDropdownValue } from "./BDropdown.vue";

	const props = withDefaults(
		defineProps<{
			/** Current model value */
			modelValue: BDropdownValue;
			/** Whether this item is selected */
			selected: boolean | undefined;
			/** The dropdown item */
			item: Item;
			/** Whether to return full object or just value */
			getObject: boolean;
			/** Optional ID for the item */
			id?: string;
			/** Dropdown pattern: menu for actions, listbox for selections */
			pattern?: 'menu' | 'listbox';
		}>(),
		{
			modelValue: undefined,
			selected: false,
			getObject: false,
			pattern: 'listbox',
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: BDropdownValue];
		"update:selected": [value: boolean];
		"expand-submenu": [item: Item];
		"collapse-submenu": [item: Item];
	}>();

	const [model] = useOptionalModel<BDropdownValue>(props, "modelValue", emit, "");
	const [isSelected] = useOptionalModel<boolean>(
		props,
		"selected",
		emit,
		false
	);

	// Accessibility setup with pattern-aware ARIA
	const { 
		useOptionAria, 
		useMenuItemAria, 
		useExpandableAria 
	} = useAriaAttributes();
	const screenReader = useScreenReader();

	// Dynamic ARIA attributes based on pattern
	const ariaAttrs = computed(() => {
		if (props.pattern === 'menu') {
			return useMenuItemAria(
				props.id,
				!!props.item.items?.length,
				ref(!!props.item.expanded)
			).value;
		} else {
			return useOptionAria(
				isSelected,
				ref(!!props.item.disabled),
				props.id
			).value;
		}
	});

	const expandableAriaAttrs = useExpandableAria(
		ref(!!props.item.expanded),
		props.item.items ? `${props.id}-submenu` : undefined
	);

	// Enhanced accessibility attributes
	const accessibilityAttrs = computed(() => ({
		...ariaAttrs.value,
		...expandableAriaAttrs.value,
		'aria-disabled': props.item.disabled || undefined,
		'aria-describedby': props.item.disabled ? `${props.id}-disabled` : undefined,
		tabindex: props.item.disabled ? -1 : 0,
	}));

	/**
	 * Handles item selection or expansion with accessibility announcements
	 */
	function selectItem(item: Item): void {
		if (props.item.disabled) {
			return;
		}

		if (!props.item.items?.length) {
			// Handle selection
			model.value = props.getObject ? item : item.value;
			isSelected.value = true;
			emit("update:selected", true);
			
			// Announce selection for screen readers
			screenReader.announcePolitely(`Selected ${item.label}`);
		} else {
			// Handle submenu expansion/collapse - let parent manage state
			if (props.item.expanded) {
				emit('collapse-submenu', props.item);
			} else {
				emit('expand-submenu', props.item);
			}
		}
	}

	/**
	 * Handles keyboard interactions with enhanced accessibility
	 */
	function handleKeydown(event: KeyboardEvent): void {
		if (props.item.disabled) {
			return;
		}

		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault();
				event.stopPropagation();
				selectItem(props.item);
				break;
				
			case 'ArrowRight':
				if (props.item.items?.length && !props.item.expanded) {
					event.preventDefault();
					event.stopPropagation();
					emit('expand-submenu', props.item);
				}
				break;
				
			case 'ArrowLeft':
				if (props.item.expanded) {
					event.preventDefault();
					event.stopPropagation();
					emit('collapse-submenu', props.item);
				}
				break;
				
			default:
				// Allow other keys to bubble up for dropdown-level handling
				break;
		}
	}

	/**
	 * Updates the selected state
	 */
	function changeSelected(selected: boolean): void {
		isSelected.value = selected;
		emit("update:selected", selected);
	}

	/**
	 * Handles blur event to close expanded items
	 */
	function handleBlur(): void {
		setTimeout(() => {
			if (props.item.expanded) {
				emit('collapse-submenu', props.item);
			}
		}, 200);
	}

	/**
	 * Gets the string value from either a string or item object
	 */
	function getValue(item: BDropdownValue): string {
		return isObject(item) ? (item as Item).value : String(item);
	}
</script>

<template>
	<div class="relative dropdown-item-wrapper">
		<div
			class="item"
			:class="{
				selected: item.value === getValue(model) || isSelected,
				disabled: item.disabled,
				'has-submenu': item.items?.length,
				'submenu-expanded': item.expanded
			}"
			v-bind="accessibilityAttrs"
			@click="selectItem(item)"
			@keydown="handleKeydown"
			@blur="handleBlur"
		>
			<div class="flex items-center gap-xs">
				<BIcon
					v-if="item.icon"
					:name="item.icon"
					class="icon"
					:aria-hidden="true"
				/>
				<span class="label">{{ item.label }}</span>
				<!-- Keyboard shortcut display -->
				<span 
					v-if="item.shortcut"
					class="shortcut text-xs text-neutral-interaction-muted ml-auto"
					:aria-label="`Keyboard shortcut: ${item.shortcut}`"
				>
					{{ item.shortcut }}
				</span>
			</div>
			
			<!-- Submenu indicator -->
			<BIcon
				v-if="item.items?.length"
				name="chevron_right"
				class="icon icon-small submenu-icon"
				:class="{ 'rotate-90': item.expanded }"
				:aria-hidden="true"
			/>
			
			<!-- Selection indicator -->
			<BIcon
				v-if="(item.value === getValue(model) || isSelected) && !item.items?.length"
				name="check"
				class="icon icon-small check-icon"
				:aria-hidden="true"
			/>
		</div>
		
		<!-- Submenu -->
		<div
			v-if="item.items?.length && item.expanded"
			class="sub-items"
			:id="`${props.id}-submenu`"
			:role="pattern === 'menu' ? 'menu' : 'group'"
			:aria-labelledby="props.id"
			:aria-expanded="item.expanded"
		>
			<Items :items="item.items">
				<template #default="{ items }">
					<Item
						v-for="subItem in items"
						:key="subItem.value"
						v-model="model"
						v-model:selected="subItem.selected"
						:item="subItem"
						:get-object="getObject"
						:pattern="pattern"
						:id="`dropdown-item-${subItem.value}`"
						@update:model-value="(value: BDropdownValue) => selectItem(value as Item)"
						@update:selected="changeSelected"
						@expand-submenu="$emit('expand-submenu', $event)"
						@collapse-submenu="$emit('collapse-submenu', $event)"
					/>
				</template>
			</Items>
		</div>
		
		<!-- Screen reader only disabled message -->
		<div
			v-if="item.disabled"
			:id="`${props.id}-disabled`"
			class="sr-only"
			role="status"
		>
			This option is disabled
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";
	.custom-card {
		:first-child .item {
			@apply rounded-t-sm;
		}

		:last-child .item {
			@apply rounded-b-sm;
		}
	}

	.item {
		@apply overflow-hidden text-neutral-interaction-default w-full flex items-center justify-between gap-xs px-base py-sm cursor-pointer transition-colors duration-150 ease-in-out
    hover:bg-primary-surface-hover hover:text-primary-interaction-hover 
    focus:bg-primary-surface-hover focus:text-primary-interaction-hover focus:outline-none focus:ring-2 focus:ring-primary-stroke-default focus:ring-inset;

		.label {
			@apply text-sm whitespace-nowrap;
		}

		.icon.b-icon {
			@apply text-xl flex items-center;
		}
		
		.shortcut {
			@apply opacity-75;
		}
	}

	.item.selected {
		@apply bg-primary-surface-default text-primary-interaction-selected;
		
		.check-icon {
			@apply text-primary-interaction-selected;
		}
	}

	.item.disabled {
		@apply pointer-events-none text-neutral-interaction-disabled bg-transparent cursor-not-allowed opacity-50;
	}
	
	.item.has-submenu {
		@apply relative;
		
		.submenu-icon {
			@apply transition-transform duration-200 ease-in-out;
		}
	}
	
	.item:focus-visible {
		@apply ring-2 ring-primary-stroke-default ring-offset-2;
	}

	.sub-items {
		@apply absolute top-0 z-30 bg-neutral-surface-default flex flex-col max-h-[12em];
		border-radius: var(--rounded-base);
		box-shadow: var(--box-shadow-neutral-default);
		left: calc(100% + 0.5rem);
	}

	.item .icon.b-icon.icon-small {
		@apply text-base;
	}

	/* Keyboard navigation highlight */
	.keyboard-active {
		@apply bg-primary-surface-hover ring-2 ring-primary-stroke-default;
	}
	
	.sr-only {
		@apply absolute w-1 h-1 p-0 -m-1 overflow-hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
	
	.dropdown-item-wrapper:focus-within .item {
		@apply ring-2 ring-primary-stroke-default;
	}
</style>
