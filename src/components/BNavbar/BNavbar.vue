<script setup lang="ts">
import { computed, nextTick, ref, onMounted, onUnmounted, watch } from "vue";
import { useOptionalModel, useAriaAttributes, useScreenReader, useKeyboardNavigation, useFocusTrap } from "#composables";
import { type Item } from "#utils/types/DropItem";
import BIcon from "../BIcon/BIcon.vue";
import BAvatar from "../BAvatar/BAvatar.vue";
import BCard from "../BCard/BCard.vue";

/**
 * Profile information for the navbar user avatar
 */
export interface NavbarProfile {
	/** User's display name */
	name: string;
	/** Optional avatar image source URL */
	src?: string;
}

/**
 * Navigation item with accessibility support
 */
export interface NavbarNavigationItem extends Item {
	/** Whether this item represents the current page/section */
	current?: boolean;
	/** Custom aria-label for the navigation item */
	ariaLabel?: string;
	/** URL or route for the navigation item */
	href?: string;
	/** Target for the link (e.g., '_blank') */
	target?: string;
}

/**
 * Accessibility configuration for the navbar
 */
export interface NavbarAccessibilityConfig {
	/** Aria label for the main navigation */
	navigationLabel?: string;
	/** Aria label for the mobile menu toggle button */
	menuButtonLabel?: string;
	/** Aria label for the notifications button */
	notificationsLabel?: string;
	/** Aria label for the user profile button */
	profileLabel?: string;
	/** Skip link text */
	skipLinkText?: string;
	/** Screen reader announcement when mobile menu opens */
	menuOpenAnnouncement?: string;
	/** Screen reader announcement when mobile menu closes */
	menuCloseAnnouncement?: string;
}

/**
 * Event handler type for notification toggle events
 */
export type NotificationEventHandler = (event: MouseEvent | KeyboardEvent) => Promise<void>;

/**
 * Props for the BNavbar component
 */
export interface NavbarProps {
	/** Selected navbar items (v-model) */
	modelValue?: NavbarNavigationItem[];
	/** Title displayed in the navbar */
	title?: string;
	/** Navigation items */
	items?: NavbarNavigationItem[];
	/** User profile information */
	profile?: NavbarProfile;
	/** Accessibility configuration */
	accessibility?: NavbarAccessibilityConfig;
	/** Whether the navbar is sticky */
	sticky?: boolean;
	/** Custom logo alt text */
	logoAlt?: string;
	/** Current page/route for accessibility */
	currentPage?: string;
}

/**
 * Events emitted by the BNavbar component
 */
export interface NavbarEmits {
	/** Emitted when modelValue changes */
	"update:modelValue": [value: NavbarNavigationItem[]];
	/** Emitted when a navigation item is selected */
	"navigate": [item: NavbarNavigationItem, event: MouseEvent | KeyboardEvent];
	/** Emitted when mobile menu is opened */
	"menu-opened": [];
	/** Emitted when mobile menu is closed */
	"menu-closed": [];
	/** Emitted when notifications are toggled */
	"notifications-toggled": [isOpen: boolean];
}

const props = withDefaults(
	defineProps<NavbarProps>(),
	{
		modelValue: undefined,
		title: "",
		accessibility: () => ({}),
		sticky: false,
		logoAlt: "Logo",
		currentPage: undefined,
	}
);

const emit = defineEmits<NavbarEmits>();

const [model] = useOptionalModel<NavbarNavigationItem[]>(
	props,
	"modelValue",
	emit,
	[]
);

// Component refs
const navbarRef = ref<HTMLElement | null>(null);
const mobileMenuRef = ref<HTMLElement | null>(null);
const notificationsRef = ref<HTMLElement | null>(null);
const skipLinkRef = ref<HTMLElement | null>(null);

// State management
const isNotificationsOpen = ref(false);
const isMobileMenuOpen = ref(false);
const isMobile = ref(false);

// Accessibility setup
const {
	useAriaId,
	useNavigationAria,
	useButtonAria,
	useExpandableAria,
} = useAriaAttributes();

const {
	announce,
	announcePolitely,
	announceAssertively,
	useLiveRegion,
} = useScreenReader();

const { liveRegion, updateLiveRegion } = useLiveRegion('polite');

