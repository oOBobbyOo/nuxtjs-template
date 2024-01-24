type MessageType = 'success' | 'info' | 'warning' | 'error'

export function useOperationTable(
  api: (params: any) => Promise<any>,
  params: any = {},
  message: string,
  confirmType: MessageType = 'warning',
) {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(`是否${message}?`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: confirmType,
      draggable: true,
    })
      .then(async () => {
        try {
          await api(params)
          ElMessage({
            type: 'success',
            message: `${message}成功!`,
          })
          resolve(true)
        }
        catch (error) {
          reject(error)
        }
      })
      .catch(() => {
        ElMessage({
          type: 'success',
          message: '取消成功!',
        })
        resolve(true)
      })
  })
}
