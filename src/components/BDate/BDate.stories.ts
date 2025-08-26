import type { Meta, StoryObj } from "@storybook/vue3";
import BDate from "./BDate.vue";

export default {
  component: BDate,
  argTypes: {
    modelValue: {
      type: { summary: "Date | Date[] | null" },
      table: {
        defaultValue: { summary: null },
      },
      description: "Will be the current date or period.",
    },
    lang: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "en-US" },
      },
      description: "Will be the date input language.",
    },
    isPeriod: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Will determine if the user can select 2 dates.",
    },
    maxInit: {
      type: { summary: "Date" },
      table: {
        defaultValue: { summary: null },
      },
      description: "Will be the oldest date the user can select.",
    },
    maxEnd: {
      type: { summary: "Date" },
      table: {
        defaultValue: { summary: null },
      },
      description: "Will be the newest date the user can select.",
    },
  },
} satisfies Meta<typeof BDate>;

type Story = StoryObj<typeof BDate>;

const defaultArgs = {
  modelValue: null,
  lang: "en-US",
  isPeriod: false,
  maxInit: undefined,
  maxEnd: undefined,
};

const defaultRender = (args: any) => ({
  components: { BDate },
  setup() {
    return { args };
  },
  template: `
    <BDate 
      v-model="args.modelValue" 
      :lang="args.lang" 
      :is-period="args.isPeriod" 
      :max-init="args.maxInit" 
      :max-end="args.maxEnd"
    />
    `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Lang: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    lang: "pt-BR",
  },
};

export const IsPeriod: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: [],
    isPeriod: true,
  },
};

export const MaxInit: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    maxInit: new Date(),
  },
};

export const MaxEnd: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    maxEnd: new Date(),
  },
};
