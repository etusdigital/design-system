import{a as m,_ as e}from"./iframe-oiXQscte.js";var s,i,o,l,c,d,u,p,f;const x={component:m,argTypes:{icon:{type:{name:"string"},description:"This prop will be the card icon."},color:{type:{name:"string"},table:{defaultValue:{summary:"primary"}},description:"This prop will be the title background color."},hideDrag:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If this prop is true, the drag icon  won't be shown."},default:{description:"This slot will be the title."},card:{description:"This slot will be the card content."}}};var v={icon:"send",color:"",hideDrag:!1},g=function(r){return{components:{ActionCard:m},setup:function(){return{args:r}},template:`
      <ActionCard class="w-fit" :icon="args.icon" :color="args.color" :hide-drag="args.hideDrag">
        Label
      </ActionCard>
    `}},t={render:g,args:v},n={render:g,args:e(e({},v),{hideDrag:!0})},a={render:function(r){return{components:{ActionCard:m},setup:function(){return{args:r}},template:`
        <ActionCard class="w-fit" icon="mail" :color="args.color" :hide-drag="args.hideDrag">
          <div class="flex justify-between items-center text-white w-full">
            <div class="flex flex-col text-sm">
              <p>Send Message:</p>
              <p class="font-bold">cartaofeito-d-fluxo-cc-dia-05-e12</p>
            </div>
            <Icon class="cursor-pointer" name="visibility" />
          </div>
          <template #card>
            <div class="flex flex-col gap-sm">
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
          </template>
        </ActionCard>
      `}},args:v};t.parameters=e(e({},t.parameters),{docs:e(e({},(s=t.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(o=(i=t.parameters)===null||i===void 0?void 0:i.docs)===null||o===void 0?void 0:o.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(l=n.parameters)===null||l===void 0?void 0:l.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    hideDrag: true
  }
}`},(d=(c=n.parameters)===null||c===void 0?void 0:c.docs)===null||d===void 0?void 0:d.source)})});a.parameters=e(e({},a.parameters),{docs:e(e({},(u=a.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      ActionCard
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <ActionCard class="w-fit" icon="mail" :color="args.color" :hide-drag="args.hideDrag">
          <div class="flex justify-between items-center text-white w-full">
            <div class="flex flex-col text-sm">
              <p>Send Message:</p>
              <p class="font-bold">cartaofeito-d-fluxo-cc-dia-05-e12</p>
            </div>
            <Icon class="cursor-pointer" name="visibility" />
          </div>
          <template #card>
            <div class="flex flex-col gap-sm">
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
          </template>
        </ActionCard>
      \`
  }),
  args: defaultArgs
}`},(f=(p=a.parameters)===null||p===void 0?void 0:p.docs)===null||f===void 0?void 0:f.source)})});const b=Object.freeze(Object.defineProperty({__proto__:null,Card:a,HideDrag:n,Primary:t,default:x},Symbol.toStringTag,{value:"Module"}));export{b as A,a as C,n as H,t as P};
