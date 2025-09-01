# Name: FileUpload
## Component Overview

**Purpose**: A dedicated file upload component with drag-and-drop support, file type restrictions, multiple file selection, and visual feedback for file upload operations.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```vue
<template>
    <FileUpload 
        v-model="uploadedFile"
        label-value="Upload Document"
        placeholder="Select a file or drag it here"
    />
</template>

<script setup lang="ts">

const uploadedFile = ref<File>()
</script>
```

---

### Props API

#### v-model
Controls the uploaded file(s). Type: `File | File[] | undefined` (default: `undefined`)

#### label-value
The label displayed above the file upload area. Type: `string` (default: `""`)

#### accept
Specifies the types of files that can be uploaded. Type: `string` (default: `undefined`)

#### multiple
Allows multiple file selection. Type: `boolean` (default: `false`)

#### is-error
Activates error styling mode. Type: `boolean` (default: `false`)

#### error-message
Error message to display when in error state. Type: `string` (default: `""`)

#### info-message
Informational message displayed with tooltip. Type: `string` (default: `""`)

#### size
File upload component size. Type: `'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'full'` (default: `"full"`)

#### disabled
Disables file upload interaction. Type: `boolean` (default: `false`)

#### required
Marks the field as required. Type: `boolean` (default: `false`)

#### placeholder
Placeholder text for the file upload area. Type: `string` (default: `"or drag and drop it here"`)

#### tooltip-min-width
Minimum width for info tooltip. Type: `string` (default: `"none"`)

---

### Events API

#### @update:model-value
Triggered when files are selected or uploaded. Receives the File object(s) or undefined when files are removed.

---

### Usage Examples

#### Basic File Upload
```vue
<template>
    <FileUpload 
        v-model="document"
        label-value="Upload Document"
        accept=".pdf,.doc,.docx"
        placeholder="Select a document or drag it here"
    />
</template>

<script setup lang="ts">

const document = ref<File>()
</script>
```

#### Multiple File Upload with Validation
```vue
<template>
    <FileUpload 
        v-model="images"
        label-value="Upload Images"
        :multiple="true"
        accept="image/*"
        :is-error="hasError"
        :error-message="errorMessage"
        info-message="Maximum 5 images, 2MB each"
        @update:model-value="validateFiles"
    />
</template>

<script setup lang="ts">

const images = ref<File[]>([])
const hasError = ref(false)
const errorMessage = ref('')

const validateFiles = (files: File[] | undefined) => {
    if (!files) {
        hasError.value = false
        return
    }
    
    if (files.length > 5) {
        hasError.value = true
        errorMessage.value = 'Maximum 5 files allowed'
    } else if (files.some(file => file.size > 2 * 1024 * 1024)) {
        hasError.value = true
        errorMessage.value = 'File size must not exceed 2MB'
    } else {
        hasError.value = false
        errorMessage.value = ''
    }
}
</script>
```

#### Custom Upload Display
```vue
<template>
    <FileUpload 
        v-model="avatar"
        label-value="Profile Picture"
        accept="image/jpeg,image/png"
    >
        <template #uploaded-file>
            <div class="flex items-center gap-xs">
                <img 
                    :src="previewUrl" 
                    alt="Avatar preview" 
                    class="w-12 h-12 rounded-full object-cover"
                />
                <div class="flex flex-col">
                    <span class="text-sm font-medium">{{ avatar?.name }}</span>
                    <span class="text-xs text-neutral-foreground-low">
                        {{ formatFileSize(avatar?.size || 0) }}
                    </span>
                </div>
                <button 
                    @click="removeAvatar"
                    class="ml-auto text-danger-interaction-default hover:text-danger-foreground-low"
                >
                    Remove
                </button>
            </div>
        </template>
    </FileUpload>
</template>

<script setup lang="ts">

const avatar = ref<File>()
const previewUrl = ref('')

watch(avatar, (newFile) => {
    if (newFile) {
        previewUrl.value = URL.createObjectURL(newFile)
    }
})

const formatFileSize = (bytes: number) => {
    return bytes < 1024 * 1024 
        ? `${Math.round(bytes / 1024)}KB`
        : `${Math.round(bytes / (1024 * 1024))}MB`
}

const removeAvatar = () => {
    avatar.value = undefined
    previewUrl.value = ''
}
</script>
```

### Slots API

#### #uploaded-file
Custom content for displaying uploaded file information. This slot is shown when files are successfully uploaded and allows complete customization of the file display.

**Important Notes:**
- Full drag-and-drop support for intuitive file selection
- File type restrictions using the `accept` attribute (MIME types or file extensions)
- Support for single or multiple file uploads
- Visual feedback during drag operations with blur effect
- Customizable file display through the `uploaded-file` slot
- Responsive sizing options from extra small to full width
- Built-in accessibility features and keyboard navigation
- Error handling and visual feedback for upload failures
- Disabled state support to prevent uploads when needed
- Clean, modern UI with consistent design system integration