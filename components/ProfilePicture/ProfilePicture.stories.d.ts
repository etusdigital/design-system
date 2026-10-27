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
            description: string;
        };
        name: {
            type: {
                name: string;
            };
            description: string;
        };
        description: {
            type: {
                name: string;
            };
            description: string;
        };
        picture: {
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
        ariaLabel: {
            type: {
                name: string;
            };
            description: string;
        };
        trigger: {
            description: string;
        };
        header: {
            description: string;
        };
        option: {
            description: string;
        };
        item: {
            description: string;
        };
        footer: {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            ProfilePicture: any;
        };
        setup(): {
            args: any;
            lastSelected: import("vue").Ref<string, string>;
            onSelect: (option: any, item: any) => void;
        };
        template: string;
    };
    args: {
        modelValue: {
            language: string;
            theme: string;
        };
        expanded: boolean;
        name: string;
        description: string;
        picture: string;
        options: ({
            label: string;
            value: string;
            icon: string;
            items?: undefined;
            color?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            items: {
                label: string;
                value: string;
                icon: string;
            }[];
            color?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            color: string;
            items?: undefined;
        })[];
        labelKey: string;
        valueKey: string;
        disabled: boolean;
    };
};
export declare const WithPicture: {
    render: (args: any) => {
        components: {
            ProfilePicture: any;
        };
        setup(): {
            args: any;
            lastSelected: import("vue").Ref<string, string>;
            onSelect: (option: any, item: any) => void;
        };
        template: string;
    };
    args: {
        picture: string;
        modelValue: {
            language: string;
            theme: string;
        };
        expanded: boolean;
        name: string;
        description: string;
        options: ({
            label: string;
            value: string;
            icon: string;
            items?: undefined;
            color?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            items: {
                label: string;
                value: string;
                icon: string;
            }[];
            color?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            color: string;
            items?: undefined;
        })[];
        labelKey: string;
        valueKey: string;
        disabled: boolean;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            ProfilePicture: any;
        };
        setup(): {
            args: any;
            lastSelected: import("vue").Ref<string, string>;
            onSelect: (option: any, item: any) => void;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: {
            language: string;
            theme: string;
        };
        expanded: boolean;
        name: string;
        description: string;
        picture: string;
        options: ({
            label: string;
            value: string;
            icon: string;
            items?: undefined;
            color?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            items: {
                label: string;
                value: string;
                icon: string;
            }[];
            color?: undefined;
        } | {
            label: string;
            value: string;
            icon: string;
            color: string;
            items?: undefined;
        })[];
        labelKey: string;
        valueKey: string;
    };
};
//# sourceMappingURL=ProfilePicture.stories.d.ts.map