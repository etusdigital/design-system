import type { Meta, StoryObj } from "@storybook/vue3";
import Calendar from "./Calendar.vue";

export default {
  component: Calendar,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "Date | Date[] | Date[][] | undefined" },
      table: {
        defaultValue: { summary: "undefined" },
      },
      description: "Will be the current date or period.",
    },
    lang: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "en-US" },
      },
      description: "Will be the date input language.",
    },
    type: {
      type: { name: "string" },
      control: { type: "select" },
      options: ["date", "period", "compare"],
      table: {
        defaultValue: { summary: "date" },
      },
      description: "Selection mode: single date, date range, or comparison mode.",
    },
    doubleCalendar: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "Shows two calendar months side by side.",
    },
    minDate: {
      type: { name: "other", value: "Date | undefined" },
      table: {
        defaultValue: { summary: "null" },
      },
      description: "Will be the oldest date the user can select.",
    },
    maxDate: {
      type: { name: "other", value: "Date | undefined" },
      table: {
        defaultValue: { summary: "null" },
      },
      description: "Will be the newest date the user can select.",
    },
  },
} satisfies Meta<typeof Calendar>;

type Story = StoryObj<typeof Calendar>;

const defaultArgs = {
  modelValue: undefined,
  lang: "en-US",
  type: "date" as const,
  doubleCalendar: false,
  minDate: undefined,
  maxDate: undefined,
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
      :min-date="args.minDate" 
      :max-date="args.maxDate"
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
    type: "period" as const,
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

export const MinDate: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    minDate: new Date(),
  },
};

export const MaxDate: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    maxDate: new Date(),
  },
};
