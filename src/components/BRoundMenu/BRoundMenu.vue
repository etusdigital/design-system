<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';

const props = withDefaults(defineProps<{
  items: any[];
}>(), {});

const isExpanded = ref(false);
const positions = ref<string[]>([]);

onBeforeMount(() =>  {
    calculateButtonPosition();
})

watch(props.items, () => {
    calculateButtonPosition();
});

function calculateButtonPosition() {
  for(let i = 0; i < props.items.length; i++) {
    const angle = (i * 360) / props.items.length;
    const rads = (angle * Math.PI) / 180;

    const z = props.items.length < 7 ? 60 : props.items.length < 10 ? 7 * props.items.length : 6 * props.items.length;
    const x = z * Math.cos(rads);
    const y = z * Math.sin(rads);
    positions.value.push(`${x}px, ${y}px, 0`);
  }
}
</script>

<template>
    <div class="b-round-menu relative flex items-center h-fit w-fit overflow-visible">
      <div
        v-for="item, index in items"
        :key="index"
        class="item"
        :style="isExpanded ? {
          transform:`translate3d(${positions[index]})`, 
          '-webkit-transform':`translate3d(${positions[index]})`,
        } : {}"
      >
        <BRoundButton
          :background="item.background"
          :icon="item.icon"
          :text="item.text"
          @click="item.action()"
        />
      </div>
      <div class="item" :class="{'z-[1]': !isExpanded}">
        <BRoundButton
          :color="!isExpanded ? 'success' : 'neutral'"
          @click="isExpanded = !isExpanded"
        />
      </div>
    </div>
</template>

<style scoped>
.item {
  @apply absolute hover:z-50;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transition: -webkit-transform ease-out 200ms;
  transition: -webkit-transform ease-out 200ms;
  transition: transform ease-out 200ms;
  transition: transform ease-out 200ms, -webkit-transform ease-out 200ms;
}

.item {
  -webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
  transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
}
</style>