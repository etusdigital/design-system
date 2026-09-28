<script setup lang="ts">
import { nextTick, ref } from "vue";
import { useOptionalModel } from "#composables";
import { type Option } from "#utils/types/DropOption";
import { isObject } from "../../utils";
import Options from "./Options.vue";

const props = withDefaults(
  defineProps<{
    modelValue: any;
    selected: boolean | undefined;
    option: Option;
    getObject: boolean;
  }>(),
  {
    modelValue: undefined,
    selected: false,
    getObject: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
  "update:selected": [value: boolean];
}>();

const [model] = useOptionalModel<any>(props, "modelValue", emit, "");
const [isSelected] = useOptionalModel<boolean>(props, "selected", emit, false);

const expanded = ref(false);
const root = ref<HTMLElement>();

function selectOption(option: Option) {
  if (!props.option.options?.length) {
    model.value = props.getObject ? option : option.value;
    isSelected.value = true;
    emit("update:selected", true);
  } else {
    expanded.value = !expanded.value;
  }
}

function changeSelected(selected: boolean) {
  isSelected.value = selected;
  emit("update:selected", selected);
}

function handleFocusOut(e: FocusEvent) {
  if (root.value?.contains(e.relatedTarget as Node)) return;
  expanded.value = false;
}

function getOptionElements(container?: Element | null): HTMLElement[] {
  return Array.from(container?.children ?? []).filter((el) =>
    el.hasAttribute("data-dropdown-option")
  ) as HTMLElement[];
}

async function focusFirstSubOption() {
  expanded.value = true;
  await nextTick();
  const subOptions = root.value?.querySelector(".sub-options");
  getOptionElements(subOptions)[0]?.focus();
}

function onKeyDown(e: KeyboardEvent) {
  if (e.target !== root.value) return;

  const siblings = getOptionElements(root.value.parentElement);
  const index = siblings.indexOf(root.value);
  const hasSubOptions = !!props.option.options?.length;
  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      siblings[Math.min(index + 1, siblings.length - 1)]?.focus();
      break;
    case "ArrowUp":
      e.preventDefault();
      siblings[Math.max(index - 1, 0)]?.focus();
      break;
    case "Home":
      e.preventDefault();
      siblings[0]?.focus();
      break;
    case "End":
      e.preventDefault();
      siblings[siblings.length - 1]?.focus();
      break;
    case "ArrowRight":
      if (!hasSubOptions) break;
      e.preventDefault();
      focusFirstSubOption();
      break;
    case "ArrowLeft": {
      const parentOption = root.value.parentElement?.closest<HTMLElement>(
        "[data-dropdown-option]"
      );
      if (!parentOption) break;
      e.preventDefault();
      parentOption.focus();
      break;
    }
    case "Enter":
    case " ":
      e.preventDefault();
      if (hasSubOptions) focusFirstSubOption();
      else selectOption(props.option);
      break;
  }
}

function getValue(option: any): any {
  return isObject(option) ? option.value : option;
}
</script>

<template>
  <div
    ref="root"
    class="relative"
    tabindex="0"
    data-dropdown-option
    @focusout="handleFocusOut"
    @keydown="onKeyDown"
  >
    <div
      class="option"
      :class="{
        selected: option.value === getValue(model) || isSelected,
        disabled: option.disabled,
      }"
      @click="selectOption(option)"
    >
      <div class="flex items-center gap-xs">
        <Icon :name="option.icon" class="icon" v-if="option.icon" />
        <p class="label">{{ option.label }}</p>
      </div>
      <Icon
        v-if="option.options && option.options.length"
        name="chevron_right"
        class="icon icon-small"
      />
    </div>
    <Options
      v-if="expanded && option.options && option.options.length"
      class="sub-options"
      :options="option.options"
    >
      <template #default="{ options }">
        <Option
          v-for="option in options"
          v-model="model"
          v-model:selected="option.selected"
          :option="option"
          :get-object="getObject"
          @update:model-value="selectOption"
          @update:selected="changeSelected"
        />
      </template>
    </Options>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.custom-card {
  :first-child .option {
    @apply rounded-b-none;
  }

  :last-child .option {
    @apply rounded-t-none;
  }
}

.option {
  @apply overflow-hidden text-neutral-interaction-default w-full flex items-center justify-between gap-xs px-base py-sm cursor-pointer
    hover:bg-primary-surface-hover hover:text-primary-interaction-hover;

  .label {
    @apply text-sm whitespace-nowrap;
  }

  .icon.icon {
    @apply text-xl leading-xs flex items-center;
  }
}

.option.selected {
  @apply bg-primary-surface-default text-primary-interaction-selected;
}

.option.disabled {
  @apply pointer-events-none text-neutral-interaction-disabled;
}

.sub-options {
  @apply absolute top-0 z-[60] bg-neutral-surface-default rounded-base flex flex-col shadow-neutral-default max-h-[12em];
  left: calc(100% + var(--spacing-xs));
}

.option .icon.icon.icon-small {
  @apply text-xl leading-xs;
}
</style>
