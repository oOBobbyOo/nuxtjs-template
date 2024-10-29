import type { RoleEnum } from '@/enums/roleEnum'
import { getTimeState } from '@/utils/time'
import { useRequest } from '@/hooks/web/useRequest'
import { loginByUser, logout as logoutApi } from '@/api/login'
import { useUserStore } from '@/stores/modules/user'
import { usePermissionStore } from '@/stores/modules/permission'
import { useTabStore } from '@/stores/modules/tab'

export interface FormProps {
  username: string
  password: string
}

export const accounts: Record<string, FormProps> = {
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

export function useLogin() {
  const form = reactive<FormProps>({
    username: 'admin',
    password: '123456',
  })

  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  const tabStore = useTabStore()

  const { username, password } = toRefs(form)

  // 登录
  const { runAsync } = useRequest(
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

  function toogleAccount(role: RoleEnum) {
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

  async function logout() {
    try {
      await logoutApi()

      // 重置信息
      await userStore.resetStore()
      await permissionStore.resetStore()
      await tabStore.resetStore()

      // 重定向到登录页
      routerPush('/login')
    }
    catch (error) {
      ElMessage({
        message: '退出登录失败！',
        type: 'error',
      })
    }
  }

  return {
    toogleAccount,
    logout,
  }
}
