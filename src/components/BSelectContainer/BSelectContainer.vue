<script setup lang="ts">
	// @TODO: Fix the initial size of the label div. I think it's due to the dynamic loading
	// of ionicons not triggering a div resize event to the observer. Or it could be some
	// slot content shenanigans aswell, idk.
	// @TODO: Fix border width for container with sub items
	import { 
		ref, 
		onMounted, 
		onBeforeUnmount, 
		onUpdated, 
		computed, 
		nextTick,
		watch 
	} from "vue";
	import type { BContainerModelExtra } from "../../utils/components/BContainerModelExtra.types";
	import type { 
		BSelectContainerProps,
		BSelectContainerEmits,
		BSelectContainerState,
		BSelectContainerAriaAttributes,
		BSelectContainerItem,
		DEFAULT_ACCESSIBILITY_CONFIG,
		DEFAULT_KEYBOARD_CONFIG,
		DEFAULT_FOCUS_CONFIG
	} from "./BSelectContainer.types";
	import { useOptionalModel, useAriaAttributes, useScreenReader, useFocusTrap } from "#composables";

	const props = withDefaults(
		defineProps<BSelectContainerProps & {
			modelValue?: boolean;
			labelValue?: string;
			role?: string;
			absolute?: boolean;
			disabled?: boolean;
			isError?: boolean;
			errorMessage?: string;
			infoMessage?: string;
			required?: boolean;
			closeOnBlur?: boolean;
			dontHaveMaxHeight?: boolean;
			maxHeight?: string;
			minWidth?: string;
			secondary?: boolean;
			hideArrow?: boolean;
		}>(),
		{
			// Legacy props
			modelValue: undefined,
			labelValue: "",
			role: "listbox",
			absolute: false,
			disabled: false,
			isError: false,
			errorMessage: "",
			infoMessage: "",
			required: false,
			closeOnBlur: true,
			dontHaveMaxHeight: false,
			maxHeight: "40px",
			minWidth: "15em",
			secondary: false,
			hideArrow: false,
			// Accessibility props with defaults
			...DEFAULT_ACCESSIBILITY_CONFIG,
			keyboardConfig: () => DEFAULT_KEYBOARD_CONFIG,
			focusConfig: () => DEFAULT_FOCUS_CONFIG,
		}
	);

	const emit = defineEmits<BSelectContainerEmits & {
		"update:modelValue": [value: boolean, extra: BContainerModelExtra];
	}>();

	// Composables
	const [model, setModel] = useOptionalModel<boolean>(
		props,
		"modelValue",
		emit,
		false
	);
	const { useAriaId } = useAriaAttributes();
	const { announcePolitely, announceAssertively } = useScreenReader();
	const { trapFocus, releaseFocusTrap } = useFocusTrap();

	// Template refs
	const container = ref<HTMLDivElement>();
	const fatherContainer = ref<HTMLDivElement>();
	const content = ref<HTMLDivElement>();
	const triggerElement = ref<HTMLElement>();
	const listElement = ref<HTMLElement>();
	
	// Observers
	const resizeObserver = new ResizeObserver(resize);
	const mutationObserver = new MutationObserver(resize);

	// Reactive state
	const containerId = computed(() => useAriaId('select-container'));
	const listboxId = computed(() => `${containerId.value}-listbox`);
	const helpTextId = computed(() => props.helpText ? `${containerId.value}-help` : undefined);
	const errorId = computed(() => props.errorMessage ? `${containerId.value}-error` : undefined);
	const isFocused = ref(false);
	const focusedItemIndex = ref<number>(-1);
	const searchQuery = ref('');
	const typeAheadTimeout = ref<NodeJS.Timeout | null>(null);

	// Computed properties
	const isExpanded = computed((): boolean =>
		props.disabled ? false : model.value
	);

	const isDisabled = computed((): boolean => props.disabled);
	const isRequired = computed((): boolean => props.required);
	const hasError = computed((): boolean => props.isError || !!props.errorMessage);

	// Component state for accessibility
	const containerState = computed((): BSelectContainerState => ({
		isExpanded: isExpanded.value,
		isDisabled: isDisabled.value,
		hasFocus: isFocused.value,
		hasError: hasError.value,
		isRequired: isRequired.value,
		isLoading: props.loading || false,
		searchQuery: searchQuery.value,
		focusedItemIndex: focusedItemIndex.value,
		selectedItems: [], // Will be updated by actual implementation
		totalItems: 0, // Will be updated by actual implementation
		filteredItems: 0, // Will be updated by actual implementation
	}));

	// ARIA attributes
	const ariaAttributes = computed((): BSelectContainerAriaAttributes => {
		const describedByIds = [
			props.ariaDescribedBy,
			helpTextId.value,
			errorId.value,
		].filter(Boolean);

		return {
			role: props.role || 'combobox',
			'aria-expanded': isExpanded.value,
			'aria-haspopup': 'listbox',
			'aria-controls': listboxId.value,
			...(props.ariaLabel && { 'aria-label': props.ariaLabel }),
			...(props.ariaLabelledBy && { 'aria-labelledby': props.ariaLabelledBy }),
			...(describedByIds.length > 0 && { 'aria-describedby': describedByIds.join(' ') }),
			...(hasError.value && { 'aria-invalid': true }),
			...(isRequired.value && { 'aria-required': true }),
			...(isDisabled.value && { 'aria-disabled': true }),
			...(props.loading && { 'aria-busy': true }),
			...(props.multiSelect && { 'aria-multiselectable': true }),
			...(focusedItemIndex.value >= 0 && { 'aria-activedescendant': `${listboxId.value}-item-${focusedItemIndex.value}` }),
		};
	});

	// Watch for state changes and announcements
	watch(
		() => isExpanded.value,
		(newExpanded, oldExpanded) => {
			if (newExpanded !== oldExpanded && props.announceChanges) {
				const message = props.stateAnnouncementTemplate
					?.replace('{state}', newExpanded ? 'opened' : 'closed')
					?.replace('{itemCount}', containerState.value.totalItems.toString()) 
					|| `Select container ${newExpanded ? 'opened' : 'closed'}`;
				announcePolitely(message);
			}

			if (newExpanded) {
				handleContainerOpen();
			} else {
				handleContainerClose();
			}
		}
	);

	// Focus management
	function handleContainerOpen(): void {
		emit('opened', containerState.value);
		
		nextTick(() => {
			if (props.focusConfig?.trapFocus && content.value) {
				trapFocus(content.value);
			}

			// Set initial focus based on configuration
			const initialFocus = props.focusConfig?.initialFocus || 'first-item';
			switch (initialFocus) {
				case 'first-item':
					focusedItemIndex.value = 0;
					break;
				case 'container':
					content.value?.focus();
					break;
				case 'none':
				default:
					break;
			}
		});
	}

	function handleContainerClose(): void {
		emit('closed', containerState.value);
		
		if (props.focusConfig?.trapFocus) {
			releaseFocusTrap();
		}

		// Reset focus state
		focusedItemIndex.value = -1;
		searchQuery.value = '';

		// Restore focus to trigger if configured
		if (props.focusConfig?.restoreFocus && triggerElement.value) {
			triggerElement.value.focus();
		}
	}

	// Keyboard event handling
	function handleKeydown(event: KeyboardEvent): void {
		if (isDisabled.value) return;

		const { key } = event;
		const keyboardConfig = props.keyboardConfig || DEFAULT_KEYBOARD_CONFIG;

		// Handle opening keys
		if (!isExpanded.value && keyboardConfig.openKeys?.includes(key)) {
			event.preventDefault();
			openContainer();
			return;
		}

		// Handle closing keys
		if (isExpanded.value && keyboardConfig.closeKeys?.includes(key)) {
			event.preventDefault();
			closeContainer();
			return;
		}

		// Handle navigation when expanded
		if (isExpanded.value) {
			handleExpandedKeydown(event);
		}

		emit('keyboard', event, `key-${key}`);
	}

	function handleExpandedKeydown(event: KeyboardEvent): void {
		const { key } = event;
		const keyboardConfig = props.keyboardConfig || DEFAULT_KEYBOARD_CONFIG;

		switch (key) {
			case 'ArrowDown':
				event.preventDefault();
				navigateItems(1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				navigateItems(-1);
				break;
			case 'Home':
				if (keyboardConfig.homeEndNavigation) {
					event.preventDefault();
					focusedItemIndex.value = 0;
				}
				break;
			case 'End':
				if (keyboardConfig.homeEndNavigation) {
					event.preventDefault();
					focusedItemIndex.value = containerState.value.totalItems - 1;
				}
				break;
			default:
				// Type-ahead search
				if (keyboardConfig.typeAhead && key.length === 1) {
					handleTypeAhead(key);
				}
				break;
		}
	}

	function navigateItems(direction: number): void {
		const totalItems = containerState.value.totalItems;
		if (totalItems === 0) return;

		let newIndex = focusedItemIndex.value + direction;
		
		const keyboardConfig = props.keyboardConfig || DEFAULT_KEYBOARD_CONFIG;
		if (keyboardConfig.wrapNavigation) {
			if (newIndex < 0) {
				newIndex = totalItems - 1;
			} else if (newIndex >= totalItems) {
				newIndex = 0;
			}
		} else {
			newIndex = Math.max(0, Math.min(newIndex, totalItems - 1));
		}

		focusedItemIndex.value = newIndex;
		emit('focus-changed', newIndex, null); // Item will be provided by actual implementation
	}

	function handleTypeAhead(key: string): void {
		if (typeAheadTimeout.value) {
			clearTimeout(typeAheadTimeout.value);
		}

		searchQuery.value += key.toLowerCase();
		
		const keyboardConfig = props.keyboardConfig || DEFAULT_KEYBOARD_CONFIG;
		typeAheadTimeout.value = setTimeout(() => {
			searchQuery.value = '';
		}, keyboardConfig.typeAheadDelay || 500);

		// Emit search event for parent to handle
		emit('search-changed', searchQuery.value, []);
	}

	// Container control methods
	function openContainer(): void {
		if (isDisabled.value) return;
		changeModel(true, {});
	}

	function closeContainer(): void {
		if (isDisabled.value) return;
		changeModel(false, {});
	}

	function toggleContainer(): void {
		if (isExpanded.value) {
			closeContainer();
		} else {
			openContainer();
		}
	}

	// Focus event handlers
	function handleFocus(): void {
		isFocused.value = true;
	}

	function handleBlur(): void {
		isFocused.value = false;
		if (props.closeOnBlur && isExpanded.value) {
			closeContainer();
		}
	}

	// Legacy and observer functions
	onMounted(() => {
		if (!fatherContainer.value) return;
		container.value = fatherContainer.value.querySelector(
			".b-label-container"
		) as HTMLDivElement;

		if (container.value) {
			mutationObserver.observe(container.value, {
				characterData: true,
				subtree: true,
				childList: true,
			});
			resizeObserver.observe(container.value, { box: "border-box" });
		}
		if (content.value)
			resizeObserver.observe(content.value, { box: "border-box" });

		setTimeout(() => {
			resize();
		}, 200);
	});

	onUpdated(resize);

	onBeforeUnmount(() => {
		if (resizeObserver) resizeObserver.disconnect();
		if (mutationObserver) mutationObserver.disconnect();
		if (typeAheadTimeout.value) clearTimeout(typeAheadTimeout.value);
		releaseFocusTrap();
	});

	function resize() {
		if (!content.value) return;

		content.value.style.maxHeight = isExpanded.value
			? `${content.value.scrollHeight + 1}px`
			: "0px";
	}

	function changeModel(value: boolean, extra: BContainerModelExtra) {
		setModel(value, extra || {});
	}
</script>

<template>
	<div ref="fatherContainer">
		<BExpandableContainer
			v-model="model"
			v-bind="ariaAttributes"
			:id="containerId"
			:absolute="absolute"
			:label-value="labelValue"
			:close-on-blur="closeOnBlur"
			:disabled="disabled"
			:is-error="isError"
			:error-message="errorMessage"
			:info-message="infoMessage"
			:required="required"
			:max-height="maxHeight"
			:min-width="minWidth"
			:secondary="secondary"
			:hide-arrow="hideArrow"
			:class="{
				'high-contrast': highContrast,
				'reduced-motion': reduceMotion,
				'enhanced-focus': enhancedFocus,
				'min-touch-target': minTouchTarget,
			}"
			@update:model-value="changeModel"
			@keydown="handleKeydown"
			@focus="handleFocus"
			@blur="handleBlur">
			
			<slot />

			<template
				#complement
				v-if="$slots.complement">
				<slot name="complement" />
			</template>

			<template
				#label
				v-if="$slots.label">
				<slot name="label" />
			</template>

			<template #content>
				<div
					v-show="isExpanded"
					ref="content"
					class="content-wrapper">
					<div
						:id="listboxId"
						class="content transition-translate"
						role="listbox"
						:aria-label="props.ariaLabel || 'Select options'"
						:aria-multiselectable="multiSelect"
						:class="{
							secondary,
							expanded: isExpanded,
							'has-max-height': !dontHaveMaxHeight,
						}">
						<slot name="content">
							<ul
								ref="listElement"
								role="list"
								class="items-list"
								:class="[{ 'p-xxs *:p-xs': !dontHaveMaxHeight }]">
								<slot name="items" />
							</ul>
						</slot>

						<div
							v-if="$slots.actions"
							class="actions"
							role="group"
							aria-label="Container actions"
							tabindex="0">
							<slot name="actions" />
						</div>
					</div>
				</div>
			</template>
		</BExpandableContainer>

		<!-- Screen reader help text -->
		<div
			v-if="helpText"
			:id="helpTextId"
			class="sr-only">
			{{ helpText }}
		</div>

		<!-- Screen reader instructions -->
		<div
			v-if="showKeyboardInstructions && screenReaderInstructions"
			:id="`${containerId}-instructions`"
			class="sr-only">
			{{ screenReaderInstructions }}
		</div>

		<!-- Error message for screen readers -->
		<div
			v-if="errorMessage"
			:id="errorId"
			class="sr-only"
			role="alert"
			aria-live="assertive">
			{{ errorMessage }}
		</div>

		<!-- Live region for announcements -->
		<div
			v-if="announceChanges"
			:aria-live="liveRegionPoliteness"
			aria-atomic="true"
			class="sr-only">
			<!-- Dynamic announcements will be inserted here -->
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	/* Accessibility enhancements */
	.high-contrast {
		border: 2px solid var(--color-neutral-border-default);
	}

	.high-contrast:focus-within {
		border-color: var(--color-primary-interaction-default);
		background-color: var(--color-primary-surface-subtle);
	}

	.reduced-motion,
	.reduced-motion * {
		transition: none !important;
		animation: none !important;
	}

	.enhanced-focus:focus-within {
		outline: 2px solid var(--color-primary-interaction-default);
		outline-offset: 2px;
	}

	.min-touch-target .content {
		min-height: 44px;
	}

	.min-touch-target .actions button,
	.min-touch-target .items-list li {
		min-height: 44px;
		min-width: 44px;
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

	/* Focus indicators for keyboard navigation */
	.content[role="listbox"]:focus {
		outline: 2px solid var(--color-primary-interaction-default);
		outline-offset: 2px;
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.content-wrapper {
			border: 2px solid CanvasText;
		}

		.content {
			background-color: Canvas;
			color: CanvasText;
		}

		.enhanced-focus:focus-within {
			outline: 3px solid Highlight;
			outline-offset: 2px;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.content-wrapper,
		.content,
		.transition-translate {
			transition: none !important;
			animation: none !important;
		}
	}

	/* Loading state accessibility */
	.content[aria-busy="true"] {
		opacity: 0.7;
		pointer-events: none;
	}

	.content[aria-busy="true"]::after {
		content: 'Loading...';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: var(--color-neutral-surface-default);
		padding: 8px 16px;
		border-radius: 4px;
		font-size: 14px;
	}
</style>
