import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export interface EnumProps {
  label?: string // 选项框显示的文字
  value?: string | number | boolean | any[] // 选项框值
  disabled?: boolean // 是否禁用此选项
  tagType?: string // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

export type TypeProps = 'selection' | 'index' | 'expand' | 'tag' | 'image'

export type SearchType =
  | 'input'
  | 'input-number'
  | 'select'
  | 'select-v2'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'switch'
  | 'slider'

export interface SearchRenderScope {
  searchParams: { [key: string]: any }
  placeholder: string
  clearable: boolean
  options: EnumProps[]
  data: EnumProps[]
}

export type SearchProps = {
  el?: SearchType //  当前项搜索框的类型
  label?: string // 当前项搜索框的 label
  key?: string // 当搜索项 key 不为 prop 属性时，可通过 key 指定
  props?: any // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  tooltip?: string // 搜索提示
  order?: number // 搜索项排序（从大到小）
  span?: number // 搜索项所占用的列数，默认为 1 列
  offset?: number // 搜索字段左侧偏移列数
  defaultValue?: string | number | boolean | any[] | Ref<any> // 搜索项默认值
  render?: (scope: SearchRenderScope) => VNode // 自定义搜索内容渲染（tsx语法）
} & Partial<Record<BreakPoint, Responsive>>

export interface FieldNamesProps {
  label: string
  value: string
  children?: string
}

export interface Scope<T> {
  row: T
  $index: number
  column: TableColumnCtx<T>
  [key: string]: any
}

// 分页
export interface PaginationProps {
  pageiable?: boolean // 否显示分页
  currentPage?: number // 当前页
  pageSize?: number // 每页显示条数
  total?: number // 总条数
}

// 列配置
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
  excel?: boolean | Function // 是否下载或者自定义导出数据
  _children?: ColumnProps<T>[] // 多级表头
}

// 表格
export interface TableProps {
  title?: string // 表格标题 ==> 非必传
  loading?: boolean
  rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  data?: any[] // 表格数据
  columns: ColumnProps[] // 列配置项  ==> 必传
  border?: boolean // 是否带有纵向边框 ==> 非必传（默认为true）
  isShowSearch?: boolean // 是否显示搜索查询
  toolButton?: ('refresh' | 'download' | 'setting' | 'size')[] | boolean // 是否显示表格功能按钮 ==> 非必传（默认为true）
  searchParams?: { [key: string]: any } // 搜索参数
  searchCol?: number | Record<BreakPoint, number> // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
  pagination?: PaginationProps // 分页配置
  sizeChange?: (value: number) => void
  currentChange?: (value: number) => void
}
