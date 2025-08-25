import { ComputedRef } from '../../vue/dist/vue.esm-bundler.js';
export interface UseCardProps {
    variant?: "elevated" | "outlined" | "filled" | "flat";
    padding?: "none" | "sm" | "md" | "lg" | "xl";
    shadow?: "none" | "sm" | "md" | "lg" | "xl";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    clickable?: boolean;
    disabled?: boolean;
    className?: string;
}
export interface UseCardReturn {
    cardClasses: ComputedRef<any[]>;
    isInteractive: ComputedRef<boolean>;
    cardProps: ComputedRef<Record<string, any>>;
}
export declare function useCard(props: UseCardProps): UseCardReturn;
