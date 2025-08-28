<script setup lang="ts">
import { ref, watch } from "vue";
import Overlay from "../../utils/components/Overlay.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    width?: string;
    height?: string;
    noOutsideClose?: boolean;
  }>(),
  {
    modelValue: false,
    width: "fit-content",
    height: "fit-content",
    noOutsideClose: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

let model = ref(props.modelValue);
const dialog = ref<HTMLElement>();

watch(
  () => props.modelValue,
  (cur) => {
    model.value = cur;
  }
);

function closeDialog() {
  if (props.noOutsideClose) {
    dialog.value?.classList.add("bounce-active");
    setTimeout(() => {
      dialog.value?.classList.remove("bounce-active");
    }, 100);
  } else {
    model.value = false;
    emit("update:modelValue", false);
  }
}
</script>

<template>
  <Teleport to="body">
    <Overlay v-model="model" :z-index="1002" @click="closeDialog">
      <Transition name="bounce">
        <div
          v-if="model"
          ref="dialog"
          class="b-dialog"
          :style="{ width: width, height: height }"
        >
          <slot />
        </div>
      </Transition>
    </Overlay>
  </Teleport>
</template>

<style scoped>
@reference "../../assets/main.css";

.b-dialog {
  @apply fixed z-[1003] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-neutral-surface-default rounded-base border-xxs border-neutral-default transform transition-transform;
  max-width: calc(100% - var(--spacing-xl));
  max-height: calc(100% - var(--spacing-xl));
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

.bounce-active {
  animation: bounce 0.5s ease;
}

@keyframes bounce-in {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes bounce {
  0% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
