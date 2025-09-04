<script setup lang="ts">
// @TODO: Fix the initial size of the label div. I think it's due to the dynamic loading
// of ionicons not triggering a div resize event to the observer. Or it could be some
// slot content shenanigans aswell, idk.
// @TODO: Fix border width for container with sub items
import { ref, onMounted, onUpdated, onBeforeUnmount, computed } from "vue";
import type { ContainerModelExtra } from "../types/ContainerModelExtra";
import { useOptionalModel } from "#composables";
import Label from "./Label.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    labelValue?: string;
    role?: string;
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    required?: boolean;
    closeOnBlur?: boolean;
    hideBottom?: boolean;
    maxHeight?: string;
    minWidth?: string;
    secondary?: boolean;
    hideArrow?: boolean;
    disableLabelAutoWidth?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    role: "listbox",
    disabled: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    required: false,
    hideBottom: false,
    closeOnBlur: true,
    maxHeight: "none",
    minWidth: "15em",
    secondary: false,
    hideArrow: false,
    disableLabelAutoWidth: false,
  }
);

const mutationObserver = new MutationObserver(resize);

const emit = defineEmits<{
  "update:modelValue": [value: boolean, extra: ContainerModelExtra];
}>();

const [model, setModel] = useOptionalModel<boolean>(
  props,
  "modelValue",
  emit,
  false
);
const container = ref<HTMLDivElement>();
const label = ref<HTMLDivElement>();

const isExpanded = computed((): boolean =>
  props.disabled ? false : model.value
);

const contentMinWidth = ref(props.minWidth);

function onBlur(e: MouseEvent) {
  if (!props.closeOnBlur || !model.value || !container.value) return;

  const containerRect = container.value.getBoundingClientRect();

  let contentRect = null;
  const contentSlot = container.value.querySelector(
    '[slot="content"], .content'
  );
  if (isExpanded.value && contentSlot)
    contentRect = contentSlot.getBoundingClientRect();

  let isInsideBounds =
    e.clientX >= containerRect.left &&
    e.clientX <= containerRect.right &&
    e.clientY >= containerRect.top &&
    e.clientY <= containerRect.bottom;

  if (!isInsideBounds && contentRect)
    isInsideBounds =
      e.clientX >= contentRect.left &&
      e.clientX <= contentRect.right &&
      e.clientY >= contentRect.top &&
      e.clientY <= contentRect.bottom;

  if (!isInsideBounds) setModel(false, { source: "blur" });
}

function resize() {
  contentMinWidth.value = container.value?.scrollWidth + "px";
  if (!props.disableLabelAutoWidth && label.value)
    label.value.style.width = contentMinWidth.value;
}

onMounted(() => {
  resize();
  document.addEventListener("click", onBlur);
  if (container.value)
    mutationObserver.observe(container.value, { attributes: true });
});

onUpdated(resize);

onBeforeUnmount(() => {
  document.removeEventListener("click", onBlur);
  mutationObserver.disconnect();
});

function toggle() {
  if (props.disabled) return;

  setModel(!model.value, { source: "click" });
}
</script>

<template>
  <div class="container">
    <div v-if="labelValue" class="flex justify-between items-center">
      <Label
        :label-value="labelValue"
        :info-message="infoMessage"
        :required="required"
      />
    </div>
    <div
      ref="container"
      :role="role"
      :aria-disabled="disabled"
      :aria-required="required"
      class="label-container"
      :class="{ 'pointer-events-none': disabled }"
      tabindex="0"
    >
      <slot name="label">
        <div
          ref="label"
          class="label-content"
          :class="{
            disabled,
            secondary,
            expanded: isExpanded,
            'hide-bottom': hideBottom,
            error: isError,
          }"
          :style="{ 'max-height': maxHeight, 'min-width': minWidth }"
          @click="toggle"
          @keyup.space="toggle"
        >
          <slot />

          <div class="flex items-center gap-xs ml-auto">
            <slot name="complement" />
            <Icon
              v-if="!hideArrow"
              name="keyboard_arrow_down"
              class="arrow-icon"
              :class="{
                'text-neutral-interaction-disabled': disabled,
                'text-danger-interaction-default': isError,
                expanded: isExpanded,
              }"
            />
          </div>
        </div>
      </slot>

      <Transition name="content">
        <slot name="content" :min-width="contentMinWidth" />
      </Transition>
    </div>
    <small v-if="isError" class="text-danger-foreground-low text-start p3">{{
      errorMessage
    }}</small>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.container {
  @apply relative flex flex-col gap-xxs;
}

.label-container {
  @apply w-fit relative;
}

.label-content {
  @apply inline-flex items-center gap-xs outline-xxs rounded-sm cursor-pointer px-sm py-xs select-none transition-[outline,border-radius] p3
    duration-0 delay-100 text-neutral-interaction-default bg-neutral-surface-default outline-neutral-default focus:outline-primary-default;
}

.secondary.label-content {
  @apply bg-primary-interaction-default text-neutral-foreground-negative;
}

.expanded.label-content {
  @apply delay-0 outline-primary-default;
}

.expanded.label-content.hide-bottom {
  @apply rounded-none outline-neutral-default focus:outline-neutral-default;
}

.label-content.disabled {
  @apply bg-neutral-surface-disabled text-neutral-foreground-disabled;
}

.label-content.error {
  @apply text-danger-foreground-high outline-danger-default;
}

.arrow-icon {
  @apply shrink-0 flex items-center transition-transform duration-300 text-2xl;
}

.arrow-icon.expanded {
  @apply rotate-180;
}
</style>
