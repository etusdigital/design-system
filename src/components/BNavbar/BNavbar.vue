<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { useOptionalModel } from "#composables";
import { type Item } from "#utils/types/DropItem";

type Profile = {
  name: string;
  src?: string;
};

const props = withDefaults(
  defineProps<{
    modelValue?: any[];
    title?: string;
    items?: Item[];
    profile?: Profile;
  }>(),
  {
    modelValue: undefined,
    title: "",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any[]];
}>();

const [model] = useOptionalModel<Item | undefined>(
  props,
  "modelValue",
  emit,
  undefined
);
const isNotificationsOpen = ref(false);
const isDropdownOpen = ref(false);

const computedPadding = computed((): number => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    return Number(
      (
        (document.body as any)
          ?.computedStyleMap()
          .get("--spacing-xxs")
          ?.toString() || "4px"
      ).replace("px", "")
    );
  }
  return 4;
});

async function showNotifications(event: any) {
  isNotificationsOpen.value = !isNotificationsOpen.value;
  if (!isNotificationsOpen.value) return;

  const target = event.target as HTMLElement;
  const rect = target.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  await nextTick();

  const card = document.querySelector(
    ".notifications"
  ) as HTMLElement;
  if (!card) return;

  card.style.right = `${viewportWidth - rect.right}px`;

  if (rect.bottom + card.offsetHeight > viewportHeight)
    card.style.bottom = `${viewportHeight - rect.top - computedPadding.value}px`;
  else card.style.top = `${rect.bottom + computedPadding.value}px`;

  document.body.appendChild(card);

  const closeHandler = (e: MouseEvent | WheelEvent) => {
    const isScrollable = Math.abs(card.offsetHeight - card.scrollHeight) > 3;
    const isWheel = e.type == "wheel";
    const isCard = card.contains(e.target as Node);
    const shouldClose = isScrollable ? isWheel && !isCard : isWheel || !isCard;

    if (shouldClose) {
      isNotificationsOpen.value = false;
      document.removeEventListener("click", closeHandler);
      document.removeEventListener("wheel", closeHandler);
    }
  };

  setTimeout(() => {
    document.addEventListener("click", closeHandler);
    document.addEventListener("wheel", closeHandler);
  }, 200);
}
</script>

