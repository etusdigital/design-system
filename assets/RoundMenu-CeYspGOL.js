import{j as n}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as c,C as t,a}from"./index-CCS_Va9-.js";import{R as l,P as i}from"./RoundMenu.stories-hHX-jLG0.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-1aJ3cS75.js";function s(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(c,{of:l}),`
`,n.jsx(e.h1,{id:"name-roundmenu",children:"Name: RoundMenu"}),`
`,n.jsx(e.h2,{id:"component-overview",children:"Component Overview"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Purpose"}),": A circular radial menu component that expands menu options in a circular pattern around a central toggle button, ideal for floating action menus and contextual controls."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h3,{id:"playground",children:"Playground"}),`
`,n.jsx(t,{of:i}),`
`,n.jsx(a,{}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <RoundMenu :options="menuOptions" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const menuOptions = ref([...])
<\/script>
`})}),`
`,n.jsx(t,{sourceState:"none",of:i}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"props-api",children:"Props API"}),`
`,n.jsx(e.h4,{id:"options",children:"options"}),`
`,n.jsxs(e.p,{children:["Array of menu option objects that define the radial menu options. Type: ",n.jsx(e.code,{children:"MenuOption[]"})," (required)"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`type MenuOption = {
  label: string;      // Display text for the menu option
  icon: string;       // Icon name for the menu button
  background: string; // Custom background color for the button
  action: () => void; // Function to execute when option is clicked
}
`})}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Dynamic Positioning"}),": The component automatically calculates optimal positioning based on the number of options:"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"< 7 options"}),": 60px radius for comfortable spacing"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"7-9 options"}),": Dynamic radius based on ",n.jsx(e.code,{children:"7 * optionCount"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"≥ 10 options"}),": Dynamic radius based on ",n.jsx(e.code,{children:"6 * optionCount"})," for tighter spacing"]}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"events-api",children:"Events API"}),`
`,n.jsxs(e.p,{children:["The component doesn't emit custom events. Interactions are handled through the ",n.jsx(e.code,{children:"action"})," functions defined in each menu option."]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"slots-api",children:"Slots API"}),`
`,n.jsxs(e.p,{children:["This component uses ",n.jsx(e.code,{children:"Button"})," internally and doesn't expose custom slots."]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Important Notes:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Options are positioned in a perfect circle using trigonometric calculations"}),`
`,n.jsx(e.li,{children:"Central toggle button changes color from success (green) to neutral when expanded"}),`
`,n.jsx(e.li,{children:"Radius automatically adjusts based on option count for optimal UX"}),`
`,n.jsx(e.li,{children:"Each option maintains its own hover state and click interactions"}),`
`,n.jsx(e.li,{children:"Animation performance is optimized with hardware acceleration"}),`
`,n.jsx(e.li,{children:"Requires sufficient container space to accommodate the expanded radius"}),`
`]})]})}function f(o={}){const{wrapper:e}={...r(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(s,{...o})}):s(o)}export{f as default};
