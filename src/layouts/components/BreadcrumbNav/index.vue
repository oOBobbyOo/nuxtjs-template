<script setup lang="ts">
import type { MenuRecordRaw } from '@/router/types'
import { useI18n } from '@/hooks/web/useI18n'
import { generateBreadcrumbs } from '@/utils/route'
import { isValidArray } from '@/utils/is'

defineOptions({ name: 'BreadcrumbNav' })

const { t } = useI18n()
const route = useRoute()
const { routerPush } = useRouterPush(true)

const breadcrumbs = ref<MenuRecordRaw[]>([])

breadcrumbs.value = generateBreadcrumbs(route)

function hanldeRoute(path: string) {
  routerPush(path)
}

watch(
  () => route.fullPath,
  () => {
    breadcrumbs.value = generateBreadcrumbs(route)
  },
)
</script>

<template>
  <el-breadcrumb separator="/" class="px-4">
    <template v-for="item in breadcrumbs" :key="item.path">
      <el-breadcrumb-item :to="item.path">
        <el-dropdown v-if="isValidArray(item.children)" trigger="hover" class="dark:text-white">
          <div flex-center>
            <Icon v-if="item.meta.icon" :icon="item.meta.icon" />
            <span pl-2>{{ t(item.meta.title) }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="child in item.children"
                :key="child.path"
                :command="child.path"
                @click="hanldeRoute(child.path)"
              >
                <Icon v-if="child.meta.icon" :icon="child.meta.icon" />
                <span pl-2>{{ t(child.meta.title) }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <template v-else>
          <div flex-center>
            <Icon v-if="item.meta.icon" :icon="item.meta.icon" />
            <span pl-2>{{ t(item.meta.title) }}</span>
          </div>
        </template>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style scoped></style>
