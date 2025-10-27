import{j as n}from"./index-DhQHbkge.js";import{useMDXComponents as o}from"./index-D2LXvqQ0.js";import"./_commonjsHelpers-CqkleIqs.js";function s(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{id:"name-toast",children:"Name: toast"}),`
`,n.jsx(e.h2,{id:"function-overview",children:"Function Overview"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Purpose"}),": A programmatic toast notification function that displays temporary messages with various types, positioning options, and action buttons for user feedback and status updates."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Usage"}),": Function-based API - no direct component import needed"]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Import"}),": Import it using inject function ",n.jsx(e.code,{children:"inject('toast')"})]}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
   <button @click="showToast">Show Toast</button>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const toast = inject('toast') as Function

const showToast = () => {
    toast({
        title: 'Success',
        message: 'Your changes have been saved successfully!',
        type: 'success',
        top: true,
        right: true,
        timeout: 3500
    })
}
<\/script>
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"function-api",children:"Function API"}),`
`,n.jsx(e.h4,{id:"toastoptions",children:"toast(options)"}),`
`,n.jsx(e.p,{children:"Displays a toast notification with the specified configuration."}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Parameters"}),": ",n.jsx(e.code,{children:"ToastOptions"})," (required)"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`type ToastOptions = {
  title?: string;          // Toast title text
  message: string;         // Main toast message
  type?: 'info' | 'success' | 'warning' | 'danger' | 'neutral'; // Toast type (default: 'danger')
  top?: boolean;           // Position at top of screen
  bottom?: boolean;        // Position at bottom of screen
  right?: boolean;         // Position at right of screen
  left?: boolean;          // Position at left of screen
  timeout?: number;        // Auto-dismiss time in milliseconds
  buttonLabel?: string;    // Action button text
  action?: () => void;     // Function executed when button is clicked
}
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Returns"}),": ",n.jsx(e.code,{children:"void"})," (fire-and-forget function)"]}),`
`,n.jsx(e.h4,{id:"access-methods",children:"Access Methods"}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Composition API (Recommended)"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`import { inject } from 'vue'
const toast = inject('toast') as Function
`})}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Options API (Legacy)"})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`this.$toast({
    title: 'Notification',
    message: 'Operation completed',
    type: 'info',
    top: true,
    right: true,
    timeout: 3500
})
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"usage-patterns",children:"Usage Patterns"}),`
`,n.jsx(e.h4,{id:"action-button",children:"Action Button"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`const showLowStorageWarning = () => {
    toast({
        title: 'Storage Warning',
        message: 'You are running low on storage space.',
        type: 'warning',
        bottom: true,
        left: true,
        buttonLabel: 'Manage Storage',
        action: () => {
            navigateToStorageSettings()
        },
        timeout: 5000
    })
}
`})}),`
`,n.jsx(e.h4,{id:"positioning-examples",children:"Positioning Examples"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`toast({ message: 'Success!', type: 'success', top: true, right: true })
toast({ message: 'Success!', type: 'success', top: true, left: true })
toast({ message: 'Success!', type: 'success', bottom: true, left: true })
toast({ message: 'Success!', type: 'success', bottom: true, right: true })
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"setup-requirements",children:"Setup Requirements"}),`
`,n.jsx(e.h4,{id:"component-registration",children:"Component Registration"}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"<toast />"})," component must be included ",n.jsx(e.strong,{children:"only once"})," in your application root, preferably in ",n.jsx(e.code,{children:"App.vue"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<!-- App.vue -->
<template>
    <!-- Your app content -->
    <router-view />
    
    <!-- Required for toast notifications - Add only once -->
    <toast />
</template>
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Important"}),": Do not add ",n.jsx(e.code,{children:"<toast />"})," to individual components. It should only be present once in your entire application."]}),`
`,n.jsx(e.h4,{id:"service-injection",children:"Service Injection"}),`
`,n.jsx(e.p,{children:"The toast function is available through Vue's dependency injection system and requires proper setup in your application configuration."}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"event-system",children:"Event System"}),`
`,n.jsx(e.p,{children:"The toast system uses an internal event system to communicate between the function call and the toast component:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Function Call"})," → Triggers ",n.jsx(e.code,{children:"open-toast"})," event"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Auto-dismiss/Manual Close"})," → Triggers ",n.jsx(e.code,{children:"close-toast"})," event"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Action Button Click"})," → Executes provided action function"]}),`
`]}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Important Notes:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Multiple toasts can be displayed simultaneously in different positions"}),`
`,n.jsx(e.li,{children:"Toasts auto-dismiss based on timeout (if specified)"}),`
`,n.jsx(e.li,{children:"Position constraints: use only one vertical (top/bottom) and one horizontal (left/right) position"}),`
`,n.jsxs(e.li,{children:["Requires ",n.jsx(e.code,{children:"<toast />"})," component in application root ",n.jsx(e.strong,{children:"only once"})," (preferably in App.vue)"]}),`
`,n.jsx(e.li,{children:"Uses dependency injection for clean API access"}),`
`,n.jsx(e.li,{children:"Fire-and-forget function - no return value needed"}),`
`,n.jsx(e.li,{children:"Responsive design automatically adjusts toast width on mobile devices"}),`
`]})]})}function a(t={}){const{wrapper:e}={...o(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(s,{...t})}):s(t)}export{a as default};
