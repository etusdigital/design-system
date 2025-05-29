type __VLS_Props = {
    modelValue: any[] | any[][];
    hovered?: Date;
    day?: Date | undefined;
    isCompare?: boolean;
    maxInit?: Date;
    maxEnd?: Date;
    index?: number;
    size?: number;
    position?: "start" | "middle" | "end";
};
declare const _default: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    select: (value: Date) => any;
    "update:modelValue": (value: Date[]) => any;
    "update:hovered": (value: Date | null) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSelect?: ((value: Date) => any) | undefined;
    "onUpdate:modelValue"?: ((value: Date[]) => any) | undefined;
    "onUpdate:hovered"?: ((value: Date | null) => any) | undefined;
}>, {
    size: number;
    index: number;
    isCompare: boolean;
    position: "start" | "middle" | "end";
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
export default _default;
