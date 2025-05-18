import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any[] | Date[] | undefined>;
        required: false;
    };
    labelValue: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    lang: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    maxInit: {
        type: __PropType<Date | undefined>;
        required: false;
    };
    maxEnd: {
        type: __PropType<Date | undefined>;
        required: false;
    };
    disabled: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    isError: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    errorMessage: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    absolute: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    required: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
    options: {
        type: __PropType<any>;
        required: false;
        default: {
            value: string;
            label: string;
            calculate: () => Date[];
        }[];
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:modelValue" | "apply")[], "update:modelValue" | "apply", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any[] | Date[] | undefined>;
        required: false;
    };
    labelValue: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    lang: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    maxInit: {
        type: __PropType<Date | undefined>;
        required: false;
    };
    maxEnd: {
        type: __PropType<Date | undefined>;
        required: false;
    };
    disabled: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    isError: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    errorMessage: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    absolute: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    required: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
    options: {
        type: __PropType<any>;
        required: false;
        default: {
            value: string;
            label: string;
            calculate: () => Date[];
        }[];
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onApply?: ((...args: any[]) => any) | undefined;
}>, {
    labelValue: string | undefined;
    absolute: boolean | undefined;
    disabled: boolean | undefined;
    isError: boolean | undefined;
    errorMessage: string | undefined;
    lang: string | undefined;
    options: any;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
