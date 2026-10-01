<script setup lang="ts">
import { ref, watch, nextTick, useId } from "vue";
import { useOptionalModel } from "#composables";
import {
  focusByArrowKey,
  focusWhenReady,
  getFocusableItems,
  isObject,
} from "../../utils";

type Color = "primary" | "info" | "success" | "warning" | "danger" | "neutral";

export type ProfilePictureOption = {
  label?: string;
  value?: any;
  icon?: string;
  image?: string;
  color?: Color;
  disabled?: boolean;
  items?: ProfilePictureOption[];
  action?: (option: ProfilePictureOption, item?: ProfilePictureOption) => void;
  [key: string]: any;
};

const props = withDefaults(
  defineProps<{
    modelValue?: Record<string, any>;
    expanded?: boolean;
    name?: string;
    description?: string;
    picture?: string;
    options?: ProfilePictureOption[];
    labelKey?: string;
    valueKey?: string;
    disabled?: boolean;
    ariaLabel?: string;
  }>(),
  {
    modelValue: undefined,
    expanded: undefined,
    name: "",
    description: "",
    picture: "",
    options: () => [],
    labelKey: "label",
    valueKey: "value",
    disabled: false,
    ariaLabel: undefined,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: Record<string, any>];
  "update:expanded": [value: boolean];
  select: [option: ProfilePictureOption, item?: ProfilePictureOption];
}>();

const id = useId();
const [model, setModel] = useOptionalModel<Record<string, any>>(
  props,
  "modelValue",
  emit,
  {}
);
const [expandedModel] = useOptionalModel<boolean>(props, "expanded", emit, false);
const openItems = ref<any>(null);
const trigger = ref<HTMLElement>();
const menu = ref<HTMLElement>();

watch(expandedModel, (open) => {
  if (open) focusWhenReady(() => getMenuItems()[0]);
  else openItems.value = null;
});

function getLabel(option: ProfilePictureOption) {
  return isObject(option) ? option[props.labelKey] : option;
}

function getValue(option: ProfilePictureOption) {
  return isObject(option) ? option[props.valueKey] ?? getLabel(option) : option;
}

function getSelectedItem(option: ProfilePictureOption) {
  const selected = model.value?.[getValue(option)];
  return option.items?.find((item) => getValue(item) === selected);
}

function getMenuItems() {
  return getFocusableItems(menu.value, "[data-profile-item]");
}

function setExpanded(value: boolean) {
  if (props.disabled && value) return;
  expandedModel.value = value;
}

function closeAndFocusTrigger() {
  setExpanded(false);
  nextTick(() => trigger.value?.focus({ preventScroll: true }));
}

function getGroup(value: any) {
  return menu.value?.querySelector<HTMLElement>(
    `[data-profile-parent="${CSS.escape(String(value))}"]`
  );
}

function getParentRow(value: any) {
  return menu.value?.querySelector<HTMLElement>(
    `[data-profile-option="${CSS.escape(String(value))}"]`
  );
}

function toggleItems(option: ProfilePictureOption) {
  const value = getValue(option);
  openItems.value = openItems.value === value ? null : value;
}

function openItemsAndFocus(option: ProfilePictureOption) {
  const value = getValue(option);
  openItems.value = value;
  nextTick(() => getGroup(value)?.querySelector<HTMLElement>("[data-profile-item]")?.focus());
}

function selectOption(option: ProfilePictureOption) {
  if (option.disabled) return;
  if (option.items?.length) {
    toggleItems(option);
    return;
  }

  option.action?.(option);
  emit("select", option);
  closeAndFocusTrigger();
}

function selectItem(option: ProfilePictureOption, item: ProfilePictureOption) {
  if (option.disabled || item.disabled) return;

  setModel({ ...model.value, [getValue(option)]: getValue(item) });
  option.action?.(option, item);
  emit("select", option, item);
}

