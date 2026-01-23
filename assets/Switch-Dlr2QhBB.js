import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as o}from"./index-D2LXvqQ0.js";import{M as a,C as t,a as l}from"./index-CbltXMU5.js";import{S as d,P as s,R as c,D as h}from"./Switch.stories-CXUqbWOC.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CjRVAs2g.js";function r(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d}),`
`,e.jsx(n.h1,{id:"name-switch",children:"Name: Switch"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A switch component with customizable positioning and accessibility features for binary state control with visual feedback and keyboard navigation support."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(t,{of:s}),`
`,e.jsx(l,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Switch 
        v-model="isEnabled"
    >
        Switch Label
    </Switch>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isEnabled = ref(false)
<\/script>
`})}),`
`,e.jsx(t,{sourceState:"none",of:s}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the switch state (on/off). Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"id",children:"id"}),`
`,e.jsxs(n.p,{children:["HTML id attribute for the switch element. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"name",children:"name"}),`
`,e.jsxs(n.p,{children:["HTML name attribute for form integration. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"rhs",children:"rhs"}),`
`,e.jsxs(n.p,{children:["Positions the switch button on the right-hand side of the label. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the switch interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:h}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the switch state changes. Receives the new boolean value."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"Content displayed as the switch label next to the switch."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Switch v-model="setting">
        Slot: default
    </Switch>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const setting = ref(false)
<\/script>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Full keyboard accessibility with Space key activation and proper ARIA attributes"}),`
`,e.jsx(n.li,{children:"Smooth animation transitions for state changes with optimal timing"}),`
`,e.jsx(n.li,{children:"Automatic label association when id or name props are provided"}),`
`,e.jsx(n.li,{children:"Visual disabled state prevents interaction while maintaining clear feedback"}),`
`,e.jsx(n.li,{children:"Right-hand side positioning option for flexible layout integration"}),`
`,e.jsx(n.li,{children:"Switch role and aria-checked attributes for screen reader compatibility"}),`
`,e.jsx(n.li,{children:"Focus management with tabindex and keyboard event handling"}),`
`,e.jsx(n.li,{children:"Consistent sizing and color theming across all interaction states"}),`
`]})]})}function w(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{w as default};
