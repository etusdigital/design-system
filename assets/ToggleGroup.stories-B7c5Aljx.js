import{Z as _,_ as e}from"./iframe-CjRVAs2g.js";var s,d,u,i,c,p,g,v,m,f,y,b;const x={component:_,argTypes:{modelValue:{type:{name:"other",value:"any"},table:{defaultValue:{summary:"undefined"}}},vertical:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},type:{control:"select",options:["default","secondary"],table:{defaultValue:{summary:"default"}}}}};var o={modelValue:1,vertical:!1,disabled:!1,options:[{label:"First",value:1},{label:"Second",value:2},{label:"Third",value:3}],labelKey:"label",valueKey:"value",getObject:!1,type:"default"},V=`
  <ToggleGroup
    v-model="args.modelValue"
    :vertical="args.vertical"
    :disabled="args.disabled"
    :options="args.options"
    :label-key="args.labelKey"
    :value-key="args.valueKey"
    :get-object="args.getObject"
    :type="args.type"
  />
`,T=function(t){return{components:{ToggleGroup:_},setup:function(){return{args:t}},template:V}},a={render:T,args:o},r={render:T,args:e(e({},o),{vertical:!0})},l={render:T,args:e(e({},o),{disabled:!0})},n={render:function(t){return{components:{ToggleGroup:_},setup:function(){return{args:t}},template:`
      <div class="flex flex-col gap-xs">
          `.concat(["default","secondary"].map(function(j){return`
            `.concat(V.replace(/args\.type/g,"'".concat(j,"'")),`
          `)}).join(""),`
      </div>
    `)}},args:o};a.parameters=e(e({},a.parameters),{docs:e(e({},(s=a.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(u=(d=a.parameters)===null||d===void 0?void 0:d.docs)===null||u===void 0?void 0:u.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(i=r.parameters)===null||i===void 0?void 0:i.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    vertical: true
  }
}`},(p=(c=r.parameters)===null||c===void 0?void 0:c.docs)===null||p===void 0?void 0:p.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(g=l.parameters)===null||g===void 0?void 0:g.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(m=(v=l.parameters)===null||v===void 0?void 0:v.docs)===null||m===void 0?void 0:m.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(f=n.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      ToggleGroup
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-xs">
          \${["default", "secondary"].map(type => \`
            \${defaultHtml.replace(/args\\.type/g, \`'\${type}'\`)}
          \`).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(b=(y=n.parameters)===null||y===void 0?void 0:y.docs)===null||b===void 0?void 0:b.source)})});const S=Object.freeze(Object.defineProperty({__proto__:null,Disabled:l,Primary:a,Types:n,Vertical:r,default:x},Symbol.toStringTag,{value:"Module"}));export{l as D,a as P,S as T,r as V,n as a};
