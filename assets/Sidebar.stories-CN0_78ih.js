import{E as i,_ as e}from"./iframe-oiXQscte.js";var l,r,n,o,s,d;const b={component:i,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Will name of the selected option."},options:{type:{name:"array",value:{name:"object",value:{}}},description:"Array of object to be used as sidebar options. Props(label: string, value: string, icon: string, path: string, disabled: boolean, bottom: boolean, options: Option[])"},expanded:{type:{name:"boolean"},description:"If true, the sidebar will be expanded."},getObject:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If true, the selected value will be an object instead of value-key value."}}};var p={modelValue:"dashboard",getObject:!1,expanded:!1,options:[{label:"Dashboard",value:"dashboard",icon:"dashboard",path:"/"},{label:"Projects",value:"projects",path:"/projects",icon:"folder",options:[{label:"All Projects",value:"rew-projects",path:"/all",options:[{label:"All Projects",value:"all-projects",path:"/all"},{label:"Internal",value:"internal",path:"/internal"},{label:"External",value:"external",path:"/external"}]},{label:"Internal",value:"internal",path:"/internal"},{label:"External",value:"external",path:"/external"}]},{label:"Team",value:"team",path:"/team",icon:"group"},{label:"Analytics",value:"analytics",path:"/analytics",icon:"analytics",disabled:!0},{label:"Settings",value:"settings",path:"/settings",icon:"settings",bottom:!0}]},u=function(c){return{components:{Sidebar:i},setup:function(){return{args:c}},template:`
    <div class="h-screen">
      <Sidebar
        v-model="args.modelValue"
        :expanded="args.expanded"
        :options="args.options"
        :get-object="args.getObject"
      />
    </div>
  `}},a={render:u,args:p},t={render:u,args:e(e({},p),{expanded:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(l=a.parameters)===null||l===void 0?void 0:l.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(n=(r=a.parameters)===null||r===void 0?void 0:r.docs)===null||n===void 0?void 0:n.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(o=t.parameters)===null||o===void 0?void 0:o.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    expanded: true
  }
}`},(d=(s=t.parameters)===null||s===void 0?void 0:s.docs)===null||d===void 0?void 0:d.source)})});const m=Object.freeze(Object.defineProperty({__proto__:null,Expanded:t,Primary:a,default:b},Symbol.toStringTag,{value:"Module"}));export{t as E,a as P,m as S};
