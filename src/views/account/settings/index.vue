<script setup lang="ts">
import BaseView from './components/BaseView.vue'
import BindingView from './components/BindingView.vue'
import SecurityView from './components/SecurityView.vue'
import NotificationView from './components/NotificationView.vue'

// const tabPosition = ref<'left' | 'right' | 'top' | 'bottom'>('left')
const tabPosition = computed(() => {
  return unref(isMobile) ? 'top' : 'left'
})

const tabItems = [
  {
    key: 'base',
    label: '基本设置',
    component: BaseView,
  },
  {
    key: 'security',
    label: '安全设置',
    component: SecurityView,
  },
  {
    key: 'binding',
    label: '账号绑定',
    component: BindingView,
  },
  {
    key: 'notification',
    label: '新消息通知',
    component: NotificationView,
  },
]
</script>

<template>
  <PageWrap>
    <el-tabs :tab-position="tabPosition" :stretch="true" class="h-full">
      <el-tab-pane v-for="item in tabItems" :key="item.key" :label="item.label">
        <div px-4>
          <component :is="item.component" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </PageWrap>
</template>

<style scoped></style>
