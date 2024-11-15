<script setup lang="ts">
import { toString } from 'lodash-es'

defineOptions({
  name: 'OperationCode',
})

const generaCode = ref('') // 输入的常规验证码
const result = ref(0) // 运算验证码的结果

// 验证码校验
function validateGeneraCode() {
  if (!generaCode.value) {
    ElMessage({
      message: '请输入验证码',
      type: 'error',
    })
  }
  else if (unref(generaCode) !== toString(unref(result))) {
    ElMessage({
      message: '很遗憾，答案错误，请再试一次',
      type: 'error',
    })
  }
  else {
    ElMessage({
      message: '恭喜您，答案正确！',
      type: 'success',
    })
  }
}
</script>

<template>
  <Card title="运算验证码">
    <div class="flex-center flex-col space-y-2">
      <OperationVerify v-model="result" :width="160" :height="40" class="cursor-pointer" />
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
