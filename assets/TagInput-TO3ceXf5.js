import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as l}from"./index-D2LXvqQ0.js";import{M as r,C as s,a as o}from"./index-CbltXMU5.js";import{T as d,P as t,I as c,a as p,D as h,R as u,A as x,M as m}from"./TagInput.stories-2jHhq0Jp.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CjRVAs2g.js";function a(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(n.h1,{id:"name-taginput",children:"Name: TagInput"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": An interactive input component for creating and managing multiple tags with validation, duplicate prevention, masking support, and flexible constraints for collecting structured data entries."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:t}),`
`,e.jsx(o,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <TagInput 
        v-model="tags"
        label-value="label"
    >
        <template #hint-message>
            Press enter to add a new tag
        </template>
    </TagInput>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref([])
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:t}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the array of tag values. Type: ",e.jsx(n.code,{children:"any[]"})," (required)"]}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["The label displayed above the input field. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"placeholder",children:"placeholder"}),`
`,e.jsxs(n.p,{children:["Placeholder text shown in the input area. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"is-error",children:"is-error"}),`
`,e.jsxs(n.p,{children:["Activates error styling mode. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"error-message",children:"error-message"}),`
`,e.jsxs(n.p,{children:["Error message to display when in error state. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"info-message",children:"info-message"}),`
`,e.jsxs(n.p,{children:["Informational message displayed with tooltip. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the input interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"required",children:"required"}),`
`,e.jsxs(n.p,{children:["Marks the field as required. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"allow-duplicate",children:"allow-duplicate"}),`
`,e.jsxs(n.p,{children:["Allows duplicate tag values when enabled. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"max",children:"max"}),`
`,e.jsxs(n.p,{children:["Maximum number of tags allowed. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:m}),`
`,e.jsx(n.h4,{id:"mask",children:"mask"}),`
`,e.jsxs(n.p,{children:["Input validation mask for specific data formats. Type: ",e.jsx(n.code,{children:'"cpf" | "cnpj" | "cep" | "domain" | "url" | "email"'})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"icon",children:"icon"}),`
`,e.jsxs(n.p,{children:["Icon name to display in input. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"append-icon",children:"append-icon"}),`
`,e.jsxs(n.p,{children:["Position icon at end of input. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the tag array changes (addition or removal). Receives the updated array."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"hint-message",children:"#hint-message"}),`
`,e.jsx(n.p,{children:"Custom informational text displayed below the input area."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <TagInput v-model="tags" label-value="label">
        <template #hint-message>
            Press enter to add a new tag
        </template>
    </TagInput>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref([])
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"icon-slot",children:"#icon-slot"}),`
`,e.jsx(n.p,{children:"Custom icon content for prepended (left-side) icons. This slot allows you to override the default prepend icon with custom content and behavior."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <TagInput 
        v-model="inputValue" 
        label-value="label" 
    >
        <template #icon-slot>
            <icon 
                name="plus" 
                class="side-icon cursor-pointer text-neutral-interaction-default hover:text-primary-foreground-low" 
                @click="handleCreate" 
            />
        </template>
    </TagInput >
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')

const handleCreate = () => {}
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"appended-icon-slot",children:"#appended-icon-slot"}),`
`,e.jsxs(n.p,{children:["Custom icon content specifically for appended (right-side) icons. This slot is independent of the ",e.jsx(n.code,{children:"appendIcon"})," prop and allows full control over appended icon behavior."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <TagInput
        v-model="inputValue" 
        label-value="label" 
    >
        <template #appended-icon-slot>
            <icon 
                name="plus" 
                class="side-icon cursor-pointer text-neutral-interaction-default hover:text-primary-foreground-low" 
                @click="handleCreate" 
            />
        </template>
    </TagInput >
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')

const handleCreate = () => {}
<\/script>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Support for multiple input methods: Enter key, Tab key, comma separation, and line breaks"}),`
`,e.jsx(n.li,{children:"Built-in validation for email, domain, URL, CPF, CNPJ, and CEP formats when using masks"}),`
`,e.jsx(n.li,{children:"Automatic duplicate detection and prevention (configurable via allow-duplicate)"}),`
`,e.jsx(n.li,{children:"Visual feedback with error animations and color-coded states"}),`
`,e.jsx(n.li,{children:"Tag tooltips show full content for long values with text wrapping"}),`
`,e.jsx(n.li,{children:"Maximum tag limit with visual counter display"}),`
`,e.jsx(n.li,{children:"Backspace key removes last tag when input is empty"}),`
`,e.jsx(n.li,{children:"Real-time error messaging with auto-dismiss functionality"}),`
`,e.jsx(n.li,{children:"Accessible keyboard navigation and focus management"}),`
`,e.jsx(n.li,{children:"Responsive design adapts to container width with tag wrapping"}),`
`]})]})}function I(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}export{I as default};
