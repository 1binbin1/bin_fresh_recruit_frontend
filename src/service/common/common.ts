import httpService from '@/service'
import type {Idata} from '@/service/type'
import type {Iuser} from '@/service/user/type'
import type {GetLoginInfoRequest, GetThemeRequest, SaveThemeRequest, ThemeSettingVo} from "@/service/common/type";
import type {IpVo} from "@/service/common/type";
import type {GetIpCityRequest} from "@/service/common/type";
import type {GetLoginInfoVo} from "@/service/common/type";

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

// 获取IP地址
export function getIpHttp() {
    return httpService.get<Idata<IpVo>>({
        url: '/ip/get',
        showLoading: false
    })
}

// 根据IP地址获取城市
export function getIpCityHttp(data: GetIpCityRequest) {
    return httpService.get<Idata<IpVo>>({
        url: '/ip/get/city',
        params: data,
        showLoading: false
    })
}

// 获取登录信息
export function getLoginInfoHttp(data: GetLoginInfoRequest) {
    return httpService.get<Idata<GetLoginInfoVo>>({
        url: '/ip/getLogin',
        params: data,
    })
}