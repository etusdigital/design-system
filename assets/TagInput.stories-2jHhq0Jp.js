import{V as S,_ as e}from"./iframe-CjRVAs2g.js";var u,p,m,c,g,v,f,b,_,h,y,I,M,V,w,x,A,R,T,W,D;const E={component:S,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Will be the array containing the value of the tags."},labelValue:{type:{name:"string"},description:"Will be the input label."},errorMessage:{type:{name:"string"},description:"Will be the input error message."},infoMessage:{type:{name:"string"},description:"Will be the input info message."},placeholder:{type:{name:"string"},description:"Will be the input placeholder."},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Activate error mode."},allowDuplicate:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Disable the input of duplicated values."},max:{type:{name:"number"},description:"Will be the max number of tags allowed on the input."},required:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},mask:{type:{name:"string"},description:"Will be the masked applied to the input. Only triggered on input type text without min or max limit.",control:"select",options:["cpf","cnpj","cep","domain","url","email"],table:{defaultValue:{summary:void 0}}},icon:{type:{name:"string"},description:"Will be the icon name."},appendIcon:{type:{name:"boolean"}},"hint-message":{description:"This slot will be displayed in after the input."},"icon-slot":{description:"Will be the icon slot."},"appended-icon-slot":{description:"Will be the appended icon slot."}}};var a={modelValue:void 0,labelValue:"label",errorMessage:"",infoMessage:"",placeholder:"",isError:!1,required:!1,allowDuplicate:!1,max:void 0,disabled:!1,mask:void 0,icon:"",appendIcon:!1},r=function(q){return{components:{TagInput:S},setup:function(){return{args:q}},template:`
    <TagInput
        v-model="args.modelValue"
        :label-value="args.labelValue"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :is-error="args.isError"
        :disabled="args.disabled"
        :allow-duplicate="args.allowDuplicate"
        :max="args.max"
        :required="args.required"
        :placeholder="args.placeholder"
        :mask="args.mask"
        :icon="args.icon"
        :append-icon="args.appendIcon"
    >
        <template #hint-message>
            Press enter to add a new tag
        </template>
    </TagInput>

    `}},n={render:r,args:e({},a)},s={render:r,args:e(e({},a),{isError:!0,errorMessage:"Error message"})},o={render:r,args:e(e({},a),{infoMessage:"Info message"})},l={render:r,args:e(e({},a),{disabled:!0,modelValue:["tag 1","tag 2"]})},t={render:r,args:e(e({},a),{required:!0})},i={render:r,args:e(e({},a),{allowDuplicate:!0})},d={render:r,args:e(e({},a),{max:10})};n.parameters=e(e({},n.parameters),{docs:e(e({},(u=n.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs
  }
}`},(m=(p=n.parameters)===null||p===void 0?void 0:p.docs)===null||m===void 0?void 0:m.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(c=s.parameters)===null||c===void 0?void 0:c.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`},(v=(g=s.parameters)===null||g===void 0?void 0:g.docs)===null||v===void 0?void 0:v.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(f=o.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Info message"
  }
}`},(_=(b=o.parameters)===null||b===void 0?void 0:b.docs)===null||_===void 0?void 0:_.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(h=l.parameters)===null||h===void 0?void 0:h.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
    modelValue: ["tag 1", "tag 2"]
  }
}`},(I=(y=l.parameters)===null||y===void 0?void 0:y.docs)===null||I===void 0?void 0:I.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(M=t.parameters)===null||M===void 0?void 0:M.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(w=(V=t.parameters)===null||V===void 0?void 0:V.docs)===null||w===void 0?void 0:w.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(x=i.parameters)===null||x===void 0?void 0:x.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    allowDuplicate: true
  }
}`},(R=(A=i.parameters)===null||A===void 0?void 0:A.docs)===null||R===void 0?void 0:R.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(T=d.parameters)===null||T===void 0?void 0:T.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    max: 10
  }
}`},(D=(W=d.parameters)===null||W===void 0?void 0:W.docs)===null||D===void 0?void 0:D.source)})});const j=Object.freeze(Object.defineProperty({__proto__:null,AllowDuplicate:i,Disabled:l,InfoMessage:o,IsError:s,Max:d,Primary:n,Required:t,default:E},Symbol.toStringTag,{value:"Module"}));export{i as A,l as D,s as I,d as M,n as P,t as R,j as T,o as a};
