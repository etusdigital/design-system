<script setup lang="ts">
	import { ref, watch, onBeforeMount, onMounted, onUnmounted, computed, nextTick } from "vue";
	import BRoundButton from "../BRoundButton/BRoundButton.vue";
	import BIcon from "../BIcon/BIcon.vue";
	import { 
		useRadialNavigation, 
		useAriaAttributes, 
		useScreenReader, 
		useFocusTrap,
	} from "#/composables";
	import type { 
		RoundMenuItem, 
		RoundMenuTrigger, 
		RoundMenuProps,
		RadialNavigationItem 
	} from './BRoundMenu.types';

	const props = withDefaults(
		defineProps<{
			items: RoundMenuItem[];
			/** Label for the menu trigger button */
			triggerLabel?: string;
			/** ARIA label for the entire menu */
			menuLabel?: string;
			/** Optional description of the menu for screen readers */
			menuDescription?: string;
			/** Loading state for the menu */
			loading?: boolean;
			/** Disabled state for the menu */
			disabled?: boolean;
			/** Custom trigger button configuration */
			trigger?: {
				icon?: string;
				background?: string;
				ariaLabel?: string;
			};
		}>(),
		{
			triggerLabel: "Open menu",
			menuLabel: "Radial menu",
			menuDescription: "",
			loading: false,
			disabled: false,
		}
	);

	const isExpanded = ref(false);
	const positions = ref<string[]>([]);
	const menuContainer = ref<HTMLElement | null>(null);
	const triggerButton = ref<HTMLElement | null>(null);
	const menuItems = ref<HTMLElement[]>([]);
	const loadingItems = ref<Set<string>>(new Set());

	// Generate unique IDs for ARIA relationships
	const { useAriaId } = useAriaAttributes();
	const menuId = useAriaId('round-menu');
	const triggerId = useAriaId('round-menu-trigger');
	const descriptionId = useAriaId('round-menu-description');

	// Screen reader announcements
	const { announcePolitely, announceAssertively } = useScreenReader();

	// Prepare items for radial navigation
	const navigationItems = computed(() => 
		props.items.map((item, index) => ({
			...item,
			id: item.id || `menu-item-${index}`,
			label: item.ariaLabel || item.text || `Menu item ${index + 1}`,
			position: index,
			disabled: item.disabled || props.disabled || item.loading,
		}))
	);

	// Radial navigation for menu items
	const {
		activeIndex,
		activeItem,
		isNavigating,
		handleKeydown: handleRadialKeydown,
		setActiveIndex,
		reset: resetNavigation,
	} = useRadialNavigation(
		navigationItems,
		(item, index) => {
			selectMenuItem(item, index);
		},
		{
			announcePositions: true,
			positionAnnouncer: (item, position, total) => {
				const clockPos = getClockPosition(position, total);
				const roundItem = item as RoundMenuItem;
				return roundItem.loading 
					? `${roundItem.label} loading, item ${position + 1} of ${total} at ${clockPos} position`
					: `${roundItem.label}, item ${position + 1} of ${total} at ${clockPos} position`;
			}
		}
	);

	// Focus trap for open menu
	useFocusTrap(menuContainer, isExpanded);

	// Helper function to get clock position
	function getClockPosition(index: number, total: number): string {
		const angle = (index * 360) / total;
		const normalizedAngle = ((angle % 360) + 360) % 360;
		const clockPositions = [
			'12 o\'clock', '1 o\'clock', '2 o\'clock', '3 o\'clock',
			'4 o\'clock', '5 o\'clock', '6 o\'clock', '7 o\'clock',
			'8 o\'clock', '9 o\'clock', '10 o\'clock', '11 o\'clock'
		];
		const clockIndex = Math.round((normalizedAngle / 30) % 12);
		return clockPositions[clockIndex] || '12 o\'clock';
	}

	// Menu state management
	async function toggleMenu() {
		if (props.disabled || props.loading) return;

		isExpanded.value = !isExpanded.value;
		
		if (isExpanded.value) {
			const baseAnnouncement = `${props.menuLabel} opened. ${props.items.length} items available in circular layout. Use arrow keys to navigate.`;
			const descriptionAnnouncement = props.menuDescription ? ` ${props.menuDescription}` : '';
			announcePolitely(baseAnnouncement + descriptionAnnouncement);
			await nextTick();
			// Set focus to first item after menu opens
			setActiveIndex(0);
		} else {
			announcePolitely(`${props.menuLabel} closed`);
			resetNavigation();
		}
	}

	async function selectMenuItem(item: RoundMenuItem, index: number) {
		if (item.disabled || item.loading) return;

		// Set loading state for this item
		loadingItems.value.add(item.id);
		announcePolitely(`${item.label} selected`);

		try {
			await item.action();
			announcePolitely(`${item.label} completed`);
		} catch (error) {
			announceAssertively(`Error executing ${item.label}: ${error}`);
		} finally {
			loadingItems.value.delete(item.id);
		}

		// Close menu after successful action
		closeMenu();
	}

	function closeMenu() {
		isExpanded.value = false;
		resetNavigation();
		announcePolitely(`${props.menuLabel} closed`);
		
		// Return focus to trigger button
		nextTick(() => {
			if (triggerButton.value) {
				triggerButton.value.focus();
			}
		});
	}

	// Keyboard event handling
	function handleKeydown(event: KeyboardEvent) {
		if (!isExpanded.value) {
			// Handle trigger button keys
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				toggleMenu();
			}
			return;
		}

		// Handle menu navigation
		if (event.key === 'Escape') {
			event.preventDefault();
			closeMenu();
		} else {
			handleRadialKeydown(event);
		}
	}

	// Calculate button positions
	function calculateButtonPosition() {
		positions.value = [];
		for (let i = 0; i < props.items.length; i++) {
			const angle = (i * 360) / props.items.length;
			const rads = (angle * Math.PI) / 180;

			const z = props.items.length < 7
				? 60
				: props.items.length < 10
				? 7 * props.items.length
				: 6 * props.items.length;
			
			const x = z * Math.cos(rads);
			const y = z * Math.sin(rads);
			positions.value.push(`${x}px, ${y}px, 0`);
		}
	}

	// ARIA attributes for trigger button
	const triggerAriaAttributes = computed(() => ({
		'aria-label': props.trigger?.ariaLabel || props.triggerLabel,
		'aria-expanded': isExpanded.value.toString(),
		'aria-controls': menuId,
		'aria-haspopup': 'menu' as const,
	}));

	// ARIA attributes for menu container
	const menuAriaAttributes = computed(() => ({
		role: 'menu' as const,
		'aria-label': props.menuLabel,
		'aria-orientation': 'radial' as any, // Custom orientation for radial menus
		...(props.menuDescription && { 'aria-describedby': descriptionId }),
	}));

	// ARIA attributes for menu items
	function getItemAriaAttributes(item: RoundMenuItem, index: number) {
		const isActive = activeIndex.value === index;
		const itemId = `${menuId}-item-${index}`;
		
		return {
			id: itemId,
			role: 'menuitem' as const,
			'aria-label': item.ariaLabel || item.text || `Menu item ${index + 1}`,
			'aria-disabled': item.disabled || props.disabled || item.loading || undefined,
			'aria-busy': item.loading || loadingItems.value.has(item.id) || undefined,
			'aria-current': isActive ? 'true' : undefined,
			tabindex: isActive ? 0 : -1,
		};
	}

	onBeforeMount(() => {
		calculateButtonPosition();
	});

	watch(() => props.items, () => {
		calculateButtonPosition();
		resetNavigation();
	}, { deep: true });

	onMounted(() => {
		document.addEventListener('keydown', handleKeydown);
	});

	onUnmounted(() => {
		document.removeEventListener('keydown', handleKeydown);
	});
