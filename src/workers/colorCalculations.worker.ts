/**
 * Web Worker for heavy color calculations
 * Handles color space conversions and other intensive calculations
 * to prevent blocking the main UI thread during color picking operations
 */

export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
  [key: string]: number;
}

export interface HslaColor {
  h: number;
  s: string;
  l: string;
  a: number;
  [key: string]: number | string;
}

export interface HwbColor {
  h: string;
  w: string;
  b: string;
  a: number;
  [key: string]: number | string;
}

export interface HsvaColor {
  h: number;
  s: string;
  v: string;
  a: number;
  [key: string]: number | string;
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

// Color conversion functions optimized for Web Worker
function hexaToRgba(hexa: string): RgbaColor {
  const r = parseInt(hexa.slice(1, 3), 16);
  const g = parseInt(hexa.slice(3, 5), 16);
  const b = parseInt(hexa.slice(5, 7), 16);
  const a = parseInt(hexa.slice(7, 9), 16) / 255;

  return { r, g, b, a };
}

function hslaToRgba(h: number, s: number, l: number, a: number): RgbaColor {
  let t1, t2, r, g, b;
  h = h / 60;
  if (l <= 0.5) {
    t2 = l * (s + 1);
  } else {
    t2 = l + s - l * s;
  }
  t1 = l * 2 - t2;
  
  function hueToRgb(t1: number, t2: number, h: number) {
    if (h < 0) h += 6;
    if (h >= 6) h -= 6;
    if (h < 1) return (t2 - t1) * h + t1;
    else if (h < 3) return t2;
    else if (h < 4) return (t2 - t1) * (4 - h) + t1;
    else return t1;
  }
  
  r = hueToRgb(t1, t2, h + 2) * 255;
  g = hueToRgb(t1, t2, h) * 255;
  b = hueToRgb(t1, t2, h - 2) * 255;
  
  return { r, g, b, a };
}

function hwbToRgba(h: number, w: number, b: number, a: number): RgbaColor {
  let i,
    rgb,
    rgbArr = [],
    tot;
  rgb = hslaToRgba(h, 1, 0.5, 1);
  rgbArr[0] = rgb.r / 255;
  rgbArr[1] = rgb.g / 255;
  rgbArr[2] = rgb.b / 255;
  tot = w + b;
  if (tot > 1) {
    w = Number((w / tot).toFixed(2));
    b = Number((b / tot).toFixed(2));
  }
  for (i = 0; i < 3; i++) {
    rgbArr[i] *= 1 - w - b;
    rgbArr[i] += w;
    rgbArr[i] = Number(rgbArr[i] * 255);
  }
  return { r: rgbArr[0], g: rgbArr[1], b: rgbArr[2], a };
}

function hsvaToRgba(h: number, s: number, v: number, a: number): RgbaColor {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(s, 100)) / 100;
  v = Math.max(0, Math.min(v, 100)) / 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r, g, b;
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b, a };
}

