import{B as s}from"./BFilter-Cqq6I05-.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./Container-I2pMHj_T.js";import"./Label-jj1xFjf_.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./SelectContent-7yYIGyTY.js";import"./Option-BBYBztsW.js";const y={component:s,tags:["autodocs"],argTypes:{modelValue:{type:{summary:"any"},description:'Will be an item from the "items" array at the selected index.'},labelValue:{type:{summary:"text"},description:"Will be the filter label."},expanded:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},labelKey:{type:{summary:"text"},table:{defaultValue:{summary:"label"}}},selectedKey:{type:{summary:"text"},table:{defaultValue:{summary:"selected"}}},icon:{type:{summary:"text"},table:{defaultValue:{summary:"filter_list"}},description:"This will be filter icon."},searchText:{type:{summary:"text"},table:{defaultValue:{summary:"Search"}},description:"This slot will be placeholder for the input when searchable is true."},searchable:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},disabled:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},absolute:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Makes the content dropdown have an absolute position."},apply:{type:{summary:"function"},table:{defaultValue:{summary:"()=>{void}"}},description:"Will be the function that execute when apply button is pressed."},status:{description:"This slot will be status when a item is selected. Param: selected (number of selected items)."},"status-text":{description:"This slot will be status text when a item is selected. Param: selected (number of selected items)."},"clear-text":{description:"Will be clear button text."},"apply-text":{description:"Will be apply button text."},default:{description:"This slot will be displayed on the multi-select area."},actions:{description:"This slot will be the select actions, displayed in the bottom of the dropdown"}}},n={modelValue:{option1:[{label:"Option 1",something:0,selected:!1},{label:"Option 2",something:1,selected:!0},{label:"Option 3",something:2,selected:!1},{label:"Option 4",something:3,selected:!1},{label:"Option 5",something:4,selected:!1}],option2:[{label:"Option 1",something:0,selected:!1},{label:"Option 2",something:1,selected:!0},{label:"Option 3",something:2,selected:!1},{label:"Option 4",something:3,selected:!1},{label:"Option 5",something:4,selected:!1}]},labelValue:"label",expanded:!1,labelKey:"label",selectedKey:"selected",searchText:"Search",icon:"filter_list",searchable:!1,disabled:!1,absolute:!1,apply:()=>{}},e={render:r=>({components:{BFilter:s},setup(){return{args:r}},template:`
        <BFilter 
            v-model="args.modelValue" 
            v-model:expanded="args.expanded" 
            :labelValue="args.labelValue"
            :label-key="args.labelKey" 
            :selected-key="args.selectedKey" 
            :required="args.required" 
            :icon="args.icon" 
            :searchable="args.searchable" 
            :disabled="args.disabled"
            :absolute="args.absolute"
            :search-text="args.searchText"
            @apply="args.apply" 
        />
        <span class="block mt-[1em]">Selected: {{ JSON.stringify(args.modelValue, null, 2) }}</span>
        `}),args:n};var a,l,t;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BFilter
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <BFilter 
            v-model="args.modelValue" 
            v-model:expanded="args.expanded" 
            :labelValue="args.labelValue"
            :label-key="args.labelKey" 
            :selected-key="args.selectedKey" 
            :required="args.required" 
            :icon="args.icon" 
            :searchable="args.searchable" 
            :disabled="args.disabled"
            :absolute="args.absolute"
            :search-text="args.searchText"
            @apply="args.apply" 
        />
        <span class="block mt-[1em]">Selected: {{ JSON.stringify(args.modelValue, null, 2) }}</span>
        \`
  }),
  args: defaultArgs
}`,...(t=(l=e.parameters)==null?void 0:l.docs)==null?void 0:t.source}}};const h=["Primary"];export{e as Primary,h as __namedExportsOrder,y as default};
