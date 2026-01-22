import{D as d,_ as e}from"./iframe-oiXQscte.js";var o,n,l,s,i,r;const m={component:d,argTypes:{modelValue:{type:{name:"boolean"},description:"Determine if the dialog is displayed or not."},width:{type:{name:"string"},table:{defaultValue:{summary:"fit-content"}},description:"Determine the dialog width."},height:{type:{name:"string"},table:{defaultValue:{summary:"fit-content"}},description:"Determine the dialog height."},noOutsideClose:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine if the dialog will not close when the user click outside it."},default:{description:"This slot will be the dialog content."}}};var u={modelValue:!1,width:"60%",height:"fit-content",noOutsideClose:!1},c=function(g){return{components:{Dialog:d},setup:function(){return{args:g}},template:`
    <Button @click="args.modelValue = !args.modelValue">Show Dialog</Button>
    <Dialog
         v-model="args.modelValue"
         :width="args.width"
         :height="args.height"
         :no-outside-close="args.noOutsideClose"
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
  `}},t={render:c,args:u},a={render:c,args:e(e({},u),{noOutsideClose:!0})};t.parameters=e(e({},t.parameters),{docs:e(e({},(o=t.parameters)===null||o===void 0?void 0:o.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(l=(n=t.parameters)===null||n===void 0?void 0:n.docs)===null||l===void 0?void 0:l.source)})});a.parameters=e(e({},a.parameters),{docs:e(e({},(s=a.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    noOutsideClose: true
  }
}`},(r=(i=a.parameters)===null||i===void 0?void 0:i.docs)===null||r===void 0?void 0:r.source)})});const f=Object.freeze(Object.defineProperty({__proto__:null,NoOutsideClose:a,Primary:t,default:m},Symbol.toStringTag,{value:"Module"}));export{f as D,a as N,t as P};
