<script setup lang="ts">
	import { computed, nextTick, ref } from "vue";
	import { useOptionalModel } from "#composables";
	import Option from "../../utils/components/Option.vue";
	import { isObject } from "../../utils";

	const props = withDefaults(
		defineProps<{
			modelValue: any;
			items?: any[];
			labelKey?: string;
			valueKey?: string;
			getObject?: boolean;
		}>(),
		{
			modelValue: undefined,
			items: undefined,
			labelKey: "label",
			valueKey: "value",
			getObject: false,
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: any];
	}>();

	const [model] = useOptionalModel<any>(props, "modelValue", emit, undefined);
	const expanded = ref<any[]>([]);

	const parsedItems = computed(() => {
		if (!props.items?.length) return [];

		const items = [...props.items];
		let selectedIndex = items.findIndex((item) => isActive(item));
		if (selectedIndex === -1) selectedIndex = 0;

		const result = [];

		for (let i = 0; i < items.length; i++) {
			if (
				i === 0 ||
				i === items.length - 1 ||
				(selectedIndex === 0 && i < 2) ||
				(selectedIndex === items.length - 1 && i >= items.length - 2) ||
				selectedIndex - 1 === i ||
				selectedIndex + 1 === i ||
				selectedIndex === i
			) {
				result.push(items[i]);
			} else if (i === 1 && selectedIndex > 1) {
				result.push({
					icon: "more_horiz",
					items: items.slice(1, selectedIndex - 1),
				});
			} else if (i === items.length - 2 && selectedIndex < items.length - 2) {
				result.push({
					icon: "more_horiz",
					items: items.slice(selectedIndex + 2, items.length - 1),
				});
			}
		}

		return result;
	});

	function setModel(item: any) {
		const value = props.getObject ? item : getValue(item);
		expanded.value = expanded.value.map(() => false);

		setTimeout(() => {
			model.value = value;
			emit("update:modelValue", value);
		}, 200);
	}

	function getLabel(value: any): string {
		return isObject(value) ? value[props.labelKey] : value;
	}

	function getValue(item: any): any {
		return isObject(item) ? item[props.valueKey] : item;
	}

	function isActive(item: any): boolean {
		const value = getValue(item);
		const selectedValue = getValue(model.value);
		return selectedValue == value;
	}

	async function showMoreItems(event: any, index: number) {
		expanded.value[index] = !expanded.value[index];
		if (!expanded.value[index]) return;

		const target = event.target as HTMLElement;
		const rect = target.getBoundingClientRect();
		const viewportHeight = window.innerHeight;

		await nextTick();

		const card = document.querySelector(
			`.more-options[index="${index}"]`
		) as HTMLElement;
		if (!card) return;

		card.style.left = `${rect.left}px`;

		if (rect.bottom + card.offsetHeight > viewportHeight)
			card.style.bottom = `${viewportHeight - rect.top}px`;
		else card.style.top = `${rect.bottom}px`;

		const closeHandler = (e: MouseEvent | WheelEvent) => {
			const isScrollable = Math.abs(card.offsetHeight - card.scrollHeight) > 3;
			const isWheel = e.type == "wheel";
			const isCard = card.contains(e.target as Node);
			const shouldClose = isScrollable
				? isWheel && !isCard
				: isWheel || !isCard;

			if (shouldClose) {
				expanded.value[index] = false;
				document.removeEventListener("click", closeHandler);
				document.removeEventListener("wheel", closeHandler);
			}
		};

		setTimeout(() => {
			document.addEventListener("click", closeHandler);
			document.addEventListener("wheel", closeHandler);
		}, 200);
	}
</script>

<template>
	<div class="b-breadcrumb">
		<template
			v-for="(item, index) in parsedItems"
			:key="item">
			<div
				v-if="isObject(item) && item.icon == 'more_horiz'"
				@click="showMoreItems($event, index)">
				<BIcon
					name="more_horiz"
					class="cursor-pointer" />
				<Teleport to="body">
					<Transition name="fade">
						<b-card
							v-if="expanded[index]"
							class="more-options"
							:index="index">
							<Option
								v-for="option in item.items"
								:key="option"
								@click="setModel(option)">
								{{ getLabel(option) }}
							</Option>
						</b-card>
					</Transition>
				</Teleport>
			</div>
			<h5
				v-else
				class="item"
				:class="{ active: isActive(item) }"
				@click="setModel(item)">
				{{ getLabel(item) }}
			</h5>
			<BIcon
				v-if="index < parsedItems.length - 1"
				name="chevron_right" />
		</template>
	</div>
</template>

<style scoped>
	@reference "../../assets/main.css";
	.b-breadcrumb {
		@apply flex items-center gap-xs;
	}

	.item {
		@apply text-neutral-interaction-default cursor-pointer hover:text-primary-interaction-hover;
		@apply m-0 leading-normal;
	}

	.item.active {
		@apply pointer-events-none text-neutral-foreground-high;
	}

	.b-breadcrumb :deep(.b-icon) {
		@apply flex items-center justify-center;
		@apply relative top-[0.5px];
	}

	.more-options {
		@apply z-1000 fixed overflow-auto min-w-9xl max-h-9xl p-xxs [&>*]:p-xs;
	}

	.fade-enter-active,
	.fade-leave-active {
		@apply transition-opacity duration-200;
	}

	.fade-enter-from,
	.fade-leave-to {
		@apply opacity-0;
	}
</style>
