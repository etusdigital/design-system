import { BContainerModelExtra } from './BContainerModelExtra.types';
type BSelectExpandedExtra = {
    source: BContainerModelExtra["source"] | "value-selected";
};
type __VLS_Props = {
    modelValue?: string;
    items: any;
    icon?: string;
    expanded?: boolean;
    searchable?: boolean;
    disabled?: boolean;
    secondary?: boolean;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        searchText?(_: {}): any;
        status?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: any, extra: {
        index: number;
    }) => any;
    "update:expanded": (value: boolean, extra: BSelectExpandedExtra) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: any, extra: {
        index: number;
    }) => any) | undefined;
    "onUpdate:expanded"?: ((value: boolean, extra: BSelectExpandedExtra) => any) | undefined;
}>, {
    secondary: boolean;
    disabled: boolean;
    modelValue: string;
    expanded: boolean;
    searchable: boolean;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
