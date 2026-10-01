import{x as f,_ as e,s as _}from"./iframe-C-VLzmCM.js";var r,l,o,i,s,d,c,u,p;const S={component:f,argTypes:{modelValue:{type:{name:"other",value:"Record<string, any>"},description:"Selected sub-item of each option that has `items`, keyed by the option value (e.g. `{ language: 'en' }`)."},expanded:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Controls whether the menu is open (v-model:expanded)."},name:{type:{name:"string"},description:"User name shown in the header and used for the avatar initials."},description:{type:{name:"string"},description:"Secondary text under the name, such as the email."},picture:{type:{name:"string"},description:"Avatar image URL."},options:{type:{name:"array",value:{name:"object",value:{}}},description:"Menu options: `{ label, value, icon?, image?, color?, disabled?, items?, action? }`. Options with `items` open a single-choice list."},labelKey:{type:{name:"string"},table:{defaultValue:{summary:"label"}}},valueKey:{type:{name:"string"},table:{defaultValue:{summary:"value"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},ariaLabel:{type:{name:"string"},description:"Accessible name of the trigger and menu (defaults to the name)."},trigger:{description:"Replaces the avatar and arrow. Params: expanded."},header:{description:"Replaces the header. Params: name, description and picture."},option:{description:"Replaces an option content. Params: option and selectedItem."},item:{description:"Replaces a sub-item content. Params: option, item and selected."},footer:{description:"Content displayed after the options."}}};var x=[{label:"My account",value:"account",icon:"person"},{label:"Settings",value:"settings",icon:"settings"},{label:"Language",value:"language",icon:"translate",items:[{label:"English",value:"en",icon:"language"},{label:"Português",value:"pt",icon:"language"}]},{label:"Theme",value:"theme",icon:"contrast",items:[{label:"Light",value:"light",icon:"light_mode"},{label:"Dark",value:"dark",icon:"dark_mode"}]},{label:"Logout",value:"logout",icon:"logout",color:"danger"}],m={modelValue:{language:"en",theme:"light"},expanded:!1,name:"John Doe",description:"john@example.com",picture:"",options:x,labelKey:"label",valueKey:"value",disabled:!1},g=function(y){return{components:{ProfilePicture:f},setup:function(){var v=_("");function P(b,h){v.value=h?"".concat(b.label,": ").concat(h.label):b.label}return{args:y,lastSelected:v,onSelect:P}},template:`
    <ProfilePicture
      v-model="args.modelValue"
      v-model:expanded="args.expanded"
      :name="args.name"
      :description="args.description"
      :picture="args.picture"
      :options="args.options"
      :label-key="args.labelKey"
      :value-key="args.valueKey"
      :disabled="args.disabled"
      @select="onSelect"
      class="w-fit"
    />
  `}},a={render:g,args:m},t={render:g,args:e(e({},m),{picture:"https://i.pravatar.cc/150?img=47"})},n={render:g,args:e(e({},m),{disabled:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(r=a.parameters)===null||r===void 0?void 0:r.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(o=(l=a.parameters)===null||l===void 0?void 0:l.docs)===null||o===void 0?void 0:o.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(i=t.parameters)===null||i===void 0?void 0:i.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    picture: "https://i.pravatar.cc/150?img=47"
  }
}`},(d=(s=t.parameters)===null||s===void 0?void 0:s.docs)===null||d===void 0?void 0:d.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(c=n.parameters)===null||c===void 0?void 0:c.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(p=(u=n.parameters)===null||u===void 0?void 0:u.docs)===null||p===void 0?void 0:p.source)})});const V=Object.freeze(Object.defineProperty({__proto__:null,Disabled:n,Primary:a,WithPicture:t,default:S},Symbol.toStringTag,{value:"Module"}));export{n as D,V as P,t as W,a};
