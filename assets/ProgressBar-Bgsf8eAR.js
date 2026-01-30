import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as t}from"./index-D2LXvqQ0.js";import{M as a,C as s,a as d}from"./index-CCS_Va9-.js";import{P as c,a as o,T as l,S as p,b as h,A as u,D as x,I as j,N as m,c as g}from"./ProgressBar.stories-CqO-v82F.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-1aJ3cS75.js";function i(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:c}),`
`,e.jsx(n.h1,{id:"name-progressbar",children:"Name: ProgressBar"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A versatile progress indicator component supporting both percentage-based and step-based progress tracking with customizable styling, animations, and display options."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:o}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <ProgressBar v-model="uploadProgress" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const uploadProgress = ref(0.5)
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:o}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["The current progress value (0-1 for percentage, or step number when using steps). Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"0"}),")"]}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["Color theme variant for the progress bar styling. Type: ",e.jsx(n.code,{children:'"primary" | "info" | "success" | "warning" | "danger" | "neutral"'})," (default: ",e.jsx(n.code,{children:'"primary"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:l}),`
`,e.jsx(n.h4,{id:"size",children:"size"}),`
`,e.jsxs(n.p,{children:["Size variant affecting height and typography. Type: ",e.jsx(n.code,{children:'"small" | "medium" | "large"'})," (default: ",e.jsx(n.code,{children:'"medium"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"steps",children:"steps"}),`
`,e.jsxs(n.p,{children:["Number of discrete steps for step-based progress. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"0"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"animation-type",children:"animation-type"}),`
`,e.jsxs(n.p,{children:["Animation type for loading states. Type: ",e.jsx(n.code,{children:'"indeterminate" | "query" | undefined'})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"display-percentage",children:"display-percentage"}),`
`,e.jsxs(n.p,{children:["Location for displaying the percentage text. Type: ",e.jsx(n.code,{children:'"center" | "bar" | undefined'})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"color",children:"color"}),`
`,e.jsxs(n.p,{children:["Custom color for the progress bar fill. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"icon",children:"icon"}),`
`,e.jsxs(n.p,{children:["Icon displayed at the end of the progress bar. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"info-message",children:"info-message"}),`
`,e.jsxs(n.p,{children:["Tooltip message displayed when hovering over the icon. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"neutral-background",children:"neutral-background"}),`
`,e.jsxs(n.p,{children:["Uses neutral background color instead of theme-based background. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:m}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.p,{children:"This component does not emit custom events but supports v-model for reactive progress updates."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"icon-slot",children:"#icon-slot"}),`
`,e.jsx(n.p,{children:"Custom content to replace the default icon at the end of the progress bar."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <ProgressBar 
        v-model="progress"
        display-percentage="bar"
    >
        <template #icon-slot>
            Slot: icon-slot
        </template>
    </ProgressBar>
</template>
`})}),`
`,e.jsx(s,{sourceState:"none",of:g}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Supports both percentage-based (0-1) and step-based progress tracking"}),`
`,e.jsx(n.li,{children:"Smooth CSS transitions for progress changes with configurable duration"}),`
`,e.jsx(n.li,{children:"Multiple animation types (indeterminate, query) for loading states"}),`
`,e.jsx(n.li,{children:"Flexible percentage display options (center, bar, or hidden)"}),`
`,e.jsx(n.li,{children:"Icon integration with tooltip support for additional context"}),`
`,e.jsx(n.li,{children:"Custom color support with automatic background color blending"}),`
`,e.jsx(n.li,{children:"Responsive design adapts to different container sizes"}),`
`,e.jsx(n.li,{children:"Theme-based styling with support for all design system color variants"}),`
`,e.jsx(n.li,{children:"Step-based progress automatically calculates percentage from current step"}),`
`,e.jsx(n.li,{children:"Neutral background option for contexts requiring subdued styling"}),`
`,e.jsx(n.li,{children:"Slot-based architecture allows complete customization of progress indicators"}),`
`,e.jsx(n.li,{children:"Accessibility support with proper ARIA attributes and semantic markup"}),`
`,e.jsx(n.li,{children:"Performance optimized with minimal DOM updates during progress changes"}),`
`,e.jsx(n.li,{children:"CSS custom properties integration for advanced theming capabilities"}),`
`]})]})}function C(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{C as default};
