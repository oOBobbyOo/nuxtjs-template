<script setup lang="ts">
import { useTemplateRef } from 'vue'

defineOptions({
  name: 'DragCode',
})

const dragVerify = useTemplateRef('dragVerify')

// 是否验证成功
const isPassing = ref(false)

// 成功回调
function onSuccess(seconds: number) {
  console.log('验证成功', seconds)
}

// 还原验证码
function onReset() {
  if (dragVerify.value) {
    isPassing.value = false
    dragVerify.value.reset()
  }
}
</script>

<template>
  <Card title="滑块验证码">
    <div class="flex-center flex-col space-y-2">
      <DragVerify ref="dragVerify" v-model:is-passing="isPassing" :width="300" @passcallback="onSuccess">
        <template #textBefore>
          <Icon :icon="isPassing ? 'ri:lock-unlock-line' : 'ri:lock-line'" />
        </template>
      </DragVerify>

      <el-button type="success" @click="onReset">
        重置
      </el-button>
    </div>
  </Card>
</template>
