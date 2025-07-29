import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BIcon from "./BIcon.vue";

const meta = {
	component: BIcon,
	argTypes: {
		name: {
			description: "This property will be the icon name.",
			control: { type: "text" },
			table: { type: { summary: "string" } },
		},
		size: {
			description:
				"This property will be the icon size (e.g., '24px', '2rem').",
			control: { type: "text" },
			table: { type: { summary: "string" } },
		},
		filled: {
			description:
				"Determines if the icon should be rendered with a filled style.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
	},
} satisfies Meta<typeof BIcon>;
export default meta;

type Story = StoryObj<typeof BIcon>;

type BIconStoryArgs = Partial<InstanceType<typeof BIcon>["$props"]>;

const defaultArgs: BIconStoryArgs = {
	name: "sentiment_satisfied",
	size: "24px",
	filled: false,
};

export const Primary: Story = {
	render: (args: any) => ({
		components: { BIcon },
		setup: () => {
			return { args };
		},
		template:
			'<BIcon :name="args.name" :size="args.size" :filled="args.filled" />',
	}),
	args: defaultArgs,
};
