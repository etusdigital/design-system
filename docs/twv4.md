# Guia de Atualização do TailwindCSS v3 para v4 (Vue 3 + Vite + PostCSS)

## 1. Principais mudanças do Tailwind CSS v3 para v4

A migração do Tailwind v3 para v4 traz diversas mudanças importantes, incluindo **breaking changes** de sintaxe e configuração. A seguir destacamos as principais diferenças:

- **Importação do Tailwind no CSS:** Em vez de utilizar diretivas `@tailwind` separadas para base, componentes e utilitários, o Tailwind v4 agora é importado com uma única linha `@import` no arquivo CSS principal. **Exemplo:** No Tailwind v3 usava-se:

  ```css
  /* Tailwind v3 */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

  Já no Tailwind v4 deve-se usar:

  ```css
  /* Tailwind v4 */
  @import "tailwindcss";
  ```

  Essa mudança simplifica a inclusão do Tailwind e **substitui as diretivas `@tailwind` pela importação única**.

- **Remoção de utilitários obsoletos:** Foram eliminadas classes utilitárias que já estavam deprecadas no v3. Por exemplo, utilitários de opacidade como `bg-opacity-*`, `text-opacity-*` etc. não existem mais – em vez deles deve-se usar a sintaxe de opacidade embutida nas cores (`bg-black/50`, `text-black/50`, etc.). Outros utilitários renomeados incluem:

  - **Tamanhos de sombra, desfoque e radius:** Classes como `shadow-xs`, `shadow-sm`, `blur-xs`, `rounded-sm`, etc., mudaram para uma escala que inclui o tamanho “xs”. Por exemplo, `shadow-xs` passou a ser `shadow-2xs` e `shadow-sm` (sem sufixo) agora é equivalente a `shadow-xs` do v3. O mesmo ocorreu com `blur-sm`/`blur-xs` e bordas arredondadas (`rounded`/`rounded-sm` agora são `rounded-sm`/`rounded-xs`). _Obs:_ As classes antigas sem sufixo ainda funcionam por compatibilidade, mas geram valores diferentes – é recomendável atualizar para as novas para manter o mesmo visual.
  - **Outline (contorno) e focus:** A classe `outline-hidden` do v3 não removia totalmente o contorno (ela mantinha um outline-solid invisível por acessibilidade). No v4, ela foi renomeada para `outline-hidden`, e `outline-hidden` agora **remove** de fato o estilo de contorno. Portanto, substitua usos antigos de `outline-hidden` por `outline-hidden`. Exemplo:

    ```html
    <!-- v3 -->
    <button class="focus:outline-hidden">...</button>
    <!-- v4 -->
    <button class="focus:outline-hidden">...</button>
    ```

    Se realmente precisar remover o contorno (não recomendado em geral), use a nova `outline-hidden` consciente desse comportamento.

  - **Largura padrão do ring:** A classe de foco `ring-3` no v3 aplicava um outline-solid de 3px; no v4 isso mudou para 1px por consistência com borders e outlines. Assim, se você usava `ring-3` isoladamente, deve alterá-la para `ring-3` para manter o mesmo efeito de 3px. Além disso, a cor padrão do ring-3 mudou de `blue-500` para `currentColor` (a cor atual do elemento). **Dica:** Adicione explicitamente `ring-blue-500` nos elementos de foco se quiser manter o destaque azul antigo.
  - **Prefixo de classes:** Caso seu projeto use um prefixo personalizado nas classes (configuração `prefix`), observe que no Tailwind v4 o prefixo aparece **antes de qualquer variante**. Por exemplo: `<div class="tw:flex tw:bg-red-500 tw:hover:bg-red-600">` em vez de aplicar prefixo no meio do nome. Essa mudança garante que as classes prefixed tenham sintaxe consistente (todas iniciam com `tw:` no exemplo).

- **Alterações de comportamento padrão:**

  - **Espaçamento entre elementos (`space-x/space-y`):** O seletor CSS usado internamente por `space-x-*` e `space-y-*` foi alterado para resolver problemas de desempenho. No v3, usava `:not([hidden]) ~ :not([hidden])` para aplicar margin nos irmãos seguintes; no v4, usa `:not(:last-child)` aplicando margin no elemento anterior. Na prática, isso raramente afeta layouts comuns, mas pode mudar o comportamento se você combinava `space-*` com elementos inline ou margens manuais. Caso enfrente algum problema, a recomendação é migrar para usar layout flex/grid com `gap` equivalente em vez de `space-*` (pois `gap` tende a ser mais performático e previsível).
  - **Gradientes com variantes:** No Tailwind v3, ao aplicar variantes como `dark:` em apenas uma das cores de um gradiente, as demais cores podiam ser “resetadas” para transparente. No v4 isso foi corrigido: agora as outras cores do gradiente são preservadas mesmo com variantes. Como efeito colateral, se antes você usava variantes para “remover” uma cor intermediária (via `to-*` ou `via-*`), precisará explicitamente usar `via-none` para limpar a cor intermediária no estado desejado.
  - **Classe `container`:** No v3, havia opções de configuração automática para `.container` (centralizar, padding interno por breakpoints) definidas no `tailwind.config.js`. No v4, essas opções foram removidas – agora `.container` é uma classe utilitária simples que **não** vem centrada ou com paddings por padrão. Para replicar o comportamento antigo (por ex., container centralizado e com padding horizontal), você deve definir essas regras manualmente usando a diretiva `@utility` no CSS. **Exemplo:**

    ```css
    @utility container {
    	margin-inline: auto; /* centraliza horizontalmente (equiv. a center:true) */
    	padding-inline: 2rem; /* padding horizontal de 2rem (equiv. a padrão md:px-4) */
    }
    ```

    Isso estende a classe `.container` com as regras desejadas no Tailwind v4.

  - **Cor padrão de bordas e divisores:** Antes, ao usar `border` sem especificar cor, o Tailwind v3 aplicava `border-gray-200` por padrão (mesma lógica para `divide-*`). No v4, isso foi alterado para `currentColor`, tornando menos opinativo e alinhado ao padrão do navegador. Na prática, isso significa que bordas sem cor herdarão a cor do texto atual. Para evitar surpresas, é recomendado **sempre definir a cor** quando usar utilitários de borda (`border-gray-200`, `border-black`, etc.). Se preferir manter o comportamento antigo globalmente, poderia adicionar manualmente no CSS base:

    ```css
    @layer base {
    	*,
    	::before,
    	::after {
    		border-color: var(--color-gray-200, currentColor);
    	}
    }
    ```

    (Mas note que o uso de `currentColor` é intencional no v4 para consistência e possivelmente não vale a pena reverter).

  - **Placeholder e cursor de botão (Preflight):** O Tailwind v4 ajustou alguns estilos base (Preflight):

    - Cor de placeholder: Em vez de um cinza fixo (`gray-400`), placeholders agora usam 50% da cor atual do texto. Isso geralmente é imperceptível ou até melhora a aparência, mas se quiser o antigo placeholder cinza, adicione ao CSS base:

      ```css
      @layer base {
      	input::placeholder,
      	textarea::placeholder {
      		color: var(--color-gray-400);
      	}
      }
      ```

    - Cursor de `<button>`: Foi revertido para `cursor: default` (seta) em vez de sempre `pointer`, seguindo o comportamento padrão do browser. Se preferir manter o cursor de mão nas buttons por padrão, use:

      ```css
      @layer base {
      	button:not(:disabled),
      	[role="button"]:not(:disabled) {
      		cursor: pointer;
      	}
      }
      ```

    - Margin de `<dialog>`: O reset do Tailwind agora zera a margin padrão de diálogos para consistência. Se você dependia do `<dialog>` centrado automaticamente, ajuste via CSS (`dialog { margin: auto; }`).

  - **Modo hover em dispositivos touch:** O pseudo-variant `hover:` agora só é aplicado se o dispositivo primário tiver suporte a hover (mouse). Ou seja, em telas touch, **tap não aciona hover** por padrão no v4. Isso evita estilos de hover indesejados em mobile, mas se seu design dependia de hover em toques (por exemplo, para simular \:hover em dispositivos touch), precisará ajustar. A recomendação do Tailwind é não depender de hover para funcionalidade crucial em mobile, mas se necessário você pode recriar o antigo comportamento definindo um variant customizado:

    ```css
    @custom-variant hover (&:hover);
    ```

    Isso restabelece o funcionamento do `hover:` como no v3 (aplicando sempre, inclusive em touch quando há tap).

  - **Outras mudanças:** Variantes compostas agora são aplicadas da esquerda para a direita (ordem invertida em relação ao v3) – poucos projetos usam variantes empilhadas complexas, mas se você tiver algo como `*:first:pt-0 *:last:pb-0`, deve inverter para `first:*:pt-0 last:*:pb-0` no v4. Além disso, o shorthand para CSS variables em valores arbitrários mudou: no v3 podia usar `bg-(--my-var)`, no v4 deve usar parênteses `bg-(--my-var)`.

- **Configuração e tema via CSS (CSS-first config):** Talvez a mudança **mais significativa** seja a forma de configurar o Tailwind. No v3, todas customizações (cores, breakpoints, plugins, etc.) eram feitas em um arquivo JavaScript (`tailwind.config.js`). Já no v4, a abordagem padrão é **declarar tudo no próprio CSS** usando novas diretivas:

  - **Diretiva `@theme`:** Permite definir variáveis de tema (design tokens) diretamente no CSS, substituindo `theme{ extend: ... }` do config JS. Por exemplo, para adicionar uma cor personalizada no v4:

    ```css
    @import "tailwindcss";
    @theme {
    	--color-mint-500: #2dde98;
    }
    ```

    Isso gera automaticamente utilitários como `bg-mint-500`, `text-mint-500`, etc., disponíveis no HTML. Da mesma forma, pode-se sobrescrever tokens padrão: ex. `--breakpoint-sm: 30rem;` para mudar o tailwind `sm` de 640px para 480px. No v3 faríamos `theme.extend.screens.sm = '30rem'`, agora definimos `--breakpoint-sm` dentro de `@theme`. Todos os valores definidos em `@theme` tornam-se CSS Variables (ex: `--color-mint-500`) e também determinam quais classes utilitárias existem.
    _Obs:_ Use `@theme` apenas para variáveis que devem gerar classes utilitárias correspondentes. Para variáveis puramente internas de CSS, continue usando `:root` ou outro escopo (as variáveis definidas em `@theme` mapeiam para as utilities do Tailwind, enquanto `:root` seriam apenas CSS vars comuns).

  - **Sobrescrever totalmente um conjunto de tokens:** Se quiser **substituir todo um conjunto padrão** (por exemplo, redefinir completamente a paleta de cores do Tailwind), pode usar a sintaxe especial `--nome-*: initial` para resetar aquela namespace antes de definir os valores novos. Exemplo, para usar apenas cores customizadas:

    ```css
    @theme {
    	--color-*: initial;
    	--color-brand: #5b21b6;
    	--color-brand-light: #7c3aed;
    	--color-brand-dark: #4c1d95;
    	/* ... outras cores custom */
    }
    ```

    Isso remove todas as cores padrão (como `red`, `blue`, etc.) e define apenas suas cores (que serão usadas em classes como `bg-brand`, `bg-brand-light` etc.). Similarmente, `--*: initial` resetaria todo o tema (todas variáveis) se você quisesse começar do zero. Na maioria dos casos, porém, você pode simplesmente adicionar ou sobrescrever individualmente as variáveis necessárias.

  - **Diretiva `@utility`:** Com o Tailwind v4 adotando CSS nativo (cascade layers), a forma de adicionar classes utilitárias personalizadas mudou. No v3, era comum usar `@layer utilities { ... }` ou funções `addUtilities` em plugins JS para registrar classes custom. No v4, deve-se usar `@utility`. Por exemplo, se antes você tinha:

    ```css
    /* v3 custom utility */
    @layer utilities {
    	.tab-4 {
    		tab-size: 4;
    	}
    }
    ```

    agora faria:

    ```css
    /* v4 custom utility */
    @utility tab-4 {
    	tab-size: 4;
    }
    ```

    Isso garante que essa classe `.tab-4` seja tratada como utilitária de verdade (incluindo funcionar com variantes como hover:, lg:, etc., automaticamente). Outra diferença é que a ordenação das custom utilities agora leva em conta quantas propriedades CSS elas têm: utilitários “complexos” (com várias propriedades, estilo botões `.btn` custom) podem ser sobrescritos por utilitários mais simples do Tailwind sem hacks adicionais. Em resumo, use `@utility` para **qualquer classe customizada** que você queira integrar ao Tailwind no v4, ao invés de `@layer`.

  - **Diretiva `@custom-variant`:** Equivalente para criar variantes customizadas (que no v3 era feito via `addVariant` em plugins JS). Com essa diretiva, você define novas pseudo-classes ou estados que podem ser prefixados às utilities. Exemplo, se no v3 você tinha no config:

    ```js
    // tailwind.config.js (v3)
    plugins: [
    	plugin(function ({ addVariant }) {
    		addVariant("js", ".js &");
    		addVariant("no-js", ".no-js &");
    	}),
    ];
    ```

    no v4 você adicionaria no CSS principal:

    ```css
    @custom-variant js (.js &);
    @custom-variant no-js (.no-js &);
    ```

    O primeiro token é o nome da variant (`js:`) e o segundo é o seletor modificador onde `&` representa o elemento alvo. No exemplo acima, `js:bg-red-500` aplicaria `bg-red-500` apenas quando um ancestral tivesse classe `js` (útil para cenário de `<html class="js">` vs `<html class="no-js">`).

    > **Nota:** Atualmente, o Tailwind v4 ainda suporta carregar plugins JS legados (como os oficiais) via `@plugin`, mas **não** suporta mais o uso de `variants` no config ou `corePlugins` para desabilitar coisas. Qualquer variante custom ou ajuste de variantes padrão deve ser via `@custom-variant`.

- **Detecção automática de conteúdo:** Uma novidade do Tailwind v4 é que ele **automaticamente descobre os arquivos de template** (HTML, JS, Vue, etc.) para fazer a tree-shaking das classes, sem precisar configurar `content: [...]` no config. Na prática, se você usava `content` no `tailwind.config.js` para apontar para seus arquivos `.vue` ou `.stories.js`, isso não é mais necessário – o Tailwind scaneia seu projeto (provavelmente a partir do `package.json` ou estrutura) e inclui as classes utilizadas. **Ainda assim, é importante validar** se ele está capturando tudo; se tiver algum caminho fora do padrão, talvez seja necessário ajustar manualmente (nesse caso, você poderia manter um config JS com `content` e carregá-lo com `@config`, mas normalmente não será preciso).

Em resumo, o Tailwind CSS v4 traz uma **nova experiência de configuração orientada a CSS**, melhora desempenho de build e introduz funcionalidades modernas (ex.: cascade layers, propriedades registradas com `@property`, suporte nativo a consultas de container, paleta de cores em espaço P3, variantes `not-*`, etc.). No entanto, para atualizar um projeto existente, é crucial lidar com os **breaking changes acima**, ajustando classes renomeadas, removendo configurações obsoletas e adotando a nova sintaxe de configuração.

_(Para detalhes completos, consulte o \[**guia oficial de upgrade** do Tailwind v4] que lista todas as mudanças quebrando compatibilidade.)_

## 2. Passo a passo: Atualizando dependências e arquivos de configuração

A seguir, um roteiro detalhado de como realizar a atualização no projeto Vue 3 com Vite, PostCSS e Tailwind:

**Passo 1: Atualizar as dependências do Tailwind e plugins**
Atualize o Tailwind CSS para a versão 4.x e os plugins oficiais utilizados (forms e typography) para suas versões compatíveis. No terminal, execute:

```bash
npm install -D tailwindcss@latest @tailwindcss/postcss@latest @tailwindcss/vite@latest @tailwindcss/forms@latest @tailwindcss/typography@latest
```

- `tailwindcss@latest` instala o core do Tailwind v4.
- `@tailwindcss/postcss` é o novo plugin PostCSS dedicado do Tailwind v4 (no v3 o pacote `tailwindcss` itself atuava como plugin PostCSS; agora essa funcionalidade foi movida).
- `@tailwindcss/vite` é o plugin oficial para Vite, oferecendo integração de alto desempenho.
- Os pacotes `@tailwindcss/forms` e `@tailwindcss/typography` devem ser atualizados para assegurar compatibilidade (versões lançadas após o Tailwind v4). _Dica:_ Verifique no `package.json` se as versões foram ajustadas corretamente e travadas em ^4.x (para tailwindcss) e ^0.5 ou superior para os plugins (as versões podem variar conforme lançamento).

**Passo 2: Ajustar configuração do PostCSS (`postcss.config.js`)**
Se o seu projeto utiliza um arquivo de config do PostCSS, será necessário modificá-lo. No Tailwind v4:

- Remova plugins desnecessários: o Tailwind agora **cobre funcionalidades de import e autoprefixer internamente**, então você pode eliminar `postcss-import` e `autoprefixer` caso estivessem presentes. Eles não são mais requeridos pois o novo pipeline já faz import de CSS e autoprefix automaticamente.
- Adicione o plugin do Tailwind v4: use `@tailwindcss/postcss`. Por exemplo, um `postcss.config.js` simplificado ficará:

  ```js
  module.exports = {
  	plugins: {
  		// "postcss-import": {},   <- removido
  		// "tailwindcss": {},      <- removido (se estava listado aqui)
  		// "autoprefixer": {},     <- removido
  		"@tailwindcss/postcss": {}, // novo plugin do Tailwind v4
  	},
  };
  ```

  > **Nota:** Se preferir, pode usar a sintaxe de array: `plugins: ["@tailwindcss/postcss"]`. O importante é garantir que **apenas o plugin novo seja executado**, evitando conflitos com a instância antiga do tailwind ou autoprefixer.

**Passo 3: Configurar o Vite para usar o plugin do Tailwind**
No `vite.config.js` (ou `.ts`), remova a configuração antiga de Tailwind via PostCSS (caso exista) e inclua o plugin oficial. Por exemplo:

```js
// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// Importa o plugin do Tailwind v4:
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [
		vue(),
		tailwindcss(), // integra Tailwind ao build do Vite
	],
});
```

Essa alteração garante que o Vite processe o Tailwind CSS de forma otimizada, sem precisar passar pelo PostCSS separadamente. O plugin do Vite cuida de rebuilds rápidos, content scanning etc., e substitui a necessidade de chamar Tailwind via CLI ou scripts separados durante o dev.

**Passo 4: Atualizar o arquivo CSS principal do projeto**
No Tailwind v3, era comum termos um arquivo CSS (ex.: `src/index.css` ou `src/assets/tailwind.css`) contendo as diretivas `@tailwind base/components/utilities`. Para o v4, edite esse arquivo para usar `@import "tailwindcss";` no topo, e adicione as novas diretivas de configuração CSS:

```css
/* antigo index.css (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```css
/* novo index.css (v4) */
@import "tailwindcss";
/* Aqui você poderá incluir @theme, @utility, @plugin etc. */
```

Inclua também as diretivas `@plugin` para carregar os plugins oficiais, já que não usaremos mais o `tailwind.config.js` para isso (ver passo seguinte). Por exemplo, logo após o import do tailwind:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";
/* ... demais config como @theme abaixo ... */
```

