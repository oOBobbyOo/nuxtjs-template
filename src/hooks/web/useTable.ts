import { usePagination } from './usePagination'
import type { Params } from '@/typings/api'

interface Options<T> {
  defaultParams?: Params // 默认查询参数
  formatResult?: (data: T[]) => any // 请求成功对结果数据进行处理
  onSuccess?: () => void // 请求成功回调
  onError?: (error: any) => void // 请求失败回调
  pageiable?: boolean // 是否有分页 (非必传，默认为true)
  pageSize?: number // 分页条数 (非必传，默认为10)
  immediate?: boolean // 是否立即触发请求
  rowKey?: keyof T // 表格的数据rowKey
}

// 分页请求参数类型
export interface PageParams {
  pageNum?: number
  pageSize?: number
}

// 表格分页数据格式
interface TableRes<T> {
  list: T
  total?: number
}

type Api<T> = (params: any) => Promise<TableRes<T[]>>

export function useTable<T = any[]>(api?: Api<T>, options?: Options<T>) {
  const {
    defaultParams = {},
    formatResult,
    onSuccess,
    onError,
    pageiable = true,
    pageSize = 10,
    immediate,
  } = options || {}

  const loading = ref(false)

  const dataSource = ref<T[]>([])

  const { pagination, setPageSize, setCurrentPage, setTotal } = usePagination({
    pageiable,
    pageSize,
  })

  const searchParams = reactive({ ...defaultParams })

  // 分页请求参数
  const pageParams: Ref<PageParams> = computed(() => {
    return pageiable
      ? {
          pageNum: pagination.currentPage,
          pageSize: pagination.pageSize,
        }
      : {}
  })

  // 总参数 (包含搜索和分页参数)
  // const updatedTotalParams = () => { }

  const getTableData = async () => {
    if (!api)
      return
    try {
      loading.value = true
      const res = await api({ ...searchParams, ...pageParams.value })
      dataSource.value = formatResult ? formatResult(res?.list) : res?.list
      const total = res?.total || dataSource.value.length
      setTotal(total)
      onSuccess && onSuccess()
    }
    catch (error) {
      onError && onError(error)
    }
    finally {
      loading.value = false
    }
  }

  // 处理表格数据
  const tableData = computed(() => {
    if (!pagination.pageiable)
      return dataSource.value
    return dataSource.value.slice(
      (pagination.currentPage - 1) * pagination.pageSize,
      pagination.currentPage * pagination.pageSize,
    )
  })

  onMounted(() => {
    // 是否立即触发
    const isImmediate = immediate ?? true
    isImmediate && getTableData()
  })

  // 搜索
  const handleSearch = () => {
    setCurrentPage(1)
    getTableData()
  }

  // 重置
  const handleReset = () => {
    setCurrentPage(1)
    setPageSize(pageSize)
    // 重置搜索请求参数
    getTableData()
  }

  // 每页条数改变
  const handleSizeChange = async (val: number) => {
    setCurrentPage(1)
    setPageSize(val)
    getTableData()
  }

  // 当前页改变
  const handleCurrentChange = async (val: number) => {
    setCurrentPage(val)
    getTableData()
  }

  return {
    loading,
    tableData,
    pagination,
    searchParams,
    getTableData,
    handleSearch,
    handleReset,
    handleSizeChange,
    handleCurrentChange,
  }
}
