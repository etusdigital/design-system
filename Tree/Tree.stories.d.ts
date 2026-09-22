declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            type: {
                name: string;
                value: string;
            };
            description: string;
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
        };
        valueKey: {
            type: {
                name: string;
            };
            description: string;
        };
        getObject: {
            type: {
                name: string;
            };
            description: string;
        };
        disabled: {
            type: {
                name: string;
            };
            description: string;
        };
        multiple: {
            type: {
                name: string;
            };
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            Tree: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        options: ({
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
                options: {
                    label: string;
                    value: string;
                    icon: string;
                }[];
            }[];
        } | {
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
            }[];
        })[];
        labelKey: string;
        valueKey: string;
        getObject: boolean;
        multiple: boolean;
        disabled: boolean;
    };
};
export declare const Multiple: {
    render: (args: any) => {
        components: {
            Tree: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        multiple: boolean;
        modelValue: any;
        options: ({
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
                options: {
                    label: string;
                    value: string;
                    icon: string;
                }[];
            }[];
        } | {
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
            }[];
        })[];
        labelKey: string;
        valueKey: string;
        getObject: boolean;
        disabled: boolean;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Tree: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: any;
        options: ({
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
                options: {
                    label: string;
                    value: string;
                    icon: string;
                }[];
            }[];
        } | {
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
            }[];
        })[];
        labelKey: string;
        valueKey: string;
        getObject: boolean;
        multiple: boolean;
    };
};
//# sourceMappingURL=Tree.stories.d.ts.map