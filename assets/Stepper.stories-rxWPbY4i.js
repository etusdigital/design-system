import{O as u,_ as e}from"./iframe-CEhHUQ6Y.js";var d,p,c,m,g,v,f,b,y,S,_,h,k,w,V;const z={component:u,argTypes:{modelValue:{description:"Will the current step.",table:{defaultValue:{summary:void 0}}},options:{type:{name:"array",value:{name:"object",value:{}}},description:"Array of values to be used as options."},labelKey:{type:{name:"string"},table:{defaultValue:{summary:"label"}}},valueKey:{type:{name:"string"},table:{defaultValue:{summary:"value"}}},size:{type:{name:"string"},control:"select",options:["medium","large"],table:{defaultValue:{summary:"medium"}}},disabled:{type:{name:"boolean"},description:"If it's true, the user will not be able to change the step.",table:{defaultValue:{summary:"false"}}},allowedSkip:{type:{name:"boolean"},description:"If it's true, the user will be able to skip steps.",table:{defaultValue:{summary:"false"}}},background:{type:{name:"string"},description:"This property will be the stepper background.",table:{defaultValue:{summary:"--neutral-background-default"}}},version:{type:{name:"number"},description:"This property will be the stepper version.",control:"select",options:[1,2],table:{defaultValue:{summary:"1"}}},getObject:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If true, the selected value will be an object instead of value-key value."},onChangeStep:{type:{name:"function"},description:"Will be the function called when the step change.",table:{defaultValue:{summary:"(index)=>{void}"}}}}};var o={modelValue:"basic-info",options:[{label:"Basic Info",value:"basic-info",icon:"person"},{label:"Configuration",value:"configuration",icon:"settings"},{label:"Review",value:"review",icon:"visibility"},{label:"Complete",value:"complete",icon:"check_circle"}],labelKey:"label",valueKey:"value",size:"medium",disabled:!1,allowedSkip:!1,getObject:!1,version:1,background:"#FFFFFF",onChangeStep:function(a,i){}},j=`
  <Stepper
    v-model="args.modelValue"
    :options="args.options"
    :label-key="args.labelKey"
    :value-key="args.valueKey"
    :size="args.size"
    :disabled="args.disabled"
    :allowed-skip="args.allowedSkip"
    :background="args.background"
    :version="args.version"
    :get-object="args.getObject"
    @change-step="args.onChangeStep"
  />
`,x=function(a){return{components:{Stepper:u},setup:function(){return{args:a}},template:j}},n={render:x,args:o},r={render:function(a){return{components:{Stepper:u},setup:function(){return{args:a}},template:`
      <div class="flex flex-col gap-base">
        `.concat(["medium","large"].map(function(i){return j.replace(/args\.size/g,"'".concat(i,"'"))}).join(""),`
      </div>
    `)}},args:o},l={render:x,args:e(e({},o),{disabled:!0})},t={render:x,args:e(e({},o),{allowedSkip:!0})},s={render:function(a){return{components:{Stepper:u},setup:function(){return{args:a}},template:`
      <div class="flex flex-col gap-base">
        `.concat(["1","2"].map(function(i){return j.replace(/args\.version/g,"'".concat(i,"'"))}).join(""),`
      </div>
    `)}},args:o};n.parameters=e(e({},n.parameters),{docs:e(e({},(d=n.parameters)===null||d===void 0?void 0:d.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(c=(p=n.parameters)===null||p===void 0?void 0:p.docs)===null||c===void 0?void 0:c.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(m=r.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Stepper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-base">
        \${["medium", "large"].map(size => {
      return defaultHtml.replace(/args\\.size/g, \`'\${size}'\`);
    }).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(v=(g=r.parameters)===null||g===void 0?void 0:g.docs)===null||v===void 0?void 0:v.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(f=l.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(y=(b=l.parameters)===null||b===void 0?void 0:b.docs)===null||y===void 0?void 0:y.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(S=t.parameters)===null||S===void 0?void 0:S.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    allowedSkip: true
  }
}`},(h=(_=t.parameters)===null||_===void 0?void 0:_.docs)===null||h===void 0?void 0:h.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(k=s.parameters)===null||k===void 0?void 0:k.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Stepper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-base">
        \${["1", "2"].map(version => {
      return defaultHtml.replace(/args\\.version/g, \`'\${version}'\`);
    }).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(V=(w=s.parameters)===null||w===void 0?void 0:w.docs)===null||V===void 0?void 0:V.source)})});const F=Object.freeze(Object.defineProperty({__proto__:null,AllowedSkip:t,Disabled:l,Primary:n,Sizes:r,Versions:s,default:z},Symbol.toStringTag,{value:"Module"}));export{t as A,l as D,n as P,F as S,s as V,r as a};
