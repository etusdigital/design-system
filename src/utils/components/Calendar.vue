<script setup lang="ts">
	import Day from "./Day.vue";
	import DateDialog from "./DateDialog.vue";
	import { computed, ref, watch } from "vue";
	import { useOptionalModel } from "#composables";
	import { capitalizeFirstLetter, getArrayMonthDay, getMonths } from "../index";

	type Item = {
		title: string;
		date: Date;
		weeks: any[];
		value: number;
	};

	type InitialItems = {
		date: Date;
		value?: number;
	};

	const props = withDefaults(
		defineProps<{
			modelValue: Date[] | Date[][];
			initialDates: InitialItems[];
			lang?: string;
			isCompare?: boolean;
			maxInit?: Date;
			maxEnd?: Date;
		}>(),
		{
			lang: "en-US",
			isCompare: false,
		}
	);

	const emit = defineEmits<{
		"update:modelValue": [value: Date[] | Date[][]];
	}>();

	const [model, setModel] = useOptionalModel<any[] | any[][]>(
		props,
		"modelValue",
		emit,
		props.isCompare && props.initialDates.length != 1 ? [[], []] : []
	);

	const show = ref(true);
	const isBack = ref(true);
	const showMonth = ref(false);
	const showYear = ref(false);
	const hoveredDate = ref();
	const selectedIndex = ref(0);

	const weekDays = computed((): string[] => {
		const date = new Date("2021-10-03T23:15:30");
		const weekDay: any = [];
		for (let i = 0; i < 7; i++) {
			const day = date.toLocaleDateString(props.lang, { weekday: "long" });
			const formattedDay =
				day.charAt(0).toUpperCase() + day.charAt(1).toLowerCase();
			weekDay.push(formattedDay);
			date.setDate(date.getDate() + 1);
		}
		return weekDay;
	});
	const months = computed(() => getMonths(props.lang));
	const years = computed(() => {
		const years: any = [];
		const date = props.initialDates[props.initialDates.length - 1].date;
		for (let i = date.getFullYear() + 56; i >= date.getFullYear() - 62; i--) {
			years.push(i);
		}
		return years;
	});

	const items = ref(
		props.initialDates.map((item: any) => getDateObject(item.date, item.value))
	);

	watch(
		() => props.lang,
		() => {
			updateData(0, false);
		}
	);

	watch(
		() => props.initialDates,
		() => {
			items.value = props.initialDates.map((item: any) =>
				getDateObject(item.date, item.value)
			);
			updateData();
		}
	);

	function getDateObject(date: Date, value = 1): Item {
		return {
			title: getTitle(date),
			weeks: getArrayMonthDay(date),
			value,
			date,
		};
	}

	function updateData(value?: number, changeWeeks = true) {
		items.value.forEach((item: any) => {
			if (value) item.date.setMonth(item.date.getMonth() + value);
			if (changeWeeks) item.weeks = getArrayMonthDay(item.date);
			item.title = getTitle(item.date);
		});
	}

	function selectDate(date: Date) {
		let selectedDate: any[] | any[][] = model.value;
		if (props.isCompare && items.value.length != 1) {
			if (!selectedDate[0] || selectedDate[1].length > 1) {
				selectedDate = [[], []];
			}

			let index = 0;
			if (selectedDate[0].length > 1) index = 1;

			selectedDate[index] = changeDate(date, selectedDate[index]);
		} else {
			selectedDate = changeDate(date, selectedDate as Date[]);
		}

		setModel(selectedDate, {});
	}

	function changeDate(date: Date, dates: Date[]): Date[] {
		if (
			dates.length > 1 ||
			!dates.length ||
			(items.value.length == 1 && !props.isCompare)
		) {
			dates = [];
			dates[0] = date;
		} else if (date < dates[0]) {
			dates[1] = dates[0];
			dates[0] = date;
		} else {
			dates[1] = date;
		}

		return dates;
	}

	function changeMonth(month: number) {
		showMonth.value = false;
		const index = selectedIndex.value;
		const primary = items.value[index].date;
		const secondary =
			items.value[index == items.value.length - 1 ? 0 : index + 1].date;
		const toAdd = items.value[index].value;

		primary.setMonth(month);
		if (items.value.length > 1) secondary.setMonth(primary.getMonth() + toAdd);
		updateData();
	}

	function changeYear(year: number) {
		showYear.value = false;
		showMonth.value = false;
		const index = selectedIndex.value;
		const primary = items.value[index].date;
		const secondary =
			items.value[index == items.value.length - 1 ? 0 : index + 1].date;
		let toAdd = items.value[index].value;

		if (
			!(primary.getMonth() == 1 && toAdd == 1) &&
			!(primary.getMonth() == 11 && toAdd == -1)
		)
			toAdd = 0;

		primary.setFullYear(year);
		if (items.value.length > 1) secondary.setFullYear(year + toAdd);
		updateData();
	}

	function showPopup(index: number) {
		selectedIndex.value = index;
		if (showMonth.value && !showYear.value) {
			showYear.value = true;
		} else {
			showMonth.value = !showMonth.value;
			showYear.value = false;
		}
		updateData();
	}

	function getTitle(date: Date): string {
		if (showYear.value || showMonth.value) {
			return capitalizeFirstLetter(
				date.toLocaleDateString(props.lang, { year: "numeric" })
			);
		}
		return capitalizeFirstLetter(
			date.toLocaleDateString(props.lang, { year: "numeric", month: "long" })
		);
	}

	function getPosition(day: Date, week: any[]) {
		const parsedWeek = week.filter((day: any) => day);
		const index = parsedWeek.findIndex((d: any) => d == day);

		if (day == parsedWeek[0]) return "start";
		else if (index == parsedWeek.length - 1) return "end";
		return "middle";
	}

	function setNewMonth(value: number) {
		isBack.value = value === -1;
		show.value = false;
		updateData(value);

		setTimeout(() => {
			show.value = true;
		}, 100);
	}

	function hidePopup() {
		setTimeout(() => {
			showMonth.value = false;
			showYear.value = false;
			updateData();
		}, 100);
	}
