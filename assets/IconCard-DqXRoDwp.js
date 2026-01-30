import{j as n}from"./index-DhQHbkge.js";import{useMDXComponents as t}from"./index-D2LXvqQ0.js";import{M as r,C as o,a as c}from"./index-CCS_Va9-.js";import{I as d,P as l,D as a,i as h}from"./IconCard.stories-BGsBd0O5.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-1aJ3cS75.js";function s(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{of:d}),`
`,n.jsx(e.h1,{id:"name-iconcard",children:"Name: IconCard"}),`
`,n.jsx(e.h2,{id:"component-overview",children:"Component Overview"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Purpose"}),": A card component with a floating icon header, customizable colors, and flexible content areas for displaying information with visual hierarchy and enhanced user experience."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h3,{id:"playground",children:"Playground"}),`
`,n.jsx(o,{of:l}),`
`,n.jsx(c,{}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <IconCard 
        title="Send Message: Message Name"
        icon="send"
    >
        <template #title-actions>
            <icon name="visibility" class="cursor-pointer" />
        </template>
        
        <div class="mt-sm">
            <p>Card content goes here</p>
        </div>
    </IconCard>
</template>
`})}),`
`,n.jsx(o,{sourceState:"none",of:a}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"props-api",children:"Props API"}),`
`,n.jsx(e.h4,{id:"title",children:"title"}),`
`,n.jsxs(e.p,{children:["The title text displayed in the card header. Type: ",n.jsx(e.code,{children:"string"})," (default: ",n.jsx(e.code,{children:'""'}),")"]}),`
`,n.jsx(e.h4,{id:"icon",children:"icon"}),`
`,n.jsxs(e.p,{children:["Icon displayed in the floating header circle. Type: ",n.jsx(e.code,{children:"string"})," (default: ",n.jsx(e.code,{children:'""'}),")"]}),`
`,n.jsx(e.h4,{id:"color",children:"color"}),`
`,n.jsxs(e.p,{children:["Custom color for the icon background and title text. Type: ",n.jsx(e.code,{children:"string"})," (default: ",n.jsx(e.code,{children:'""'}),")"]}),`
`,n.jsx(e.h4,{id:"is-icon-round",children:"is-icon-round"}),`
`,n.jsxs(e.p,{children:["Removes the circular background and increases icon size for a minimal style. Type: ",n.jsx(e.code,{children:"boolean"})," (default: ",n.jsx(e.code,{children:"false"}),")"]}),`
`,n.jsx(o,{sourceState:"none",of:h}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"events-api",children:"Events API"}),`
`,n.jsx(e.p,{children:"This component does not emit custom events."}),`
`,n.jsx(e.h3,{id:"slots-api",children:"Slots API"}),`
`,n.jsx(e.h4,{id:"default",children:"#default"}),`
`,n.jsx(e.p,{children:"Main content area of the card, displayed below the title section."}),`
`,n.jsx(e.h4,{id:"title-actions",children:"#title-actions"}),`
`,n.jsx(e.p,{children:"Action elements displayed alongside the title in the header section."}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Important Notes:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"The floating icon is positioned absolutely and extends outside the card boundaries"}),`
`,n.jsxs(e.li,{children:["When ",n.jsx(e.code,{children:"is-icon-round"})," is true, the icon becomes larger and loses its background circle"]}),`
`,n.jsx(e.li,{children:"Custom colors override the default primary color scheme for both icon and title"}),`
`,n.jsx(e.li,{children:"The card automatically adjusts its left margin to accommodate the floating icon"}),`
`,n.jsx(e.li,{children:"Title actions slot provides flexibility for custom controls without affecting layout"}),`
`,n.jsx(e.li,{children:"Minimum width prevents the card from becoming too narrow and maintains visual balance"}),`
`]})]})}function v(i={}){const{wrapper:e}={...t(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(s,{...i})}):s(i)}export{v as default};
