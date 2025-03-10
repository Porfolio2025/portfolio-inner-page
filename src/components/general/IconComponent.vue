<script setup lang="ts">
import getIconByName from '@/assets/icons/index'
import type { IconName } from '@/assets/icons/index'
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
interface IconProps {
  icon: IconName
  style?: CSSProperties
  size?: string | number
}

const props = defineProps<IconProps>()

const defaultIconStyle: CSSProperties = {
  imageRendering: 'pixelated',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  pointerEvents: 'none',
}

const iconStyle = computed(() => ({
  ...defaultIconStyle,
  ...(props.style || {}),
  ...(props.size ? { width: props.size, height: props.size } : {}),
}))

const iconSrc = computed(() => {
  return getIconByName(props.icon) as string
})
</script>

<template>
  <img :style="iconStyle" alt="" :src="iconSrc" />
</template>
