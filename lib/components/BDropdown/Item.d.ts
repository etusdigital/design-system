import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
import { type Item } from "#utils/types/DropItem";
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any>;
        required: true;
        default: undefined;
    };
    selected: {
        type: __PropType<boolean | undefined>;
        required: true;
        skipCheck: boolean;
        default: boolean;
    };
    item: {
        type: __PropType<Item>;
        required: true;
    };
    getObject: {
        type: __PropType<boolean>;
        required: true;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:modelValue" | "update:selected")[], "update:modelValue" | "update:selected", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any>;
        required: true;
        default: undefined;
    };
    selected: {
        type: __PropType<boolean | undefined>;
        required: true;
        skipCheck: boolean;
        default: boolean;
    };
    item: {
        type: __PropType<Item>;
        required: true;
    };
    getObject: {
        type: __PropType<boolean>;
        required: true;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:selected"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: any;
    getObject: boolean;
    selected: boolean | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
