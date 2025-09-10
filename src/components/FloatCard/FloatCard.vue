<script setup lang="ts">
import { nextTick, ref, computed, watch } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    mode?: "click" | "hover";
  }>(),
  {
    modelValue: false,
    mode: "click",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

const model = ref(props.modelValue);
const content = ref<HTMLElement>();
const card = ref<HTMLElement>();

const computedPadding = computed((): number => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    return Number(
      (
        (content.value as any)
          ?.computedStyleMap()
          .get("--spacing-xxs")
          ?.toString() || "4px"
      ).replace("px", "")
    );
  }
  return 4;
});

watch(
  () => props.modelValue,
  (value) => {
    model.value = value;
    if (value) showCard();
  }
);

function updateModel(value: boolean) {
  model.value = value;
  emit("update:modelValue", value);
}

function closeCard() {
  updateModel(false);
  document.removeEventListener("click", closeHandler);
  document.removeEventListener("wheel", closeHandler);
}

function closeHandler(e: MouseEvent | WheelEvent) {
  if (!card.value) return;

  let cardContent = card.value.querySelector(".float-card") as HTMLElement;
  if (!cardContent)
    cardContent = (card.value.firstElementChild || card.value) as HTMLElement;

  const isWheel = e.type === "wheel";
  const isInsideCard = isClickInsideElement(e, cardContent);

  if (isWheel && isInsideCard) {
    const scrollableElement = findScrollableParent(
      e.target as HTMLElement,
      cardContent
    );
    if (scrollableElement) return;

    closeCard();
  } else if (!isInsideCard) closeCard();
}

function isClickInsideElement(
  e: MouseEvent | WheelEvent,
  element: HTMLElement
): boolean {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  
  const clientX = "clientX" in e ? e.clientX : 0;
  const clientY = "clientY" in e ? e.clientY : 0;

  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}

function findScrollableParent(
  element: HTMLElement,
  container: HTMLElement
): HTMLElement | null {
  let current = element;

  while (current && container.contains(current)) {
    if (current.scrollHeight > current.clientHeight) return current;

    current = current.parentElement as HTMLElement;
    if (current === container) break;
  }

  return null;
}

async function showCard() {
  await nextTick();

  if (!content.value || !card.value) return;

  let cardContent = card.value.querySelector(".float-card") as HTMLElement;
  if (!cardContent) return;

  cardContent = (card.value.firstElementChild || card.value) as HTMLElement;
  const rect = (
    content.value.firstElementChild || content.value
  ).getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  if (rect.left + cardContent.offsetWidth > viewportWidth)
    cardContent.style.left = `${rect.right - cardContent.offsetWidth}px`;
  else cardContent.style.left = `${rect.left}px`;

  if (rect.bottom + cardContent.offsetHeight > viewportHeight)
    cardContent.style.top = `${rect.top - cardContent.offsetHeight - computedPadding.value}px`;
  else cardContent.style.top = `${rect.bottom + computedPadding.value}px`;

  setTimeout(() => {
    document.addEventListener("click", closeHandler);
    document.addEventListener("wheel", closeHandler);
  }, 200);
}
</script>

<template>
  <div
    ref="content"
    @click="mode == 'click' ? updateModel(true) : null"
    @mouseenter="mode == 'hover' ? updateModel(true) : null"
    @mouseleave="mode == 'hover' ? closeCard() : null"
  >
    <Teleport to="body">
      <div ref="card">
        <Transition name="fade">
          <Card v-if="model" class="float-card">
            <slot name="card" />
          </Card>
        </Transition>
      </div>
    </Teleport>
    <slot />
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.float-card {
  @apply z-[1004] fixed;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
