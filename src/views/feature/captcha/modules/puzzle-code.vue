<script setup lang="ts">
import { useTemplateRef } from 'vue'
import Vcode from 'vue3-puzzle-vcode'
import { getRandomImg } from '@/utils'

defineOptions({
  name: 'PuzzleCode',
})

const imgs = getRandomImg(32) as string[]

// 组件实例
const puzzleVcode = useTemplateRef('puzzleVcode')

// 重置
function onReset() {
  if (puzzleVcode.value)
    puzzleVcode.value.reset()
}

// 成功回调
function onSuccess() {
  ElMessage({
    message: '验证成功',
    type: 'success',
  })
}
</script>

<template>
  <Card title="图片旋转验证码">
    <div class="flex-center flex-col space-y-2">
      <div class="flex-center">
        <Vcode
          ref="puzzleVcode" show type="inside" :imgs="imgs" :slider-size="40" :canvas-width="300"
          :canvas-height="238" class-name="puzzle-vcode" @success="onSuccess"
        />
      </div>

      <el-button type="success" @click="onReset">
        重置
      </el-button>
    </div>
  </Card>
</template>
