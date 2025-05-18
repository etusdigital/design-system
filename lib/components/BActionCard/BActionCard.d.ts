import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    icon: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    color: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    hideDrag: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("delete" | "dragend" | "dragstart" | "dragging")[], "delete" | "dragend" | "dragstart" | "dragging", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    icon: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    color: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    hideDrag: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>> & Readonly<{
    onDelete?: ((...args: any[]) => any) | undefined;
    onDragend?: ((...args: any[]) => any) | undefined;
    onDragstart?: ((...args: any[]) => any) | undefined;
    onDragging?: ((...args: any[]) => any) | undefined;
}>, {
    icon: string | undefined;
    color: string | undefined;
    hideDrag: boolean | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
