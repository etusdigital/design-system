import type { StoryObj } from "@storybook/vue3";
import BMetricCard from "./BMetricCard.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        title: {
            type: {
                summary: string;
            };
            description: string;
        };
        value: {
            type: {
                summary: string;
            };
            description: string;
        };
        description: {
            type: {
                summary: string;
            };
            description: string;
        };
        icon: {
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
        color: {
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
        infoType: {
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
        tooltipMinWidth: {
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
        loading: {
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
        noTooltip: {
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
        boldTitle: {
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
        'title-slot': {
            description: string;
        };
        'value-slot': {
            description: string;
        };
        'description-slot': {
            description: string;
        };
        content: {
            description: string;
        };
        info: {
            description: string;
        };
        default: {
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<typeof BMetricCard>;
export declare const Primary: Story;
export declare const Sizes: Story;
export declare const Types: Story;
export declare const Info: Story;
export declare const Slots: Story;
//# sourceMappingURL=BMetricCard.stories.d.ts.map