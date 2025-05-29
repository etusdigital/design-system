# Appearance

O utilitário `appearance` controla como os elementos de formulário são renderizados pelo navegador.

## Classes Disponíveis

| Classe | Propriedade CSS |
|--------|----------------|
| `appearance-none` | `appearance: none;` |
| `appearance-auto` | `appearance: auto;` |

## Exemplos

### Removendo a aparência padrão

Use `appearance-none` para resetar qualquer estilo específico do navegador em um elemento:

```html
<!-- Antes: select com aparência padrão do navegador -->
<select>
  <option>Sim</option>
  <option>Não</option>
  <option>Talvez</option>
</select>

<!-- Depois: select personalizado sem aparência padrão -->
<div class="grid">
  <select class="col-start-1 row-start-1 appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-300 rounded-md px-3 py-2 pr-8">
    <option>Sim</option>
    <option>Não</option>
    <option>Talvez</option>
  </select>
  <svg class="pointer-events-none col-start-1 row-start-1 ml-auto mr-2 h-5 w-5 text-gray-400">
    <!-- Ícone de seta personalizada -->
  </svg>
</div>
```

Este utilitário é frequentemente usado ao criar componentes de formulário personalizados.

### Restaurando a aparência padrão

Use `appearance-auto` para restaurar o estilo padrão específico do navegador em um elemento:

```html
<!-- Útil para modos de acessibilidade -->
<label class="flex items-center gap-2">
  <div class="relative">
    <input 
      type="checkbox" 
      class="appearance-none forced-colors:appearance-auto w-4 h-4 border-2 border-gray-300 rounded checked:bg-blue-500 checked:border-blue-500" 
    />
    <svg class="invisible peer-checked:visible forced-colors:hidden absolute inset-0 w-4 h-4 text-white">
      <!-- Ícone de check personalizado -->
    </svg>
  </div>
  <span>Volta para aparência padrão em modos de acessibilidade</span>
</label>

<label class="flex items-center gap-2">
  <div class="relative">
    <input 
      type="checkbox" 
      class="appearance-none w-4 h-4 border-2 border-gray-300 rounded checked:bg-blue-500 checked:border-blue-500" 
    />
    <svg class="invisible peer-checked:visible absolute inset-0 w-4 h-4 text-white">
      <!-- Ícone de check personalizado -->
    </svg>
  </div>
  <span>Mantém aparência personalizada</span>
</label>
```

> **Dica:** Experimente emular `forced-colors: active` nas ferramentas de desenvolvedor para ver a diferença entre os exemplos acima.

Isso é útil para reverter aos controles padrão do navegador em certos modos de acessibilidade.

### Design Responsivo

Prefixe um utilitário de aparência com uma variante de breakpoint como `md:` para aplicar o utilitário apenas em tamanhos de tela médios e maiores:

```html
<select class="appearance-auto md:appearance-none bg-white border border-gray-300 rounded-md px-3 py-2">
  <option>Opção 1</option>
  <option>Opção 2</option>
  <option>Opção 3</option>
</select>
```

## Casos de Uso Comuns

### 1. Selects Personalizados
```html
<div class="relative">
  <select class="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <option>Escolha uma opção</option>
    <option>Opção 1</option>
    <option>Opção 2</option>
  </select>
  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </div>
</div>
```

### 2. Checkboxes Personalizados
```html
<label class="flex items-center space-x-2">
  <input type="checkbox" class="appearance-none w-5 h-5 border-2 border-gray-300 rounded checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  <span>Opção personalizada</span>
</label>
```

### 3. Radio Buttons Personalizados
```html
<label class="flex items-center space-x-2">
  <input type="radio" name="opcao" class="appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  <span>Opção A</span>
</label>
```

---

Saiba mais sobre o uso de variantes na [documentação de variantes](../variants.md).

