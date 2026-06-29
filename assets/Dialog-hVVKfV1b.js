import{j as e}from"./iframe-YS2_Kj4J.js";import{useMDXComponents as l}from"./index-DGnzdnxX.js";import{M as a,C as s,a as d}from"./index-Bzd7e6t0.js";import{D as r,P as o,N as c}from"./Dialog.stories-brZtTWTC.js";import"./preload-helper-PPVm8Dsz.js";function t(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:r}),`
`,e.jsx(n.h1,{id:"name-dialog",children:"Name: Dialog"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A modal dialog component with overlay and customizable dimensions for displaying content that requires user attention or interaction."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:o}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
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
`,e.jsx(s,{sourceState:"none",of:o}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the dialog visibility state. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"width",children:"width"}),`
`,e.jsxs(n.p,{children:["Sets the dialog width. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"fit-content"'}),")"]}),`
`,e.jsx(n.h4,{id:"height",children:"height"}),`
`,e.jsxs(n.p,{children:["Sets the dialog height. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"fit-content"'}),")"]}),`
`,e.jsx(n.h4,{id:"no-outside-close",children:"no-outside-close"}),`
`,e.jsxs(n.p,{children:["Prevents closing the dialog when clicking outside. When enabled, clicking outside triggers a warning bounce animation to indicate the dialog cannot be closed. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"class",children:"class"}),`
`,e.jsxs(n.p,{children:["Adds custom CSS classes to the dialog element, allowing you to override or extend its default styling. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"z-index",children:"z-index"}),`
`,e.jsxs(n.p,{children:["Sets the z-index of the dialog overlay (backdrop). Useful for stacking the dialog above other layered content. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"1002"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the dialog visibility state changes."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"The main content area of the dialog."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Dialog v-model="isOpen">
        Slot: default
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
<\/script>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Uses Teleport to render in document body for proper z-index stacking"}),`
`,e.jsx(n.li,{children:"Includes smooth bounce animations for open/close transitions"}),`
`,e.jsx(n.li,{children:"Supports click-outside-to-close behavior (can be disabled with no-outside-close)"}),`
`,e.jsx(n.li,{children:"When no-outside-close is enabled, shows a warning bounce animation on outside clicks"}),`
`,e.jsx(n.li,{children:"Automatically centers content and handles responsive sizing"}),`
`,e.jsx(n.li,{children:"Built-in overlay component for consistent backdrop behavior"}),`
`,e.jsx(n.li,{children:"Maximum dimensions constrained to viewport with padding for mobile compatibility"}),`
`]})]})}function g(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{g as default};
