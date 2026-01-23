import{P as N,_ as e,s as V}from"./iframe-CjRVAs2g.js";var p,i,c,g,m,v,f,h,y,b,_,I,P,x,S;const j={component:N,argTypes:{modelValue:{type:{name:"string"},description:"The current value of the PIN input."},length:{type:{name:"number"},description:"Number of input fields to display.",table:{defaultValue:{summary:"6"}}},disabled:{type:{name:"boolean"},description:"Disables the PIN input fields.",table:{defaultValue:{summary:"false"}}},placeholder:{type:{name:"string"},description:"Placeholder text for each input field."},separator:{type:{name:"string"},description:"Separator character between input fields."},type:{type:{name:"string"},control:"select",options:["text","password"],table:{defaultValue:{summary:"text"}},description:"Input field type."},mask:{type:{name:"boolean"},description:"Whether to mask the input values.",table:{defaultValue:{summary:"false"}}},otp:{type:{name:"boolean"},description:"Whether this is an OTP input.",table:{defaultValue:{summary:"false"}}}}};var l={modelValue:"",length:6,disabled:!1,placeholder:"",separator:"",type:"text",mask:!1,otp:!1},k=`
  <PINInput 
    v-model="args.modelValue"
    :length="args.length"
    :disabled="args.disabled"
    :placeholder="args.placeholder"
    :separator="args.separator"
    :type="args.type"
    :mask="args.mask"
    :otp="args.otp"
    @complete="(val) => console.log('Complete:', val)"
  />
`,d=function(u){return{components:{PINInput:N},setup:function(){return{args:u}},template:k}},a={render:d,args:l},r={render:d,args:e(e({},l),{disabled:!0,length:4})},n={render:d,args:e(e({},l),{separator:"-",length:4})},t={render:d,args:e(e({},l),{type:"password",length:4})},s={render:function(u){return{components:{PINInput:N},setup:function(){var o=V(""),A=V("");return{args:u,value4:o,value8:A}},template:'<div class="flex flex-col gap-xs">'.concat([4,8].map(function(o){return`
      `.concat(k.replace(/args\.modelValue/g,"value".concat(o)).replace(/args\.length/g,"".concat(o)),`
    `)}).join(""),"</div>")}},args:l};a.parameters=e(e({},a.parameters),{docs:e(e({},(p=a.parameters)===null||p===void 0?void 0:p.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(c=(i=a.parameters)===null||i===void 0?void 0:i.docs)===null||c===void 0?void 0:c.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(g=r.parameters)===null||g===void 0?void 0:g.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
    length: 4
  }
}`},(v=(m=r.parameters)===null||m===void 0?void 0:m.docs)===null||v===void 0?void 0:v.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(f=n.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    separator: "-",
    length: 4
  }
}`},(y=(h=n.parameters)===null||h===void 0?void 0:h.docs)===null||y===void 0?void 0:y.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(b=t.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    type: "password",
    length: 4
  }
}`},(I=(_=t.parameters)===null||_===void 0?void 0:_.docs)===null||I===void 0?void 0:I.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(P=s.parameters)===null||P===void 0?void 0:P.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      PINInput
    },
    setup() {
      const value4 = ref("");
      const value8 = ref("");
      return {
        args,
        value4,
        value8
      };
    },
    template: \`<div class="flex flex-col gap-xs">\${[4, 8].map(length => \`
      \${defaultHtml.replace(/args\\.modelValue/g, \`value\${length}\`).replace(/args\\.length/g, \`\${length}\`)}
    \`).join('')}</div>\`
  }),
  args: defaultArgs
}`},(S=(x=s.parameters)===null||x===void 0?void 0:x.docs)===null||S===void 0?void 0:S.source)})});const R=Object.freeze(Object.defineProperty({__proto__:null,Default:a,Disabled:r,Length:s,Password:t,Separator:n,default:j},Symbol.toStringTag,{value:"Module"}));export{a as D,s as L,R as P,n as S,r as a,t as b};