<template>
  <div class="b-navbar">
    <div class="flex items-center gap-base">
      <div
        class="flex items-center gap-base text-lg leading-lg font-light text-primary-foreground-high"
      >
        <slot name="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none"
          >
            <path
              d="M40.5 20C40.5 8.95431 31.5457 0 20.5 0C9.4543 0 0.5 8.95431 0.5 20C0.5 31.0457 9.4543 40 20.5 40C31.5457 40 40.5 31.0457 40.5 20Z"
              fill="url(#paint0_linear_2159_846)"
            />
            <path
              d="M38.1604 20.0001C38.1604 10.2455 30.2528 2.33789 20.4982 2.33789C10.7436 2.33789 2.83594 10.2455 2.83594 20.0001C2.83594 29.7547 10.7436 37.6624 20.4982 37.6624C30.2528 37.6624 38.1604 29.7547 38.1604 20.0001Z"
              stroke="#FAFAFA"
              stroke-width="2.40312"
              stroke-miterlimit="10"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.7876 20.902C14.5933 20.621 13.7248 19.9 13.4321 19.578C13.4632 18.9264 13.5596 18.2779 13.7211 17.645C14.195 15.7975 15.2189 14.1677 16.6794 12.9329C17.7002 12.0698 18.867 11.4478 20.0525 11.132C21.2271 10.8195 22.397 10.8101 23.4349 11.1056C24.19 11.3202 24.8504 11.6857 25.3957 12.1911C25.969 12.723 26.3885 13.3839 26.6402 14.1568C27.3332 16.2811 26.5672 18.7911 24.6421 20.7086C23.4473 21.8967 21.9278 22.7458 20.2467 23.1626C19.3424 23.3865 18.4024 23.4814 17.4547 23.4425C17.1338 23.4302 16.8062 23.4034 16.4837 23.3603C16.0632 22.5175 15.8461 21.3699 15.7876 20.902ZM15.7876 20.902C15.6835 20.0032 15.7114 19.0882 15.9352 18.2188C16.291 16.8332 17.0585 15.6109 18.1539 14.6856C18.9183 14.0402 19.7775 13.5768 20.6398 13.3481C21.4167 13.1413 22.1671 13.1289 22.8087 13.3124C23.3868 13.4756 24.1434 13.88 24.4666 14.8722C24.6686 15.4911 24.6499 16.2018 24.4122 16.928C24.1605 17.6916 23.6835 18.4396 23.0294 19.0897C22.1298 19.987 20.977 20.6277 19.6983 20.945C19.0037 21.1161 18.2797 21.1891 17.5479 21.1596C16.9575 21.1363 16.3874 21.0576 15.7876 20.902Z"
              fill="url(#paint1_angular_2159_846)"
            />
            <path
              d="M21.6728 29.3941C21.9944 29.4284 22.3315 29.4455 22.6796 29.4455V29.4408C25.1018 29.4408 28.0399 28.5839 29.9603 26.1283C30.3487 25.6307 30.2617 24.9107 29.7645 24.5219C29.2674 24.1331 28.5495 24.2202 28.1595 24.7178C27.4106 25.6742 26.3945 26.3663 25.1422 26.7706C23.7625 27.217 22.5211 27.1781 21.9042 27.1143C21.1585 27.0381 20.4515 26.8562 19.8021 26.5716C19.19 26.3041 18.6244 25.9464 18.1225 25.5063C17.4476 24.9146 16.8919 24.1848 16.4834 23.3589C15.9235 23.2992 14.5917 23.0367 13.752 22.5469C13.7846 22.6759 13.8218 22.8019 13.8607 22.9295C14.3812 24.6199 15.3367 26.1082 16.6201 27.2309C17.299 27.825 18.0635 28.3102 18.8901 28.671C19.757 29.0504 20.6923 29.2931 21.6728 29.3941Z"
              fill="white"
            />
            <path
              d="M13.4321 19.5783C13.0794 19.2859 12.7236 18.9406 12.416 18.5472C12.0275 18.0496 11.3081 17.9625 10.811 18.3513C10.3138 18.74 10.2268 19.4601 10.6152 19.9577C11.636 21.264 12.9939 22.1302 13.7522 22.5486C13.6351 22.1973 13.4321 21.1239 13.4321 19.5783Z"
              fill="url(#paint2_linear_2159_846)"
            />
            <path
              d="M13.4321 19.5781C13.7248 19.9001 14.5933 20.6211 15.7876 20.9021C15.8461 21.37 16.0632 22.5176 16.4837 23.3604C15.9237 23.3007 14.592 23.0383 13.7522 22.5484C13.6351 22.1971 13.4321 21.1237 13.4321 19.5781Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2159_846"
                x1="34.6407"
                y1="5.85756"
                x2="6.35756"
                y2="34.1424"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#97D991" />
                <stop offset="0.11" stop-color="#92D691" />
                <stop offset="0.22" stop-color="#86D091" />
                <stop offset="0.33" stop-color="#74C691" />
                <stop offset="0.42" stop-color="#6DC192" />
                <stop offset="0.55" stop-color="#5CB597" />
                <stop offset="0.66" stop-color="#47A79E" />
                <stop offset="0.74" stop-color="#3B9C98" />
                <stop offset="0.89" stop-color="#1E7F88" />
                <stop offset="1" stop-color="#02657A" />
              </linearGradient>
              <radialGradient
                id="paint1_angular_2159_846"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(20.1617 17.1708) rotate(139.686) scale(8.34625 8.94344)"
              >
                <stop stop-color="white" />
                <stop offset="1" stop-color="#DDDDDD" />
              </radialGradient>
              <linearGradient
                id="paint2_linear_2159_846"
                x1="10.8995"
                y1="18.5312"
                x2="13.7097"
                y2="21.3414"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="1" stop-color="#D9D9D9" />
              </linearGradient>
            </defs>
          </svg>
          <slot name="title">
            {{ title }}
          </slot>
        </slot>
      </div>
      <div class="border-r-xxs border-r-neutral-default min-h-xl" />
      <slot>
        <BDropdown v-model="model" v-model:expanded="isDropdownOpen" :items="items" get-object />
      </slot>
    </div>
    <div class="flex items-center gap-base">
      <slot name="actions">
        <div>
          <BIcon class="notification-icon" name="notifications" @click="showNotifications" />
          <Teleport to="body">
            <Transition name="fade">
              <BCard v-if="isNotificationsOpen" class="notifications">
                <slot name="notifications" />
              </BCard>
            </Transition>
          </Teleport>
        </div>
        <BAvatar :name="profile?.name" :src="profile?.src" />
      </slot>
    </div>
  </div>
</template>

<style scoped>
.b-navbar {
  @apply flex items-center justify-between gap-sm w-full py-sm px-xl bg-emphasis border-b-xxs border-b-neutral-default;
}

.notification-icon {
  @apply cursor-pointer text-neutral-interaction-default hover:text-neutral-interaction-hover;
}

.notifications {
  @apply z-[900] fixed;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
