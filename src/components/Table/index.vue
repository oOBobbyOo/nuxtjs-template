<script setup lang="ts">
import type { TableInstance } from 'element-plus'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import TableSearch, { type SearchProps } from './TableSearch.vue'
import { useTableSelection } from '@/hooks/web/useTableSelection'

defineOptions({ name: 'ETable' })

const props = withDefaults(defineProps<TableProps>(), {
  loading: false,
  rowKey: 'id',
  border: true,
  isShowSearch: false,
  columns: () => [],
})

const emit = defineEmits<{
  search: []
  reset: []
}>()

type TypeProps = 'selection' | 'index' | 'expand' | 'tag' | 'image'

export interface Scope<T> {
  row: T
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}

export interface EnumProps {
  label?: string // 选项框显示的文字
  value?: string | number | boolean | any[] // 选项框值
  disabled?: boolean // 是否禁用此选项
  tagType?: string // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

export interface FieldNamesProps {
  label: string
  value: string
  children?: string
}

export interface ColumnProps<T = any> extends Partial<Omit<TableColumnCtx<T>, 'type'>> {
  type?: TypeProps // 列类型
  tagType?: 'success' | 'info' | 'warning' | 'danger' // 标签类型
  search?: SearchProps | undefined // 搜索项配置
  enum?: EnumProps[] | Ref<EnumProps[]> | ((params?: any) => Promise<any>) // 枚举字典
  isFilterEnum?: boolean | Ref<boolean> // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
  fieldNames?: FieldNamesProps // 指定 label && value && children 的 key 值
  isHidden?: boolean // 是否隐藏列
  isSlot?: boolean // 是否自定义
  render?: (scope: Scope<T>) => VNode | string // 自定义单元格内容渲染（tsx语法）
  _children?: ColumnProps<T>[] // 多级表头
}

export interface PaginationProps {
  pageiable?: boolean // 否显示分页
  currentPage?: number // 当前页
  pageSize?: number // 每页显示条数
  total?: number // 总条数
}

interface TableProps {
  title?: string // 表格标题 ==> 非必传
  loading?: boolean
  rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  data?: any[] // 表格数据
  columns: ColumnProps[] // 列配置项  ==> 必传
  border?: boolean // 是否带有纵向边框 ==> 非必传（默认为true）
  isShowSearch?: boolean // 是否显示搜索查询
  searchParams?: { [key: string]: any } // 搜索参数
  pagination?: PaginationProps
  sizeChange?: (value: number) => void
  currentChange?: (value: number) => void
}

// table 实例
const tableRef = ref<TableInstance>()

// 表格多选 Hooks
const { selectionChange, selectAll, selectedList, selectedListIds, isSelected } = useTableSelection(props.rowKey)

// 清空选中
const clearSelection = () => tableRef.value!.clearSelection()
// 全选/全不选
const toggleAllSelection = () => tableRef.value!.toggleAllSelection()

// column 列类型
const columnTypes: TypeProps[] = ['selection', 'index', 'expand', 'tag', 'image']

// 接收 columns 过滤隐藏列，并设置为响应式
const tableColumns = reactive<ColumnProps[]>(props.columns.filter(col => !col.isHidden))

// 扁平化 columns
const flatColumns = computed(() => flatColumnsFunc(unref(tableColumns)))

// 过滤需要搜索的配置项 && 排序
const searchColumns = computed(() => {
  return flatColumns.value
    ?.filter(item => item.search?.el || item.search?.render)
    .sort((a, b) => a.search!.order! - b.search!.order!)
})

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>())

async function setEnumMap({ prop, enum: enumValue }: ColumnProps) {
  if (!enumValue)
    return

  // 如果当前 enumMap 存在相同的值 return
  if (
    enumMap.value.has(prop!)
    && (typeof enumValue === 'function' || enumMap.value.get(prop!) === enumValue)
  )
    return

  // 当前 enum 为静态数据，则直接存储到 enumMap
  if (typeof enumValue !== 'function')
    return enumMap.value.set(prop!, unref(enumValue!))

  // 为了防止接口执行慢，而存储慢，导致重复请求，所以预先存储为[]，接口返回后再二次存储
  enumMap.value.set(prop!, [])

  // 当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  const { data } = await enumValue()
  enumMap.value.set(prop!, data)
}

// 注入 enumMap
provide('enumMap', enumMap)

// 扁平化 columns 的方法
function flatColumnsFunc(columns: ColumnProps[], flatArr: ColumnProps[] = []) {
  columns.forEach(async (col) => {
    if (col._children?.length)
      flatArr.push(...flatColumnsFunc(col._children))
    flatArr.push(col)

    // column 添加默认 isHidden && isFilterEnum 属性值
    col.isHidden = col.isHidden ?? false
    col.isFilterEnum = col.isFilterEnum ?? true

    // 设置 enumMap
    await setEnumMap(col)
  })
  return flatArr.filter(item => !item._children?.length)
}

// 搜索
function handleSearch() {
  emit('search')
}

// 重置
function handleReset() {
  emit('reset')
}

// 暴露给父组件的参数和方法 (外部需要什么，都可以从这里暴露出去)
defineExpose({
  el: tableRef,
  clearSelection,
  toggleAllSelection,
})
</script>

<template>
  <div class="table-card">
    <div v-if="isShowSearch" class="table-search">
      <TableSearch
        :search-columns="searchColumns"
        :search-params="searchParams"
        :search="handleSearch"
        :reset="handleReset"
      />
    </div>

    <div class="table-content">
      <div class="table-header items-center; flex justify-between">
        <div class="flex items-center space-x-2">
          <div v-if="title" class="table-title">
            {{ title }}
          </div>
          <div class="table-selection">
            <slot name="header" :selected-list="selectedList" :selected-list-ids="selectedListIds" :is-selected="isSelected" />
          </div>
        </div>
        <div class="table-tool" />
      </div>

      <!-- 表格 -->
      <el-table
        ref="tableRef"
        v-bind="$attrs"
        v-loading="loading"
        :data="data"
        :border="border"
        :row-key="rowKey"
        @selection-change="selectionChange"
        @select-all="selectAll"
      >
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
                    lazy
                    preview-teleported
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
            v-if="!column.type && column.prop && !column.isHidden"
            v-bind="column"
            :align="column.align || 'center'"
          >
            <template #default="scope">
              <component :is="column.render" v-if="column.render" v-bind="scope" />
              <slot v-if="column.isSlot" :name="column.prop" v-bind="scope" />
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
  </div>
</template>

<style scoped lang="less">
.table-card {
  .table-search {
    @apply bg-white dark:bg-dark p-6 b-rd-1 mb-3;
    box-shadow:
      0 1px 2px 0 rgb(0 0 0 / 3%),
      0 1px 6px -1px rgb(0 0 0 / 2%),
      0 2px 4px 0 rgb(0 0 0 / 2%);
  }

  .table-content {
    @apply bg-white dark:bg-dark p-6 b-rd-1 mb-3 space-y-6;

    box-shadow:
      0 1px 2px 0 rgb(0 0 0 / 3%),
      0 1px 6px -1px rgb(0 0 0 / 2%),
      0 2px 4px 0 rgb(0 0 0 / 2%);

    ::v-deep(.el-table .cell) {
      white-space: nowrap;
    }
  }
}
</style>
