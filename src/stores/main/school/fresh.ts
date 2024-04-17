import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {
    AddFreshBatchRequest,
    DeleteFreshRequest,
    GetFreshListRequest,
    OutFreshDataRequest
} from '@/service/school/type'
import {addFreshBatch, deleteFresh, getOutFreshDataHttp, getRateData, listFresh} from '@/service/school/fresh'
import {showMsg} from '@/utils/message'

export const useFreshStore = defineStore('fresh', () => {
    const freshList = ref()
    const freshRateData = ref()
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
        await getFreshRateData()
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
            // 刷新页面
            await getFreshList()
            await getFreshRateData()
        } else {
            showMsg('添加失败', 'error')
        }
    }

    // 删除fresh数据
    const deleteFreshData = async (data: DeleteFreshRequest) => {
        const res = await deleteFresh(data)
        if (res.code === 0) {
            showMsg('删除成功', 'success')
            await getFreshList()
            await getFreshRateData()
        } else {
            showMsg('删除失败', 'error')
        }
    }

    // 获取就业数据
    const getFreshRateData = async () => {
        const res = await getRateData()
        if (res.code === 0) {
            freshRateData.value = res.data
        }
    }

    // 导出投递记录
    const outFreshData = async (data: OutFreshDataRequest) => {
        return await getOutFreshDataHttp(data);
    }

    return {
        freshList,
        count,
        pageSize,
        freshRateData,
        reqData,
        getFreshList,
        changeCurrent,
        addFresh,
        deleteFreshData,
        getFreshRateData, outFreshData
    }
})
