import { type WritableComputedRef, shallowRef, computed } from 'vue';

/**
 * Props interface for components using optional model
 * Uses Record<string, unknown> to allow component props while maintaining type safety
 */
export type OptionalModelProps<T = unknown> = Record<string, unknown>;

/**
 * Emit function interface for optional model
 * Accepts any function that can emit events (more permissive)
 */
export type OptionalModelEmit = unknown;

/**
 * Extra data interface for model updates
 */
export interface OptionalModelExtra {
    [key: string]: unknown;
}

/** 
 * Creates a composable for optional v-model binding
 * Make sure to set the prop default to undefined manually.
 * Ex.: const props = withDefaults(defineProps<{ modelValue?: string }>(), { modelValue: undefined });
 */
export function useOptionalModel<T>(
    props: OptionalModelProps<T>, 
    propKey: string, 
    emit: OptionalModelEmit, 
    defaultValue: T,
): [WritableComputedRef<T>, (value: T, extra?: OptionalModelExtra) => void] {
    const local = shallowRef<T>(defaultValue);

    const model = computed<T>({
        get(): T {
            if (props[propKey] === undefined) return local.value;
            return props[propKey] as T;
        },
        set(value: T) {
            local.value = value;
            (emit as (event: string, ...args: unknown[]) => void)(`update:${propKey}`, value);
        },
    });

    const set = (value: T, extra?: OptionalModelExtra) => {
        local.value = value;
        (emit as (event: string, ...args: unknown[]) => void)(`update:${propKey}`, value, extra);
    }

    return [model, set];
}
