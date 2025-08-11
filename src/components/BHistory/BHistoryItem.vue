<script setup lang="ts">
import { computed } from 'vue';
import BIcon from '../BIcon/BIcon.vue';
import type { BHistoryItem, BHistoryItemContext } from './BHistory.types';

/**
 * History item position options
 */
type Position = "left" | "right" | "top" | "bottom";

/**
 * History item type options
 */
type ItemType = "primary" | "info" | "success" | "warning" | "danger" | "neutral";

/**
 * History item component properties
 */
interface BHistoryItemProps {
	/** The history item data */
	item: BHistoryItem;
	/** Item position in timeline */
	position: Position;
	/** Item type for styling */
	type: ItemType;
	/** Whether the item is active */
	active?: boolean;
	/** Whether the item is disabled */
	disabled?: boolean;
	/** Whether this is the first item */
	isFirst?: boolean;
	/** Whether this is the last item */
	isLast?: boolean;
	/** Item index for accessibility */
	index?: number;
	/** Total number of items for accessibility */
	totalItems?: number;
	/** Context information for accessibility */
	context?: BHistoryItemContext;
}

const props = withDefaults(defineProps<BHistoryItemProps>(), {
	active: false,
	disabled: false,
	isFirst: false,
	isLast: false,
	index: 0,
	totalItems: 1,
});

const emit = defineEmits<{
	click: [item: BHistoryItem, index: number];
	focus: [item: BHistoryItem, index: number];
	blur: [item: BHistoryItem, index: number];
}>();

// Computed classes for the item
const itemClasses = computed(() => [
	props.position,
	props.item.type || props.type,
	{
		'last-item': props.isLast,
		'first-item': props.isFirst,
		'active': props.active,
		'disabled': props.disabled,
	}
]);

// Circle classes for the timeline indicator
const circleClasses = computed(() => ({
	'circle-icon': !!props.item.icon && !props.item.isIconRound,
	'round-icon': !!props.item.icon && props.item.isIconRound,
}));

// Border classes for the connecting line
const borderClasses = computed(() => ({
	'have-icon': !!props.item.icon && !props.item.isIconRound
}));

// Handle item click
const handleClick = () => {
	if (!props.disabled) {
		emit('click', props.item, props.index);
	}
};

// Handle item focus
const handleFocus = () => {
	emit('focus', props.item, props.index);
};

// Handle item blur
const handleBlur = () => {
	emit('blur', props.item, props.index);
};
</script>

<template>
	<li
		class="history-item"
		:class="itemClasses"
		v-bind="context?.itemAriaAttrs"
		@click="handleClick"
		@focus="handleFocus"
		@blur="handleBlur"
	>
		<!-- Visual timeline indicator -->
		<div
			class="circle"
			:class="circleClasses"
			aria-hidden="true"
		>
			<BIcon
				v-if="item.icon"
				:name="item.icon"
				:filled="!item.unfilled"
			/>
		</div>
		
		<!-- Timeline connecting line -->
		<div
			class="custom-border"
			:class="borderClasses"
			aria-hidden="true"
		/>
		
		<!-- Item content -->
		<div class="data-list">
			<slot 
				:item="item" 
				:index="index"
				:active="active"
				:context="context"
			/>
		</div>
	</li>
</template>

<style scoped>
@import "../../../assets/main.css";

.history-item {
	@apply w-full relative cursor-pointer;
	@apply transition-colors duration-200 ease-in-out;
}

.history-item.disabled {
	@apply hover:bg-transparent cursor-default;
}

/* Focus styles */
.history-item:focus {
	@apply outline-none ring-2 ring-primary-interaction-default ring-offset-2;
}

/* Type-specific styles */
.history-item.primary {
	@apply hover:bg-primary-surface-default;
}

.history-item.info {
	@apply hover:bg-informative-surface-default;
}

.history-item.success {
	@apply hover:bg-success-surface-default;
}

.history-item.warning {
	@apply hover:bg-warning-surface-default;
}

.history-item.danger {
	@apply hover:bg-danger-surface-default;
}

.history-item.neutral {
	@apply hover:bg-neutral-surface-highlight;
}

/* Active states */
.primary.active {
	@apply bg-primary-surface-default;
}

.info.active {
	@apply bg-informative-surface-default;
}

.success.active {
	@apply bg-success-surface-default;
}

.warning.active {
	@apply bg-warning-surface-default;
}

.danger.active {
	@apply bg-danger-surface-default;
}

.neutral.active {
	@apply bg-neutral-surface-highlight;
}

/* Circle styles */
.circle {
	@apply bg-neutral-surface-disabled absolute w-[10px] h-[10px] rounded-full;
}

/* Active circle colors */
.primary.active .circle,
.primary.disabled .circle {
	@apply bg-primary-interaction-default z-[2];
}

.info.active .circle,
.info.disabled .circle {
	@apply bg-informative-interaction-default z-[2];
}

.success.active .circle,
.success.disabled .circle {
	@apply bg-success-interaction-default z-[2];
}

.warning.active .circle,
.warning.disabled .circle {
	@apply bg-warning-interaction-default z-[2];
}

.danger.active .circle,
.danger.disabled .circle {
	@apply bg-danger-interaction-default z-[2];
}

.neutral.active .circle,
.neutral.disabled .circle {
	@apply bg-neutral-interaction-default z-[2];
}

/* Icon circles */
.circle.circle-icon {
	@apply flex items-center justify-center p-sm text-neutral-foreground-negative bg-neutral-surface-disabled;
}

.circle.circle-icon .b-icon {
	@apply text-base;
}

.circle.round-icon {
	@apply bg-neutral-surface-default w-fit h-[20px] text-neutral-surface-disabled;
}

