import{j as e}from"./iframe-LJwCixq7.js";import{useMDXComponents as c}from"./index-DIdAKU0T.js";import{M as r,C as i,a as d}from"./index-EbSEPHWO.js";import{P as l,a as o,W as a,D as h}from"./ProfilePicture.stories-BkoRJ08f.js";import"./preload-helper-PPVm8Dsz.js";function t(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...c(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
`,e.jsx(n.h1,{id:"name-profilepicture",children:"Name: ProfilePicture"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": An avatar button that opens a user menu with a header (avatar, name and description), action options and single-choice sub-lists such as language or theme."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(i,{of:o}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <ProfilePicture
        v-model="preferences"
        :name="user.name"
        :description="user.email"
        :picture="user.picture"
        :options="options"
        @select="onSelect"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const preferences = ref({ language: 'en' })
const options = [
    { label: 'My account', value: 'account', icon: 'person' },
    {
        label: 'Language',
        value: 'language',
        icon: 'translate',
        items: [
            { label: 'English', value: 'en', image: '/flags/us.svg' },
            { label: 'Português', value: 'pt', image: '/flags/br.svg' },
        ],
    },
    { label: 'Logout', value: 'logout', icon: 'logout', color: 'danger', action: logout },
]

function onSelect(option, item) {
    // option: the clicked option; item: the chosen sub-item, when there is one
}
<\/script>
`})}),`
`,e.jsx(i,{sourceState:"none",of:o}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Selected sub-item of each option with ",e.jsx(n.code,{children:"items"}),", keyed by the option value, e.g. ",e.jsx(n.code,{children:"{ language: 'en', theme: 'dark' }"}),". When an option has a selected sub-item, its row shows that sub-item's icon/image and label. Type: ",e.jsx(n.code,{children:"Record<string, any>"})," (default: ",e.jsx(n.code,{children:"{}"}),")"]}),`
`,e.jsx(n.h4,{id:"v-modelexpanded",children:"v-model:expanded"}),`
`,e.jsxs(n.p,{children:["Controls whether the menu is open. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"name",children:"name"}),`
`,e.jsxs(n.p,{children:["User name shown in the header, used for the avatar initials and as the default accessible name. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"description",children:"description"}),`
`,e.jsxs(n.p,{children:["Secondary text under the name, such as the email. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"picture",children:"picture"}),`
`,e.jsxs(n.p,{children:["Avatar image URL. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:a}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Menu options. Type: ",e.jsx(n.code,{children:"ProfilePictureOption[]"})," (default: ",e.jsx(n.code,{children:"[]"}),")"]}),`
`,e.jsxs(n.p,{children:[`| Field | Description |
|---|---|
| `,e.jsx(n.code,{children:"label"})," / ",e.jsx(n.code,{children:"value"})," | Text and identifier (keys configurable with ",e.jsx(n.code,{children:"label-key"})," / ",e.jsx(n.code,{children:"value-key"}),`) |
| `,e.jsx(n.code,{children:"icon"}),` | Material Symbols icon name |
| `,e.jsx(n.code,{children:"image"}),` | Image URL shown instead of the icon (e.g. a flag) |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:'"primary" \\| "info" \\| "success" \\| "warning" \\| "danger"'}),` text color |
| `,e.jsx(n.code,{children:"disabled"}),` | Disables the option |
| `,e.jsx(n.code,{children:"items"}),` | Sub-options shown as a single-choice list under the option |
| `,e.jsx(n.code,{children:"action"})," | Callback called with ",e.jsx(n.code,{children:"(option, item?)"})," when the option or one of its items is chosen |"]}),`
`,e.jsx(n.h4,{id:"label-key--value-key",children:"label-key / value-key"}),`
`,e.jsxs(n.p,{children:["Keys used to read each option's label and value. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"label"'})," / ",e.jsx(n.code,{children:'"value"'}),")"]}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the trigger. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"aria-label",children:"aria-label"}),`
`,e.jsxs(n.p,{children:["Accessible name of the trigger and of the menu. Defaults to ",e.jsx(n.code,{children:"name"}),", then ",e.jsx(n.code,{children:'"Profile menu"'}),". Type: ",e.jsx(n.code,{children:"string"})]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"select",children:"@select"}),`
`,e.jsxs(n.p,{children:["Emitted with ",e.jsx(n.code,{children:"(option)"})," when an option without ",e.jsx(n.code,{children:"items"})," is chosen (the menu then closes), or with ",e.jsx(n.code,{children:"(option, item)"})," when a sub-item is chosen (the menu stays open)."]}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Emitted with the new selection record when a sub-item is chosen."}),`
`,e.jsx(n.h4,{id:"updateexpanded",children:"@update:expanded"}),`
`,e.jsx(n.p,{children:"Emitted when the menu opens or closes."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsxs(n.p,{children:[`| Slot | Params | Description |
|---|---|---|
| `,e.jsx(n.code,{children:"#trigger"})," | ",e.jsx(n.code,{children:"expanded"}),` | Replaces the avatar and arrow |
| `,e.jsx(n.code,{children:"#header"})," | ",e.jsx(n.code,{children:"name"}),", ",e.jsx(n.code,{children:"description"}),", ",e.jsx(n.code,{children:"picture"}),` | Replaces the header |
| `,e.jsx(n.code,{children:"#option"})," | ",e.jsx(n.code,{children:"option"}),", ",e.jsx(n.code,{children:"selectedItem"}),` | Replaces an option content (the chevron stays) |
| `,e.jsx(n.code,{children:"#item"})," | ",e.jsx(n.code,{children:"option"}),", ",e.jsx(n.code,{children:"item"}),", ",e.jsx(n.code,{children:"selected"}),` | Replaces a sub-item content (the check stays) |
| `,e.jsx(n.code,{children:"#footer"})," | | Content after the options |"]}),`
`,e.jsx(n.h3,{id:"keyboard--accessibility",children:"Keyboard & Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The trigger is a button with ",e.jsx(n.code,{children:'aria-haspopup="menu"'})," and ",e.jsx(n.code,{children:"aria-expanded"}),"; Enter or Space opens the menu, ArrowDown / ArrowUp open it on the first / last option."]}),`
`,e.jsx(n.li,{children:"Arrow Up / Down move between options (wrapping), Home / End jump to the first / last one. Tab and Shift+Tab also move between options; tabbing past the first or last one closes the menu and returns focus to the trigger."}),`
`,e.jsx(n.li,{children:"ArrowRight opens an option's sub-list and focuses its first item; ArrowLeft closes it and returns to the option."}),`
`,e.jsx(n.li,{children:"Enter or Space chooses the focused option; Escape closes the menu and returns focus to the trigger."}),`
`,e.jsxs(n.li,{children:["Options are ",e.jsx(n.code,{children:"menuitem"}),"s, sub-items are ",e.jsx(n.code,{children:"menuitemradio"}),"s with ",e.jsx(n.code,{children:"aria-checked"}),', and an option with a selected sub-item is announced as "Language: English".']}),`
`]})]})}function g(s={}){const{wrapper:n}={...c(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{g as default};
