import{B as s}from"./BRadioButton-CoFt9q2V.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const c={component:s,tags:["autodocs"],argTypes:{modelValue:{description:"Estado do radio button (v-model).",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},groupValue:{description:"Valor associado a este radio button, usado com BGroup.",control:{type:"text"},table:{type:{summary:"any"},defaultValue:{summary:"null"}}},disabled:{description:"Desabilita o radio button.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},isDiv:{description:"Renderiza o componente com um estilo alternativo (parecido com uma div).",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},default:{description:"Slot para o conteúdo/label dentro do radio button.",table:{type:{summary:"VNode | string"}}}}},e={render:o=>({components:{BRadioButton:s},setup(){return{args:o}},template:'<BRadioButton v-model="args.modelValue" name="test" :group-value="args.groupValue" :disabled="args.disabled" :is-div="args.isDiv">Test radio</BRadioButton>'}),args:{modelValue:!1,groupValue:null,disabled:!1,isDiv:!1}},a={render:o=>({components:{BRadioButton:s},setup(){return{args:o}},template:'<BRadioButton v-model="args.modelValue" name="test" :group-value="args.groupValue" :disabled="args.disabled" :is-div="args.isDiv">Test radio</BRadioButton>'}),args:{modelValue:!1,groupValue:null,disabled:!1,isDiv:!0}};var t,r,l;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BRadioButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<BRadioButton v-model="args.modelValue" name="test" :group-value="args.groupValue" :disabled="args.disabled" :is-div="args.isDiv">Test radio</BRadioButton>'
  }),
  args: {
    modelValue: false,
    groupValue: null,
    disabled: false,
    isDiv: false
  }
}`,...(l=(r=e.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};var d,u,i;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BRadioButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<BRadioButton v-model="args.modelValue" name="test" :group-value="args.groupValue" :disabled="args.disabled" :is-div="args.isDiv">Test radio</BRadioButton>'
  }),
  args: {
    modelValue: false,
    groupValue: null,
    disabled: false,
    isDiv: true
  }
}`,...(i=(u=a.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};const b=["Primary","RadioDiv"];export{e as Primary,a as RadioDiv,b as __namedExportsOrder,c as default};
