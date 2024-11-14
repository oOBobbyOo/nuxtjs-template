<script setup lang="ts">
import { join, random, times, toLower } from 'lodash-es'
import { codeChars } from '@/utils'

defineOptions({
  name: 'GraphicCode',
})

const generaCode = ref('') // 输入的常规验证码
const identifyCode = ref('') // 图形验证码的值

// 刷新常规验证码
function refreshCode() {
  generaCode.value = ''
  identifyCode.value = join(
    times(4, () => codeChars[random(0, codeChars.length)]),
    '',
  )
}

// 验证码校验
function validateGeneraCode() {
  if (!generaCode.value) {
    ElMessage({
      message: '请输入验证码',
      type: 'error',
    })
  }
  else if (toLower(unref(generaCode)) !== toLower(unref(identifyCode))) {
    ElMessage({
      message: '请输入正确的验证码',
      type: 'error',
    })
  }
  else {
    ElMessage({
      message: '验证成功',
      type: 'success',
    })
  }
}

onMounted(() => {
  refreshCode()
})
</script>

<template>
  <Card title="图形验证码">
    <div class="flex-center flex-col space-y-2">
      <GeneraVerify
        :identify-code="identifyCode"
        :content-height="40"
        :content-width="160"
        :background-color-min="0"
        :background-color-max="255"
        class="cursor-pointer"
        @click="refreshCode"
      />

      <div>
        <el-input v-model="generaCode" placeholder="请输入验证码">
          <template #append>
            <el-button type="success" @click="validateGeneraCode">
              验证
            </el-button>
          </template>
        </el-input>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
