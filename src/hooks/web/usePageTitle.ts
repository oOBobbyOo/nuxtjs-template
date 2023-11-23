import { useGlobSetting } from '@/hooks/setting/useGlobSetting'
import { useI18n } from '@/hooks/web/useI18n'
import { useLocaleStore } from '@/stores/modules/locale'

export function usePageTitle() {
  const { title } = useGlobSetting()
  const { t } = useI18n()
  const localeStore = useLocaleStore()
  const { currentRoute } = useRouter()
  const pageTitle = ref('')

  watch(
    [() => currentRoute.value.path, () => localeStore.getLocale],
    () => {
      const route = unref(currentRoute)
      const i18nTitle = t(route?.meta?.title as string)
      pageTitle.value = i18nTitle ? `${i18nTitle}` : `${title}`
    },
    { immediate: true },
  )

  return pageTitle
}
