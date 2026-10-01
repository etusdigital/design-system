declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            control: {
                type: string;
            };
            description: string;
        };
        size: {
            control: {
                type: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        noOutsideClose: {
            control: {
                type: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        position: {
            control: {
                type: string;
            };
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        zIndex: {
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
            Drawer: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: boolean;
        size: string;
        noOutsideClose: boolean;
        position: string;
        zIndex: number;
    };
};
export declare const NoOutsideClose: {
    render: (args: any) => {
        components: {
            Drawer: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        noOutsideClose: boolean;
        modelValue: boolean;
        size: string;
        position: string;
        zIndex: number;
    };
};
export declare const Positions: {
    render: (args: any) => {
        components: {
            Drawer: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        position: string;
        modelValue: boolean;
        size: string;
        noOutsideClose: boolean;
        zIndex: number;
    };
};
//# sourceMappingURL=Drawer.stories.d.ts.map