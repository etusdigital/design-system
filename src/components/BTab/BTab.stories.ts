import type { Meta, StoryObj } from "@storybook/vue3";
import BTab from "./BTab.vue";

export default {
  component: BTab,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      description: "Will the current tab.",
      table: {
        defaultValue: { summary: undefined },
      },
    },
    items: {
      type: { summary: "array" },
      description: "Array of values to be used as options.",
    },
    isIcon: {
      type: { summary: "boolean" },
      description: "Show icons instead of words.",
      table: {
        defaultValue: { summary: false },
      },
    },
    notCard: {
      type: { summary: "boolean" },
      description: "No card will wrapper the items.",
      table: {
        defaultValue: { summary: false },
      },
    },
  },
} satisfies Meta<typeof BTab>;

type Story = StoryObj<typeof BTab>;

const defaultArgs = {
  modelValue: undefined,
  items: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  isIcon: false,
  notCard: false,
};

const defaultRender = (args: any) => ({
  components: { BTab },
  setup() {
    return { args };
  },
  template: `
    <BTab
        class="w-fit"
        v-model="args.modelValue" 
        :items="args.items"
        :size="args.size"
        :is-icon="args.isIcon"
        :not-card="args.notCard"
    />
  `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { BTab },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-lg">
          <BTab
              class="w-fit"
              v-model="args.modelValue" 
              :items="args.items"
              :is-icon="args.isIcon"
              :not-card="args.notCard"
          />
          <BTab 
              v-model="args.modelValue" 
              :items="args.items"
              :is-icon="args.isIcon"
              :not-card="args.notCard"
          />
      </div>
    `,
  }),
  args: defaultArgs,
};

export const Icons: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    isIcon: true,
    items: ["laptop", "smartphone"],
  },
};

export const ObjectArray: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    items: [
      {
        label: "Laptop",
        value: "laptop",
        icon: "laptop",
      },
      {
        label: "Smartphone",
        value: "smartphone",
        icon: "smartphone",
      },
    ],
  },
};
