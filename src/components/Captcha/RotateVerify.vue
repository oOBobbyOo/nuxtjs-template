<script setup lang="ts">
import type { ShallowRef } from 'vue'
import { useTemplateRef } from 'vue'
import { assign, divide, round, subtract } from 'lodash-es'
import { getDayjsValueOf } from '@/utils/time'

defineOptions({
  name: 'RotateVerify',
})

const props = withDefaults(defineProps<Props>(), {
  imgSrc: '',
  width: 250,
  height: 40,
  text: '请按住滑块拖动',
  successText: '验证通过',
  background: '#eee',
  progressBarBg: '#76c61d',
  completedBg: '#76c61d',
  circle: false,
  radius: '4px',
  handlerIcon: 'ri:arrow-right-double-line',
  successIcon: 'ri:checkbox-circle-line',
  handlerBg: '#fff',
  textSize: '14px',
  textColor: '#333',
  showTips: true,
  successTip: '验证通过',
  failTip: '验证失败',
  diffDegree: 10,
  minDegree: 90,
  maxDegree: 200,
})

const emit = defineEmits<Emits>()

interface Props {
  imgSrc: string // 图片地址
  width?: number // 宽度
  height?: number // 高度
  text?: string // 验证码文本
  successText?: string // 验证通过文字
  background?: string // 背景色
  progressBarBg?: string // 滑块背景色
  completedBg?: string // 验证成功背景色
  circle?: boolean // 是否为圆形
  radius?: string // 圆角
  handlerIcon?: string // 滑块图标
  successIcon?: string // 验证通过图标
  handlerBg?: string // 滑块背景色
  textSize?: string // 文字大小
  textColor?: string // 文字颜色
  showTips?: boolean // 是否显示底部提示
  successTip?: string // 验证通过提示
  failTip?: string // 验证失败提示
  diffDegree?: number // 在此范围内松开计算验证成功(单位°)
  minDegree?: number // 最小旋转角度
  maxDegree?: number // 最大旋转角度
}

// 父组件自定义事件
interface Emits {
  (e: 'move' | 'fail'): void
  (e: 'success', seconds: number): void
}

// 初始化数据
function initState() {
  return {
    isPassing: false,
    isMoving: false,
    x: 0,
    isOk: false,
    showBar: false,
    showErrorTip: false,
    ranRotate: 0,
    cRotate: 0,
    imgStyle: {},
    startTime: 0,
    endTime: 0,
  }
}

const state = reactive(initState())

const dragVerify = useTemplateRef('dragVerify') as ShallowRef<HTMLElement>
const progressBar = useTemplateRef('progressBar') as ShallowRef<HTMLElement>
const handler = useTemplateRef('handler') as ShallowRef<HTMLElement>
const message = useTemplateRef('message') as ShallowRef<HTMLElement>

// 滑块样式
const handlerStyle = computed(() => {
  return {
    width: `${props.height}px`,
    height: `${props.height}px`,
    background: props.handlerBg,
  }
})

// 提示语
const messageTip = computed(() => (state.isPassing ? '' : props.text))

// 成功提示语
const successMessage = computed(() => (state.isPassing ? props.successText : ''))

// 拖拽样式
const dragVerifyStyle = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
    lineHeight: `${props.height}px`,
    background: props.background,
    borderRadius: props.circle ? `${props.height / 2}px` : props.radius,
  }
})

