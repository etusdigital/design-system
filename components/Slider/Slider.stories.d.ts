declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            type: {
                name: string;
                value: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
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
        isRange: {
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
        max: {
            type: {
                name: string;
            };
            description: string;
        };
        unit: {
            type: {
                name: string;
            };
            description: string;
        };
        color: {
            type: {
                name: string;
            };
            description: string;
        };
        showTooltip: {
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
        vertical: {
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
        fillColors: {
            type: {
                name: string;
                value: {
                    name: string;
                };
            };
            description: string;
        };
        steps: {
            type: {
                name: string;
                value: {
                    name: string;
                };
            };
            description: string;
        };
        neutralBackground: {
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
            Slider: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: number;
        size: string;
        isRange: boolean;
        max: number;
        unit: string;
        color: string;
        showTooltip: boolean;
        disabled: boolean;
        vertical: boolean;
        fillColors: any[];
        steps: any[];
        neutralBackground: boolean;
    };
};
export declare const Sizes: {
    render: (args: any) => {
        components: {
            Slider: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: number;
        size: string;
        isRange: boolean;
        max: number;
        unit: string;
        color: string;
        showTooltip: boolean;
        disabled: boolean;
        vertical: boolean;
        fillColors: any[];
        steps: any[];
        neutralBackground: boolean;
    };
};
export declare const IsRange: {
    render: (args: any) => {
        components: {
            Slider: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        isRange: boolean;
        modelValue: number;
        size: string;
        max: number;
        unit: string;
        color: string;
        showTooltip: boolean;
        disabled: boolean;
        vertical: boolean;
        fillColors: any[];
        steps: any[];
        neutralBackground: boolean;
    };
};
export declare const ShowTooltip: {
    render: (args: any) => {
        components: {
            Slider: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        showTooltip: boolean;
        modelValue: number;
        size: string;
        isRange: boolean;
        max: number;
        unit: string;
        color: string;
        disabled: boolean;
        vertical: boolean;
        fillColors: any[];
        steps: any[];
        neutralBackground: boolean;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Slider: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: number;
        disabled: boolean;
        size: string;
        isRange: boolean;
        max: number;
        unit: string;
        color: string;
        showTooltip: boolean;
        vertical: boolean;
        fillColors: any[];
        steps: any[];
        neutralBackground: boolean;
    };
};
export declare const Vertical: {
    render: (args: any) => {
        components: {
            Slider: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        vertical: boolean;
        modelValue: number;
        size: string;
        isRange: boolean;
        max: number;
        unit: string;
        color: string;
        showTooltip: boolean;
        disabled: boolean;
        fillColors: any[];
        steps: any[];
        neutralBackground: boolean;
    };
};
export declare const FillColors: {
    render: (args: any) => {
        components: {
            Slider: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: number;
        fillColors: string[];
        size: string;
        isRange: boolean;
        max: number;
        unit: string;
        color: string;
        showTooltip: boolean;
        disabled: boolean;
        vertical: boolean;
        steps: any[];
        neutralBackground: boolean;
    };
};
export declare const Steps: {
    render: (args: any) => {
        components: {
            Slider: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        steps: number[];
        modelValue: number;
        size: string;
        isRange: boolean;
        max: number;
        unit: string;
        color: string;
        showTooltip: boolean;
        disabled: boolean;
        vertical: boolean;
        fillColors: any[];
        neutralBackground: boolean;
    };
};
export declare const NeutralBackground: {
    render: (args: any) => {
        components: {
            Slider: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        neutralBackground: boolean;
        modelValue: number;
        size: string;
        isRange: boolean;
        max: number;
        unit: string;
        color: string;
        showTooltip: boolean;
        disabled: boolean;
        vertical: boolean;
        fillColors: any[];
        steps: any[];
    };
};
//# sourceMappingURL=Slider.stories.d.ts.map