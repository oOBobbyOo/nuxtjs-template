<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { assign, difference, every, join, map, random, sample, shuffle } from 'lodash-es'
import { randomColor, randomHanzi } from '@/utils'

defineOptions({
  name: 'PointsVerify',
})

const props = withDefaults(defineProps<Props>(), {
  width: 200,
  height: 300,
  defaultNum: 4,
  checkNum: 3,
  imgs: () => [],
  disturbLine: 5,
  disturbPoint: 20,
  fontSizeMin: 25,
  fontSizeMax: 35,
  range: 40,
  successText: '验证通过',
  errorText: '验证失败',
})

const emit = defineEmits<Emits>()

interface Point {
  x: number
  y: number
}

interface State {
  canvasPoints: (Point & { char: string })[]
  checkPoints: Point[]
  text: string
  result: boolean
  showTip: boolean
  loading: boolean
}

interface Props {
  width?: number // 宽度
  height?: number // 高度
  defaultNum?: number // 默认的文字数量
  checkNum?: number // 校对的文字数量
  imgs?: string[] // 图片数组，如果不传，则随机背景色
  disturbLine?: number // 干扰线数量，0为不绘制
  disturbPoint?: number // 干扰点数量，0为不绘制
  fontSizeMin?: number // 字体最小值
  fontSizeMax?: number // 字体最大值
  range?: number // 校验的容错范围，数值越大，越容易校验通过
  successText?: string // 校验通过显示的文字
  errorText?: string // 校验失败显示的文字
}

interface Emits {
  (e: 'callback', flag: boolean): void
}

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

// 初始化数据
function initState() {
  return {
    canvasPoints: [], // 画布生成的坐标信息
    checkPoints: [], // 用户点击的坐标
    text: '刷新中...', // 按钮显示的文字
    result: false, // 校验结果
    showTip: false, // 是否显示结果提示
    loading: false, // 是否加载中
  }
}

const state = reactive<State>(initState())

// 绘制干扰线
function drawLine(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < props.disturbLine; i += 1) {
    ctx.strokeStyle = randomColor(100, 200)
    ctx.beginPath()
    ctx.moveTo(random(0, props.width), random(0, props.height))
    ctx.lineTo(random(0, props.width), random(0, props.height))
    ctx.stroke()
  }
}

// 绘制干扰点
function drawPoint(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < props.disturbPoint; i += 1) {
    ctx.fillStyle = randomColor()
    ctx.beginPath()
    ctx.arc(random(0, props.width), random(0, props.height), 1, 0, 2 * Math.PI)
    ctx.fill()
  }
}

// 画布点选回调
function canvasClick(e: MouseEvent) {
  // 判断用户点击的坐标是否大于校对的数量
  if (state.checkPoints.length < props.checkNum) {
    // 记录用户点击的坐标
    state.checkPoints.push(getMousePos(e))
  }
  // 如果校对数量相同，则校验结果
  if (state.checkPoints.length === props.checkNum) {
    setTimeout(() => {
      // 校验结果
      const result = comparePoints(state.canvasPoints, state.checkPoints)
      if (!result) {
        // 验证失败
        assign(state, {
          text: props.errorText,
          result: false,
          showTip: true,
        })
        emit('callback', result)
        setTimeout(() => {
          refresh()
        }, 400)
      }
      else {
        // 验证成功
        assign(state, {
          text: props.successText,
          result: true,
          showTip: true,
        })
        emit('callback', result)
      }
    }, 400)
  }
}

