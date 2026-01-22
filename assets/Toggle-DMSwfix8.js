import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as l,C as s,a as d}from"./index-DN5oYWrE.js";import{T as a,P as i,D as c,a as h}from"./Toggle.stories-UeWIJ1OB.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-oiXQscte.js";function o(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:a}),`
`,e.jsx(n.h1,{id:"name-toggle",children:"Name: Toggle"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A button-style toggle component with two visual variants for creating toggleable button groups and card-style selections."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:i}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Toggle 
        v-model="isSelected"
        name="buttonGroup"
    >
      Test toggle
    </Toggle>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isSelected = ref(false)
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:i}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the toggle button selection state. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"id",children:"id"}),`
`,e.jsxs(n.p,{children:["Unique identifier for the toggle button element. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"name",children:"name"}),`
`,e.jsxs(n.p,{children:["Name attribute for form grouping and accessibility. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"group-value",children:"group-value"}),`
`,e.jsxs(n.p,{children:["Value used when toggle is part of a Group component. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables toggle button interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["Visual variant of the toggle button. Type: ",e.jsx(n.code,{children:"'default' | 'secondary'"})," (default: ",e.jsx(n.code,{children:"'default'"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the toggle button selection state changes."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"Content displayed inside the toggle button."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Toggle v-model="selected" name="options">
        Slot: default
    </Toggle>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selected = ref(false)
<\/script>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Provides two distinct visual styles: default and secondary variants"}),`
`,e.jsx(n.li,{children:"Automatically integrates with Group component for grouped selections"}),`
`,e.jsx(n.li,{children:"Supports keyboard navigation with Space key activation"}),`
`,e.jsx(n.li,{children:"Provides proper ARIA attributes for screen reader accessibility"}),`
`,e.jsx(n.li,{children:"Default variant ideal for standard toggle groups and action selections"}),`
`,e.jsx(n.li,{children:"Secondary variant features rounded corners and different styling for card-like selections"}),`
`,e.jsx(n.li,{children:"Disabled state prevents interaction while maintaining visual feedback"}),`
`,e.jsx(n.li,{children:"Minimum sizing ensures consistent layout across different content lengths"}),`
`]})]})}function y(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{y as default};
