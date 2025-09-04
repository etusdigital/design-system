<script setup lang="ts">
import { computed, ref } from "vue";
import { useOptionalModel } from "#composables";
import { isObject } from "../../utils";

const props = withDefaults(
  defineProps<{
    modelValue?: object;
    name: string;
    picture?: string;
    options?: any[] | never[];
    labelKey?: string;
    valueKey?: string;
    absolute?: boolean;
    disabled?: boolean;
    getObject?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelKey: "label",
    valueKey: "value",
    absolute: false,
    disabled: false,
    getObject: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: object];
  logout: [];
  edit: [];
  editItem: [];
  privacyPolicyFunction: [];
  termsOfUseFucntion: [];
}>();

const [model] = useOptionalModel<any>(props, "modelValue", emit, null);
let isExpanded = ref(false);
let onFocusInput = ref(false);
let searchValue = ref("");

const selected = computed(() => {
  return props.options?.find((item: any) => getValue(item) == getValue(model.value));
});

function searchItem(search: string) {
  if (!props.options) {
    return [];
  }
  if (!search) {
    return props.options;
  }
  return props.options.filter((item: any) => {
    if (item[props.labelKey].toLowerCase().includes(search.toLowerCase())) {
      return item;
    }
  });
}

function getLabel(item: any) {
  return isObject(item) ? item[props.labelKey] : item;
}

function getValue(item: any) {
  return isObject(item) ? item[props.valueKey] : item;
}

function updateModel(item: any) {
  isExpanded.value = false;
  model.value = props.getObject ? item : getValue(item);
  emit("update:modelValue", item);
}

function changeExpanded(expanded: boolean) {
  setTimeout(() => {
    isExpanded.value = expanded;
  });
}
</script>

<template>
  <SelectContainer
    v-model="isExpanded"
    class="profile"
    aria-multiselectable="false"
    :absolute="absolute"
    :disabled="disabled"
    dont-have-max-height
    min-width="25em"
  >
    <div
      v-if="!isExpanded"
      class="flex items-center gap-xs text-2xl mr-xxs text-neutral-interaction-default"
      @click="changeExpanded(!isExpanded)"
    >
      <img
        class="profile-picture w-[1em] h-[1em]"
        :src="picture"
        alt="profile picture"
        v-if="picture"
      />
      <Icon name="account_circle" v-else />
      <p class="text-sm font-bold">
        {{ model ? getLabel(selected) || name : name }}
      </p>
    </div>

    <template #items>
      <div
        class="flex flex-col items-center text-9xl px-xs psm border-xxs text-neutral-interaction-default border-neutral-default gap-xs"
      >
        <img
          class="profile-picture w-[1.3em] h-[1.3em] mxxs text-8xl"
          :src="picture"
          alt="profile picture"
          v-if="picture"
        />
        <Icon name="account_circle" size="1" v-else />
        <p class="text-sm text-center" v-if="model && getLabel(selected) && name">
          {{ name }}
        </p>
        <h4
          class="text-3xl font-bold mxxs text-center"
          v-if="(model && getLabel(selected)) || name"
        >
          {{ model ? getLabel(selected) || name : name }}
        </h4>
        <Button
          type="submit"
          variant="primary"
          @click="emit('edit')"
          class="mxxs truncate"
          :disabled="!name && !picture"
        >
          <slot name="edit-slot"> Edit profile </slot>
        </Button>
      </div>
      <div
        class="flex flex-col items-center border-xxs text-neutral-interaction-default border-neutral-default"
        v-if="options && options.length"
      >
        <div class="flex items-center w-full relative">
          <div
            class="absolute left-1.5 text-xl"
            :class="{
              'text-primary-interaction-default': onFocusInput === true,
            }"
          >
            <Icon name="search" size="xl" />
          </div>
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
            'pr-xxs py-xxs': searchItem(searchValue).length > 4,
          }"
        >
          <div
            class="w-full flex flex-col divide-y-xxs divide-neutral-default font-bold max-h-[12em] overflow-auto custom-scroll"
          >
            <div
              v-for="(item, index) in searchItem(searchValue)"
              :key="index"
              class="profile-option justify-start w-full [&>*]:text-sm hover:bg-neutral-surface-highlight"
              @click="updateModel(item)"
            >
              <slot
                name="item"
                :item="item"
                :index="index"
                :active="
                  JSON.stringify(model || {}) == JSON.stringify(item || {})
                "
              >
                <p
                  class="text-sm"
                  :class="{
                    '[&>*]:underline':
                      JSON.stringify(model || {}) ==
                      JSON.stringify(item || {}),
                  }"
                >
                  {{ getLabel(item) }}
                </p>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col divide-y-xxs divide-neutral-default">
        <div
          class="profile-option action text-neutral-interaction-default hover:bg-neutral-surface-highlight"
          @click="emit('editItem')"
          v-if="model"
        >
          <Icon name="person" size="xl" />
          <p class="text-sm font-bold">
            <slot name="edit-item"> Edit account </slot>
          </p>
        </div>
        <div
          class="text-danger-interaction-default profile-option action hover:bg-danger-surface-default"
          @click="emit('logout')"
        >
          <Icon name="logout" size="xl" />
          <p class="text-sm font-bold">
            <slot name="logout-slot"> Logout </slot>
          </p>
        </div>
      </div>
      <div
        class="flex items-center justify-center px-xs py-sm pt-xl text-neutral-interaction-default font-bold text-xxs gap-5 [&>*]:cursor-pointer"
      >
        <p @click="emit('privacyPolicyFunction')" class="hover:underline">
          <slot name="privacy-policy"> Privacy Policy </slot>
        </p>
        <p @click="emit('termsOfUseFucntion')" class="hover:underline">
          <slot name="terms-of-use"> Terms of use </slot>
        </p>
      </div>
    </template>
  </SelectContainer>
</template>

<style scoped>
@reference "../../assets/main.css";

.profile-picture {
  @apply rounded-full;
}

.profile-option {
  @apply flex items-center gap-2 p-xs cursor-pointer;
}

.profile-option.action {
  @apply p-xs text-xl;
}

.input-default {
  @apply w-full text-sm border-0 border-xxs border-neutral-default placeholder:text-neutral-interaction-default py-xs pr-xs pl-2xl outline-none focus:border-neutral-default;
}
</style>
