export function useRouteActive() {
  const route = useRoute()

  function isRouteActive(path: string) {
    if (path === route.fullPath)
      return true
    return false
  }

  return {
    isRouteActive,
  }
}
