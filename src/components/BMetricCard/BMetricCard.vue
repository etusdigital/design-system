<script setup lang="ts">
type Info = 'default' | 'sample' | 'primary' | 'info' | 'success' | 'danger' | 'warning';

const props = withDefaults(defineProps<{
    title?: string;
    description?: string | number;
    value?: string | number;
    icon?: string;
    color?: string;
    type?: 'default' | 'success' | 'danger' | 'sample' | 'card';
    size?: 'small' | 'medium' | 'large';
    infoMessage?: string;
    infoType?: Info;
    tooltipMinWidth?: string;
    loading?: boolean;
    noTooltip?: boolean;
    boldTitle?: boolean;
}>(), {
    title: '',
    description: '',
    value: '',
    icon: '',
    color: '',
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
    <BCard class="b-metric-card" :class="[type, size]">
        <div class="flex gap-xxs items-center" v-if="(title || icon || $slots['title-slot']) && !loading">
            <BIcon class="icon" :name="icon" v-if="icon" />
            <slot name="title-slot">
                <p class="card-title" :class="{'font-bold': boldTitle}">{{ title }}</p>
            </slot>
            <slot name="info">
                <template v-if="infoMessage">
                    <BTooltip v-if="!noTooltip">
                        <template #text>
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
                        <BIcon name="info" class="info-icon info-label" :class="[infoType]" />
                    </BTooltip>
                    <p class="info-text info-label" :class="[infoType]" v-else>{{ infoMessage }}</p>

                </template>
            </slot>
        </div>
        <div class="skeleton-div header" v-else-if="loading" />
        <slot name="content" v-if="!loading">
            <div class="flex items-end gap-xs">
                <slot name="value-slot">
                    <p class="card-value" :class="{'colored-text': color}">{{ value }}</p>
                </slot>
                <slot name="description-slot">
                    <p class="card-description">{{ description }}</p>
                </slot>
            </div>
        </slot>
        <div class="skeleton-div content" v-else />
        <slot v-if="!loading" />
    </BCard>
</template>

<style scoped>
.b-metric-card {
    @apply flex flex-col gap-xs p-sm text-neutral-interaction-default bg-neutral-surface-default border-xs border-neutral-default shadow-none;
}

.b-metric-card.success {
    @apply text-success-foreground-low border-success-default bg-success-surface-default;

    *.info-label {
        @apply text-success-interaction-default;
    }
}

.b-metric-card.danger {
    @apply text-danger-foreground-low border-danger-default bg-danger-surface-default;

    *.info-label {
        @apply text-danger-interaction-default;
    }
}

.b-metric-card.sample {
    @apply text-informative-foreground-high border-informative-default border-dashed;

    *.info-label {
        @apply text-informative-foreground-high;
    }
}

.b-metric-card.card {
    @apply shadow-neutral-default border-none;

    .card-value.colored-text {
        color: v-bind(color);
    }

    .card-title {
        @apply font-bold;
    }
}

.b-metric-card.small {
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

    .skeleton-div.header {
        @apply h-[12px];
    }

    .skeleton-div.content {
        @apply h-[16px];
    }
}

.b-metric-card.medium {
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

    .skeleton-div.header {
        @apply h-[14px];
    }

    .skeleton-div.content {
        @apply h-[18px];
    }
}

.b-metric-card.large {
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

    .skeleton-div.header {
        @apply h-[14px];
    }

    .skeleton-div.content {
        @apply h-[20px];
    }
}

.info-icon {
	@apply h-[1em] flex items-center;
}

.info-text {
	@apply font-bold ml-xxs;
}

.info-label {
	@apply text-neutral-interaction-default;
}

.info-label.sample {
    @apply text-informative-interaction-default;
}

.info-label.primary {
    @apply text-primary-interaction-default;
}

.info-label.info {
    @apply text-informative-interaction-default;
}

.info-label.success {
    @apply text-success-interaction-default;
}

.info-label.warning {
    @apply text-warning-interaction-default;
}

.info-label.danger {
    @apply text-danger-interaction-default;
}

.tooltip-text {
	@apply text-xs;
}

.card-value {
    @apply font-bold;
}

.skeleton-div {
    @apply bg-neutral-surface-disabled bg-gradient-to-r from-transparent via-white to-transparent;
    background-size: 200% 100%;
    animation: moveBar 1.5s linear infinite;
}

.skeleton-div.header {
    @apply w-[3em] mb-xs;
}

.skeleton-div.content {
    @apply w-full min-w-[8em];
}

@keyframes moveBar {
    0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
</style>