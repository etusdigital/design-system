import{B as e,a as U,b as W,c as I,d as N,e as J}from"./BCardFooter-Dg7bsHgE.js";import{B as V}from"./BButton-CbVrYdRz.js";import{B as q}from"./BAvatar-CVumIWi6.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./BSpinner-ospMqXTg.js";const R={title:"Components/BCard",component:e,tags:["autodocs"],argTypes:{variant:{control:"select",options:["elevated","outlined","filled","flat"]},padding:{control:"select",options:["none","sm","md","lg","xl"]},shadow:{control:"select",options:["none","sm","md","lg","xl"]},radius:{control:"select",options:["none","sm","md","lg","full"]},clickable:{control:"boolean"},disabled:{control:"boolean"}}},t={args:{title:"Card Title",subtitle:"Card subtitle text",variant:"elevated",padding:"md",shadow:"sm",radius:"md"},render:c=>({components:{BCard:e},setup(){return{args:c}},template:`
            <BCard v-bind="args">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </BCard>
        `})},n={render:()=>({components:{BCard:e,BButton:V},template:`
            <BCard 
                title="Advanced Card"
                subtitle="Using title and subtitle props"
            >
                <p>This card uses the built-in title and subtitle props for simple cases. The header is automatically created when these props are provided.</p>
                <template #footer>
                    <div class="flex gap-2">
                        <BButton variant="secondary">Cancel</BButton>
                        <BButton>Save</BButton>
                    </div>
                </template>
            </BCard>
        `})},a={render:()=>({components:{BCard:e,BAvatar:q},template:`
            <BCard>
                <template #header>
                    <div class="flex items-center gap-3">
                        <BAvatar src="https://i.pravatar.cc/150?img=3" size="md" />
                        <div>
                            <h3 class="font-semibold">John Doe</h3>
                            <p class="text-sm text-neutral-foreground-low">Software Engineer</p>
                        </div>
                    </div>
                </template>
                <p>This card demonstrates a custom header with an avatar and user information.</p>
                <template #footer>
                    <div class="flex gap-2 text-sm">
                        <button class="text-primary-interaction-default hover:underline">Follow</button>
                        <span class="text-neutral-foreground-low">•</span>
                        <button class="text-primary-interaction-default hover:underline">Message</button>
                    </div>
                </template>
            </BCard>
        `})},r={render:()=>({components:{BCard:e},template:`
            <div class="grid grid-cols-2 gap-4">
                <BCard variant="elevated" title="Elevated">
                    <p>Default elevated style with shadow</p>
                </BCard>
                <BCard variant="outlined" title="Outlined">
                    <p>Outlined style with border</p>
                </BCard>
                <BCard variant="filled" title="Filled">
                    <p>Filled style with background</p>
                </BCard>
                <BCard variant="flat" title="Flat">
                    <p>Flat style with no elevation</p>
                </BCard>
            </div>
        `})},s={render:()=>({components:{BCard:e},methods:{handleClick(c){alert(`Clicked ${c} card!`)}},template:`
            <div class="grid grid-cols-2 gap-4">
                <BCard 
                    variant="elevated" 
                    title="Clickable Card"
                    clickable
                    @click="handleClick('clickable')"
                >
                    <p>This card is clickable and shows hover effects</p>
                </BCard>
                <BCard 
                    variant="elevated" 
                    title="Disabled Card"
                    clickable
                    disabled
                    @click="handleClick('disabled')"
                >
                    <p>This card is disabled and won't respond to clicks</p>
                </BCard>
            </div>
        `})},d={render:()=>({components:{BCard:e},template:`
            <div class="space-y-4">
                <BCard padding="none" title="No Padding">
                    <p>Card content with no padding</p>
                </BCard>
                <BCard padding="sm" title="Small Padding">
                    <p>Card content with small padding</p>
                </BCard>
                <BCard padding="md" title="Medium Padding">
                    <p>Card content with medium padding</p>
                </BCard>
                <BCard padding="lg" title="Large Padding">
                    <p>Card content with large padding</p>
                </BCard>
                <BCard padding="xl" title="Extra Large Padding">
                    <p>Card content with extra large padding</p>
                </BCard>
            </div>
        `})},o={render:()=>({components:{BCard:e},template:`
            <div class="max-w-sm">
                <BCard variant="filled" padding="lg" radius="lg">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="w-2 h-2 bg-success-interaction-default rounded-full"></span>
                        <h3 class="font-semibold text-neutral-foreground-high">System Update</h3>
                    </div>
                    <p class="text-sm text-neutral-foreground-low">
                        Your system has been successfully updated to version 2.1.19. 
                        All new features are now available.
                    </p>
                    <div class="mt-4 flex gap-2">
                        <button class="text-sm text-primary-interaction-default hover:text-primary-interaction-hover font-medium">
                            View Changes
                        </button>
                        <span class="text-neutral-foreground-low">•</span>
                        <button class="text-sm text-neutral-foreground-low hover:text-neutral-foreground-high">
                            Dismiss
                        </button>
                    </div>
                </BCard>
            </div>
        `})},i={render:()=>({components:{BCard:e,BCardHeader:N,BCardTitle:I,BCardContent:W,BCardFooter:U,BButton:V,BAvatar:q},template:`
            <div class="max-w-md">
                <BCard variant="outlined" padding="none">
                    <template #header>
                        <div class="bg-neutral-surface-highlight -m-[1px] -mb-0 p-4 rounded-t-[inherit]">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <BAvatar src="https://i.pravatar.cc/150?img=5" size="sm" />
                                    <div>
                                        <h3 class="text-base font-semibold">Project Update</h3>
                                        <p class="text-xs text-neutral-foreground-low">2 hours ago</p>
                                    </div>
                                </div>
                                <button class="text-neutral-foreground-low hover:text-neutral-foreground-high">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </template>
                    
                    <div class="p-4">
                        <p class="text-sm">The new design system implementation is progressing well. We've completed 80% of the components and are on track for the Q1 release.</p>
                        <div class="mt-3 flex gap-2">
                            <span class="px-2 py-1 bg-success-surface-default text-success-foreground-high text-xs rounded-full">On Track</span>
                            <span class="px-2 py-1 bg-informative-surface-default text-informative-foreground-high text-xs rounded-full">Design System</span>
                        </div>
                    </div>
                    
                    <template #footer>
                        <div class="bg-neutral-surface-highlight -m-[1px] -mt-0 p-4 rounded-b-[inherit]">
                            <div class="flex items-center justify-between text-sm">
                                <div class="flex gap-4">
                                    <button class="flex items-center gap-1 text-neutral-foreground-low hover:text-primary-interaction-default">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                        </svg>
                                        <span>24</span>
                                    </button>
                                    <button class="flex items-center gap-1 text-neutral-foreground-low hover:text-primary-interaction-default">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                        </svg>
                                        <span>12</span>
                                    </button>
                                </div>
                                <button class="text-neutral-foreground-low hover:text-primary-interaction-default">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.316C18.114 16.062 18 16.518 18 17c0 .482.114.938.316 1.342m0-2.684a3 3 0 100 2.684M12 8v8"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </template>
                </BCard>
            </div>
        `})},l={render:()=>({components:{BCard:e,BCardHeader:N,BCardTitle:I,BCardSubtitle:J,BCardContent:W,BCardFooter:U},template:`
            <div class="space-y-4">
                <div class="text-sm text-neutral-foreground-low mb-2">
                    Sub-components can be used independently outside of BCard:
                </div>
                
                <!-- Individual components showcase -->
                <div class="space-y-2 p-4 bg-neutral-surface-highlight rounded-lg">
                    <BCardHeader>
                        <BCardTitle>Standalone Title</BCardTitle>
                        <BCardSubtitle>Standalone Subtitle</BCardSubtitle>
                    </BCardHeader>
                    <BCardContent>
                        <p>This content is using sub-components outside of a BCard.</p>
                    </BCardContent>
                    <BCardFooter>
                        <p class="text-sm text-neutral-foreground-low">Footer content here</p>
                    </BCardFooter>
                </div>

                <!-- Or compose them inside any container -->
                <div class="border border-neutral-border-default rounded-lg overflow-hidden">
                    <BCardHeader class="bg-primary-surface-default">
                        <BCardTitle>Custom Container</BCardTitle>
                    </BCardHeader>
                    <BCardContent class="p-4">
                        <p>Sub-components provide flexibility for custom layouts.</p>
                    </BCardContent>
                </div>
            </div>
        `})};var p,u,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    title: "Card Title",
    subtitle: "Card subtitle text",
    variant: "elevated",
    padding: "md",
    shadow: "sm",
    radius: "md"
  },
  render: args => ({
    components: {
      BCard
    },
    setup() {
      return {
        args
      };
    },
    template: \`
            <BCard v-bind="args">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </BCard>
        \`
  })
}`,...(m=(u=t.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var g,v,h;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => ({
    components: {
      BCard,
      BButton
    },
    template: \`
            <BCard 
                title="Advanced Card"
                subtitle="Using title and subtitle props"
            >
                <p>This card uses the built-in title and subtitle props for simple cases. The header is automatically created when these props are provided.</p>
                <template #footer>
                    <div class="flex gap-2">
                        <BButton variant="secondary">Cancel</BButton>
                        <BButton>Save</BButton>
                    </div>
                </template>
            </BCard>
        \`
  })
}`,...(h=(v=n.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};var C,f,B;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => ({
    components: {
      BCard,
      BAvatar
    },
    template: \`
            <BCard>
                <template #header>
                    <div class="flex items-center gap-3">
                        <BAvatar src="https://i.pravatar.cc/150?img=3" size="md" />
                        <div>
                            <h3 class="font-semibold">John Doe</h3>
                            <p class="text-sm text-neutral-foreground-low">Software Engineer</p>
                        </div>
                    </div>
                </template>
                <p>This card demonstrates a custom header with an avatar and user information.</p>
                <template #footer>
                    <div class="flex gap-2 text-sm">
                        <button class="text-primary-interaction-default hover:underline">Follow</button>
                        <span class="text-neutral-foreground-low">•</span>
                        <button class="text-primary-interaction-default hover:underline">Message</button>
                    </div>
                </template>
            </BCard>
        \`
  })
}`,...(B=(f=a.parameters)==null?void 0:f.docs)==null?void 0:B.source}}};var b,x,w;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => ({
    components: {
      BCard
    },
    template: \`
            <div class="grid grid-cols-2 gap-4">
                <BCard variant="elevated" title="Elevated">
                    <p>Default elevated style with shadow</p>
                </BCard>
                <BCard variant="outlined" title="Outlined">
                    <p>Outlined style with border</p>
                </BCard>
                <BCard variant="filled" title="Filled">
                    <p>Filled style with background</p>
                </BCard>
                <BCard variant="flat" title="Flat">
                    <p>Flat style with no elevation</p>
                </BCard>
            </div>
        \`
  })
}`,...(w=(x=r.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var k,y,S;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => ({
    components: {
      BCard
    },
    methods: {
      handleClick(variant: string) {
        alert(\`Clicked \${variant} card!\`);
      }
    },
    template: \`
            <div class="grid grid-cols-2 gap-4">
                <BCard 
                    variant="elevated" 
                    title="Clickable Card"
                    clickable
                    @click="handleClick('clickable')"
                >
                    <p>This card is clickable and shows hover effects</p>
                </BCard>
                <BCard 
                    variant="elevated" 
                    title="Disabled Card"
                    clickable
                    disabled
                    @click="handleClick('disabled')"
                >
                    <p>This card is disabled and won't respond to clicks</p>
                </BCard>
            </div>
        \`
  })
}`,...(S=(y=s.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var T,M,F;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    components: {
      BCard
    },
    template: \`
            <div class="space-y-4">
                <BCard padding="none" title="No Padding">
                    <p>Card content with no padding</p>
                </BCard>
                <BCard padding="sm" title="Small Padding">
                    <p>Card content with small padding</p>
                </BCard>
                <BCard padding="md" title="Medium Padding">
                    <p>Card content with medium padding</p>
                </BCard>
                <BCard padding="lg" title="Large Padding">
                    <p>Card content with large padding</p>
                </BCard>
                <BCard padding="xl" title="Extra Large Padding">
                    <p>Card content with extra large padding</p>
                </BCard>
            </div>
        \`
  })
}`,...(F=(M=d.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var z,j,P;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => ({
    components: {
      BCard
    },
    template: \`
            <div class="max-w-sm">
                <BCard variant="filled" padding="lg" radius="lg">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="w-2 h-2 bg-success-interaction-default rounded-full"></span>
                        <h3 class="font-semibold text-neutral-foreground-high">System Update</h3>
                    </div>
                    <p class="text-sm text-neutral-foreground-low">
                        Your system has been successfully updated to version 2.1.19. 
                        All new features are now available.
                    </p>
                    <div class="mt-4 flex gap-2">
                        <button class="text-sm text-primary-interaction-default hover:text-primary-interaction-hover font-medium">
                            View Changes
                        </button>
                        <span class="text-neutral-foreground-low">•</span>
                        <button class="text-sm text-neutral-foreground-low hover:text-neutral-foreground-high">
                            Dismiss
                        </button>
                    </div>
                </BCard>
            </div>
        \`
  })
}`,...(P=(j=o.parameters)==null?void 0:j.docs)==null?void 0:P.source}}};var A,H,D;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => ({
    components: {
      BCard,
      BCardHeader,
      BCardTitle,
      BCardContent,
      BCardFooter,
      BButton,
      BAvatar
    },
    template: \`
            <div class="max-w-md">
                <BCard variant="outlined" padding="none">
                    <template #header>
                        <div class="bg-neutral-surface-highlight -m-[1px] -mb-0 p-4 rounded-t-[inherit]">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <BAvatar src="https://i.pravatar.cc/150?img=5" size="sm" />
                                    <div>
                                        <h3 class="text-base font-semibold">Project Update</h3>
                                        <p class="text-xs text-neutral-foreground-low">2 hours ago</p>
                                    </div>
                                </div>
                                <button class="text-neutral-foreground-low hover:text-neutral-foreground-high">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </template>
                    
                    <div class="p-4">
                        <p class="text-sm">The new design system implementation is progressing well. We've completed 80% of the components and are on track for the Q1 release.</p>
                        <div class="mt-3 flex gap-2">
                            <span class="px-2 py-1 bg-success-surface-default text-success-foreground-high text-xs rounded-full">On Track</span>
                            <span class="px-2 py-1 bg-informative-surface-default text-informative-foreground-high text-xs rounded-full">Design System</span>
                        </div>
                    </div>
                    
                    <template #footer>
                        <div class="bg-neutral-surface-highlight -m-[1px] -mt-0 p-4 rounded-b-[inherit]">
                            <div class="flex items-center justify-between text-sm">
                                <div class="flex gap-4">
                                    <button class="flex items-center gap-1 text-neutral-foreground-low hover:text-primary-interaction-default">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                        </svg>
                                        <span>24</span>
                                    </button>
                                    <button class="flex items-center gap-1 text-neutral-foreground-low hover:text-primary-interaction-default">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                        </svg>
                                        <span>12</span>
                                    </button>
                                </div>
                                <button class="text-neutral-foreground-low hover:text-primary-interaction-default">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.632 4.316C18.114 16.062 18 16.518 18 17c0 .482.114.938.316 1.342m0-2.684a3 3 0 100 2.684M12 8v8"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </template>
                </BCard>
            </div>
        \`
  })
}`,...(D=(H=i.parameters)==null?void 0:H.docs)==null?void 0:D.source}}};var L,E,O;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => ({
    components: {
      BCard,
      BCardHeader,
      BCardTitle,
      BCardSubtitle,
      BCardContent,
      BCardFooter
    },
    template: \`
            <div class="space-y-4">
                <div class="text-sm text-neutral-foreground-low mb-2">
                    Sub-components can be used independently outside of BCard:
                </div>
                
                <!-- Individual components showcase -->
                <div class="space-y-2 p-4 bg-neutral-surface-highlight rounded-lg">
                    <BCardHeader>
                        <BCardTitle>Standalone Title</BCardTitle>
                        <BCardSubtitle>Standalone Subtitle</BCardSubtitle>
                    </BCardHeader>
                    <BCardContent>
                        <p>This content is using sub-components outside of a BCard.</p>
                    </BCardContent>
                    <BCardFooter>
                        <p class="text-sm text-neutral-foreground-low">Footer content here</p>
                    </BCardFooter>
                </div>

                <!-- Or compose them inside any container -->
                <div class="border border-neutral-border-default rounded-lg overflow-hidden">
                    <BCardHeader class="bg-primary-surface-default">
                        <BCardTitle>Custom Container</BCardTitle>
                    </BCardHeader>
                    <BCardContent class="p-4">
                        <p>Sub-components provide flexibility for custom layouts.</p>
                    </BCardContent>
                </div>
            </div>
        \`
  })
}`,...(O=(E=l.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};const X=["Default","WithTitleAndSubtitle","WithCustomHeader","Variants","ClickableCards","PaddingSizes","NotificationCard","ComplexExample","SubComponentsIndependent"];export{s as ClickableCards,i as ComplexExample,t as Default,o as NotificationCard,d as PaddingSizes,l as SubComponentsIndependent,r as Variants,a as WithCustomHeader,n as WithTitleAndSubtitle,X as __namedExportsOrder,R as default};