</script>

<template>
	<div class="b-calendar flex relative w-fit">
		<div
			v-for="(item, index) in items"
			:key="index"
			class="w-fit p-sm overflow-hidden">
			<header class="relative flex items-center justify-center gap-xs mb-xs">
				<div
					v-if="index == 0"
					class="calendar-arrow left-0"
					@click="setNewMonth(-1)">
					<BIcon name="chevron_left" />
				</div>
				<Transition :name="!isBack ? 'slide-fade' : 'slide-fade-out'">
					<h1
						class="text-base font-bold cursor-pointer text-neutral-foreground-high"
						v-if="show"
						tabindex="0"
						@blur="hidePopup"
						@click="showPopup(index)">
						{{ item.title }}
					</h1>
				</Transition>
				<div
					v-if="items.length - 1 == index"
					class="calendar-arrow right-0"
					@click="setNewMonth(1)">
					<BIcon name="chevron_right" />
				</div>
			</header>
			<main>
				<Transition :name="!isBack ? 'slide-fade' : 'slide-fade-out'">
					<table v-if="show">
						<thead>
							<tr class="*:p-xxs">
								<th
									v-for="(weekDay, index) in weekDays"
									:key="index">
									{{ weekDay }}
								</th>
							</tr>
						</thead>
						<tr
							v-for="(week, index) in item.weeks.filter(w => w.some((d: any) => d))"
							:key="index"
							class="*:py-xxs *:px-none">
							<td
								v-for="(day, index) in week"
								:key="index">
								<Day
									v-model="model"
									v-model:hovered="hoveredDate"
									:day="day"
									:is-compare="isCompare"
									:size="items.length"
									:index="index"
									:position="getPosition(day, week)"
									:max-init="maxInit"
									:max-end="maxEnd"
									@select="selectDate" />
							</td>
						</tr>
					</table>
				</Transition>
			</main>
		</div>
		<DateDialog
			:show="showMonth && !showYear"
			:items="months"
			wrap>
			<template #item="{ item }">
				<div
					:class="[
						item.value === items[selectedIndex].date.getMonth()
							? 'bg-primary-interaction-default'
							: 'bg-primary-surface-highlight',
					]"
					class="flex items-center justify-center flex-1 cursor-pointer min-w-[30%] text-neutral-foreground-negative text-sm p-sm border-xxs hover:bg-primary-interaction-hover"
style="border-radius: var(--rounded-base)"
					@click="changeMonth(item.value)">
					{{ item.label }}
				</div>
			</template>
		</DateDialog>
		<DateDialog
			:show="showYear"
			:items="years"
			vertical
			max-height="70%"
			no-padding>
			<template #item="{ item }">
				<div
					class="flex items-center justify-center cursor-pointer w-full p-xxs text-sm hover:bg-primary-surface-default hover:text-primary-interaction-default"
					:class="{
						'text-primary-interaction-default bg-primary-surface-default':
							item === items[selectedIndex].date.getFullYear(),
					}"
					@click="changeYear(item)">
					{{ item }}
				</div>
			</template>
		</DateDialog>
	</div>
</template>

<style scoped>
	@reference "../../assets/main.css";

	th {
		@apply text-neutral-foreground-low text-sm;
	}

	.slide-fade-enter-active {
		@apply transition-all duration-300 ease-out;
	}

	.slide-fade-leave-active {
		transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		@apply opacity-0;
		transform: translateX(20px);
	}

	.slide-fade-out-enter-active {
		@apply transition-all duration-300 ease-out;
	}

	.slide-fade-out-leave-active {
		transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-out-enter-from,
	.slide-fade-out-leave-to {
		@apply opacity-0;
		transform: translateX(-20px);
	}

	.calendar-arrow {
		@apply flex items-center absolute text-neutral-interaction-default p-xxs
    border-xxs border-neutral-border-default cursor-pointer hover:bg-neutral-surface-hover hover:text-neutral-interaction-hover;
		border-radius: var(--rounded-base);

		.b-icon {
			@apply text-xl;
		}
	}
</style>
