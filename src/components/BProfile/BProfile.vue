<script setup lang="ts">
	import { ref, computed, watch, nextTick } from "vue";
	import { useOptionalModel } from "#composables";
	import { useAriaAttributes } from "#composables/useAriaAttributes";
	import { useScreenReader, screenReaderUtils } from "#composables/useScreenReader";
	import { useKeyboardNavigation } from "#composables/useKeyboardNavigation";
	import { useFocusTrap } from "#composables/useFocusTrap";
	import type {
		ProfileAccount,
		ProfileContactMethod,
		ProfileAccessibilityConfig,
		BProfileProps,
		BProfileEmits,
		ProfileUserStatus,
		ProfileLoadingState,
		ProfileKeyboardNavigation,
		ProfileFocusConfig,
		defaultAccessibilityConfig,
		defaultKeyboardNavigationConfig,
		defaultFocusConfig,
	} from "./BProfile.types";

	// Re-export types for backward compatibility
	export type {
		ProfileAccount,
		ProfileContactMethod,
		ProfileAccessibilityConfig,
		BProfileProps,
		BProfileEmits,
		ProfileUserStatus,
		ProfileLoadingState,
	} from "./BProfile.types";

	const props = withDefaults(
		defineProps<BProfileProps>(),
		{
			modelValue: null,
			nameKey: "name",
			absolute: false,
			disabled: false,
			contactMethods: () => [],
			accessibility: () => ({}),
			profilePictureAlt: "Profile picture",
			userRole: "",
			userBio: "",
			enableKeyboardNavigation: true,
			highContrast: false,
		}
	);

	const emit = defineEmits<BProfileEmits>();

	const [model] = useOptionalModel<ProfileAccount | null>(props, "modelValue", emit, null);
	let isExpanded = ref(false);
	let onFocusInput = ref(false);
	let searchValue = ref("");
	const profileContainer = ref<HTMLElement | null>(null);
	const dropdownContainer = ref<HTMLElement | null>(null);
	const profileTrigger = ref<HTMLElement | null>(null);

	// Accessibility composables
	const { useAriaId, useComboboxAria, useListboxAria, useOptionAria, useButtonAria } = useAriaAttributes();
	const { announce, announcePolitely, announceAssertively } = useScreenReader();
	
	// Generate unique IDs for ARIA relationships
	const profileId = useAriaId('profile');
	const listboxId = useAriaId('profile-listbox');
	const searchId = useAriaId('profile-search');
	const descriptionId = useAriaId('profile-description');
	
	// Focus trap for dropdown
	useFocusTrap(dropdownContainer, isExpanded);

	/**
	 * Filters accounts by name based on the search string.
	 * @param search - The search string to filter accounts
	 * @returns Array of filtered accounts or empty array if no accounts
	 */
	function searchByName(search: string): ProfileAccount[] {
		if (!props.accounts) {
			return [];
		}
		if (!search) {
			return props.accounts;
		}
		return props.accounts.filter((account: ProfileAccount) => {
			const accountName = account[props.nameKey as keyof ProfileAccount];
			if (typeof accountName === 'string') {
				return accountName.toLowerCase().includes(search.toLowerCase());
			}
			return false;
		});
	}
	
	/**
	 * Handles profile picture error (missing image)
	 */
	function handleImageError(event: Event): void {
		const img = event.target as HTMLImageElement;
		img.style.display = 'none';
		// Show fallback icon instead
	}
	
	/**
	 * Gets contact method icon based on type
	 */
	function getContactIcon(method: ProfileContactMethod): string {
		if (method.icon) return method.icon;
		
		switch (method.type) {
			case 'email': return 'email';
			case 'phone': return 'phone';
			case 'website': return 'language';
			case 'social': return 'share';
			default: return 'contact_mail';
		}
	}
	
	/**
	 * Handles contact method interaction
	 */
	function handleContactMethod(method: ProfileContactMethod, event: Event): void {
		event.preventDefault();
		
		if (method.type === 'email') {
			window.location.href = `mailto:${method.value}`;
		} else if (method.type === 'phone') {
			window.location.href = `tel:${method.value}`;
		} else if (method.type === 'website' || method.type === 'social') {
			window.open(method.value, '_blank', 'noopener,noreferrer');
		}
		
		// Announce the action
		announcePolitely(`Opening ${method.label}`);
	}

	/**
	 * Changes the selected account and emits the change events.
	 * @param account - The account to select
	 */
	function changeAccount(account: ProfileAccount): void {
		isExpanded.value = false;
		model.value = account;
		emit("update:modelValue", account);
		emit("changeAccount", account);
		
		// Announce account change
		if (props.accessibility?.announceChanges !== false) {
			const accountName = account[props.nameKey as keyof ProfileAccount] as string;
			screenReaderUtils.announceSelection(accountName || 'account');
		}
		
		// Reset keyboard navigation
		accountsNavigation.reset();
		
		// Return focus to trigger
		profileTrigger.value?.focus();
	}

	/**
	 * Changes the expanded state of the profile dropdown with a small delay.
	 * @param expanded - Whether the dropdown should be expanded
	 */
	function changeExpanded(expanded: boolean): void {
		setTimeout(() => {
			isExpanded.value = expanded;
			
			// Announce state changes for screen readers
			if (props.accessibility?.announceChanges !== false) {
				if (expanded) {
					announcePolitely(`Profile menu opened. ${filteredAccounts.value.length} accounts available.`);
				} else {
					announcePolitely('Profile menu closed.');
				}
			}
			
			// Focus management
			if (expanded) {
				nextTick(() => {
					const searchInput = dropdownContainer.value?.querySelector('input[type="search"]') as HTMLInputElement;
					if (searchInput) {
						searchInput.focus();
					}
				});
			}
		});
	}
	
	/**
	 * Handles keyboard events for the profile component
	 */
	function handleKeydown(event: KeyboardEvent): void {
		if (!props.enableKeyboardNavigation) return;
		
		if (isExpanded.value && accountsNavigation.handleKeydown(event)) {
			// Navigation handled by keyboard navigation composable
			return;
		}
		
		if (event.key === 'Escape' && isExpanded.value) {
			changeExpanded(false);
			profileTrigger.value?.focus();
		}
	}
	
	/**
	 * Announces profile contact information
	 */
	function announceContactMethods(): void {
		if (!props.contactMethods?.length || props.accessibility?.announceChanges === false) return;
		
		const contactText = props.contactMethods
			.map(method => `${method.label}: ${method.value}`)
			.join(', ');
			
		announcePolitely(`Contact information: ${contactText}`);
	}
	
	// Computed properties for accessibility
	const filteredAccounts = computed(() => searchByName(searchValue.value));
	
	// Keyboard navigation for accounts (must be after filteredAccounts)
	const accountsNavigation = useKeyboardNavigation(
		filteredAccounts,
		(account: ProfileAccount) => {
			changeAccount(account);
		},
		{ loop: true }
	);
	
	const profileAriaLabel = computed(() => {
		if (props.accessibility?.ariaLabel) {
			return props.accessibility.ariaLabel;
		}
		
		const currentName = model.value ? model.value[props.nameKey] || props.name : props.name;
		const roleText = props.userRole ? `, ${props.userRole}` : '';
		const contextText = props.accessibility?.profileContext ? `, ${props.accessibility.profileContext}` : '';
		
		return `User profile for ${currentName}${roleText}${contextText}`;
	});
	
	const profilePictureAltText = computed(() => {
		if (props.profilePictureAlt && props.profilePictureAlt !== 'Profile picture') {
			return props.profilePictureAlt;
		}
		
		const currentName = model.value ? model.value[props.nameKey] || props.name : props.name;
		return `Profile picture of ${currentName}`;
	});
	
	// ARIA attributes for different elements
	const activeDescendantId = computed(() => 
		accountsNavigation.activeIndex.value >= 0 
			? `option-${accountsNavigation.activeIndex.value}` 
			: ''
	);
	
	const triggerAriaAttributes = useComboboxAria(
		isExpanded,
		true,
		listboxId,
		activeDescendantId
	);
	
	const listboxAriaAttributes = useListboxAria(false, 'vertical');
	
	// Watch for model changes to announce
	watch(model, (newAccount, oldAccount) => {
		if (newAccount !== oldAccount && props.accessibility?.announceChanges !== false) {
			const accountName = newAccount 
				? newAccount[props.nameKey as keyof ProfileAccount] as string
				: props.name;
			announcePolitely(`Current account: ${accountName}`);
		}
	}, { deep: true });
	
	// Watch search value changes
	watch(searchValue, (newValue) => {
		accountsNavigation.reset();
		if (newValue && filteredAccounts.value.length === 0) {
			announcePolitely('No accounts found');
		} else if (newValue && filteredAccounts.value.length > 0) {
			announcePolitely(`${filteredAccounts.value.length} accounts found`);
		}
	});
