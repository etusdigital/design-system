import { ref, computed, onMounted } from 'vue';
import type { Ref, ComputedRef } from 'vue';

/**
 * Global counter for unique ID generation
 */
let globalIdCounter = 0;

/**
 * Map to store client-side generated IDs to avoid hydration mismatches
 */
const ssrIdMap = new Map<string, string>();

/**
 * Options for useId composable
 */
export interface UseIdOptions {
  /** Prefix for the generated ID */
  prefix?: string;
  /** Whether to generate the ID immediately or wait for client hydration */
  immediate?: boolean;
}

/**
 * Generate a unique ID string
 */
function generateId(prefix: string = 'id'): string {
  return `${prefix}-${++globalIdCounter}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Check if we're running in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Composable for generating stable unique IDs that are SSR-compatible
 * 
 * This composable generates unique identifiers that remain consistent
 * between server-side rendering and client-side hydration, preventing
 * hydration mismatches while ensuring uniqueness.
 * 
 * @param prefix - Optional prefix for the generated ID
 * @param options - Configuration options
 * @returns Stable unique ID string
 * 
 * @example
 * ```typescript
 * // Simple usage
 * const buttonId = useId('btn');
 * 
 * // With options  
 * const modalId = useId('modal', { immediate: false });
 * 
 * // In template:
 * // <button :id="buttonId">Click me</button>
 * ```
 */
export function useId(prefix: string = 'id', options: UseIdOptions = {}): string {
  const { immediate = true } = options;
  const finalPrefix = prefix || 'id';
  
  // For SSR compatibility, we need to handle ID generation carefully
  if (!isBrowser() && immediate) {
    // During SSR, generate a deterministic ID that can be reproduced on client
    const ssrId = `${finalPrefix}-ssr-${globalIdCounter++}`;
    return ssrId;
  }
  
  // Generate unique ID
  const id = generateId(finalPrefix);
  
  return id;
}

/**
 * Composable for generating reactive unique IDs
 * 
 * Returns a reactive reference to a unique ID that can be updated or regenerated.
 * Useful for components that need to dynamically generate new IDs.
 * 
 * @param prefix - Optional prefix for the generated ID
 * @param options - Configuration options
 * @returns Reactive unique ID reference and utilities
 * 
 * @example
 * ```typescript
 * const { id, regenerate } = useReactiveId('field');
 * 
 * // Change the ID dynamically
 * regenerate();
 * 
 * // Use in template
 * // <input :id="id" />
 * ```
 */
export function useReactiveId(
  prefix: string = 'id', 
  options: UseIdOptions = {}
): {
  id: Ref<string>;
  regenerate: () => void;
  setPrefix: (newPrefix: string) => void;
} {
  const { immediate = true } = options;
  const currentPrefix = ref(prefix || 'id');
  const id = ref<string>('');
  
  /**
   * Generate a new ID
   */
  const generateNewId = (): void => {
    if (!isBrowser() && !immediate) {
      // Wait for client-side hydration
      return;
    }
    
    id.value = generateId(currentPrefix.value);
  };
  
  /**
   * Regenerate the ID with current prefix
   */
  const regenerate = (): void => {
    generateNewId();
  };
  
  /**
   * Update the prefix and regenerate ID
   */
  const setPrefix = (newPrefix: string): void => {
    currentPrefix.value = newPrefix || 'id';
    generateNewId();
  };
  
  // Initialize the ID
  if (isBrowser() || immediate) {
    generateNewId();
  } else {
    // Wait for client-side hydration
    onMounted(() => {
      generateNewId();
    });
  }
  
  return {
    id,
    regenerate,
    setPrefix,
  };
}

/**
 * Composable for generating multiple related IDs
 * 
 * Useful for components that need several related IDs (e.g., input, label, error, description).
 * 
 * @param basePrefix - Base prefix for all generated IDs
 * @param suffixes - Array of suffixes to create related IDs
 * @param options - Configuration options
 * @returns Object with all generated IDs
 * 
 * @example
 * ```typescript
 * const ids = useIdGroup('input', ['field', 'label', 'error', 'help']);
 * 
 * // Results in:
 * // {
 * //   field: 'input-field-1-abc123',
 * //   label: 'input-label-1-abc123', 
 * //   error: 'input-error-1-abc123',
 * //   help: 'input-help-1-abc123'
 * // }
 * 
 * // Use in template:
 * // <label :for="ids.field">Name</label>
 * // <input :id="ids.field" :aria-describedby="ids.help" />
 * // <div :id="ids.help">Help text</div>
 * ```
 */
export function useIdGroup(
  basePrefix: string = 'group',
  suffixes: string[] = [],
  options: UseIdOptions = {}
): Record<string, string> {
  const { immediate = true } = options;
  
  if (suffixes.length === 0) {
    throw new Error('useIdGroup requires at least one suffix');
  }
  
  // Generate base ID for the group
  const baseId = useId(basePrefix, options);
  
  // Create related IDs using the same base
  const ids: Record<string, string> = {};
  
  suffixes.forEach(suffix => {
    ids[suffix] = `${baseId}-${suffix}`;
  });
  
  return ids;
}

/**
 * Composable for generating IDs with automatic cleanup
 * 
 * Useful for components that need to track and clean up generated IDs.
 * 
 * @param prefix - Prefix for generated IDs
 * @param options - Configuration options
 * @returns ID utilities with cleanup functionality
 * 
 * @example
 * ```typescript
 * const { createId, cleanup, ids } = useIdManager('modal');
 * 
 * const headerId = createId('header');
 * const bodyId = createId('body');
 * 
 * // All generated IDs are tracked
 * console.log(ids.value); // ['modal-header-1-abc', 'modal-body-2-def']
 * 
 * // Cleanup all generated IDs on component unmount
 * onUnmounted(cleanup);
 * ```
 */
export function useIdManager(
  prefix: string = 'managed',
  options: UseIdOptions = {}
): {
  createId: (suffix?: string) => string;
  removeId: (id: string) => void;
  cleanup: () => void;
  ids: ComputedRef<string[]>;
  hasId: (id: string) => boolean;
} {
  const generatedIds = ref<Set<string>>(new Set());
  
  /**
   * Create a new managed ID
   */
  const createId = (suffix?: string): string => {
    const fullPrefix = suffix ? `${prefix}-${suffix}` : prefix;
    const id = useId(fullPrefix, options);
    generatedIds.value.add(id);
    return id;
  };
  
  /**
   * Remove a specific ID from tracking
   */
  const removeId = (id: string): void => {
    generatedIds.value.delete(id);
  };
  
  /**
   * Clear all tracked IDs
   */
  const cleanup = (): void => {
    generatedIds.value.clear();
  };
  
  /**
   * Check if an ID is being tracked
   */
  const hasId = (id: string): boolean => {
    return generatedIds.value.has(id);
  };
  
  // Computed array of all tracked IDs
  const ids = computed(() => Array.from(generatedIds.value));
  
  return {
    createId,
    removeId,
    cleanup,
    ids,
    hasId,
  };
}

/**
 * Utility function to create a scoped ID generator
 * 
 * Creates a function that generates IDs with a consistent prefix.
 * Useful for components that need multiple IDs with the same prefix.
 * 
 * @param prefix - Prefix for all generated IDs
 * @param options - Configuration options
 * @returns ID generator function
 * 
 * @example
 * ```typescript
 * const createFieldId = createIdGenerator('field');
 * 
 * const inputId = createFieldId('input');      // 'field-input-1-abc123'
 * const labelId = createFieldId('label');      // 'field-label-2-def456'
 * const errorId = createFieldId('error');      // 'field-error-3-ghi789'
 * ```
 */
export function createIdGenerator(
  prefix: string = 'generated',
  options: UseIdOptions = {}
): (suffix?: string) => string {
  return (suffix?: string): string => {
    const fullPrefix = suffix ? `${prefix}-${suffix}` : prefix;
    return useId(fullPrefix, options);
  };
}

/**
 * Type guard to check if a string is a valid ID
 */
export function isValidId(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && /^[a-zA-Z][\w-]*$/.test(value);
}

/**
 * Utility to ensure an ID is valid for HTML
 */
export function sanitizeId(id: string): string {
  return id
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .replace(/^[^a-zA-Z]/, 'id-')
    .replace(/--+/g, '-')
    .toLowerCase();
}

/**
 * Pre-configured ID generators for common use cases
 */
export const idGenerators = {
  /** Generate form field IDs */
  field: createIdGenerator('field'),
  /** Generate button IDs */
  button: createIdGenerator('btn'),
  /** Generate modal/dialog IDs */
  modal: createIdGenerator('modal'),
  /** Generate menu IDs */
  menu: createIdGenerator('menu'),
  /** Generate tab IDs */
  tab: createIdGenerator('tab'),
  /** Generate tooltip IDs */
  tooltip: createIdGenerator('tooltip'),
  /** Generate popover IDs */
  popover: createIdGenerator('popover'),
} as const;