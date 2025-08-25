import type { Meta, StoryObj } from "@storybook/vue3";
import BCrop from "./BCrop.vue";
import banner from "./banner.jpg";

export default {
  component: BCrop,
  argTypes: {
    modelValue: {
      type: { summary: "File" },
      description: 'This property will be the file to crop.',
    },
    src: {
      type: { summary: "File" },
      description: 'This property will be the image to crop.',
    },
    width: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "360px" },
      },
      description:
        "This property will be the component width.",
    },
    height: {
      type: { summary: "text" },
      table: {
        defaultValue: { summary: "200px" },
      },
      description:
        "This property will be the component height.",
    },
  },
} satisfies Meta<typeof BCrop>;

type Story = StoryObj<typeof BCrop>;

const defaultArgs = {
  modelValue: undefined,
  src: banner,
  width: '360px',
  height: '200px',
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BCrop },
    setup() {
      return { args };
    },
    template: `
      <BCrop
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