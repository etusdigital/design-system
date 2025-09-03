<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    length?: number
    disabled?: boolean
    placeholder?: string
    separator?: string
    type?: 'text' | 'password'
    mask?: boolean
    otp?: boolean
  }>(),
  {
  modelValue: '',
  length: 6,
  disabled: false,
  placeholder: '',
  separator: '',
  type: 'text',
  mask: false,
  otp: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  complete: [value: string]
}>()

const inputs = ref<HTMLInputElement[]>([])
const values = ref<string[]>([])

const initializeValues = () => {
  values.value = Array(props.length).fill('').map((_, index) => 
    props.modelValue[index] || ''
  )
}

watch(() => props.modelValue, () => {
  initializeValues()
}, { immediate: true })

watch(() => props.length, () => {
  initializeValues()
})

const currentValue = computed(() => values.value.join(''))

watch(currentValue, (newValue) => {
  emit('update:modelValue', newValue)
  if (newValue.length === props.length) {
    emit('complete', newValue)
  }
})

const handleInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  if (value.length > 1) {
    target.value = value.slice(-1)
  }
  
  values.value[index] = target.value
  
  if (target.value && index < props.length - 1) {
    nextTick(() => {
      const nextInput = inputs.value[index + 1]
      if (nextInput) {
        nextInput.focus()
      }
    })
  }
}

const handleKeyDown = (event: KeyboardEvent, index: number) => {
  const target = event.target as HTMLInputElement
  
  if (event.key === 'Backspace') {
    if (!target.value && index > 0) {
      const prevInput = inputs.value[index - 1]
      if (prevInput) {
        prevInput.focus()
        prevInput.select()
      }
    } else {
      values.value[index] = ''
    }
  }
  
  if (event.key === 'v' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault()
    navigator.clipboard.readText().then(text => {
      const chars = text.slice(0, props.length).split('')
      chars.forEach((char, i) => {
        if (i < props.length) {
          values.value[i] = char
        }
      })
      
      const nextEmptyIndex = values.value.findIndex(v => !v)
      const targetIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : props.length - 1
      const targetInput = inputs.value[targetIndex]
      if (targetInput) {
        targetInput.focus()
      }
    })
  }
  
  if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault()
    inputs.value[index - 1].focus()
  }
  
  if (event.key === 'ArrowRight' && index < props.length - 1) {
    event.preventDefault()
    inputs.value[index + 1].focus()
  }
}

const handleFocus = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.select()
}

const setInputRef = (el: HTMLInputElement | null, index: number) => {
  if (el) {
    inputs.value[index] = el
  }
}

const focusFirstEmpty = () => {
  const firstEmpty = values.value.findIndex(v => !v)
  const targetIndex = firstEmpty !== -1 ? firstEmpty : 0
  const targetInput = inputs.value[targetIndex]
  if (targetInput) {
    targetInput.focus()
  }
}

defineExpose({
  focus: focusFirstEmpty,
  clear: () => {
    values.value = Array(props.length).fill('')
    focusFirstEmpty()
  }
})
</script>

<template>
  <div class="pin-input-container" @click="focusFirstEmpty">
    <template v-for="(_, index) in length" :key="index">
      <input
        :ref="(el) => setInputRef(el as HTMLInputElement, index)"
        v-model="values[index]"
        :type="type === 'password' ? 'password' : 'text'"
        :disabled="disabled"
        :placeholder="placeholder"
        class="pin-input-field"
        :class="{
          'pin-input-field--disabled': disabled,
          'pin-input-field--filled': values[index]
        }"
        maxlength="1"
        autocomplete="off"
        @input="handleInput($event, index)"
        @keydown="handleKeyDown($event, index)"
        @focus="handleFocus"
      />
      
      <span 
        v-if="separator && index < length - 1" 
        class="pin-input-separator"
        :class="{ 'pin-input-separator--disabled': disabled }"
      >
        {{ separator }}
      </span>
    </template>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.pin-input-container {
  @apply flex items-center gap-xs;
}

.pin-input-field {
  @apply w-3xl h-3xl 
         outline-xxs 
         outline-neutral-default
         rounded-sm 
         text-center 
         bg-emphasis
         text-neutral-foreground-high
         transition-[outline-color]
         duration-100
         delay-100
         focus:outline-primary-default;
}

.pin-input-field:hover:not(:disabled) {
  @apply outline-neutral-interaction-default;
}

.pin-input-field--filled {
  @apply outline-primary-default bg-primary-surface-default;
}

.pin-input-field--disabled {
  @apply bg-neutral-surface-disabled 
         text-neutral-foreground-disabled 
         outline-neutral-disabled 
         cursor-not-allowed;
}

.pin-input-separator {
  @apply text-neutral-foreground-high 
         font-medium 
         select-none;
}

.pin-input-separator--disabled {
  @apply text-neutral-foreground-disabled;
}

/* Remove default input styling for password dots */
.pin-input-field[type="password"] {
  font-family: text-security-disc, -webkit-small-control;
  -webkit-text-security: disc;
}
</style>