interface Options {
  pageiable: boolean
  pageSize: number
}

export function usePagination(options: Options = { pageiable: true, pageSize: 10 }) {
  const pagination = reactive({
    pageiable: options.pageiable,
    pageSize: options.pageSize,
    currentPage: 1,
    total: 0,
  })

  function setPageSize(pageSize: number) {
    pagination.pageSize = pageSize
  }

  function setCurrentPage(page: number) {
    pagination.currentPage = page
  }

  function setTotal(value: number) {
    pagination.total = value
  }

  return {
    pagination,
    setPageSize,
    setCurrentPage,
    setTotal,
  }
}
