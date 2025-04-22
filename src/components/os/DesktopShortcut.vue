<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, type CSSProperties } from 'vue'
import IconComponent from '@/components/general/IconComponent.vue'
import colors from '@/constants/colors'
import type { IconName } from '@/assets/icons';

const props = defineProps<{
  icon: string
  shortcutName: string
  invertText?: boolean
  onOpen?: () => void
}>()

const isSelected = ref(false)
const shortcutId = ref('')
const lastSelected = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const scaledStyle = ref<CSSProperties>({})
const doubleClickTimerActive = ref(false)

const { icon, shortcutName, onOpen } = props

const requiredIcon = new URL(`../../assets/icons/${icon}.png`, import.meta.url).href

const getShortcutId = () => {
  const id = shortcutName.replace(/\s/g, '')

  return `desktop-shortcut-${id}`
}

watch(
  () => shortcutName,
  () => {
    const id = getShortcutId()
    shortcutId.value = id
  },
  { immediate: true },
)

onMounted(() => {
  if (containerRef.value && Object.keys(scaledStyle.value).length === 0) {
    const boundingBox = containerRef.value.getBoundingClientRect()
    const newStyle = {
      transformOrigin: 'center',
      transform: 'scale(1.5)',
      left: boundingBox.width / 4 + 'px',
      top: boundingBox.height / 4 + 'px',
    }
    scaledStyle.value = newStyle
  }
  window.addEventListener('mousedown', handleClickOutside)
})
onUnmounted(() => {
  window.removeEventListener('mousedown', handleClickOutside)
})

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement

  if (target.id !== shortcutId.value) {
    isSelected.value = false
  }
  if (!isSelected.value && lastSelected.value) {
    lastSelected.value = false
  }
}

const handleClickShortcut = () => {
  if (doubleClickTimerActive.value) {
    onOpen?.()
    isSelected.value = false
    doubleClickTimerActive.value = false
    return
  }
  isSelected.value = true
  lastSelected.value = true
  doubleClickTimerActive.value = true
  setTimeout(() => {
    doubleClickTimerActive.value = false
  }, 300)
}
</script>

<template>
  <div
    :id="shortcutId"
    class="absolute w-[56px] flex flex-col justify-center items-center text-center"
    :style="scaledStyle"
    @mousedown.stop="handleClickShortcut"
    ref="containerRef"
  >
    <div :id="shortcutId" class="cursor-pointer pb-[12px]">
      <div
        :id="shortcutId"
        class="absolute top-0 w-[32px] h-[32px]"
        :style="
          isSelected
            ? {
                backgroundImage: `linear-gradient(45deg, ${colors.blue} 25%, transparent 25%), linear-gradient(-45deg, ${colors.blue} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${colors.blue} 75%), linear-gradient(-45deg, transparent 75%, ${colors.blue} 75%)`,
                backgroundSize: '2px 2px',
                backgroundPosition: '0 0, 0 1px, 1px -1px, -1px 0px',
                WebkitMask: `url(${requiredIcon})`,
              }
            : {}
        "
      ></div>

      <IconComponent :icon="props.icon as IconName" class="w-[32px] h-[32px]" />
    </div>

    <div
      :id="shortcutId"
      :class="
        isSelected
          ? 'border-2 border-blue-500 bg-blue-500'
          : lastSelected
            ? 'border border-slate-300'
            : ''
      "
    >
      <p
        :id="shortcutId"
        :class="[
          'cursor-pointer break-words pr-[8px] pl-[8px]',
          'text-[8px]',
          'font-[MSSerif]',
          'text-black',
        ]"
      >
        {{ shortcutName }}
      </p>
    </div>
  </div>
</template>
