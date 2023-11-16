import type { Router } from 'vue-router'
import { useI18n } from '@/hooks/web/useI18n'

const baseTitle: string = import.meta.env.VITE_GLOB_APP_TITLE

export function createPageTitleGuard(router: Router) {
  router.afterEach(async (to, _from, _next) => {
    const { t } = useI18n()
    const title = to.meta?.title || ''
    const i18nTitle = t(title as string)
    const pageTitle = i18nTitle ? `${i18nTitle} | ${baseTitle}` : `${baseTitle}`
    useTitle(`${pageTitle}`)
  })
}
