<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, computed, resolveComponent, ref, nextTick, watch } from "vue";
import { useOptionalModel, useAriaAttributes, useScreenReader, useKeyboardNavigation, useFocusTrap } from "#composables";
import { checkPath, isObject } from "../../utils";
import { type Item } from "../../utils/types/MenuItem";
import MenuOption from "../../utils/components/MenuOption.vue";
import { 
	type BMenuProps, 
	type BMenuModelValue, 
	type BMenuItemAccessible, 
	type BMenuEmits,
	type BMenuType,
	type BMenuOrientation 
} from "./BMenu.types";

/**
 * Enhanced BMenu component with comprehensive WCAG 2.1 AA accessibility support
 * Implements ARIA menu pattern with full keyboard navigation and screen reader support
 */
export type { BMenuModelValue, BMenuProps, BMenuItemAccessible };

const props = withDefaults(defineProps<BMenuProps>(), {
	modelValue: undefined,
	getObject: false,
	type: 'navigation' as BMenuType,
	orientation: 'vertical' as BMenuOrientation,
	disabled: false,
	loading: false,
	ariaLabel: "Main menu",
	open: true,
	multiSelect: false,
	triggerHasPopup: 'menu',
	triggerExpanded: false,
	accessibility: () => ({
		announceNavigation: true,
		autoFocus: false,
		showSkipLinks: false,
		announcementPrefix: 'Menu:',
		announcePosition: true,
		announceLevels: true,
		showKeyboardHints: false,
		highContrastSupport: true,
		respectReducedMotion: true
	}),
	keyboard: () => ({
		loop: true,
		enableTypeAhead: true,
		typeAheadDelay: 1000,
		closeOnSelection: false
	}),
	trapFocus: false,
	restoreFocus: true,
	announceOpen: true,
	announceClose: true,
	announceSelection: true,
	screenReaderMessages: () => ({
		menuOpened: 'Menu opened',
		menuClosed: 'Menu closed',
		itemSelected: 'Item selected',
		submenuOpened: 'Submenu opened',
		submenuClosed: 'Submenu closed',
		navigationInstructions: 'Use arrow keys to navigate, Enter to select, Escape to close'
	}),
	showFocusIndicators: true,
	showSelectionIndicators: true,
	size: 'medium',
	variant: 'default'
});

const emit = defineEmits<BMenuEmits>();

const [model] = useOptionalModel<BMenuModelValue>(props, "modelValue", emit, "");

// Enhanced accessibility setup
const { useAriaId, useNavigationAria, useMenuAria } = useAriaAttributes();
const screenReader = useScreenReader();
const menuId = useAriaId('menu');
const menuRef = ref<HTMLElement>();
const menuItemsRef = ref<HTMLElement[]>([]);
const isOpen = ref(props.open);
const activeIndex = ref<number>(-1);
const typeAheadString = ref('');
const typeAheadTimer = ref<number | null>(null);

// Convert regular items to accessible items
const accessibleItems = computed<BMenuItemAccessible[]>(() => {
	return props.items.map((item, index) => ({
		...item,
		role: item.items && item.items.length > 0 ? 'menuitem' : 'menuitem',
		hasPopup: item.items && item.items.length > 0 ? 'menu' : false,
		expanded: item.expanded || false,
		level: 0,
		positionInGroup: index + 1,
		groupSize: props.items.length,
		focusable: !item.disabled
	}));
});

// Navigation setup with keyboard support
const {
	activeIndex: navActiveIndex,
	handleKeydown: handleNavigation,
	selectActive,
	reset: resetNavigation
} = useKeyboardNavigation(
	accessibleItems,
	(item: BMenuItemAccessible, index: number) => {
		if (!item.disabled) {
			selectMenuItem(item, index);
		}
	},
	{
		loop: props.keyboard?.loop ?? true,
		horizontal: props.orientation === 'horizontal',
		customHandlers: {
			'Escape': handleEscape,
			'Tab': handleTab,
			'ArrowRight': handleArrowRight,
			'ArrowLeft': handleArrowLeft
		}
	}
);

// Sync navigation active index with our active index
watch(navActiveIndex, (newIndex) => {
	activeIndex.value = newIndex;
	if (newIndex >= 0) {
		emit('item:focus', accessibleItems.value[newIndex], newIndex);
	}
});

