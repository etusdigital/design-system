import type { Meta, StoryObj } from "@storybook/vue3";
import Slider from "./Slider.vue";

export default {
  component: Slider,
  argTypes: {
    modelValue: {
      type: { summary: "number" },
      table: {
        defaultValue: { summary: 0 },
      },
      description:
        'This property will be the slider fill percentage or the equivalent number in "max" scale. Max: 1 and Min: 0, if max isn\'t specified.',
    },
    size: {
      type: { summary: "text" },
      control: "select",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "medium" },
      },
    },
    max: {
      type: { summary: "number" },
      description:
        "If the max is specified, the modelValue will be multiply by it.",
    },
    unit: {
      type: { summary: "text" },
      description:
        "This property will be the unit shown in tooltip with the modelValue.",
    },
    color: {
      type: { summary: "text" },
      description:
        "This property will be the slider color, if it's not set, the color will be the default one.",
    },
    showTooltip: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "When this property is true, a tooltip showing the modelValue will appear in the slider thumb top or right.",
    },
    vertical: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "The vertical property requires a external div with a specified height.",
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    fillColors: {
      type: { summary: "array" },
      description:
        "When this property is settled, the fill area will be divided between the passed colors.",
    },
    steps: {
      type: { summary: "array" },
      description:
      "When this property is settled, marks will be place in the passed positions (Scale: 0-1) and modelValue can only have the passed values.",
    },
    neutralBackground: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "If this property is true, the slider will have a neutral background.",
    },
  },
} satisfies Meta<typeof Slider>;

type Story = StoryObj<typeof Slider>;

const defaultArgs = {
  modelValue: 0,
  size: "medium",
  max: 0,
  unit: "",
  color: "",
  showTooltip: false,
  disabled: false,
  vertical: false,
  fillColors: [],
  steps: [],
  neutralBackground: false,
};

const defaultHtml = `
<div :class="{'h-[15em]': args.vertical }">
  <Slider
    v-model="args.modelValue"
    :size="args.size"
    :show-tooltip="args.showTooltip"
    :disabled="args.disabled"
    :vertical="args.vertical"
    :max="args.max"
    :unit="args.unit"
    :color="args.color"
    :fillColors="args.fillColors"
    :steps="args.steps"
    :neutral-background="args.neutralBackground"
  />
</div>`


const defaultRender = (args: any) => ({
  components: { Slider },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Sizes: Story = {
  render: (args: any) => ({
    components: { Slider },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-base">
        ${["small", "medium", "large"]
          .map((size) => {
            return defaultHtml.replaceAll("args.size", `'${size}'`);
          })
          .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};

export const ShowTooltip: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    showTooltip: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: 0.5,
    disabled: true,
  },
};

export const Vertical: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    vertical: true
  },
};

export const FillColors: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: 0.5,
    fillColors: ["#00CEFC", "#50358A", "#FF9654"],
  },
};


export const Steps: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    steps: [0, 0.25, 0.5, 0.75, 1],
  },
};

export const NeutralBackground: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    neutralBackground: true,
  },
};