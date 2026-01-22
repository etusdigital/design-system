import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as a}from"./index-D2LXvqQ0.js";import{M as l,C as s,a as r}from"./index-DMV-UF4P.js";import{A as c,P as i,T as d,S as h,I as p,E as x,C as m,H as u}from"./Alert.stories-sjmD7gcm.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-D9ZodyF1.js";function o(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c}),`
`,e.jsx(n.h1,{id:"name-alert",children:"Name: Alert"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A flexible alert component for displaying important messages with different types, sizes, and interactive features like expandable content and close buttons."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:i}),`
`,e.jsx(r,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Alert 
        title="Demo Title" 
        message="Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies."
    />
</template>
`})}),`
`,e.jsx(s,{sourceState:"none",of:i}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"title",children:"title"}),`
`,e.jsxs(n.p,{children:["The alert title displayed prominently. Type: ",e.jsx(n.code,{children:"string"})," (optional)"]}),`
`,e.jsx(n.h4,{id:"message",children:"message"}),`
`,e.jsxs(n.p,{children:["The main alert message content. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["Visual style and semantic meaning of the alert. Type: ",e.jsx(n.code,{children:'"info" | "success" | "warning" | "danger" | "neutral"'})," (default: ",e.jsx(n.code,{children:'"info"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:d}),`
`,e.jsx(n.h4,{id:"size",children:"size"}),`
`,e.jsxs(n.p,{children:["Controls the alert dimensions and text sizes. Type: ",e.jsx(n.code,{children:'"small" | "medium" | "large"'})," (default: ",e.jsx(n.code,{children:'"medium"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"icon",children:"icon"}),`
`,e.jsxs(n.p,{children:["Custom icon name to override the default type icon. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"icon-position",children:"icon-position"}),`
`,e.jsxs(n.p,{children:["Position of the icon relative to content. Type: ",e.jsx(n.code,{children:'"start" | "center" | "end"'})," (default: ",e.jsx(n.code,{children:'"start"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"expandable",children:"expandable"}),`
`,e.jsxs(n.p,{children:["Makes the alert expandable to show/hide full message. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"closable",children:"closable"}),`
`,e.jsxs(n.p,{children:["Adds a close button to dismiss the alert. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:m}),`
`,e.jsx(n.h4,{id:"hide-icon",children:"hide-icon"}),`
`,e.jsxs(n.p,{children:["Hides the alert icon completely. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:u}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"close",children:"@close"}),`
`,e.jsxs(n.p,{children:["Triggered when the close button is clicked (only when ",e.jsx(n.code,{children:"closable"})," is true)."]}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"Replaces the entire content area (title and message). Useful for custom layouts."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Alert type="success">
        <div class="flex flex-col gap-sm">
            <h3 class="font-bold text-lg">Custom Content</h3>
            <p>You can put any custom content here instead of using title and message props.</p>
            <div class="flex gap-sm">
                <button size="small">Action 1</button>
                <button size="small" variant="secondary">Action 2</button>
            </div>
        </div>
    </Alert>
</template>
`})}),`
`,e.jsx(n.h4,{id:"actions",children:"#actions"}),`
`,e.jsx(n.p,{children:"Replaces the default action area (expand/close buttons). Useful for custom actions."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Alert 
        title="Custom Actions" 
        message="This alert has custom action buttons."
        type="warning"
    >
        <template #actions>
            <div class="flex gap-xs">
                <button size="small" variant="plain">
                    <icon name="refresh" />
                </button>
                <button size="small" variant="plain">
                    <icon name="share" />
                </button>
                <button size="small" variant="plain">
                    <icon name="close" />
                </button>
            </div>
        </template>
    </Alert>
</template>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Default icons are automatically assigned based on alert type"}),`
`,e.jsx(n.li,{children:"Component automatically handles height transitions for expandable content"}),`
`,e.jsx(n.li,{children:"Use meaningful types that match the semantic meaning of your message"}),`
`,e.jsx(n.li,{children:"Consider accessibility when using custom icons or colors"}),`
`]})]})}function T(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{T as default};
