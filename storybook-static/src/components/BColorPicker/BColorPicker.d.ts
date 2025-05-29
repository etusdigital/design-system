type __VLS_Props = {
    modelValue?: string;
    type?: "hexa" | "hsla" | "hwb" | "hsva" | "rgba";
    noShadow?: boolean;
};
declare const _default: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
    "update:type": (value: string) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    "onUpdate:type"?: ((value: string) => any) | undefined;
}>, {
    type: "hexa" | "hsla" | "hwb" | "hsva" | "rgba";
    modelValue: string;
    noShadow: boolean;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {
    cursorColorArea: HTMLSpanElement;
    colorArea: HTMLCanvasElement;
    cursorColorSlider: HTMLSpanElement;
    cursorOpacitySlider: HTMLSpanElement;
}, any>;
export default _default;
