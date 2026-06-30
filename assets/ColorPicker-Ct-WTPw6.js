import{j as e}from"./iframe-CkhUnssK.js";import{useMDXComponents as a}from"./index-DebTzYcL.js";import{M as t,C as o,a as l}from"./index-CocK8Jwx.js";import{C as c,P as r,N as d,D as h}from"./ColorPicker.stories-Bwal0qVS.js";import"./preload-helper-PPVm8Dsz.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:c}),`
`,e.jsx(n.h1,{id:"name-colorpicker",children:"Name: ColorPicker"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": An advanced color picker component with multiple color format support, interactive canvas-based selection, and real-time preview for comprehensive color management and customization."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(o,{of:r}),`
`,e.jsx(l,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <ColorPicker 
        v-model="selectedColor"
        @update:model-value="handleColorChange"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedColor = ref("#ff0000")
<\/script>
`})}),`
`,e.jsx(o,{sourceState:"none",of:r}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the selected color value in the specified format. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["The color format for input and output values. Type: ",e.jsx(n.code,{children:"'hexa' | 'hsla' | 'hwb' | 'hsva' | 'rgba'"})," (default: ",e.jsx(n.code,{children:'"hexa"'}),")"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"hexa"}),": Hexadecimal format with alpha channel (",e.jsx(n.code,{children:"#rrggbbaa"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"hsla"}),": Hue, Saturation, Lightness, Alpha (",e.jsx(n.code,{children:"h, s%, l%, a"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"hwb"}),": Hue, Whiteness, Blackness with alpha (",e.jsx(n.code,{children:"h w% b% / a"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"hsva"}),": Hue, Saturation, Value, Alpha (",e.jsx(n.code,{children:"h, s%, v%, a"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"rgba"}),": Red, Green, Blue, Alpha (",e.jsx(n.code,{children:"r, g, b, a"}),")"]}),`
`]}),`
`,e.jsx(n.h4,{id:"no-shadow",children:"no-shadow"}),`
`,e.jsxs(n.p,{children:["Removes the card shadow and border for integration into custom layouts. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(o,{sourceState:"none",of:d}),`
`,e.jsx(n.h4,{id:"show-alpha",children:"show-alpha"}),`
`,e.jsxs(n.p,{children:["When ",e.jsx(n.code,{children:"true"}),", the opacity/alpha slider is shown. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"true"}),")"]}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["When ",e.jsx(n.code,{children:"true"}),", the color picker becomes non-interactive and is visually dimmed. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(o,{sourceState:"none",of:h}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the color value changes through user interaction. Receives the new color value in the selected format."}),`
`,e.jsx(n.h4,{id:"updatetype",children:"@update:type"}),`
`,e.jsx(n.p,{children:"Triggered when the color format type is changed using the format selector. Receives the new format type."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.p,{children:"This component uses internal canvas and control rendering and doesn't expose custom slots."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Interactive canvas-based color selection with real-time preview and pixel-perfect accuracy"}),`
`,e.jsx(n.li,{children:"Support for five major color formats with seamless conversion between formats"}),`
`,e.jsx(n.li,{children:"Advanced UI with separate hue slider, opacity control, and saturation/brightness canvas"}),`
`,e.jsx(n.li,{children:"Touch-friendly controls with both mouse and touch event handling for mobile compatibility"}),`
`,e.jsx(n.li,{children:"Real-time color format switching with animated transitions and preserved color values"}),`
`,e.jsx(n.li,{children:"Drag-and-drop interface for all color components (hue, saturation, brightness, opacity)"}),`
`,e.jsx(n.li,{children:"Automatic color space calculations and conversions maintain color accuracy across formats"}),`
`,e.jsx(n.li,{children:"Canvas-based rendering provides smooth gradients and precise color selection capabilities"}),`
`,e.jsx(n.li,{children:"Built-in input field allows direct color value entry with automatic validation and cursor positioning"}),`
`,e.jsx(n.li,{children:"Responsive design adapts to container width while maintaining proper aspect ratios and usability"}),`
`]})]})}function f(s={}){const{wrapper:n}={...a(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{f as default};
