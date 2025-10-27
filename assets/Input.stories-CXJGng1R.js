import{r as P,_ as e}from"./iframe-CEhHUQ6Y.js";var m,g,v,f,b,y,x,h,_,M,V,A,W,I,w,E,S,R,j,k,q,T,$,H;const z={component:P,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Will be the input current value."},labelValue:{type:{name:"string"},description:"Will be the input label."},type:{type:{name:"string"},control:"select",options:["text","number","search","color","password","file","email"],table:{defaultValue:{summary:"text"}},description:"Will be the input type."},max:{type:{name:"number"},description:"Will be the maximum number of letters or input value."},min:{type:{name:"number"},description:"Will be the minimum input value."},step:{type:{name:"number"},description:"Will be the increase or decrease amount of the number input."},errorMessage:{type:{name:"string"},description:"Will be the input error message."},infoMessage:{type:{name:"string"},description:"Will be the input info message."},placeholder:{type:{name:"string"},description:"Will be the input placeholder."},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Ative error mode."},mask:{type:{name:"string"},description:"Will be the masked applied to the input. Only triggered on input type text without min or max limit.",control:"select",options:["cpf","cnpj","cep","domain","url"],table:{defaultValue:{summary:void 0}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},icon:{type:{name:"string"},description:"Will be the input icon."},appendIcon:{type:{name:"boolean"},description:"If true, the icon will be appended to the input."},textAlign:{type:{name:"string"},control:"select",options:["start","center","end"],table:{defaultValue:{summary:"start"}},description:"This property will be input text alignment."},tooltipMinWidth:{type:{name:"string"},table:{defaultValue:{summary:"none"}},description:"This property will be info tooltip min-width. It doesn't work with file input"},"icon-slot":{description:"Will be the icon slot."},"appended-icon-slot":{description:"Will be the appended icon slot."}}};var r={modelValue:null,labelValue:"label",type:"text",mask:void 0,max:void 0,min:void 0,step:1,errorMessage:"",infoMessage:"",placeholder:"",isError:!1,disabled:!1,required:!1,textAlign:"start",tooltipMinWidth:"none",icon:"",appendIcon:!1},O=`
    <Input
        class="h-fit"
         v-model="args.modelValue"
         :labelValue="args.labelValue"
         :type="args.type"
         :mask="args.mask"
         :max="args.max"
         :min="args.min"
         :step="args.step"
         :error-message="args.errorMessage"
         :info-message="args.infoMessage"
         :is-error="args.isError"
         :disabled="args.disabled"
         :required="args.required"
         :placeholder="args.placeholder"
         :text-align="args.textAlign"
         :tooltip-min-width="args.tooltipMinWidth"
         :icon="args.icon"
         :append-icon="args.appendIcon"
    />`,a=function(n){return{components:{Input:P},setup:function(){return{args:n}},template:O}},s={render:a,args:e(e({},r),{errorMessage:"Error message"})},o={render:function(n){return{setup:function(){return{args:n}},template:`
        <div class="flex flex-col gap-xs">
        `.concat(["text","number","search","color","password","email"].map(function(t){return O.replace(/args\.type/g,"'".concat(t,"'")).replace(/args\.labelValue/g,"'".concat(t,"'"))}).join(""),`
        </div>
      `)}},args:r},l={render:a,args:e(e({},r),{max:20,type:"text"})},i={render:a,args:e(e({},r),{labelValue:"Error",isError:!0,errorMessage:"Error message",type:"text"})},d={render:a,args:e(e({},r),{infoMessage:"Info message"})},u={render:a,args:e(e({},r),{disabled:!0})},p={render:a,args:e(e({},r),{required:!0})},c={render:function(n){return{setup:function(){return{args:n}},template:`
        <div class="flex flex-col gap-xs">
        `.concat(["start","center","end"].map(function(t){return O.replace(/args\.textAlign/g,"'".concat(t,"'")).replace(/args\.labelValue/g,"'".concat(t,"'"))}).join(""),`
        </div>
      `)}},args:r};s.parameters=e(e({},s.parameters),{docs:e(e({},(m=s.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    errorMessage: "Error message"
  }
}`},(v=(g=s.parameters)===null||g===void 0?void 0:g.docs)===null||v===void 0?void 0:v.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(f=o.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
        <div class="flex flex-col gap-xs">
        \${["text", "number", "search", "color", "password", "email"].map(type => {
      return defaultHtml.replace(/args\\.type/g, \`'\${type}'\`).replace(/args\\.labelValue/g, \`'\${type}'\`);
    }).join("")}
        </div>
      \`
  }),
  args: defaultArgs
}`},(y=(b=o.parameters)===null||b===void 0?void 0:b.docs)===null||y===void 0?void 0:y.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(x=l.parameters)===null||x===void 0?void 0:x.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    max: 20,
    type: "text"
  }
}`},(_=(h=l.parameters)===null||h===void 0?void 0:h.docs)===null||_===void 0?void 0:_.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(M=i.parameters)===null||M===void 0?void 0:M.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Error",
    isError: true,
    errorMessage: "Error message",
    type: "text"
  }
}`},(A=(V=i.parameters)===null||V===void 0?void 0:V.docs)===null||A===void 0?void 0:A.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(W=d.parameters)===null||W===void 0?void 0:W.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Info message"
  }
}`},(w=(I=d.parameters)===null||I===void 0?void 0:I.docs)===null||w===void 0?void 0:w.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(E=u.parameters)===null||E===void 0?void 0:E.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(R=(S=u.parameters)===null||S===void 0?void 0:S.docs)===null||R===void 0?void 0:R.source)})});p.parameters=e(e({},p.parameters),{docs:e(e({},(j=p.parameters)===null||j===void 0?void 0:j.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(q=(k=p.parameters)===null||k===void 0?void 0:k.docs)===null||q===void 0?void 0:q.source)})});c.parameters=e(e({},c.parameters),{docs:e(e({},(T=c.parameters)===null||T===void 0?void 0:T.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
        <div class="flex flex-col gap-xs">
        \${["start", "center", "end"].map(type => {
      return defaultHtml.replace(/args\\.textAlign/g, \`'\${type}'\`).replace(/args\\.labelValue/g, \`'\${type}'\`);
    }).join("")}
        </div>
      \`
  }),
  args: defaultArgs
}`},(H=($=c.parameters)===null||$===void 0?void 0:$.docs)===null||H===void 0?void 0:H.source)})});const L=Object.freeze(Object.defineProperty({__proto__:null,Disabled:u,InfoMessage:d,IsError:i,MaxLetters:l,Primary:s,Required:p,TextAlign:c,Types:o,default:z},Symbol.toStringTag,{value:"Module"}));export{u as D,L as I,l as M,s as P,p as R,o as T,i as a,d as b,c};
