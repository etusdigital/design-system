<script setup lang="ts">
	import { ref, onBeforeMount, watch, computed } from "vue";
	import {
		applyMask,
		isValidEmail,
		isValidDomain,
		isValidUrl,
	} from "../../utils/index";
	import BLabel from "../../utils/components/Label.vue";

	type InputType =
		| "text"
		| "number"
		| "search"
		| "color"
		| "password"
		| "file"
		| "email";
	type Mask = "cpf" | "cnpj" | "cep" | "domain" | "url";
	type Size = "xs" | "sm" | "base" | "lg" | "xl" | "100";
	type TextAlign = "start" | "center" | "end";

	const props = withDefaults(
		defineProps<{
			modelValue?: any;
			labelValue?: string;
			type?: InputType;
			mask?: Mask;
			max?: number;
			min?: number;
			step?: number;
			errorMessage?: string;
			infoMessage?: string;
			size?: Size;
			isTextArea?: boolean;
			disabled?: boolean;
			isError?: boolean;
			required?: boolean;
			placeholder?: string;
			textAlign?: TextAlign;
			tooltipMinWidth?: string;
			icon?: string;
			appendIcon?: boolean;
		}>(),
		{
			modelValue: undefined,
			labelValue: "",
			type: "text",
			mask: undefined,
			max: undefined,
			min: undefined,
			step: 1,
			errorMessage: "",
			infoMessage: "",
			size: "100",
			isTextArea: false,
			disabled: false,
			isError: false,
			required: false,
			placeholder: "",
			textAlign: "start",
			tooltipMinWidth: "none",
			icon: "",
			appendIcon: false,
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: any];
		focus: [value: any];
		blur: [value: any];
	}>();

	let inputValue = ref();
	let hasError = ref(false);
	let isFocused = ref(false);
	let showPass = ref(false);
	let haveFile = ref(false);
	let dragging = ref(false);
	let fileName = ref("");

	const computedError = computed(() => props.isError || hasError.value);

	const type = computed((): InputType => {
		const currentType = props.type;
		if (currentType === "color" || currentType === "email" || showPass.value)
			return "text";
		return currentType;
	});

	const computedMax = computed((): number | undefined => {
		if (isTypeValid("color")) return 7;
		if ((props.max || props.max === 0) && (!props.mask || props.isTextArea)) {
			return props.max;
		}
		return undefined;
	});

	const prependIcon = computed((): string => {
		if (isTypeValid("search")) return "search";
		else if (!props.appendIcon) return props.icon;
		return "";
	});

	const appendedIcon = computed((): string => {
		if (isTypeValid("password")) {
			if (showPass.value) return "visibility_off";
			return "visibility";
		} else if (props.appendIcon) return props.icon;
		return "";
	});

	const inputContainerClasses = computed(() => {
		return {
			focus: isFocused.value,
			error: computedError.value,
			disabled: props.disabled,
		};
	});

	const inputStyle = computed((): any => {
		return { "text-align": props.textAlign };
	});

	onBeforeMount(setInputValue);

	watch(() => props.modelValue, setInputValue);
	watch(() => props.type, setInputValue);

	function setInputValue() {
		if (isTypeValid("file")) {
			haveFile.value = !!props.modelValue;
			if (props.modelValue) {
				fileName.value = props.modelValue?.name || "";
			}
		} else {
			inputValue.value =
				props.modelValue || props.modelValue == 0 ? props.modelValue : "";
		}
	}

	function checkError() {
		if (props.isError) {
			hasError.value = false;
			return;
		}
		if (isTypeValid("email")) hasError.value = !isValidEmail(inputValue.value);
		else if (isMaskValid("domain"))
			hasError.value = !isValidDomain(inputValue.value);
		else if (isMaskValid("url")) hasError.value = !isValidUrl(inputValue.value);
		else if (
			!props.isTextArea &&
			(props.max || props.max === 0) &&
			inputValue.value &&
			inputValue.value.length > props.max
		) {
			hasError.value = true;
		} else {
			hasError.value = false;
		}
	}

	function onChangeFile(e: any) {
		const files = e.target.files || e.dataTransfer.files;
		dragging.value = false;
		if (files && files.length > 0) {
			haveFile.value = true;
			fileName.value = files[0].name || "";
			emit("update:modelValue", files[0]);
		} else {
			haveFile.value = false;
			fileName.value = "";
			emit("update:modelValue", undefined);
		}
	}

	function deleteFile() {
		haveFile.value = false;
		fileName.value = "";
		emit("update:modelValue", undefined);
	}

	function getSvgSize() {
		switch (props.size) {
			case "xs":
				return 56;
			case "sm":
				return 66;
			case "base":
				return 76;
			case "lg":
				return 86;
			case "xl":
				return 96;
			case "100":
				return 76;
			default:
				return 76;
		}
	}

	function onInput() {
		if (!props.isTextArea && props.mask && isTypeValid("text"))
			inputValue.value = applyMask(inputValue.value, props.mask);

		if (isTypeValid("number")) {
			if ((props.min || props.min === 0) && inputValue.value < props.min) {
				inputValue.value = props.min;
			} else if (
				(props.max || props.max === 0) &&
				inputValue.value > props.max
			) {
				inputValue.value = props.max;
			}
		}

		checkError();
		emit("update:modelValue", inputValue.value);
	}

	function onBlur(event: FocusEvent) {
		isFocused.value = false;
		checkError();
		emit("blur", event);
	}

	function onFocus(event: FocusEvent) {
		isFocused.value = true;
		if (!props.isError) {
			hasError.value = false;
		}
		emit("focus", event);
	}

	function increaseOrDecrease(n: number) {
		if (isNaN(Number(inputValue.value))) inputValue.value = 0;

		if (props.disabled) return;
		else if (
			((props.max || props.max === 0) &&
				Number(inputValue.value) >= props.max &&
				n > 0) ||
			((props.min || props.min === 0) &&
				Number(inputValue.value) <= props.min &&
				n < 0)
		) {
			return;
		}

		inputValue.value =
			(Number(inputValue.value) * 1000 + n * props.step * 1000) / 1000;
		onInput();
	}

	function isMaskValid(value: Mask | Mask[], opposite = false) {
		return isValueValid(props.mask, value, opposite);
	}

	function isTypeValid(value: InputType | InputType[], opposite = false) {
		return isValueValid(props.type, value, opposite);
	}

	function isValueValid(prop: any, value: any | any[], opposite = false) {
		let valid = prop == value;

		if (Array.isArray(value)) valid = value.includes(prop);
		if (opposite) valid = !valid;

		return valid;
	}