// Focus trap for dropdown menus  
const focusTrapReturn = props.trapFocus ? useFocusTrap(menuRef) : null;
const enableFocusTrap = focusTrapReturn?.activate || (() => {});
const disableFocusTrap = focusTrapReturn?.deactivate || (() => {});

// ARIA attributes for the menu
const menuAriaAttrs = computed(() => {
	const attrs: Record<string, string | number | boolean> = {
		role: props.type === 'menubar' ? 'menubar' : 'menu',
		'aria-orientation': props.orientation,
		'aria-label': props.ariaLabel,
		'aria-activedescendant': activeIndex.value >= 0 
			? `${menuId}-item-${activeIndex.value}` 
			: ''
	};

	if (props.ariaLabelledBy) {
		attrs['aria-labelledby'] = props.ariaLabelledBy;
		delete attrs['aria-label'];
	}

	if (props.ariaDescribedBy) {
		attrs['aria-describedby'] = props.ariaDescribedBy;
	}

	if (props.multiSelect) {
		attrs['aria-multiselectable'] = 'true';
	}

	return attrs;
});

// Menu item ARIA attributes generator
const getMenuItemAriaAttrs = (item: BMenuItemAccessible, index: number) => {
	const attrs: Record<string, string | number | boolean | undefined> = {
		id: `${menuId}-item-${index}`,
		role: item.role || 'menuitem',
		'aria-disabled': item.disabled ? 'true' : undefined,
		'aria-current': item.value === getValue(model.value) ? 'page' : undefined,
		tabindex: index === activeIndex.value ? 0 : -1
	};

	if (item.hasPopup) {
		attrs['aria-haspopup'] = typeof item.hasPopup === 'boolean' ? 'menu' : item.hasPopup;
		attrs['aria-expanded'] = item.expanded ? 'true' : 'false';
	}

	if (item.ariaDescription) {
		attrs['aria-description'] = item.ariaDescription;
	}

	if (item.checked !== undefined) {
		attrs['aria-checked'] = item.checked.toString();
	}

	if (item.level !== undefined && item.level > 0) {
		attrs['aria-level'] = item.level;
	}

	if (props.accessibility?.announcePosition && item.positionInGroup && item.groupSize) {
		attrs['aria-posinset'] = item.positionInGroup;
		attrs['aria-setsize'] = item.groupSize;
	}

	return attrs;
};

const parsedItems = computed(() => [
	accessibleItems.value.filter((item) => !item.bottom),
	accessibleItems.value.filter((item) => item.bottom),
]);

// Flattened items for keyboard navigation (non-disabled items only)
const flatItems = computed(() => accessibleItems.value.filter(item => !item.disabled));

// Type-ahead search functionality
const filteredItems = computed(() => {
	if (!typeAheadString.value) return flatItems.value;
	return flatItems.value.filter(item => 
		item.label.toLowerCase().startsWith(typeAheadString.value.toLowerCase())
	);
});

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

function selectMenuItem(item: BMenuItemAccessible, index: number) {
	if (item.disabled) return;

	model.value = props.getObject ? item : getValue(item);
	emit("update:modelValue", model.value);
	emit('item:select', item, index);

	// Screen reader announcements
	if (props.accessibility?.announceNavigation && props.announceSelection) {
		const announcement = buildSelectionAnnouncement(item, index);
		screenReader.announcePolitely(announcement);
	}

	// Close menu if configured to do so
	if (props.keyboard?.closeOnSelection && props.type !== 'navigation') {
		closeMenu();
	}
}

function buildSelectionAnnouncement(item: BMenuItemAccessible, index: number): string {
	let announcement = `${props.accessibility?.announcementPrefix || 'Menu:'} ${props.screenReaderMessages?.itemSelected || 'Item selected'}`;
	announcement += ` ${item.label || getValue(item)}`;

	if (props.accessibility?.announcePosition) {
		announcement += `, ${index + 1} of ${flatItems.value.length}`;
	}

	if (item.ariaDescription) {
		announcement += `. ${item.ariaDescription}`;
	}

	if (item.shortcut) {
		announcement += `. Keyboard shortcut: ${item.shortcut}`;
	}

	return announcement;
}

// Legacy support for existing changeModel calls
function changeModel(item: Item | BMenuItemAccessible) {
	const accessibleItem = item as BMenuItemAccessible;
	const index = accessibleItems.value.findIndex(i => i.value === item.value);
	selectMenuItem(accessibleItem, index >= 0 ? index : 0);
}

