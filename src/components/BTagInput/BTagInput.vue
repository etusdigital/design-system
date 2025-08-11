<script setup lang="ts">
	import { onMounted, ref, watch, computed, nextTick, onBeforeUnmount } from "vue";
	import {
		isNilAndBlank,
		applyMask,
		isValidEmail,
		isValidDomain,
		isValidUrl,
		createDebounce,
	} from "../../utils/index";
	import BLabel from "../../utils/components/Label.vue";
	import type { 
		BTagInputProps,
		BTagInputEmits,
		BTagInputState,
		BTagInputAriaAttributes,
		BTagAriaAttributes,
		BTagInputMask,
		BTagValidationStatus,
		BTagInputValidationResult,
		DEFAULT_TAG_INPUT_ACCESSIBILITY_CONFIG,
		DEFAULT_TAG_INPUT_KEYBOARD_CONFIG,
		DEFAULT_TAG_INPUT_VALIDATION_CONFIG,
		DEFAULT_TAG_INPUT_ANNOUNCEMENTS
	} from "./BTagInput.types";
	import { useAriaAttributes, useScreenReader, useKeyboardNavigation } from "#composables";

	const props = withDefaults(
		defineProps<BTagInputProps & {
			/** Array of tag values */
			modelValue: string[];
			/** Label for the tag input */
			labelValue?: string;
			/** Error message to display */
			errorMessage?: string;
			/** Info message to display */
			infoMessage?: string;
			/** Whether the input is disabled */
			disabled?: boolean;
			/** Whether the field is required */
			required?: boolean;
			/** Whether duplicate tags are allowed */
			allowDuplicate?: boolean;
			/** Maximum number of tags allowed */
			max?: number;
			/** Whether to show error state */
			isError?: boolean;
			/** Placeholder text for input */
			placeholder?: string;
			/** Input mask for validation */
			mask?: BTagInputMask;
			/** Size variant */
			size?: 'small' | 'medium' | 'large';
			/** Whether to show tag tooltips */
			showTooltips?: boolean;
			/** Custom separators for multi-tag input */
			separators?: string[];
			/** Whether to auto-focus on mount */
			autoFocus?: boolean;
			/** Debounce delay for validation in milliseconds */
			debounceDelay?: number;
		}>(),
		{
			// Legacy props
			modelValue: () => [],
			labelValue: "",
			errorMessage: "",
			infoMessage: "",
			disabled: false,
			required: false,
			allowDuplicate: false,
			max: undefined,
			isError: false,
			placeholder: "",
			mask: undefined,
			size: "medium",
			showTooltips: true,
			separators: () => [',', '\n'],
			autoFocus: false,
			debounceDelay: 300,
			// Accessibility props with defaults
			...DEFAULT_TAG_INPUT_ACCESSIBILITY_CONFIG,
			keyboardConfig: () => DEFAULT_TAG_INPUT_KEYBOARD_CONFIG,
			validationConfig: () => DEFAULT_TAG_INPUT_VALIDATION_CONFIG,
		}
	);

	const emit = defineEmits<BTagInputEmits>();

	// Composables
	const { useAriaId } = useAriaAttributes();
	const { announcePolitely, announceAssertively } = useScreenReader();
	const { handleKeyNavigation } = useKeyboardNavigation();

	// Template refs
	const tagInputContainer = ref<HTMLElement>();
	const textareaElement = ref<HTMLTextAreaElement>();
	const tagElements = ref<HTMLElement[]>([]);

	// Generate unique IDs for ARIA relationships
	const tagInputId = computed(() => props.id || useAriaId('tag-input'));
	const listboxId = computed(() => `${tagInputId.value}-listbox`);
	const labelId = computed(() => `${tagInputId.value}-label`);
	const descriptionId = computed(() => `${tagInputId.value}-description`);
	const errorId = computed(() => `${tagInputId.value}-error`);
	const statusId = computed(() => `${tagInputId.value}-status`);
	const instructionsId = computed(() => `${tagInputId.value}-instructions`);

	// Component state
	const tags = ref<string[]>([]);
	const isFocused = ref(false);
	const newTag = ref("");
	const hasError = ref(false);
	const errMessage = ref("");
	const focusedTagIndex = ref(-1); // -1 = input focused, 0+ = tag focused
	const keyboardMode = ref(false);
	const isInitialized = ref(false);
	
	// Debounced validation functions for better performance
	const debouncedEmailValidation = createDebounce((value: string) => {
		hasError.value = !isValidEmail(value);
	}, props.debounceDelay || 300);
	
	const debouncedDomainValidation = createDebounce((value: string) => {
		hasError.value = !isValidDomain(value);
	}, props.debounceDelay || 300);
	
	const debouncedUrlValidation = createDebounce((value: string) => {
		hasError.value = !isValidUrl(value);
	}, props.debounceDelay || 300);

	// Computed properties
	const isDisabled = computed(() => props.disabled);
	const isRequired = computed(() => props.required);
	const hasErrorState = computed(() => props.isError || hasError.value);
	const maxTags = computed(() => props.max || props.validationConfig?.maxTags);
	const allowDuplicates = computed(() => props.allowDuplicate || props.validationConfig?.allowDuplicate || false);

	// Component state for accessibility
	const tagInputState = computed((): BTagInputState => ({
		tagCount: tags.value.length,
		maxTags: maxTags.value,
		hasFocus: isFocused.value,
		focusedTagIndex: focusedTagIndex.value,
		keyboardMode: keyboardMode.value,
		inputValue: newTag.value,
		hasError: hasErrorState.value,
		errorMessage: errMessage.value || props.errorMessage || '',
		isDisabled: isDisabled.value,
		isRequired: isRequired.value,
		remainingSlots: maxTags.value ? maxTags.value - tags.value.length : undefined,
	}));

	// ARIA attributes for tag input container
	const tagInputAriaAttributes = computed((): BTagInputAriaAttributes => {
		const describedByIds = [
			props.ariaDescribedBy,
			descriptionId.value,
			props.screenReaderInstructions ? instructionsId.value : undefined,
			hasErrorState.value ? errorId.value : undefined,
		].filter(Boolean);

		return {
			role: props.role || 'group',
			...(props.ariaLabel && { 'aria-label': props.ariaLabel }),
			...(props.ariaLabelledBy && { 'aria-labelledby': props.ariaLabelledBy }),
			...(describedByIds.length > 0 && { 'aria-describedby': describedByIds.join(' ') }),
			...(hasErrorState.value && { 'aria-invalid': true }),
			...(isDisabled.value && { 'aria-disabled': true }),
			...(isRequired.value && { 'aria-required': true }),
		};
	});

	// Computed accessibility properties
	const ariaLabel = computed(() => {
		if (props.ariaLabel) return props.ariaLabel;
		return props.labelValue || 'Tag input';
	});

	const ariaDescription = computed(() => {
		let desc = props.ariaDescription || 'Type to add tags. ';
		const keyboardConfig = props.keyboardConfig || DEFAULT_TAG_INPUT_KEYBOARD_CONFIG;
		
		if (keyboardConfig.addKeys?.length) {
			desc += `Press ${keyboardConfig.addKeys.join(', ')} to add tags. `;
		}
		if (maxTags.value) {
			desc += `Maximum ${maxTags.value} tags allowed. `;
		}
		desc += 'Use arrow keys to navigate between tags, Backspace to remove tags.';
		return desc;
	});

	const statusMessage = computed(() => {
		const count = tags.value.length;
		const plural = count !== 1 ? 's' : '';
		let msg = `${count} tag${plural}`;
		
		if (maxTags.value) {
			msg += ` of ${maxTags.value}`;
		}
		
		if (tagInputState.value.remainingSlots !== undefined) {
			const remaining = tagInputState.value.remainingSlots;
			if (remaining > 0) {
				msg += `. ${remaining} slot${remaining !== 1 ? 's' : ''} remaining`;
			} else {
				msg += '. Maximum reached';
			}
		}
		
		return msg;
	});

	const ERROR_MESSAGES = {
		DUPLICATE: "Duplicated values are not allowed",
		INVALID_INPUT: "Please provide a valid input",
		MAX_VALUES: "Max number of values reached",
		MIN_LENGTH: "Tag must be at least {minLength} characters",
		MAX_LENGTH: "Tag cannot exceed {maxLength} characters",
		INVALID_FORMAT: "Tag format is invalid",
		CUSTOM_ERROR: "Custom validation failed",
	};

	// Lifecycle hooks
	onMounted(() => {
		addToTagList();
		isInitialized.value = true;
		
		if (props.autoFocus && !isDisabled.value) {
			nextTick(() => {
				focusInput();
			});
		}
	});

	onBeforeUnmount(() => {
		// Clean up any timeouts or listeners
		debouncedEmailValidation.cancel();
		debouncedDomainValidation.cancel();
		debouncedUrlValidation.cancel();
	});

	// Watchers
	watch(
		() => props.modelValue,
		(newValue) => {
			if (JSON.stringify(newValue) !== JSON.stringify(tags.value)) {
				addToTagList();
				
				// Announce change to screen readers
				if (props.announceChanges && isInitialized.value) {
					const message = DEFAULT_TAG_INPUT_ANNOUNCEMENTS.tagCount
						.replace('{count}', tags.value.length.toString())
						.replace('{plural}', tags.value.length !== 1 ? 's' : '')
						.replace('{action}', 'loaded');
					announcePolitely(message);
				}
			}
		}
	);

	// Watch for state changes and emit accessibility events
	watch(
		() => tagInputState.value.tagCount,
		(newCount, oldCount) => {
			if (props.announceChanges && isInitialized.value && oldCount !== undefined) {
				emit('accessibility', 'count-changed', { newCount, oldCount, state: tagInputState.value });
			}
		}
	);

	/**
	 * Gets ARIA attributes for a specific tag
	 */
	function getTagAriaAttributes(index: number, tag: string): BTagAriaAttributes {
		const isFocusedTag = index === focusedTagIndex.value;
		
		return {
			role: 'option',
			'aria-selected': isFocusedTag,
			'aria-label': `Tag: ${tag}. Press Delete or Backspace to remove. ${index + 1} of ${tags.value.length}`,
			'aria-describedby': `${tagInputId.value}-tag-${index}-desc`,
			'aria-posinset': index + 1,
			'aria-setsize': tags.value.length,
			tabindex: isFocusedTag ? 0 : -1,
			'aria-roledescription': 'Removable tag',
		};
	}

	/**
	 * Validates a tag according to the current validation configuration
	 */
	function validateTag(tag: string): BTagInputValidationResult {
		const validationConfig = props.validationConfig || DEFAULT_TAG_INPUT_VALIDATION_CONFIG;
		const errors: string[] = [];
		const warnings: string[] = [];

		// Trim whitespace if configured
		if (validationConfig.trimWhitespace) {
			tag = tag.trim();
		}

		// Check if tag is empty
		if (tag.length === 0) {
			errors.push(ERROR_MESSAGES.INVALID_INPUT);
			return {
				isValid: false,
				status: 'empty',
				errors,
				warnings,
				tag,
			};
		}

		// Check minimum length
		if (validationConfig.minLength && tag.length < validationConfig.minLength) {
			errors.push(ERROR_MESSAGES.MIN_LENGTH.replace('{minLength}', validationConfig.minLength.toString()));
		}

		// Check maximum length
		if (validationConfig.maxLength && tag.length > validationConfig.maxLength) {
			errors.push(ERROR_MESSAGES.MAX_LENGTH.replace('{maxLength}', validationConfig.maxLength.toString()));
		}

		// Check for duplicates
		if (!allowDuplicates.value && checkDuplicate(tag)) {
			errors.push(ERROR_MESSAGES.DUPLICATE);
			return {
				isValid: false,
				status: 'duplicate',
				errors,
				warnings,
				tag,
			};
		}

		// Check tag count limit
		if (maxTags.value && tags.value.length >= maxTags.value) {
			errors.push(ERROR_MESSAGES.MAX_VALUES);
			return {
				isValid: false,
				status: 'max-reached',
				errors,
				warnings,
				tag,
			};
		}

		// Apply mask validation
		if (props.mask) {
			const isValidMask = validateMask(tag, props.mask);
			if (!isValidMask) {
				errors.push(ERROR_MESSAGES.INVALID_FORMAT);
			}
		}

		// Apply regex pattern validation
		if (validationConfig.pattern && !validationConfig.pattern.test(tag)) {
			errors.push(ERROR_MESSAGES.INVALID_FORMAT);
		}

		// Apply custom validator
		if (validationConfig.validator) {
			const customResult = validationConfig.validator(tag);
			if (customResult === false) {
				errors.push(ERROR_MESSAGES.CUSTOM_ERROR);
			} else if (typeof customResult === 'string') {
				errors.push(customResult);
			}
		}

		return {
			isValid: errors.length === 0,
			status: errors.length === 0 ? 'valid' : 'invalid',
			errors,
			warnings,
			tag,
		};
	}

	/**
	 * Validates input against mask type
	 */
	function validateMask(value: string, mask: BTagInputMask): boolean {
		switch (mask) {
			case 'email':
				return isValidEmail(value);
			case 'domain':
				return isValidDomain(value);
			case 'url':
				return isValidUrl(value);
			case 'phone':
				// Basic phone validation (can be enhanced)
				return /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s|-/g, ''));
			case 'cpf':
			case 'cnpj':
			case 'cep':
			default:
				// For other masks, assume applyMask handles validation
				return true;
		}
	}

	/**
	 * Focuses the input element
	 */
	function focusInput(): void {
		isFocused.value = true;
		focusedTagIndex.value = -1;
		keyboardMode.value = true;
		
		nextTick(() => {
			if (textareaElement.value) {
				textareaElement.value.focus();
			}
		});
	}

	/**
	 * Focuses a specific tag
	 */
	function focusTag(index: number): void {
		if (index >= 0 && index < tags.value.length) {
			focusedTagIndex.value = index;
			keyboardMode.value = true;
			
			nextTick(() => {
				const tagElement = tagElements.value[index];
				if (tagElement) {
					tagElement.focus();
				}
			});
		}
	}

	/**
	 * Adds model value to internal tags array
	 */
	function addToTagList(): void {
		const newTags = props.modelValue || [];
		if (JSON.stringify(tags.value) !== JSON.stringify(newTags)) {
			tags.value = [...newTags];
		}
	}

	/**
	 * Adds a new tag to the list with enhanced validation and accessibility
	 */
	function addTag(tag: string): void {
		if (isDisabled.value) return;

		if (isNilAndBlank(tag)) return;

		let addedTags: string[] = [];
		let rejectedTags: string[] = [];
		let errors: string[] = [];

		// Handle multiple values (comma/newline separated)
		if (checkMultipleValues(tag)) {
			const separators = props.separators || [',', '\n'];
			const regex = new RegExp(separators.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
			const values = tag.split(regex).map((val) => val.trim()).filter(val => val.length > 0);
			
			values.forEach((val) => {
				const validation = validateTag(val);
				if (validation.isValid) {
					tags.value.push(val);
					addedTags.push(val);
					emit("tag-added", val, tags.value.length - 1);
				} else {
					rejectedTags.push(val);
					errors.push(...validation.errors);
					emit("validation-error", validation.errors.join(', '), val);
				}
			});
		} else {
			const validation = validateTag(tag);
			if (validation.isValid) {
				tags.value.push(tag);
				addedTags.push(tag);
				emit("tag-added", tag, tags.value.length - 1);
			} else {
				rejectedTags.push(tag);
				errors.push(...validation.errors);
				emit("validation-error", validation.errors.join(', '), tag);
				setErrorMessage(validation.errors[0]);
			}
		}

		// Update model and reset input
		if (addedTags.length > 0) {
			emit("update:modelValue", tags.value);
			resetFields();
			
			// Check if limit reached
			if (maxTags.value && tags.value.length >= maxTags.value) {
				emit("limit-reached", tags.value.length, maxTags.value);
			}

			// Announce addition to screen readers
			if (props.announceChanges) {
				if (addedTags.length === 1) {
					const message = DEFAULT_TAG_INPUT_ANNOUNCEMENTS.tagAdded
						.replace('{tag}', addedTags[0])
						.replace('{count}', tags.value.length.toString());
					announcePolitely(message);
				} else {
					const message = `Added ${addedTags.length} tags. ${statusMessage.value}.`;
					announcePolitely(message);
				}
			}
		}

		// Announce rejections
		if (rejectedTags.length > 0 && props.announceChanges) {
			const message = rejectedTags.length === 1
				? DEFAULT_TAG_INPUT_ANNOUNCEMENTS.validationError
					.replace('{tag}', rejectedTags[0])
					.replace('{error}', errors[0])
				: `${rejectedTags.length} tags were rejected due to validation errors`;
			announceAssertively(message);
		}
	}

	/**
	 * Checks for validation errors in a tag
	 */
	function checkErrors(url: string): boolean {
		hasError.value = false;
		if (!props.allowDuplicate && checkDuplicate(url)) {
			setErrorMessage(ERROR_MESSAGES.DUPLICATE);
			return true;
		} else if (url.trim().length === 0) {
			setErrorMessage(ERROR_MESSAGES.INVALID_INPUT);
			return true;
		} else if (
			props.max !== undefined &&
			props.max > 0 &&
			tags.value.length > props.max - 1
		) {
			setErrorMessage(ERROR_MESSAGES.MAX_VALUES);
			return true;
		}

		return false;
	}

	/**
	 * Resets error state after a timeout
	 */
	function resetErrorAfterTimeout(): void {
		setTimeout(() => {
			hasError.value = false;
		}, 2000);
	}

	/**
	 * Checks if a tag already exists
	 */
	function checkDuplicate(tag: string): boolean {
		return tags.value.includes(tag);
	}

	/**
	 * Checks if the input contains multiple values
	 */
	function checkMultipleValues(tag: string): boolean {
		return tag.includes(",") || tag.includes("\n");
	}

	/**
	 * Sets an error message and triggers error state
	 */
	function setErrorMessage(message: string): void {
		errMessage.value = message;
		hasError.value = true;
		resetErrorAfterTimeout();
	}

	/**
	 * Resets all form fields and error states
	 */
	function resetFields(): void {
		errMessage.value = "";
		newTag.value = "";
		hasError.value = false;
	}

	/**
	 * Removes a tag at the specified index with enhanced accessibility
	 */
	function removeTag(index: number): void {
		if (index < 0 || index >= tags.value.length || isDisabled.value) return;
		
		const removedTag = tags.value[index];
		tags.value.splice(index, 1);
		emit("update:modelValue", tags.value);
		emit("tag-removed", removedTag, index);
		
		// Announce removal to screen readers
		if (props.announceChanges) {
			const message = DEFAULT_TAG_INPUT_ANNOUNCEMENTS.tagRemoved
				.replace('{tag}', removedTag)
				.replace('{count}', tags.value.length.toString());
			announcePolitely(message);
		}
		
		// Manage focus after removal
		if (tags.value.length === 0) {
			// No more tags, focus input
			focusedTagIndex.value = -1;
			focusInput();
		} else if (focusedTagIndex.value >= tags.value.length) {
			// Focus was beyond the end, move to last tag
			focusedTagIndex.value = tags.value.length - 1;
			focusTag(focusedTagIndex.value);
		} else if (focusedTagIndex.value === index) {
			// Removed the focused tag, focus the next one or previous if at end
			const newIndex = index < tags.value.length ? index : tags.value.length - 1;
			focusedTagIndex.value = newIndex;
			if (newIndex >= 0) {
				focusTag(newIndex);
			} else {
				focusInput();
			}
		}
		
		// Clear error states
		resetFields();
	}

	/**
	 * Validates email input with debouncing
	 */
	function checkEmail(value: string): void {
		debouncedEmailValidation(value);
	}

	/**
	 * Validates domain input with debouncing
	 */
	function checkDomain(value: string): void {
		debouncedDomainValidation(value);
	}
	
	/**
	 * Validates URL input with debouncing
	 */
	function checkUrl(value: string): void {
		debouncedUrlValidation(value);
	}

	/**
	 * Applies input masks and validation
	 */
	function applyMasks(e: Event): void {
		const target = e.target as HTMLTextAreaElement;
		let maskedValue = target.value;
		maskedValue = applyMask(maskedValue, props.mask);

		if (props.mask === "email") checkEmail(maskedValue);
		else if (props.mask === "domain") checkDomain(maskedValue);
		else if (props.mask === "url") checkUrl(maskedValue);
	}

	// Enhanced keyboard navigation functions
	function handleKeyDown(event: KeyboardEvent): void {
		if (isDisabled.value) return;

		keyboardMode.value = true;
		const keyboardConfig = props.keyboardConfig || DEFAULT_TAG_INPUT_KEYBOARD_CONFIG;
		const { key } = event;

		// Handle navigation keys
		if (keyboardConfig.navigationKeys?.includes(key)) {
			handleNavigationKey(event, key);
			return;
		}

		// Handle add keys
		if (keyboardConfig.addKeys?.includes(key) && newTag.value.trim()) {
			event.preventDefault();
			addTag(newTag.value);
			emit('keyboard', event, 'add-tag');
			return;
		}

		// Handle remove keys
		if (keyboardConfig.removeKeys?.includes(key)) {
			handleRemoveKey(event, key);
			return;
		}

		// Handle cancel keys
		if (keyboardConfig.cancelKeys?.includes(key)) {
			event.preventDefault();
			handleCancel();
			emit('keyboard', event, 'cancel');
			return;
		}

		// Handle Home/End navigation if enabled
		if (keyboardConfig.homeEndNavigation) {
			if (key === 'Home' && tags.value.length > 0) {
				event.preventDefault();
				focusedTagIndex.value = 0;
				focusTag(0);
				announceFocusedTag();
				emit('keyboard', event, 'navigate-home');
				return;
			}
			
			if (key === 'End' && focusedTagIndex.value >= 0) {
				event.preventDefault();
				focusedTagIndex.value = -1;
				focusInput();
				emit('keyboard', event, 'navigate-end');
				return;
			}
		}
	}

	function handleNavigationKey(event: KeyboardEvent, key: string): void {
		const keyboardConfig = props.keyboardConfig || DEFAULT_TAG_INPUT_KEYBOARD_CONFIG;

		if (key === 'ArrowLeft') {
			if (newTag.value.length === 0 && tags.value.length > 0) {
				event.preventDefault();
				const newIndex = focusedTagIndex.value === -1 
					? tags.value.length - 1 
					: Math.max(0, focusedTagIndex.value - 1);
				
				if (keyboardConfig.wrapNavigation && newIndex === focusedTagIndex.value && focusedTagIndex.value === 0) {
					focusedTagIndex.value = -1;
					focusInput();
				} else {
					focusedTagIndex.value = newIndex;
					focusTag(newIndex);
				}
				announceFocusedTag();
				emit('keyboard', event, 'navigate-left');
			}
		} else if (key === 'ArrowRight') {
			if (focusedTagIndex.value >= 0) {
				event.preventDefault();
				if (focusedTagIndex.value < tags.value.length - 1) {
					focusedTagIndex.value++;
					focusTag(focusedTagIndex.value);
					announceFocusedTag();
				} else {
					focusedTagIndex.value = -1;
					focusInput();
				}
				emit('keyboard', event, 'navigate-right');
			}
		}
	}

	function handleRemoveKey(event: KeyboardEvent, key: string): void {
		if (focusedTagIndex.value >= 0) {
			event.preventDefault();
			removeTag(focusedTagIndex.value);
			emit('keyboard', event, 'remove-focused-tag');
		} else if (key === 'Backspace' && newTag.value.length === 0 && tags.value.length > 0) {
			event.preventDefault();
			removeTag(tags.value.length - 1);
			emit('keyboard', event, 'remove-last-tag');
		}
	}

	function handleCancel(): void {
		focusedTagIndex.value = -1;
		newTag.value = '';
		hasError.value = false;
		focusInput();
	}

	function announceFocusedTag(): void {
		if (focusedTagIndex.value >= 0 && focusedTagIndex.value < tags.value.length && props.announceChanges) {
			const tag = tags.value[focusedTagIndex.value];
			const message = DEFAULT_TAG_INPUT_ANNOUNCEMENTS.tagFocused
				.replace('{position}', (focusedTagIndex.value + 1).toString())
				.replace('{total}', tags.value.length.toString())
				.replace('{tag}', tag);
			announcePolitely(message);
		}
	}

	function handleTagKeyDown(event: KeyboardEvent, index: number): void {
		if (isDisabled.value) return;

		const keyboardConfig = props.keyboardConfig || DEFAULT_TAG_INPUT_KEYBOARD_CONFIG;
		const { key } = event;

		if (keyboardConfig.removeKeys?.includes(key) || keyboardConfig.selectionKeys?.includes(key)) {
			event.preventDefault();
			removeTag(index);
			emit('keyboard', event, 'remove-tag');
		}
	}

	// Focus and interaction handlers
	function handleInputFocus(event: FocusEvent): void {
		isFocused.value = true;
		focusedTagIndex.value = -1;
		emit('input-focus', event);
	}

	function handleInputBlur(event: FocusEvent): void {
		isFocused.value = false;
		emit('input-blur', event);
	}

	function handleTagFocus(tag: string, index: number, event: FocusEvent): void {
		focusedTagIndex.value = index;
		isFocused.value = true;
		keyboardMode.value = true;
		emit('tag-focus', tag, index);
	}

	function handleTagBlur(tag: string, index: number, event: FocusEvent): void {
		emit('tag-blur', tag, index);
	}

	function handleMouseInteraction(): void {
		keyboardMode.value = false;
	}

	function handleContainerClick(): void {
		handleMouseInteraction();
		if (!isDisabled.value) {
			focusInput();
		}
	}
</script>

<template>
	<!-- Main tag input container with accessibility attributes -->
	<div 
		ref="tagInputContainer"
		:id="tagInputId"
		class="b-tag-input-container"
		:class="{
			disabled: isDisabled,
			'high-contrast': highContrast,
			'reduced-motion': reduceMotion,
			'enhanced-focus': enhancedFocus,
			'min-touch-target': minTouchTarget,
			'keyboard-mode': keyboardMode,
			[size]: true,
		}"
		v-bind="tagInputAriaAttributes"
		@click="handleContainerClick"
		@mousedown="handleMouseInteraction">
		
		<!-- Label and counter section -->
		<div
			v-if="labelValue"
			class="flex flex-row justify-between items-center mb-xxs">
			<BLabel
				:id="labelId"
				:label-value="labelValue"
				:info-message="infoMessage"
				:required="isRequired" />
			<div
				v-if="showTagCount && maxTags"
				class="text-neutral-foreground-low font-bold text-xs tag-counter"
				:aria-label="`Tag count: ${tags.length} of ${maxTags}`">
				{{ tags.length }} / {{ maxTags }}
			</div>
		</div>
		
		<!-- Main input area -->
		<div
			class="b-tag-input"
			role="combobox"
			:aria-label="ariaLabel"
			:aria-expanded="false"
			:aria-controls="listboxId"
			:aria-invalid="hasErrorState"
			:aria-disabled="isDisabled"
			:aria-required="isRequired"
			:aria-autocomplete="'none'"
			:class="{
				active: isFocused && !isDisabled,
				error: hasErrorState,
				disabled: isDisabled,
				'has-tags': tags.length > 0,
			}"
			@keydown="handleKeyDown">
			
			<!-- Tag list with proper listbox pattern -->
			<div 
				v-if="tags.length > 0"
				:id="listboxId"
				role="listbox"
				:aria-label="`Tags: ${tags.length} items`"
				:aria-multiselectable="false"
				class="tag-list">
				<div
					v-for="(tag, index) in tags"
					:key="`tag-${index}-${tag}`"
					:ref="(el) => (tagElements[index] = el as HTMLElement)"
					class="tag-wrapper"
					:class="{ 'keyboard-focus': keyboardMode && focusedTagIndex === index }"
					v-bind="getTagAriaAttributes(index, tag)"
					@keydown="(e) => handleTagKeyDown(e, index)"
					@focus="(e) => handleTagFocus(tag, index, e)"
					@blur="(e) => handleTagBlur(tag, index, e)">
					
					<!-- Tag with tooltip if enabled -->
					<BTooltip
						v-if="showTooltips"
						position="bottom"
						class="max-w-full">
						<BTag
							color="neutral"
							class="tag-padding max-w-full"
							:text="tag"
							closeable
							:aria-label="`Remove tag ${tag}`"
							@close="removeTag(index)" />
						<template #text>
							<div class="max-w-full">
								<span class="whitespace-normal break-all">{{ tag }}</span>
							</div>
						</template>
					</BTooltip>
					
					<!-- Tag without tooltip -->
					<BTag
						v-else
						color="neutral"
						class="tag-padding max-w-full"
						:text="tag"
						closeable
						:aria-label="`Remove tag ${tag}`"
						@close="removeTag(index)" />
					
					<!-- Hidden description for each tag -->
					<div
						:id="`${tagInputId}-tag-${index}-desc`"
						class="sr-only">
						Tag {{ index + 1 }} of {{ tags.length }}: {{ tag }}. Press Delete or Backspace to remove.
					</div>
				</div>
			</div>
			
			<!-- Text input -->
			<textarea
				ref="textareaElement"
				rows="1"
				v-model="newTag"
				class="input-default"
				:disabled="isDisabled"
				:placeholder="placeholder"
				:aria-label="ariaLabel + (tags.length > 0 ? ` with ${tags.length} existing tags` : '')"
				:aria-describedby="descriptionId"
				:aria-invalid="hasErrorState"
				role="textbox"
				:aria-controls="tags.length > 0 ? listboxId : undefined"
				@input="applyMasks"
				@focus="handleInputFocus"
				@blur="handleInputBlur"
				@keydown="handleKeyDown" />
		</div>
		
		<!-- Info text slot -->
		<div v-if="$slots['info-text']" class="info-text">
			<label class="p3 text-neutral-foreground-low">
				<slot name="info-text" />
			</label>
		</div>
		
		<!-- Hidden description for screen readers -->
		<div :id="descriptionId" class="sr-only">
			{{ ariaDescription }}
		</div>
		
		<!-- Screen reader instructions -->
		<div
			v-if="screenReaderInstructions"
			:id="instructionsId"
			class="sr-only">
			{{ screenReaderInstructions }}
		</div>
		
		<!-- Status message for screen readers -->
		<div
			v-if="showTagCount"
			:id="statusId"
			class="sr-only"
			:aria-live="liveRegionPoliteness"
			aria-atomic="true">
			{{ statusMessage }}
		</div>
		
		<!-- Error message -->
		<div 
			v-if="hasErrorState" 
			:id="errorId" 
			role="alert" 
			:aria-live="liveRegionPoliteness"
			class="error-message">
			<label class="error-default">
				{{ props.errorMessage || errMessage }}
			</label>
		</div>

		<!-- Live region for dynamic announcements -->
		<div
			v-if="announceChanges"
			class="sr-only"
			:aria-live="liveRegionPoliteness"
			aria-atomic="true">
			<!-- Dynamic announcements will be inserted here -->
		</div>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

	/* Base container styles */
	.b-tag-input-container {
		@apply relative;
	}

	.b-tag-input-container:focus-within {
		outline: none;
	}

	/* Main input styles */
	.b-tag-input {
		@apply flex flex-row flex-wrap gap-xxs border-xxs items-center py-xs px-sm bg-neutral-surface-default transition-colors;
		border-color: var(--color-neutral-border-default);
		border-radius: var(--rounded-base);
		min-height: 44px; /* WCAG touch target minimum */
	}

	.b-tag-input:focus-within {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
	}

	.b-tag-input.active {
		border-color: var(--color-primary-interaction-default);
	}

	.b-tag-input.error {
		@apply border-xxs border-solid;
		border-color: var(--color-danger-border-default);
		animation: shake 0.5s;

		.input-default {
			@apply text-danger-foreground-high;
		}
	}

	.b-tag-input.disabled {
		@apply bg-neutral-surface-disabled cursor-not-allowed;
		border-color: var(--color-neutral-border-default);
	}

	.b-tag-input.disabled .input-default {
		@apply text-neutral-foreground-low cursor-not-allowed;
		background: transparent;
	}

	/* Size variations */
	.b-tag-input-container.small .b-tag-input {
		@apply py-xs px-sm text-sm;
		min-height: 36px;
	}

	.b-tag-input-container.medium .b-tag-input {
		@apply py-sm px-base;
		min-height: 44px;
	}

	.b-tag-input-container.large .b-tag-input {
		@apply py-base px-lg text-lg;
		min-height: 52px;
	}

	/* Input field styles */
	.input-default {
		@apply text-neutral-foreground-high outline-0 border-none flex-1 p-xxs focus:border-none focus:outline-0 resize-none;
		border-radius: var(--rounded-base);
		background: transparent;
		min-width: 120px;
		line-height: 1.2;
	}

	.input-default:focus {
		@apply outline-none;
		box-shadow: none;
	}

	.input-default::placeholder {
		@apply text-neutral-foreground-low;
	}

	/* Tag list accessibility */
	.tag-list {
		@apply flex flex-row flex-wrap gap-xxs;
	}

	.tag-wrapper {
		@apply rounded transition-shadow;
		position: relative;
	}

	.tag-wrapper:focus {
		@apply outline-none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
		z-index: 1;
	}

	.tag-wrapper.keyboard-focus {
		@apply outline-none;
		box-shadow: 0 0 0 2px var(--color-primary-interaction-default);
		z-index: 1;
	}

	.tag-wrapper[aria-selected="true"] {
		@apply ring-2 ring-primary-interaction-default ring-opacity-50;
	}

	/* Tag styling */
	.tag-padding {
		@apply py-xxs;
	}

	/* Tag counter */
	.tag-counter {
		@apply px-xs py-xxs rounded-sm bg-neutral-surface-subtle;
		font-variant-numeric: tabular-nums;
	}

	/* Info text and messages */
	.info-text {
		@apply mt-xs;
	}

	.error-message {
		@apply mt-xs;
	}

	.error-default {
		@apply text-danger-foreground-low text-sm font-medium;
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

	/* Accessibility enhancements */
	.high-contrast .b-tag-input {
		border: 2px solid var(--color-neutral-border-default);
	}

	.high-contrast .b-tag-input:focus-within {
		border-color: var(--color-primary-interaction-default);
		background-color: var(--color-primary-surface-subtle);
	}

	.high-contrast .tag-wrapper.keyboard-focus,
	.high-contrast .tag-wrapper:focus {
		border: 2px solid var(--color-primary-interaction-default);
		background-color: var(--color-primary-surface-subtle);
	}

	.enhanced-focus .b-tag-input:focus-within {
		outline: 3px solid var(--color-primary-interaction-default);
		outline-offset: 2px;
	}

	.enhanced-focus .tag-wrapper:focus,
	.enhanced-focus .tag-wrapper.keyboard-focus {
		outline: 3px solid var(--color-primary-interaction-default);
		outline-offset: 2px;
	}

	.min-touch-target .b-tag-input {
		min-height: 44px;
	}

	.min-touch-target .tag-wrapper {
		min-height: 32px;
		min-width: 32px;
	}

	.min-touch-target.small .b-tag-input {
		min-height: 36px;
	}

	.min-touch-target.large .b-tag-input {
		min-height: 52px;
	}

	/* Reduced motion support */
	.reduced-motion,
	.reduced-motion *,
	.reduced-motion .tag-wrapper {
		transition: none !important;
		animation: none !important;
	}

	.reduced-motion .b-tag-input.error {
		animation: none !important;
	}

	/* Keyboard mode styling */
	.keyboard-mode .tag-wrapper {
		border-radius: var(--rounded-sm);
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.b-tag-input {
			border: 2px solid CanvasText;
			background-color: Canvas;
		}

		.b-tag-input:focus-within {
			outline: 3px solid Highlight;
			outline-offset: 2px;
		}

		.tag-wrapper:focus,
		.tag-wrapper.keyboard-focus {
			outline: 3px solid Highlight;
			outline-offset: 2px;
		}

		.input-default {
			color: CanvasText;
		}
	}

	/* Reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		.b-tag-input,
		.tag-wrapper,
		.input-default {
			transition: none !important;
			animation: none !important;
		}

		.b-tag-input.error {
			animation: none !important;
		}
	}

	/* Dark mode adjustments */
	@media (prefers-color-scheme: dark) {
		.b-tag-input:focus-within {
			background-color: var(--color-neutral-surface-default);
		}

		.tag-counter {
			background-color: var(--color-neutral-surface-subtle);
		}
	}

	/* Large text and high DPI support */
	@media (min-resolution: 192dpi) {
		.enhanced-focus .b-tag-input:focus-within,
		.enhanced-focus .tag-wrapper:focus,
		.enhanced-focus .tag-wrapper.keyboard-focus {
			outline-width: 4px;
		}
	}

	/* Error shake animation */
	@keyframes shake {
		0% { transform: translateX(0); }
		20% { transform: translateX(-5px); }
		40% { transform: translateX(5px); }
		60% { transform: translateX(-5px); }
		80% { transform: translateX(5px); }
		100% { transform: translateX(0); }
	}

	/* Focus management for tags with content */
	.b-tag-input.has-tags {
		flex-wrap: wrap;
		align-items: flex-start;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	.b-tag-input.has-tags .input-default {
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
	}

	/* Empty state styling */
	.b-tag-input:not(.has-tags) .input-default {
		width: 100%;
	}
</style>
