import{I as f,_ as e}from"./iframe-CEhHUQ6Y.js";var s,a,i,l,c,d,u,p,m;const x={component:f,argTypes:{title:{type:{name:"string"},description:"This prop will be the card title."},icon:{type:{name:"string"},description:"This prop will be the card icon."},color:{type:{name:"string"},table:{defaultValue:{summary:"primary"}},description:"This prop will be the icon and title color."},isIconRound:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If this prop is true, the icon won't be surrounded by a circle with the card color."},default:{description:"This slot will be the card content."},"title-actions":{description:"This slot will be the actions in the title level."}}};var v={title:"Send Message: Message Name",icon:"send",color:"",isIconRound:!1},g=function(r){return{setup:function(){return{args:r}},template:`
    <IconCard :title="args.title" :icon="args.icon" :color="args.color" :is-icon-round="args.isIconRound">
        <template #title-actions>
            <Icon name="visibility" class="cursor-pointer" />
        </template>
        
        <div class="mt-sm">
            <p>Card content goes here</p>
        </div>
    </IconCard>
  `}},t={render:function(r){return{components:{IconCard:f},setup:function(){return{args:r}},template:`
        <IconCard class="w-fit" :title="args.title" :icon="args.icon" :color="args.color" :is-icon-round="args.isIconRound">
          <template #title-actions>
            <Icon class="text-neutral-interaction-default cursor-pointer hover:text-neutral-interaction-hover" name="visibility" />
          </template>
          <div class="flex flex-col gap-sm mt-sm">
              <div class="flex flex-col gap-xxs">
                <h4 class="text-neutral-foreground-high text-sm font-bold">Subject: %Email Subject%</h4>
                <p class="text-xs text-neutral-foreground-high">Links: <a class="lowercase cursor-pointer">https://cartaofeito.com/cartao-santander-sx-p1/</a></p>
              </div>
              <div class="flex gap-xs overflow-x-auto max-w-full pb-xxs">
                <MetricCard icon="science" title="Sample" type="dashed" color="info" value="10%" />
                <MetricCard icon="drafts" title="Open" value="50%" description="100.000.000" class="min-w-[31%]" />
                <MetricCard icon="arrow_selector_tool" title="Click" value="34%" description="68.000.000" type="success" class="min-w-[30%]" />
                <MetricCard icon="touch_app" title="CTOR" value="15%" class="min-w-[30%]" />
              </div>
              <div class="flex justify-between items-center">
                <div class="flex gap-xxs items-center text-neutral-foreground-high">
                  <Icon name="mail" size="20px" />
                  <p class="text-sm font-bold">Total delivered: 200.000.000</p>
                </div>
                <Button size="small">More statistics</Button>
              </div>
          </div>
        </IconCard>
      `}},args:v},n={render:g,args:v},o={render:g,args:e(e({},v),{icon:"info",isIconRound:!0})};t.parameters=e(e({},t.parameters),{docs:e(e({},(s=t.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      IconCard
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <IconCard class="w-fit" :title="args.title" :icon="args.icon" :color="args.color" :is-icon-round="args.isIconRound">
          <template #title-actions>
            <Icon class="text-neutral-interaction-default cursor-pointer hover:text-neutral-interaction-hover" name="visibility" />
          </template>
          <div class="flex flex-col gap-sm mt-sm">
              <div class="flex flex-col gap-xxs">
                <h4 class="text-neutral-foreground-high text-sm font-bold">Subject: %Email Subject%</h4>
                <p class="text-xs text-neutral-foreground-high">Links: <a class="lowercase cursor-pointer">https://cartaofeito.com/cartao-santander-sx-p1/</a></p>
              </div>
              <div class="flex gap-xs overflow-x-auto max-w-full pb-xxs">
                <MetricCard icon="science" title="Sample" type="dashed" color="info" value="10%" />
                <MetricCard icon="drafts" title="Open" value="50%" description="100.000.000" class="min-w-[31%]" />
                <MetricCard icon="arrow_selector_tool" title="Click" value="34%" description="68.000.000" type="success" class="min-w-[30%]" />
                <MetricCard icon="touch_app" title="CTOR" value="15%" class="min-w-[30%]" />
              </div>
              <div class="flex justify-between items-center">
                <div class="flex gap-xxs items-center text-neutral-foreground-high">
                  <Icon name="mail" size="20px" />
                  <p class="text-sm font-bold">Total delivered: 200.000.000</p>
                </div>
                <Button size="small">More statistics</Button>
              </div>
          </div>
        </IconCard>
      \`
  }),
  args: defaultArgs
}`},(i=(a=t.parameters)===null||a===void 0?void 0:a.docs)===null||i===void 0?void 0:i.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(l=n.parameters)===null||l===void 0?void 0:l.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(d=(c=n.parameters)===null||c===void 0?void 0:c.docs)===null||d===void 0?void 0:d.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(u=o.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: 'info',
    isIconRound: true
  }
}`},(m=(p=o.parameters)===null||p===void 0?void 0:p.docs)===null||m===void 0?void 0:m.source)})});const b=Object.freeze(Object.defineProperty({__proto__:null,Default:n,Primary:t,default:x,isIconRound:o},Symbol.toStringTag,{value:"Module"}));export{n as D,b as I,t as P,o as i};
