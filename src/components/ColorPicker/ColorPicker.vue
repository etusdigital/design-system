<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import {
    hexaToRgba,
    hsvaToRgba,
    hslaToRgba,
    rgbaToHsva,
    hwbToRgba,
    rgbaToHwb,
    rgbaToHexa,
    rgbaToHsla,
    getPosition
} from '../../utils/index';

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        type?: 'hexa' | 'hsla' | 'hwb' | 'hsva' | 'rgba';
        noShadow?: boolean;
    }>(),
    {
        modelValue: undefined,
        type: 'hexa',
        noShadow: false,
    }
);

const emit = defineEmits<{
    'update:modelValue': [value: string];
    'update:type': [value: string];
}>();

onMounted(() => {
    window.addEventListener('mousemove', updateColor);
    window.addEventListener('mouseup', () => {
        isDraggingColorSlider.value = false;
        isDraggingOpacitySlider.value = false;
        isDraggingColorArea.value = false;
    });
    window.addEventListener('touchmove', updateColorTouch);
    window.addEventListener('touchend', () => {
        isDraggingColorSlider.value = false;
        isDraggingOpacitySlider.value = false;
        isDraggingColorArea.value = false;
    });
    changeCanvasColor();
    setTimeout(() => {
        calculateCursor();
    }, 100);
});

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', updateColor);
    window.removeEventListener('mouseup', () => {
        isDraggingColorSlider.value = false;
        isDraggingOpacitySlider.value = false;
        isDraggingColorArea.value = false;
    });
    window.removeEventListener('touchmove', updateColorTouch);
    window.removeEventListener('touchend', () => {
        isDraggingColorSlider.value = false;
        isDraggingOpacitySlider.value = false;
        isDraggingColorArea.value = false;
    });
});

watch(
    () => props.type,
    () => {
        const index = colorTypes.value.findIndex((x) => x == props.type);
        colorType.value = index !== -1 ? index : 0;
        move(false);
    }
);

watch(
    () => props.modelValue,
    () => {
        if (inputColor.value != props.modelValue) {
            inputColor.value = props.modelValue || inputColor.value;
            calculateCursor();
        }
    }
);

const isDraggingColorSlider = ref(false);
const isDraggingOpacitySlider = ref(false);
const isDraggingColorArea = ref(false);
const cursorColorSlider = ref<HTMLSpanElement>();
const cursorOpacitySlider = ref<HTMLSpanElement>();
const cursorColorArea = ref<HTMLSpanElement>();
const colorArea = ref<HTMLCanvasElement>();
const circleBackground = ref(props.modelValue || 'rgba(255, 255, 255, 1)');
const sliderColor = ref('hsl(0, 100%, 50%)');
const sliderOpacity = ref(1);
const inputColor = ref(props.modelValue || getWhite());
const colorTypes = ref(['hexa', 'hsla', 'hwb', 'hsva', 'rgba']);
const colorType = ref(
    colorTypes.value.findIndex((x) => x == props.type) !== -1 ? colorTypes.value.findIndex((x) => x == props.type) : 0
);
const isMovingDown = ref(false);
const isMovingUp = ref(false);

function getWhite(): string {
    if (props.type == 'hexa') return '#ffffffff';
    else if (props.type == 'hsla') return '0, 100%, 0%, 1';
    else if (props.type == 'hwb') return '0 100% 0% / 1';
    else if (props.type == 'hsva') return '0, 0%, 100%, 1';
    return '255, 255, 255, 1';
}

function startDraggingColorSlider(event: any) {
    isDraggingColorSlider.value = true;
    updateColorSlider(event);
}

function startDraggingOpacitySlider(event: any) {
    isDraggingOpacitySlider.value = true;
    updateOpacitySlider(event);
}

function startDraggingColorArea(event: any) {
    isDraggingColorArea.value = true;
    updateColorArea(event);
}

function updateColor(event: any) {
    updateColorSlider(event);
    updateOpacitySlider(event);
    updateColorArea(event);
}

function startDraggingColorAreaTouch(event: TouchEvent) {
    startDraggingColorArea(event.touches[0]);
}

function startDraggingOpacitySliderTouch(event: TouchEvent) {
    startDraggingOpacitySlider(event.touches[0]);
}

function startDraggingColorSliderTouch(event: TouchEvent) {
    startDraggingColorSlider(event.touches[0]);
}

