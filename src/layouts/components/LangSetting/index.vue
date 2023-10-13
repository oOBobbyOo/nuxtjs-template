<script setup lang="ts">
import { useLocale } from '@/hooks/web/useLocale'
import type { LocaleType } from '@/typings/locale'

defineOptions({ name: 'LangSetting' })

const langItems = [
  {
    key: 'zh_CN',
    label: '简体中文',
    icon: 'zh_CN|svg',
  },
  {
    key: 'en',
    label: 'English',
    icon: 'en_US|svg',
  },
]

const { changeLocale } = useLocale()

function handleLang(lang: LocaleType) {
  changeLocale(lang)
}
</script>

<template>
  <div h-full flex-center cursor-pointer px-2>
    <el-dropdown trigger="click" class="dark:text-white" @command="handleLang">
      <Icon :size="16" icon="i-cil-language" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in langItems" :key="item.key" :command="item.key">
            <Icon size="20" :icon="item.icon" />
            <span ml-2>{{ item.label }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
