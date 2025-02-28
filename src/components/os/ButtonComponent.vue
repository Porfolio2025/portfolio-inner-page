<script setup lang="ts">
import { ref } from 'vue'
import type { IconName } from '../../assets/icons'
import Icon from '@/components/general/IconComponent.vue'

interface ButtonProps {
  icon?: IconName
  text?: string
}

const props = defineProps<ButtonProps>()
const emit = defineEmits(['click'])

// Desestructuramos para facilitar su uso
const { icon, text } = props

// Estado reactivo para el hover
const isHovering = ref(false)

// Manejadores de eventos
const handleMouseEnter = () => {
  isHovering.value = true
}

const handleMouseLeave = () => {
  isHovering.value = false
}

const click = (e: MouseEvent) => {
  e.preventDefault()
  // Emitir el evento click. El padre lo recibirá como función.
  emit('click', e)
}
</script>

<template>
  <div
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    class="border border-black border-t-white border-l-white bg-[#86898d] cursor-pointer"
    @mousedown="click"
  >
    <div class="border border-[#86898d] border-t-[#c3c6ca] border-l-[#c3c6ca] flex-1">
      <Icon v-if="icon" :icon="icon" />
      <p v-if="text">{{ text }}</p>
    </div>
  </div>
</template>
