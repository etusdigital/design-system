import{B as a}from"./BPagination-BpbKiSne.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const i={component:a,tags:["autodocs"],argTypes:{modelValue:{description:"This property will be the selected page.",control:{type:"number"},table:{type:{summary:"number"},defaultValue:{summary:"1"}}},length:{description:"This property will be the number of pages.",control:{type:"number"},table:{type:{summary:"number"},defaultValue:{summary:"1"}}}}},s={modelValue:1,length:1},e={render:o=>({components:{BPagination:a},setup(){return{args:o}},template:`
      <BPagination 
        v-model="args.modelValue"
        :length="args.length"
      />
    `}),args:s};var r,n,t;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BPagination
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BPagination 
        v-model="args.modelValue"
        :length="args.length"
      />
    \`
  }),
  args: defaultArgs
}`,...(t=(n=e.parameters)==null?void 0:n.docs)==null?void 0:t.source}}};const g=["Primary"];export{e as Primary,g as __namedExportsOrder,i as default};