// 拖拽图片样式
const dragVerifyImgStyle = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.width}px`,
  }
})

// 拖动时的样式
const progressBarStyle = computed(() => {
  return {
    background: props.progressBarBg,
    height: `${props.height}px`,
    borderRadius: props.circle ? `${props.height / 2}px 0 0 ${props.height / 2}px` : props.radius,
  }
})

// 文字样式
const textStyle = computed(() => {
  return {
    height: `${props.height}px`,
    width: `${props.width}px`,
    fontSize: props.textSize,
  }
})

// 避免指定旋转角度时一直拖动到最右侧才验证通过
const factor = computed(() => {
  if (props.minDegree === props.maxDegree)
    return Math.floor(1 + Math.random() * 6) / 10 + 1

  return 1
})

function checkimgLoaded() {
  // 生成随机角度
  state.ranRotate = Math.floor(props.minDegree + Math.random() * (props.maxDegree - props.minDegree))
  state.imgStyle = {
    transform: `rotateZ(${state.ranRotate}deg)`,
  }
}

function dragStart(e: any) {
  if (!state.isPassing) {
    // 记录开始时间
    state.startTime = getDayjsValueOf()
    state.isMoving = true
    state.x = e.pageX || e.touches[0].pageX
  }
  state.showBar = true
  state.showErrorTip = false
  emit('move')
}

function dragMoving(e: any) {
  if (state.isMoving && !state.isPassing) {
    const diffX = (e.pageX || e.touches[0].pageX) - state.x
    handler.value.style.left = `${diffX}px`
    progressBar.value.style.width = `${diffX + props.height / 2}px`
    const cRotate = Math.ceil((diffX / (props.width - props.height)) * props.maxDegree * factor.value)
    state.cRotate = cRotate
    const rotate = state.ranRotate - cRotate
    state.imgStyle = {
      transform: `rotateZ(${rotate}deg)`,
    }
  }
}

function dragFinish() {
  if (state.isMoving && !state.isPassing) {
    if (Math.abs(state.ranRotate - state.cRotate) > props.diffDegree) {
      state.isOk = true
      state.imgStyle = {
        transform: `rotateZ(${state.ranRotate}deg)`,
      }
      setTimeout(() => {
        handler.value.style.left = '0'
        progressBar.value.style.width = '0'
        state.isOk = false
      }, 500)
      state.showErrorTip = true
      emit('fail')
    }
    else {
      passVerify()
    }
    state.isMoving = false
  }
}

function passVerify() {
  state.endTime = getDayjsValueOf()
  state.isPassing = true
  state.isMoving = false
  progressBar.value.style.background = props.completedBg
  message.value.style['-webkit-text-fill-color' as any] = 'unset'
  message.value.style.animation = 'slidetounlock2 3s infinite'
  progressBar.value.style.color = '#fff'
  progressBar.value.style.fontSize = props.textSize
  emit('success', round(divide(subtract(state.endTime, state.startTime), 1000), 2))
}

function reset() {
  reImg()
  checkimgLoaded()
}

function reImg() {
  // 重置状态
  assign(state, initState())

  handler.value.style.left = '0'
  progressBar.value.style.width = '0'
  message.value.style['-webkit-text-fill-color' as any] = 'transparent'
  message.value.style.animation = 'slidetounlock 3s infinite'
  message.value.style.color = props.background
}

defineExpose({
  // 暴露给父组件的方法
  reset,
})

onMounted(() => {
  dragVerify.value.style.setProperty('--textColor', props.textColor)
  dragVerify.value.style.setProperty('--width', `${Math.floor(props.width / 2)}px`)
  dragVerify.value.style.setProperty('--pwidth', `${-Math.floor(props.width / 2)}px`)
})
</script>

<template>
  <div class="rotate-verify space-y-2">
    <div :style="dragVerifyImgStyle" class="relative overflow-hidden b-rd-[50%]">
      <img
        :src="imgSrc" class="wh-full b-rd-[50%] object-cover" :class="{ goOrigin: state.isOk }"
        :style="state.imgStyle" @load="checkimgLoaded"
      >
      <div v-if="showTips && state.isPassing" class="tips success">
        {{ successTip }}
      </div>
      <div v-if="showTips && !state.isPassing && state.showErrorTip" class="tips danger">
        {{ failTip }}
      </div>
    </div>
    <div
      ref="dragVerify" class="drag-verify relative select-none overflow-hidden bg-slate-300 text-center"
      :style="dragVerifyStyle" @mousemove="dragMoving" @mouseup="dragFinish" @mouseleave="dragFinish"
      @touchmove="dragMoving" @touchend="dragFinish"
    >
      <div
        ref="progressBar" class="progress-bar absolute h-0 w-0" :class="{ goFirst2: state.isOk }"
        :style="progressBarStyle"
      >
        {{ successMessage }}
      </div>
      <div ref="message" class="message absolute top-0 select-none" :style="textStyle">
        {{ messageTip }}
      </div>

      <div
        ref="handler" class="absolute left-0 top-0 flex-center cursor-move" :class="{ goFirst: state.isOk }"
        :style="handlerStyle" @mousedown="dragStart" @touchstart="dragStart"
      >
        <Icon
          :icon="state.isPassing ? successIcon : handlerIcon" class="text-[21px] text-green"
          :style="{ color: state.isPassing ? completedBg : undefined }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.rotate-verify {
  .tips {
    width: 100%;
    position: absolute;
    bottom: 25px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    z-index: 200;

    &.success {
      background: rgba(255, 255, 255, 0.6);
      color: green;
    }

    &.danger {
      background: rgba(0, 0, 0, 0.6);
      color: yellow;
    }
  }
}

.drag-verify {
  .message {
    background: -webkit-gradient(linear,
        left top,
        right top,
        color-stop(0, var(--textColor)),
        color-stop(0.4, var(--textColor)),
        color-stop(0.5, #fff),
        color-stop(0.6, var(--textColor)),
        color-stop(1, var(--textColor)));
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-size-adjust: none;
    animation: slidetounlock 3s infinite;
  }
}
</style>

<style>
@keyframes slidetounlock {
  0% {
    background-position: var(--pwidth) 0;
  }

  100% {
    background-position: var(--width) 0;
  }
}

@keyframes slidetounlock2 {
  0% {
    background-position: var(--pwidth) 0;
  }

  100% {
    background-position: var(--pwidth) 0;
  }
}
</style>