/**
 * Enhanced keyboard event handler with full ARIA menu pattern support
 */
function handleKeydown(event: KeyboardEvent): void {
	if (props.disabled || !isOpen.value) return;

	// Handle type-ahead search
	if (props.keyboard?.enableTypeAhead && isAlphaNumeric(event.key)) {
		handleTypeAhead(event.key);
		return;
	}

	// Use the navigation handler for arrow keys and standard navigation
	const handled = handleNavigation(event);

	// Emit navigation events for tracking
	if (handled) {
		const direction = getNavigationDirection(event.key);
		if (direction) {
			emit('keyboard:navigate', direction);
		}
	}
}

function handleEscape(event: KeyboardEvent): void {
	if (props.type !== 'navigation') {
		closeMenu();
		focusReturnElement();
	}
}

function handleTab(event: KeyboardEvent): void {
	// Allow tabbing out of navigation menus, but handle dropdown menus differently
	if (props.type === 'dropdown' || props.type === 'context') {
		if (!event.shiftKey) {
			// Tab forward - close menu and let tab continue
			closeMenu();
		} else {
			// Shift+Tab backward - close menu and let focus return
			closeMenu();
			focusReturnElement();
		}
	}
}

function handleArrowRight(event: KeyboardEvent): void {
	// Handle submenu opening for vertical menus
	if (props.orientation === 'vertical') {
		const currentItem = accessibleItems.value[activeIndex.value];
		if (currentItem?.hasPopup && !currentItem.expanded) {
			openSubmenu(currentItem, activeIndex.value);
			event.preventDefault();
			event.stopPropagation();
		}
	}
}

function handleArrowLeft(event: KeyboardEvent): void {
	// Handle submenu closing or parent menu navigation
	if (props.orientation === 'vertical') {
		const currentItem = accessibleItems.value[activeIndex.value];
		if (currentItem?.hasPopup && currentItem.expanded) {
			closeSubmenu(currentItem, activeIndex.value);
			event.preventDefault();
			event.stopPropagation();
		}
	}
}

function handleTypeAhead(key: string): void {
	if (!props.keyboard?.enableTypeAhead) return;

	// Clear existing timer
	if (typeAheadTimer.value) {
		window.clearTimeout(typeAheadTimer.value);
	}

	// Add to search string
	typeAheadString.value += key.toLowerCase();

	// Find matching item
	const matchingIndex = flatItems.value.findIndex(item => 
		item.label.toLowerCase().startsWith(typeAheadString.value)
	);

	if (matchingIndex >= 0) {
		activeIndex.value = matchingIndex;
		focusMenuItem(matchingIndex);
		
		// Announce the match
		screenReader.announcePolitely(`${flatItems.value[matchingIndex].label}`);
	}

	// Set timer to clear search string
	typeAheadTimer.value = window.setTimeout(() => {
		typeAheadString.value = '';
	}, props.keyboard?.typeAheadDelay || 1000);
}

function isAlphaNumeric(key: string): boolean {
	return key.length === 1 && /^[a-zA-Z0-9]$/.test(key);
}

function getNavigationDirection(key: string): 'up' | 'down' | 'left' | 'right' | 'home' | 'end' | null {
	switch (key) {
		case 'ArrowUp': return 'up';
		case 'ArrowDown': return 'down';
		case 'ArrowLeft': return 'left';
		case 'ArrowRight': return 'right';
		case 'Home': return 'home';
		case 'End': return 'end';
		default: return null;
	}
}

/**
 * Focus a specific menu item by index with enhanced accessibility
 */
function focusMenuItem(index: number): void {
	nextTick(() => {
		const targetItem = menuItemsRef.value[index];
		if (targetItem && !targetItem.hasAttribute('aria-disabled')) {
			targetItem.focus();
			
			// Announce focus change for screen readers
			if (props.accessibility?.announceNavigation) {
				const item = accessibleItems.value[index];
				const announcement = buildFocusAnnouncement(item, index);
				screenReader.announcePolitely(announcement);
			}
		}
	});
}

function buildFocusAnnouncement(item: BMenuItemAccessible, index: number): string {
	let announcement = item.label || getValue(item);

	if (props.accessibility?.announcePosition) {
		announcement += `, ${index + 1} of ${flatItems.value.length}`;
	}

	if (item.disabled) {
		announcement += ', disabled';
	}

	if (item.hasPopup) {
		announcement += item.expanded ? ', submenu expanded' : ', has submenu';
	}

	if (item.shortcut) {
		announcement += `, shortcut ${item.shortcut}`;
	}

	return announcement;
}

