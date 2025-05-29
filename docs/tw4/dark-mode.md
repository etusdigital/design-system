# Dark Mode

## Visão Geral

Agora que o modo escuro é uma funcionalidade nativa de muitos sistemas operacionais, está se tornando cada vez mais comum projetar uma versão escura do seu site para acompanhar o design padrão.

Para tornar isso o mais fácil possível, o Tailwind inclui uma variante `dark` que permite estilizar seu site de forma diferente quando o modo escuro está habilitado.

### Exemplo Visual

**Modo Claro:**
- Fundo branco
- Texto escuro
- Elementos com cores claras

**Modo Escuro:**
- Fundo escuro
- Texto claro  
- Elementos com cores adaptadas

```html
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
  <div>
    <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
      <svg class="h-6 w-6 stroke-white">
        <!-- ícone -->
      </svg>
    </span>
  </div>
  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight">
    Escreve de cabeça para baixo
  </h3>
  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">
    A Caneta Zero Gravity pode ser usada para escrever em qualquer orientação, 
    incluindo de cabeça para baixo. Funciona até no espaço sideral.
  </p>
</div>
```

Por padrão, isso usa a funcionalidade CSS `prefers-color-scheme`, mas você também pode criar sites que suportam alternar o modo escuro manualmente, sobrescrevendo a variante dark.

## Alternando o Modo Escuro Manualmente

Se você quiser que seu tema escuro seja controlado por um seletor CSS em vez da media query `prefers-color-scheme`, substitua a variante dark para usar seu seletor personalizado:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

Agora, em vez dos utilitários `dark:*` serem aplicados com base em `prefers-color-scheme`, eles serão aplicados sempre que a classe `dark` estiver presente anteriormente na árvore HTML:

```html
<html class="dark">
  <body>
    <div class="bg-white dark:bg-black">
      <!-- conteúdo -->
    </div>
  </body>
</html>
```

Como você adiciona a classe `dark` ao elemento `html` fica por sua conta, mas uma abordagem comum é usar um pouco de JavaScript que atualiza o atributo class e sincroniza essa preferência com algum lugar como `localStorage`.

### Usando um Atributo de Dados

Para usar um atributo de dados em vez de uma classe para ativar o modo escuro, apenas substitua a variante dark por um seletor de atributo:

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

Agora os utilitários de modo escuro serão aplicados sempre que o atributo `data-theme` for definido como `dark` em algum lugar da árvore:

```html
<html data-theme="dark">
  <body>
    <div class="bg-white dark:bg-black">
      <!-- conteúdo -->
    </div>
  </body>
</html>
```

### Com Suporte ao Tema do Sistema

Para criar alternadores de tema de três vias que suportam modo claro, modo escuro e o tema do seu sistema, use um seletor de modo escuro personalizado e a API `window.matchMedia()` para detectar o tema do sistema e atualizar o elemento html quando necessário.

Aqui está um exemplo simples de como você pode suportar modo claro, modo escuro, bem como respeitar a preferência do sistema operacional:

```javascript
// No carregamento da página ou ao alterar temas, 
// melhor adicionar inline no `head` para evitar FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && 
     window.matchMedia("(prefers-color-scheme: dark)").matches)
);

// Sempre que o usuário escolher explicitamente o modo claro
localStorage.theme = "light";

// Sempre que o usuário escolher explicitamente o modo escuro  
localStorage.theme = "dark";

// Sempre que o usuário escolher explicitamente respeitar a preferência do SO
localStorage.removeItem("theme");
```

## Implementação Recomendada

1. **Defina a variante personalizada** no seu CSS principal
2. **Adicione a lógica JavaScript** para gerenciar a alternância
3. **Armazene a preferência** do usuário no localStorage
4. **Respeite a preferência do sistema** quando não há escolha explícita

Novamente, você pode gerenciar isso como quiser, até mesmo armazenando a preferência no lado do servidor em um banco de dados e renderizando a classe no servidor — fica totalmente por sua conta.

