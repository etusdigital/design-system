import type { StoryObj } from "@storybook/vue3";
import BSlider from "./BSlider.vue";
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
        max: {
            type: {
                summary: string;
            };
            description: string;
        };
        unit: {
            type: {
                summary: string;
            };
            description: string;
        };
        color: {
            type: {
                summary: string;
            };
            description: string;
        };
        showTooltip: {
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
        vertical: {
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
        disabled: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        fillColors: {
            type: {
                summary: string;
            };
            description: string;
        };
        steps: {
            type: {
                summary: string;
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
    };
};
export default meta;
type Story = StoryObj<typeof BSlider>;
export declare const Primary: Story;
export declare const NeutralBackground: Story;
export declare const Sizes: Story;
export declare const Vertical: Story;
export declare const FillColors: Story;
export declare const Steps: Story;
//# sourceMappingURL=BSlider.stories.d.ts.map