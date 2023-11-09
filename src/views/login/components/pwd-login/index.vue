<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import OtherLogin from '../other-login/index.vue'
import { LoginModuleEnum } from '@/enums/routeEnum'
import { formRules } from '@/utils/regexp'

interface FormProps {
  username: string
  password: string
}

const formRef = ref<FormInstance>()

const form = reactive<FormProps>({
  username: 'Henry',
  password: 'Henry123',
})

const remember = ref(false)

const rules = reactive<FormRules<FormProps>>({
  username: formRules.username,
  password: formRules.password,
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

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  formEl.resetFields()
}

const { toLoginModule } = useRouterPush()
</script>

<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" size="large" status-icon>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" />
      </el-form-item>
      <el-form-item>
        <div class="w-full flex-y-center justify-between">
          <el-checkbox v-model="remember" label="记住我" />
          <el-button type="primary" link @click="toLoginModule(LoginModuleEnum.RESET_PWD)">
            忘记密码?
          </el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="w-full flex-center flex-col">
          <el-button type="primary" round class="w-full" @click="submitForm(formRef)">
            登录
          </el-button>
          <el-button round class="mt-4 w-full !ml-0" @click="resetForm(formRef)">
            重置
          </el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="w-full flex-center">
          <el-button
            class="w-full"
            size="default"
            @click="toLoginModule(LoginModuleEnum.CODE_LOGIN)"
          >
            验证码登录
          </el-button>
          <el-button class="w-full" size="default" @click="toLoginModule(LoginModuleEnum.REGISTER)">
            注册账号
          </el-button>
        </div>
      </el-form-item>

      <OtherLogin />
    </el-form>
  </div>
</template>

<style scoped></style>