// Menu state management
function openMenu(): void {
	if (props.disabled) return;
	
	isOpen.value = true;
	emit('menu:open');
	
	if (props.announceOpen && props.screenReaderMessages?.menuOpened) {
		screenReader.announcePolitely(props.screenReaderMessages.menuOpened);
	}

	// Provide navigation instructions
	if (props.screenReaderMessages?.navigationInstructions) {
		setTimeout(() => {
			screenReader.announcePolitely(props.screenReaderMessages!.navigationInstructions!);
		}, 100);
	}
	
	// Auto focus first item if configured
	if (props.accessibility?.autoFocus) {
		nextTick(() => {
			activeIndex.value = 0;
			focusMenuItem(0);
		});
	}
	
	// Enable focus trap for dropdown menus
	if (props.trapFocus) {
		nextTick(() => enableFocusTrap());
	}
}

function closeMenu(): void {
	isOpen.value = false;
	emit('menu:close');
	
	if (props.announceClose && props.screenReaderMessages?.menuClosed) {
		screenReader.announcePolitely(props.screenReaderMessages.menuClosed);
	}
	
	// Reset navigation state
	resetNavigation();
	typeAheadString.value = '';
	
	// Disable focus trap
	if (props.trapFocus) {
		disableFocusTrap();
	}
}

function openSubmenu(item: BMenuItemAccessible, index: number): void {
	item.expanded = true;
	emit('submenu:open', item, item.level || 0);
	
	if (props.screenReaderMessages?.submenuOpened) {
		screenReader.announcePolitely(`${item.label} ${props.screenReaderMessages.submenuOpened}`);
	}
}

function closeSubmenu(item: BMenuItemAccessible, index: number): void {
	item.expanded = false;
	emit('submenu:close', item, item.level || 0);
	
	if (props.screenReaderMessages?.submenuClosed) {
		screenReader.announcePolitely(`${item.label} ${props.screenReaderMessages.submenuClosed}`);
	}
}

function focusReturnElement(): void {
	if (props.restoreFocus) {
		if (props.returnFocusTo) {
			const element = typeof props.returnFocusTo === 'string'
				? document.getElementById(props.returnFocusTo)
				: props.returnFocusTo;
			element?.focus();
		} else if (props.triggerId) {
			document.getElementById(props.triggerId)?.focus();
		}
	}
}

function getValue(item: Item | string | undefined): string {
	if (!item) return '';
	return isObject(item) ? (item as Item).value : item as string;
}

function getPath(path: string | undefined): string {
	if (!path) return "";
	else if (!path.startsWith("/")) return "/" + path;
	return path;
}

function getLinkComponent() {
	if (typeof resolveComponent("router-link") != "string")
		return "router-link";
	else if (typeof resolveComponent("nuxt-link") != "string")
		return "nuxt-link";
	return "a";
}

// Lifecycle hooks
onBeforeMount(() => {
	const item = props.items.find((item) => checkPath(item.path || ""));
	if (item) changeModel(item);
});

onMounted(() => {
	// Initialize menu state
	if (props.open && props.type !== 'navigation') {
		openMenu();
	}
	
	// Set up resize observer for responsive behavior
	if (window.ResizeObserver && menuRef.value) {
		const resizeObserver = new ResizeObserver(() => {
			// Handle responsive menu behavior
		});
		resizeObserver.observe(menuRef.value);
	}
});

onUnmounted(() => {
	// Cleanup timers
	if (typeAheadTimer.value) {
		window.clearTimeout(typeAheadTimer.value);
	}
	
	// Release focus trap if active
	if (props.trapFocus) {
		disableFocusTrap();
	}
});

// Watch for prop changes
watch(() => props.open, (newOpen) => {
	if (newOpen !== isOpen.value) {
		if (newOpen) {
			openMenu();
		} else {
			closeMenu();
		}
	}
});

