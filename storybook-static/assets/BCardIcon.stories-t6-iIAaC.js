import{B as i}from"./BCardIcon-rJpBdi-y.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const d={component:i,tags:["autodocs"],argTypes:{title:{type:{summary:"string"},description:"This prop will be the card title."},icon:{type:{summary:"string"},description:"This prop will be the card icon."},color:{type:{summary:"string"},table:{defaultValue:{summary:"primary"}},description:"This prop will be the icon and title color."},isIconRound:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"If this prop is true, the icon won't be surrounded by a circle with the card color."},default:{description:"This slot will be the card content."},"title-actions":{description:"This slot will be the actions in the title level."}}},r={title:"Send Message: Message Name",icon:"send",color:"",isIconRound:!1},e={render:n=>({components:{BCardIcon:i},setup(){return{args:n}},template:`
        <BCardIcon class="w-fit" :title="args.title" :icon="args.icon" :color="args.color" :is-icon-round="args.isIconRound">
          <template #title-actions>
            <BIcon class="text-neutral-interaction-default cursor-pointer hover:text-neutral-interaction-hover" name="visibility" />
          </template>
          <div class="flex flex-col gap-sm mt-sm">
              <div class="flex flex-col gap-xxs">
                <h4 class="text-neutral-foreground-high text-sm font-bold">Subject: %Email Subject%</h4>
                <p class="text-xs text-neutral-foreground-high">Links: <a class="lowercase cursor-pointer">https://cartaofeito.com/cartao-santander-sx-p1/</a></p>
              </div>
              <div class="flex gap-xs overflow-x-auto max-w-full pb-xxs">
                <BMetricCard icon="science" title="Sample" type="sample" value="10%" />
                <BMetricCard icon="drafts" title="Open" value="50%" description="100.000.000" class="min-w-[31%]" />
                <BMetricCard icon="arrow_selector_tool" title="Click" value="34%" description="68.000.000" type="success" class="min-w-[30%]" />
                <BMetricCard icon="touch_app" title="CTOR" value="15%" class="min-w-[30%]" />
              </div>
              <div class="flex justify-between items-center">
                <div class="flex gap-xxs items-center text-neutral-foreground-high">
                  <BIcon name="mail" size="20px" />
                  <p class="text-sm font-bold">Total delivered: 200.000.000</p>
                </div>
                <BButton size="small">More statistics</BButton>
              </div>
          </div>
        </BCardIcon>
      `}),args:r};var t,s,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BCardIcon
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <BCardIcon class="w-fit" :title="args.title" :icon="args.icon" :color="args.color" :is-icon-round="args.isIconRound">
          <template #title-actions>
            <BIcon class="text-neutral-interaction-default cursor-pointer hover:text-neutral-interaction-hover" name="visibility" />
          </template>
          <div class="flex flex-col gap-sm mt-sm">
              <div class="flex flex-col gap-xxs">
                <h4 class="text-neutral-foreground-high text-sm font-bold">Subject: %Email Subject%</h4>
                <p class="text-xs text-neutral-foreground-high">Links: <a class="lowercase cursor-pointer">https://cartaofeito.com/cartao-santander-sx-p1/</a></p>
              </div>
              <div class="flex gap-xs overflow-x-auto max-w-full pb-xxs">
                <BMetricCard icon="science" title="Sample" type="sample" value="10%" />
                <BMetricCard icon="drafts" title="Open" value="50%" description="100.000.000" class="min-w-[31%]" />
                <BMetricCard icon="arrow_selector_tool" title="Click" value="34%" description="68.000.000" type="success" class="min-w-[30%]" />
                <BMetricCard icon="touch_app" title="CTOR" value="15%" class="min-w-[30%]" />
              </div>
              <div class="flex justify-between items-center">
                <div class="flex gap-xxs items-center text-neutral-foreground-high">
                  <BIcon name="mail" size="20px" />
                  <p class="text-sm font-bold">Total delivered: 200.000.000</p>
                </div>
                <BButton size="small">More statistics</BButton>
              </div>
          </div>
        </BCardIcon>
      \`
  }),
  args: defaultArgs
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const p=["Primary"];export{e as Primary,p as __namedExportsOrder,d as default};
