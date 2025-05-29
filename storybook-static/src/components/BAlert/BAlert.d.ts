type __VLS_Props = {
    title?: string;
    message?: string;
    type?: "info" | "success" | "warning" | "danger" | "neutral";
    size?: "small" | "medium" | "large";
    icon?: string;
    expandable?: boolean;
    closable?: boolean;
    hideIcon?: boolean;
    iconPosition?: "start" | "center" | "end";
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        actions?(_: {}): any;
    };
    refs: {
        card: HTMLDivElement;
        content: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    close: () => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClose?: (() => any) | undefined;
}>, {
    type: "info" | "success" | "warning" | "danger" | "neutral";
    size: "small" | "medium" | "large";
    icon: string;
    message: string;
    expandable: boolean;
    closable: boolean;
    hideIcon: boolean;
    iconPosition: "start" | "center" | "end";
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {
    card: HTMLDivElement;
    content: HTMLDivElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
