import type { StoryObj } from "@storybook/vue3";
import BCardIcon from "./BCardIcon.vue";
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
        icon: {
            type: {
                summary: string;
            };
            description: string;
        };
        color: {
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
        isIconRound: {
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
        default: {
            description: string;
        };
        'title-actions': {
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<typeof BCardIcon>;
export declare const Primary: Story;
//# sourceMappingURL=BCardIcon.stories.d.ts.map