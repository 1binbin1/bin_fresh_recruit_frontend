/*
 * @Description: 学校就业中心接口相关数据
 */

// ======================应届生管理======================
// 添加应届生（单个）请求参数
export interface AddFreshRequest {
    fresh_id: string
}

// 添加单个应届生响应
export interface AddFreshVo {
    school_id: string
    fresh_id: string
}

// 添加应届生（批量）请求参数
export interface AddFreshBatchRequest {
    fresh_ids: string[]
}

// 删除应届生请求参数
export interface DeleteFreshRequest {
    fresh_id: string
}

// 删除应届生响应
export interface DeleteFreshVo {
    school_id: string
    fresh_id: string
}

// 查询应届生列表请求参数
export interface GetFreshListRequest {
    current: number
    page_size: number
}

// 单个应届生信息
export interface Fresh {
    id: number
    user_id: string
    user_name: string
    user_sex: number
    user_phone: string
    user_email: string
    user_school: string
    user_major: string
    user_year: string
    user_education: string
    a_avatar: string
}

// 查询应届生列表响应
export interface GetFreshListVo {
    list: Fresh[]
    total: number
    current: number
    page_size: number
}

export interface RateVo {
    label: string
    num_data: string
}

// ======================资讯管理======================
// 资讯发布请求参数
export interface AddMessageRequest {
    title: string
    message: string
}

// 资讯发布响应
export interface AddMessageVo {
    id: number
    school_id: string
    title: string
    intro_content: string
    create_time: string
}

// 资讯列表请求参数
export interface MessageListRequest {
    current: number
    page_size: number
    search_content: string
}

// 资讯列表响应
export interface MessageListVo {
    list: AddMessageVo[]
    total: number
    current: number
    page_size: number
}

// 资讯删除请求参数
export interface DeleteMessageRequest {
    id: number
}

// 资讯删除响应
export interface DeleteMessageVo {
    id: number
    school_id: string
    title: string
    intro_content: string
    create_time: string
}

// 资讯修改请求参数
export interface UpdateMessageRequest {
    id: number
    title: string
    intro_content: string
}

// 资讯修改响应
export interface UpdateMessageVo {
    id: number
    school_id: string
    title: string
    intro_content: string
    create_time: string
}


export interface OutFreshDataRequest {
    send_state: Number[]
}