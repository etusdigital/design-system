declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {};
    labelValue: {
        default: string;
    };
    lang: {
        default: string;
    };
    separator: {};
    isCompare: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxInit: {};
    maxEnd: {};
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
            calculate: () => Date[];
        }[];
    };
}>, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "update:expanded" | "update:isCompare" | "apply")[], "update:modelValue" | "update:expanded" | "update:isCompare" | "apply", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {};
    labelValue: {
        default: string;
    };
    lang: {
        default: string;
    };
    separator: {};
    isCompare: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxInit: {};
    maxEnd: {};
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
            calculate: () => Date[];
        }[];
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:expanded"?: ((...args: any[]) => any) | undefined;
    "onUpdate:isCompare"?: ((...args: any[]) => any) | undefined;
    onApply?: ((...args: any[]) => any) | undefined;
}>, {
    labelValue: string;
    lang: string;
    isCompare: boolean;
    disabled: boolean;
    required: boolean;
    isError: boolean;
    errorMessage: string;
    absolute: boolean;
    expanded: boolean;
    alignRight: boolean;
    options: {
        value: string;
        label: string;
        calculate: () => Date[];
    }[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=BDateComparatorFilter.vue?vue&type=script&setup=true&lang.d.ts.map