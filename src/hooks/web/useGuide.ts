import type { Config, Driver } from 'driver.js'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useI18n } from '@/hooks/web/useI18n'
import { useLocaleStoreWithOut } from '@/stores/modules/locale'

export function useGuide(options?: Config) {
  const { t } = useI18n()
  const localeStore = useLocaleStoreWithOut()

  let driverObj: Driver = createDriver()

  function createDriver() {
    return driver({
      showProgress: true,
      nextBtnText: t('common.guide.nextBtnText'),
      prevBtnText: t('common.guide.prevBtnText'),
      doneBtnText: t('common.guide.doneBtnText'),
      steps: [
        {
          element: '.sidebar-trigger',
          popover: {
            title: t('common.guide.sidebarTrigger.title'),
            description: t('common.guide.sidebarTrigger.description'),
          },
        },
        {
          element: '.breadcrumb-nav',
          popover: {
            title: t('common.guide.breadcrumbNav.title'),
            description: t('common.guide.breadcrumbNav.description'),
          },
        },
        {
          element: '.multiple-tabs',
          popover: {
            title: t('common.guide.multipleTabs.title'),
            description: t('common.guide.multipleTabs.description'),
          },
        },
      ],
      ...options,
    })
  }

  watch(
    () => localeStore.localeInfo.locale,
    () => {
      driverObj.destroy()
      driverObj = createDriver()
    },
  )

  return driverObj
}
