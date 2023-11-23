import { getEnv } from '@/utils/env'

interface GlobConfig {
  title: string
}

export function useGlobSetting(): Readonly<GlobConfig> {
  const { VITE_GLOB_APP_TITLE } = getEnv()

  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
  }

  return glob
}