// Generate unique IDs
const navId = useAriaId('navbar-nav');
const mobileMenuId = useAriaId('mobile-menu');
const notificationsId = useAriaId('notifications');
const skipLinkTargetId = useAriaId('main-content');

// Default accessibility labels
const defaultA11y = {
	navigationLabel: 'Main navigation',
	menuButtonLabel: 'Toggle navigation menu',
	notificationsLabel: 'View notifications',
	profileLabel: 'User profile',
	skipLinkText: 'Skip to main content',
	menuOpenAnnouncement: 'Navigation menu opened',
	menuCloseAnnouncement: 'Navigation menu closed',
};

const a11y = computed(() => ({
	...defaultA11y,
	...props.accessibility,
}));

// Navigation items with keyboard support
const navigationItems = computed(() => props.items || []);

// Keyboard navigation for main navigation items
const {
	activeIndex: navActiveIndex,
	isNavigating: navIsNavigating,
	handleKeydown: handleNavKeydown,
	setActiveIndex: setNavActiveIndex,
	reset: resetNavigation,
} = useKeyboardNavigation(
	navigationItems,
	(item: NavbarNavigationItem, index: number) => {
		selectNavigationItem(item, new KeyboardEvent('keydown'));
	},
	{
		loop: true,
		horizontal: true,
		customHandlers: {
			'Escape': () => {
				if (isMobileMenuOpen.value) {
					closeMobileMenu();
				}
			},
		},
	}
);

// Focus trap for mobile menu
useFocusTrap(mobileMenuRef, isMobileMenuOpen);

// Responsive detection
function checkIfMobile() {
	isMobile.value = window.innerWidth < 768; // Tailwind md breakpoint
}

// Computed property that extracts the spacing value from CSS custom properties
const computedPadding = computed((): number => {
	if (
		document.readyState === "complete" ||
		document.readyState === "interactive"
	) {
		// Type assertion is safe here as we're accessing the standard DOM API
		const bodyElement = document.body as HTMLElement & {
			computedStyleMap?: () => {
				get: (property: string) => { toString: () => string } | undefined;
			};
		};
		
		const spacingValue = "4px";
			
		return Number(spacingValue.replace("px", ""));
	}
	return 4;
});

// Mobile menu management
function toggleMobileMenu() {
	isMobileMenuOpen.value = !isMobileMenuOpen.value;
	const isOpen = isMobileMenuOpen.value;
	
	if (isOpen) {
		openMobileMenu();
	} else {
		closeMobileMenu();
	}
}

function openMobileMenu() {
	isMobileMenuOpen.value = true;
	updateLiveRegion(a11y.value.menuOpenAnnouncement);
	emit('menu-opened');
	
	// Prevent body scroll when menu is open
	document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
	isMobileMenuOpen.value = false;
	updateLiveRegion(a11y.value.menuCloseAnnouncement);
	emit('menu-closed');
	resetNavigation();
	
	// Restore body scroll
	document.body.style.overflow = '';
}

// Navigation item selection
function selectNavigationItem(item: NavbarNavigationItem, event: MouseEvent | KeyboardEvent) {
	if (item.disabled) return;
	
	// Update model
	model.value = [item];
	
	// Close mobile menu if open
	if (isMobileMenuOpen.value) {
		closeMobileMenu();
	}
	
	// Announce navigation change
	updateLiveRegion(`Navigated to ${item.label}`);
	
	// Emit navigation event
	emit('navigate', item, event);
}

// Keyboard event handlers
function handleNavbarKeydown(event: KeyboardEvent) {
	// Handle main navigation keyboard events
	if (!isMobileMenuOpen.value || !isMobile.value) {
		const handled = handleNavKeydown(event);
		if (handled) return;
	}
	
	// Handle global keyboard shortcuts
	switch (event.key) {
		case 'Escape':
			if (isNotificationsOpen.value) {
				closeNotifications();
				event.preventDefault();
			} else if (isMobileMenuOpen.value) {
				closeMobileMenu();
				event.preventDefault();
			}
			break;
	}
}

