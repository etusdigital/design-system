import type { StoryObj } from "@storybook/vue3";
import BProgressBar from "./BProgressBar.vue";
declare const meta: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        modelValue: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: number;
                };
            };
            description: string;
        };
        color: {
            type: {
                summary: string;
            };
            description: string;
        };
        icon: {
            type: {
                summary: string;
            };
            description: string;
        };
        infoMessage: {
            type: {
                summary: string;
            };
            description: string;
        };
        type: {
            type: {
                summary: string;
            };
            control: string;
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        size: {
            type: {
                summary: string;
            };
            control: string;
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        animationType: {
            type: {
                summary: string;
            };
            control: string;
            options: (string | null)[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        steps: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: number;
                };
            };
            description: string;
        };
        displayPercentage: {
            type: {
                summary: string;
            };
            control: string;
            options: (string | null)[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        neutralBackground: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
            description: string;
        };
        'icon-slot': {
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof BProgressBar>;
export declare const Primary: Story;
export declare const Steps: Story;
export declare const NeutralBackground: Story;
export declare const Icon: Story;
export declare const Slot: Story;
export declare const DisplayPercentage: Story;
export declare const Animation: Story;
export declare const Sizes: Story;
//# sourceMappingURL=BProgressBar.stories.d.ts.map