function rgbaToHexa(r: number, g: number, b: number, a: number): string {
  const alphaHex = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}${alphaHex}`;
}

function rgbaToHsla(r: number, g: number, b: number, a: number): HslaColor {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }

    h *= 60;
  }

  return {
    h: h < 0 ? h + 360 : h,
    s: `${(s * 100).toFixed(0)}%`,
    l: `${(l * 100).toFixed(0)}%`,
    a,
  };
}

function rgbaToHwb(r: number, g: number, b: number, a: number): HwbColor {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === min) {
    return {
      h: "0",
      w: ((100 * min) / 255).toFixed(0) + "%",
      b: (100 - (100 * max) / 255).toFixed(0) + "%",
      a: a,
    };
  }
  let tmp = 0.0;
  switch (max) {
    case r:
      tmp = (g - b) / (max - min) + 0.0;
      break;
    case g:
      tmp = (b - r) / (max - min) + 2.0;
      break;
    case b:
      tmp = (r - g) / (max - min) + 4.0;
      break;
  }
  const hue = ((tmp + 6.0) % 6.0) / 6.0;
  return {
    h: (360 * hue).toFixed(0),
    w: ((100 * min) / 255).toFixed(0) + "%",
    b: (100 - (100 * max) / 255).toFixed(0) + "%",
    a: a,
  };
}

function rgbaToHsva(r: number, g: number, b: number, a: number): HsvaColor {
  let rabs,
    gabs,
    babs,
    rr,
    gg,
    bb,
    h = 0,
    s,
    v: number,
    diff: number,
    diffc,
    percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  (v = Math.max(rabs, gabs, babs)), (diff = v - Math.min(rabs, gabs, babs));
  diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = (num: number) => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }

  return {
    h: Math.round(h * 360),
    s: `${percentRoundFn(s * 100).toFixed(0)}%`,
    v: `${percentRoundFn(v * 100).toFixed(0)}%`,
    a: a,
  };
}

// Contrast calculation functions
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1: RgbaColor, color2: RgbaColor): number {
  const lum1 = getLuminance(color1.r, color1.g, color1.b);
  const lum2 = getLuminance(color2.r, color2.g, color2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Batch processing for multiple conversions
function processBatchConversions(conversions: Array<{type: string, params: any, id: string}>) {
  const results: Array<{id: string, result: any}> = [];
  
  for (const conversion of conversions) {
    try {
      let result;
      const { type, params } = conversion;
      
      switch (type) {
        case 'hexaToRgba':
          result = hexaToRgba(params.hexa);
          break;
        case 'hslaToRgba':
          result = hslaToRgba(params.h, params.s, params.l, params.a);
          break;
        case 'hwbToRgba':
          result = hwbToRgba(params.h, params.w, params.b, params.a);
          break;
        case 'hsvaToRgba':
          result = hsvaToRgba(params.h, params.s, params.v, params.a);
          break;
        case 'rgbaToHexa':
          result = rgbaToHexa(params.r, params.g, params.b, params.a);
          break;
        case 'rgbaToHsla':
          result = rgbaToHsla(params.r, params.g, params.b, params.a);
          break;
        case 'rgbaToHwb':
          result = rgbaToHwb(params.r, params.g, params.b, params.a);
          break;
        case 'rgbaToHsva':
          result = rgbaToHsva(params.r, params.g, params.b, params.a);
          break;
        default:
          throw new Error(`Unknown conversion type: ${type}`);
      }
      
      results.push({ id: conversion.id, result });
    } catch (error) {
      results.push({ 
        id: conversion.id, 
        result: null,
      });
    }
  }
  
  return results;
}

// Main message handler
self.addEventListener('message', (event: MessageEvent<WorkerMessage>) => {
  const { id, type, payload } = event.data;
  
  try {
    let result;
    
    switch (type) {
      case 'COLOR_CONVERSION': {
        const { conversionType, params } = payload;
        
        switch (conversionType) {
          case 'hexaToRgba':
            result = hexaToRgba(params.hexa);
            break;
          case 'hslaToRgba':
            result = hslaToRgba(params.h, params.s, params.l, params.a);
            break;
          case 'hwbToRgba':
            result = hwbToRgba(params.h, params.w, params.b, params.a);
            break;
          case 'hsvaToRgba':
            result = hsvaToRgba(params.h, params.s, params.v, params.a);
            break;
          case 'rgbaToHexa':
            result = rgbaToHexa(params.r, params.g, params.b, params.a);
            break;
          case 'rgbaToHsla':
            result = rgbaToHsla(params.r, params.g, params.b, params.a);
            break;
          case 'rgbaToHwb':
            result = rgbaToHwb(params.r, params.g, params.b, params.a);
            break;
          case 'rgbaToHsva':
            result = rgbaToHsva(params.r, params.g, params.b, params.a);
            break;
          default:
            throw new Error(`Unknown conversion type: ${conversionType}`);
        }
        break;
      }
      
      case 'CONTRAST_CALCULATION': {
        const { color1, color2 } = payload;
        result = getContrastRatio(color1, color2);
        break;
      }
      
      case 'BATCH_CONVERSION': {
        const { conversions } = payload;
        result = processBatchConversions(conversions);
        break;
      }
      
      default:
        throw new Error(`Unknown message type: ${type}`);
    }
    
    const response: WorkerResponse = { id, result };
    self.postMessage(response);
    
  } catch (error) {
    const errorResponse: WorkerResponse = {
      id,
      result: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    self.postMessage(errorResponse);
  }
});