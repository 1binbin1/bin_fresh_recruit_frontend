import {defineStore} from 'pinia'
import {
    getDict,
    getIpCityHttp,
    getIpHttp,
    getLoginInfoHttp,
    getThemeHttp,
    saveThemeHttp,
    uploadAvatar
} from '@/service/common/common'
import {ref} from 'vue'
import {showMsg} from '@/utils/message'
import type {IpVo, SaveThemeRequest, ThemeSettingVo} from "@/service/common/type";
import localCache from "@/utils/localCache";
import type {GetLoginInfoRequest, LoginInfoVo} from "@/service/common/type";

export const useCommonStore = defineStore('common', () => {
    const dictData = ref()
    const getdict = async (value: number) => {
        const res = await getDict(value)
        if (res.code === 0) {
            dictData.value = res.data
        }
        return res.data
    }

    // 上传头像
    const uploadVo = ref<string>()
    const upload = async (value: FormData) => {
        value.append('service_type', '0')
        const res = await uploadAvatar(value)
        if (res.code === 0) {
            uploadVo.value = res.data['a_avatar']
            showMsg('上传成功', 'success')
        } else {
            showMsg('上传失败', 'error')
        }
    }


    // ======颜色======
    const themeResult = ref<ThemeSettingVo>()
    const saveTheme = async (data: SaveThemeRequest) => {
        const res = await saveThemeHttp(data)
        if (res.code === 0) {
            await getTheme(data.a_id)
        }
    }
    const getTheme = async (data: string) => {
        const res = await getThemeHttp({
            a_id: data
        })
        if (res.code === 0) {
            themeResult.value = res.data
        }
    }

    // 获取IP和城市
    const cityInfo = ref<IpVo>()
    const getIp = async () => {
        const res = await getIpHttp()
        if (res.code === 0) {
            cityInfo.value = res.data
            localCache.setCache("cityInfo", cityInfo.value)
        }
    }
    const getIpCity = async (ip: string) => {
        const res = await getIpCityHttp({
            ip
        })
        if (res.code === 0) {
            cityInfo.value = res.data
            localCache.setCache("cityInfo", cityInfo.value)
        }
    }

    // 分页获取登录信息
    const score = ref<number>(0)
    const total = ref(0)
    const pageSize = ref(0)
    const list = ref<LoginInfoVo[]>()
    const getLoginInfoData = ref<GetLoginInfoRequest>({
        a_id: "",
        current: 1,
        page_size: 10,
    })
    const getLoginInfoByPage = async (data: string) => {
        getLoginInfoData.value.a_id = data
        const res = await getLoginInfoHttp(getLoginInfoData.value)
        if (res.code === 0) {
            list.value = res.data.list
            score.value = res.data.score
            total.value = res.data.total
            pageSize.value = res.data.page_size
        }
    }
    const changeCurrent = async (current: number) => {
        getLoginInfoData.value.current = current
    }
    const getReqData = () => {
        return getLoginInfoData.value.current
    }
    return {
        dictData,
        getdict,
        uploadVo,
        upload,
        themeResult,
        saveTheme,
        getTheme,
        cityInfo,
        getIp,
        getIpCity,
        score, total, pageSize, list, getLoginInfoByPage, changeCurrent, getLoginInfoData, getReqData
    }
})
