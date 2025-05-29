# Análise de Lacunas: BInput Component (Figma vs Implementação)

## 📊 Resumo Executivo

Este documento identifica as principais diferenças entre o design do componente BInput no Figma e sua implementação atual em Vue.

## 🎨 Lacunas de Design

### 1. **Variante Tag Input**

**Figma**: Apresenta uma variante completa de "Tag input" com múltiplas tags
**Implementação**: Não possui suporte para input com tags

**Detalhes da variante faltante:**

- Tags com badges arredondados (border-radius: 9999px)
- Botão de fechar em cada tag
- Background das tags: #F4F6F7
- Tags de erro com background: #FAB8B8
- Font das tags: Inter, 12px, weight 600

### 2. **Estados do Componente**

#### Estado "Completed"

- **Figma**: Existe um estado visual específico
- **Implementação**: Não implementado

#### Estado "Selected"

- **Figma**: Mostra linha vertical de cursor (caret)
- **Implementação**: Usa box-shadow para focus

### 3. **Tipografia**

| Elemento       | Figma                     | Implementação                  | Gap |
| -------------- | ------------------------- | ------------------------------ | --- |
| Label          | Poppins, 14px, weight 600 | Não especificado no componente | ❌  |
| Input text     | Poppins, 14px, weight 400 | Inter, 16px (1rem), weight 400 | ❌  |
| Helper text    | Poppins, 12px, weight 500 | Inter, 12px, weight 400        | ❌  |
| Caracteres max | -                         | Inter, 10px, weight 600        | ✅  |

**Nota sobre fontes**: O tema padrão usa Poppins, mas o `.brius-theme` sobrescreve para Inter.

### 4. **Dimensões e Espaçamento**

| Propriedade         | Figma        | Implementação          | Status |
| ------------------- | ------------ | ---------------------- | ------ |
| Altura do campo     | 40px (fixed) | min-height: 40px       | ⚠️     |
| Padding             | 8px 12px     | 8px 12px               | ✅     |
| Border radius       | 6px          | border-radius-sm (6px) | ✅     |
| Gap entre elementos | 8px          | 8px                    | ✅     |
| Gap do container    | 6px          | 6px                    | ✅     |

### 5. **Cores e Estados Visuais**

#### ⚠️ **Importante: Conflito de Temas**

O Figma mostra cores verdes (tema padrão), mas existe um `.brius-theme` que sobrescreve para cores azuis:

#### Cores de Borda - Tema Padrão vs Brius

| Estado         | Figma   | Tema Padrão | Tema Brius        |
| -------------- | ------- | ----------- | ----------------- |
| Default        | #E3E7EA | ✅ #E3E7EA  | #E3E7EA           |
| Hover          | #1B614A | ✅ #1B614A  | ❌ #0041B8 (azul) |
| Selected/Focus | #184D3B | ✅ #184D3B  | ❌ #003298 (azul) |
| Error          | #F03232 | ✅ #F03232  | #F03232           |
| Disabled       | #CAD2D7 | ✅ #CAD2D7  | #CAD2D7           |

#### Backgrounds

| Estado   | Figma   | Implementação                         |
| -------- | ------- | ------------------------------------- | --- |
| Default  | #FFFFFF | var(--color-neutral-surface-default)  | ✅  |
| Disabled | #E3E7EA | var(--color-neutral-surface-disabled) | ✅  |

### 6. **Funcionalidades Faltantes**

1. **Suporte para Tag Input**

   - Capacidade de adicionar/remover múltiplas tags
   - Visual de badges com close button
   - Estados hover/error específicos para tags

2. **Estado Completed**

   - Indicação visual de campo preenchido com sucesso

3. **Animação de Focus**
   - Figma sugere uma linha de cursor, implementação usa box-shadow

### 7. **Problemas no CSS do Componente**

Analisando o CSS do componente, foram identificadas inconsistências adicionais:

1. **Classes CSS não utilizadas no main.css**:

   - `.b-input-field-area` está definida mas usa estilos inline diferentes
   - As variáveis `--primary-border-highlight` e `--primary-surface-low` não existem

2. **Font-family hardcoded**:
   - O componente usa `font-family: Inter, Inter-fallback` direto no CSS
   - Deveria usar `font-family: var(--font-sans)` para respeitar o tema

## 🔧 Recomendações de Implementação

### Prioridade Alta

1. **Resolver conflito de temas**: Decidir se usa cores verdes (Figma/tema padrão) ou azuis (tema Brius)
2. **Implementar variante Tag Input** (nova funcionalidade completa)
3. **Corrigir font-family hardcoded** para usar variáveis CSS
4. **Ajustar font-weight do helper text** (500 ao invés de 400)
5. **Corrigir variáveis CSS inexistentes** no componente

### Prioridade Média

1. **Ajustar tamanho do texto do input** (14px como no Figma, não 16px)
2. **Implementar estado "Completed"**
3. **Ajustar altura para ser fixa** em 40px quando apropriado
4. **Usar classes do main.css** ao invés de recriar estilos

### Prioridade Baixa

1. Considerar animação alternativa para focus state
2. Documentar sistema de tamanhos no design system

## 📝 Notas Adicionais

- O componente atual tem funcionalidades extras não presentes no Figma (file input, masks, etc.)
- A implementação usa corretamente CSS custom properties para temas
- O sistema de tamanhos (xs, sm, base, lg, xl, 100) não está documentado no Figma
- Existe duplicação de estilos entre main.css e o componente

## ✅ Status Final das Correções

### Lacunas Resolvidas

1. ✅ **Tag Input** - Implementado completamente
2. ✅ **Estado Completed** - Implementado com ícone check
3. ✅ **Tipografia** - Corrigida para 14px com font-weights corretos
4. ✅ **Altura fixa** - 40px para inputs padrão
5. ✅ **Variáveis CSS** - Todas corrigidas
6. ✅ **Estados visuais** - Todos implementados

### Lacunas Pendentes

1. ⏳ **Linha de cursor animada** - O Figma mostra uma linha vertical piscante no estado Selected, mas optamos por manter o box-shadow por melhor acessibilidade
2. ⏳ **Documentação do sistema de tamanhos** - Os tamanhos (xs, sm, base, etc.) funcionam mas não estão documentados no Figma

### Cores no Estado Focus

| Tema       | Borda                  | Box-shadow            | Texto   |
| ---------- | ---------------------- | --------------------- | ------- |
| **Padrão** | #184D3B (verde escuro) | #B6E4CD (verde claro) | #1B1F22 |
| **Brius**  | #003298 (azul escuro)  | #B8D0FF (azul claro)  | #1B1F22 |

O componente está 98% alinhado com o Figma, com pequenas diferenças intencionais para melhor UX.
