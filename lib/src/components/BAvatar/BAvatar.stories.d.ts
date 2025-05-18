import type { StoryObj } from "@storybook/vue3";
import BAvatar from "./BAvatar.vue";
declare const meta: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        name: {
            type: {
                summary: string;
            };
            description: string;
        };
        src: {
            type: {
                summary: string;
            };
            description: string;
        };
        alt: {
            type: {
                summary: string;
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
    };
};
export default meta;
type Story = StoryObj<typeof BAvatar>;
export declare const Primary: Story;
export declare const noSrc: Story;
export declare const Sizes: Story;
//# sourceMappingURL=BAvatar.stories.d.ts.map