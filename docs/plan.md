# Plano de Migração Pragmático - Design System v2

## Objetivo

Modularizar o Design System para melhorar tree-shaking e organização, mantendo compatibilidade com a versão atual.

## Estratégia: Migração Incremental

1. **Criar estrutura modular paralela** - Não quebrar nada existente
2. **Migrar componentes gradualmente** - Um de cada vez
3. **Manter compatibilidade total** - Zero breaking changes
4. **Usar GitHub para gerenciar progresso** - Issues e PRs

## ⚠️ Considerações Críticas

### Lacunas Identificadas
1. **Build Configuration** - Vite precisa suportar múltiplos entry points
2. **Package.json Exports** - Configurar exports condicionais
3. **CSS Management** - Estratégia para Tailwind v4 com módulos
4. **Plugin System** - Conflito com registro global de componentes
5. **TypeScript Declarations** - Gerar tipos por módulo
6. **Features Globais** - $toast e $confirm dependem do plugin completo

## Estrutura Atual vs Proposta

### Atual
```
src/
├── components/    # 57 componentes com prefixo 'B'
├── utils/         # Utilitários compartilhados
└── index.ts       # Export único
```

### Proposta
```
src/
├── components/    # Manter intacto (compatibilidade)
├── modules/       # Nova estrutura modular
│   ├── core/      # Button, Icon, Spinner, Tag, etc.
│   ├── forms/     # Input, Select, Checkbox, etc.
│   ├── display/   # Table, Card, List, etc.
│   ├── feedback/  # Toast, Dialog, Alert, etc.
│   └── layout/    # Navbar, Sidebar, Grid, etc.
└── index.ts       # Exports híbridos

## Mapeamento de Componentes por Módulo

### Módulo Core (~12 componentes)
```
Button, Icon, Spinner, Tag, Badge, Avatar, 
Divider, Card, CardIcon, ActionCard, Tooltip, RoundButton
```

### Módulo Forms (~20 componentes)
```
Input, Select, MultiSelect, SmartSelect, AutoComplete,
Checkbox, Radio, RadioButton, Toggle, 
Slider, RangeSlider, ColorPicker, 
TagInput, TagSelect, DatePicker, Date
```

### Módulo Display (~8 componentes)
```
Table, MetricCard, ProgressBar, History,
StepOption, Stepper, Tab, Pagination
```

### Módulo Feedback (~7 componentes)
```
Alert, Toast, Dialog, Confirm, 
DateFilter, DateComparator, DateComparatorFilter
```

### Módulo Layout (~10 componentes)
```
Navbar, Sidebar, SideMenu, Menu, RoundMenu,
Breadcrumb, Dropdown, Collapse, ExpandableContainer,
Group, ContentScreen, SelectContainer, Profile, Filter, Crop
```

## Fluxo de Trabalho com GitHub

### 1. Setup Inicial
```bash
# Criar branch principal de migração
git checkout -b feat/modular-architecture

# Criar estrutura de diretórios
mkdir -p src/modules/{core,forms,display,feedback,layout}
```

### 2. GitHub Issues Template
```markdown
## Migração: [ComponentName]

**Módulo:** core/forms/display/feedback/layout
**Componente Original:** B[ComponentName]
**Prioridade:** P0/P1/P2

### Checklist
- [ ] Copiar componente para `modules/[modulo]/[ComponentName]`
- [ ] Remover prefixo 'B'
- [ ] Atualizar imports internos
- [ ] Adicionar export no módulo
- [ ] Testar compatibilidade
- [ ] Atualizar Storybook

### Notas
_Dependências, observações, etc._
```

### 3. Estratégia de PRs
- **1 PR por componente** - Facilita revisão e rollback
- **Branch naming:** `migrate/[module]/[component]`
- **Commit message:** `feat(migrate): move [Component] to [module]`

### 4. Compatibilidade

```typescript
// src/index.ts - Mantém tudo funcionando
export * from './components' // Exports atuais

// Novos exports modulares (opt-in)
export * as core from './modules/core'
export * as forms from './modules/forms'
export * as display from './modules/display'
export * as feedback from './modules/feedback'
export * as layout from './modules/layout'
```

## Configurações Necessárias

### 1. Vite Configuration (vite.config.ts)
```typescript
build: {
  lib: {
    entry: {
      main: path.resolve(__dirname, "src/index.ts"),
      core: path.resolve(__dirname, "src/modules/core/index.ts"),
      forms: path.resolve(__dirname, "src/modules/forms/index.ts"),
      display: path.resolve(__dirname, "src/modules/display/index.ts"),
      feedback: path.resolve(__dirname, "src/modules/feedback/index.ts"),
      layout: path.resolve(__dirname, "src/modules/layout/index.ts"),
    },
    formats: ["es", "cjs"],
  }
}
```

### 2. Package.json Exports
```json
{
  "exports": {
    ".": {
      "import": "./lib/main.es.js",
      "require": "./lib/main.cjs.js",
      "types": "./lib/main.d.ts"
    },
    "./core": {
      "import": "./lib/core.es.js",
      "require": "./lib/core.cjs.js",
      "types": "./lib/core.d.ts"
    },
    "./forms": {
      "import": "./lib/forms.es.js",
      "require": "./lib/forms.cjs.js",
      "types": "./lib/forms.d.ts"
    }
    // ... outros módulos
  }
}
```

### 3. CSS Strategy
```typescript
// Opção 1: CSS único (recomendado inicialmente)
// src/modules/core/index.ts
import '../../assets/main.css' // Importa CSS completo

