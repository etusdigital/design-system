<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import Calendar from '../../utils/components/Calendar.vue';

const props = withDefaults(defineProps<{
    modelValue?: Date | Date[];
    lang?: string;
    isPeriod?: boolean;
    maxInit?: Date;
    maxEnd?: Date;
}>(), {
    lang: 'en-US',
    isPeriod: false,
});

const selectedDate: Date[] | any = ref([]);
const initialDates = ref([
    {
        date: new Date(),
    },
]);

onBeforeMount(checkIsArray);

watch(() => props.modelValue, checkIsArray);
watch(() => props.isPeriod, () => selectedDate.value = []);

const emit = defineEmits<{
    'update:modelValue': [value: Date | Date[]],
}>();

function checkIsArray() {
    if (Array.isArray(props.modelValue)) {
        selectedDate.value = props.modelValue;
    } else {
        selectedDate.value[0] = props.modelValue;
    }
}

function selectDate(date: Date[] | Date[][]){
    if (props.isPeriod) {
        emit('update:modelValue', selectedDate.value);
    } else {
        selectedDate.value = date;
        emit('update:modelValue', date[0]);
    }
}
</script>

<template>
    <Calendar
        v-model="selectedDate"
        :initial-dates="initialDates"
        :is-compare="isPeriod"
        :lang="lang"
        :max-init="maxInit"
        :max-end="maxEnd"
        @update:model-value="selectDate"
    />
</template>