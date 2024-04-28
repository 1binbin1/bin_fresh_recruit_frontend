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

export interface GetIpCityRequest{
    ip:string
}