</script>

<template>
	<div
		class="flex flex-col h-fit"
		:class="[
			isTypeValid('file', true)
				? 'file-input-wrapper'
				: 'standard-input-wrapper',
			'size-' + props.size,
		]"
		style="gap: 6px"
		:style="{ opacity: props.disabled && !isTypeValid('file') ? 0.5 : 1 }">
		<div
			class="flex justify-between items-center"
			v-if="
				labelValue ||
				(computedMax !== undefined && !isTextArea && isTypeValid('text'))
			">
			<BLabel
				:label-value="labelValue"
				:info-message="
					props.infoMessage && !(computedError && props.errorMessage)
						? props.infoMessage
						: ''
				"
				:tooltip-min-width="tooltipMinWidth"
				:required="required" />
			<span
				v-if="computedMax !== undefined && !isTextArea && isTypeValid('text')"
				class="b-input-max-length">
				{{ inputValue?.length || 0 }}/{{ computedMax }}
			</span>
		</div>

		<div
			v-if="isTypeValid('file')"
			class="w-full h-full file-drop-area"
			:class="[{ 'blur-[2px]': dragging }, 'file-' + props.size, 'file']"
			@dragenter.prevent="dragging = true"
			@dragover.prevent
			@dragleave.prevent="dragging = false"
			@drop.prevent="onChangeFile">
			<svg
				:width="getSvgSize()"
				:height="getSvgSize()"
				viewBox="0 0 76 76"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				v-if="!haveFile">
				<path
					d="M63.5312 33.25H42.75C40.8603 33.25 39.0481 32.4993 37.7119 31.1631C36.3757 29.8269 35.625 28.0147 35.625 26.125V5.34375C35.625 5.18628 35.5624 5.03526 35.4511 4.92391C35.3397 4.81256 35.1887 4.75 35.0312 4.75H21.375C18.8554 4.75 16.4391 5.75089 14.6575 7.53249C12.8759 9.31408 11.875 11.7304 11.875 14.25V61.75C11.875 64.2696 12.8759 66.6859 14.6575 68.4675C16.4391 70.2491 18.8554 71.25 21.375 71.25H54.625C57.1446 71.25 59.5609 70.2491 61.3425 68.4675C63.1241 66.6859 64.125 64.2696 64.125 61.75V33.8438C64.125 33.6863 64.0624 33.5353 63.9511 33.4239C63.8397 33.3126 63.6887 33.25 63.5312 33.25Z"
					fill="var(--neutral-border-default)" />
				<path
					d="M62.228 27.9938L40.8812 6.647C40.8397 6.60573 40.7869 6.57766 40.7295 6.56631C40.672 6.55495 40.6125 6.56083 40.5584 6.5832C40.5043 6.60556 40.4581 6.64342 40.4254 6.69202C40.3928 6.74061 40.3752 6.79776 40.375 6.8563V26.125C40.375 26.7549 40.6252 27.3589 41.0706 27.8043C41.516 28.2497 42.1201 28.5 42.75 28.5H62.0187C62.0772 28.4997 62.1344 28.4822 62.183 28.4495C62.2315 28.4169 62.2694 28.3706 62.2918 28.3165C62.3141 28.2624 62.32 28.2029 62.3087 28.1455C62.2973 28.0881 62.2692 28.0353 62.228 27.9938Z"
					fill="var(--neutral-border-default)" />
				<g clip-path="url(#clip0_2300_5309_BInput)">
					<circle
						cx="63"
						cy="63"
						r="7"
						fill="white" />
					<path
						d="M63 50C55.8319 50 50 55.8319 50 63C50 70.1681 55.8319 76 63 76C70.1681 76 76 70.1681 76 63C76 55.8319 70.1681 50 63 50ZM68 64H64V68C64 68.2652 63.8946 68.5196 63.7071 68.7071C63.5196 68.8946 63.2652 69 63 69C62.7348 69 62.4804 68.8946 62.2929 68.7071C62.1054 68.5196 62 68.2652 62 68V64H58C57.7348 64 57.4804 63.8946 57.2929 63.7071C57.1054 63.5196 57 63.2652 57 63C57 62.7348 57.1054 62.4804 57.2929 62.2929C57.4804 62.1054 57.7348 62 58 62H62V58C62 57.7348 62.1054 57.4804 62.2929 57.2929C62.4804 57.1054 62.7348 57 63 57C63.2652 57 63.5196 57.1054 63.7071 57.2929C63.8946 57.4804 64 57.7348 64 58V62H68C68.2652 62 68.5196 62.1054 68.7071 62.2929C68.8946 62.4804 69 62.7348 69 63C69 63.2652 68.8946 63.5196 68.7071 63.7071C68.5196 63.8946 68.2652 64 68 64Z"
						fill="var(--primary-interaction-default)" />
				</g>
				<defs>
					<clipPath id="clip0_2300_5309_BInput">
						<rect
							width="26"
							height="26"
							fill="white"
							transform="translate(50 50)" />
					</clipPath>
				</defs>
			</svg>
			<div
				class="flex gap-2 items-center justify-center"
				v-else>
				<slot name="uploaded-file">
					<div class="flex flex-col items-center gap-xs">
						<BIcon
							name="draft"
							class="file-icon" />
						<div class="flex items-center gap-xs">
							<p
								class="file-name text-neutral-foreground-low truncate max-w-7xl">
								{{ fileName }}
							</p>
							<BIcon
								class="cursor-pointer trash-icon"
								name="delete"
								@click.stop="deleteFile" />
						</div>
					</div>
				</slot>
			</div>
			<div
				v-if="!haveFile"
				class="flex flex-col items-center gap-xs">
				<p class="file-name cursor-pointer text-primary-foreground-low">
					{{ labelValue || "Select a file" }}
				</p>
				<p class="file-name text-neutral-foreground-low">
					{{ placeholder || "or drag and drop it here" }}
				</p>
			</div>
			<input
				v-if="!haveFile"
				ref="inputFile"
				type="file"
				class="w-full h-full top-0 left-0 right-0 bottom-0 absolute opacity-0 z-1 cursor-pointer"
				@change="onChangeFile"
				:disabled="disabled" />
		</div>

		<div
			v-else-if="isTextArea"
			class="b-input-field-area"
			:class="inputContainerClasses">
			<textarea
				v-model="inputValue"
				class="b-input-text-content w-full"
				:style="inputStyle"
				:maxlength="computedMax"
				:placeholder="placeholder"
				:disabled="disabled"
				@blur="onBlur"
				@focus="onFocus"
				@input="onInput" />
		</div>

		<div
			class="flex items-center h-fit"
			v-else>
			<div
				class="b-input-field-area flex-1"
				:class="inputContainerClasses">
				<BIcon
					v-if="prependIcon"
					:name="prependIcon"
					class="b-input-side-icon" />
				<input
					v-model="inputValue"
					class="b-input-text-content"
					:style="inputStyle"
					:disabled="disabled"
					:value="inputValue"
					:placeholder="placeholder"
					:type="type"
					spellcheck="false"
					:max="computedMax"
					:min="min"
					:maxlength="computedMax"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur" />
				<input
					v-if="isTypeValid('color')"
					v-model="inputValue"
					class="color-display"
					:class="{ disabled: disabled }"
					:disabled="disabled"
					type="color"
					@input="onInput"
					@focus="onFocus"
					@blur="onBlur" />
				<BIcon
					v-if="appendedIcon"
					:name="appendedIcon"
					class="b-input-side-icon"
					:class="{ 'cursor-pointer': isTypeValid('password') }"
					@click="showPass = !showPass && isTypeValid('password')" />
			</div>
			<div
				v-if="isTypeValid('number')"
				class="flex flex-col items-center ml-xxs"
				:class="{
					'text-neutral-interaction-disabled': disabled && !computedError,
					'text-danger-interaction-default': computedError && !disabled,
				}">
				<BIcon
					name="arrow_drop_up"
					class="number-icon"
					@click="increaseOrDecrease(1)" />
				<BIcon
					name="arrow_drop_down"
					class="number-icon"
					@click="increaseOrDecrease(-1)" />
			</div>
		</div>

		<small
			v-if="computedError && errorMessage"
			class="b-input-message-error">
			{{ errorMessage }}
		</small>
		<small
			v-if="props.infoMessage && !(computedError && props.errorMessage)"
			class="b-input-message-info">
			{{ props.infoMessage }}
		</small>
	</div>
