import type { Router } from 'vue-router'
import { useGlobSetting } from '@/hooks/setting/useGlobSetting'
import { useI18n } from '@/hooks/web/useI18n'

export function createPageTitleGuard(router: Router) {
  router.afterEach(async (to, _from, _next) => {
    const { title: baseTitle } = useGlobSetting()
    const { t } = useI18n()
    const title = to.meta?.title || ''
    const i18nTitle = t(title as string)
    const pageTitle = i18nTitle ? `${i18nTitle} | ${baseTitle}` : `${baseTitle}`
    useTitle(`${pageTitle}`)
  })
}
