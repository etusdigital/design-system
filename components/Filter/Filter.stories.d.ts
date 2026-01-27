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
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        options: {
            type: {
                name: string;
                value: string;
            };
            description: string;
        };
        labelValue: {
            type: {
                name: string;
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
        icon: {
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
        searchLabel: {
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
        searchable: {
            type: {
                name: string;
            };
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
            table: {
                defaultValue: {
                    summary: string;
                };
            };
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
            description: string;
        };
        getObject: {
            type: {
                name: string;
            };
            description: string;
        };
        onApply: {
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
        status: {
            description: string;
        };
        "status-label": {
            description: string;
        };
        "clear-label": {
            description: string;
        };
        "apply-label": {
            description: string;
        };
        default: {
            description: string;
        };
        actions: {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            Filter: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: {};
        options: {
            label: string;
            value: string;
            options: {
                label: string;
                value: number;
            }[];
        }[];
        labelValue: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        searchLabel: string;
        icon: string;
        searchable: boolean;
        disabled: boolean;
        absolute: boolean;
        getObject: boolean;
        onApply: () => void;
    };
};
export declare const Absolute: {
    render: (args: any) => {
        components: {
            Filter: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        absolute: boolean;
        modelValue: {};
        options: {
            label: string;
            value: string;
            options: {
                label: string;
                value: number;
            }[];
        }[];
        labelValue: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        searchLabel: string;
        icon: string;
        searchable: boolean;
        disabled: boolean;
        getObject: boolean;
        onApply: () => void;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Filter: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: {};
        options: {
            label: string;
            value: string;
            options: {
                label: string;
                value: number;
            }[];
        }[];
        labelValue: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        searchLabel: string;
        icon: string;
        searchable: boolean;
        absolute: boolean;
        getObject: boolean;
        onApply: () => void;
    };
};
export declare const Searchable: {
    render: (args: any) => {
        components: {
            Filter: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        searchable: boolean;
        modelValue: {};
        options: {
            label: string;
            value: string;
            options: {
                label: string;
                value: number;
            }[];
        }[];
        labelValue: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        searchLabel: string;
        icon: string;
        disabled: boolean;
        absolute: boolean;
        getObject: boolean;
        onApply: () => void;
    };
};
//# sourceMappingURL=Filter.stories.d.ts.map