// Expose component methods for external control
defineExpose({
	open: openMenu,
	close: closeMenu,
	toggle: () => isOpen.value ? closeMenu() : openMenu(),
	focusFirst: () => { activeIndex.value = 0; focusMenuItem(0); },
	focusLast: () => { activeIndex.value = flatItems.value.length - 1; focusMenuItem(flatItems.value.length - 1); },
	focusItem: focusMenuItem,
	getFocusedIndex: () => activeIndex.value,
	isOpen: () => isOpen.value,
	selectItem: (index: number) => {
		const item = accessibleItems.value[index];
		if (item) selectMenuItem(item, index);
	}
});
</script>

<template>
	<nav 
		ref="menuRef"
		class="b-menu"
		:class="{
			'b-menu--disabled': disabled,
			'b-menu--loading': loading,
			'b-menu--open': isOpen,
			[`b-menu--${size}`]: size,
			[`b-menu--${variant}`]: variant,
			'b-menu--high-contrast': accessibility?.highContrastSupport,
			'b-menu--reduced-motion': accessibility?.respectReducedMotion
		}"
		:id="menuId"
		v-bind="menuAriaAttrs"
		@keydown="handleKeydown">
		
		<!-- Skip links for better navigation -->
		<div 
			v-if="accessibility?.showSkipLinks"
			class="b-menu__skip-links sr-only"
			role="group"
			aria-label="Skip navigation links">
			<a 
				href="#main-content"
				class="b-menu__skip-link focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:px-base focus:py-sm focus:bg-primary-background focus:text-primary-foreground">
				Skip to main content
			</a>
		</div>

		<!-- Navigation instructions for screen readers -->
		<div 
			v-if="accessibility?.showKeyboardHints && screenReaderMessages?.navigationInstructions"
			class="sr-only"
			aria-live="polite">
			{{ screenReaderMessages.navigationInstructions }}
		</div>

		<div
			class="items-container"
			v-for="(items, groupIndex) in parsedItems"
			:key="groupIndex"
			role="group"
			:aria-label="groupIndex === 0 ? 'Main menu items' : 'Bottom menu items'">
			
			<BTooltip
				v-for="(item, itemIndex) in items"
				:key="item.value"
				:text="item.label"
				:disabled="item.disabled">
				
				<component
					:is="getLinkComponent()"
					:ref="(el: any) => { if (el) menuItemsRef[accessibleItems.findIndex(i => i.value === item.value)] = el; }"
					class="hover:no-underline b-menu-item"
					:class="{
						'b-menu-item--active': activeIndex === accessibleItems.findIndex(i => i.value === item.value),
						'b-menu-item--selected': item.value === getValue(model),
						'b-menu-item--disabled': item.disabled,
						'b-menu-item--has-popup': item.hasPopup,
						'b-menu-item--expanded': item.expanded
					}"
					:to="getPath(item.path)"
					:href="getLinkComponent() === 'a' ? getPath(item.path) : undefined"
					v-bind="getMenuItemAriaAttrs(item, accessibleItems.findIndex(i => i.value === item.value))"
					@click="selectMenuItem(item, accessibleItems.findIndex(i => i.value === item.value))"
					@keydown.enter.space.prevent="selectMenuItem(item, accessibleItems.findIndex(i => i.value === item.value))"
					@focus="activeIndex = accessibleItems.findIndex(i => i.value === item.value)">
					
					<MenuOption
						:icon="item.icon"
						:selected="item.value == getValue(model)"
						:disabled="item.disabled"
						:label="item.label" />
					
					<!-- Submenu indicator -->
					<span
						v-if="item.hasPopup"
						class="b-menu-item__submenu-indicator"
						:class="{ 'expanded': item.expanded }"
						aria-hidden="true">
						<BIcon name="chevron_right" />
					</span>
					
					<!-- Keyboard shortcut hint -->
					<span
						v-if="item.shortcut && accessibility?.showKeyboardHints"
						class="b-menu-item__shortcut"
						:aria-label="`Keyboard shortcut: ${item.shortcut}`">
						{{ item.shortcut }}
					</span>
					
					<!-- Selection indicator -->
					<span
						v-if="showSelectionIndicators && item.value === getValue(model)"
						class="b-menu-item__selection-indicator"
						aria-hidden="true">
						<BIcon name="check" />
					</span>
				</component>
			</BTooltip>
		</div>
		
		<!-- Loading state -->
		<div
			v-if="loading"
			class="b-menu__loading"
			role="status"
			aria-label="Menu loading"
			aria-live="polite">
			<BSpinner size="small" />
			<span class="sr-only">Loading menu items...</span>
		</div>
		
		<!-- Empty state -->
		<div
			v-else-if="!loading && accessibleItems.length === 0"
			class="b-menu__empty"
			role="status"
			aria-label="No menu items available">
			<slot name="empty">
				<p class="text-neutral-foreground-medium">No menu items available</p>
			</slot>
		</div>
	</nav>
