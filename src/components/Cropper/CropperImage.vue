<script setup lang="ts">
import type { CSSProperties } from 'vue'
import Cropper from 'cropperjs'
import type { ElRef, Nullable } from '@/typings'

import 'cropperjs/dist/cropper.css'

defineOptions({ name: 'CropperImage' })

const props = withDefaults(defineProps<Props>(), {
  circled: false,
  realTimePreview: true,
  height: '360px',
  crossorigin: undefined,
})

const emit = defineEmits(['cropend', 'ready', 'cropendError'])

type Options = Cropper.Options

const defaultOptions: Options = {
  aspectRatio: 1,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
  autoCrop: true,
  background: true,
  highlight: true,
  center: true,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  scalable: true,
  modal: true,
  guides: true,
  movable: true,
  rotatable: true,
}

interface Props {
  src: string
  alt?: string
  circled?: boolean
  realTimePreview?: boolean
  height?: string | number
  crossorigin?: '' | 'anonymous' | 'use-credentials' | undefined
  imageStyle?: CSSProperties
  options?: Options
}

const attrs = useAttrs()

const imgElRef = ref<ElRef<HTMLImageElement>>()
const cropper = ref<Nullable<Cropper>>()
const isReady = ref(false)

const debounceRealTimeCroppered = useDebounceFn(realTimeCroppered, 80)

const getImageStyle = computed((): CSSProperties => {
  return {
    height: props.height,
    maxWidth: '100%',
    ...props.imageStyle,
  }
})

const getClass = computed(() => {
  return [
    'cropper-image',
    attrs.class,
    {
      circled: props.circled,
    },
  ]
})

const getWrapperStyle = computed((): CSSProperties => {
  return { height: `${`${props.height}`.replace(/px/, '')}px` }
})

onMounted(init)

onUnmounted(() => {
  cropper.value?.destroy()
})

async function init() {
  const imgEl = unref(imgElRef)
  if (!imgEl)
    return

  cropper.value = new Cropper(imgEl, {
    ...defaultOptions,
    ready: () => {
      isReady.value = true
      realTimeCroppered()
      emit('ready', cropper.value)
    },
    crop() {
      debounceRealTimeCroppered()
    },
    zoom() {
      debounceRealTimeCroppered()
    },
    cropmove() {
      debounceRealTimeCroppered()
    },
    ...props.options,
  })
}

function realTimeCroppered() {
  props.realTimePreview && croppered()
}

function croppered() {
  if (!cropper.value)
    return

  const imgInfo = cropper.value.getData()
  const canvas = props.circled ? getRoundedCanvas() : cropper.value.getCroppedCanvas()
  canvas.toBlob((blob) => {
    if (!blob)
      return

    const fileReader: FileReader = new FileReader()
    fileReader.readAsDataURL(blob)
    fileReader.onloadend = (e) => {
      emit('cropend', {
        imgBase64: e.target?.result ?? '',
        imgInfo,
      })
    }
    fileReader.onerror = () => {
      emit('cropendError')
    }
  }, 'image/png')
}

function getRoundedCanvas() {
  const sourceCanvas = cropper.value!.getCroppedCanvas()
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  const width = sourceCanvas.width
  const height = sourceCanvas.height
  canvas.width = width
  canvas.height = height
  context.imageSmoothingEnabled = true
  context.drawImage(sourceCanvas, 0, 0, width, height)
  context.globalCompositeOperation = 'destination-in'
  context.beginPath()
  context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
  context.fill()
  return canvas
}
</script>

<template>
  <div :class="getClass" :style="getWrapperStyle">
    <img
      v-show="isReady"
      ref="imgElRef"
      :src="src"
      :alt="alt"
      :crossorigin="crossorigin"
      :style="getImageStyle"
    >
  </div>
</template>

<style scoped lang="less">
.cropper-image {
  &.circled {
    ::v-deep(.cropper-view-box) {
      border-radius: 50%;
    }

    ::v-deep(.cropper-face) {
      border-radius: 50%;
    }
  }
}
</style>
