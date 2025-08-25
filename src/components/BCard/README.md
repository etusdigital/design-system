# BCard Component

O componente BCard é um container flexível para agrupar conteúdo relacionado com suporte a cabeçalho, conteúdo e rodapé.

## Uso Básico

### Com Props

```vue
<template>
	<BCard
		title="Título do Card"
		subtitle="Subtítulo opcional"
		variant="elevated">
		<p>Conteúdo do card</p>
	</BCard>
</template>
```

### Com Sub-componentes

```vue
<template>
	<BCard>
		<BCardHeader>
			<BCardTitle>Título Customizado</BCardTitle>
			<BCardSubtitle>Subtítulo Customizado</BCardSubtitle>
		</BCardHeader>
		<BCardContent>
			<p>Conteúdo do card com mais controle sobre o layout</p>
		</BCardContent>
		<BCardFooter>
			<BButton>Ação</BButton>
		</BCardFooter>
	</BCard>
</template>
```

### Com Slots

```vue
<template>
	<BCard>
		<template #header>
			<div class="custom-header">
				<!-- Conteúdo customizado do header -->
			</div>
		</template>

		<p>Conteúdo principal</p>

		<template #footer>
			<div class="custom-footer">
				<!-- Conteúdo customizado do footer -->
			</div>
		</template>
	</BCard>
</template>
```

## Props

### BCard

| Prop        | Tipo                                             | Padrão       | Descrição                  |
| ----------- | ------------------------------------------------ | ------------ | -------------------------- |
| `variant`   | `'elevated' \| 'outlined' \| 'filled' \| 'flat'` | `'elevated'` | Estilo visual do card      |
| `padding`   | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'`         | `'md'`       | Tamanho do padding interno |
| `shadow`    | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'`         | `'sm'`       | Intensidade da sombra      |
| `radius`    | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'`       | `'md'`       | Arredondamento das bordas  |
| `clickable` | `boolean`                                        | `false`      | Torna o card clicável      |
| `disabled`  | `boolean`                                        | `false`      | Desabilita interações      |
| `title`     | `string`                                         | -            | Título do card             |
| `subtitle`  | `string`                                         | -            | Subtítulo do card          |
| `className` | `string`                                         | -            | Classes CSS adicionais     |

### Sub-componentes

- **BCardHeader**: Container para o cabeçalho
- **BCardTitle**: Título formatado
- **BCardSubtitle**: Subtítulo formatado
- **BCardContent**: Container para o conteúdo principal
- **BCardFooter**: Container para o rodapé

## Variantes

### Elevated (Padrão)

Card com sombra e elevação visual.

```vue
<BCard variant="elevated">
  <p>Card com elevação</p>
</BCard>
```

### Outlined

Card com borda definida sem sombra.

```vue
<BCard variant="outlined">
  <p>Card com borda</p>
</BCard>
```

### Filled

Card com background preenchido.

```vue
<BCard variant="filled">
  <p>Card preenchido</p>
</BCard>
```

### Flat

Card sem borda ou sombra.

```vue
<BCard variant="flat">
  <p>Card flat</p>
</BCard>
```

## Cards Interativos

### Card Clicável

```vue
<template>
	<BCard
		clickable
		@click="handleClick"
		title="Card Clicável">
		<p>Clique em qualquer lugar do card</p>
	</BCard>
</template>

<script setup>
	const handleClick = () => {
		console.log("Card clicado!");
	};
</script>
```

### Card Desabilitado

```vue
<BCard clickable disabled title="Card Desabilitado">
  <p>Este card está desabilitado</p>
</BCard>
```

## Exemplos Avançados

### Card de Perfil de Usuário

```vue
<template>
	<BCard
		variant="outlined"
		padding="none">
		<template #header>
			<div class="flex items-center gap-3 p-4 bg-gray-50">
				<BAvatar
					src="https://example.com/avatar.jpg"
					size="lg" />
				<div>
					<h3 class="font-semibold">João Silva</h3>
					<p class="text-sm text-gray-500">Desenvolvedor Frontend</p>
				</div>
			</div>
		</template>

		<BCardContent class="p-4">
			<p>Especialista em Vue.js e design systems.</p>
		</BCardContent>

		<BCardFooter class="bg-gray-50">
			<div class="flex gap-2">
				<BButton
					variant="secondary"
					size="sm"
					>Mensagem</BButton
				>
				<BButton size="sm">Seguir</BButton>
			</div>
		</BCardFooter>
	</BCard>
</template>
```

### Card de Produto

```vue
<template>
	<BCard
		clickable
		@click="goToProduct"
		class="hover:shadow-lg transition-shadow">
		<template #header>
			<img
				src="product.jpg"
				alt="Produto"
				class="w-full h-48 object-cover -m-4 mb-4" />
		</template>

		<BCardTitle>Nome do Produto</BCardTitle>
		<BCardSubtitle>R$ 99,90</BCardSubtitle>

		<BCardContent>
			<p class="text-sm">Descrição breve do produto...</p>
		</BCardContent>

		<template #footer>
			<BButton class="w-full"> Adicionar ao Carrinho </BButton>
		</template>
	</BCard>
</template>
```

## Composable useCard

Para casos mais complexos, você pode usar o composable `useCard`:

```vue
<template>
	<article
		:class="cardClasses"
		v-bind="cardProps">
		<!-- Conteúdo customizado -->
	</article>
</template>

<script setup>
	import { useCard } from "@/composables/useCard";

	const props = defineProps({
		variant: String,
		clickable: Boolean,
		disabled: Boolean,
	});

	const { cardClasses, cardProps, isInteractive } = useCard(props);
</script>
```

## Acessibilidade

- Cards clicáveis recebem `role="button"` e `tabindex="0"`
- Cards desabilitados recebem `aria-disabled="true"`
- Use elementos semânticos apropriados dentro do card
- Forneça textos alternativos para imagens
- Mantenha uma hierarquia de cabeçalhos consistente

## Boas Práticas

1. **Use a variante apropriada**: Escolha a variante que melhor se adequa ao contexto
2. **Seja consistente**: Mantenha o mesmo estilo de cards em toda a aplicação
3. **Conteúdo conciso**: Cards devem apresentar informações de forma clara e direta
4. **Ações claras**: Se o card é clicável, deixe isso visualmente claro
5. **Responsividade**: Teste os cards em diferentes tamanhos de tela
