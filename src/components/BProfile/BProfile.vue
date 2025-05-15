<script setup lang="ts">
import { ref } from "vue";
import { useOptionalModel } from "#composables";

const props = withDefaults(
  defineProps<{
    modelValue?: object;
    name: string;
    profilePicture?: string;
    accounts?: any[] | never[];
    nameKey?: string;
    absolute?: boolean;
    disabled?: boolean;
  }>(),
  {
    modelValue: undefined,
    nameKey: "name",
    absolute: false,
    disabled: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: object];
  logout: [];
  editProfile: [];
  editAccount: [];
  changeAccount: [account: any];
  privacyPolicyFunction: [];
  termsOfUseFucntion: [];
}>();

const [model] = useOptionalModel<any>(props, "modelValue", emit, null);
let isExpanded = ref(false);
let onFocusInput = ref(false);
let searchValue = ref("");

function searchByName(search: string) {
  if (!props.accounts) {
    return [];
  }
  if (!search) {
    return props.accounts;
  }
  return props.accounts.filter((account: any) => {
    if (account[props.nameKey].toLowerCase().includes(search.toLowerCase())) {
      return account;
    }
  });
}

function changeAccount(account: any) {
  isExpanded.value = false;
  model.value = account;
  emit("update:modelValue", account);
  emit("changeAccount", account);
}

function changeExpanded(expanded: boolean) {
  setTimeout(() => {
    isExpanded.value = expanded;
  });
}
</script>

<template>
  <BSelectContainer
    v-model="isExpanded"
    class="b-profile"
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
        :src="profilePicture"
        alt="profile picture"
        v-if="profilePicture"
      />
      <BIcon name="account_circle" v-else />
      <p class="text-sm font-bold">
        {{ model ? model[nameKey] || name : name }}
      </p>
    </div>

    <template #items>
      <div
        class="flex flex-col items-center text-9xl px-xs pb-sm border-b-xxs text-neutral-interaction-default border-neutral-default gap-xs"
      >
        <img
          class="profile-picture w-[1.3em] h-[1.3em] mb-xxs text-8xl"
          :src="profilePicture"
          alt="profile picture"
          v-if="profilePicture"
        />
        <BIcon name="account_circle" size="1" v-else />
        <p class="text-sm text-center" v-if="model && model[nameKey] && name">
          {{ name }}
        </p>
        <h4
          class="text-3xl font-bold mb-xxs text-center"
          v-if="(model && model[nameKey]) || name"
        >
          {{ model ? model[nameKey] || name : name }}
        </h4>
        <BButton
          type="submit"
          variant="primary"
          @click="emit('editProfile')"
          class="mb-xxs truncate"
          :disabled="!name && !profilePicture"
        >
          <slot name="editProfile"> Edit profile </slot>
        </BButton>
      </div>
      <div
        class="flex flex-col items-center border-b-xxs text-neutral-interaction-default border-neutral-default"
        v-if="accounts && accounts.length"
      >
        <div class="flex items-center w-full relative">
          <div
            class="absolute left-1.5 text-xl"
            :class="{
              'text-primary-interaction-default': onFocusInput === true,
            }"
          >
            <BIcon name="search" size="xl" />
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
            'pr-xxs py-xxs': searchByName(searchValue).length > 4,
          }"
        >
          <div
            class="w-full flex flex-col divide-y-xxs divide-neutral-default font-bold max-h-[12em] overflow-auto custom-scroll"
          >
            <div
              v-for="(account, index) in searchByName(searchValue)"
              :key="index"
              class="profile-option justify-start w-full [&>*]:text-sm hover:bg-neutral-surface-highlight"
              @click="changeAccount(account)"
            >
              <slot
                name="account"
                :account="account"
                :index="index"
                :active="
                  JSON.stringify(model || {}) == JSON.stringify(account || {})
                "
              >
                <p
                  class="text-sm"
                  :class="{
                    '[&>*]:underline':
                      JSON.stringify(model || {}) ==
                      JSON.stringify(account || {}),
                  }"
                >
                  {{ account[nameKey] }}
                </p>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col divide-y-xxs divide-neutral-default">
        <div
          class="profile-option action text-neutral-interaction-default hover:bg-neutral-surface-highlight"
          @click="emit('editAccount')"
          v-if="model"
        >
          <BIcon name="person" size="xl" />
          <p class="text-sm font-bold">
            <slot name="editAccount"> Edit account </slot>
          </p>
        </div>
        <div
          class="text-danger-interaction-default profile-option action hover:bg-danger-surface-default"
          @click="emit('logout')"
        >
          <BIcon name="logout" size="xl" />
          <p class="text-sm font-bold">
            <slot name="logout"> Logout </slot>
          </p>
        </div>
      </div>
      <div
        class="flex items-center justify-center px-xs py-sm pt-xl text-neutral-interaction-default font-bold text-xxs gap-5 [&>*]:cursor-pointer"
      >
        <p @click="emit('privacyPolicyFunction')" class="hover:underline">
          <slot name="privacyPolicy"> Privacy Policy </slot>
        </p>
        <p @click="emit('termsOfUseFucntion')" class="hover:underline">
          <slot name="termsOfUse"> Terms of use </slot>
        </p>
      </div>
    </template>
  </BSelectContainer>
</template>

<style scoped>
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
  @apply w-full text-sm border-0 border-b-xxs border-neutral-default placeholder:text-neutral-interaction-default py-xs pr-xs pl-2xl outline-none;
}
</style>
