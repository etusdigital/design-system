<script setup lang="ts">
import { computed, ref } from "vue";
import { useOptionalModel } from "#composables";
import {
  focusByArrowKey,
  focusWhenReady,
  getFocusableItems,
  isObject,
} from "../../utils";
import SelectContainer from "../../utils/components/SelectContainer.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    name: string;
    picture?: string;
    options?: any[];
    labelKey?: string;
    valueKey?: string;
    disabled?: boolean;
    getObject?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelKey: "label",
    valueKey: "value",
    disabled: false,
    getObject: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: object];
  logout: [];
  edit: [];
  editOption: [];
  privacyPolicyFunction: [];
  termsOfUseFucntion: [];
}>();

const [model] = useOptionalModel<any>(props, "modelValue", emit, null);
const isExpanded = ref(false);
const onFocusInput = ref(false);
const searchValue = ref("");
const menu = ref<HTMLElement>();
const footer = ref<HTMLElement>();

const filteredOptions = computed(() => {
  if (!props.options) return [];
  else if (!searchValue.value) return props.options;

  return props.options.filter((option: any) => {
    if (option[props.labelKey].toLowerCase().includes(searchValue.value.toLowerCase())) {
      return option;
    }
  });
});

const selected = computed(() => {
  return props.options?.find(
    (option: any) => getValue(option) == getValue(model.value)
  );
});

function getLabel(option: any) {
  return isObject(option) ? option[props.labelKey] : option;
}

function getValue(option: any) {
  return isObject(option) ? option[props.valueKey] : option;
}

function updateModel(option: any) {
  isExpanded.value = false;
  model.value = props.getObject ? option : getValue(option);
  emit("update:modelValue", option);
}

function changeExpanded(expanded: boolean) {
  setTimeout(() => {
    isExpanded.value = expanded;
  });
}

function onTriggerKeyDown(event: KeyboardEvent) {
  if (props.disabled || (event.key !== "ArrowDown" && event.key !== "ArrowUp"))
    return;

  event.preventDefault();
  isExpanded.value = true;
  focusWhenReady(() => {
    const items = getMenuItems();
    return event.key === "ArrowDown" ? items[0] : items[items.length - 1];
  });
}

function getMenuItems(footerStop?: HTMLElement) {
  const links = getFocusableItems(footer.value);
  const stop = footerStop ?? links[0];
  return getFocusableItems(menu.value).filter(
    (item) => !links.includes(item) || item === stop
  );
}

function onMenuKeyDown(event: KeyboardEvent) {
  const target = event.target as HTMLElement;
  const links = getFocusableItems(footer.value);
  const inFooter = links.includes(target);

  if (inFooter && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    focusByArrowKey(event, links, "horizontal");
    return;
  }

  focusByArrowKey(event, getMenuItems(inFooter ? target : undefined), "vertical");
}
</script>

