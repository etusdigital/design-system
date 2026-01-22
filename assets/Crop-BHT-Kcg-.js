import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as t}from"./index-D2LXvqQ0.js";import{M as a,C as r,a as d}from"./index-DN5oYWrE.js";import{C as c,P as o}from"./Crop.stories-Bd6hH55s.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-oiXQscte.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:c}),`
`,e.jsx(n.h1,{id:"name-crop",children:"Name: Crop"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": An advanced image cropping component with interactive drag-and-drop selection, zoom controls, and real-time preview for precise image editing and content preparation."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(r,{of:o}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Crop 
        v-model="croppedImage"
        :src="originalImage"
        width="360px"
        height="200px"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const croppedImage = ref("")
const originalImage = ref("/path/to/image.jpg")
<\/script>
`})}),`
`,e.jsx(r,{sourceState:"none",of:o}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the cropped image output as a base64 data URL. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"src",children:"src"}),`
`,e.jsxs(n.p,{children:["The source image URL or path to be cropped. Type: ",e.jsx(n.code,{children:"string"})," (required)"]}),`
`,e.jsx(n.h4,{id:"width",children:"width"}),`
`,e.jsxs(n.p,{children:["The width of the crop area selection box. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"360px"'}),")"]}),`
`,e.jsx(n.h4,{id:"height",children:"height"}),`
`,e.jsxs(n.h2,{id:"the-height-of-the-crop-area-selection-box-type-string-default-200px",children:["The height of the crop area selection box. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"200px"'}),")"]}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the crop area changes or zoom is adjusted. Receives the cropped image as a base64 data URL."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.p,{children:"This component uses internal canvas-based rendering and doesn't expose custom slots."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Interactive crop area with drag-and-drop positioning for precise selection control"}),`
`,e.jsx(n.li,{children:"Built-in zoom functionality with slider control for detailed image editing"}),`
`,e.jsx(n.li,{children:"Real-time preview shows the exact cropped result with immediate visual feedback"}),`
`,e.jsx(n.li,{children:"Canvas-based rendering ensures high-quality output with pixel-perfect accuracy"}),`
`,e.jsx(n.li,{children:"Responsive design adapts to container size while maintaining aspect ratios"}),`
`,e.jsx(n.li,{children:"Touch-friendly controls support both mouse and touch interactions for mobile compatibility"}),`
`,e.jsx(n.li,{children:"SVG masking creates clean crop boundaries with smooth rounded corners"}),`
`,e.jsx(n.li,{children:"Automatic image scaling and positioning centers content optimally within the viewport"}),`
`,e.jsx(n.li,{children:"Memory-efficient processing handles large images without performance degradation"}),`
`,e.jsx(n.li,{children:"ResizeObserver integration ensures proper scaling when container dimensions change"}),`
`,e.jsx(n.li,{children:"Base64 output format provides immediate usability for uploads or display purposes"}),`
`,e.jsx(n.li,{children:"Advanced coordinate calculations maintain precision across different zoom levels and positions"}),`
`]})]})}function f(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{f as default};
