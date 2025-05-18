import type { StoryObj } from "@storybook/vue3";
import BDateComparatorFilter from "./BDateComparatorFilter.vue";
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
                    summary: null;
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
        isCompare: {
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
        expanded: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        alignRight: {
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
        separator: {
            type: {
                summary: string;
            };
            description: string;
        };
        default: {
            description: string;
        };
        apply: {
            description: string;
        };
        "compare-text": {
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
type Story = StoryObj<typeof BDateComparatorFilter>;
export declare const Primary: Story;
//# sourceMappingURL=BDateComparatorFilter.stories.d.ts.map