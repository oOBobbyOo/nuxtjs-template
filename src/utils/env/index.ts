import pkg from '../../../package.json'

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_TITLE } = getEnv()
  return `${VITE_GLOB_APP_TITLE.replace(/\s/g, '_')}__${getEnv()}`.toUpperCase()
}

// Generate cache key according to version
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase()
}

/**
 * @description 获取环境变量
 */
export function getEnv(): ImportMetaEnv {
  return import.meta.env
}

/**
 * @description 获取环境模式
 */
export function getEnvMode(): string {
  return import.meta.env.MODE
}

/**
 * @description 开发模式
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * @description 生产模式
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}

/**
 * @description Development mode
 */
export const devMode = 'development' || 'dev'

/**
 * @description Production mode
 */
export const prodMode = 'production' || 'prod'

/**
 * @description 是否开发环境
 */
export const isDev = getEnvMode() === devMode

/**
 * @description 是否生产环境
 */
export const isProd = getEnvMode() === prodMode
