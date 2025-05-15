<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import Calendar from '../../utils/components/Calendar.vue';

const props = withDefaults(defineProps<{
    modelValue?: Date[] | Date[][];
    lang?: string;
    isCompare?: boolean;
    maxInit?: Date;
    maxEnd?: Date;
}>(), {
    lang: 'en-US',
    isCompare: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: Date[] | Date[][]]
}>();

const selectedDate: Date[] | Date[][] | any = ref(props.isCompare ? [[], []] : []);
const initialDates = ref([
    {
        date: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    },
    {
        date: new Date(),
        value: -1,
    },
]);

onBeforeMount(()=> {
    checkValidModel();
});

watch(() => props.modelValue, () => checkValidModel());
watch(() => props.isCompare, () => {
    checkCompare();
    emit('update:modelValue', selectedDate.value);
});

function checkValidModel() {
    if(props.modelValue) {
        selectedDate.value = props.modelValue;
    } else {
        checkCompare();
    }
}

function checkCompare() {
    if(props.isCompare) {
        selectedDate.value = [[], []];
    } else {
        selectedDate.value = [];
    }
}

function selectDate(date: Date[] | Date[][]){
    if (!Array.isArray(date)) return;

    selectedDate.value = date;
    emit('update:modelValue', selectedDate.value);
}
</script>

<template>
    <Calendar
        v-model="selectedDate"
        :initial-dates="initialDates"
        :is-compare="isCompare"
        :lang="lang"
        :max-init="maxInit"
        :max-end="maxEnd"
        @update:model-value="selectDate"
    />
</template>
