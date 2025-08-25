<script setup lang="ts">
	import {
		ref,
		onMounted,
		onBeforeUnmount,
		onUpdated,
		computed,
		watch,
	} from "vue";

	const props = withDefaults(
		defineProps<{
			modelValue: boolean;
			duration?: number;
			noShadow?: boolean;
		}>(),
		{
			modelValue: false,
			duration: 150,
			noShadow: false,
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: boolean];
	}>();

	const model = ref(props.modelValue);
	let card = ref<HTMLDivElement>();
	let content = ref<HTMLDivElement>();
	const resizeObserver = new ResizeObserver(resize);
	const mutationObserver = new MutationObserver(resize);

	watch(
		() => props.modelValue,
		() => {
			model.value = props.modelValue;
			resize();
		}
	);

	const parsedDuration = computed((): number => {
		try {
			const rounded = Math.floor(props.duration);

			return Math.min(Math.max(rounded, 150), 1000);
		} catch (error) {
			return 150;
		}
	});

	onMounted(() => {
		if (card.value) resizeObserver.observe(card.value, { box: "border-box" });
		if (content.value) {
			resizeObserver.observe(content.value, { box: "border-box" });
			mutationObserver.observe(content.value, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ["data-max-height"],
			});
		}
	});

	onUpdated(resize);

	onBeforeUnmount(() => {
		if (resizeObserver) resizeObserver.disconnect();
		if (mutationObserver) mutationObserver.disconnect();
	});

	async function resize() {
		if (!content.value) return;

		content.value.style.maxHeight = model.value
			? `${content.value.scrollHeight}px`
			: "0px";

		if (content.value.style.maxHeight != content.value.dataset.maxHeight)
			content.value.dataset.maxHeight = content.value.style.maxHeight;
	}

	function changeModel() {
		model.value = !model.value;
		emit("update:modelValue", model.value);
	}
</script>

<template>
	<BCard
		class="b-collapse"
		:class="{ 'no-shadow': noShadow }">
		<div
			class="w-full flex flex-col gap-sm"
			ref="card">
			<div
				class="flex items-center justify-end w-full text-base cursor-pointer"
				:class="{ 'justify-between': $slots.header }"
				@click="changeModel">
				<slot name="header" />
				<div
					class="flex items-center w-fit h-fit transition-transform ease-in-out duration-300 text-2xl"
					:class="{ 'rotate-180': model }">
					<BIcon
						name="expand_more"
						size="xl"
						class="text-neutral-interaction-default font-bold" />
				</div>
			</div>
			<Transition name="content">
				<div
					ref="content"
					v-show="model"
					class="content-wrapper top-full left-0 transition-[max-height]"
					:class="{ 'b-hidden overflow-hidden': !model }"
					:style="{ 'transition-duration': `${parsedDuration}ms` }"
					data-max-height="0px">
					<slot />
				</div>
			</Transition>
		</div>
	</BCard>
</template>

<style scoped>
	@reference "../../assets/main.css";
	.b-collapse {
		@apply px-base py-xs w-full shadow-none transition-colors duration-300 hover:bg-neutral-surface-hover;
	}

	.no-shadow {
		@apply border-none;
	}

	.b-hidden {
		max-height: 0 !important;
	}
</style>
