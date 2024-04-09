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
  inset: 0;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px 5px #0000000f;

  &-slider {
    position: relative;
    width: 300px;
    height: 60px;
    background-image: linear-gradient(
      to right,
      rgb(72 168 237 / 25%),
      rgb(255 255 255 / 40%),
      rgb(72 168 237 / 25%)
    );

    /* 背景渐变色大小 */
    background-size: 200%;
    border-radius: 100px;
    box-shadow: 0 0 20px 2px rgb(0 0 0 / 15%);
    animation: sun 7s infinite;

    &::before {
      position: absolute;
      inset: -6px;

      /* 元素的位置 底层或者顶层  -值表示底层 + 值表示顶层 */
      z-index: -1;
      content: '';

      /* 背景渐变色 */
      background-image: linear-gradient(
        to right,
        rgb(72 168 237 / 25%),
        rgb(255 255 255 / 40%),
        rgb(72 168 237 / 25%)
      );

      /* 设置模糊度 显示发光效果 */
      filter: blur(10px);

      /* 背景渐变色大小 */
      background-size: 200%;
      border-radius: 60px;
      opacity: 0.5;
      animation: sun 7s infinite;
    }
  }

  &-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    pointer-events: none;
    user-select: none;
    opacity: 0.5;
    transform: translate3d(-50%, -50%, 0);
  }

  &-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin: 5px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: 50%;
    box-shadow: 0 0 5px 2px rgb(0 0 0 / 15%);
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
    transform: translate3d(0, 0, 0);
  }

  90% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: none;
  }
}

@keyframes lock-up {
  0% {
    transform: translate3d(0, 0, 0);
  }

  90% {
    transform: translate3d(0, -100%, 0);
  }

  100% {
    opacity: 0;
    transform: none;
  }
}

@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}
</style>