.circle.round-icon .b-icon {
	@apply text-3xl;
}

/* Round icon colors for active/disabled states */
.primary.active .circle.round-icon,
.primary.disabled .circle.round-icon {
	@apply text-primary-interaction-default bg-neutral-surface-default;
}

.info.active .circle.round-icon,
.info.disabled .circle.round-icon {
	@apply text-informative-interaction-default bg-neutral-surface-default;
}

.success.active .circle.round-icon,
.success.disabled .circle.round-icon {
	@apply text-success-interaction-default bg-neutral-surface-default;
}

.warning.active .circle.round-icon,
.warning.disabled .circle.round-icon {
	@apply text-warning-interaction-default bg-neutral-surface-default;
}

.danger.active .circle.round-icon,
.danger.disabled .circle.round-icon {
	@apply text-danger-interaction-default bg-neutral-surface-default;
}

.neutral.active .circle.round-icon,
.neutral.disabled .circle.round-icon {
	@apply text-neutral-interaction-default bg-neutral-surface-default;
}

/* Border and data-list styles */
.custom-border {
	@apply border-neutral-border-default absolute;
}

.data-list {
	@apply border-neutral-border-default;
}

/* Position-specific styles */
.right {
	@apply pl-[20.5px] pr-[16px];
}

.right .circle {
	@apply top-[22px] left-[21px];
}

.right .circle.round-icon {
	@apply top-[22px] left-[11px];
}

.right .circle.circle-icon {
	@apply top-[22px] left-[15px];
}

.right .data-list {
	@apply border-l-[1.5px] border-neutral-border-default pb-[16px] pt-[20px] ml-[5px] pl-[20px];
}

.right.first-item {
	@apply pt-[20px];
}

.right.first-item .circle {
	@apply top-[26px];
}

.right.first-item .circle.circle-icon,
.right.first-item .circle.round-icon {
	@apply top-[22px];
}

.right.first-item .custom-border {
	@apply border-r-[1.5px] border-neutral-border-default mr-[5px] pr-[20px] pb-[16px] pt-[20px];
}

.right.first-item .data-list {
	@apply pt-[0px];
}

.right.last-item .custom-border {
	@apply border-r-xxs h-[22px] w-[.5px] mt-[0] ml-[5px];
}

.left {
	@apply pl-[16px] pr-[20.5px];
}

.left .circle {
	@apply top-[22px] right-[21px];
}

.left .circle.round-icon {
	@apply top-[22px] right-[13.5px];
}

.left .circle.circle-icon {
	@apply top-[22px] right-[14.5px];
}

.left .data-list {
	@apply border-r-[1.5px] border-neutral-border-default mr-[5px] pr-[20px] pb-[16px] pt-[20px];
}

.left.first-item {
	@apply pt-[20px];
}

.left.first-item .circle {
	@apply top-[26px];
}

.left.first-item .circle.circle-icon,
.left.first-item .circle.round-icon {
	@apply top-[22px];
}

.left.first-item .custom-border {
	@apply border-t-[1.5px] border-neutral-border-default pt-[20px] px-[16px] ml-0;
}

.left.first-item .data-list {
	@apply pt-[0px];
}

.left.last-item .custom-border {
	@apply border-l-xxs h-[22px] w-[.5px] right-[26px];
}

.top {
	@apply pt-[20px] pb-[16px];
}

.top .circle {
	@apply top-[16px] left-[16px];
}

.top .circle.round-icon {
	@apply top-[7px] left-[16px];
}

.top .circle.circle-icon {
	@apply top-[9.5px] left-[16px];
}

.top .data-list {
	@apply border-t-[1.5px] border-neutral-border-default pt-[20px] px-[16px] ml-0;
}

.top .custom-border {
	@apply h-[.5px] w-full;
}

.top.first-item .circle {
	@apply left-[26px];
}

.top.first-item .circle.round-icon,
.top.first-item .circle.circle-icon {
	@apply left-[17px];
}

.top.first-item .custom-border {
	@apply border-t-xxs ml-[26px] mt-[0.5%];
}

.top.first-item .custom-border.have-icon {
	@apply mt-[1px];
}

.top.last-item .custom-border {
	@apply border-t-xxs w-[22px] left-[-5px] mt-[0.5%];
}

.top.last-item .custom-border.have-icon {
	@apply mt-[1px];
}

.bottom {
	@apply pb-[20.5px] pt-[16px];
}

.bottom .circle {
	@apply bottom-[16px] left-[16px];
}

.bottom .circle.round-icon {
	@apply bottom-[14px] left-[16px];
}

.bottom .circle.circle-icon {
	@apply bottom-[10px] left-[16px];
}

.bottom .data-list {
	@apply border-b-[1.5px] border-neutral-border-default pb-[20px] px-[16px];
}

.bottom .custom-border {
	@apply h-[.5px] w-full;
}

.bottom.first-item .circle {
	@apply left-[26px];
}

.bottom.first-item .circle.round-icon,
.bottom.first-item .circle.circle-icon {
	@apply left-[17px];
}

.bottom.first-item .custom-border {
	@apply border-b-xxs ml-[26px] bottom-[20.5px];
}

.bottom.last-item .custom-border {
	@apply border-b-xxs w-[22px] left-[-5px] bottom-[20.5px];
}

/* First/Last item border fixes */
.first-item .data-list {
	@apply border-none;
}

.first-item .circle {
	@apply z-[1];
}

.last-item .data-list {
	@apply border-none;
}

.first-item.last-item .custom-border {
	@apply hidden;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.history-item:focus {
		@apply ring-4 ring-black;
	}
	
	.history-item.active {
		@apply border-2 border-black;
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.history-item,
	.circle,
	.custom-border {
		transition: none !important;
		animation: none !important;
	}
}
</style>