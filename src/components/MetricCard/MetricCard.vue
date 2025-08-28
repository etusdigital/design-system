<script setup lang="ts">
type Color = 'primary' | 'informative' | 'success' | 'warning' | 'danger' | 'neutral';

const props = withDefaults(defineProps<{
    title?: string;
    description?: string | number;
    value?: string | number;
    icon?: string;
    color?: Color;
    type?: 'default' | 'dashed' | 'card';
    size?: 'small' | 'medium' | 'large';
    infoMessage?: string;
    infoType?: Color;
    tooltipMinWidth?: string;
    loading?: boolean;
    noTooltip?: boolean;
    boldTitle?: boolean;
}>(), {
    title: '',
    description: '',
    value: '',
    icon: '',
    color: 'neutral',
    type: 'default',
    size: 'medium',
    infoMessage: '',
    infoType: 'primary',
    tooltipMinWidth: 'none',
    loading: false,
    noTooltip: false,
    boldTitle: false,
});
</script>

<template>
    <Card class="metric-card" :class="[type, color, size]">
        <div class="flex gap-xxs items-center" v-if="(title || icon || $slots['title-slot']) && !loading">
            <Icon class="icon" :name="icon" v-if="icon" />
            <slot name="title-slot">
                <p class="card-title" :class="{'font-bold': boldTitle}">{{ title }}</p>
            </slot>
            <slot name="info">
                <template v-if="infoMessage">
                    <Tooltip v-if="!noTooltip">
                        <template #label>
                            <div
                                class="tooltip-text"
                                :class="{
                                    'whitespace-nowrap break-words text-wrap': tooltipMinWidth != 'none',
                                }"
                                :style="{ minWidth: tooltipMinWidth }"
                            >
                                {{ infoMessage }}
                            </div>
                        </template>
                        <Icon name="info" class="info-icon info-label" :class="[infoType]" />
                    </Tooltip>
                    <p class="info-text info-label" :class="[infoType]" v-else>{{ infoMessage }}</p>
                </template>
            </slot>
        </div>
        <Skeleton class="header" v-else-if="loading" />
        <slot name="content" v-if="!loading">
            <div class="flex items-end gap-xs">
                <slot name="value-slot">
                    <p class="card-value">{{ value }}</p>
                </slot>
                <slot name="description-slot">
                    <p class="card-description">{{ description }}</p>
                </slot>
            </div>
        </slot>
        <Skeleton class="content" v-else />
        <slot v-if="!loading" />
    </Card>
</template>

<style scoped>
@reference "../../assets/main.css";

.metric-card {
    @apply flex flex-col gap-xs p-sm text-neutral-interaction-default bg-neutral-surface-default border-xs border-neutral-default shadow-none;
}

.metric-card.primary {
    @apply text-primary-foreground-low border-primary-default bg-primary-surface-default;

    *.info-label {
        @apply text-primary-interaction-default;
    }
}

.metric-card.info {
    @apply text-informative-foreground-low border-informative-default bg-informative-surface-default;

    *.info-label {
        @apply text-informative-interaction-default;
    }
}

.metric-card.success {
    @apply text-success-foreground-low border-success-default bg-success-surface-default;

    *.info-label {
        @apply text-success-interaction-default;
    }
}

.metric-card.warning {
    @apply text-warning-foreground-low border-warning-default bg-warning-surface-default;

    *.info-label {
        @apply text-warning-interaction-default;
    }
}

.metric-card.danger {
    @apply text-danger-foreground-low border-danger-default bg-danger-surface-default;

    *.info-label {
        @apply text-danger-interaction-default;
    }
}

*.metric-card.dashed {
    @apply border-dashed bg-transparent;
}

*.metric-card.card {
    @apply shadow-neutral-default text-neutral-interaction-default bg-transparent border-none;

    .card-title {
        @apply font-bold;
    }
}

.metric-card.card.primary .card-value, .info-label.primary {
    @apply text-primary-interaction-default;
}

.metric-card.card.info .card-value, .info-label.info {
    @apply text-informative-interaction-default;
}

.metric-card.card.success .card-value, .info-label.success {
    @apply text-success-interaction-default;
}

.metric-card.card.warning .card-value, .info-label.warning {
    @apply text-warning-interaction-default;
}

.metric-card.card.danger .card-value, .info-label.danger {
    @apply text-danger-interaction-default;
}

.metric-card.small {
    @apply px-sm py-xs gap-0;

    .card-title {
        @apply text-xxs;
    }

    .card-value {
        @apply text-lg;
    }

    .card-description, .icon {
        @apply text-xs;
    }

    .info-icon {
        @apply text-base;
    }

    .info-text {
        @apply text-xxs;
    }

    .tooltip-text {
        @apply text-xxs;
    }

    .skeleton.header {
        @apply h-sm;
    }

    .skeleton.content {
        @apply h-base;
    }
}

.metric-card.medium {
    .card-title {
        @apply text-xs;
    }

    .card-value {
        @apply text-xl;
    }

    .card-description, .icon {
        @apply text-sm;
    }

    .info-icon {
        @apply text-lg;
    }

    .info-text {
        @apply text-xxs;
    }

    .skeleton.header {
        @apply h-sm;
    }

    .skeleton.content {
        @apply h-base;
    }
}

.metric-card.large {
    .card-title {
        @apply text-sm;
    }

    .card-value {
        @apply text-2xl;
    }

    .card-description {
        @apply text-sm;
    }

    .icon {
        @apply text-base;
    }

    .info-icon {
        @apply text-xl;
    }

    .info-text {
        @apply text-xs;
    }

    .skeleton.header {
        @apply h-sm;
    }

    .skeleton.content {
        @apply h-lg;
    }
}

.info-icon {
	@apply flex items-center;
}

.info-text {
	@apply font-bold ml-xxs;
}

.info-label {
	@apply text-neutral-interaction-default;
}

.tooltip-text {
	@apply text-xs;
}

.card-value {
    @apply font-bold;
}

.skeleton.header {
    @apply w-[30%] h-xs;
}

.skeleton.content {
    @apply w-full min-w-9xl;
}
</style>