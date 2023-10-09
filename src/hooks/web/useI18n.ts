import type { VueI18n } from 'vue-i18n'
import { i18n } from '@/locales'

type I18nTranslationRestParameters = [string, any]

function getKey(namespace: string | undefined, key: string) {
  if (!namespace)
    return key

  if (key.startsWith(namespace))
    return key

  return `${namespace}.${key}`
}

export function useI18n(namespace?: string) {
  const normalFn = {
    t: (key: string) => {
      return getKey(namespace, key)
    },
  }

  if (!i18n)
    return normalFn

  const { t, ...methods } = i18n.global as VueI18n

  const tFn = (key: string, ...arg: any[]) => {
    if (!key)
      return ''
    if (!key.includes('.') && !namespace)
      return key
    return t(getKey(namespace, key) as string, ...(arg as I18nTranslationRestParameters))
  }

  return {
    ...methods,
    t: tFn,
  }
}
