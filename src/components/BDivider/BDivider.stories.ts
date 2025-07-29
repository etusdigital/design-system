import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BDivider from "./BDivider.vue";

export default {
	component: BDivider,
	tags: ["autodocs"],
	argTypes: {
		position: {
			description: "Posição da linha em relação ao conteúdo do slot.",
			control: "select",
			options: ["left", "both", "right"],
			table: {
				type: { summary: "'left' | 'both' | 'right'" },
				defaultValue: { summary: "right" },
			},
		},
	},
} satisfies Meta<typeof BDivider>;

type Story = StoryObj<typeof BDivider>;

type BDividerStoryArgs = Partial<InstanceType<typeof BDivider>["$props"]>;

const defaultArgs: BDividerStoryArgs = {
	position: "right",
};

export const Primary: Story = {
	render: (args: any) => ({
		setup() {
			return { args };
		},
		template: `
      <BDivider
          :position="args.position"
      >
        Divider
      </BDivider>
    `,
	}),
	args: defaultArgs,
};

export const Positions: Story = {
	render: (args: any) => ({
		setup() {
			return { args };
		},
		template: `
      <BDivider
          position="left"
      >
        Left
      </BDivider>
      <BDivider
          position="both"
      >
        Both
      </BDivider>
      <BDivider
          position="right"
      >
        Right
      </BDivider>
    `,
	}),
	args: defaultArgs,
};