function onTriggerKeyDown(event: KeyboardEvent) {
  if (props.disabled || (event.key !== "ArrowDown" && event.key !== "ArrowUp"))
    return;

  event.preventDefault();
  setExpanded(true);
  focusWhenReady(() => {
    const items = getMenuItems();
    return event.key === "ArrowDown" ? items[0] : items[items.length - 1];
  });
}

function onMenuKeyDown(event: KeyboardEvent) {
  const target = event.target as HTMLElement;
  const items = getMenuItems();
  const index = items.indexOf(target);

  if (event.key === "Tab") {
    const leaving = event.shiftKey ? index === 0 : index === items.length - 1;
    if (!leaving) return;
    event.preventDefault();
    closeAndFocusTrigger();
    return;
  }

  const parentValue = target.dataset.profileOption;
  const parent = props.options.find((o) => String(getValue(o)) === parentValue);
  const group = target.closest<HTMLElement>("[data-profile-parent]");

  if (event.key === "ArrowRight" && parent && !parent.disabled) {
    event.preventDefault();
    openItemsAndFocus(parent);
    return;
  }

  if (event.key === "ArrowLeft" && parent && openItems.value === getValue(parent)) {
    event.preventDefault();
    openItems.value = null;
    return;
  }

  if (event.key === "ArrowLeft" && group) {
    event.preventDefault();
    const value = group.dataset.profileParent;
    openItems.value = null;
    nextTick(() => getParentRow(value)?.focus());
    return;
  }

  focusByArrowKey(event, items, "vertical", { loop: true });
}
</script>

<template>
  <FloatCard
    :model-value="expandedModel"
    :disabled="disabled"
    manual-focus
    class="profile-picture"
    @update:model-value="setExpanded"
  >
    <div
      ref="trigger"
      class="profile-picture-trigger"
      :class="{ disabled }"
      role="button"
      :tabindex="disabled ? -1 : 0"
      aria-haspopup="menu"
      :aria-expanded="expandedModel"
      :aria-controls="expandedModel ? `${id}-menu` : undefined"
      :aria-label="ariaLabel || name || 'Profile menu'"
      :aria-disabled="disabled"
      @keydown="onTriggerKeyDown"
      @keydown.space.prevent
    >
      <slot name="trigger" :expanded="expandedModel">
        <Avatar :name="name" :src="picture" aria-hidden="true" />
        <Icon
          name="arrow_drop_down"
          class="profile-picture-arrow"
          :class="{ 'rotate-180': expandedModel }"
        />
      </slot>
    </div>

    <template #card>
      <div class="profile-picture-card">
        <slot name="header" :name="name" :description="description" :picture="picture">
          <div v-if="name || description || picture" class="profile-picture-header">
            <Avatar :name="name" :src="picture" aria-hidden="true" />
            <div class="profile-picture-info">
              <span v-if="name" class="profile-picture-name">{{ name }}</span>
              <span v-if="description" class="profile-picture-description">
                {{ description }}
              </span>
            </div>
          </div>
        </slot>
        <Separator v-if="options.length && (name || description || picture || $slots.header)" class="my-xs" />

        <div
          :id="`${id}-menu`"
          ref="menu"
          role="menu"
          :aria-label="ariaLabel || name || 'Profile menu'"
          @keydown="onMenuKeyDown"
        >
          <template v-for="option in options" :key="getValue(option)">
            <div
              class="profile-picture-option"
              :class="[option.color, { disabled: option.disabled }]"
              role="menuitem"
              tabindex="0"
              data-profile-item
              :data-profile-option="option.items?.length ? String(getValue(option)) : undefined"
              :aria-disabled="option.disabled || undefined"
              :aria-expanded="option.items?.length ? openItems === getValue(option) : undefined"
              :aria-label="
                getSelectedItem(option)
                  ? `${getLabel(option)}: ${getLabel(getSelectedItem(option)!)}`
                  : undefined
              "
              @click="selectOption(option)"
              @keydown.enter.space.prevent="selectOption(option)"
            >
              <slot name="option" :option="option" :selected-item="getSelectedItem(option)">
                <img
                  v-if="(getSelectedItem(option) ?? option).image"
                  :src="(getSelectedItem(option) ?? option).image"
                  alt=""
                  class="profile-picture-image"
                />
                <Icon
                  v-else-if="(getSelectedItem(option) ?? option).icon"
                  :name="(getSelectedItem(option) ?? option).icon"
                />
                <span class="flex-1 truncate">
                  {{ getLabel(getSelectedItem(option) ?? option) }}
                </span>
              </slot>
              <Icon
                v-if="option.items?.length"
                name="chevron_right"
                class="profile-picture-chevron"
                :class="{ 'rotate-90': openItems === getValue(option) }"
              />
            </div>

            <div
              v-if="option.items?.length && openItems === getValue(option)"
              class="profile-picture-items"
              role="group"
              :aria-label="getLabel(option)"
              :data-profile-parent="String(getValue(option))"
            >
              <div
                v-for="item in option.items"
                :key="getValue(item)"
                class="profile-picture-option"
                :class="{ selected: getSelectedItem(option) === item, disabled: item.disabled }"
                role="menuitemradio"
                tabindex="0"
                data-profile-item
                :aria-checked="getSelectedItem(option) === item"
                :aria-disabled="item.disabled || undefined"
                @click.stop="selectItem(option, item)"
                @keydown.enter.space.prevent.stop="selectItem(option, item)"
              >
                <slot name="item" :option="option" :item="item" :selected="getSelectedItem(option) === item">
                  <img v-if="item.image" :src="item.image" alt="" class="profile-picture-image" />
                  <Icon v-else-if="item.icon" :name="item.icon" />
                  <span class="flex-1 truncate">{{ getLabel(item) }}</span>
                </slot>
                <Icon v-if="getSelectedItem(option) === item" name="check" />
              </div>
            </div>
          </template>
        </div>

        <slot name="footer" />
      </div>
    </template>
  </FloatCard>
