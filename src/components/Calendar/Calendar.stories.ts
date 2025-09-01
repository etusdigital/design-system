import type { Meta, StoryObj } from "@storybook/vue3";
import Calendar from "./Calendar.vue";

export default {
  component: Calendar,
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
    type: {
      type: { summary: "string" },
      control: { type: "select" },
      options: ["date", "period", "compare"],
      table: {
        defaultValue: { summary: "date" },
      },
      description: "Selection mode: single date, date range, or comparison mode.",
    },
    doubleCalendar: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Shows two calendar months side by side.",
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
} satisfies Meta<typeof Calendar>;

type Story = StoryObj<typeof Calendar>;

const defaultArgs = {
  modelValue: null,
  lang: "en-US",
  type: "date",
  doubleCalendar: false,
  maxInit: undefined,
  maxEnd: undefined,
};

const defaultRender = (args: any) => ({
  components: { Calendar },
  setup() {
    return { args };
  },
  template: `
    <Calendar 
      v-model="args.modelValue" 
      :lang="args.lang" 
      :type="args.type" 
      :double-calendar="args.doubleCalendar" 
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

export const Period: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    type: "period",
  },
};

export const Compare: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    type: "compare",
  },
};

export const DoubleCalendar: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    doubleCalendar: true,
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
