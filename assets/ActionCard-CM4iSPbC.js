import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as a}from"./index-D2LXvqQ0.js";import{M as d,C as r,a as c}from"./index-CbltXMU5.js";import{A as o,P as i,H as l,C as h}from"./ActionCard.stories-Cr2qErGL.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CjRVAs2g.js";function s(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:o}),`
`,e.jsx(n.h1,{id:"name-actioncard",children:"Name: ActionCard"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": An interactive card component with drag-and-drop functionality, customizable header styling, and integrated delete actions for creating dynamic content management interfaces."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(r,{of:i}),`
`,e.jsx(c,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <ActionCard 
        icon="send"
        @delete="handleDelete"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
    >
        Label
    </ActionCard>
</template>

<script setup lang="ts">
const handleDelete = () => {}
const handleDragStart = (event) => {}
const handleDragEnd = (event) => {}
<\/script>
`})}),`
`,e.jsx(r,{sourceState:"none",of:i}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"icon",children:"icon"}),`
`,e.jsxs(n.p,{children:["Icon displayed in the card header. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"color",children:"color"}),`
`,e.jsxs(n.p,{children:["Background color for the card header. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"hide-drag",children:"hide-drag"}),`
`,e.jsxs(n.p,{children:["Hides the drag handle icon when enabled. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(r,{sourceState:"none",of:l}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"dragstart",children:"@dragstart"}),`
`,e.jsx(n.p,{children:"Triggered when the user starts dragging the drag handle. Receives the drag event."}),`
`,e.jsx(n.h4,{id:"dragging",children:"@dragging"}),`
`,e.jsx(n.p,{children:"Triggered continuously while the user is dragging. Receives the current drag event."}),`
`,e.jsx(n.h4,{id:"dragend",children:"@dragend"}),`
`,e.jsx(n.p,{children:"Triggered when the user stops dragging. Receives the final drag event."}),`
`,e.jsx(n.h4,{id:"delete",children:"@delete"}),`
`,e.jsx(n.p,{children:"Triggered when the delete icon is clicked."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"Content displayed as the card title in the header section."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <ActionCard icon="settings">
        Slot: default
    </ActionCard>
</template>
`})}),`
`,e.jsx(n.h4,{id:"card",children:"#card"}),`
`,e.jsx(n.p,{children:"Main content area of the card, displayed below the header."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <ActionCard icon="mail">
        <div class="flex justify-between items-center text-white w-full">
            <div class="flex flex-col text-sm">
                <p>Send Message:</p>
                <p class="font-bold">cartaofeito-d-fluxo-cc-dia-05-e12</p>
            </div>
            <icon class="cursor-pointer" name="visibility" />
        </div>
        <template #card>
        <div class="flex flex-col gap-sm">
            <div class="flex flex-col gap-xxs">
                <h4 class="text-neutral-foreground-high text-sm font-bold">Subject: %Email Subject%</h4>
                <p class="text-xs text-neutral-foreground-high">Links: <a class="lowercase cursor-pointer">https://cartaofeito.com/cartao-santander-sx-p1/</a></p>
            </div>
            <div class="flex gap-xs overflow-x-auto max-w-full p-xxs">
                <metric-card icon="science" title="Sample" type="dashed" color="info" value="10%" />
                <metric-card icon="drafts" title="Open" value="50%" description="100.000.000" />
                <metric-card icon="arrow_selector_tool" title="Click" value="34%" description="68.000.000" type="success" />
                <metric-card icon="touch_app" title="CTOR" value="15%" />
            </div>
            <div class="flex justify-between items-center">
                <div class="flex gap-xxs items-center text-neutral-foreground-high">
                    <icon name="mail" class="small-icon" />
                    <p class="text-sm font-bold">Total delivered: 200.000.000</p>
                </div>
                <button size="small">More statistics</button>
            </div>
        </div>
        </template>
    </ActionCard>
</template>

<style scoped>
.icon.small-icon {
    @apply text-xl;
}
</style>
`})}),`
`,e.jsx(r,{sourceState:"none",of:h}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Touch and mouse event support for drag operations on both desktop and mobile devices"}),`
`,e.jsx(n.li,{children:"Automatic cursor state management (grab/grabbing) during drag interactions"}),`
`,e.jsx(n.li,{children:"Hover effects with scale transformation and icon color changes for better user feedback"}),`
`,e.jsx(n.li,{children:"Event cleanup on component unmount prevents memory leaks from global event listeners"}),`
`,e.jsx(n.li,{children:"Flexible header styling with custom color support and icon integration"}),`
`,e.jsx(n.li,{children:"Card structure built on Card component for consistent design system integration"}),`
`,e.jsx(n.li,{children:"Delete functionality with clear visual indicator and click handling"}),`
`,e.jsx(n.li,{children:"Responsive design adapts to different screen sizes and touch interfaces"}),`
`]})]})}function b(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{b as default};
