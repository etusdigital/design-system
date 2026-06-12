import{o as q,_ as e}from"./iframe-DBfgJmt0.js";var c,p,g,m,v,b,f,_,h,y,x,A,D,M,S,w,j,V,E,R,W;const O={component:q,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Will be the selected current value."},expanded:{type:{name:"boolean"},description:"Will be the expanded state."},labelValue:{type:{name:"string"},description:"Will be the select label."},options:{type:{name:"array",value:{name:"object",value:{}}},description:"Array of object to be used as menu options. Props(label: string, value: string, icon: string, disabled: boolean, bottom: boolean, options: same instruction as options)"},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Activate error mode."},errorMessage:{type:{name:"string"},description:"Will be the error message."},infoMessage:{type:{name:"string"},description:"Will be the info message."},getObject:{type:{name:"boolean"},description:"Will be the get object."},searchable:{type:{name:"boolean"},description:"Will be the searchable mode."},default:{description:"Will be the default value."}}};var r={modelValue:void 0,expanded:!1,options:[{label:"Home",value:"home",icon:"home"},{label:"Publisher",value:"publisher",icon:"supervisor_account",options:[{label:"Group Account",value:"group-account",icon:"account_balance"},{label:"Account",value:"account",icon:"account_balance"}]},{label:"Errors",value:"errors",icon:"error",disabled:!0},{label:"Settings",value:"settings",icon:"settings",bottom:!0}],labelValue:"label",disabled:!1,required:!1,isError:!1,errorMessage:"",infoMessage:"",getObject:!1,searchable:!1},a=function(u){return{components:{Dropdown:q},setup:function(){return{args:u}},template:`
    <Dropdown 
        v-model="args.modelValue"
        v-model:expanded="args.expanded"
        :label-value="args.labelValue"
        :options="args.options"
        :required="args.required" 
        :disabled="args.disabled"
        :is-error="args.isError"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :get-object="args.getObject"
        :searchable="args.searchable"
    />
  `}},o={render:a,args:r},n={render:a,args:e(e({},r),{disabled:!0})},s={render:a,args:e(e({},r),{required:!0})},l={render:a,args:e(e({},r),{searchable:!0})},d={render:a,args:e(e({},r),{isError:!0,errorMessage:"Error message"})},t={render:a,args:e(e({},r),{infoMessage:"Additional information"})},i={render:function(u){return{components:{Dropdown:q},setup:function(){return{args:u}},template:`
    <Dropdown
      v-model="args.modelValue"
      v-model:expanded="args.expanded"
      :options="args.options"
    >
      <Button @click="args.expanded = !args.expanded">Custom Trigger</Button>
    </Dropdown>`}},args:r};o.parameters=e(e({},o.parameters),{docs:e(e({},(c=o.parameters)===null||c===void 0?void 0:c.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(g=(p=o.parameters)===null||p===void 0?void 0:p.docs)===null||g===void 0?void 0:g.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(m=n.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(b=(v=n.parameters)===null||v===void 0?void 0:v.docs)===null||b===void 0?void 0:b.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(f=s.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(h=(_=s.parameters)===null||_===void 0?void 0:_.docs)===null||h===void 0?void 0:h.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(y=l.parameters)===null||y===void 0?void 0:y.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    searchable: true
  }
}`},(A=(x=l.parameters)===null||x===void 0?void 0:x.docs)===null||A===void 0?void 0:A.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(D=d.parameters)===null||D===void 0?void 0:D.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`},(S=(M=d.parameters)===null||M===void 0?void 0:M.docs)===null||S===void 0?void 0:S.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(w=t.parameters)===null||w===void 0?void 0:w.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Additional information"
  }
}`},(V=(j=t.parameters)===null||j===void 0?void 0:j.docs)===null||V===void 0?void 0:V.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(E=i.parameters)===null||E===void 0?void 0:E.docs),{source:e({originalSource:`{
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
    >
      <Button @click="args.expanded = !args.expanded">Custom Trigger</Button>
    </Dropdown>\`
  }),
  args: defaultArgs
}`},(W=(R=i.parameters)===null||R===void 0?void 0:R.docs)===null||W===void 0?void 0:W.source)})});const B=Object.freeze(Object.defineProperty({__proto__:null,Default:i,Disabled:n,InfoMessage:t,IsError:d,Primary:o,Required:s,Searchable:l,default:O},Symbol.toStringTag,{value:"Module"}));export{B as D,d as I,o as P,s as R,l as S,n as a,t as b,i as c};