// Opção 2: CSS modular (futuro)
// src/modules/core/styles.css
@import "tailwindcss"; // Apenas classes usadas no módulo
```

## Dependências Entre Componentes

### Análise de Dependências
Apenas 8 componentes têm dependências de outros:
- **Alert** → Icon
- **Button** → Spinner
- **Confirm** → Button, Dialog
- **Input** → Icon
- **Toast** → Alert, Icon
- **Radio/RadioButton** → Group (types)
- **Dropdown** → Item, Items (internos)

### Ordem de Migração por Dependência
1. **Icon** (sem dependências)
2. **Spinner** (sem dependências)
3. **Group** (sem dependências, exporta types)
4. **Button** (depende de Spinner)
5. **Alert** (depende de Icon)
6. **Dialog** (sem dependências)
7. **Input** (depende de Icon)
8. **Toast** (depende de Alert, Icon)
9. **Confirm** (depende de Button, Dialog)

## Fases de Implementação

### Fase 0: Validação Técnica (3-5 dias)
1. Testar configuração multi-entry do Vite
2. Validar exports do package.json
3. Testar tree-shaking em app exemplo
4. Decidir estratégia de CSS

### Fase 1: Proof of Concept (1-2 semanas)

#### Componentes Piloto (ordem ajustada)
1. **Icon** (core) - Sem dependências
2. **Button** (core) - Depende de Spinner (migrar Spinner junto)
3. **Input** (forms) - Depende de Icon

#### Tarefas
```bash
# Criar Issues no GitHub
- [ ] Issue: Setup estrutura modular
- [ ] Issue: Migrar Button para core
- [ ] Issue: Migrar Input para forms
- [ ] Issue: Migrar Card para core
- [ ] Issue: Validar tree-shaking
```

#### Validação
```typescript
// test-app/main.js
// Deve importar APENAS Button, não todo o DS
import { Button } from '@BRIUS/design-system/core'
```

### Fase 2: Migração Core (2-3 semanas)

Ordem ajustada por dependência:
1. Icon, Spinner (sem dependências)
2. Button (depende de Spinner)
3. Tag, Badge, Avatar, Divider
4. Card, CardIcon, ActionCard
5. Tooltip, RoundButton

### Fase 3: Migração Incremental (2-3 meses)

Priorizar por:
- **Uso frequente** - Componentes mais importados
- **Dependências** - Resolver bloqueios primeiro
- **Simplicidade** - Fáceis primeiro, complexos depois

### Script de Migração Atualizado

```bash
#!/bin/bash
# migrate.sh
COMPONENT=$1
MODULE=$2

# Ex: ./migrate.sh Button core

# 1. Criar estrutura
mkdir -p src/modules/$MODULE/$COMPONENT

