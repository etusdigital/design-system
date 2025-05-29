<script setup lang="ts">
	import { onMounted, ref, watch } from "vue";
	import {
		isNilAndBlank,
		applyMask,
		isValidEmail,
		isValidDomain,
		isValidUrl,
	} from "../../utils/index";
	import BLabel from "../../utils/components/Label.vue";

	const props = withDefaults(
		defineProps<{
			modelValue: any[];
			labelValue?: string;
			errorMessage?: string;
			infoMessage?: string;
			disabled?: boolean;
			required?: boolean;
			allowDuplicate?: boolean;
			max?: number;
			isError?: boolean;
			placeholder?: string;
			mask?: "cpf" | "cnpj" | "cep" | "domain" | "url" | "email";
		}>(),
		{
			modelValue: undefined,
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
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: any[]];
	}>();

	onMounted(() => {
		addToTagList();
	});

	let tags: any = ref([]);
	const isFocused = ref(false);
	const newTag = ref("");
	const hasError = ref(false);
	const errMessage = ref("");
	const tagInput = ref<HTMLTextAreaElement | null>(null);

	const ERROR_MESSAGES = {
		DUPLICATE: "Duplicated values are not allowed",
		INVALID_INPUT: "Please provide a valid input",
		MAX_VALUES: "Max number of values reached",
	};

	watch(
		() => props.modelValue,
		() => {
			addToTagList();
		}
	);

	function focusInput() {
		const input = tagInput.value?.querySelector(
			"#input-default"
		) as HTMLTextAreaElement;
		isFocused.value = true;
		if (input) input.focus();
	}

	function addToTagList() {
		tags.value = props.modelValue || [];
	}

	function addTag(tag: string) {
		if (hasError.value) return;

		if (isNilAndBlank(tag)) return;

		if (checkMultipleValues(tag)) {
			const urls = tag.split(/,|\n/).map((url) => url.trim());
			if (urls.length > 0) {
				urls.forEach((url) => {
					if (!checkErrors(url)) tags.value.push(url);
					resetFields();
				});
			}
		} else {
			if (!checkErrors(tag)) {
				tags.value.push(tag);
				resetFields();
			}
		}
		emit("update:modelValue", tags.value);
	}

	function checkErrors(url: string) {
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

	function resetErrorAfterTimeout() {
		setTimeout(() => {
			hasError.value = false;
		}, 2000);
	}

	function checkDuplicate(tag: string) {
		return tags.value.includes(tag);
	}

	function checkMultipleValues(tag: string) {
		return tag.includes(",") || tag.includes("\n");
	}

	function setErrorMessage(message: string) {
		errMessage.value = message;
		hasError.value = true;
		resetErrorAfterTimeout();
	}

	function resetFields() {
		errMessage.value = "";
		newTag.value = "";
		hasError.value = false;
	}

	function removeTag(index: number) {
		if (newTag.value.length) return;
		tags.value.splice(index, 1);
		emit("update:modelValue", tags.value);
	}

	function checkEmail(value: any) {
		hasError.value = !isValidEmail(value);
	}

	function checkDomain(value: any) {
		hasError.value = !isValidDomain(value);
	}
	function checkUrl(value: any) {
		hasError.value = !isValidUrl(value);
	}

	function applyMasks(e: any) {
		let maskedValue = e.target.value;
		maskedValue = applyMask(maskedValue, props.mask);

		if (props.mask == "email") checkEmail(maskedValue);
		else if (props.mask == "domain") checkDomain(maskedValue);
		else if (props.mask == "url") checkUrl(maskedValue);
	}
</script>

<template>
	<div ref="tagInput">
		<div
			class="flex flex-row justify-between items-center mb-xxs"
			v-if="labelValue">
			<BLabel
				:label-value="labelValue"
				:info-message="infoMessage"
				:required="required" />
			<label
				v-if="max !== undefined && max > 0"
				class="text-neutral-foreground-low font-bold text-xs">
				{{ tags.length }} / {{ max }}</label
			>
		</div>
		<div
			class="b-tag-input"
			tabindex="0"
			:class="{
				active: isFocused && !disabled,
				error: hasError || isError,
				disabled: disabled,
			}"
			@focus="focusInput"
			@blur="isFocused = false">
			<BTooltip
				v-for="(tag, index) in tags"
				:key="tag"
				position="bottom"
				class="max-w-full">
				<BTag
					color="neutral"
					class="tag-padding max-w-full"
					:text="tag"
					closeable
					@close="removeTag(index)" />
				<template #text>
					<div class="max-w-full">
						<span class="whitespace-normal break-all">{{ tag }}</span>
					</div>
				</template>
			</BTooltip>
			<textarea
				rows="1"
				v-model="newTag"
				id="input-default"
				class="input-default"
				:disabled="disabled"
				:placeholder="placeholder"
				@input="applyMasks"
				@focusout="isFocused = false"
				@focus="isFocused = true"
				@keydown.enter="
					(e) => {
						e.preventDefault();
						addTag(newTag);
					}
				"
				@keydown.prevent.tab="addTag(newTag)"
				@keydown.backspace="removeTag(tags.length - 1)" />
		</div>
		<div v-if="$slots['info-text']">
			<label class="p3 text-neutral-foreground-low">
				<slot name="info-text" />
			</label>
		</div>
		<div>
			<label
				v-if="props.isError || hasError"
				class="error-default"
				>{{ props.errorMessage || errMessage }}</label
			>
		</div>
	</div>
</template>

<style scoped>
	@reference "../../assets/main.css";

	.b-tag-input {
		@apply flex flex-row flex-wrap gap-xxs border-xxs items-center py-xs px-sm bg-neutral-surface-default;
		border-color: var(--color-neutral-border-default);
		border-radius: var(--rounded-base);
	}

	.b-tag-input.active {
		border-color: var(--color-primary-interaction-default);
	}

	.b-tag-input.error {
		@apply border-xxs border-solid focus:border-solid;
		border-color: var(--color-danger-border-default);
		animation: shake 0.5s;

		.input-default {
			@apply text-danger-foreground-high;
		}
	}

	.b-tag-input.disabled,
	.b-tag-input.disabled .input-default {
		@apply bg-neutral-surface-disabled text-neutral-foreground-low;
		border-color: var(--color-neutral-border-default);
	}

	.info-icon.b-icon {
		@apply text-lg text-primary-interaction-default h-[1em] flex items-center;
	}

	.input-default {
		@apply text-neutral-foreground-high outline-0 border-none flex-1 p-xxs focus:border-none focus:outline-0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-lg);
		border-radius: var(--rounded-base);
	}

	.error-default {
		@apply text-danger-foreground-low;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-lg);
	}

	.tag-default {
		@apply flex items-center gap-xxs;
	}

	.tag-padding {
		@apply py-xxs;
	}

	.close-icon.b-icon {
		@apply text-base cursor-pointer;
	}

	@keyframes shake {
		0% {
			transform: translateX(0);
		}
		20% {
			transform: translateX(-5px);
		}
		40% {
			transform: translateX(5px);
		}
		60% {
			transform: translateX(-5px);
		}
		80% {
			transform: translateX(5px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
