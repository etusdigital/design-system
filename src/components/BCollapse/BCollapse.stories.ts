import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BCollapse from "./BCollapse.vue";

const meta = {
  component: BCollapse,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "The collapse state. Optional.",
    },
    duration: {
      type: { summary: "number" },
      table: {
        defaultValue: { summary: 150 },
      },
      description: "The duration time in milisseconds. Optional.",
    },
    noShadow: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "If true, the collapse will not have a shadow. Optional.",
    },
    header: {
      description: "This slot will be the collapse header.",
    },
    default: {
      description: "This slot will be the collapse content.",
    },
  },
} satisfies Meta<typeof BCollapse>;
export default meta;

type Story = StoryObj<typeof BCollapse>;

const defArgs = {
  modelValue: false,
  duration: 150,
  noShadow: false,
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BCollapse },
    setup() {
      return { args };
    },
    template: `
        <BCollapse v-model="args.modelValue" :duration="args.duration" :no-shadow="args.noShadow">
            <template #header>
                <h4 class="text-neutral-foreground-high">Collapse component</h4>
            </template>
            <div class="flex items-end justify-start gap-base">
                <div>
                    <BInput label="Input"/>
                </div>
                <BToggle>Switch</BToggle>
            </div>
        </BCollapse>
        `,
  }),
  args: defArgs,
};
