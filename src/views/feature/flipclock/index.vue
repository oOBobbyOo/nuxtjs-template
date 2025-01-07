<script setup lang="ts">
import { remainTime } from '@/utils/time'

const time1 = ref(remainTime())
const time2 = ref(remainTime('week'))
const time3 = ref(remainTime('month'))

function onFinish() {
  ElMessage({
    message: '倒计时结束',
    type: 'success',
  })
}
</script>

<template>
  <PageWrap class="flex-center space-y-4">
    <div>倒计时10s</div>
    <FlipClock :time="10 * 1000" @finish="onFinish" />
    <div>今天还剩余</div>
    <FlipClock :time="time1" />
    <div>本周还剩余</div>
    <FlipClock :time="time2" />
    <div>本月还剩余</div>
    <FlipClock :time="time3" />
  </PageWrap>
</template>

<style scoped lang="less"></style>
