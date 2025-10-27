import{n as T,_ as e}from"./iframe-CEhHUQ6Y.js";var p,g,m,v,b,f,_,y,h,A,x,D,S,M,w,V,j,R,E,W,q,O,P,B;const k={component:T,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Will be the selected current value."},expanded:{type:{name:"boolean"},description:"Will be the expanded state."},labelValue:{type:{name:"string"},description:"Will be the select label."},options:{type:{name:"array",value:{name:"object",value:{}}},description:"Array of object to be used as menu options. Props(label: string, value: string, icon: string, disabled: boolean, bottom: boolean, options: same instruction as options)"},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Activate error mode."},absolute:{type:{name:"boolean"},table:{defaultValue:{summary:"true"}}},errorMessage:{type:{name:"string"},description:"Will be the error message."},infoMessage:{type:{name:"string"},description:"Will be the info message."},getObject:{type:{name:"boolean"},description:"Will be the get object."},searchable:{type:{name:"boolean"},description:"Will be the searchable mode."},default:{description:"Will be the default value."}}};var r={modelValue:void 0,expanded:!1,options:[{label:"Home",value:"home",icon:"home"},{label:"Publisher",value:"publisher",icon:"supervisor_account",options:[{label:"Group Account",value:"group-account",icon:"account_balance"},{label:"Account",value:"account",icon:"account_balance"}]},{label:"Errors",value:"errors",icon:"error",disabled:!0},{label:"Settings",value:"settings",icon:"settings",bottom:!0}],labelValue:"label",disabled:!1,required:!1,absolute:!1,isError:!1,errorMessage:"",infoMessage:"",getObject:!1,searchable:!1},a=function(c){return{components:{Dropdown:T},setup:function(){return{args:c}},template:`
    <Dropdown 
        v-model="args.modelValue"
        v-model:expanded="args.expanded"
        :label-value="args.labelValue"
        :options="args.options"
        :absolute="args.absolute" 
        :required="args.required" 
        :disabled="args.disabled"
        :is-error="args.isError"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :get-object="args.getObject"
        :searchable="args.searchable"
    />
  `}},o={render:a,args:r},n={render:a,args:e(e({},r),{absolute:!0})},s={render:a,args:e(e({},r),{disabled:!0})},l={render:a,args:e(e({},r),{required:!0})},t={render:a,args:e(e({},r),{searchable:!0})},d={render:a,args:e(e({},r),{isError:!0,errorMessage:"Error message"})},i={render:a,args:e(e({},r),{infoMessage:"Additional information"})},u={render:function(c){return{components:{Dropdown:T},setup:function(){return{args:c}},template:`
    <Dropdown
      v-model="args.modelValue"
      v-model:expanded="args.expanded"
      :options="args.options"
      :absolute="args.absolute"
    >
      <Button @click="args.expanded = !args.expanded">Custom Trigger</Button>
    </Dropdown>`}},args:r};o.parameters=e(e({},o.parameters),{docs:e(e({},(p=o.parameters)===null||p===void 0?void 0:p.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(m=(g=o.parameters)===null||g===void 0?void 0:g.docs)===null||m===void 0?void 0:m.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(v=n.parameters)===null||v===void 0?void 0:v.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    absolute: true
  }
}`},(f=(b=n.parameters)===null||b===void 0?void 0:b.docs)===null||f===void 0?void 0:f.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(_=s.parameters)===null||_===void 0?void 0:_.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(h=(y=s.parameters)===null||y===void 0?void 0:y.docs)===null||h===void 0?void 0:h.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(A=l.parameters)===null||A===void 0?void 0:A.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(D=(x=l.parameters)===null||x===void 0?void 0:x.docs)===null||D===void 0?void 0:D.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(S=t.parameters)===null||S===void 0?void 0:S.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    searchable: true
  }
}`},(w=(M=t.parameters)===null||M===void 0?void 0:M.docs)===null||w===void 0?void 0:w.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(V=d.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`},(R=(j=d.parameters)===null||j===void 0?void 0:j.docs)===null||R===void 0?void 0:R.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(E=i.parameters)===null||E===void 0?void 0:E.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Additional information"
  }
}`},(q=(W=i.parameters)===null||W===void 0?void 0:W.docs)===null||q===void 0?void 0:q.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(O=u.parameters)===null||O===void 0?void 0:O.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Dropdown
    },
    setup() {
      return {
        args
      };
    },
    template: \`
    <Dropdown
      v-model="args.modelValue"
      v-model:expanded="args.expanded"
      :options="args.options"
      :absolute="args.absolute"
    >
      <Button @click="args.expanded = !args.expanded">Custom Trigger</Button>
    </Dropdown>\`
  }),
  args: defaultArgs
}`},(B=(P=u.parameters)===null||P===void 0?void 0:P.docs)===null||B===void 0?void 0:B.source)})});const z=Object.freeze(Object.defineProperty({__proto__:null,Absolute:n,Default:u,Disabled:s,InfoMessage:i,IsError:d,Primary:o,Required:l,Searchable:t,default:k},Symbol.toStringTag,{value:"Module"}));export{n as A,z as D,d as I,o as P,l as R,t as S,s as a,i as b,u as c};
