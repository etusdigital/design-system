import{B as s}from"./BCrop-CeUpEoP9.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./index-BQ4pCYp0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const n=""+new URL("banner-DtzB6Oss.jpg",import.meta.url).href,c={component:s,tags:["autodocs"],argTypes:{modelValue:{type:{summary:"File"},description:"This property will be the file to crop."},src:{type:{summary:"File"},description:"This property will be the image to crop."},width:{type:{summary:"text"},table:{defaultValue:{summary:"360px"}},description:"This property will be the component width."},height:{type:{summary:"text"},table:{defaultValue:{summary:"200px"}},description:"This property will be the component height."}}},l={modelValue:void 0,src:n,width:"360px",height:"200px"},e={render:o=>({components:{BCrop:s},setup(){return{args:o}},template:`
      <BCrop
          v-model="args.modelValue"
          :src="args.src"
          :width="args.width"
          :height="args.height"
      />
      <span class="block mt-[1em]">Model value (it can have a delay):</span>
      <img class="mt-4 border-[.1em] border-black border-solid" :src="args.modelValue" />`}),args:l};var r,t,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BCrop
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BCrop
          v-model="args.modelValue"
          :src="args.src"
          :width="args.width"
          :height="args.height"
      />
      <span class="block mt-[1em]">Model value (it can have a delay):</span>
      <img class="mt-4 border-[.1em] border-black border-solid" :src="args.modelValue" />\`
  }),
  args: defaultArgs
}`,...(a=(t=e.parameters)==null?void 0:t.docs)==null?void 0:a.source}}};const h=["Primary"];export{e as Primary,h as __namedExportsOrder,c as default};
