declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            type: {
                name: string;
                value: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: any;
                };
            };
        };
        options: {
            type: {
                name: string;
                value: {
                    name: string;
                    value: {};
                };
            };
            description: string;
        };
        labelKey: {
            type: {
                name: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        valueKey: {
            type: {
                name: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        isIcon: {
            type: {
                name: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        notCard: {
            type: {
                name: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            Tab: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        options: string[];
        labelKey: string;
        valueKey: string;
        isIcon: boolean;
        notCard: boolean;
    };
};
export declare const Icons: {
    render: (args: any) => {
        components: {
            Tab: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        isIcon: boolean;
        options: string[];
        modelValue: any;
        labelKey: string;
        valueKey: string;
        notCard: boolean;
    };
};
export declare const ObjectArray: {
    render: (args: any) => {
        components: {
            Tab: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        options: {
            label: string;
            value: string;
            icon: string;
        }[];
        modelValue: any;
        labelKey: string;
        valueKey: string;
        isIcon: boolean;
        notCard: boolean;
    };
};
export declare const NotCard: {
    render: (args: any) => {
        components: {
            Tab: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        notCard: boolean;
        modelValue: any;
        options: string[];
        labelKey: string;
        valueKey: string;
        isIcon: boolean;
    };
};
//# sourceMappingURL=Tab.stories.d.ts.map