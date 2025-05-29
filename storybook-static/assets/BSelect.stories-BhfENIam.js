import{_ as x}from"./BSelect-CIz7JRiB.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./SelectContent-7yYIGyTY.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Option-BBYBztsW.js";import"./index-BQ4pCYp0.js";const B={component:x,tags:["autodocs"],argTypes:{modelValue:{description:'Will be an item from the "items" array at the selected index.',control:{type:"object"},table:{type:{summary:"any"}}},labelValue:{description:"Will be the select label.",control:{type:"text"},table:{type:{summary:"string | undefined"}}},items:{description:'Array of values to be used as options. Can also be an array of objects, in which case you should use the prop "labelKey" to specify which key to use as a label.',control:{type:"object"},table:{type:{summary:"any[]"}}},icon:{description:"Ícone a ser exibido no select.",control:{type:"text"},table:{type:{summary:"string | undefined"}}},expanded:{description:"Controla o estado expandido (usar com v-model:expanded)",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}},labelKey:{description:"Chave para obter o label do item no array de objetos.",control:{type:"text"},table:{type:{summary:"string | undefined"},defaultValue:{summary:"label"}}},valueKey:{description:"Chave para obter o valor do item no array de objetos (se diferente do próprio item).",control:{type:"text"},table:{type:{summary:"string | undefined"},defaultValue:{summary:"value"}}},disabled:{description:"Desabilita o select.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}},isError:{description:"Activate error mode.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}},errorMessage:{description:"Will be the error message.",control:{type:"text"},table:{type:{summary:"string | undefined"}}},infoMessage:{description:"Will be the info message.",control:{type:"text"},table:{type:{summary:"string | undefined"}}},secondary:{description:"Aplica estilo secundário ao select.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}},searchText:{description:"This slot will be placeholder for the input when searchable is true.",table:{type:{summary:"slot"}}},default:{description:"This slot will be displayed on the select area.",table:{type:{summary:"slot"}}},status:{description:"This slot will be status when a item is selected. Param: item (selected item).",table:{type:{summary:"slot"}}},item:{description:"This slot will be displayed as an option. Params: item and index.",table:{type:{summary:"slot"}}},actions:{description:"This slot will be the select actions, displayed in the bottom of the dropdown",table:{type:{summary:"slot"}}}}},l={modelValue:null,items:["Option 1","Option 2","Option 3","Option 4","Option 5"],icon:"",expanded:!1,labelKey:"label",valueKey:"value",labelValue:"label",searchable:!1,disabled:!1,required:!1,isError:!1,errorMessage:"",infoMessage:"",absolute:!1,secondary:!1},n=`
<BSelect 
    v-model="args.modelValue" 
    v-model:expanded="args.expanded" 
    :label-value="args.labelValue"
    :items="args.items" 
    :value-key="args.valueKey"
    :icon="args.icon" 
    :absolute="args.absolute" 
    :label-key="args.labelKey" 
    :required="args.required" 
    :searchable="args.searchable" 
    :disabled="args.disabled"
    :is-error="args.isError"
    :error-message="args.errorMessage"
    :info-message="args.infoMessage"
    :secondary="args.secondary"
>
    Placeholder
</BSelect>`,a={render:e=>({setup(){return{args:e}},template:`
        ${n}
        <span class="block mt-[1em]">Selected: {{ args.modelValue }}</span>`}),args:l},s={render:e=>({setup(){return{args:e}},template:`
        ${n}
        <span class="block mt-[1em]">Selected: {{ JSON.stringify(args.modelValue, null, 2) }}</span>`}),args:{...l,items:[{label:"Option 1",something:0},{label:"Option 2",something:1},{label:"Option 3",something:2},{label:"Option 4",something:3}]}},t={render:e=>({setup(){return{args:e}},template:n}),args:{...l,secondary:!0}},r={render:e=>({setup(){return{args:e}},template:`
      <BSelect 
          v-model="args.modelValue" 
          v-model:expanded="args.expanded"
          :labelValue="args.labelValue"
          :items="args.items" :icon="args.icon" 
          :absolute="args.absolute" 
          :label-key="args.labelKey" 
          :required="args.required" 
          :searchable="args.searchable" 
          :disabled="args.disabled" 
          :secondary="args.secondary"
      >
          Placeholder
          <template #item="{ item, index }">
              <div class="flex items-center gap-xs">
                  <BIcon name="account_circle" />
                  {{ item }}
              </div>
          </template>
      </BSelect>`}),args:l};var o,i,d;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
        \${defaultHtml}
        <span class="block mt-[1em]">Selected: {{ args.modelValue }}</span>\`
  }),
  args: defaultArgs
}`,...(d=(i=a.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var m,c,u;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
        \${defaultHtml}
        <span class="block mt-[1em]">Selected: {{ JSON.stringify(args.modelValue, null, 2) }}</span>\`
  }),
  args: {
    ...defaultArgs,
    items: [{
      label: "Option 1",
      something: 0
    }, {
      label: "Option 2",
      something: 1
    }, {
      label: "Option 3",
      something: 2
    }, {
      label: "Option 4",
      something: 3
    }]
  }
}`,...(u=(c=s.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var p,b,y;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: defaultHtml
  }),
  args: {
    ...defaultArgs,
    secondary: true
  }
}`,...(y=(b=t.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var g,f,h;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
      <BSelect 
          v-model="args.modelValue" 
          v-model:expanded="args.expanded"
          :labelValue="args.labelValue"
          :items="args.items" :icon="args.icon" 
          :absolute="args.absolute" 
          :label-key="args.labelKey" 
          :required="args.required" 
          :searchable="args.searchable" 
          :disabled="args.disabled" 
          :secondary="args.secondary"
      >
          Placeholder
          <template #item="{ item, index }">
              <div class="flex items-center gap-xs">
                  <BIcon name="account_circle" />
                  {{ item }}
              </div>
          </template>
      </BSelect>\`
  }),
  args: defaultArgs
}`,...(h=(f=r.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const K=["Primary","ObjectArray","Secondary","CustomItem"];export{r as CustomItem,s as ObjectArray,a as Primary,t as Secondary,K as __namedExportsOrder,B as default};
