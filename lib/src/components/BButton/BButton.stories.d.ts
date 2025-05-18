import type { StoryObj } from "@storybook/vue3";
import BButton from "./BButton.vue";
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
        loading: {
            type: {
                summary: string;
            };
            table: {
                category: string;
                defaultValue: {
                    summary: boolean;
                };
            };
            description: string;
        };
        progress: {
            type: {
                summary: string;
            };
            control: {
                type: string;
                min: number;
                max: number;
                step: number;
            };
            table: {
                category: string;
                defaultValue: {
                    summary: number;
                };
            };
            description: string;
        };
        default: {
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof BButton>;
export declare const Primary: Story;
export declare const Colors: Story;
export declare const Secondary: Story;
export declare const Plain: Story;
export declare const Reverse: Story;
export declare const LoadingWithProgress: Story;
export declare const Size: Story;
//# sourceMappingURL=BButton.stories.d.ts.map