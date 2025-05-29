import{B as s}from"./BToggle-CgGWJJlD.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const b={component:s,tags:["autodocs"],argTypes:{modelValue:{description:"Estado do toggle (v-model).",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},rhs:{description:"Posiciona o toggle à direita do label.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{description:"Desabilita o toggle.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},default:{description:"Slot para o label ao lado do toggle.",table:{type:{summary:"VNode | string"}}}}},n={modelValue:!1,rhs:!1,disabled:!1},e={render:r=>({components:{BToggle:s},setup(){return{args:r}},template:'<BToggle v-model="args.modelValue" :disabled="args.disabled" :rhs="args.rhs">Test label</BToggle>'}),args:n},a={render:r=>({components:{BToggle:s},setup(){return{args:r}},template:'<BToggle v-model="args.modelValue" :disabled="args.disabled" rhs>Right-hand side</BToggle>'}),args:{...n,rhs:!0}};var o,l,t;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BToggle
    },
    setup() {
      return {
        args
      };
    },
    template: '<BToggle v-model="args.modelValue" :disabled="args.disabled" :rhs="args.rhs">Test label</BToggle>'
  }),
  args: defaultArgs
}`,...(t=(l=e.parameters)==null?void 0:l.docs)==null?void 0:t.source}}};var d,g,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BToggle
    },
    setup() {
      return {
        args
      };
    },
    template: '<BToggle v-model="args.modelValue" :disabled="args.disabled" rhs>Right-hand side</BToggle>'
  }),
  args: {
    ...defaultArgs,
    rhs: true
  }
}`,...(m=(g=a.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};const y=["Primary","RHS"];export{e as Primary,a as RHS,y as __namedExportsOrder,b as default};
