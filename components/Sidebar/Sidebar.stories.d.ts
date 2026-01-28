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
        expanded: {
            type: {
                name: string;
            };
            description: string;
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
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            Sidebar: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: string;
        getObject: boolean;
        expanded: boolean;
        options: ({
            label: string;
            value: string;
            icon: string;
            path: string;
            options?: undefined;
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            path: string;
            icon: string;
            options: ({
                label: string;
                value: string;
                path: string;
                options: {
                    label: string;
                    value: string;
                    path: string;
                }[];
            } | {
                label: string;
                value: string;
                path: string;
                options?: undefined;
            })[];
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            path: string;
            icon: string;
            disabled: boolean;
            options?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            path: string;
            icon: string;
            bottom: boolean;
            options?: undefined;
            disabled?: undefined;
        })[];
    };
};
export declare const Expanded: {
    render: (args: any) => {
        components: {
            Sidebar: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        expanded: boolean;
        modelValue: string;
        getObject: boolean;
        options: ({
            label: string;
            value: string;
            icon: string;
            path: string;
            options?: undefined;
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            path: string;
            icon: string;
            options: ({
                label: string;
                value: string;
                path: string;
                options: {
                    label: string;
                    value: string;
                    path: string;
                }[];
            } | {
                label: string;
                value: string;
                path: string;
                options?: undefined;
            })[];
            disabled?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            path: string;
            icon: string;
            disabled: boolean;
            options?: undefined;
            bottom?: undefined;
        } | {
            label: string;
            value: string;
            path: string;
            icon: string;
            bottom: boolean;
            options?: undefined;
            disabled?: undefined;
        })[];
    };
};
//# sourceMappingURL=Sidebar.stories.d.ts.map