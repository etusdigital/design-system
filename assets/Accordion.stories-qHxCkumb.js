import{A as i,_ as e}from"./iframe-oiXQscte.js";var r,n,t,s,d,l;const p={component:i,argTypes:{modelValue:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"The collapse state. Optional."},duration:{type:{name:"number"},table:{defaultValue:{summary:"150"}},description:"The duration time in milisseconds. Optional."},noShadow:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If true, the collapse will not have a shadow. Optional."},header:{description:"This slot will be the collapse header."},default:{description:"This slot will be the collapse content."}}};var u={modelValue:!1,duration:150,noShadow:!1},c=function(m){return{components:{Accordion:i},setup:function(){return{args:m}},template:`
      <Accordion v-model="args.modelValue" :duration="args.duration" :no-shadow="args.noShadow">
          <template #header>
              <h4 class="text-neutral-foreground-high">Accordion component</h4>
          </template>
          <div class="flex items-end justify-start gap-base">
              <p>
                Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas
                amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a
                massa praesent ultricies.
              </p>
          </div>
      </Accordion>
      `}},a={render:c,args:u},o={render:c,args:e(e({},u),{noShadow:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(r=a.parameters)===null||r===void 0?void 0:r.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defArgs
}`},(t=(n=a.parameters)===null||n===void 0?void 0:n.docs)===null||t===void 0?void 0:t.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(s=o.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defArgs,
    noShadow: true
  }
}`},(l=(d=o.parameters)===null||d===void 0?void 0:d.docs)===null||l===void 0?void 0:l.source)})});const h=Object.freeze(Object.defineProperty({__proto__:null,NoShadow:o,Primary:a,default:p},Symbol.toStringTag,{value:"Module"}));export{h as A,o as N,a as P};
