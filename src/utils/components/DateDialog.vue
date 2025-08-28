<script setup lang="ts">
const props = withDefaults(defineProps<{
    show?: boolean;
    items: any[];
    vertical?: boolean;
    width?: string,
    maxHeight?: string;
    noPadding?: boolean;
}>(), {
    show: false,
    vertical: false,
    maxHeight: 'none',
    width: '90%',
    noPadding: false
});
</script>

<template>
    <Transition name="appear">
        <BCard 
            v-if="show"
            class="absolute z-[1] transition-transform top-[20%] left-[50%] -translate-x-1/2
                flex items-center justify-center"
            :class="{
                'overflow-auto': maxHeight != 'none',
                'flex-wrap': !vertical,
                'flex-col': vertical,
                'p-sm gap-xs': !noPadding
            }"
            :style="{
                'max-height': maxHeight,
                'width': width
            }"
        >
            <template  v-for="item in items">
                <slot name="item" :item="item" />
            </template>
        </BCard>
    </Transition>
</template>

<style scoped>
@reference "../../assets/main.css";

.appear-enter-active {
    @apply transition-all duration-500 ease-out;
}

.appear-leave-active {
    @apply transition-all duration-500 ease-out;
}

.appear-enter-from,
.appear-leave-to {
    transform: translate(-200%, 0px);
}
</style>