</script>

<template>
	<div
		ref="menuContainer"
		:id="menuId"
		class="b-round-menu relative flex items-center h-fit w-fit overflow-visible"
		v-bind="menuAriaAttributes"
		:class="{ 
			'menu-expanded': isExpanded,
			'menu-loading': loading,
			'menu-disabled': disabled,
		}"
		@keydown="handleKeydown">
		
		<!-- Menu Items -->
		<div
			v-for="(item, index) in items"
			:key="item.id || index"
			class="menu-item"
			:class="{
				'menu-item-active': activeIndex === index,
				'menu-item-disabled': item.disabled || disabled || item.loading,
				'menu-item-loading': item.loading || loadingItems.has(item.id || `menu-item-${index}`),
			}"
			:style="
				isExpanded
					? {
							transform: `translate3d(${positions[index]})`,
							'-webkit-transform': `translate3d(${positions[index]})`,
					  }
					: {}
			">
			<BRoundButton
				v-bind="getItemAriaAttributes(item, index)"
				:background="item.background"
				:icon="item.icon"
				:text="item.text"
				:disabled="item.disabled || disabled || item.loading"
				@click="selectMenuItem(item, index)"
				@keydown="handleRadialKeydown" />
			
			<!-- Loading indicator overlay for individual items -->
			<div
				v-if="item.loading || loadingItems.has(item.id || `menu-item-${index}`)"
				class="menu-item-loading-overlay"
				aria-hidden="true">
				<BIcon name="hourglass_empty" class="animate-spin" />
			</div>
		</div>

		<!-- Trigger Button -->
		<div
			class="menu-trigger"
			:class="{ 
				'menu-trigger-expanded': isExpanded,
				'menu-trigger-disabled': disabled || loading,
			}">
			<BRoundButton
				ref="triggerButton"
				:id="triggerId"
				v-bind="triggerAriaAttributes"
				:color="!isExpanded ? 'success' : 'neutral'"
				:icon="trigger?.icon || (!isExpanded ? 'menu' : 'close')"
				:background="trigger?.background"
				:disabled="disabled || loading"
				@click="toggleMenu" />

			<!-- Loading indicator for entire menu -->
			<div
				v-if="loading"
				class="menu-loading-overlay"
				aria-hidden="true">
				<BIcon name="hourglass_empty" class="animate-spin" />
			</div>
		</div>

		<!-- Menu description for screen readers -->
		<div 
			v-if="menuDescription"
			:id="descriptionId"
			class="sr-only">
			{{ menuDescription }}
		</div>

		<!-- Screen reader live region for announcements -->
		<div 
			aria-live="polite"
			aria-atomic="true"
			class="sr-only">
			{{ isExpanded ? `Menu opened with ${items.length} items` : 'Menu closed' }}
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";
	
	/* Base menu styles */
	.b-round-menu {
		/* Ensure menu is keyboard focusable container */
		outline: none;
	}

	/* Menu item styles */
	.menu-item {
		@apply absolute hover:z-50 relative;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		-webkit-transition: -webkit-transform ease-out 200ms;
		transition: -webkit-transform ease-out 200ms;
		transition: transform ease-out 200ms;
		transition: transform ease-out 200ms, -webkit-transform ease-out 200ms;
		-webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
		transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
	}

	.menu-item-active {
		@apply z-[60];
		/* High contrast outline for keyboard focus */
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
		border-radius: 50%;
	}

	.menu-item-disabled {
		@apply opacity-60 cursor-not-allowed;
	}

	.menu-item-loading {
		@apply opacity-80;
	}

	/* Trigger button styles */
	.menu-trigger {
		@apply relative z-10;
	}

	.menu-trigger-expanded {
		@apply z-20;
	}

	.menu-trigger-disabled {
		@apply opacity-60 cursor-not-allowed;
	}

	/* Loading overlay styles */
	.menu-item-loading-overlay,
	.menu-loading-overlay {
		@apply absolute inset-0 flex items-center justify-center;
		@apply bg-white/80 rounded-full z-10;
		backdrop-filter: blur(2px);
	}

	.menu-item-loading-overlay {
		@apply text-xs;
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.menu-item-active {
			outline: 3px solid currentColor;
			outline-offset: 3px;
		}
		
		.menu-item-disabled {
			opacity: 0.7;
			filter: contrast(0.8);
		}

		.menu-loading-overlay,
		.menu-item-loading-overlay {
			background: Canvas;
			border: 1px solid CanvasText;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.menu-item {
			transition: none;
		}
	}

	/* Screen reader only utility */
	.sr-only {
		position: absolute;
		left: -10000px;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		clip-path: inset(50%);
		white-space: nowrap;
	}

	/* Focus management */
	.b-round-menu:focus-within .menu-trigger {
		/* Ensure trigger remains visible when menu has focus */
		@apply z-30;
	}

	/* Touch target improvements for mobile */
	@media (hover: none) and (pointer: coarse) {
		.menu-item button,
		.menu-trigger button {
			min-width: 44px;
			min-height: 44px;
		}
	}

	/* Animation states for accessibility */
	.menu-expanded .menu-item {
		/* Ensure items are visible and accessible when expanded */
		pointer-events: auto;
	}

	.menu-expanded:not(.menu-item) .menu-item {
		/* Hide items from screen readers when collapsed */
		pointer-events: none;
	}

	.menu-disabled,
	.menu-loading {
		/* Visual indication for disabled/loading states */
		filter: grayscale(0.3);
	}

	/* Ensure proper stacking for focus indicators */
	.menu-item:focus-within {
		@apply z-[70];
	}
</style>
