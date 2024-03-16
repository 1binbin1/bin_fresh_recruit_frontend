import type { ItableConfig } from '@/components/base/kl-table'
export const tableConfig: ItableConfig = {
  isShowIndex: true,
  isShowSelect: true,
  title: '应届生列表',
  propList: [
    { field: 'user_id', label: '账号ID', minWidth: '120' },
    { field: 'user_name', label: '姓名', minWidth: '120'},
    { field: 'user_sex', label: '性别', minWidth: '120', slotName: 'userSex' },
    { field: 'user_phone', label: '手机号', minWidth: '120' },
    { field: 'user_email', label: '邮箱', minWidth: '120'},
    { field: 'user_major', label: '专业', minWidth: '120' },
    { label: '操作', width: '300', slotName: 'handler' }
  ]
}
