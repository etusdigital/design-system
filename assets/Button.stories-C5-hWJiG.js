import{e as t,_ as e}from"./iframe-oiXQscte.js";var f,b,y,_,h,x,w,S,B,L,A,j,z,k,$,O,R,H,T,I,P,C,D,M,V,q,K,E={component:t,argTypes:{type:{type:"string",control:"select",options:["button","reset","submit"],table:{default:"button"}},color:{type:"string",control:"select",options:["primary","info","success","warning","danger","neutral"],table:{default:"primary"}},variant:{type:"string",control:"select",options:["default","secondary","plain","reverse"],table:{default:"default"}},size:{type:"string",control:"select",options:["small","medium","large"],table:{default:"medium"}},disabled:{type:"boolean",table:{default:!1},description:`Disables the underlying button's HTML element and sets the CSS property "cursor-events" to "none".`},round:{type:"boolean",table:{default:!1},description:"If true, the button will have a rounded border."},alwaysOpen:{type:"boolean",table:{default:!1},description:"If true, the button will always be open."},background:{type:"string",table:{default:""},description:"The background color of the button."},loading:{type:"boolean",table:{category:"Loading state",default:!1},description:`If true, shows a spinner instead of the default slot's contents and disables cursor events. If "progress" is anything other than 0, this is implicitly true, so there's no need to use both. Keep in mind that although the content is hidden, it is still rendered so that the button doesn't shrink.`},progress:{type:"number",control:{type:"range",min:0,max:1,step:1e-4},table:{category:"Loading state",default:0},description:"The current progress of the loading state."},default:{description:"This slot will be content inside the button. It will not be shown if isLoading is true."}}},a={type:"button",color:"primary",variant:"default",size:"medium",disabled:!1,round:!1,alwaysOpen:!1,background:"",loading:!1,progress:0},v=`
  <Button
    class="h-fit"
    id="test-button"
    :type="args.type"
    :color="args.color"
    :variant="args.variant"
    :size="args.size"
    :disabled="args.disabled"
    :round="args.round"
    :always-open="args.alwaysOpen"
    :background="args.background"
    :loading="args.loading"
    :progress="args.progress"
    @click="args.click"
  >
    Label
  </Button>`,m=function(r){return{components:{Button:t},setup:function(){return{args:r}},template:v}},s={render:m,args:a},o={render:function(r){return{components:{Button:t},setup:function(){return{args:r}},template:`
    <div class="flex gap-xs">
      `.concat(["primary","info","success","warning","danger","neutral"].map(function(n){return v.replace("args.color","'".concat(n,"'")).replace("Label",n)}).join(""),`
    </div>`)}},args:e({},a)},l={render:function(r){return{components:{Button:t},setup:function(){return{args:r}},template:`
      <div class="flex gap-xs">
        `.concat(["default","secondary","plain","reverse"].map(function(n){return v.replace("args.variant","'".concat(n,"'")).replace("Label",n)}).join(""),`
      </div>`)}},args:a},d={render:m,args:e(e({},a),{disabled:!0})},i={render:m,args:e(e({},a),{round:!0})},u={render:m,args:e(e({},a),{round:!0,alwaysOpen:!0})},c={render:m,args:e(e({},a),{loading:!0})},p={render:function(r){return{components:{Button:t},setup:function(){return{args:r}},template:`
      <div class="flex gap-xs">
        `.concat([.3,.75,1].map(function(n){return v.replace("args.progress","".concat(n))}).join(""),`
      </div>
    `)}},args:a},g={render:function(r){return{components:{Button:t},setup:function(){return{args:r}},template:`
      <div class="flex gap-xs">
        `.concat(["small","medium","large"].map(function(n){return v.replace("args.size","'".concat(n,"'")).replace("Label",n)}).join(""),`
      </div>
    `)}},args:a};s.parameters=e(e({},s.parameters),{docs:e(e({},(f=s.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(y=(b=s.parameters)===null||b===void 0?void 0:b.docs)===null||y===void 0?void 0:y.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(_=o.parameters)===null||_===void 0?void 0:_.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: \`
    <div class="flex gap-xs">
      \${["primary", "info", "success", "warning", "danger", "neutral"].map(color => {
      return defaultHtml.replace("args.color", \`'\${color}'\`).replace("Label", color);
    }).join("")}
    </div>\`
  }),
  args: {
    ...defaultArgs
  }
}`},(x=(h=o.parameters)===null||h===void 0?void 0:h.docs)===null||x===void 0?void 0:x.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(w=l.parameters)===null||w===void 0?void 0:w.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-xs">
        \${["default", "secondary", "plain", "reverse"].map(variant => {
      return defaultHtml.replace("args.variant", \`'\${variant}'\`).replace("Label", variant);
    }).join("")}
      </div>\`
  }),
  args: defaultArgs
}`},(B=(S=l.parameters)===null||S===void 0?void 0:S.docs)===null||B===void 0?void 0:B.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(L=d.parameters)===null||L===void 0?void 0:L.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(j=(A=d.parameters)===null||A===void 0?void 0:A.docs)===null||j===void 0?void 0:j.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(z=i.parameters)===null||z===void 0?void 0:z.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    round: true
  }
}`},($=(k=i.parameters)===null||k===void 0?void 0:k.docs)===null||$===void 0?void 0:$.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(O=u.parameters)===null||O===void 0?void 0:O.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    round: true,
    alwaysOpen: true
  }
}`},(H=(R=u.parameters)===null||R===void 0?void 0:R.docs)===null||H===void 0?void 0:H.source)})});c.parameters=e(e({},c.parameters),{docs:e(e({},(T=c.parameters)===null||T===void 0?void 0:T.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    loading: true
  }
}`},(P=(I=c.parameters)===null||I===void 0?void 0:I.docs)===null||P===void 0?void 0:P.source)})});p.parameters=e(e({},p.parameters),{docs:e(e({},(C=p.parameters)===null||C===void 0?void 0:C.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-xs">
        \${[0.3, 0.75, 1].map(progress => {
      return defaultHtml.replace("args.progress", \`\${progress}\`);
    }).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(M=(D=p.parameters)===null||D===void 0?void 0:D.docs)===null||M===void 0?void 0:M.source)})});g.parameters=e(e({},g.parameters),{docs:e(e({},(V=g.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-xs">
        \${["small", "medium", "large"].map(size => {
      return defaultHtml.replace("args.size", \`'\${size}'\`).replace("Label", size);
    }).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(K=(q=g.parameters)===null||q===void 0?void 0:q.docs)===null||K===void 0?void 0:K.source)})});const G=Object.freeze(Object.defineProperty({__proto__:null,AlwaysOpen:u,Colors:o,Disabled:d,Loading:c,Primary:s,Progress:p,Round:i,Sizes:g,Variants:l,default:E},Symbol.toStringTag,{value:"Module"}));export{u as A,G as B,o as C,d as D,c as L,s as P,i as R,g as S,l as V,p as a};
