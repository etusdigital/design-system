# Will-Change

## Sintaxe

O Tailwind CSS v4 oferece diferentes formas de aplicar a propriedade `will-change`:

- `will-change-auto` → `will-change: auto;`
- `will-change-scroll` → `will-change: scroll-position;`
- `will-change-contents` → `will-change: contents;`
- `will-change-transform` → `will-change: transform;`
- `will-change-<custom-property>` → `will-change: var(<custom-property>);`
- `will-change-[<value>]` → `will-change: <value>;`

## Exemplos

### Otimizando com will-change

Use os utilitários `will-change-scroll`, `will-change-contents` e `will-change-transform` para otimizar um elemento que deve mudar em breve, instruindo o navegador a preparar a animação necessária antes que ela realmente comece:

```html
<div class="overflow-auto will-change-scroll">
  <!-- Conteúdo que irá rolar -->
</div>
```

**Recomendação:** É recomendado aplicar estes utilitários pouco antes de um elemento mudar, e depois removê-lo logo após terminar usando `will-change-auto`.

⚠️ **Importante:** A propriedade `will-change` deve ser usada como último recurso ao lidar com problemas de performance conhecidos. Evite usar estes utilitários demais, ou simplesmente antecipando problemas de performance, pois isso pode tornar a página menos performática.

### Usando valores customizados

Use a sintaxe `will-change-[<value>]` para definir a propriedade `will-change` baseada em um valor completamente customizado:

```html
<div class="will-change-[top,left]">
  <!-- Elemento que mudará propriedades top e left -->
</div>
```

### Usando variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `will-change-(<custom-property>)`:

```html
<div class="will-change-(--my-properties)">
  <!-- Usando variável CSS customizada -->
</div>
```

Isso é apenas uma forma abreviada de `will-change-[var(<custom-property>)]` que adiciona a função `var()` automaticamente.

---

📝 **Nota:** A propriedade `will-change` é uma ferramenta de otimização que deve ser usada com cuidado e apenas quando necessária.