import type { Meta, StoryObj } from "@storybook/vue3";
import {
	BCard,
	BCardHeader,
	BCardTitle,
	BCardSubtitle,
	BCardContent,
	BCardFooter,
} from "./";
import BButton from "../BButton/BButton.vue";
import BAvatar from "../BAvatar/BAvatar.vue";

const meta = {
	title: "Components/BCard",
	component: BCard,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["elevated", "outlined", "filled", "flat"],
		},
		padding: {
			control: "select",
			options: ["none", "sm", "md", "lg", "xl"],
		},
		shadow: {
			control: "select",
			options: ["none", "sm", "md", "lg", "xl"],
		},
		radius: {
			control: "select",
			options: ["none", "sm", "md", "lg", "full"],
		},
		clickable: {
			control: "boolean",
		},
		disabled: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof BCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card with props
export const Default: Story = {
	args: {
		title: "Card Title",
		subtitle: "Card subtitle text",
		variant: "elevated",
		padding: "md",
		shadow: "sm",
		radius: "md",
	},
	render: (args) => ({
		components: { BCard },
		setup() {
			return { args };
		},
		template: `
			<BCard v-bind="args">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
			</BCard>
		`,
	}),
};

// Using title and subtitle props
export const WithTitleAndSubtitle: Story = {
	render: () => ({
		components: { BCard, BButton },
		template: `
			<BCard 
				title="Advanced Card"
				subtitle="Using title and subtitle props"
			>
				<p>This card uses the built-in title and subtitle props for simple cases. The header is automatically created when these props are provided.</p>
				<template #footer>
					<div class="flex gap-2">
						<BButton variant="secondary">Cancel</BButton>
						<BButton>Save</BButton>
					</div>
				</template>
			</BCard>
		`,
	}),
};

// Card with custom header using slots
export const WithCustomHeader: Story = {
	render: () => ({
		components: { BCard, BAvatar },
		template: `
			<BCard>
				<template #header>
					<div class="flex items-center gap-3">
						<BAvatar src="https://i.pravatar.cc/150?img=3" size="md" />
						<div>
							<h3 class="font-semibold">John Doe</h3>
							<p class="text-sm text-neutral-foreground-low">Software Engineer</p>
						</div>
					</div>
				</template>
				<p>This card demonstrates a custom header with an avatar and user information.</p>
				<template #footer>
					<div class="flex gap-2 text-sm">
						<button class="text-primary-interaction-default hover:underline">Follow</button>
						<span class="text-neutral-foreground-low">•</span>
						<button class="text-primary-interaction-default hover:underline">Message</button>
					</div>
				</template>
			</BCard>
		`,
	}),
};

// Different variants
export const Variants: Story = {
	render: () => ({
		components: { BCard },
		template: `
			<div class="grid grid-cols-2 gap-4">
				<BCard variant="elevated" title="Elevated">
					<p>Default elevated style with shadow</p>
				</BCard>
				<BCard variant="outlined" title="Outlined">
					<p>Outlined style with border</p>
				</BCard>
				<BCard variant="filled" title="Filled">
					<p>Filled style with background</p>
				</BCard>
				<BCard variant="flat" title="Flat">
					<p>Flat style with no elevation</p>
				</BCard>
			</div>
		`,
	}),
};

// Clickable cards
export const ClickableCards: Story = {
	render: () => ({
		components: { BCard },
		methods: {
			handleClick(variant: string) {
				alert(`Clicked ${variant} card!`);
			},
		},
		template: `
			<div class="grid grid-cols-2 gap-4">
				<BCard 
					variant="elevated" 
					title="Clickable Card"
					clickable
					@click="handleClick('clickable')"
				>
					<p>This card is clickable and shows hover effects</p>
				</BCard>
				<BCard 
					variant="elevated" 
					title="Disabled Card"
					clickable
					disabled
					@click="handleClick('disabled')"
				>
					<p>This card is disabled and won't respond to clicks</p>
				</BCard>
			</div>
		`,
	}),
};

// Different padding sizes
export const PaddingSizes: Story = {
	render: () => ({
		components: { BCard },
		template: `
			<div class="space-y-4">
				<BCard padding="none" title="No Padding">
					<p>Card content with no padding</p>
				</BCard>
				<BCard padding="sm" title="Small Padding">
					<p>Card content with small padding</p>
				</BCard>
				<BCard padding="md" title="Medium Padding">
					<p>Card content with medium padding</p>
				</BCard>
				<BCard padding="lg" title="Large Padding">
					<p>Card content with large padding</p>
				</BCard>
				<BCard padding="xl" title="Extra Large Padding">
					<p>Card content with extra large padding</p>
				</BCard>
			</div>
		`,
	}),
};

// Grid Example
export const GridExample: Story = {
	render: () => ({
		components: { BCard, BButton },
		template: `
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<BCard title="Analytics" subtitle="View your data">
					<div class="space-y-2">
						<div class="flex justify-between">
							<span class="text-sm text-neutral-foreground-low">Total Views</span>
							<span class="font-semibold">2,543</span>
						</div>
						<div class="flex justify-between">
							<span class="text-sm text-neutral-foreground-low">Growth</span>
							<span class="text-success-interaction-default font-semibold">+12%</span>
						</div>
					</div>
				</BCard>
				
				<BCard title="Performance" subtitle="System metrics">
					<div class="space-y-2">
						<div class="flex justify-between">
							<span class="text-sm text-neutral-foreground-low">CPU Usage</span>
							<span class="font-semibold">45%</span>
						</div>
						<div class="flex justify-between">
							<span class="text-sm text-neutral-foreground-low">Memory</span>
							<span class="font-semibold">8.2 GB</span>
						</div>
					</div>
				</BCard>
				
				<BCard title="Tasks" subtitle="Your to-do list">
					<div class="space-y-2">
						<div class="flex items-center gap-2">
							<span class="w-2 h-2 bg-warning-interaction-default rounded-full"></span>
							<span class="text-sm">5 tasks pending</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="w-2 h-2 bg-success-interaction-default rounded-full"></span>
							<span class="text-sm">12 completed today</span>
						</div>
					</div>
				</BCard>
			</div>
		`,
	}),
};