function updateColorTouch(event: TouchEvent) {
    updateColor(event.touches[0]);
}

function updateOpacitySlider(event: any) {
    if (isDraggingOpacitySlider.value && cursorOpacitySlider.value) {
        const slider = cursorOpacitySlider.value.closest('.slider');
        const context = colorArea.value?.getContext('2d');
        if (!slider || !colorArea.value || !context) return;
        const clampedLeft = getCursorPosition(event, cursorOpacitySlider.value, slider).left;
        cursorOpacitySlider.value.style.left = clampedLeft + 'px';
        const opacityFull = slider.clientWidth - 10;
        const opacity = clampedLeft / opacityFull;
        sliderOpacity.value = opacity;
        changeCanvasColor(sliderColor.value, opacity);
        updatedCircleColor();
    }
}

function updateColorSlider(event: MouseEvent) {
    if (isDraggingColorSlider.value && cursorColorSlider.value) {
        const slider = cursorColorSlider.value?.closest('.slider');
        const sliderOpacityDiv = cursorOpacitySlider.value?.closest('.slider') as HTMLDivElement;
        if (!slider || !colorArea.value || !sliderOpacityDiv) return;
        const clampedLeft = getCursorPosition(event, cursorColorSlider.value, slider).left;
        cursorColorSlider.value.style.left = clampedLeft + 'px';
        const color = getPixelColor(slider, clampedLeft);
        sliderColor.value = color;
        sliderOpacityDiv.style.background = `linear-gradient(
            to right,
            #ffffff 0%,
            ${color}
        )`;
        changeCanvasColor(color, sliderOpacity.value);
        updatedCircleColor();
    }
}

function calculateColorFromPosition(x: number, y: number) {
    if (!colorArea.value) return [0, 0, 0, 255];
    
    const width = colorArea.value.clientWidth;
    const height = colorArea.value.clientHeight;
    
    // Normalizar coordenadas (0 a 1)
    const normalizedX = Math.max(0, Math.min(1, x / width));
    const normalizedY = Math.max(0, Math.min(1, y / height));
    
    // Obter a cor base do slider (HSV com S=100%, V=100%)
    const hsva = getHsvaFromSlider();
    
    // Calcular saturação e brilho baseado na posição
    const saturation = normalizedX * 100; // 0% à esquerda, 100% à direita
    const value = (1 - normalizedY) * 100; // 100% no topo, 0% embaixo
    
    // Converter HSV para RGB
    const rgba = hsvaToRgba(hsva.h, saturation, value, sliderOpacity.value);
    
    return [Math.round(rgba.r), Math.round(rgba.g), Math.round(rgba.b), Math.round(rgba.a * 255)];
}

function getHsvaFromSlider() {
    if (!cursorColorSlider.value) return { h: 0 };
    const sliderDiv = cursorColorSlider.value.closest('.slider');
    if (!sliderDiv) return { h: 0 };
    
    const left = Number(cursorColorSlider.value.style.left.replace('px', ''));
    const sliderWidth = sliderDiv.clientWidth - 10; // -10 para o cursor
    const hue = Math.round((left / sliderWidth) * 360);
    
    return { h: Math.max(0, Math.min(360, hue)) };
}

function updateColorFromPixel(pixel: number[]) {
    circleBackground.value = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
    inputColor.value = getColor({
        r: pixel[0],
        g: pixel[1],
        b: pixel[2],
        a: pixel[3] / 255,
    });
    emit('update:modelValue', inputColor.value);
}

function updateColorArea(event: MouseEvent) {
    if (isDraggingColorArea.value && cursorColorArea.value) {
        if (!colorArea.value) return;
        const clamped = getCursorPosition(event, cursorColorArea.value, colorArea.value, true);
        cursorColorArea.value.style.left = clamped.left + 'px';
        cursorColorArea.value.style.top = clamped.top + 'px';
        
        const pixel = calculateColorFromPosition(clamped.left + 5, clamped.top);
        updateColorFromPixel(pixel);
    }
}

