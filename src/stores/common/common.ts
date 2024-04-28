import {defineStore} from 'pinia'
import {getDict, getIpCityHttp, getIpHttp, getThemeHttp, saveThemeHttp, uploadAvatar} from '@/service/common/common'
import {ref} from 'vue'
import {showMsg} from '@/utils/message'
import type {IpVo, SaveThemeRequest, ThemeSettingVo} from "@/service/common/type";

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
        }
    }
    const getIpCity = async (ip: string) => {
        const res = await getIpCityHttp({
            ip
        })
        if (res.code === 0) {
            cityInfo.value = res.data
        }
    }
    return {
        dictData,
        getdict,
        uploadVo,
        upload, themeResult, saveTheme, getTheme, cityInfo, getIp, getIpCity
    }
})
