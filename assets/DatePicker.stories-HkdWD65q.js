import{k as re,_ as e,l as t}from"./iframe-D9ZodyF1.js";var b,y,h,_,D,V,w,R,S,A,x,T,M,k,C,P,q,E,W,L,j,I,z,B,O,U,F,H,Y,G,J,K,N,Q,X,Z,$,ee,ae;const le={component:re,argTypes:{modelValue:{type:{name:"other",value:"Date | Date[] | Date[][] | undefined"},table:{defaultValue:{summary:"undefined"}},description:"Will be the current date or period."},labelValue:{type:{name:"string"},description:"Will be the date comparator label."},lang:{type:{name:"string"},table:{defaultValue:{summary:"en-US"}},description:"Will be the date input language."},type:{type:{name:"string"},control:{type:"select"},options:["date","period","compare"],table:{defaultValue:{summary:"date"}},description:"Selection mode: single date, date range, or comparison mode."},allowChangeType:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Will determine if the user can change the type of the date input."},minDate:{type:{name:"other",value:"Date | undefined"},table:{defaultValue:{summary:"undefined"}},description:"Will be the oldest date the user can select."},maxDate:{type:{name:"other",value:"Date | undefined"},table:{defaultValue:{summary:"undefined"}},description:"Will be the newest date the user can select."},options:{type:{name:"array",value:{name:"object",value:{}}},description:"Will the predetermined options."},absolute:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Makes the content dropdown have an absolute position."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},required:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Activate error mode."},errorMessage:{type:{name:"string"},description:"Will be the error message."},expanded:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},alignRight:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine if the dropdown will be right-aligned. To work absolute needs to be true."},separator:{type:{name:"string"},description:"If two period are selected, this property will separate them."},default:{description:"This slot will be displayed on the select area."},"compare-label":{description:"This slot will be the checkbox text."},"clear-label":{description:"This slot will be the clear button text."},"apply-label":{description:"This slot will be the apply button text."},actions:{description:"Slot to replace the actions area."}}};var a={modelValue:void 0,labelValue:"label",lang:"en-US",type:"date",allowChangeType:!1,minDate:void 0,maxDate:void 0,disabled:!1,required:!1,isError:!1,errorMessage:"",absolute:!1,expanded:!1,alignRight:!1,separator:"",options:[{selected:!0,value:"today",label:"Today",calculate:function(){return t("today")}},{value:"yesterday",label:"Yesterday",calculate:function(){return t("yesterday")}},{value:"last7",label:"Last 7 days",calculate:function(){return t("last7")}},{value:"last15",label:"Last 15 days",calculate:function(){return t("last15")}},{value:"last30",label:"Last 30 days",calculate:function(){return t("last30")}},{value:"lastMonth",label:"Last month",calculate:function(){return t("lastMonth")}}]},ne=`
    <div class="flex w-full" :class="{ 'justify-end': args.alignRight }">
      <DatePicker
          v-model="args.modelValue"
          v-model:expanded="args.expanded"
          v-model:type="args.type"
          :label-value="args.labelValue"
          :lang="args.lang"
          :allow-change-type="args.allowChangeType"
          :min-date="args.minDate"
          :max-date="args.maxDate"
          :options="args.options"
          :disabled="args.disabled"
          :required="args.required"
          :is-error="args.isError"
          :error-message="args.errorMessage"
          :absolute="args.absolute"
          :separator="args.separator"
          :align-right="args.alignRight"
      >
          Date Filter
          <template #clear-label>
              Clear
          </template>
          <template #apply-label>
              Apply
          </template>
          <template #compare-label>
              Compare two periods
          </template>
      </DatePicker>
    </div>
  `,r=function(te){return{components:{DatePicker:re},setup:function(){return{args:te}},template:ne}},l={render:r,args:a},n={render:r,args:e(e({},a),{lang:"pt-BR",separator:"e"})},o={render:r,args:e(e({},a),{allowChangeType:!0,modelValue:[],type:"period"})},s={render:r,args:e(e({},a),{modelValue:[],type:"period"})},d={render:r,args:e(e({},a),{modelValue:[],type:"compare"})},i={render:r,args:e(e({},a),{minDate:new Date})},u={render:r,args:e(e({},a),{maxDate:new Date})},p={render:r,args:e(e({},a),{absolute:!0})},c={render:r,args:e(e({},a),{disabled:!0})},m={render:r,args:e(e({},a),{required:!0})},g={render:r,args:e(e({},a),{isError:!0,errorMessage:"Error message"})},v={render:r,args:e(e({},a),{alignRight:!0})},f={render:r,args:e(e({},a),{modelValue:[[],[]],type:"compare",separator:"separator"})};l.parameters=e(e({},l.parameters),{docs:e(e({},(b=l.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(h=(y=l.parameters)===null||y===void 0?void 0:y.docs)===null||h===void 0?void 0:h.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(_=n.parameters)===null||_===void 0?void 0:_.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    lang: "pt-BR",
    separator: "e"
  }
}`},(V=(D=n.parameters)===null||D===void 0?void 0:D.docs)===null||V===void 0?void 0:V.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(w=o.parameters)===null||w===void 0?void 0:w.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    allowChangeType: true,
    modelValue: [],
    type: "period"
  }
}`},(S=(R=o.parameters)===null||R===void 0?void 0:R.docs)===null||S===void 0?void 0:S.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(A=s.parameters)===null||A===void 0?void 0:A.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: [],
    type: "period"
  }
}`},(T=(x=s.parameters)===null||x===void 0?void 0:x.docs)===null||T===void 0?void 0:T.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(M=d.parameters)===null||M===void 0?void 0:M.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: [],
    type: "compare"
  }
}`},(C=(k=d.parameters)===null||k===void 0?void 0:k.docs)===null||C===void 0?void 0:C.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(P=i.parameters)===null||P===void 0?void 0:P.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    minDate: new Date()
  }
}`},(E=(q=i.parameters)===null||q===void 0?void 0:q.docs)===null||E===void 0?void 0:E.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(W=u.parameters)===null||W===void 0?void 0:W.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    maxDate: new Date()
  }
}`},(j=(L=u.parameters)===null||L===void 0?void 0:L.docs)===null||j===void 0?void 0:j.source)})});p.parameters=e(e({},p.parameters),{docs:e(e({},(I=p.parameters)===null||I===void 0?void 0:I.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    absolute: true
  }
}`},(B=(z=p.parameters)===null||z===void 0?void 0:z.docs)===null||B===void 0?void 0:B.source)})});c.parameters=e(e({},c.parameters),{docs:e(e({},(O=c.parameters)===null||O===void 0?void 0:O.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(F=(U=c.parameters)===null||U===void 0?void 0:U.docs)===null||F===void 0?void 0:F.source)})});m.parameters=e(e({},m.parameters),{docs:e(e({},(H=m.parameters)===null||H===void 0?void 0:H.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(G=(Y=m.parameters)===null||Y===void 0?void 0:Y.docs)===null||G===void 0?void 0:G.source)})});g.parameters=e(e({},g.parameters),{docs:e(e({},(J=g.parameters)===null||J===void 0?void 0:J.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`},(N=(K=g.parameters)===null||K===void 0?void 0:K.docs)===null||N===void 0?void 0:N.source)})});v.parameters=e(e({},v.parameters),{docs:e(e({},(Q=v.parameters)===null||Q===void 0?void 0:Q.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    alignRight: true
  }
}`},(Z=(X=v.parameters)===null||X===void 0?void 0:X.docs)===null||Z===void 0?void 0:Z.source)})});f.parameters=e(e({},f.parameters),{docs:e(e({},($=f.parameters)===null||$===void 0?void 0:$.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: [[], []],
    type: "compare",
    separator: "separator"
  }
}`},(ae=(ee=f.parameters)===null||ee===void 0?void 0:ee.docs)===null||ae===void 0?void 0:ae.source)})});const se=Object.freeze(Object.defineProperty({__proto__:null,Absolute:p,AlignRight:v,AllowChangeType:o,Compare:d,Disabled:c,IsError:g,Lang:n,MaxDate:u,MinDate:i,Period:s,Primary:l,Required:m,Separator:f,default:le},Symbol.toStringTag,{value:"Module"}));export{o as A,d as C,se as D,g as I,n as L,i as M,l as P,m as R,f as S,s as a,u as b,p as c,c as d,v as e};
