<script setup lang="ts">
import type { ColumnProps } from '@/typings/table'
import type { MenuRecordRaw } from '@/typings/router'

import { useTable } from '@/hooks/web/useTable'
import { getMenuList } from '@/api/menu'

const { t } = useI18n()

const { loading, tableData, pagination, getTableData, handleSizeChange, handleCurrentChange }
  = useTable(getMenuList, {
    pageSize: 15,
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
    prop: 'meta.icon',
    label: '图标',
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
    prop: 'meta.hideInMenu',
    label: '菜单状态',
    formatter: (row: MenuRecordRaw) => {
      return row.meta.hideInMenu ? '隐藏' : '显示'
    },
  },
])
</script>

<template>
  <Table
    title="菜单列表" row-key="path" :loading="loading" :data="tableData" :columns="columns" :pagination="pagination"
    :size-change="handleSizeChange" :current-change="handleCurrentChange" @refresh="getTableData"
  />
</template>

<style scoped></style>