# 2. Copiar arquivos
cp -r src/components/B$COMPONENT/* src/modules/$MODULE/$COMPONENT/

# 3. Instruções manuais
echo "📝 TODO:"
echo "1. Renomear B$COMPONENT para $COMPONENT em todos arquivos"
echo "2. Atualizar imports:"
echo "   - BIcon → Icon"
echo "   - BSpinner → Spinner"
echo "   - Remover registro global (app.component)"
echo "3. Adicionar export em src/modules/$MODULE/index.ts"
echo "4. Manter compatibilidade em src/components/B$COMPONENT/index.ts:"
echo "   export { $COMPONENT as default } from '../../modules/$MODULE/$COMPONENT'"
echo "5. Criar PR: migrate/$MODULE/$COMPONENT"
```

### Validação de Tree-Shaking

```bash
#!/bin/bash
# test-tree-shaking.sh

# 1. Build biblioteca
npm run build

# 2. Criar app teste
mkdir -p test-tree-shaking
cd test-tree-shaking
npm init -y
npm install ../ vite

# 3. Criar teste
cat > main.js << EOF
// Importar apenas Button
import { Button } from '@BRIUS/design-system/core'
console.log('Button imported:', Button)
EOF

# 4. Build e analisar
npx vite build --mode production

# 5. Verificar tamanho
echo "Bundle size:"
ls -lh dist/assets/*.js
```

## Exemplo Prático de Migração

### 1. Criar Issue
```markdown
Title: Migrate Button to core module

## Description
Migrar BButton para módulo core como Button

## Tasks
- [ ] Copiar arquivos para src/modules/core/Button
- [ ] Remover prefixo 'B'
- [ ] Atualizar imports (BIcon → Icon, BSpinner → Spinner)
- [ ] Adicionar export em modules/core/index.ts
- [ ] Testar no Storybook
- [ ] Verificar compatibilidade

## Dependencies
- Migrar Icon primeiro
- Migrar Spinner primeiro
```

### 2. Implementação
```typescript
// src/modules/core/Button/index.ts
export { default as Button } from './Button.vue'

// src/modules/core/index.ts
export * from './Button'
export * from './Icon'
export * from './Spinner'
```

### 3. Manter Compatibilidade
```typescript
// src/components/BButton/index.ts
// Re-exportar do novo local mantendo nome antigo
export { Button as default } from '../../modules/core/Button'
```

## Métricas de Sucesso

### O que medir
1. **Bundle size** - Antes vs depois em app exemplo
2. **Tree-shaking** - Importar 1 componente não deve trazer todos
3. **Compatibilidade** - Zero breaking changes reportados
4. **Adoção** - % de projetos usando imports modulares

### Como validar
```bash
# Criar app de teste
npm create vite@latest test-app -- --template vue-ts
cd test-app
npm link ../design-system

# Testar import antigo (deve funcionar)
import { BButton } from '@BRIUS/design-system'

# Testar import novo (deve ser menor)
import { Button } from '@BRIUS/design-system/core'

# Build e comparar tamanhos
npm run build
```

## GitHub Projects Setup

### Kanban Board
```
TODO | IN PROGRESS | REVIEW | DONE
```

### Labels
- `migration` - Todas issues de migração
- `module:core` - Componentes do módulo core
- `module:forms` - Componentes do módulo forms
- `module:display` - Componentes do módulo display
- `module:feedback` - Componentes do módulo feedback
- `module:layout` - Componentes do módulo layout
- `priority:p0` - Bloqueadores
- `priority:p1` - Alta prioridade
- `priority:p2` - Baixa prioridade

### Milestones
1. **POC Complete** - Button, Input, Card migrados
2. **Core Module** - Todos componentes core
3. **Forms Module** - Todos componentes forms
4. **Full Migration** - Todos componentes

## Cuidados Especiais

### Features Globais
```typescript
// Manter no plugin principal, NÃO nos módulos
app.config.globalProperties.$confirm = confirm
app.config.globalProperties.$toast = toast
```

### Registro de Componentes
```typescript
// Módulos NÃO devem registrar globalmente
// ❌ Errado
app.component('Button', Button)

// ✅ Correto
export { Button }
```

### Compatibilidade com Storybook
```typescript
// Atualizar imports nas stories após migração
// De: import BButton from '../BButton/BButton.vue'
// Para: import { Button } from '../../modules/core'
```

## Próximos Passos

### Imediato (Esta semana)
1. **Validar Build Multi-Entry**
   ```bash
   # Criar teste simples
   echo "export const test = 'test'" > src/modules/test.ts
   # Ajustar vite.config.ts
   # npm run build
   ```
2. Criar branch `feat/modular-architecture`
3. Setup estrutura de diretórios
4. Testar package.json exports

### Curto prazo (2 semanas)
1. Completar POC com Button, Input, Card
2. Validar tree-shaking funciona
3. Documentar processo
4. Decidir continuar ou ajustar

### Médio prazo (1-3 meses)
1. Migração incremental por prioridade
2. Manter compatibilidade sempre
3. Documentar conforme avança
4. Release quando estiver maduro

## Recursos e Referências

### Comandos Úteis
```bash
# Verificar tamanho do bundle
npm run build -- --report

# Analisar dependências
npx madge --circular src/

# Testar localmente
npm link
cd test-app && npm link @BRIUS/design-system
```

### Estrutura de Arquivos Final
```
modules/core/Button/
├── Button.vue         # Componente (sem prefixo B)
├── Button.stories.ts  # Stories do Storybook
└── index.ts          # Export simples

modules/core/index.ts
export * from './Button'
export * from './Icon'
// etc...
```

### Template de PR
```markdown
## Migração: [Component] para [module]

### Mudanças
- Movido de `components/B[Component]` para `modules/[module]/[Component]`
- Removido prefixo 'B'
- Atualizado imports

### Checklist
- [ ] Componente funciona no Storybook
- [ ] Import antigo ainda funciona
- [ ] Import novo funciona
- [ ] Sem breaking changes

### Como testar
```ts
// Deve continuar funcionando
import { B[Component] } from '@BRIUS/design-system'

// Novo import
import { [Component] } from '@BRIUS/design-system/[module]'
```
```