function getPixelColor(element: Element, x: number): string {
    const canvas = document.createElement('canvas');
    canvas.width = element.clientWidth;
    canvas.height = element.clientHeight;

    const context = canvas.getContext('2d');
    if (!context) return '';
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'hsl(0, 100%, 50%)');
    gradient.addColorStop(1 / 6, 'hsl(60, 100%, 50%)');
    gradient.addColorStop(2 / 6, 'hsl(120, 100%, 50%)');
    gradient.addColorStop(3 / 6, 'hsl(180, 100%, 50%)');
    gradient.addColorStop(4 / 6, 'hsl(240, 100%, 50%)');
    gradient.addColorStop(5 / 6, 'hsl(300, 100%, 50%)');
    gradient.addColorStop(1, 'hsl(360, 100%, 50%)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const pixel = context.getImageData(x, 0, 1, 1).data;
    return `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
}

function changeCanvasColor(color = 'hsl(0, 100%, 50%)', opacity = 1) {
    const canvas = colorArea.value;
    const context = canvas?.getContext('2d');
    if (!context || !canvas) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = opacity;

    const gradientBefore = context.createLinearGradient(0, 0, canvas.width, 0);
    gradientBefore.addColorStop(0, '#ffffff');
    gradientBefore.addColorStop(1, color);

    const gradientAfter = context.createLinearGradient(0, 0, 0, canvas.height);
    gradientAfter.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradientAfter.addColorStop(1, '#000000');

    context.fillStyle = gradientBefore;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = gradientAfter;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function getCursorPosition(event: MouseEvent, cursor: HTMLSpanElement, parent: Element, isArea = false) {
    const clamped = getPosition(event, cursor, parent, { top: true, left: true }, { x: isArea ? 5 : 1, y: cursor.clientHeight }, { x: isArea ? -5 : 0 });
    return {
        left: clamped.x,
        top: clamped.y,
    }
}

function updatedCircleColor() {
    if (!cursorColorArea.value || !colorArea.value) return;
    const left = Number(cursorColorArea.value.style.left.replace('px', '')) + 5;
    const top = Number(cursorColorArea.value.style.top.replace('px', ''));
    
    const pixel = calculateColorFromPosition(left, top);
    updateColorFromPixel(pixel);
}

function calculateCursor() {
    const sliderColorDiv = cursorColorSlider.value?.closest('.slider');
    const sliderOpacityDiv = cursorOpacitySlider.value?.closest('.slider') as HTMLDivElement;
    if (
        !cursorColorSlider.value ||
        !cursorOpacitySlider.value ||
        !cursorColorArea.value ||
        !sliderColorDiv ||
        !sliderOpacityDiv
    )
        return;
    const hsva = getHsvaColor();
    const colorPercentage = Math.min(1, hsva.h / 360);
    const colorLeft = Math.min(
        sliderColorDiv.clientWidth - 10,
        Math.max(0, (sliderColorDiv.clientWidth - 10) * colorPercentage)
    );
    const opacityFull = sliderOpacityDiv.clientWidth - 10;
    const opacityLeft = Math.min(opacityFull, Math.max(0, opacityFull * hsva.a));
    const opacity = opacityLeft / opacityFull;
    sliderOpacity.value = opacity;
    cursorColorSlider.value.style.left = colorLeft + 'px';
    cursorOpacitySlider.value.style.left = opacityLeft + 'px';
    const color = getPixelColor(sliderColorDiv, colorLeft);
    sliderColor.value = color;
    sliderOpacityDiv.style.background = `linear-gradient(
        to right,
        #ffffff 0%,
        ${color}
    )`;
    changeCanvasColor(color, opacity);
    const rgba = hsvaToRgba(hsva.h, Number(hsva.s.toString().replace('%', '')), Number(hsva.v.toString().replace('%', '')), hsva.a);
    circleBackground.value = buildColor(rgba);      
    const colorPosition = findColorPosition(hsva);
    cursorColorArea.value.style.left = colorPosition.x + 'px';
    cursorColorArea.value.style.top = colorPosition.y + 'px';
    emit('update:modelValue', inputColor.value);
}

function getHsvaColor() {
    if (colorType.value == 0) {
        const rgba = hexaToRgba(inputColor.value);
        return rgbaToHsva(rgba.r, rgba.g, rgba.b, isNaN(rgba.a) ? 1 : rgba.a);
    } else if (colorType.value == 1) {
        const hsla = divideColor(inputColor.value, 'hlsa');
        const rgba = hslaToRgba(hsla.h, hsla.s, hsla.l, hsla.a);
        return rgbaToHsva(rgba.r, rgba.g, rgba.b, isNaN(rgba.a) ? 1 : rgba.a);
    } else if (colorType.value == 2) {
        const hwb = divideColor(inputColor.value, 'hwb', ' ');
        const dividedColor = inputColor.value.split('/');
        const rgba = hwbToRgba(hwb.h, hwb.w, hwb.b, Number(dividedColor[1]?.replace(')', '')));
        return rgbaToHsva(rgba.r, rgba.g, rgba.b, isNaN(rgba.a) ? 1 : rgba.a);
    } else if (colorType.value == 3) {
        return divideColor(inputColor.value, 'hsva');
    }
    const rgba = divideColor(inputColor.value);
    return rgbaToHsva(rgba.r, rgba.g, rgba.b, isNaN(rgba.a) ? 1 : rgba.a);
}

function getColor(color: any) {
    if (colorType.value == 0) {
        return rgbaToHexa(color.r, color.g, color.b, color.a);
    } else if (colorType.value == 1) {
        const hsla = rgbaToHsla(color.r, color.g, color.b, color.a);
        return `${hsla.h.toFixed(0)}, ${hsla.s}, ${hsla.l}, ${hsla.a < 1 ? hsla.a.toFixed(2) : hsla.a}`;
    } else if (colorType.value == 2) {
        const hwb = rgbaToHwb(color.r, color.g, color.b, color.a);
        return `${hwb.h} ${hwb.w} ${hwb.b} / ${hwb.a < 1 ? hwb.a.toFixed(2) : hwb.a}`;
    } else if (colorType.value == 3) {
        const hsva = rgbaToHsva(color.r, color.g, color.b, color.a);
        return `${hsva.h}, ${hsva.s}, ${hsva.v}, ${hsva.a < 1 ? hsva.a.toFixed(2) : hsva.a}`;
    }
    return `${color.r}, ${color.g}, ${color.b}, ${color.a < 1 ? color.a.toFixed(2) : color.a}`;
}

function divideColor(color: string, type = 'rgba', divideBy = ',') {
    if (!color) return '';
    const colorObject: any = {};
    const typeArray = Array.from(type);
    const values = color.split(divideBy);
    return replaceObject(typeArray, values, colorObject);
}

function divideCompleteColor(color: string, divideBy = ',') {
    if (!color) return '';
    const colorObject: any = {};
    const dividedColor = color.split('(');
    if (dividedColor.length < 2) return;
    const type = Array.from(dividedColor[0]);
    dividedColor[1] = dividedColor[1].replace(')', '');
    const values = dividedColor[1].split(divideBy);
    return replaceObject(type, values, colorObject);
}

function replaceObject(array: any[], values: any[], obj: any) {
    array.forEach((s, index) => {
        obj[s] = typeof values[index] == 'string' ? Number(values[index].replace('%', '')) : values[index] || 1;
    });
    return obj;
}

function buildColor(color: any) {
    let colorString = '';
    let colorType = '';
    Object.keys(color).forEach((key, index) => {
        colorType += key;
        colorString += Object.keys(color).length - 1 == index ? color[key] : `${color[key]}, `;
    });
    return `${colorType}(${colorString})`;
}

function findColorPosition(color: any): any {
    const canvas = colorArea.value;
    if (!canvas) return;

    const formatedColor = {
        h: color.h,
        s: typeof color.s == 'string' ? Number(color.s.replace('%', '')) : color.s,
        v: typeof color.v == 'string' ? Number(color.v.replace('%', '')) : color.v,
        a: color.a,
    };
    const positionX = Math.max(
        -5,
        Math.min((formatedColor.s / 100) * (canvas.clientWidth - 5), canvas.clientWidth - 5)
    );
    const positionY = Math.max(0, Math.min((1 - formatedColor.v / 100) * canvas.clientHeight, canvas.clientHeight));

    return {
        x: positionX,
        y: positionY,
    };
}

function moveDown() {
    isMovingDown.value = true;
    setTimeout(() => {
        isMovingDown.value = false;
        colorType.value = colorType.value + 1 > colorTypes.value.length - 1 ? 0 : colorType.value + 1;
        move();
    }, 600);
}

function moveUp() {
    isMovingUp.value = true;
    setTimeout(() => {
        colorType.value = colorType.value - 1 < 0 ? colorTypes.value.length - 1 : colorType.value - 1;
        isMovingUp.value = false;
        move();
    }, 600);
}

function move(updateType = true) {
    inputColor.value = getColor(divideCompleteColor(circleBackground.value));
    emit('update:modelValue', inputColor.value);
    if (updateType) emit('update:type', colorTypes.value[colorType.value]);
}
</script>

<template>
    <Card class="color-picker" :class="noShadow ? 'no-shadow' : ''">
        <div class="relative">
            <span class="cursor cursor-area" ref="cursorColorArea" @mousedown="startDraggingColorArea" @touchstart="startDraggingColorAreaTouch" />
            <canvas class="color-area" ref="colorArea" @mousedown="startDraggingColorArea" @touchstart="startDraggingColorAreaTouch" />
        </div>
        <div class="flex items-center gap-sm">
            <div class="color-circle" :style="{ background: circleBackground }" />
            <div class="flex flex-col gap-xs w-full">
                <div class="slider" @mousedown="startDraggingColorSlider" @touchstart="startDraggingColorSliderTouch">
                    <span ref="cursorColorSlider" class="cursor cursor-slider" @mousedown="startDraggingColorSlider" @touchstart="startDraggingColorSliderTouch" />
                </div>
                <div class="slider-opacity slider flex justify-end" @mousedown="startDraggingOpacitySlider" @touchstart="startDraggingOpacitySliderTouch">
                    <span
                        class="cursor cursor-slider"
                        ref="cursorOpacitySlider"
                        @mousedown="startDraggingOpacitySlider"
                        @touchstart="startDraggingOpacitySliderTouch"
                    />
                </div>
            </div>
        </div>
        <div class="flex items-center gap-sm">
            <Input v-model="inputColor" @update:model-value="calculateCursor" text-align="center" class="flex-1" />
            <div class="flex items-center gap-xxs">
                <div class="flex flex-col items-center overflow-hidden relative h-lg w-fit text-neutral-interaction-default">
                    <p v-show="isMovingDown" class="font-bold slide-down">
                        {{ colorTypes[colorType + 1 > colorTypes.length - 1 ? 0 : colorType + 1].toUpperCase() }}
                    </p>
                    <p class="font-bold" :class="{ 'slide-down': isMovingDown, 'slide-up': isMovingUp }">
                        {{ colorTypes[colorType].toUpperCase() }}
                    </p>
                    <p v-show="isMovingUp" class="font-bold slide-up">
                        {{ colorTypes[colorType - 1 < 0 ? colorTypes.length - 1 : colorType - 1].toUpperCase() }}
                    </p>
                </div>
                <div class="flex flex-col">
                    <Icon
                        name="arrow_drop_up"
                        class="cursor-pointer flex items-center h-[.8em] text-neutral-interaction-default"
                        @click="moveUp"
                    />
                    <Icon
                        name="arrow_drop_down"
                        class="cursor-pointer flex items-center h-[.8em] text-neutral-interaction-default"
                        @click="moveDown"
                    />
                </div>
            </div>
        </div>
    </Card>
</template>

<style scoped>
@reference "../../assets/main.css";

.color-picker {
    @apply p-base flex flex-col gap-sm;
}

.slider {
    @apply w-full h-[8px] rounded-xs relative;
    background: linear-gradient(
        to right,
        hsl(0, 100%, 50%),
        hsl(60, 100%, 50%),
        hsl(120, 100%, 50%),
        hsl(180, 100%, 50%),
        hsl(240, 100%, 50%),
        hsl(300, 100%, 50%),
        hsl(360, 100%, 50%)
    );
}

.slider-opacity {
    background: linear-gradient(to right, #ffffff 0%, hsl(0, 100%, 50%));
}

.color-area {
    @apply w-full h-[8em] relative;
}

.cursor-area {
    @apply top-0 left-[-5px] border-xxs border-neutral-default;
}

.cursor {
    @apply cursor-grab w-[12px] h-[12px] absolute z-[1] bg-neutral-interaction-default rounded-base translate-y-[-50%] select-none;
}

.cursor-slider {
    @apply top-[50%];
}

.color-circle {
    @apply h-[2em] w-[2.2em] rounded-full border-xxs border-neutral-default;
}

.slide-up {
    animation: slide-up 0.6s ease;
}

.slide-down {
    animation: slide-down 0.6s ease;
}

@keyframes slide-up {
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-100%);
    }
}

@keyframes slide-down {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0%);
    }
}

.no-shadow {
    @apply shadow-none border-none;
}
</style>
