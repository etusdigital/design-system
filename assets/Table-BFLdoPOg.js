import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as l}from"./index-D2LXvqQ0.js";import{M as r,C as s,a as o}from"./index-DN5oYWrE.js";import{T as d,P as a,O as c,L as h,S as p,A as m,I as x,H as u,a as g,N as j,E as b,F as f,b as v,c as y}from"./Table.stories-BrJOc4Dg.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-oiXQscte.js";function i(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(n.h1,{id:"name-table",children:"Name: Table"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A comprehensive data table component with sorting, pagination, selection, loading states, and extensive customization through slots for displaying structured data."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:a}),`
`,e.jsx(o,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Table :columns="columns" :data="data">
        <template v-for="header in columns" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
        </template>

        <template #actions>
            <td class="flex items-center justify-end">
                <Button color="primary" variant="plain" icon="more_vert" round />
            </td>
        </template>
    </Table>
</template>

<script setup lang="ts">
const columns = [
    { label: "Name", value: "name", sortable: true },
    { label: "Age", value: "age", sortable: true },
    { label: "Membership", value: "membership" }
]

const data = [
    { name: "Joanna", age: 43, memberShip: "Platinum" },
    { name: "Jhonny", age: 23, memberShip: "Gold" },
    ...
]
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:a}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"columns",children:"columns"}),`
`,e.jsxs(n.p,{children:["Array of column columns defining table structure. Type: ",e.jsx(n.code,{children:"Column[]"})," (required)"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`type Column = {
  label?: string;     // Display text for column
  value: string;      // Property key from column
  sortable?: boolean; // Enable sorting for this column
  width?: string;     // CSS width value
  align?: string;     // Text alignment: 'left', 'center', 'right'
}
`})}),`
`,e.jsx(n.h4,{id:"data",children:"data"}),`
`,e.jsxs(n.p,{children:["Array of data objects to display in table items. Type: ",e.jsx(n.code,{children:"any[]"})," (required)"]}),`
`,e.jsx(n.h4,{id:"sortoptions",children:"sortOptions"}),`
`,e.jsxs(n.p,{children:["Configuration object for sorting settings. Type: ",e.jsx(n.code,{children:"Options"})," (optional)"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`type Options = {
  by?: string;    // Initial column to sort by
  desc?: boolean; // Initial sort direction (true = descending)
}
`})}),`
`,e.jsx(s,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"page",children:"page"}),`
`,e.jsxs(n.p,{children:["Current active page number. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"1"}),")"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Table :columns="columns" :data="data" v-model:page="currentPage" @update:page="handlePageChange">
        ...
    </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentPage = ref(1)

const handlePageChange = (newPage: number) => {}
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"items-per-page",children:"items-per-page"}),`
`,e.jsxs(n.p,{children:["Number of items to display per page. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"10"}),")"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Table 
        :columns="columns" 
        :items="items"
        v-model:items-per-page="itemsPerPage"
        @update:items-per-page="handleitemsPerPageChange"
    >
        ...
    </Table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const itemsPerPage = ref(20)

const handleitemsPerPageChange = (newitemsPerPage: number) => {}
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"loading",children:"loading"}),`
`,e.jsxs(n.p,{children:["Shows skeleton loading animation. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"enable-selection",children:"enable-selection"}),`
`,e.jsxs(n.p,{children:["Enables row selection with checkboxes. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Table :columns="columns" :items="items" enable-selection @select-all="handleSelectAll">
        <template #select="{ item }">
            <td>
                <Checkbox v-model="item.selected" />
            </td>
        </template>
        ...
    </Table>
</template>

<script setup lang="ts">
const handleSelectAll = (selected: any) => {}
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"enable-aggregation",children:"enable-aggregation"}),`
`,e.jsxs(n.p,{children:["Enables expandable items for nested data. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Table :columns="columns" :items="items" enable-aggregation>
        <template #aggregation="{ item }">
            <div class="flex items-center justify-center p-xxs rounded-full cursor-pointer hover:bg-neutral-surface-highlight">
                <icon
                    name="arrow_drop_down"
                    class="transition-transform"
                    :class="{ 'rotate-180': item.expanded }"
                    @click="item.expanded = !item.expanded"
                />
            </div>
        </template>
        ...
        <template #childs="{ item }">
            <tr v-if="item.expanded" v-for="child in item.children" :key="child.id">
                <td></td>
                <td>{{ child.name }}</td>
                <td>{{ child.value }}</td>
            </tr>
        </template>
    </Table>
</template>
`})}),`
`,e.jsx(s,{sourceState:"none",of:m}),`
`,e.jsx(n.h4,{id:"is-header-fixed",children:"is-header-fixed"}),`
`,e.jsxs(n.p,{children:["Makes header sticky during vertical scroll. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"has-hover",children:"has-hover"}),`
`,e.jsxs(n.p,{children:["Enables row hover effects. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"hide-footer",children:"hide-footer"}),`
`,e.jsxs(n.p,{children:["Hides pagination footer. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:g}),`
`,e.jsx(n.h4,{id:"no-shadow",children:"no-shadow"}),`
`,e.jsxs(n.p,{children:["Removes the default shadow from the table card container. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"number-of-items",children:"number-of-items"}),`
`,e.jsxs(n.p,{children:["Total number of items across all pages (used for backend pagination). Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"0"}),")"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Table 
        :columns="columns" 
        :items="currentPageItems"
        :render-pagination-in-back-end="true"
        :number-of-items="totalOptions"
        @page-items="handlePageChange"
        @sort-by="handleSort"
      >
        ...
    </Table>
</template>

<script setup lang="ts">
const handlePageChange = (page: number, itemsPerPage: number) => {}

const handleSort = (key: string, isDesc: boolean) => {}
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"render-pagination-in-back-end",children:"render-pagination-in-back-end"}),`
`,e.jsxs(n.p,{children:["Enables backend pagination mode. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatepage",children:"update:page"}),`
`,e.jsx(n.p,{children:"Emitted when the current page changes (v-model:page). Receives the new page number."}),`
`,e.jsx(n.h4,{id:"updateitems-per-page",children:"update:items-per-page"}),`
`,e.jsx(n.p,{children:"Emitted when the items per page selection changes (v-model:items-per-page). Receives the new items per page count."}),`
`,e.jsx(n.h4,{id:"sort-by",children:"@sort-by"}),`
`,e.jsx(n.p,{children:"Triggered when a column header is clicked for sorting."}),`
`,e.jsx(n.h4,{id:"page-items",children:"@page-items"}),`
`,e.jsx(n.p,{children:"Triggered when pagination changes (page or items per page)."}),`
`,e.jsx(n.h4,{id:"select-all",children:"@select-all"}),`
`,e.jsx(n.p,{children:'Triggered when the "select all" checkbox is toggled.'}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsxs(n.h4,{id:"dynamic-column-slots-headervalue",children:["Dynamic Column Slots (",e.jsx(n.code,{children:"#{header.value}"}),")"]}),`
`,e.jsxs(n.p,{children:["For each header, a slot is created with the header's ",e.jsx(n.code,{children:"value"})," as the slot name."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Table :columns="columns" :items="items">
        <template v-for="header in columns" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
        </template>
    </Table>
</template>
`})}),`
`,e.jsx(n.h4,{id:"actions",children:"#actions"}),`
`,e.jsx(n.p,{children:"Displays action buttons or controls for each row."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Table :columns="columns" :items="items">
        ...
        <template #actions="{ item }">
            <td class="flex items-center justify-end">
                <Button
                    color="primary"
                    variant="plain"
                    icon="more_vert"
                    round
                    @click="() => handleActions(item)"
                />
            </td>
        </template>
    </Table>
</template>

<script setup lang="ts">
const handleActions = (item) => {}
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"select",children:"#select"}),`
`,e.jsxs(n.p,{children:["Custom selection controls when ",e.jsx(n.code,{children:"enableSelection"})," is true."]}),`
`,e.jsx(n.h4,{id:"aggregation",children:"#aggregation"}),`
`,e.jsxs(n.p,{children:["Expand/collapse controls when ",e.jsx(n.code,{children:"enableAggregation"})," is true."]}),`
`,e.jsx(n.h4,{id:"childs",children:"#childs"}),`
`,e.jsx(n.p,{children:"Renders nested/child items when parent row is expanded."}),`
`,e.jsx(n.h4,{id:"empty-state",children:"#empty-state"}),`
`,e.jsx(n.p,{children:"Displayed when no data are available."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Table :columns="columns" :data="data">
          <template #empty-state>
              <div class="flex items-center justify-center p-xxs rounded-full text-xl">
                  <Icon name="sentiment_dissatisfied" size="1em" />
              </div>
          </template>
      </Table>
</template>
`})}),`
`,e.jsx(s,{sourceState:"none",of:b}),`
`,e.jsx(n.h4,{id:"footer",children:"#footer"}),`
`,e.jsx(n.p,{children:"Custom table footer content."}),`
`,e.jsx(s,{sourceState:"none",of:f}),`
`,e.jsx(n.h4,{id:"items-per-page-1",children:"#items-per-page"}),`
`,e.jsx(n.p,{children:"Custom text for pagination controls."}),`
`,e.jsx(s,{sourceState:"none",of:v}),`
`,e.jsx(n.h4,{id:"showing-page",children:"#showing-page"}),`
`,e.jsx(n.p,{children:"Custom pagination info text."}),`
`,e.jsx(s,{sourceState:"none",of:y}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The table automatically handles sorting, pagination, and selection when not in backend mode"}),`
`,e.jsxs(n.li,{children:["Slot parameters provide access to ",e.jsx(n.code,{children:"item"})," (row data) and ",e.jsx(n.code,{children:"index"})," (row number)"]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"renderPaginationInBackEnd"})," for large datasets with server-side pagination"]}),`
`]})]})}function E(t={}){const{wrapper:n}={...l(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{E as default};
