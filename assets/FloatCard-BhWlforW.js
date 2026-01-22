import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as l,C as t,a}from"./index-DN5oYWrE.js";import{F as d,P as s}from"./FloatCard.stories-SH90MTCI.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-oiXQscte.js";function o(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d}),`
`,e.jsx(n.h1,{id:"name-floatcard",children:"Name: FloatCard"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A floating card component with click or hover triggers, smart positioning, and intelligent scroll detection for displaying contextual content and tooltips with enhanced user experience."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(t,{of:s}),`
`,e.jsx(a,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <FloatCard v-model="isCardOpen" mode="click">
        <button>Click to show card</button>
        
        <template #card>
            <div class="p-base">
                <h4>Floating Card Content</h4>
                <p>This content appears in a floating card positioned relative to the trigger element.</p>
            </div>
        </template>
    </FloatCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isCardOpen = ref(false)
<\/script>
`})}),`
`,e.jsx(t,{sourceState:"none",of:s}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the visibility state of the floating card. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"mode",children:"mode"}),`
`,e.jsxs(n.p,{children:["Interaction mode for showing/hiding the card. Type: ",e.jsx(n.code,{children:'"click" | "hover"'})," (default: ",e.jsx(n.code,{children:'"click"'}),")"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"click"}),": Card appears on click and closes on outside click or scroll"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"hover"}),": Card appears on mouse enter and closes on mouse leave"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the card visibility state changes. Receives the new boolean value."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"The trigger element that activates the floating card when interacted with."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <FloatCard v-model="showCard">
        Slot: default
    </FloatCard>
</template>
`})}),`
`,e.jsx(n.h4,{id:"card",children:"#card"}),`
`,e.jsx(n.p,{children:"Content displayed within the floating card when visible."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <FloatCard v-model="showTooltip" mode="hover">
        Slot: default
        
        <template #card>
            <div class="p-sm max-w-xs">
                <h5 class="font-semibold mxs">Help Information</h5>
                <p class="text-sm">This tooltip provides additional context and guidance for the user.</p>
            </div>
        </template>
    </FloatCard>
</template>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Smart positioning automatically adjusts card placement to stay within viewport bounds"}),`
`,e.jsx(n.li,{children:"Portal rendering (Teleport to body) ensures proper z-index layering and prevents overflow issues"}),`
`,e.jsx(n.li,{children:"Intelligent scroll detection distinguishes between scrolling inside the card vs. outside"}),`
`,e.jsx(n.li,{children:"Advanced event handling with both mouse and touch support for mobile compatibility"}),`
`,e.jsx(n.li,{children:"Automatic cleanup of event listeners prevents memory leaks and performance issues"}),`
`,e.jsx(n.li,{children:"Smooth fade animations provide polished user experience with optimized timing"}),`
`,e.jsx(n.li,{children:"Click-outside detection works seamlessly with other page interactions"}),`
`,e.jsx(n.li,{children:"Hover mode includes proper mouse leave detection to prevent flickering"}),`
`,e.jsx(n.li,{children:"Card positioning considers both horizontal and vertical viewport constraints"}),`
`,e.jsx(n.li,{children:"Responsive design maintains usability across different screen sizes and orientations"}),`
`]})]})}function v(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}export{v as default};
