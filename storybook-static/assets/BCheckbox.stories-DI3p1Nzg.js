import{B as r}from"./BCheckbox-Be3MqHRH.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const h={component:r,tags:["autodocs"],argTypes:{modelValue:{description:"Estado do checkbox (v-model). Pode ser boolean ou null se allowIndeterminate for true.",control:{type:"boolean"},table:{type:{summary:"boolean | null"},defaultValue:{summary:"false"}}},rhs:{description:"Posiciona o checkbox à direita do label.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},allowIndeterminate:{description:"Permite que o checkbox tenha um estado indeterminado (modelValue pode ser null).",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{description:"Desabilita o checkbox.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},default:{description:"Slot para o label ao lado do checkbox.",table:{type:{summary:"VNode | string"}}}}},c={modelValue:!1,rhs:!1,allowIndeterminate:!1,disabled:!1},e={render:o=>({components:{BCheckbox:r},setup(){return{args:o}},template:'<BCheckbox id="primary-checkbox" v-model="args.modelValue" :disabled="args.disabled" :rhs="args.rhs" :allowIndeterminate="args.allowIndeterminate">Test label</BCheckbox>'}),args:c},a={render:o=>({components:{BCheckbox:r},setup(){return{args:o}},template:'<BCheckbox id="rhs-checkbox" v-model="args.modelValue" :disabled="args.disabled" :allowIndeterminate="args.allowIndeterminate" rhs>Test label</BCheckbox>'}),args:c};var l,s,t;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BCheckbox
    },
    setup() {
      return {
        args
      };
    },
    template: '<BCheckbox id="primary-checkbox" v-model="args.modelValue" :disabled="args.disabled" :rhs="args.rhs" :allowIndeterminate="args.allowIndeterminate">Test label</BCheckbox>'
  }),
  args: defaultArgs
}`,...(t=(s=e.parameters)==null?void 0:s.docs)==null?void 0:t.source}}};var d,n,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BCheckbox
    },
    setup() {
      return {
        args
      };
    },
    template: '<BCheckbox id="rhs-checkbox" v-model="args.modelValue" :disabled="args.disabled" :allowIndeterminate="args.allowIndeterminate" rhs>Test label</BCheckbox>'
  }),
  args: defaultArgs
}`,...(m=(n=a.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};const g=["Primary","RHS"];export{e as Primary,a as RHS,g as __namedExportsOrder,h as default};
