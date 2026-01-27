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
        expanded: {
            type: {
                name: string;
            };
            description: string;
        };
        labelValue: {
            type: {
                name: string;
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
        disabled: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        isError: {
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
        absolute: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        errorMessage: {
            type: {
                name: string;
            };
            description: string;
        };
        infoMessage: {
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
        searchable: {
            type: {
                name: string;
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
            Dropdown: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        expanded: boolean;
        options: ({
            label: string;
            value: string;
            icon: string;
            options?: undefined;
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
            }[];
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            disabled: boolean;
            options?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            bottom: boolean;
            options?: undefined;
            disabled?: undefined;
        })[];
        labelValue: string;
        disabled: boolean;
        required: boolean;
        absolute: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        getObject: boolean;
        searchable: boolean;
    };
};
export declare const Absolute: {
    render: (args: any) => {
        components: {
            Dropdown: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        absolute: boolean;
        modelValue: any;
        expanded: boolean;
        options: ({
            label: string;
            value: string;
            icon: string;
            options?: undefined;
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
            }[];
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            disabled: boolean;
            options?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            bottom: boolean;
            options?: undefined;
            disabled?: undefined;
        })[];
        labelValue: string;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        getObject: boolean;
        searchable: boolean;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Dropdown: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: any;
        expanded: boolean;
        options: ({
            label: string;
            value: string;
            icon: string;
            options?: undefined;
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
            }[];
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            disabled: boolean;
            options?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            bottom: boolean;
            options?: undefined;
            disabled?: undefined;
        })[];
        labelValue: string;
        required: boolean;
        absolute: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        getObject: boolean;
        searchable: boolean;
    };
};
export declare const Required: {
    render: (args: any) => {
        components: {
            Dropdown: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        required: boolean;
        modelValue: any;
        expanded: boolean;
        options: ({
            label: string;
            value: string;
            icon: string;
            options?: undefined;
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
            }[];
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            disabled: boolean;
            options?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            bottom: boolean;
            options?: undefined;
            disabled?: undefined;
        })[];
        labelValue: string;
        disabled: boolean;
        absolute: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        getObject: boolean;
        searchable: boolean;
    };
};
export declare const Searchable: {
    render: (args: any) => {
        components: {
            Dropdown: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        searchable: boolean;
        modelValue: any;
        expanded: boolean;
        options: ({
            label: string;
            value: string;
            icon: string;
            options?: undefined;
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
            }[];
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            disabled: boolean;
            options?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            bottom: boolean;
            options?: undefined;
            disabled?: undefined;
        })[];
        labelValue: string;
        disabled: boolean;
        required: boolean;
        absolute: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        getObject: boolean;
    };
};
export declare const IsError: {
    render: (args: any) => {
        components: {
            Dropdown: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        isError: boolean;
        errorMessage: string;
        modelValue: any;
        expanded: boolean;
        options: ({
            label: string;
            value: string;
            icon: string;
            options?: undefined;
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
            }[];
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            disabled: boolean;
            options?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            bottom: boolean;
            options?: undefined;
            disabled?: undefined;
        })[];
        labelValue: string;
        disabled: boolean;
        required: boolean;
        absolute: boolean;
        infoMessage: string;
        getObject: boolean;
        searchable: boolean;
    };
};
export declare const InfoMessage: {
    render: (args: any) => {
        components: {
            Dropdown: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        infoMessage: string;
        modelValue: any;
        expanded: boolean;
        options: ({
            label: string;
            value: string;
            icon: string;
            options?: undefined;
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
            }[];
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            disabled: boolean;
            options?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            bottom: boolean;
            options?: undefined;
            disabled?: undefined;
        })[];
        labelValue: string;
        disabled: boolean;
        required: boolean;
        absolute: boolean;
        isError: boolean;
        errorMessage: string;
        getObject: boolean;
        searchable: boolean;
    };
};
export declare const Default: {
    render: (args: any) => {
        components: {
            Dropdown: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        expanded: boolean;
        options: ({
            label: string;
            value: string;
            icon: string;
            options?: undefined;
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            options: {
                label: string;
                value: string;
                icon: string;
            }[];
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            disabled: boolean;
            options?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            bottom: boolean;
            options?: undefined;
            disabled?: undefined;
        })[];
        labelValue: string;
        disabled: boolean;
        required: boolean;
        absolute: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        getObject: boolean;
        searchable: boolean;
    };
};
//# sourceMappingURL=Dropdown.stories.d.ts.map