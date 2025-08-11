<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { useAriaAttributes, useScreenReader, useFocusTrap } from "#composables";
import BButton from '../BButton/BButton.vue';
import BDialog from '../BDialog/BDialog.vue';
import event from '#utils/event';

/**
 * Confirmation dialog options
 */
export interface BConfirmOptions {
    /** Title of the dialog */
    title?: string;
    /** Message to display */
    message?: string;
    /** Text for the accept button */
    acceptText?: string;
    /** Text for the cancel button */
    cancelText?: string;
    /** Color of the confirm button */
    confirmColor?: "primary" | "danger" | "warning" | "success";
    /** Variant of the confirm button */
    confirmVariant?: "default" | "secondary" | "plain" | "reverse";
    /** Color of the cancel button */
    cancelColor?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
    /** Variant of the cancel button */
    cancelVariant?: "default" | "secondary" | "plain" | "reverse";
    /** Whether the dialog can be closed by clicking outside */
    allowOutsideClose?: boolean;
    /** Whether to show the cancel button */
    showCancel?: boolean;
    /** Custom ARIA label for the dialog */
    ariaLabel?: string;
    /** Custom ARIA description */
    ariaDescription?: string;
    /** Icon to display in the dialog */
    icon?: string;
    /** Auto-focus target: 'confirm' | 'cancel' | 'none' */
    autoFocus?: 'confirm' | 'cancel' | 'none';
    /** Callback for confirmation */
    onConfirm?: () => boolean | void | Promise<boolean | void>;
    /** Callback for cancellation */
    onCancel?: (reason: 'cancel' | 'escape' | 'outside') => boolean | void;
}

/**
 * Props for the BConfirm component
 */
export interface BConfirmProps {
    /** Whether the dialog is visible (v-model) */
    modelValue?: boolean;
    /** Title of the dialog */
    title?: string;
    /** Message to display */
    message?: string;
    /** Text for the accept button */
    acceptText?: string;
    /** Text for the cancel button */
    cancelText?: string;
    /** Color of the confirm button */
    confirmColor?: "primary" | "danger" | "warning" | "success";
    /** Variant of the confirm button */
    confirmVariant?: "default" | "secondary" | "plain" | "reverse";
    /** Color of the cancel button */
    cancelColor?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
    /** Variant of the cancel button */
    cancelVariant?: "default" | "secondary" | "plain" | "reverse";
    /** Whether the dialog can be closed by clicking outside */
    allowOutsideClose?: boolean;
    /** Whether to show the cancel button */
    showCancel?: boolean;
    /** Custom ARIA label for the dialog */
    ariaLabel?: string;
    /** Custom ARIA description */
    ariaDescription?: string;
    /** Icon to display in the dialog */
    icon?: string;
    /** Auto-focus target */
    autoFocus?: 'confirm' | 'cancel' | 'none';
    /** Loading state for async operations */
    loading?: boolean;
}

const props = withDefaults(
    defineProps<BConfirmProps>(),
    {
        modelValue: false,
        title: "Confirm Action",
        message: "Are you sure you want to proceed?",
        acceptText: "Confirm",
        cancelText: "Cancel",
        confirmColor: "primary",
        confirmVariant: "default",
        cancelColor: "neutral",
        cancelVariant: "plain",
        allowOutsideClose: false,
        showCancel: true,
        ariaLabel: "",
        ariaDescription: "",
        icon: "",
        autoFocus: "cancel",
        loading: false,
    }
);

/**
 * Events emitted by the BConfirm component
 */
interface BConfirmEmits {
    "update:modelValue": [value: boolean];
    "confirm": [];
    "cancel": [reason: 'cancel' | 'escape' | 'outside'];
    "open": [];
    "close": [];
}

const emit = defineEmits<BConfirmEmits>();

// Accessibility composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

// Component state
const dialogRef = ref<InstanceType<typeof BDialog>>();
const confirmButtonRef = ref<InstanceType<typeof BButton>>();
const cancelButtonRef = ref<InstanceType<typeof BButton>>();
const isProcessing = ref(false);

