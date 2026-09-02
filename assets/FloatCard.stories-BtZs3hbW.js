import{q as i,_ as e}from"./iframe-B9ISbT5E.js";var o,t,n,d,s,l;const p={component:i,argTypes:{modelValue:{description:"Controls the visibility state of the floating card."},mode:{type:{name:"string"},control:"select",options:["click","hover"],table:{defaultValue:{summary:"click"}},description:"Interaction mode for showing/hiding the card."},disabled:{type:{name:"boolean"},control:"boolean",table:{defaultValue:{summary:"false"}},description:"Whether the floating card is disabled."}}};var c={modelValue:!1,mode:"click",disabled:!1},u=function(m){return{components:{FloatCard:i},setup:function(){return{args:m}},template:`
    <FloatCard 
      v-model="args.modelValue"
      :mode="args.mode"
      :disabled="args.disabled"
    >
      <Button>Click to show card</Button>
      
      <template #card>
        <div class="p-base">
          <h4 class="mb-xs">Floating Card</h4>
          <p class="text-sm">This is the content inside the floating card.</p>
        </div>
      </template>
    </FloatCard>
  `}},a={render:u,args:c},r={render:u,args:e(e({},c),{mode:"click"})};a.parameters=e(e({},a.parameters),{docs:e(e({},(o=a.parameters)===null||o===void 0?void 0:o.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(n=(t=a.parameters)===null||t===void 0?void 0:t.docs)===null||n===void 0?void 0:n.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(d=r.parameters)===null||d===void 0?void 0:d.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    mode: "click" as const
  }
}`},(l=(s=r.parameters)===null||s===void 0?void 0:s.docs)===null||l===void 0?void 0:l.source)})});const f=Object.freeze(Object.defineProperty({__proto__:null,ClickMode:r,Primary:a,default:p},Symbol.toStringTag,{value:"Module"}));export{f as F,a as P};
