<script setup lang="ts">
import { ref, watch, onBeforeMount, computed } from "vue";
import {
  capitalizeFirstLetter,
  getArrayMonthDay,
  getMonths,
  checkDateType,
} from "../../utils/index";
import Day from "./Day.vue";
import DateDialog from "./DateDialog.vue";

type Type = "date" | "period" | "compare";
type Item = {
  title: string;
  date: Date;
  weeks: any[];
  value: number;
};

const props = withDefaults(
  defineProps<{
    modelValue?: Date | Date[] | Date[][];
    lang?: string;
    type?: Type;
    doubleCalendar?: boolean;
    maxInit?: Date;
    maxEnd?: Date;
  }>(),
  {
    lang: "en-US",
    type: "date",
    doubleCalendar: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: Date | Date[] | Date[][]];
}>();

const model = ref<Date[] | Date[][]>([]);
const show = ref({
  month: false,
  year: false,
});
const isBack = ref(true);
const showCalendar = ref(true);
const selectedIndex = ref(0);
const hoveredDate = ref();

const dates = computed(() => {
  if (props.doubleCalendar) {
    return [
      {
        date: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
      {
        date: new Date(),
        value: -1,
      },
    ];
  }

  return [
    {
      date: new Date(),
    },
  ];
});
const options = ref(getItems());

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
  const date = options.value[options.value.length - 1].date;
  for (let i = date.getFullYear() + 56; i >= date.getFullYear() - 62; i--) {
    years.push(i);
  }
  return years;
});

onBeforeMount(checkValidModel);

watch(() => props.modelValue, checkValidModel, { immediate: true, deep: true });
watch(() => props.type, checkValidModel);
watch(
  () => props.lang,
  () => updateItems()
);
watch(
  () => props.doubleCalendar,
  () => {
    options.value = getItems();
    updateItems();
  }
);

function checkValidModel() {
  model.value = checkDateType(props.modelValue, props.type);
}

function updateItems(value?: number, changeWeeks = true) {
  options.value.forEach((item: any) => {
    if (value) item.date.setMonth(item.date.getMonth() + value);
    if (changeWeeks) item.weeks = getArrayMonthDay(item.date);
    item.title = getTitle(item.date);
  });
}

function getItems() {
  return dates.value.map((date) => getDateObject(date.date, date.value));
}

function getDateObject(date: Date, value = 1): Item {
  return {
    title: getTitle(date),
    weeks: getArrayMonthDay(date),
    value,
    date,
  };
}

function getTitle(date: Date): string {
  if (show.value.year || show.value.month) {
    return capitalizeFirstLetter(
      date.toLocaleDateString(props.lang, { year: "numeric" })
    );
  }
  return capitalizeFirstLetter(
    date.toLocaleDateString(props.lang, { year: "numeric", month: "long" })
  );
}

function setNewMonth(value: number) {
  isBack.value = value === -1;
  showCalendar.value = false;
  updateItems(value);

  setTimeout(() => {
    showCalendar.value = true;
  }, 100);
}

function hidePopup() {
  setTimeout(() => {
    Object.keys(show.value).forEach((key) => {
      show.value[key as keyof typeof show.value] = false;
    });
    updateItems();
  }, 100);
}

function showPopup(index: number) {
  selectedIndex.value = index;
  show.value.year = show.value.month && !show.value.year;
  show.value.month = !show.value.month || show.value.year;

  updateItems();
}

function getPosition(day: Date, week: any[]) {
  const parsedWeek = week.filter((day: any) => day);
  const index = parsedWeek.findIndex((d: any) => d == day);

  if (day == parsedWeek[0]) return "start";
  else if (index == parsedWeek.length - 1) return "end";
  return "middle";
}

function setModel(date: Date) {
  let selectedDate: Date[] | Date[][] = model.value;

  if (props.type === "compare") {
    selectedDate = selectedDate as unknown as Date[][];
    if (!selectedDate[0] || selectedDate[1].length > 1) {
      selectedDate = [[], []];
    }

    let index = 0;
    if (selectedDate[0].length > 1) index = 1;

    selectedDate[index] = sortDate(date, selectedDate[index]);
  } else {
    selectedDate = sortDate(date, selectedDate as Date[]);
  }

  emit("update:modelValue", props.type == "date" ? date : selectedDate);
}

