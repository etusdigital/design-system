import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any>;
        required: false;
        default: undefined;
    };
    items: {
        type: __PropType<any[]>;
        required: true;
    };
    size: {
        type: __PropType<"medium" | "large" | undefined>;
        required: false;
        default: string;
    };
    disabled: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    allowedSkip: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    background: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    version: {
        type: __PropType<1 | 2 | undefined>;
        required: false;
        default: number;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:modelValue" | "changeStep")[], "update:modelValue" | "changeStep", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any>;
        required: false;
        default: undefined;
    };
    items: {
        type: __PropType<any[]>;
        required: true;
    };
    size: {
        type: __PropType<"medium" | "large" | undefined>;
        required: false;
        default: string;
    };
    disabled: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    allowedSkip: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    background: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    version: {
        type: __PropType<1 | 2 | undefined>;
        required: false;
        default: number;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChangeStep?: ((...args: any[]) => any) | undefined;
}>, {
    size: "medium" | "large" | undefined;
    modelValue: any;
    disabled: boolean | undefined;
    background: string | undefined;
    allowedSkip: boolean | undefined;
    version: 1 | 2 | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
