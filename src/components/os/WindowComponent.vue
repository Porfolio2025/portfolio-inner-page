<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  onMounted,
  onUnmounted,
  watch,
  defineProps,
  defineEmits,
} from 'vue'
import type { CSSProperties } from 'vue'
import Button from './ButtonComponent.vue'
import type { IconName } from '../../assets/icons'
import Colors from '../../constants/colors'
import colors from '../../constants/colors'
import Icon from '@/components/general/IconComponent.vue'
import DragIndicator from './DragIndicator.vue'
import ResizeIndicator from './ResizeIndicator.vue'

export interface WindowProps {
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

const windowRef = ref<HTMLElement | null>(null)
const dragRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const resizeRef = ref<HTMLElement | null>(null)

const dragProps = ref<{ dragStartX: number; dragStartY: number } | null>(null)
const lastClickInside = ref(false)

const topVal = ref(props.top)
const leftVal = ref(props.left)
const widthVal = ref(props.width)
const heightVal = ref(props.height)

const windowActive = ref(true)
const isMaximized = ref(false)
const isDragging = ref(false)
const isResizing = ref(false)

const preMaxSize = reactive({
  width: widthVal.value,
  height: heightVal.value,
  top: topVal.value,
  left: leftVal.value,
})

const styleWindow = computed<CSSProperties>(() => ({
  backgroundColor: Colors.lightGray,
  position: 'absolute',
  width: `${widthVal.value}px`,
  height: `${heightVal.value}px`,
  top: `${topVal.value}px`,
  left: `${leftVal.value}px`,
}))

const styleDragHitbox: CSSProperties = {
  position: 'absolute',
  width: 'calc(100% - 70px)',
  height: '48px',
  zIndex: 10000,
  top: '-8px',
  left: '-4px',
  cursor: 'move',
}

const styleWindowBorderOuter: CSSProperties = {
  border: `1px solid ${Colors.black}`,
  borderTopColor: colors.lightGray,
  borderLeftColor: colors.lightGray,
  flex: 1,
}

const styleWindowBorderInner: CSSProperties = {
  border: `1px solid ${Colors.darkGray}`,
  borderTopColor: colors.white,
  borderLeftColor: colors.white,
  flex: 1,
  padding: '2px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: Colors.lightGray,
}

const styleResizeHitbox: CSSProperties = {
  position: 'absolute',
  width: '60px',
  height: '60px',
  bottom: '-20px',
  right: '-20px',
  cursor: 'nwse-resize',
}

const styleTopBar = computed<CSSProperties>(() => ({
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
}))

const styleWindowHeader: CSSProperties = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
}

const styleWindowBarIcon: CSSProperties = {
  paddingLeft: '4px',
  paddingRight: '4px',
}

const styleWindowTopButtons: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
}

const styleContentOuter: CSSProperties = {
  border: `1px solid ${Colors.white}`,
  borderTopColor: colors.darkGray,
  borderLeftColor: colors.darkGray,
  flexGrow: 1,
  marginTop: '8px',
  marginBottom: '8px',
  overflow: 'hidden',
}

const styleContentInner: CSSProperties = {
  border: `2px solid ${Colors.lightGray}`,
  borderTopColor: colors.black,
  borderLeftColor: colors.black,
  flex: 1,
  overflow: 'hidden',
}

const styleContent: CSSProperties = {
  flex: 1,
  position: 'relative',
  overflowX: 'hidden',
  backgroundColor: Colors.white,
}

const styleBottomBar: CSSProperties = {
  flexShrink: 1,
  width: '100%',
  height: '20px',
  display: 'flex',
  backgroundColor: Colors.lightGray,
}

const styleBottomSpacer: CSSProperties = {
  width: '16px',
  marginLeft: '2px',
}

const styleInsetBorder: CSSProperties = {
  border: `1px solid ${Colors.white}`,
  borderTopColor: colors.darkGray,
  borderLeftColor: colors.darkGray,
  padding: '2px',
}

const styleBottomResizeContainer: CSSProperties = {
  flex: 2 / 7,
  display: 'flex',
  justifyContent: 'flex-end',
  padding: 0,
  marginLeft: '2px',
}

const startResize = (event: MouseEvent) => {
  event.preventDefault()
  isResizing.value = true
  window.addEventListener('mousemove', onResize, false)
  window.addEventListener('mouseup', stopResize, false)
}

const onResize = (event: MouseEvent) => {
  const curWidth = event.clientX - leftVal.value
  const curHeight = event.clientY - topVal.value
  if (curWidth > 520 && resizeRef.value) {
    resizeRef.value.style.width = `${curWidth}px`
  }
  if (curHeight > 220 && resizeRef.value) {
    resizeRef.value.style.height = `${curHeight}px`
  }
  if (resizeRef.value) {
    resizeRef.value.style.opacity = '1'
  }
}

