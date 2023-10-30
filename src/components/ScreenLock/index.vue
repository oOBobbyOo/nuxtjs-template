<script setup lang="ts">
defineOptions({ name: 'ScreenLock' })

const props = withDefaults(defineProps<Props>(), {
  open: false,
  to: 'body',
})

const emit = defineEmits(['update:open', 'unlock'])

interface Props {
  open?: boolean
  to?: string
}

const slider = ref()
const sliderButton = ref()
const isTrigger = ref(false)

let startX = 0
let distance = 0
let maxDistance = 0
let minDistance = 0

function onMousedown(e: MouseEvent) {
  distance = 0
  maxDistance = 0
  minDistance = 0
  isTrigger.value = false

  sliderButton!.value.style.transition = ''
  startX = e.screenX
  maxDistance = slider!.value.clientWidth - sliderButton.value.clientWidth - 10
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}

function onMousemove(e: MouseEvent) {
  distance = e.screenX - startX
  if (isTrigger.value)
    distance = maxDistance

  if (distance <= minDistance)
    distance = minDistance

  if (distance >= maxDistance) {
    distance = maxDistance
    if (!isTrigger.value) {
      isTrigger.value = true
      setTimeout(() => {
        emit('update:open', false)
        emit('unlock')
      }, 300)
    }
  }
  if (props.open)
    sliderButton.value.style.transform = `translateX(${distance}px)`
}

function onMouseup() {
  document.removeEventListener('mousemove', onMousemove)
  document.removeEventListener('mouseup', onMouseup)

  if (!isTrigger.value) {
    // 恢复原始状态
    distance = 0
    maxDistance = 0
    minDistance = 0
    isTrigger.value = false

    if (props.open) {
      sliderButton.value.style.transition = 'all 0.4s'
      sliderButton.value.style.transform = `translateX(${distance}px)`
    }
  }
}

const icon = computed(() => {
  return isTrigger.value ? 'material-symbols:lock-open-right' : 'material-symbols:arrow-forward'
})

watch(
  () => props.open,
  () => {
    if (props.open)
      isTrigger.value = false
  },
)
</script>

<template>
  <Teleport :to="to">
    <Transition enter-active-class="screen-lock-locked" leave-active-class="screen-lock-unlock">
      <div v-if="open" class="screen-lock">
        <div ref="slider" class="screen-lock-slider">
          <div class="screen-lock-placeholder">
            滑动解锁
          </div>
          <div ref="sliderButton" class="screen-lock-button" @mousedown="onMousedown">
            <Icon size="24" :icon="icon" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="less">
.screen-lock {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999999;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 0 20px 5px #0000000f;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &-slider {
    width: 300px;
    height: 60px;
    border-radius: 100px;
    background-image: linear-gradient(
      to right,
      rgb(72 168 237 / 25%),
      rgba(255, 255, 255, 0.4),
      rgb(72 168 237 / 25%)
    );
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.15);
    /* 背景渐变色大小 */
    background-size: 200%;
    position: relative;
    animation: sun 7s infinite;
    &::before {
      content: '';
      position: absolute;
      top: -6px;
      bottom: -6px;
      left: -6px;
      right: -6px;
      border-radius: 60px;
      /* 背景渐变色 */
      background-image: linear-gradient(
        to right,
        rgb(72 168 237 / 25%),
        rgba(255, 255, 255, 0.4),
        rgb(72 168 237 / 25%)
      );
      /* 背景渐变色大小 */
      background-size: 200%;
      /* 元素的位置 底层或者顶层  -值表示底层 + 值表示顶层 */
      z-index: -1;
      /* 设置模糊度 显示发光效果 */
      filter: blur(10px);
      opacity: 0.5;
      animation: sun 7s infinite;
    }
  }

  &-placeholder {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    pointer-events: none;
    user-select: none;
    opacity: 0.5;
  }

  &-button {
    width: 50px;
    height: 50px;
    margin: 5px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

.screen-lock-locked {
  animation: lock-down 1s ease-in-out;
}

.screen-lock-unlock {
  animation: lock-up 1s ease-in-out;
}

@keyframes lock-down {
  0% {
    transform: translate3d(0, -100%, 0);
  }
  60% {
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0px, 0, 0);
  }
  90% {
    transform: translate3d(0px, 0, 0);
  }
  100% {
    transform: none;
  }
}

@keyframes lock-up {
  0% {
    transform: translate3d(0, 0px, 0);
  }
  90% {
    transform: translate3d(0px, -100%, 0);
  }
  100% {
    transform: none;
    opacity: 0;
  }
}

@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}
</style>
