import{L as p,_ as e}from"./iframe-1aJ3cS75.js";var v,f,y,_,b,S,h,x,A,B,z,w,I,j,T,$,V,R,H,C,L,P,O,W;const k={component:p,argTypes:{labelValue:{type:{name:"string"},description:"This property will be the text in the tag."},color:{type:{name:"string"},control:"select",options:["primary","info","success","warning","danger","neutral"],table:{defaultValue:{summary:"primary"}},description:"This property will be tag color."},type:{type:{name:"string"},control:"select",options:["default","secondary","heavy"],table:{defaultValue:{summary:"default"}}},size:{type:{name:"string"},control:"select",options:["small","medium","large"],table:{defaultValue:{summary:"medium"}}},loading:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine if the tag is loading."},icon:{type:{name:"string"},description:"This property will be the icon in the tag."},isAppendedIcon:{type:{name:"boolean"},description:"This property will be the icon in the tag."},closeable:{type:{name:"boolean"},description:"This property will be the icon in the tag."},default:{description:"If no text is passed, it slot will be display instead."}}};var a={labelValue:"StatusBadge component",color:"primary",size:"medium",type:"default",loading:!1,icon:"star",isAppendedIcon:!1,closeable:!1},m=`
  <StatusBadge
    :label-value="args.labelValue"
    :color="args.color"
    :type="args.type"
    :size="args.size"
    :loading="args.loading"
    :icon="args.icon"
    :is-appended-icon="args.isAppendedIcon"
    :closeable="args.closeable"
  />
`,g=function(n){return{components:{StatusBadge:p},setup:function(){return{args:n}},template:m}},s={render:g,args:a},o={render:function(n){return{components:{StatusBadge:p},setup:function(){return{args:n}},template:`
    <div class="flex gap-xs">
      `.concat(["primary","info","success","warning","danger","neutral"].map(function(r){return m.replace(/args\.color/g,"'".concat(r,"'"))}).join(""),`
    </div>`)}},args:a},t={render:function(n){return{components:{StatusBadge:p},setup:function(){return{args:n}},template:`
      <div class="flex gap-xs">
          `.concat(["default","secondary","heavy"].map(function(r){return`
            `.concat(m.replace(/args\.type/g,"'".concat(r,"'")),`
          `)}).join(""),`
      </div>
    `)}},args:a},l={render:function(n){return{components:{StatusBadge:p},setup:function(){return{args:n}},template:`
      <div class="flex gap-xs">
          `.concat(["small","medium","large"].map(function(r){return`
            `.concat(m.replace("args.size","'".concat(r,"'")),`
          `)}).join(""),`
      </div>
    `)}},args:a},d={render:g,args:e(e({},a),{loading:!0})},i={render:g,args:a},u={render:g,args:e(e({},a),{isAppendedIcon:!0})},c={render:g,args:e(e({},a),{closeable:!0})};s.parameters=e(e({},s.parameters),{docs:e(e({},(v=s.parameters)===null||v===void 0?void 0:v.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(y=(f=s.parameters)===null||f===void 0?void 0:f.docs)===null||y===void 0?void 0:y.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(_=o.parameters)===null||_===void 0?void 0:_.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      StatusBadge
    },
    setup() {
      return {
        args
      };
    },
    template: \`
    <div class="flex gap-xs">
      \${["primary", "info", "success", "warning", "danger", "neutral"].map(color => {
      return defaultHtml.replace(/args\\.color/g, \`'\${color}'\`);
    }).join("")}
    </div>\`
  }),
  args: defaultArgs
}`},(S=(b=o.parameters)===null||b===void 0?void 0:b.docs)===null||S===void 0?void 0:S.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(h=t.parameters)===null||h===void 0?void 0:h.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      StatusBadge
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-xs">
          \${["default", "secondary", "heavy"].map(type => \`
            \${defaultHtml.replace(/args\\.type/g, \`'\${type}'\`)}
          \`).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(A=(x=t.parameters)===null||x===void 0?void 0:x.docs)===null||A===void 0?void 0:A.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(B=l.parameters)===null||B===void 0?void 0:B.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      StatusBadge
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-xs">
          \${["small", "medium", "large"].map(size => \`
            \${defaultHtml.replace("args.size", \`'\${size}'\`)}
          \`).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(w=(z=l.parameters)===null||z===void 0?void 0:z.docs)===null||w===void 0?void 0:w.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(I=d.parameters)===null||I===void 0?void 0:I.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    loading: true
  }
}`},(T=(j=d.parameters)===null||j===void 0?void 0:j.docs)===null||T===void 0?void 0:T.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},($=i.parameters)===null||$===void 0?void 0:$.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(R=(V=i.parameters)===null||V===void 0?void 0:V.docs)===null||R===void 0?void 0:R.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(H=u.parameters)===null||H===void 0?void 0:H.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isAppendedIcon: true
  }
}`},(L=(C=u.parameters)===null||C===void 0?void 0:C.docs)===null||L===void 0?void 0:L.source)})});c.parameters=e(e({},c.parameters),{docs:e(e({},(P=c.parameters)===null||P===void 0?void 0:P.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    closeable: true
  }
}`},(W=(O=c.parameters)===null||O===void 0?void 0:O.docs)===null||W===void 0?void 0:W.source)})});const D=Object.freeze(Object.defineProperty({__proto__:null,Closeable:c,Colors:o,IsAppendedIcon:u,Loading:d,Primary:s,Sizes:l,Types:t,WithIcon:i,default:k},Symbol.toStringTag,{value:"Module"}));export{o as C,u as I,d as L,s as P,D as S,t as T,i as W,l as a,c as b};
