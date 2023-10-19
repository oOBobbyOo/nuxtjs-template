<script setup lang="ts">
import type { DropdownInstance } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useAppStore } from '@/stores/modules/app'
import { useTabStore } from '@/stores/modules/tab'

defineOptions({ name: 'ContextMenu' })

const props = defineProps<Props>()

const emits = defineEmits(['clickTab'])

interface Props {
  fullPath: string
}

const { t } = useI18n()
const app = useAppStore()
const tab = useTabStore()

const actionItems = [
  {
    key: 'reload',
    label: t('layout.multipleTab.reload'),
    icon: 'ant-design:reload-outlined',
  },
  {
    key: 'close',
    label: t('layout.multipleTab.close'),
    icon: 'ant-design:close-outlined',
  },
  {
    key: 'closeLeft',
    label: t('layout.multipleTab.closeLeft'),
    icon: 'mdi:format-horizontal-align-left',
    divided: true,
  },
  {
    key: 'closeRight',
    label: t('layout.multipleTab.closeRight'),
    icon: 'mdi:format-horizontal-align-right',
  },
  {
    key: 'closeOther',
    label: t('layout.multipleTab.closeOther'),
    icon: 'ant-design:column-width-outlined',
    divided: true,
  },
  {
    key: 'closeAll',
    label: t('layout.multipleTab.closeAll'),
    icon: 'ant-design:line-outlined',
  },
]

const dropdownRef = ref<DropdownInstance>()

function hanldeAction(key: string) {
  switch (key) {
    case 'reload':
      app.reloadPage()
      break
    case 'close':
      tab.clearCurrentTab(props.fullPath)
      break
    case 'closeLeft':
      tab.clearLeftTab(props.fullPath)
      break
    case 'closeRight':
      tab.clearRightTab(props.fullPath)
      break
    case 'closeOther':
      tab.clearOtherTab(props.fullPath)
      break
    case 'closeAll':
      tab.clearAllTab()
      break
  }
}

function handleClickTab() {
  emits('clickTab')
}
</script>

<template>
  <el-dropdown ref="dropdownRef" trigger="contextmenu" class="!line-height-normal">
    <div @click.stop="handleClickTab">
      <slot />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in actionItems"
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
</template>

<style scoped></style>