Isso irá carregar os estilos e componentes fornecidos por esses plugins, equivalentes ao que antes era habilitado via config JS. Certifique-se de salvar esse arquivo CSS e que ele seja importado na inicialização do app (ex.: no `main.js/ts`, algo como `import './index.css'`).

**Passo 5: Migrar ou eliminar o arquivo de configuração JavaScript (`tailwind.config.js`)**
Com as novas diretivas CSS, o arquivo de configuração JavaScript se torna opcional. Existem duas abordagens possíveis:

- _Abordagem recomendada:_ **Migrar todas as configurações** do `tailwind.config.js` para o CSS usando `@theme`, `@custom-variant`, etc., e **deixar de usar o config JS**. Essa abordagem alavanca o conceito “CSS-first” do v4, reduz complexidade e evita manter dois locais de configuração.
- _Abordagem alternativa:_ **Manter o config JS legado** (por compatibilidade) e carregá-lo manualmente. O Tailwind v4 **não carrega mais o arquivo de config automaticamente**, mas você pode forçar a utilização dele adicionando `@config "<caminho do config.js>"` no seu CSS principal. Exemplo no CSS:

  ```css
  @import "tailwindcss";
  @config "./tailwind.config.js";
  /* ... resto ... */
  ```

  Isso aplicará as configurações definidas no arquivo JS. Note porém que algumas opções do config antigo não têm efeito no v4: `corePlugins`, `safelist` e `separator` foram descontinuados, e `darkMode` foi modificado (ver seção de dark mode abaixo).

