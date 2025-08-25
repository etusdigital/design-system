import{B as l}from"./BDialog-BY0fTfBV.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./Overlay-Bee7CycO.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const m={component:l,tags:["autodocs"],argTypes:{modelValue:{type:{summary:"boolean"},description:"Determine if the dialog is displayed or not."},width:{type:{summary:"text"},table:{defaultValue:{summary:"fit-content"}},description:"Determine the dialog width."},height:{type:{summary:"text"},table:{defaultValue:{summary:"fit-content"}},description:"Determine the dialog height."},noOutsideClose:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Determine if the dialog will not close when the user click outside it."},default:{description:"This slot will be the dialog content."}}},i={modelValue:!1,width:"60%",height:"fit-content",noOutsideClose:!1},e={render:o=>({components:{BDialog:l},setup(){return{args:o}},template:`
        <BButton  @click="args.modelValue = !args.modelValue">Show Dialog</BButton>
        <BDialog
             v-model="args.modelValue"
             :width="args.width"
             :height="args.height"
             :no-outside-close="args.noOutsideClose"
        >
            <div class="flex flex-col p-xl gap-sm">
                <h2 class="font-bold text-lg">Dialog</h2>
                <p class="text-sm text-neutral-foreground-low">Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.</p>
                <div class="flex justify-end w-full gap-xs">
                    <BButton variant="plain" @click="args.modelValue = false">Cancel</BButton>
                    <BButton>Save</BButton>
                </div>
            </div>
        </BDialog>
        `}),args:i};var t,a,s;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BDialog
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <BButton  @click="args.modelValue = !args.modelValue">Show Dialog</BButton>
        <BDialog
             v-model="args.modelValue"
             :width="args.width"
             :height="args.height"
             :no-outside-close="args.noOutsideClose"
        >
            <div class="flex flex-col p-xl gap-sm">
                <h2 class="font-bold text-lg">Dialog</h2>
                <p class="text-sm text-neutral-foreground-low">Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.</p>
                <div class="flex justify-end w-full gap-xs">
                    <BButton variant="plain" @click="args.modelValue = false">Cancel</BButton>
                    <BButton>Save</BButton>
                </div>
            </div>
        </BDialog>
        \`
  }),
  args: defaultArgs
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const c=["Primary"];export{e as Primary,c as __namedExportsOrder,m as default};
