declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
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
        duration: {
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
        header: {
            description: string;
        };
        default: {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            Accordion: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: boolean;
        duration: number;
        noShadow: boolean;
    };
};
export declare const NoShadow: {
    render: (args: any) => {
        components: {
            Accordion: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        noShadow: boolean;
        modelValue: boolean;
        duration: number;
    };
};
//# sourceMappingURL=Accordion.stories.d.ts.map