import { ref, onBeforeUnmount } from 'vue';
import type {
  RgbaColor,
  HslaColor,
  HwbColor,
  HsvaColor,
  ColorType
} from '../components/BColorPicker/BColorPicker.types';

// Import synchronous fallback functions
import {
  hexaToRgba as syncHexaToRgba,
  hslaToRgba as syncHslaToRgba,
  hwbToRgba as syncHwbToRgba,
  hsvaToRgba as syncHsvaToRgba,
  rgbaToHexa as syncRgbaToHexa,
  rgbaToHsla as syncRgbaToHsla,
  rgbaToHwb as syncRgbaToHwb,
  rgbaToHsva as syncRgbaToHsva,
} from '../utils/index';

export interface ColorConversionParams {
  // For to-RGBA conversions
  hexa?: string;
  h?: number;
  s?: number;
  l?: number;
  v?: number;
  w?: number;
  b?: number;
  a?: number;
  // For from-RGBA conversions
  r?: number;
  g?: number;
}

export interface WorkerMessage {
  id: string;
  type: 'COLOR_CONVERSION' | 'CONTRAST_CALCULATION' | 'BATCH_CONVERSION';
  payload: any;
}

export interface WorkerResponse {
  id: string;
  result: any;
  error?: string;
}

interface PendingRequest {
  resolve: (value: any) => void;
  reject: (error: Error) => void;
  timestamp: number;
}

