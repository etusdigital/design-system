import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as o,C as l,a}from"./index-CbltXMU5.js";import{F as t,P as i,A as c,M as p,I as h,a as u,S as x,D as j}from"./FileUpload.stories-BymHW9Ji.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CjRVAs2g.js";function d(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:t}),`
`,e.jsx(n.h1,{id:"name-fileupload",children:"Name: FileUpload"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A dedicated file upload component with drag-and-drop support, file type restrictions, multiple file selection, and visual feedback for file upload operations."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(l,{of:i}),`
`,e.jsx(a,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <FileUpload 
        v-model="uploadedFile"
        label-value="Upload Document"
        placeholder="Select a file or drag it here"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const uploadedFile = ref<File>()
<\/script>
`})}),`
`,e.jsx(l,{sourceState:"none",of:i}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the uploaded file(s). Type: ",e.jsx(n.code,{children:"File | File[] | undefined"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["The label displayed above the file upload area. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"accept",children:"accept"}),`
`,e.jsxs(n.p,{children:["Specifies the types of files that can be uploaded. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <FileUpload 
        v-model="image"
        label-value="Upload Image"
        accept=".jpg,.jpeg,.png,.gif"
        info-message="Only image files allowed"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const image = ref<File>()
<\/script>
`})}),`
`,e.jsx(l,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"multiple",children:"multiple"}),`
`,e.jsxs(n.p,{children:["Allows multiple file selection. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(l,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"is-error",children:"is-error"}),`
`,e.jsxs(n.p,{children:["Activates error styling mode. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(l,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"error-message",children:"error-message"}),`
`,e.jsxs(n.p,{children:["Error message to display when in error state. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"info-message",children:"info-message"}),`
`,e.jsxs(n.p,{children:["Informational message displayed with tooltip. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(l,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"size",children:"size"}),`
`,e.jsxs(n.p,{children:["File upload component size. Type: ",e.jsx(n.code,{children:"'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'"})," (default: ",e.jsx(n.code,{children:'"medium"'}),")"]}),`
`,e.jsx(l,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables file upload interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(l,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"placeholder",children:"placeholder"}),`
`,e.jsxs(n.p,{children:["Placeholder text for the file upload area. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"or drag and drop it here"'}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when files are selected or uploaded. Receives the File object(s) or undefined when files are removed."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"uploaded-file",children:"#uploaded-file"}),`
`,e.jsx(n.p,{children:"Custom content for displaying uploaded file information. This slot is shown when files are successfully uploaded and allows complete customization of the file display."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Full drag-and-drop support for intuitive file selection"}),`
`,e.jsxs(n.li,{children:["File type restrictions using the ",e.jsx(n.code,{children:"accept"})," attribute (MIME types or file extensions)"]}),`
`,e.jsx(n.li,{children:"Support for single or multiple file uploads"}),`
`,e.jsx(n.li,{children:"Visual feedback during drag operations with blur effect"}),`
`,e.jsxs(n.li,{children:["Customizable file display through the ",e.jsx(n.code,{children:"uploaded-file"})," slot"]}),`
`,e.jsx(n.li,{children:"Responsive sizing options from extra small to full width"}),`
`,e.jsx(n.li,{children:"Built-in accessibility features and keyboard navigation"}),`
`,e.jsx(n.li,{children:"Error handling and visual feedback for upload failures"}),`
`,e.jsx(n.li,{children:"Disabled state support to prevent uploads when needed"}),`
`,e.jsx(n.li,{children:"Clean, modern UI with consistent design system integration"}),`
`]})]})}function S(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(d,{...s})}):d(s)}export{S as default};
