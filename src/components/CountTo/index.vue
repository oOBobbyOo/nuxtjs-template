<script setup lang="ts">
import { TransitionPresets, useTransition } from '@vueuse/core'
import { isNumber } from '@/utils/is'

defineOptions({ name: 'CountTo' })

const props = withDefaults(defineProps<Porps>(), {
  startVal: 0,
  endVal: 2000,
  duration: 1500,
  autoplay: true,
  decimalPlaces: 0,
  decimal: '.',
  separator: ',',
  prefix: '',
  suffix: '',
  useEasing: true,
  easingFn: 'linear',
})

const emit = defineEmits(['onStarted', 'onFinished'])

type TransitionKey = keyof typeof TransitionPresets

interface Porps {
  startVal?: number // 开始值
  endVal: number // 结束值
  duration?: number // 动画持续时间（以秒为单位）
  autoplay?: boolean // 自动播放
  decimalPlaces?: number // 小数位数 (0)
  decimal?: string // 小数点 ('.')
  separator?: string // 分隔符（','）
  prefix?: string // 前缀
  suffix?: string // 后缀
  color?: string // 颜色
  useEasing?: boolean // 是否开启缓动动画
  easingFn?: TransitionKey // 缓动动画函数
}

const source = ref(props.startVal)
const disabled = ref(false)
let outputValue = useTransition(source)
const value = computed(() => formatNumber(unref(outputValue)))

watchEffect(() => {
  source.value = props.startVal
})

watch([() => props.startVal, () => props.endVal], () => {
  if (props.autoplay)
    start()
})

onMounted(() => {
  props.autoplay && start()
})

function start() {
  run()
  source.value = props.endVal
}

function reset() {
  source.value = props.startVal
  run()
}

function run() {
  outputValue = useTransition(source, {
    disabled,
    duration: props.duration,
    onFinished: () => emit('onFinished'),
    onStarted: () => emit('onStarted'),
    ...(props.useEasing ? { transition: TransitionPresets[props.easingFn] } : {}),
  })
}

function formatNumber(num: number | string) {
  if (!num && num !== 0)
    return ''

  const { decimalPlaces, decimal, separator, suffix, prefix } = props
  num = Number(num).toFixed(decimalPlaces)
  num += ''

  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? decimal + x[1] : ''

  const rgx = /(\d+)(\d{3})/
  if (separator && !isNumber(separator))
    while (rgx.test(x1)) x1 = x1.replace(rgx, `$1${separator}$2`)

  return prefix + x1 + x2 + suffix
}

defineExpose({ reset })
</script>

<template>
  <span :style="{ color }">
    {{ value }}
  </span>
</template>

<style scoped></style>
