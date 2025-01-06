<script setup lang="ts">
import Flipper from './Flipper.vue'
import { padZero } from '@/utils/time'

import { useCountDown } from '@/hooks/web/useCountDown'

defineOptions({ name: 'FlipClock' })

const props = withDefaults(defineProps<FlipClockProps>(), {
  time: 0,
  format: 'HH:mm:ss',
  autoStart: true,
  millisecond: false,
})

const emit = defineEmits(['change', 'finish'])

interface FlipClockProps {
  time?: number
  format?: string
  autoStart?: boolean
  millisecond?: boolean
}

const { start, pause, reset, current, prev } = useCountDown({
  time: +props.time,
  millisecond: props.millisecond,
  onChange: current => emit('change', current),
  onFinish: () => emit('finish'),
})

const currentTime = computed(() => {
  const { days, hours, minutes, seconds, milliseconds } = current.value
  return {
    days: padZero(days).split(''),
    hours: padZero(hours).split(''),
    minutes: padZero(minutes).split(''),
    seconds: padZero(seconds).split(''),
    milliseconds: padZero(milliseconds, 3).split(''),
  }
})

const prevTime = computed(() => {
  const { days, hours, minutes, seconds, milliseconds } = prev.value
  return {
    days: padZero(days).split(''),
    hours: padZero(hours).split(''),
    minutes: padZero(minutes).split(''),
    seconds: padZero(seconds).split(''),
    milliseconds: padZero(milliseconds, 3).split(''),
  }
})

// watch(() => prevTime.value, () => {
//   console.log('[ prevTime ] >>:', prevTime.value)
// })

// watch(() => currentTime.value, () => {
//   console.log('[ currentTime ] >>:', currentTime.value)
// })

function resetTime() {
  reset(+props.time)

  if (props.autoStart)
    start()
}

watch(() => props.time, resetTime, { immediate: true })

defineExpose({
  start,
  pause,
  reset: resetTime,
})
</script>

<template>
  <div class="flipclock">
    <template v-for="(_, i) in currentTime.days" :key="i">
      <Flipper :front-text="prevTime.days[i]" :back-text="currentTime.days[i]" />
    </template>
    <em>天</em>
    <template v-for="(_, i) in currentTime.hours" :key="i">
      <Flipper :front-text="prevTime.hours[i]" :back-text="currentTime.hours[i]" />
    </template>
    <em>:</em>
    <template v-for="(_, i) in currentTime.hours" :key="i">
      <Flipper :front-text="prevTime.minutes[i]" :back-text="currentTime.minutes[i]" />
    </template>
    <em>:</em>
    <template v-for="(_, i) in currentTime.seconds" :key="i">
      <Flipper :front-text="prevTime.seconds[i]" :back-text="currentTime.seconds[i]" />
    </template>
  </div>
</template>

<style scoped lang="less">
.flipclock {
  .flipper {
    margin: 0 5px;
  }

  em {
    display: inline-block;
    font-size: 66px;
    font-style: normal;
    vertical-align: top;
  }
}
</style>
