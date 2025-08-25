import{B as s}from"./BCollapse-DHoxmaTf.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const p={component:s,tags:["autodocs"],argTypes:{modelValue:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"The collapse state. Optional."},duration:{type:{summary:"number"},table:{defaultValue:{summary:150}},description:"The duration time in milisseconds. Optional."},noShadow:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"If true, the collapse will not have a shadow. Optional."},header:{description:"This slot will be the collapse header."},default:{description:"This slot will be the collapse content."}}},n={modelValue:!1,duration:150,noShadow:!1},e={render:l=>({components:{BCollapse:s},setup(){return{args:l}},template:`
        <BCollapse v-model="args.modelValue" :duration="args.duration" :no-shadow="args.noShadow">
            <template #header>
                <h4 class="text-neutral-foreground-high">Collapse component</h4>
            </template>
            <div class="flex items-end justify-start gap-base">
                <div>
                    <BInput label="Input"/>
                </div>
                <BToggle>Switch</BToggle>
            </div>
        </BCollapse>
        `}),args:n};var a,t,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BCollapse
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <BCollapse v-model="args.modelValue" :duration="args.duration" :no-shadow="args.noShadow">
            <template #header>
                <h4 class="text-neutral-foreground-high">Collapse component</h4>
            </template>
            <div class="flex items-end justify-start gap-base">
                <div>
                    <BInput label="Input"/>
                </div>
                <BToggle>Switch</BToggle>
            </div>
        </BCollapse>
        \`
  }),
  args: defArgs
}`,...(o=(t=e.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};const m=["Primary"];export{e as Primary,m as __namedExportsOrder,p as default};
