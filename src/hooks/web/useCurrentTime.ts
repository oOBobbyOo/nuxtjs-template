import { formatToDateTime } from '@/utils/time'

const DATE_TIME_FORMAT = 'YYYY年MM月DD日 HH:mm:ss'

export function useCurrentTime() {
  const time = ref(formatToDateTime(new Date(), DATE_TIME_FORMAT))
  let timer: ReturnType<typeof setInterval> // 定时器

  const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekDay = computed(() => weekday[new Date().getDay()])

  onMounted(() => {
    timer = setInterval(() => {
      time.value = formatToDateTime(new Date(), DATE_TIME_FORMAT)
    }, 1000)
  })

  onBeforeMount(() => {
    timer && clearInterval(timer)
  })

  return {
    time,
    weekDay,
  }
}