Se optar pela **migração completa para CSS**, pode deletar o `tailwind.config.js` após replicar tudo que havia nele. Caso mantenha o config por enquanto, use o `@config` conforme acima. _Importante:_ Se o seu config definia caminhos em `content`, avalie se ainda é necessário – como mencionado, o Tailwind v4 já faz detecção automática, então em geral você pode omitir `content` a menos que tenha templates fora do escopo padrão.

**Passo 6: Verificar versão do Node e ambiente**
O Tailwind CSS v4 requer Node.js 16+ oficialmente, e o utilitário de upgrade automático requer Node 20+ para rodar. Portanto, assegure-se de estar usando uma versão compatível do Node no projeto (idealmente Node 20 ou mais recente para evitar problemas). Se estiver usando o Storybook com Vite, garanta também que o ambiente do Storybook está atualizado para suportar as novas dependências (Storybook v7+ com builder Vite é recomendado para compatibilidade perfeita com Tailwind v4).

Após esses passos, rode `npm run dev` (ou `vite`/`vue-cli-service serve` conforme seu setup) para verificar se o projeto compila sem erros. **Corrija eventuais erros de build** que podem surgir:

- O upgrade tool do Tailwind (se usado via `npx @tailwindcss/upgrade`) deveria ter ajustado muita coisa automaticamente, mas se você fez manualmente, fique atento a erros comuns como classes desconhecidas (podem ser utilitários removidos/renomeados) ou problemas no PostCSS config.

