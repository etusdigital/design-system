import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
import { type Item } from "#utils/types/DropItem";
type Profile = {
    name: string;
    src?: string;
};
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any[] | undefined>;
        required: false;
        default: undefined;
    };
    title: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    items: {
        type: __PropType<Item[] | undefined>;
        required: false;
    };
    profile: {
        type: __PropType<Profile | undefined>;
        required: false;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any[] | undefined>;
        required: false;
        default: undefined;
    };
    title: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    items: {
        type: __PropType<Item[] | undefined>;
        required: false;
    };
    profile: {
        type: __PropType<Profile | undefined>;
        required: false;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    title: string | undefined;
    modelValue: any[] | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