// Skip link functionality
function handleSkipLink() {
	const mainContent = document.getElementById(skipLinkTargetId) || 
					   document.querySelector('main') || 
					   document.querySelector('[role="main"]');
	if (mainContent) {
		// Make it focusable temporarily if needed
		if (!mainContent.hasAttribute('tabindex')) {
			mainContent.setAttribute('tabindex', '-1');
		}
		mainContent.focus();
		updateLiveRegion('Skipped to main content');
	}
}

// Notifications management
function toggleNotifications(event: MouseEvent | KeyboardEvent) {
	if (event instanceof KeyboardEvent && !['Enter', ' '].includes(event.key)) {
		return;
	}
	
	event.preventDefault();
	isNotificationsOpen.value = !isNotificationsOpen.value;
	
	if (isNotificationsOpen.value) {
		openNotifications(event);
	} else {
		closeNotifications();
	}
	
	emit('notifications-toggled', isNotificationsOpen.value);
}

function closeNotifications() {
	isNotificationsOpen.value = false;
	emit('notifications-toggled', false);
}

/**
 * Handles the notification icon click event, positioning and showing the notifications dropdown
 * @param event - The mouse or keyboard event from the notification icon
 */
const openNotifications = async (event: MouseEvent | KeyboardEvent) => {
	const target = event.target as HTMLElement;
	const rect = target.getBoundingClientRect();
	const viewportHeight = window.innerHeight;
	const viewportWidth = window.innerWidth;

	await nextTick();

	const card = document.querySelector(".notifications") as HTMLElement;
	if (!card) return;

	card.style.right = `${viewportWidth - rect.right}px`;

	if (rect.bottom + card.offsetHeight > viewportHeight)
		card.style.bottom = `${
			viewportHeight - rect.top - computedPadding.value
		}px`;
	else card.style.top = `${rect.bottom + computedPadding.value}px`;

	document.body.appendChild(card);

	/**
	 * Event handler for closing the notifications dropdown
	 * @param e - Mouse, keyboard, or wheel event that might trigger closing
	 */
	const closeHandler = (e: MouseEvent | KeyboardEvent | WheelEvent): void => {
		if (e instanceof KeyboardEvent && e.key === 'Escape') {
			closeNotifications();
			return;
		}
		
		if (e instanceof MouseEvent || e instanceof WheelEvent) {
			const isScrollable = Math.abs(card.offsetHeight - card.scrollHeight) > 3;
			const isWheel = e.type === "wheel";
			const isCard = card.contains(e.target as Node);
			const shouldClose = isScrollable
				? isWheel && !isCard
				: isWheel || !isCard;

			if (shouldClose) {
				closeNotifications();
			}
		}
	};

	// Clean up existing listeners
	const cleanupListeners = () => {
		document.removeEventListener("click", closeHandler);
		document.removeEventListener("wheel", closeHandler);
		document.removeEventListener("keydown", closeHandler);
	};
	
	// Add listeners after a short delay
	setTimeout(() => {
		document.addEventListener("click", closeHandler);
		document.addEventListener("wheel", closeHandler);
		document.addEventListener("keydown", closeHandler);
	}, 200);
	
	// Watch for notifications close to clean up listeners
	const unwatchNotifications = watch(isNotificationsOpen, (isOpen) => {
		if (!isOpen) {
			cleanupListeners();
			unwatchNotifications();
		}
	});
};

// ARIA attributes
const navigationAria = useNavigationAria(undefined, a11y.value.navigationLabel);
const mobileMenuButtonAria = useButtonAria(
	undefined,
	ref(isMobileMenuOpen),
	mobileMenuId,
	undefined
);
const notificationsButtonAria = useButtonAria(
	undefined,
	ref(isNotificationsOpen),
	notificationsId,
	undefined
);

// Lifecycle hooks
onMounted(() => {
	// Initial responsive check
	checkIfMobile();
	
	// Add resize listener
	window.addEventListener('resize', checkIfMobile);
	
	// Add global keyboard listener
	document.addEventListener('keydown', handleNavbarKeydown);
	
	// Set up skip link target if it doesn't exist
	if (!document.getElementById(skipLinkTargetId)) {
		const mainContent = document.querySelector('main') || 
						   document.querySelector('[role="main"]');
		if (mainContent && !mainContent.id) {
			mainContent.id = skipLinkTargetId;
		}
	}
});

