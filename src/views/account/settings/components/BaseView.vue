<script setup lang="ts">
import type { FormInstance, FormProps, FormRules } from 'element-plus'
import { formRules } from '@/utils/regexp'

const labelPosition = ref<FormProps['labelPosition']>('top')

const formRef = ref<FormInstance>()

interface BaseFormProps {
  email: string
  username: string
  profile: string
  address: string
  code: string
  phone: string
}

const form = reactive<BaseFormProps>({
  email: '',
  username: '',
  profile: '',
  address: '',
  code: '+86',
  phone: '',
})

const rules = reactive<FormRules<BaseFormProps>>({
  email: formRules.email,
  username: formRules.username,
  phone: formRules.phone,
})

const phoneCode = [
  {
    label: '中国',
    value: '+86',
  },
  {
    label: '香港',
    value: '+852',
  },
  {
    label: '澳门',
    value: '+853',
  },
  {
    label: '台湾',
    value: '+886',
  },
]

function submitForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      const { email, username, profile, address, code, phone } = form
      console.log('>>: email', email)
      console.log('>>: username', username)
      console.log('>>: profile', profile)
      console.log('>>: address', address)
      console.log('>>: code', code)
      console.log('>>: phone', phone)
    }
    else {
      console.log('error submit!')
      return false
    }
  })
}

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  formEl.resetFields()
}
</script>

<template>
  <el-form ref="formRef" :label-position="labelPosition" status-icon :rules="rules" :model="form">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" type="email" placeholder="请输入邮箱地址" />
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="个人简介" prop="profile">
      <el-input v-model="form.profile" type="textarea" placeholder="请输入个人简介" />
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-input v-model="form.address" type="textarea" placeholder="请输入详细地址" />
    </el-form-item>
    <el-form-item label="联系电话" prop="phone">
      <div class="flec-col w-full flex">
        <el-select v-model="form.code" class="mr-4">
          <el-option
            v-for="item in phoneCode"
            :key="item.value"
            :label="`${item.label} ${item.value}`"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="form.phone" placeholder="请输入联系电话" />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">
        提交
      </el-button>
      <el-button @click="resetForm(formRef)">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
