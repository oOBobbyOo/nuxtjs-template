<script setup lang="ts">
import '@google/model-viewer'

import yasuo from '@/assets/models/yasuo.glb'
import yi from '@/assets/models/yi.glb'

interface Model {
  src: string
  cameraOrbit: string
  progressAnimation: string
  finishAnimation: string
  finishAnimationIn: string
  cameraTarget: string
  finishDelay: number
}

type ModelName = 'yasuo' | 'yi'

type Models = {
  [key in ModelName]: Model
}

const props = defineProps({
  model: {
    type: String as PropType<ModelName>,
    default: 'yasuo',
  },
  percentage: {
    type: Number,
    default: 100,
  },
  strokeWidth: {
    type: Number,
    default: 12,
  },
  strokeColor: {
    type: String,
    default: '#fff',
  },
  modelSize: {
    type: Number,
    default: 150,
  },
})

const models: Models = {
  yasuo: {
    src: yasuo,
    cameraOrbit: '-90deg 90deg',
    progressAnimation: 'Run2',
    finishAnimationIn: 'yasuo_skin02_dance_in',
    finishAnimation: 'yasuo_skin02_dance_loop',
    cameraTarget: 'auto auto 0m',
    finishDelay: 2000,
  },
  yi: {
    src: yi,
    cameraOrbit: '-90deg 90deg',
    progressAnimation: 'Run',
    finishAnimationIn: 'Dance',
    finishAnimation: 'Dance',
    cameraTarget: 'auto auto 0m',
    finishDelay: 500,
  },
}

const modelViewer = ref(null)

const animationName = ref('')

const model = computed(() => {
  return models[props.model]
})

const modelPosition = computed(() => {
  const percentage = props.percentage > 100 ? 100 : props.percentage
  return {
    left: `calc(${`${percentage}%`} - ${props.modelSize / 2}px)`,
    bottom: `${-props.modelSize / 10}px`,
    height: `${props.modelSize}px`,
    width: `${props.modelSize}px`,
  }
})

const currentPercentStyle = computed(() => {
  const percentage = props.percentage > 100 ? 100 : props.percentage
  return { width: `${percentage}%`, backgroundColor: props.strokeColor }
})

watch(
  () => props.percentage,
  (percentage) => {
    if (percentage < 100) {
      animationName.value = model.value.progressAnimation
    }
    else if (percentage === 100) {
      animationName.value = model.value.finishAnimationIn
      setTimeout(() => {
        animationName.value = model.value.finishAnimation
      }, model.value.finishDelay)
    }
  },
)
</script>

<template>
  <div class="model-loading">
    <model-viewer
      ref="modelViewer" :src="model.src" disable-zoom shadow-intensity="1" :camera-orbit="model.cameraOrbit"
      class="model-viewer" :style="modelPosition" :animation-name="animationName" :camera-target="model.cameraTarget"
      autoplay
    />
    <div class="progress-bar" :style="{ height: `${strokeWidth}px`, borderRadius: `${strokeWidth / 2}px` }">
      <div class="progress-percent" :style="currentPercentStyle" />
    </div>
  </div>
</template>

<style scoped lang="less">
.model-loading {
  width: 100%;
  position: relative;

  .model-viewer {
    position: relative;
    background: transparent !important;
  }

  .progress-bar {
    background-color: #eee;
    width: 100%;
    overflow: hidden;

    .progress-percent {
      height: 100%;
      transition: width 100ms ease;
    }
  }
}
</style>
