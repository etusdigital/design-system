<script lang="ts">
import BButton from '../BButton/BButton.vue';
import BDialog from '../BDialog/BDialog.vue';
import event from '#utils/event';
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        BButton,
        BDialog,
    },
    data() {
        return {
            title: '',
            message: '',
            acceptText: '',
            cancelText: '',
            visible: false,
            onConfirm: () => Boolean,
            onCancel: (reason: boolean) => Boolean,
        }
    },

    mounted() {
        event.on('open-confirm', this.openDialog);
    },

    methods: {
         handleConfirm() {
            this.visible = false;
            event.emit('confirm');
        },

        handleCancel() {
            this.visible = false;
            event.emit('cancel');
        },
        openDialog(options: any) {
            Object.keys(options).forEach((key) => {
                // @ts-ignore
                this[key] = options[key];
            });

            this.visible = true;
        },
    },

    beforeUnmount() {
        event.off('open-confirm', this.openDialog);
    },
})
</script>

<template>
    <BDialog v-model="visible" no-outside-close>
        <div class="flex flex-col p-xl gap-sm">
            <h2 class="font-bold text-lg text-neutral-foreground-high" v-if="title">{{ title }}</h2>
            <p class="text-sm text-neutral-foreground-low">{{ message }}</p>
            <div class="flex justify-end w-full gap-xs mt-sm">
                <BButton variant="plain" @click="handleCancel">{{ cancelText }}</BButton>
                <BButton @click="handleConfirm">{{ acceptText }}</BButton>            
            </div>
        </div>
    </BDialog>
</template>
