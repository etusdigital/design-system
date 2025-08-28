import type { Meta, StoryObj } from "@storybook/vue3";
import Profile from "./Profile.vue";

export default {
  component: Profile,
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
    picture: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "person-circle" },
      },
      description:
        "This property will be shown when viewing more user information.",
    },
    items: {
      type: { summary: "array" },
      table: {
        defaultValue: { summary: [] },
      },
      description: "If the user have multiple account pass them here.",
    },
    labelKey: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "label" },
      },
      description: "This the key to get account name in accounts array.",
    },
    valueKey: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "value" },
      },
      description: "This the key to get account value in accounts array.",
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
    getObject: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    privacyPolicyFunction: {
      type: { summary: "function" },
      table: {
        defaultValue: { summary: "()=>{void}" },
      },
      description: "This function will send user to privacy political page",
    },
    edit: {
      type: { summary: "function" },
      table: {
        defaultValue: { summary: "()=>{void}" },
      },
      description:
        "This function will executed when button edit profile is pressed.",
    },
    editItem: {
      type: { summary: "function" },
      table: {
        defaultValue: { summary: "()=>{void}" },
      },
      description:
        "This function will executed when button edit item is pressed.",
    },
    termsOfUseFucntion: {
      type: { summary: "function" },
      table: {
        defaultValue: { summary: "()=>{void}" },
      },
      description: "This function will send user to terms of use page",
    },
    logout: {
      type: { summary: "function" },
      table: {
        defaultValue: { summary: "()=>{void}" },
      },
      description:
        "This function will executed when button logout is pressed.",
    },
    'logout-slot': {
      type: { summary: "slot" },
      table: {
        defaultValue: { summary: "Logout" },
      },
      description:
        "This slot is the logout button text and function that execute when this it's clicked.",
    },
    'edit-slot': {
      type: { summary: "slot" },
      table: {
        defaultValue: { summary: "Edit Profile" },
      },
      description:
        "This slot is the edit profile button text and function that execute when this it's clicked.",
    },
    'edit-item': {
      table: {
        defaultValue: { summary: "Edit Account" },
      },
      description: "This slot is the edit account button text and function that execute when this it's clicked.",
    },
    item: {
      description:
        "This slot will be displayed as an account option. Params: item, index and active.",
    },
    'privacy-policy': {
      table: {
        defaultValue: { summary: "Privacy Policy" },
      },
      description: "This slot is the privacy policy text.",
    },
    'terms-of-use': {
      table: {
        defaultValue: { summary: "Terms of Use" },
      },
      description: "This slot is the terms of use text.",
    },
  },
} satisfies Meta<typeof Profile>;

type Story = StoryObj<typeof Profile>;

const defaultArgs = {
  modelValue: "personal-account",
  name: "John Doe",
  picture: "",
  absolute: false,
  disabled: false,
  getObject: false,
  items: [
    { label: "Personal Account", value: "personal-account" },
    { label: "Work Account", value: "work-account" },
    { label: "Project Alpha", value: "project-alpha" },
    { label: "Project Beta", value: "project-beta" },
    { label: "Development Team", value: "dev-team" },
  ],
  labelKey: "label",
  valueKey: "value",
  logout: () => {},
  edit: () => {},
  editItem: () => {},
  privacyPolicyFunction: () => {},
  termsOfUseFucntion: () => {},
};

const defaultRender = (args: any) => ({
  components: { Profile },
  setup() {
    return { args };
  },
  template: `
    <Profile
      v-model="args.modelValue"
      :name="args.name"
      :picture="args.picture"
      :items="args.items"
      :label-key="args.labelKey"
      :value-key="args.valueKey"
      :absolute="args.absolute"
      :disabled="args.disabled"
      :get-object="args.getObject"
      @logout="args.logout"
      @edit="args.edit"
      @edit-item="args.editItem"
      @privacy-policy-function="args.privacyPolicyFunction"
      @terms-of-use-fucntion="args.termsOfUseFucntion"
    >
      <template #edit-slot>
          Edit profile
      </template>
      <template #edit-item>
          Edit account
      </template>
      <template #logout-slot>
          Logout
      </template>
      <template #privacy-policy>
          Privacy Policy
      </template>
      <template #terms-of-use>
          Terms Of Use
      </template>
    </Profile>
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Absolute: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    absolute: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const Items: Story = {
  render: (args: any) => ({
    components: { Profile },
    setup() {
      return { args };
    },
    template: `
      <Profile
          v-model="args.modelValue"
          :name="args.name"
          :picture="args.picture"
          :items="args.items"
          :label-key="args.labelKey"
          :value-key="args.valueKey"
          :absolute="args.absolute"
          :disabled="args.disabled"
          :get-object="args.getObject"
          @logout="args.logout"
          @edit="args.edit"
          @edit-item="args.editItem"
          @privacy-policy-function="args.privacyPolicyFunction"
          @terms-of-use-fucntion="args.termsOfUseFucntion"
      >
          <template #edit-slot>
              Edit profile
          </template>
          <template #edit-item>
              Edit account
          </template>
          <template #logout-slot>
              Logout
          </template>
          <template #privacy-policy>
              Privacy Policy
          </template>
          <template #terms-of-use>
              Terms Of Use
          </template>
          <template #item="{ item, index, active }">
              <div class="flex items-center gap-xs">
                  <Icon name="account_circle" />
                  <span :class="{'underline': active }">{{ item.label }}</span>
              </div>
          </template>
      </Profile>
    `,
  }),
  args: defaultArgs,
};
