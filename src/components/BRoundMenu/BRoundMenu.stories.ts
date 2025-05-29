import type { Meta, StoryObj } from "@storybook/vue3";
import BRoundMenu from "./BRoundMenu.vue";

export default {
	component: BRoundMenu,
	tags: ["autodocs"],
	argTypes: {
		items: {
			description:
				"This property will be items in menu. Props(text: string, icon: string, background: string, action: ()=>{void})",
			control: { type: "object" },
			table: {
				type: { summary: "Item[]" },
				defaultValue: { summary: "[]" },
			},
		},
	},
} satisfies Meta<typeof BRoundMenu>;

type Story = StoryObj<typeof BRoundMenu>;

export const Primary: Story = {
	render: (args: any) => ({
		components: { BRoundMenu },
		setup() {
			return { args };
		},
		template: `
        <div class="px-[3em] py-[4em]">
            <BRoundMenu :items="args.items" />
        </div>
        `,
	}),
	args: {
		items: [
			{
				icon: "email",
				text: "Send email",
				background: "#0057F4",
				action: () => {},
			},
			{
				icon: "stop",
				text: "Finish Automation",
				background: "#F03232",
				action: () => {},
			},
			{
				icon: "schedule",
				text: "Wait",
				background: "#5C5C5C",
				action: () => {},
			},
			{
				icon: "history",
				text: "Time condition",
				background: "#FF9654",
				action: () => {},
			},
			{
				icon: "add",
				text: "Conditional",
				background: "#4A004F",
				action: () => {},
			},
			{
				icon: "new_label",
				text: "Add tag",
				background: "#009BE4",
				action: () => {},
			},
			{
				icon: "label_off",
				text: "Remove tag",
				background: "#F06158",
				action: () => {},
			},
			{
				icon: "add_circle",
				text: "Trigger",
				background: "#7B61FF",
				action: () => {},
			},
			{
				icon: "call_split",
				text: "Split",
				background: "#FFC500",
				action: () => {},
			},
		],
	},
};