## 3. Refatorando o tema e tokens personalizados (`theme.extend` -> `@theme`)

Provavelmente seu projeto Tailwind v3 tinha customizações de design no `tailwind.config.js` – por exemplo, cores customizadas, fontes, espaçamentos, breakpoints adicionais, etc., definidos em `theme.extend`. Vamos mostrar como migrar esses **tokens do design system** para a configuração via CSS no Tailwind v4.

Suponha que no **Tailwind v3** você tinha algo assim no config JS:

```js
// tailwind.config.js (v3)
module.exports = {
	theme: {
		extend: {
			colors: {
				brand: {
					50: "#f5e9ff",
					100: "#e0caff",
					500: "#8b5cf6",
					600: "#7c3aed",
				},
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				display: ['"Satoshi"', "sans-serif"],
			},
			spacing: {
				128: "32rem",
			},
			screens: {
				"3xl": "1920px",
			},
		},
	},
	// ...plugins etc.
};
```

Para o **Tailwind v4**, todas essas customizações serão declaradas no seu CSS principal usando a diretiva `@theme` e variáveis CSS:

```css
/* index.css (Tailwind v4) */
@import "tailwindcss";

@theme {
	/* Cores custom (equivalente a theme.extend.colors) */
	--color-brand-50: #f5e9ff;
	--color-brand-100: #e0caff;
	--color-brand-500: #8b5cf6;
	--color-brand-600: #7c3aed;

	/* Fontes custom (equiv. a theme.extend.fontFamily) */
	--font-sans: Inter, sans-serif;
	--font-display: "Satoshi", sans-serif;

	/* Espaçamento custom (equiv. a theme.extend.spacing) */
	--spacing-128: 32rem;

	/* Breakpoint extra (equiv. a theme.extend.screens) */
	--breakpoint-3xl: 1920px;
}
```

Algumas observações importantes nessa refatoração:

- **Naming:** As variáveis seguem o padrão dos nomes das utilidades. Por exemplo, para definir a cor `brand.500`, usamos `--color-brand-500`. Para um novo breakpoint `3xl`, usamos `--breakpoint-3xl`. Para espaçamento `128` (que vira classe `p-128`/`m-128`), usamos `--spacing-128`. Esse padrão é intuitivo: `--{categoria}-{nome}` (com valores de unidades convertidos para o formato esperado, como `rem` para espaçamento).
- **Fontes:** O Tailwind já tem variáveis padrão para fontes como `--font-sans`, `--font-serif` etc. No exemplo, definimos `--font-display` porque é uma nova família. Se quisermos sobrescrever a fonte padrão sans do Tailwind, bastaria re-definir `--font-sans` dentro de `@theme`.
- **Extend vs Override:** No v3, usar `extend` adicionava valores além dos padrão. No v4, qualquer valor definido em `@theme` automaticamente estende o tema (não é necessário se preocupar em preservar os existentes manualmente – a menos que você use o wildcard `initial` para reset completo). Por exemplo, ao adicionar `--color-brand-*`, você não remove as cores padrão (como `blue`, `red`, etc.), apenas adiciona novas classes `text-brand-500`, `bg-brand-500`, etc. Já se quisesse substituir completamente um conjunto (digamos redefinir totalmente a paleta de cores do Tailwind), usaria `--color-*: initial` antes de declarar suas cores. Use isso com cuidado, pois remove **todas** as cores default.
- **Unidades e sintaxe:** Note que especificamos valores com unidades quando necessário (ex.: `120px` ou `30rem` para breakpoints). O Tailwind interpreta essas variáveis e gera as médias ou utilitários correspondentes. Exemplo, `--breakpoint-3xl: 1920px` fará com que você possa usar a variant `3xl:*` no HTML. Para espaçamentos, `--spacing-128: 32 rem;` gera classes `p-128`, `m-128` etc. (A documentação do Tailwind recomenda inserir o espaço entre valor e unidade na variável, mas mesmo sem espaço costuma funcionar. Seguimos o padrão `120 rem` como visto nos docs).
- **Temas escuros e outras media queries custom:** Caso você tenha utilizado no config v3 opções como `darkMode` ou variantes personalizadas para schemes de cores ou data-attributes, haverá abordagens específicas (ver seção de Dark Mode abaixo). Mas, por exemplo, se você definia variantes com `addVariant` no config (como um variant para `data-state="open"` ou similar), agora você deve usar `@custom-variant` conforme já explicado.

Depois de definir todas as variáveis necessárias em `@theme`, o Tailwind v4 irá gerar as classes/utilitários correspondentes. **Teste as classes custom no HTML ou nos componentes para confirmar** que estão funcionando (por exemplo, aplique uma classe `bg-brand-500` em algum lugar e veja se a cor é aplicada).

Além das variáveis de tema, **outras configurações globais do config JS** podem precisar de adaptação:

- **Dark Mode:** No v3, configurava-se `darkMode: 'class'` ou `'media'` no config. No v4, a configuração padrão é via media query (`prefers-color-scheme`) e, se você precisa do modo **class**, deve usar um custom variant (explicado adiante na seção 4). Não há uma variável direta tipo `--dark-mode` a ser colocada em `@theme` – é um caso especial.
- **Plugins:** Já cobrimos que em vez de `plugins: [forms, typography]` no config, usamos `@plugin` no CSS. Para plugins de terceiros, a mesma lógica: instale o pacote e use `@plugin "nome-do-plugin"` no CSS (se for compatível com v4; nem todos plugins da comunidade podem estar adaptados ainda).
- **Core Plugins e safelist:** Se no config v3 você desabilitava utilitários inteiros (via `corePlugins: { ... false }`) ou usava `safelist`, saiba que essas opções não existem no v4. Em vez de `corePlugins`, teria que excluir o CSS resultante manualmente se não quiser algo (ou não importá-lo). E `safelist` tornou-se desnecessário com content detection automática, mas caso precise garantir que certas classes sejam geradas mesmo sem aparecer em código, pode usar comentários especiais ou carregar um config legacy com safelist via `@config` (não recomendado em geral).
- **Prefixo:** Se usava a opção `prefix` no config, no v4 também não há variável pra isso; você continua especificando o prefixo no momento de import do Tailwind, por exemplo `@import "tailwindcss" prefix(tw);` para usar prefixo `tw-`. Assim as classes geradas terão o prefixo (e as variáveis CSS também terão `--tw-` prefixado para evitar conflito).

Em suma, concentre-se em **traduzir as customizações do seu `tailwind.config.js` para declarações dentro de `@theme` no CSS**. Esse é o passo central para trazer seu design system personalizado para o Tailwind v4.

## 4. Migrando utilitários customizados, plugins e variantes personalizadas

Nesta seção, abordaremos como atualizar **CSS utilitário custom**, integração dos **plugins oficiais** e quaisquer **variants custom** que seu projeto tenha definido:

