<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { formRules } from '@/utils/regexp'

interface FormProps {
  username: string
  realName: string
  birth: string
  age: string
  sex: string
  email: string
  phone: string
  donation: string
  currency: string
  website: string
  profile: string
  password: string
  address: string
}

const form = reactive<FormProps>({
  username: '', // 用户名
  realName: '', // 真实名字
  birth: '', // 出生日期
  age: '', // 年龄
  sex: '', // 性别
  email: '', // 邮箱
  phone: '', // 手机号码
  donation: '', // 捐赠
  currency: '￥', // 货币
  website: '', // 站点
  profile: '', // 个人信息,
  password: '', // 密码
  address: '', // 地址
})

const formRef = ref<FormInstance>()

const rules = reactive<FormRules<FormProps>>({
  username: formRules.username,
  realName: formRules.realName,
  email: formRules.email,
  phone: formRules.phone,
  password: formRules.password,
})

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid, fields) => {
    if (valid)
      console.log('submit!', toRefs(form))
    else console.log('error submit!', fields)
  })
}

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  formEl.resetFields()
}
</script>

<template>
  <Card title="基础表单">
    <el-form ref="formRef" :model="form" :rules="rules" status-icon label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="真实名字" prop="realName">
        <el-input v-model="form.realName" placeholder="请输入真实名字" />
      </el-form-item>
      <el-form-item label="出生日期" prop="birth">
        <el-date-picker
          v-model="form.birth"
          type="date"
          placeholder="请输入出生日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="form.age" placeholder="请输入年龄" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择性别" style="width: 100%">
          <el-option label="男" value="0" />
          <el-option label="女" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="捐赠" prop="donation">
        <el-input v-model.number="form.donation">
          <template #append>
            <el-select v-model="form.currency" placeholder="请选择" style="width: 60px">
              <el-option label="￥" value="￥" />
              <el-option label="$" value="$" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="站点" prop="website">
        <el-input v-model="form.website" placeholder="请输入网址">
          <template #prepend>
            https://
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="个人信息" prop="profile">
        <el-input
          v-model="form.profile"
          :autosize="{ minRows: 3, maxRows: 5 }"
          type="textarea"
          maxlength="100"
          show-word-limit
          placeholder="请输入个人信息"
        />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
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
  </Card>
</template>

<style scoped></style>
