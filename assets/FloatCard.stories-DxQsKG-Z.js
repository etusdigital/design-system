import{q as g,_ as e,r as b}from"./iframe-Fbgu4Xty.js";var t,s,r,d,i,c,u,m,p;const B={component:g,argTypes:{modelValue:{description:"Controls the visibility state of the floating card."},mode:{type:{name:"string"},control:"select",options:["click","hover"],table:{defaultValue:{summary:"click"}},description:"Interaction mode for showing/hiding the card."},disabled:{type:{name:"boolean"},control:"boolean",table:{defaultValue:{summary:"false"}},description:"Whether the floating card is disabled."},manualFocus:{type:{name:"boolean"},control:"boolean",table:{defaultValue:{summary:"false"}},description:"Doesn't move focus to the card when it opens in click mode."}}};var f={modelValue:!1,mode:"click",disabled:!1},y=function(n){return{components:{FloatCard:g},setup:function(){return{args:n}},template:`
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
  `}},a={render:y,args:f},o={render:y,args:e(e({},f),{mode:"click"})},l={render:function(n){return{components:{FloatCard:g},setup:function(){var v=b(!1),h=b("");function C(){n.modelValue=!1,v.value=!0}function x(){n.modelValue=!1,h.value="Closed without opening anything"}return{args:n,dialog:v,lastAction:h,openDialog:C,closeOnly:x}},template:`
      <FloatCard
        v-model="args.modelValue"
        :mode="args.mode"
        :disabled="args.disabled"
      >
        <Button>Actions</Button>

        <template #card>
          <div class="flex flex-col p-xxs">
            <Button variant="plain" color="neutral" @click="openDialog">Open dialog</Button>
            <Button variant="plain" color="neutral" @click="closeOnly">Close only</Button>
          </div>
        </template>
      </FloatCard>
      <p class="text-sm mt-sm">{{ lastAction }}</p>

      <Dialog v-model="dialog">
        <div class="flex flex-col gap-sm p-xl">
          <h4>Dialog opened from the card</h4>
          <Button @click="dialog = false">Close</Button>
        </div>
      </Dialog>
    `}},args:f};a.parameters=e(e({},a.parameters),{docs:e(e({},(t=a.parameters)===null||t===void 0?void 0:t.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(r=(s=a.parameters)===null||s===void 0?void 0:s.docs)===null||r===void 0?void 0:r.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(d=o.parameters)===null||d===void 0?void 0:d.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    mode: "click" as const
  }
}`},(c=(i=o.parameters)===null||i===void 0?void 0:i.docs)===null||c===void 0?void 0:c.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(u=l.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      FloatCard
    },
    setup() {
      const dialog = ref(false);
      const lastAction = ref("");
      function openDialog() {
        args.modelValue = false;
        dialog.value = true;
      }
      function closeOnly() {
        args.modelValue = false;
        lastAction.value = "Closed without opening anything";
      }
      return {
        args,
        dialog,
        lastAction,
        openDialog,
        closeOnly
      };
    },
    template: \`
      <FloatCard
        v-model="args.modelValue"
        :mode="args.mode"
        :disabled="args.disabled"
      >
        <Button>Actions</Button>

        <template #card>
          <div class="flex flex-col p-xxs">
            <Button variant="plain" color="neutral" @click="openDialog">Open dialog</Button>
            <Button variant="plain" color="neutral" @click="closeOnly">Close only</Button>
          </div>
        </template>
      </FloatCard>
      <p class="text-sm mt-sm">{{ lastAction }}</p>

      <Dialog v-model="dialog">
        <div class="flex flex-col gap-sm p-xl">
          <h4>Dialog opened from the card</h4>
          <Button @click="dialog = false">Close</Button>
        </div>
      </Dialog>
    \`
  }),
  args: defaultArgs
}`},(p=(m=l.parameters)===null||m===void 0?void 0:m.docs)===null||p===void 0?void 0:p.source)})});const F=Object.freeze(Object.defineProperty({__proto__:null,ActionItems:l,ClickMode:o,Primary:a,default:B},Symbol.toStringTag,{value:"Module"}));export{F,a as P};