</template>

<style scoped>
	@reference "../../assets/main.css";

	/* Size classes controlam a largura do wrapper principal */
	.size-xs {
		width: 176px;
	}
	.size-sm {
		width: 272px;
	}
	.size-base {
		width: 367px;
	}
	.size-lg {
		width: 559px;
	}
	.size-xl {
		width: 1134px;
	}
	.size-100 {
		width: 100%;
	}

	/* Styles for input[type="color"] */
	.color-display {
		@apply w-2xl h-xl cursor-pointer bg-transparent;
	}
	.color-display.disabled {
		@apply pointer-events-none;
	}
	input[type="color"]::-webkit-color-swatch-wrapper {
		@apply border-0 p-0 bg-transparent;
	}
	input[type="color"]::-webkit-color-swatch {
		@apply border-xxs border-neutral-surface-highlight rounded-xs;
	}

	/* Styles for input[type="number"] controls */
	.number-icon {
		@apply cursor-pointer text-2xl flex items-center h-[.7em];
	}
	input[type="number"] {
		-moz-appearance: textfield;
	}
	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		@apply m-0;
	}

	/* File input specific styles */
	.file-drop-area {
		@apply relative flex flex-col items-center justify-center w-full h-full border-neutral-border-default border-dashed border-xxs cursor-pointer py-xs px-sm rounded-xs;
	}

	.file-icon {
		@apply text-neutral-foreground-low;
	}
	.trash-icon {
		@apply text-neutral-interaction-default hover:text-danger-interaction-default;
	}
	.file-name {
	}

	/* File input SIZES */
	.file-xs .file-icon {
		@apply text-4xl;
	}
	.file-xs .trash-icon {
		@apply text-base;
	}
	.file-xs .file-name {
		@apply text-xs;
	}

	.file-sm .file-icon {
		@apply text-6xl;
	}
	.file-sm .trash-icon {
		@apply text-lg;
	}
	.file-sm .file-name {
		@apply text-sm;
	}

	.file-base .file-icon {
		@apply text-7xl;
	}
	.file-base .trash-icon {
		@apply text-xl;
	}
	.file-base .file-name {
		@apply text-base;
	}

	.file-lg .file-icon {
		@apply text-8xl;
	}
	.file-lg .trash-icon {
		@apply text-2xl;
	}
	.file-lg .file-name {
		@apply text-lg;
	}

	.file-xl .file-icon {
		@apply text-9xl;
	}
	.file-xl .trash-icon {
		@apply text-3xl;
	}
	.file-xl .file-name {
		@apply text-xl;
	}

	.file-100 .file-icon {
		@apply text-7xl;
	}
	.file-100 .trash-icon {
		@apply text-lg;
	}
	.file-100 .file-name {
		@apply text-base;
	}
</style>
