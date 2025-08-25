import{B as t}from"./BRadio-CmI5SVxc.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const n={component:t,tags:["autodocs"],argTypes:{modelValue:{description:"v-model para o estado do radio (checked/unchecked).",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},groupValue:{description:"Valor associado a este radio dentro de um BGroup.",control:{type:"text"},table:{type:{summary:"any"},defaultValue:{summary:"null"}}},disabled:{description:"Desabilita o radio.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},variant:{description:"Variante visual do radio.",control:"select",options:["default","onboarding"],table:{type:{summary:"'default' | 'onboarding'"},defaultValue:{summary:"default"}}},default:{description:"Slot para o label ao lado do radio.",table:{type:{summary:"VNode | string"}}}}},a={render:l=>({components:{BRadio:t},setup(){return{args:l}},template:'<BRadio v-model="args.modelValue" name="test" :group-value="args.groupValue" :disabled="args.disabled" :variant="args.variant">Test radio</BRadio>'}),args:{modelValue:!1,groupValue:null,disabled:!1,variant:"default"}};var e,o,r;a.parameters={...a.parameters,docs:{...(e=a.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BRadio
    },
    setup() {
      return {
        args
      };
    },
    template: '<BRadio v-model="args.modelValue" name="test" :group-value="args.groupValue" :disabled="args.disabled" :variant="args.variant">Test radio</BRadio>'
  }),
  args: {
    modelValue: false,
    groupValue: null,
    disabled: false,
    variant: "default"
  }
}`,...(r=(o=a.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const m=["Primary"];export{a as Primary,m as __namedExportsOrder,n as default};
