<script setup lang="ts">
import { CodeLogin, LoginBg, PwdLogin, RegisterUser, ResetPwd } from './components'
import { LoginModuleEnum } from '@/enums/routeEnum'
import SwitchDarkMode from '@/components/SwitchDarkMode/index.vue'

defineOptions({ name: 'Login' })

const props = defineProps<Props>()

const themeColor = '#eee'

interface Props {
  module: LoginModuleEnum
}

interface LoginModule {
  key: string
  label: string
  component: Component
}

const modules: LoginModule[] = [
  { key: LoginModuleEnum.PWD_LOGIN, label: '密码登录', component: PwdLogin },
  { key: LoginModuleEnum.CODE_LOGIN, label: '验证码登录', component: CodeLogin },
  { key: LoginModuleEnum.REGISTER, label: '注册账号', component: RegisterUser },
  { key: LoginModuleEnum.RESET_PWD, label: '重置密码', component: ResetPwd },
]

const activeModule = computed(() => {
  const active: LoginModule = { ...modules[0] }
  const findItem = modules.find(item => item.key === props.module)
  if (findItem)
    Object.assign(active, findItem)

  return active
})
</script>

<template>
  <div class="relative wh-full flex-center">
    <div class="login-content rounded-4 bg-white p-6 dark:bg-gray-2 dark:bg-opacity-4">
      <div class="w-300px sm:w-360px">
        <div class="flex-center flex-col">
          <Logo />
          <span class="text-lg text-gray-500 dark:text-white">中后台管理系统</span>
        </div>
        <main class="pt-4">
          <h3 class="text-4 font-medium text-blue-5">
            {{ activeModule.label }}
          </h3>
          <div class="pt-4">
            <transition name="fade-slide" mode="out-in" appear>
              <component :is="activeModule.component" />
            </transition>
          </div>
        </main>
      </div>
    </div>
    <SwitchDarkMode />
    <LoginBg :color="themeColor" />
  </div>
</template>

<style scoped lang="less">
.login-content {
  box-shadow: 0 2px 10px 2px rgb(0 0 0 / 10%);
}
</style>
