# Isolation

A propriedade CSS `isolation` controla se um elemento deve criar explicitamente um novo contexto de empilhamento (stacking context).

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `isolate` | `isolation: isolate;` |
| `isolation-auto` | `isolation: auto;` |

## Descrição das Classes

### `isolate`
- **Função:** Força a criação de um novo contexto de empilhamento
- **Uso:** Útil quando você precisa controlar como elementos se sobrepõem ou interagem com efeitos de mistura (blend modes)

### `isolation-auto`
- **Função:** Permite que o navegador determine automaticamente se deve criar um novo contexto de empilhamento
- **Uso:** Comportamento padrão, usado para remover o isolamento forçado

## Exemplos

### Exemplo básico

Use as utilidades `isolate` e `isolation-auto` para controlar se um elemento deve criar explicitamente um novo contexto de empilhamento:

```html
<!-- Elemento com isolamento forçado -->
<div class="isolate">
  <!-- conteúdo -->
</div>

<!-- Elemento com isolamento automático -->
<div class="isolation-auto">
  <!-- conteúdo -->
</div>
```

### Design responsivo

Adicione um prefixo de breakpoint como `md:` para aplicar a utilidade apenas em tamanhos de tela médios e superiores:

```html
<div class="isolate md:isolation-auto">
  <!-- Isolado em telas pequenas, automático em telas médias+ -->
</div>
```

## Quando usar

- **`isolate`:** Quando você está trabalhando com blend modes, z-index complexo, ou precisa garantir que um elemento tenha seu próprio contexto de empilhamento
- **`isolation-auto`:** Para retornar ao comportamento padrão ou remover isolamento aplicado anteriormente

## Recursos adicionais

Saiba mais sobre o uso de variantes na [documentação de variantes](https://tailwindcss.com/docs/hover-focus-and-other-states).

