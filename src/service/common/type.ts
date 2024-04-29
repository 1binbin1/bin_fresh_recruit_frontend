export interface ThemeSettingVo {
    a_id: string
    ts_theme_color: string
    ts_theme_active_color: string
}

export interface SaveThemeRequest {
    a_id: string
    theme_type: number
    color: string
}

export interface GetThemeRequest {
    a_id: string
}

export interface IpVo {
    ip_address: string
    country: string
    province: string
    city: string
    address: string
    city_info: string
}

export interface GetIpCityRequest {
    ip: string
}

// 获取登录信息相关
export interface GetLoginInfoRequest {
    a_id: string
    current: number
    page_size: number
}

export interface GetLoginInfoVo {
    a_id: string
    score: number
    list: LoginInfoVo[]
    total: number
    current: number
    page_size: number
}

export interface LoginInfoVo {
    a_id: string
    login_ip: string
    login_address: string
    login_country: string
    login_province: string
    login_city: string
    login_device: string
    create_time: string
}