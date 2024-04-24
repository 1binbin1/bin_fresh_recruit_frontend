import {defineStore} from 'pinia'
import {ref} from 'vue'
import type {
    AddFreshBatchRequest,
    DeleteFreshRequest,
    GetFreshListRequest,
    OutFreshDataRequest
} from '@/service/school/type'
import {
    addFreshBatch,
    deleteFresh,
    getFreshOutCountHttp,
    getOutFreshDataHttp,
    getRateData,
    listFresh
} from '@/service/school/fresh'
import {showMsg} from '@/utils/message'
import type {MapDataArray} from "@/service/school/type";
import localCache from "@/utils/localCache";

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
            getMap()
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
            getMap()
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

    // 获取数据范围
    const countRes = ref<string[]>()
    const getCount = async (data: string) => {
        const res = await getFreshOutCountHttp({
            school_id: data
        })
        if (res.code === 0) {
            countRes.value = res.data
        }
    }

    const mapData = ref<[]>()
    let dicts = []
    const selectNum = ref<string>("")
    const getMap = async () => {
        await getCount(localCache.getCache('userId'))
        mapData.value = []
        dicts = []
        countRes.value.forEach((item, index) => {
            dicts.push({
                label: item,
                value: item
            })
        })
        mapData.value = dicts
        selectNum.value = mapData.value[0]
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
        getFreshRateData, outFreshData, countRes, getCount, getMap, mapData, selectNum
    }
})
