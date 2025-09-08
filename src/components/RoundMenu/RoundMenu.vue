<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';

const props = withDefaults(defineProps<{
  options: any[];
}>(), {});

const isExpanded = ref(false);
const positions = ref<string[]>([]);
const isHovering = ref<boolean[]>([]);

onBeforeMount(() =>  {
    calculateButtonPosition();
})

watch(props.options, () => {
    calculateButtonPosition();
});

function calculateButtonPosition() {
  for(let i = 0; i < props.options.length; i++) {
    const angle = (i * 360) / props.options.length;
    const rads = (angle * Math.PI) / 180;

    const z = props.options.length < 7 ? 60 : props.options.length < 10 ? 7 * props.options.length : 6 * props.options.length;
    const x = z * Math.cos(rads);
    const y = z * Math.sin(rads);
    positions.value.push(`${x}px, ${y}px, 0`);
  }
}
</script>

<template>
    <div class="round-menu">
      <div
        v-for="option, index in options"
        :key="index"
        class="option"
        :style="isExpanded ? {
          transform:`translate3d(${positions[index]})`, 
          '-webkit-transform':`translate3d(${positions[index]})`,
        } : {}"
      >
        <Button
          :background="option.background"
          :icon="option.icon"
          round
          size="small"
          @click="option.action()"
          @mouseenter="isHovering[index] = true"
          @mouseleave="isHovering[index] = false"
          :class="{'z-[50]': isHovering[index]}"
        >
          {{ option.label }}
        </Button>
      </div>
      <div class="option" :class="{'z-[1]': !isExpanded}">
        <Button
          :color="!isExpanded ? 'success' : 'neutral'"
          size="small"
          @click="isExpanded = !isExpanded"
          round
        />
      </div>
    </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.round-menu {
  @apply relative flex items-center h-fit w-fit overflow-visible;
}

.option {
  @apply absolute hover:z-50;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transition: -webkit-transform ease-out 200ms;
  transition: -webkit-transform ease-out 200ms;
  transition: transform ease-out 200ms;
  transition: transform ease-out 200ms, -webkit-transform ease-out 200ms;
}

.option {
  -webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
  transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
}
</style>