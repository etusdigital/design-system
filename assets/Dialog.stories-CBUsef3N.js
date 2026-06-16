import{m as d,_ as e}from"./iframe-DeP1hNCB.js";var s,n,l,o,i,r;const g={component:d,argTypes:{modelValue:{type:{name:"boolean"},description:"Determine if the dialog is displayed or not."},width:{type:{name:"string"},table:{defaultValue:{summary:"fit-content"}},description:"Determine the dialog width."},height:{type:{name:"string"},table:{defaultValue:{summary:"fit-content"}},description:"Determine the dialog height."},noOutsideClose:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine if the dialog will not close when the user click outside it."},class:{type:{name:"string"},table:{defaultValue:{summary:""}},description:"Add custom CSS classes to the dialog element."},zIndex:{type:{name:"number"},table:{defaultValue:{summary:"1002"}},description:"Determine the z-index of the dialog overlay (backdrop)."},default:{description:"This slot will be the dialog content."}}};var u={modelValue:!1,width:"60%",height:"fit-content",noOutsideClose:!1,class:"",zIndex:1002},c=function(m){return{components:{Dialog:d},setup:function(){return{args:m}},template:`
    <Button @click="args.modelValue = !args.modelValue">Show Dialog</Button>
    <Dialog
         v-model="args.modelValue"
         :width="args.width"
         :height="args.height"
         :no-outside-close="args.noOutsideClose"
         :class="args.class"
         :z-index="args.zIndex"
    >
        <div class="flex flex-col p-xl gap-sm">
            <h2 class="font-bold text-lg">Dialog</h2>
            <p class="text-sm text-neutral-foreground-low">
              Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
              amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
              massa praesent ultricies.
            </p>
            <div class="flex justify-end w-full gap-xs">
                <Button variant="plain" @click="args.modelValue = false">Cancel</Button>
                <Button @click="args.modelValue = false">Save</Button>
            </div>
        </div>
    </Dialog>
  `}},a={render:c,args:u},t={render:c,args:e(e({},u),{noOutsideClose:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(s=a.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(l=(n=a.parameters)===null||n===void 0?void 0:n.docs)===null||l===void 0?void 0:l.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(o=t.parameters)===null||o===void 0?void 0:o.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    noOutsideClose: true
  }
}`},(r=(i=t.parameters)===null||i===void 0?void 0:i.docs)===null||r===void 0?void 0:r.source)})});const f=Object.freeze(Object.defineProperty({__proto__:null,NoOutsideClose:t,Primary:a,default:g},Symbol.toStringTag,{value:"Module"}));export{f as D,t as N,a as P};
