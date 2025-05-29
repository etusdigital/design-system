import{B as t}from"./BColorPicker-DNXnPHYw.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./index-BQ4pCYp0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const u={component:t,tags:["autodocs"],argTypes:{modelValue:{type:{summary:"text"}},type:{type:{summary:"text"},control:"select",options:["hexa","hsla","hwb","hsva","rgba"],table:{defaultValue:{summary:"hexa"}},description:"This property will be the color type."},noShadow:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"When noShadow property is true, the card will have no shadow."}}},l={modelValue:"",type:"hexa",noShadow:!1},e={render:s=>({components:{BColorPicker:t},setup(){return{args:s}},template:'<BColorPicker v-model="args.modelValue" :type="args.type" :no-shadow="args.noShadow" />'}),args:l};var r,a,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BColorPicker
    },
    setup() {
      return {
        args
      };
    },
    template: '<BColorPicker v-model="args.modelValue" :type="args.type" :no-shadow="args.noShadow" />'
  }),
  args: defaultArgs
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const c=["Primary"];export{e as Primary,c as __namedExportsOrder,u as default};
