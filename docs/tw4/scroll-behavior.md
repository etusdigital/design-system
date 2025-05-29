# Scroll Behavior

Utilitários para controlar o comportamento de rolagem dos elementos.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `scroll-auto` | `scroll-behavior: auto;` |
| `scroll-smooth` | `scroll-behavior: smooth;` |

## Exemplos

### Usando rolagem suave

Use a utilidade `scroll-smooth` para habilitar rolagem suave dentro de um elemento:

```html
<html class="scroll-smooth">
  <!-- ... -->
</html>
```

**Nota:** A configuração de `scroll-behavior` afeta apenas eventos de rolagem que são acionados pelo navegador.

### Usando rolagem normal

Use a utilidade `scroll-auto` para reverter ao comportamento padrão do navegador para rolagem:

```html
<html class="scroll-smooth md:scroll-auto">
  <!-- ... -->
</html>
```

## Uso Responsivo

Você pode aplicar diferentes comportamentos de rolagem em diferentes breakpoints:

```html
<!-- Rolagem suave no mobile, normal no desktop -->
<html class="scroll-smooth md:scroll-auto">
  <!-- ... -->
</html>
```

