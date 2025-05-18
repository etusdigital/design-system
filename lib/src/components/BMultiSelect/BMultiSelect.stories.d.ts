import type { StoryObj } from "@storybook/vue3";
import BMultiSelect from "./BMultiSelect.vue";
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
        icon: {
            type: {
                summary: string;
            };
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
        labelKey: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        selectedKey: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        searchable: {
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
        infoMessage: {
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
        searchText: {
            description: string;
        };
        status: {
            description: string;
        };
        "status-text": {
            description: string;
        };
        default: {
            description: string;
        };
        item: {
            description: string;
        };
        actions: {
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<typeof BMultiSelect>;
export declare const Primary: Story;
export declare const CustomItem: Story;
//# sourceMappingURL=BMultiSelect.stories.d.ts.map