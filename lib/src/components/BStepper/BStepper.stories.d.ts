import type { StoryObj } from "@storybook/vue3";
import BStepper from "./BStepper.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        modelValue: {
            type: {
                summary: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: undefined;
                };
            };
        };
        items: {
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
        disabled: {
            type: {
                summary: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        allowedSkip: {
            type: {
                summary: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        background: {
            type: {
                summary: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        version: {
            type: {
                summary: string;
            };
            description: string;
            control: string;
            options: number[];
            table: {
                defaultValue: {
                    summary: number;
                };
            };
        };
        changeStep: {
            type: {
                summary: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
    };
};
export default _default;
type Story = StoryObj<typeof BStepper>;
export declare const Primary: Story;
export declare const Sizes: Story;
export declare const Versions: Story;
export declare const ObjectArray: Story;
//# sourceMappingURL=BStepper.stories.d.ts.map