<script setup lang="ts">
import type { PaginationProps } from 'element-plus'

defineOptions({ name: 'Pagination' })

withDefaults(defineProps<Props>(), {
  small: false,
  disabled: false,
  background: true,
  pagerCount: 5,
  pageSizes: () => [5, 10, 15, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper', // prev, pager, next, jumper, ->, total
})

interface Props extends Partial<PaginationProps> {
  sizeChange?: (value: number) => void
  currentChange?: (value: number) => void
  change?: (currentPage: number, pageSize: number) => void
  prevClick?: (value: number) => void
  nextClick?: (value: number) => void
}
</script>

<template>
  <el-pagination
    v-bind="$attrs"
    :total="total"
    :current-page="currentPage"
    :page-size="pageSize"
    :layout="layout"
    :page-sizes="pageSizes"
    :small="small"
    :disabled="disabled"
    :background="background"
    @size-change="sizeChange"
    @current-change="currentChange"
    @change="change"
    @prev-click="prevClick"
    @next-click="nextClick"
  />
</template>

<style scoped></style>
