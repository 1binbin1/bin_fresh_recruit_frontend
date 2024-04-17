/*
 * @Description: 用户鉴定类的请求
 */

import httpService from '..'
import type { Idata } from '../type'
import type { Iregister, Iuser, Ilogin, Ichange, Icode } from './type'
import type { IoutLoginRequest } from './type'

/**
 * @description: 用户注册
 */
export function register(data: Iregister) {
  return httpService.post<Idata<Iuser>>({
      url: '/account/register',
      data
  })
}

/**
 * @description: 用户登录
 */
export function login(data: Ilogin) {
  return httpService.post<Idata<Iuser>>({
      url: '/account/login',
      data
  })
}

/**
 * @description: 修改密码
 */
export function changPwd(data: Ichange) {
  return httpService.post<Idata<Iuser>>({
      url: '/account/forget',
      data
  })
}

/**
 * @description: 获取验证码(每分钟获取一个)
 */
export function getCode(data: Icode) {
  return httpService.post<Idata<any>>({
      url: '/account/getcode',
      data
  })
}

/**
 * @description: 退出登录
 */
export function outLogin(data: IoutLoginRequest) {
  return httpService.post<Idata<any>>({
      url: '/account/loginout',
      data
  })
}
