import type { Recordable } from '@/typings'
import type { LocaleType } from '@/typings/locale'

import { i18n } from '@/locales'
import { loadLocalePool, setHtmlPageLang } from '@/locales/helper'
import { useLocaleStoreWithOut } from '@/stores/modules/locale'

interface LangModule {
  message: Recordable
  dateLocale: Recordable
  dateLocaleName: string
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut()

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  }
  else {
    ;(i18n.global.locale as any).value = locale
  }
  localeStore.setLocaleInfo({ locale })
  setHtmlPageLang(locale)
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut()
  const getLocale = computed(() => localeStore.getLocale)
  const getShowLocalePicker = computed(() => localeStore.getShowPicker)

  const getElLocale = computed((): any => {
    return (i18n.global.getLocaleMessage(unref(getLocale)) as any)?.elLocale ?? {}
  })

  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)
    if (currentLocale === locale)
      return locale

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }

    const langModule = ((await import(`../../locales/lang/${locale}.ts`)) as any)
      .default as LangModule
    if (!langModule)
      return

    const { message } = langModule

    globalI18n.setLocaleMessage(locale, message)
    loadLocalePool.push(locale)

    setI18nLanguage(locale)
    return locale
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
    getElLocale,
  }
}
