import httpService from '@/service'
import type {Idata} from '@/service/type'
import type {Iuser} from '@/service/user/type'
import type {GetThemeRequest, SaveThemeRequest, ThemeSettingVo} from "@/service/common/type";

export function getDict(dict_type: number) {
    return httpService.get<Idata<String[]>>({
        url: '/dict/get',
        params: {
            dict_type
        }
    })
}

// 上传头像
export function uploadAvatar(data: FormData) {
    return httpService.post<Idata<Iuser>>({
        url: '/account/upload',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

// 保存主题
export function saveThemeHttp(data: SaveThemeRequest) {
    return httpService.get<Idata<ThemeSettingVo>>({
        url: '/theme/save',
        params: data,
        showLoading: false
    })
}

// 获取主题
export function getThemeHttp(data: GetThemeRequest) {
    return httpService.get<Idata<ThemeSettingVo>>({
        url: '/theme/get',
        params: data,
        showLoading: false
    })
}