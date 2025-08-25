import{B as l}from"./BSidebar-Wt6JjfGI.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./Overlay-Bee7CycO.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const c={component:l,tags:["autodocs"],argTypes:{modelValue:{description:"Determine if the dialog is displayed or not. (Use with v-model)",control:{type:"boolean"},table:{type:{summary:"boolean"}}},width:{description:"Determine the dialog width.",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:"fit-content"}}},noOutsideClose:{description:"Determine if the dialog will not close when the user click outside it.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}},default:{description:"This slot will be the dialog content.",table:{type:{summary:"slot"}}}}},n={modelValue:!1,width:"40%",noOutsideClose:!1},e={render:o=>({components:{BSidebar:l},setup(){return{args:o}},template:`
        <BButton  @click="args.modelValue = !args.modelValue">Show Sidebar</BButton>
        <BSidebar
             v-model="args.modelValue"
             :width="args.width"
             :no-outside-close="args.noOutsideClose"
        >
            <div class="flex flex-col justify-between h-full p-xl">
                <div class="flex flex-col gap-sm">
                  <h2 class="font-bold text-lg">Sidebar</h2>
                  <p class="text-sm text-neutral-foreground-low">Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.</p>
                </div>
                <div class="flex justify-end w-full gap-xs">
                    <BButton variant="plain" @click="args.modelValue = false">Cancel</BButton>
                    <BButton>Save</BButton>
                </div>
            </div>
        </BSidebar>
        `}),args:n};var t,a,s;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BSidebar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <BButton  @click="args.modelValue = !args.modelValue">Show Sidebar</BButton>
        <BSidebar
             v-model="args.modelValue"
             :width="args.width"
             :no-outside-close="args.noOutsideClose"
        >
            <div class="flex flex-col justify-between h-full p-xl">
                <div class="flex flex-col gap-sm">
                  <h2 class="font-bold text-lg">Sidebar</h2>
                  <p class="text-sm text-neutral-foreground-low">Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.</p>
                </div>
                <div class="flex justify-end w-full gap-xs">
                    <BButton variant="plain" @click="args.modelValue = false">Cancel</BButton>
                    <BButton>Save</BButton>
                </div>
            </div>
        </BSidebar>
        \`
  }),
  args: defaultArgs
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const m=["Primary"];export{e as Primary,m as __namedExportsOrder,c as default};
