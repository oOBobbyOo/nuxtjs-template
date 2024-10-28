<script setup lang="ts">
import { RoleEnum } from '@/enums/roleEnum'
import { getTimeState } from '@/utils/time'
import { useRequest } from '@/hooks/web/useRequest'
import { loginByUser } from '@/api/login'
import { useUserStore } from '@/stores/modules/user'

interface FormProps {
  username: string
  password: string
}

const accounts: Record<string, FormProps> = {
  super: {
    username: 'super',
    password: '123456',
  },
  admin: {
    username: 'admin',
    password: '123456',
  },
  user: {
    username: 'user',
    password: '123456',
  },
}

const form = reactive<FormProps>({
  username: '',
  password: '',
})

const userStore = useUserStore()
const { username, password } = toRefs(form)

// 登录
const { loading, runAsync } = useRequest(
  () => loginByUser({ username: unref(username), password: unref(password) }),
  {
    manual: true,
  },
)

const { routerPush } = useRouterPush()

function notify() {
  ElNotification.success({
    message: getTimeState(),
    title: '欢迎登录',
    duration: 1000,
    onClose: () => {
      routerPush('/')
    },
  })
}

function toogleAccount(role: string) {
  const account = accounts[role]
  if (account) {
    form.username = account.username
    form.password = account.password

    runAsync()
      .then((data) => {
        const { token, ...userInfo } = data
        // 存储 token
        userStore.setToken(token)
        // 存储 用户信息
        userStore.setUserInfo(userInfo)
        // 提示登录成功并跳转首页
        notify()
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<template>
  <div class="mt-8">
    <el-divider>其他账号登录</el-divider>
    <div class="w-full flex-center">
      <el-button type="primary" size="default" :loading="loading" @click="toogleAccount(RoleEnum.SUPER)">
        超级管理员
      </el-button>
      <el-button type="primary" size="default" :loading="loading" @click="toogleAccount(RoleEnum.ADMIN)">
        管理员
      </el-button>
      <el-button type="primary" size="default" :loading="loading" @click="toogleAccount(RoleEnum.USER)">
        普通用户
      </el-button>
    </div>
  </div>
</template>

<style scoped></style>
