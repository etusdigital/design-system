import{B as t}from"./BAvatar-CVumIWi6.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const v=""+new URL("photo-gr0zpTkO.svg",import.meta.url).href,f={component:t,tags:["autodocs"],argTypes:{name:{type:{summary:"text"},description:"Will be the avatar name."},src:{type:{summary:"text"},description:"Will be the avatar image. SVG images are recommended."},alt:{type:{summary:"text"},description:"Will be the avatar image alt."},size:{type:{summary:"text"},control:"select",options:["small","medium","large"],table:{defaultValue:{summary:"large"}}}}},n={name:"John Doe",src:v,alt:"Avatar",size:"medium"},a={render:e=>({components:{BAvatar:t},setup(){return{args:e}},template:`
      <BAvatar
        :name="args.name"
        :src="args.src"
        :alt="args.alt"
        :size="args.size"
      />
    `}),args:n},r={render:e=>({components:{BAvatar:t},setup(){return{args:e}},template:`
      <BAvatar
        :name="args.name"
        :src="args.src"
        :alt="args.alt"
        :size="args.size"
      />
    `}),args:{...n,src:void 0}},s={render:e=>({components:{BAvatar:t},setup(){return{args:e}},template:`
      <div class="flex gap-xs">
        <BAvatar
          v-for="size in ['small', 'medium', 'large']"
          :key="size"
          :name="args.name"
          :src="args.src"
          :alt="args.alt"
          :size="size"
        />
      </div>
    `}),args:{...n,src:void 0}};var m,o,c;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BAvatar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BAvatar
        :name="args.name"
        :src="args.src"
        :alt="args.alt"
        :size="args.size"
      />
    \`
  }),
  args: defaultArgs
}`,...(c=(o=a.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var i,l,g;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BAvatar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BAvatar
        :name="args.name"
        :src="args.src"
        :alt="args.alt"
        :size="args.size"
      />
    \`
  }),
  args: {
    ...defaultArgs,
    src: undefined
  }
}`,...(g=(l=r.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var p,d,u;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BAvatar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-xs">
        <BAvatar
          v-for="size in ['small', 'medium', 'large']"
          :key="size"
          :name="args.name"
          :src="args.src"
          :alt="args.alt"
          :size="size"
        />
      </div>
    \`
  }),
  args: {
    ...defaultArgs,
    src: undefined
  }
}`,...(u=(d=s.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const B=["Primary","noSrc","Sizes"];export{a as Primary,s as Sizes,B as __namedExportsOrder,f as default,r as noSrc};
