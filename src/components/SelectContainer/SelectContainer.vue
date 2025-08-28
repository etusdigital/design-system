<script setup lang="ts">
// @TODO: Fix the initial size of the label div. I think it's due to the dynamic loading
// of ionicons not triggering a div resize event to the observer. Or it could be some
// slot content shenanigans aswell, idk.
// @TODO: Fix border width for container with sub items
import { ref, onMounted, onBeforeUnmount, onUpdated, computed } from "vue";
import type { ContainerModelExtra } from "../../utils/components/ContainerModelExtra.types";
import { useOptionalModel } from "#composables";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    labelValue?: string;
    role?: string;
    absolute?: boolean;
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    required?: boolean;
    closeOnBlur?: boolean;
    dontHaveMaxHeight?: boolean;
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
    absolute: false,
    disabled: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    required: false,
    closeOnBlur: true,
    dontHaveMaxHeight: false,
    maxHeight: "40px",
    minWidth: "15em",
    secondary: false,
    hideArrow: false,
    disableLabelAutoWidth: false,
  }
);

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
const fatherContainer = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();
const resizeObserver = new ResizeObserver(resize);
const mutationObserver = new MutationObserver(resize);

const isExpanded = computed((): boolean =>
  props.disabled ? false : model.value
);

onMounted(() => {
  if (!fatherContainer.value) return;
  container.value = fatherContainer.value.querySelector(
    ".label-container"
  ) as HTMLDivElement;

  if (container.value) {
    mutationObserver.observe(container.value, {
      characterData: true,
      subtree: true,
      childList: true,
    });
    resizeObserver.observe(container.value, { box: "border-box" });
  }
  if (content.value)
    resizeObserver.observe(content.value, { box: "border-box" });

  setTimeout(() => {
    resize();
  }, 200);
});

onUpdated(resize);

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect();
});

function resize() {
  if (!content.value) return;

  content.value.style.maxHeight = isExpanded.value
    ? `${content.value.scrollHeight + 1}px`
    : "0px";
}

function changeModel(value: boolean, extra: ContainerModelExtra) {
  setModel(value, extra || {});
}
</script>

<template>
  <div ref="fatherContainer">
    <ExpandableContainer
      class="select-container"
      v-model="model"
      :absolute="absolute"
      :label-value="labelValue"
      :close-on-blur="closeOnBlur"
      :disabled="disabled"
      :is-error="isError"
      :error-message="errorMessage"
      :info-message="infoMessage"
      :required="required"
      :max-height="maxHeight"
      :min-width="minWidth"
      :secondary="secondary"
      :hide-arrow="hideArrow"
      :disable-label-auto-width="disableLabelAutoWidth"
      @update:model-value="changeModel"
    >
      <slot />

      <template #complement v-if="$slots.complement">
        <slot name="complement" />
      </template>

      <template #label v-if="$slots.label">
        <slot name="label" />
      </template>

      <template #content>
        <div
          v-show="isExpanded"
          ref="content"
          class="content-wrapper"
        >
          <div
            class="content transition-translate"
            :class="{
              secondary,
              expanded: isExpanded,
              'has-max-height': !dontHaveMaxHeight,
            }"
          >
            <slot name="content">
              <ul
                role="list"
                class="items-list"
                :class="[{ 'p-xxs [&>*]:p-xs': !dontHaveMaxHeight }]"
              >
                <slot name="items" />
              </ul>
            </slot>

            <div v-if="$slots.actions" class="actions" tabindex="0">
              <slot name="actions" />
            </div>
          </div>
        </div>
      </template>
    </ExpandableContainer>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.content-wrapper {
  @apply top-full left-0 transition-[max-height] duration-100 w-full;
}

.content {
  @apply overflow-hidden flex flex-col items-center translate-y-[-100%] duration-100 ease-out
    rounded-sm bg-neutral-surface-default text-xs;
}

.content.secondary {
  @apply bg-primary-interaction-default text-neutral-foreground-negative;

  .items-list::-webkit-scrollbar-thumb {
    @apply bg-primary-surface-pressed;
  }

  .items-list::-webkit-scrollbar {
    @apply bg-primary-surface-default;
  }
}

.content.expanded {
  @apply translate-y-[0];
}

.content.has-max-height {
  @apply max-h-[12em];
}

.items-list {
  @apply overflow-auto rounded-sm w-full;
}

.actions {
  @apply flex gap-xxs items-center justify-end p-xs w-full border-t-xxs border-neutral-default;
}
</style>
