<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import Label from "../../utils/components/Label.vue";

type Size = "xs" | "sm" | "base" | "lg" | "xl" | "full";

const props = withDefaults(
  defineProps<{
    modelValue?: File;
    labelValue?: string;
    errorMessage?: string;
    infoMessage?: string;
    size?: Size;
    disabled?: boolean;
    isError?: boolean;
    required?: boolean;
    placeholder?: string;
    tooltipMinWidth?: string;
    accept?: string;
    multiple?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    errorMessage: "",
    infoMessage: "",
    size: "full",
    disabled: false,
    isError: false,
    required: false,
    placeholder: "or drag and drop it here",
    tooltipMinWidth: "none",
    accept: undefined,
    multiple: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: File | File[] | undefined];
}>();

let haveFile = ref(false);
let dragging = ref(false);
let fileName = ref("");



onBeforeMount(setFileValue);

watch(() => props.modelValue, setFileValue);

function setFileValue() {
  haveFile.value = !!props.modelValue;
  if (props.modelValue) {
    if (Array.isArray(props.modelValue)) {
      fileName.value = `${props.modelValue.length} files selected`;
    } else {
      fileName.value = props.modelValue.name || "";
    }
  }
}

function onChangeFile(e: any) {
  const files = e.target.files || e.dataTransfer.files;
  dragging.value = false;
  haveFile.value = true;
  
  if (props.multiple) {
    const fileArray = Array.from(files) as File[];
    fileName.value = `${fileArray.length} files selected`;
    emit("update:modelValue", fileArray);
  } else {
    fileName.value = files[0]?.name || "";
    emit("update:modelValue", files[0]);
  }
}

function deleteFile() {
  haveFile.value = false;
  fileName.value = "";
  emit("update:modelValue", undefined);
}

function getSvgSize() {
  switch (props.size) {
    case "xs":
      return 56;
    case "sm":
      return 66;
    case "base":
      return 76;
    case "lg":
      return 86;
    case "xl":
      return 96;
    case "full":
      return 76;
  }
}


</script>

