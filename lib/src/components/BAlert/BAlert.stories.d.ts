import type { StoryObj } from "@storybook/vue3";
import BAlert from "./BAlert.vue";
declare const meta: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        title: {
            type: {
                summary: string;
            };
            description: string;
        };
        message: {
            type: {
                summary: string;
            };
            description: string;
        };
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
        icon: {
            type: {
                summary: string;
            };
            description: string;
        };
        iconPosition: {
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
            description: string;
        };
        expandable: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        closable: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        hideIcon: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
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
type Story = StoryObj<typeof BAlert>;
export declare const Primary: Story;
export declare const Types: Story;
export declare const Sizes: Story;
//# sourceMappingURL=BAlert.stories.d.ts.map