<template>
  <SelectContainer
    v-model="isExpanded"
    class="profile"
    popup-role="dialog"
    :disabled="disabled"
    dont-have-max-height
    min-width="25em"
    @keydown="onTriggerKeyDown"
  >
    <div
      v-if="!isExpanded"
      class="flex items-center gap-xs text-2xl mr-xxs text-neutral-interaction-default"
      @click="changeExpanded(!isExpanded)"
    >
      <Avatar
        :name="name"
        :src="picture"
        size="small"
        alt="profile picture"
      />
      <p class="text-sm font-bold">
        {{ model ? getLabel(selected) || name : name }}
      </p>
    </div>
    <span v-else class="sr-only">{{ model ? getLabel(selected) || name : name }}</span>

    <template #options>
      <div ref="menu" @keydown="onMenuKeyDown">
        <div
          class="flex flex-col items-center gap-xs text-9xl px-xs py-sm text-neutral-interaction-default"
        >
          <Avatar
            :name="name"
            :src="picture"
            size="large"
            alt="profile picture"
          />
          <p
            class="text-sm text-center"
            v-if="model && getLabel(selected) && name"
          >
            {{ name }}
          </p>
          <h4
            class="text-3xl font-bold m-xxs text-center"
            v-if="(model && getLabel(selected)) || name"
          >
            {{ model ? getLabel(selected) || name : name }}
          </h4>
          <Button
            type="submit"
            color="primary"
            @click="emit('edit')"
            class="m-xxs truncate"
            :disabled="!name && !picture"
          >
            <slot name="edit-label"> Edit profile </slot>
          </Button>
        </div>
        <div
          class="flex flex-col items-center text-neutral-interaction-default"
          v-if="options && options.length"
        >
          <div class="flex items-center w-full relative">
            <Icon
              name="search"
              class="search-icon"
              :class="{
                'text-primary-interaction-default': onFocusInput === true,
              }"
            />
            <input
              v-model="searchValue"
              type="search"
              class="input-default"
              @focus="onFocusInput = true"
              @blur="onFocusInput = false"
              placeholder="Search"
            />
          </div>
          <div
            class="w-full text-neutral-interaction-default"
            :class="{
              'pr-xxs py-xxs': filteredOptions.length > 4,
            }"
          >
            <div
              class="w-full flex flex-col divide-y-xxs divide-neutral-default font-bold max-h-[12em] overflow-auto custom-scroll"
            >
              <div
                v-for="(option, index) in filteredOptions"
                :key="index"
                tabindex="0"
                class="profile-option justify-start w-full [&>*]:text-sm hover:bg-neutral-surface-highlight"
                @click="updateModel(option)"
                @keyup.enter.space="updateModel(option)"
              >
                <slot
                  name="option"
                  :option="option"
                  :index="index"
                  :active="
                    JSON.stringify(model || {}) == JSON.stringify(option || {})
                  "
                >
                  <p
                    class="text-sm"
                    :class="{
                      '[&>*]:underline':
                        JSON.stringify(model || {}) ==
                        JSON.stringify(option || {}),
                    }"
                  >
                    {{ getLabel(option) }}
                  </p>
                </slot>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col divide-y-xxs divide-neutral-default"
          :class="{
            'border-t-xxs border-t-neutral-default':
              filteredOptions && filteredOptions.length,
          }"
        >
          <div
            class="profile-option action text-neutral-interaction-default hover:bg-neutral-surface-highlight"
            tabindex="0"
            @click="emit('editOption')"
            @keyup.enter.space="emit('editOption')"
            v-if="model"
          >
            <Icon name="person" class="profile-icon" />
            <p class="text-sm font-bold">
              <slot name="edit-option"> Edit account </slot>
            </p>
          </div>
          <div
            class="text-danger-interaction-default profile-option action hover:bg-danger-surface-default"
            tabindex="0"
            @click="emit('logout')"
            @keyup.enter.space="emit('logout')"
          >
            <Icon name="logout" class="profile-icon" />
            <p class="text-sm font-bold">
              <slot name="logout-label"> Logout </slot>
            </p>
          </div>
        </div>
        <div
          ref="footer"
          class="flex items-center justify-center px-xs py-sm pt-xl text-neutral-interaction-default font-bold text-xxs gap-5 [&>*]:cursor-pointer"
        >
          <p
            class="hover:underline"
            tabindex="0"
            @click="emit('privacyPolicyFunction')"
            @keyup.enter.space="emit('privacyPolicyFunction')"
          >
            <slot name="privacy-policy"> Privacy Policy </slot>
          </p>
          <p
            class="hover:underline"
            tabindex="0"
            @click="emit('termsOfUseFucntion')"
            @keyup.enter.space="emit('termsOfUseFucntion')"
          >
            <slot name="terms-of-use"> Terms of use </slot>
          </p>
        </div>
      </div>
    </template>
  </SelectContainer>
</template>

<style scoped>
@reference "../../assets/main.css";

.avatar.large {
  @apply p-2xl;
}

:deep(.avatar.large span) {
  @apply text-3xl;
}

.profile-option {
  @apply flex items-center gap-xs p-xs cursor-pointer;
}

.profile-option.action {
  @apply p-xs text-xl;
}

.search-icon {
  @apply absolute left-1.5 text-xl;
}

.input-default {
  @apply w-full text-sm bg-neutral-surface-default border-xxs border-neutral-default placeholder:text-neutral-interaction-default py-xs pr-xs pl-2xl outline-none focus:border-neutral-default;
}

.profile-icon {
  @apply text-xl leading-xs;
}
</style>
