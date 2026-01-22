import{j as n}from"./index-DhQHbkge.js";import{useMDXComponents as l}from"./index-D2LXvqQ0.js";import{M as a,C as s,a as r}from"./index-DN5oYWrE.js";import{D as d,P as o,N as c}from"./Dialog.stories-CPHf6-d3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-oiXQscte.js";function t(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(a,{of:d}),`
`,n.jsx(e.h1,{id:"name-dialog",children:"Name: Dialog"}),`
`,n.jsx(e.h2,{id:"component-overview",children:"Component Overview"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Purpose"}),": A modal dialog component with overlay and customizable dimensions for displaying content that requires user attention or interaction."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h3,{id:"playground",children:"Playground"}),`
`,n.jsx(s,{of:o}),`
`,n.jsx(r,{}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <div>
        <button @click="showDialog = true">
            Show Dialog
        </button>
        
        <Dialog v-model="showDialog">
            <div class="flex flex-col p-xl gap-sm">
                <h2 class="font-bold text-lg">Dialog</h2>
                <p class="text-sm text-neutral-foreground-low">
                    Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
                    amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
                    massa praesent ultricies.
                </p>
                <div class="flex justify-end w-full gap-xs">
                    <button variant="plain" @click="showDialog = false">
                        Cancel
                    </button>
                    <button @click="showDialog = false">
                        Save
                    </button>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showDialog = ref(false)
<\/script>
`})}),`
`,n.jsx(s,{sourceState:"none",of:o}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"props-api",children:"Props API"}),`
`,n.jsx(e.h4,{id:"v-model",children:"v-model"}),`
`,n.jsxs(e.p,{children:["Controls the dialog visibility state. Type: ",n.jsx(e.code,{children:"boolean"})," (default: ",n.jsx(e.code,{children:"false"}),")"]}),`
`,n.jsx(e.h4,{id:"width",children:"width"}),`
`,n.jsxs(e.p,{children:["Sets the dialog width. Type: ",n.jsx(e.code,{children:"string"})," (default: ",n.jsx(e.code,{children:'"fit-content"'}),")"]}),`
`,n.jsx(e.h4,{id:"height",children:"height"}),`
`,n.jsxs(e.p,{children:["Sets the dialog height. Type: ",n.jsx(e.code,{children:"string"})," (default: ",n.jsx(e.code,{children:'"fit-content"'}),")"]}),`
`,n.jsx(e.h4,{id:"no-outside-close",children:"no-outside-close"}),`
`,n.jsxs(e.p,{children:["Prevents closing the dialog when clicking outside. When enabled, clicking outside triggers a warning bounce animation to indicate the dialog cannot be closed. Type: ",n.jsx(e.code,{children:"boolean"})," (default: ",n.jsx(e.code,{children:"false"}),")"]}),`
`,n.jsx(s,{sourceState:"none",of:c}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"events-api",children:"Events API"}),`
`,n.jsx(e.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,n.jsx(e.p,{children:"Triggered when the dialog visibility state changes."}),`
`,n.jsx(e.h3,{id:"slots-api",children:"Slots API"}),`
`,n.jsx(e.h4,{id:"default",children:"#default"}),`
`,n.jsx(e.p,{children:"The main content area of the dialog."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <Dialog v-model="isOpen">
        Slot: default
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
<\/script>
`})}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Important Notes:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Uses Teleport to render in document body for proper z-index stacking"}),`
`,n.jsx(e.li,{children:"Includes smooth bounce animations for open/close transitions"}),`
`,n.jsx(e.li,{children:"Supports click-outside-to-close behavior (can be disabled with no-outside-close)"}),`
`,n.jsx(e.li,{children:"When no-outside-close is enabled, shows a warning bounce animation on outside clicks"}),`
`,n.jsx(e.li,{children:"Automatically centers content and handles responsive sizing"}),`
`,n.jsx(e.li,{children:"Built-in overlay component for consistent backdrop behavior"}),`
`,n.jsx(e.li,{children:"Maximum dimensions constrained to viewport with padding for mobile compatibility"}),`
`]})]})}function v(i={}){const{wrapper:e}={...l(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(t,{...i})}):t(i)}export{v as default};
