import{F as P,_ as e}from"./iframe-D9ZodyF1.js";var c,g,m,f,v,b,_,y,h,V,M,F,U,x,S,A,z,D,R,j,E,w,O,I;const W={component:P,argTypes:{modelValue:{type:{name:"other",value:"File | File[] | undefined"},description:"Will be the uploaded file(s). Can be a single File or File[] if multiple is true."},labelValue:{type:{name:"string"},description:"Will be the file upload label."},errorMessage:{type:{name:"string"},description:"Will be the file upload error message."},placeholder:{type:{name:"string"},description:"Will be the file upload placeholder text."},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Ative error mode."},size:{type:{name:"string"},description:"Will be file upload size.",control:"select",options:["extra-small","small","medium","large","extra-large"],table:{defaultValue:{summary:"medium"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Disables the file upload functionality."},accept:{description:'Specifies the types of files that the server accepts. E.g., ".jpg,.png,.pdf"'},multiple:{table:{defaultValue:{summary:"(value)=>{void}"}},description:"Allows multiple file selection."},"uploaded-file":{description:"Custom slot for displaying uploaded file information"}}};var a={modelValue:void 0,labelValue:"Upload File",errorMessage:"",placeholder:"or drag and drop it here",isError:!1,size:"medium",disabled:!1,infoMessage:"",accept:void 0,multiple:!1},C=`
    <FileUpload
        class="h-fit"
         v-model="args.modelValue"
         :label-value="args.labelValue"
         :error-message="args.errorMessage"
         :info-message="args.infoMessage"
         :is-error="args.isError"
         :size="args.size"
         :disabled="args.disabled"
         :placeholder="args.placeholder"
         :accept="args.accept"
         :multiple="args.multiple"
    />`,r=function(p){return{components:{FileUpload:P},setup:function(){return{args:p}},template:C}},l={render:r,args:a},s={render:r,args:e(e({},a),{labelValue:"Upload Image",accept:".jpg,.jpeg,.png,.gif",infoMessage:"Only image files allowed"})},o={render:r,args:e(e({},a),{labelValue:"Upload Multiple Files",multiple:!0,infoMessage:"Select multiple files or drag them here"})},i={render:r,args:e(e({},a),{labelValue:"Upload with Info",infoMessage:"Maximum file size: 10MB. Supported formats: PDF, DOC, DOCX"})},n={render:r,args:e(e({},a),{labelValue:"Upload with Error",isError:!0,errorMessage:"File upload failed. Please try again."})},d={render:r,args:e(e({},a),{labelValue:"Disabled Upload",disabled:!0})},t={render:r,args:e(e({},a),{labelValue:"Required Upload",required:!0})},u={render:function(p){return{components:{FileUpload:P},setup:function(){return{args:p}},template:`
      <div class="flex flex-col gap-xs">
        `.concat(["extra-small","small","medium","large","extra-large"].map(function(q){return C.replace(/args\.size/g,"'".concat(q,"'")).replace(/args\.labelValue/g,"'".concat(q,"'"))}).join(""),`
      </div>
    `)}},args:a};l.parameters=e(e({},l.parameters),{docs:e(e({},(c=l.parameters)===null||c===void 0?void 0:c.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(m=(g=l.parameters)===null||g===void 0?void 0:g.docs)===null||m===void 0?void 0:m.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(f=s.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Upload Image",
    accept: ".jpg,.jpeg,.png,.gif",
    infoMessage: "Only image files allowed"
  }
}`},(b=(v=s.parameters)===null||v===void 0?void 0:v.docs)===null||b===void 0?void 0:b.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(_=o.parameters)===null||_===void 0?void 0:_.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Upload Multiple Files",
    multiple: true,
    infoMessage: "Select multiple files or drag them here"
  }
}`},(h=(y=o.parameters)===null||y===void 0?void 0:y.docs)===null||h===void 0?void 0:h.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(V=i.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Upload with Info",
    infoMessage: "Maximum file size: 10MB. Supported formats: PDF, DOC, DOCX"
  }
}`},(F=(M=i.parameters)===null||M===void 0?void 0:M.docs)===null||F===void 0?void 0:F.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(U=n.parameters)===null||U===void 0?void 0:U.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Upload with Error",
    isError: true,
    errorMessage: "File upload failed. Please try again."
  }
}`},(S=(x=n.parameters)===null||x===void 0?void 0:x.docs)===null||S===void 0?void 0:S.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(A=d.parameters)===null||A===void 0?void 0:A.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Disabled Upload",
    disabled: true
  }
}`},(D=(z=d.parameters)===null||z===void 0?void 0:z.docs)===null||D===void 0?void 0:D.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(R=t.parameters)===null||R===void 0?void 0:R.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    labelValue: "Required Upload",
    required: true
  }
}`},(E=(j=t.parameters)===null||j===void 0?void 0:j.docs)===null||E===void 0?void 0:E.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(w=u.parameters)===null||w===void 0?void 0:w.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      FileUpload
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-xs">
        \${["extra-small", "small", "medium", "large", "extra-large"].map(type => {
      return defaultHtml.replace(/args\\.size/g, \`'\${type}'\`).replace(/args\\.labelValue/g, \`'\${type}'\`);
    }).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(I=(O=u.parameters)===null||O===void 0?void 0:O.docs)===null||I===void 0?void 0:I.source)})});const B=Object.freeze(Object.defineProperty({__proto__:null,Accept:s,Disabled:d,InfoMessage:i,IsError:n,Multiple:o,Primary:l,Required:t,Sizes:u,default:W},Symbol.toStringTag,{value:"Module"}));export{s as A,d as D,B as F,n as I,o as M,l as P,u as S,i as a};
