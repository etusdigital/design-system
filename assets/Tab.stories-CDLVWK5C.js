import{T as _,_ as e}from"./iframe-CEhHUQ6Y.js";var l,d,i,u,p,c,m,v,g,b,y,f;const O={component:_,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Will the current tab.",table:{defaultValue:{summary:void 0}}},options:{type:{name:"array",value:{name:"object",value:{}}},description:"Array of values to be used as options."},labelKey:{type:{name:"string"},description:"Property name used for displaying option labels when using object arrays.",table:{defaultValue:{summary:"label"}}},valueKey:{type:{name:"string"},description:"Property name used for displaying option values when using object arrays.",table:{defaultValue:{summary:"value"}}},isIcon:{type:{name:"boolean"},description:"Show icons instead of words.",table:{defaultValue:{summary:"false"}}},notCard:{type:{name:"boolean"},description:"No card will wrapper the options.",table:{defaultValue:{summary:"false"}}}}};var s={modelValue:void 0,options:["Option 1","Option 2","Option 3","Option 4","Option 5"],labelKey:"label",valueKey:"value",isIcon:!1,notCard:!1},t=function(h){return{components:{Tab:_},setup:function(){return{args:h}},template:`
    <Tab
        class="w-fit"
        v-model="args.modelValue" 
        :options="args.options"
        :label-key="args.labelKey"
        :value-key="args.valueKey"
        :is-icon="args.isIcon"
        :not-card="args.notCard"
    />
  `}},a={render:t,args:s},r={render:t,args:e(e({},s),{isIcon:!0,options:["laptop","smartphone"]})},o={render:t,args:e(e({},s),{options:[{label:"Laptop",value:"laptop",icon:"laptop"},{label:"Smartphone",value:"smartphone",icon:"smartphone"}]})},n={render:t,args:e(e({},s),{notCard:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(l=a.parameters)===null||l===void 0?void 0:l.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(i=(d=a.parameters)===null||d===void 0?void 0:d.docs)===null||i===void 0?void 0:i.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(u=r.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isIcon: true,
    options: ["laptop", "smartphone"]
  }
}`},(c=(p=r.parameters)===null||p===void 0?void 0:p.docs)===null||c===void 0?void 0:c.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(m=o.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    options: [{
      label: "Laptop",
      value: "laptop",
      icon: "laptop"
    }, {
      label: "Smartphone",
      value: "smartphone",
      icon: "smartphone"
    }]
  }
}`},(g=(v=o.parameters)===null||v===void 0?void 0:v.docs)===null||g===void 0?void 0:g.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(b=n.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    notCard: true
  }
}`},(f=(y=n.parameters)===null||y===void 0?void 0:y.docs)===null||f===void 0?void 0:f.source)})});const T=Object.freeze(Object.defineProperty({__proto__:null,Icons:r,NotCard:n,ObjectArray:o,Primary:a,default:O},Symbol.toStringTag,{value:"Module"}));export{r as I,n as N,o as O,a as P,T};
