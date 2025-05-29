import{_ as g}from"./BDropdown-NpRN8-Th.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./index-BQ4pCYp0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const B={component:g,tags:["autodocs"],argTypes:{modelValue:{description:"Will be the selected current value.",control:{type:"object"},table:{type:{summary:"any"}}},expanded:{description:"Will be the expanded state. (Use with v-model:expanded)",control:{type:"boolean"},table:{type:{summary:"boolean"}}},labelValue:{description:"Will be the select label.",control:{type:"text"},table:{type:{summary:"string | undefined"}}},items:{description:"Array of object to be used as menu options. Props(label: string, value: string, icon: string, disabled: boolean, bottom: boolean, items: same instruction as items)",control:{type:"object"},table:{type:{summary:"Item[]"}}},disabled:{description:"Desabilita o dropdown.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}},isError:{description:"Activate error mode.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}},absolute:{description:"Makes the content dropdown have an absolute position.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"true"}}},errorMessage:{description:"Will be the error message.",control:{type:"text"},table:{type:{summary:"string | undefined"}}},infoMessage:{description:"Will be the info message.",control:{type:"text"},table:{type:{summary:"string | undefined"}}},getObject:{description:"Se true, o modelValue emitido será o objeto completo do item, senão apenas o 'valueKey' do item.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"}}},searchable:{description:"Habilita a busca nos itens do dropdown.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"}}},default:{description:"Slot para o conteúdo que aciona o dropdown (ex: um botão).",table:{type:{summary:"slot"}}}}},o={modelValue:void 0,expanded:!1,items:[{label:"Home",value:"home",icon:"home"},{label:"Publisher",value:"publisher",icon:"supervisor_account",items:[{label:"Group Account",value:"group-account",icon:"account_balance"},{label:"Account",value:"account",icon:"account_balance"}]},{label:"Errors",value:"errors",icon:"error",disabled:!0},{label:"Settings",value:"settings",icon:"settings",bottom:!0}],labelValue:"label",disabled:!1,required:!1,absolute:!1,isError:!1,errorMessage:"",infoMessage:"",getObject:!1,searchable:!1},b=`
<BDropdown 
    v-model="args.modelValue"
    v-model:expanded="args.expanded"
    :label-value="args.labelValue"
    :items="args.items"
    :absolute="args.absolute" 
    :required="args.required" 
    :disabled="args.disabled"
    :is-error="args.isError"
    :error-message="args.errorMessage"
    :info-message="args.infoMessage"
    :get-object="args.getObject"
    :searchable="args.searchable"
/>`,a={render:e=>({setup(){return{args:e}},template:b}),args:o},r={render:e=>({setup(){return{args:e}},template:b}),args:{...o,searchable:!0}},t={render:e=>({setup(){return{args:e}},template:`
    <BDropdown
      v-model="args.modelValue"
      v-model:expanded="args.expanded"
      :items="args.items"
      :absolute="args.absolute"
    >
      <BButton @click="args.expanded = !args.expanded">Custom Label</BButton>
    </BDropdown>`}),args:o};var s,n,l;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: defaultHtml
  }),
  args: defaultArgs
}`,...(l=(n=a.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var d,u,i;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
    searchable: true
  }
}`,...(i=(u=r.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var m,c,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
    <BDropdown
      v-model="args.modelValue"
      v-model:expanded="args.expanded"
      :items="args.items"
      :absolute="args.absolute"
    >
      <BButton @click="args.expanded = !args.expanded">Custom Label</BButton>
    </BDropdown>\`
  }),
  args: defaultArgs
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const V=["Primary","Searchable","Slot"];export{a as Primary,r as Searchable,t as Slot,V as __namedExportsOrder,B as default};