// Event system state for backwards compatibility
const eventTitle = ref('');
const eventMessage = ref('');
const eventAcceptText = ref('');
const eventCancelText = ref('');
const eventConfirmColor = ref<"primary" | "danger" | "warning" | "success">("primary");
const eventConfirmVariant = ref<"default" | "secondary" | "plain" | "reverse">("default");
const eventCancelColor = ref<"primary" | "info" | "success" | "warning" | "danger" | "neutral">("neutral");
const eventCancelVariant = ref<"default" | "secondary" | "plain" | "reverse">("plain");
const eventAllowOutsideClose = ref(false);
const eventShowCancel = ref(true);
const eventAriaLabel = ref('');
const eventAriaDescription = ref('');
const eventIcon = ref('');
const eventAutoFocus = ref<'confirm' | 'cancel' | 'none'>('cancel');
const visible = ref(false);
const onConfirm = ref<(() => boolean | void | Promise<boolean | void>) | undefined>();
const onCancel = ref<((reason: 'cancel' | 'escape' | 'outside') => boolean | void) | undefined>();

// Generate unique IDs for ARIA relationships
const dialogId = useAriaId('confirm-dialog');
const titleId = useAriaId('confirm-title');
const messageId = useAriaId('confirm-message');

// Computed properties
const displayTitle = computed(() => eventTitle.value || props.title);
const displayMessage = computed(() => eventMessage.value || props.message);
const displayAcceptText = computed(() => eventAcceptText.value || props.acceptText);
const displayCancelText = computed(() => eventCancelText.value || props.cancelText);
const displayConfirmColor = computed(() => eventConfirmColor.value || props.confirmColor);
const displayConfirmVariant = computed(() => eventConfirmVariant.value || props.confirmVariant);
const displayCancelColor = computed(() => eventCancelColor.value || props.cancelColor);
const displayCancelVariant = computed(() => eventCancelVariant.value || props.cancelVariant);
const displayAllowOutsideClose = computed(() => eventAllowOutsideClose.value || props.allowOutsideClose);
const displayShowCancel = computed(() => eventShowCancel.value && props.showCancel);
const displayAriaLabel = computed(() => eventAriaLabel.value || props.ariaLabel || `${displayTitle.value} confirmation dialog`);
const displayAriaDescription = computed(() => eventAriaDescription.value || props.ariaDescription || displayMessage.value);
const displayIcon = computed(() => eventIcon.value || props.icon);
const displayAutoFocus = computed(() => eventAutoFocus.value || props.autoFocus);

const isVisible = computed({
    get: () => props.modelValue || visible.value,
    set: (value: boolean) => {
        if (props.modelValue !== undefined) {
            emit('update:modelValue', value);
        } else {
            visible.value = value;
        }
    }
});

const isLoading = computed(() => props.loading || isProcessing.value);

/**
 * Handle confirmation action
 */
async function handleConfirm(): Promise<void> {
    if (isLoading.value) return;
    
    try {
        isProcessing.value = true;
        
        // Execute callback and check result
        let shouldClose = true;
        if (onConfirm.value) {
            const result = await onConfirm.value();
            if (result === false) {
                shouldClose = false;
            }
        }
        
        if (shouldClose) {
            isVisible.value = false;
            emit('confirm');
            event.emit('confirm');
            
            // Announce confirmation to screen readers
            screenReader.announcePolitely('Action confirmed');
        }
    } catch (error) {
        console.error('Error in confirmation callback:', error);
        // Announce error to screen readers
        screenReader.announceAssertively('An error occurred while processing the confirmation');
    } finally {
        isProcessing.value = false;
    }
}

/**
 * Handle cancellation action
 */
