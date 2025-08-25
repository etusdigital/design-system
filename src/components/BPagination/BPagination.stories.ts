import type { Meta, StoryObj } from "@storybook/vue3";
import BPagination from "./BPagination.vue";

export default {
	component: BPagination,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "This property will be the selected page.",
			control: { type: "number" },
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "1" },
			},
		},
		length: {
			description: "This property will be the number of pages.",
			control: { type: "number" },
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "1" },
			},
		},
	},
} satisfies Meta<typeof BPagination>;

type Story = StoryObj<typeof BPagination>;

type BPaginationStoryArgs = Partial<InstanceType<typeof BPagination>["$props"]>;

const defaultArgs: BPaginationStoryArgs = {
	modelValue: 1,
	length: 1,
};

export const Primary: Story = {
	render: (args: any) => ({
		components: { BPagination },
		setup() {
			return { args };
		},
		template: `
      <BPagination 
        v-model="args.modelValue"
        :length="args.length"
      />
    `,
	}),
	args: defaultArgs,
};
