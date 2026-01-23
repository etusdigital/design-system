import{x as V,_ as e}from"./iframe-CjRVAs2g.js";var l,u,c,m,g,p,f,v,h,b,x,_,y,M,R,E,q,T;const k={component:V,argTypes:{modelValue:{description:"HTML content of the rich text editor."},labelValue:{description:"Label for the rich text editor."},isError:{table:{defaultValue:{summary:"false"}},description:"Activate error state."},errorMessage:{description:"Error message to display."},infoMessage:{description:"Info message for the label tooltip."},placeholder:{description:"Placeholder text when editor is empty."},disabled:{table:{defaultValue:{summary:"false"}},description:"Disable the editor."},required:{table:{defaultValue:{summary:"false"}},description:"Mark the field as required."},tooltipMinWidth:{description:"Minimum width of the tooltip."},noBorder:{table:{defaultValue:{summary:"false"}},description:"Remove border from editor."},minHeight:{table:{defaultValue:{summary:"200px"}},description:"Minimum height of editor content area."},maxHeight:{table:{defaultValue:{summary:"400px"}},description:"Maximum height of editor content area."}}};var r={modelValue:'<div style="font-size: 24px;">Welcome to the Rich Text Editor!</div><div>You can format text with <strong>bold</strong>, <em>italic</em>, and <u>underline</u>.</div><ul><li>Create lists</li><li>Add <a href="https://example.com" target="_blank" rel="noopener noreferrer">links with new interface</a></li><li>Upload images with FileUpload component</li><li>Format text with different sizes</li></ul><blockquote style="border-left: var(--border-width-sm) solid var(--primary-border-default); padding: var(--spacing-base); margin: var(--spacing-xxs) 0; font-style: italic; background-color: var(--primary-surface-default); border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;">This is a quote example</blockquote>',labelValue:"Rich Text Editor",errorMessage:"",infoMessage:"",placeholder:"Type your text...",tooltipMinWidth:"none",isError:!1,disabled:!1,required:!1,noBorder:!1,minHeight:"200px",maxHeight:"400px"},A=`
    <RichTextEditor
        class="w-full"
        v-model="args.modelValue"
        :label-value="args.labelValue"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :tooltip-min-width="args.tooltipMinWidth"
        :is-error="args.isError"
        :disabled="args.disabled"
        :required="args.required"
        :placeholder="args.placeholder"
        :no-border="args.noBorder"
        :min-height="args.minHeight"
        :max-height="args.maxHeight"
    />`,a=function(w){return{components:{RichTextEditor:V},setup:function(){return{args:w}},template:A}},o={render:a,args:r},t={render:a,args:e(e({},r),{isError:!0,errorMessage:"Please enter valid content"})},s={render:a,args:e(e({},r),{infoMessage:"Use the toolbar to format your text. You can add headings, lists, links, and more!"})},i={render:a,args:e(e({},r),{disabled:!0})},d={render:a,args:e(e({},r),{required:!0})},n={render:a,args:e(e({},r),{noBorder:!0})};o.parameters=e(e({},o.parameters),{docs:e(e({},(l=o.parameters)===null||l===void 0?void 0:l.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(c=(u=o.parameters)===null||u===void 0?void 0:u.docs)===null||c===void 0?void 0:c.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(m=t.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Please enter valid content"
  }
}`},(p=(g=t.parameters)===null||g===void 0?void 0:g.docs)===null||p===void 0?void 0:p.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(f=s.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Use the toolbar to format your text. You can add headings, lists, links, and more!"
  }
}`},(h=(v=s.parameters)===null||v===void 0?void 0:v.docs)===null||h===void 0?void 0:h.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(b=i.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(_=(x=i.parameters)===null||x===void 0?void 0:x.docs)===null||_===void 0?void 0:_.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(y=d.parameters)===null||y===void 0?void 0:y.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(R=(M=d.parameters)===null||M===void 0?void 0:M.docs)===null||R===void 0?void 0:R.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(E=n.parameters)===null||E===void 0?void 0:E.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    noBorder: true
  }
}`},(T=(q=n.parameters)===null||q===void 0?void 0:q.docs)===null||T===void 0?void 0:T.source)})});const S=Object.freeze(Object.defineProperty({__proto__:null,Disabled:i,InfoMessage:s,IsError:t,NoBorder:n,Primary:o,Required:d,default:k},Symbol.toStringTag,{value:"Module"}));export{i as D,t as I,n as N,o as P,S as R,s as a,d as b};
