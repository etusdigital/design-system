import type { Meta, StoryObj } from "@storybook/vue3";
import BRangeSlider from "./BRangeSlider.vue";

const meta = {
	component: BRangeSlider,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description:
				'This property will be an array with the slider fill percentage or the equivalent number in "max" scale based in each thumb. Max: 1 and Min: 0, if max isn\'t specified.',
			control: { type: "object" },
			table: {
				type: { summary: "number[]" },
				defaultValue: { summary: "[0, 0]" },
			},
		},
		size: {
			description: "Tamanho do slider.",
			control: "select",
			options: ["small", "medium", "large"],
			table: {
				type: { summary: "'small' | 'medium' | 'large'" },
				defaultValue: { summary: "medium" },
			},
		},
		max: {
			description:
				"If the max is specified, the modelValue will be multiply by it.",
			control: { type: "number" },
			table: {
				type: { summary: "number" },
			},
		},
		unit: {
			description:
				"This property will be the unit shown in tooltip with the modelValue.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		color: {
			description:
				"This property will be the slider color, if it's not set, the color will be the default one.",
			control: { type: "color" },
			table: {
				type: { summary: "string" },
			},
		},
		showTooltip: {
			description:
				"When this property is true, a tooltip showing the modelValue will appear in the slider thumb top or right.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		vertical: {
			description:
				"The vertical property requires a external div with a specified height.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		disabled: {
			description: "Desabilita a interação.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		fillColors: {
			description:
				"When this property is settled, the fill area will be divided between the passed colors.",
			control: { type: "object" },
			table: {
				type: { summary: "string[]" },
			},
		},
		steps: {
			description:
				"When this property is settled, marks will be place in the passed positions (Scale: 0-1) and modelValue can only have the passed values.",
			control: { type: "object" },
			table: {
				type: { summary: "number[]" },
			},
		},
		neutralBackground: {
			description:
				"When this property is true, the slider will have a neutral background.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
			},
		},
	},
} satisfies Meta<typeof BRangeSlider>;
export default meta;

type Story = StoryObj<typeof BRangeSlider>;

type BRangeSliderStoryArgs = Partial<
	InstanceType<typeof BRangeSlider>["$props"]
>;

const defaultArgs: BRangeSliderStoryArgs = {
	modelValue: [0, 0],
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

const singleTemplate = `
<div :class="{'h-[15em]': args.vertical }">
  <BRangeSlider
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
</div>`;

const defaultTemplate = `
<BRangeSlider
  v-model="args.modelValue"
  size="small"
  :show-tooltip="args.showTooltip"
  :disabled="args.disabled"
  :vertical="args.vertical"
  :max="args.max"
  :unit="args.unit"
  :color="args.color"
  :fill-colors="args.fillColors"
  :steps="args.steps"
  :neutral-background="args.neutralBackground"
/>
<BRangeSlider
  v-model="args.modelValue"
  size="medium"
  :show-tooltip="args.showTooltip"
  :disabled="args.disabled"
  :vertical="args.vertical"
  :max="args.max"
  :unit="args.unit"
  :color="args.color"
  :fill-colors="args.fillColors"
  :steps="args.steps"
  :neutral-background="args.neutralBackground"
/>
<BRangeSlider
  v-model="args.modelValue"
  size="large"
  :show-tooltip="args.showTooltip"
  :disabled="args.disabled"
  :vertical="args.vertical"
  :max="args.max"
  :unit="args.unit"
  :color="args.color"
  :fill-colors="args.fillColors"
  :steps="args.steps"
  :neutral-background="args.neutralBackground"
/>
`;

export const Primary: Story = {
	render: (args: any) => ({
		components: { BRangeSlider },
		setup() {
			return { args };
		},
		template: singleTemplate,
	}),
	args: defaultArgs,
};

export const NeutralBackground: Story = {
	render: (args: any) => ({
		components: { BRangeSlider },
		setup() {
			return { args };
		},
		template: singleTemplate,
	}),
	args: {
		...defaultArgs,
		neutralBackground: true,
	},
};

export const Sizes: Story = {
	render: (args: any) => ({
		components: { BRangeSlider },
		setup() {
			return { args };
		},
		template: `
      <div class="flex flex-col gap-base">
          ${defaultTemplate}
      </div>
    `,
	}),
	args: defaultArgs,
};

export const Vertical: Story = {
	render: (args: any) => ({
		components: { BRangeSlider },
		setup() {
			return { args };
		},
		template: `
      <div class="h-[15em] flex gap-base">
        ${defaultTemplate}
      </div>
    `,
	}),
	args: {
		...defaultArgs,
		vertical: true,
	},
};

export const FillColors: Story = {
	render: (args: any) => ({
		components: { BRangeSlider },
		setup() {
			return { args };
		},
		template: singleTemplate,
	}),
	args: {
		...defaultArgs,
		fillColors: ["#00CEFC", "#50358A", "#FF9654"],
	},
};

export const Steps: Story = {
	render: (args: any) => ({
		components: { BRangeSlider },
		setup() {
			return { args };
		},
		template: singleTemplate,
	}),
	args: {
		...defaultArgs,
		steps: [0, 0.25, 0.5, 0.75, 1],
	},
};
