import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any>;
        required: true;
        default: undefined;
    };
    items: {
        type: __PropType<any[]>;
        required: true;
    };
    position: {
        type: __PropType<"bottom" | "left" | "right" | "top" | undefined>;
        required: false;
        default: string;
    };
    type: {
        type: __PropType<"info" | "success" | "warning" | "danger" | "neutral" | "primary" | undefined>;
        required: false;
        default: string;
    };
    disabled: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any>;
        required: true;
        default: undefined;
    };
    items: {
        type: __PropType<any[]>;
        required: true;
    };
    position: {
        type: __PropType<"bottom" | "left" | "right" | "top" | undefined>;
        required: false;
        default: string;
    };
    type: {
        type: __PropType<"info" | "success" | "warning" | "danger" | "neutral" | "primary" | undefined>;
        required: false;
        default: string;
    };
    disabled: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    type: "info" | "success" | "warning" | "danger" | "neutral" | "primary" | undefined;
    modelValue: any;
    disabled: boolean | undefined;
    position: "bottom" | "left" | "right" | "top" | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
