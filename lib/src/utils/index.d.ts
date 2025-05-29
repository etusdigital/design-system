export declare function calculateDate(value: string): Date[];
export declare function hexaToRgba(hexa: string): any;
export declare function hslaToRgba(h: number, s: number, l: number, a: number): any;
export declare function hwbToRgba(h: number, w: number, b: number, a: number): {
    r: number;
    g: number;
    b: number;
    a: number;
};
export declare function hsvaToRgba(h: number, s: number, v: number, a: number): any;
export declare function rgbaToHexa(r: number, g: number, b: number, a: number): string;
export declare function rgbaToHsla(r: number, g: number, b: number, a: number): any;
export declare function rgbaToHwb(r: number, g: number, b: number, a: number): {
    h: number;
    w: string;
    b: string;
    a: number;
} | {
    h: string;
    w: string;
    b: string;
    a: number;
};
export declare function rgbaToHsva(r: number, g: number, b: number, a: number): any;
export declare function isNilAndBlank(value: any): boolean;
export declare function isNilAndEmpty(value: any): boolean;
export declare function isObject(value: any): boolean;
export declare function isRange(start: Date, end: Date, day: Date, isSelected?: boolean): any;
export declare function capitalizeFirstLetter(string: string): string;
export declare function getArrayMonthDay(date: Date): any[];
export declare function getMonths(lang?: string): any[];
export declare function getPosition(event: any, div: HTMLSpanElement, parent: Element, directions?: any, substract?: any, max?: any): {
    x: number;
    y: number;
};
export declare function applyMask(value: string, mask: "cpf" | "cnpj" | "cep" | "domain" | "url" | "email" | undefined): string;
export declare function isValidEmail(value: any): boolean;
export declare function isValidDomain(value: any): boolean;
export declare function isValidUrl(value: any): boolean;
export declare function blendColors(color: string, percentage?: number, bg?: number[]): string;
export declare function checkPath(path: string): boolean;
export declare const dateOptions: {
    value: string;
    label: string;
    calculate: () => Date[];
}[];
