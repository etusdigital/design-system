import{g as k,_ as e}from"./iframe-D9ZodyF1.js";var i,c,d,u,p,v,m,f,g,x,b,_,h,C,y;const w={component:k,argTypes:{modelValue:{control:{type:"number"}},options:{control:{type:"object"}},visible:{control:{type:"number"}},interval:{control:{type:"number"}},disabled:{control:{type:"boolean"}},circular:{control:{type:"boolean"}},vertical:{control:{type:"boolean"}},option:{description:"This slot will be displayed as an option. Params: option and index."}}};var n={modelValue:0,options:[{url:"https://cartaofeito.com/cartao-santander-sx-p1/",sample:{value:"10%"},open:{value:"10%",description:"100.000.000"},click:{value:"10%",description:"100.000.000"},ctor:{value:"10%"},totalDelivered:"100.000.000"},{url:"https://cartaofeito.com/cartao-itau-sx-p1/",sample:{value:"20%"},open:{value:"20%",description:"200.000.000"},click:{value:"20%",description:"200.000.000"},ctor:{value:"20%"},totalDelivered:"200.000.000"},{url:"https://cartaofeito.com/cartao-unicred-sx-p1/",sample:{value:"30%"},open:{value:"30%",description:"300.000.000"},click:{value:"30%",description:"300.000.000"},ctor:{value:"30%"},totalDelivered:"300.000.000"},{url:"https://cartaofeito.com/cartao-banestes-sx-p1/",sample:{value:"40%"},open:{value:"40%",description:"400.000.000"},click:{value:"40%",description:"400.000.000"},ctor:{value:"40%"},totalDelivered:"400.000.000"},{url:"https://cartaofeito.com/cartao-banestes-sx-p1/",sample:{value:"50%"},open:{value:"50%",description:"500.000.000"},click:{value:"50%",description:"500.000.000"},ctor:{value:"50%"},totalDelivered:"500.000.000"}],visible:1,interval:0,disabled:!1,circular:!1,vertical:!1},D=`
  <Carousel
    v-model="args.modelValue"
    :options="args.options"
    :vertical="args.vertical"
    :disabled="args.disabled"
    :visible="args.visible"
    :interval="args.interval"
    :circular="args.circular"
  >
    <template #option="{ option, index }">
      <Card class="flex flex-col gap-sm p-base">
        <div class="flex flex-col gap-sm">
            <div class="flex flex-col gap-xxs">
              <h4 class="text-neutral-foreground-high text-sm font-bold">Subject: %Email Subject%</h4>
              <p class="text-xs text-neutral-foreground-high">Links: <a class="lowercase cursor-pointer">{{ option.url }}</a></p>
            </div>
            <div class="flex gap-xs overflow-x-auto max-w-full pb-xxs">
                <MetricCard icon="science" title="Sample" type="dashed" color="info" :value="option.sample.value" />
                <MetricCard icon="drafts" title="Open" :value="option.open.value" :description="option.open.description" class="min-w-[31%]" />
                <MetricCard icon="arrow_selector_tool" title="Click" :value="option.click.value" :description="option.click.description" type="success" class="min-w-[30%]" />
                <MetricCard icon="touch_app" title="CTOR" :value="option.ctor.value" class="min-w-[30%]" />
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-xxs items-center text-neutral-foreground-high">
                <Icon name="mail" size="20px" />
                <p class="text-sm font-bold">Total delivered: {{ option.totalDelivered }}</p>
              </div>
              <Button size="small">More statistics</Button>
            </div>
        </div>
      </Card>
    </template>
  </Carousel>
`,s=function(S){return{components:{Carousel:k},setup:function(){return{args:S}},template:D}},r={render:s,args:n},a={render:s,args:e(e({},n),{circular:!0,interval:3e3})},o={render:s,args:e(e({},n),{circular:!0})},l={render:s,args:e(e({},n),{disabled:!0})},t={render:s,args:e(e({},n),{vertical:!0})};r.parameters=e(e({},r.parameters),{docs:e(e({},(i=r.parameters)===null||i===void 0?void 0:i.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(d=(c=r.parameters)===null||c===void 0?void 0:c.docs)===null||d===void 0?void 0:d.source)})});a.parameters=e(e({},a.parameters),{docs:e(e({},(u=a.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    circular: true,
    interval: 3000
  }
}`},(v=(p=a.parameters)===null||p===void 0?void 0:p.docs)===null||v===void 0?void 0:v.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(m=o.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    circular: true
  }
}`},(g=(f=o.parameters)===null||f===void 0?void 0:f.docs)===null||g===void 0?void 0:g.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(x=l.parameters)===null||x===void 0?void 0:x.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(_=(b=l.parameters)===null||b===void 0?void 0:b.docs)===null||_===void 0?void 0:_.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(h=t.parameters)===null||h===void 0?void 0:h.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    vertical: true
  }
}`},(y=(C=t.parameters)===null||C===void 0?void 0:C.docs)===null||y===void 0?void 0:y.source)})});const R=Object.freeze(Object.defineProperty({__proto__:null,Circular:o,Disabled:l,Interval:a,Primary:r,Vertical:t,default:w},Symbol.toStringTag,{value:"Module"}));export{R as C,l as D,a as I,r as P,t as V,o as a};
