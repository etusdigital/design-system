import type { StoryObj } from "@storybook/vue3";
import BDateFilter from "./BDateFilter.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        modelValue: {
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
        labelValue: {
            type: {
                summary: string;
            };
            description: string;
        };
        lang: {
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
        maxInit: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: null;
                };
            };
            description: string;
        };
        maxEnd: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: null;
                };
            };
            description: string;
        };
        options: {
            type: {
                summary: string;
            };
            description: string;
        };
        absolute: {
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
        errorMessage: {
            type: {
                summary: string;
            };
            description: string;
        };
        apply: {
            description: string;
        };
        default: {
            description: string;
        };
        "clear-text": {
            description: string;
        };
        "apply-text": {
            description: string;
        };
        actions: {
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<typeof BDateFilter>;
export declare const Primary: Story;
//# sourceMappingURL=BDateFilter.stories.d.ts.map