<script setup lang="ts">
import BButton from '../BButton/BButton.vue';
import BDialog from '../BDialog/BDialog.vue';
import event from '#utils/event';
import { onBeforeUnmount, onMounted, ref } from 'vue'

const visible = ref(false);
const props = ref({
    title: '',
    message: '',
    acceptLabel: '',
    cancelLabel: '',
})

onMounted(() => {
    event.on('open-confirm', openDialog);
})

onBeforeUnmount(() => {
    event.off('open-confirm', openDialog);
})

function handleConfirm() {
    visible.value = false;
    event.emit('confirm');
}

function handleCancel() {
    visible.value = false;
    event.emit('cancel');
}

function openDialog(options: any) {
    Object.keys(options).forEach((key) => {
        // @ts-ignore
        props.value[key] = options[key];
    });

    visible.value = true;
}
</script>

<template>
    <BDialog v-model="visible" no-outside-close class="b-confirm">
        <div class="flex flex-col p-xl gap-sm">
            <h2 class="font-bold text-lg text-neutral-foreground-high" v-if="props.title">{{ props.title }}</h2>
            <p class="text-sm text-neutral-foreground-low" v-if="props.message">{{ props.message }}</p>
            <div class="flex justify-end w-full gap-xs mt-sm">
                <BButton variant="plain" @click="handleCancel">{{ props.cancelLabel }}</BButton>
                <BButton @click="handleConfirm">{{ props.acceptLabel }}</BButton>            
            </div>
        </div>
    </BDialog>
</template>
