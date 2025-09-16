import type { Meta, StoryObj } from "@storybook/vue3";
import History from "./History.vue";

export default {
  component: History,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "any" },
      description:
        'Will be an option from the "options" array at the selected index.',
    },
    options: {
      type: { name: "array", value: { name: "object", value: {} } },
      description: "This property will be the historic options.",
    },
    position: {
      type: { name: "string" },
      control: "select",
      options: ["top", "bottom", "left", "right"],
      table: {
        defaultValue: { summary: "right" },
      },
      description: "This is the historic position.",
    },
    type: {
      type: { name: "string" },
      control: "select",
      options: ["primary", "info", "success", "warning", "danger", "neutral"],
      table: {
        defaultValue: { summary: "info" },
      },
      description:
        "This is historic type, only if the option doesn't have a type property.",
    },
    disabled: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Don't allow user to change the select option.",
    },
    option: {
      description:
        "This slot will be displayed for each option passed. Params: option, index and active",
    },
  },
} satisfies Meta<typeof History>;

type Story = StoryObj<typeof History>;

const defaultOptions = [
  {
    label: "Person 1",
    date: new Date(),
    type: "primary",
    icon: "schedule",
    notRoundIcon: "check",
    isIconRound: true,
  },
  {
    label: "Person 2",
    date: new Date(),
    type: "info",
    icon: "schedule",
    notRoundIcon: "info_i",
    isIconRound: true,
  },
  {
    label: "Person 3",
    date: new Date(),
    type: "success",
    icon: "check_circle",
    notRoundIcon: "check",
    isIconRound: true,
  },
  {
    label: "Person 4",
    date: new Date(),
    type: "warning",
    icon: "error",
    notRoundIcon: "exclamation",
    isIconRound: true,
  },
  {
    label: "Person 5",
    date: new Date(),
    type: "danger",
    icon: "cancel",
    notRoundIcon: "close",
    isIconRound: true,
  },
  {
    label: "Person 6",
    date: new Date(),
    type: "neutral",
    icon: "check_circle",
    notRoundIcon: "check",
    isIconRound: true,
  },
];

const defaultArgs = {
  modelValue: null,
  options: defaultOptions.map((option) => ({ ...option, type: undefined, icon: undefined })),
  position: "right" as const,
  type: "primary" as const,
  disabled: false,
};

const defaultHtml = `
  <History
      v-model="args.modelValue"
      :options="args.options"
      :position="args.position"
      :type="args.type"
      :disabled="args.disabled"
  >
      <template #option="{ option, index, active }">
          <p
              class="text-sm mb-[10px] hover:underline"
              :class="{
                  'font-bold': active, 
                  'text-primary-interaction-default': (option.type || args.type) == 'primary', 
                  'text-informative-interaction-default': (option.type || args.type) == 'info', 
                  'text-success-interaction-default': (option.type || args.type) == 'success', 
                  'text-warning-interaction-default': (option.type || args.type) == 'warning', 
                  'text-danger-interaction-default': (option.type || args.type) == 'danger',
                  'text-neutral-interaction-default': (option.type || args.type) == 'neutral',
              }"
          >
              <span
                  class="text-neutral-foreground-negative py-[3px] px-[6px] mt-[5px] rounded-[20px] text-xs font-normal mr-[.6em]"
                  :class="{
                      'font-bold': active, 
                      'bg-primary-interaction-default': (option.type || args.type) == 'primary', 
                      'bg-informative-interaction-default': (option.type || args.type) == 'info', 
                      'bg-success-interaction-default': (option.type || args.type) == 'success', 
                      'bg-warning-interaction-default': (option.type || args.type) == 'warning', 
                      'bg-danger-interaction-default': (option.type || args.type) == 'danger',
                      'bg-neutral-interaction-default': (option.type || args.type) == 'neutral',
                  }"
                  v-if="index == 0"
              >
                  Current
              </span>
              {{ 
                  option.date.toLocaleDateString(
                      'en-US',
                      index == 0 ?
                      { day: '2-digit', month: 'long', year: 'numeric' } :
                      { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
                  ) 
              }}
          </p>
          <div class="flex items-center justify-start mt-[16px] mb-[5px]">
              <div class="w-[20px] h-[20px] rounded-[50%] bg-neutral-foreground-disabled" />
              <p class="text-sm text-neutral-foreground-low ml-sm" :class="{'text-neutral-foreground-high': active }">{{ option.label }}</p>
          </div>
      </template>
  </History>
`;

const defaultRender = (args: any) => ({
  components: { History },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Positions: Story = {
  render: (args: any) => ({
    components: { History },
    setup() {
      return { args };
    },
    template: `
        <div class="flex flex-col gap-xxs">
            ${["top", "bottom", "left", "right"]
              .map((position) => {
                return defaultHtml.replace(/args\.position/g, `'${position}'`);
              })
              .join("")}
        </div>
        `,
  }),
  args: defaultArgs,
};

export const Types: Story = {
  render: (args: any) => ({
    components: { History },
    setup() {
      return { args };
    },
    template: `
        <div class="flex gap-xxs">
            ${["primary", "info", "success", "warning", "danger", "neutral"]
              .map((type) => {
                return defaultHtml.replace(/args\.type/g, `'${type}'`);
              })
              .join("")}
        </div>
        `,
  }),
  args: defaultArgs,
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const MultiType: Story = {
  render: (args: any) => ({
    components: { History },
    setup() {
      return { args };
    },
    template: defaultHtml,
  }),
  args: {
    ...defaultArgs,
    disabled: true,
    options: defaultOptions.map((option) => ({ ...option, icon: undefined })),
  },
};

export const Icons: Story = {
  render: (args: any) => ({
    components: { History },
    setup() {
      return { args };
    },
    template: defaultHtml,
  }),
  args: {
    ...defaultArgs,
    disabled: true,
    options: defaultOptions.map((option) => ({ ...option, isIconRound: false, icon: option.notRoundIcon })),
  },
};

export const IsIconRound: Story = {
  render: (args: any) => ({
    components: { History },
    setup() {
      return { args };
    },
    template: defaultHtml,
  }),
  args: {
    ...defaultArgs,
    disabled: true,
    options: defaultOptions,
  },
};

export const Unfilled: Story = {
  render: (args: any) => ({
    components: { History },
    setup() {
      return { args };
    },
    template: defaultHtml,
  }),
  args: {
    ...defaultArgs,
    disabled: true,
    options: defaultOptions.map((option) => ({ ...option, unfilled: true })),
  },
};