onUnmounted(() => {
	// Clean up listeners
	window.removeEventListener('resize', checkIfMobile);
	document.removeEventListener('keydown', handleNavbarKeydown);
	
	// Restore body scroll if menu was open
	if (isMobileMenuOpen.value) {
		document.body.style.overflow = '';
	}
});

// Computed properties for component state
const showMobileMenu = computed(() => isMobile.value && navigationItems.value.length > 0);
const hasNavigationItems = computed(() => navigationItems.value.length > 0);

// Helper function to check if item is current
function isCurrentItem(item: NavbarNavigationItem): boolean {
	return item.current || 
		   (props.currentPage && item.value === props.currentPage) ||
		   (model.value && model.value.some(modelItem => modelItem.value === item.value));
}
</script>

<template>
	<div 
		ref="navbarRef"
		class="b-navbar"
		:class="{ 'b-navbar--sticky': sticky }"
		@keydown="handleNavbarKeydown"
	>
		<!-- Skip Link -->
		<a
			ref="skipLinkRef"
			href="#main-content"
			class="b-navbar__skip-link"
			@click.prevent="handleSkipLink"
		>
			{{ a11y.skipLinkText }}
		</a>

		<!-- Live Region for Screen Reader Announcements -->
		<div
			ref="liveRegion"
			class="sr-only"
			aria-live="polite"
			aria-atomic="true"
		/>

		<div class="b-navbar__container">
			<!-- Logo and Title Section -->
			<div class="b-navbar__brand">
				<slot name="logo">
					<div class="b-navbar__logo" role="img" :aria-label="logoAlt">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="41"
							height="40"
							viewBox="0 0 41 40"
							fill="none"
							:alt="logoAlt"
						>
							<path
								d="M40.5 20C40.5 8.95431 31.5457 0 20.5 0C9.4543 0 0.5 8.95431 0.5 20C0.5 31.0457 9.4543 40 20.5 40C31.5457 40 40.5 31.0457 40.5 20Z"
								fill="url(#paint0_linear_2159_846)" />
							<path
								d="M38.1604 20.0001C38.1604 10.2455 30.2528 2.33789 20.4982 2.33789C10.7436 2.33789 2.83594 10.2455 2.83594 20.0001C2.83594 29.7547 10.7436 37.6624 20.4982 37.6624C30.2528 37.6624 38.1604 29.7547 38.1604 20.0001Z"
								stroke="#FAFAFA"
								stroke-width="2.40312"
								stroke-miterlimit="10" />
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M15.7876 20.902C14.5933 20.621 13.7248 19.9 13.4321 19.578C13.4632 18.9264 13.5596 18.2779 13.7211 17.645C14.195 15.7975 15.2189 14.1677 16.6794 12.9329C17.7002 12.0698 18.867 11.4478 20.0525 11.132C21.2271 10.8195 22.397 10.8101 23.4349 11.1056C24.19 11.3202 24.8504 11.6857 25.3957 12.1911C25.969 12.723 26.3885 13.3839 26.6402 14.1568C27.3332 16.2811 26.5672 18.7911 24.6421 20.7086C23.4473 21.8967 21.9278 22.7458 20.2467 23.1626C19.3424 23.3865 18.4024 23.4814 17.4547 23.4425C17.1338 23.4302 16.8062 23.4034 16.4837 23.3603C16.0632 22.5175 15.8461 21.3699 15.7876 20.902ZM15.7876 20.902C15.6835 20.0032 15.7114 19.0882 15.9352 18.2188C16.291 16.8332 17.0585 15.6109 18.1539 14.6856C18.9183 14.0402 19.7775 13.5768 20.6398 13.3481C21.4167 13.1413 22.1671 13.1289 22.8087 13.3124C23.3868 13.4756 24.1434 13.88 24.4666 14.8722C24.6686 15.4911 24.6499 16.2018 24.4122 16.928C24.1605 17.6916 23.6835 18.4396 23.0294 19.0897C22.1298 19.987 20.977 20.6277 19.6983 20.945C19.0037 21.1161 18.2797 21.1891 17.5479 21.1596C16.9575 21.1363 16.3874 21.0576 15.7876 20.902Z"
								fill="url(#paint1_angular_2159_846)" />
							<path
								d="M21.6728 29.3941C21.9944 29.4284 22.3315 29.4455 22.6796 29.4455V29.4408C25.1018 29.4408 28.0399 28.5839 29.9603 26.1283C30.3487 25.6307 30.2617 24.9107 29.7645 24.5219C29.2674 24.1331 28.5495 24.2202 28.1595 24.7178C27.4106 25.6742 26.3945 26.3663 25.1422 26.7706C23.7625 27.217 22.5211 27.1781 21.9042 27.1143C21.1585 27.0381 20.4515 26.8562 19.8021 26.5716C19.19 26.3041 18.6244 25.9464 18.1225 25.5063C17.4476 24.9146 16.8919 24.1848 16.4834 23.3589C15.9235 23.2992 14.5917 23.0367 13.752 22.5469C13.7846 22.6759 13.8218 22.8019 13.8607 22.9295C14.3812 24.6199 15.3367 26.1082 16.6201 27.2309C17.299 27.825 18.0635 28.3102 18.8901 28.671C19.757 29.0504 20.6923 29.2931 21.6728 29.3941Z"
								fill="white" />
							<path
								d="M13.4321 19.5783C13.0794 19.2859 12.7236 18.9406 12.416 18.5472C12.0275 18.0496 11.3081 17.9625 10.811 18.3513C10.3138 18.74 10.2268 19.4601 10.6152 19.9577C11.636 21.264 12.9939 22.1302 13.7522 22.5486C13.6351 22.1973 13.4321 21.1239 13.4321 19.5783Z"
								fill="url(#paint2_linear_2159_846)" />
							<path
								d="M13.4321 19.5781C13.7248 19.9001 14.5933 20.6211 15.7876 20.9021C15.8461 21.37 16.0632 22.5176 16.4837 23.3604C15.9237 23.3007 14.592 23.0383 13.7522 22.5484C13.6351 22.1971 13.4321 21.1237 13.4321 19.5781Z"
								fill="white" />
							<defs>
								<linearGradient
									id="paint0_linear_2159_846"
									x1="34.6407"
									y1="5.85756"
									x2="6.35756"
									y2="34.1424"
									gradientUnits="userSpaceOnUse">
									<stop stop-color="#97D991" />
									<stop
										offset="0.11"
										stop-color="#92D691" />
									<stop
										offset="0.22"
										stop-color="#86D091" />
									<stop
										offset="0.33"
										stop-color="#74C691" />
									<stop
										offset="0.42"
										stop-color="#6DC192" />
									<stop
										offset="0.55"
										stop-color="#5CB597" />
									<stop
										offset="0.66"
										stop-color="#47A79E" />
									<stop
										offset="0.74"
										stop-color="#3B9C98" />
									<stop
										offset="0.89"
										stop-color="#1E7F88" />
									<stop
										offset="1"
										stop-color="#02657A" />
								</linearGradient>
								<radialGradient
									id="paint1_angular_2159_846"
									cx="0"
									cy="0"
									r="1"
									gradientUnits="userSpaceOnUse"
									gradientTransform="translate(20.1617 17.1708) rotate(139.686) scale(8.34625 8.94344)">
									<stop stop-color="white" />
									<stop
										offset="1"
										stop-color="#DDDDDD" />
								</radialGradient>
								<linearGradient
									id="paint2_linear_2159_846"
									x1="10.8995"
									y1="18.5312"
									x2="13.7097"
									y2="21.3414"
									gradientUnits="userSpaceOnUse">
									<stop stop-color="white" />
									<stop
										offset="1"
										stop-color="#D9D9D9" />
								</linearGradient>
							</defs>
						</svg>
					</div>
				</slot>

				<div class="b-navbar__title">
					<slot name="title">
						{{ title }}
					</slot>
				</div>

				<!-- Mobile Menu Toggle -->
				<button
					v-if="showMobileMenu"
					v-bind="mobileMenuButtonAria"
					class="b-navbar__menu-toggle"
					:aria-label="a11y.menuButtonLabel"
					@click="toggleMobileMenu"
					@keydown.enter="toggleMobileMenu"
					@keydown.space.prevent="toggleMobileMenu"
				>
					<BIcon 
						:name="isMobileMenuOpen ? 'close' : 'menu'"
						class="b-navbar__menu-icon"
					/>
					<span class="sr-only">{{ a11y.menuButtonLabel }}</span>
				</button>
			</div>

			<!-- Desktop Navigation -->
			<nav
				v-if="hasNavigationItems && !isMobile"
				v-bind="navigationAria"
				:id="navId"
				class="b-navbar__navigation"
			>
				<ul class="b-navbar__nav-list" role="list">
					<li
						v-for="(item, index) in navigationItems"
						:key="item.value"
						class="b-navbar__nav-item"
						role="none"
					>
						<component
							:is="item.href ? 'a' : 'button'"
							:href="item.href"
							:target="item.target"
							class="b-navbar__nav-link"
							:class="{
								'b-navbar__nav-link--current': isCurrentItem(item),
								'b-navbar__nav-link--disabled': item.disabled,
								'b-navbar__nav-link--active': navActiveIndex === index && navIsNavigating,
							}"
							:aria-current="isCurrentItem(item) ? 'page' : undefined"
							:aria-label="item.ariaLabel"
							:aria-disabled="item.disabled"
							:tabindex="item.disabled ? -1 : 0"
							@click="(e: MouseEvent) => selectNavigationItem(item, e)"
							@keydown.enter="(e: KeyboardEvent) => selectNavigationItem(item, e)"
							@keydown.space.prevent="(e: KeyboardEvent) => selectNavigationItem(item, e)"
						>
							<BIcon
								v-if="item.icon"
								:name="item.icon"
								class="b-navbar__nav-icon"
								aria-hidden="true"
							/>
							{{ item.label }}
						</component>
					</li>
				</ul>
			</nav>

			<!-- Default Content Slot (for legacy compatibility) -->
			<div v-if="!hasNavigationItems" class="b-navbar__content">
				<slot />
			</div>

			<!-- Actions Section -->
			<div class="b-navbar__actions">
				<slot name="actions">
					<!-- Notifications Button -->
					<button
						v-bind="notificationsButtonAria"
						class="b-navbar__action-button"
						:class="{ 'b-navbar__action-button--active': isNotificationsOpen }"
						:aria-label="a11y.notificationsLabel"
						@click="toggleNotifications"
						@keydown.enter="toggleNotifications"
						@keydown.space.prevent="toggleNotifications"
					>
						<BIcon
							name="notifications"
							class="b-navbar__action-icon"
							aria-hidden="true"
						/>
						<span class="sr-only">{{ a11y.notificationsLabel }}</span>
					</button>

					<!-- Notifications Dropdown -->
					<Teleport to="body">
						<Transition name="fade">
							<BCard
								v-if="isNotificationsOpen"
								ref="notificationsRef"
								:id="notificationsId"
								class="b-navbar__notifications"
								role="region"
								:aria-label="a11y.notificationsLabel"
								aria-modal="false"
							>
								<slot name="notifications">
									<div class="p-4">No notifications</div>
								</slot>
							</BCard>
						</Transition>
					</Teleport>

					<!-- User Profile -->
					<div
						v-if="profile"
						class="b-navbar__profile"
						:aria-label="a11y.profileLabel"
					>
						<BAvatar
							:name="profile.name"
							:src="profile.src"
							:aria-label="`${a11y.profileLabel}: ${profile.name}`"
						/>
					</div>
				</slot>
			</div>
		</div>

		<!-- Mobile Navigation Menu -->
		<nav
			v-if="showMobileMenu && isMobileMenuOpen"
			ref="mobileMenuRef"
			:id="mobileMenuId"
			class="b-navbar__mobile-menu"
			v-bind="navigationAria"
			:aria-expanded="isMobileMenuOpen"
			:aria-hidden="!isMobileMenuOpen"
		>
			<ul class="b-navbar__mobile-nav-list" role="list">
				<li
					v-for="(item, index) in navigationItems"
					:key="item.value"
					class="b-navbar__mobile-nav-item"
					role="none"
				>
					<component
						:is="item.href ? 'a' : 'button'"
						:href="item.href"
						:target="item.target"
						class="b-navbar__mobile-nav-link"
						:class="{
							'b-navbar__mobile-nav-link--current': isCurrentItem(item),
							'b-navbar__mobile-nav-link--disabled': item.disabled,
							'b-navbar__mobile-nav-link--active': navActiveIndex === index && navIsNavigating,
						}"
						:aria-current="isCurrentItem(item) ? 'page' : undefined"
						:aria-label="item.ariaLabel"
						:aria-disabled="item.disabled"
						:tabindex="item.disabled ? -1 : 0"
						@click="(e: MouseEvent) => selectNavigationItem(item, e)"
						@keydown.enter="(e: KeyboardEvent) => selectNavigationItem(item, e)"
						@keydown.space.prevent="(e: KeyboardEvent) => selectNavigationItem(item, e)"
					>
						<BIcon
							v-if="item.icon"
							:name="item.icon"
							class="b-navbar__mobile-nav-icon"
							aria-hidden="true"
						/>
						{{ item.label }}
					</component>
				</li>
			</ul>
		</nav>

		<!-- Mobile Menu Overlay -->
		<div
			v-if="isMobileMenuOpen"
			class="b-navbar__overlay"
			@click="closeMobileMenu"
			@keydown.escape="closeMobileMenu"
		/>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	.b-navbar {
		@apply relative flex flex-col w-full bg-emphasis border-b-xxs border-b-neutral-border-default;
	}

	.b-navbar--sticky {
		@apply sticky top-0 z-20;
	}

	.b-navbar__container {
		@apply flex items-center justify-between gap-sm py-sm px-xl;
	}

	/* Skip Link */
	.b-navbar__skip-link {
		@apply absolute top-0 left-0 bg-primary-interaction-default text-white px-4 py-xxs transform -translate-y-full focus:translate-y-0 transition-transform z-50 text-sm font-medium rounded-br-md;
	}

	.b-navbar__skip-link:focus {
		@apply outline-none ring-2 ring-primary-interaction-default ring-offset-2;
	}

	/* Brand Section */
	.b-navbar__brand {
		@apply flex items-center gap-4;
	}

	.b-navbar__logo {
		@apply flex-shrink-0;
	}

	.b-navbar__title {
		@apply text-lg leading-lg font-light text-primary-foreground-high;
	}

	/* Mobile Menu Toggle */
	.b-navbar__menu-toggle {
		@apply md:hidden flex items-center justify-center p-xxs rounded-md bg-transparent border-none cursor-pointer text-neutral-interaction-default hover:text-neutral-interaction-hover hover:bg-neutral-surface-highlight transition-colors duration-200 min-h-[44px] min-w-[44px];
	}

	.b-navbar__menu-toggle:focus {
		@apply outline-none ring-2 ring-primary-interaction-default ring-offset-2;
	}

	.b-navbar__menu-toggle[aria-expanded="true"] {
		@apply text-neutral-interaction-default bg-neutral-surface-highlight;
	}

	.b-navbar__menu-icon {
		@apply w-xl h-xl;
	}

	/* Desktop Navigation */
	.b-navbar__navigation {
		@apply flex items-center;
	}

	.b-navbar__nav-list {
		@apply flex items-center gap-xs list-none m-0 p-0;
	}

	.b-navbar__nav-item {
		@apply relative;
	}

	.b-navbar__nav-link {
		@apply flex items-center gap-xxs px-3 py-2 rounded-md text-sm font-medium text-neutral-interaction-default hover:text-neutral-interaction-hover hover:bg-neutral-surface-highlight transition-colors duration-200 cursor-pointer border-none bg-transparent no-underline min-h-[44px];
	}

	.b-navbar__nav-link:focus {
		@apply outline-none ring-2 ring-primary-interaction-default ring-offset-2;
	}

	.b-navbar__nav-link--current {
		@apply text-primary-interaction-default bg-primary-surface-highlight font-semibold;
	}

	.b-navbar__nav-link--current::after {
		@apply content-[''] absolute bottom-0 left-0 right-0 h-xxs bg-primary-interaction-default rounded-t-xxs;
	}

	.b-navbar__nav-link--disabled {
		@apply text-neutral-interaction-disabled cursor-not-allowed;
	}

	.b-navbar__nav-link--active {
		@apply ring-2 ring-primary-interaction-default ring-offset-1;
	}

	.b-navbar__nav-icon {
		@apply w-base h-base flex-shrink-0;
	}

	/* Content */
	.b-navbar__content {
		@apply flex items-center gap-4;
	}

	/* Actions Section */
	.b-navbar__actions {
		@apply flex items-center gap-4;
	}

	.b-navbar__action-button {
		@apply flex items-center justify-center p-xs rounded-md bg-transparent border-none cursor-pointer text-neutral-interaction-default hover:text-neutral-interaction-hover hover:bg-neutral-surface-highlight transition-colors duration-200 min-h-[44px] min-w-[44px];
	}

	.b-navbar__action-button:focus {
		@apply outline-none ring-2 ring-primary-interaction-default ring-offset-2;
	}

	.b-navbar__action-button--active {
		@apply text-neutral-interaction-default bg-neutral-surface-highlight;
	}

	.b-navbar__action-icon {
		@apply w-xl h-xl;
	}

	.b-navbar__profile {
		@apply flex items-center;
	}

	/* Notifications Dropdown */
	.b-navbar__notifications {
		@apply fixed z-900 min-w-[300px] max-w-[400px] max-h-[400px] overflow-y-auto shadow-xl;
	}

	/* Mobile Navigation Menu */
	.b-navbar__mobile-menu {
		@apply md:hidden absolute top-full left-0 right-0 bg-emphasis border-b-xxs border-b-neutral-border-default shadow-lg z-30;
	}

	.b-navbar__mobile-nav-list {
		@apply flex flex-col list-none m-0 p-0;
	}

	.b-navbar__mobile-nav-item {
		@apply border-b-xxs border-b-neutral-border-subtle last:border-b-0;
	}

	.b-navbar__mobile-nav-link {
		@apply flex items-center gap-sm px-xl py-4 text-base font-medium text-neutral-interaction-default hover:text-neutral-interaction-hover hover:bg-neutral-surface-highlight transition-colors duration-200 cursor-pointer border-none bg-transparent no-underline min-h-[56px] w-full text-left;
	}

	.b-navbar__mobile-nav-link:focus {
		@apply outline-none ring-2 ring-primary-interaction-default ring-offset-2 ring-offset-emphasis;
	}

	.b-navbar__mobile-nav-link--current {
		@apply text-primary-interaction-default bg-primary-surface-highlight font-semibold;
	}

	.b-navbar__mobile-nav-link--disabled {
		@apply text-neutral-interaction-disabled cursor-not-allowed;
	}

	.b-navbar__mobile-nav-link--active {
		@apply ring-2 ring-primary-interaction-default ring-offset-2 ring-offset-emphasis;
	}

	.b-navbar__mobile-nav-icon {
		@apply w-xl h-xl flex-shrink-0;
	}

	/* Mobile Menu Overlay */
	.b-navbar__overlay {
		@apply fixed inset-0 bg-overlay-default backdrop-blur-sm z-20 md:hidden;
	}

	/* Screen Reader Only */
	.sr-only {
		@apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
		clip: rect(0, 0, 0, 0);
	}

	/* Fade Transition */
	.fade-enter-active,
	.fade-leave-active {
		@apply transition-opacity duration-200;
	}

	.fade-enter-from,
	.fade-leave-to {
		@apply opacity-0;
	}

	/* High Contrast Mode Support */
	@media (prefers-contrast: high) {
		.b-navbar__nav-link:focus,
		.b-navbar__mobile-nav-link:focus,
		.b-navbar__action-button:focus,
		.b-navbar__menu-toggle:focus {
			@apply ring-4 ring-white;
		}

		.b-navbar__nav-link--current::after {
			@apply h-xs bg-white;
		}
	}

	/* Reduced Motion Support */
	@media (prefers-reduced-motion: reduce) {
		.b-navbar__nav-link,
		.b-navbar__mobile-nav-link,
		.b-navbar__action-button,
		.b-navbar__menu-toggle,
		.fade-enter-active,
		.fade-leave-active {
			@apply transition-none;
		}
	}

	/* Touch Target Improvements */
	@media (hover: none) and (pointer: coarse) {
		.b-navbar__nav-link,
		.b-navbar__mobile-nav-link {
			@apply min-h-[48px];
		}

		.b-navbar__action-button,
		.b-navbar__menu-toggle {
			@apply min-h-[48px] min-w-[48px];
		}
	}
</style>