<script setup lang="tsx">
import type { ColumnProps, Scope } from '@/typings/table'
import type { MenuRecordRaw } from '@/typings/router'

import Icon from '@/components/Icon/index.vue'
import { useTable } from '@/hooks/web/useTable'
import { getMenuList } from '@/api/menu'
import { transformRouteToMenu } from '@/utils/route'

const { t } = useI18n()

const { loading, tableData, pagination, getTableData, handleSizeChange, handleCurrentChange }
  = useTable(getMenuList, {
    pageSize: 15,
    formatResult: (res: MenuRecordRaw[]) => {
      const menus = transformRouteToMenu(res)
      return menus
    },
  })

const columns = reactive<ColumnProps<MenuRecordRaw>[]>([
  {
    type: 'selection',
    label: '',
    fixed: true,
  },
  {
    type: 'index',
    label: '序号',
    width: 60,
    fixed: true,
  },
  {
    prop: 'meta.title',
    label: '菜单名称',
    formatter: (row: MenuRecordRaw) => {
      return t(row.meta.title)
    },
  },
  {
    prop: 'menuType',
    label: '菜单类型',
    render: (scope: Scope<MenuRecordRaw>) => {
      const type = scope.row?.children ? 'info' : 'success'
      const text = scope.row?.children ? '目录' : '菜单'
      return <el-tag type={type}> {text} </el-tag>
    },
  },
  {
    prop: 'meta.icon',
    label: '图标',
    render: (scope: Scope<MenuRecordRaw>) => {
      const iconName = scope.row.meta?.icon
      if (!iconName)
        return <span></span>
      return <Icon size="20" icon={iconName} />
    },
  },
  {
    prop: 'name',
    label: '路由名称',
  },
  {
    prop: 'path',
    label: '路由路径',
  },
  {
    prop: 'meta.hide',
    label: '菜单状态',
    render: (scope: Scope<MenuRecordRaw>) => {
      const type = scope.row.meta?.hide ? 'warning' : 'success'
      const text = scope.row.meta?.hide ? '隐藏' : '显示'
      return <el-tag type={type}> {text} </el-tag>
    },
  },
])
</script>

<template>
  <Table
    title="菜单列表"
    row-key="path"
    :loading="loading"
    :data="tableData"
    :columns="columns"
    :pagination="pagination"
    :size-change="handleSizeChange"
    :current-change="handleCurrentChange"
    :tool-button="['refresh', 'setting', 'size']"
    @refresh="getTableData"
  />
</template>

<style scoped></style>
