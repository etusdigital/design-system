import{B as d}from"./BMultiSelect-CTqHWXlx.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./SelectContent-7yYIGyTY.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Option-BBYBztsW.js";const y={component:d,tags:["autodocs"],argTypes:{modelValue:{description:'Will be an item from the "items" array at the selected index.',control:{type:"object"},table:{type:{summary:"any[]"}}},labelValue:{description:"Will be the multiselect label",control:{type:"text"},table:{type:{summary:"string"}}},icon:{description:"Ícone do multiselect",control:{type:"text"},table:{type:{summary:"string"}}},expanded:{description:"Controla o estado expandido (usar com v-model:expanded)",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},labelKey:{description:"Chave para obter o label do item no objeto do array items",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:"label"}}},selectedKey:{description:"Chave para indicar se o item está selecionado no objeto do array items",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:"selected"}}},searchable:{description:"Habilita a busca nos itens",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{description:"Desabilita o multiselect",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},isError:{description:"Activate error mode.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},errorMessage:{description:"Will be the error message.",control:{type:"text"},table:{type:{summary:"string"}}},infoMessage:{description:"Will be the info message.",control:{type:"text"},table:{type:{summary:"string"}}},absolute:{description:"Makes the content dropdown have an absolute position.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},searchText:{description:"This slot will be placeholder for the input when searchable is true.",table:{type:{summary:"slot"}}},status:{description:"This slot will be status when a item is selected. Param: selected (number of selected items).",table:{type:{summary:"slot"}}},"status-text":{description:"This slot will be status text when a item is selected. Param: selected (number of selected items).",table:{type:{summary:"slot"}}},default:{description:"This slot will be displayed on the multi-select area.",table:{type:{summary:"slot"}}},item:{description:"This slot will be displayed as an option. Params: item and index.",table:{type:{summary:"slot"}}},actions:{description:"This slot will be the select actions, displayed in the bottom of the dropdown",table:{type:{summary:"slot"}}}}},e={render:l=>({components:{BMultiSelect:d},setup(){return{args:l}},template:`<BMultiSelect 
            v-model="args.modelValue" 
            v-model:expanded="args.expanded" 
            :labelValue="args.labelValue"
            :icon="args.icon"
            :absolute="args.absolute" 
            :label-key="args.labelKey" 
            :selected-key="args.selectedKey" 
            :required="args.required" 
            :searchable="args.searchable" 
            :disabled="args.disabled"
            :is-error="args.isError"
            :error-message="args.errorMessage"
            :info-message="args.infoMessage"
        >
            Placeholder
        </BMultiSelect>
        <span class="block mt-[1em]">Selected: {{ JSON.stringify(args.modelValue, null, 2) }}</span>`}),args:{modelValue:[{label:"Option 1",something:0,selected:!1},{label:"Option 2",something:1,selected:!0},{label:"Option 3",something:2,selected:!1},{label:"Option 4",something:3,selected:!1},{label:"Option 5",something:4,selected:!1}],labelValue:"label",icon:"",expanded:!1,labelKey:"label",selectedKey:"selected",searchable:!1,disabled:!1,required:!1,isError:!1,errorMessage:"",infoMessage:"",absolute:!1}},a={render:l=>({setup(){return{args:l}},template:`<div class="flex gap-3">
          <BMultiSelect 
            v-model="args.modelValue" 
            v-model:expanded="args.expanded" 
            :labelValue="args.labelValue"
            :icon="args.icon"
            :absolute="args.absolute" 
            :label-key="args.labelKey" 
            :selected-key="args.selectedKey" 
            :required="args.required" 
            :searchable="args.searchable" 
            :disabled="args.disabled"
            :is-error="args.isError"
            :error-message="args.errorMessage"
            :info-message="args.infoMessage"
          >
            Placeholder
            <template #item="{ item, index }">
                <div class="flex items-center gap-2">
                    <BIcon name="account_circle" />
                    {{ item.label }}
                </div>
            </template>
        </BMultiSelect>
    </div>`}),args:{modelValue:[{label:"Option 1",something:0,selected:!1},{label:"Option 2",something:1,selected:!0},{label:"Option 3",something:2,selected:!1},{label:"Option 4",something:3,selected:!1},{label:"Option 5",something:4,selected:!1}],labelValue:"label",icon:"",expanded:!1,labelKey:"label",selectedKey:"selected",searchable:!1,disabled:!1,required:!1,isError:!1,errorMessage:"",infoMessage:"",absolute:!1}};var s,t,r;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (args: BMultiSelectStoryArgs) => ({
    components: {
      BMultiSelect
    },
    setup() {
      return {
        args
      };
    },
    template: \`<BMultiSelect 
            v-model="args.modelValue" 
            v-model:expanded="args.expanded" 
            :labelValue="args.labelValue"
            :icon="args.icon"
            :absolute="args.absolute" 
            :label-key="args.labelKey" 
            :selected-key="args.selectedKey" 
            :required="args.required" 
            :searchable="args.searchable" 
            :disabled="args.disabled"
            :is-error="args.isError"
            :error-message="args.errorMessage"
            :info-message="args.infoMessage"
        >
            Placeholder
        </BMultiSelect>
        <span class="block mt-[1em]">Selected: {{ JSON.stringify(args.modelValue, null, 2) }}</span>\`
  }),
  args: {
    modelValue: [{
      label: "Option 1",
      something: 0,
      selected: false
    }, {
      label: "Option 2",
      something: 1,
      selected: true
    }, {
      label: "Option 3",
      something: 2,
      selected: false
    }, {
      label: "Option 4",
      something: 3,
      selected: false
    }, {
      label: "Option 5",
      something: 4,
      selected: false
    }],
    labelValue: "label",
    icon: "",
    expanded: false,
    labelKey: "label",
    selectedKey: "selected",
    searchable: false,
    disabled: false,
    required: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    absolute: false
  }
}`,...(r=(t=e.parameters)==null?void 0:t.docs)==null?void 0:r.source}}};var n,o,i;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`<div class="flex gap-3">
          <BMultiSelect 
            v-model="args.modelValue" 
            v-model:expanded="args.expanded" 
            :labelValue="args.labelValue"
            :icon="args.icon"
            :absolute="args.absolute" 
            :label-key="args.labelKey" 
            :selected-key="args.selectedKey" 
            :required="args.required" 
            :searchable="args.searchable" 
            :disabled="args.disabled"
            :is-error="args.isError"
            :error-message="args.errorMessage"
            :info-message="args.infoMessage"
          >
            Placeholder
            <template #item="{ item, index }">
                <div class="flex items-center gap-2">
                    <BIcon name="account_circle" />
                    {{ item.label }}
                </div>
            </template>
        </BMultiSelect>
    </div>\`
  }),
  args: {
    modelValue: [{
      label: "Option 1",
      something: 0,
      selected: false
    }, {
      label: "Option 2",
      something: 1,
      selected: true
    }, {
      label: "Option 3",
      something: 2,
      selected: false
    }, {
      label: "Option 4",
      something: 3,
      selected: false
    }, {
      label: "Option 5",
      something: 4,
      selected: false
    }],
    labelValue: "label",
    icon: "",
    expanded: false,
    labelKey: "label",
    selectedKey: "selected",
    searchable: false,
    disabled: false,
    required: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    absolute: false
  }
}`,...(i=(o=a.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};const f=["Primary","CustomItem"];export{a as CustomItem,e as Primary,f as __namedExportsOrder,y as default};
