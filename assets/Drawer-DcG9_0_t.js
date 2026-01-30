import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as i}from"./index-D2LXvqQ0.js";import{M as l,C as t,a}from"./index-CCS_Va9-.js";import{D as d,P as o,N as c,a as h}from"./Drawer.stories-Bwb38VES.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-1aJ3cS75.js";function r(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d}),`
`,e.jsx(n.h1,{id:"name-drawer",children:"Name: Drawer"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A slide-out drawer panel component that can appear from any side of the screen (right, left, top, bottom) with an overlay backdrop, supporting customizable width/height and close behavior."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(t,{of:o}),`
`,e.jsx(a,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <div>
        <button @click="openDrawer">Show Drawer</button>
        <Drawer v-model="showDrawer" size="40%" position="right">
            <div class="flex flex-col justify-between h-full p-xl">
                <div class="flex flex-col gap-sm">
                    <h2 class="font-bold text-lg">Drawer</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus
                        maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis
                        phasellus a massa praesent ultricies.
                    </p>
                </div>
                <div class="flex justify-end w-full gap-xs">
                    <button variant="plain" @click="showDrawer = false">Cancel</button>
                    <button>Save</button>
                </div>
            </div>
        </Drawer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showDrawer = ref(false)

const openDrawer = () => {
    showDrawer.value = true
}
<\/script>
`})}),`
`,e.jsx(t,{sourceState:"none",of:o}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the visibility of the drawer (v-model support). Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"size",children:"size"}),`
`,e.jsxs(n.p,{children:["Sets the size of the drawer panel. For left/right positions this controls width, for top/bottom positions this controls height. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"fit-content"'}),")"]}),`
`,e.jsx(n.h4,{id:"no-outside-close",children:"no-outside-close"}),`
`,e.jsxs(n.p,{children:["Prevents the drawer from closing when clicking on the overlay. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"position",children:"position"}),`
`,e.jsxs(n.p,{children:["Sets the position from which the drawer will slide. Type: ",e.jsx(n.code,{children:'"right" | "left" | "top" | "bottom"'})," (default: ",e.jsx(n.code,{children:'"right"'}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:h}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"update:model-value"}),`
`,e.jsx(n.p,{children:"Emitted when the drawer's visibility state changes (v-model support). Receives the new boolean value."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"The main content slot for the drawer. Contains all the drawer content including headers, body, and actions."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Drawer v-model="showForm" size="500px" position="right">
        Slot: default
    </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showForm = ref(false)
<\/script>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The drawer uses ",e.jsx(n.code,{children:"Teleport"})," to render in the document body for proper z-index layering"]}),`
`,e.jsx(n.li,{children:"On mobile devices (< 768px), the drawer always slides from bottom regardless of position prop"}),`
`,e.jsx(n.li,{children:"The drawer automatically handles focus management and accessibility"}),`
`,e.jsx(n.li,{children:"Different positions use appropriate animations: right/left slide horizontally, top/bottom slide vertically"}),`
`,e.jsxs(n.li,{children:["For top/bottom positions, the ",e.jsx(n.code,{children:"size"})," prop controls the height instead of width"]}),`
`,e.jsx(n.li,{children:"Content should include proper padding and structure for best visual results"}),`
`,e.jsx(n.li,{children:"Consider using semantic HTML elements (nav, header, main, etc.) within the slot for accessibility"}),`
`]})]})}function g(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{g as default};
