<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { useUserStore } from '@/stores/modules/user'
import { useLogin } from '@/hooks/web/useLogin'

defineOptions({ name: 'UserProfile' })

const { getUserInfo } = useUserStore()

const { t } = useI18n()

const userItems = [
  {
    key: 'account',
    label: t('layout.header.userAccount'),
    icon: 'ant-design:idcard-outlined',
  },
  {
    key: 'setting',
    label: t('layout.header.userSetting'),
    icon: 'ant-design:form-outlined',
  },
  {
    key: 'logout',
    label: t('layout.header.userLogout'),
    icon: 'ion:md-exit',
    divided: true,
  },
]

const { routerPush } = useRouterPush()
const { logout } = useLogin()

function handleLogout() {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示 🧡', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    logout()
  })
}

function hanldeAction(key: string) {
  if (key === 'logout')
    handleLogout()
  else if (key === 'account')
    routerPush('/account/center')
  else routerPush('/account/settings')
}
</script>

<template>
  <div h-full flex-center cursor-pointer px-2>
    <el-dropdown>
      <div class="flex-center dark:text-white">
        <el-avatar v-if="getUserInfo?.avatar" :size="24" :src="getUserInfo?.avatar" />
        <Icon v-else :size="26" icon="ic:outline-account-circle" />
        <span pl-2 text-3>
          {{ getUserInfo?.realName || '用户名' }}
        </span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in userItems"
            :key="item.key"
            :divided="item.divided"
            @click="hanldeAction(item.key)"
          >
            <Icon size="16" :icon="item.icon" />
            <span ml-2>{{ item.label }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