const stopResize = () => {
  isResizing.value = false
  if (resizeRef.value) {
    widthVal.value = parseInt(resizeRef.value.style.width)
    heightVal.value = parseInt(resizeRef.value.style.height)
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

const startDrag = (event: MouseEvent) => {
  event.preventDefault()
  isDragging.value = true
  dragProps.value = { dragStartX: event.clientX, dragStartY: event.clientY }
  window.addEventListener('mousemove', onDrag, false)
  window.addEventListener('mouseup', stopDrag, false)
}

const onDrag = (event: MouseEvent) => {
  const { clientX, clientY } = event
  const { x, y } = getXYFromDragProps(clientX, clientY)
  if (dragRef.value) {
    dragRef.value.style.transform = `translate(${x}px, ${y}px)`
    dragRef.value.style.opacity = '1'
  }
}

const stopDrag = (event: MouseEvent) => {
  isDragging.value = false
  const { clientX, clientY } = event
  const { x, y } = getXYFromDragProps(clientX, clientY)
  topVal.value = y
  leftVal.value = x
  window.removeEventListener('mousemove', onDrag, false)
  window.removeEventListener('mouseup', stopDrag, false)
}

const getXYFromDragProps = (clientX: number, clientY: number): { x: number; y: number } => {
  if (!dragProps.value) return { x: 0, y: 0 }
  const { dragStartX, dragStartY } = dragProps.value
  const x = clientX - dragStartX + leftVal.value
  const y = clientY - dragStartY + topVal.value
  return { x, y }
}

watch([leftVal, topVal], ([newLeft, newTop]) => {
  if (dragRef.value) {
    dragRef.value.style.transform = `translate(${newLeft}px, ${newTop}px)`
  }
})

watch(widthVal, (newVal) => {
  if (props.onWidthChange) {
    props.onWidthChange(newVal)
  }
})
watch(heightVal, (newVal) => {
  if (props.onHeightChange) {
    props.onHeightChange(newVal)
  }
})

const maximize = () => {
  if (isMaximized.value) {
    widthVal.value = preMaxSize.width
    heightVal.value = preMaxSize.height
    topVal.value = preMaxSize.top
    leftVal.value = preMaxSize.left
    isMaximized.value = false
  } else {
    preMaxSize.width = widthVal.value
    preMaxSize.height = heightVal.value
    preMaxSize.top = topVal.value
    preMaxSize.left = leftVal.value
    widthVal.value = window.innerWidth
    heightVal.value = window.innerHeight - 32
    topVal.value = 0
    leftVal.value = 0
    isMaximized.value = true
  }
}

const onCheckClick = () => {
  windowActive.value = lastClickInside.value ? true : false
  lastClickInside.value = false
}

const onWindowInteract = () => {
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
    <div :style="styleWindow" ref="windowRef">
      <div :style="styleWindowBorderOuter">
        <div :style="styleWindowBorderInner">
          <!-- Drag Hitbox -->
          <div :style="styleDragHitbox" @mousedown="startDrag"></div>
          <!-- Barra superior -->
          <div
            :class="[props.rainbow ? 'rainbow-wrapper' : '']"
            :style="[
              styleTopBar,
              props.windowBarColor && { backgroundColor: props.windowBarColor },
              !windowActive ? { backgroundColor: Colors.darkGray } : {},
            ]"
          >
            <div :style="styleWindowHeader">
              <template v-if="props.windowBarIcon">
                <Icon
                  :icon="props.windowBarIcon"
                  :style="[styleWindowBarIcon, !windowActive ? { opacity: 0.5 } : {}]"
                  :size="16"
                />
              </template>
              <template v-else>
                <div style="width: 16px"></div>
              </template>
              <p class="showcase-header" :style="!windowActive ? { color: colors.lightGray } : {}">
                {{ props.windowTitle }}
              </p>
            </div>
            <div :style="styleWindowTopButtons">
              <Button icon="minimize" @click="props.minimizeWindow" />
              <Button icon="maximize" @click="maximize" />
              <div style="padding-left: 2px">
                <Button icon="close" @click="props.closeWindow" />
              </div>
            </div>
          </div>
          <!-- Contenido -->
          <div :style="styleContentOuter">
            <div :style="styleContentInner">
              <div :style="styleContent" ref="contentRef">
                <slot />
              </div>
            </div>
          </div>
          <!-- Resize Hitbox -->
          <div :style="styleResizeHitbox" @mousedown="startResize"></div>
          <!-- Barra inferior -->
          <div :style="styleBottomBar">
            <div :style="[styleInsetBorder, { flex: 5 / 7, alignItems: 'center' }]">
              <p style="font-size: 12px; margin-left: 4px; font-family: MSSerif; color: black">
                {{ props.bottomLeftText }}
              </p>
            </div>
            <div :style="[styleInsetBorder, styleBottomSpacer]"></div>
            <div :style="[styleInsetBorder, styleBottomSpacer]"></div>
            <div :style="[styleInsetBorder, styleBottomResizeContainer]">
              <div style="align-items: flex-end">
                <Icon :size="12" icon="windowResize" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicador de redimensión -->
    <div
      :style="
        !isResizing
          ? { zIndex: -10000, pointerEvents: 'none' }
          : { zIndex: 1000, cursor: 'nwse-resize', mixBlendMode: 'difference' }
      "
    >
      <ResizeIndicator
        :top="topVal"
        :left="leftVal"
        :width="widthVal"
        :height="heightVal"
        :resizeRef="resizeRef"
      />
    </div>

    <!-- Indicador de arrastre -->
    <div
      :style="
        !isDragging
          ? { zIndex: -10000, pointerEvents: 'none' }
          : { zIndex: 1000, cursor: 'move', mixBlendMode: 'difference' }
      "
    >
      <DragIndicator :width="widthVal" :height="heightVal" :dragRef="dragRef" />
    </div>
  </div>
</template>
