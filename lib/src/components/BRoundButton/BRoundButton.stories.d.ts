import type { StoryObj } from "@storybook/vue3";
import BRoundButton from "./BRoundButton.vue";
declare const meta: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
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
        color: {
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
        text: {
            type: {
                summary: string;
            };
            description: string;
        };
        icon: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        background: {
            type: {
                summary: string;
            };
            description: string;
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
        variant: {
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
        disabled: {
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
        alwaysOpen: {
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
    };
};
export default meta;
type Story = StoryObj<typeof BRoundButton>;
export declare const Primary: Story;
export declare const Secondary: Story;
export declare const Plain: Story;
export declare const Reverse: Story;
export declare const Sizes: Story;
//# sourceMappingURL=BRoundButton.stories.d.ts.map