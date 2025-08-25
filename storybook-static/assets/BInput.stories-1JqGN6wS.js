import{B as J}from"./BInput-CXEypsBq.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./index-BQ4pCYp0.js";import"./Label-jj1xFjf_.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./BIcon--gaP3tpf.js";const ee={component:J,tags:["autodocs"],argTypes:{modelValue:{description:"Will be the input current value.",control:{type:"object"},table:{type:{summary:"any"}}},labelValue:{description:"Will be the input label.",control:{type:"text"},table:{type:{summary:"string"}}},type:{description:"Will be the input type.",control:"select",options:["text","number","search","color","password","file","email"],table:{type:{summary:"'text' | 'number' | 'search' | 'color' | 'password' | 'file' | 'email'"},defaultValue:{summary:"text"}}},max:{description:"Will be the maximum number of letters or input value.",control:{type:"number"},table:{type:{summary:"number"}}},min:{description:"Will be the minimum input value.",control:{type:"number"},table:{type:{summary:"number"}}},step:{description:"Will be the increase or decrease amount of the number input.",control:{type:"number"},table:{type:{summary:"number"}}},errorMessage:{description:"Will be the input error message.",control:{type:"text"},table:{type:{summary:"string"}}},infoMessage:{description:"Will be the input info message.",control:{type:"text"},table:{type:{summary:"string"}}},placeholder:{description:"Will be the input placeholder.",control:{type:"text"},table:{type:{summary:"string"}}},isError:{description:"Ative error mode.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},size:{description:"Will be input size.",control:"select",options:["xs","sm","base","lg","xl","100"],table:{type:{summary:"'xs' | 'sm' | 'base' | 'lg' | 'xl' | '100'"},defaultValue:{summary:"100"}}},mask:{description:"Will be the masked applied to the input. Only triggered on input type text without min or max limit.",control:"select",options:["cpf","cnpj","cep","domain","url"],table:{type:{summary:"'cpf' | 'cnpj' | 'cep' | 'domain' | 'url' | undefined"},defaultValue:{summary:"undefined"}}},isTextArea:{description:"Instead of a regular input the component will be a text area.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{description:"Desabilita o input",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},icon:{description:"Will be the input icon.",control:{type:"text"},table:{type:{summary:"string"}}},appendIcon:{description:"If true, the icon will be appended to the input.",control:{type:"boolean"},table:{type:{summary:"boolean"}}},textAlign:{description:"This property will be input text alignment.",control:"select",options:["start","center","end"],table:{type:{summary:"'start' | 'center' | 'end'"},defaultValue:{summary:"start"}}},tooltipMinWidth:{description:"This property will be info tooltip min-width. It doesn't work with file input",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:"none"}}},onFocus:{description:"Will be the function that execute when input get focus.",table:{category:"events",type:{summary:"(event: FocusEvent) => void"}}},onBlur:{description:"Will be the function that execute when input get out of focus.",table:{category:"events",type:{summary:"(event: FocusEvent) => void"}}},"uploaded-file":{description:"When the type is file and a file is uploaded, this slot will appear",table:{type:{summary:"slot"}}}}},e={modelValue:null,labelValue:"label",type:"text",mask:void 0,max:void 0,min:void 0,step:1,errorMessage:"",infoMessage:"",placeholder:"",isError:!1,size:"sm",isTextArea:!1,disabled:!1,required:!1,textAlign:"start",tooltipMinWidth:"none",icon:"",appendIcon:!1},r=K=>({components:{BInput:J},setup(){return{args:K}},template:`
    <BInput
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
         :is-text-area="args.isTextArea"
         :size="args.size"
         :disabled="args.disabled"
         :required="args.required"
         :placeholder="args.placeholder"
         :text-align="args.textAlign"
         :tooltip-min-width="args.tooltipMinWidth"
         :icon="args.icon"
         :append-icon="args.appendIcon"
    />`}),a={render:r,args:{...e,errorMessage:"Error message"}},t={render:r,args:{...e,labelValue:"Number",max:10,min:0,type:"number"}},s={render:r,args:{...e,labelValue:"Text area",isTextArea:!0}},n={render:r,args:{...e,labelValue:"Search",type:"search"}},o={render:r,args:{...e,labelValue:"Color",type:"color"}},l={render:r,args:{...e,max:20,type:"text"}},i={render:r,args:{...e,labelValue:"Error",isError:!0,errorMessage:"Error message",type:"text"}},p={render:r,args:{...e,labelValue:"Password",type:"password"}},u={render:r,args:{...e,labelValue:"Select a file",placeholder:"or drag and drop it here",type:"file"}},d={render:r,args:{...e,labelValue:"Email",errorMessage:"Invalid email",type:"email"}},m={render:r,args:{...e,infoMessage:"Info message"}};var c,g,y;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    errorMessage: "Error message"
  }
}`,...(y=(g=a.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var b,f,h;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Number",
    max: 10,
    min: 0,
    type: "number"
  }
}`,...(h=(f=t.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var x,V,A;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Text area",
    isTextArea: true
  }
}`,...(A=(V=s.parameters)==null?void 0:V.docs)==null?void 0:A.source}}};var M,w,E;n.parameters={...n.parameters,docs:{...(M=n.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Search",
    type: "search"
  }
}`,...(E=(w=n.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};var v,W,S;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Color",
    type: "color"
  }
}`,...(S=(W=o.parameters)==null?void 0:W.docs)==null?void 0:S.source}}};var I,R,T;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    max: 20,
    type: "text"
  }
}`,...(T=(R=l.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var k,P,z;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Error",
    isError: true,
    errorMessage: "Error message",
    type: "text"
  }
}`,...(z=(P=i.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};var B,F,C;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Password",
    type: "password"
  }
}`,...(C=(F=p.parameters)==null?void 0:F.docs)==null?void 0:C.source}}};var N,j,q;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Select a file",
    placeholder: "or drag and drop it here",
    type: "file"
  }
}`,...(q=(j=u.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};var _,L,O;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Email",
    errorMessage: "Invalid email",
    type: "email"
  }
}`,...(O=(L=d.parameters)==null?void 0:L.docs)==null?void 0:O.source}}};var D,G,H;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Info message"
  }
}`,...(H=(G=m.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const re=["Primary","Number","TextArea","Search","Color","MaxLetters","Error","Password","File","Email","InfoMessage"];export{o as Color,d as Email,i as Error,u as File,m as InfoMessage,l as MaxLetters,t as Number,p as Password,a as Primary,n as Search,s as TextArea,re as __namedExportsOrder,ee as default};
