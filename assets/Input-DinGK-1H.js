import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as t}from"./index-D2LXvqQ0.js";import{M as d,C as i,a as l}from"./index-DMV-UF4P.js";import{I as c,P as r,T as a,M as p,a as h,b as u,D as x,R as j,c as m}from"./Input.stories-HX4CknYE.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-D9ZodyF1.js";function o(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:c}),`
`,e.jsx(n.h1,{id:"name-input",children:"Name: Input"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A comprehensive input component with multiple types, validation, masking, file upload, and extensive customization options for form data collection."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(i,{of:r}),`
`,e.jsx(l,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Input 
        v-model="inputValue"
        label-value="label"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
<\/script>
`})}),`
`,e.jsx(i,{sourceState:"none",of:r}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the input value. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["The label displayed above the input. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["Input type determining behavior and validation. Type: ",e.jsx(n.code,{children:"'text' | 'number' | 'search' | 'color' | 'password' | 'file' | 'email'"})," (default: ",e.jsx(n.code,{children:'"text"'}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:a}),`
`,e.jsx(n.h4,{id:"mask",children:"mask"}),`
`,e.jsxs(n.p,{children:["Input mask for automatic formatting. Type: ",e.jsx(n.code,{children:"'cpf' | 'cnpj' | 'cep' | 'domain' | 'url'"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"max",children:"max"}),`
`,e.jsxs(n.p,{children:["Maximum value for numbers or character limit for text. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"min",children:"min"}),`
`,e.jsxs(n.p,{children:["Minimum value for number inputs. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"step",children:"step"}),`
`,e.jsxs(n.p,{children:["Increment/decrement step for number inputs. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"1"}),")"]}),`
`,e.jsx(n.h4,{id:"is-error",children:"is-error"}),`
`,e.jsxs(n.p,{children:["Activates error styling mode. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"error-message",children:"error-message"}),`
`,e.jsxs(n.p,{children:["Error message to display when in error state. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"info-message",children:"info-message"}),`
`,e.jsxs(n.p,{children:["Informational message displayed with tooltip. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables input interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"required",children:"required"}),`
`,e.jsxs(n.p,{children:["Marks the field as required. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"placeholder",children:"placeholder"}),`
`,e.jsxs(n.p,{children:["Placeholder text for the input. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"text-align",children:"text-align"}),`
`,e.jsxs(n.p,{children:["Text alignment within input. Type: ",e.jsx(n.code,{children:"'left' | 'center' | 'right'"})," (default: ",e.jsx(n.code,{children:'"start"'}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:m}),`
`,e.jsx(n.h4,{id:"tooltip-min-width",children:"tooltip-min-width"}),`
`,e.jsxs(n.p,{children:["Minimum width for info tooltip. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"none"'}),")"]}),`
`,e.jsx(n.h4,{id:"icon",children:"icon"}),`
`,e.jsxs(n.p,{children:["Icon name to display in input. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"append-icon",children:"append-icon"}),`
`,e.jsxs(n.p,{children:["Position icon at end of input. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the input value changes."}),`
`,e.jsx(n.h4,{id:"focus",children:"@focus"}),`
`,e.jsx(n.p,{children:"Triggered when the input gains focus. Receives the current value."}),`
`,e.jsx(n.h4,{id:"blur",children:"@blur"}),`
`,e.jsx(n.p,{children:"Triggered when the input loses focus. Receives the current value."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"icon-slot",children:"#icon-slot"}),`
`,e.jsx(n.p,{children:"Custom icon content for prepended (left-side) icons. This slot allows you to override the default prepend icon with custom content and behavior."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Input 
        v-model="inputValue" 
        label-value="Search" 
        icon="search"
        placeholder="Enter search term"
    >
        <template #icon-slot>
            <icon 
                name="search" 
                class="side-icon text-primary-interaction-default cursor-pointer hover:text-primary-foreground-low" 
                @click="performSearch" 
            />
        </template>
    </Input>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')

const performSearch = () => {}
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"appended-icon-slot",children:"#appended-icon-slot"}),`
`,e.jsxs(n.p,{children:["Custom icon content specifically for appended (right-side) icons. This slot is independent of the ",e.jsx(n.code,{children:"appendIcon"})," prop and allows full control over appended icon behavior."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Input 
        v-model="passwordValue" 
        type="password"
        label-value="Password" 
        placeholder="Enter your password"
    >
        <template #appended-icon-slot>
            <icon 
                :name="showPassword ? 'visibility_off' : 'visibility'" 
                class="side-icon cursor-pointer text-neutral-interaction-default hover:text-primary-foreground-low" 
                @click="togglePassword" 
            />
        </template>
    </Input>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const passwordValue = ref('')
const showPassword = ref(false)

const togglePassword = () => {}
<\/script>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Supports multiple input types with appropriate validation and behavior"}),`
`,e.jsx(n.li,{children:"Built-in masking for common formats (CPF, CNPJ, CEP, domain, URL)"}),`
`,e.jsx(n.li,{children:"Automatic validation for email, domain, and URL types"}),`
`,e.jsx(n.li,{children:"File upload with drag-and-drop support and custom preview slots"}),`
`,e.jsx(n.li,{children:"Number inputs include increment/decrement controls and min/max validation"}),`
`,e.jsx(n.li,{children:"Comprehensive error handling and visual feedback"}),`
`,e.jsx(n.li,{children:"Icon support with flexible positioning (prepend or append)"}),`
`,e.jsx(n.li,{children:"Responsive sizing options from extra small to full width"}),`
`,e.jsx(n.li,{children:"Built-in accessibility features and keyboard navigation"}),`
`]})]})}function P(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{P as default};
