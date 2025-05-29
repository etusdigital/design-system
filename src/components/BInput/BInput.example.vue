<template>
	<div class="example-container">
		<h1>BInput Component - Correções Implementadas</h1>

		<section>
			<h2>1. Tag Input (Nova Funcionalidade)</h2>
			<BInput
				v-model="tagValue"
				v-model:tags="tags"
				type="tag"
				label-value="Tags"
				placeholder="Digite tags..."
				tag-placeholder="Adicionar tag..."
				size="base"
				:max-tags="5"
				info-message="Pressione Enter para adicionar uma tag" />

			<BInput
				v-model="tagValueError"
				v-model:tags="tagsError"
				type="tag"
				label-value="Tags com Erro"
				placeholder="Digite tags..."
				:is-error="true"
				error-message="Máximo de 3 tags permitidas"
				size="base" />
		</section>

		<section>
			<h2>2. Estado Completed</h2>
			<BInput
				v-model="completedValue"
				label-value="Campo Completo"
				placeholder="Digite algo..."
				:is-completed="completedValue.length > 0"
				size="base" />
		</section>

		<section>
			<h2>3. Tipografia Corrigida (14px, Poppins/Inter)</h2>
			<BInput
				v-model="typographyValue"
				label-value="Texto com Tipografia Correta"
				placeholder="Fonte em 14px com var(--font-sans)"
				info-message="Helper text com font-weight: 500"
				size="base"
				:max="20" />
		</section>

		<section>
			<h2>4. Altura Fixa (40px)</h2>
			<div class="flex gap-xs">
				<BInput
					v-model="heightValue1"
					placeholder="Input padrão"
					size="sm" />
				<BInput
					v-model="heightValue2"
					placeholder="Com ícone"
					icon="search"
					size="sm" />
			</div>
		</section>

		<section>
			<h2>5. Cores do Tema Corretas</h2>
			<div class="space-y-xs">
				<BInput
					v-model="themeValue1"
					label-value="Estado Normal"
					placeholder="Cores neutras..."
					size="base" />

				<BInput
					v-model="themeValue2"
					label-value="Estado Hover"
					placeholder="Hover para ver borda primária..."
					info-message="Borda muda no hover"
					size="base" />

				<BInput
					v-model="themeValue3"
					label-value="Estado Focus"
					placeholder="Clique para ver focus..."
					info-message="Box shadow primário no focus"
					size="base" />
			</div>
		</section>

		<section>
			<h2>6. Todos os Estados</h2>
			<div class="grid grid-cols-2 gap-base">
				<BInput
					v-model="stateDefault"
					label-value="Default"
					placeholder="Estado padrão"
					size="base" />

				<BInput
					v-model="stateCompleted"
					label-value="Completed"
					placeholder="Campo preenchido"
					:is-completed="true"
					size="base" />

				<BInput
					v-model="stateError"
					label-value="Error"
					placeholder="Com erro"
					:is-error="true"
					error-message="Campo obrigatório"
					size="base" />

				<BInput
					v-model="stateDisabled"
					label-value="Disabled"
					placeholder="Desabilitado"
					:disabled="true"
					size="base" />
			</div>
		</section>

		<section>
			<h2>7. Tag Input - Diferentes Estados</h2>
			<div class="space-y-base">
				<BInput
					type="tag"
					label-value="Tags Disabled"
					:tags="[
						{ id: 1, label: 'Vue.js', color: 'neutral' },
						{ id: 2, label: 'React', color: 'neutral' },
					]"
					:disabled="true"
					size="base" />

				<BInput
					type="tag"
					label-value="Tags com Cores"
					:tags="mixedTags"
					@remove-tag="handleRemoveTag"
					size="base" />
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import BInput, { type Tag } from "./BInput.vue";

	// Tag input
	const tagValue = ref("");
	const tags = ref<Tag[]>([
		{ id: 1, label: "JavaScript", color: "neutral" },
		{ id: 2, label: "TypeScript", color: "neutral" },
	]);

	const tagValueError = ref("");
	const tagsError = ref<Tag[]>([]);
	const tagsWithError = ref<Tag[]>([
		{ id: 1, label: "Tag 1", color: "neutral" },
		{ id: 2, label: "Tag 2", color: "neutral" },
		{ id: 3, label: "Tag 3", color: "red" },
	]);

	// Other states
	const completedValue = ref("Valor preenchido");
	const typographyValue = ref("");
	const heightValue1 = ref("");
	const heightValue2 = ref("");
	const themeValue1 = ref("");
	const themeValue2 = ref("");
	const themeValue3 = ref("");

	// All states
	const stateDefault = ref("");
	const stateCompleted = ref("Tarefa concluída");
	const stateError = ref("");
	const stateDisabled = ref("Valor desabilitado");

	// Mixed tags
	const mixedTags = ref<Tag[]>([
		{ id: 1, label: "Normal", color: "neutral", removable: true },
		{ id: 2, label: "Erro", color: "red", removable: true },
		{ id: 3, label: "Fixo", color: "neutral", removable: false },
	]);

	function handleRemoveTag(tag: Tag) {
		console.log("Tag removida:", tag);
	}
</script>

<style scoped>
	.example-container {
		padding: var(--spacing-2xl);
		max-width: 1200px;
		margin: 0 auto;
	}

	h1 {
		margin-bottom: var(--spacing-2xl);
		color: var(--color-neutral-foreground-high);
	}

	h2 {
		margin-bottom: var(--spacing-lg);
		color: var(--color-neutral-foreground-high);
		font-size: var(--font-size-lg);
	}

	section {
		margin-bottom: var(--spacing-3xl);
		padding: var(--spacing-xl);
		background: var(--color-neutral-surface-default);
		border-radius: var(--border-radius-base);
		border: var(--border-width-xxs) solid var(--color-neutral-border-default);
	}

	.space-y-xs > * + * {
		margin-top: var(--spacing-xs);
	}

	.space-y-base > * + * {
		margin-top: var(--spacing-base);
	}

	.grid {
		display: grid;
	}

	.grid-cols-2 {
		grid-template-columns: repeat(2, 1fr);
	}

	.gap-xs {
		gap: var(--spacing-xs);
	}

	.gap-base {
		gap: var(--spacing-base);
	}

	.flex {
		display: flex;
	}
</style>