function handleCancel(reason: 'cancel' | 'escape' | 'outside' = 'cancel'): void {
    if (isLoading.value && reason !== 'escape') return;
    
    let shouldClose = true;
    if (onCancel.value) {
        const result = onCancel.value(reason);
        if (result === false) {
            shouldClose = false;
        }
    }
    
    if (shouldClose) {
        isVisible.value = false;
        emit('cancel', reason);
        event.emit('cancel');
        
        // Announce cancellation to screen readers
        const reasonText = {
            cancel: 'cancelled',
            escape: 'cancelled',
            outside: 'cancelled'
        }[reason];
        screenReader.announcePolitely(`Action ${reasonText}`);
    }
}

/**
 * Handle dialog close events
 */
function handleDialogClose(): void {
    handleCancel('outside');
}

/**
 * Handle escape key events
 */
function handleEscape(): void {
    handleCancel('escape');
}

/**
 * Handle focus management when dialog opens
 */
function handleDialogOpen(): void {
    emit('open');
    
    nextTick(() => {
        // Focus the appropriate button based on autoFocus setting
        switch (displayAutoFocus.value) {
            case 'confirm':
                confirmButtonRef.value?.$el?.focus();
                break;
            case 'cancel':
                if (displayShowCancel.value) {
                    cancelButtonRef.value?.$el?.focus();
                } else {
                    confirmButtonRef.value?.$el?.focus();
                }
                break;
            case 'none':
                // Let the dialog handle focus naturally
                break;
        }
        
        // Announce dialog opening to screen readers
        screenReader.announcePolitely(`${displayTitle.value} dialog opened. ${displayMessage.value}`);
    });
}

/**
 * Handle dialog close completion
 */
function handleDialogClosed(): void {
    emit('close');
    
    // Reset event state
    if (!props.modelValue) {
        resetEventState();
    }
}

/**
 * Reset event-based state
 */
function resetEventState(): void {
    eventTitle.value = '';
    eventMessage.value = '';
    eventAcceptText.value = '';
    eventCancelText.value = '';
    eventConfirmColor.value = 'primary';
    eventConfirmVariant.value = 'default';
    eventCancelColor.value = 'neutral';
    eventCancelVariant.value = 'plain';
    eventAllowOutsideClose.value = false;
    eventShowCancel.value = true;
    eventAriaLabel.value = '';
    eventAriaDescription.value = '';
    eventIcon.value = '';
    eventAutoFocus.value = 'cancel';
    onConfirm.value = undefined;
    onCancel.value = undefined;
}

/**
 * Opens the confirmation dialog with the provided options (for backwards compatibility)
 */
function openDialog(options: BConfirmOptions): void {
    if (options.title !== undefined) eventTitle.value = options.title;
    if (options.message !== undefined) eventMessage.value = options.message;
    if (options.acceptText !== undefined) eventAcceptText.value = options.acceptText;
    if (options.cancelText !== undefined) eventCancelText.value = options.cancelText;
    if (options.confirmColor !== undefined) eventConfirmColor.value = options.confirmColor;
    if (options.confirmVariant !== undefined) eventConfirmVariant.value = options.confirmVariant;
    if (options.cancelColor !== undefined) eventCancelColor.value = options.cancelColor;
    if (options.cancelVariant !== undefined) eventCancelVariant.value = options.cancelVariant;
    if (options.allowOutsideClose !== undefined) eventAllowOutsideClose.value = options.allowOutsideClose;
    if (options.showCancel !== undefined) eventShowCancel.value = options.showCancel;
    if (options.ariaLabel !== undefined) eventAriaLabel.value = options.ariaLabel;
    if (options.ariaDescription !== undefined) eventAriaDescription.value = options.ariaDescription;
    if (options.icon !== undefined) eventIcon.value = options.icon;
    if (options.autoFocus !== undefined) eventAutoFocus.value = options.autoFocus;
    if (options.onConfirm !== undefined) onConfirm.value = options.onConfirm;
    if (options.onCancel !== undefined) onCancel.value = options.onCancel;
    
    visible.value = true;
}

