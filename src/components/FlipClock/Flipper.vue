<script setup lang="ts">
defineOptions({ name: 'Flipper' })

const props = withDefaults(defineProps<FlipperProps>(), {
  frontText: 0,
  backText: 0,
  duration: 600,
  flipType: 'down',
})

const isFlipping = ref(false)
const flipType = ref(props.flipType)
const frontTextFromData = ref<number | string>(0)
const backTextFromData = ref<number | string>(1)

interface FlipperProps {
  frontText?: number | string // 前牌文字
  backText?: number | string // 后牌文字
  duration?: number // 翻牌动画时间
  flipType?: string // 翻牌类型
}

function _textClass(num: number | string) {
  return `number${num}`
}

// 翻牌方法
function _flip(type: string, front: number | string, back: number | string) {
  if (isFlipping.value)
    return false
  frontTextFromData.value = front
  backTextFromData.value = back
  flipType.value = type
  isFlipping.value = true
  setTimeout(() => {
    isFlipping.value = false
    frontTextFromData.value = back
  }, props.duration)
}

// 下翻牌方法
function flipDown(front: number, back: number) {
  _flip('down', front, back)
}

// 上翻牌方法
function flipUp(front: number, back: number) {
  _flip('up', front, back)
}

// 设置前牌文字方法
function setFront(text: number | string) {
  frontTextFromData.value = text
}

// 设置后牌文字方法
function setBack(text: number | string) {
  backTextFromData.value = text
}

onMounted(() => {
  frontTextFromData.value = props.frontText
  backTextFromData.value = props.backText
})

watch(() => props.frontText, (newVal) => {
  if (Number(newVal) >= 0)
    setFront(newVal)
})

watch(() => props.backText, (newVal) => {
  if (Number(newVal) >= 0)
    _flip(props.flipType, props.frontText, newVal)
})

defineExpose({
  flipDown,
  flipUp,
  setFront,
  setBack,
})
</script>

<template>
  <div class="flipper" :class="[flipType, { go: isFlipping }]">
    <div class="digital front" :class="_textClass(frontTextFromData)" />
    <div class="digital back" :class="_textClass(backTextFromData)" />
  </div>
</template>

<style scoped lang="less">
.flipper {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 100px;
  line-height: 100px;
  border: solid 1px #000;
  border-radius: 10px;
  background: #fff;
  font-size: 66px;
  color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: 'Helvetica Neue';

  .digital:before,
  .digital:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    background: #000;
    overflow: hidden;
    box-sizing: border-box;
  }

  .digital:before {
    top: 0;
    bottom: 50%;
    border-radius: 10px 10px 0 0;
    border-bottom: solid 1px #666;
  }

  .digital:after {
    top: 50%;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    line-height: 0;
  }

  // 向下翻
  &.down .front:before {
    z-index: 3;
  }

  &.down .back:after {
    z-index: 2;
    transform-origin: 50% 0%;
    transform: perspective(160px) rotateX(180deg);
  }

  &.down .front:after,
  &.down .back:before {
    z-index: 1;
  }

  &.down.go .front:before {
    transform-origin: 50% 100%;
    animation: frontFlipDown 0.6s ease-in-out both;
    box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
    backface-visibility: hidden;
  }

  &.down.go .back:after {
    animation: backFlipDown 0.6s ease-in-out both;
  }

  // 向上翻
  &.up .front:after {
    z-index: 3;
  }

  &.up .back:before {
    z-index: 2;
    transform-origin: 50% 100%;
    transform: perspective(160px) rotateX(-180deg);
  }

  &.up .front:before,
  &.up .back:after {
    z-index: 1;
  }

  &.up.go .front:after {
    transform-origin: 50% 0;
    animation: frontFlipUp 0.6s ease-in-out both;
    box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
    backface-visibility: hidden;
  }

  &.up.go .back:before {
    animation: backFlipUp 0.6s ease-in-out both;
  }

  & .number0:before,
  & .number0:after {
    content: '0';
  }

  & .number1:before,
  & .number1:after {
    content: '1';
  }

  & .number2:before,
  & .number2:after {
    content: '2';
  }

  & .number3:before,
  & .number3:after {
    content: '3';
  }

  & .number4:before,
  & .number4:after {
    content: '4';
  }

  & .number5:before,
  & .number5:after {
    content: '5';
  }

  & .number6:before,
  & .number6:after {
    content: '6';
  }

  & .number7:before,
  & .number7:after {
    content: '7';
  }

  & .number8:before,
  & .number8:after {
    content: '8';
  }

  & .number9:before,
  & .number9:after {
    content: '9';
  }

}

@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}
</style>