function sortDate(date: Date, dates: Date[]): Date[] {
  if (
    dates.length > 1 ||
    !dates.length ||
    (options.value.length == 1 && props.type == "date")
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
  show.value.month = false;
  const index = selectedIndex.value;
  const primary = options.value[index].date;
  const secondary =
    options.value[index == options.value.length - 1 ? 0 : index + 1].date;
  const toAdd = options.value[index].value;

  primary.setMonth(month);
  if (options.value.length > 1) secondary.setMonth(primary.getMonth() + toAdd);
  updateItems();
}

function changeYear(year: number) {
  show.value.year = false;
  show.value.month = false;
  const index = selectedIndex.value;
  const primary = options.value[index].date;
  const secondary =
    options.value[index == options.value.length - 1 ? 0 : index + 1].date;
  let toAdd = options.value[index].value;

  if (
    !(primary.getMonth() == 1 && toAdd == 1) &&
    !(primary.getMonth() == 11 && toAdd == -1)
  )
    toAdd = 0;

  primary.setFullYear(year);
  if (options.value.length > 1) secondary.setFullYear(year + toAdd);
  updateItems();
}
</script>

<template>
  <div class="calendar">
    <div
      v-for="(item, index) in options"
      :key="index"
      class="w-fit p-sm overflow-hidden"
    >
      <header class="relative flex items-center justify-center gap-xs mb-xs">
        <div
          v-if="index == 0"
          class="calendar-arrow left-0"
          @click="setNewMonth(-1)"
        >
          <Icon name="chevron_left" />
        </div>
        <Transition :name="!isBack ? 'slide-fade' : 'slide-fade-out'">
          <h1
            class="text-base font-bold cursor-pointer text-neutral-foreground-high"
            v-if="show"
            tabindex="0"
            @blur="hidePopup"
            @click="showPopup(index)"
          >
            {{ item.title }}
          </h1>
        </Transition>
        <div
          v-if="options.length - 1 == index"
          class="calendar-arrow right-0"
          @click="setNewMonth(1)"
        >
          <Icon name="chevron_right" />
        </div>
      </header>
      <main>
        <Transition :name="!isBack ? 'slide-fade' : 'slide-fade-out'">
          <table v-if="showCalendar">
            <thead>
              <tr class="[&>*]:p-xxs">
                <th v-for="(weekDay, index) in weekDays" :key="index">
                  {{ weekDay }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(week, index) in item.weeks.filter((w) =>
                  w.some((d: any) => d)
                )"
                :key="index"
                class="[&>*]:py-xxs [&>*]:px-none"
              >
                <td v-for="(day, index) in week" :key="index">
                  <Day
                    v-model="model"
                    v-model:hovered="hoveredDate"
                    :day="day"
                    :type="type"
                    :index="index"
                    :position="getPosition(day, week)"
                    :max-init="maxInit"
                    :max-end="maxEnd"
                    @select="setModel"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Transition>
      </main>
    </div>
    <DateDialog :model-value="show.month && !show.year" :options="months" wrap>
      <template #item="{ item }">
        <div
          :class="[
            item.value === options[selectedIndex].date.getMonth()
              ? 'bg-primary-interaction-default'
              : 'bg-primary-surface-highlight',
          ]"
          class="flex items-center justify-center flex-1 cursor-pointer min-w-[30%] text-neutral-foreground-negative text-sm p-sm border-xxs rounded-base hover:bg-primary-interaction-hover"
          @click="changeMonth(item.value)"
        >
          {{ item.label }}
        </div>
      </template>
    </DateDialog>
    <DateDialog
      :model-value="show.year"
      :options="years"
      vertical
      max-height="70%"
      no-padding
    >
      <template #item="{ item }">
        <div
          class="flex items-center justify-center cursor-pointer w-full p-xxs text-sm hover:bg-primary-surface-default hover:text-primary-interaction-default"
          :class="{
            'text-primary-interaction-default bg-primary-surface-default':
              item === options[selectedIndex].date.getFullYear(),
          }"
          @click="changeYear(item)"
        >
          {{ item }}
        </div>
      </template>
    </DateDialog>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.calendar {
  @apply flex relative w-fit;
}

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
  @apply flex items-center absolute text-neutral-interaction-default rounded-base border-xxs p-xxs
    border-neutral-default cursor-pointer hover:bg-neutral-surface-hover hover:text-neutral-interaction-hover;

  .icon {
    @apply text-xl;
  }
}
</style>
