import type { StoryObj } from "@storybook/vue3";
import BTagInput from "./BTagInput.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        modelValue: {
            type: {
                summary: string;
            };
            description: string;
        };
        labelValue: {
            type: {
                summary: string;
            };
            description: string;
        };
        errorMessage: {
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
        placeholder: {
            type: {
                summary: string;
            };
            description: string;
        };
        isError: {
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
        allowDuplicate: {
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
        max: {
            type: {
                summary: string;
            };
            description: string;
        };
        required: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
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
        };
        mask: {
            type: {
                summary: string;
            };
            description: string;
            control: string;
            options: string[];
            table: {
                defaultValue: {
                    summary: undefined;
                };
            };
        };
        "info-text": {
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<typeof BTagInput>;
export declare const Primary: Story;
export declare const Max: Story;
export declare const Error: Story;
export declare const TagList: Story;
//# sourceMappingURL=BTagInput.stories.d.ts.map