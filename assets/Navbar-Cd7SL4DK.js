import{j as n}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as a,C as t,a as l}from"./index-CCS_Va9-.js";import{N as d,P as o,C as c}from"./Navbar.stories-DsJvAE0c.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-1aJ3cS75.js";function s(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(a,{of:d}),`
`,n.jsx(e.h1,{id:"name-navbar",children:"Name: Navbar"}),`
`,n.jsx(e.h2,{id:"component-overview",children:"Component Overview"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Purpose"}),": A comprehensive navigation bar component with logo area, dropdown menu navigation, notifications system, and user profile integration for application headers."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h3,{id:"playground",children:"Playground"}),`
`,n.jsx(t,{of:o}),`
`,n.jsx(l,{}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <Navbar
        v-model="selectedOption"
        title="My Application"
        :options="navigationOptions"
        :profile="userProfile"
    >
        <template #notifications>
            <div class="p-base max-w-sm">
                <h4 class="font-semibold msm">Recent Activity</h4>
                <div class="space-y-xs">
                    <div class="text-sm">New user registered</div>
                    <div class="text-sm">System backup completed</div>
                    <div class="text-sm">5 new messages</div>
                </div>
            </div>
        </template>
    </Navbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedOption = ref("dashboard")

const userProfile = ref({
    name: "John Doe",
    src: "/avatar.jpg"
})

const navigationOptions = ref([
    {
        label: "Dashboard",
        value: "dashboard",
        icon: "dashboard"
    },
    {
        label: "Analytics",
        value: "analytics", 
        icon: "analytics",
        options: [
            { label: "Reports", value: "reports", icon: "assessment" },
            { label: "Metrics", value: "metrics", icon: "bar_chart" }
        ]
    },
    {
        label: "Settings",
        value: "settings",
        icon: "settings",
        bottom: true
    }
])
<\/script>
`})}),`
`,n.jsx(t,{sourceState:"none",of:o}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"props-api",children:"Props API"}),`
`,n.jsx(e.h4,{id:"v-model",children:"v-model"}),`
`,n.jsxs(e.p,{children:["The currently selected navigation option. Type: ",n.jsx(e.code,{children:"Option"})," (default: ",n.jsx(e.code,{children:"undefined"}),")"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`type Option = {
  label: string;        // Display text for the option
  value: string;        // Unique identifier
  icon?: string;        // Optional icon name
  disabled?: boolean;   // Whether the option is disabled
  bottom?: boolean;     // Whether to display at bottom of menu
  options?: Option[];       // Nested suoptions
}
`})}),`
`,n.jsx(e.h4,{id:"title",children:"title"}),`
`,n.jsxs(e.p,{children:["Title text displayed in the navbar brand area. Type: ",n.jsx(e.code,{children:"string"})," (default: ",n.jsx(e.code,{children:'""'}),")"]}),`
`,n.jsx(e.h4,{id:"options",children:"options"}),`
`,n.jsxs(e.p,{children:["Array of navigation menu options with nested support. Type: ",n.jsx(e.code,{children:"Option[]"})," (default: ",n.jsx(e.code,{children:"undefined"}),")"]}),`
`,n.jsx(e.h4,{id:"profile",children:"profile"}),`
`,n.jsxs(e.p,{children:["User profile information for avatar display. Type: ",n.jsx(e.code,{children:"Profile"})," (default: ",n.jsx(e.code,{children:"undefined"}),")"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`type Profile = {
  name: string;    // User's display name
  src?: string;    // Optional avatar image URL
}
`})}),`
`,n.jsx(e.h4,{id:"label-key",children:"label-key"}),`
`,n.jsxs(e.p,{children:["Property name used for displaying option labels when using object arrays. Type: ",n.jsx(e.code,{children:"string"})," (default: ",n.jsx(e.code,{children:'"label"'}),")"]}),`
`,n.jsx(e.h4,{id:"value-key",children:"value-key"}),`
`,n.jsxs(e.p,{children:["Property name used for option values when using object arrays. Type: ",n.jsx(e.code,{children:"string"})," (default: ",n.jsx(e.code,{children:'"value"'}),")"]}),`
`,n.jsx(e.h4,{id:"get-object",children:"get-object"}),`
`,n.jsxs(e.p,{children:["Returns complete objects instead of just values when enabled. Type: ",n.jsx(e.code,{children:"boolean"})," (default: ",n.jsx(e.code,{children:"false"}),")"]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"events-api",children:"Events API"}),`
`,n.jsx(e.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,n.jsx(e.p,{children:"Triggered when a navigation option is selected. Receives the selected option object."}),`
`,n.jsx(e.h3,{id:"slots-api",children:"Slots API"}),`
`,n.jsx(e.h4,{id:"default",children:"#default"}),`
`,n.jsx(e.p,{children:"Custom navigation content in the center area."}),`
`,n.jsx(e.h4,{id:"logo",children:"#logo"}),`
`,n.jsx(e.p,{children:"Complete replacement for the logo and title area."}),`
`,n.jsx(e.h4,{id:"title-1",children:"#title"}),`
`,n.jsx(e.p,{children:"Custom content for the title area (when using default logo)."}),`
`,n.jsx(e.h4,{id:"actions",children:"#actions"}),`
`,n.jsx(e.p,{children:"Custom content for the right side actions area."}),`
`,n.jsx(e.h4,{id:"notifications",children:"#notifications"}),`
`,n.jsx(e.p,{children:"Content displayed in the notifications dropdown panel."}),`
`,n.jsx(t,{sourceState:"none",of:c}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Important Notes:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Built-in notification system with customizable dropdown content and positioning"}),`
`,n.jsx(e.li,{children:"Dropdown menu integration with Dropdown component for navigation hierarchy"}),`
`,n.jsx(e.li,{children:"User profile avatar display with Avatar component integration"}),`
`,n.jsx(e.li,{children:"Flexible slot system allows complete customization of logo, navigation, and actions"}),`
`,n.jsx(e.li,{children:"Responsive design adapts to different screen sizes and layouts"}),`
`,n.jsx(e.li,{children:"Dynamic positioning system for notifications dropdown prevents viewport overflow"}),`
`,n.jsx(e.li,{children:"Smooth transitions and animations for enhanced user experience"}),`
`,n.jsx(e.li,{children:"Keyboard navigation support for accessibility compliance"}),`
`,n.jsx(e.li,{children:"Z-index management ensures proper layering over page content"}),`
`,n.jsx(e.li,{children:"Support for nested navigation options with unlimited depth"}),`
`,n.jsx(e.li,{children:"Bottom-aligned menu options for logout/settings functionality"}),`
`]})]})}function v(i={}){const{wrapper:e}={...r(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(s,{...i})}):s(i)}export{v as default};
