export declare function calculateDate(value: any): any[];
export declare function hexaToRgba(hexa: any): {
    r: number;
    g: number;
    b: number;
    a: number;
};
export declare function hslaToRgba(h: any, s: any, l: any, a: any): {
    r: any;
    g: any;
    b: any;
    a: any;
};
export declare function hwbToRgba(h: any, w: any, b: any, a: any): {
    r: any;
    g: any;
    b: any;
    a: any;
};
export declare function hsvaToRgba(h: any, s: any, v: any, a: any): {
    r: any;
    g: any;
    b: any;
    a: any;
};
export declare function rgbaToHexa(r: any, g: any, b: any, a: any): string;
export declare function rgbaToHsla(r: any, g: any, b: any, a: any): {
    h: number;
    s: string;
    l: string;
    a: any;
};
export declare function rgbaToHwb(r: any, g: any, b: any, a: any): {
    h: number;
    w: string;
    b: string;
    a: any;
} | {
    h: string;
    w: string;
    b: string;
    a: any;
};
export declare function rgbaToHsva(r: any, g: any, b: any, a: any): {
    h: number;
    s: string;
    v: string;
    a: any;
};
export declare function isNilAndBlank(value: any): boolean;
export declare function isNilAndEmpty(value: any): boolean;
export declare function isObject(value: any): boolean;
export declare function isRange(start: any, end: any, day: any, isSelected?: boolean): any;
export declare function checkDateType(value: any, type: any): any[];
export declare function capitalizeFirstLetter(string: any): any;
export declare function getArrayMonthDay(date: any): any[];
export declare function getMonths(lang?: string): any[];
export declare function getPosition(event: any, div: any, parent: any, directions?: {
    left: boolean;
}, substract?: {}, max?: {}): {
    x: number;
    y: number;
};
export declare function applyMask(value: any, mask: any): any;
export declare function isValidEmail(value: any): boolean;
export declare function isValidDomain(value: any): boolean;
export declare function isValidUrl(value: any): boolean;
export declare function blendColors(color: any, percentage?: number, bg?: number[]): string;
export declare function checkPath(path: any): boolean;
export declare const dateOptions: {
    value: string;
    label: string;
    calculate: () => any[];
}[];
//# sourceMappingURL=index.d.ts.map