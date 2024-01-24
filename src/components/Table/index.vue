<script setup lang="ts">
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

defineOptions({ name: 'ETable' })

const props = withDefaults(defineProps<TableProps>(), {
  loading: false,
  rowKey: 'id',
  border: true,
  columns: () => [],
})

export interface Scope<T> {
  row: T
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}

type TypeProps = 'selection' | 'index' | 'expand' | 'tag' | 'image'

export interface ColumnProps<T = any> extends Partial<Omit<TableColumnCtx<T>, 'type'>> {
  type?: TypeProps // 列类型
  tagType?: 'success' | 'info' | 'warning' | 'danger' // 标签类型
  hidden?: boolean // 是否隐藏列
  isSlot?: boolean // 是否自定义
  render?: (scope: Scope<T>) => VNode | string // 自定义单元格内容渲染（tsx语法）
}

interface PaginationProps {
  pageiable?: boolean // 否显示分页
  currentPage?: number // 当前页
  pageSize?: number // 每页显示条数
  total?: number // 总条数
}

interface TableProps {
  loading?: boolean
  rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  data?: any[] // 表格数据
  columns: ColumnProps[] // 列配置项  ==> 必传
  border?: boolean // 是否带有纵向边框 ==> 非必传（默认为true）
  pagination?: PaginationProps
  sizeChange?: (value: number) => void
  currentChange?: (value: number) => void
}

// 过滤隐藏列
const tableColumns = computed(() => props.columns.filter(col => !col.hidden))

// column 列类型
const columnTypes: TypeProps[] = ['selection', 'index', 'expand', 'tag', 'image']
</script>

<template>
  <div class="table-card space-y-8">
    <!-- 表格 -->
    <el-table v-loading="loading" :data="data" :border="border" :row-key="rowKey" v-bind="$attrs">
      <!-- 默认插槽 -->
      <slot />

      <template v-for="column in tableColumns" :key="column.prop">
        <el-table-column
          v-if="column.type && columnTypes.includes(column.type)"
          v-bind="column"
          :align="column.align || 'center'"
          :reserve-selection="column.type === 'selection'"
        >
          <template #default="scope">
            <!-- image -->
            <template v-if="column.type === 'image'">
              <slot :name="column.type" v-bind="scope">
                <el-image

                  :hide-on-click-modal="true"
                  :preview-src-list="[scope.row[column.prop!]]"
                  :src="scope.row[column.prop!]"
                  fit="cover"
                  lazy preview-teleported
                  style="width: 100px; height: 100px"
                />
              </slot>
            </template>

            <!-- tag -->
            <template v-if="column.type === 'tag'">
              <slot :name="column.type" v-bind="scope">
                <el-tag
                  v-for="tag in scope.row[column.prop!]"
                  :key="tag.name"
                  :type="tag.type || column.tagType"
                  :color="tag.color"
                >
                  {{ tag.name }}
                </el-tag>
              </slot>
            </template>

            <!-- expand -->
            <template v-if="column.type === 'expand'">
              <component :is="column.render" v-if="column.render" v-bind="scope" />
              <slot v-else :name="column.type" v-bind="scope" />
            </template>
          </template>
        </el-table-column>

        <el-table-column
          v-if="!column.type && column.prop && !column.hidden"
          v-bind="column"
          :align="column.align || 'center'"
        >
          <template v-if="column.isSlot" #default="scope">
            <slot :name="column.prop" v-bind="scope" />
          </template>
        </el-table-column>
      </template>

      <!-- 插入至表格最后一行之后的内容 -->
      <template #append>
        <slot name="append" />
      </template>

      <!-- 无数据 -->
      <template #empty>
        <slot name="empty">
          <Empty description="暂无数据" />
        </slot>
      </template>
    </el-table>

    <!-- 分页 -->
    <slot name="pagination">
      <Pagination
        v-if="pagination?.pageiable"
        class="flex justify-end"
        :total="pagination.total"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :current-change="currentChange"
        :size-change="sizeChange"
      />
    </slot>
  </div>
</template>

<style scoped></style>