</template>

<style scoped>
@import "../../assets/main.css";

.b-menu {
	@apply flex flex-col justify-between gap-sm w-fit py-lg px-xxs bg-default border-r-xxs border-r-neutral-border-default;
	height: v-bind(computedHeight);
	
	/* High contrast mode support */
	&.b-menu--high-contrast {
		@media (prefers-contrast: high) {
			@apply border-r-2 border-r-neutral-foreground;
		}
	}
	
	/* Reduced motion support */
	&.b-menu--reduced-motion {
		@media (prefers-reduced-motion: reduce) {
			* {
				transition: none !important;
				animation: none !important;
			}
		}
	}
	
	/* Disabled state */
	&.b-menu--disabled {
		@apply opacity-50 pointer-events-none;
		
		.b-menu-item {
			@apply cursor-not-allowed;
		}
	}
	
	/* Size variants */
	&.b-menu--small {
		@apply py-sm px-xxxs gap-xs;
		
		.b-menu-item {
			@apply px-xs py-xxs text-sm;
		}
	}
	
	&.b-menu--large {
		@apply py-xl px-sm gap-base;
		
		.b-menu-item {
			@apply px-base py-sm text-lg;
		}
	}
}

.items-container {
	@apply flex flex-col gap-sm;
}

.b-menu-item {
	@apply relative flex items-center gap-xs px-sm py-xs rounded-xs transition-all duration-200;
	@apply focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground-low focus-visible:ring-offset-2;
	
	/* Selection states */
	&.b-menu-item--selected {
		@apply bg-primary-background text-primary-foreground;
	}
	
	/* Active (keyboard focused) state */
	&.b-menu-item--active {
		@apply bg-neutral-background-medium;
	}
	
	/* Disabled state */
	&.b-menu-item--disabled {
		@apply opacity-50 cursor-not-allowed pointer-events-none;
		@apply text-neutral-foreground-disabled;
	}
	
	/* Hover states */
	&:hover:not(.b-menu-item--disabled) {
		@apply bg-neutral-background-medium;
	}
	
	/* Focus indicators */
	&:focus-visible {
		@apply ring-2 ring-primary-foreground-low ring-offset-2 ring-offset-default;
		
		/* High contrast focus */
		@media (prefers-contrast: high) {
			@apply ring-4 ring-primary-foreground;
		}
	}
	
	/* Submenu states */
	&.b-menu-item--has-popup {
		&::after {
			content: "";
			@apply absolute right-xs top-1/2 transform -translate-y-1/2;
			@apply w-0 h-0 border-l-4 border-l-neutral-foreground-medium;
			@apply border-t-2 border-t-transparent border-b-2 border-b-transparent;
		}
		
		&.b-menu-item--expanded {
			&::after {
				@apply rotate-90;
			}
		}
	}
}

.b-menu-item__submenu-indicator {
	@apply ml-auto text-neutral-foreground-medium transition-transform duration-200;
	
	&.expanded {
		@apply transform rotate-90;
	}
}

.b-menu-item__shortcut {
	@apply ml-auto text-xs text-neutral-foreground-medium font-mono;
	@apply px-xs py-xxs bg-neutral-background-medium rounded-xxs;
}

.b-menu-item__selection-indicator {
	@apply ml-auto text-primary-foreground;
}

.b-menu__skip-links {
	@apply absolute top-0 left-0 z-50;
}

.b-menu__skip-link {
	@apply block px-base py-sm bg-primary-background text-primary-foreground;
	@apply transform -translate-y-full transition-transform;
	
	&:focus {
		@apply translate-y-0;
	}
}

.b-menu__loading {
	@apply flex items-center justify-center py-base;
}

.b-menu__empty {
	@apply flex items-center justify-center py-base text-center;
}

/* Screen reader only utility */
.sr-only {
	@apply absolute w-px h-px overflow-hidden whitespace-nowrap;
	clip: rect(0, 0, 0, 0);
}

/* Focus visible styles for better accessibility */
@media (prefers-reduced-motion: no-preference) {
	.b-menu-item {
		@apply transition-all duration-150 ease-in-out;
	}
}
</style>