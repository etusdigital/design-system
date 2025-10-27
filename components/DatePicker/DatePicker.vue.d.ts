declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {};
    labelValue: {
        default: string;
    };
    lang: {
        default: string;
    };
    separator: {};
    type: {
        default: string;
    };
    isCompare: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowChangeType: {
        type: BooleanConstructor;
        default: boolean;
    };
    minDate: {};
    maxDate: {};
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    isError: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorMessage: {
        default: string;
    };
    absolute: {
        type: BooleanConstructor;
        default: boolean;
    };
    expanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    alignRight: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        default: {
            value: string;
            label: string;
            calculate: () => any[];
        }[];
    };
}>, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "update:expanded" | "update:type" | "apply")[], "update:modelValue" | "update:expanded" | "update:type" | "apply", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {};
    labelValue: {
        default: string;
    };
    lang: {
        default: string;
    };
    separator: {};
    type: {
        default: string;
    };
    isCompare: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowChangeType: {
        type: BooleanConstructor;
        default: boolean;
    };
    minDate: {};
    maxDate: {};
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    isError: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorMessage: {
        default: string;
    };
    absolute: {
        type: BooleanConstructor;
        default: boolean;
    };
    expanded: {
        type: BooleanConstructor;
        default: boolean;
    };
    alignRight: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        default: {
            value: string;
            label: string;
            calculate: () => any[];
        }[];
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: (...args: any[]) => any;
    "onUpdate:expanded"?: (...args: any[]) => any;
    "onUpdate:type"?: (...args: any[]) => any;
    onApply?: (...args: any[]) => any;
}>, {
    type: string;
    required: boolean;
    labelValue: string;
    lang: string;
    isCompare: boolean;
    allowChangeType: boolean;
    disabled: boolean;
    isError: boolean;
    errorMessage: string;
    absolute: boolean;
    expanded: boolean;
    alignRight: boolean;
    options: {
        value: string;
        label: string;
        calculate: () => any[];
    }[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=DatePicker.vue?vue&type=script&setup=true&lang.d.ts.map