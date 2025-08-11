<script setup lang="ts">
	import Day from "./Day.vue";
	import DateDialog from "./DateDialog.vue";
	import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
	import { useOptionalModel, useAriaAttributes, useScreenReader, useKeyboardNavigation } from "#composables";
	import { capitalizeFirstLetter, getArrayMonthDay, getMonths, type MonthOption } from "../index";

	/**
	 * Calendar item interface
	 */
	type Item = {
		title: string;
		date: Date;
		weeks: (Date | string)[][];
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

	const [model, setModel] = useOptionalModel<Date[] | Date[][]>(
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
	
	// Accessibility composables
	const { useAriaId } = useAriaAttributes();
	const screenReader = useScreenReader();
	
	// Generate unique IDs
	const calendarId = useAriaId('calendar');
	const gridId = useAriaId('calendar-grid');
	const labelId = useAriaId('calendar-label');
	
	// Keyboard navigation state
	const focusedDate = ref<Date | null>(null);
	const keyboardMode = ref(false);
	
	// Initialize focused date to current selection or today
	const initializeFocusedDate = () => {
		if (Array.isArray(model.value) && model.value.length > 0) {
			if (Array.isArray(model.value[0])) {
				// Date[][]
				const firstArray = model.value[0] as Date[];
				if (firstArray.length > 0) {
					focusedDate.value = firstArray[0];
				}
			} else {
				// Date[]
				const dateArray = model.value as Date[];
				if (dateArray.length > 0) {
					focusedDate.value = dateArray[0];
				}
			}
		}
		if (!focusedDate.value) {
			focusedDate.value = new Date();
		}
	};
	
	// Initialize on mount
	onMounted(() => {
		initializeFocusedDate();
	});

	const weekDays = computed((): string[] => {
		const date = new Date("2021-10-03T23:15:30");
		const weekDay: string[] = [];
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
		const years: number[] = [];
		const date = props.initialDates[props.initialDates.length - 1].date;
		for (let i = date.getFullYear() + 56; i >= date.getFullYear() - 62; i--) {
			years.push(i);
		}
		return years;
	});

	const items = ref(
		props.initialDates.map((item: InitialItems) => getDateObject(item.date, item.value))
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
			items.value = props.initialDates.map((item: InitialItems) =>
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
		items.value.forEach((item: Item) => {
			if (value) item.date.setMonth(item.date.getMonth() + value);
			if (changeWeeks) item.weeks = getArrayMonthDay(item.date);
			item.title = getTitle(item.date);
		});
	}

	function selectDate(date: Date, fromKeyboard = false) {
		let selectedDate: Date[] | Date[][] = model.value;
		if (props.isCompare && items.value.length != 1) {
			// Type guard to ensure selectedDate is Date[][]
			if (!Array.isArray(selectedDate) || !Array.isArray(selectedDate[0])) {
				selectedDate = [[], []];
			}
			
			const compareData = selectedDate as Date[][];
			if (!compareData[0] || compareData[1].length > 1) {
				selectedDate = [[], []];
			}

			let index = 0;
			if ((selectedDate as Date[][])[0].length > 1) index = 1;

			(selectedDate as Date[][])[index] = changeDate(date, (selectedDate as Date[][])[index]);
		} else {
			selectedDate = changeDate(date, selectedDate as Date[]);
		}

		setModel(selectedDate, {});
		
		// Update focused date and announce selection
		focusedDate.value = date;
		if (fromKeyboard) {
			const formattedDate = date.toLocaleDateString(props.lang, {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
			screenReader.announcePolitely(`Selected ${formattedDate}`);
		}
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

	function changeMonth(month: number, fromKeyboard = false) {
		showMonth.value = false;
		const index = selectedIndex.value;
		const primary = items.value[index].date;
		const secondary =
			items.value[index == items.value.length - 1 ? 0 : index + 1].date;
		const toAdd = items.value[index].value;

		primary.setMonth(month);
		if (items.value.length > 1) secondary.setMonth(primary.getMonth() + toAdd);
		updateData();
		
		if (fromKeyboard) {
			const monthName = primary.toLocaleDateString(props.lang, { month: 'long', year: 'numeric' });
			screenReader.announcePolitely(`Viewing ${monthName}`);
		}
	}

	function changeYear(year: number, fromKeyboard = false) {
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
		
		if (fromKeyboard) {
			const monthName = primary.toLocaleDateString(props.lang, { month: 'long', year: 'numeric' });
			screenReader.announcePolitely(`Viewing ${monthName}`);
		}
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

	function getPosition(day: Date, week: (Date | string)[]) {
		const parsedWeek = week.filter((day: Date | string) => day);
		const index = parsedWeek.findIndex((d: Date | string) => d == day);

		if (day == parsedWeek[0]) return "start";
		else if (index == parsedWeek.length - 1) return "end";
		return "middle";
	}

	function setNewMonth(value: number, fromKeyboard = false) {
		isBack.value = value === -1;
		show.value = false;
		updateData(value);

		setTimeout(() => {
			show.value = true;
		}, 100);
		
		if (fromKeyboard) {
			const monthName = items.value[0].date.toLocaleDateString(props.lang, { month: 'long', year: 'numeric' });
			screenReader.announcePolitely(`Viewing ${monthName}`);
		}
	}
	
	// Keyboard navigation functions
	function moveFocusedDate(direction: 'up' | 'down' | 'left' | 'right' | 'home' | 'end' | 'pageup' | 'pagedown') {
		if (!focusedDate.value) return;
		
		keyboardMode.value = true;
		const currentDate = new Date(focusedDate.value);
		
		switch (direction) {
			case 'up':
				currentDate.setDate(currentDate.getDate() - 7);
				break;
			case 'down':
				currentDate.setDate(currentDate.getDate() + 7);
				break;
			case 'left':
				currentDate.setDate(currentDate.getDate() - 1);
				break;
			case 'right':
				currentDate.setDate(currentDate.getDate() + 1);
				break;
			case 'home':
				currentDate.setDate(1); // First day of month
				break;
			case 'end':
				// Last day of month
				currentDate.setMonth(currentDate.getMonth() + 1, 0);
				break;
			case 'pageup':
				currentDate.setMonth(currentDate.getMonth() - 1);
				break;
			case 'pagedown':
				currentDate.setMonth(currentDate.getMonth() + 1);
				break;
		}
		
		// Check if date is disabled
		if (isDateDisabled(currentDate)) {
			return; // Don't move to disabled dates
		}
		
		focusedDate.value = currentDate;
		
		// If moved to different month, update calendar
		if (currentDate.getMonth() !== items.value[0].date.getMonth() || 
		    currentDate.getFullYear() !== items.value[0].date.getFullYear()) {
			const monthDiff = (currentDate.getFullYear() - items.value[0].date.getFullYear()) * 12 + 
			                 (currentDate.getMonth() - items.value[0].date.getMonth());
			setNewMonth(monthDiff, true);
		}
		
		// Announce the new focused date
		const formattedDate = currentDate.toLocaleDateString(props.lang, {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
		screenReader.announcePolitely(formattedDate);
	}
	
	function isDateDisabled(date: Date): boolean {
		if (props.maxInit && date <= props.maxInit) return true;
		if (props.maxEnd && date >= props.maxEnd) return true;
		return false;
	}
	
	// Global keyboard handler for the calendar
	function handleCalendarKeyDown(event: KeyboardEvent) {
		if (!focusedDate.value) return;
		
		switch (event.key) {
			case 'ArrowUp':
				event.preventDefault();
				moveFocusedDate('up');
				break;
			case 'ArrowDown':
				event.preventDefault();
				moveFocusedDate('down');
				break;
			case 'ArrowLeft':
				event.preventDefault();
				moveFocusedDate('left');
				break;
			case 'ArrowRight':
				event.preventDefault();
				moveFocusedDate('right');
				break;
			case 'Home':
				event.preventDefault();
				moveFocusedDate('home');
				break;
			case 'End':
				event.preventDefault();
				moveFocusedDate('end');
				break;
			case 'PageUp':
				event.preventDefault();
				moveFocusedDate('pageup');
				break;
			case 'PageDown':
				event.preventDefault();
				moveFocusedDate('pagedown');
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				if (focusedDate.value && !isDateDisabled(focusedDate.value)) {
					selectDate(focusedDate.value, true);
				}
				break;
		}
	}
	
	// Function to determine if a date should have focus styling
	function shouldShowFocus(date: Date): boolean {
		return keyboardMode.value && 
		       focusedDate.value !== null && 
		       date.toDateString() === focusedDate.value.toDateString();
	}
	
	// Reset keyboard mode on mouse interaction
	function onMouseInteraction() {
		keyboardMode.value = false;
	}

	function hidePopup() {
		setTimeout(() => {
			showMonth.value = false;
			showYear.value = false;
			updateData();
		}, 100);
	}
	
	// Computed property for current month/year announcement
	const currentMonthYear = computed(() => {
		if (items.value.length === 0) return '';
		return items.value[0].date.toLocaleDateString(props.lang, {
			month: 'long',
			year: 'numeric'
		});
	});
	
	// Live region content for screen readers
	const liveRegionContent = ref('');
	
	watch(currentMonthYear, (newValue) => {
		if (newValue) {
			liveRegionContent.value = `Calendar for ${newValue}`;
		}
	});
</script>

<template>
	<div 
		:id="calendarId"
		class="b-calendar flex relative w-fit"
		role="application"
		:aria-labelledby="labelId"
		@keydown="handleCalendarKeyDown"
		@click="onMouseInteraction"
		@mousedown="onMouseInteraction"
		tabindex="0">
		
		<!-- Screen reader announcements -->
		<div aria-live="polite" aria-atomic="true" class="sr-only">
			{{ liveRegionContent }}
		</div>
		<div
			v-for="(item, index) in items"
			:key="index"
			class="w-fit p-sm overflow-hidden"
			role="group"
			:aria-labelledby="`${labelId}-${index}`">
			<header class="relative flex items-center justify-center gap-xs mb-xs">
				<button
					v-if="index == 0"
					class="calendar-arrow left-0"
					aria-label="Previous month"
					type="button"
					@click="setNewMonth(-1)">
					<BIcon name="chevron_left" aria-hidden="true" />
				</button>
				<Transition :name="!isBack ? 'slide-fade' : 'slide-fade-out'">
					<button
						v-if="show"
						:id="`${labelId}-${index}`"
						class="text-base font-bold cursor-pointer text-neutral-foreground-high bg-transparent border-none"
						type="button"
						:aria-label="`Select month and year. Currently ${item.title}`"
						:aria-expanded="showMonth || showYear"
						:aria-haspopup="'listbox'"
						@blur="hidePopup"
						@click="showPopup(index)"
						@keydown.enter.space="showPopup(index)">
						{{ item.title }}
					</button>
				</Transition>
				<button
					v-if="items.length - 1 == index"
					class="calendar-arrow right-0"
					aria-label="Next month"
					type="button"
					@click="setNewMonth(1)">
					<BIcon name="chevron_right" aria-hidden="true" />
				</button>
			</header>
			<main>
				<Transition :name="!isBack ? 'slide-fade' : 'slide-fade-out'">
					<table 
						v-if="show"
						:id="`${gridId}-${index}`"
						role="grid"
						:aria-labelledby="`${labelId}-${index}`"
						aria-readonly="false">
						<thead>
							<tr role="row" class="*:p-xxs">
								<th
									v-for="(weekDay, dayIndex) in weekDays"
									:key="dayIndex"
									role="columnheader"
									:aria-label="weekDay">
									{{ weekDay }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(week, weekIndex) in item.weeks.filter(w => w.some((d: Date | string) => d))"
								:key="weekIndex"
								role="row"
								class="*:py-xxs *:px-0">
								<td
									v-for="(day, dayIndex) in week"
									:key="dayIndex"
									role="gridcell">
									<Day
										v-if="day instanceof Date"
										v-model="model"
										v-model:hovered="hoveredDate"
										:day="day"
										:is-compare="isCompare"
										:size="items.length"
										:index="dayIndex"
										:position="getPosition(day as Date, week)"
										:max-init="maxInit"
										:max-end="maxEnd"
										:focused="shouldShowFocus(day as Date)"
										@select="selectDate" />
								</td>
							</tr>
						</tbody>
					</table>
				</Transition>
				<!-- Instructions for screen readers -->
				<div class="sr-only" :id="`instructions-${index}`">
					Use arrow keys to navigate dates. Enter or Space to select. Page Up/Page Down to change months. Home/End for first/last day of month.
				</div>
			</main>
		</div>
		<DateDialog
			:show="showMonth && !showYear"
			:items="months"
			wrap
			role="listbox"
			aria-label="Select month">
			<template #item="{ item }">
				<button
					type="button"
					role="option"
					:aria-selected="(item as MonthOption).value === items[selectedIndex].date.getMonth()"
					:aria-label="`${(item as MonthOption).label} ${items[selectedIndex].date.getFullYear()}`"
					:class="[
						(item as MonthOption).value === items[selectedIndex].date.getMonth()
							? 'bg-primary-interaction-default'
							: 'bg-primary-surface-highlight',
					]"
					class="flex items-center justify-center flex-1 cursor-pointer min-w-[30%] text-neutral-foreground-negative text-sm p-sm border-xxs hover:bg-primary-interaction-hover"
					style="border-radius: var(--rounded-base)"
					@click="changeMonth((item as MonthOption).value)"
					@keydown.enter.space="changeMonth((item as MonthOption).value)">
					{{ (item as MonthOption).label }}
				</button>
			</template>
		</DateDialog>
		<DateDialog
			:show="showYear"
			:items="years"
			vertical
			max-height="70%"
			no-padding
			role="listbox"
			aria-label="Select year">
			<template #item="{ item }">
				<button
					type="button"
					role="option"
					:aria-selected="(item as number) === items[selectedIndex].date.getFullYear()"
					:aria-label="`Year ${item}`"
					class="flex items-center justify-center cursor-pointer w-full p-xxs text-sm hover:bg-primary-surface-default hover:text-primary-interaction-default"
					:class="{
						'text-primary-interaction-default bg-primary-surface-default':
							(item as number) === items[selectedIndex].date.getFullYear(),
					}"
					@click="changeYear(item as number)"
					@keydown.enter.space="changeYear(item as number)">
					{{ item }}
				</button>
			</template>
		</DateDialog>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";

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
		
		&:focus {
			outline: 2px solid var(--primary-interaction-default);
			outline-offset: 2px;
		}
	}

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

	/* Focus styles for calendar grid */
	[role="application"]:focus {
		outline: 2px solid var(--primary-interaction-default);
		outline-offset: 2px;
	}

	/* Button focus styles */
	button:focus {
		outline: 2px solid var(--primary-interaction-default);
		outline-offset: 1px;
	}
</style>
