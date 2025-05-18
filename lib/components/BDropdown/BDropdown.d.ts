import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
import { type Item as ItemType } from "#utils/types/DropItem";
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any>;
        required: false;
        default: undefined;
    };
    expanded: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    labelValue: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    items: {
        type: __PropType<ItemType[]>;
        required: true;
    };
    absolute: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
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
    infoMessage: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    required: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    maxHeight: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    minWidth: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    getObject: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    searchable: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:modelValue" | "update:expanded")[], "update:modelValue" | "update:expanded", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any>;
        required: false;
        default: undefined;
    };
    expanded: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    labelValue: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    items: {
        type: __PropType<ItemType[]>;
        required: true;
    };
    absolute: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
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
    infoMessage: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    required: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    maxHeight: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    minWidth: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    getObject: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    searchable: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:expanded"?: ((...args: any[]) => any) | undefined;
}>, {
    required: boolean | undefined;
    modelValue: any;
    expanded: boolean | undefined;
    labelValue: string | undefined;
    absolute: boolean | undefined;
    disabled: boolean | undefined;
    isError: boolean | undefined;
    errorMessage: string | undefined;
    infoMessage: string | undefined;
    maxHeight: string | undefined;
    minWidth: string | undefined;
    getObject: boolean | undefined;
    searchable: boolean | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
