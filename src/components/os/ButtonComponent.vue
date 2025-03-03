<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'
import type { IconName } from '@/assets/icons'
import Icon from '@/components/general/IconComponent.vue'
import Colors from '@/constants/colors'

// Interfaz de props
interface ButtonProps {
  icon?: IconName
  text?: string
  // En Vue, no necesitamos "onClick" como prop si emitimos un evento
}

// Definimos props y eventos
const props = defineProps<ButtonProps>()
const emit = defineEmits<{ (e: 'click'): void }>()

// Estado para hover
const isHovering = ref(false)

// Manejadores de hover
const handleMouseEnter = () => {
  isHovering.value = true
}
const handleMouseLeave = () => {
  isHovering.value = false
}

// Llamamos a "emit('click')" en lugar de "props.onClick()"
const click = (e: MouseEvent) => {
  e.preventDefault()
  emit('click')
}

// Computed que replican outerBorderStyle e innerBorderStyle de React
const outerBorderStyle = computed(() => {
  // Comenzamos con el estilo base
  const style: Record<string, string | number> = {
    border: `1px solid ${Colors.black}`,
    borderTopColor: Colors.white,
    borderLeftColor: Colors.white,
    background: Colors.lightGray,
    cursor: 'pointer',
  }

  // Si hay icon, le damos ancho/alto 16x14
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
    display: 'flex', // para alinear icon/text horizontalmente
    alignItems: 'center', // si quieres centrar vertical
  }

  // Si hay texto, agregamos padding
  if (props.text) {
    style.padding = '4px'
  }

  // Si está en hover, cambiamos fondo a darkGray
  if (isHovering.value) {
    style.backgroundColor = Colors.darkGray
  }

  return style
})

// Si en React había styles.icon, defínelo aquí si necesitas
// Ej: const iconStyle = { marginRight: '4px' }
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
