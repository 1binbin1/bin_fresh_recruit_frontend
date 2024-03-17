import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  GetFreshListRequest,
  AddFreshBatchRequest
} from '@/service/school/type'
import { addFreshBatch, listFresh } from '@/service/school/fresh'
import { showMsg} from '@/utils/message'

export const useFreshStore = defineStore('fresh', () => {
  const freshList = ref()
  const count = ref(100)
  const pageSize = ref(100)
  const reqData = ref<GetFreshListRequest>({
    current: 1,
    page_size: 6
  })
  // 修改分页数据
  const changeCurrent = (current: number) => {
    reqData.value.current = current
  }
  // 获取fresh列表
  const getFreshList = async () => {
    const res = await listFresh(reqData.value)
    if (res.code === 0) {
      freshList.value = res.data.list
      count.value = res.data.total
      pageSize.value = res.data.page_size
    }
  }
  // 添加fresh数据
  const addFresh = async (data: AddFreshBatchRequest) => {
    const res = await addFreshBatch(data)
    if (res.code === 0) {
      showMsg('添加成功', 'success')
      // showNotice('成功', '添加成功', 'success')
      // 刷新页面
      await getFreshList()
    } else {
      showMsg('添加失败', 'error')
    }
  }

  return { freshList, count, getFreshList, changeCurrent, addFresh,pageSize }
})
