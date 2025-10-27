import{j as n}from"./index-DhQHbkge.js";import{useMDXComponents as s}from"./index-D2LXvqQ0.js";import"./_commonjsHelpers-CqkleIqs.js";function c(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"name-confirm",children:"Name: confirm"}),`
`,n.jsx(e.h2,{id:"function-overview",children:"Function Overview"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Purpose"}),": A programmatic confirmation dialog function that displays modal dialogs for user confirmation, returning a promise that resolves based on user interaction for critical action validation."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Usage"}),": Function-based API - no direct component import needed"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Import"}),": Import it using inject function ",n.jsx(e.code,{children:"inject('confirm')"})]}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
   <button @click="handleDelete">Delete Item</button>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const confirm = inject('confirm') as Function

const handleDelete = async () => {
    const result = await confirm({
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete this item? This action cannot be undone.',
        acceptLabel: 'Delete',
        cancelLabel: 'Cancel'
    })
    
    if (result) {
        console.log('Item deleted')
    }
}
<\/script>
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"function-api",children:"Function API"}),`
`,n.jsx(e.h4,{id:"confirmoptions",children:"confirm(options)"}),`
`,n.jsx(e.p,{children:"Displays a confirmation dialog and returns a promise that resolves to a boolean."}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Parameters"}),": ",n.jsx(e.code,{children:"ConfirmOptions"})," (required)"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`type ConfirmOptions = {
  title?: string;      // Dialog title text
  message: string;     // Main confirmation message
  acceptLabel: string;  // Accept button label
  cancelLabel: string;  // Cancel button label
}
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Returns"}),": ",n.jsx(e.code,{children:"Promise<boolean>"})]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"true"})," when user clicks accept button"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"false"})," when user clicks cancel button or closes dialog"]}),`
`]}),`
`,n.jsx(e.h4,{id:"access-methods",children:"Access Methods"}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Composition API (Recommended)"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`import { inject } from 'vue'
const confirm = inject('confirm') as Function
`})}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Options API (Legacy)"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`this.$confirm({
    title: 'Confirmation',
    message: 'Proceed with action?',
    acceptLabel: 'Yes',
    cancelLabel: 'No'
})
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"usage-patterns",children:"Usage Patterns"}),`
`,n.jsx(e.h4,{id:"asyncawait-pattern",children:"Async/Await Pattern"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`const handleCriticalAction = async () => {
    const confirmed = await confirm({
        title: 'Critical Action',
        message: 'This will permanently delete all data. Continue?',
        acceptLabel: 'Yes, Delete All',
        cancelLabel: 'Cancel'
    })
    
    if (confirmed) {
        await performCriticalAction()
    }
}
`})}),`
`,n.jsx(e.h4,{id:"promise-chain-pattern",children:"Promise Chain Pattern"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`const handleAction = () => {
    confirm({
        message: 'Save changes before leaving?',
        acceptLabel: 'Save',
        cancelLabel: 'Discard'
    }).then((result) => {
        if (result) {
            saveChanges()
        }
        navigateAway()
    })
}
`})}),`
`,n.jsx(e.h3,{id:"setup-requirements",children:"Setup Requirements"}),`
`,n.jsx(e.h4,{id:"component-registration",children:"Component Registration"}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"<confirm />"})," component must be included ",n.jsx(e.strong,{children:"only once"})," in your application root, preferably in ",n.jsx(e.code,{children:"App.vue"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<!-- App.vue -->
<template>
    <!-- Your app content -->
    <router-view />
    
    <!-- Required for confirm dialogs - Add only once -->
    <confirm />
</template>
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Important"}),": Do not add ",n.jsx(e.code,{children:"<confirm />"})," to individual components. It should only be present once in your entire application."]}),`
`,n.jsx(e.h4,{id:"service-injection",children:"Service Injection"}),`
`,n.jsx(e.p,{children:"The confirm function is available through Vue's dependency injection system and requires proper setup in your application configuration."}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"event-system",children:"Event System"}),`
`,n.jsx(e.p,{children:"The confirm dialog uses an internal event system to communicate between the function call and the dialog component:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Function Call"})," → Triggers ",n.jsx(e.code,{children:"open-confirm"})," event"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"User Action"})," → Triggers ",n.jsx(e.code,{children:"confirm"})," or ",n.jsx(e.code,{children:"cancel"})," events"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Promise Resolution"})," → Based on user choice"]}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Important Notes:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Returns ",n.jsx(e.code,{children:"Promise<boolean>"})," for easy async/await usage"]}),`
`,n.jsx(e.li,{children:"Modal dialog prevents outside clicks when active"}),`
`,n.jsx(e.li,{children:"Only one confirmation dialog can be active at a time"}),`
`,n.jsxs(e.li,{children:["Requires ",n.jsx(e.code,{children:"<confirm />"})," component in application root ",n.jsx(e.strong,{children:"only once"})," (preferably in App.vue)"]}),`
`,n.jsx(e.li,{children:"Uses dependency injection for clean API access"}),`
`,n.jsx(e.li,{children:"Handles both accept and cancel scenarios gracefully"}),`
`,n.jsx(e.li,{children:"No direct component props - all configuration through function parameters"}),`
`]})]})}function l(i={}){const{wrapper:e}={...s(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(c,{...i})}):c(i)}export{l as default};
