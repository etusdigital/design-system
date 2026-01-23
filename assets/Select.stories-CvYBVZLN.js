import{S as N,_ as e}from"./iframe-CjRVAs2g.js";var g,b,f,y,_,h,S,O,A,V,x,M,R,j,P,w,I,E,q,K,k,T,W,C,z,D,H,$,B,F,G,J,L;const U={component:N,argTypes:{modelValue:{type:{name:"other",value:"any"},description:'Will be an option from the "options" array at the selected index.'},labelValue:{type:{name:"string"},description:"Will be the select label."},options:{type:{name:"array",value:{name:"object",value:{}}},description:'Array of values to be used as options. Can also be an array of objects, in which case you should use the prop "labelKey" to specify which key to use as a label.'},icon:{type:{name:"string"}},expanded:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},labelKey:{type:{name:"string"},table:{defaultValue:{summary:"label"}}},valueKey:{type:{name:"string"},table:{defaultValue:{summary:"value"}}},getObject:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If true, the selected value will be an object instead of value-key value."},multiple:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If true, the selected value will be an array of the selected values."},secondary:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},searchable:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},clearable:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Activate error mode."},errorMessage:{type:{name:"string"},description:"Will be the error message."},infoMessage:{type:{name:"string"},description:"Will be the info message."},default:{description:"This slot will be displayed on the select area."},status:{description:"This slot will be status when a option is selected. Param: option (selected option)."},"clear-label":{description:"Will be clear button text."},option:{description:"This slot will be displayed as an option. Params: option and index."}}};var a={modelValue:null,options:["Option 1","Option 2","Option 3","Option 4","Option 5"],icon:"",expanded:!1,labelKey:"label",valueKey:"value",labelValue:"label",searchable:!1,clearable:!1,multiple:!1,getObject:!1,disabled:!1,required:!1,secondary:!1,isError:!1,errorMessage:"",infoMessage:"",absolute:!1},Q=`
    <Select 
        v-model="args.modelValue" 
        v-model:expanded="args.expanded" 
        :label-value="args.labelValue"
        :options="args.options" 
        :icon="args.icon" 
        :absolute="args.absolute" 
        :label-key="args.labelKey" 
        :value-key="args.valueKey"
        :required="args.required" 
        :searchable="args.searchable" 
        :clearable="args.clearable"
        :disabled="args.disabled"
        :multiple="args.multiple"
        :secondary="args.secondary"
        :is-error="args.isError"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :get-object="args.getObject"
    >
        Placeholder
    </Select>
  `,r=function(v){return{components:{Select:N},setup:function(){return{args:v}},template:Q}},l={render:r,args:a},n={render:r,args:e(e({},a),{absolute:!0})},s={render:r,args:e(e({},a),{disabled:!0})},o={render:r,args:e(e({},a),{required:!0})},t={render:r,args:e(e({},a),{searchable:!0})},d={render:r,args:e(e({},a),{multiple:!0,options:[{label:"Option 1",value:0},{label:"Option 2",value:1},{label:"Option 3",value:2},{label:"Option 4",value:3}]})},i={render:r,args:e(e({},a),{secondary:!0})},u={render:r,args:e(e({},a),{isError:!0,errorMessage:"Error message"})},c={render:r,args:e(e({},a),{infoMessage:"Info message"})},p={render:r,args:e(e({},a),{clearable:!0})},m={render:function(v){return{setup:function(){return{args:v}},template:`
      `.concat(Q.replace("Placeholder",`Placeholder
          <template #option="{ option, index }">
              <div class="flex items-center gap-xs">
                  <Icon name="account_circle" />
                  {{ option }}
              </div>
          </template>
      </Select>`),`
    `)}},args:a};l.parameters=e(e({},l.parameters),{docs:e(e({},(g=l.parameters)===null||g===void 0?void 0:g.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(f=(b=l.parameters)===null||b===void 0?void 0:b.docs)===null||f===void 0?void 0:f.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(y=n.parameters)===null||y===void 0?void 0:y.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    absolute: true
  }
}`},(h=(_=n.parameters)===null||_===void 0?void 0:_.docs)===null||h===void 0?void 0:h.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(S=s.parameters)===null||S===void 0?void 0:S.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(A=(O=s.parameters)===null||O===void 0?void 0:O.docs)===null||A===void 0?void 0:A.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(V=o.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(M=(x=o.parameters)===null||x===void 0?void 0:x.docs)===null||M===void 0?void 0:M.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(R=t.parameters)===null||R===void 0?void 0:R.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    searchable: true
  }
}`},(P=(j=t.parameters)===null||j===void 0?void 0:j.docs)===null||P===void 0?void 0:P.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(w=d.parameters)===null||w===void 0?void 0:w.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    multiple: true,
    options: [{
      label: "Option 1",
      value: 0
    }, {
      label: "Option 2",
      value: 1
    }, {
      label: "Option 3",
      value: 2
    }, {
      label: "Option 4",
      value: 3
    }]
  }
}`},(E=(I=d.parameters)===null||I===void 0?void 0:I.docs)===null||E===void 0?void 0:E.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(q=i.parameters)===null||q===void 0?void 0:q.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    secondary: true
  }
}`},(k=(K=i.parameters)===null||K===void 0?void 0:K.docs)===null||k===void 0?void 0:k.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(T=u.parameters)===null||T===void 0?void 0:T.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`},(C=(W=u.parameters)===null||W===void 0?void 0:W.docs)===null||C===void 0?void 0:C.source)})});c.parameters=e(e({},c.parameters),{docs:e(e({},(z=c.parameters)===null||z===void 0?void 0:z.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Info message"
  }
}`},(H=(D=c.parameters)===null||D===void 0?void 0:D.docs)===null||H===void 0?void 0:H.source)})});p.parameters=e(e({},p.parameters),{docs:e(e({},($=p.parameters)===null||$===void 0?void 0:$.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    clearable: true
  }
}`},(F=(B=p.parameters)===null||B===void 0?void 0:B.docs)===null||F===void 0?void 0:F.source)})});m.parameters=e(e({},m.parameters),{docs:e(e({},(G=m.parameters)===null||G===void 0?void 0:G.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
      \${defaultHtml.replace("Placeholder", \`Placeholder
          <template #option="{ option, index }">
              <div class="flex items-center gap-xs">
                  <Icon name="account_circle" />
                  {{ option }}
              </div>
          </template>
      </Select>\`)}
    \`
  }),
  args: defaultArgs
}`},(L=(J=m.parameters)===null||J===void 0?void 0:J.docs)===null||L===void 0?void 0:L.source)})});const Y=Object.freeze(Object.defineProperty({__proto__:null,Absolute:n,Clearable:p,CustomOption:m,Disabled:s,InfoMessage:c,IsError:u,Multiple:d,Primary:l,Required:o,Searchable:t,Secondary:i,default:U},Symbol.toStringTag,{value:"Module"}));export{n as A,p as C,s as D,u as I,d as M,l as P,o as R,Y as S,t as a,i as b,c,m as d};
