import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as a}from"./index-D2LXvqQ0.js";import{M as o,C as i,a as l}from"./index-DMV-UF4P.js";import{P as d,a as r}from"./Pagination.stories-TXsCuHbm.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-D9ZodyF1.js";function t(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:d}),`
`,e.jsx(n.h1,{id:"name-pagination",children:"Name: Pagination"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A pagination component with intelligent page display logic, navigation controls, and responsive ellipsis handling for large page sets."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(i,{of:r}),`
`,e.jsx(l,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Pagination 
        v-model="currentPage"
        :length="totalPages"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentPage = ref(1)
const totalPages = ref(10)
<\/script>
`})}),`
`,e.jsx(i,{sourceState:"none",of:r}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the current active page number. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"1"}),")"]}),`
`,e.jsx(n.h4,{id:"length",children:"length"}),`
`,e.jsxs(n.p,{children:["Total number of pages available for navigation. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"1"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the current page changes. Receives the new page number and additional context."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.p,{children:"This component uses internal logic for page display and doesn't expose custom slots."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Automatically handles ellipsis (...) for large page sets with intelligent positioning"}),`
`,e.jsx(n.li,{children:"Navigation arrows are disabled at first/last pages to prevent invalid navigation"}),`
`,e.jsx(n.li,{children:"Smart page display algorithm shows relevant pages around current selection"}),`
`,e.jsx(n.li,{children:"Always displays first and last pages for quick navigation"}),`
`,e.jsx(n.li,{children:"Hover effects and visual feedback for better user experience"}),`
`,e.jsx(n.li,{children:"Responsive design adapts to different page ranges automatically"}),`
`,e.jsx(n.li,{children:"Optimized rendering prevents unnecessary DOM updates for performance"}),`
`]})]})}function f(s={}){const{wrapper:n}={...a(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{f as default};