<template>
  <div class="flex flex-col gap-xxs h-fit" :class="`file-${size} file`">
    <div class="flex justify-between items-center" v-if="labelValue">
      <Label
        :label-value="labelValue"
        :info-message="infoMessage"
        :tooltip-min-width="tooltipMinWidth"
        :required="required"
      />
    </div>
    <div class="w-full h-full">
      <div
        class="relative cursor-pointer flex flex-col gap-xs items-center justify-center"
        :class="{ 'blur-[2px]': dragging, 'disabled': disabled }"
        @dragenter="!disabled && (dragging = true)"
        @dragleave="dragging = false"
        @dragover.prevent
        @drop.prevent="!disabled && onChangeFile($event)"
      >
        <svg
          :width="getSvgSize()"
          :height="getSvgSize()"
          viewBox="0 0 76 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-if="!haveFile"
        >
          <path
            d="M63.5312 33.25H42.75C40.8603 33.25 39.0481 32.4993 37.7119 31.1631C36.3757 29.8269 35.625 28.0147 35.625 26.125V5.34375C35.625 5.18628 35.5624 5.03526 35.4511 4.92391C35.3397 4.81256 35.1887 4.75 35.0312 4.75H21.375C18.8554 4.75 16.4391 5.75089 14.6575 7.53249C12.8759 9.31408 11.875 11.7304 11.875 14.25V61.75C11.875 64.2696 12.8759 66.6859 14.6575 68.4675C16.4391 70.2491 18.8554 71.25 21.375 71.25H54.625C57.1446 71.25 59.5609 70.2491 61.3425 68.4675C63.1241 66.6859 64.125 64.2696 64.125 61.75V33.8438C64.125 33.6863 64.0624 33.5353 63.9511 33.4239C63.8397 33.3126 63.6887 33.25 63.5312 33.25Z"
            fill="var(--neutral-border-default)"
          />
          <path
            d="M62.228 27.9938L40.8812 6.647C40.8397 6.60573 40.7869 6.57766 40.7295 6.56631C40.672 6.55495 40.6125 6.56083 40.5584 6.5832C40.5043 6.60556 40.4581 6.64342 40.4254 6.69202C40.3928 6.74061 40.3752 6.79776 40.375 6.8563V26.125C40.375 26.7549 40.6252 27.3589 41.0706 27.8043C41.516 28.2497 42.1201 28.5 42.75 28.5H62.0187C62.0772 28.4997 62.1344 28.4822 62.183 28.4495C62.2315 28.4169 62.2694 28.3706 62.2918 28.3165C62.3141 28.2624 62.32 28.2029 62.3087 28.1455C62.2973 28.0881 62.2692 28.0353 62.228 27.9938Z"
            fill="var(--neutral-border-default)"
          />
          <g clip-path="url(#clip0_2300_5309)">
            <circle cx="63" cy="63" r="7" fill="white" />
            <path
              d="M63 50C55.8319 50 50 55.8319 50 63C50 70.1681 55.8319 76 63 76C70.1681 76 76 70.1681 76 63C76 55.8319 70.1681 50 63 50ZM68 64H64V68C64 68.2652 63.8946 68.5196 63.7071 68.7071C63.5196 68.8946 63.2652 69 63 69C62.7348 69 62.4804 68.8946 62.2929 68.7071C62.1054 68.5196 62 68.2652 62 68V64H58C57.7348 64 57.4804 63.8946 57.2929 63.7071C57.1054 63.5196 57 63.2652 57 63C57 62.7348 57.1054 62.4804 57.2929 62.2929C57.4804 62.1054 57.7348 62 58 62H62V58C62 57.7348 62.1054 57.4804 62.2929 57.2929C62.4804 57.1054 62.7348 57 63 57C63.2652 57 63.5196 57.1054 63.7071 57.2929C63.8946 57.4804 64 57.7348 64 58V62H68C68.2652 62 68.5196 62.1054 68.7071 62.2929C68.8946 62.4804 69 62.7348 69 63C69 63.2652 68.8946 63.5196 68.7071 63.7071C68.5196 63.8946 68.2652 64 68 64Z"
              fill="var(--primary-interaction-default)"
            />
          </g>
          <defs>
            <clipPath id="clip0_2300_5309">
              <rect
                width="26"
                height="26"
                fill="white"
                transform="translate(50 50)"
              />
            </clipPath>
          </defs>
        </svg>
        <div class="flex gap-2 items-center justify-center" v-else>
          <slot name="uploaded-file">
            <div class="flex flex-col items-center gap-xs">
              <Icon name="draft" class="file-icon" />
              <div class="flex items-center gap-xs">
                <p
                  class="file-name text-neutral-foreground-low truncate max-w-7xl"
                >
                  {{ fileName }}
                </p>
                <Icon
                  v-if="!disabled"
                  class="cursor-pointer trash-icon"
                  name="delete"
                  @click="deleteFile"
                />
              </div>
            </div>
          </slot>
        </div>
        <div v-if="!haveFile" class="flex flex-col items-center gap-xs">
          <p class="file-name cursor-pointer text-primary-foreground-low">
            {{ labelValue || "Select a file" }}
          </p>
          <p class="file-name text-neutral-foreground-low">
            {{ placeholder }}
          </p>
        </div>
        <input
          v-if="!haveFile"
          ref="inputFile"
          type="file"
          :accept="accept"
          :multiple="multiple"
          :disabled="disabled"
          class="w-full h-full top-0 left-0 right-0 bottom-0 absolute opacity-0 z-[1] cursor-pointer"
          @change="onChangeFile"
        />
      </div>
    </div>
    <small v-if="isError" class="error-message">
      {{ errorMessage }}
    </small>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

/* #region BASE FONT SIZES */
.error-message {
  @apply text-sm;
}
/* #endregion BASE FONT SIZES */

/* #region ERROR MESSAGE STYLE */
.error-message {
  @apply text-danger-foreground-low text-start;
}
/* #endregion ERROR MESSAGE STYLE */

/* #region FILE UPLOAD STYLE */
.file {
  @apply relative flex items-center justify-center w-full h-full border-neutral-default border-dashed border-xxs rounded-sm cursor-pointer py-xs px-sm;

  .file-icon {
    @apply text-neutral-foreground-low;
  }

  .trash-icon {
    @apply text-neutral-interaction-default hover:text-danger-interaction-default;
  }
}

.file.disabled {
  @apply opacity-50 cursor-not-allowed;
}
/* #endregion FILE UPLOAD STYLE */

/* #region FILE UPLOAD SIZES */
.file-xs {
  .file-icon {
    @apply text-4xl;
  }

  .trash-icon {
    @apply text-base;
  }

  .file-name {
    @apply text-xs;
  }
}

.file-sm {
  .file-icon {
    @apply text-6xl;
  }

  .trash-icon {
    @apply text-lg;
  }

  .file-name {
    @apply text-sm;
  }
}

.file-base {
  .file-icon {
    @apply text-7xl;
  }

  .trash-icon {
    @apply text-xl;
  }

  .file-name {
    @apply text-base;
  }
}

.file-lg {
  .file-icon {
    @apply text-8xl;
  }

  .trash-icon {
    @apply text-2xl;
  }

  .file-name {
    @apply text-lg;
  }
}

.file-xl {
  .file-icon {
    @apply text-9xl;
  }

  .trash-icon {
    @apply text-3xl;
  }

  .file-name {
    @apply text-xl;
  }
}

.file-full {
  .file-icon {
    @apply text-7xl;
  }

  .trash-icon {
    @apply text-lg;
  }

  .file-name {
    @apply text-base;
  }
}
/* #endregion FILE UPLOAD SIZES */
</style>
