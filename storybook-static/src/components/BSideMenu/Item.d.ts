import { Item } from '../../utils/types/MenuItem';
type __VLS_Props = {
    modelValue?: string;
    item: Item;
    getObject?: boolean;
    parentPath?: string;
    selected?: boolean;
    bold?: boolean;
};
declare const _default: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: any) => any;
    "update:selected": (value: boolean, item?: Item | undefined) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
    "onUpdate:selected"?: ((value: boolean, item?: Item | undefined) => any) | undefined;
}>, {
    bold: boolean;
    modelValue: string;
    selected: boolean;
    getObject: boolean;
    parentPath: string;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
export default _default;