// Watch for visibility changes to handle announcements
watch(isVisible, (newVisible, oldVisible) => {
    if (newVisible && !oldVisible) {
        handleDialogOpen();
    } else if (!newVisible && oldVisible) {
        handleDialogClosed();
    }
});

// Lifecycle hooks
onMounted(() => {
    event.on<[BConfirmOptions]>('open-confirm', openDialog);
});

onBeforeUnmount(() => {
    event.off<[BConfirmOptions]>('open-confirm', openDialog);
});
</script>

<template>
    <BDialog 
        ref="dialogRef"
        v-model="isVisible"
        :no-outside-close="!displayAllowOutsideClose"
        :aria-label="displayAriaLabel"
        :aria-describedby="messageId"
        :aria-labelledby="titleId"
        :role="dialogRole"
        @close="handleDialogClose"
        @escape="handleEscape">
        
        <div 
            ref="dialogContentRef"
            class="b-confirm-content flex flex-col p-xl gap-base"
            :class="[
                {
                    'with-icon': displayIcon,
                    'loading': isLoading,
                    'high-contrast': accessibilityConfig.highContrast,
                    'reduced-motion': accessibilityConfig.respectReducedMotion
                }
            ]">
            
            <!-- Icon Section -->
            <div v-if="displayIcon" class="b-confirm-icon flex justify-center mb-sm">
                <div 
                    class="icon-container"
                    :class="`variant-${displayConfirmColor}`"
                    aria-hidden="true">
                    <span class="icon">{{ displayIcon }}</span>
                </div>
            </div>
            
            <!-- Title -->
            <h2 
                v-if="displayTitle"
                :id="titleId"
                class="b-confirm-title font-bold text-xl text-neutral-foreground-high text-center"
                :class="{ 'with-icon': displayIcon }">
                {{ displayTitle }}
            </h2>
            
            <!-- Message -->
            <div 
                :id="messageId"
                class="b-confirm-message text-base text-neutral-foreground-default text-center"
                :class="{ 'mt-xs': displayTitle }">
                <p v-if="typeof displayMessage === 'string'" class="m-0">{{ displayMessage }}</p>
                <div v-else v-html="displayMessage"></div>
            </div>
            
            <!-- Loading Indicator -->
            <div v-if="isLoading" class="b-confirm-loading flex justify-center items-center py-sm">
                <div class="spinner" aria-hidden="true"></div>
                <span class="sr-only">Processing request...</span>
            </div>
            
            <!-- Action Buttons -->
            <div 
                class="b-confirm-actions flex justify-end gap-sm mt-lg"
                :class="props.actionsClass"
                role="group"
                :aria-label="`${displayTitle} actions`">
                <BButton 
                    v-if="displayShowCancel"
                    ref="cancelButtonRef"
                    :color="displayCancelColor"
                    :variant="displayCancelVariant"
                    :disabled="isLoading && displayUrgency !== 'critical'"
                    :aria-label="`${displayCancelText} this action`"
                    @click="handleCancel('cancel')">
                    {{ displayCancelText }}
                </BButton>
                
                <BButton 
                    ref="confirmButtonRef"
                    :color="displayConfirmColor"
                    :variant="displayConfirmVariant"
                    :loading="isLoading"
                    :disabled="isLoading"
                    :aria-label="`${displayAcceptText} this action`"
                    @click="handleConfirm">
                    {{ displayAcceptText }}
                </BButton>
            </div>
        </div>
        
        <!-- Screen Reader Announcements -->
        <div aria-live="polite" aria-atomic="true" class="sr-only">
            <span v-if="isLoading">{{ accessibilityConfig.screenReader.announcements?.loading || 'Processing your request, please wait...' }}</span>
        </div>
        
        <div aria-live="assertive" class="sr-only">
            <!-- Emergency announcements will be inserted here -->
        </div>
        
        <!-- High Contrast and Reduced Motion Indicators -->
        <div v-if="accessibilityConfig.highContrast" class="sr-only">
            High contrast mode is enabled for better visibility.
        </div>
    </BDialog>
</template>
