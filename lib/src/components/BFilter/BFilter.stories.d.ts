import type { StoryObj } from "@storybook/vue3";
import BFilter from "./BFilter.vue";
declare const meta: {
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
        searchText: {
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
        apply: {
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
        status: {
            description: string;
        };
        "status-text": {
            description: string;
        };
        "clear-text": {
            description: string;
        };
        "apply-text": {
            description: string;
        };
        default: {
            description: string;
        };
        actions: {
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof BFilter>;
export declare const Primary: Story;
//# sourceMappingURL=BFilter.stories.d.ts.map