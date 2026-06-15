import{v as g,_ as e}from"./iframe-B6j1uzSK.js";var l,i,r,s,c,u,p,d,m;const v={component:g,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"This will be the selected account."},name:{type:{name:"string"},description:"This property will be the main user name."},picture:{type:{name:"string"},table:{defaultValue:{summary:"person-circle"}},description:"This property will be shown when viewing more user information."},options:{type:{name:"array",value:{name:"object",value:{}}},table:{defaultValue:{summary:"[]"}},description:"If the user have multiple account pass them here."},labelKey:{type:{name:"string"},table:{defaultValue:{summary:"label"}},description:"This the key to get account name in accounts array."},valueKey:{type:{name:"string"},table:{defaultValue:{summary:"value"}},description:"This the key to get account value in accounts array."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},getObject:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},"logout-label":{table:{defaultValue:{summary:"Logout"}},description:"This slot is the logout button text and function that execute when this it's clicked."},"edit-label":{table:{defaultValue:{summary:"Edit Profile"}},description:"This slot is the edit profile button text and function that execute when this it's clicked."},"edit-option":{table:{defaultValue:{summary:"Edit Account"}},description:"This slot is the edit account button text and function that execute when this it's clicked."},option:{description:"This slot will be displayed as an account option. Params: option, index and active."},"privacy-policy":{table:{defaultValue:{summary:"Privacy Policy"}},description:"This slot is the privacy policy text."},"terms-of-use":{table:{defaultValue:{summary:"Terms of Use"}},description:"This slot is the terms of use text."}}};var f={modelValue:"personal-account",name:"John Doe",picture:void 0,disabled:!1,getObject:!1,options:[{label:"Personal Account",value:"personal-account"},{label:"Work Account",value:"work-account"},{label:"Project Alpha",value:"project-alpha"},{label:"Project Beta",value:"project-beta"},{label:"Development Team",value:"dev-team"}],labelKey:"label",valueKey:"value",logout:function(){},edit:function(){},editOption:function(){},privacyPolicyFunction:function(){},termsOfUseFucntion:function(){}},y=function(o){return{components:{Profile:g},setup:function(){return{args:o}},template:`
    <Profile
      v-model="args.modelValue"
      :name="args.name"
      :picture="args.picture"
      :options="args.options"
      :label-key="args.labelKey"
      :value-key="args.valueKey"
      :disabled="args.disabled"
      :get-object="args.getObject"
      @logout="args.logout"
      @edit="args.edit"
      @edit-option="args.editOption"
      @privacy-policy-function="args.privacyPolicyFunction"
      @terms-of-use-fucntion="args.termsOfUseFucntion"
    >
      <template #edit-slot>
          Edit profile
      </template>
      <template #edit-option>
          Edit account
      </template>
      <template #logout-slot>
          Logout
      </template>
      <template #privacy-policy>
          Privacy Policy
      </template>
      <template #terms-of-use>
          Terms Of Use
      </template>
    </Profile>
  `}},t={render:y,args:f},n={render:y,args:e(e({},f),{disabled:!0})},a={render:function(o){return{components:{Profile:g},setup:function(){return{args:o}},template:`
      <Profile
          v-model="args.modelValue"
          :name="args.name"
          :picture="args.picture"
          :options="args.options"
          :label-key="args.labelKey"
          :value-key="args.valueKey"
          :disabled="args.disabled"
          :get-object="args.getObject"
          @logout="args.logout"
          @edit="args.edit"
          @edit-option="args.editOption"
          @privacy-policy-function="args.privacyPolicyFunction"
          @terms-of-use-fucntion="args.termsOfUseFucntion"
      >
          <template #edit-slot>
              Edit profile
          </template>
          <template #edit-option>
              Edit account
          </template>
          <template #logout-slot>
              Logout
          </template>
          <template #privacy-policy>
              Privacy Policy
          </template>
          <template #terms-of-use>
              Terms Of Use
          </template>
          <template #option="{ option, index, active }">
              <div class="flex items-center gap-xs">
                  <Icon name="account_circle" />
                  <span :class="{'underline': active }">{{ option.label }}</span>
              </div>
          </template>
      </Profile>
    `}},args:f};t.parameters=e(e({},t.parameters),{docs:e(e({},(l=t.parameters)===null||l===void 0?void 0:l.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(r=(i=t.parameters)===null||i===void 0?void 0:i.docs)===null||r===void 0?void 0:r.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(s=n.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(u=(c=n.parameters)===null||c===void 0?void 0:c.docs)===null||u===void 0?void 0:u.source)})});a.parameters=e(e({},a.parameters),{docs:e(e({},(p=a.parameters)===null||p===void 0?void 0:p.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Profile
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Profile
          v-model="args.modelValue"
          :name="args.name"
          :picture="args.picture"
          :options="args.options"
          :label-key="args.labelKey"
          :value-key="args.valueKey"
          :disabled="args.disabled"
          :get-object="args.getObject"
          @logout="args.logout"
          @edit="args.edit"
          @edit-option="args.editOption"
          @privacy-policy-function="args.privacyPolicyFunction"
          @terms-of-use-fucntion="args.termsOfUseFucntion"
      >
          <template #edit-slot>
              Edit profile
          </template>
          <template #edit-option>
              Edit account
          </template>
          <template #logout-slot>
              Logout
          </template>
          <template #privacy-policy>
              Privacy Policy
          </template>
          <template #terms-of-use>
              Terms Of Use
          </template>
          <template #option="{ option, index, active }">
              <div class="flex items-center gap-xs">
                  <Icon name="account_circle" />
                  <span :class="{'underline': active }">{{ option.label }}</span>
              </div>
          </template>
      </Profile>
    \`
  }),
  args: defaultArgs
}`},(m=(d=a.parameters)===null||d===void 0?void 0:d.docs)===null||m===void 0?void 0:m.source)})});const h=Object.freeze(Object.defineProperty({__proto__:null,Disabled:n,Options:a,Primary:t,default:v},Symbol.toStringTag,{value:"Module"}));export{n as D,a as O,h as P,t as a};
