# Grid Template Rows

## Classes Disponíveis

### Classes Numéricas
- **`grid-rows-<number>`** → `grid-template-rows: repeat(<number>, minmax(0, 1fr));`

### Classes Especiais
- **`grid-rows-none`** → `grid-template-rows: none;`
- **`grid-rows-subgrid`** → `grid-template-rows: subgrid;`

### Classes Customizadas
- **`grid-rows-[<value>]`** → `grid-template-rows: <value>;`
- **`grid-rows-(<custom-property>)`** → `grid-template-rows: var(<custom-property>);`

---

## Exemplos de Uso

### 1. Especificando o Número de Linhas da Grid

Use as utilitários `grid-rows-<number>` como `grid-rows-2` e `grid-rows-4` para criar grids com n linhas de tamanho igual:

**Classes:** `grid-rows-2`, `grid-rows-4`

```html
<div class="grid grid-flow-col grid-rows-4 gap-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
  <div>07</div>
  <div>08</div>
  <div>09</div>
</div>
```

### 2. Implementando uma Subgrid

Use a utilitário `grid-rows-subgrid` para adotar as trilhas de linha definidas pelo pai do item:

**Classe:** `grid-rows-subgrid`

```html
<div class="grid grid-flow-col grid-rows-4 gap-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  
  <div class="row-span-3 grid grid-rows-subgrid gap-4">
    <div class="row-start-2">06</div>
  </div>
  
  <div>07</div>
  <div>08</div>
  <div>09</div>
  <div>10</div>
</div>
```

### 3. Usando Valores Customizados

Use a sintaxe `grid-rows-[<value>]` para definir as linhas baseado em um valor completamente customizado:

**Classe:** `grid-rows-[<value>]`

```html
<div class="grid-rows-[200px_minmax(900px,1fr)_100px] ...">
  <!-- Conteúdo da grid -->
</div>
```

### 4. Usando Variáveis CSS

Para variáveis CSS, você também pode usar a sintaxe `grid-rows-(<custom-property>)`:

**Classe:** `grid-rows-(<custom-property>)`

```html
<div class="grid-rows-(--my-grid-rows) ...">
  <!-- Conteúdo da grid -->
</div>
```

> **Nota:** Esta é apenas uma forma abreviada de `grid-rows-[var(<custom-property>)]` que adiciona a função `var()` automaticamente para você.

---

## Design Responsivo

Prefixe uma utilitário de `grid-template-rows` com uma variante de breakpoint como `md:` para aplicar a utilitário apenas em tamanhos de tela médios e acima:

```html
<div class="grid grid-rows-2 md:grid-rows-6 ...">
  <!-- Conteúdo da grid -->
</div>
```

> 📚 **Saiba mais:** Consulte a documentação sobre variantes para aprender mais sobre como usar variações responsivas.

