import type { StoryObj } from "@storybook/vue3";
import BDropdown from "./BDropdown.vue";
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
        expanded: {
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
        absolute: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
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
        getObject: {
            type: {
                summary: string;
            };
            description: string;
        };
        searchable: {
            type: {
                summary: string;
            };
            description: string;
        };
        default: {
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<typeof BDropdown>;
export declare const Primary: Story;
export declare const Searchable: Story;
export declare const Slot: Story;
//# sourceMappingURL=BDropdown.stories.d.ts.map