declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            type: {
                name: string;
            };
            description: string;
        };
        width: {
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
        height: {
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
        noOutsideClose: {
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
        default: {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            Dialog: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: boolean;
        width: string;
        height: string;
        noOutsideClose: boolean;
    };
};
export declare const NoOutsideClose: {
    render: (args: any) => {
        components: {
            Dialog: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        noOutsideClose: boolean;
        modelValue: boolean;
        width: string;
        height: string;
    };
};
//# sourceMappingURL=Dialog.stories.d.ts.map