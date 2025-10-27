import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as o,C as i,a as d}from"./index-qxoUpuLt.js";import{P as c,D as t,L as a,a as p,S as h,b as u}from"./PINInput.stories-DB63ssz4.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CEhHUQ6Y.js";function l(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:c}),`
`,e.jsx(n.h1,{id:"name-pin-input",children:"Name: PIN Input"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A specialized input component that allows users to enter a sequence of one-character alphanumeric inputs, commonly used for verification codes, PINs, and OTP entries."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(i,{of:t}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <PINInput 
        v-model="pinValue"
        :length="6"
        @complete="handleComplete"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pinValue = ref('')

const handleComplete = (value: string) => {
    console.log('PIN entered:', value)
}
<\/script>
`})}),`
`,e.jsx(i,{sourceState:"none",of:t}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the PIN input value as a string. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"length",children:"length"}),`
`,e.jsxs(n.p,{children:["Number of input fields to display. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"6"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:a}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables all PIN input fields. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"placeholder",children:"placeholder"}),`
`,e.jsxs(n.p,{children:["Placeholder text for each input field. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"separator",children:"separator"}),`
`,e.jsxs(n.p,{children:["Character or string to display between input fields. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["Input field type - use 'password' to mask the entered values. Type: ",e.jsx(n.code,{children:"'text' | 'password'"})," (default: ",e.jsx(n.code,{children:'"text"'}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"mask",children:"mask"}),`
`,e.jsxs(n.p,{children:["Whether to mask the input values (alternative to password type). Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"otp",children:"otp"}),`
`,e.jsxs(n.p,{children:["Indicates this is an OTP input for accessibility and autocomplete. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the PIN value changes. Receives the complete string value."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<PINInput 
    v-model="pinValue"
    @update:model-value="handleValueChange"
/>
`})}),`
`,e.jsx(n.h4,{id:"complete",children:"@complete"}),`
`,e.jsx(n.p,{children:"Triggered when all PIN fields are filled. Receives the complete string value."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<PINInput 
    :length="6"
    @complete="handleComplete"
/>
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"methods-api",children:"Methods API"}),`
`,e.jsx(n.p,{children:"The component exposes the following methods via template refs:"}),`
`,e.jsx(n.h4,{id:"focus",children:"focus()"}),`
`,e.jsx(n.p,{children:"Focuses the first empty input field, or the first field if all are filled."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <PINInput ref="pinInputRef" v-model="pinValue" />
    <button @click="focusPinInput">Focus PIN Input</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pinInputRef = ref()
const pinValue = ref('')

const focusPinInput = () => {
    pinInputRef.value?.focus()
}
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"clear",children:"clear()"}),`
`,e.jsx(n.p,{children:"Clears all input fields and focuses the first field."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <PINInput ref="pinInputRef" v-model="pinValue" />
    <button @click="clearPinInput">Clear PIN</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pinInputRef = ref()
const pinValue = ref('')

const clearPinInput = () => {
    pinInputRef.value?.clear()
}
<\/script>
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"accessibility-features",children:"Accessibility Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard Navigation"}),": Arrow keys navigate between fields"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Paste Support"}),": Ctrl/Cmd+V distributes pasted content across fields"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Auto Focus"}),": Automatically focuses next field on input"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Backspace Handling"}),": Smart backspace navigation between fields"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Field Selection"}),": Selects field content on focus"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Screen Reader Support"}),": Proper labeling and OTP indication"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"styling--theming",children:"Styling & Theming"}),`
`,e.jsx(n.p,{children:"The PIN Input component uses design system tokens and supports:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus States"}),": Visual feedback when fields are focused"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Filled States"}),": Different styling for completed fields"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Disabled States"}),": Proper disabled appearance and behavior"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Error States"}),": Can be combined with form validation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive Sizing"}),": Adapts to different screen sizes"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Each input field accepts only one character"}),`
`,e.jsx(n.li,{children:"Supports both text and password input types"}),`
`,e.jsx(n.li,{children:"Automatic navigation between fields on input/backspace"}),`
`,e.jsx(n.li,{children:"Paste functionality distributes content across all fields"}),`
`,e.jsx(n.li,{children:"Complete keyboard accessibility with arrow key navigation"}),`
`,e.jsx(n.li,{children:"Optimized for mobile and desktop usage"}),`
`,e.jsx(n.li,{children:"Built-in support for verification codes and OTP workflows"}),`
`]})]})}function P(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(l,{...s})}):l(s)}export{P as default};
