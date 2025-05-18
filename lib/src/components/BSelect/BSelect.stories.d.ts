import type { StoryObj } from "@storybook/vue3";
import BSelect from "./BSelect.vue";
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
        items: {
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
        valueKey: {
            type: {
                summary: string;
            };
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
        secondary: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        searchText: {
            description: string;
        };
        default: {
            description: string;
        };
        status: {
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
type Story = StoryObj<typeof BSelect>;
export declare const Primary: Story;
export declare const ObjectArray: Story;
export declare const Secondary: Story;
export declare const CustomItem: Story;
//# sourceMappingURL=BSelect.stories.d.ts.map