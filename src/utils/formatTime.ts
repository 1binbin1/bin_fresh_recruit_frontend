const FORMAT_DATA = 'YYYY-MM-DD hh:mm:ss'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function formatUTC(time: string, format: string = FORMAT_DATA) {
    return dayjs.utc(time).utcOffset(0).format(format) // 东八区
}

// 保留日期，去掉时间
export function keepDateRemoveTime(dateString: string) {
  // 解析日期并格式化为只包含日期部分
  const dateOnly = dayjs(dateString).format('YYYY-MM-DD')
  return dateOnly
}
