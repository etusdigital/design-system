import type { Meta, StoryObj } from "@storybook/vue3";
import Crop from "./Crop.vue";
import banner from "./banner.jpg";

export default {
  component: Crop,
  argTypes: {
    modelValue: {
      type: { name: "other", value: "File" },
      description: 'This property will be the file to crop.',
    },
    src: {
      type: { name: "other", value: "File" },
      description: 'This property will be the image to crop.',
    },
    width: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "360px" },
      },
      description:
        "This property will be the component width.",
    },
    height: {
      type: { name: "string" },
      table: {
        defaultValue: { summary: "200px" },
      },
      description:
        "This property will be the component height.",
    },
  },
} satisfies Meta<typeof Crop>;

type Story = StoryObj<typeof Crop>;

const defaultArgs = {
  modelValue: undefined,
  src: banner,
  width: '360px',
  height: '200px',
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { Crop },
    setup() {
      return { args };
    },
    template: `
      <Crop
          v-model="args.modelValue"
          :src="args.src"
          :width="args.width"
          :height="args.height"
      />
      <span class="block mt-sm">Model value (it can have a delay):</span>
      <img class="mt-sm border-xxs border-black border-solid" :src="args.modelValue" />`,
  }),
  args: defaultArgs,
};