</script>

<template>
	<div
		ref="profileContainer"
		:class="[
			'b-profile',
			{ 'high-contrast': highContrast },
			{ 'interactive': accessibility?.interactive !== false }
		]"
		:role="accessibility?.role || 'region'"
		:aria-label="profileAriaLabel"
		:aria-describedby="accessibility?.ariaDescription ? descriptionId : undefined"
		@keydown="handleKeydown">
		
		<!-- Hidden description for screen readers -->
		<div
			v-if="accessibility?.ariaDescription"
			:id="descriptionId"
			class="sr-only">
			{{ accessibility.ariaDescription }}
		</div>
		
		<BSelectContainer
			v-model="isExpanded"
			class="profile-container"
			aria-multiselectable="false"
			:absolute="absolute"
			:disabled="disabled"
			dont-have-max-height
			min-width="25em">
			
			<!-- Profile Trigger -->
			<button
				v-if="!isExpanded"
				ref="profileTrigger"
				type="button"
				class="profile-trigger flex items-center gap-xs text-2xl mr-xxs text-neutral-interaction-default focus:outline-none focus:ring-2 focus:ring-primary-interaction-default focus:ring-offset-2 rounded"
				:aria-expanded="isExpanded"
				:aria-haspopup="'listbox'"
				:aria-controls="listboxId"
				role="combobox"
				:aria-label="`Open profile menu for ${model ? model[nameKey] || name : name}`"
				:disabled="disabled"
				@click="changeExpanded(!isExpanded)"
				@keydown.enter.prevent="changeExpanded(!isExpanded)"
				@keydown.space.prevent="changeExpanded(!isExpanded)">
				
				<!-- Profile Picture -->
				<img
					v-if="profilePicture"
					class="profile-picture w-[1em] h-[1em]"
					:src="profilePicture"
					:alt="profilePictureAltText"
					@error="handleImageError" />
				<BIcon
					v-else
					name="account_circle"
					:aria-label="`Default avatar for ${model ? model[nameKey] || name : name}`" />
				
				<!-- Profile Name -->
				<span class="text-sm font-bold profile-name">
					{{ model ? model[nameKey] || name : name }}
					<span v-if="userRole" class="sr-only">, {{ userRole }}</span>
				</span>
				
				<!-- Dropdown indicator -->
				<BIcon
					name="expand_more"
					size="sm"
					class="dropdown-arrow"
					aria-hidden="true" />
			</button>

			<template #items>
				<div
					ref="dropdownContainer"
					class="profile-dropdown"
					role="menu"
					:aria-labelledby="profileId">
					
					<!-- Profile Header -->
					<header
						class="profile-header flex flex-col items-center text-9xl px-xs pb-sm border-b-xxs text-neutral-interaction-default border-neutral-border-default gap-xs"
						role="banner"
						:aria-labelledby="profileId">
						
						<!-- Large Profile Picture -->
						<img
							v-if="profilePicture"
							class="profile-picture w-[1.3em] h-[1.3em] mb-xxs text-8xl"
							:src="profilePicture"
							:alt="profilePictureAltText"
							@error="handleImageError" />
						<BIcon
							v-else
							name="account_circle"
							size="1"
							:aria-label="`Default avatar for ${model ? model[nameKey] || name : name}`" />
						
						<!-- Profile Name and Role -->
						<div class="text-center">
							<p
								v-if="model && model[nameKey] && name"
								class="text-sm text-center"
								role="text">
								{{ name }}
							</p>
							<h2
								:id="profileId"
								class="text-3xl font-bold mb-xxs text-center"
								v-if="(model && model[nameKey]) || name">
								{{ model ? model[nameKey] || name : name }}
							</h2>
							<p
								v-if="userRole"
								class="text-xs text-neutral-interaction-muted"
								role="text">
								{{ userRole }}
							</p>
						</div>
						
						<!-- User Bio -->
						<p
							v-if="userBio"
							class="text-xs text-center text-neutral-interaction-muted max-w-full"
							role="text">
							{{ userBio }}
						</p>
						
						<!-- Contact Methods -->
						<div
							v-if="contactMethods && contactMethods.length"
							class="contact-methods flex flex-wrap gap-xs mt-xs"
							role="list"
							aria-label="Contact methods">
							<button
								v-for="(method, index) in contactMethods"
								:key="index"
								type="button"
								class="contact-method-btn flex items-center gap-xxs px-xs py-xxs text-xs rounded border hover:bg-neutral-surface-highlight focus:outline-none focus:ring-2 focus:ring-primary-interaction-default"
								:class="{ 'border-primary-interaction-default': method.primary }"
								role="listitem"
								:aria-label="`Contact via ${method.label}: ${method.value}`"
								@click="handleContactMethod(method, $event)"
								@keydown.enter.prevent="handleContactMethod(method, $event)"
								@keydown.space.prevent="handleContactMethod(method, $event)">
								<BIcon
									:name="getContactIcon(method)"
									size="sm"
									aria-hidden="true" />
								<span>{{ method.label }}</span>
							</button>
						</div>
						
						<!-- Edit Profile Button -->
						<BButton
							type="button"
							variant="primary"
							class="mb-xxs truncate"
							role="menuitem"
							:aria-label="`Edit profile for ${model ? model[nameKey] || name : name}`"
							:disabled="!name && !profilePicture"
							@click="emit('editProfile')"
							@keydown.enter.prevent="emit('editProfile')"
							@keydown.space.prevent="emit('editProfile')">
							<slot name="editProfile"> Edit profile </slot>
						</BButton>
					</header>

					<!-- Account Switcher -->
					<section
						v-if="accounts && accounts.length"
						class="account-switcher flex flex-col items-center border-b-xxs text-neutral-interaction-default border-neutral-border-default"
						role="search"
						aria-label="Account search and selection">
						
						<!-- Search Input -->
						<div class="search-container flex items-center w-full relative">
							<div
								class="absolute left-1.5 text-xl"
								:class="{
									'text-primary-interaction-default': onFocusInput === true,
								}"
								aria-hidden="true">
								<BIcon
									name="search"
									size="xl" />
							</div>
							<input
								:id="searchId"
								v-model="searchValue"
								type="search"
								class="input-default"
								role="searchbox"
								:aria-controls="listboxId"
								:aria-label="`Search accounts. ${filteredAccounts.length} accounts available.`"
								:aria-describedby="filteredAccounts.length === 0 ? 'no-results' : undefined"
								placeholder="Search accounts"
								@focus="onFocusInput = true"
								@blur="onFocusInput = false"
								@keydown="handleKeydown" />
						</div>
						
						<!-- No Results Message -->
						<div
							v-if="searchValue && filteredAccounts.length === 0"
							id="no-results"
							class="text-sm text-neutral-interaction-muted p-xs"
							role="status"
							aria-live="polite">
							No accounts found for "{{ searchValue }}"
						</div>
						
						<!-- Account List -->
						<div
							v-if="filteredAccounts.length > 0"
							class="account-list w-full text-neutral-interaction-default"
							:class="{
								'pr-xxs py-xxs': filteredAccounts.length > 4,
							}">
							<ul
								:id="listboxId"
								v-bind="listboxAriaAttributes"
								class="w-full flex flex-col divide-y-xxs divide-neutral-border-default font-bold max-h-[12em] overflow-auto custom-scroll"
								role="listbox"
								:aria-label="`Account selection. ${filteredAccounts.length} accounts available`">
								<li
									v-for="(account, index) in filteredAccounts"
									:key="`account-${index}`"
									:id="`option-${index}`"
									role="option"
									:aria-selected="JSON.stringify(model || {}) === JSON.stringify(account || {})"
									:aria-label="`Switch to account: ${account[nameKey]}`"
									class="profile-option justify-start w-full *:text-sm cursor-pointer"
									:class="{
										'bg-primary-surface-default text-primary-interaction-default': accountsNavigation.activeIndex.value === index,
										'hover:bg-neutral-surface-highlight': accountsNavigation.activeIndex.value !== index,
										'selected-account': JSON.stringify(model || {}) === JSON.stringify(account || {})
									}"
									tabindex="-1"
									@click="changeAccount(account)"
									@keydown.enter.prevent="changeAccount(account)"
									@keydown.space.prevent="changeAccount(account)">
									
									<slot
										name="account"
										:account="account"
										:index="index"
										:active="JSON.stringify(model || {}) === JSON.stringify(account || {})"
										:aria-selected="JSON.stringify(model || {}) === JSON.stringify(account || {})">
										<div class="flex items-center gap-xs">
											<BIcon
												name="account_circle"
												size="sm"
												aria-hidden="true" />
											<span
												class="text-sm"
												:class="{
													'underline font-bold': JSON.stringify(model || {}) === JSON.stringify(account || {}),
												}">
												{{ account[nameKey] }}
											</span>
											<!-- Selection indicator -->
											<BIcon
												v-if="JSON.stringify(model || {}) === JSON.stringify(account || {})"
												name="check"
												size="sm"
												class="ml-auto text-primary-interaction-default"
												aria-label="Currently selected" />
										</div>
									</slot>
								</li>
							</ul>
						</div>
					</section>

					<!-- Actions Menu -->
					<nav
						class="actions-menu flex flex-col divide-y-xxs divide-neutral-border-default"
						role="menu"
						aria-label="Profile actions">
						
						<!-- Edit Account -->
						<button
							v-if="model"
							type="button"
							class="profile-option action text-neutral-interaction-default hover:bg-neutral-surface-highlight focus:outline-none focus:bg-neutral-surface-highlight"
							role="menuitem"
							:aria-label="`Edit account settings for ${model[nameKey]}`"
							@click="emit('editAccount')"
							@keydown.enter.prevent="emit('editAccount')"
							@keydown.space.prevent="emit('editAccount')">
							<BIcon
								name="person"
								size="xl"
								aria-hidden="true" />
							<span class="text-sm font-bold">
								<slot name="editAccount"> Edit account </slot>
							</span>
						</button>
						
						<!-- Logout -->
						<button
							type="button"
							class="profile-option action text-danger-interaction-default hover:bg-danger-surface-default focus:outline-none focus:bg-danger-surface-default"
							role="menuitem"
							aria-label="Sign out from account"
							@click="emit('logout')"
							@keydown.enter.prevent="emit('logout')"
							@keydown.space.prevent="emit('logout')">
							<BIcon
								name="logout"
								size="xl"
								aria-hidden="true" />
							<span class="text-sm font-bold">
								<slot name="logout"> Logout </slot>
							</span>
						</button>
					</nav>

					<!-- Footer Links -->
					<footer
						class="profile-footer flex items-center justify-center px-xs py-sm pt-xl text-neutral-interaction-default font-bold text-xxs gap-5"
						role="contentinfo"
						aria-label="Legal and policy links">
						<button
							type="button"
							class="footer-link hover:underline focus:outline-none focus:underline"
							aria-label="Open privacy policy"
							@click="emit('privacyPolicyFunction')"
							@keydown.enter.prevent="emit('privacyPolicyFunction')"
							@keydown.space.prevent="emit('privacyPolicyFunction')">
							<slot name="privacyPolicy"> Privacy Policy </slot>
						</button>
						<button
							type="button"
							class="footer-link hover:underline focus:outline-none focus:underline"
							aria-label="Open terms of use"
							@click="emit('termsOfUseFunction')"
							@keydown.enter.prevent="emit('termsOfUseFunction')"
							@keydown.space.prevent="emit('termsOfUseFunction')">
							<slot name="termsOfUse"> Terms of use </slot>
						</button>
					</footer>
				</div>
			</template>
		</BSelectContainer>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	/* Base Profile Styles */
	.b-profile {
		@apply relative;
	}

	.b-profile.high-contrast {
		@apply contrast-more:text-black contrast-more:bg-white;
	}

	.b-profile.interactive .profile-trigger:focus,
	.b-profile.interactive .contact-method-btn:focus,
	.b-profile.interactive .profile-option:focus {
		@apply ring-2 ring-primary-interaction-default ring-offset-2;
	}

	/* Profile Picture */
	.profile-picture {
		@apply rounded-full object-cover;
		transition: opacity 0.2s ease;
	}

	.profile-picture:hover {
		@apply opacity-90;
	}

	/* Profile Trigger */
	.profile-trigger {
		@apply w-full text-left transition-all duration-200;
	}

	.profile-trigger:hover {
		@apply bg-neutral-surface-highlight;
	}

	.profile-trigger:focus {
		@apply ring-2 ring-primary-interaction-default ring-offset-2 outline-none;
	}

	.profile-trigger[aria-expanded="true"] .dropdown-arrow {
		@apply rotate-180;
	}

	.dropdown-arrow {
		@apply transition-transform duration-200;
	}

	/* Profile Dropdown */
	.profile-dropdown {
		@apply flex flex-col min-w-0;
	}

	/* Profile Header */
	.profile-header {
		@apply relative;
	}

	/* Contact Methods */
	.contact-methods {
		@apply justify-center;
	}

	.contact-method-btn {
		@apply transition-all duration-200;
	}

	.contact-method-btn:hover {
		@apply shadow-sm transform scale-105;
	}

	.contact-method-btn:focus {
		@apply ring-2 ring-primary-interaction-default ring-offset-1;
	}

	.contact-method-btn[aria-pressed="true"] {
		@apply bg-primary-surface-default text-primary-interaction-default;
	}

	/* Search Container */
	.search-container {
		@apply relative;
	}

	/* Account List */
	.account-list {
		@apply relative;
	}

	/* Profile Options */
	.profile-option {
		@apply flex items-center gap-xs p-xs cursor-pointer transition-all duration-200;
		min-height: 44px; /* Touch target minimum */
	}

	.profile-option:hover {
		@apply bg-neutral-surface-highlight;
	}

	.profile-option:focus {
		@apply outline-none ring-2 ring-primary-interaction-default ring-inset;
	}

	.profile-option.action {
		@apply p-xs text-xl;
	}

	.profile-option[aria-selected="true"] {
		@apply bg-primary-surface-default text-primary-interaction-default font-semibold;
	}

	.profile-option[aria-current="true"]::before {
		content: "";
		@apply absolute left-0 top-0 bottom-0 w-1 bg-primary-interaction-default;
	}

	.selected-account {
		@apply bg-primary-surface-highlight border-l-4 border-primary-interaction-default;
	}

	/* Actions Menu */
	.actions-menu button {
		@apply w-full text-left transition-all duration-200;
	}

	.actions-menu button:focus {
		@apply outline-none ring-2 ring-primary-interaction-default ring-inset;
	}

	.actions-menu button[role="menuitem"]:hover {
		@apply bg-neutral-surface-highlight;
	}

	/* Footer Links */
	.profile-footer {
		@apply border-t border-neutral-border-default;
	}

	.footer-link {
		@apply transition-all duration-200 px-2 py-1 rounded;
	}

	.footer-link:focus {
		@apply outline-none ring-2 ring-primary-interaction-default ring-offset-1;
	}

	.footer-link:hover {
		@apply bg-neutral-surface-highlight;
	}

	/* Input Styles */
	.input-default {
		@apply w-full text-sm border-0 border-b-xxs border-neutral-border-default placeholder:text-neutral-interaction-default py-xs pr-xs pl-2xl outline-0 transition-all duration-200;
	}

	.input-default:focus {
		@apply border-primary-interaction-default ring-1 ring-primary-interaction-default;
	}

	/* Screen Reader Only */
	.sr-only {
		@apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
		clip: rect(0, 0, 0, 0);
	}

	/* High Contrast Mode Support */
	@media (prefers-contrast: high) {
		.profile-trigger:focus,
		.contact-method-btn:focus,
		.profile-option:focus,
		.footer-link:focus {
			@apply ring-4 ring-black;
		}

		.profile-option[aria-selected="true"] {
			@apply bg-black text-white;
		}

		.selected-account {
			@apply border-black;
		}
	}

	/* Reduced Motion Support */
	@media (prefers-reduced-motion: reduce) {
		.profile-trigger,
		.contact-method-btn,
		.profile-option,
		.dropdown-arrow,
		.footer-link {
			@apply transition-none;
		}

		.contact-method-btn:hover {
			@apply transform-none scale-100;
		}
	}

	/* Dark Mode Support */
	@media (prefers-color-scheme: dark) {
		.b-profile.high-contrast {
			@apply contrast-more:text-white contrast-more:bg-black;
		}
	}

	/* Focus Visible Support */
	.profile-trigger:focus-visible,
	.contact-method-btn:focus-visible,
	.profile-option:focus-visible,
	.footer-link:focus-visible {
		@apply ring-2 ring-primary-interaction-default ring-offset-2;
	}

	/* Keyboard Navigation Indicators */
	.profile-option[data-keyboard-focus="true"] {
		@apply bg-primary-surface-default text-primary-interaction-default;
	}
</style>
