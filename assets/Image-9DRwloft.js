import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as l}from"./index-D2LXvqQ0.js";import{M as t,C as s,a}from"./index-CbltXMU5.js";import{I as c,P as r,a as d}from"./Image.stories-D2VdoQuK.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CjRVAs2g.js";function o(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:c}),`
`,e.jsx(n.h1,{id:"name-image",children:"Name: Image"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A responsive image component with built-in preview functionality, featuring zoom, rotation controls, and customizable overlays for enhanced user experience."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:r}),`
`,e.jsx(a,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Image src="/image.jpg" alt="Sample image" width="250" />
</template>
`})}),`
`,e.jsx(s,{sourceState:"none",of:r}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"src",children:"src"}),`
`,e.jsxs(n.p,{children:["The image source URL or path. Type: ",e.jsx(n.code,{children:"string"})," (optional)"]}),`
`,e.jsx(n.h4,{id:"alt",children:"alt"}),`
`,e.jsxs(n.p,{children:["Alternative text for accessibility. Type: ",e.jsx(n.code,{children:"string"})," (optional)"]}),`
`,e.jsx(n.h4,{id:"width",children:"width"}),`
`,e.jsxs(n.p,{children:["Width of the image (can be string with units or number for pixels). Type: ",e.jsx(n.code,{children:"string | number"})," (optional)"]}),`
`,e.jsx(n.h4,{id:"height",children:"height"}),`
`,e.jsxs(n.p,{children:["Height of the image (can be string with units or number for pixels). Type: ",e.jsx(n.code,{children:"string | number"})," (optional)"]}),`
`,e.jsx(n.h4,{id:"icon",children:"icon"}),`
`,e.jsxs(n.p,{children:["Icon name for the preview overlay. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"visibility"'}),")"]}),`
`,e.jsx(n.p,{children:"The icon displayed when hovering over an image with preview enabled."}),`
`,e.jsx(n.h4,{id:"preview",children:"preview"}),`
`,e.jsxs(n.p,{children:["Enable preview mode with modal overlay and transformation controls. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.p,{children:"When enabled, clicking the image opens a modal with zoom and rotation controls."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Image src="/image.jpg" alt="Sample image" width="250" preview />
</template>
`})}),`
`,e.jsx(s,{sourceState:"none",of:d}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"show",children:"@show"}),`
`,e.jsx(n.p,{children:"Emitted when the preview modal is opened."}),`
`,e.jsx(n.h4,{id:"hide",children:"@hide"}),`
`,e.jsx(n.p,{children:"Emitted when the preview modal is closed."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"image",children:"#image"}),`
`,e.jsx(n.p,{children:"Custom slot for the main image content. Allows complete customization of the displayed image."}),`
`,e.jsx(n.h4,{id:"image-overlay",children:"#image-overlay"}),`
`,e.jsx(n.p,{children:"Custom slot for the preview overlay icon. Default shows a visibility icon."}),`
`,e.jsx(n.h4,{id:"preview-1",children:"#preview"}),`
`,e.jsx(n.p,{children:"Custom slot for the preview modal image with access to transformation styles and click handler."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"accessibility-features",children:"Accessibility Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA Support"}),": Preview modal uses proper ",e.jsx(n.code,{children:'role="dialog"'})," and ",e.jsx(n.code,{children:"aria-modal"})," attributes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard Navigation"}),":",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Escape"})," key closes the preview modal"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Tab"})," navigation through preview controls"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Enter/Space"})," activates control buttons"]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Screen Reader"}),": All control buttons have proper ",e.jsx(n.code,{children:"aria-label"})," attributes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus Management"}),": Initial focus on close button when preview opens"]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Always provide meaningful ",e.jsx(n.code,{children:"alt"})," text for images"]}),`
`,e.jsx(n.li,{children:"The component automatically handles image scaling and aspect ratios"}),`
`,e.jsx(n.li,{children:"Preview functionality works with any image format"}),`
`,e.jsx(n.li,{children:"Modal overlay prevents body scrolling while open"}),`
`,e.jsx(n.li,{children:"All transformations reset when closing preview modal"}),`
`]})]})}function w(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}export{w as default};
