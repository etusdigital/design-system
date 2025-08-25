import{_ as d}from"./BAutoComplete-CdFrCmhu.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./Option-BBYBztsW.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const f={component:d,tags:["autodocs"],argTypes:{modelValue:{type:{summary:"string"},description:"Will be the input current value."},expanded:{type:{summary:"boolean"},description:"Will be the input current value."},labelValue:{type:{summary:"text"},description:"Will be the select label."},items:{type:{summary:"array"},description:"Array of values to be used as options."},placeholder:{type:{summary:"text"}},disabled:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},isError:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Activate error mode."},absolute:{type:{summary:"boolean"},table:{defaultValue:{summary:!0}}},errorMessage:{type:{summary:"text"},description:"Will be the error message."},infoMessage:{type:{summary:"text"},description:"Will be the info message."},item:{description:"This slot will be displayed as an option. Params: item and index."}}},i={modelValue:void 0,expanded:!1,items:["Option 1","Option 2","Option 3","Option 4","Option 5"],labelValue:"label",placeholder:"Placeholder",disabled:!1,required:!1,absolute:!1,isError:!1,errorMessage:"",infoMessage:""},u=`
<BAutoComplete 
    v-model="args.modelValue" 
    v-model:expanded="args.expanded"
    :label-value="args.labelValue"
    :placeholder="args.placeholder"
    :items="args.items"
    :absolute="args.absolute" 
    :required="args.required" 
    :disabled="args.disabled"
    :is-error="args.isError"
    :error-message="args.errorMessage"
    :info-message="args.infoMessage"
/>`,e={render:a=>({setup(){return{args:a}},template:u}),args:i},r={render:a=>({setup(){return{args:a}},template:`
    <BAutoComplete
    v-model="args.modelValue" 
    v-model:expanded="args.expanded"
    :label-value="args.labelValue"
    :placeholder="args.placeholder"
    :items="args.items"
    :absolute="args.absolute" 
    :required="args.required" 
    :disabled="args.disabled"
    :is-error="args.isError"
    :error-message="args.errorMessage"
    :info-message="args.infoMessage"
    >
      <template #item="{ item, index }">
        <BIcon name="account_circle" size="1rem" class="shrink-0 h-[1em] flex items-center" /> {{ item }}
      </template>
    </BAutoComplete>`}),args:i};var s,t,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: defaultHtml
  }),
  args: defaultArgs
}`,...(l=(t=e.parameters)==null?void 0:t.docs)==null?void 0:l.source}}};var o,n,m;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
    <BAutoComplete
    v-model="args.modelValue" 
    v-model:expanded="args.expanded"
    :label-value="args.labelValue"
    :placeholder="args.placeholder"
    :items="args.items"
    :absolute="args.absolute" 
    :required="args.required" 
    :disabled="args.disabled"
    :is-error="args.isError"
    :error-message="args.errorMessage"
    :info-message="args.infoMessage"
    >
      <template #item="{ item, index }">
        <BIcon name="account_circle" size="1rem" class="shrink-0 h-[1em] flex items-center" /> {{ item }}
      </template>
    </BAutoComplete>\`
  }),
  args: defaultArgs
}`,...(m=(n=r.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};const h=["Primary","CustomItem"];export{r as CustomItem,e as Primary,h as __namedExportsOrder,f as default};
