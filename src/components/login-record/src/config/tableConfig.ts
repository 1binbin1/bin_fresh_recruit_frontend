import type { ItableConfig } from '@/components/base/kl-table'

export const tableConfig: ItableConfig = {
  isShowIndex: true,
  title: '登录记录表',
  propList: [
    { field: 'login_ip', label: '登录IP', minWidth: '100', slotName: 'login_ip' },
    { field: 'login_country', label: '国家', minWidth: '60', slotName: 'login_country' },
    { field: 'login_province', label: '省份', minWidth: '60', slotName: 'login_province' },
    { field: 'login_city', label: '城市', minWidth: '60', slotName: 'login_city' },
    { field: 'login_address', label: '登录地址', minWidth: '100', slotName: 'login_address' },
    { field: 'login_device', label: '登录设备', minWidth: '200', slotName: 'login_device' },
    { field: 'create_time', label: '登录时间', minWidth: '170', slotName: 'create_time' },
  ]
}
