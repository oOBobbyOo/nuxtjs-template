<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { getRandomImg } from '@/utils'

defineOptions({
  name: 'PointsCode',
})

const imgs = getRandomImg(32) as string[]

// 组件实例
const pointsVerify = useTemplateRef('pointsVerify')

// 重置
function onReset() {
  if (pointsVerify.value)
    pointsVerify.value.refresh()
}

// 结果回调
function pointsPassing(flag: boolean) {
  if (flag) {
    ElMessage({
      message: '恭喜您，答案正确！',
      type: 'success',
    })
  }
  else {
    ElMessage({
      message: '很遗憾，答案错误，请再试一次',
      type: 'error',
    })
  }
}
</script>

<template>
  <Card title="点选验证码">
    <div class="flex-center flex-col space-y-2">
      <PointsVerify ref="pointsVerify" :imgs="imgs" :width="300" :height="238" @callback="pointsPassing" />

      <el-button type="success" @click="onReset">
        重置
      </el-button>
    </div>
  </Card>
</template>

<style scoped>

</style>
