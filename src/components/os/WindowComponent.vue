<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch, defineProps } from 'vue'
import type { CSSProperties } from 'vue'
import Button from './ButtonComponent.vue'
import type { IconName } from '../../assets/icons'
import Colors from '../../constants/colors'
import Icon from '@/components/general/IconComponent.vue'

interface WindowProps {
  closeWindow: () => void
  minimizeWindow: () => void
  onInteract: () => void
  width: number
  height: number
  top: number
  left: number
  windowTitle?: string
  bottomLeftText?: string
  rainbow?: boolean
  windowBarColor?: string
  windowBarIcon?: IconName
  onWidthChange?: (width: number) => void
  onHeightChange?: (height: number) => void
}

const props = defineProps<WindowProps>()
console.log('Window props:', props)

// Referencias a elementos DOM
const windowRef = ref<HTMLElement | null>(null)
const dragRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const resizeRef = ref<HTMLElement | null>(null)

// Estado para arrastre y redimensión
const dragProps = ref<{ dragStartX: number; dragStartY: number } | null>(null)
const lastClickInside = ref(false)

// Estado interno de la ventana
const top = ref(props.top)
const left = ref(props.left)
const width = ref(props.width)
const height = ref(props.height)
const contentWidth = ref(props.width)
const contentHeight = ref(props.height)

const windowActive = ref(true)
const isMaximized = ref(false)
const preMaxSize = reactive({
  width: width.value,
  height: height.value,
  top: top.value,
  left: left.value,
})
const isDragging = ref(false)
const isResizing = ref(false)

// Estilo dinámico de la ventana
const windowStyle = computed((): CSSProperties => {
  const style = {
    backgroundColor: Colors.lightGray,
    position: 'absolute',
    width: typeof width.value === 'number' ? `${width.value}px` : width.value,
    height: typeof height.value === 'number' ? `${height.value}px` : height.value,
    top: typeof top.value === 'number' ? `${top.value}px` : top.value,
    left: typeof left.value === 'number' ? `${left.value}px` : left.value,
  }
  console.log('windowStyle computed:', style)
  return style
})

// Estilo dinámico de la barra superior
const topBarStyle = computed((): CSSProperties => {
  const style = {
    backgroundColor: props.windowBarColor
      ? props.windowBarColor
      : windowActive.value
        ? Colors.blue
        : Colors.darkGray,
    width: '100%',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    paddingRight: '2px',
    boxSizing: 'border-box',
  }
  console.log('topBarStyle computed:', style)
  return style
})

// Funciones de redimensión
const startResize = (event: MouseEvent) => {
  console.log('startResize:', event.clientX, event.clientY)
  event.preventDefault()
  isResizing.value = true
  window.addEventListener('mousemove', onResize, false)
  window.addEventListener('mouseup', stopResize, false)
}

const onResize = (event: MouseEvent) => {
  const curWidth = event.clientX - left.value
  const curHeight = event.clientY - top.value
  console.log('onResize:', event.clientX, event.clientY, 'width:', curWidth, 'height:', curHeight)
  if (curWidth > 520 && resizeRef.value) {
    resizeRef.value.style.width = `${curWidth}px`
    console.log('Resize width set to:', resizeRef.value.style.width)
  }
  if (curHeight > 220 && resizeRef.value) {
    resizeRef.value.style.height = `${curHeight}px`
    console.log('Resize height set to:', resizeRef.value.style.height)
  }
  if (resizeRef.value) {
    resizeRef.value.style.opacity = '1'
  }
}

const stopResize = () => {
  console.log('stopResize fired')
  isResizing.value = false
  if (resizeRef.value) {
    width.value = parseInt(resizeRef.value.style.width)
    height.value = parseInt(resizeRef.value.style.height)
    console.log(
      'Final width and height:',
      resizeRef.value.style.width,
      resizeRef.value.style.height,
    )
    resizeRef.value.style.opacity = '0'
  }
  window.removeEventListener('mousemove', onResize, false)
  window.removeEventListener('mouseup', stopResize, false)
}

// Funciones de arrastre
const startDrag = (event: MouseEvent) => {
  console.log('startDrag:', event.clientX, event.clientY)
  event.preventDefault()
  isDragging.value = true
  dragProps.value = { dragStartX: event.clientX, dragStartY: event.clientY }
  window.addEventListener('mousemove', onDrag, false)
  window.addEventListener('mouseup', stopDrag, false)
}

const onDrag = (event: MouseEvent) => {
  const { clientX, clientY } = event
  const { x, y } = getXYFromDragProps(clientX, clientY)
  console.log('onDrag: computed x,y:', x, y)
  if (dragRef.value) {
    dragRef.value.style.transform = `translate(${x}px, ${y}px)`
    dragRef.value.style.opacity = '1'
  }
}

const stopDrag = (event: MouseEvent) => {
  console.log('stopDrag:', event.clientX, event.clientY)
  isDragging.value = false
  const { clientX, clientY } = event
  const { x, y } = getXYFromDragProps(clientX, clientY)
  console.log('stopDrag: new top, left:', y, x)
  top.value = y
  left.value = x
  window.removeEventListener('mousemove', onDrag, false)
  window.removeEventListener('mouseup', stopDrag, false)
}

const getXYFromDragProps = (clientX: number, clientY: number): { x: number; y: number } => {
  if (!dragProps.value) return { x: 0, y: 0 }
  const { dragStartX, dragStartY } = dragProps.value
  const x = clientX - dragStartX + left.value
  const y = clientY - dragStartY + top.value
  return { x, y }
}