- **Utilitários CSS custom (addUtilities / @layer):** Muitos projetos adicionam classes utilitárias próprias – seja para abstrair um padrão de estilo recorrente, seja para compatibilidade com algum design system. No Tailwind v3, haviam duas formas comuns:

  1. Usar a API de plugin JS (`addUtilities` ou `addComponents`).
  2. Escrever CSS dentro de `@layer utilities` ou `@layer components` no próprio arquivo CSS.

  No Tailwind v4, a recomendação é usar a diretiva **`@utility`** para quaisquer utilitários custom. Exemplos:

  - Antes (v3):

    ```css
    @layer utilities {
    	.text-shadow-md {
    		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    	}
    }
    ```

    Depois (v4):

    ```css
    @utility text-shadow-md {
    	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    ```

    Isso informará ao Tailwind para tratar `.text-shadow-md` como uma classe utilitária legítima, gerando variações como `hover:text-shadow-md` automaticamente e inserindo-a na camada correta do CSS final.

  - Se você usava `addUtilities` em um plugin JS, pode converter esse plugin em CSS puro. Exemplo:

    ```js
    // plugin JS no v3
    plugin(function ({ addUtilities }) {
    	addUtilities({
    		".rotate-360": { transform: "rotate(360deg)" },
    	});
    });
    ```

    No v4, basta colocar no CSS principal:

    ```css
    @utility rotate-360 {
    	transform: rotate(360deg);
    }
    ```

    e terá o mesmo efeito (classe `.rotate-360` disponível).

  > **Dica:** Se seus utilitários custom eram do tipo “componente” (vários estilos agrupados, como um `.btn` com múltiplas propriedades), considere mantê-los ou migrá-los para `@utility` também. A diferença é que no v4 um utilitário com muitas propriedades **pode ser sobrescrito** por utilitários atômicos do Tailwind sem precisar alterar ordem, graças à ordenação por especificidade mencionada. Ou seja, você pode definir `.btn` e ainda aplicar algo como `bg-red-500` junto, que este prevalecerá sobre o background do `.btn` se o `.btn` tiver mais propriedades – isso permite compor utilitários com mais previsibilidade.

- **Plugins oficiais (`@tailwindcss/forms` e `@tailwindcss/typography`):**
  Conforme mencionado no passo 4 da seção anterior, a forma de incluir plugins oficiais mudou do config JS para a diretiva `@plugin` no CSS. Após instalar as versões atualizadas desses plugins:

  ```css
  @import "tailwindcss";
  @plugin "@tailwindcss/typography";
  @plugin "@tailwindcss/forms";
  ```

  Isso carrega as regras CSS que esses plugins fornecem (por exemplo, classes `.prose` para tipografia preformatada, estilos base para inputs e selects, etc.).

  **Adaptações específicas:**

  - _Forms:_ O plugin Forms aplica um _reset_ nos elementos de formulário para torná-los estilizáveis com utilities. No v4, verifique se nada mudou drasticamente na aparência dos seus inputs. Uma possível diferença: no v3, inputs tinham borda `gray-300` por padrão via plugin, mas agora que o default de border é `currentColor`, o plugin pode ter ajustado isso. De qualquer forma, após a migração, teste componentes de formulário no Storybook para conferir se continuam com o estilo esperado (campos, checkboxes, radio, etc.). Se você havia customizado algo via CSS adicional, provavelmente continua válido.
  - _Typography:_ O plugin Typography gera as classes `prose` (e variações como `prose-lg`, `prose-invert` para dark). Ele também permitia customizações via config (se você personalizou por ex. a cor padrão do texto dentro de `.prose` via `theme.extend.typography` no v3). Como agora não temos `theme.extend` no config, há duas maneiras:

    1. **Via CSS**: você pode **sobrescrever estilos do plugin manualmente**. Por exemplo, se queria links dentro de `.prose` em outra cor, adicione em seu CSS algo como:

       ```css
       .prose a {
       	color: var(--color-brand-500);
       }
       ```

       ou utilize as novas variáveis do tema: por exemplo, definir `--prose-body: ...` se existir tal variável (ver documentação do plugin). Atualmente, o plugin typography não expõe configurações via `@theme`, então a customização é direta em CSS.

    2. **Via config legacy**: alternadamente, você pode manter um `tailwind.config.js` apenas para configurar a seção typography e carregá-lo com `@config`. Tailwind v4 ainda aplicará as customizações (pois o plugin typography provavelmente lê do config JS se presente). Por exemplo, você poderia ter no config:

       ```js
       module.exports = {
       	darkMode: "class",
       	theme: {
       		typography: {
       			DEFAULT: {
       				css: {
       					color: "#333",
       					a: { textDecoration: "none" },
       				},
       			},
       		},
       	},
       };
       ```

       e no CSS principal usar `@config "./tailwind.config.js"; @plugin "@tailwindcss/typography";`. **Porém**, isso reintroduz o uso do config JS e contraria o espírito do CSS-first. Só use se for realmente complexo migrar a customização via CSS puro.

  Em resumo, inclua os plugins com `@plugin` e teste as funcionalidades que eles oferecem:

  - Para **Typography**: verifique se classes como `prose`, `prose-xl`, `prose-invert` funcionam. Lembre-se que `dark:prose-invert` depende agora de você ter configurado o dark mode (ver abaixo).
  - Para **Forms**: inspecione inputs, selects, checkboxes. O plugin deve ter sido carregado corretamente se, por exemplo, `<input type="text">` tiver bordas e estilo reset (sem estilo nativo do browser). Caso note ausência, confirme se o `@plugin "@tailwindcss/forms"` está presente no CSS e se a ordem está após o `@import "tailwindcss"`.

