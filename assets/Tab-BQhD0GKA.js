import{j as e}from"./iframe-B-lFfRna.js";import{useMDXComponents as l}from"./index-DVi8v7aE.js";import{M as o,C as i,a as c}from"./index-B580fxRg.js";import{T as d,P as t,O as a,I as h,N as j}from"./Tab.stories-Cd-XNfwx.js";import"./preload-helper-PPVm8Dsz.js";function r(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:d}),`
`,e.jsx(n.h1,{id:"name-tab",children:"Name: Tab"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A tab navigation component with support for text and icon modes, flexible sizing, and card or plain styling variants for organizing content sections."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(i,{of:t}),`
`,e.jsx(c,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.h4,{id:"string-array",children:"String Array"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Tab 
        v-model="selectedTab"
        :options="['Home', 'About', 'Contact']"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedTab = ref<string | undefined>(undefined)
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"object-array",children:"Object Array"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Tab 
        v-model="selectedTab"
        :options="tabs"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TabOption {
  label: string
  value: string
  icon?: string
}

const selectedTab = ref<string | undefined>(undefined)
const tabs: TabOption[] = [
  { label: 'Home', value: 'home', icon: 'home' },
  { label: 'Settings', value: 'settings', icon: 'settings' },
  { label: 'Profile', value: 'profile', icon: 'person' }
]
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"with-icons-only",children:"With Icons Only"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Tab 
        v-model="selectedTab"
        :options="['home', 'settings', 'person']"
        is-icon
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedTab = ref<string | undefined>(undefined)
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"get-full-object",children:"Get Full Object"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Tab 
        v-model="selectedTab"
        :options="tabs"
        get-object
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TabOption {
  label: string
  value: string
  icon: string
  route: string
}

const selectedTab = ref<TabOption | undefined>(undefined)
const tabs: TabOption[] = [
  { label: 'Home', value: 'home', icon: 'home', route: '/home' },
  { label: 'About', value: 'about', icon: 'info', route: '/about' }
]

// Access full object: selectedTab.value.route
<\/script>
`})}),`
`,e.jsx(i,{sourceState:"none",of:t}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the currently selected tab. The value type depends on the ",e.jsx(n.code,{children:"get-object"})," prop:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:'get-object="false"'})," (default): Returns the value from the selected option (string or ",e.jsx(n.code,{children:"valueKey"})," property)"]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:'get-object="true"'}),": Returns the entire option object"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsx(n.p,{children:"Array of tab options. Can be:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"String array"}),": ",e.jsx(n.code,{children:'["Option 1", "Option 2", "Option 3"]'})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Object array"}),": Objects with ",e.jsx(n.code,{children:"label"}),", ",e.jsx(n.code,{children:"value"}),", and optionally ",e.jsx(n.code,{children:"icon"})," properties",`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`[
  { label: "Tab 1", value: "tab1", icon: "home" },
  { label: "Tab 2", value: "tab2", icon: "settings" }
]
`})}),`
`]}),`
`]}),`
`,e.jsxs(n.p,{children:["Type: ",e.jsx(n.code,{children:"any[]"})," (required)"]}),`
`,e.jsx(i,{sourceState:"none",of:a}),`
`,e.jsx(n.h4,{id:"label-key",children:"label-key"}),`
`,e.jsxs(n.p,{children:["Property name used for displaying option labels when using object arrays. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"label"'}),")"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example"}),": If your objects use ",e.jsx(n.code,{children:"title"})," instead of ",e.jsx(n.code,{children:"label"}),", set ",e.jsx(n.code,{children:'label-key="title"'}),"."]}),`
`,e.jsx(n.h4,{id:"value-key",children:"value-key"}),`
`,e.jsx(n.p,{children:"Property name used for option values when using object arrays. This is used for:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Comparing which tab is active"}),`
`,e.jsxs(n.li,{children:["Returning the value when ",e.jsx(n.code,{children:'get-object="false"'})]}),`
`]}),`
`,e.jsxs(n.p,{children:["Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"value"'}),")"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example"}),": If your objects use ",e.jsx(n.code,{children:"id"})," instead of ",e.jsx(n.code,{children:"value"}),", set ",e.jsx(n.code,{children:'value-key="id"'}),"."]}),`
`,e.jsx(n.h4,{id:"is-icon",children:"is-icon"}),`
`,e.jsxs(n.p,{children:["When ",e.jsx(n.code,{children:"true"}),", displays Material Design Icons instead of text labels."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"For string arrays: Uses the string as the icon name"}),`
`,e.jsxs(n.li,{children:["For object arrays: Uses the ",e.jsx(n.code,{children:"icon"})," property if available, otherwise falls back to the label"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"not-card",children:"not-card"}),`
`,e.jsx(n.p,{children:"Removes the card wrapper styling (background and padding) for a plain appearance. Useful for inline tab navigation without the elevated card look."}),`
`,e.jsxs(n.p,{children:["Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"get-object",children:"get-object"}),`
`,e.jsxs(n.p,{children:["When ",e.jsx(n.code,{children:"true"}),", the ",e.jsx(n.code,{children:"v-model"})," will emit and store the entire option object instead of just its value. Useful when you need access to all properties of the selected option (label, value, icon, etc.)."]}),`
`,e.jsxs(n.p,{children:["Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<!-- get-object="false" (default) -->
<Tab v-model="selected" :options="tabs" />
<!-- selected = "tab1" (just the value) -->

<!-- get-object="true" -->
<Tab v-model="selected" :options="tabs" get-object />
<!-- selected = { label: "Tab 1", value: "tab1", icon: "home" } -->
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsxs(n.p,{children:["Triggered when the selected tab changes. The emitted value depends on the ",e.jsx(n.code,{children:"get-object"})," prop:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:'get-object="false"'})," (default): Emits the value (string or ",e.jsx(n.code,{children:"valueKey"})," property)"]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:'get-object="true"'}),": Emits the entire option object"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Flexible data structures"}),": Supports both string arrays and object arrays with configurable property names via ",e.jsx(n.code,{children:"label-key"})," and ",e.jsx(n.code,{children:"value-key"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Icon support"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"is-icon"})," for icon-only tabs with string arrays"]}),`
`,e.jsxs(n.li,{children:["Include ",e.jsx(n.code,{children:"icon"})," property in object arrays to display icons alongside labels"]}),`
`,e.jsx(n.li,{children:"Icons use Material Design Icons by name"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Value handling"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["By default, ",e.jsx(n.code,{children:"v-model"})," stores only the value (string or ",e.jsx(n.code,{children:"valueKey"})," property)"]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:'get-object="true"'})," to store the entire option object for access to all properties"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Styling variants"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Card styling (default) provides elevated appearance with background and shadow"}),`
`,e.jsxs(n.li,{children:["Plain styling (",e.jsx(n.code,{children:"not-card"}),") offers minimal visual styling for inline use"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Active state"}),": The active tab is determined by comparing values using ",e.jsx(n.code,{children:"valueKey"})," (for objects) or direct comparison (for strings)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive design"}),": Tab widths adapt based on content and container size"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"User experience"}),": Smooth hover effects and active state transitions with visual feedback"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessibility"}),": Uses semantic button elements for keyboard navigation support"]}),`
`]})]})}function m(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{m as default};
