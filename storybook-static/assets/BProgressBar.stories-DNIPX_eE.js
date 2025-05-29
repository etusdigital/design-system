import{B as r}from"./BProgressBar-D1PvOsHB.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./index-BQ4pCYp0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const E={component:r,tags:["autodocs"],argTypes:{modelValue:{description:"Valor atual da barra de progresso (0 a 1, ou 0 a max se 'max' for definido).",control:{type:"number",step:.01},table:{type:{summary:"number"},defaultValue:{summary:"0"}}},color:{description:"Cor da barra de progresso (valor CSS de cor). Se não definido, usa a cor do 'type'.",control:{type:"color"},table:{type:{summary:"string"}}},icon:{description:"Ícone exibido no final da barra (sem animação).",control:{type:"text"},table:{type:{summary:"string"}}},infoMessage:{description:"Mensagem exibida no tooltip do ícone.",control:{type:"text"},table:{type:{summary:"string"}}},type:{description:"Tipo/cor temática da barra de progresso.",control:"select",options:["primary","info","success","warning","danger","neutral"],table:{type:{summary:"'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral'"},defaultValue:{summary:"primary"}}},size:{description:"Tamanho (altura) da barra de progresso.",control:"select",options:["small","medium","large"],table:{type:{summary:"'small' | 'medium' | 'large'"},defaultValue:{summary:"medium"}}},animationType:{description:"Tipo de animação para a barra (quando o progresso não é determinado).",control:"select",options:["indeterminate","query",null],table:{type:{summary:"'indeterminate' | 'query' | undefined"},defaultValue:{summary:"undefined"}}},steps:{description:"Número de passos discretos em vez de uma barra contínua.",control:{type:"number"},table:{type:{summary:"number"},defaultValue:{summary:"0"}}},displayPercentage:{description:"Onde exibir o valor percentual (se não for animado ou em passos).",control:"select",options:["center","bar",null],table:{type:{summary:"'center' | 'bar' | undefined"},defaultValue:{summary:"undefined"}}},neutralBackground:{description:"Se verdadeiro, o fundo da barra será neutro em vez de um highlight do tema.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},"icon-slot":{description:"Slot para substituir o ícone padrão.",table:{type:{summary:"VNode | string"}}}}},a={modelValue:.5,size:"medium",type:"primary",color:"",icon:"",infoMessage:"",steps:0,animationType:void 0,displayPercentage:void 0,neutralBackground:!1},p=e=>({components:{BProgressBar:r},setup(){return{args:e}},template:`
    <BProgressBar
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
    />
  `}),s={render:p,args:a},n={render:p,args:{...a,steps:5,modelValue:3}},o={render:p,args:{...a,neutralBackground:!0,modelValue:.5}},t={render:p,args:{...a,icon:"rocket_launch",modelValue:.5}},l={render:e=>({components:{BProgressBar:r},setup(){return{args:e}},template:`
      <BProgressBar
        v-model="args.modelValue"
        :icon="args.icon"
        :color="args.color"
        :size="args.size"
        :type="args.type"
        :animation-type="args.animationType"
        :steps="args.steps"
        display-percentage="bar"
        :neutral-background="args.neutralBackground"
        :info-message="args.infoMessage"
    >
      <template #icon-slot>Icon Slot </template>
    </BProgressBar>
    `}),args:{...a,modelValue:.5}},g={render:e=>({components:{BProgressBar:r},setup(){return{args:e}},template:`
      <div class="flex flex-col gap-5">
          <div class="flex flex-col">
              <label>Center</label>
              <BProgressBar
                v-model="args.modelValue"
                :icon="args.icon"
                :color="args.color"
                :size="args.size"
                :type="args.type"
                :animation-type="args.animationType"
                :steps="args.steps"
                display-percentage="center"
                :neutral-background="args.neutralBackground"
                :info-message="args.infoMessage"
              />
          </div>
          <div class="flex flex-col">
              <label>Bar</label>
              <BProgressBar
                  v-model="args.modelValue"
                  :icon="args.icon"
                  :color="args.color"
                  :size="args.size"
                  :type="args.type"
                  :animation-type="args.animationType"
                  :steps="args.steps"
                  display-percentage="bar"
                  :neutral-background="args.neutralBackground"
                  :info-message="args.infoMessage"
              />
          </div>
      </div>
    `}),args:{...a,modelValue:.5}},i={render:e=>({components:{BProgressBar:r},setup(){return{args:e}},template:`
      <div class="flex flex-col gap-5">
          <div class="flex flex-col">
              <label>Indeterminate</label>
              <BProgressBar
                v-model="args.modelValue"
                :icon="args.icon"
                :color="args.color"
                :size="args.size"
                :type="args.type"
                animation-type="indeterminate"
                :steps="args.steps"
                :display-percentage="args.displayPercentage"
                :neutral-background="args.neutralBackground"
                :info-message="args.infoMessage"
              />
          </div>
          <div class="flex flex-col">
              <label>Query</label>
              <BProgressBar
                  v-model="args.modelValue"
                  :icon="args.icon"
                  :color="args.color"
                  :size="args.size"
                  :type="args.type"
                  animation-type="query"
                  :steps="args.steps"
                  :display-percentage="args.displayPercentage"
                  :neutral-background="args.neutralBackground"
                  :info-message="args.infoMessage"
              />
          </div>
      </div>
    `}),args:a},c={render:e=>({components:{BProgressBar:r},setup(){return{args:e}},template:`
      <div class="flex flex-col gap-5">
          <BProgressBar
              v-model="args.modelValue"
              :icon="args.icon"
              :color="args.color"
              :type="args.type"
              size="small"
              :animation-type="args.animationType"
              :steps="args.steps"
              :display-percentage="args.displayPercentage"
              :neutral-background="args.neutralBackground"
              :info-message="args.infoMessage"
          />
          <BProgressBar
              v-model="args.modelValue"
              :icon="args.icon"
              :color="args.color"
              :type="args.type"
              size="medium"
              :animation-type="args.animationType"
              :steps="args.steps"
              :display-percentage="args.displayPercentage"
              :neutral-background="args.neutralBackground"
              :info-message="args.infoMessage"
          />
          <BProgressBar
              v-model="args.modelValue"
              :icon="args.icon"
              :color="args.color"
              :type="args.type"
              size="large"
              :animation-type="args.animationType"
              :steps="args.steps"
              :display-percentage="args.displayPercentage"
              :neutral-background="args.neutralBackground"
              :info-message="args.infoMessage"
          />
      </div>
    `}),args:a};var d,m,u;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`,...(u=(m=s.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var y,f,B;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    steps: 5,
    modelValue: 3
  }
}`,...(B=(f=n.parameters)==null?void 0:f.docs)==null?void 0:B.source}}};var b,v,k;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    neutralBackground: true,
    modelValue: 0.5
  }
}`,...(k=(v=o.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var P,V,x;t.parameters={...t.parameters,docs:{...(P=t.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: "rocket_launch",
    modelValue: 0.5
  }
}`,...(x=(V=t.parameters)==null?void 0:V.docs)==null?void 0:x.source}}};var z,S,M;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BProgressBar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BProgressBar
        v-model="args.modelValue"
        :icon="args.icon"
        :color="args.color"
        :size="args.size"
        :type="args.type"
        :animation-type="args.animationType"
        :steps="args.steps"
        display-percentage="bar"
        :neutral-background="args.neutralBackground"
        :info-message="args.infoMessage"
    >
      <template #icon-slot>Icon Slot </template>
    </BProgressBar>
    \`
  }),
  args: {
    ...defaultArgs,
    modelValue: 0.5
  }
}`,...(M=(S=l.parameters)==null?void 0:S.docs)==null?void 0:M.source}}};var T,A,h;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BProgressBar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-5">
          <div class="flex flex-col">
              <label>Center</label>
              <BProgressBar
                v-model="args.modelValue"
                :icon="args.icon"
                :color="args.color"
                :size="args.size"
                :type="args.type"
                :animation-type="args.animationType"
                :steps="args.steps"
                display-percentage="center"
                :neutral-background="args.neutralBackground"
                :info-message="args.infoMessage"
              />
          </div>
          <div class="flex flex-col">
              <label>Bar</label>
              <BProgressBar
                  v-model="args.modelValue"
                  :icon="args.icon"
                  :color="args.color"
                  :size="args.size"
                  :type="args.type"
                  :animation-type="args.animationType"
                  :steps="args.steps"
                  display-percentage="bar"
                  :neutral-background="args.neutralBackground"
                  :info-message="args.infoMessage"
              />
          </div>
      </div>
    \`
  }),
  args: {
    ...defaultArgs,
    modelValue: 0.5
  }
}`,...(h=(A=g.parameters)==null?void 0:A.docs)==null?void 0:h.source}}};var I,q,R;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BProgressBar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-5">
          <div class="flex flex-col">
              <label>Indeterminate</label>
              <BProgressBar
                v-model="args.modelValue"
                :icon="args.icon"
                :color="args.color"
                :size="args.size"
                :type="args.type"
                animation-type="indeterminate"
                :steps="args.steps"
                :display-percentage="args.displayPercentage"
                :neutral-background="args.neutralBackground"
                :info-message="args.infoMessage"
              />
          </div>
          <div class="flex flex-col">
              <label>Query</label>
              <BProgressBar
                  v-model="args.modelValue"
                  :icon="args.icon"
                  :color="args.color"
                  :size="args.size"
                  :type="args.type"
                  animation-type="query"
                  :steps="args.steps"
                  :display-percentage="args.displayPercentage"
                  :neutral-background="args.neutralBackground"
                  :info-message="args.infoMessage"
              />
          </div>
      </div>
    \`
  }),
  args: defaultArgs
}`,...(R=(q=i.parameters)==null?void 0:q.docs)==null?void 0:R.source}}};var C,N,_;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BProgressBar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-5">
          <BProgressBar
              v-model="args.modelValue"
              :icon="args.icon"
              :color="args.color"
              :type="args.type"
              size="small"
              :animation-type="args.animationType"
              :steps="args.steps"
              :display-percentage="args.displayPercentage"
              :neutral-background="args.neutralBackground"
              :info-message="args.infoMessage"
          />
          <BProgressBar
              v-model="args.modelValue"
              :icon="args.icon"
              :color="args.color"
              :type="args.type"
              size="medium"
              :animation-type="args.animationType"
              :steps="args.steps"
              :display-percentage="args.displayPercentage"
              :neutral-background="args.neutralBackground"
              :info-message="args.infoMessage"
          />
          <BProgressBar
              v-model="args.modelValue"
              :icon="args.icon"
              :color="args.color"
              :type="args.type"
              size="large"
              :animation-type="args.animationType"
              :steps="args.steps"
              :display-percentage="args.displayPercentage"
              :neutral-background="args.neutralBackground"
              :info-message="args.infoMessage"
          />
      </div>
    \`
  }),
  args: defaultArgs
}`,...(_=(N=c.parameters)==null?void 0:N.docs)==null?void 0:_.source}}};const j=["Primary","Steps","NeutralBackground","Icon","Slot","DisplayPercentage","Animation","Sizes"];export{i as Animation,g as DisplayPercentage,t as Icon,o as NeutralBackground,s as Primary,c as Sizes,l as Slot,n as Steps,j as __namedExportsOrder,E as default};
