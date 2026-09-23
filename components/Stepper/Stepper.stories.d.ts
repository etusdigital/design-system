declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
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
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        size: {
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
        };
        disabled: {
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
        allowedSkip: {
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
        background: {
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
        version: {
            type: {
                name: string;
            };
            description: string;
            control: string;
            options: number[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        getObject: {
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
        onChangeStep: {
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
            Stepper: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: string;
        options: {
            label: string;
            value: string;
            icon: string;
        }[];
        labelKey: string;
        valueKey: string;
        size: string;
        disabled: boolean;
        allowedSkip: boolean;
        getObject: boolean;
        version: number;
        background: string;
        onChangeStep: (_option: any, _index: any) => void;
    };
};
export declare const Sizes: {
    render: (args: any) => {
        components: {
            Stepper: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: string;
        options: {
            label: string;
            value: string;
            icon: string;
        }[];
        labelKey: string;
        valueKey: string;
        size: string;
        disabled: boolean;
        allowedSkip: boolean;
        getObject: boolean;
        version: number;
        background: string;
        onChangeStep: (_option: any, _index: any) => void;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Stepper: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: string;
        options: {
            label: string;
            value: string;
            icon: string;
        }[];
        labelKey: string;
        valueKey: string;
        size: string;
        allowedSkip: boolean;
        getObject: boolean;
        version: number;
        background: string;
        onChangeStep: (_option: any, _index: any) => void;
    };
};
export declare const AllowedSkip: {
    render: (args: any) => {
        components: {
            Stepper: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        allowedSkip: boolean;
        modelValue: string;
        options: {
            label: string;
            value: string;
            icon: string;
        }[];
        labelKey: string;
        valueKey: string;
        size: string;
        disabled: boolean;
        getObject: boolean;
        version: number;
        background: string;
        onChangeStep: (_option: any, _index: any) => void;
    };
};
export declare const Versions: {
    render: (args: any) => {
        components: {
            Stepper: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: string;
        options: {
            label: string;
            value: string;
            icon: string;
        }[];
        labelKey: string;
        valueKey: string;
        size: string;
        disabled: boolean;
        allowedSkip: boolean;
        getObject: boolean;
        version: number;
        background: string;
        onChangeStep: (_option: any, _index: any) => void;
    };
};
//# sourceMappingURL=Stepper.stories.d.ts.map