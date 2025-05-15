import { type WritableComputedRef, shallowRef, computed } from 'vue';

/** Make sure to set the prop default to undefined manually.
 * Ex.: const props = withDefaults(defineProps<{ modelValue?: string }>(), { modelValue: undefined });
 */
export function useOptionalModel<T>(
props: any, propKey: string, emit: any, defaultValue: T,
): [WritableComputedRef<T>, (value: T, extra?: any) => void] {
    const local = shallowRef<T>(defaultValue);

    const model = computed<T>({
        get(): T {
            if (props[propKey] === undefined) return local.value;
            return props[propKey];
        },
        set(value: T) {
            local.value = value;
            emit(`update:${propKey}`, value);
        },
    });

    const set = (value: T, extra: any) => {
        local.value = value;
        emit(`update:${propKey}`, value, extra);
    }

    return [model, set];
}
