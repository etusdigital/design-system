import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as o}from"./index-D2LXvqQ0.js";import{M as l,C as r,a as d}from"./index-CCS_Va9-.js";import{S as c,P as t,a,D as p,A as h,V as j}from"./Stepper.stories-Bx23MCDm.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-1aJ3cS75.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c}),`
`,e.jsx(n.h1,{id:"name-stepper",children:"Name: Stepper"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A multi-step navigation component with two visual styles, progress tracking, and customizable step validation for creating guided workflows and multi-step forms."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(r,{of:t}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Stepper 
        v-model="currentStep"
        :options="steps"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentStep = ref(...)
const steps = ref([...])
<\/script>
`})}),`
`,e.jsx(r,{sourceState:"none",of:t}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the currently active step. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of step options that can be strings or objects. Type: ",e.jsx(n.code,{children:"any[]"})," (required)"]}),`
`,e.jsx(n.h4,{id:"label-key",children:"label-key"}),`
`,e.jsxs(n.p,{children:["Property name used for displaying option labels when using object arrays. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"label"'}),")"]}),`
`,e.jsx(n.h4,{id:"value-key",children:"value-key"}),`
`,e.jsxs(n.p,{children:["Property name used for option values when using object arrays. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"value"'}),")"]}),`
`,e.jsx(n.h4,{id:"size",children:"size"}),`
`,e.jsxs(n.p,{children:["Controls the stepper size variant. Type: ",e.jsx(n.code,{children:"'medium' | 'large'"})," (default: ",e.jsx(n.code,{children:"'medium'"}),")"]}),`
`,e.jsx(r,{sourceState:"none",of:a}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables step navigation when true. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(r,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"allowed-skip",children:"allowed-skip"}),`
`,e.jsxs(n.p,{children:["Allows users to skip steps and jump to any step. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(r,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"background",children:"background"}),`
`,e.jsxs(n.p,{children:["Custom background color for the stepper. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"var(--neutral-background-default)"'}),")"]}),`
`,e.jsx(n.h4,{id:"version",children:"version"}),`
`,e.jsxs(n.p,{children:["Stepper visual style version. Type: ",e.jsx(n.code,{children:"1 | 2"})," (default: ",e.jsx(n.code,{children:"1"}),")"]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Version Differences:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Version 1"}),": Horizontal breadcrumstyle with arrow connectors"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Version 2"}),": Circular steps with icons and connecting lines"]}),`
`]}),`
`,e.jsx(r,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"get-object",children:"get-object"}),`
`,e.jsxs(n.p,{children:["Returns the complete option object instead of just the value when true. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the active step changes (v-model). Receives the new step value."}),`
`,e.jsx(n.h4,{id:"change-step",children:"@change-step"}),`
`,e.jsx(n.p,{children:"Triggered when any step interaction occurs. Receives the step option and index."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Stepper 
        v-model="currentStep"
        :options="steps"
        disabled
        @change-step="handleStepChange"
    />
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'

const toast = inject("toast") as Function;

const currentStep = ref(...)
const steps = ref([...])
const attr = ref(...)

const handleStepChange = (option, index) => {
    if (!isValid()) {
        toast({...})
        return
    }

    if (index != steps.length - 1) currentStep = steps[index + 1]
    else save()
}

const isValid = () => {}
const save = () => {}
<\/script>
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsxs(n.p,{children:["This component doesn't expose custom slots. Content is controlled through the ",e.jsx(n.code,{children:"options"})," prop."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Automatically tracks step progression and prevents skipping unless ",e.jsx(n.code,{children:"allowed-skip"})," is enabled"]}),`
`,e.jsxs(n.li,{children:["Version 2 requires objects with ",e.jsx(n.code,{children:"icon"})," property for proper display"]}),`
`,e.jsx(n.li,{children:"Step validation prevents users from jumping ahead unless explicitly allowed"}),`
`,e.jsx(n.li,{children:"Custom background colors apply to button backgrounds and maintain visual consistency"}),`
`,e.jsx(n.li,{children:"Progress tracking persists even when users navigate backwards"}),`
`,e.jsx(n.li,{children:"Component automatically initializes to first step if no model value is provided"}),`
`]})]})}function w(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{w as default};
