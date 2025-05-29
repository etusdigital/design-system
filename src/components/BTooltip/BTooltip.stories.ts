import type { Meta, StoryObj } from "@storybook/vue3";
import BTooltip from "./BTooltip.vue";

const meta = {
	component: BTooltip,
	tags: ["autodocs"],
	argTypes: {
		text: {
			description:
				"Texto exibido dentro do tooltip. Pode ser passado via prop ou slot padrão.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		position: {
			description: "Posição do tooltip em relação ao elemento alvo.",
			control: "select",
			options: ["top", "bottom", "left", "right"],
			table: {
				type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
				defaultValue: { summary: "right" },
			},
		},
	},
	args: {
		text: "Tooltip",
		position: "right",
	},
} satisfies Meta<typeof BTooltip>;
export default meta;

type Story = StoryObj<typeof BTooltip>;

// Tipar defaultArgs explicitamente
type BTooltipStoryArgs = Partial<InstanceType<typeof BTooltip>["$props"]>;

const defaultArgs: BTooltipStoryArgs = {
	text: "Tooltip",
	position: "right",
};

export const Primary: Story = {
	render: (args: any) => ({
		components: { BTooltip },
		setup() {
			return { args };
		},
		template: `
      <div class="px-[5em] py-[1.5em]">
          <BTooltip :text="args.text" :position="args.position">
              <BInput />
          </BTooltip>
      </div>
    `,
	}),
	args: defaultArgs,
};

export const Positions: Story = {
	render: (args: any) => ({
		components: { BTooltip },
		setup() {
			return { args };
		},
		template: `
      <div class="text-2xl flex gap-2 py-[.9em] px-[.5em]">
          <BTooltip :text="args.text" position="right">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
          <BTooltip :text="args.text" position="top">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
          <BTooltip :text="args.text" position="left">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
          <BTooltip :text="args.text" position="bottom">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
      </div>
    `,
	}),
	args: defaultArgs,
};
