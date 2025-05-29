# Line Height

Este documento descreve como usar as utilitários de line-height no Tailwind CSS v4.

## Classes Disponíveis

### Combinadas com font-size

| Classe | CSS Gerado |
|--------|------------|
| `text-<size>/<number>` | `font-size: <size>; line-height: calc(var(--spacing) * <number>);` |
| `text-<size>/(<custom-property>)` | `font-size: <size>; line-height: var(<custom-property>);` |
| `text-<size>/[<value>]` | `font-size: <size>; line-height: <value>;` |

### Independentes

| Classe | CSS Gerado |
|--------|------------|
| `leading-none` | `line-height: 1;` |
| `leading-<number>` | `line-height: calc(var(--spacing) * <number>)` |
| `leading-(<custom-property>)` | `line-height: var(<custom-property>);` |
| `leading-[<value>]` | `line-height: <value>;` |

## Exemplos

### Exemplo Básico

Use utilitários de font-size como `text-sm/6` e `text-lg/7` para definir o font-size e line-height de um elemento ao mesmo tempo:

```html
<p class="text-base/6">
  So I started to walk into the water. I won't lie to you boys, I was terrified. 
  But I pressed on, and as I made my way past the breakers a strange calm came over me. 
  I don't know if it was divine intervention or the kinship of all living things 
  but I tell you Jerry at that moment, I was a marine biologist.
</p>

<p class="text-base/7">
  So I started to walk into the water. I won't lie to you boys, I was terrified. 
  But I pressed on, and as I made my way past the breakers a strange calm came over me. 
  I don't know if it was divine intervention or the kinship of all living things 
  but I tell you Jerry at that moment, I was a marine biologist.
</p>

<p class="text-base/8">
  So I started to walk into the water. I won't lie to you boys, I was terrified. 
  But I pressed on, and as I made my way past the breakers a strange calm came over me. 
  I don't know if it was divine intervention or the kinship of all living things 
  but I tell you Jerry at that moment, I was a marine biologist.
</p>
```

> **Nota:** Cada utilitário de font-size também define um line-height padrão quando um não é fornecido. Você pode aprender mais sobre esses valores e como customizá-los na documentação de font-size.

### Definindo Independentemente

Use utilitários `leading-<number>` como `leading-6` e `leading-7` para definir o line-height de um elemento independentemente do font-size:

```html
<p class="text-sm leading-6">
  So I started to walk into the water. I won't lie to you boys, I was terrified. 
  But I pressed on, and as I made my way past the breakers a strange calm came over me. 
  I don't know if it was divine intervention or the kinship of all living things 
  but I tell you Jerry at that moment, I was a marine biologist.
</p>

<p class="text-sm leading-7">
  So I started to walk into the water. I won't lie to you boys, I was terrified. 
  But I pressed on, and as I made my way past the breakers a strange calm came over me. 
  I don't know if it was divine intervention or the kinship of all living things 
  but I tell you Jerry at that moment, I was a marine biologist.
</p>

<p class="text-sm leading-8">
  So I started to walk into the water. I won't lie to you boys, I was terrified. 
  But I pressed on, and as I made my way past the breakers a strange calm came over me. 
  I don't know if it was divine intervention or the kinship of all living things 
  but I tell you Jerry at that moment, I was a marine biologist.
</p>
```

### Removendo o Leading

Use o utilitário `leading-none` para definir o line-height de um elemento igual ao seu font-size:

```html
<p class="text-2xl leading-none">
  The quick brown fox jumps over the lazy dog.
</p>
```

### Usando um Valor Customizado

Use a sintaxe `leading-[<value>]` para definir o line-height baseado em um valor completamente customizado:

```html
<p class="leading-[1.5]">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
</p>
```

Para variáveis CSS, você também pode usar a sintaxe `leading-(<custom-property>)`:

```html
<p class="leading-(--my-line-height)">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
</p>
```

Isso é apenas um atalho para `leading-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

### Design Responsivo

Prefixe um utilitário de line-height com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e acima:

```html
<p class="leading-5 md:leading-6">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
</p>
```

Saiba mais sobre o uso de variantes na documentação de variantes.

## Customizando seu Tema

Os utilitários `leading-<number>` são controlados pela variável de tema `--spacing`, que pode ser customizada em seu próprio tema:

```css
@theme {
  --spacing: 1px;
}
```

Saiba mais sobre customizar a escala de espaçamento na documentação de variáveis de tema.

