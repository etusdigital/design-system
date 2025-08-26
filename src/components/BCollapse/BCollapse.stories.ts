import type { Meta, StoryObj } from "@storybook/vue3";
import BCollapse from "./BCollapse.vue";

export default {
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

type Story = StoryObj<typeof BCollapse>;

const defArgs = {
  modelValue: false,
  duration: 150,
  noShadow: false,
};

const defaultRender = (args: any) => ({
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
              <p>
                Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
                amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
                massa praesent ultricies.
              </p>
          </div>
      </BCollapse>
      `,
});

export const Primary: Story = {
  render: defaultRender,
  args: defArgs,
};


export const NoShadow: Story = {
  render: defaultRender,
  args: {
    ...defArgs,
    noShadow: true,
  },
};