</template>

<style scoped>
@reference "../../assets/main.css";

.profile-picture-trigger {
  @apply flex items-center cursor-pointer rounded-full;
}

.profile-picture-trigger.disabled {
  @apply pointer-events-none;
}

.profile-picture-arrow {
  @apply text-neutral-interaction-default transition-[rotate];
}

.profile-picture-trigger.disabled .profile-picture-arrow {
  @apply text-neutral-interaction-disabled;
}

.profile-picture-card {
  @apply min-w-12xl p-xs;
}

.profile-picture-header {
  @apply flex items-center gap-xs p-xs;
}

.profile-picture-info {
  @apply flex flex-col min-w-0;
}

.profile-picture-name {
  @apply text-sm font-bold text-neutral-foreground-high truncate;
}

.profile-picture-description {
  @apply text-xs text-neutral-foreground-low truncate;
}

.profile-picture-option {
  @apply p3 flex items-center gap-xs p-xs cursor-pointer select-none rounded-sm text-neutral-interaction-default hover:text-primary-interaction-default hover:bg-primary-surface-default;

  .icon {
    @apply text-lg leading-none;
  }
}

.profile-picture-option.selected {
  @apply text-primary-interaction-selected bg-primary-surface-default;
}

.profile-picture-option.disabled {
  @apply pointer-events-none text-neutral-interaction-disabled;
}

.profile-picture-option.primary {
  @apply text-primary-interaction-default;
}

.profile-picture-option.info {
  @apply text-informative-interaction-default hover:bg-informative-surface-default;
}

.profile-picture-option.success {
  @apply text-success-interaction-default hover:bg-success-surface-default;
}

.profile-picture-option.warning {
  @apply text-warning-interaction-default hover:bg-warning-surface-default;
}

.profile-picture-option.danger {
  @apply text-danger-interaction-default hover:bg-danger-surface-default;
}

.profile-picture-chevron {
  @apply transition-[rotate];
}

.profile-picture-items {
  @apply flex flex-col pl-xs;
}

.profile-picture-image {
  @apply w-[1.25em] h-[1.25em] object-cover rounded-xxs;
}
</style>
