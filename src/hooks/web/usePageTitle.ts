import { useI18n } from '@/hooks/web/useI18n'

const baseTitle: string = import.meta.env.VITE_GLOB_APP_TITLE

export function usePageTitle() {
  const { t } = useI18n()
  const { currentRoute } = useRouter()
  const route = unref(currentRoute)

  const title = route.meta?.title || ''
  const i18nTitle = t(title as string)
  const pageTitle = i18nTitle ? `${i18nTitle}` : `${baseTitle}`

  return { title: pageTitle }
}
