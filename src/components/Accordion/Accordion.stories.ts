import type { Meta, StoryObj } from "@storybook/vue3";
import Accordion from "./Accordion.vue";

export default {
  component: Accordion,
  argTypes: {
    modelValue: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
      },
      description: "The collapse state. Optional.",
    },
    duration: {
      type: { name: "number" },
      table: {
        defaultValue: { summary: "150" },
      },
      description: "The duration time in milisseconds. Optional.",
    },
    noShadow: {
      type: { name: "boolean" },
      table: {
        defaultValue: { summary: "false" },
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
} satisfies Meta<typeof Accordion>;

type Story = StoryObj<typeof Accordion>;

const defArgs = {
  modelValue: false,
  duration: 150,
  noShadow: false,
};

const defaultRender = (args: any) => ({
  components: { Accordion },
  setup() {
    return { args };
  },
  template: `
      <Accordion v-model="args.modelValue" :duration="args.duration" :no-shadow="args.noShadow">
          <template #header>
              <h4 class="text-neutral-foreground-high">Accordion component</h4>
          </template>
          <div class="flex items-end justify-start gap-base">
              <p>
                Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
                amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
                massa praesent ultricies.
              </p>
          </div>
      </Accordion>
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