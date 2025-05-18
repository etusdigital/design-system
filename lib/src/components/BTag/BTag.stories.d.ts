import type { StoryObj } from "@storybook/vue3";
import BTag from "./BTag.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        text: {
            type: {
                summary: string;
            };
            description: string;
        };
        color: {
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
        icon: {
            type: {
                summary: string;
            };
            description: string;
        };
        isAppendedIcon: {
            type: {
                summary: string;
            };
            description: string;
        };
        closeable: {
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
type Story = StoryObj<typeof BTag>;
export declare const Primary: Story;
export declare const Colors: Story;
export declare const Loading: Story;
export declare const Sizes: Story;
//# sourceMappingURL=BTag.stories.d.ts.map