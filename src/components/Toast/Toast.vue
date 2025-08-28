<script setup lang="ts">
import Alert from "../Alert/Alert.vue";
import event from "@/utils/event";
import { ref, onMounted, onBeforeUnmount } from "vue";

type Type = "info" | "success" | "warning" | "danger" | "neutral";

const toasts = ref<any[]>([]);
const containers = ref(
  ["top", "bottom"].flatMap((vertical) =>
    ["left", "right"].map((horizontal) => ({
        vertical: vertical,
        horizontal: horizontal,
    }))
  )
);

onMounted(() => {
  event.on("open-toast", addToast);
  event.on("close-toast", removeToast);
});

onBeforeUnmount(() => {
  event.off("open-toast", addToast);
  event.off("close-toast", removeToast);
});

function addToast(options: any) {
  const toast = {
    id: options.id,
    title: "",
    message: "",
    type: "danger" as Type,
    top: false,
    bottom: false,
    right: false,
    left: false,
    buttonLabel: "",
    action: () => {},
    ...options,
    visible: true,
  };

  toasts.value.push(toast);
  if (options.timeout) {
    setTimeout(() => {
      removeToast(toast.id);
    }, options.timeout);
  }
}

function removeToast(id: string) {
  if (!id) return;

  const toast = toasts.value.find((t) => t.id === id);
  if (!toast) return;

  toast.visible = false;
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 600);
}
</script>

<template>
  <div
    class="toast-container"
    v-for="container in containers"
    :key="container.vertical + container.horizontal"
    :class="[container.vertical, container.horizontal]"
  >
    <Transition
      v-for="toast in toasts.filter(
        (t) => t[container.vertical] && t[container.horizontal]
      )"
      :key="toast.id"
      :name="toast.right ? 'slide-right' : 'slide-left'"
      appear
    >
      <Alert
        v-if="toast.visible"
        class="toast"
        :title="toast.title"
        :message="toast.message"
        :type="toast.type"
        icon-position="center"
        closable
        @close="removeToast(toast.id)"
      >
        <template #actions v-if="toast.buttonLabel">
          <Button class="whitespace-nowrap" size="small" variant="secondary" :color="toast.type" @click="toast.action">
            {{ toast.buttonLabel }}
          </Button>
        </template>
      </Alert>
    </Transition>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.toast-container {
  @apply z-[1100] fixed flex flex-col gap-sm p-sm;
}

.top {
  @apply top-0;
}

.bottom {
  @apply bottom-0;
}

.right {
  @apply right-0 items-end;
}

.left {
  @apply left-0;
}

.toast {
  @apply w-fit max-w-[50em] break-all whitespace-normal;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.6s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

@media screen and (max-width: 50em) {
  .toast {
    @apply max-w-[95%];
  }
}
</style>
