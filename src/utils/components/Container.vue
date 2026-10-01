<script setup lang="ts">
// @TODO: Fix border width for container with sub items
import { ref, onMounted, onUpdated, onBeforeUnmount, computed, useId } from "vue";
import type { ContainerModelExtra } from "../types/ContainerModelExtra";
import { useOptionalModel } from "#composables";
import Label from "./Label.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    labelValue?: string;
    popupRole?: "listbox" | "menu" | "dialog";
    popupId?: string;
    ariaLabel?: string;
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
    icon?: string;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    popupRole: "listbox",
    popupId: undefined,
    ariaLabel: undefined,
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
    icon: "keyboard_arrow_down",
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
const id = useId();
const container = ref<HTMLDivElement>();
const labelContent = ref<HTMLDivElement>();

const isExpanded = computed((): boolean =>
  props.disabled ? false : model.value
);

const contentMinWidth = ref(props.minWidth);

function blur(value: boolean) {
  const source = props.closeOnBlur && model.value ? "blur" : "click";
  setModel(value, { source });
}

function resize() {
  contentMinWidth.value = container.value?.scrollWidth + "px";
}

onMounted(() => {
  resize();
  if (container.value)
    mutationObserver.observe(container.value, { attributes: true });
});

onUpdated(resize);

onBeforeUnmount(() => {
  mutationObserver.disconnect();
});

function toggle() {
  if (props.disabled) return;

  setModel(!model.value, { source: "click" });
}

function onKeyDown(e: KeyboardEvent) {
  if (!labelContent.value || e.target !== e.currentTarget) return;
  if (e.key !== "Enter" && e.key !== " ") return;

  e.preventDefault();
  toggle();
}

function onKeyUp(e: KeyboardEvent) {
  if (!labelContent.value || e.target !== e.currentTarget) return;
  if (e.key === "Enter" || e.key === " ") e.stopPropagation();
}
</script>

<template>
  <div>
    <FloatCard :model-value="isExpanded" :disabled="disabled" manual-focus @update:model-value="blur">
      <div class="container">
        <div v-if="labelValue" class="flex justify-between items-center">
          <Label
            :id="`${id}-label`"
            :label-value="labelValue"
            :info-message="infoMessage"
            :required="required"
          />
        </div>
        <div
          ref="container"
          :role="popupRole === 'listbox' ? 'combobox' : 'button'"
          :aria-haspopup="popupRole"
          :aria-expanded="isExpanded"
          :aria-controls="isExpanded ? popupId : undefined"
          :aria-label="labelValue ? undefined : ariaLabel"
          :aria-labelledby="labelValue ? `${id}-label` : undefined"
          :aria-describedby="isError ? `${id}-error` : undefined"
          :aria-invalid="popupRole === 'listbox' ? isError : undefined"
          :aria-required="popupRole === 'listbox' ? required : undefined"
          :aria-disabled="disabled"
          class="label-container"
          :class="{ 'pointer-events-none': disabled }"
          :tabindex="disabled ? -1 : 0"
          @keydown="onKeyDown"
          @keyup="onKeyUp"
        >
          <slot name="label">
            <div
              ref="labelContent"
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
            >
              <slot name="leading-complement" />
              <slot />
  
              <div class="flex items-center gap-xs ml-auto">
                <slot name="complement" />
                <Icon
                  v-if="!hideArrow"
                  :name="icon"
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
        </div>
      </div>
  
      <template #card>
        <slot name="content" :min-width="contentMinWidth" />
      </template>
    </FloatCard>
    <small v-if="isError" :id="`${id}-error`" class="text-danger-foreground-low text-start p3">{{
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
  @apply shrink-0 flex items-center transition-transform duration-300 text-lg leading-(--font-size-xl);
}

.arrow-icon.expanded {
  @apply rotate-180;
}
</style>
