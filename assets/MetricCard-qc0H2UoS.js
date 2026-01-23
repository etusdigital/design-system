import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as l}from"./index-D2LXvqQ0.js";import{M as a,C as t,a as r}from"./index-CbltXMU5.js";import{M as d,P as s,T as c,S as h,C as p,I as x,a as m,L as u,N as j,B as f,b as g}from"./MetricCard.stories--uwwh9yk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CjRVAs2g.js";function o(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d}),`
`,e.jsx(n.h1,{id:"name-metriccard",children:"Name: MetricCard"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A flexible metric display card component with multiple visual themes, loading states, and customizable content slots for showcasing key performance indicators and statistical data."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(t,{of:s}),`
`,e.jsx(r,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-base">
        <MetricCard
            title="Total Revenue"
            value="$124,500"
            description="+12% from last month"
            icon="trending_up"
            type="success"
            @click="viewDetails"
        />
        
        <MetricCard
            title="Active Users"
            value="2,450"
            description="+5% from last week"
            icon="people"
            :loading="isLoading"
        />
        
        <MetricCard
            title="Conversion Rate"
            value="3.2%"
            description="-0.5% from last month"
            icon="analytics"
            type="danger"
            info-message="Below target"
            info-type="warning"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)

const viewDetails = () => {
    console.log('View revenue details')
}
<\/script>
`})}),`
`,e.jsx(t,{sourceState:"none",of:s}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"title",children:"title"}),`
`,e.jsxs(n.p,{children:["The main title displayed at the top of the card. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"value",children:"value"}),`
`,e.jsxs(n.p,{children:["The primary metric value to be displayed prominently. Type: ",e.jsx(n.code,{children:"string | number"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"description",children:"description"}),`
`,e.jsxs(n.p,{children:["Additional descriptive text or secondary metric. Type: ",e.jsx(n.code,{children:"string | number"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"icon",children:"icon"}),`
`,e.jsxs(n.p,{children:["Icon name to display alongside the title. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["Visual theme variant for the card styling. Type: ",e.jsx(n.code,{children:'"default" | "dashed" | "card"'})," (default: ",e.jsx(n.code,{children:'"default"'}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"size",children:"size"}),`
`,e.jsxs(n.p,{children:["Size variant affecting typography and spacing. Type: ",e.jsx(n.code,{children:'"small" | "medium" | "large"'})," (default: ",e.jsx(n.code,{children:'"medium"'}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"color",children:"color"}),`
`,e.jsxs(n.p,{children:["Custom color for the value text (only applies to 'card' type). Type: ",e.jsx(n.code,{children:'"primary" | "info" | "success" | "danger" | "warning" | "neutral"'})," (default: ",e.jsx(n.code,{children:'"neutral"'}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"info-message",children:"info-message"}),`
`,e.jsxs(n.p,{children:["Additional informational message displayed with tooltip or text. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"info-type",children:"info-type"}),`
`,e.jsxs(n.p,{children:["Color theme for the info message display. Type: ",e.jsx(n.code,{children:'"primary" | "info" | "success" | "danger" | "warning" | "neutral"'})," (default: ",e.jsx(n.code,{children:'"neutral"'}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:m}),`
`,e.jsx(n.h4,{id:"tooltip-min-width",children:"tooltip-min-width"}),`
`,e.jsxs(n.p,{children:["Minimum width for the info tooltip container. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"none"'}),")"]}),`
`,e.jsx(n.h4,{id:"loading",children:"loading"}),`
`,e.jsxs(n.p,{children:["Shows skeleton loading animation instead of content. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"no-tooltip",children:"no-tooltip"}),`
`,e.jsxs(n.p,{children:["Displays info message as text instead of in a tooltip. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"bold-title",children:"bold-title"}),`
`,e.jsxs(n.p,{children:["Makes the title text bold for emphasis. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:f}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsxs(n.p,{children:["This component does not emit custom events but supports standard DOM events like ",e.jsx(n.code,{children:"@click"}),"."]}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"Additional content displayed below the main card information."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <MetricCard
        class="w-fit"
        title="Your June recipe"
        value="$100,000.00"
        color="primary"
        type="card"
        size="large"
        bold-title
    >
        <template #description-slot>
            <div class="flex items-center h-full pt-xs">
                <tooltip text="info">
                    <icon name="info" class="info-icon" />
                </tooltip>
            </div>
        </template>
        <div class="flex flex-col gap-sm mt-sm">
            <div class="flex items-center gap-xs text-neutral-foreground-high">
                <icon name="calendar_month" class="calendar-icon" />
                <p class="text-sm">Payment will be made by 04/30/2024</p>
            </div>
        <div class="flex gap-xs self-end">
            <tag text="Processing payment" size="small" />
            <button variant="secondary" size="small">
                View Details
            </button>
        </div>
        </div>
    </MetricCard>
</template>

<style scoped>
.info-icon.icon {
    @apply text-lg text-neutral-interaction-default
}

.calendar-icon.icon {
    @apply text-base;
}
`})}),`
`,e.jsx(t,{sourceState:"none",of:g}),`
`,e.jsx(n.h4,{id:"title-slot",children:"#title-slot"}),`
`,e.jsx(n.p,{children:"Custom content to replace the default title text."}),`
`,e.jsx(n.h4,{id:"value-slot",children:"#value-slot"}),`
`,e.jsx(n.p,{children:"Custom content to replace the default value display."}),`
`,e.jsx(n.h4,{id:"description-slot",children:"#description-slot"}),`
`,e.jsx(n.p,{children:"Custom content to replace the default description text."}),`
`,e.jsx(n.h4,{id:"content",children:"#content"}),`
`,e.jsx(n.p,{children:"Custom content to replace both value and description sections."}),`
`,e.jsx(n.h4,{id:"info",children:"#info"}),`
`,e.jsx(n.p,{children:"Custom content displayed next to the title for additional information."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Built on top of Card component for consistent styling and layout"}),`
`,e.jsx(n.li,{children:"Skeleton loading animation provides smooth user experience during data fetching"}),`
`,e.jsx(n.li,{children:"Multiple theme variants (default, dashed, card) for different contexts"}),`
`,e.jsx(n.li,{children:"Flexible sizing system (small, medium, large) adapts to various dashboard layouts"}),`
`,e.jsx(n.li,{children:"Info message system with tooltip or text display options for additional context"}),`
`,e.jsx(n.li,{children:"Icon integration enhances visual hierarchy and quick recognition"}),`
`,e.jsx(n.li,{children:"Slot-based architecture allows complete customization of content areas"}),`
`,e.jsx(n.li,{children:"Responsive typography that scales appropriately across different sizes"}),`
`,e.jsx(n.li,{children:"Loading state management prevents layout shift during data updates"}),`
`,e.jsx(n.li,{children:"Accessibility support with proper semantic structure and color contrast"}),`
`]})]})}function z(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}export{z as default};
