import{G as m,_ as e}from"./iframe-YS2_Kj4J.js";var t,n,o,s,d,i,p,u,c;const f={component:m,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Will name of the selected option."},options:{type:{name:"array",value:{name:"object",value:{}}},description:"Array of object to be used as sidebar options. Props(label: string, value: string, icon: string, path: string, disabled: boolean, bottom: boolean, options: Option[])"},expanded:{type:{name:"boolean"},description:"If true, the sidebar will be expanded."},collapsible:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If true, shows a toggle button so the user can expand/collapse the sidebar themselves. Use with v-model:expanded."},getObject:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If true, the selected value will be an object instead of value-key value."}}};var b={modelValue:"dashboard",getObject:!1,expanded:!1,collapsible:!1,options:[{label:"Dashboard",value:"dashboard",icon:"dashboard",path:"/"},{label:"Projects",value:"projects",icon:"folder",options:[{label:"All Projects",value:"rew-projects",path:"/all",options:[{label:"All Projects",value:"all-projects",path:"/all"},{label:"Internal",value:"internal",path:"/internal"},{label:"External",value:"external",path:"/external"}]},{label:"Internal",value:"internal",path:"/internal"},{label:"External",value:"external",path:"/external"}]},{label:"Team",value:"team",path:"/team",icon:"group"},{label:"Analytics",value:"analytics",path:"/analytics",icon:"analytics",disabled:!0},{label:"Settings",value:"settings",path:"/settings",icon:"settings",bottom:!0}]},v=function(g){return{components:{Sidebar:m},setup:function(){return{args:g}},template:`
    <div class="h-screen">
      <Sidebar
        v-model="args.modelValue"
        v-model:expanded="args.expanded"
        :collapsible="args.collapsible"
        :options="args.options"
        :get-object="args.getObject"
      />
    </div>
  `}},a={render:v,args:b},l={render:v,args:e(e({},b),{expanded:!0})},r={render:v,args:e(e({},b),{collapsible:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(t=a.parameters)===null||t===void 0?void 0:t.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(o=(n=a.parameters)===null||n===void 0?void 0:n.docs)===null||o===void 0?void 0:o.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(s=l.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    expanded: true
  }
}`},(i=(d=l.parameters)===null||d===void 0?void 0:d.docs)===null||i===void 0?void 0:i.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(p=r.parameters)===null||p===void 0?void 0:p.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    collapsible: true
  }
}`},(c=(u=r.parameters)===null||u===void 0?void 0:u.docs)===null||c===void 0?void 0:c.source)})});const y=Object.freeze(Object.defineProperty({__proto__:null,Collapsible:r,Expanded:l,Primary:a,default:f},Symbol.toStringTag,{value:"Module"}));export{r as C,l as E,a as P,y as S};
