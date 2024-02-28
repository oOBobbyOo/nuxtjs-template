<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { useDrawer } from '@/hooks/web/useDrawer'
import { genderType } from '@/config'

interface DrawerProps {
  title: string
  isView: boolean
  row: any
  api?: (params: any) => Promise<any>
  refresh?: () => void
}

const drawerProps = ref<DrawerProps>({
  title: '',
  isView: false,
  row: {},
})

const rules = reactive({
  username: [{ required: true, message: '请填写用户姓名' }],
  gender: [{ required: true, message: '请选择性别' }],
  age: [{ required: true, message: '请填写年龄' }],
  email: [{ required: true, message: '请填写邮箱' }],
  address: [{ required: true, message: '请填写居住地址' }],
  status: [{ required: true, message: '请选择用户状态' }],
})

const { visible, openDrawer, closeDrawer } = useDrawer()

// 接收父组件传过来的参数
function acceptParams(params: DrawerProps) {
  drawerProps.value = params
  openDrawer()
}

// 表单实例
const formRef = ref<FormInstance>()

// 提交数据（新增/编辑）
function handleSubmit() {
  formRef.value!.validate(async (valid) => {
    if (!valid)
      return
    try {
      await drawerProps.value.api!(drawerProps.value.row)
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` })
      // 刷新数据并关闭
      drawerProps.value.refresh!()
      closeDrawer()
    }
    catch (error) {
      console.log(error)
    }
  })
}

defineExpose({
  acceptParams,
})
</script>

<template>
  <Drawer v-model:model-value="visible" :title="`${drawerProps.title}用户`" :size="450">
    <template #default>
      <el-form
        ref="formRef"
        :rules="rules"
        label-width="100px"
        label-suffix=" :"
        :disabled="drawerProps.isView"
        :model="drawerProps.row"
        :hide-required-asterisk="drawerProps.isView"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="drawerProps.row!.username" placeholder="请填写用户姓名" clearable />
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-select
            v-model="drawerProps.row!.gender"
            class="w-full"
            placeholder="请选择性别"
            clearable
          >
            <el-option
              v-for="item in genderType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="drawerProps.row!.age" placeholder="年龄" clearable />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="drawerProps.row!.email" placeholder="请填写邮箱" clearable />
        </el-form-item>

        <el-form-item label="居住地址" prop="address">
          <el-input v-model="drawerProps.row!.address" placeholder="请填写居住地址" clearable />
        </el-form-item>

        <el-form-item label="用户状态" prop="status">
          <el-switch
            v-model="drawerProps.row!.status"
            inline-prompt
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="closeDrawer">
        取消
      </el-button>
      <el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">
        确定
      </el-button>
    </template>
  </Drawer>
</template>
