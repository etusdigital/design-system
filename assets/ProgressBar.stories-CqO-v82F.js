import{v as s,_ as e}from"./iframe-1aJ3cS75.js";var f,y,_,b,h,P,x,B,w,T,S,V,z,k,A,j,$,I,M,H,R,q,D,N,O,U,C;const E={component:s,argTypes:{modelValue:{type:{name:"number"},table:{defaultValue:{summary:"0"}},description:"Thil will be the current step the user is on. If the steps is not defined, it will be the bar fill percentage in 0 to 1 scale."},color:{type:{name:"string"},description:"This property will be the color of the progress bar."},icon:{type:{name:"string"},description:"This property will be the icon shown after the loading percentage. It works only with the normal bar without animation."},infoMessage:{type:{name:"string"},description:"This property will be shown in a tooltip when the icon is hovered."},type:{type:{name:"string"},control:"select",options:["primary","info","success","warning","danger","neutral"],table:{defaultValue:{summary:"primary"}}},size:{type:{name:"string"},control:"select",options:["small","medium","large"],table:{defaultValue:{summary:"medium"}}},animationType:{type:{name:"string"},control:"select",options:["indeterminate","query",void 0],table:{defaultValue:{summary:""}},description:"This property will be the progress bar animation type."},steps:{type:{name:"number"},table:{defaultValue:{summary:"0"}},description:"This property will be the amount of steps used to calculate the loading percentage."},displayPercentage:{type:{name:"string"},control:"select",options:["center","bar",null],table:{defaultValue:{summary:""}},description:"Display the percentage, if the bar isn't divided."},neutralBackground:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If this property is true, the background will be neutral."},"icon-slot":{description:"This slot will replace the icon."}}};var n={modelValue:.5,size:"medium",type:"primary",color:"",icon:"",infoMessage:"",steps:0,animationType:void 0,displayPercentage:void 0,neutralBackground:!1},m=`
  <ProgressBar
    v-model="args.modelValue"
    :icon="args.icon"
    :color="args.color"
    :size="args.size"
    :type="args.type"
    :animation-type="args.animationType"
    :steps="args.steps"
    :display-percentage="args.displayPercentage"
    :neutral-background="args.neutralBackground"
    :info-message="args.infoMessage"
  />`,v=function(r){return{components:{ProgressBar:s},setup:function(){return{args:r}},template:m}},t={render:v,args:n},o={render:function(r){return{components:{ProgressBar:s},setup:function(){return{args:r}},template:`
      <div class="flex flex-col gap-xs">
        `.concat(["primary","info","success","warning","danger","neutral"].map(function(a){return m.replace(/args\.type/g,"'".concat(a,"'"))}).join(""),`
      </div>
    `)}},args:n},l={render:function(r){return{components:{ProgressBar:s},setup:function(){return{args:r}},template:`
      <div class="flex flex-col gap-xs">
        `.concat(["small","medium","large"].map(function(a){return m.replace(/args\.size/g,"'".concat(a,"'"))}).join(""),`
      </div>
    `)}},args:n},i={render:v,args:e(e({},n),{steps:5,modelValue:3})},d={render:function(r){return{components:{ProgressBar:s},setup:function(){return{args:r}},template:`
      <div class="flex flex-col gap-xs">
        `.concat(["indeterminate","query"].map(function(a){return m.replace(/args\.animationType/g,"'".concat(a,"'"))}).join(""),`
      </div>
    `)}},args:n},c={render:function(r){return{components:{ProgressBar:s},setup:function(){return{args:r}},template:`
      <div class="flex flex-col gap-xs">
        `.concat(["center","bar"].map(function(a){return m.replace(/args\.displayPercentage/g,"'".concat(a,"'"))}).join(""),`
      </div>
    `)}},args:n},u={render:v,args:e(e({},n),{icon:"rocket_launch",infoMessage:"Upload in progress"})},p={render:v,args:e(e({},n),{neutralBackground:!0})},g={render:function(r){return{components:{ProgressBar:s},setup:function(){return{args:r}},template:`
      <ProgressBar
        v-model="args.modelValue"
        :size="args.size"
        :type="args.type"
        display-percentage="bar"
      >
        <template #icon-slot>
          Slot: icon-slot
        </template>
      </ProgressBar>
    `}},args:e(e({},n),{modelValue:.5})};t.parameters=e(e({},t.parameters),{docs:e(e({},(f=t.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(_=(y=t.parameters)===null||y===void 0?void 0:y.docs)===null||_===void 0?void 0:_.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(b=o.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      ProgressBar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-xs">
        \${["primary", "info", "success", "warning", "danger", "neutral"].map(type => {
      return defaultHtml.replace(/args\\.type/g, \`'\${type}'\`);
    }).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(P=(h=o.parameters)===null||h===void 0?void 0:h.docs)===null||P===void 0?void 0:P.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(x=l.parameters)===null||x===void 0?void 0:x.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      ProgressBar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-xs">
        \${["small", "medium", "large"].map(size => {
      return defaultHtml.replace(/args\\.size/g, \`'\${size}'\`);
    }).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(w=(B=l.parameters)===null||B===void 0?void 0:B.docs)===null||w===void 0?void 0:w.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(T=i.parameters)===null||T===void 0?void 0:T.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    steps: 5,
    modelValue: 3
  }
}`},(V=(S=i.parameters)===null||S===void 0?void 0:S.docs)===null||V===void 0?void 0:V.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(z=d.parameters)===null||z===void 0?void 0:z.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      ProgressBar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-xs">
        \${["indeterminate", "query"].map(animationType => {
      return defaultHtml.replace(/args\\.animationType/g, \`'\${animationType}'\`);
    }).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(A=(k=d.parameters)===null||k===void 0?void 0:k.docs)===null||A===void 0?void 0:A.source)})});c.parameters=e(e({},c.parameters),{docs:e(e({},(j=c.parameters)===null||j===void 0?void 0:j.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      ProgressBar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-xs">
        \${["center", "bar"].map(displayPercentage => {
      return defaultHtml.replace(/args\\.displayPercentage/g, \`'\${displayPercentage}'\`);
    }).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(I=($=c.parameters)===null||$===void 0?void 0:$.docs)===null||I===void 0?void 0:I.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(M=u.parameters)===null||M===void 0?void 0:M.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: "rocket_launch",
    infoMessage: "Upload in progress"
  }
}`},(R=(H=u.parameters)===null||H===void 0?void 0:H.docs)===null||R===void 0?void 0:R.source)})});p.parameters=e(e({},p.parameters),{docs:e(e({},(q=p.parameters)===null||q===void 0?void 0:q.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    neutralBackground: true
  }
}`},(N=(D=p.parameters)===null||D===void 0?void 0:D.docs)===null||N===void 0?void 0:N.source)})});g.parameters=e(e({},g.parameters),{docs:e(e({},(O=g.parameters)===null||O===void 0?void 0:O.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      ProgressBar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <ProgressBar
        v-model="args.modelValue"
        :size="args.size"
        :type="args.type"
        display-percentage="bar"
      >
        <template #icon-slot>
          Slot: icon-slot
        </template>
      </ProgressBar>
    \`
  }),
  args: {
    ...defaultArgs,
    modelValue: 0.5
  }
}`},(C=(U=g.parameters)===null||U===void 0?void 0:U.docs)===null||C===void 0?void 0:C.source)})});const G=Object.freeze(Object.defineProperty({__proto__:null,AnimationTypes:d,DisplayPercentage:c,Icon:u,IconSlot:g,NeutralBackground:p,Primary:t,Sizes:l,Steps:i,Types:o,default:E},Symbol.toStringTag,{value:"Module"}));export{d as A,c as D,u as I,p as N,G as P,l as S,o as T,t as a,i as b,g as c};
