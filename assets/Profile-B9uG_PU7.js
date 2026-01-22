import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as c,C as o,a as l}from"./index-DN5oYWrE.js";import{P as d,a as t,A as a,D as p,O as h}from"./Profile.stories-BRJhxzCQ.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-oiXQscte.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:d}),`
`,e.jsx(n.h1,{id:"name-profile",children:"Name: Profile"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A user profile dropdown component with account switching capabilities, profile management actions, and customizable content areas for user authentication workflows."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(o,{of:t}),`
`,e.jsx(l,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Profile
        v-model="selectedAccount"
        :name="currentUser.name"
        :picture="currentUser.picture"
        :options="userAccounts"
        @logout="handleLogout"
        @edit="editProfile"
        @edit-option="editAccount"
        @privacy-policy-function="openPrivacyPolicy"
        @terms-of-use-fucntion="openTermsOfUse"
    >
        <template #edit-slot>
            Edit profile
        </template>
        <template #edit-option>
            Edit account
        </template>
        <template #logout-slot>
            Logout
        </template>
        <template #privacy-policy>
            Privacy Policy
        </template>
        <template #terms-of-use>
            Terms Of Use
        </template>
    </Profile>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedAccount = ref(...)
const currentUser = ref(...)
const userAccounts = ref([...])

const handleLogout = () => {}
const editProfile = () => {}
const editAccount = () => {}
const openPrivacyPolicy = () => {}
const openTermsOfUse = () => {}
<\/script>
`})}),`
`,e.jsx(o,{sourceState:"none",of:t}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["The currently selected account/profile option. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"name",children:"name"}),`
`,e.jsxs(n.p,{children:["The main user name displayed in the profile. Type: ",e.jsx(n.code,{children:"string"})," (required)"]}),`
`,e.jsx(n.h4,{id:"picture",children:"picture"}),`
`,e.jsxs(n.p,{children:["URL of the user's profile picture image. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of account options for multi-account selection. Type: ",e.jsx(n.code,{children:"any[]"})," (default: ",e.jsx(n.code,{children:"[]"}),")"]}),`
`,e.jsx(n.h4,{id:"label-key",children:"label-key"}),`
`,e.jsxs(n.p,{children:["Property name for option labels in the options array. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"label"'}),")"]}),`
`,e.jsx(n.h4,{id:"value-key",children:"value-key"}),`
`,e.jsxs(n.p,{children:["Property name for option values in the options array. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"value"'}),")"]}),`
`,e.jsx(n.h4,{id:"absolute",children:"absolute"}),`
`,e.jsxs(n.p,{children:["Controls absolute positioning of the dropdown. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(o,{sourceState:"none",of:a}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the profile interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(o,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"get-object",children:"get-object"}),`
`,e.jsxs(n.p,{children:["Returns complete objects instead of just values when enabled. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when an account is selected. Receives the selected value or object."}),`
`,e.jsx(n.h4,{id:"logout",children:"@logout"}),`
`,e.jsx(n.p,{children:"Triggered when the logout action is clicked."}),`
`,e.jsx(n.h4,{id:"edit",children:"@edit"}),`
`,e.jsx(n.p,{children:"Triggered when the edit profile action is clicked."}),`
`,e.jsx(n.h4,{id:"edit-option",children:"@edit-option"}),`
`,e.jsx(n.p,{children:"Triggered when the edit account action is clicked."}),`
`,e.jsx(n.h4,{id:"privacy-policy-function",children:"@privacy-policy-function"}),`
`,e.jsx(n.p,{children:"Triggered when the privacy policy link is clicked."}),`
`,e.jsx(n.h4,{id:"terms-of-use-fucntion",children:"@terms-of-use-fucntion"}),`
`,e.jsx(n.p,{children:"Triggered when the terms of use link is clicked."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"edit-slot",children:"#edit-slot"}),`
`,e.jsx(n.p,{children:"Custom content for the edit profile button."}),`
`,e.jsx(n.h4,{id:"edit-option-1",children:"#edit-option"}),`
`,e.jsx(n.p,{children:"Custom content for the edit account button."}),`
`,e.jsx(n.h4,{id:"logout-slot",children:"#logout-slot"}),`
`,e.jsx(n.p,{children:"Custom content for the logout button."}),`
`,e.jsx(n.h4,{id:"option",children:"#option"}),`
`,e.jsx(n.p,{children:"Custom rendering for account selection options."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Profile
        v-model="selectedAccount"
        :name="userName"
        :options="accounts"
    >
        ...
        <template #option="{ option, index, active }">
            <div class="flex items-center gap-xs">
                <icon name="account_circle" />
                <span :class="{'underline': active }">{{ option.label }}</span>
            </div>
        </template>
    </Profile>
</template>
`})}),`
`,e.jsx(o,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"privacy-policy",children:"#privacy-policy"}),`
`,e.jsx(n.p,{children:"Custom content for the privacy policy link."}),`
`,e.jsx(n.h4,{id:"terms-of-use",children:"#terms-of-use"}),`
`,e.jsx(n.p,{children:"Custom content for the terms of use link."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Built on top of SelectContainer for consistent dropdown behavior and styling"}),`
`,e.jsx(n.li,{children:"Integrated search functionality for filtering through multiple accounts when available"}),`
`,e.jsx(n.li,{children:"Profile picture support with fallback to default icon when no image is provided"}),`
`,e.jsx(n.li,{children:"Flexible account/profile switching with support for both simple values and complex objects"}),`
`,e.jsx(n.li,{children:"Customizable action buttons for profile management, account editing, and logout functionality"}),`
`,e.jsx(n.li,{children:"Built-in privacy policy and terms of use links with customizable content and actions"}),`
`,e.jsx(n.li,{children:"Slot-based architecture allows complete customization of account list options and action buttons"}),`
`,e.jsx(n.li,{children:"Responsive dropdown positioning prevents viewport overflow issues"}),`
`,e.jsx(n.li,{children:"Keyboard navigation support for accessibility compliance"}),`
`,e.jsx(n.li,{children:"Event-driven architecture enables integration with authentication and user management systems"}),`
`,e.jsx(n.li,{children:"Support for disabled state to prevent interaction during loading or unauthorized access"}),`
`,e.jsx(n.li,{children:"Absolute positioning option for complex layout scenarios"}),`
`,e.jsx(n.li,{children:"Search functionality helps users quickly find specific accounts in long lists"}),`
`,e.jsx(n.li,{children:"Professional styling suitable for both consumer and enterprise applications"}),`
`]})]})}function b(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{b as default};
