import{X as j,_ as e}from"./iframe-CjRVAs2g.js";var c,g,m,p,v,f,x,b,h,T,_,V,y,M,A,w,R,q,E,S,W;const $={component:j,argTypes:{modelValue:{description:"Will be the textarea current value."},labelValue:{description:"Will be the textarea label."},max:{description:"Will be the maximum number of characters."},errorMessage:{description:"Will be the textarea error message."},infoMessage:{description:"Will be the textarea info message."},placeholder:{description:"Will be the textarea placeholder."},isError:{table:{defaultValue:{summary:"false"}},description:"Activate error mode."},disabled:{table:{defaultValue:{summary:"false"}}},textAlign:{control:"select",options:["start","center","end"],table:{defaultValue:{summary:"start"}},description:"This property will be textarea text alignment."},tooltipMinWidth:{table:{defaultValue:{summary:"none"}},description:"This property will be info tooltip min-width."}}};var r={modelValue:"",labelValue:"Textarea Label",max:void 0,errorMessage:"",infoMessage:"",placeholder:"Enter your text here...",isError:!1,disabled:!1,required:!1,textAlign:"start",tooltipMinWidth:"none"},D=`
    <Textarea
        class="h-fit"
        v-model="args.modelValue"
        :labelValue="args.labelValue"
        :max="args.max"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :is-error="args.isError"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :text-align="args.textAlign"
        :tooltip-min-width="args.tooltipMinWidth"
    />`,a=function(u){return{components:{Textarea:j},setup:function(){return{args:u}},template:D}},l={render:a,args:e({},r)},s={render:a,args:e(e({},r),{labelValue:"Textarea with Character Limit",max:100,placeholder:"Type your message... (max 100 characters)"})},t={render:a,args:e(e({},r),{labelValue:"Textarea with Error",isError:!0,errorMessage:"This field contains an error"})},n={render:a,args:e(e({},r),{labelValue:"Textarea with Info",infoMessage:"This is helpful information about this field"})},o={render:a,args:e(e({},r),{labelValue:"Disabled Textarea",disabled:!0,modelValue:"This textarea is disabled"})},i={render:a,args:e(e({},r),{labelValue:"Required Textarea",required:!0})},d={render:function(u){return{components:{Textarea:j},setup:function(){return{args:u}},template:`
    <div class="flex flex-col gap-xs">
        `.concat(["start","center","end"].map(function(I){return D.replace(/args\.textAlign/g,"'".concat(I,"'")).replace(/args\.labelValue/g,"'".concat(I,"'"))}).join(""),`
    </div>
  `)}},args:r};l.parameters=e(e({},l.parameters),{docs:e(e({},(c=l.parameters)===null||c===void 0?void 0:c.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs
  }
}`},(m=(g=l.parameters)===null||g===void 0?void 0:g.docs)===null||m===void 0?void 0:m.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(p=s.parameters)===null||p===void 0?void 0:p.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Textarea with Character Limit",
    max: 100,
    placeholder: "Type your message... (max 100 characters)"
  }
}`},(f=(v=s.parameters)===null||v===void 0?void 0:v.docs)===null||f===void 0?void 0:f.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(x=t.parameters)===null||x===void 0?void 0:x.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Textarea with Error",
    isError: true,
    errorMessage: "This field contains an error"
  }
}`},(h=(b=t.parameters)===null||b===void 0?void 0:b.docs)===null||h===void 0?void 0:h.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(T=n.parameters)===null||T===void 0?void 0:T.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Textarea with Info",
    infoMessage: "This is helpful information about this field"
  }
}`},(V=(_=n.parameters)===null||_===void 0?void 0:_.docs)===null||V===void 0?void 0:V.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(y=o.parameters)===null||y===void 0?void 0:y.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Disabled Textarea",
    disabled: true,
    modelValue: "This textarea is disabled"
  }
}`},(A=(M=o.parameters)===null||M===void 0?void 0:M.docs)===null||A===void 0?void 0:A.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(w=i.parameters)===null||w===void 0?void 0:w.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Required Textarea",
    required: true
  }
}`},(q=(R=i.parameters)===null||R===void 0?void 0:R.docs)===null||q===void 0?void 0:q.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(E=d.parameters)===null||E===void 0?void 0:E.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Textarea
    },
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
}`},(W=(S=d.parameters)===null||S===void 0?void 0:S.docs)===null||W===void 0?void 0:W.source)})});const L=Object.freeze(Object.defineProperty({__proto__:null,Disabled:o,InfoMessage:n,IsError:t,MaxCharacters:s,Primary:l,Required:i,TextAlign:d,default:$},Symbol.toStringTag,{value:"Module"}));export{o as D,t as I,s as M,l as P,i as R,L as T,n as a,d as b};
