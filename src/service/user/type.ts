// 返回的用户信息
export interface Iuser {
    id?: string
    phone?: string
    a_avatar?: string
    token?: string
    user_name?: string
}

// 注册需要的信息
export interface Iregister {
    phone: string
    password: string
    check_password: string
    role: number
}

// 登录需要的信息
export interface Ilogin {
    login_type: number
    phone: string
    password: string
    role: number
    code: string
}

// 修改密码需要的信息
export interface Ichange {
    phone: string
    password: string
    check_password: string
    role: number
    code: string
}

// 获取验证码需要的信息
export interface Icode {
    phone: string
    role: number
    type: number
}

// 退出登录
export interface IoutLoginRequest {
    role: number
}
