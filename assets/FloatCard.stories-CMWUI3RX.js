import{q as i,_ as e}from"./iframe-aw2KxkpY.js";var r,t,n,l,s,d;const p={component:i,argTypes:{modelValue:{description:"Controls the visibility state of the floating card."},mode:{type:{name:"string"},control:"select",options:["click","hover"],table:{defaultValue:{summary:"click"}},description:"Interaction mode for showing/hiding the card."},disabled:{type:{name:"boolean"},control:"boolean",table:{defaultValue:{summary:"false"}},description:"Whether the floating card is disabled."},manualFocus:{type:{name:"boolean"},control:"boolean",table:{defaultValue:{summary:"false"}},description:"Doesn't move focus to the card when it opens in click mode."}}};var c={modelValue:!1,mode:"click",disabled:!1},u=function(m){return{components:{FloatCard:i},setup:function(){return{args:m}},template:`
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
  `}},a={render:u,args:c},o={render:u,args:e(e({},c),{mode:"click"})};a.parameters=e(e({},a.parameters),{docs:e(e({},(r=a.parameters)===null||r===void 0?void 0:r.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(n=(t=a.parameters)===null||t===void 0?void 0:t.docs)===null||n===void 0?void 0:n.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(l=o.parameters)===null||l===void 0?void 0:l.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    mode: "click" as const
  }
}`},(d=(s=o.parameters)===null||s===void 0?void 0:s.docs)===null||d===void 0?void 0:d.source)})});const g=Object.freeze(Object.defineProperty({__proto__:null,ClickMode:o,Primary:a,default:p},Symbol.toStringTag,{value:"Module"}));export{g as F,a as P};