- **Variantes personalizadas (addVariant -> @custom-variant):**
  Se seu projeto adicionava variantes custom no v3 (além do dark, hover, etc. padrão), agora é hora de migrá-las para o CSS:

  - Conforme explicado, use `@custom-variant`. Um exemplo real de migração:

    - _Variant no JS (v3):_ digamos que você tinha um variant `logged-in` que aplicava estilos quando o elemento tinha um pai com `.logged-in`. No config v3 via plugin:

      ```js
      addVariant("logged-in", ".logged-in &");
      ```

    - _Variant no CSS (v4):_ escreva no CSS:

      ```css
      @custom-variant logged-in (.logged-in &);
      ```

      Depois disso, você pode usar `logged-in:bg-green-500` em um elemento que estará dentro de `<div class="logged-in">...</div>` e funcionará.

  - **Dark mode (modo escuro):** Este é um caso especial mas muito comum de variante custom. Por padrão, o Tailwind v4 **já suporta dark mode via media query** (ou seja, qualquer `dark:` class reage a `prefers-color-scheme: dark`). Porém, se seu projeto usava `darkMode: 'class'` no v3 para alternar tema escuro manualmente (ex.: adicionando/removendo uma classe `.dark` no `<html>`), você precisa recriar esse comportamento:

    - A maneira recomendada é definir uma **custom variant para `dark`** no CSS, sobrescrevendo a implementação padrão. Adicione no seu CSS principal:

      ```css
      @custom-variant dark (&:where(.dark, .dark *));
      ```

      Isso faz com que o prefixo `dark:` passe a gerar seletores do tipo `.dark .element` (ou com ancestrais) em vez de usar media query. O seletor `&:where(.dark, .dark *)` essencialmente diz: “elemento atual _quando ele próprio ou algum antecessor tiver classe .dark_”. Assim, ao colocar `class="dark"` em um container (como `<html>` ou `<body>`), todas as utilities prefixadas com `dark:` dentro desse escopo serão ativadas, igual no Tailwind v3.
      _Exemplo:_ `<div class="bg-white dark:bg-black">` renderizará fundo branco normalmente, mas fundo preto se um ancestral tiver `.dark`.

    - Certifique-se de colocar essa linha **depois** do `@import "tailwindcss"` e antes de fechar o `@theme` (se estiver dentro de um bloco) ou isolada. Após isso, você pode testar togglando manualmente `<html class="dark">` em sua aplicação ou Storybook e ver as classes `dark:` surtindo efeito.
    - Vale ressaltar que no Tailwind v4, se você carregar o config JS legado, pode usar `darkMode: 'selector'` para obter comportamento similar. Mas usar `@custom-variant dark` como acima é mais direto no contexto CSS-first.

  - **Revisão das variants existentes:** O Tailwind v4 já inclui várias variantes por padrão (hover, focus, focus-visible, active, disabled, first, last, etc.). Se você ativou variantes extras no v3 via config (por exemplo, `variants: { backgroundColor: ['active'] }` ou `variantOrder` custom), isso não se aplica mais – todas as pseudo-classes comuns já estão disponíveis. Para variants custom mais avançadas (por exemplo, targeting de irmãos, estados ARIA, etc.), você pode usar a sintaxe de `@custom-variant` combinada com CSS moderno:

    ```css
    @custom-variant peer-invalid (&:has(.peer:invalid) &);
    ```

    (Apenas um exemplo hipotético utilizando `:has()` e classes `.peer`).

  - **Compatibilidade de plugins custom:** Se você possuía plugins Tailwind custom escritos em JS (por exemplo, para gerar utilitários ou variants), vai precisar de uma estratégia: ou reimplementá-los via CSS (como ilustrado acima) ou, temporariamente, incluir o config JS com esses plugins via `@config`. Vale notar que a equipe Tailwind indicou que **plugins JS legados ainda não são totalmente suportados no v4** a não ser via esse caminho de compatibilidade. Portanto, é preferível migrar para as novas diretivas. Os plugins oficiais já estão adaptados; plugins de terceiros podem precisar de substituição ou manutenção do config JS.

Resumindo, concentre suas migrações em:

- Declarar utilitários custom com `@utility` (no lugar de @layer ou addUtilities).
- Incluir plugins via `@plugin` (em vez de `plugins: [...]` no config).
- Definir variants custom (incluindo reconfigurar `dark:` se necessário) via `@custom-variant`.

Cada projeto terá necessidades diferentes, mas esses são os pilares para fazer seus _hacks_ e extensões do Tailwind continuarem funcionais no v4.

## 5. Melhores práticas para ajustar os componentes existentes

Com o Tailwind atualizado e configurado, é hora de revisar os componentes do seu projeto para garantir que tudo continua funcionando e aplicar melhorias possíveis. Aqui vão as melhores práticas ao adaptar seus componentes Vue (ou mesmo templates) após a migração:

- **Atualize classes utilitárias obsoletas ou renomeadas:** Faça uma busca global no código por classes que mudaram no v4:

  - Substitua `shadow-xs` -> `shadow-2xs`, `shadow-sm` (padrão) -> `shadow-xs`.
  - Substitua `blur-xs` -> `blur-xs`, `blur-sm` -> `blur-xs`; `rounded-sm` -> `rounded-xs`, `rounded` -> `rounded-sm`.
  - Se usava classes de opacidade como `bg-opacity-50`, troque para notação com slash, por ex: `bg-black/50` (note que isso requer que a cor seja definida, aqui black).
  - `outline-hidden` antigo -> use `outline-hidden` (para preservar acessibilidade), e só use `outline-hidden` novo se quiser realmente remover o contorno (lembrando de talvez aplicar estilização focus visível de outra forma).
  - Se por acaso encontrar `ring-3` sozinho (sem tamanho), troque para `ring-3` e acrescente a cor se precisar (ex: `focus:ring-3 focus:ring-blue-500`).
  - Variantes combinadas invertidas: se você tinha algo como `lg:hover:text-red-500` (que é variant duplo), isso continua funcionando pois não é sensível à ordem. Mas se tinha `md:first:p-0` ou `md:first:p-0`, atente-se à inversão de ordem que mencionamos (agora seria `md:first:p-0` => precisa virar `md:first:p-0` porque as variantes leem esq->dir). Revisite esses casos, embora sejam raros.
  - Remova qualquer referência a classes de plugin antigas que não carregaram. Por exemplo, se esquecer de adicionar `@plugin forms`, classes como `form-input` podem não existir mais – a solução é ou adicionar o plugin ou ajustar para usar classes utilitárias equivalentes manualmente.

- **Verifique estilizações com `@apply` em componentes:** Muitos projetos Vue usam `<style scoped>` nos componentes e aplicam utilitários com `@apply` para criar classes CSS locais. No Tailwind v4, há uma pegadinha: arquivos CSS separados (como blocos de `<style>` em .vue ou CSS Modules) **não têm acesso automático às variáveis de tema e utilitários custom definidos no CSS global**. Ou seja, se num componente você tentar `@apply bg-brand-500` mas a variável `--color-brand-500` foi definida no arquivo global, pode não funcionar por padrão. Há duas soluções:

  1. **Importar referências com `@reference`:** No início de cada bloco de estilo (ou arquivo CSS isolado) onde você usa `@apply`, importe o CSS global usando a diretiva `@reference` do Tailwind v4. Exemplo em um componente Vue:

     ```vue
     <style scoped>
     	@reference "../index.css";
     	.card {
     		@apply bg-white text-gray-800 rounded-lg;
     	}
     </style>
     ```

     A linha `@reference` não duplica o CSS, mas garante que as variáveis e definições do arquivo referenciado estejam disponíveis para uso naquele contexto. Assim, `@apply` funcionará sem erro.

  2. **Usar as variáveis CSS diretamente no componente:** Em vez de `@apply text-red-500`, por exemplo, você pode fazer `color: var(--color-red-500)` no CSS do componente. Similarmente, `background-color: var(--color-brand-500)` aplicaria sua cor custom sem depender do Tailwind processar o apply. Essa abordagem torna o componente menos acoplado ao mecanismo do Tailwind e pode melhorar performance (pois o Tailwind não precisa processar aquele CSS). No entanto, você perde a conveniência do apply agrupar várias classes. Use com parcimônia ou conforme necessidade.

  Em projetos Vue, uma estratégia é: **para estilos simples e estáticos, prefira utilitários direto no template**; use `@apply` apenas se estiver compondo muitos utilitários repetidamente. Após o upgrade, teste qualquer componente com `@apply` – se algo não estiver funcionando (ex.: estilo não aplicado ou erro no build dizendo "Cannot apply unknown utility"), provavelmente é falta do `@reference` ou do plugin correspondente (vide erro `dark:prose-invert` citado antes, que indicava plugin typography ausente).

