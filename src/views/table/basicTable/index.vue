<script setup lang="ts">
import { getTableData } from '@/api/table'
import { useRequest } from '@/hooks/web/useRequest'

const { loading, data } = useRequest(getTableData)

const columns = [
  {
    prop: 'name',
    label: '姓名',
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
  return unref(data)?.basicTable
})
</script>

<template>
  <Card title="基础表格">
    <Table :loading="loading" :data="basicTable" :columns="columns" />
  </Card>
</template>

<style scoped></style>
