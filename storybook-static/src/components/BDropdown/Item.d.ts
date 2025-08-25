import { Item } from '../../utils/types/DropItem';
type __VLS_Props = {
    modelValue: any;
    selected: boolean | undefined;
    item: Item;
    getObject: boolean;
};
declare const _default: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: any) => any;
    "update:selected": (value: boolean) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
    "onUpdate:selected"?: ((value: boolean) => any) | undefined;
}>, {
    modelValue: any;
    selected: boolean | undefined;
    getObject: boolean;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