- **Responsividade e breakpoints:** Se você personalizou breakpoints (como no exemplo adicionando `3xl` ou alterando `sm`), teste as classes responsivas após a migração. O Tailwind v4 utiliza as variáveis `--breakpoint-*` que você definiu. Inspecione no DevTools se a media query gerada bate com o valor esperado. Lembre-se de atualizar qualquer documentação ou comentários internos sobre os tamanhos se eles mudaram.

  Além disso, aproveite para verificar se há locais onde você usava combinações estranhas de breakpoints que poderiam se simplificar com as novas features. Por exemplo, Tailwind v4 introduz **consulta de container** (classe `container` responsiva não, mas utilitários como `sm:container:`? Na verdade, container queries são novas utilidades separadas). Se isso fizer sentido no seu projeto, considere gradualmente usar container queries nativas para componentes responsivos em vez de depender unicamente de breakpoints de viewport. Mas isso não é obrigatório na migração – é mais uma melhoria futura.

- **Modo escuro (Dark Mode):** Se seu projeto oferece modo claro/escuro com toggle manual, valide se ele ainda funciona:

  - Se optou pela variante custom `@custom-variant dark`, abra o app e acione a classe `.dark` como faria normalmente (um botão de tema, ou usando devtools) e veja se as classes `dark:` surtem efeito.
  - Caso use Storybook, você pode criar uma história ou decorator que adiciona `.dark` no `<html>` para visualizar componentes em modo escuro. Existem addons do Storybook para tema escuro, mas uma forma simples é ter dois stories do componente, um normal e outro com um wrapper `.dark` + atributo `class="dark"` no container do story.
  - Se você se apoia em `prefers-color-scheme` (modo automático), teste em um navegador alterando a preferência do sistema para dark e veja se seu app responde. Lembre-se que por padrão o Tailwind v4 aplica `dark:` classes com media query, a menos que você tenha feito o override acima. Então, se não implementou variant custom nem manteve config, possivelmente seu site agora só responde ao sistema. Decida se isso é aceitável ou se vai implementar o toggle manual (geralmente usuários esperam poder trocar, então o variant class é útil).
  - Verifique elementos que possuam estilos escuros. Por exemplo, se você usava `dark:prose-invert` em conteúdo rich-text, precisa ter certeza que o plugin typography foi carregado **e** que o dark variant está configurado. Se esqueceu de configurar o dark (class) no v4, vai notar que `dark:prose-invert` não funciona via toggle – indicando que falta o `@custom-variant dark`.

- **Componentes de formulário e estado de foco:** Preste atenção especial em componentes de formulário:

  - Inputs e selects: veja se o tamanho, borda e preenchimento permanecem conforme o esperado. O Tailwind v4 removeu algumas opiniões (como a cor da borda padrão), então se você tinha input sem classe de cor, ele pode estar herdando cor do texto pai agora. Recomenda-se definir explicitamente `border-gray-300` ou similar em inputs para consistência.
  - Estados de foco: Com a mudança do ring, se você customizou foco de inputs/botões (ex.: usava `focus:ring-3` antes), agora lembrando de adicionar o tamanho/cor. Idem para `focus:outline-hidden` que mudou de semântica.
  - O plugin forms desabilita o outline nativo de alguns elementos e aplica ring nos focus. Veja se os campos continuam acessíveis (tente navegar com Tab e observar foco).

- **Utilitários compostos (`@apply`) e duplicação de CSS:** Após migrar, fique atento ao tamanho do CSS gerado. O Tailwind v4 tende a gerar um CSS menor e mais otimizado (\~35% menor segundo anunciam). Porém, se você usou a diretiva `@config` para carregar um config JS e também definiu coisas em CSS, ou usou `@apply` sem `@reference` em múltiplos componentes, pode acabar com duplicações ou utilitários faltando. Uma boa prática:

  - Evite misturar config JS e config CSS para a mesma coisa. Idealmente escolha um método (preferencialmente o CSS-first) e seja consistente.
  - Se algo não pode ser expresso facilmente em CSS (ex.: tema do plugin typography complexo), mantenha isso isolado no config JS e tente migrar o resto para CSS, para facilitar eventual remoção do config mais tarde.

- **Aproveite novas funcionalidades do Tailwind v4:** Embora a prioridade seja fazer a migração mantendo tudo funcionando, considere reservar tempo para explorar os recursos novos que podem simplificar seus componentes:

  - O Tailwind v4 introduziu **Cascade Layers (@layer nativo)**. Por isso, `@utility` existe e elimina a necessidade de declarar ordem manual de layers. Mas você também pode usar `@layer` diretamente se quiser separar seu CSS custom em camadas (base, components, utilities) de forma nativa.
  - Suporte a **container queries**: há utilitários como `container-normal` ou semelhantes (na verdade, classes para container queries específicas via plugin ou core do v4). Se algum componente seu fazia hacks para se adaptar ao container, agora pode usar isso.
  - Novas utilidades como `not-:*` variant (que aplica estilo quando outro variant NÃO está ativo), `inert` para desabilitar interações, suporte a propriedades como `color-scheme`, `scroll-timeline`, etc.. Por exemplo, se você estiliza scroll em um componente custom, agora há utilitários de scroll-snap e similares out-of-the-box.
  - Paleta de cores em P3: As cores padrão do Tailwind (como `sky`, `indigo`, etc.) foram atualizadas para versões mais vibrantes usando o espaço de cor OkLCH (P3). Isso significa que em monitores wide-gamut, elas aparecerão mais vivas. Se seu design system usa as cores default, veja se as tonalidades estão adequadas. É provável que as mudanças sejam sutis e positivas, mas vale conferir, por exemplo, se o tom de azul primário não mudou muito. Caso deseje manter exatamente as cores antigas, você teria que redefini-las manualmente via `@theme` (copiando os valores antigos).

Em resumo, **teste todos os componentes e páginas** buscando discrepâncias visuais ou funcionais:

- Compare elementos antes e depois (pode usar o Storybook para isso, ver próxima seção).
- Ajuste utilitários conforme necessário para recuperar o design original ou aproveitar melhorias.
- Remova códigos/truques que ficaram obsoletos graças ao Tailwind v4 (por exemplo, polyfills de container query, classes extras para contornar falta de alguma variant, etc., que agora podem não ser mais necessários).

Adotar as práticas acima garantirá que seus componentes Vue 3 estejam atualizados e prontos para se beneficiar das melhorias do Tailwind CSS v4 com mínimo impacto visual/regressão.

## 6. Testando e validando visualmente com Storybook

Após realizar a atualização, é fundamental **testar a interface** para garantir que não houve regressões visuais. Como seu projeto utiliza o **Storybook** para documentação visual de componentes, ele será uma ferramenta valiosa nessa validação. Siga estas sugestões:

- **Recompile o Storybook com Tailwind v4:** Certifique-se de que o Storybook esteja apontando para o CSS atualizado. Se você importa o CSS global do Tailwind no Storybook (por exemplo, em `.storybook/preview.js` via `import '../src/index.css';`), verifique se essa importação está puxando os estilos novos. Caso contrário, atualize o caminho ou o build do Storybook. Em Storybook 7 com builder Vite, o plugin Tailwind do Vite deve funcionar automaticamente ao incluir o CSS, mas se houver problemas de classes faltando, talvez seja preciso adicionar manualmente o plugin no config do Storybook (via `viteFinal` no main.js) – em geral não é necessário, apenas importe o CSS gerado.

