import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as l,C as s,a}from"./index-DN5oYWrE.js";import{I as c,P as t,F as d}from"./Icon.stories-Bu9Y1QE-.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-oiXQscte.js";function i(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c}),`
`,e.jsx(n.h1,{id:"name-icon",children:"Name: Icon"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A wrapper component for Google Material Symbols that provides easy icon usage without custom element warnings in Vue applications."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Icon"})," is just a wrapper for ",e.jsx(n.strong,{children:"Google Material Symbols"}),". We do this to avoid the need to setup Vue to hide the custom element warning. The usage is identical to the original since parameters fall through to the ",e.jsx(n.strong,{children:"Google Material Symbols"})," component. You can check it's usage ",e.jsx(n.a,{href:"https://fonts.google.com/icons?icon.style=Rounded",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:t}),`
`,e.jsx(a,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Icon name="sentiment_satisfied" />
</template>
`})}),`
`,e.jsx(s,{sourceState:"none",of:t}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"name",children:"name"}),`
`,e.jsxs(n.p,{children:["The icon name from Google Material Symbols. Type: ",e.jsx(n.code,{children:"string"})," (required)"]}),`
`,e.jsxs(n.p,{children:["Find available icons at ",e.jsx(n.a,{href:"https://fonts.google.com/icons?icon.style=Rounded",rel:"nofollow",children:"Google Material Symbols"}),"."]}),`
`,e.jsx(n.h4,{id:"size",children:"size"}),`
`,e.jsxs(n.p,{children:["Controls the icon size using CSS font-size values. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"24px"'}),"). Only recommended for specific cases, prefer using Tailwind classes as shown below"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Icon name="favorite" class="favorite-icon" />
</template>

<style scoped>
.favorite-icon.icon {
    @apply text-sm
}
</style>
`})}),`
`,e.jsx(n.h4,{id:"filled",children:"filled"}),`
`,e.jsxs(n.p,{children:["Changes the icon style to filled version. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:d}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Icons are based on Google Material Symbols with rounded style"}),`
`,e.jsx(n.li,{children:"Use meaningful icon names that match the action or content they represent"}),`
`,e.jsx(n.li,{children:"Icons automatically inherit text color from parent elements"}),`
`]})]})}function y(o={}){const{wrapper:n}={...r(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(i,{...o})}):i(o)}export{y as default};
