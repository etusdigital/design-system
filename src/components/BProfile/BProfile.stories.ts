import type { Meta, StoryObj } from "@storybook/vue3";
import BProfile from "./BProfile.vue";

export default {
  component: BProfile,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description:
        'This will be the selected account.',
    },
    name: {
      type: { summary: "text" },
      description: "This property will be the main user name.",
    },
    profilePicture: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "person-circle" },
      },
      description:
        "This property will be shown when viewing more user information.",
    },
    accounts: {
      type: { summary: "array" },
      table: {
        defaultValue: { summary: [] },
      },
      description: "If the user have multiple account pass them here.",
    },
    nameKey: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "name" },
      },
      description: "This the key to get account name in accounts array.",
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    absolute: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Makes the content dropdown have an absolute position.",
    },
    logout: {
      type: { summary: "function | slot" },
      table: {
        defaultValue: { summary: "()=>{void} | Logout" },
      },
      description:
        "This function will executed when button logout is pressed. It is the logout button text too.",
    },
    editProfile: {
      type: { summary: "function | slot" },
      table: {
        defaultValue: { summary: "()=>{void} | Edit Profile" },
      },
      description:
        "This function will executed when button edit profile is pressed. It is the edit profile button text too.",
    },
    editAccount: {
      table: {
        defaultValue: { summary: "Edit Account" },
      },
      description: "This slot is the edit account button text and function that execute when this it's clicked.",
    },
    changeAccount: {
      type: { summary: "function" },
      table: {
        defaultValue: { summary: "(account)=>{void}" },
      },
      description:
        "This function will executed when user choose another account. The account will be passed as a parameter",
    },
    privacyPolicyFunction: {
      type: { summary: "function" },
      table: {
        defaultValue: { summary: "()=>{void}" },
      },
      description: "This function will send user to privacy political page",
    },
    termsOfUseFucntion: {
      type: { summary: "function" },
      table: {
        defaultValue: { summary: "()=>{void}" },
      },
      description: "This function will send user to terms of use page",
    },
    account: {
      description:
        "This slot will be displayed as an account option. Params: account, index and active.",
    },
    privacyPolicy: {
      table: {
        defaultValue: { summary: "Privacy Policy" },
      },
      description: "This slot is the privacy policy text.",
    },
    termsOfUse: {
      table: {
        defaultValue: { summary: "Terms of Use" },
      },
      description: "This slot is the terms of use text.",
    },
  },
} satisfies Meta<typeof BProfile>;

type Story = StoryObj<typeof BProfile>;

const defaultArgs = {
  modelValue: { name: "Other Account 1" },
  name: "User name",
  profilePicture: "",
  absolute: false,
  disabled: false,
  accounts: [
    { name: "Other Account 1" },
    { name: "Other Account 2" },
    { name: "Other Account 3" },
    { name: "Other Account 4" },
    { name: "Other Account 5" },
    { name: "Other Account 6" },
    { name: "Other Account 7" },
    { name: "Other Account 8" },
    { name: "Other Account 9" },
  ],
  nameKey: "name",
  logout: () => {},
  editProfile: () => {},
  editAccount: () => {},
  changeAccount: (account) => {},
  privacyPolicyFunction: () => {},
  termsOfUseFucntion: () => {},
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BProfile },
    setup() {
      return { args };
    },
    template: `
      <BProfile
          v-model="args.modelValue"
          :name="args.name"
          :profile-picture="args.profilePicture"
          :accounts="args.accounts"
          :name-key="args.nameKey"
          :absolute="args.absolute"
          :disabled="args.disabled"
          @logout="args.logout"
          @edit-profile="args.editProfile"
          @edit-account="args.editAccount"
          @change-account="args.changeAccount"
          @privacy-policy-function="args.privacyPolicyFunction"
          @terms-of-use-fucntion="args.termsOfUseFucntion"
      >
          <template #editProfile>
              Edit profile
          </template>
          <template #editAccount>
              Edit account
          </template>
          <template #logout>
              Logout
          </template>
          <template #privacyPolicy>
              Privacy Policy
          </template>
          <template #termsOfUse>
              Terms Of Use
          </template>
      </BProfile>
    `,
  }),
  args: defaultArgs,
};

export const CustomAccount: Story = {
  render: (args: any) => ({
    components: { BProfile },
    setup() {
      return { args };
    },
    template: `
      <BProfile
          v-model="args.modelValue"
          :name="args.name"
          :profile-picture="args.profilePicture"
          :accounts="args.accounts"
          :name-key="args.nameKey"
          :absolute="args.absolute"
          :disabled="args.disabled"
          @logout="args.logout"
          @edit-profile="args.editProfile"
          @edit-account="args.editAccount"
          @change-account="args.changeAccount"
          @privacy-policy-function="args.privacyPolicyFunction"
          @terms-of-use-fucntion="args.termsOfUseFucntion"
      >
          <template #editProfile>
              Edit profile
          </template>
          <template #editAccount>
              Edit account
          </template>
          <template #logout>
              Logout
          </template>
          <template #privacyPolicy>
              Privacy Policy
          </template>
          <template #termsOfUse>
              Terms Of Use
          </template>
          <template #account="{ account, index, active }">
              <div class="flex items-center gap-2">
                  <BIcon name="account_circle" />
                  <span :class="{'underline': active }">{{ account.name }}</span>
              </div>
          </template>
      </BProfile>
    `,
  }),
  args: defaultArgs,
};