- **Navegue por todos os componentes/storys:** Abra o Storybook no navegador e percorra story por story, comparando com o esperado. Verifique especialmente:

  - Componentes de tipografia (que usam classes `prose`): estão formatados corretamente? Cheque títulos, parágrafos, listas, para ver se o plugin typography está ativo. Se algo estiver faltando, pode ser o plugin não carregado.
  - Componentes de formulário: inputs, botões, toggles – inspecione estados de foco, placeholder (lembrando que a cor do placeholder mudou para semi-transparente), e disabled.
  - Componentes com variantes dark mode: se seu Storybook não possui um toggle de tema, uma ideia é adicionar temporariamente uma história ou um decorador global para aplicar classe `.dark` no fundo, e verificar manualmente. Alguns addons como _storybook-dark-mode_ podem facilitar isso. De qualquer forma, abra o console devtools e insira `document.documentElement.classList.add('dark')` enquanto visualiza uma story para simular (se você definiu `@custom-variant dark`). Assim verá se, por exemplo, aquele card que tinha `bg-white dark:bg-gray-800` está mudando de cor.
  - Layout e espaçamento geral: graças à mudança no `space-*` e default de border, valide se grids e listas com espaçamento continuam iguais. Se notar alguma diferença (ex: elementos com margin a mais ou a menos), ajuste usando `gap` ou classes utilitárias novas.
  - Ícones ou elementos com `outline-hidden`: confirme se nada ficou com contorno inesperado em focus ou, ao contrário, sem indicação de focus.
  - Shadow/radius: componentes com sombras e cantos arredondados pequenos podem ter mudado sutilmente (pelo rename das classes). Se notar sombras mais fortes ou raios diferentes, pode ser porque você não trocou `shadow-xs` -> `shadow-2xs`, etc. Faça o ajuste e atualize a story.

- **Testes manuais de interação:** Além do visual estático, interaja com os componentes:

  - Faça hover em tooltips, dropdowns, etc., em Storybook, para ver se os estilos de hover/açõe ainda aparecem (lembrando que agora hover não ativa em touch, mas no ambiente desktop do Storybook isso não muda).
  - Clique em elementos focáveis e veja o estado de focus (ex.: navegue com Tab para ver outlines ou rings).
  - Se você tem componentes responsivos (ex.: um componente de barra de navegação com classes `md:flex`), use o addon de viewport do Storybook ou redimensione a janela para conferir se os breakpoints respondem corretamente (especialmente se alterou algum valor de `screens`).

- **Comparação visual (regressão):** Como não há testes automatizados no projeto atualmente, considere as seguintes abordagens para garantir fidelidade visual:

  - **Captura de tela manual:** Tire screenshots de componentes-chave antes da migração (se você tiver um Storybook implantado ou mesmo local, capture manualmente), e depois compare com a aparência pós-migração. Embora manual, isso ajuda a notar mudanças sutis de cor, espaçamento ou tipografia. Faça isso lado a lado para componentes críticos da UI.
  - **Ferramentas de diff visual:** Avalie a possibilidade de introduzir no futuro uma ferramenta de _visual regression testing_. Por exemplo, serviços como **Chromatic** (que integra com Storybook) podem capturar automaticamente screens de cada story e destacar diferenças em pull requests. Outra opção é usar ferramentas open-source como Loki ou Storybook Addon StoryShots com Puppeteer para gerar imagens base e comparar. Implementar isso durante a migração pode ser overkill, mas é algo a considerar para evitar regressões silenciosas em atualizações futuras.
  - **Checklists de QA visual:** Monte uma lista de itens de UI a verificar (tipografia, cores do tema, estados de interação, etc.) e marque cada componente conforme verifica no Storybook. Isso ajuda a não esquecer de nada, já que a atualização envolve muitas pequenas mudanças potenciais.

- **Desempenho e console:** Abra o console do navegador enquanto navega pelo Storybook atualizado. Veja se há warnings ou errors do Tailwind. Por exemplo, se aparecer algo como “Unknown utility” ou “@apply cannot be used with ...”, provavelmente ainda há algum ajuste pendente (pode ser plugin faltando ou sintaxe antiga em algum lugar). Corrija quaisquer mensagens relevantes. Observe também o tamanho do CSS carregado – deve ser semelhante ou menor que antes, nunca maior drasticamente (a não ser que tenha habilitado muito mais utilities).

- **Documentação e comunicação:** Atualize a documentação do Storybook (MDX ou notas) para refletir mudanças. Por exemplo, se antes você documentava “Use `shadow-xs` para pequena sombra”, agora deve atualizar para `shadow-2xs`. Ou se instruía adicionar classe `.dark` no HTML para tema escuro, confirme se continua válido e mencione a nova configuração. Isso garante que desenvolvedores do time estejam cientes das mudanças ao consultar o Storybook.

Em essência, aproveite o Storybook como um ambiente seguro para validar o upgrade. **Qualquer discrepância visual encontrada deve ser endereçada imediatamente**, ajustando o código ou complementando a configuração do Tailwind v4. Envolva o time de design ou QA se possível, mostrando antes/depois de componentes sensíveis.

Após essa bateria de testes, sua aplicação deverá estar visualmente consistente com o esperado, agora rodando com TailwindCSS v4. Parabéns! 🎉 A partir daqui, você pode usufruir das melhorias de performance (builds mais rápidos, CSS menor) e manter o projeto atualizado com a comunidade Tailwind.

---

## Links úteis

- **Changelog e Guia de Migração Oficial – Tailwind CSS v4.0:** Documento oficial detalhando todas as mudanças de breaking change, recomendações de upgrade e novas features. Referência principal para sanar dúvidas específicas durante a migração.
- **Tailwind CSS v4 Blog Post (Lançamento):** Anúncio oficial do Tailwind v4 com resumo das principais novidades (novo motor rápido, CSS-first config, CSS variables globais, novas utilities). Útil para entender o contexto e benefícios da atualização.
- **Documentação Tailwind v4 – Theme e Configuração:** Seções da documentação explicando o uso de `@theme` e variáveis de tema, diretiva `@plugin`, `@custom-variant`, etc. Fornece exemplos adicionais de sintaxe para personalizar o framework no CSS.
- **Repositório de Exemplo (Vue 3 + Vite + Tailwind v4):** [themesberg/tailwind-vue-starter](https://github.com/themesberg/tailwind-vue-starter) – Template no GitHub usando Vue 3 com Tailwind v4, útil para consultar organização de arquivos, importações e configuração básica de um projeto já no v4.
- **Artigo: Migrando Tailwind v3 -> v4 com plugins:** Tutorial publicado por John Idogun cobrindo a atualização para v4 incluindo como lidar com os plugins Typography e Forms e habilitar dark mode manual. Boa leitura complementar para desafios práticos de migração.
- **Ferramenta de Upgrade Automatizado:** Pacote `@tailwindcss/upgrade` – executado via `npx @tailwindcss/upgrade`. Ele tenta converter seu projeto para v4 automaticamente (ajustando config, classes e pacotes). Não substitui a revisão manual, mas pode acelerar o processo. Use com cautela e sempre valide o resultado.
- **Documentação Storybook + Tailwind:** _(Conteúdo externo)_ Guia oficial de Tailwind sobre instalação com frameworks (inclui Vite) e discussões na comunidade Storybook sobre Tailwind v4. Ajuda a resolver problemas de integração, caso encontre, ao rodar o Storybook após a atualização.

Cada um desses recursos pode auxiliá-lo em aspectos específicos da migração e no uso eficaz do Tailwind CSS v4 em seu projeto Vue. Boa atualização e bons códigos! 🚀
