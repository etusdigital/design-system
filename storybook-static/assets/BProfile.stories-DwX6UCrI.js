import{B as n}from"./BProfile-B9iFxTIq.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const y={component:n,tags:["autodocs"],argTypes:{modelValue:{description:"This will be the selected account.",control:{type:"object"},table:{type:{summary:"object | undefined"}}},name:{description:"This property will be the main user name.",control:{type:"text"},table:{type:{summary:"string"}}},profilePicture:{description:"This property will be shown when viewing more user information.",control:{type:"text"},table:{type:{summary:"string | undefined"},defaultValue:{summary:"person-circle"}}},accounts:{description:"If the user have multiple account pass them here.",control:{type:"object"},table:{type:{summary:"any[] | undefined"},defaultValue:{summary:"[]"}}},nameKey:{description:"This the key to get account name in accounts array.",control:{type:"text"},table:{type:{summary:"string | undefined"},defaultValue:{summary:"name"}}},disabled:{description:"Desabilita o componente",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}},absolute:{description:"Makes the content dropdown have an absolute position.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}},onLogout:{description:"Evento emitido ao clicar no botão de logout.",table:{category:"events",type:{summary:"() => void"}}},onEditProfile:{description:"Evento emitido ao clicar no botão de editar perfil.",table:{category:"events",type:{summary:"() => void"}}},onEditAccount:{description:"Evento emitido ao clicar no botão de editar conta.",table:{category:"events",type:{summary:"() => void"}}},onChangeAccount:{description:"Evento emitido quando o usuário escolhe outra conta. A conta é passada como parâmetro.",table:{category:"events",type:{summary:"(account: any) => void"}}},onPrivacyPolicyFunction:{description:"Evento emitido para navegação para a política de privacidade.",table:{category:"events",type:{summary:"() => void"}}},onTermsOfUseFucntion:{description:"Evento emitido para navegação para os termos de uso.",table:{category:"events",type:{summary:"() => void"}}},account:{description:"Slot para customizar a renderização de cada item de conta na lista. Params: account, index, active.",table:{category:"slots",type:{summary:"#account"}}},editProfile:{description:"Slot para o conteúdo do botão Editar Perfil.",table:{category:"slots",type:{summary:"#editProfile"},defaultValue:{summary:"Edit Profile"}}},editAccount:{description:"Slot para o conteúdo do botão Editar Conta.",table:{category:"slots",type:{summary:"#editAccount"},defaultValue:{summary:"Edit Account"}}},logout:{description:"Slot para o conteúdo do botão Logout.",table:{category:"slots",type:{summary:"#logout"},defaultValue:{summary:"Logout"}}},privacyPolicy:{description:"Slot para o texto do link da política de privacidade.",table:{category:"slots",type:{summary:"#privacyPolicy"},defaultValue:{summary:"Privacy Policy"}}},termsOfUse:{description:"Slot para o texto do link dos termos de uso.",table:{category:"slots",type:{summary:"#termsOfUse"},defaultValue:{summary:"Terms of Use"}}}}},u={modelValue:{name:"Other Account 1"},name:"User name",profilePicture:"",absolute:!1,disabled:!1,accounts:[{name:"Other Account 1"},{name:"Other Account 2"},{name:"Other Account 3"},{name:"Other Account 4"},{name:"Other Account 5"},{name:"Other Account 6"},{name:"Other Account 7"},{name:"Other Account 8"},{name:"Other Account 9"}],nameKey:"name"},o={render:e=>({components:{BProfile:n},setup(){return{args:e}},template:`
      <BProfile
          v-model="args.modelValue"
          :name="args.name"
          :profile-picture="args.profilePicture"
          :accounts="args.accounts"
          :name-key="args.nameKey"
          :absolute="args.absolute"
          :disabled="args.disabled"
          @logout="args.logout"
          @edit-profile="args.editProfile"
          @edit-account="args.editAccount"
          @change-account="args.onChangeAccount"
          @privacy-policy-function="args.onPrivacyPolicyFunction"
          @terms-of-use-fucntion="args.onTermsOfUseFucntion"
      >
          <template #editProfile>
              Edit profile
          </template>
          <template #editAccount>
              Edit account
          </template>
          <template #logout>
              Logout
          </template>
          <template #privacyPolicy>
              Privacy Policy
          </template>
          <template #termsOfUse>
              Terms Of Use
          </template>
      </BProfile>
    `}),args:{...u,logout:()=>console.log("Logout clicked"),editProfile:()=>console.log("Edit Profile clicked"),editAccount:()=>console.log("Edit Account clicked"),onChangeAccount:e=>console.log("Change Account:",e),onPrivacyPolicyFunction:()=>console.log("Privacy Policy clicked"),onTermsOfUseFucntion:()=>console.log("Terms of Use clicked")}},t={render:e=>({components:{BProfile:n},setup(){return{args:e}},template:`
      <BProfile
          v-model="args.modelValue"
          :name="args.name"
          :profile-picture="args.profilePicture"
          :accounts="args.accounts"
          :name-key="args.nameKey"
          :absolute="args.absolute"
          :disabled="args.disabled"
          @logout="args.logout"
          @edit-profile="args.editProfile"
          @edit-account="args.editAccount"
          @change-account="args.onChangeAccount"
          @privacy-policy-function="args.onPrivacyPolicyFunction"
          @terms-of-use-fucntion="args.onTermsOfUseFucntion"
      >
          <template #editProfile>
              Edit profile
          </template>
          <template #editAccount>
              Edit account
          </template>
          <template #logout>
              Logout
          </template>
          <template #privacyPolicy>
              Privacy Policy
          </template>
          <template #termsOfUse>
              Terms Of Use
          </template>
          <template #account="{ account, index, active }">
              <div class="flex items-center gap-2">
                  <BIcon name="account_circle" />
                  <span :class="{'underline': active }">{{ account.name }}</span>
              </div>
          </template>
      </BProfile>
    `}),args:{...u,logout:()=>console.log("Custom Logout"),editProfile:()=>console.log("Custom Edit Profile"),editAccount:()=>console.log("Custom Edit Account"),onChangeAccount:e=>console.log("Custom Change Account:",e),onPrivacyPolicyFunction:()=>console.log("Custom Privacy Policy"),onTermsOfUseFucntion:()=>console.log("Custom Terms of Use")}};var a,c,r;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: (args: any) => ({
    // Manter any por enquanto para simplicidade, ou tipar com BProfileStoryArgs & { eventHandlers... }
    components: {
      BProfile
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BProfile
          v-model="args.modelValue"
          :name="args.name"
          :profile-picture="args.profilePicture"
          :accounts="args.accounts"
          :name-key="args.nameKey"
          :absolute="args.absolute"
          :disabled="args.disabled"
          @logout="args.logout"
          @edit-profile="args.editProfile"
          @edit-account="args.editAccount"
          @change-account="args.onChangeAccount"
          @privacy-policy-function="args.onPrivacyPolicyFunction"
          @terms-of-use-fucntion="args.onTermsOfUseFucntion"
      >
          <template #editProfile>
              Edit profile
          </template>
          <template #editAccount>
              Edit account
          </template>
          <template #logout>
              Logout
          </template>
          <template #privacyPolicy>
              Privacy Policy
          </template>
          <template #termsOfUse>
              Terms Of Use
          </template>
      </BProfile>
    \`
  }),
  args: {
    ...defaultArgs,
    // Definir as funções de evento aqui para a story Primary
    logout: () => console.log("Logout clicked"),
    editProfile: () => console.log("Edit Profile clicked"),
    editAccount: () => console.log("Edit Account clicked"),
    onChangeAccount: (account: any) => console.log("Change Account:", account),
    onPrivacyPolicyFunction: () => console.log("Privacy Policy clicked"),
    onTermsOfUseFucntion: () => console.log("Terms of Use clicked")
  }
}`,...(r=(c=o.parameters)==null?void 0:c.docs)==null?void 0:r.source}}};var i,s,l;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: (args: any) => ({
    // Manter any por enquanto
    components: {
      BProfile
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BProfile
          v-model="args.modelValue"
          :name="args.name"
          :profile-picture="args.profilePicture"
          :accounts="args.accounts"
          :name-key="args.nameKey"
          :absolute="args.absolute"
          :disabled="args.disabled"
          @logout="args.logout"
          @edit-profile="args.editProfile"
          @edit-account="args.editAccount"
          @change-account="args.onChangeAccount"
          @privacy-policy-function="args.onPrivacyPolicyFunction"
          @terms-of-use-fucntion="args.onTermsOfUseFucntion"
      >
          <template #editProfile>
              Edit profile
          </template>
          <template #editAccount>
              Edit account
          </template>
          <template #logout>
              Logout
          </template>
          <template #privacyPolicy>
              Privacy Policy
          </template>
          <template #termsOfUse>
              Terms Of Use
          </template>
          <template #account="{ account, index, active }">
              <div class="flex items-center gap-2">
                  <BIcon name="account_circle" />
                  <span :class="{'underline': active }">{{ account.name }}</span>
              </div>
          </template>
      </BProfile>
    \`
  }),
  args: {
    ...defaultArgs,
    // Herda as props de defaultArgs
    // Sobrescreve ou adiciona funções de evento específicas para esta story, se necessário
    logout: () => console.log("Custom Logout"),
    editProfile: () => console.log("Custom Edit Profile"),
    editAccount: () => console.log("Custom Edit Account"),
    onChangeAccount: (account: any) => console.log("Custom Change Account:", account),
    onPrivacyPolicyFunction: () => console.log("Custom Privacy Policy"),
    onTermsOfUseFucntion: () => console.log("Custom Terms of Use")
  }
}`,...(l=(s=t.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};const f=["Primary","CustomAccount"];export{t as CustomAccount,o as Primary,f as __namedExportsOrder,y as default};
