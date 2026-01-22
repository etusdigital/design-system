import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as l}from"./index-D2LXvqQ0.js";import{M as i,C as s,a as d}from"./index-DMV-UF4P.js";import{T as c,P as t,V as a,D as p,a as h}from"./ToggleGroup.stories-Cdox_iGD.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-D9ZodyF1.js";function r(o){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:c}),`
`,e.jsx(n.h1,{id:"name-togglegroup",children:"Name: ToggleGroup"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A container component for grouping related input components with synchronized selection state, commonly used for toggle button groups and visual component grouping."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:t}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <ToggleGroup v-model="selectedValue" :options="options" />
    
    <p>Selected: {{ selectedValue }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedValue = ref('option1')
const options = [...]
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:t}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the currently selected component's group-value. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"null"}),")"]}),`
`,e.jsx(n.h4,{id:"vertical",children:"vertical"}),`
`,e.jsxs(n.p,{children:["Arranges grouped components vertically instead of horizontally. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:a}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables all grouped components. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["Visual variant applied to all toggle buttons in the group. Type: ",e.jsx(n.code,{children:"'default' | 'secondary'"})," (default: ",e.jsx(n.code,{children:"'default'"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the selection changes within the group."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsxs(n.p,{children:["This component uses ",e.jsx(n.code,{children:"Toggle"})," internally and doesn't expose custom slots."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Model value synchronization works bidirectionally between ToggleGroup and child components"}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"vertical"})," prop to change layout orientation for all grouped components"]}),`
`]})]})}function T(o={}){const{wrapper:n}={...l(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(r,{...o})}):r(o)}export{T as default};
