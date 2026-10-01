import{i as u,_ as e}from"./iframe-LJwCixq7.js";var m,g,v,f,h,b,_,y,A,C,x,S,z,I,w,V,j,R,T,$,H;const L={component:u,argTypes:{labelValue:{type:{name:"string"},description:"This property will be the text in the chip."},color:{type:{name:"string"},control:"select",options:["primary","info","success","warning","danger","neutral"],table:{defaultValue:{summary:"primary"}},description:"This property will be the chip color."},size:{type:{name:"string"},control:"select",options:["small","medium","large"],table:{defaultValue:{summary:"small"}}},loading:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine if the chip is loading."},icon:{type:{name:"string"},description:"This property will be the icon in the chip."},isAppendedIcon:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Shows the icon after the text."},closeable:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Adds a close button that emits the close event."},default:{description:"If no text is passed, it slot will be display instead."}}};var r={labelValue:"Chip",color:"primary",size:"small",loading:!1,icon:"",isAppendedIcon:!1,closeable:!1},P=`
  <Chip
    :label-value="args.labelValue"
    :color="args.color"
    :size="args.size"
    :loading="args.loading"
    :icon="args.icon"
    :is-appended-icon="args.isAppendedIcon"
    :closeable="args.closeable"
  />
`,c=function(n){return{components:{Chip:u},setup:function(){return{args:n}},template:P}},a={render:c,args:r},s={render:function(n){return{components:{Chip:u},setup:function(){return{args:n}},template:`
    <div class="flex gap-xs">
      `.concat(["primary","info","success","warning","danger","neutral"].map(function(p){return P.replace(/args\.color/g,"'".concat(p,"'"))}).join(""),`
    </div>`)}},args:r},o={render:function(n){return{components:{Chip:u},setup:function(){return{args:n}},template:`
      <div class="flex items-center gap-xs">
        `.concat(["small","medium","large"].map(function(p){return P.replace("args.size","'".concat(p,"'"))}).join(""),`
      </div>
    `)}},args:r},l={render:c,args:e(e({},r),{loading:!0})},t={render:c,args:e(e({},r),{icon:"star"})},i={render:c,args:e(e({},r),{icon:"star",isAppendedIcon:!0})},d={render:c,args:e(e({},r),{closeable:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(m=a.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(v=(g=a.parameters)===null||g===void 0?void 0:g.docs)===null||v===void 0?void 0:v.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(f=s.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Chip
    },
    setup() {
      return {
        args
      };
    },
    template: \`
    <div class="flex gap-xs">
      \${["primary", "info", "success", "warning", "danger", "neutral"].map(color => defaultHtml.replace(/args\\.color/g, \`'\${color}'\`)).join("")}
    </div>\`
  }),
  args: defaultArgs
}`},(b=(h=s.parameters)===null||h===void 0?void 0:h.docs)===null||b===void 0?void 0:b.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(_=o.parameters)===null||_===void 0?void 0:_.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Chip
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex items-center gap-xs">
        \${["small", "medium", "large"].map(size => defaultHtml.replace("args.size", \`'\${size}'\`)).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(A=(y=o.parameters)===null||y===void 0?void 0:y.docs)===null||A===void 0?void 0:A.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(C=l.parameters)===null||C===void 0?void 0:C.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    loading: true
  }
}`},(S=(x=l.parameters)===null||x===void 0?void 0:x.docs)===null||S===void 0?void 0:S.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(z=t.parameters)===null||z===void 0?void 0:z.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: "star"
  }
}`},(w=(I=t.parameters)===null||I===void 0?void 0:I.docs)===null||w===void 0?void 0:w.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(V=i.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: "star",
    isAppendedIcon: true
  }
}`},(R=(j=i.parameters)===null||j===void 0?void 0:j.docs)===null||R===void 0?void 0:R.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(T=d.parameters)===null||T===void 0?void 0:T.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    closeable: true
  }
}`},(H=($=d.parameters)===null||$===void 0?void 0:$.docs)===null||H===void 0?void 0:H.source)})});const W=Object.freeze(Object.defineProperty({__proto__:null,Closeable:d,Colors:s,IsAppendedIcon:i,Loading:l,Primary:a,Sizes:o,WithIcon:t,default:L},Symbol.toStringTag,{value:"Module"}));export{W as C,i as I,l as L,a as P,o as S,t as W,s as a,d as b};
