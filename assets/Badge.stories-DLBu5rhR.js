import{B as u,_ as e}from"./iframe-CjRVAs2g.js";var g,m,v,f,y,_,b,h,A,B,x,S,z,I,T,j,w,$,R,V,H;const C={component:u,argTypes:{labelValue:{type:{name:"string"},description:"This property will be the text in the tag."},color:{type:{name:"string"},description:"This property will be badge color."},type:{type:{name:"string"},control:"select",options:["default","secondary","heavy"],table:{defaultValue:{summary:"default"}}},size:{type:{name:"string"},control:"select",options:["small","medium","large"],table:{defaultValue:{summary:"medium"}}},loading:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine if the tag is loading."},icon:{type:{name:"string"},description:"This property will be the icon in the tag."},isAppendedIcon:{type:{name:"boolean"},description:"This property will be the icon in the tag."},closeable:{type:{name:"boolean"},description:"This property will be the icon in the tag."},default:{description:"If no text is passed, it slot will be display instead."}}};var a={labelValue:"Badge component",color:"#000000",size:"medium",type:"default",loading:!1,icon:"star",isAppendedIcon:!1,closeable:!1},P=`
  <Badge
    :label-value="args.labelValue"
    :color="args.color"
    :type="args.type"
    :size="args.size"
    :loading="args.loading"
    :icon="args.icon"
    :is-appended-icon="args.isAppendedIcon"
    :closeable="args.closeable"
  />
`,c=function(n){return{components:{Badge:u},setup:function(){return{args:n}},template:P}},r={render:c,args:a},s={render:function(n){return{components:{Badge:u},setup:function(){return{args:n}},template:`
      <div class="flex gap-xs">
          `.concat(["default","secondary","heavy"].map(function(p){return`
            `.concat(P.replace(/args\.type/g,"'".concat(p,"'")),`
          `)}).join(""),`
      </div>
    `)}},args:a},o={render:function(n){return{components:{Badge:u},setup:function(){return{args:n}},template:`
      <div class="flex gap-xs">
          `.concat(["small","medium","large"].map(function(p){return`
            `.concat(P.replace("args.size","'".concat(p,"'")),`
          `)}).join(""),`
      </div>
    `)}},args:a},t={render:c,args:e(e({},a),{loading:!0})},l={render:c,args:a},d={render:c,args:e(e({},a),{isAppendedIcon:!0})},i={render:c,args:e(e({},a),{closeable:!0})};r.parameters=e(e({},r.parameters),{docs:e(e({},(g=r.parameters)===null||g===void 0?void 0:g.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(v=(m=r.parameters)===null||m===void 0?void 0:m.docs)===null||v===void 0?void 0:v.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(f=s.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Badge
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
}`},(_=(y=s.parameters)===null||y===void 0?void 0:y.docs)===null||_===void 0?void 0:_.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(b=o.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Badge
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
}`},(A=(h=o.parameters)===null||h===void 0?void 0:h.docs)===null||A===void 0?void 0:A.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(B=t.parameters)===null||B===void 0?void 0:B.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    loading: true
  }
}`},(S=(x=t.parameters)===null||x===void 0?void 0:x.docs)===null||S===void 0?void 0:S.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(z=l.parameters)===null||z===void 0?void 0:z.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(T=(I=l.parameters)===null||I===void 0?void 0:I.docs)===null||T===void 0?void 0:T.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(j=d.parameters)===null||j===void 0?void 0:j.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isAppendedIcon: true
  }
}`},($=(w=d.parameters)===null||w===void 0?void 0:w.docs)===null||$===void 0?void 0:$.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(R=i.parameters)===null||R===void 0?void 0:R.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    closeable: true
  }
}`},(H=(V=i.parameters)===null||V===void 0?void 0:V.docs)===null||H===void 0?void 0:H.source)})});const O=Object.freeze(Object.defineProperty({__proto__:null,Closeable:i,IsAppendedIcon:d,Loading:t,Primary:r,Sizes:o,Types:s,WithIcon:l,default:C},Symbol.toStringTag,{value:"Module"}));export{O as B,i as C,d as I,t as L,r as P,o as S,s as T,l as W};
