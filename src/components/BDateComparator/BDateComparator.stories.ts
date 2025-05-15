import type { Meta, StoryObj } from "@storybook/vue3";
import BDateComparator from "./BDateComparator.vue";

export default {
  component: BDateComparator,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "Date[] | Date[][] | null" },
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
    isCompare: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Will determine if the user can select 2 period.",
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
} satisfies Meta<typeof BDateComparator>;

type Story = StoryObj<typeof BDateComparator>;

const defaultArgs = {
  modelValue: null,
  lang: "en-US",
  isCompare: false,
  maxInit: undefined,
  maxEnd: undefined,
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BDateComparator },
    setup() {
      return { args };
    },
    template: `
      <BDateComparator v-model="args.modelValue" :lang="args.lang" :is-compare="args.isCompare" :max-init="args.maxInit" :max-end="args.maxEnd" />
    `,
  }),
  args: defaultArgs,
};