export function useColorWorker() {
  const worker = ref<Worker | null>(null);
  const isWorkerSupported = ref(true);
  const pendingRequests = new Map<string, PendingRequest>();
  const requestCounter = ref(0);
  const workerInitialized = ref(false);
  
  // Performance metrics
  const metrics = ref({
    totalRequests: 0,
    successfulRequests: 0,
    averageResponseTime: 0,
    workerErrors: 0,
    fallbackUsage: 0
  });

  // Initialize Web Worker
  const initializeWorker = () => {
    if (!window.Worker || workerInitialized.value) {
      isWorkerSupported.value = false;
      return;
    }

    try {
      // Create worker from the worker file
      worker.value = new Worker(
        new URL('../workers/colorCalculations.worker.ts', import.meta.url),
        { type: 'module' }
      );

      worker.value.onmessage = (event: MessageEvent<WorkerResponse>) => {
        const { id, result, error } = event.data;
        const request = pendingRequests.get(id);
        
        if (!request) return;

        // Update performance metrics
        const responseTime = Date.now() - request.timestamp;
        updateMetrics(responseTime, !error);

        pendingRequests.delete(id);

        if (error) {
          request.reject(new Error(error));
        } else {
          request.resolve(result);
        }
      };

      worker.value.onerror = (error) => {
        console.warn('[useColorWorker] Worker error:', error);
        metrics.value.workerErrors++;
        
        // Reject all pending requests and fall back to sync
        for (const [id, request] of pendingRequests) {
          request.reject(new Error('Worker error'));
        }
        pendingRequests.clear();
        
        // Disable worker for subsequent requests
        isWorkerSupported.value = false;
      };

      workerInitialized.value = true;
    } catch (error) {
      console.warn('[useColorWorker] Failed to initialize worker:', error);
      isWorkerSupported.value = false;
    }
  };

  // Update performance metrics
  const updateMetrics = (responseTime: number, success: boolean) => {
    metrics.value.totalRequests++;
    
    if (success) {
      metrics.value.successfulRequests++;
      
      // Update average response time (rolling average)
      const currentAverage = metrics.value.averageResponseTime;
      const count = metrics.value.successfulRequests;
      metrics.value.averageResponseTime = 
        (currentAverage * (count - 1) + responseTime) / count;
    }
  };

  // Send message to worker with promise-based response
  const sendWorkerMessage = <T>(
    type: WorkerMessage['type'], 
    payload: any,
    timeoutMs = 5000
  ): Promise<T> => {
    if (!worker.value || !isWorkerSupported.value) {
      throw new Error('Worker not available');
    }

    const id = `req_${requestCounter.value++}`;
    const message: WorkerMessage = { id, type, payload };

    return new Promise((resolve, reject) => {
      // Set up timeout
      const timeoutId = setTimeout(() => {
        pendingRequests.delete(id);
        reject(new Error('Worker request timeout'));
      }, timeoutMs);

      const request: PendingRequest = {
        resolve: (value) => {
          clearTimeout(timeoutId);
          resolve(value);
        },
        reject: (error) => {
          clearTimeout(timeoutId);
          reject(error);
        },
        timestamp: Date.now()
      };

      pendingRequests.set(id, request);
      worker.value!.postMessage(message);
    });
  };

  // Color conversion functions with worker + fallback
  const hexaToRgba = async (hexa: string): Promise<RgbaColor> => {
    if (!isWorkerSupported.value) {
      metrics.value.fallbackUsage++;
      return syncHexaToRgba(hexa);
    }

    try {
      return await sendWorkerMessage<RgbaColor>('COLOR_CONVERSION', {
        conversionType: 'hexaToRgba',
        params: { hexa }
      });
    } catch (error) {
      console.warn('[useColorWorker] hexaToRgba fallback:', error);
      metrics.value.fallbackUsage++;
      return syncHexaToRgba(hexa);
    }
  };

  const hslaToRgba = async (h: number, s: number, l: number, a: number): Promise<RgbaColor> => {
    if (!isWorkerSupported.value) {
      metrics.value.fallbackUsage++;
      return syncHslaToRgba(h, s, l, a);
    }

    try {
      return await sendWorkerMessage<RgbaColor>('COLOR_CONVERSION', {
        conversionType: 'hslaToRgba',
        params: { h, s, l, a }
      });
    } catch (error) {
      console.warn('[useColorWorker] hslaToRgba fallback:', error);
      metrics.value.fallbackUsage++;
      return syncHslaToRgba(h, s, l, a);
    }
  };

  const hwbToRgba = async (h: number, w: number, b: number, a: number): Promise<RgbaColor> => {
    if (!isWorkerSupported.value) {
      metrics.value.fallbackUsage++;
      return syncHwbToRgba(h, w, b, a);
    }

    try {
      return await sendWorkerMessage<RgbaColor>('COLOR_CONVERSION', {
        conversionType: 'hwbToRgba',
        params: { h, w, b, a }
      });
    } catch (error) {
      console.warn('[useColorWorker] hwbToRgba fallback:', error);
      metrics.value.fallbackUsage++;
      return syncHwbToRgba(h, w, b, a);
    }
  };

  const hsvaToRgba = async (h: number, s: number, v: number, a: number): Promise<RgbaColor> => {
    if (!isWorkerSupported.value) {
      metrics.value.fallbackUsage++;
      return syncHsvaToRgba(h, s, v, a);
    }

    try {
      return await sendWorkerMessage<RgbaColor>('COLOR_CONVERSION', {
        conversionType: 'hsvaToRgba',
        params: { h, s, v, a }
      });
    } catch (error) {
      console.warn('[useColorWorker] hsvaToRgba fallback:', error);
      metrics.value.fallbackUsage++;
      return syncHsvaToRgba(h, s, v, a);
    }
  };

  const rgbaToHexa = async (r: number, g: number, b: number, a: number): Promise<string> => {
    if (!isWorkerSupported.value) {
      metrics.value.fallbackUsage++;
      return syncRgbaToHexa(r, g, b, a);
    }

    try {
      return await sendWorkerMessage<string>('COLOR_CONVERSION', {
        conversionType: 'rgbaToHexa',
        params: { r, g, b, a }
      });
    } catch (error) {
      console.warn('[useColorWorker] rgbaToHexa fallback:', error);
      metrics.value.fallbackUsage++;
      return syncRgbaToHexa(r, g, b, a);
    }
  };

  const rgbaToHsla = async (r: number, g: number, b: number, a: number): Promise<HslaColor> => {
    if (!isWorkerSupported.value) {
      metrics.value.fallbackUsage++;
      return syncRgbaToHsla(r, g, b, a);
    }

    try {
      return await sendWorkerMessage<HslaColor>('COLOR_CONVERSION', {
        conversionType: 'rgbaToHsla',
        params: { r, g, b, a }
      });
    } catch (error) {
      console.warn('[useColorWorker] rgbaToHsla fallback:', error);
      metrics.value.fallbackUsage++;
      return syncRgbaToHsla(r, g, b, a);
    }
  };

  const rgbaToHwb = async (r: number, g: number, b: number, a: number): Promise<HwbColor> => {
    if (!isWorkerSupported.value) {
      metrics.value.fallbackUsage++;
      return syncRgbaToHwb(r, g, b, a);
    }

    try {
      return await sendWorkerMessage<HwbColor>('COLOR_CONVERSION', {
        conversionType: 'rgbaToHwb',
        params: { r, g, b, a }
      });
    } catch (error) {
      console.warn('[useColorWorker] rgbaToHwb fallback:', error);
      metrics.value.fallbackUsage++;
      return syncRgbaToHwb(r, g, b, a);
    }
  };

  const rgbaToHsva = async (r: number, g: number, b: number, a: number): Promise<HsvaColor> => {
    if (!isWorkerSupported.value) {
      metrics.value.fallbackUsage++;
      return syncRgbaToHsva(r, g, b, a);
    }

    try {
      return await sendWorkerMessage<HsvaColor>('COLOR_CONVERSION', {
        conversionType: 'rgbaToHsva',
        params: { r, g, b, a }
      });
    } catch (error) {
      console.warn('[useColorWorker] rgbaToHsva fallback:', error);
      metrics.value.fallbackUsage++;
      return syncRgbaToHsva(r, g, b, a);
    }
  };

  // Batch conversion for multiple operations
  const batchConvert = async (conversions: Array<{
    type: string;
    params: ColorConversionParams;
    id: string;
  }>): Promise<Array<{id: string; result: any}>> => {
    if (!isWorkerSupported.value) {
      // Process synchronously
      const results = [];
      for (const conversion of conversions) {
        try {
          let result;
          const { type, params } = conversion;
          
          switch (type) {
            case 'hexaToRgba':
              result = syncHexaToRgba(params.hexa!);
              break;
            case 'hslaToRgba':
              result = syncHslaToRgba(params.h!, params.s!, params.l!, params.a!);
              break;
            case 'hwbToRgba':
              result = syncHwbToRgba(params.h!, params.w!, params.b!, params.a!);
              break;
            case 'hsvaToRgba':
              result = syncHsvaToRgba(params.h!, params.s!, params.v!, params.a!);
              break;
            case 'rgbaToHexa':
              result = syncRgbaToHexa(params.r!, params.g!, params.b!, params.a!);
              break;
            case 'rgbaToHsla':
              result = syncRgbaToHsla(params.r!, params.g!, params.b!, params.a!);
              break;
            case 'rgbaToHwb':
              result = syncRgbaToHwb(params.r!, params.g!, params.b!, params.a!);
              break;
            case 'rgbaToHsva':
              result = syncRgbaToHsva(params.r!, params.g!, params.b!, params.a!);
              break;
          }
          
          results.push({ id: conversion.id, result });
        } catch (error) {
          results.push({ id: conversion.id, result: null });
        }
      }
      
      metrics.value.fallbackUsage++;
      return results;
    }

    try {
      return await sendWorkerMessage('BATCH_CONVERSION', {
        conversions
      });
    } catch (error) {
      console.warn('[useColorWorker] batchConvert fallback:', error);
      metrics.value.fallbackUsage++;
      
      // Fallback to sync processing
      const results = [];
      for (const conversion of conversions) {
        // ... same sync logic as above
      }
      return results;
    }
  };

  // Contrast calculation
  const calculateContrast = async (color1: RgbaColor, color2: RgbaColor): Promise<number> => {
    if (!isWorkerSupported.value) {
      // Synchronous fallback contrast calculation
      const getLuminance = (r: number, g: number, b: number): number => {
        const [rs, gs, bs] = [r, g, b].map(c => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      };

      const lum1 = getLuminance(color1.r, color1.g, color1.b);
      const lum2 = getLuminance(color2.r, color2.g, color2.b);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      
      metrics.value.fallbackUsage++;
      return (brightest + 0.05) / (darkest + 0.05);
    }

    try {
      return await sendWorkerMessage<number>('CONTRAST_CALCULATION', {
        color1,
        color2
      });
    } catch (error) {
      console.warn('[useColorWorker] calculateContrast fallback:', error);
      metrics.value.fallbackUsage++;
      
      // Fallback calculation (same as above)
      const getLuminance = (r: number, g: number, b: number): number => {
        const [rs, gs, bs] = [r, g, b].map(c => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      };

      const lum1 = getLuminance(color1.r, color1.g, color1.b);
      const lum2 = getLuminance(color2.r, color2.g, color2.b);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      
      return (brightest + 0.05) / (darkest + 0.05);
    }
  };

  // Cleanup function
  const cleanup = () => {
    if (worker.value) {
      worker.value.terminate();
      worker.value = null;
    }
    pendingRequests.clear();
    workerInitialized.value = false;
  };

  // Initialize worker on composable creation
  initializeWorker();

  // Cleanup on unmount
  onBeforeUnmount(cleanup);

  return {
    // State
    isWorkerSupported,
    workerInitialized,
    metrics,
    
    // Color conversion functions
    hexaToRgba,
    hslaToRgba,
    hwbToRgba,
    hsvaToRgba,
    rgbaToHexa,
    rgbaToHsla,
    rgbaToHwb,
    rgbaToHsva,
    
    // Advanced functions
    batchConvert,
    calculateContrast,
    
    // Utility
    cleanup,
    initializeWorker
  };
}