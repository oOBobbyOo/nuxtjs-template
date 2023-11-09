<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { LoginModuleEnum } from '@/enums/routeEnum'
import { formRules } from '@/utils/regexp'

interface FormProps {
  phone: string
  smsCode: string
}

const formRef = ref<FormInstance>()

const form = reactive<FormProps>({
  phone: '',
  smsCode: '',
})

const rules = reactive<FormRules<FormProps>>({
  phone: formRules.phone,
  smsCode: formRules.smsCode,
})

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      console.log('>>: form', form)
    }
    else {
      console.log('error submit!', fields)
    }
  })
}

const { toLoginModule } = useRouterPush()
</script>

<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" size="large" status-icon>
      <el-form-item prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="smsCode">
        <div class="w-full flex-y-center">
          <el-input v-model="form.smsCode" placeholder="请输入验证码" />
          <el-button class="ml-4">
            获取验证码
          </el-button>
        </div>
      </el-form-item>
      <el-form-item class="!mb-0">
        <div class="w-full flex-center flex-col">
          <el-button type="primary" round class="w-full" @click="submitForm(formRef)">
            登录
          </el-button>
          <el-button
            round
            class="mt-4 w-full !ml-0"
            @click="toLoginModule(LoginModuleEnum.PWD_LOGIN)"
          >
            返回
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
