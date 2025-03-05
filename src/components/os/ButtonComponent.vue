<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'
import type { IconName } from '@/assets/icons'
import Icon from '@/components/general/IconComponent.vue'
import Colors from '@/constants/colors'

interface ButtonProps {
  icon?: IconName
  text?: string
}

const props = defineProps<ButtonProps>()
const emit = defineEmits<{ (e: 'click'): void }>()

const isHovering = ref(false)

const handleMouseEnter = () => {
  isHovering.value = true
}
const handleMouseLeave = () => {
  isHovering.value = false
}

const click = (e: MouseEvent) => {
  e.preventDefault()
  emit('click')
}

const outerBorderStyle = computed(() => {
  const style: Record<string, string | number> = {
    border: `1px solid ${Colors.black}`,
    borderTopColor: Colors.white,
    borderLeftColor: Colors.white,
    background: Colors.lightGray,
    cursor: 'pointer',
  }

  if (props.icon) {
    style.width = '16px'
    style.height = '14px'
  }

  return style
})

const innerBorderStyle = computed(() => {
  const style: Record<string, string | number> = {
    border: `1px solid ${Colors.darkGray}`,
    borderTopColor: Colors.lightGray,
    borderLeftColor: Colors.lightGray,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  }

  if (props.text) {
    style.padding = '4px'
  }

  if (isHovering.value) {
    style.backgroundColor = Colors.darkGray
  }

  return style
})
</script>

<template>
  <div
    :style="outerBorderStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="click"
  >
    <div :style="innerBorderStyle">
      <Icon v-if="icon" :icon="icon" />
      <p v-if="text">{{ text }}</p>
    </div>
  </div>
</template>