// 绘制合成的图片
function drawImg(img?: HTMLImageElement) {
  // 准备canvas环境
  const ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D

  if (img) {
    // 确保图片不变形
    const canvasWidth = props.width
    const canvasHeight = props.height
    const imgWidth = img.width
    const imgHeight = img.height

    // 计算宽高比
    const imageAspectRatio = imgWidth / imgHeight
    const canvasAspectRatio = canvasWidth / canvasHeight

    let sx = 0
    let sy = 0
    let sw = imgWidth
    let sh = imgHeight
    const dx = 0
    const dy = 0
    const dw = canvasWidth
    const dh = canvasHeight

    // 如果图片的宽高比大于画布的宽高比，则需要裁剪宽度
    if (imageAspectRatio > canvasAspectRatio) {
      sw = imgHeight * canvasAspectRatio
      sx = (imgWidth - sw) / 2
    }
    else {
      // 否则需要裁剪高度
      sh = imgWidth / canvasAspectRatio
      sy = (imgHeight - sh) / 2
    }
    // 绘制图片
    // ctx.drawImage(img, 0, 0, props.width, props.height);
    // 使用计算后的尺寸和位置绘制图片
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
  }
  else {
    // 绘制背景
    ctx.fillStyle = randomColor()
    ctx.fillRect(0, 0, props.width, props.height)
  }

  // 是否绘制干扰线
  if (props.disturbLine)
    drawLine(ctx)

  // 是否绘制干扰点
  if (props.disturbPoint)
    drawPoint(ctx)

  // 不重复的汉字数组
  const fontStrs = randomHanzi(props.defaultNum)

  // 需要绘制的文字
  const fontChars: string[] = []

  // 开始绘制文字
  for (let i = 1; i <= props.defaultNum; i += 1) {
    // 加入不重复的文字
    fontChars[i - 1] = sample(difference(fontStrs, fontChars)) as string
    // 随机生成字体大小
    ctx.font = `${random(props.fontSizeMin, props.fontSizeMax)}px SimHei`
    ctx.fillStyle = randomColor()

    // 计算 x 坐标
    const margin = 20 // 容器边缘留白
    const textWidth = ctx.measureText(fontChars[i - 1]).width
    const x = Math.floor(props.width / props.defaultNum) * i - textWidth - margin
    const y = random(margin + textWidth, props.height - margin)

    ctx.fillText(fontChars[i - 1], x, y)
    state.canvasPoints[i - 1] = { char: fontChars[i - 1], x, y }
  }

  for (let i = 0; i < props.defaultNum - props.checkNum; i += 1)
    state.canvasPoints = shuffleAndPopArray(state.canvasPoints)

  // 设置提示语
  state.text = `请顺序点击【${join(map(state.canvasPoints, 'char'), ',')}】`

  return state.canvasPoints
}

// 打乱数组，并删除最后一个元素
function shuffleAndPopArray(arr: State['canvasPoints']) {
  // 使用 _.shuffle 方法打乱数组
  const shuffledArray = shuffle(arr)
  // 删除最后一个元素
  shuffledArray.pop()
  return shuffledArray
}
// 获取坐标
function getMousePos(e: MouseEvent): Point {
  const x = e.offsetX
  const y = e.offsetY
  return { x, y }
}

// 判断点选结果
function comparePoints(canvasPoints: State['canvasPoints'], checkPoints: Point[]) {
  function isWithinRange(point: Point, checkPoint: Point, range = props.range) {
    const dx = Math.abs(point.x - checkPoint.x)
    const dy = Math.abs(point.y - checkPoint.y)
    return dx <= range && dy <= range
  }
  return every(canvasPoints, (point, index) => isWithinRange(point, checkPoints[index]))
}

// 刷新状态
function refresh() {
  // 重置状态
  assign(state, initState())

  // 判断是否有传图片
  if (props.imgs.length) {
    const img = new Image()
    // 获取随机一张图片
    img.src = sample(props.imgs) as string
    // 加载完成开始绘制
    state.loading = true
    img.onload = async () => {
      await nextTick(() => {
        state.canvasPoints = drawImg(img)
        state.loading = false
      })
    }
  }
  else {
    state.canvasPoints = drawImg()
  }
}

defineExpose({
  // 暴露给父组件的方法
  refresh,
})

onMounted(() => {
  refresh()
})
</script>

<template>
  <div class="points-verify relative mx-auto my-0" :style="{ width: `${width}px` }">
    <div
      class="verify-img-panel relative overflow-hidden rounded space-y-2"
      :style="{
        width,
        height,
        backgroundSize: `${width} ${height}`,
      }"
    >
      <canvas
        ref="canvas"
        class="cursor-pointer"
        :width="width"
        :height="height"
        @click="state.result ? undefined : canvasClick($event)"
      />

      <div
        v-for="(point, index) in state.checkPoints" :key="index" class="point-area absolute z-50"
        :style="{
          top: `${point.y - 16}px`,
          left: `${point.x - 16}px`,
        }"
      >
        <el-button type="success" circle>
          {{ index + 1 }}
        </el-button>
      </div>

      <div class="relative">
        <el-alert
          :title="state.text" :type="state.showTip ? (state.result ? 'success' : 'error') : 'warning'"
          :closable="false"
        />

        <div
          class="absolute right-2 top-2 z-10 cursor-pointer text-20px text-slate-500" :class="{ 'animate-spin': state.loading }"
          @click="refresh"
        >
          <Icon icon="ri:reset-left-fill" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
