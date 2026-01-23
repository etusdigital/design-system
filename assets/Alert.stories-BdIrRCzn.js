import{b as u,_ as e}from"./iframe-CjRVAs2g.js";var g,v,f,y,b,h,_,A,w,x,S,j,I,P,z,T,$,H,V,R,E;const C={component:u,argTypes:{title:{type:{name:"string"},description:"Will be the alert title."},message:{type:{name:"string"},description:"Will be the alert message."},type:{type:{name:"string"},control:"select",options:["info","success","warning","danger","neutral"],table:{defaultValue:{summary:"info"}}},size:{type:{name:"string"},control:"select",options:["small","medium","large"],table:{defaultValue:{summary:"large"}}},icon:{type:{name:"string"},description:"This will be the icon shown, when not passed the alert icon will be the type icon."},iconPosition:{type:{name:"string"},control:"select",options:["start","center","end"],table:{defaultValue:{summary:"start"}},description:"This will be the icon position shown, when not passed the alert icon will be the type icon."},expandable:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},closable:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},hideIcon:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},default:{description:"If no message or title are passed, it slot will be display instead."},actions:{description:"Actions slot will be displayed at the right side of the alert."}}};var a={title:"Demo Title",message:"Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.",type:"info",size:"medium",icon:"",iconPosition:"start",expandable:!1,closable:!1,hideIcon:!1,showAlert:!0},p=`
  <Alert
    v-if="args.showAlert"
    id="alert"
    :title="args.title"
    :message="args.message"
    :type="args.type"
    :size="args.size"
    :icon="args.icon"
    :icon-position="args.iconPosition"
    :expandable="args.expandable"
    :closable="args.closable"
    :hide-icon="args.hideIcon"
    @close="args.showAlert = !args.showAlert; delay( ()=> {args.showAlert = !args.showAlert}, 2000)"
  />
`,m=function(n){return{components:{Alert:u},setup:function(){return{args:n}},methods:{delay:function(r,L){setTimeout(r,L)}},template:p}},s={render:m,args:a},t={render:function(n){return{components:{Alert:u},setup:function(){return{args:n}},template:`
      <div class="flex gap-xs">
      `.concat(["info","success","warning","danger","neutral"].map(function(r){return p.replace(/args\.type/g,"'".concat(r,"'"))}).join(""),`
      </div>
    `)}},args:e(e({},a),{message:"Lorem ipsum dolor sit amet dolor consectetur."})},o={render:function(n){return{components:{Alert:u},setup:function(){return{args:n}},template:`
      <div class="flex gap-xs">
        `.concat(["small","medium","large"].map(function(r){return p.replace(/args\.size/g,"'".concat(r,"'"))}).join(""),`
      </div>
    `)}},args:a},l={render:function(n){return{components:{Alert:u},setup:function(){return{args:n}},template:`
      <div class="flex gap-xs">
      `.concat(["start","center","end"].map(function(r){return p.replace(/args\.iconPosition/g,"'".concat(r,"'"))}).join(""),`
      </div>
    `)}},args:a},i={render:m,args:e(e({},a),{expandable:!0})},d={render:m,args:e(e({},a),{closable:!0})},c={render:m,args:e(e({},a),{hideIcon:!0})};s.parameters=e(e({},s.parameters),{docs:e(e({},(g=s.parameters)===null||g===void 0?void 0:g.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(f=(v=s.parameters)===null||v===void 0?void 0:v.docs)===null||f===void 0?void 0:f.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(y=t.parameters)===null||y===void 0?void 0:y.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Alert
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-xs">
      \${["info", "success", "warning", "danger", "neutral"].map(type => {
      return defaultHtml.replace(/args\\.type/g, \`'\${type}'\`);
    }).join("")}
      </div>
    \`
  }),
  args: {
    ...defaultArgs,
    message: "Lorem ipsum dolor sit amet dolor consectetur."
  }
}`},(h=(b=t.parameters)===null||b===void 0?void 0:b.docs)===null||h===void 0?void 0:h.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(_=o.parameters)===null||_===void 0?void 0:_.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Alert
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-xs">
        \${["small", "medium", "large"].map(type => {
      return defaultHtml.replace(/args\\.size/g, \`'\${type}'\`);
    }).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(w=(A=o.parameters)===null||A===void 0?void 0:A.docs)===null||w===void 0?void 0:w.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(x=l.parameters)===null||x===void 0?void 0:x.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Alert
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-xs">
      \${["start", "center", "end"].map(type => {
      return defaultHtml.replace(/args\\.iconPosition/g, \`'\${type}'\`);
    }).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(j=(S=l.parameters)===null||S===void 0?void 0:S.docs)===null||j===void 0?void 0:j.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(I=i.parameters)===null||I===void 0?void 0:I.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    expandable: true
  }
}`},(z=(P=i.parameters)===null||P===void 0?void 0:P.docs)===null||z===void 0?void 0:z.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(T=d.parameters)===null||T===void 0?void 0:T.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    closable: true
  }
}`},(H=($=d.parameters)===null||$===void 0?void 0:$.docs)===null||H===void 0?void 0:H.source)})});c.parameters=e(e({},c.parameters),{docs:e(e({},(V=c.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    hideIcon: true
  }
}`},(E=(R=c.parameters)===null||R===void 0?void 0:R.docs)===null||E===void 0?void 0:E.source)})});const W=Object.freeze(Object.defineProperty({__proto__:null,Closable:d,Expandable:i,HideIcon:c,IconPositions:l,Primary:s,Sizes:o,Types:t,default:C},Symbol.toStringTag,{value:"Module"}));export{W as A,d as C,i as E,c as H,l as I,s as P,o as S,t as T};
