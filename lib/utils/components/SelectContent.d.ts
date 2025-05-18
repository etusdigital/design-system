import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    items: {
        type: __PropType<any>;
        required: true;
    };
    icon: {
        type: __PropType<string | undefined>;
        required: false;
    };
    expanded: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: undefined;
    };
    searchable: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    disabled: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    secondary: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:modelValue" | "update:expanded")[], "update:modelValue" | "update:expanded", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    items: {
        type: __PropType<any>;
        required: true;
    };
    icon: {
        type: __PropType<string | undefined>;
        required: false;
    };
    expanded: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: undefined;
    };
    searchable: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    disabled: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    secondary: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:expanded"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: string | undefined;
    expanded: boolean | undefined;
    disabled: boolean | undefined;
    secondary: boolean | undefined;
    searchable: boolean | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
