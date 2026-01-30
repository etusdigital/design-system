import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as a,C as o,a as c}from"./index-CCS_Va9-.js";import{A as d,P as t,N as l}from"./Accordion.stories-DOEl0QC3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-1aJ3cS75.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d}),`
`,e.jsx(n.h1,{id:"name-accordion",children:"Name: Accordion"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A collapsible content component with smooth animations and customizable header sections for organizing content in expandable panels."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(o,{of:t}),`
`,e.jsx(c,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Accordion v-model="isOpen">
        <template #header>
            <h4 class="text-neutral-foreground-high">Accordion component</h4>
        </template>
        <div class="flex items-end justify-start gap-base">
            <p>
                Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
                amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
                massa praesent ultricies.
            </p>
        </div>
    </Accordion>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
<\/script>
`})}),`
`,e.jsx(o,{sourceState:"none",of:t}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the accordion state (open/closed). Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"duration",children:"duration"}),`
`,e.jsxs(n.p,{children:["Controls the animation duration in milliseconds. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"150"}),", min: ",e.jsx(n.code,{children:"150"}),", max: ",e.jsx(n.code,{children:"1000"}),")"]}),`
`,e.jsx(n.h4,{id:"no-shadow",children:"no-shadow"}),`
`,e.jsxs(n.p,{children:["Removes the card shadow and border. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(o,{sourceState:"none",of:l}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the accordion state changes."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"The collapsible content that appears when the component is expanded."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Accordion v-model="isOpen">
        <template #header>Form Section</template>
        
        Slot: default
    </Accordion>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"header",children:"#header"}),`
`,e.jsx(n.p,{children:"Content displayed in the accordion header section, next to the expand/accordion icon."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Accordion v-model="isOpen">
        <template #header>
            Header
        </template>
        <p>Settings content goes here.</p>
    </Accordion>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
<\/script>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The component automatically handles smooth height transitions during expand/accordion"}),`
`,e.jsx(n.li,{children:"Duration is automatically clamped between 150ms and 1000ms for optimal UX"}),`
`,e.jsx(n.li,{children:"Uses ResizeObserver to handle dynamic content height changes"}),`
`]})]})}function v(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{v as default};
