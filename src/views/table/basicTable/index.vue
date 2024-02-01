<script setup lang="ts">
import { getBasicTable } from '@/api/table'
import { useRequest } from '@/hooks/web/useRequest'

const { loading, data } = useRequest(getBasicTable)

const columns = [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'gender',
    label: '性别',
    formatter: (row: { gender: number }): string => {
      return row.gender ? '男' : '女'
    },
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'email',
    label: '邮箱',
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'ctime',
    label: '创建时间',
  },
]

const basicTable = computed(() => {
  return unref(data)?.list
})
</script>

<template>
  <Table title="基础表格" :loading="loading" :data="basicTable" :columns="columns" />
</template>

<style scoped></style>
