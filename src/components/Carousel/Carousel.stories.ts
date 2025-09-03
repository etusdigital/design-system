import type { Meta, StoryObj } from "@storybook/vue3";
import Carousel from "./Carousel.vue";

export default {
  component: Carousel,
  argTypes: {
    modelValue: {
      control: { type: 'number' },
    },
    items: {
      control: {
        type: 'array',
      },
    },
    visible: {
      control: { type: 'number' },
    },
    interval: {
      control: { type: 'number' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    circular: {
      control: { type: 'boolean' },
    },
    vertical: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Carousel>;

type Story = StoryObj<typeof Carousel>;

const defaultArgs = {
  modelValue: 0,
  items: [
    { label: 'Option 1', value: 0 },
    { label: 'Option 2', value: 1 },
    { label: 'Option 3', value: 2 },
    { label: 'Option 4', value: 3 },
    { label: 'Option 5', value: 4 },
  ],
  visible: 1,
  interval: 3000,
  disabled: false,
  circular: false,
  vertical: false,
};

const defaultHtml = `
  <Carousel
    v-model="args.modelValue"
    :items="args.items"
    :vertical="args.vertical"
    :disabled="args.disabled"
    :visible="args.visible"
    :interval="args.interval"
    :circular="args.circular"
  >
    <template #item="{ item, index }">
      <Card class="p-base">
        {{ item.label }}
      </Card>
    </template>
  </Carousel>
`;

const defaultRender = (args: any) => ({
  components: { Carousel },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};
