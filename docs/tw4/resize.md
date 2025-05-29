# Resize

As classes de resize do Tailwind CSS permitem controlar como um elemento pode ser redimensionado pelo usuário.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `resize-none` | `resize: none;` |
| `resize` | `resize: both;` |
| `resize-y` | `resize: vertical;` |
| `resize-x` | `resize: horizontal;` |

## Exemplos

### Redimensionamento em todas as direções

Use `resize` para tornar um elemento redimensionável horizontal e verticalmente:

```html
<textarea class="resize rounded-md border border-gray-300 p-3">
  Arraste o controle no canto inferior direito para redimensionar
</textarea>
```

**Resultado:** O elemento pode ser redimensionado em ambas as direções (horizontal e vertical).

### Redimensionamento vertical

Use `resize-y` para tornar um elemento redimensionável apenas verticalmente:

```html
<textarea class="resize-y rounded-md border border-gray-300 p-3">
  Arraste o controle para redimensionar verticalmente
</textarea>
```

**Resultado:** O elemento só pode ser redimensionado na vertical.

### Redimensionamento horizontal

Use `resize-x` para tornar um elemento redimensionável apenas horizontalmente:

```html
<textarea class="resize-x rounded-md border border-gray-300 p-3">
  Arraste o controle para redimensionar horizontalmente
</textarea>
```

**Resultado:** O elemento só pode ser redimensionado na horizontal.

### Impedir redimensionamento

Use `resize-none` para impedir que um elemento seja redimensionável:

```html
<textarea class="resize-none rounded-md border border-gray-300 p-3">
  Este textarea não pode ser redimensionado
</textarea>
```

**Resultado:** O controle de redimensionamento não aparece e o elemento mantém seu tamanho fixo.

## Design Responsivo

Você pode aplicar diferentes comportamentos de resize em diferentes breakpoints usando os prefixos de variante:

```html
<div class="resize-none md:resize lg:resize-y">
  <!-- Sem resize em mobile, resize completo em tablet, apenas vertical em desktop -->
</div>
```

### Exemplos responsivos:

- `sm:resize-none` - Remove resize em telas pequenas e acima
- `md:resize` - Permite resize completo em telas médias e acima  
- `lg:resize-x` - Permite apenas resize horizontal em telas grandes e acima
- `xl:resize-y` - Permite apenas resize vertical em telas extra grandes e acima

## Notas Importantes

- A propriedade `resize` só funciona em elementos que têm `overflow` diferente de `visible`
- É mais comumente usada em elementos `<textarea>` e `<div>` com conteúdo que pode transbordar
- O comportamento visual pode variar entre diferentes navegadores

## Saiba Mais

Para mais informações sobre variantes e uso avançado, consulte a [documentação oficial de variantes do Tailwind CSS](https://tailwindcss.com/docs/hover-focus-and-other-states).