watch([left, top], ([newLeft, newTop]) => {
  if (dragRef.value) {
    dragRef.value.style.transform = `translate(${newLeft}px, ${newTop}px)`
    console.log('Updated dragRef transform:', newLeft, newTop)
  }
})

// Actualizar dimensiones del contenido
watch(width, () => {
  if (contentRef.value) {
    const cw = contentRef.value.getBoundingClientRect().width
    contentWidth.value = cw
    console.log('Content width updated to:', cw)
  }
})
watch(height, () => {
  if (contentRef.value) {
    const ch = contentRef.value.getBoundingClientRect().height
    contentHeight.value = ch
    console.log('Content height updated to:', ch)
  }
})

// Notificar cambios a través de callbacks
watch(contentWidth, (newVal) => {
  if (props.onWidthChange) {
    props.onWidthChange(newVal)
    console.log('onWidthChange called with:', newVal)
  }
})
watch(contentHeight, (newVal) => {
  if (props.onHeightChange) {
    props.onHeightChange(newVal)
    console.log('onHeightChange called with:', newVal)
  }
})

// Maximizar/Restaurar
const maximize = () => {
  if (isMaximized.value) {
    console.log('Restoring window from maximized state')
    width.value = preMaxSize.width
    height.value = preMaxSize.height
    top.value = preMaxSize.top
    left.value = preMaxSize.left
    isMaximized.value = false
  } else {
    console.log('Maximizing window')
    preMaxSize.width = width.value
    preMaxSize.height = height.value
    preMaxSize.top = top.value
    preMaxSize.left = left.value
    width.value = window.innerWidth
    height.value = window.innerHeight - 32
    top.value = 0
    left.value = 0
    isMaximized.value = true
  }
}

// Control de "actividad"
const onCheckClick = () => {
  console.log('onCheckClick: lastClickInside =', lastClickInside.value)
  windowActive.value = lastClickInside.value ? true : false
  lastClickInside.value = false
}

const onWindowInteract = () => {
  console.log('onWindowInteract triggered')
  props.onInteract()
  windowActive.value = true
  lastClickInside.value = true
}

onMounted(() => {
  window.addEventListener('mousedown', onCheckClick, false)
})
onUnmounted(() => {
  window.removeEventListener('mousedown', onCheckClick, false)
})
</script>

<template>
  <div @mousedown="onWindowInteract">
    <!-- Ventana principal -->
    <div ref="windowRef" :style="windowStyle">
      <!-- Outer Border -->
      <div class="border border-black border-t-[#c3c6ca] border-l-[#c3c6ca] flex-1">
        <!-- Inner Border -->
        <div
          class="border border-[#86898d] border-t-[#ffffff] border-l-[#ffffff] flex-1 p-2 flex flex-col"
        >
          <!-- Zona para arrastrar -->
          <div
            class="absolute cursor-move z-[10000]"
            style="width: calc(100% - 70px); height: 48px; top: -8px; left: -4px"
            @mousedown="startDrag"
          ></div>
          <!-- Barra superior -->
          <div :class="{ 'rainbow-wrapper': props.rainbow }" :style="topBarStyle">
            <div class="flex-1">
              <template v-if="props.windowBarIcon">
                <Icon
                  :icon="props.windowBarIcon"
                  :style="
                    Object.assign(
                      { paddingLeft: '4px', paddingRight: '4px' },
                      !windowActive ? { opacity: 0.5 } : {},
                    )
                  "
                  :size="16"
                />
              </template>
              <template v-else>
                <div class="w-4"></div>
              </template>
              <p :class="!windowActive ? 'text-[#c3c6ca]' : ''" class="showcase-header">
                {{ props.windowTitle }}
              </p>
            </div>
            <div class="flex items-center">
              <Button icon="minimize" @click="props.minimizeWindow" />
              <Button icon="maximize" @click="maximize" />
              <div class="pl-[2px]">
                <Button icon="close" @click="props.closeWindow" />
              </div>
            </div>
          </div>
          <!-- Contenido de la ventana -->
          <div
            class="border border-white border-t-[#86898d] border-l-[#86898d] flex-grow mt-2 mb-2 overflow-hidden"
          >
            <div
              class="border border-[#c3c6ca] border-t-black border-l-black flex-1 overflow-hidden"
            >
              <div class="flex-1 relative overflow-x-hidden bg-white" ref="contentRef">
                <slot />
              </div>
            </div>
          </div>
          <!-- Zona de redimensión -->
          <div
            class="absolute cursor-[nwse-resize]"
            style="width: 60px; height: 60px; bottom: -20px; right: -20px"
            @mousedown="startResize"
          ></div>
          <!-- Barra inferior -->
          <div class="flex-shrink w-full h-5">
            <div
              class="border border-white border-t-[#86898d] border-l-[#86898d] p-2 flex items-center"
              style="flex: 0.7143"
            >
              <p class="text-[12px] ml-1 font-[MSSerif]">
                {{ props.bottomLeftText }}
              </p>
            </div>
            <div
              class="border border-white border-t-[#86898d] border-l-[#86898d] p-2 w-4 ml-2"
            ></div>
            <div
              class="border border-white border-t-[#86898d] border-l-[#86898d] p-2 w-4 ml-2"
            ></div>
            <div
              class="border border-white border-t-[#86898d] border-l-[#86898d] p-2 ml-2 flex-[0.2857] justify-end"
            >
              <div class="flex items-end">
                <Icon :size="12" icon="windowResize" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Opcional: Indicadores de redimensión o arrastre -->
  </div>
</template>
