<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { getRandomImg } from '@/utils'

defineOptions({
  name: 'RotateCode',
})

// 组件实例
const rotateVerify = useTemplateRef('rotateVerify')

const imgSrc = ref(getRandomImg() as string)

// 重置
function onReset() {
  if (rotateVerify.value) {
    rotateVerify.value.reset()
    imgSrc.value = getRandomImg() as string
  }
}

// 成功回调
function onSuccess(seconds: number) {
  console.log('验证成功，耗时：', seconds, '秒')
}
</script>

<template>
  <Card title="图片旋转验证码">
    <div class="flex-center flex-col space-y-2">
      <RotateVerify ref="rotateVerify" :width="250" :img-src="imgSrc" @success="onSuccess" />

      <el-button type="success" @click="onReset">
        重置
      </el-button>
    </div>
  </Card>
</template>
