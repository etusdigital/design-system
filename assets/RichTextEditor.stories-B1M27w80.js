import{E,_ as e}from"./iframe-LJwCixq7.js";var n,u,c,m,g,p,f,h,v,b,x,y,_,k,R,M,V,T;const q={component:E,argTypes:{modelValue:{description:"HTML content of the rich text editor."},labelValue:{description:"Label for the rich text editor."},isError:{table:{defaultValue:{summary:"false"}},description:"Activate error state."},errorMessage:{description:"Error message to display."},infoMessage:{description:"Info message for the label tooltip."},placeholder:{description:"Placeholder text when editor is empty."},disabled:{table:{defaultValue:{summary:"false"}},description:"Disable the editor."},required:{table:{defaultValue:{summary:"false"}},description:"Mark the field as required."},tooltipMinWidth:{description:"Minimum width of the tooltip."},noBorder:{table:{defaultValue:{summary:"false"}},description:"Remove border from editor."},linkDialogLabel:{table:{defaultValue:{summary:"Insert link"}},description:"Accessible name of the insert-link dialog."},linkUrlLabel:{table:{defaultValue:{summary:"URL"}},description:"Label of the URL field in the insert-link dialog."},linkUrlPlaceholder:{table:{defaultValue:{summary:"URL (e.g. https://example.com)"}},description:"Placeholder of the URL field in the insert-link dialog."},linkTextLabel:{table:{defaultValue:{summary:"Text"}},description:"Label of the text field in the insert-link dialog."},linkTextPlaceholder:{table:{defaultValue:{summary:"Text to display"}},description:"Placeholder of the text field in the insert-link dialog."},"insert-link-label":{description:'Label of the "Insert Link" button in the insert-link dialog.'},minHeight:{table:{defaultValue:{summary:"200px"}},description:"Minimum height of editor content area."},maxHeight:{table:{defaultValue:{summary:"400px"}},description:"Maximum height of editor content area."}}};var r={modelValue:'<div style="font-size: 24px;">Welcome to the Rich Text Editor!</div><div>You can format text with <strong>bold</strong>, <em>italic</em>, and <u>underline</u>.</div><ul><li>Create lists</li><li>Add <a href="https://example.com" target="_blank" rel="noopener noreferrer">links with new interface</a></li><li>Upload images with FileUpload component</li><li>Format text with different sizes</li></ul><blockquote style="border-left: var(--border-width-sm) solid var(--primary-border-default); padding: var(--spacing-base); margin: var(--spacing-xxs) 0; font-style: italic; background-color: var(--primary-surface-default); border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;">This is a quote example</blockquote>',labelValue:"Rich Text Editor",errorMessage:"",infoMessage:"",placeholder:"Type your text...",tooltipMinWidth:"none",isError:!1,disabled:!1,required:!1,noBorder:!1,minHeight:"200px",maxHeight:"400px"},w=`
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
    />`,a=function(L){return{components:{RichTextEditor:E},setup:function(){return{args:L}},template:w}},t={render:a,args:r},o={render:a,args:e(e({},r),{isError:!0,errorMessage:"Please enter valid content"})},i={render:a,args:e(e({},r),{infoMessage:"Use the toolbar to format your text. You can add headings, lists, links, and more!"})},l={render:a,args:e(e({},r),{disabled:!0})},s={render:a,args:e(e({},r),{required:!0})},d={render:a,args:e(e({},r),{noBorder:!0})};t.parameters=e(e({},t.parameters),{docs:e(e({},(n=t.parameters)===null||n===void 0?void 0:n.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(c=(u=t.parameters)===null||u===void 0?void 0:u.docs)===null||c===void 0?void 0:c.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(m=o.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Please enter valid content"
  }
}`},(p=(g=o.parameters)===null||g===void 0?void 0:g.docs)===null||p===void 0?void 0:p.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(f=i.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Use the toolbar to format your text. You can add headings, lists, links, and more!"
  }
}`},(v=(h=i.parameters)===null||h===void 0?void 0:h.docs)===null||v===void 0?void 0:v.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(b=l.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(y=(x=l.parameters)===null||x===void 0?void 0:x.docs)===null||y===void 0?void 0:y.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(_=s.parameters)===null||_===void 0?void 0:_.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(R=(k=s.parameters)===null||k===void 0?void 0:k.docs)===null||R===void 0?void 0:R.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(M=d.parameters)===null||M===void 0?void 0:M.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    noBorder: true
  }
}`},(T=(V=d.parameters)===null||V===void 0?void 0:V.docs)===null||T===void 0?void 0:T.source)})});const P=Object.freeze(Object.defineProperty({__proto__:null,Disabled:l,InfoMessage:i,IsError:o,NoBorder:d,Primary:t,Required:s,default:q},Symbol.toStringTag,{value:"Module"}));export{l as D,o as I,d as N,t as P,P as R,i as a,s as b};
