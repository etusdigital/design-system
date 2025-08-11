import { ref, computed, watch } from 'vue';
import type { RgbaColor, ColorType } from '../components/BColorPicker/BColorPicker.types';

export interface ColorHistoryItem {
  id: string;
  color: RgbaColor;
  hexValue: string;
  name?: string;
  timestamp: number;
  usageCount: number;
  format: ColorType;
}

export interface ColorHistoryOptions {
  /** Maximum number of colors to keep in history */
  maxItems?: number;
  /** Storage key for localStorage persistence */
  storageKey?: string;
  /** Whether to persist history in localStorage */
  persist?: boolean;
  /** Whether to automatically add colors on change */
  autoAdd?: boolean;
  /** Minimum time between same color additions (ms) */
  debounceTime?: number;
}

const DEFAULT_OPTIONS: Required<ColorHistoryOptions> = {
  maxItems: 20,
  storageKey: 'bColorPicker_history',
  persist: true,
  autoAdd: true,
  debounceTime: 1000
};

export function useColorHistory(options: ColorHistoryOptions = {}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Internal state
  const items = ref<ColorHistoryItem[]>([]);
  const lastAddedTime = ref<Record<string, number>>({});
  
  // Load from localStorage on initialization
  const loadFromStorage = () => {
    if (!opts.persist || typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(opts.storageKey);
      if (stored) {
        const parsedItems = JSON.parse(stored);
        // Validate the structure
        if (Array.isArray(parsedItems)) {
          items.value = parsedItems.filter((item: any) => 
            item && 
            item.id && 
            item.color && 
            typeof item.color.r === 'number' &&
            typeof item.color.g === 'number' &&
            typeof item.color.b === 'number' &&
            typeof item.color.a === 'number'
          );
        }
      }
    } catch (error) {
      console.warn('[useColorHistory] Failed to load from storage:', error);
      items.value = [];
    }
  };
  
  // Save to localStorage
  const saveToStorage = () => {
    if (!opts.persist || typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(opts.storageKey, JSON.stringify(items.value));
    } catch (error) {
      console.warn('[useColorHistory] Failed to save to storage:', error);
    }
  };
  
  // Generate color ID for deduplication
  const getColorId = (color: RgbaColor): string => {
    return `${Math.round(color.r)}-${Math.round(color.g)}-${Math.round(color.b)}-${Math.round(color.a * 100)}`;
  };
  
  // Generate hex value from RGBA
  const rgbaToHex = (color: RgbaColor): string => {
    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
    const alpha = Math.round(color.a * 255);
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}${alpha < 255 ? toHex(alpha) : ''}`;
  };
  
  // Generate a readable color name
  const generateColorName = (color: RgbaColor): string => {
    const { r, g, b } = color;
    
    // Simple color name generation based on dominant channel
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    if (diff < 30) {
      // Grayscale
      if (max < 50) return 'Dark Gray';
      if (max < 100) return 'Medium Gray';
      if (max < 200) return 'Light Gray';
      return 'White';
    }
    
    // Color names based on dominant channel
    if (r === max) {
      if (g > b) return diff > 100 ? 'Red-Orange' : 'Pink';
      return diff > 100 ? 'Red' : 'Light Red';
    } else if (g === max) {
      if (r > b) return diff > 100 ? 'Yellow-Green' : 'Light Yellow';
      return diff > 100 ? 'Green' : 'Light Green';
    } else {
      if (r > g) return diff > 100 ? 'Purple' : 'Light Purple';
      return diff > 100 ? 'Blue' : 'Light Blue';
    }
  };
  
  // Add color to history
  const addColor = (
    color: RgbaColor, 
    format: ColorType = 'hexa',
    customName?: string
  ): ColorHistoryItem => {
    const colorId = getColorId(color);
    const now = Date.now();
    
    // Check debounce time
    if (lastAddedTime.value[colorId] && 
        now - lastAddedTime.value[colorId] < opts.debounceTime) {
      // Just update usage count for existing item
      const existingIndex = items.value.findIndex(item => item.id === colorId);
      if (existingIndex !== -1) {
        items.value[existingIndex].usageCount++;
        items.value[existingIndex].timestamp = now;
        return items.value[existingIndex];
      }
    }
    
    lastAddedTime.value[colorId] = now;
    
    // Check if color already exists
    const existingIndex = items.value.findIndex(item => item.id === colorId);
    
    if (existingIndex !== -1) {
      // Update existing item
      const item = items.value[existingIndex];
      item.usageCount++;
      item.timestamp = now;
      item.format = format;
      if (customName) item.name = customName;
      
      // Move to front
      items.value.splice(existingIndex, 1);
      items.value.unshift(item);
      
      return item;
    }
    
    // Create new item
    const newItem: ColorHistoryItem = {
      id: colorId,
      color: { ...color },
      hexValue: rgbaToHex(color),
      name: customName || generateColorName(color),
      timestamp: now,
      usageCount: 1,
      format
    };
    
    // Add to beginning
    items.value.unshift(newItem);
    
    // Trim to max items
    if (items.value.length > opts.maxItems) {
      items.value = items.value.slice(0, opts.maxItems);
    }
    
    return newItem;
  };
  
  // Remove color from history
  const removeColor = (colorId: string): boolean => {
    const index = items.value.findIndex(item => item.id === colorId);
    if (index !== -1) {
      items.value.splice(index, 1);
      return true;
    }
    return false;
  };
  
  // Clear all history
  const clearHistory = (): void => {
    items.value = [];
    lastAddedTime.value = {};
  };
  
  // Get color by ID
  const getColor = (colorId: string): ColorHistoryItem | undefined => {
    return items.value.find(item => item.id === colorId);
  };
  
  // Get most recently used colors
  const getRecentColors = (count?: number): ColorHistoryItem[] => {
    const sorted = [...items.value].sort((a, b) => b.timestamp - a.timestamp);
    return count ? sorted.slice(0, count) : sorted;
  };
  
  // Get most frequently used colors
  const getFrequentColors = (count?: number): ColorHistoryItem[] => {
    const sorted = [...items.value].sort((a, b) => {
      if (b.usageCount === a.usageCount) {
        return b.timestamp - a.timestamp; // If same usage, prefer more recent
      }
      return b.usageCount - a.usageCount;
    });
    return count ? sorted.slice(0, count) : sorted;
  };
  
  // Check if color exists in history
  const hasColor = (color: RgbaColor): boolean => {
    const colorId = getColorId(color);
    return items.value.some(item => item.id === colorId);
  };
  
  // Export history for backup/sharing
  const exportHistory = (): string => {
    return JSON.stringify(items.value, null, 2);
  };
  
  // Import history from backup
  const importHistory = (jsonData: string): boolean => {
    try {
      const importedItems = JSON.parse(jsonData);
      if (Array.isArray(importedItems)) {
        // Validate structure
        const validItems = importedItems.filter((item: any) => 
          item && 
          item.id && 
          item.color && 
          typeof item.color.r === 'number' &&
          typeof item.color.g === 'number' &&
          typeof item.color.b === 'number' &&
          typeof item.color.a === 'number'
        );
        
        items.value = validItems.slice(0, opts.maxItems);
        return true;
      }
    } catch (error) {
      console.warn('[useColorHistory] Import failed:', error);
    }
    return false;
  };
  
  // Computed properties
  const isEmpty = computed(() => items.value.length === 0);
  const count = computed(() => items.value.length);
  const isFull = computed(() => items.value.length >= opts.maxItems);
  
  // Auto-save to localStorage when items change
  watch(items, saveToStorage, { deep: true });
  
  // Load initial data
  loadFromStorage();
  
  return {
    // State
    items,
    isEmpty,
    count,
    isFull,
    
    // Core functions
    addColor,
    removeColor,
    clearHistory,
    getColor,
    hasColor,
    
    // Query functions
    getRecentColors,
    getFrequentColors,
    
    // Utility functions
    exportHistory,
    importHistory,
    
    // Internal utilities (exposed for advanced usage)
    getColorId,
    generateColorName,
    rgbaToHex
  };
}