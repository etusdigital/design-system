import{Y as m,_ as e}from"./iframe-oiXQscte.js";var o,t,s,d,u,i,g,p,c;const _={component:m,argTypes:{modelValue:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},groupValue:{description:"Used by the Group component.",type:{name:"other",value:"any"},table:{defaultValue:{summary:"null"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},type:{control:"select",options:["default","secondary"],table:{defaultValue:{summary:"default"}}},default:{description:"This slot will be content inside the toggle."}}};var f={modelValue:!1,groupValue:null,disabled:!1,type:"default"},v=`
  <Toggle 
    v-model="args.modelValue" 
    name="test" 
    :group-value="args.groupValue" 
    :disabled="args.disabled" 
    :type="args.type"
  >
    Test toggle
  </Toggle>
`,y=function(l){return{components:{Toggle:m},setup:function(){return{args:l}},template:v}},a={render:y,args:f},n={render:y,args:e(e({},f),{disabled:!0})},r={render:function(l){return{components:{Toggle:m},setup:function(){return{args:l}},template:`
      <div class="flex gap-xs">
          `.concat(["default","secondary"].map(function(b){return`
            `.concat(v.replace(/args\.type/g,"'".concat(b,"'")),`
          `)}).join(""),`
      </div>
    `)}},args:f};a.parameters=e(e({},a.parameters),{docs:e(e({},(o=a.parameters)===null||o===void 0?void 0:o.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(s=(t=a.parameters)===null||t===void 0?void 0:t.docs)===null||s===void 0?void 0:s.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(d=n.parameters)===null||d===void 0?void 0:d.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(i=(u=n.parameters)===null||u===void 0?void 0:u.docs)===null||i===void 0?void 0:i.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(g=r.parameters)===null||g===void 0?void 0:g.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Toggle
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-xs">
          \${["default", "secondary"].map(type => \`
            \${defaultHtml.replace(/args\\.type/g, \`'\${type}'\`)}
          \`).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(c=(p=r.parameters)===null||p===void 0?void 0:p.docs)===null||c===void 0?void 0:c.source)})});const V=Object.freeze(Object.defineProperty({__proto__:null,Disabled:n,Primary:a,Types:r,default:_},Symbol.toStringTag,{value:"Module"}));export{n as D,a as P,V as T,r as a};
