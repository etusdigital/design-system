declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            type: {
                name: string;
            };
        };
        type: {
            type: {
                name: string;
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
        noShadow: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            ColorPicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: string;
        type: string;
        noShadow: boolean;
    };
};
export declare const NoShadow: {
    render: (args: any) => {
        components: {
            ColorPicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        noShadow: boolean;
        modelValue: string;
        type: string;
    };
};
//# sourceMappingURL=ColorPicker.stories.d.ts.map