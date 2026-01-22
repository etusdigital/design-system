import{J as D,_ as e}from"./iframe-D9ZodyF1.js";var m,g,v,f,h,b,y,_,w,S,V,R,x,A,T,z,C,k,F,B,I,j,q,M,P,W,$;const N={component:D,argTypes:{modelValue:{type:{name:"other",value:"number | number[]"},table:{defaultValue:{summary:"0"}},description:`This property will be the slider fill percentage or the equivalent number in "max" scale. Max: 1 and Min: 0, if max isn't specified. If isRange is true, it will be an array of two numbers.`},size:{type:{name:"string"},control:"select",options:["small","medium","large"],table:{defaultValue:{summary:"medium"}}},isRange:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If this property is true, the slider will be a range slider."},max:{type:{name:"number"},description:"If the max is specified, the modelValue will be multiply by it."},unit:{type:{name:"string"},description:"This property will be the unit shown in tooltip with the modelValue."},color:{type:{name:"string"},description:"This property will be the slider color, if it's not set, the color will be the default one."},showTooltip:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"When this property is true, a tooltip showing the modelValue will appear in the slider thumb top or right."},vertical:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"The vertical property requires a external div with a specified height."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},fillColors:{type:{name:"array",value:{name:"string"}},description:"When this property is settled, the fill area will be divided between the passed colors."},steps:{type:{name:"array",value:{name:"number"}},description:"When this property is settled, marks will be place in the passed positions (Scale: 0-1) and modelValue can only have the passed values."},neutralBackground:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If this property is true, the slider will have a neutral background."}}};var r={modelValue:0,size:"medium",isRange:!1,max:0,unit:"",color:"",showTooltip:!1,disabled:!1,vertical:!1,fillColors:[],steps:[],neutralBackground:!1},E=`
<div :class="{'h-[15em]': args.vertical }">
  <Slider
    v-model="args.modelValue"
    :size="args.size"
    :show-tooltip="args.showTooltip"
    :disabled="args.disabled"
    :vertical="args.vertical"
    :is-range="args.isRange"
    :max="args.max"
    :unit="args.unit"
    :color="args.color"
    :fillColors="args.fillColors"
    :steps="args.steps"
    :neutral-background="args.neutralBackground"
  />
</div>`,a=function(c){return{components:{Slider:D},setup:function(){return{args:c}},template:E}},s={render:a,args:r},l={render:function(c){return{components:{Slider:D},setup:function(){return{args:c}},template:`
      <div class="flex flex-col gap-base">
        `.concat(["small","medium","large"].map(function(H){return E.replace(/args\.size/g,"'".concat(H,"'"))}).join(""),`
      </div>
    `)}},args:r},n={render:a,args:e(e({},r),{isRange:!0})},o={render:a,args:e(e({},r),{showTooltip:!0})},t={render:a,args:e(e({},r),{modelValue:.5,disabled:!0})},i={render:a,args:e(e({},r),{vertical:!0})},d={render:a,args:e(e({},r),{modelValue:.5,fillColors:["#00CEFC","#50358A","#FF9654"]})},u={render:a,args:e(e({},r),{steps:[0,.25,.5,.75,1]})},p={render:a,args:e(e({},r),{neutralBackground:!0})};s.parameters=e(e({},s.parameters),{docs:e(e({},(m=s.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(v=(g=s.parameters)===null||g===void 0?void 0:g.docs)===null||v===void 0?void 0:v.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(f=l.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Slider
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-base">
        \${["small", "medium", "large"].map(size => {
      return defaultHtml.replace(/args\\.size/g, \`'\${size}'\`);
    }).join("")}
      </div>
    \`
  }),
  args: defaultArgs
}`},(b=(h=l.parameters)===null||h===void 0?void 0:h.docs)===null||b===void 0?void 0:b.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(y=n.parameters)===null||y===void 0?void 0:y.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isRange: true
  }
}`},(w=(_=n.parameters)===null||_===void 0?void 0:_.docs)===null||w===void 0?void 0:w.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(S=o.parameters)===null||S===void 0?void 0:S.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    showTooltip: true
  }
}`},(R=(V=o.parameters)===null||V===void 0?void 0:V.docs)===null||R===void 0?void 0:R.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(x=t.parameters)===null||x===void 0?void 0:x.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: 0.5,
    disabled: true
  }
}`},(T=(A=t.parameters)===null||A===void 0?void 0:A.docs)===null||T===void 0?void 0:T.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(z=i.parameters)===null||z===void 0?void 0:z.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    vertical: true
  }
}`},(k=(C=i.parameters)===null||C===void 0?void 0:C.docs)===null||k===void 0?void 0:k.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(F=d.parameters)===null||F===void 0?void 0:F.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: 0.5,
    fillColors: ["#00CEFC", "#50358A", "#FF9654"]
  }
}`},(I=(B=d.parameters)===null||B===void 0?void 0:B.docs)===null||I===void 0?void 0:I.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(j=u.parameters)===null||j===void 0?void 0:j.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    steps: [0, 0.25, 0.5, 0.75, 1]
  }
}`},(M=(q=u.parameters)===null||q===void 0?void 0:q.docs)===null||M===void 0?void 0:M.source)})});p.parameters=e(e({},p.parameters),{docs:e(e({},(P=p.parameters)===null||P===void 0?void 0:P.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    neutralBackground: true
  }
}`},($=(W=p.parameters)===null||W===void 0?void 0:W.docs)===null||$===void 0?void 0:$.source)})});const J=Object.freeze(Object.defineProperty({__proto__:null,Disabled:t,FillColors:d,IsRange:n,NeutralBackground:p,Primary:s,ShowTooltip:o,Sizes:l,Steps:u,Vertical:i,default:N},Symbol.toStringTag,{value:"Module"}));export{t as D,d as F,n as I,p as N,s as P,J as S,i as V,l as a,o as b,u as c};
